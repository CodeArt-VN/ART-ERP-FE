import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { TableColumn } from '../../interfaces/table-column.interface';

@Component({
	selector: 'datatable-body-cell',
	templateUrl: './datatable-body-cell.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false,
})
export class DataTableBodyCellComponent {
	_column: TableColumn;

	@Input() set column(column: TableColumn) {
		this._column = column;
	}

	get column(): TableColumn {
		return this._column;
	}

	_row: any[];
	@Input() set row(val: any[]) {
		this._row = val;
		this.checkValueUpdates();
	}

	get row(): any[] {
		return this._row;
	}

	@Input() rowIndex: number;

	_isSelected: boolean;
	@Input() set isSelected(val: boolean) {
		this._isSelected = val;
		this.cellContext.isSelected = val;
		this.cd.markForCheck();
	}

	get isSelected(): boolean {
		return this._isSelected;
	}

	get format(): string {
		return this._column.format;
	}

	get dataType(): string {
		if (this.format?.indexOf('1') > -1) return 'number';
		if (this.format?.indexOf('yy') > -1 || this.format?.indexOf('HH')) return 'date';
		return 'string';
	}

	cellContext: any = {};
	value: any;

	private _element: any;

	constructor(
		element: ElementRef,
		private cd: ChangeDetectorRef
	) {
		this._element = element.nativeElement;
	}

	ngOnInit() {
		this.checkValueUpdates();
	}

	checkValueUpdates(): void {
		let value: any = '';

		if (!this.row || !this.column) {
			value = '';
		} else {
			if (!this.column.property) {
				this.column.property = this.column.name;
			}

			if (this.column.property == '#') {
				value = this.rowIndex + 1;
			} else {
				value = this.row[this.column.property];
			}
		}

		if (this.value !== value) {
			this.value = value;
			this.cellContext.column = this.column;
			this.cellContext.row = this.row;
			this.cellContext.value = value;
		}

		this.cellContext.idx = this.rowIndex;
	}

	@Output() activate: EventEmitter<any> = new EventEmitter();
	changeSelection(i: any, event: any): void {
		i.checked = !i.checked;
		this.activate.emit(event);
	}
}
