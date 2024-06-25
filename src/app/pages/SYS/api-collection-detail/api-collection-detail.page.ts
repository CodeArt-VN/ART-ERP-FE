import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';
import { lib } from 'src/app/services/static/global-functions';
import { DynamicScriptLoaderService } from 'src/app/services/custom.service';
import { SYS_APICollectionProvider, SYS_IntegrationProviderProvider } from 'src/app/services/static/services.service';
import { FormBuilder, FormControl, FormArray, Validators, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/core/common.service';
import { SYS_APICollection } from 'src/app/models/model-list-interface';
import { getJSDocThisTag } from 'typescript';
import { co } from '@fullcalendar/core/internal-common';
declare var ace: any;
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
  isAllChecked: boolean = false;
  bodyType: any = [];
  dataType: any = [];
  providerDataSource: any = [];
  item: SYS_APICollection;
  constructor(
    public pageProvider: SYS_APICollectionProvider,
    public integrationProvider: SYS_IntegrationProviderProvider,
    public dynamicScriptLoaderService: DynamicScriptLoaderService,
    public env: EnvService,
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public modalController: ModalController,
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
    this.loadAceEditor();
  }

  buildFormGroup() {
    this.formGroup = this.formBuilder.group({
      Id: new FormControl({ value: '', disabled: true }),
      IDProvider: ['', Validators.required],
      Name: ['', Validators.required],
      Code: [''],
      Remark: [''],
      IDParent: [null],

      Type: ['', Validators.required],
      URL: [''],
      Header: [''],
      Params: [''],
      Method: [''],
      Body: [''],
      Authorization: [''],
      BeforeRequestScript: [''],
      AfterResponseScript: [''],
      Setting: [''],
      Varibles: [''],
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
  // ngAfterViewInit() {
  //   // The DOM is fully loaded here
  //   // You can access DOM elements and run your code
  //   this.loadAceEditor();
  // }
  preLoadData(event?: any): void {
    this.chartScriptId = 'chartScriptEditor' + lib.generateUID();
    this.methodList = [{ Code: 'GET' }, { Code: 'POST' }, { Code: 'PUT' }, { Code: 'PATCH' }, { Code: 'DELETE' }];
    this.typeList = [{ Code: 'Request' }, { Code: 'Folder' }, { Code: 'Collection' }];
    this.bodyType = [
      { Name: 'raw', Code: 'raw' },
      { Name: 'x-www-form-urlencoded', Code: 'x-www-form-urlencoded' },
      { Name: 'none', Code: 'none' },
      { Name: 'form-data', Code: 'formData' },
      { Name: 'binary', Code: 'binary' },
      { Name: 'GraphQL', Code: 'GraphQL' },
    ];
    this.dataType = [
      { Name: 'JSON', Code: 'application/json' },
      { Name: 'Text', Code: 'text/plain' },
      { Name: 'Javascript', Code: 'application/javascript' },
      { Name: 'HTML', Code: 'text/html' },
      { Name: 'XML', Code: 'application/xml' },
    ];

    this.authorizationList = [
      { Code: 'Bearer', Name: 'Bearer token' },
      { Code: 'Basic', Name: 'Basic auth' },
    ];
    Promise.all([this.integrationProvider.read(this.query)]).then((values: any) => {
      this.providerDataSource = values[0].data;
    });
    this.query.Type_in = ['Folder', 'Collection'];
    if (this.item?.IDProvider) {
      this.query.IDProvider = this.item?.IDProvider;
    }
    this.pageProvider.read(this.query, this.pageConfig.forceLoadData).then((resp: any) => {
      lib.buildFlatTree(resp['data'], this.parentList).then((result: any) => {
        this.parentList = result;
        this.parentList.forEach((i) => {
          i.disabled = false;
        });
        // this.markNestedNode(this.parentList, this.env.selectedBranch);
      });

      super.preLoadData(event);
    });
  }

  loadedData(event?: any, ignoredFromGroup?: boolean): void {
    this.buildFormGroup();
    super.loadedData(event, ignoredFromGroup);
    this.patchFieldValue();
    if (this.formGroup.get('Type').value == 'Request') {
      this.segmentView = 's1';
    } else {
      this.segmentView = 's2';
    }
  }

  patchFieldValue() {
    console.log(this.item);
    let fields = ['Params', 'Header', 'Body', 'Authorization', 'Setting', 'Varibles'];
    for (let key of fields) {
      //JSON.parse(this.item[key]);
      let controls = [];
      let isArray = false;
      let isNestedValueArray = false;
      switch (key) {
        case 'Params':
          controls = ['Key', 'Value'];
          isArray = true;
          break;
        case 'Header':
          controls = ['Key', 'Value', 'Description'];
          isArray = true;
          break;
        case 'Body':
          controls = ['BodyType', 'DataType', 'Value'];
          isNestedValueArray = true;
          break;
        case 'Authorization':
          controls = ['Type', 'Token', 'Username', 'Password'];
          break;

        case 'Setting':
          controls = ['Key', 'Value'];
          isArray = true;
          break;
        case 'Varibles':
          isArray = true;
          controls = ['Key', 'InitialValue', 'CurrentValue'];
          break;

        default:
          break;
      }
      let value = null;
      if (this.item[key]) {
        let data = this.item[key];
        value = JSON.parse(data);
      }
      if (controls.length > 0 && isArray && value != null) {
        value?.forEach((v) => {
          this.addField(v, key, controls, isArray);
        });
      } else if (!isArray) this.addField(value, key, controls, isArray);
    }
    console.log(this.formGroup);
  }

  addField(field: any, controlName, controls, isArray, fg = null) {
    if (!fg) fg = this.formGroup;
    if (isArray) {
      let groups: FormArray;
      if (fg.get('_' + controlName) instanceof FormArray) {
        groups = fg.get('_' + controlName) as FormArray;
      } else if (fg.get(controlName) instanceof FormArray) {
        groups = fg.get(controlName);
      } else {
        return;
      }

      let group = this.formBuilder.group({});
      for (let control of controls) {
        group.addControl(control, this.formBuilder.control(field != null ? field[control] : ''));
      }
      groups.push(group);
    } else {
      let _group = fg.get('_' + controlName) as FormGroup;
      for (let control of controls) {
        if (field && Array.isArray(field[control])) {
          let formArray = new FormArray([]);
          field[control].forEach((item) => {
            let formGroup = new FormGroup({});
            for (let key in item) {
              if (item.hasOwnProperty(key)) {
                formGroup.addControl(key, new FormControl(item[key]));
              }
            }
            formArray.push(formGroup);
          });
          _group.setControl(control, formArray);
        } else {
          _group.get(control).setValue(field != null ? field[control] : '');
          this.model[control] = '';
        }
      }
    }
  }

  changeProvider() {
    this.query.IDProvider = this.formGroup.get('IDProvider').value;
    this.pageProvider.read(this.query, this.pageConfig.forceLoadData).then((resp: any) => {
      lib.buildFlatTree(resp['data'], this.parentList).then((result: any) => {
        this.parentList = result;
        this.parentList.forEach((i) => {
          i.disabled = false;
        });
      });
    });
    this.formGroup.get('IDProvider').markAsDirty();
    this.saveChange();
  }
  changeType() {
    this.formGroup.get('Type').markAsDirty();
    let type = this.formGroup.get('Type').value;
    if (type == 'Request') {
      this.segmentView = 's1';
    } else {
      this.segmentView = 's2';
    }
    this.resetForm();
    this.saveChange();
  }

  changeBodyType() {
    let _group = this.formGroup.get('_Body') as FormGroup;
    if (this.formGroup.get('_Body').get('BodyType').value == 'x-www-form-urlencoded') {
      _group.setControl('Value', new FormArray([])); //
    } else {
      _group.setControl('Value', new FormControl()); //
      // this.initAce() ;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.initAce();
      }, 0);
    }
    this.saveChangeJson('Body');
  }

  resetForm() {
    let type = this.formGroup.get('Type').value;
    if (type == 'Request') {
      this.formGroup.get('Varibles').setValue(null);
    } else {
      this.formGroup.get('Method').setValue(null);
      this.formGroup.get('URL').setValue(null);
      this.formGroup.get('Params').setValue(null);
      this.formGroup.get('Body').setValue(null);
      this.formGroup.get('Setting').setValue(null);
      if (type == 'Folder') {
        this.formGroup.get('Varibles').setValue(null);
      }
      if (type == 'Collection') {
        this.formGroup.get('IDParent').setValue(null);
      }
    }
  }

  removeField(index, controlName, isArray = false, arrayName = '') {
    if (isArray) {
      let fg = this.formGroup.get('_' + controlName) as FormGroup;
      let formArray = fg?.get(arrayName) as FormArray;
      formArray.removeAt(index);
    } else {
      let groups = <FormArray>this.formGroup.get('_' + controlName);
      groups.removeAt(index);
    }

    this.saveChangeJson(controlName);
  }
  saveChangeJson(controlName, isArray = false, fg = null, formArray = null) {
    if (!fg) {
      fg = this.formGroup;
    }
    if (isArray) {
      if (formArray) {
        formArray = fg.get(formArray) as FormArray;
      } else {
        formArray = fg.get('_' + controlName) as FormArray;
      }
      //   const groups = fg.get('_' + controlName) as FormArray;
      for (let i = formArray.length - 1; i >= 0; i--) {
        const group = formArray.at(i) as FormGroup;
        const allControlsEmpty = Object.keys(group.controls).every((key) => {
          const control = group.get(key) as FormControl;
          return control.value === null || control.value.trim() === '';
        });
        if (allControlsEmpty) {
          formArray.removeAt(i);
        }
      }
    }
    let jsonValue = JSON.stringify(this.formGroup.get('_' + controlName).value);
    this.formGroup.get(controlName).setValue(jsonValue);
    this.formGroup.get(controlName).markAsDirty();
    console.log(this.formGroup.get(controlName).value);
     this.saveChange2();
  }

  newField(ev, controlName, fg = null) {
    let controls = [];
    let isArray = false;
    let saveControl = controlName;
    let arrayName = null;
    switch (controlName) {
      case 'Params':
        controls = ['Key', 'Value'];
        isArray = true;
        break;
      case 'Header':
        controls = ['Key', 'Value', 'Description'];
        isArray = true;
        break;
      case 'Body':
        controls = ['BodyType', 'DataType', 'Value'];
        break;
      case 'Body/Value':
        controlName = arrayName =  'Value';
        controls = ['Key', 'Value'];
        isArray = true;
        saveControl = 'Body';
        fg = this.formGroup.get('_Body');
        break;
      case 'Authorization':
        controls = ['Type', 'Token', 'Username', 'Password'];
        break;
      case 'Setting':
        controls = ['Key', 'Value'];
        isArray = true;
        break;
      case 'Varibles':
        isArray = true;
        controls = ['Key', 'InitialValue', 'CurrentValue'];
        break;
    }
    this.addField(null, controlName, controls, isArray, fg);
    // this.saveChangeJson(saveControl,isArray,fg,arrayName);
  }
  deleteItems(controlName,  fg = null , saveControl = null, arrayName = null) {
    if(!fg){
      fg = this.formGroup;
    }
    let groups = null;
    if (fg.get('_' + controlName) instanceof FormArray) {
      groups = fg.get('_' + controlName) as FormArray;
    } else if (fg.get(controlName) instanceof FormArray) {
      groups = fg.get(controlName);
    } else {
      return;
    }

    if (this.pageConfig.canDelete) {
      let length = groups.getRawValue().length;
      this.env
        .showPrompt('Bạn chắc muốn xóa ' + controlName + ' đang chọn?', null, 'Xóa ' + length + ' dòng')
        .then((_) => {
          groups.clear();
          if(!saveControl) saveControl = controlName;
          this.saveChangeJson(saveControl,true,fg , arrayName)
        });
    }
  }
  async exportJson() {
    if (this.submitAttempt) return;
    this.submitAttempt = true;
    let obj = {
      id: this.item.Id
    }
    this.pageProvider.commonService.connect("POST","/SYS/APICollection/ExportJson",obj).toPromise()
    .then((response:any) => {
        const blob = new Blob([JSON.stringify(response, null, 2)], {
          type: 'application/json',
        });
        let date = new Date();
        let filename =  date.getDate()+ '-' +date.getMonth() + '-' + date.getFullYear()+ ' -' + this.formGroup.get('Name').value;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.json`;
        a.click();
        URL.revokeObjectURL(url);
      
      this.submitAttempt = false;
    })
    .catch(err=>{
      this.submitAttempt = false;

    });
}

  loadAceEditor() {
    this.dynamicScriptLoaderService
      .loadScript('https://ace.c9.io/build/src/ace.js')
      .then(() => this.initAce())
      .catch((error) => console.error('Error loading script', error));
  }
  chartScriptId;
  chartScriptEditor;
  initAce() {
    let control;
    let saveControl = '';
    let formattedValue = '';
    let mode = 'javascript';
    if (this.segmentView == 's4') {
      try {
        JSON.parse(this.formGroup.get('_Body').value.Value);
        let jsonValue = this.formGroup.get('_Body').value.Value
          ? JSON.parse(this.formGroup.get('_Body').value.Value)
          : null;
        formattedValue = jsonValue ? JSON.stringify(jsonValue, null, '\t') : null;
      } catch (err) {
        formattedValue = this.formGroup.get('_Body').value.Value;
        mode = 'text';
      }
      control = this.formGroup.get('_Body')['controls'].Value;
      saveControl = 'Body';
    }
    if (this.segmentView == 's5') {
      let jsonValue = this.formGroup.get('BeforeRequestScript').value;
      control = this.formGroup.get('BeforeRequestScript');
      saveControl = 'BeforeRequestScript';
      formattedValue = jsonValue?.replace(/\\n/g, '\n');
    }
    if (this.segmentView == 's6') {
      let jsonValue = this.formGroup.get('AfterResponseScript').value;
      control = this.formGroup.get('AfterResponseScript');
      saveControl = 'AfterResponseScript';
      formattedValue = jsonValue?.replace(/\\n/g, '\n');
    }
    const id = document.querySelector('#' + this.chartScriptId);
    if (id != null && control) {
      const editor = ace.edit(this.chartScriptId);
      if (editor) {
        editor.session.setMode('ace/mode/' + mode);
        editor.maxLines = Infinity;
        let that = this;
        editor.setValue(formattedValue);
        editor.session.on('change', function (delta) {
          const editorContent = editor.getValue();
          control.setValue(editorContent);
        });
      }
    }
  }
  onError() {
    console.log('IMG ERROR');
  }
}
