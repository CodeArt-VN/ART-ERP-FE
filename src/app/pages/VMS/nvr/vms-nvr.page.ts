import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { SortConfig } from 'src/app/interfaces/options-interface';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { VmsApiService } from 'src/app/services/vms/vms-api.service';
import { VMS_NvrProvider } from 'src/app/services/vms/vms.providers';

@Component({
	selector: 'app-vms-nvr',
	templateUrl: 'vms-nvr.page.html',
	styleUrls: ['vms-nvr.page.scss'],
	standalone: false,
})
export class VmsNvrPage extends PageBase {
	constructor(
		public pageProvider: VMS_NvrProvider,
		public vmsApi: VmsApiService,
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
		this.pageConfig.pageIcon = 'server-outline';
		this.pageConfig.sort = [{ Dimension: 'Id', Order: 'DESC' } as SortConfig];
		this.query.IgnoredBranch = true;
		super.preLoadData(event);
	}

	loadedData(event?: any, ignoredFromGroup?: boolean): void {
		this.items.forEach((item) => {
			const b = this.env.branchList?.find((x) => x.Id == item.IDBranch);
			item.BranchName = b ? b.Name || b.Code : item.IDBranch ? '#' + item.IDBranch : '—';
		});
		super.loadedData(event, ignoredFromGroup);
	}

	delete(publishEventCode = this.pageConfig.pageName) {
		if (!this.pageConfig.ShowDelete) return;
		const targets = this.pageConfig.isDetailPage ? [this.item] : this.selectedItems || [];
		this.env
			.actionConfirm('delete', targets.length, targets[0]?.Name, this.pageConfig.pageTitle, async () => {
				for (const nvr of targets) {
					if (nvr?.Id) await firstValueFrom(this.vmsApi.deleteNvr(nvr.Id));
				}
			})
			.then(() => {
				this.env.showMessage('DELETE_RESULT_SUCCESS', 'success');
				this.removeSelectedItems();
				this.refresh();
			})
			.catch((err: any) => {
				if (err != 'User abort action') this.env.showMessage('DELETE_RESULT_FAIL', 'danger');
			});
	}
}
