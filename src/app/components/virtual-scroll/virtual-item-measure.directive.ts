import { Directive, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';

/**
 * Reports the real rendered height of a virtual-scroll item via ResizeObserver.
 * Runs entirely outside the Angular zone — the consumer (`VirtualViewportComponent`) batches
 * these callbacks and re-enters the zone once per animation frame.
 *
 * Emits:
 * - Once when the row first settles (height > 0).
 * - Again when height changes by ≥ 1px (async content: breadcrumbs, wrap) so the engine can
 *   update a locked row without a full `invalidateHeights()`.
 * - After `measureGeneration` bumps (responsive width / breakpoint), starts a fresh cycle.
 */
@Directive({
	selector: '[virtualItemMeasure]',
	standalone: false,
})
export class VirtualItemMeasureDirective implements OnInit, OnChanges, OnDestroy {
	@Input('virtualItemMeasure') itemId: string | number;
	/** Bumped by the viewport on `invalidateHeights()` — allows a fresh measure cycle. */
	@Input() measureGeneration = 0;
	@Output() heightMeasured = new EventEmitter<number>();

	private ro?: ResizeObserver;
	private lastReportedHeight = -1;
	private lastReportedGeneration = -1;

	constructor(
		private readonly el: ElementRef<HTMLElement>,
		private readonly ngZone: NgZone
	) {}

	ngOnInit(): void {
		this.ngZone.runOutsideAngular(() => {
			this.ro = new ResizeObserver((entries) => {
				const entry = entries[0];
				const height = entry?.borderBoxSize?.[0]?.blockSize || this.el.nativeElement.getBoundingClientRect().height;
				if (!(height > 0)) {
					return;
				}
				const generationChanged = this.lastReportedGeneration !== this.measureGeneration;
				const delta = Math.abs(height - this.lastReportedHeight);
				// First report for this generation, or a real settle change (≥1px).
				if (!generationChanged && this.lastReportedHeight > 0 && delta < 1) {
					return;
				}
				this.lastReportedGeneration = this.measureGeneration;
				this.lastReportedHeight = height;
				this.heightMeasured.emit(height);
			});
			this.ro.observe(this.el.nativeElement);
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['measureGeneration'] && !changes['measureGeneration'].firstChange) {
			this.lastReportedHeight = -1;
			this.lastReportedGeneration = -1;
		}
	}

	ngOnDestroy(): void {
		this.ro?.disconnect();
	}
}
