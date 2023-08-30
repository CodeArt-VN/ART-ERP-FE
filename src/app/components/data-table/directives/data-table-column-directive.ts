import { Directive, TemplateRef, ContentChild, Input, OnChanges, SimpleChanges, Injectable } from '@angular/core';
import { DataTableColumnCellDirective } from './data-table-cell-template-directive';
import { DataTableColumnFilterDirective } from './data-table-filter-template-directive';
import { DataTableColumnHeaderDirective } from './data-table-header-template-directive';
import { Subject, Observable } from 'rxjs';
import { InputControlField } from '../../controls/controls.interface';



@Directive({ selector: 'datatable-column' })
export class DataTableColumnDirective implements OnChanges {
	@Input() checkbox: boolean;
	@Input() name: string;
	@Input() property: string;
	@Input() class: string | ((data: any) => string | any);
	@Input() headerClass: string | ((data: any) => string | any);
	@Input() filterClass: string | ((data: any) => string | any);
	@Input() cellClass: string | ((data: any) => string | any);
	@Input() sticky: boolean;
	@Input() format: boolean;
	@Input() dataType: string = 'string';
	@Input() canFilter: boolean = true;
	@Input() filterControlType: 'text' | 'number' | 'email' | 'date' | 'start' | 'datetime-local' | 'select' | 'ng-select' | 'ng-select-status' | 'ng-select-bp' | 'ng-select-item' | 'textarea' | 'branch-breadcrumbs' | 'span-number' | 'span-date' | 'span-datetime' = 'text';

	@Input() filterDataSource: any[];

	@Input() canSort: boolean = true;


	@Input() minWidth: number;
	@Input() width: number;
	@Input() maxWidth: number;



	@Input('headerTemplate') _headerTemplateInput: TemplateRef<any>;

	@ContentChild(DataTableColumnHeaderDirective, { read: TemplateRef, static: true })
	_headerTemplateQuery: TemplateRef<any>;

	get headerTemplate(): TemplateRef<any> {
		return this._headerTemplateInput || this._headerTemplateQuery;
	}



	@Input('filterTemplate') _filterTemplateInput: TemplateRef<any>;

	@ContentChild(DataTableColumnFilterDirective, { read: TemplateRef, static: true })
	_filterTemplateQuery: TemplateRef<any>;

	get filterTemplate(): TemplateRef<any> {
		return this._filterTemplateInput || this._filterTemplateQuery;
	}



	@Input('cellTemplate') _cellTemplateInput: TemplateRef<any>;

	@ContentChild(DataTableColumnCellDirective, { read: TemplateRef, static: true })
	_cellTemplateQuery: TemplateRef<any>;

	get cellTemplate(): TemplateRef<any> {
		return this._cellTemplateInput || this._cellTemplateQuery;
	}


	constructor(private columnChangesService: ColumnChangesService) { }
	private isFirstChange = true;

	ngOnChanges() {
		if (this.isFirstChange) {
			this.isFirstChange = false;
		} else {
			this.columnChangesService.onInputChange();
		}
	}
}

@Injectable()
export class ColumnChangesService {
	private columnInputChanges = new Subject<void>();

	get columnInputChanges$(): Observable<void> {
		return this.columnInputChanges.asObservable();
	}

	onInputChange(): void {
		this.columnInputChanges.next();
	}
}



