import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';
import { BRA_BranchProvider, SYS_ActionProvider, SYS_APICollectionProvider, SYS_IntegrationProviderProvider } from 'src/app/services/static/services.service';
import { Location } from '@angular/common';
import { SortConfig } from 'src/app/interfaces/options-interface';

@Component({
	selector: 'app-tree',
	templateUrl: 'tree.page.html',
	styleUrls: ['tree.page.scss'],
	standalone: false,
})
export class TreePage extends PageBase {
	groupControl = {
		showReorder: false,
		showPopover: false,
		groupList: [],
		selectedGroup: null,
	};
	itemsState: any = [];
	isAllRowOpened = true;
	constructor(
		public pageProvider: SYS_APICollectionProvider,
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
		this.pageConfig.isShowFeature = true;
		this.pageConfig.isFeatureAsMain = true;
	}

	preLoadData(event?: any): void {
		let sorted: SortConfig[] = [{ Dimension: 'Id', Order: 'DESC' }];
		this.pageConfig.sort = sorted;
		this.query.Take = 10000;
		this.pageConfig.pageIcon = 'flash-outline';
		this.providerService
			.read()
			.then((res) => {
				this.groupControl.groupList = res['data'];
			})
			.finally(() => {
				super.preLoadData(event);
			});
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
