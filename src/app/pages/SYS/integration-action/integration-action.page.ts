import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';
import { BRA_BranchProvider, SYS_ActionProvider } from 'src/app/services/static/services.service';
import { Location } from '@angular/common';
import { SortConfig } from 'src/app/models/options-interface';

@Component({
    selector: 'app-integration-action',
    templateUrl: 'integration-action.page.html',
    styleUrls: ['integration-action.page.scss']
})
export class IntegrationActionPage extends PageBase {
    itemsState: any = [];
    isAllRowOpened = true;
    constructor(
        public pageProvider: SYS_ActionProvider,
        public branchProvider: BRA_BranchProvider,
        public modalController: ModalController,
		public popoverCtrl: PopoverController,
        public alertCtrl: AlertController,
        public loadingController: LoadingController,
        public env: EnvService,
        public navCtrl: NavController,
        public location: Location,
    ) {
        super();
        this.pageConfig.canDelete = true;
        this.pageConfig.canAdd = true;
    }
    statusList: [];

    preLoadData(event?: any): void {
        let sorted: SortConfig[] = [
            { Dimension: 'Id', Order: 'DESC' }
        ];
        this.pageConfig.sort = sorted;
        super.preLoadData(event);
    }
    loadedData(event) {
    
        this.buildFlatTree(this.items, this.itemsState, this.isAllRowOpened).then((resp: any) => {
          this.itemsState = resp;
        });
        super.loadedData(event);
      }
    
  toggleRowAll() {
    this.isAllRowOpened = !this.isAllRowOpened;
    this.itemsState.forEach((i) => {
      i.showdetail = !this.isAllRowOpened;
      this.toggleRow(this.itemsState, i, true);
    });
  }
}
