import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'datatable-header',
  templateUrl: './datatable-header.component.html',
})
export class DataTableHeaderComponent implements OnInit {
  _columns: any[];
  @Input() set columns(val: any[]) {
    this._columns = val;
    console.log(val);

  }

  get columns(): any[] {
    return this._columns;
  }

  constructor() { }

  ngOnInit() { }

}
