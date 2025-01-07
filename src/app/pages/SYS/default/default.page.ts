import { Component } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';

@Component({
    selector: 'app-default',
    templateUrl: './default.page.html',
    styleUrls: ['./default.page.scss'],
    standalone: false
})
export class DefaultPage extends PageBase {
  constructor(
    public actionSheetController: ActionSheetController,
    public env: EnvService,
    public navCtrl: NavController,
  ) {
    super();
  }
}
