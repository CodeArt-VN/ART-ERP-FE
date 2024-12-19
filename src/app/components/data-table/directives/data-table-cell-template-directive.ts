import { TemplateRef, Directive } from '@angular/core';

@Directive({
    selector: '[datatable-cell-template]',
    standalone: false
})
export class DataTableColumnCellDirective {
  constructor(public template: TemplateRef<any>) {}
}
