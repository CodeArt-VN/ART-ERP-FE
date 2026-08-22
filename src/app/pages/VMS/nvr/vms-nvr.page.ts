import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { SortConfig } from 'src/app/interfaces/options-interface';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { VmsApiService } from 'src/app/services/vms/vms-api.service';
import { VMS_CameraProvider, VMS_NvrDeviceProvider } from 'src/app/services/static/services.service';
import { nvrApplyCameraCounts, nvrCameraCount, nvrCameraInUse, nvrNeedsCameraCounts } from './vms-nvr.util';

@Component({
	selector: 'app-vms-nvr',
	templateUrl: 'vms-nvr.page.html',
	styleUrls: ['vms-nvr.page.scss'],
	standalone: false,
})
export class VmsNvrPage extends PageBase {
	constructor(
		public pageProvider: VMS_NvrDeviceProvider,
		public cameraProvider: VMS_CameraProvider,
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
		super.preLoadData(event);
	}

	loadedData(event?: any, ignoredFromGroup?: boolean): void {
		if (!nvrNeedsCameraCounts(this.items)) {
			super.loadedData(event, ignoredFromGroup);
			return;
		}
		this.cameraProvider
			.readServer({})
			.then((res: any) => {
				nvrApplyCameraCounts(this.items, res?.data || []);
				super.loadedData(event, ignoredFromGroup);
			})
			.catch(() => super.loadedData(event, ignoredFromGroup));
	}

	cameraInUse(row: { CameraInUse?: number; CameraCount?: number }) {
		return nvrCameraInUse(row);
	}

	cameraCount(row: { CameraInUse?: number; CameraCount?: number }) {
		return nvrCameraCount(row);
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
