import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';

import { SortConfig } from 'src/app/interfaces/options-interface';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { BRA_BranchProvider, SYS_FormProvider, SYS_IntegrationProviderProvider } from 'src/app/services/static/services.service';

@Component({
	selector: 'app-integration-provider',
	templateUrl: 'integration-provider.page.html',
	styleUrls: ['integration-provider.page.scss'],
	standalone: false,
})
export class IntegrationProviderPage extends PageBase {
	constructor(
		public pageProvider: SYS_IntegrationProviderProvider,
		public formProvider: SYS_FormProvider,
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

		super.preLoadData(event);
	}
}
