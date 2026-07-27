import { Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {
	ScrollProgressEvent,
	VirtualScrollMode,
	VirtualViewportComponent,
} from 'src/app/components/virtual-scroll/virtual-viewport.component';
import { buildVirtualItems, DatatableVirtualItem, virtualItemTrackBy } from './virtual-items.util';

export type DatatableVirtualScrollMode = VirtualScrollMode;

@Component({
	selector: 'datatable-body',
	templateUrl: './datatable-body.component.html',
	standalone: false,
})
export class DataTablBodyComponent implements OnInit, OnDestroy {
	@ViewChild(VirtualViewportComponent) private vp?: VirtualViewportComponent<DatatableVirtualItem>;

	@Input() emptyMessage: any;

	_columns: any[];
	@Input() set columns(val: any[]) {
		this._columns = val;
		// Column set/order can change row height (e.g. filter row layout) — force a remeasure.
		this.vp?.invalidateHeights();
	}

	get columns(): any[] {
		return this._columns;
	}

	_rows: any[] = [];
	virtualItems: DatatableVirtualItem[] = [];

	@Input() set rows(val: any[]) {
		this._rows = val || [];
		this.isWaitingNewData = false;
		this.rebuildVirtualItems();
	}

	get rows(): any[] {
		return this._rows;
	}

	@Input() trackBy: string;

	@Input() set virtualScroll(val: boolean) {
		this._virtualScroll = !!val;
		this.rebuildVirtualItems();
	}
	get virtualScroll(): boolean {
		return this._virtualScroll;
	}
	private _virtualScroll = false;

	@Input() virtualScrollMode: DatatableVirtualScrollMode = 'page';
	@Input() virtualScrollHeight = '100%';
	@Input() virtualScrollMinBufferPx = 300;
	@Input() virtualScrollMaxBufferPx = 600;
	/** Seed for un-measured rows' placeholder height — set close to the real row height to minimize compensation. */
	@Input() virtualScrollDefaultItemSize = 51;
	/** No-op — kept for input-binding compatibility. The custom viewport renders a plain *ngFor
	 * slice with no view recycling, which is already equivalent to what this used to opt into. */
	@Input() virtualScrollTemplateCacheSize = 0;
	/** Set by app-data-table from query.Take + row growth — not for page templates. */
	@Input() infiniteScrollDisabled = false;

	rowTrackingFn = (index: number, row: any) => {
		if (this.trackBy) {
			if (typeof row?.get === 'function') {
				const v = row.get(this.trackBy)?.value;
				if (v != null && v !== '') {
					return v;
				}
			}
			if (row?.[this.trackBy] != null) {
				return row[this.trackBy];
			}
		}
		return this._rows?.indexOf(row) ?? index;
	};

	virtualTrackBy = (_index: number, item: DatatableVirtualItem) => virtualItemTrackBy(_index, item);

	_selectedRows: any[] = [];

	@Input() set selectedRows(val: any[]) {
		this._selectedRows = val;
		this.setCheckedRows();
	}

	get selectedRows(): any[] {
		return this._selectedRows;
	}

	@Output() selectedRowsChange: EventEmitter<any[]> = new EventEmitter<any[]>();

	@Input() showSpinner: boolean;

	@Output() activate: EventEmitter<any> = new EventEmitter();

	@Output() dataInfinite: EventEmitter<any> = new EventEmitter();

	isWaitingNewData = false;

	private mediaQuery?: MediaQueryList;
	private mediaListener?: (e: MediaQueryListEvent) => void;
	private readonly infiniteThresholdPx = 320;

	constructor(private readonly ngZone: NgZone) {}

	ngOnInit() {
		// Card layout at ≤1164px changes row heights — force a full remeasure. This is on top of
		// (not instead of) the viewport's own width-ResizeObserver: a window-width breakpoint can
		// flip without this table's own rendered width changing (e.g. fixed-width sidebar), and a
		// table width change can happen without crossing this breakpoint (e.g. sidebar toggle) —
		// each covers a case the other misses.
		this.mediaQuery = window.matchMedia('(max-width: 1164px)');
		this.mediaListener = () => {
			this.ngZone.run(() => this.vp?.invalidateHeights());
		};
		this.mediaQuery.addEventListener('change', this.mediaListener);
	}

	ngOnDestroy() {
		if (this.mediaQuery && this.mediaListener) {
			this.mediaQuery.removeEventListener('change', this.mediaListener);
		}
	}

	private rebuildVirtualItems() {
		this.virtualItems = this._virtualScroll ? buildVirtualItems(this._rows, this.trackBy) : [];
	}

	onVirtualScrollProgress(event: ScrollProgressEvent) {
		if (this.infiniteScrollDisabled || this.isWaitingNewData || !this.virtualScroll) {
			return;
		}
		if (!this._rows?.length || this.showSpinner) {
			return;
		}
		if (event.distanceToEndPx > this.infiniteThresholdPx) {
			return;
		}
		this.isWaitingNewData = true;
		this.dataInfinite.emit({ DataLength: this.virtualItems.length });
	}

	lastchecked: any = null;
	changeSelection(i, e = null) {
		if (e && e.shiftKey) {
			let from = this._rows.indexOf(this.lastchecked);
			let to = this._rows.indexOf(i);

			let start = Math.min(from, to);
			let end = Math.max(from, to) + 1;

			let itemsToCheck = this._rows.slice(start, end);
			for (let j = 0; j < itemsToCheck.length; j++) {
				const it = itemsToCheck[j];

				it.checked = this.lastchecked.checked;
				const index = this.selectedRows.indexOf(it, 0);

				if (this.lastchecked.checked && index == -1) {
					this.selectedRows.push(it);
				} else if (!this.lastchecked.checked && index > -1) {
					this.selectedRows.splice(index, 1);
				}
			}
		} else if (e) {
			if (e.target.checked) {
				this.selectedRows.push(i);
			} else {
				const index = this.selectedRows.indexOf(i, 0);
				if (index > -1) {
					this.selectedRows.splice(index, 1);
				}
			}
		} else {
			if (i.checked) {
				this.selectedRows.push(i);
			} else {
				const index = this.selectedRows.indexOf(i, 0);
				if (index > -1) {
					this.selectedRows.splice(index, 1);
				}
			}
		}

		this.selectedRows = [...this.selectedRows];
		this.lastchecked = i;

		e?.stopPropagation();

		this.selectedRowsChange.emit(this.selectedRows);

		this.activate.emit({ event: e, selectedItems: this.selectedRows });
	}

	setCheckedRows() {
		if (!this._rows) {
			return;
		}
		this._rows.forEach((row) => {
			row.checked = this.selectedRows.includes(row);
		});
	}
}
