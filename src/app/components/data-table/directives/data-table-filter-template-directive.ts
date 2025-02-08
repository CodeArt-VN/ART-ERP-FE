import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[datatable-filter-template]',
    standalone: false
})
export class DataTableColumnFilterDirective {
  constructor(public template: TemplateRef<any>) {}
}
