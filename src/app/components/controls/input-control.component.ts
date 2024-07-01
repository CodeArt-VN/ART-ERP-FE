import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputControlField } from './controls.interface';
import { environment } from 'src/environments/environment';
import { lib } from 'src/app/services/static/global-functions';
import { GlobalData } from 'src/app/services/static/global-variable';

@Component({
  selector: 'app-input-control',
  templateUrl: './input-control.component.html',
})
export class InputControlComponent implements OnInit {
  lib;
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
  @Input() secondaryId: string;

  @Input() label: string;

  @Input() color: string = 'dark';

  @Input() placeholder?: string;

  @Input() dataSource?: any[] | any;

  @Input() bindValue?: string = 'Code';

  @Input() bindLabel?: string = 'Name';

  @Input() multiple: boolean = false;

  @Input() clearable: boolean = false;

  @Input() noCheckDirty: boolean = false;

  @Input() inputControlTemplate: any;

  imgPath = environment.staffAvatarsServer;

  constructor() {
    this.lib = lib;
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.dismissDatePicker();
  }

  @Output() change = new EventEmitter();
  @Output() inputChange = new EventEmitter();

  onInputChange(event) {
    this.inputChange.emit(event);
    if (
      '|ng-select|ng-select-async|ng-select-item|ng-select-staff|ng-select-schema|ng-select-status|ng-select-bp|color|icon|icon-color|time-frame|'.includes(
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
    this.onInputChange(control);

    if (this.type == 'color') {
      this.isOpenPicker = false;
    }
  }

  isOpenDatePicker = false;
  pickerControl: any;
  pickerGroupName: string;
  _timePeriodList = [];

  commonOptions = GlobalData.commonOptions;

  segmentTimeframeChanged(e) {
    this.pickerControl.controls.Type.value = e.detail.value;
  }
  calcAbsoluteDate(control, isFullfillDate = false) {
    if (control.controls.Type.value == 'Relative') {
      let tempDate = this.lib.calcTimeValue(control.getRawValue(), isFullfillDate);
      if (tempDate) {
        control.controls.Value.value = lib.dateFormat(tempDate, 'yyyy-mm-ddThh:MM:ss');
      }
    }
  }

  presentDatePicker(event, control, groupName) {
    this.pickerGroupName = groupName;
    this.pickerControl = control;
    this.popover.event = event;
    this.calcAbsoluteDate(this.pickerControl, groupName == 'TimeFrame-To');
    if (this._timePeriodList.length == 0) {
      this._timePeriodList = lib.cloneObject(this.commonOptions.timeConfigPeriod);
      this._timePeriodList.forEach((p) => {
        p.name = p.name.toLowerCase() + ' ago';
      });
    }
    this.isOpenDatePicker = true;
  }

  dismissDatePicker(apply: boolean = false) {
    if (!this.isOpenDatePicker) return;

    if (!apply) {
    } else {
      this.onInputChange(this.pickerControl);
    }
    this.isOpenDatePicker = false;
  }

  pickDate(pDate, isQuickPick = false) {
    if (isQuickPick) {
      this.setDate(pDate.from, this.pickerControl, false);
      this.setDate(pDate.to, this.form.controls[this.secondaryId], true);
    } else {
      this.setDate(pDate, this.pickerControl, this.pickerGroupName == 'TimeFrame-To');

      if (this.pickerGroupName == 'TimeFrame-Range') {
        this.setDate(pDate, this.form.controls[this.secondaryId], true);
      }
    }
  }

  setDate(pDate, control, isFullfillDate = false) {
    if (control.controls.Type.value != pDate.Type) {
      control.controls.Type.setValue(pDate.Type);
      control.controls.Type.markAsDirty();
    }

    if (pDate.Type == 'Relative') {
      if (control.controls.IsPastDate.value != pDate.IsPastDate) {
        control.controls.IsPastDate.setValue(pDate.IsPastDate);
        control.controls.IsPastDate.markAsDirty();
      }
      if (control.controls.Period.value != pDate.Period) {
        control.controls.Period.setValue(pDate.Period);
        control.controls.Period.markAsDirty();
      }
      if (control.controls.Amount.value != pDate.Amount) {
        control.controls.Amount.setValue(pDate.Amount);
        control.controls.Amount.markAsDirty();
      }
      this.calcAbsoluteDate(control, isFullfillDate);
    } else {
      if (control.controls.Value.value != pDate.Value.detail.value) {
        control.controls.Value.setValue(pDate.Value.detail.value + '.000');
        let tempDate = this.lib.calcTimeValue(control.getRawValue(), isFullfillDate);
        control.controls.Value.setValue(lib.dateFormat(tempDate, 'yyyy-mm-ddThh:MM:ss'));
        control.controls.Value.markAsDirty();
      }
    }
  }
}
