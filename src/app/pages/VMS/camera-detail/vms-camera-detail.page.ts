import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { PageBase } from 'src/app/page-base';
import { CommonService } from 'src/app/services/core/common.service';
import { EnvService } from 'src/app/services/core/env.service';
import { VmsApiService } from 'src/app/services/vms/vms-api.service';
import { VMS_CameraProvider, VMS_NvrProvider } from 'src/app/services/vms/vms.providers';

@Component({
	selector: 'app-vms-camera-detail',
	templateUrl: './vms-camera-detail.page.html',
	styleUrls: ['./vms-camera-detail.page.scss'],
	standalone: false,
})
export class VmsCameraDetailPage extends PageBase {
	nvrName = '';
	roleList = [
		{ Code: 'IN', Name: 'IN' },
		{ Code: 'OUT', Name: 'OUT' },
		{ Code: 'BOTH', Name: 'BOTH' },
	];
	permissions: any[] = [];
	canManagePermission = false;

	constructor(
		public pageProvider: VMS_CameraProvider,
		public nvrProvider: VMS_NvrProvider,
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
			IDNvr: [null],
			Code: ['', Validators.required],
			Name: ['', Validators.required],
			ChannelNo: [null],
			RtspMain: [''],
			RtspSub: [''],
			Role: ['BOTH', Validators.required],
			RoiJson: [''],
			AiEnabled: [true],
			Remark: [''],
			Sort: [''],
			IsDisabled: new FormControl({ value: '', disabled: true }),
			IsDeleted: new FormControl({ value: '', disabled: true }),
			CreatedBy: new FormControl({ value: '', disabled: true }),
			CreatedDate: new FormControl({ value: '', disabled: true }),
			ModifiedBy: new FormControl({ value: '', disabled: true }),
			ModifiedDate: new FormControl({ value: '', disabled: true }),
		});
	}

	get fromNvr() {
		return !!this.item?.IDNvr;
	}

	preLoadData(event?: any): void {
		this.query.IgnoredBranch = true;
		super.preLoadData(event);
	}

	loadedData(event?: any, ignoredFromGroup?: boolean): void {
		super.loadedData(event, ignoredFromGroup);
		this.nvrName = '';
		this.canManagePermission = this.pageConfig.canEdit !== false;
		if (this.fromNvr) {
			this.formGroup.disable({ emitEvent: false });
			this.pageConfig.canEdit = false;
			this.pageConfig.ShowSave = false;
			this.nvrProvider
				.getAnItem(this.item.IDNvr)
				.then((nvr: any) => {
					this.nvrName = nvr?.Name || nvr?.Code || '#' + this.item.IDNvr;
				})
				.catch(() => {
					this.nvrName = '#' + this.item.IDNvr;
				});
		}
		if (this.item?.Id) this.loadPermissions();
	}

	async loadPermissions() {
		try {
			this.permissions = ((await firstValueFrom(this.vmsApi.listPermissions(this.item.Id))) as any[]) || [];
		} catch {
			this.permissions = [];
		}
	}

	async addPermission() {
		if (!this.canManagePermission) return;
		const t = async (k: string) => String((await this.env.translateResource(k)) ?? k);
		const [header, cancel, save, phType, phId] = await Promise.all([
			t('Grant camera view'),
			t('Cancel'),
			t('Save'),
			t('User | JobTitle'),
			t('User Id or JobTitle code'),
		]);
		const alert = await this.alertCtrl.create({
			header,
			inputs: [
				{ name: 'SubjectType', placeholder: phType, value: 'User', type: 'text' },
				{ name: 'SubjectId', placeholder: phId, type: 'text' },
			],
			buttons: [
				{ text: cancel, role: 'cancel' },
				{
					text: save,
					handler: async (data) => {
						await firstValueFrom(
							this.vmsApi.setPermission({
								IDCamera: this.item.Id,
								SubjectType: data.SubjectType,
								SubjectId: data.SubjectId,
								CanView: true,
								CanManage: false,
							})
						);
						this.loadPermissions();
					},
				},
			],
		});
		await alert.present();
	}

	async saveChange() {
		if (this.fromNvr) return;
		super.saveChange2();
	}

	delete(publishEventCode = this.pageConfig.pageName) {
		if (!this.pageConfig.ShowDelete || !this.item?.Id) return;
		this.env
			.actionConfirm('delete', 1, this.item?.Name, this.pageConfig.pageTitle, async () => {
				if (this.item.IDNvr) {
					await firstValueFrom(this.vmsApi.setCameraInUse(this.item.Id, false));
				} else {
					await this.pageProvider.delete(this.item);
				}
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
