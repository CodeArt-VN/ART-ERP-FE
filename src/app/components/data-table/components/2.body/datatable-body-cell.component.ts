import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, EventEmitter, HostBinding, inject, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TableColumn } from '../../interfaces/table-column.interface';
import { InputControlField } from '../../../controls/controls.interface';
import { lib } from 'src/app/services/static/global-functions';
import { columnMaxWidth, columnMinWidth } from '../../column-width.util';
import { HistoryService } from 'src/app/services/custom/history.service';

@Component({
	selector: 'datatable-body-cell',
	templateUrl: './datatable-body-cell.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false,
})
export class DataTableBodyCellComponent implements DoCheck {
	historyService = inject(HistoryService);
	private _lastHighlightRevision = -1;

	_column: TableColumn;

	@Input() set column(column: TableColumn) {
		this._column = column;
		this.refreshEditorField();
	}

	get column(): TableColumn {
		return this._column;
	}

	_row: any;
	@Input() set row(val: any) {
		this._row = val;
		this.checkValueUpdates();
		this.refreshEditorField();
	}

	get row(): any {
		return this._row;
	}

	_rowIndex: number;
	@Input() set rowIndex(val: number) {
		this._rowIndex = val;
		// CDK virtual scroll recycles views — rowIndex often updates after row; must recompute "#"
		this.checkValueUpdates();
		this.cd.markForCheck();
	}

	get rowIndex(): number {
		return this._rowIndex;
	}

	_isSelected: boolean;
	@Input() set isSelected(val: boolean) {
		this._isSelected = val;
		this.cellContext.isSelected = val;
		this.cd.markForCheck();
	}

	get isSelected(): boolean {
		return this._isSelected;
	}

	_editable: false | 'always' | 'inline' | 'incell' | 'external' = false;
	@Input() set editable(val: false | 'always' | 'inline' | 'incell' | 'external') {
		this._editable = val || false;
		this.refreshEditorField();
	}
	get editable(): false | 'always' | 'inline' | 'incell' | 'external' {
		return this._editable;
	}

	get format(): string {
		return this._column?.format;
	}

	get dataType(): string {
		if (this.format?.indexOf('1') > -1) return 'number';
		if (this.format?.indexOf('yy') > -1 || this.format?.indexOf('HH') > -1) return 'date';
		return 'string';
	}

	@HostBinding('style.min-width')
	get minWidth(): string | null {
		return columnMinWidth(this.column);
	}

	@HostBinding('style.max-width')
	get maxWidth(): string | null {
		return columnMaxWidth(this.column);
	}

	cellContext: any = {};
	value: any;
	editorField: InputControlField | null = null;

	private _element: any;

	@HostBinding('class.history-changed-cell')
	get historyChangedCell(): boolean {
		if (!this.historyService.active || !this.row || !this.column) return false;
		const lineId = this.historyService.getLineIdentity(this.row);
		if (!lineId) return false;
		const fields = this.historyService.changedLineFields.get(lineId);
		if (!fields?.size) return false;
		const fieldId = this.column.property;
		if (!fieldId || fieldId === '#' || fieldId === 'value') return false;
		return fields.has(fieldId);
	}

	/** Built-in always-edit when no cellTemplate and row is a FormGroup. */
	get showAlwaysEditor(): boolean {
		if (this._editable !== 'always' || !this.column) return false;
		if (this.column.cellTemplate) return false;
		if (this.column.editable === false) return false;
		if (this.column.checkbox) return false;
		if (!this.column.property || this.column.property === '#' || this.column.property === 'value') return false;
		return typeof this.row?.get === 'function';
	}

	constructor(
		element: ElementRef,
		private cd: ChangeDetectorRef
	) {
		this._element = element.nativeElement;
	}

	ngOnInit() {
		this.checkValueUpdates();
		this.refreshEditorField();
	}

	ngDoCheck() {
		const rev = this.historyService.highlightRevision;
		if (rev !== this._lastHighlightRevision) {
			this._lastHighlightRevision = rev;
			this.cd.markForCheck();
		}
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
				value = (this.rowIndex ?? 0) + 1;
			} else if (typeof this.row?.get === 'function') {
				value = this.row.get(this.column.property)?.value;
			} else {
				// Support nested property access (e.g., '_SaleOrder.DailyBillNo')
				value = lib.getNestedProperty(this.row, this.column.property);
			}
		}

		this.value = value;
		this.cellContext.column = this.column;
		this.cellContext.row = this.row;
		this.cellContext.value = value;
		this.cellContext.idx = this.rowIndex;
		this.cd.markForCheck();
	}

	private refreshEditorField(): void {
		if (!this.showAlwaysEditor) {
			this.editorField = null;
			return;
		}

		const extra =
			typeof this.column.editorField === 'function'
				? this.column.editorField(this.row) || {}
				: this.column.editorField || {};

		const editorType =
			this.column.editor ||
			(this.dataType === 'number' ? 'number' : this.dataType === 'date' ? 'date' : 'text');

		this.editorField = {
			...extra,
			id: this.column.property,
			type: editorType,
			form: this.row as FormGroup,
		};
		this.cd.markForCheck();
	}

	@Output() activate: EventEmitter<any> = new EventEmitter();
	@Output() cellChange = new EventEmitter<{
		row: any;
		rowIndex: number;
		property: string;
		column: TableColumn;
		event?: any;
	}>();

	changeSelection(i: any, event: any): void {
		i.checked = !i.checked;
		this.activate.emit(event);
	}

	onEditorChange(event?: any): void {
		this.cellChange.emit({
			row: this.row,
			rowIndex: this.rowIndex,
			property: this.column.property,
			column: this.column,
			event,
		});
	}
}
