import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { PageBase } from 'src/app/page-base';
import { CommonService } from 'src/app/services/core/common.service';
import { EnvService } from 'src/app/services/core/env.service';
import { VmsApiService } from 'src/app/services/vms/vms-api.service';
import { VMS_NvrDeviceProvider } from 'src/app/services/static/services.service';
import { mergeNvrCameras, nvrAllSelected, nvrBulkNextInUse, nvrCamBusyKey, nvrChannelNo, nvrIsInUse, nvrRebindSelected, nvrToggleSelectAll } from './vms-nvr-detail.util';

@Component({
	selector: 'app-vms-nvr-detail',
	templateUrl: './vms-nvr-detail.page.html',
	styleUrls: ['./vms-nvr-detail.page.scss'],
	standalone: false,
})
export class VmsNvrDetailPage extends PageBase {
	cameras: any[] = [];
	selectedCameras: any[] = [];
	scannedPreview: any[] = [];
	branchList: any[] = [];
	busyIds = new Set<string>();
	showPassword = false;

	constructor(
		public pageProvider: VMS_NvrDeviceProvider,
		public vmsApi: VmsApiService,
		public env: EnvService,
		public navCtrl: NavController,
		public route: ActivatedRoute,
		public alertCtrl: AlertController,
		public formBuilder: FormBuilder,
		public cdr: ChangeDetectorRef,
		public loadingController: LoadingController,
		public commonService: CommonService
	) {
		super();
		this.pageConfig.isDetailPage = true;

		this.formGroup = formBuilder.group({
			IDBranch: [this.env.selectedBranch],
			Id: new FormControl({ value: '', disabled: true }),
			Code: ['', Validators.required],
			Name: ['', Validators.required],
			Host: ['', Validators.required],
			HostWan: [''],
			Port: [80, [Validators.required, Validators.min(1), Validators.max(65535)]],
			Vendor: ['Dahua'],
			Username: ['admin'],
			PasswordEnc: [''],
			Protocol: ['CGI'],
			Remark: [''],
			IsDisabled: new FormControl({ value: '', disabled: true }),
			IsDeleted: new FormControl({ value: '', disabled: true }),
			CreatedBy: new FormControl({ value: '', disabled: true }),
			CreatedDate: new FormControl({ value: '', disabled: true }),
			ModifiedBy: new FormControl({ value: '', disabled: true }),
			ModifiedDate: new FormControl({ value: '', disabled: true }),
		});
	}

	preLoadData(event?: any): void {
		this.pageConfig.pageIcon = 'server-outline';
		this.branchList = [...(this.env.branchList || [])];
		super.preLoadData(event);
	}

	loadedData(event?: any, ignoredFromGroup?: boolean): void {
		super.loadedData(event, ignoredFromGroup);
		this.showPassword = false;
		if (!this.item?.Id) {
			this.formGroup.patchValue(
				{
					IDBranch: this.env.selectedBranch,
					Port: 80,
					Vendor: 'Dahua',
					Username: 'admin',
					Protocol: 'CGI',
				},
				{ emitEvent: false }
			);
			['IDBranch', 'Port', 'Vendor', 'Username', 'Protocol'].forEach((k) => this.formGroup.get(k)?.markAsDirty());
		}
		this.bootstrapCameras();
	}

	private async bootstrapCameras() {
		await this.loadCameras();
		if (this.item?.Id) await this.scanChannels(true);
	}

	async toggleShowPassword(ev?: Event) {
		ev?.preventDefault?.();
		ev?.stopPropagation?.();
		if (this.showPassword) {
			this.showPassword = false;
			const ctrl = this.formGroup.get('PasswordEnc');
			if (this.item?.Id && ctrl && !ctrl.dirty) {
				ctrl.setValue('********', { emitEvent: false });
			}
			return;
		}
		const ctrl = this.formGroup.get('PasswordEnc');
		const current = ctrl?.value;
		if (this.item?.Id && (!current || current === '********' || current === '***')) {
			try {
				const res: any = await firstValueFrom(this.vmsApi.getNvrPassword(this.item.Id));
				ctrl.setValue(res?.PasswordEnc || '', { emitEvent: false });
			} catch (e: any) {
				this.env.showMessage(e?.message || 'Cannot get password', 'danger');
				return;
			}
		}
		this.showPassword = true;
	}

