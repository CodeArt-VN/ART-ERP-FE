import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';
import { lib } from 'src/app/services/static/global-functions';
import { SYS_APICollectionProvider, SYS_ActionAPIRunnerProvider, SYS_ActionProvider, SYS_IntegrationProviderProvider, SYS_SchemaProvider, SYS_TriggerActionProvider, } from 'src/app/services/static/services.service';
import { FormBuilder, FormControl, FormArray, Validators, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/core/common.service';
import {SYS_Action, } from 'src/app/models/model-list-interface';
import { Subject, catchError, concat, distinctUntilChanged, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-integration-action-detail',
  templateUrl: './integration-action-detail.page.html',
  styleUrls: ['./integration-action-detail.page.scss'],
})
export class IntegrationActionDetailPage extends PageBase {
  providerDataSource: any = [];
  schemaDataSource :any = [];
  typeList :any = [];
  IDProviderBefore;
  apiCollectionDataSource : any = [];
  Runners:any;
  isDisabled = true;
  constructor(
    public pageProvider: SYS_ActionProvider,
    public integrationProvider: SYS_IntegrationProviderProvider,
    public schemaProvider: SYS_SchemaProvider,
    public apiCollectionProvider: SYS_APICollectionProvider,
    public actionAPIRunnerProvider : SYS_ActionAPIRunnerProvider,
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
    this.formGroup = this.formBuilder.group({
      Id: new FormControl({ value: '', disabled: true }),
      IDProvider: ['', Validators.required],
      IDSchema: [null],
      Name: [''],
      Code: [''],
      Remark: [''],
      Type: [''],
      Group: [''],
      IsTriggerable: new FormControl({ value: false, disabled: false }),
      RunnerConfig:[''],

      IsDisabled: new FormControl({ value: '', disabled: true }),
      IsDeleted: new FormControl({ value: '', disabled: true }),
      CreatedBy: new FormControl({ value: '', disabled: true }),
      CreatedDate: new FormControl({ value: '', disabled: true }),
      ModifiedBy: new FormControl({ value: '', disabled: false }),
      ModifiedDate: new FormControl({ value: '', disabled: false }),
      // DeletedFields: [[]],
    });
    this.Runners = this.formBuilder.array([]);
  }

  preLoadData(event?: any): void {
    this.typeList = [{ Code: 'Import',Name:'Import' }, { Code: 'Export',Name:'Export' }, { Code: 'Changed',Name:'Changed' }];
    Promise.all([
      this.schemaProvider.read(),
       this.integrationProvider.read()
    ]).then((values: any) => {
      this.schemaDataSource = values[0].data;
      this.providerDataSource = values[1].data;
    })
    super.preLoadData(event);
  }

  loadedData(event?: any, ignoredFromGroup?: boolean): void {
   
    super.loadedData(event, ignoredFromGroup);
 
  // this._schemaDatasource.selected = 
  // this._schemaDatasource.initSearch();
  if(this.item.IDProvider){
    this.IDProviderBefore = this.item.IDProvider;
    this.query.IDProvider = this.item.IDProvider;
    this.query.IDAction = this.item.Id;
    this.query.IsDisabled = 'Skipped';
    Promise.all([
      this.actionAPIRunnerProvider.read(this.query),
      this.apiCollectionProvider.read(this.query)
    ]).then((values: any) => {
      
      if(values[0].data != null && (values[0].data.length>0)){
        this.Runners.clear();
        this.item.Runners = values[0].data;
        this.patchRunnersValue();
      }
      if(values[1] && values[1].data){
        this.buildFlatTree(values[1].data, this.apiCollectionDataSource, true).then((resp: any) => {
          this.apiCollectionDataSource = resp;
          this.apiCollectionDataSource.forEach(i=> {
            if(i.Type != 'Request'){
              i.disabled = true;
            }
          })
        });
      }
      this.query.IDProvider = undefined;
      this.query.IDAction = undefined;
    });
  }

  // if(this.item.IntegrationProvider){
  //   this.providerDataSource.selected = [this.item.IntegrationProvider];
  // }
  // this.providerDataSource.initSearch();
  //   this.formGroup.get('IDProvider').markAsDirty();
  // }
  }
  patchRunnersValue(){
    if (this.item.Runners?.length) {
      this.item.Runners.forEach((i) => this.addRunner(i));
    }
    
    if (!this.pageConfig.canEdit || !this.item.IDProvider) {
      this.Runners.disable();
    }
  }
  addRunner(field:any,markAsDirty = false){
    let IDProvider = this.formGroup.get('IDProvider').value;
    let runner  = this.formBuilder.group({
      IDAPICollection:[field.IDAPICollection,Validators.required],
      IDAction:[this.formGroup.get('Id').value,Validators.required],
      Id: new FormControl({ value: field.Id, disabled: true }),
      Type:[field.Type],
      Code:[field.Code],
      Name:[field.Name],
      Remark: [field.Remark],
      Sort:[field.Sort],
      Body:[field?.APICollection?.Body],
      IsDisabled: new FormControl({ value: field.IsDisabled, disabled: false, }),
      IsDeleted: new FormControl({ value: field.IsDeleted, disabled: true, }),
      CreatedBy: new FormControl({ value: field.CreatedBy, disabled: true, }),
      CreatedDate: new FormControl({ value: field.CreatedDate, disabled: true, }),
      ModifiedBy: new FormControl({ value: field.ModifiedBy, disabled: true, }),
      ModifiedDate: new FormControl({ value: field.ModifiedDate, disabled: true, }),
    });
    runner.get('IDAction').markAsDirty();
    this.Runners.push(runner);
  }
  changeProvider(){
    let providerId = this.formGroup.get('IDProvider').value;
    this.query.IDProvider =providerId;
    let detailLength = this.Runners.controls.length;
    if(detailLength>0){
      this.env.showPrompt('Thay đổi provider sẽ xoá hết API Collection, bạn có tiếp tục?', null, 'Xóa ' + detailLength + ' dòng')
      .then(_ => {
        this.query.IDProvider = providerId;
        this.actionAPIRunnerProvider.delete(this.Runners.getRawValue()).then(_=>{
          this.Runners.clear();
          this.convertRunnerConfig();
          this.apiCollectionProvider.read( this.query).then((result: any)=>{
            if(result && result.data){
              this.buildFlatTree(result.data, this.apiCollectionDataSource, true).then((resp: any) => {
                this.apiCollectionDataSource = resp;
                this.apiCollectionDataSource.forEach(i=> {
                  if(i.Type != 'Request'){
                    i.disabled = true;
                  }
                })
              });
       
            }
          });
        });
      
      }).catch((er) => {
        this.formGroup.get('IDProvider').setValue(this.IDProviderBefore);
        this.submitAttempt = false;
      });
    }
    else{
      this.formGroup.get('IDProvider').markAsDirty();
      this.apiCollectionProvider.read( this.query).then((result: any)=>{
        if(result && result.data){
          this.buildFlatTree(result.data, this.apiCollectionDataSource, true).then((resp: any) => {
            this.apiCollectionDataSource = resp;
            this.apiCollectionDataSource.forEach(i=> {
              if(i.Type != 'Request'){
                i.disabled = true;
              }
            })
          });
   
        }
      });
      this.saveChange();
    }
   
  }

