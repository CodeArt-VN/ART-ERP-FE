import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'datatable-body-row',
  templateUrl: './datatable-body-row.component.html',
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

  @Input() rowIndex: number;

  constructor() { }

  ngOnInit() {}

}
