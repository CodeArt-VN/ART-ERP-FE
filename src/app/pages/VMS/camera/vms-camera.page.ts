import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { EnvService } from 'src/app/services/core/env.service';
import { VmsApiService } from 'src/app/services/vms/vms-api.service';

@Component({
	selector: 'app-vms-camera',
	templateUrl: 'vms-camera.page.html',
	styleUrls: ['vms-camera.page.scss'],
	standalone: false,
})
export class VmsCameraPage implements OnInit {
	nvrs: any[] = [];
	cameras: any[] = [];
	loading = false;

	constructor(
		public api: VmsApiService,
		public env: EnvService,
		public alertCtrl: AlertController
	) {}

	ngOnInit() {
		this.reload();
	}

	async reload(event?: any) {
		this.loading = true;
		try {
			this.nvrs = (await firstValueFrom(this.api.listNvr())) as any[];
			this.cameras = (await firstValueFrom(this.api.listCamera())) as any[];
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Load failed', 'danger');
		} finally {
			this.loading = false;
			event?.target?.complete?.();
		}
	}

	async addCamera() {
		const alert = await this.alertCtrl.create({
			header: 'Add camera',
			inputs: [
				{ name: 'CameraCode', placeholder: 'Camera code', type: 'text' },
				{ name: 'Name', placeholder: 'Name', type: 'text' },
				{ name: 'RtspSub', placeholder: 'RTSP sub-stream', type: 'text' },
				{ name: 'Role', placeholder: 'IN | OUT | BOTH', value: 'BOTH', type: 'text' },
			],
			buttons: [
				{ text: 'Cancel', role: 'cancel' },
				{
					text: 'Save',
					handler: async (data) => {
						try {
							await firstValueFrom(
								this.api.saveCamera({
									...data,
									IDBranch: this.env.selectedBranch,
									AiEnabled: true,
								})
							);
							this.env.showMessage('Saved', 'success');
							this.reload();
						} catch (e: any) {
							this.env.showMessage(e?.message || 'Error', 'danger');
						}
					},
				},
			],
		});
		await alert.present();
	}

	async addNvr() {
		const alert = await this.alertCtrl.create({
			header: 'Add NVR',
			inputs: [
				{ name: 'Code', placeholder: 'Code', type: 'text' },
				{ name: 'Name', placeholder: 'Name', type: 'text' },
				{ name: 'Host', placeholder: 'Host IP', type: 'text' },
				{ name: 'Port', placeholder: 'Port', value: '80', type: 'number' },
				{ name: 'Vendor', placeholder: 'Vendor', type: 'text' },
			],
			buttons: [
				{ text: 'Cancel', role: 'cancel' },
				{
					text: 'Save',
					handler: async (data) => {
						try {
							await firstValueFrom(
								this.api.saveNvr({
									...data,
									Port: Number(data.Port) || 80,
									IDBranch: this.env.selectedBranch,
								})
							);
							this.env.showMessage('Saved', 'success');
							this.reload();
						} catch (e: any) {
							this.env.showMessage(e?.message || 'Error', 'danger');
						}
					},
				},
			],
		});
		await alert.present();
	}
}
