import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';
import {
  SYS_ActionProvider,
  SYS_IntegrationProviderProvider,
  SYS_SchemaProvider,
  SYS_TriggerActionDataMappingProvider,
  SYS_TriggerActionProvider,
} from 'src/app/services/static/services.service';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-integration-trigger-action-modal',
  templateUrl: './integration-trigger-action-modal.page.html',
  styleUrls: ['./integration-trigger-action-modal.page.scss'],
})
export class IntegrationTriggerActionModalPage extends PageBase {
  IDTrigger;
  IDAction;
  IDProvider;
  constructor(
    public pageProvider: SYS_TriggerActionProvider,
    public integrationProvider: SYS_IntegrationProviderProvider,
    public actionProvider: SYS_ActionProvider,
    public schemaService: SYS_SchemaProvider,
    public actionTriggerMappingProvider: SYS_TriggerActionDataMappingProvider,
    public env: EnvService,
    public navCtrl: NavController,
    public route: ActivatedRoute,

    public modalController: ModalController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cdr: ChangeDetectorRef,
    public loadingController: LoadingController,
  ) {
    super();
    this.pageConfig.isDetailPage = false;
    this.IDTrigger = this.route.snapshot.paramMap.get('IDTrigger');
    this.IDAction = this.route.snapshot.paramMap.get('IDAction');
    this.IDProvider = this.route.snapshot.paramMap.get('IDProvider');

    this.formGroup = formBuilder.group({
      IDBranch: [this.env.selectedBranch],
      Id: new FormControl({ value: '', disabled: true }),
      IDProvider: ['', Validators.required],
      IDAction: ['', Validators.required],
      IDTrigger: ['', Validators.required],
      Code: [''],
      Name: [''],
      Remark: [''],
      Sort: [''],
      ActionName: [''],
      ProviderName: [''],
      TriggerActionDataMapping: this.formBuilder.array([]),
      IsDisabled: new FormControl({ value: '', disabled: true }),
      IsDeleted: new FormControl({ value: '', disabled: true }),
      CreatedBy: new FormControl({ value: '', disabled: true }),
      CreatedDate: new FormControl({ value: '', disabled: true }),
      ModifiedBy: new FormControl({ value: '', disabled: true }),
      ModifiedDate: new FormControl({ value: '', disabled: true }),
    });
  }

  providerDataSource: any;
  schemaDataSource: any;
  preLoadData(event) {
    console.log('IDTrigger' + this.IDTrigger);

    this.sortToggle('Id', true);

    super.preLoadData(event);
  }

  loadedData(event?: any, ignoredFromGroup?: boolean): void {
    super.loadedData(event, ignoredFromGroup);
    this.query.Id = undefined;
    this.query.IDProvider = this.IDProvider;
    this.formGroup.get('IDTrigger').setValue(this.IDTrigger);
    this.formGroup.get('IDTrigger').markAsDirty();

    let providerPromise = this.integrationProvider.read(this.query, false);
    let actionPromise = this.actionProvider.read(this.query, false);
    let schemaPromise = this.schemaService.read(this.query, false);

    Promise.all([providerPromise, actionPromise, schemaPromise]).then((results) => {
      let listProvider: any = results[0];

      if (listProvider != null && listProvider.data && listProvider.data.length > 0) {
        this.providerDataSource = listProvider.data;
      }

      if (this.IDProvider) {
        let provider = {
          Id: this.IDProvider,
        };
        this.changeProvider(provider);
      }
    });
  }

  saveChange2(form = this.formGroup, publishEventCode = this.pageConfig.pageName, provider = this.pageProvider) {
    return new Promise((resolve, reject) => {
      this.formGroup.updateValueAndValidity();
      if (!form.valid) {
        this.env.showTranslateMessage('Please recheck information highlighted in red above', 'warning');
      } else if (this.submitAttempt == false) {
        this.submitAttempt = true;
        let submitItem = this.getDirtyValues(form);

        provider
          .save(submitItem, this.pageConfig.isForceCreate)
          .then((savedItem: any) => {
            resolve(savedItem);
            this.savedChange(savedItem, form);
            this.modalController.dismiss(savedItem);
            if (publishEventCode) this.env.publishEvent({ Code: publishEventCode });
          })
          .catch((err) => {
            this.env.showTranslateMessage('Cannot save, please try again', 'danger');
            this.cdr.detectChanges();
            this.submitAttempt = false;
            reject(err);
          });
      }
    });
  }

