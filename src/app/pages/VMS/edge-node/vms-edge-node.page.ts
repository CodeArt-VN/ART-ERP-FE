import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { SortConfig } from 'src/app/interfaces/options-interface';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { VmsApiService } from 'src/app/services/vms/vms-api.service';
import { VMS_EdgeNodeProvider } from 'src/app/services/static/services.service';
import {
	normalizeBranchIds,
	inferRuntimeLabel,
	inferRuntimeColor,
	isEdgeOnline,
	fleetOnlineRemarkKey,
	fleetOnlineRemarkParams,
} from '../edge-node-detail/vms-edge-node-detail.util';

@Component({
	selector: 'app-vms-edge-node',
	templateUrl: 'vms-edge-node.page.html',
	styleUrls: ['vms-edge-node.page.scss'],
	standalone: false,
})
export class VmsEdgeNodePage extends PageBase {
	constructor(
		public pageProvider: VMS_EdgeNodeProvider,
		public vmsApi: VmsApiService,
		public modalController: ModalController,
		public popoverCtrl: PopoverController,
		public alertCtrl: AlertController,
		public loadingController: LoadingController,
		public env: EnvService,
		public navCtrl: NavController,
		public location: Location,
		public translate: TranslateService
	) {
		super();
		this.pageConfig.canAdd = false;
		this.pageConfig.ShowAdd = false;
		this.pageConfig.ShowImport = false;
		this.pageConfig.ShowCopy = false;
		this.pageConfig.ShowArchive = false;
		this.pageConfig.canArchive = false;
	}

	preLoadData(event?: any): void {
		this.pageConfig.pageIcon = 'hardware-chip-outline';
		this.pageConfig.sort = [{ Dimension: 'LastHeartbeat', Order: 'DESC' } as SortConfig];
		this.query.IsDisabled = 'skipped';
		this.pageConfig.ShowAdd = false;
		this.pageConfig.canAdd = false;
		this.pageConfig.ShowArchive = false;
		this.pageConfig.canArchive = false;
		super.preLoadData(event);
	}

	loadedData(event?: any, ignoredFromGroup?: boolean): void {
		super.loadedData(event, ignoredFromGroup);
		this.pageConfig.ShowAdd = false;
		this.pageConfig.canAdd = false;
		this.pageConfig.ShowArchive = false;
		this.pageConfig.canArchive = false;
	}

	get fleetLine(): string {
		return this.translate.instant(fleetOnlineRemarkKey(), fleetOnlineRemarkParams(this.items));
	}

	inUse(n: any) {
		return n && !n.IsDisabled;
	}

	async toggleInUse(n: any, ev?: Event) {
		ev?.stopPropagation?.();
		if (!n?.Id || !this.pageConfig.canEdit) return;
		const next = !this.inUse(n);
		try {
			await firstValueFrom(this.vmsApi.setEdgeInUse(n.Id, next));
			n.IsDisabled = !next;
			this.env.showMessage(next ? 'Enrolled' : 'Disabled', 'success');
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Cannot update', 'danger');
		}
	}

	isOnline(n: any) {
		return isEdgeOnline(n);
	}

	cameraWarn(n: any) {
		const watching = Number(n?.CamerasWatching);
		if (!watching) return false;
		return (Number(n?.CamerasOnline) || 0) < watching;
	}

	isTrusted(n: any) {
		return n && !n.IsDisabled;
	}

	branchIds(n: any): number[] {
		return normalizeBranchIds(n?.BranchIds);
	}

	inferLabel(n: any) {
		return inferRuntimeLabel(n);
	}

	inferColor(n: any) {
		return inferRuntimeColor(n);
	}

	delete(publishEventCode = this.pageConfig.pageName) {
		if (!this.pageConfig.ShowDelete) return;
		const targets = this.selectedItems || [];
		this.env
			.actionConfirm('delete', targets.length, targets[0]?.Name, this.pageConfig.pageTitle, async () => {
				for (const n of targets) {
					if (n?.Id) await firstValueFrom(this.vmsApi.deleteEdgeNode(n.Id));
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
