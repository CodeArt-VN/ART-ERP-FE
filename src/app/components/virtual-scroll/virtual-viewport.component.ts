import { Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { auditTime } from 'rxjs/operators';
import { VirtualEngineItem, VirtualScrollEngine } from './virtual-scroll.engine';

export type VirtualScrollMode = 'page' | 'container';

export interface ScrollProgressEvent {
	distanceToEndPx: number;
}

/** @deprecated Use VirtualScrollMode */
export type DatatableVirtualScrollMode = VirtualScrollMode;
/** @deprecated Use ScrollProgressEvent */
export type DatatableScrollProgressEvent = ScrollProgressEvent;

type IonContentEl = HTMLElement & { getScrollElement?: () => Promise<HTMLElement> };

/**
 * Shared variable-height virtual scroll viewport (measure-once-lock-forever — see
 * `VirtualScrollEngine`). Mirrors CDK's DOM contract:
 *
 *   viewport (position:relative) > .vs-content (position:absolute, translateY'd)
 *                                 > .vs-spacer  (normal flow, height = total content height)
 *
 * Modes:
 * - `container`: viewport scrolls itself (`overflow:auto`).
 * - `page`: ancestor `ion-content` scrolls; viewport stays in page flow via spacer height.
 *
 * `idKey` lets consumers pass domain objects without remapping to `{ id }` every CD cycle
 * (e.g. `idKey="requestId"` / `idKey="Id"`). Default `'id'` matches data-table virtual items.
 */
@Component({
	selector: 'app-virtual-viewport',
	exportAs: 'virtualViewport',
	templateUrl: './virtual-viewport.component.html',
	standalone: false,
})
export class VirtualViewportComponent<T = any> implements OnInit, OnChanges, OnDestroy {
	@Input() mode: VirtualScrollMode = 'page';
	@Input() minBufferPx = 300;
	@Input() maxBufferPx = 600;
	@Input() defaultItemSize = 51;
	/** Property used as the stable item id for height cache / track. */
	@Input() idKey = 'id';

	@Input() set items(val: T[] | null | undefined) {
		const next = val || [];
		const idsChanged = !this.sameItemIds(next, this.itemsArr);
		this.itemsArr = next;
		// Skip engine rebuild when the id sequence is unchanged — important for consumers that
		// bind a getter returning a fresh array each CD (e.g. `.filter(...)` in write-NFC).
		if (idsChanged) {
			this.syncEngineItems();
			if (this.scrollEl) {
				this.recompute();
			}
		}
	}

	@Output() scrollProgress = new EventEmitter<ScrollProgressEvent>();

	renderedItems: T[] = [];
	contentTransform = 'translateY(0px)';
	totalHeight = 0;
	/** Bumped on every `invalidateHeights()` so measure directives remeasure once. */
	measureGeneration = 0;

	private itemsArr: T[] = [];
	private readonly engine: VirtualScrollEngine;
	private scrollEl?: HTMLElement;
	private scrollSub?: Subscription;
	private resizeObserver?: ResizeObserver;
	private lastWidth = 0;

	private pendingMeasurements: Array<{ id: string | number; height: number }> = [];
	private flushScheduled = false;
	private renderStart = 0;

	constructor(
		private readonly el: ElementRef<HTMLElement>,
		private readonly ngZone: NgZone
	) {
		this.engine = new VirtualScrollEngine(this.defaultItemSize);
	}

	ngOnInit(): void {
		this.ngZone.runOutsideAngular(() => {
			this.setupResizeObserver();
			this.resolveScrollElement();
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['defaultItemSize'] && !changes['defaultItemSize'].firstChange) {
			this.engine.setDefaultItemSize(this.defaultItemSize);
		}
		if (changes['idKey'] && !changes['idKey'].firstChange) {
			this.syncEngineItems();
			if (this.scrollEl) {
				this.recompute();
			}
		}
		if (changes['mode'] && !changes['mode'].firstChange) {
			this.scrollSub?.unsubscribe();
			this.scrollSub = undefined;
			this.scrollEl = undefined;
			this.ngZone.runOutsideAngular(() => this.resolveScrollElement());
		}
	}

	ngOnDestroy(): void {
		this.scrollSub?.unsubscribe();
		this.resizeObserver?.disconnect();
	}

	/**
	 * Called directly from the template's `(heightMeasured)` binding — runs outside the Angular
	 * zone (the measure directive's ResizeObserver origin) and just batches into a single
	 * `requestAnimationFrame` flush, so N rows settling in the same frame cost one scroll
	 * compensation + one change-detection pass instead of N.
	 */
	onItemMeasured(id: string | number, height: number): void {
		this.pendingMeasurements.push({ id, height });
		if (!this.flushScheduled) {
			this.flushScheduled = true;
			requestAnimationFrame(() => this.flushMeasurements());
		}
	}

	/** Forces a full remeasure (all locked heights dropped) — e.g. on responsive breakpoint change. */
	invalidateHeights(): void {
		this.engine.invalidateAll();
		this.measureGeneration++;
		this.recompute();
	}

	resolveItemId(item: T, index = 0): string | number {
		const record = item as Record<string, unknown>;
		const fromKey = record?.[this.idKey];
		if (fromKey != null && fromKey !== '') {
			return fromKey as string | number;
		}
		const fromId = record?.['id'];
		if (fromId != null && fromId !== '') {
			return fromId as string | number;
		}
		return index;
	}

	private sameItemIds(a: T[], b: T[]): boolean {
		if (a === b) {
			return true;
		}
		if (a.length !== b.length) {
			return false;
		}
		for (let i = 0; i < a.length; i++) {
			if (this.resolveItemId(a[i], i) !== this.resolveItemId(b[i], i)) {
				return false;
			}
		}
		return true;
	}

	private syncEngineItems(): void {
		const engineItems: VirtualEngineItem[] = this.itemsArr.map((item, i) => ({
			id: this.resolveItemId(item, i),
		}));
		this.engine.upsertItems(engineItems);
	}

	private flushMeasurements(): void {
		this.flushScheduled = false;
		const queue = this.pendingMeasurements;
		this.pendingMeasurements = [];
		if (!queue.length) {
			return;
		}

		let compensation = 0;
		let changed = false;
		for (const { id, height } of queue) {
			const result = this.engine.lockHeight(id, height);
			if (!result) {
				continue;
			}
			changed = true;
			// Only items already scrolled past (before the current render window) shift the
			// content-wrapper's translateY offset — compensate scrollTop by the same delta so the
			// currently-visible rows don't visually jump. Because a lock can only ever happen once
			// per row, this correction is bounded and cannot re-trigger itself (no feedback loop).
			if (result.index < this.renderStart) {
				compensation += result.delta;
			}
		}
		if (!changed) {
			return;
		}
		if (compensation !== 0 && this.scrollEl) {
			this.scrollEl.scrollTop += compensation;
		}
		this.ngZone.run(() => this.recompute());
	}

	private setupResizeObserver(): void {
		this.resizeObserver = new ResizeObserver((entries) => {
			const width = entries[0]?.contentRect?.width ?? 0;
			if (!width || Math.abs(width - this.lastWidth) < 1) {
				return;
			}
			this.lastWidth = width;
			this.ngZone.run(() => this.invalidateHeights());
		});
		this.resizeObserver.observe(this.el.nativeElement);
	}

	private resolveScrollElement(): void {
		if (this.mode === 'container') {
			this.attachScroll(this.el.nativeElement);
			return;
		}

		const ionContent = this.el.nativeElement.closest('ion-content') as IonContentEl | null;
		if (!ionContent) {
			console.warn('[app-virtual-viewport] mode=page: no ion-content ancestor; falling back to self-scroll');
			this.attachScroll(this.el.nativeElement);
			return;
		}

		const syncScrollEl =
			(ionContent.shadowRoot?.querySelector('.inner-scroll') as HTMLElement | null) ||
			(ionContent.querySelector('.inner-scroll') as HTMLElement | null);

		if (syncScrollEl) {
			this.attachScroll(syncScrollEl);
			return;
		}

		if (typeof ionContent.getScrollElement === 'function') {
			ionContent.getScrollElement().then((scrollEl) => {
				if (scrollEl) {
					this.attachScroll(scrollEl);
				}
			});
			return;
		}

		console.warn('[app-virtual-viewport] mode=page: could not resolve ion-content scroll element');
	}

	private attachScroll(scrollEl: HTMLElement): void {
		this.scrollEl = scrollEl;
		// Official CDK fix for virtual-scroll jumping (angular/components#32715, PR #33439) — the
		// browser's own scroll anchoring / smooth-scroll can fight our offset adjustments.
		scrollEl.style.overflowAnchor = 'none';
		scrollEl.style.scrollBehavior = 'auto';

		this.scrollSub?.unsubscribe();
		this.scrollSub = fromEvent(scrollEl, 'scroll')
			.pipe(auditTime(80))
			.subscribe(() => this.ngZone.run(() => this.recompute()));

		this.ngZone.run(() => this.recompute());
	}

	/**
	 * Viewport's own offset from the scroll container's content origin — stable across scroll
	 * ticks as long as nothing above the viewport resizes. Always 0 for container mode (the
	 * viewport IS the scroll element).
	 */
	private measureViewportOffset(): number {
		if (this.mode === 'container' || !this.scrollEl) {
			return 0;
		}
		const viewportRect = this.el.nativeElement.getBoundingClientRect();
		const scrollRect = this.scrollEl.getBoundingClientRect();
		return viewportRect.top - scrollRect.top + this.scrollEl.scrollTop;
	}

	private recompute(): void {
		if (!this.scrollEl) {
			return;
		}
		const scrollTop = this.scrollEl.scrollTop;
		const clientHeight = this.scrollEl.clientHeight;
		const viewportOffset = this.measureViewportOffset();
		const virtualProgress = Math.max(0, scrollTop - viewportOffset);

		const range = this.engine.getVisibleRange(virtualProgress - this.minBufferPx, virtualProgress + clientHeight + this.maxBufferPx);
		this.renderStart = range.start;
		this.renderedItems = range.end >= range.start ? this.itemsArr.slice(range.start, range.end + 1) : [];
		this.contentTransform = `translateY(${this.engine.getOffset(range.start)}px)`;
		this.totalHeight = this.engine.getTotalHeight();

		this.scrollProgress.emit({ distanceToEndPx: this.totalHeight - virtualProgress - clientHeight });
	}
}
