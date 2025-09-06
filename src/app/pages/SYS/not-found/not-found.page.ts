import { Component, ViewChild } from '@angular/core';
import { ActionSheetController, NavController, Platform } from '@ionic/angular';

import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.page.html',
	styleUrls: ['./not-found.page.scss'],
	standalone: false,
})
export class NotFoundPage extends PageBase {
	isShowFeature = true;
	show404 = false;

	funnelChart: any;
	@ViewChild('funnelCanvas') funnelCanvas;

	constructor(
		public actionSheetController: ActionSheetController,
		public env: EnvService,
		public navCtrl: NavController,
		public platform: Platform
	) {
		super();
	}

	loadedData() {}
}
