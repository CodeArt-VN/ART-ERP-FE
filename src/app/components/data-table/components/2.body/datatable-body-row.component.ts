import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'datatable-body-row',
	templateUrl: './datatable-body-row.component.html',
	standalone: false,
})
export class DataTablBodyRowComponent implements OnInit {
	_columns: any[];
	@Input() set columns(val: any[]) {
		this._columns = val;
	}

	get columns(): any[] {
		return this._columns;
	}

	_row: any[];
	@Input() set row(val: any[]) {
		this._row = val;
	}

	get row(): any[] {
		return this._row;
	}

	_isSelected: boolean;
	@Input() set isSelected(val: boolean) {
		this._isSelected = val;
	}

	get isSelected(): boolean {
		return this._isSelected;
	}

	@Input() rowIndex: number;

	constructor(element: ElementRef) {
		this._element = element.nativeElement;
	}

	ngOnInit() {}

	@Output() activate: EventEmitter<any> = new EventEmitter();
	_element: any;
	onActivate(event: any, index: number): void {
		event.cellIndex = index;
		event.rowElement = this._element;
		this.activate.emit(event);
	}
}
