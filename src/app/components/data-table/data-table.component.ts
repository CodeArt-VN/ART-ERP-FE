import { Component, ContentChild, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { ColumnChangesService, DataTableColumnDirective } from './directives/data-table-column-directive';
import { TableColumn } from './interfaces/table-column.interface';
import { Subscription } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { lib } from 'src/app/services/static/global-functions';
import { DataTableEmptyMessageDirective } from './directives/data-table-empty-message-directive';
import { dog } from 'src/environments/environment';

@Component({
	selector: 'app-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.scss'],
	standalone: false,
	host: {
		'[class.virtual-scroll]': 'virtualScroll',
		'[class.virtual-scroll-page]': 'virtualScroll && virtualScrollMode === "page"',
		'[class.virtual-scroll-container]': 'virtualScroll && virtualScrollMode === "container"',
		'[class.is-empty]': 'isEmpty',
		// Only apply minHeight when empty/loading. With data, inline min-height:100% replaces
		// flex min-height:auto and lets ion-content.scrollx shrink the host below content —
		// table background then stops at viewport while rows overflow below it.
		'[style.min-height]': 'hostMinHeight',
	},
})
export class DataTableComponent implements OnInit {
	_allColumns: TableColumn[];
	_inputColumns: TableColumn[];
	_columnTemplates: QueryList<DataTableColumnDirective>;
	_subscriptions: Subscription[] = [];

	_selectedRows: any[] = [];

	@Input() set selectedRows(val: any[]) {
		this._selectedRows = val;
	}

	get selectedRows(): any[] {
		return this._selectedRows;
	}

	@Output() selectedRowsChange: EventEmitter<any[]> = new EventEmitter<any[]>();
	onSelectedRowsChange(event) {
		this.selectedRowsChange.emit(this.selectedRows);
		this.activate.emit(event);
	}

	@Input() set columns(val: TableColumn[]) {
		if (val) {
			this._allColumns = [...val];
		}
		this._inputColumns = val;
		this.createFilterFormGroup();
	}

	_query: any = {};
	@Input() set query(val: any) {
		const prevSkip = this._query?.Skip;
		this._query = val ?? {};
		if (val?.Skip === 0 && prevSkip > 0) {
			this.resetInfiniteScrollState();
		}
		if (this.formGroup) {
			this.formGroup.patchValue(this._query, { emitEvent: false });
			dog && console.log(this._query);

			//this.onFilterSubmit(null);
		}
		this.syncFilterIndicatorFromQuery();
	}
	filterValue: any;

	/**
	 * Header search icon reads filterValue (datatable-header-cell); without this, preset [query]
	 * does not show icons until the user submits the filter row.
	 */
	private syncFilterIndicatorFromQuery() {
		if (!this._allColumns?.length) {
			return;
		}
		const fv: Record<string, unknown> = {};
		const q = this._query || {};
		for (const col of this._allColumns) {
			if (!col.canFilter || !col.property) {
				continue;
			}
			const p = col.property;
			if (col.filterControlType === 'time-frame') {
				const from = q[p + 'From'];
				const to = q[p + 'To'];
				if ((from != null && from !== '') || (to != null && to !== '')) {
					fv[p] = true;
				}
			} else {
				const v = q[p];
				if (v != null && v !== '') {
					fv[p] = v;
				}
			}
		}
		this.filterValue = Object.keys(fv).length ? fv : undefined;
	}

	@Output() filterInputChange: EventEmitter<any> = new EventEmitter();
	onFilterInputChange(e) {
		this.filterValue = this.formGroup.getRawValue();
		this.filterInputChange.emit({ event: e, query: this.filterValue });
	}

	_rowsBeforeFilter: any[];
	@Output() filter: EventEmitter<any> = new EventEmitter();
	@Output() queryChange: EventEmitter<any> = new EventEmitter();
	onFilterSubmit(e) {
		this.filterValue = this.formGroup.getRawValue();

		this._allColumns.forEach((column) => {
			if (column.canFilter && column.property && column.filterControlType === 'time-frame') {
				this.filterValue[column.property + 'From'] = this.filterValue[column.property + 'TimeFrame'].From.Value;
				this.filterValue[column.property + 'To'] = this.filterValue[column.property + 'TimeFrame'].To.Value;
			}
		});

		// Preserve list query fields (e.g. IDOwner, Take, Skip) — filter form only has column keys;
		// emitting filterValue alone breaks [(query)] two-way binding by replacing the whole object.
		this.queryChange.emit({ ...(this._query || {}), ...this.filterValue });
		if (this.isQueryLocalOnly) {
			this._rowsBeforeFilter = this._rowsBeforeFilter || this._rows;
			this._rows = this._rowsBeforeFilter.filter((row) => {
				return Object.keys(this.filterValue).every((key) => {
					// Support nested property access for filtering
					const rowValue = lib.getNestedProperty(row, key);
					return String(rowValue).toLowerCase().includes(String(this.filterValue[key]).toLowerCase());
				});
			});
		} else {
			this.filter.emit({ event: e, query: this.filterValue });
		}
	}

