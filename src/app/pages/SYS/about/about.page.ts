import { Component } from '@angular/core';
import { ActionSheetController, NavController, Platform } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';




@Component({
    selector: 'app-about',
    templateUrl: 'about.page.html',
    styleUrls: ['about.page.scss'],
})
export class AboutPage extends PageBase{
    constructor(
        public actionSheetController: ActionSheetController,
        public env: EnvService,
        public navCtrl: NavController,
        public platform: Platform,
    ) {
        super();
    }
}
