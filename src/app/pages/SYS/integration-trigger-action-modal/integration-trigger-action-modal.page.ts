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
  IDProviderBefore;
  IDActionBefore;
  constructor(
    public pageProvider: SYS_TriggerActionProvider,
    public providerService: SYS_IntegrationProviderProvider,
    public actionService: SYS_ActionProvider,
    public schemaService: SYS_SchemaProvider,
    public triggerActionDataMappingService: SYS_TriggerActionDataMappingProvider,
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
    this.buildFormGroup();
  }

  providerDataSource: any;
  schemaDataSource: any;
  preLoadData(event) {
    this.id = this.Id;
    super.preLoadData(event);
  }

  loadedData(event?: any, ignoredFromGroup?: boolean): void {
    super.loadedData(event, ignoredFromGroup);
    this.formGroup.get('IDTrigger').setValue(this.IDTrigger);
    this.formGroup.get('IDTrigger').markAsDirty();
    this.actionDataSource = [];

    let queryProvider = {
      Keyword: '',
      Take: 100,
      Skip: 0,
    };

    let providerPromise = this.providerService.read(queryProvider, false);
    Promise.all([providerPromise]).then((results) => {
      let listProvider: any = results[0];
      if (listProvider != null && listProvider.data && listProvider.data.length > 0) {
        this.providerDataSource = listProvider.data;
      }
    });

    if (this.item?.IDProvider) {
      this.IDProviderBefore = this.item.IDProvider;
      this.IDActionBefore = this.item.IDAction;
      let queryAction = {
        Keyword: '',
        Take: 100,
        Skip: 0,
        IDProvider: this.formGroup.get('IDProvider').value,
      };
      this.actionService.read(queryAction, false).then((listAction: any) => {
        if (listAction != null && listAction.data.length > 0) {
          this.actionDataSource = listAction.data;
        }
      });

      if (this.item?.IDAction) {
        this.actionService.getAnItem(this.item.IDAction).then((data: any) => {
          if (data) {
            this.varibles = JSON.parse(data.Varibles);
            if (data.IDSchema) {
              this.schemaDetailDataSource = [];
              let querySchema = {
                Id: data.IDSchema,
                IDProvider: data.IDProvider,
              };
              this.schemaService.commonService
                .connect('GET', 'BI/Schema/GetSchemaWithProvider', querySchema)
                .toPromise()
                .then((data: any) => {
                  if (data) {
                    this.schemaDetailDataSource = data.Fields;
                    if (this.varibles) this.patchFieldsValue();
                  }
                });
            }
          }
        });
      }
    }
  }

  buildFormGroup() {
    this.formGroup = this.formBuilder.group({
      IDBranch: [this.env.selectedBranch],
      Id: new FormControl({ value: '', disabled: true }),
      IDProvider: ['', Validators.required],
      IDAction: ['', Validators.required],
      IDTrigger: ['', Validators.required],
      Code: [''],
      Name: [''],
      Remark: [''],
      Sort: [null],
      TriggerActionDataMappings: this.formBuilder.array([]),
      IsDisabled: new FormControl({ value: '', disabled: true }),
      IsDeleted: new FormControl({ value: '', disabled: true }),
      CreatedBy: new FormControl({ value: '', disabled: true }),
      CreatedDate: new FormControl({ value: '', disabled: true }),
      ModifiedBy: new FormControl({ value: '', disabled: true }),
      ModifiedDate: new FormControl({ value: '', disabled: true }),
      DeletedAction: new FormControl({ value: '', disabled: true }),
      DeletedFields: [[]],
    });
  }

  actionDataSource: any;
  changeProvider() {
    let triggerActionMappings = this.formGroup.getRawValue().TriggerActionDataMappings.filter((d) => d.Id > 0);
    let ids = triggerActionMappings.map((e) => e.Id);
    let detailLength = ids.length;
    if (detailLength > 0) {
      this.env
        .showPrompt(
          'Thay đổi Provider sẽ xoá hết các mapping hiện tại, bạn có tiếp tục?',
          null,
          'Xóa ' + detailLength + ' dòng',
        )
        .then((_) => {
          let deletedFields = ids;
          this.formGroup.get('DeletedFields').setValue(deletedFields);
          this.formGroup.get('DeletedFields').markAsDirty();
          this.formGroup.get('DeletedAction').setValue(true);
          this.formGroup.get('DeletedAction').markAsDirty();
          this.saveChange2();

          this.formGroup.get('IDAction').setValue('');
          this.formGroup.get('IDAction').markAsDirty();
          this.varibles = [];
          this.Id = 0;
          this.item = {};
          this.item.IDProvider = this.formGroup.get('IDProvider').value;

          this.buildFormGroup();
          this.preLoadData(event);
        })
        .catch((er) => {
          this.formGroup.get('IDProvider').setValue(this.IDProviderBefore);
          this.submitAttempt = false;
        });
    } else {
      let queryAction = {
        Keyword: '',
        Take: 100,
        Skip: 0,
        IDProvider: this.formGroup.get('IDProvider').value,
      };
      this.actionDataSource = [];
      this.varibles = [];
      this.formGroup.get('IDAction').setValue('');
      this.formGroup.get('IDAction').markAsDirty();
      this.clearTriggerActionMapping();
      this.actionService.read(queryAction, false).then((listAction: any) => {
        if (listAction != null && listAction.data.length > 0) {
          this.actionDataSource = listAction.data;
        }
      });
    }
  }
  varibles: any;

  patchFieldsValue() {
    this.clearTriggerActionMapping();
    this.getObjectKeys(this.varibles).forEach((e) => {
      this.addField(
        this.item.TriggerActionDataMappings?.find((d) => d.ProviderProperty == e),
        e,
      );
    });
    if (!this.pageConfig.canEdit || this.item.IsDisabled) {
      this.formGroup.controls.TriggerActionDataMappings.disable();
    }
  }

  addField(field: any, providerProperty, markAsDirty = false) {
    let groups = <FormArray>this.formGroup.controls.TriggerActionDataMappings;
    let group = this.formBuilder.group({
      IDTriggerAction: [this.formGroup.get('Id').value],
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
  }

  async changeAction(ev) {
    let localVariables = [];
    //clear varibles
    this.varibles = [];
    await this.actionService.getAnItem(ev.Id).then((data: any) => {
      if (data) {
        this.varibles = JSON.parse(data.Varibles);
        localVariables = this.varibles;
      }
    });

    let triggerActionMappings = this.formGroup.getRawValue().TriggerActionDataMappings.filter((d) => d.Id > 0);
    let ids = triggerActionMappings.map((e) => e.Id);
    let detailLength = ids.length;
    if (detailLength > 0) {
      this.env
        .showPrompt(
          'Thay đổi Action sẽ xoá hết các mapping hiện tại, bạn có tiếp tục?',
          null,
          'Xóa ' + detailLength + ' dòng',
        )
        .then((_) => {
          let deletedFields = ids;
          this.formGroup.get('DeletedFields').setValue(deletedFields);
          this.formGroup.get('DeletedFields').markAsDirty();
          this.varibles = [];
          this.varibles = localVariables;
          this.saveChange2();
          this.IDActionBefore = ev.Id;
        })
        .catch((er) => {
          this.formGroup.get('IDAction').setValue(this.IDActionBefore);
          this.submitAttempt = false;
        });
    } else {
      if (ev.IDSchema) {
        let query = {
          Id: ev.IDSchema,
          IDProvider: ev.IDProvider,
        };
        this.schemaDetailDataSource = [];
        this.schemaService.commonService
          .connect('GET', 'BI/Schema/GetSchemaWithProvider', query)
          .toPromise()
          .then((data: any) => {
            if (data) {
              this.schemaDetailDataSource = data.Fields;
              this.clearTriggerActionMapping();
              this.getObjectKeys(this.varibles).forEach((e) => {
                this.addField({}, e);
              });
            }
          });
      }
      this.saveChange2();
    }
  }

  getObjectKeys(obj: any): string[] {
    if (Array.isArray(obj)) {
      return obj.map((item) => item.Key);
    } else {
      return obj ? Object.keys(obj) : [];
    }
  }

  changeERPProperty(fg) {
    fg.get('IDTriggerAction').markAsDirty();
    fg.get('Id').markAsDirty();
    fg.get('ProviderProperty').markAsDirty();
    fg.get('ERPProperty').markAsDirty();
    this.saveChange2();
  }

  async savedChange(savedItem, form) {
    this.item = savedItem;
    super.savedChange(savedItem, form);
    this.patchFieldsValue();
  }
  schemaDetailDataSource: any = [];

  saveActionMapping() {
    //this.saveChange();
    this.modalController.dismiss();
  }
  clearTriggerActionMapping() {
    let groups = <FormArray>this.formGroup.controls.TriggerActionDataMappings;
    groups.clear();
  }
}
