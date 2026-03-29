import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';

import { SortConfig } from 'src/app/interfaces/options-interface';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { BRA_BranchProvider, HRM_WorkRuleGroupProvider, OSM_CategoryProvider } from 'src/app/services/static/services.service';
import { NotificationCategoryDetailPage } from '../notification-category-detail/notification-category-detail.page';

@Component({
	selector: 'app-notification-category',
	templateUrl: 'notification-category.page.html',
	styleUrls: ['notification-category.page.scss'],
	standalone: false,
})
export class NotificationCategoryPage extends PageBase {
	constructor(
		public pageProvider: OSM_CategoryProvider,
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
		let sorted: SortConfig[] = [{ Dimension: 'Id', Order: 'DESC' }];
		this.pageConfig.sort = sorted;
		this.pageConfig.pageIcon = 'flash-outline';
		super.preLoadData(event);
	}
	loadedData(event) {
		super.loadedData(event);
	}

	async showModal(i) {
		const modal = await this.modalController.create({
			component: NotificationCategoryDetailPage,
			componentProps: {
				item: i,
				id: i.Id,
			},
			cssClass: 'modal90vh',
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
