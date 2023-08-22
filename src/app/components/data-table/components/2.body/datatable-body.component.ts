import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'datatable-body',
  templateUrl: './datatable-body.component.html',
})
export class DataTablBodyComponent implements OnInit {
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
  }

  get rows(): any[] {
    return this._rows;
  }

  @Input() showSpinner: boolean;

  constructor() { }

  ngOnInit() {}

}