  actionDataSource: any;
  async changeProvider(e) {
    this.formGroup.get('IDProvider').setValue(e.Id);
    this.formGroup.get('IDProvider').markAsDirty();
    this.formGroup.get('ProviderName').setValue(e.Name);
    this.query.IDProvider = e.Id;
    this.actionProvider.read(this.query, false).then((listAction: any) => {
      if (listAction != null && listAction.data.length > 0) {
        this.actionDataSource = listAction.data;
        let action = {
          Id: e.Id,
        };
        this.changeAction(action);
      } else {
        let action = {
          Id: '',
        };
        this.changeAction(action);
        this.actionDataSource = [];
      }
    });
  }
  runnerConfigList: any;

  async changeAction(e) {
    this.formGroup.get('IDAction').setValue(e.Id);
    this.formGroup.get('IDAction').markAsDirty();
    this.formGroup.get('ActionName').setValue(e.Name);

    this.runnerConfigList = [];
    if (e.Id) {
      this.actionProvider.getAnItem(e.Id).then((data: any) => {
        if (data) {
          this.loadSchema(data.IDSchema);
          this.runnerConfigList = JSON.parse(data.RunnerConfig);
        }
      });
    }
  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  schemaDetailDataSource: any;
  async loadSchema(id) {
    if (id) {
      this.schemaDetailDataSource = [];
      this.schemaService.getAnItem(id).then((data: any) => {
        if (data) {
          this.schemaDetailDataSource = data.Fields;
          this.loadTriggerActionDataMapping(this.IDTrigger);
        }
      });
    }
  }

  triggerActionDataMapping: any;
  loadTriggerActionDataMapping(id) {
    this.triggerActionDataMapping = [];
    this.actionTriggerMappingProvider.getAnItem(id).then((data: any) => {
      if (data) {
        this.triggerActionDataMapping = data;
      }
    });
    let groups = <FormArray>this.formGroup.controls.TriggerActionDataMapping;
    groups.clear();
    this.getObjectKeys(this.runnerConfigList).forEach((e) => {
      this.addField(
        this.triggerActionDataMapping?.find((d) => d.ERPProperty == e),
        e, true
      );
    });
  }

  addField(field: any, actionProperty, markAsDirty = false) {
    let groups = <FormArray>this.formGroup.controls.TriggerActionDataMapping;
    let group = this.formBuilder.group({
      IDTriggerAction: [this.IDTrigger],
      Id: new FormControl({ value: field?.Id, disabled: false }),
      Code: new FormControl({ value: field?.Code, disabled: false }),
      Name: new FormControl({ value: field?.Name, disabled: false }),
      Remark: new FormControl({ value: field?.Remark, disabled: false }),
      ERPProperty: new FormControl({
        value: field?.ERPProperty ? field?.ERPProperty : actionProperty ? actionProperty : '',
        disabled: false,
      }),
      ProviderProperty: new FormControl({ value: field?.ProviderProperty, disabled: false }),
      DataType: new FormControl({ value: field?.DataType, disabled: false }),
      Format: new FormControl({ value: field?.Format, disabled: false }),
      Sort: [field?.Sort],
      IsDisabled: new FormControl({ value: field?.IsDisabled, disabled: true }),
      IsDeleted: new FormControl({ value: field?.IsDeleted, disabled: true }),
      CreatedBy: new FormControl({ value: field?.CreatedBy, disabled: true }),
      CreatedDate: new FormControl({ value: field?.CreatedDate, disabled: true }),
      ModifiedBy: new FormControl({ value: field?.ModifiedBy, disabled: true }),
      ModifiedDate: new FormControl({ value: field?.ModifiedDate, disabled: true }),
      _schemaDetailDataSource: [[...this.schemaDetailDataSource]],
    });
    groups.push(group);
    if(markAsDirty){
      group.get('IDTriggerAction').markAsDirty();
      group.get('Id').markAsDirty();
      group.get('Code').markAsDirty();
      group.get('Name').markAsDirty();
      group.get('Remark').markAsDirty();
      group.get('ERPProperty').markAsDirty();
      group.get('ProviderProperty').markAsDirty();
      group.get('DataType').markAsDirty();
      group.get('Format').markAsDirty();
      this.formGroup.get('TriggerActionDataMapping').markAsDirty();
    }
  }
}
