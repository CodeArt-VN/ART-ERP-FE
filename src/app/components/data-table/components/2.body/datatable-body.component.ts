import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { filter } from 'rxjs';
import { lib } from 'src/app/services/static/global-functions';

@Component({
    selector: 'datatable-body',
    templateUrl: './datatable-body.component.html',
})
export class DataTablBodyComponent implements OnInit {
    //@ViewChild('scrollViewport') private cdkVirtualScrollViewport;
    @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;

    _columns: any[];
    @Input() set columns(val: any[]) {
        this._columns = val;

    }

    get columns(): any[] {
        return this._columns;
    }

    _rows: any[];
    @Input() set rows(val: any[]) {
        this._rows = val;
        this.isWaitingNewData = false;
    }

    get rows(): any[] {
        return this._rows;
    }

    @Input() trackBy: string;

    rowTrackingFn(index: number, row: any) {
        if (this.trackBy) {
            return row[this.trackBy];
        } else {
            return this._rows.indexOf(row);
        }
    }

    @Input() selectedRows: any[] = [];
    @Output() selectedRowsChange: EventEmitter<any[]> = new EventEmitter<any[]>();

    @Input() showSpinner: boolean;

    @Output() activate: EventEmitter<any> = new EventEmitter();

    @Output() dataInfinite: EventEmitter<any> = new EventEmitter();

    elId = '';

    constructor(private scrollDispatcher: ScrollDispatcher) {
        this.elId = lib.generateUID();
    }

    ngOnInit() { }

    isWaitingNewData = false;
    ngAfterViewInit() {
        // let wrapperEl;
        // let spacerEl;

        // this.scrollDispatcher.scrolled().pipe(
        //     filter(event => this.virtualScroll?.getRenderedRange().end === this.virtualScroll?.getDataLength())
        // ).subscribe(event => {
        //     if (this.isWaitingNewData === false) {
        //         this.dataInfinite.emit({ DataLength: this.virtualScroll.getDataLength() });
        //         this.isWaitingNewData = true;
        //         if (!wrapperEl) {
        //             wrapperEl = this.virtualScroll.elementRef.nativeElement.querySelector('.cdk-virtual-scroll-content-wrapper');
        //             spacerEl = this.virtualScroll.elementRef.nativeElement.querySelector('.cdk-virtual-scroll-spacer');
        //         }
        //     }

        //     let offset = this.virtualScroll.getOffsetToRenderedContentStart();
        //     if (spacerEl && spacerEl.clientHeight < (wrapperEl.scrollHeight + offset)) {
        //         spacerEl.style.height = `${wrapperEl.scrollHeight + offset}px`;
        //     }

        // })
    }

    lastchecked: any = null;
    changeSelection(i, e = null) {
        if (e && e.shiftKey) {
            let from = this._rows.indexOf(this.lastchecked);
            let to = this._rows.indexOf(i);

            let start = Math.min(from, to);
            let end = Math.max(from, to) + 1;

            let itemsToCheck = this._rows.slice(start, end);
            for (let j = 0; j < itemsToCheck.length; j++) {
                const it = itemsToCheck[j];


                it.checked = this.lastchecked.checked;
                const index = this.selectedRows.indexOf(it, 0);

                if (this.lastchecked.checked && index == -1) {
                    this.selectedRows.push(it);
                }
                else if (!this.lastchecked.checked && index > -1) {
                    this.selectedRows.splice(index, 1);
                }

            }

        }
        else if (e) {
            if (e.target.checked) {
                this.selectedRows.push(i);
            }
            else {
                const index = this.selectedRows.indexOf(i, 0);
                if (index > -1) {
                    this.selectedRows.splice(index, 1);
                }
            }
        }
        else {
            if (i.checked) {
                this.selectedRows.push(i);
            }
            else {
                const index = this.selectedRows.indexOf(i, 0);
                if (index > -1) {
                    this.selectedRows.splice(index, 1);
                }
            }
        }

        this.selectedRows = [...this.selectedRows];
        this.lastchecked = i;

        //e?.preventDefault();
        e?.stopPropagation();


        this.selectedRowsChange.emit(this.selectedRows);

        this.activate.emit({ event: e, selectedItems: this.selectedRows });
    }

}