	savedInDb(cam: any) {
		return !!(cam && cam.Id > 0);
	}

	async loadCameras() {
		if (!this.item?.Id) {
			this.cameras = [];
			this.selectedCameras = [];
			return;
		}
		try {
			const rows = ((await firstValueFrom(this.vmsApi.listNvrCameras(this.item.Id))) as any[]) || [];
			const db = rows.map((c) => this.mapCamRow(c));
			this.cameras = this.mergeScanned(db);
			this.selectedCameras = nvrRebindSelected(this.cameras, this.selectedCameras);
		} catch {
			this.cameras = this.mergeScanned([]);
			this.selectedCameras = nvrRebindSelected(this.cameras, this.selectedCameras);
		}
	}

	private mapCamRow(c: any) {
		const id = Number(c?.Id) || 0;
		const channelNo = nvrChannelNo(c?.ChannelNo);
		return {
			...c,
			Id: id,
			ChannelNo: channelNo,
			online: !!(c.online ?? c.Online),
			_rowKey: id > 0 ? 'db-' + id : 'ch-' + (channelNo ?? c.Code),
		};
	}

	private mergeScanned(dbRows: any[]) {
		const extra = mergeNvrCameras(dbRows, this.scannedPreview).slice(dbRows.length);
		return [
			...dbRows,
			...extra.map((c) =>
				this.mapCamRow({
					...c,
					Id: 0,
					IsDisabled: true,
					online: true,
					_fromScan: true,
				})
			),
		];
	}

	inUse(cam: any) {
		return nvrIsInUse(cam);
	}

	bulkNextInUse() {
		return nvrBulkNextInUse(this.selectedCameras);
	}

	allCamerasSelected() {
		return nvrAllSelected(this.cameras, this.selectedCameras);
	}

	toggleSelectAllCameras(ev?: Event) {
		ev?.stopPropagation?.();
		this.selectedCameras = nvrToggleSelectAll(this.cameras, this.selectedCameras);
		const el = ev?.target as HTMLInputElement | undefined;
		if (el && el.type === 'checkbox') el.checked = this.allCamerasSelected();
		this.cdr.detectChanges();
	}

	async bulkToggleInUse(ev?: Event) {
		ev?.stopPropagation?.();
		if (!this.pageConfig.canEdit || !this.selectedCameras?.length) return;
		const next = this.bulkNextInUse();
		const count = this.selectedCameras.length;
		try {
			await this.env.showPrompt(
				{ code: next ? 'USE_CAMERAS_CONFIRM' : 'STOP_USE_CAMERAS_CONFIRM', count },
				null,
				next ? 'In use' : 'Stop using'
			);
		} catch {
			return;
		}
		const targets = [...this.selectedCameras];
		try {
			await this.env.showLoading('Please wait for a few moments', this.applyCamerasInUse(targets, next));
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Cannot update', 'danger');
		}
	}

	async toggleInUse(cam: any, ev?: Event) {
		ev?.stopPropagation?.();
		const key = nvrCamBusyKey(cam);
		if (!this.pageConfig.canEdit || this.busyIds.has(key)) return;
		const next = !this.inUse(cam);
		if (!this.savedInDb(cam) && !next) return;
		this.busyIds.add(key);
		try {
			await this.applyCamerasInUse([cam], next);
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Cannot update', 'danger');
		} finally {
			this.busyIds.delete(key);
		}
	}