	formGroup: FormGroup;
	createFilterFormGroup() {
		const group: any = {};
		this._allColumns.forEach((column) => {
			if (column.canFilter && column.property) {
				const defaultValue = column.filterControlType == 'text' ? '' : null;
				group[column.property] = new FormControl(this._query[column.property] || defaultValue);

				if (column.filterControlType === 'time-frame') {
					group[column.property + 'TimeFrame'] = this.formBuilder.group({
						From: this.formBuilder.group({
							Type: ['Relative'],
							IsPastDate: [false],
							Period: ['Day'],
							Amount: [0],
							Value: [null],
							IsNull: [true],
						}),
						To: this.formBuilder.group({
							Type: ['Relative'],
							IsPastDate: [false],
							Period: ['Day'],
							Amount: [0],
							Value: [null],
							IsNull: [true],
						}),
					});

					group[column.property + 'From'] = new FormControl(this._query[column.property + 'From'] || defaultValue);
					group[column.property + 'To'] = new FormControl(this._query[column.property + 'To'] || defaultValue);
				}
			}
		});
		this.formGroup = new FormGroup(group);
		this.syncFilterIndicatorFromQuery();
	}

	/**
	 * Column templates gathered from `ContentChildren`
	 * if described in your markup.
	 */
	@ContentChildren(DataTableColumnDirective)
	set columnTemplates(val: QueryList<DataTableColumnDirective>) {
		this._columnTemplates = val;
		this._allColumns = this.translateTemplates(val.toArray());
		this.createFilterFormGroup();
	}

	get columnTemplates(): QueryList<DataTableColumnDirective> {
		return this._columnTemplates;
	}

	/**
	 * Empty message templates gathered from `ContentChildren`
	 * if described in your markup.
	 */
	_emptyMessageTemplates: QueryList<DataTableEmptyMessageDirective>;

	@ContentChildren(DataTableEmptyMessageDirective)
	set emptyMessageTemplates(val: QueryList<DataTableEmptyMessageDirective>) {
		this._emptyMessageTemplates = val;
	}

	get emptyMessageTemplate(): DataTableEmptyMessageDirective {
		if (this._emptyMessageTemplates.length) {
			return this._emptyMessageTemplates.first;
		}
		return null;
	}

	_rows: any[];
	/**
	 * Rows that are displayed in the table.
	 */
	@Input() set rows(val: any) {
		this.syncEndOfDataFromRows(val);
		this._rows = val;
		this.showInfinitespinner = false;
		if (this._isTreeList && this.isQueryLocalOnly) {
			this.onSort([]);
		} else if (this._rows?.length && this._isTreeList && this._rows[0]?.levelSort == null) {
			lib.buildFlatTree(this._rows, []).then((resp: any) => {
				this._rows = [...resp];
			});
		}
	}

	/**
	 * Gets the data.
	 */
	get rows(): any {
		return this._rows;
	}

	_isTreeList: boolean;
	@Input() set isTreeList(val: boolean) {
		this._isTreeList = val;
		if (this._isTreeList && this.isQueryLocalOnly && this._rows.length) {
			this.onSort([]);
		}
	}

	@Input() trackBy: string;

	@Input() showFilter: boolean;
	@Input() isQueryLocalOnly: boolean;

	private _showSpinner = false;
	@Input() set showSpinner(val: boolean) {
		if (val && !this._showSpinner) {
			this.resetInfiniteScrollState();
		}
		this._showSpinner = !!val;
		if (!val) {
			this.syncEndOfDataFromRows(this._rows);
		}
	}
	get showSpinner(): boolean {
		return this._showSpinner;
	}

	private _isEndOfData = false;
	private _pendingInfiniteLoad = false;
	private _rowsAtInfiniteRequest = 0;

	/** Derived from query.Take + row growth — pages must not pass a disable flag. */
	get isInfiniteScrollDisabled(): boolean {
		if (this.isQueryLocalOnly || !this.virtualScroll) {
			return true;
		}
		const take = this.getPageSize();
		if (!take) {
			return true;
		}
		return this._isEndOfData;
	}

	private getPageSize(): number {
		const take = Number(this._query?.Take);
		return take > 0 ? take : 0;
	}

	private resetInfiniteScrollState() {
		this._isEndOfData = false;
		this._pendingInfiniteLoad = false;
		this._rowsAtInfiniteRequest = 0;
	}

	private syncEndOfDataFromRows(val: any[]) {
		const newLen = val?.length ?? 0;
		const take = this.getPageSize();

		if (this._pendingInfiniteLoad && take > 0) {
			const added = newLen - this._rowsAtInfiniteRequest;
			if (added <= 0 || added < take) {
				this._isEndOfData = true;
			}
			this._pendingInfiniteLoad = false;
			return;
		}

		if (!take || this.showSpinner) {
			return;
		}

		if (newLen === 0) {
			this._isEndOfData = true;
		} else if (newLen < take) {
			this._isEndOfData = true;
		}
	}

