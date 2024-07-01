import { TemplateRef, Directive } from '@angular/core';

@Directive({ selector: '[input-control-template]' })
export class InputControlTempateDirective {
  constructor(public template: TemplateRef<any>) {
    
  }
}
