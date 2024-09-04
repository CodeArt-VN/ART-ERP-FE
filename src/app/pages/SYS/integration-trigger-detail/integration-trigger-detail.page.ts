import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';
import {
  BRA_BranchProvider,
  SYS_ActionProvider,
  SYS_IntegrationProviderProvider,
  SYS_TriggerActionProvider,
  SYS_TriggerProvider,
} from 'src/app/services/static/services.service';
import { FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { CommonService } from 'src/app/services/core/common.service';
import { IntegrationTriggerActionModalPage } from '../integration-trigger-action-modal/integration-trigger-action-modal.page';

@Component({
  selector: 'app-integration-trigger-detail',
  templateUrl: './integration-trigger-detail.page.html',
  styleUrls: ['./integration-trigger-detail.page.scss'],
})
export class IntegrationTriggerDetailPage extends PageBase {
  typeList: any = [];
  actionDataSource: any;

  constructor(
    public pageProvider: SYS_TriggerProvider,
    public integrationProvider: SYS_IntegrationProviderProvider,
    public actionProvider: SYS_ActionProvider,
    public triggerActionProvider: SYS_TriggerActionProvider,
    public modalController: ModalController,
    public branchProvider: BRA_BranchProvider,
    public env: EnvService,
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public cdr: ChangeDetectorRef,
    public loadingController: LoadingController,
    public commonService: CommonService,
  ) {
    super();
    this.pageConfig.isDetailPage = true;
    this.pageConfig.canEdit = false;
    this.formGroup = formBuilder.group({
      IDBranch: [this.env.selectedBranch],
      Id: new FormControl({ value: '', disabled: true }),
      IDProvider: ['', Validators.required],
      IDAction: [''],
      Code: [''],
      Type: ['Event'],
      Icon: [''],
      Color: [''],
      Name: ['', Validators.required],
      Remark: [''],
      Sort: [''],
      TriggerActions: this.formBuilder.array([]),
      IsDisabled: new FormControl({ value: '', disabled: true }),
      IsDeleted: new FormControl({ value: '', disabled: true }),
      CreatedBy: new FormControl({ value: '', disabled: true }),
      CreatedDate: new FormControl({ value: '', disabled: true }),
      ModifiedBy: new FormControl({ value: '', disabled: true }),
      ModifiedDate: new FormControl({ value: '', disabled: true }),
    });
  }

  providerDataSource: any;
  preLoadData(event?: any): void {
    Promise.all([
      this.integrationProvider.read({ IsTriggerable: true }, false),
      this.env.getType('IntegrationTriggerType'),
      this.actionProvider.read(this.query, false),
    ]).then((values: any) => {
      this.providerDataSource = values[0].data;
      this.typeList = values[1];
      this.actionDataSource = values[2].data;
      super.preLoadData(event);
    });
  }

  loadedData(event?: any, ignoredFromGroup?: boolean): void {
    super.loadedData(event, ignoredFromGroup);
    if (!this.item.Id) {
      this.formGroup.get('Type').markAsDirty();
    }
    this.query.Id = undefined;
    this.actionDataSource = [];
    if (this.formGroup.controls.IDProvider?.value) {
      //   this.query.IDProvider = this.formGroup.controls.IDProvider?.value;
      this.query.IsTriggerable = true;
      this.actionProvider.read(this.query, false).then((listAction: any) => {
        if (listAction != null && listAction.data.length > 0) {
          this.actionDataSource = listAction.data;
        }
      });
    }

    this.query.IDProvider = undefined;
    if (this.item.Id) {
      this.query.IDTrigger = this.item.Id;
      this.query.IsDisabled = 'skipped';
      this.triggerActionProvider.read(this.query, false).then((listTGA: any) => {
        this.item.TriggerActions = listTGA.data;
        if (listTGA != null && listTGA.data.length > 0) {
          if (this.item.TriggerActions?.length) {
            this.patchFieldsValue();
          }
        } else {
          let groups = <FormArray>this.formGroup.controls.TriggerActions;
          groups.clear();
        }
      });
      this.query.IDTrigger = undefined;
      this.query.IsDisabled = undefined;
    }
  }

  private patchFieldsValue() {
    this.pageConfig.showSpinner = true;
    this.formGroup.controls.TriggerActions = new FormArray([]);
    if (this.item.TriggerActions?.length) {
      this.item.TriggerActions.forEach((i) => this.addField(i));
    }
    this.pageConfig.showSpinner = false;
  }

  addField(field: any, markAsDirty = false) {
    let groups = <FormArray>this.formGroup.controls.TriggerActions;
    let group = this.formBuilder.group({
      IDTrigger: [field.IDTrigger],
      IDAction: [field.IDAction],
      IDProvider: [field.IDProvider],
      ActionName: [field.ActionName],
      ProviderName: [field.ProviderName],
      Id: new FormControl({ value: field.Id, disabled: false }),
      Code: new FormControl({ value: field.Code, disabled: false }),
      Name: new FormControl({ value: field.Name, disabled: false }),
      Remark: new FormControl({ value: field.Remark, disabled: false }),
      Sort: new FormControl({ value: field.Sort, disabled: false }),
      IsDisabled: new FormControl({ value: field.IsDisabled, disabled: false }),
    });
    groups.push(group);
    if (markAsDirty) {
      group.get('IDTrigger').markAsDirty();
      group.get('IDAction').markAsDirty();
      group.get('Id').markAsDirty();
      group.get('Code').markAsDirty();
      group.get('Name').markAsDirty();
      group.get('Remark').markAsDirty();
      group.get('Sort').markAsDirty();
      this.formGroup.get('TriggerActions').markAsDirty();
    }
  }

  removeField(fg, j) {
    let groups = <FormArray>this.formGroup.controls.TriggerActions;
    let itemToDelete = fg.getRawValue();
    this.env.showPrompt('Bạn có chắc muốn xóa không?', null, 'Xóa 1 dòng').then((_) => {
      this.triggerActionProvider.delete(itemToDelete).then((result) => {
        groups.removeAt(j);
        this.env.showMessage('Saving completed!', 'success');
      });
    });
  }

  async showActionModal(fg) {
    const modal = await this.modalController.create({
      component: IntegrationTriggerActionModalPage,
      componentProps: {
        Id: fg?.controls.Id.value ?? 0,
        IDTrigger: this.formGroup.controls.Id.value,
        IDAction: fg?.controls.IDAction.value,
        IDProvider: fg?.controls.IDProvider.value,
      },
      cssClass: 'modal90',
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    this.loadedData();
  }

  doReorder(ev, groups) {
    let obj = [];
    groups = ev.detail.complete(groups);
    for (let i = 0; i < groups.length; i++) {
      const g = groups[i];
      g.controls.Sort.setValue(i + 1);
      g.controls.Sort.markAsDirty();
      obj.push({
        Id: g.get('Id').value,
        Sort: g.get('Sort').value,
      });
    }
    if (obj.length > 0) {
      this.pageProvider.commonService
        .connect('PUT', 'SYS/TriggerAction/putSort', obj)
        .toPromise()
        .then((rs) => {
          if (rs) {
            this.env.showMessage('Saving completed!', 'success');
          } else {
            this.env.showMessage('Cannot save, please try again', 'danger');
          }
        });
    }
  }

  changeEnableAction(fg, e) {
    this.triggerActionProvider.disable(fg.getRawValue(), !e.target.checked).then((resp) => {
      if (resp) {
        this.env.showMessage('Saving completed!', 'success');
      } else {
        this.env.showMessage('Cannot save, please try again', 'danger');
      }
    });
  }

  async saveChange() {
    this.saveChange2();
  }

  saveChange2(form = this.formGroup, publishEventCode = this.pageConfig.pageName, provider = this.pageProvider) {
    return new Promise((resolve, reject) => {
      this.formGroup.updateValueAndValidity();
      if (!form.valid) {
        this.env.showMessage('Please recheck information highlighted in red above', 'warning');
      } else if (this.submitAttempt == false) {
        this.submitAttempt = true;
        let submitItem = this.getDirtyValues(form);

        provider
          .save(submitItem, this.pageConfig.isForceCreate)
          .then((savedItem: any) => {
            resolve(savedItem);
            this.savedChange(savedItem, form);
            this.item = savedItem;
            this.loadedData();
            if (publishEventCode) this.env.publishEvent({ Code: publishEventCode });
          })
          .catch((err) => {
            this.env.showMessage('Cannot save, please try again', 'danger');
            this.cdr.detectChanges();
            this.submitAttempt = false;
            reject(err);
          });
      }
    });
  }
  
  isModalOpen = false;
  segmentViewModal = 's1';
  segmentChanged(ev){
    this.segmentViewModal= ev.detail.value;
    console.log( this.segmentViewModal);
  }
  ErrorMessage = null;
  runTrigger() {
    this.env
      .showLoading(
        'Please wait for a few moments',
        this.pageProvider.commonService.connect('POST', 'SYS/Trigger/Run', { Id: this.item.Id }).toPromise(),
      )
      .then((_) => {
        this.env.showMessage('Running completed!', 'success');
        console.log(_);
      })
      .catch((err:any) => {
        try{
          if(err.error?.Message){
            let message = JSON.parse(err.error?.Message);
            console.log(message)
            this.env.showMessage(message.Error, 'danger');

          }
        }
        catch(err){
          this.env.showMessage('Cannot run, please try again', 'danger');
        }
        // this.env.showMessage('Cannot run, please try again', 'danger');
      });
  }
}
