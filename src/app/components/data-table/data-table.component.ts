import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { DataTableColumnDirective } from './directives/data-table-column-directive';
import { TableColumn } from './interfaces/table-column.interface';

@Component({
	selector: 'app-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
	_allColumns: TableColumn[];
	_inputColumns: TableColumn[];
	_templateColumns: QueryList<DataTableColumnDirective>;




	@Input() set columns(val: TableColumn[]) {
		if (val) {
			this._allColumns = [...val];
		}

		this._inputColumns = val;
		console.log('set columns');

	}



	/**
	 * Column templates gathered from `ContentChildren`
	 * if described in your markup.
	 */
	@ContentChildren(DataTableColumnDirective)
	set columnTemplates(val: QueryList<DataTableColumnDirective>) {
		this._templateColumns = val;
		console.log('set columnTemplates');
		this._allColumns = this.translateTemplates(val.toArray());
	}

	_data: any[];
	/**
	   * Rows that are displayed in the table.
	   */
	@Input() set data(val: any) {
		this._data = val;
	}

	/**
	 * Gets the data.
	 */
	get data(): any {
		return this._data;
	}

	@Input() showSpinner: boolean;

	constructor() { }

	ngOnInit() { }


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

			if (temp.cellTemplate) {
				col.cellTemplate = temp.cellTemplate;
			}

			result.push(col);
		}

		console.log(result);
		return result;

	}

}