	/**
	 * Minimum height of the whole table (host). Default '100%' — fills the parent's height
	 * (parent must establish a definite height, e.g. flex/grid/fixed; otherwise this is a
	 * no-op, same as normal CSS `min-height:100%` behavior). Accepts any CSS length: '50%',
	 * '200px', '90vh'...
	 *
	 * Container-mode virtual scroll tables that rely on `min-height:0` to shrink inside a
	 * bounded flex ancestor should pass `[minHeight]="'0'"` to opt out of this default.
	 */
	@Input() minHeight = '100%';

	/**
	 * Drives the `.is-empty` host class (see data-table.scss) so the built-in empty message
	 * (page-message) stretches to fill `minHeight` instead of floating with dead space below it.
	 */
	get isEmpty(): boolean {
		return !!this.showSpinner || !this._rows?.length;
	}

	/** Host style binding — see host `[style.min-height]` comment. */
	get hostMinHeight(): string | null {
		if (!this.isEmpty && (this.minHeight === '100%' || this.minHeight == null || this.minHeight === '')) {
			return null;
		}
		return this.minHeight;
	}

	/** Virtual scroll for large lists. Default on — pass `[virtualScroll]="false"` to use legacy *ngFor. */
	@Input() virtualScroll = true;
	/** page = ion-content scroll (~90% list pages); container = scroll inside table (modal/picker). */
	@Input() virtualScrollMode: 'page' | 'container' = 'page';
	@Input() virtualScrollHeight = '100%';
	@Input() virtualScrollMinBufferPx = 300;
	@Input() virtualScrollMaxBufferPx = 600;
	/** Seed for the autosize averager — set close to the real row height to minimize drift. */
	@Input() virtualScrollDefaultItemSize = 51;
	/**
	 * CDK recycled views break ReactiveForms + ngx-mask (detached FormControl).
	 * Keep 0 when cells bind formControlName / app-input-control.
	 */
	@Input() virtualScrollTemplateCacheSize = 0;

	@Output() activate: EventEmitter<any> = new EventEmitter();

	@Output() dataInfinite: EventEmitter<any> = new EventEmitter();

	constructor(
		private columnChangesService: ColumnChangesService,
		public formBuilder: FormBuilder
	) {}

	ngOnInit() {}

	ngAfterContentInit() {
		this.columnTemplates.changes.subscribe((v) => this.translateColumns(v));
		this.listenForColumnInputChanges();
	}

	ngOnDestroy() {
		this._subscriptions.forEach((subscription) => subscription.unsubscribe());
	}

	showInfinitespinner = false;
	onDataInfinite(event) {
		if (this.isInfiniteScrollDisabled) {
			return;
		}
		this._pendingInfiniteLoad = true;
		this._rowsAtInfiniteRequest = this._rows?.length ?? 0;
		this.showInfinitespinner = true;
		this.dataInfinite.emit(event);
	}

	translateColumns(val: any) {
		if (val) {
			const arr = val.toArray();
			if (arr.length) {
				this._allColumns = this.translateTemplates(arr);
			}
		}
	}

	translateTemplates(templates: DataTableColumnDirective[]): any[] {
		const result: any[] = [];
		for (const temp of templates) {
			const col: any = {};
			const props = Object.getOwnPropertyNames(temp);
			for (const prop of props) {
				col[prop] = temp[prop];
			}

			if (temp.headerTemplate) {
				col.headerTemplate = temp.headerTemplate;
			}

			if (temp.filterTemplate) {
				col.filterTemplate = temp.filterTemplate;
			}

			if (temp.cellTemplate) {
				col.cellTemplate = temp.cellTemplate;
			}

			result.push(col);
		}

		return result;
	}

	private listenForColumnInputChanges(): void {
		this._subscriptions.push(
			this.columnChangesService.columnInputChanges$.subscribe(() => {
				if (this.columnTemplates) {
					this.columnTemplates.notifyOnChanges();
				}
			})
		);
	}

	@Output() sort: EventEmitter<any> = new EventEmitter();
	onSort(event) {
		if (this.isQueryLocalOnly) {
			if (this._isTreeList) {
				this._rows.forEach((row) => {
					row.Sort = null;
				});
				if (event.length) {
				} else {
					event = [{ Dimension: 'levelSort', Order: 'ASC' }];
				}
			}

			this._rows.sort((a, b) => {
				for (const e of event) {
					const comparison = e.Order === 'ASC' ? 1 : -1;
					// Support nested property access for sorting
					const aValue = lib.getNestedProperty(a, e.Dimension);
					const bValue = lib.getNestedProperty(b, e.Dimension);
					if (aValue > bValue) return comparison;
					if (aValue < bValue) return -comparison;
				}
				return 0;
			});

			if (this._isTreeList) {
				lib.buildFlatTree(this._rows, []).then((resp: any) => {
					this._rows = [...resp];
				});
			}
		} else {
			this.sort.emit(event);
		}
	}
}
