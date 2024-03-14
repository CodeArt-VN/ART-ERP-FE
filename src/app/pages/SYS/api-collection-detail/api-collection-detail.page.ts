import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';
import { lib } from 'src/app/services/static/global-functions';
import {
  BRA_BranchProvider,
  CRM_ContactProvider,
  SYS_APICollectionProvider,
} from 'src/app/services/static/services.service';
import { FormBuilder, FormControl, FormArray, Validators, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/core/common.service';
import { Subject, catchError, concat, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import {
  BANK_IncomingPayment,
  BANK_IncomingPaymentDetail,
  SYS_APICollection,
} from 'src/app/models/model-list-interface';
import { getDateMeta } from '@fullcalendar/core/internal';
@Component({
  selector: 'app-api-collection-detail',
  templateUrl: './api-collection-detail.page.html',
  styleUrls: ['./api-collection-detail.page.scss'],
})
export class APICollectionDetailPage extends PageBase {
  statusList: [];
  methodList: any = [];
  typeList: any = [];
  authorizationList: any = [];
  parentList: any = [];
  model: any = {};
  isAllChecked : boolean = false;
  bodyType : any = [];
  dataType : any =[];
  item: SYS_APICollection;
  constructor(
    public pageProvider: SYS_APICollectionProvider,
    // public APICollectionDetailservice: SYS_APICollectionDetailProvider,
    public branchProvider: BRA_BranchProvider,
    public env: EnvService,
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public modalController: ModalController,
    public contactProvider: CRM_ContactProvider,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public cdr: ChangeDetectorRef,
    public loadingController: LoadingController,
    public commonService: CommonService,
  ) {
    super();
    this.pageConfig.isDetailPage = true;
    this.pageConfig.canEdit = true;
    this.buildFormGroup();
  }

  segmentView = 's1';
  segmentChanged(ev: any) {
    this.segmentView = ev.detail.value;
  }

  buildFormGroup(){
    this.formGroup = this.formBuilder.group({
      IDBranch: [this.env.selectedBranch],
      Id: new FormControl({ value: '', disabled: true }),
      Name: [''],
      Code: [''],
      Remark: [''],
      IDParent: [null],

      Type: ['Request', Validators.required],
      URL: [''],
      Header: [''],
      Params: [''],
      Method: [''],
      Body: [''],
      Authorization: [''],
      PreRequestScript: [''],
      Setting: [''],
      Varibles:[''],
      _Header: this.formBuilder.array([]),
      _Params: this.formBuilder.array([]),
      _Body: this.formBuilder.group({
        BodyType: [''],
        DataType: [''],
        Value: [''],
      }),
      _Authorization: this.formBuilder.group({
        Type: [''],
        Token: [''],
        Username: [''],
        Password: [''],
      }),
      _Setting: this.formBuilder.array([]),
      _Varibles: this.formBuilder.array([]),

      IsDisabled: new FormControl({ value: '', disabled: true }),
      IsDeleted: new FormControl({ value: '', disabled: true }),
      CreatedBy: new FormControl({ value: '', disabled: true }),
      CreatedDate: new FormControl({ value: '', disabled: true }),
      ModifiedBy: new FormControl({ value: '', disabled: false }),
      ModifiedDate: new FormControl({ value: '', disabled: false }),
      // DeletedFields: [[]],
    });
  }

  preLoadData(event?: any): void {
    this.methodList = [{ Code: 'GET' }, { Code: 'POST' }, { Code: 'PUT' }, { Code: 'PATCH' }, { Code: 'DELETE' }];
    this.typeList = [{ Code: 'Request' }, { Code: 'Folder' }, { Code: 'Collection' }];
    this.bodyType = [{Name:'raw',Code:'raw'},{Name:'none',Code:'none'},{Name:'form-data',Code:'formData'},{Name:'binary',Code:'binary'},{Name:'GraphQL',Code:'GraphQL'}]
    this.dataType = [{Name:'JSON',Code:'JSON'},{Name:'Text',Code:'Text'},{Name:'Javascript',Code:'Javascript'},{Name:'HTML',Code:'HTML'},{Name:'XML',Code:'XML'}]

    this.authorizationList = [
      { Code: 'BearerToken', Name: 'Bearer token' },
      { Code: 'BasicAuth', Name: 'Basic auth' },
    ];
    this.query.Type_in=['Folder','Collection'];
    this.pageProvider.read(this.query, this.pageConfig.forceLoadData).then((resp : any)=>{
      lib.buildFlatTree(resp['data'], this.parentList).then((result: any) => {
        this.parentList = result;
        this.parentList.forEach(i => {
            i.disabled = false;
        });
        // this.markNestedNode(this.parentList, this.env.selectedBranch);
    
      console.log(this.parentList);
    })
    super.preLoadData(event);
   
  })
}

  loadedData(event?: any, ignoredFromGroup?: boolean): void {
    this.buildFormGroup();
    super.loadedData(event, ignoredFromGroup);
    this.patchFieldValue();
    if(this.formGroup.get('Type').value == 'Request'){
      this.segmentView = 's1'
    }
    else{
      this.segmentView = 's2'
    }
    this.formGroup.get('Type').markAsDirty();
  }

  patchFieldValue() {
    console.log(this.item);
    let fields = ['Params', 'Header', 'Body', 'Authorization', 'Setting', 'Varibles'];
    for (let key of fields) {
      //JSON.parse(this.item[key]);
      let controls = [];
      let isArray = false;
      switch (key) {
        case 'Params':
          controls = [ 'Key', 'Value'];
          isArray = true;
          break;
        case 'Header':
          controls = [ 'Key', 'Value', 'Description'];
          isArray = true;
          break;
        case 'Body':
          controls = ['BodyType', 'DataType', 'Value'];
          break;
        case 'Authorization':
          controls = ['Type', 'Token', 'Username', 'Password'];
          break;

        case 'Setting':
          controls = ['Name', 'Value'];
          isArray = true;
          break;
        case 'Varibles':
          isArray = true;
          controls = [ 'Name', 'InitialValue', 'CurrentValue'];
          break;

        default:
          break;
      }
      let value = null;
      if (this.item[key]) {
         value = JSON.parse(this.item[key]);
      }
      if (controls.length > 0 && isArray && value != null) {
          value.forEach((v) => {
            this.addField(v, key, controls, isArray);
          });
      } 
      else if(!isArray) this.addField(value, key, controls, isArray);
    }
  }

  addField(field: any, controlName, controls, isArray, markAsDirty = false) {
    if (isArray) {
      let groups = <FormArray>this.formGroup.get('_' + controlName);
 
      let group = this.formBuilder.group({});
      for (let control of controls) {
        group.addControl(control, this.formBuilder.control(field != null ? field[control] : ''));
        this.model[control] = ''
      }
    
      // if(group.get('IsAvailable')?.value && group.get('IsAvailable').value == false){
      //   group.disable();
      // }
      groups.push(group);
    } else {
      let _group = this.formGroup.get('_' + controlName) as FormGroup;
      for (let control of controls) {
        _group.get(control).setValue(field != null ? field[control] : '');
        this.model[control] = ''
      }
    
    }
  }

  changeType() {
    this.formGroup.get('Type').markAsDirty();
    let type = this.formGroup.get('Type').value;
    if(type == 'Request'){
      this.segmentView = 's1'
    }
    else{
   
      this.segmentView = 's2';
    }
    this.resetForm();
    this.saveChange();
  }

  resetForm(){
    let type = this.formGroup.get('Type').value;
    if(type == 'Request'){
      this.formGroup.get('Varibles').setValue(null);
    }
    else{
      this.formGroup.get('Method').setValue(null);
      this.formGroup.get('URL').setValue(null);
      this.formGroup.get('Params').setValue(null);
      this.formGroup.get('Body').setValue(null);
      this.formGroup.get('Setting').setValue(null);
      if(type=='Folder'){
        this.formGroup.get('Varibles').setValue(null);
      }
      if(type=='Collection'){
        this.formGroup.get('IDParent').setValue(null);
      }
    }
  }

  removeField(index, controlName) {
    let groups = <FormArray>this.formGroup.get('_' + controlName);
    groups.removeAt(index);
    this.saveChangeJson(controlName);
  }
  saveChangeJson(controlName) {
    let jsonValue = JSON.stringify(this.formGroup.get('_' + controlName).value);
    this.formGroup.get(controlName).setValue(jsonValue);
    this.formGroup.get(controlName).markAsDirty();

    console.log(this.formGroup.get(controlName).value);
    this.saveChange2();
    // this.sa
  }
  newField(ev, controlName, control) {
    let controls = [];
    let isArray = false;
    switch (controlName) {
      case 'Params':
        controls = [ 'Key', 'Value'];
        isArray = true;
        break;
      case 'Header':
        controls = [ 'Key', 'Value', 'Description'];
        isArray = true;
        break;
      case 'Body':
        controls = ['BodyType', 'DataType', 'Value'];
        break;
      case 'Authorization':
        controls = ['Type', 'Token', 'Username', 'Password'];
        break;

      case 'Setting':
        controls = ['Name', 'Value'];
        isArray = true;
        break;
      case 'Varibles':
        isArray = true;
        controls = [ 'Name', 'InitialValue', 'CurrentValue'];
        break;
    }
    this.addField(this.model,controlName,controls,isArray,true)
    this.saveChangeJson(controlName)
  }
  deleteItems(controlName){
    if (this.pageConfig.canDelete) {
      let length = this.formGroup.get('_'+controlName).getRawValue().length;
      this.env.showPrompt('Bạn chắc muốn xóa ' + controlName + ' đang chọn?', null, 'Xóa ' + length + ' dòng').then(_ => {
        this.formGroup.get(controlName).setValue(null);
        let groups = <FormArray>this.formGroup.get('_' + controlName);
        groups.clear();
        this.saveChange();
      });
     
  }
  }
}
