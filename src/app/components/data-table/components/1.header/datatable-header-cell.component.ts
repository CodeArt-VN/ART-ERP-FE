
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { TableColumn } from '../../interfaces/table-column.interface';





@Component({
    selector: 'datatable-header-cell',
    templateUrl: './datatable-header-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableHeaderCellComponent {
    _column: TableColumn;
 
    @Input() set column(column: TableColumn) {
        this._column = column;
    }


    get column(): TableColumn {
        return this._column;
    }

    @HostBinding('style.height.px')
    @Input() headerHeight: number;

    @Output() sort: EventEmitter<any> = new EventEmitter();
    @Output() select: EventEmitter<any> = new EventEmitter();
    @Output() columnContextmenu = new EventEmitter<{ event: MouseEvent; column: any }>(false);

    @HostBinding('class')
    get columnCssClasses(): any {
        let cls = 'datatable-header-cell';
        return cls;
    }

    @HostBinding('attr.title')
    get name(): string {
        // guaranteed to have a value by setColumnDefaults() in column-helper.ts
        return this.column.headerTemplate === undefined ? this.column.name : undefined;
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