import { TemplateRef, Directive } from '@angular/core';

@Directive({ selector: '[datatable-cell-template]' })
export class DataTableColumnCellDirective {
  constructor(public template: TemplateRef<any>) {}
}
