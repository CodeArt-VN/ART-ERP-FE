import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ElementRef,
	Input,
	OnDestroy,
	OnInit,
	SimpleChanges,
	ViewChild,
} from '@angular/core';

@Component({
	selector: 'app-branch-breadcrumbs',
	templateUrl: './branch-breadcrumbs.component.html',
	styleUrls: ['./branch-breadcrumbs.component.scss'],
	standalone: false,
	host: {
		'[class.auto-fit]': 'autoFit',
	},
})
export class BranchBreadcrumbsComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('popover') popover;
	@Input() Id;
	@Input() Items;
	/** Ceiling for visible crumbs; component may lower this to fit container width. */
	@Input() maxItems;
	@Input() itemsBeforeCollapse = 1;
	@Input() itemsAfterCollapse = 1;
	/** When true (default), keep crumbs on one line and shrink maxItems if the path overflows. */
	@Input() autoFit = true;
	breadcrumbs = [];
	/** True when Id exists in Items. Root-only paths stay empty without the missing message. */
	pathFound = false;

	/** Bound to ion-breadcrumbs — shrinks when content overflows. */
	effectiveMaxItems: number | undefined;
	effectiveBefore = 1;
	effectiveAfter = 1;

	isOpen = false;
	collapsedBreadcrumbs: HTMLIonBreadcrumbElement[] = [];

	private resizeObserver?: ResizeObserver;
	private fitRaf = 0;
	private stepRaf = 0;
	private fitting = false;
	private ignoreResize = false;
	private resizePending = false;
	private destroyed = false;
	/** Width at the last stable fit. Same width must not expand crumbs again. */
	private settledWidth = 0;

	constructor(
		private host: ElementRef<HTMLElement>,
		private cdr: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.loadData();
	}

	ngAfterViewInit() {
		if (typeof ResizeObserver !== 'undefined') {
			this.resizeObserver = new ResizeObserver(() => {
				if (this.ignoreResize) {
					this.resizePending = true;
					return;
				}
				this.scheduleFit();
			});
			this.resizeObserver.observe(this.host.nativeElement);
		}
		this.scheduleFit();
	}

	ngOnDestroy() {
		this.destroyed = true;
		this.resizeObserver?.disconnect();
		if (this.fitRaf) cancelAnimationFrame(this.fitRaf);
		if (this.stepRaf) cancelAnimationFrame(this.stepRaf);
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['Id'] || changes['Items'] || changes['maxItems'] || changes['autoFit']) {
			this.loadData();
			this.scheduleFit();
		}
	}

	loadData() {
		this.settledWidth = 0;
		this.breadcrumbs = [];
		this.pathFound = false;
		if (!Array.isArray(this.Items) || typeof this.Id !== 'number' || this.Id < 0) {
			this.effectiveMaxItems = this.maxItems;
			return;
		}
		this.pathFound = this.Items.some((d) => d.Id == this.Id);
		this.addParent(this.Id);
		this.dropRoot();
		this.applyCollapseLayout(this.breadcrumbs.length || 1);
	}

	addParent(id) {
		if (id === null || id === undefined) return;
		let parent = this.Items.find((d) => d.Id == id);

		if (parent) {
			this.breadcrumbs.unshift(parent);
			this.addParent(parent.IDParent);
		}
	}

	/** Hide the tree root (Tổng công ty). Visible path starts at F1. */
	private dropRoot() {
		if (!this.breadcrumbs.length || !this.isTreeRoot(this.breadcrumbs[0])) return;
		this.breadcrumbs.shift();
	}

	private isTreeRoot(item): boolean {
		const parentId = item?.IDParent;
		if (parentId === null || parentId === undefined) return true;
		return !this.Items.some((d) => d.Id == parentId);
	}

	async presentPopover(e: Event) {
		this.collapsedBreadcrumbs = (e as CustomEvent).detail.collapsedBreadcrumbs;
		this.popover.event = e;
		this.popover.cssClass = 'branch-breadcrumbs';
		console.log(this.popover);

		this.isOpen = true;
	}

	/** nowrap so fitToWidth can see horizontal overflow. Null leaves the table free to wrap. */
	get crumbFlexWrap(): 'nowrap' | null {
		return this.autoFit ? 'nowrap' : null;
	}

	private resolveCeiling(): number {
		const n = this.breadcrumbs.length || 1;
		if (typeof this.maxItems === 'number' && this.maxItems > 0) {
			return Math.min(this.maxItems, n);
		}
		return n;
	}

	private scheduleFit() {
		if (this.fitRaf) cancelAnimationFrame(this.fitRaf);
		this.fitRaf = requestAnimationFrame(() => {
			this.fitRaf = 0;
			this.fitToWidth();
		});
	}

	/** Collapse the middle only as far as the row still overflows. Keep the ">" after …. */
	private fitToWidth() {
		if (!this.autoFit || this.fitting || this.destroyed) return;
		const el = this.host.nativeElement;
		const width = el?.clientWidth ?? 0;
		const n = this.breadcrumbs.length;
		if (!width || n <= 1) {
			this.settledWidth = width;
			return;
		}

		const ceiling = this.resolveCeiling();
		let shown = this.shownNames(ceiling);
		const overflows = el.scrollWidth > width + 1;
		const widthGrew = this.settledWidth > 0 && width > this.settledWidth + 1;
		if (!overflows && !(widthGrew && shown < ceiling)) {
			this.settledWidth = width;
			return;
		}

		this.fitting = true;
		this.ignoreResize = true;
		let allowGrow = widthGrew;

		const settle = () => {
			this.settledWidth = el.clientWidth;
			this.fitting = false;
			this.stepRaf = requestAnimationFrame(() => {
				this.stepRaf = 0;
				if (this.destroyed) return;
				this.ignoreResize = false;
				if (!this.resizePending) return;
				this.resizePending = false;
				this.scheduleFit();
			});
		};

		const step = () => {
			this.stepRaf = requestAnimationFrame(() => {
				this.stepRaf = 0;
				if (this.destroyed) return;
				const over = el.scrollWidth > el.clientWidth + 1;
				let next = shown;
				if (over && shown > 1) {
					allowGrow = false;
					next = shown - 1;
				} else if (!over && allowGrow && shown < ceiling) {
					next = shown + 1;
				}
				if (next === shown) {
					settle();
					return;
				}
				shown = next;
				this.applyCollapseLayout(shown);
				this.cdr.detectChanges();
				step();
			});
		};

		step();
	}

	private shownNames(ceiling: number): number {
		const max = this.effectiveMaxItems ?? ceiling;
		if (max >= ceiling) return ceiling;
		return Math.min(ceiling, Math.max(1, this.effectiveBefore + this.effectiveAfter));
	}

	private applyCollapseLayout(shown: number) {
		const n = Math.max(1, this.breadcrumbs.length);
		const cap = this.resolveCeiling();
		const layout = crumbCollapseLayout(n, Math.min(shown, cap));
		this.effectiveMaxItems = layout.maxItems;
		this.effectiveBefore = layout.before;
		this.effectiveAfter = layout.after;
	}
}

/**
 * Ionic collapses to itemsBefore + itemsAfter once length exceeds maxItems.
 * shown = how many names stay visible. The gap between them is one "…".
 */
export function crumbCollapseLayout(length: number, shown: number): { maxItems: number; before: number; after: number } {
	const n = Math.max(1, length);
	const names = Math.min(n, Math.max(1, shown));
	if (names >= n) return { maxItems: n, before: 1, after: 1 };
	if (names === 1) return { maxItems: 1, before: 0, after: 1 };
	return { maxItems: names, before: 1, after: names - 1 };
}
