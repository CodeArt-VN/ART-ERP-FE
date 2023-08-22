
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { TableColumn } from '../../interfaces/table-column.interface';





@Component({
    selector: 'datatable-body-cell',
    templateUrl: './datatable-body-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
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


    cellContext : any = {};
    value: any;


    constructor(private cd: ChangeDetectorRef) {

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
            }
            else {
                value = this.row[this.column.property];
            }


        }

        if (this.value !== value) {
            this.value = value;
            this.cellContext.column = this.column;
            this.cellContext.row = this.row;
            this.cellContext.value = value;
        }
    }

}