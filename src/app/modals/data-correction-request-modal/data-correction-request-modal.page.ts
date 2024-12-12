import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { ModalController } from '@ionic/angular';
import { APPROVAL_RequestProvider } from 'src/app/services/static/services.service';
import { E, I } from '@fullcalendar/resource/internal-common';
import { TypeFormatFlags } from 'typescript';

@Component({
  selector: 'app-data-correction-request-modal',
  templateUrl: './data-correction-request-modal.html',
  styleUrls: ['./data-correction-request-modal.scss'],
})
export class DataCorrectionRequestModalPage extends PageBase {

  formGroup: FormGroup;
  @Input() item: any;
  @Input() model: any;
  constructor(public formBuilder: FormBuilder,
    public pageProvider: APPROVAL_RequestProvider,
    public route: ActivatedRoute,
    public router: Router,
    public navCtrl: NavController,
    public env: EnvService,
    public modalController: ModalController,


  ) {
    super();
  }

  preLoadData() {
    this.loadData();
  }

  loadData() {
    super.loadedData();
    this.buildFormGroup();
    console.clear()
    console.log(this.formGroup)
   // console.log(this.formGroup.get('Addresses').value.length)
   // console.log('controls Addresses', this.formGroup.get('Addresses')['controls'])
  }

  submitForm() {
    let object = {
      Type: "DataCorrection",
      IDBranch : this.item.IDBranch,
      SubType: this.model.Type,
      UDF01: this.item.Id,
      UDF16: JSON.stringify(this.formGroup.getRawValue()),
    };

    console.log(object)
    this.env.showPrompt('Do you want to submit data ?', null, 'You are adjusting data !', 'Yes', 'No')
      .then((_) => {
        this.env.showLoading('Please wait for a few moments',
          this.pageProvider.save(object)).then(rs => {
            this.env.showMessage('Saved', 'success');
            this.modalController.dismiss();
          }).catch((err) => {
            this.env.showMessage(err.error?.InnerException?.ExceptionMessage || err,'danger')
          });;

      }).catch((err) => {
        
      });

  }

  buildFormGroup() {
    this.formGroup = this.formBuilder.group({});
    this.model.Fields.forEach(f => {
      if (f.type == "FormGroup") {
        let gr = new FormGroup({}) as any;
        gr.field = f;
        this.formGroup.addControl(f.id, gr);
        this.patchFormGroup(f.Fields, this.item[f.id], gr)
      }
      else if (f.type == "FormArray") {
        this.formGroup.addControl(f.id, new FormArray([]));
        let formArray = this.formGroup.get(f.id) as any;
        formArray.field = f;
        this.item[f.id].forEach(value => {
          this.patchFormArray(f.Fields, value, formArray)
        })
      }
      else {
        let control = new FormControl({ value: this.item[f.id], disabled: f.disabled }) as any;
        control.field = f
        this.formGroup.addControl(f.id, control);
      }
    })
    console.log(this.formGroup);
  }

  patchFormGroup(fields, value, fg) {
    fields.forEach(f => {
      if (f.type == "FormGroup") {
        let gr = new FormGroup({}) as any;
        gr.field = f;
        fg.addControl(f.id, gr);
        this.patchFormGroup(f, value[f.id], gr)
      }
      else if (f.type == "FormArray") {
        let formArray = new FormArray([]) as any;
        formArray.field = f
        fg.addControl(f.id, formArray);
        value[f.id].forEach(v => {
          this.patchFormArray(f.Fields, v, formArray)
        })
      }
      else {
        let control = new FormControl({ value: value[f.id], disabled: f.disabled }) as any;
        control.field = f
        fg.addControl(f.id, control);
      }
    })
  }


  patchFormArray(fields, value, formArray) {
    let gr = new FormGroup({});
    fields.forEach(f => {
      if (f.type == "FormGroup") {
        let grChild = new FormGroup({}) as any;
        grChild.field = f;
        gr.addControl(f.id, grChild);
        this.patchFormGroup(f.Fields, value[f.id], grChild)
      }
      else if (f.type == "FormArray") {
        let childArray = new FormArray([]) as any;
        childArray.field = f;
        formArray.push(childArray);
        value[f.id].forEach(d => {
          this.patchFormArray(f.Fields, d, childArray);
        })
      }
      else {
        let control = new FormControl({ value: value[f.id], disabled: f.disabled }) as any;
        control.field = f
        gr.addControl(f.id, control);

      }
    })
    formArray.push(gr);
  }


  getField(fg, field) {
    let obj = { form: fg }
    return Object.assign(field, obj)
  }

  getKeys(fg) {
    return Object.keys(fg)
  }
  isFormControl(control: any): boolean {
    return control instanceof FormControl;
  }

  isFormGroup(control: any): boolean {
    return control instanceof FormGroup;
  }

  isFormArray(control: any): boolean {
    return control instanceof FormArray;
  }
}
