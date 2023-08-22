import { Directive, TemplateRef, ContentChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataTableColumnCellDirective } from './data-table-cell-template-directive';
import { DataTableColumnHeaderDirective } from './data-table-header-template-directive';


@Directive({ selector: 'datatable-column' })
export class DataTableColumnDirective implements OnChanges {
  @Input() checkbox: boolean;
  @Input() name: string;
  @Input() property: string;
  @Input() class: string | ((data: any) => string | any);
  @Input() sticky: boolean;

  @Input() sortable: boolean;
  

  @Input() minWidth: number;
  @Input() width: number;
  @Input() maxWidth: number;




  @Input('cellTemplate') _cellTemplateInput: TemplateRef<any>;

  @ContentChild(DataTableColumnCellDirective, { read: TemplateRef, static: true })
  _cellTemplateQuery: TemplateRef<any>;

  get cellTemplate(): TemplateRef<any> {
    return this._cellTemplateInput || this._cellTemplateQuery;
  }

  @Input('headerTemplate') _headerTemplateInput: TemplateRef<any>;

  @ContentChild(DataTableColumnHeaderDirective, { read: TemplateRef, static: true })
  _headerTemplateQuery: TemplateRef<any>;

  get headerTemplate(): TemplateRef<any> {
    return this._headerTemplateInput || this._headerTemplateQuery;
  }


  constructor() {}

  ngOnChanges() {
 
  }
}





