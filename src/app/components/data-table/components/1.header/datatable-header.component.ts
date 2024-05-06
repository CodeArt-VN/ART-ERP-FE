import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SortConfig, Transform } from 'src/app/models/options-interface';

@Component({
  selector: 'datatable-header',
  templateUrl: './datatable-header.component.html',
})
export class DataTableHeaderComponent implements OnInit {
  _columns: any[];
  @Input() set columns(val: any[]) {
    this._columns = val;
  }
  get columns(): any[] {
    return this._columns;
  }

  _filterValue: any;
  @Input() set filterValue(val: any[]) {
    this._filterValue = val;
  }

  @Input() isFilter: boolean = false;
  @Input() formGroup: FormGroup;

  _query : any = {};
  @Input() set query(val: any) {
    this._query = val;
  }

  constructor() {}

  ngOnInit() {}

  @Output() filterInputChange: EventEmitter<any> = new EventEmitter();
  onFilterInputChange(e) {
    this.filterInputChange.emit(e);
  }

  @Output() filterFieldReset: EventEmitter<any> = new EventEmitter();
  onFilterFieldReset() {
    this.filterFieldReset.emit();
  }

  dataTransform: Transform = {
    Filter: {},
    Sort: [],
  };

  @Output() sort: EventEmitter<any> = new EventEmitter();
  onSort(event: SortConfig) {
    let sortElment = this.dataTransform.Sort.find((d) => d.Dimension == event.Dimension);
    if (!sortElment) {
      this.dataTransform.Sort.push(event);
    } else {
      sortElment.Order = event.Order;
    }
    this.dataTransform.Sort = this.dataTransform.Sort.filter((d) => d.Order != '');

    this.sort.emit(this.dataTransform.Sort);
  }
}
