import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';
import { BRA_BranchProvider, OSM_NotificationProvider } from 'src/app/services/static/services.service';
import { Location } from '@angular/common';
import { SortConfig } from 'src/app/models/options-interface';
import { NotificationsComponent } from 'src/app/components/notifications/notifications.component';

@Component({
	selector: 'app-notifications',
	templateUrl: 'notifications.page.html',
	styleUrls: ['notifications.page.scss'],
	standalone: false,
})
export class NotificationsPage extends PageBase {
	@ViewChild('notificationComponent') notificationComponent!: NotificationsComponent;
	constructor(
		public pageProvider: OSM_NotificationProvider,
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
	}

	preLoadData(event?: any): void {}
	loadedData(event) {}

	ionViewWillEnter() {
		this.refresh();
	}

	refresh() {
		this.notificationComponent.refresh();
	}
}
