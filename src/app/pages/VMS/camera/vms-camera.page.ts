import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { SortConfig } from 'src/app/interfaces/options-interface';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { VmsApiService } from 'src/app/services/vms/vms-api.service';
import { VMS_CameraProvider } from 'src/app/services/static/services.service';
import { cameraAiBadgeColor, cameraAiLabel, cameraRoleBadgeColor } from './vms-camera.util';

@Component({
	selector: 'app-vms-camera',
	templateUrl: 'vms-camera.page.html',
	styleUrls: ['vms-camera.page.scss'],
	standalone: false,
})
export class VmsCameraPage extends PageBase {
	roleList = [
		{ Code: 'IN', Name: 'IN' },
		{ Code: 'OUT', Name: 'OUT' },
		{ Code: 'BOTH', Name: 'BOTH' },
	];

	constructor(
		public pageProvider: VMS_CameraProvider,
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
		this.pageConfig.pageIcon = 'videocam-outline';
		this.pageConfig.sort = [{ Dimension: 'Id', Order: 'DESC' } as SortConfig];
		super.preLoadData(event);
	}

	roleColor(row: { Role?: string }) {
		return cameraRoleBadgeColor(row?.Role);
	}

	aiColor(row: { AiEnabled?: unknown }) {
		return cameraAiBadgeColor(row?.AiEnabled);
	}

	aiLabel(row: { AiEnabled?: unknown }) {
		return cameraAiLabel(row?.AiEnabled);
	}

	delete(publishEventCode = this.pageConfig.pageName) {
		if (!this.pageConfig.ShowDelete) return;
		const targets = this.selectedItems || [];
		this.env
			.actionConfirm('delete', targets.length, targets[0]?.Name, this.pageConfig.pageTitle, async () => {
				const independent = targets.filter((c) => !c.IDNvr);
				const linked = targets.filter((c) => c.IDNvr);
				for (const cam of linked) {
					await firstValueFrom(this.vmsApi.setCameraInUse(cam.Id, false));
				}
				if (independent.length) await this.pageProvider.delete(independent);
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
