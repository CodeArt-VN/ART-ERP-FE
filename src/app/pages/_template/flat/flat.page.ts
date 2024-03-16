import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';
import { BRA_BranchProvider, WMS_ZoneProvider } from 'src/app/services/static/services.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-flat',
  templateUrl: 'flat.page.html',
  styleUrls: ['flat.page.scss'],
})
export class FlatPage extends PageBase {
  constructor(
    public pageProvider: WMS_ZoneProvider,
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
  }
}
