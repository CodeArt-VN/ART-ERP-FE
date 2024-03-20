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
  Id;
  IDTrigger;
  IDAction;
  IDProvider;
  IDTriggerAction;
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
    this.pageConfig.isDetailPage = true;
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
      TriggerActionDataMappings: this.formBuilder.array([]),
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
    this.query.Id = this.Id;
    this.id = this.Id;
    super.preLoadData(event);
  }

  loadedData(event?: any, ignoredFromGroup?: boolean): void {
    super.loadedData(event, ignoredFromGroup);

    this.formGroup.get('Id').setValue(this.Id);
    this.formGroup.get('Id').markAsDirty();
    this.formGroup.get('IDTrigger').setValue(this.IDTrigger);
    this.formGroup.get('IDTrigger').markAsDirty();

    let queryIntegration = {
      Keyword: '',
      Take: 100,
      Skip: 0,
    };
    let providerPromise = this.integrationProvider.read(queryIntegration, false);
    Promise.all([providerPromise]).then((results) => {
      let listProvider: any = results[0];
      if (listProvider != null && listProvider.data && listProvider.data.length > 0) {
        this.providerDataSource = listProvider.data;
      }
    });

    if (this.item) {
      this.IDTriggerAction = this.item.Id;
      let provider = {
        Id: this.item.IDProvider,
      };
      this.changeProvider(provider, this.item.IDAction);
    }
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
  async changeProvider(e, idAction = null) {
    this.formGroup.get('IDProvider').setValue(e.Id);
    this.formGroup.get('IDProvider').markAsDirty();
    this.formGroup.get('ProviderName').setValue(e.Name);
    let queryAction = {
      Keyword: '',
      Take: 100,
      Skip: 0,
      IDProvider: e.Id,
    };
    this.actionProvider.read(queryAction, false).then((listAction: any) => {
      if (listAction != null && listAction.data.length > 0) {
        this.actionDataSource = listAction.data;
        let action = {
          Id: idAction,
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
          this.patchTriggerActionDataMapping();
        }
      });
    }
  }

  patchTriggerActionDataMapping() {
    let groups = <FormArray>this.formGroup.controls.TriggerActionDataMappings;
    groups.clear();
    this.getObjectKeys(this.runnerConfigList).forEach((e) => {
      this.addField(
        this.item.TriggerActionDataMappings?.find((d) => d.ProviderProperty == e),
        e,
        true,
      );
    });
  }

  addField(field: any, providerProperty, markAsDirty = false) {
    let groups = <FormArray>this.formGroup.controls.TriggerActionDataMappings;
    let group = this.formBuilder.group({
      IDTriggerAction: [this.IDTrigger],
      Id: [field?.Id ?? 0],
      Code: new FormControl({ value: field?.Code, disabled: false }),
      Name: new FormControl({ value: field?.Name, disabled: false }),
      Remark: new FormControl({ value: field?.Remark, disabled: false }),
      ERPProperty: new FormControl({ value: field?.ERPProperty, disabled: false }),
      ProviderProperty: new FormControl({
        value: field?.ProviderProperty ? field?.ProviderProperty : providerProperty ? providerProperty : '',
        disabled: false,
      }),
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
    if (markAsDirty) {
      group.get('IDTriggerAction').markAsDirty();
      group.get('Id').markAsDirty();
      group.get('Code').markAsDirty();
      group.get('Name').markAsDirty();
      group.get('Remark').markAsDirty();
      group.get('ERPProperty').markAsDirty();
      group.get('ProviderProperty').markAsDirty();
      group.get('DataType').markAsDirty();
      group.get('Format').markAsDirty();
      this.formGroup.get('TriggerActionDataMappings').markAsDirty();
    }
  }
}
