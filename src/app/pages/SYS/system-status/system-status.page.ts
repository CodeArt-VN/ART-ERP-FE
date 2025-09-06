import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController } from '@ionic/angular';

import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { SYS_StatusProvider } from 'src/app/services/static/services.service';
import { SystemStatusDetailPage } from '../system-status-detail/system-status-detail.page';

@Component({
	selector: 'app-system-status',
	templateUrl: 'system-status.page.html',
	styleUrls: ['system-status.page.scss'],
	standalone: false,
})
export class SystemStatusPage extends PageBase {
	itemsState: any = [];
	isAllRowOpened = true;

	constructor(
		public pageProvider: SYS_StatusProvider,
		public modalController: ModalController,
		public alertCtrl: AlertController,
		public loadingController: LoadingController,
		public env: EnvService,
		public navCtrl: NavController
	) {
		super();
		this.pageConfig.forceLoadData = true;
		this.query.Take = 5000;
		this.query.AllChildren = true;
		this.query.AllParent = true;
	}

	loadedData(event) {
		this.buildFlatTree(this.items, this.itemsState, this.isAllRowOpened).then((resp: any) => {
			this.itemsState = resp;
		});
		super.loadedData(event);
	}

	toggleRowAll() {
		this.isAllRowOpened = !this.isAllRowOpened;
		this.itemsState.forEach((i) => {
			i.showdetail = !this.isAllRowOpened;
			this.toggleRow(this.itemsState, i, true);
		});
	}

	async showModal(i) {
		const modal = await this.modalController.create({
			component: SystemStatusDetailPage,
			componentProps: {
				items: this.itemsState,
				item: i,
				id: i.Id,
			},
			cssClass: 'my-custom-class',
		});
		return await modal.present();
	}

	add() {
		let newItem = {
			Id: 0,
			IsDisabled: false,
		};
		this.showModal(newItem);
	}
}
