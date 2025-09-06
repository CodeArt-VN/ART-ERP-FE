import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';

import { SortConfig } from 'src/app/interfaces/options-interface';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { BRA_BranchProvider, OSM_TemplateProvider } from 'src/app/services/static/services.service';

@Component({
	selector: 'app-notification-template',
	templateUrl: 'notification-template.page.html',
	styleUrls: ['notification-template.page.scss'],
	standalone: false,
})
export class NotificationTemplatePage extends PageBase {
	constructor(
		public pageProvider: OSM_TemplateProvider,
		public branchProvider: BRA_BranchProvider,
		public modalController: ModalController,
		public popoverCtrl: PopoverController,
		public alertCtrl: AlertController,
		public loadingController: LoadingController,
		public env: EnvService,
		public navCtrl: NavController,
		public location: Location
	) {
		super();
		this.pageConfig.isShowFeature = true;
		this.pageConfig.isFeatureAsMain = true;
	}

	preLoadData(event?: any): void {
		super.preLoadData(event);

	}
	loadedData(event) {
		super.loadedData(event);
	}
}
