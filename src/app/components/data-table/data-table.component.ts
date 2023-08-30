import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { ColumnChangesService, DataTableColumnDirective } from './directives/data-table-column-directive';
import { TableColumn } from './interfaces/table-column.interface';
import { Subscription } from 'rxjs';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
	_allColumns: TableColumn[];
	_inputColumns: TableColumn[];
	_columnTemplates: QueryList<DataTableColumnDirective>;
	_subscriptions: Subscription[] = [];

	@Input() selectedRows: any[] = [];
	@Output() selectedRowsChange: EventEmitter<any[]> = new EventEmitter<any[]>();
	onSelectedRowsChange(event) {
		this.selectedRowsChange.emit(this.selectedRows);
		this.activate.emit(event)
	}

	@Input() set columns(val: TableColumn[]) {
		if (val) {
			this._allColumns = [...val];
		}
		this._inputColumns = val;
		this.createFilterFormGroup();
	}


	@Input() query: any = {};
	filterValue: any;

	@Output() filterInputChange: EventEmitter<any> = new EventEmitter();
	onFilterInputChange(e) {
		this.filterValue = this.formGroup.getRawValue();
		this.filterInputChange.emit({ event: e, query: this.filterValue });

	}

	@Output() filter: EventEmitter<any> = new EventEmitter();
	onFilterSubmit(e) {
		this.filterValue = this.formGroup.getRawValue();
		this.filter.emit({ event: e, query: this.filterValue });
	}

	formGroup: FormGroup;
	createFilterFormGroup() {
		const group: any = {};
		this._allColumns.forEach(column => {
			if (column.canFilter && column.property) {
				group[column.property] = new FormControl(this.query[column.property] || '');
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

	_rows: any[];
	/**
	   * Rows that are displayed in the table.
	   */
	@Input() set rows(val: any) {
		this._rows = val;
	}

	/**
	 * Gets the data.
	 */
	get rows(): any {
		this.showInfinitespinner = false;
		return this._rows;
	}

	@Input() trackBy: string;

	@Input() showSpinner: boolean;
	@Input() showFilter: boolean;



	@Output() activate: EventEmitter<any> = new EventEmitter();

	@Output() dataInfinite: EventEmitter<any> = new EventEmitter();

	constructor(private columnChangesService: ColumnChangesService,
	) { }

	ngOnInit() { }

	ngAfterContentInit() {
		this.columnTemplates.changes.subscribe(v => this.translateColumns(v));
		this.listenForColumnInputChanges();
	}

	ngOnDestroy() {
		this._subscriptions.forEach(subscription => subscription.unsubscribe());
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

	@Output() sort: EventEmitter<any> = new EventEmitter();
	onSort(event) {
		this.sort.emit(event);
	}

}


