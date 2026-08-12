import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { VmsApiService } from 'src/app/services/vms/vms-api.service';

@Component({
	selector: 'app-vms-permission',
	templateUrl: 'vms-permission.page.html',
	styleUrls: ['vms-permission.page.scss'],
	standalone: false,
})
export class VmsPermissionPage implements OnInit {
	idCamera: number;
	cameras: any[] = [];
	permissions: any[] = [];

	constructor(
		public api: VmsApiService,
		public env: EnvService,
		public route: ActivatedRoute,
		public alertCtrl: AlertController
	) {}

	ngOnInit() {
		this.idCamera = Number(this.route.snapshot.queryParamMap.get('id') || 0);
		this.reload();
	}

	async reload(event?: any) {
		try {
			this.cameras = (await firstValueFrom(this.api.listCamera())) as any[];
			if (!this.idCamera && this.cameras?.length) this.idCamera = this.cameras[0].Id;
			if (this.idCamera) {
				this.permissions = (await firstValueFrom(this.api.listPermissions(this.idCamera))) as any[];
			}
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Load failed', 'danger');
		} finally {
			event?.target?.complete?.();
		}
	}

	async add() {
		const alert = await this.alertCtrl.create({
			header: 'Grant camera view',
			inputs: [
				{ name: 'SubjectType', placeholder: 'User | JobTitle', value: 'User', type: 'text' },
				{ name: 'SubjectId', placeholder: 'User Id or JobTitle code', type: 'text' },
			],
			buttons: [
				{ text: 'Cancel', role: 'cancel' },
				{
					text: 'Save',
					handler: async (data) => {
						await firstValueFrom(
							this.api.setPermission({
								IDCamera: this.idCamera,
								SubjectType: data.SubjectType,
								SubjectId: data.SubjectId,
								CanView: true,
								CanManage: false,
							})
						);
						this.reload();
					},
				},
			],
		});
		await alert.present();
	}

	onCameraChange() {
		this.reload();
	}
}
