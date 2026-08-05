import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableColumn } from '../../interfaces/table-column.interface';
import { columnMaxWidth, columnMinWidth } from '../../column-width.util';

@Component({
	selector: 'datatable-filter-cell',
	templateUrl: './datatable-filter-cell.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false,
})
export class DataTableFilterCellComponent implements OnInit, OnChanges, OnDestroy {
	_column: TableColumn;

	@Input() set column(column: TableColumn) {
		this._column = column;
	}

	get column(): TableColumn {
		return this._column;
	}

	@Input() field: any;

	@Output() filterInputChange: EventEmitter<any> = new EventEmitter();
	onFilterInputChange(e) {
		this.filterInputChange.emit(e);
	}

	@Output() filterFieldReset: EventEmitter<any> = new EventEmitter();
	onFilterFieldReset() {
		if (this.field.type === 'time-frame') {
			this.field.form.controls.From.controls.IsNull.setValue(true);
			this.field.form.controls.From.controls.Value.setValue(null);
			this.field.form.controls.To.controls.IsNull.setValue(true);
			this.field.form.controls.To.controls.Value.setValue(null);
		} else {
			// Use bracket notation to support nested property keys with dots
			const control = this.field.form.controls[this.field.id];
			if (control) {
				if (this.field.type === 'text') control.setValue('');
				else control.setValue(null);
			}
		}

		this.filterFieldReset.emit();
		this.cd.markForCheck();
	}

	@Output() sort: EventEmitter<any> = new EventEmitter();
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
		if (this.column.filterClass) {
			cls += ' ' + this.column.filterClass;
		}

		if (this.field.type === 'time-frame') {
			cls += ' time-frame';
		}

		return cls;
	}

	@HostBinding('attr.title')
	get name(): string {
		// guaranteed to have a value by setColumnDefaults() in column-helper.ts
		return this.column.filterTemplate === undefined ? this.column.name : undefined;
	}

	@HostBinding('style.min-width')
	get minWidth(): string | null {
		return columnMinWidth(this.column);
	}

	@HostBinding('style.max-width')
	get maxWidth(): string | null {
		return columnMaxWidth(this.column);
	}

	private formWatch?: Subscription;
	private watchedForm: any;

	constructor(private cd: ChangeDetectorRef) {}

	ngOnInit() {
		this.watchForm();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['field']) {
			this.watchForm();
		}
	}

	ngOnDestroy() {
		this.formWatch?.unsubscribe();
	}

	/** Clear-from-empty-state mutates FormControls outside this OnPush cell — must markForCheck. */
	private watchForm() {
		const form = this.field?.form;
		if (!form?.valueChanges || form === this.watchedForm) {
			return;
		}
		this.formWatch?.unsubscribe();
		this.watchedForm = form;
		this.formWatch = form.valueChanges.subscribe(() => this.cd.markForCheck());
	}

	hasFilterValue(): boolean {
		if (!this.field?.form || !this.field?.id) {
			return false;
		}
		// For nested properties with dots, use direct bracket notation
		// because FormGroup.get() interprets dots as nested path
		const control = this.field.form.controls[this.field.id];
		return control ? !!control.value : false;
	}
}
