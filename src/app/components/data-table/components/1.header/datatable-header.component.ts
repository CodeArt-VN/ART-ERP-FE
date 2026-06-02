import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SortConfig, Transform } from 'src/app/interfaces/options-interface';

@Component({
	selector: 'datatable-header',
	templateUrl: './datatable-header.component.html',
	standalone: false,
})
export class DataTableHeaderComponent implements OnInit {
	_columns: any[];
	@Input() set columns(val: any[]) {
		this._columns = val;
	}
	get columns(): any[] {
		return this._columns;
	}

	_filterValue: any;
	@Input() set filterValue(val: any[]) {
		this._filterValue = val;
	}

	@Input() isFilter: boolean = false;
	@Input() formGroup: FormGroup;

	_query: any = {};
	@Input() set query(val: any) {
		this._query = val ?? {};
	}

	constructor() {}

	ngOnInit() {}

	/** PageBase ghi SortBy (chuỗi), không gắn Sort[]; đọc SortBy mỗi lần vì query hay bị mutate tại chỗ sau load. */
	getSortOrder(column: any): 'ASC' | 'DESC' | '' {
		const list = this.getSortListFromQuery();
		const order = list.find((s: any) => s.Dimension === column?.property)?.Order;
		return (order as 'ASC' | 'DESC') || '';
	}

	private getSortListFromQuery(): SortConfig[] {
		if (Array.isArray(this._query?.Sort) && this._query.Sort.length) {
			return this._query.Sort;
		}
		return this.parseSortByString(this._query?.SortBy);
	}

	/** SortBy: [Dim, Dim_desc, …] hoặc Dim_desc — khớp PageBase.parseSort. */
	private parseSortByString(sortBy: string | undefined | null): SortConfig[] {
		if (sortBy == null || typeof sortBy !== 'string') {
			return [];
		}
		let s = sortBy.trim();
		if (!s) {
			return [];
		}
		if (s.startsWith('[') && s.endsWith(']')) {
			s = s.slice(1, -1).trim();
		}
		if (!s) {
			return [];
		}
		return s
			.split(',')
			.map((part) => part.trim())
			.filter(Boolean)
			.map((term) => {
				if (term.endsWith('_desc')) {
					return { Dimension: term.slice(0, -5), Order: 'DESC' as const };
				}
				return { Dimension: term, Order: 'ASC' as const };
			});
	}

	@Output() filterInputChange: EventEmitter<any> = new EventEmitter();
	onFilterInputChange(e) {
		this.filterInputChange.emit(e);
	}

	@Output() filterFieldReset: EventEmitter<any> = new EventEmitter();
	onFilterFieldReset() {
		this.filterFieldReset.emit();
	}

	dataTransform: Transform = {
		Filter: {},
		Sort: [],
	};

	@Output() sort: EventEmitter<any> = new EventEmitter();
	onSort(event: SortConfig) {
		if (!this.dataTransform.Sort?.length) {
			this.dataTransform.Sort = this.getSortListFromQuery().filter((s) => s.Order);
		}
		let sortElment = this.dataTransform.Sort.find((d) => d.Dimension == event.Dimension);
		if (!sortElment) {
			this.dataTransform.Sort.push(event);
		} else {
			sortElment.Order = event.Order;
		}
		this.dataTransform.Sort = this.dataTransform.Sort.filter((d) => d.Order != '');

		this.sort.emit(this.dataTransform.Sort);
	}
}
