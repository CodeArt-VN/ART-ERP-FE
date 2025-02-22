import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';
import { SYS_TypeProvider } from 'src/app/services/static/services.service';
import { SystemTypeDetailPage } from '../system-type-detail/system-type-detail.page';

@Component({
	selector: 'app-system-type',
	templateUrl: 'system-type.page.html',
	styleUrls: ['system-type.page.scss'],
	standalone: false,
})
export class SystemTypePage extends PageBase {
	itemsState: any = [];
	isAllRowOpened = true;

	constructor(
		public pageProvider: SYS_TypeProvider,
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
			component: SystemTypeDetailPage,
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