    saveChangeRunner(fg: FormGroup) {
      this.saveChange2(fg, null, this.actionAPIRunnerProvider)
  }
 
  changeEnableRunner(fg, e) {
    this.actionAPIRunnerProvider.disable(fg.getRawValue(), !e.target.checked).then((resp) => {
      if (resp) {
        fg.get('IsDisabled').setValue(!e.target.checked);
        this.env.showTranslateMessage('Saving completed!', 'success');
      } else {
        this.env.showTranslateMessage('Cannot save, please try again', 'danger');
      }
      this.convertRunnerConfig();
    });
  }

  deleteItems(){
    if (this.pageConfig.canDelete) {
      let length = this.Runners.controls.length
      this.env.showPrompt('Bạn chắc muốn xóa Runners đang chọn?', null, 'Xóa ' + length + ' dòng').then(_ => {
        this.actionAPIRunnerProvider.delete(this.Runners.getRawValue()).then(_=>{
          this.Runners.clear()
          this.convertRunnerConfig();
          this.env.showTranslateMessage('Saved change!', 'success');
        });
      });
    }
  }
  removeField(fg, j) {
    let itemToDelete = fg.getRawValue();
    if(!itemToDelete.Id) this.Runners.removeAt(j);
    else{
      this.env.showPrompt('Bạn chắc muốn xóa ?', null, 'Xóa ' + 1 + ' dòng').then(_ => {
        this.actionAPIRunnerProvider.delete(itemToDelete).then(result => {
            this.Runners.removeAt(j);
            this.convertRunnerConfig();
            this.saveChange();
        })
    })
    }
   
}
changeAPICollection(c){
  this.saveChangeRunner(c);
  this.submitAttempt = false
  this.convertRunnerConfig();
}
convertRunnerConfig(){
  let runnerConfig = {};
  this.Runners.controls.forEach(r=>{
    if(r.get('IsDisabled').value) return false;
    let body = '';
    if(r.get('Body').value) body = JSON.parse(r.get('Body').value).Value
    if (body){
      const bodyJson = JSON.parse( body); 
      Object.assign(runnerConfig, bodyJson);
    }
  });
  this.formGroup.get('RunnerConfig').setValue(JSON.stringify(runnerConfig));
  this.formGroup.get('RunnerConfig').markAsDirty();
  this.saveChange();
}


doReorder(ev, groups) {
  let obj = [];
  groups = ev.detail.complete(groups);
  for (let i = 0; i < groups.length; i++) {
    const g = groups[i];
    g.controls.Sort.setValue(i + 1);
    g.controls.Sort.markAsDirty();
    obj.push({
      Id : g.get('Id').value,
      Sort : g.get('Sort').value,
    });
  }
  if(obj.length>0){
    this.actionAPIRunnerProvider.commonService.connect('PUT','SYS/ActionAPIRunner/putSort',obj).toPromise().then(rs=>{
      if(rs){
        this.env.showTranslateMessage('Saving completed!','success');
      }
      else{
        this.env.showTranslateMessage('Cannot save, please try again','danger');
      }
    })
  }
}

  segmentView = 's1';
  segmentChanged(ev: any) {
    this.segmentView = ev.detail.value;
  }

  toggleReorder() {
    this.isDisabled = !this.isDisabled;
  }
}