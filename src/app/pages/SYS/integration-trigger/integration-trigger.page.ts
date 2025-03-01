import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';
import { BRA_BranchProvider, SYS_FormProvider, SYS_IntegrationProviderProvider, SYS_TriggerProvider } from 'src/app/services/static/services.service';
import { Location } from '@angular/common';
import { SortConfig } from 'src/app/models/options-interface';

@Component({
	selector: 'app-integration-trigger',
	templateUrl: 'integration-trigger.page.html',
	styleUrls: ['integration-trigger.page.scss'],
	standalone: false,
})
export class IntegrationTriggerPage extends PageBase {
	groupControl = {
		showReorder: false,
		showPopover: false,
		groupList: [],
		selectedGroup: null,
	};
	constructor(
		public pageProvider: SYS_TriggerProvider,
		public providerService: SYS_IntegrationProviderProvider,
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
		this.pageConfig.isShowFeature = true;
		this.pageConfig.isFeatureAsMain = true;
	}

	preLoadData(event?: any): void {
		let sorted: SortConfig[] = [{ Dimension: 'Id', Order: 'DESC' }];
		this.pageConfig.sort = sorted;
		this.providerService
			.read()
			.then((res) => {
				this.groupControl.groupList = res['data'];
			})
			.catch((err) => {
				this.env.showMessage(err, 'danger');
			})
			.finally(() => {
				super.preLoadData(event);
			});
	}

	onGroupChange(g) {
		this.pageConfig.isSubActive = true;
		this.groupControl.selectedGroup = g;
		if (g) {
			this.query.IDProvider = g.Id;
		} else {
			delete this.query.IDProvider;
		}

		this.refresh();
	}
}
