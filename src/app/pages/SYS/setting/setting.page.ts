import { Component } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.page.html',
    styleUrls: ['./setting.page.scss'],
    standalone: false
})
export class SettingPage extends PageBase {
  constructor(
    public actionSheetController: ActionSheetController,
    public env: EnvService,
    public navCtrl: NavController,
  ) {
    super();
  }

  add() {}
}
