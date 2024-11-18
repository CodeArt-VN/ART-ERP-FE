import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { InputControlField } from './controls.interface';
import { FormGroup } from '@angular/forms';
import { InputControlTempateDirective } from './input-control-template.directive';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
})
export class FormControlComponent implements OnInit {

  @Input('inputControlTemplate') _inputControlTemplateInput: TemplateRef<any>;

  @ContentChild(InputControlTempateDirective, {
    read: TemplateRef,
    static: true,
  })
  _inputControlTemplateQuery: TemplateRef<any>;

  get inputControlTemplate(): TemplateRef<any> {
    return this._inputControlTemplateInput || this._inputControlTemplateQuery;
  }

  @Input() set field(f: InputControlField) {
    if (f.form) this.form = f.form;
    if (f.type) this.type = f.type;
    if (f.id) this.id = f.id;
    if (f.label) this.label = f.label;
    this._field = f;
  }

  get field(): InputControlField {
    return this._field;
  }

private _field!: InputControlField;

  @Input() form: FormGroup;

  @Input() type: string = 'text';

  @Input() id: string;

  @Input() label: string;

  get isValid() {
    return this.field.form.controls[this.field.id].valid;
  }

  constructor() {}

  ngOnInit() {
    if (!this.label && this.label !='') this.label = this.id;
  }

  @Output() change = new EventEmitter();
  onChange(e) {
    this.change.emit(e);
  }

  @Output() controlChange = new EventEmitter();
  onInputChange(e) {
    this.controlChange.emit(e);
  }

  @Output() nav = new EventEmitter();
  onNav(to) {
    this.nav.emit(to);
  }
}
