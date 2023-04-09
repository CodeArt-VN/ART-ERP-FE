import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { BRA_BranchProvider, PR_DealProvider } from 'src/app/services/static/services.service';

@Component({
  selector: 'app-pr-deal',
  templateUrl: './pr-deal.page.html',
  styleUrls: ['./pr-deal.page.scss'],
})
export class PRDealPage extends PageBase {
  constructor(
      public pageProvider: PR_DealProvider,
      public branchProvider: BRA_BranchProvider,
      public modalController: ModalController,
      public popoverCtrl: PopoverController,
      public alertCtrl: AlertController,
      public loadingController: LoadingController,
      public env: EnvService,
      public navCtrl: NavController
  ) {
      super();
  }
  // loadedData(event?: any, ignoredFromGroup?: boolean): void {
    
  // }
}
