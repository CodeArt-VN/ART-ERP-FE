import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';
import { BRA_BranchProvider, SYS_SegmentProvider, SYS_ActionProvider, SYS_IntegrationProviderProvider } from 'src/app/services/static/services.service';
import { Location } from '@angular/common';
import { SortConfig } from 'src/app/models/options-interface';

@Component({
	selector: 'app-notification-segment',
	templateUrl: 'notification-segment.page.html',
	styleUrls: ['notification-segment.page.scss'],
	standalone: false,
})
export class NotificationSegmentPage extends PageBase {
	constructor(
		public pageProvider: SYS_SegmentProvider,
		public providerService: SYS_IntegrationProviderProvider,
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

	preLoadData(event?: any): void {
		super.preLoadData(event);
	}
	loadedData(event) {
		super.loadedData(event);
	}
}