	private async applyCamerasInUse(targets: any[], next: boolean) {
		const unsaved = next ? targets.filter((c) => !this.savedInDb(c)) : [];
		const saved = targets.filter((c) => this.savedInDb(c) && this.inUse(c) !== next);
		if (unsaved.length) {
			await firstValueFrom(
				this.vmsApi.importChannels(
					this.item.Id,
					unsaved.map((cam) => ({
						ChannelNo: nvrChannelNo(cam.ChannelNo),
						Code: cam.Code,
						Name: cam.Name,
						RtspMain: cam.RtspMain,
						RtspSub: cam.RtspSub,
						Role: cam.Role || 'BOTH',
						AiEnabled: cam.AiEnabled !== false,
						IsDisabled: !next,
					}))
				)
			);
			const chs = new Set(unsaved.map((c) => nvrChannelNo(c.ChannelNo)));
			this.scannedPreview = (this.scannedPreview || []).filter((c) => !chs.has(nvrChannelNo(c.ChannelNo)));
		}
		for (const cam of saved) {
			await firstValueFrom(this.vmsApi.setCameraInUse(cam.Id, next));
			cam.IsDisabled = !next;
		}
		if (unsaved.length) await this.loadCameras();
		else this.selectedCameras = nvrRebindSelected(this.cameras, this.selectedCameras);
	}

	async scanChannels(silent = false) {
		if (!this.item?.Id) return;
		const run = firstValueFrom(this.vmsApi.scanNvr(this.item.Id));
		const apply = async (res: any) => {
			const channels = Array.isArray(res?.channels) ? res.channels : [];
			this.scannedPreview = channels.filter((c) => c && typeof c === 'object');
			const n = res?.scanned ?? this.scannedPreview.length;
			if (!silent) this.env.showMessage('Scanned {value} cameras', 'success', n);
			await this.loadCameras();
		};
		const fail = (e: any) => {
			if (!silent) this.env.showMessage(e?.error?.Message || e?.message || 'Cannot scan NVR', 'danger');
			this.loadCameras();
		};
		if (silent) {
			try {
				await apply(await run);
			} catch (e) {
				fail(e);
			}
			return;
		}
		if (!this.pageConfig.canEdit) return;
		this.env.showLoading('Scanning cameras from NVR...', run).then(apply).catch(fail);
	}

	removeCamera(cam: any, ev?: Event) {
		ev?.stopPropagation?.();
		if (!this.savedInDb(cam) || !this.pageConfig.canEdit) return;
		this.env
			.actionConfirm('delete', 1, cam?.Name, 'Camera', async () => {
				await firstValueFrom(this.vmsApi.deleteCamera(cam.Id));
			})
			.then(() => {
				this.env.showMessage('DELETE_RESULT_SUCCESS', 'success');
				this.cameras = this.cameras.filter((c) => c.Id !== cam.Id);
				this.selectedCameras = nvrRebindSelected(this.cameras, this.selectedCameras);
			})
			.catch((err: any) => {
				if (err != 'User abort action') this.env.showMessage('DELETE_RESULT_FAIL', 'danger');
			});
	}

	async saveChange() {
		const isNew = !this.item?.Id || this.item.Id == 0;
		const pw = this.formGroup.get('PasswordEnc')?.value;
		if (isNew && !pw) {
			this.env.showMessage('Password required', 'warning');
			return;
		}
		if (!isNew && !pw) {
			this.formGroup.get('PasswordEnc').setValue('********');
			this.formGroup.get('PasswordEnc').markAsDirty();
		}
		return super.saveChange2();
	}

	delete(publishEventCode = this.pageConfig.pageName) {
		if (!this.pageConfig.ShowDelete || !this.item?.Id) return;
		this.env
			.actionConfirm('delete', 1, this.item?.Name, this.pageConfig.pageTitle, async () => {
				await firstValueFrom(this.vmsApi.deleteNvr(this.item.Id));
			})
			.then(() => {
				this.env.showMessage('DELETE_RESULT_SUCCESS', 'success');
				this.goBack();
			})
			.catch((err: any) => {
				if (err != 'User abort action') this.env.showMessage('DELETE_RESULT_FAIL', 'danger');
			});
	}
}
