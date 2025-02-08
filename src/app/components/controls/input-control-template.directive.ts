import { TemplateRef, Directive } from '@angular/core';

@Directive({
    selector: '[input-control-template]',
    standalone: false
})
export class InputControlTempateDirective {
  constructor(public template: TemplateRef<any>) {
    
  }
}
