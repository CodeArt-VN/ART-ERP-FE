import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';
import { BRA_BranchProvider, SYS_APICollectionProvider, SYS_IntegrationProviderProvider } from 'src/app/services/static/services.service';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/services/core/common.service';
import { SortConfig } from 'src/app/models/options-interface';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-api-collection',
  templateUrl: 'api-collection.page.html',
  styleUrls: ['api-collection.page.scss'],
})
export class APICollectionPage extends PageBase {
  itemsState: any = [];
  isAllRowOpened = true;
  itemsView = [];
  statusList: [];
  fileImport : any;
  providerDataSource :[];
   constructor(
    public pageProvider: SYS_APICollectionProvider,
    public integrationProvider: SYS_IntegrationProviderProvider,
    public branchProvider: BRA_BranchProvider,
    public commonService: CommonService,
    public modalController: ModalController,
    public formBuilder: FormBuilder,
     public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public loadingController: LoadingController,
    public env: EnvService,
    public navCtrl: NavController,
    public location: Location,
  ) {
    super();
    this.query.Take = 5000;
    this.pageConfig.canDelete = true;
    this.pageConfig.canAdd = true;
    this.formGroup = this.formBuilder.group({
        IDProvider:['']
    });
  }
  
  
  preLoadData(event?: any): void {
    let sorted: SortConfig[] = [
        { Dimension: 'Name', Order: 'ASC' }
    ];
    this.pageConfig.sort = sorted;
    Promise.all([
      this.integrationProvider.read( this.query),
    ]).then((values: any) => {
      this.providerDataSource = values[0].data
    })
    super.preLoadData(event);
  }
  loadedData(event) {
    this.buildFlatTree(this.items, this.itemsState, this.isAllRowOpened).then((resp: any) => {
      this.itemsState = resp;
      this.itemsView = this.itemsState.filter((d) => d.show);
    });
    super.loadedData(event);
  }

  ngOnDestroy() {
    this.dismissPopover();
  }

  @ViewChild('popoverPub') popoverPub;
  isOpenPopover = false;
  dismissPopover(apply: boolean = false) {
    if (!this.isOpenPopover) return;

    if (!apply) {
      // this.form.patchValue(this._reportConfig?.DataConfig);
    } else {
      this.submitAttempt = true;
      this.env.publishEvent({ Code: 'app:ShowAppMessage', IsShow: true, Id: 'FileImport', Icon: 'flash', IsBlink: true, Color: 'danger', Message: 'đang import' });
            const reader = new FileReader();

            if (this.fileImport.type === "application/json") {
            reader.onload = (e) => {
                try {
                  if(!this.formGroup.get('IDProvider').value){
                    this.submitAttempt = false;

                  }
                  const jsonObject = JSON.parse(reader.result as string);
                  let queryPostMan = {
                    Code : jsonObject.info._postman_id
                  }
                  let obj = {
                    IDProvider : this.formGroup.get('IDProvider').value,
                    apicollection : jsonObject,
                    ForceDelete : true
                  }
                  this.pageProvider.read(queryPostMan, false).then((result: any) => {
                    if (result.data.length > 0) {
                      this.env.showPrompt('Collection đã tồn tại, Bạn có muốn import copy?')
                      .then((_) => {
                          obj.ForceDelete = false;
                          this.env.showLoading('Please wait for a few moments', 
                          this.commonService.connect("POST", "SYS/APICollection/ImportJson/",obj).toPromise())
                              .then((resp:any) => {
                                  this.submitAttempt = false;
                                  this.env.publishEvent({ Code: 'app:ShowAppMessage', IsShow: false, Id: 'FileImport' });
                                  this.refresh();
                                
                              }).catch(err => {
                                  this.submitAttempt = false;
                                  this.env.publishEvent({ Code: 'app:ShowAppMessage', IsShow: false, Id: 'FileImport' });
                                  this.refresh();
                                  this.env.showMessage('erp.app.pages.sale.sale-order.message.import-error', 'danger');
                              })
                      })
                      .catch((_) => {
                        this.env.showLoading('Please wait for a few moments', 
                        this.commonService.connect("POST", "SYS/APICollection/ImportJson/",obj).toPromise())
                            .then((resp:any) => {
                                this.submitAttempt = false;
                                this.env.publishEvent({ Code: 'app:ShowAppMessage', IsShow: false, Id: 'FileImport' });
                                this.refresh();
                              
                            }).catch(err => {
                                this.submitAttempt = false;
                                this.env.publishEvent({ Code: 'app:ShowAppMessage', IsShow: false, Id: 'FileImport' });
                                this.refresh();
                                this.env.showMessage('erp.app.pages.sale.sale-order.message.import-error', 'danger');
                            })
                      });
                    }
                    else{
                        this.env.showLoading('Please wait for a few moments', 
                        this.commonService.connect("POST", "SYS/APICollection/ImportJson/",obj).toPromise())
                            .then((resp:any) => {
                                this.submitAttempt = false;
                                this.env.publishEvent({ Code: 'app:ShowAppMessage', IsShow: false, Id: 'FileImport' });
                                this.refresh();
                              
                            }).catch(err => {
                                this.submitAttempt = false;
                                this.env.publishEvent({ Code: 'app:ShowAppMessage', IsShow: false, Id: 'FileImport' });
                                this.refresh();
                                this.env.showMessage('erp.app.pages.sale.sale-order.message.import-error', 'danger');
                            })
                      };
                });
              
                
                } catch (error) {
                  this.env.showMessage("Error parsing JSON:", 'danger');
                }
              };
              reader.onerror = (e) => {
                this.env.showMessage("File could not be read:", 'danger');
              };
              reader.readAsText(this.fileImport);
            } else {
              this.env.showMessage("Please select a valid JSON file.", 'danger');
            }

    }
    this.isOpenPopover = false;
  }
  presentPopover(event) {
    this.isOpenPopover = true;
  }


  toggleRowAll() {
    this.isAllRowOpened = !this.isAllRowOpened;
    this.itemsState.forEach((i) => {
      i.showdetail = !this.isAllRowOpened;
      this.toggleRow(this.itemsState, i, true);
    });
    this.itemsView = this.itemsState.filter((d) => d.show);
  }

  toggleRow(ls, ite, toogle = false) {
    super.toggleRow(ls, ite, toogle);
    this.itemsView = this.itemsState.filter((d) => d.show);
  }
  
  @ViewChild('importfile') importfileJson: any;
  onClickImport() {
      this.presentPopover(null);
    
  }

  async import(event) {
      
    if (this.submitAttempt) {
      this.env.showMessage('erp.app.pages.sale.sale-order.message.importing', 'primary');
      return;
    }
    this.fileImport = event.target.files[0];
    this.presentPopover(event)
  }
 
}
