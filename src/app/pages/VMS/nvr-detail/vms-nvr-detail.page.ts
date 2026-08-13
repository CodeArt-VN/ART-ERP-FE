import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { PageBase } from 'src/app/page-base';
import { CommonService } from 'src/app/services/core/common.service';
import { EnvService } from 'src/app/services/core/env.service';
import { VmsApiService } from 'src/app/services/vms/vms-api.service';
import { VMS_NvrProvider } from 'src/app/services/vms/vms.providers';

@Component({
	selector: 'app-vms-nvr-detail',
	templateUrl: './vms-nvr-detail.page.html',
	styleUrls: ['./vms-nvr-detail.page.scss'],
	standalone: false,
})
export class VmsNvrDetailPage extends PageBase {
	cameras: any[] = [];
	busyToggle = false;
	showPassword = false;

	constructor(
		public pageProvider: VMS_NvrProvider,
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
		this.query.IgnoredBranch = true;
		super.preLoadData(event);
	}

	loadedData(event?: any, ignoredFromGroup?: boolean): void {
		super.loadedData(event, ignoredFromGroup);
		this.showPassword = false;
		this.loadCameras();
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

	async loadCameras() {
		if (!this.item?.Id) {
			this.cameras = [];
			return;
		}
		try {
			const rows = ((await firstValueFrom(this.vmsApi.listNvrCameras(this.item.Id))) as any[]) || [];
			this.cameras = rows.map((c) => ({ ...c, online: !!(c.online ?? c.Online) }));
		} catch {
			this.cameras = [];
		}
	}

	inUse(cam: any) {
		return cam && !cam.IsDisabled;
	}

	async toggleInUse(cam: any, ev?: Event) {
		ev?.stopPropagation?.();
		if (!cam?.Id || !this.pageConfig.canEdit || this.busyToggle) return;
		const next = !this.inUse(cam);
		this.busyToggle = true;
		try {
			await firstValueFrom(this.vmsApi.setCameraInUse(cam.Id, next));
			cam.IsDisabled = !next;
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Cannot update', 'danger');
		} finally {
			this.busyToggle = false;
		}
	}

	async scanChannels() {
		if (!this.item?.Id || !this.pageConfig.canEdit) return;
		this.env
			.showLoading(
				'Scanning cameras from NVR...',
				firstValueFrom(this.vmsApi.scanNvr(this.item.Id))
			)
			.then(async (res: any) => {
				const n = res?.scanned ?? res?.imported ?? 0;
				this.env.showMessage('Scanned {{value}} cameras', 'success', n);
				await this.loadCameras();
			})
			.catch((e: any) => {
				this.env.showMessage(e?.error?.Message || e?.message || 'Cannot scan NVR', 'danger');
				this.loadCameras();
			});
	}

	removeCamera(cam: any, ev?: Event) {
		ev?.stopPropagation?.();
		if (!cam?.Id || !this.pageConfig.canEdit) return;
		this.env
			.actionConfirm('delete', 1, cam?.Name, 'Camera', async () => {
				await firstValueFrom(this.vmsApi.deleteCamera(cam.Id));
			})
			.then(() => {
				this.env.showMessage('DELETE_RESULT_SUCCESS', 'success');
				this.cameras = this.cameras.filter((c) => c.Id !== cam.Id);
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
