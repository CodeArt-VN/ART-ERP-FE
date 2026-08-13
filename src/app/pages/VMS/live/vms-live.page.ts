import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { VMS_CameraProvider, VMS_EventProvider } from 'src/app/services/vms/vms.providers';

@Component({
	selector: 'app-vms-live',
	templateUrl: 'vms-live.page.html',
	styleUrls: ['vms-live.page.scss'],
	standalone: false,
})
export class VmsLivePage extends PageBase {
	cameras: any[] = [];
	recent: any[] = [];

	constructor(
		public pageProvider: VMS_CameraProvider,
		public eventProvider: VMS_EventProvider,
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
		this.pageConfig.pageIcon = 'play-circle-outline';
		this.query.IgnoredBranch = true;
		super.preLoadData(event);
	}

	loadData(event = null, forceReload = false) {
		this.pageConfig.showSpinner = true;
		const q = { IgnoredBranch: true };
		Promise.all([this.pageProvider.read(q, true), this.eventProvider.read(q, true)])
			.then(([cams, evs]: any[]) => {
				this.cameras = cams?.data || [];
				this.items = this.cameras;
				this.recent = (evs?.data || []).slice(0, 20);
				this.loadedData(event);
			})
			.catch(() => this.loadedData(event));
	}
}
