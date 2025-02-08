import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';
import { lib } from 'src/app/services/static/global-functions';
import { DynamicScriptLoaderService } from 'src/app/services/custom.service';
import { SYS_APICollectionProvider, SYS_IntegrationProviderProvider } from 'src/app/services/static/services.service';
import { FormBuilder, FormControl, FormArray, Validators, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/core/common.service';
import { SYS_APICollection } from 'src/app/models/model-list-interface';
import { thirdPartyLibs } from 'src/app/services/static/thirdPartyLibs';
declare var ace: any;
@Component({
    selector: 'app-api-collection-detail',
    templateUrl: './api-collection-detail.page.html',
    styleUrls: ['./api-collection-detail.page.scss'],
    standalone: false
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
  constructor(
    public pageProvider: SYS_APICollectionProvider,
    public integrationProvider: SYS_IntegrationProviderProvider,
    public dynamicScriptLoaderService: DynamicScriptLoaderService,
    public env: EnvService,
    public navCtrl: NavController,
    public route: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public cdr: ChangeDetectorRef,
    public loadingController: LoadingController,
    public commonService: CommonService,
  ) {
    super();
    this.pageConfig.isDetailPage = true;
    this.buildFormGroup();
  }

  segmentView = 's1';
  segmentChanged(ev: any) {
    this.segmentView = ev.detail.value;
    setTimeout(() => {
      this.loadAceEditor();
    }, 1);
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
      _URL: [''], // For showing with Params
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
      { Code: '', Name: 'Inherit auth from parent' },
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
      this.renderURL();
      this.segmentView = 's1';
    } else {
      this.segmentView = 's2';
    }
    if(this.item?.ListIdUsingRequest?.length>0){
      this.pageConfig.canDelete = false;
      this.formGroup.controls.Name.disable();
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
          controls = ['Disabled', 'Key', 'Value'];
          isArray = true;
          break;
        case 'Header':
          controls = ['Disabled', 'Key', 'Value', 'Description'];
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
          controls = ['Disabled', 'Key', 'Value','Description'];
          isArray = true;
          break;
        case 'Varibles':
          isArray = true;
          controls = ['Disabled', 'Key', 'InitialValue', 'CurrentValue'];
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
        //  if(field != null && control == "Disabled") field[control] = !field[control];
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
            if (!item['Disabled']) item['Disabled'] = false;
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
      // TH array trong formGroup
      let fg = this.formGroup.get('_' + controlName) as FormGroup;
      let formArray = fg?.get(arrayName) as FormArray;
      formArray.removeAt(index);
    } else {
      // TH Array
      let groups = <FormArray>this.formGroup.get('_' + controlName);
      groups.removeAt(index);
    }

    this.saveChangeJson(controlName);
  }
  saveChangeJson(controlName, isArray = false, fg = null, formArray = null) {
    return new Promise<void>((resolve, reject) => {
      try {
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
              return control.value === null || control.value === '';
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
        resolve();
      } catch (error) {
        // Call reject() if there is an error
        reject(error);
      }
    });
  }

  newField(ev, controlName, fg = null) {
    let controls = [];
    let isArray = false;
    let saveControl = controlName;
    let arrayName = null;
    switch (controlName) {
      case 'Params':
        controls = ['Disabled', 'Key', 'Value'];
        isArray = true;
        break;
      case 'Header':
        controls = ['Disabled', 'Key', 'Value', 'Description'];
        isArray = true;
        break;
      case 'Body':
        controls = ['BodyType', 'DataType', 'Value'];
        break;
      case 'Body/Value':
        controlName = arrayName = 'Value';
        controls = ['Disabled', 'Key', 'Value'];
        isArray = true;
        saveControl = 'Body';
        fg = this.formGroup.get('_Body');
        break;
      case 'Authorization':
        controls = ['Type', 'Token', 'Username', 'Password'];
        break;
      case 'Setting':
        controls = ['Disabled', 'Key', 'Value','Description'];
        isArray = true;
        break;
      case 'Varibles':
        isArray = true;
        controls = ['Disabled', 'Key', 'InitialValue', 'CurrentValue'];
        break;
    }
    this.addField(null, controlName, controls, isArray, fg);
    // this.saveChangeJson(saveControl,isArray,fg,arrayName);
  }
  deleteItems(controlName, fg = null, saveControl = null, arrayName = null) {
    if (!fg) {
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
        .showPrompt({ code: 'Bạn có chắc muốn xóa {{value}} đang chọn?', value: { value: controlName } }, null, {
          code: 'Xóa {{value1}} đang chọn?',
          value: { value1: length },
        })
        .then((_) => {
          groups.clear();
          if (!saveControl) saveControl = controlName;
          if (controlName == 'Params') {
            this.renderURL();
            this.changeURL();
          } else {
            this.saveChangeJson(saveControl, true, fg, arrayName);
          }
        });
    }
  }

  renderURL() {
    if (this.formGroup.get('URL').value) {
      let url = this.formGroup
        .get('_Params')
        .value?.filter(
          (param) => param.Value !== undefined && param.Value !== null && param.Value !== '' && param.Disabled != true,
        )
        .map((param) => `${param.Key}=${param.Value}`)
        .join('&');
      if (url) url = '?' + url;
      this.formGroup.get('_URL').setValue(this.formGroup.get('URL').value + url);
    }
  }
  changeURL() {
    const url = this.formGroup.get('_URL').value;
    // const regex = /^(.*?\:\/\/[^\/]+\/[^?]*)(\?.*)?$/ ;
    const regex = /^([^?]*)(\?.*)?$/;
    const match = url.match(regex);
    if (match) {
      const baseUrl = match[1];
      const queryParams = match[2] || '';
      // Update the base URL if it's different
      if (this.formGroup.get('URL').value !== baseUrl) {
        this.formGroup.get('URL').setValue(baseUrl);
        this.saveChange();
      }
      // Optionally, handle the query parameters
      let groups = this.formGroup.get('_Params') as FormArray;
      if (queryParams) {
        let params = new URLSearchParams(queryParams);
        params.forEach((value, key) => {
          let isMapped = false;

          // Find or create the group with the key from params
          const matchedGroup = groups.controls.find((group) => {
            if (group.get('Key')?.value == key) {
              // Update the value and enable it (if previously disabled)
              group.get('Value').setValue(value);
              group.get('Disabled').setValue(false); // Enable it
              isMapped = true;
              return true;
            }
            return false;
          });

          if (!isMapped) {
            // Create a new form group for the key from params
            const newGroup = new FormGroup({});
            newGroup.addControl('Key', new FormControl(key));
            newGroup.addControl('Value', new FormControl(value));
            newGroup.addControl('Disabled', new FormControl(false)); // Enable it
            groups.push(newGroup); // Add it to groups
          }
        });

        // Disable groups that don't have keys from params
        groups.controls.forEach((group) => {
          const keyExists = params.has(group.value.Key); // Assuming group.value.key holds the key name
          if (!keyExists) {
            group.get('Disabled').setValue(true); // Disable it
          }
        });
        this.saveChangeJson('Params', true);
      } else {
        groups.controls.forEach((group) => {
          group.get('Disabled').setValue(true); // Disable it
        });
        this.saveChangeJson('Params', true);
      }
    } else {
      this.saveChange();
    }
  }
  changeDisabled(fg, controlName, isArray = false, formArray = null) {
    fg.get('Disabled').setValue(!fg.get('Disabled').value);
    this.saveChangeJson(controlName, isArray).then(() => {
      // Toggle the 'Disabled' value after saveChangeJson completes
      // fg.get('Disabled').setValue(!fg.get('Disabled').value);
      // Additional logic based on controlName
      if (controlName === 'Params') {
        this.renderURL();
      }
    });
  }
  async export() {
    if (this.submitAttempt) return;
    this.submitAttempt = true;
    let obj = {
      ids: [this.item.Id],
    };
    this.pageProvider.commonService
      .connect('POST', '/SYS/APICollection/ExportJson', obj)
      .toPromise()
      .then((response: any) => {
        const blob = new Blob([JSON.stringify(response, null, 2)], {
          type: 'application/json',
        });
        let date = new Date();
        let filename =
          date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear() + ' -' + this.formGroup.get('Name').value;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.json`;
        a.click();
        URL.revokeObjectURL(url);

        this.submitAttempt = false;
      })
      .catch((err) => {
        this.submitAttempt = false;
      });
  }

  loadAceEditor() {
    if (this.editor) {
      this.editor.destroy();
    }
    if (typeof ace !== 'undefined') this.initAce();
    else
      this.dynamicScriptLoaderService
        .loadResources(thirdPartyLibs.aceEditor.source)
        .then(() => {
          this.dynamicScriptLoaderService.loadResources(thirdPartyLibs.aceEditor.ext.beautify.source).then(() => {
            this.initAce();
          });
        })
        .catch((error) => console.error('Error loading script', error));
  }
  chartScriptId;
  chartScriptEditor;

  editor = null;
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
      var beautify = ace.require('ace/ext/beautify');
      this.editor = ace.edit(this.chartScriptId);
      let editor = this.editor;
      if (editor) {
        editor.session.setMode('ace/mode/' + mode);
        editor.maxLines = Infinity;

        editor.setValue(formattedValue);
        editor.session.on('change', function (delta) {
          const editorContent = editor.getValue();
          control.setValue(editorContent);
        });
        beautify?.beautify(editor.session);
      }
    }
  }

  saveScript(event) {
    event.stopPropagation();
    this.saveChange();
  }

  onError() {
    console.log('IMG ERROR');
  }

  runRequest() {
    this.env.getStorage('Variables').then((result) => {
      this.env
        .showLoading(
          'Please wait for a few moments',
          this.pageProvider.commonService
            .connect('POST', 'SYS/APICollection/Run', { Id: this.item.Id, Variables: result })
            .toPromise(),
        )
        .then((res: any) => {
          this.env.showMessage('Running completed!', 'success');
          this.env.setStorage('Variables', res.Variables);
        })
        .catch((err) => {
          this.env.showMessage('Cannot run, please try again', 'danger');
          console.log(JSON.parse(err.error.Message));
        });
    });
  }
}
