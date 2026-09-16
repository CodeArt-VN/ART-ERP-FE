import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { TableColumn } from '../../interfaces/table-column.interface';
import { SortConfig } from 'src/app/interfaces/options-interface';
import { columnMaxWidth, columnMinWidth } from '../../column-width.util';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'datatable-header-cell',
	templateUrl: './datatable-header-cell.component.html',
	standalone: false,
})
export class DataTableHeaderCellComponent {
	_column: TableColumn;

	@Input() set column(column: TableColumn) {
		this._column = column;
	}

	get column(): TableColumn {
		return this._column;
	}

	@Input() filterValue: any = {};

	@HostBinding('style.height.px')
	@Input()
	headerHeight: number;
	@Output() select: EventEmitter<any> = new EventEmitter();
	@Output() columnContextmenu = new EventEmitter<{
		event: MouseEvent;
		column: any;
	}>(false);

	@HostBinding('class')
	get columnCssClasses(): any {
		let cls = '';
		if (this.column.class) {
			cls += ' ' + this.column.class;
		}
		if (this.column.headerClass) {
			cls += ' ' + this.column.headerClass;
		}

		return cls;
	}

	@HostBinding('attr.title')
	get name(): string {
		// guaranteed to have a value by setColumnDefaults() in column-helper.ts
		return this.column.headerTemplate === undefined ? this.column.name : undefined;
	}

	@HostBinding('style.min-width')
	get minWidth(): string | null {
		return columnMinWidth(this.column);
	}

	@HostBinding('style.max-width')
	get maxWidth(): string | null {
		return columnMaxWidth(this.column);
	}

	constructor(private cd: ChangeDetectorRef) {}

	ngOnInit() {}

	@Input() sortOrder: 'ASC' | 'DESC' | '' = '';

	@Output() sort: EventEmitter<any> = new EventEmitter();

	onSort() {
		if (!this._column.canSort) return;

		if (!this.sortOrder) this.sortOrder = 'ASC';
		else if (this.sortOrder == 'ASC') this.sortOrder = 'DESC';
		else this.sortOrder = '';

		let sortElment: SortConfig = {
			Dimension: this.column.property,
			Order: this.sortOrder,
		};
		this.sort.emit(sortElment);
	}
}
