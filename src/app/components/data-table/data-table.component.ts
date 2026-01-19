import { Component, ContentChild, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { ColumnChangesService, DataTableColumnDirective } from './directives/data-table-column-directive';
import { TableColumn } from './interfaces/table-column.interface';
import { Subscription } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { lib } from 'src/app/services/static/global-functions';
import { DataTableEmptyMessageDirective } from './directives/data-table-empty-message-directive';
import { dog } from 'src/environments/environment';
import { EnvService } from 'src/app/services/core/env.service';
import { SYS_ConfigService } from 'src/app/services/custom/system-config.service';
import { EVENT_TYPE } from 'src/app/services/static/event-type';

@Component({
	selector: 'app-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.scss'],
	standalone: false,
})
export class DataTableComponent implements OnInit {
	private static rowLineClampState = {
		branch: null as any,
		mode: null as string | null,
		loading: null as Promise<void> | null,
	};

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
		this._query = val;
		if (this.formGroup) {
			this.formGroup.patchValue(this._query);
			dog && console.log(this._query);

			//this.onFilterSubmit(null);
		}
	}
	filterValue: any;

	@Output() filterInputChange: EventEmitter<any> = new EventEmitter();
	onFilterInputChange(e) {
		this.filterValue = this.formGroup.getRawValue();
		this.filterInputChange.emit({ event: e, query: this.filterValue });
	}

	_rowsBeforeFilter: any[];
	@Output() filter: EventEmitter<any> = new EventEmitter();
	onFilterSubmit(e) {
		this.filterValue = this.formGroup.getRawValue();

		this._allColumns.forEach((column) => {
			if (column.canFilter && column.property && column.filterControlType === 'time-frame') {
				this.filterValue[column.property + 'From'] = this.filterValue[column.property + 'TimeFrame'].From.Value;
				this.filterValue[column.property + 'To'] = this.filterValue[column.property + 'TimeFrame'].To.Value;
			}
		});

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
		this._rows = val;
		if (this._isTreeList && this.isQueryLocalOnly) {
			this.onSort([]);
		} else if (this._rows && this._rows.length && this._isTreeList) {
			lib.buildFlatTree(this._rows, []).then((resp: any) => {
				this._rows = [...resp];
			});
		}
	}

	/**
	 * Gets the data.
	 */
	get rows(): any {
		this.showInfinitespinner = false;
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

	@Input() showSpinner: boolean;
	@Input() showFilter: boolean;
	@Input() isQueryLocalOnly: boolean;

	@Output() activate: EventEmitter<any> = new EventEmitter();

	@Output() dataInfinite: EventEmitter<any> = new EventEmitter();

	constructor(
		private columnChangesService: ColumnChangesService,
		public formBuilder: FormBuilder,
		private env: EnvService,
		private sysConfigService: SYS_ConfigService
	) {}

	ngOnInit() {
		this.loadRowLineClampConfig();
		this._subscriptions.push(
			this.env.getEvents().subscribe((data) => {
				if (data.Code === EVENT_TYPE.TENANT.BRANCH_SWITCHED) {
					this.loadRowLineClampConfig(true);
				}
			})
		);
	}

	ngAfterContentInit() {
		this.columnTemplates.changes.subscribe((v) => this.translateColumns(v));
		this.listenForColumnInputChanges();
	}

	ngOnDestroy() {
		this._subscriptions.forEach((subscription) => subscription.unsubscribe());
	}

	showInfinitespinner = false;
	onDataInfinite(event) {
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

	private loadRowLineClampConfig(force = false) {
		const branchId = this.env?.selectedBranch ?? null;
		if (branchId == null) {
			this.env?.ready?.then(() => this.loadRowLineClampConfig(true));
			return;
		}
		if (!force && DataTableComponent.rowLineClampState.branch === branchId) {
			this.applyRowLineClamp(DataTableComponent.rowLineClampState.mode);
			return;
		}
		if (DataTableComponent.rowLineClampState.loading) {
			return;
		}

		DataTableComponent.rowLineClampState.loading = this.sysConfigService
			.getConfig(branchId, ['UIDatatableRowLineClamp'])
			.then((config) => {
				const mode = this.normalizeRowLineClampConfig(config);
				DataTableComponent.rowLineClampState.branch = branchId;
				DataTableComponent.rowLineClampState.mode = mode;
				this.applyRowLineClamp(mode);
			})
			.finally(() => {
				DataTableComponent.rowLineClampState.loading = null;
			});
	}

	private normalizeRowLineClampConfig(config: any): string | null {
		const value = config?.UIDatatableRowLineClamp;
		if (!value) return null;
		if (typeof value === 'string') return value;
		return value?.Code || value?.Value || null;
	}

	private applyRowLineClamp(mode?: string | null) {
		const root = document.documentElement;
		root.classList.remove('datatable-row-line-clamp-two-lines', 'datatable-row-line-clamp-wrap');
		root.removeAttribute('data-datatable-row-line-clamp');

		if (!mode) return;
		const normalized = String(mode).toLowerCase().replace(/\s+/g, '');
		if (normalized === '1line') {
			return;
		}
		if (normalized === 'wrap') {
			root.setAttribute('data-datatable-row-line-clamp', 'wrap');
		} else if (normalized === '2lines') {
			root.setAttribute('data-datatable-row-line-clamp', '2lines');
		}
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
