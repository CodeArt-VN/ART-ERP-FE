import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { VMS_CameraProvider } from 'src/app/services/static/services.service';

/** ACL list — grant/manage on camera detail → Permissions segment. */
@Component({
	selector: 'app-vms-permission',
	templateUrl: 'vms-permission.page.html',
	styleUrls: ['vms-permission.page.scss'],
	standalone: false,
})
export class VmsPermissionPage extends PageBase {
	constructor(
		public pageProvider: VMS_CameraProvider,
		public modalController: ModalController,
		public popoverCtrl: PopoverController,
		public alertCtrl: AlertController,
		public loadingController: LoadingController,
		public env: EnvService,
		public navCtrl: NavController,
		public location: Location
	) {
		super();
		this.pageConfig.canAdd = false;
		this.pageConfig.canDelete = false;
	}

	preLoadData(event?: any): void {
		this.pageConfig.pageIcon = 'lock-closed-outline';
		super.preLoadData(event);
	}
}
