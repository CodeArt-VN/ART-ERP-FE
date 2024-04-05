import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputControlField } from './controls.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
})
export class FormControlComponent implements OnInit {
  @Input() set field(f: InputControlField) {
    if (f.form) this.form = f.form;
    if (f.type) this.type = f.type;
    if (f.id) this.id = f.id;
    if (f.label) this.label = f.label;
    if (f.color) this.color = f.color;
    if (f.placeholder) this.placeholder = f.placeholder;
    if (f.dataSource) this.dataSource = f.dataSource;
    if (f.bindValue) this.bindValue = f.bindValue;
    if (f.bindLabel) this.bindLabel = f.bindLabel;
    if (f.multiple) this.multiple = f.multiple;
    if (f.clearable) this.clearable = f.clearable;
    if (f.noCheckDirty) this.noCheckDirty = f.noCheckDirty;
  }

  @Input() form: FormGroup;

  @Input() type: string = 'text';

  @Input() id: string;

  @Input() label: string;
  @Input() color: string;

  @Input() placeholder?: string;

  @Input() dataSource?: any[] | any;

  @Input() bindValue?: string = 'Code';

  @Input() bindLabel?: string = 'Name';

  @Input() multiple: boolean = false;

  @Input() clearable: boolean = false;

  @Input() noCheckDirty: boolean = false;

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
