import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputControlField } from './controls.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-input-control',
  templateUrl: './input-control.component.html',
})
export class InputControlComponent implements OnInit {
  @Input() set field(f: InputControlField) {
    if (f.form) this.form = f.form;
    if (f.type) this.type = f.type;
    if (f.id) this.id = f.id;
    if (f.label) this.label = f.label;
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

  @Input() color: string = 'dark';

  @Input() placeholder?: string;

  @Input() dataSource?: any[] | any;

  @Input() bindValue?: string = 'Code';

  @Input() bindLabel?: string = 'Name';

  @Input() multiple: boolean = false;

  @Input() clearable: boolean = false;

  @Input() noCheckDirty: boolean = false;

  imgPath = environment.staffAvatarsServer;

  constructor() {}

  ngOnInit() {}

  @Output() change = new EventEmitter();
  @Output() inputChange = new EventEmitter();

  onInputChange(event) {
    this.inputChange.emit(event);
    if (
      '|ng-select|ng-select-item|ng-select-staff|ng-select-schema|ng-select-status|ng-select-bp|color|icon'.includes(
        this.type,
      )
    ) {
      this.change.emit(event);
    }
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.inputChange.emit(event);
    }
  }

  @Output() nav = new EventEmitter();
  onNav(to) {
    this.nav.emit(to);
  }

  isOpenPicker = false;
  @ViewChild('popover') popover;
  presentPicker(event) {
    this.popover.event = event;
    this.isOpenPicker = true;
  }
  presentPopupPicker() {
    this.isOpenPicker = true;
  }

  onSelectIcon(icon, control) {
    control.setValue(icon.Name);
    control.markAsDirty();
    this.isOpenPicker = false;
    this.onInputChange(control);
  }

  onSelectColor(color, control) {
    control.setValue(color.Code);
    control.markAsDirty();
    this.isOpenPicker = false;
    this.onInputChange(control);
  }
}
