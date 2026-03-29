import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';

import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { OSM_CategoryProvider, OSM_UserSubcriptionDetailProvider } from 'src/app/services/static/services.service';

@Component({
	selector: 'app-notification-setting',
	templateUrl: 'notification-setting.page.html',
	styleUrls: ['notification-setting.page.scss'],
	standalone: false,
})
export class NotificationSettingPage extends PageBase {
	userSubcriptionDetailGroup;
	constructor(
		public pageProvider: OSM_CategoryProvider,
		public userSubcriptionDetailProvider: OSM_UserSubcriptionDetailProvider,
		public modalController: ModalController,
		public popoverCtrl: PopoverController,
		public alertCtrl: AlertController,
		public loadingController: LoadingController,
		public env: EnvService,
		public navCtrl: NavController,
		public location: Location,
		public formBuilder: FormBuilder
	) {
		super();
	}

	preLoadData(event?: any): void {
		super.preLoadData(event);
	}
	loadedData(event) {
		super.loadedData(event);
		console.log(this.items);
	}

	changeEnabled(item,event) {
		item.IsEnabled = event.detail.checked;
		this.userSubcriptionDetailProvider.save(item).then((result) => {});
	}
}
