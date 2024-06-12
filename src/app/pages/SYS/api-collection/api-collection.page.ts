import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';
import { BRA_BranchProvider, SYS_APICollectionProvider } from 'src/app/services/static/services.service';
import { Location } from '@angular/common';
import { SortConfig } from 'src/app/models/options-interface';

@Component({
  selector: 'app-api-collection',
  templateUrl: 'api-collection.page.html',
  styleUrls: ['api-collection.page.scss'],
})
export class APICollectionPage extends PageBase {
  itemsState: any = [];
  isAllRowOpened = true;
  itemsView = [];
  constructor(
    public pageProvider: SYS_APICollectionProvider,
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
    this.query.Take = 5000;
    this.pageConfig.canDelete = true;
    this.pageConfig.canAdd = true;
  }
  statusList: [];

  preLoadData(event?: any): void {
    let sorted: SortConfig[] = [
        { Dimension: 'Name', Order: 'ASC' }
    ];
    this.pageConfig.sort = sorted;
    super.preLoadData(event);
  }
  loadedData(event) {
    this.buildFlatTree(this.items, this.itemsState, this.isAllRowOpened).then((resp: any) => {
      this.itemsState = resp;
      this.itemsView = this.itemsState.filter((d) => d.show);
    });
    super.loadedData(event);
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
}
