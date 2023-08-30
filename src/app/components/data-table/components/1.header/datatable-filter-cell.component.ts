
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { TableColumn } from '../../interfaces/table-column.interface';





@Component({
    selector: 'datatable-filter-cell',
    templateUrl: './datatable-filter-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableFilterCellComponent {
    _column: TableColumn;

    @Input() set column(column: TableColumn) {
        this._column = column;
    }

    get column(): TableColumn {
        return this._column;
    }

    @Input() field: any;

    @Output() filterInputChange: EventEmitter<any> = new EventEmitter();
    onFilterInputChange(e){
		this.filterInputChange.emit(e);
	}

    @Output() filterFieldReset: EventEmitter<any> = new EventEmitter();
    onFilterFieldReset(){
        this.field.form.get(this.field.id).setValue('');
        this.filterFieldReset.emit();
    }


    @Output() sort: EventEmitter<any> = new EventEmitter();
    @Output() select: EventEmitter<any> = new EventEmitter();
    @Output() columnContextmenu = new EventEmitter<{ event: MouseEvent; column: any }>(false);

    @HostBinding('class')
    get columnCssClasses(): any {
        let cls = '';
        if (this.column.class) {
            cls += ' ' + this.column.class;
        }
        if (this.column.filterClass) {
            cls += ' ' + this.column.filterClass;
        }

        return cls;
    }

    @HostBinding('attr.title')
    get name(): string {
        // guaranteed to have a value by setColumnDefaults() in column-helper.ts
        return this.column.filterTemplate === undefined ? this.column.name : undefined;
    }

    @HostBinding('style.minWidth.px')
    get minWidth(): number {
        return this.column.minWidth;
    }

    @HostBinding('style.maxWidth.px')
    get maxWidth(): number {
        return this.column.maxWidth;
    }

    @HostBinding('style.width.px')
    get width(): number {
        return this.column.width;
    }


    constructor(private cd: ChangeDetectorRef) {

    }

    ngOnInit() {

    }

 

    

}