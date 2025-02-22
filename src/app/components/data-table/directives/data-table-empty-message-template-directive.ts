import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[datatable-empty-message-template]',
  standalone: false
})
export class DataTableEmptyMessageTemplateDirective {
constructor(public template: TemplateRef<any>) {}
}
