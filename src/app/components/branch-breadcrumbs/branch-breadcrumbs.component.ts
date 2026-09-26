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
})
export class BranchBreadcrumbsComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('popover') popover;
	@Input() Id;
	@Input() Items;
	/** Ceiling for visible crumbs; component may lower this to fit container width. */
	@Input() maxItems;
	@Input() itemsBeforeCollapse = 1;
	@Input() itemsAfterCollapse = 1;
	/** When true (default), shrink maxItems if path overflows. Disable for wrapping full-path cells. */
	@Input() autoFit = true;
	breadcrumbs = [];
	/** True when Id exists in Items. Root-only paths stay empty without the missing message. */
	pathFound = false;

	/** Bound to ion-breadcrumbs — shrinks when content overflows. */
	effectiveMaxItems: number | undefined;

	isOpen = false;
	collapsedBreadcrumbs: HTMLIonBreadcrumbElement[] = [];

	private resizeObserver?: ResizeObserver;
	private fitRaf = 0;
	private fitting = false;

	constructor(
		private host: ElementRef<HTMLElement>,
		private cdr: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.loadData();
	}

	ngAfterViewInit() {
		if (typeof ResizeObserver !== 'undefined') {
			this.resizeObserver = new ResizeObserver(() => this.scheduleFit());
			this.resizeObserver.observe(this.host.nativeElement);
		}
		this.scheduleFit();
	}

	ngOnDestroy() {
		this.resizeObserver?.disconnect();
		if (this.fitRaf) cancelAnimationFrame(this.fitRaf);
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['Id'] || changes['Items'] || changes['maxItems'] || changes['autoFit']) {
			this.loadData();
			this.scheduleFit();
		}
	}

	loadData() {
		this.breadcrumbs = [];
		this.pathFound = false;
		if (!Array.isArray(this.Items) || typeof this.Id !== 'number' || this.Id < 0) {
			this.effectiveMaxItems = this.maxItems;
			return;
		}
		this.pathFound = this.Items.some((d) => d.Id == this.Id);
		this.addParent(this.Id);
		this.dropRoot();
		const ceiling = this.resolveCeiling();
		this.effectiveMaxItems = ceiling;
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

	/** Collapse toward … + last crumb when path does not fit available width. */
	private fitToWidth() {
		if (!this.autoFit || this.fitting) return;
		const el = this.host.nativeElement;
		const n = this.breadcrumbs.length;
		if (!el?.clientWidth || n <= 1) return;

		const ceiling = this.resolveCeiling();
		this.fitting = true;

		const tryFit = (max: number) => {
			if (this.effectiveMaxItems !== max) {
				this.effectiveMaxItems = max;
				this.cdr.detectChanges();
			}
			requestAnimationFrame(() => {
				const overflows = el.scrollWidth > el.clientWidth + 1;
				if (overflows && max > 1) {
					tryFit(max - 1);
				} else {
					this.fitting = false;
				}
			});
		};

		tryFit(ceiling);
	}
}
