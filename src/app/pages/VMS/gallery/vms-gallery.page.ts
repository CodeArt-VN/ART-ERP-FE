import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { VmsApiService } from 'src/app/services/vms/vms-api.service';

@Component({
	selector: 'app-vms-gallery',
	templateUrl: 'vms-gallery.page.html',
	styleUrls: ['vms-gallery.page.scss'],
	standalone: false,
})
export class VmsGalleryPage implements OnInit {
	items: any[] = [];
	personType = '';

	constructor(
		public api: VmsApiService,
		public env: EnvService,
		public alertCtrl: AlertController
	) {}

	ngOnInit() {
		this.reload();
	}

	async reload(event?: any) {
		try {
			this.items = (await firstValueFrom(this.api.listGallery(this.personType || undefined))) as any[];
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Load failed', 'danger');
		} finally {
			event?.target?.complete?.();
		}
	}

	async enroll() {
		const alert = await this.alertCtrl.create({
			header: 'Enroll identity (corp-wide)',
			inputs: [
				{ name: 'person_id', placeholder: 'person_id (optional)', type: 'text' },
				{ name: 'person_type', placeholder: 'staff | guest', value: 'guest', type: 'text' },
				{ name: 'display_name', placeholder: 'Display name', type: 'text' },
				{ name: 'employee_code', placeholder: 'Employee code (staff)', type: 'text' },
			],
			buttons: [
				{ text: 'Cancel', role: 'cancel' },
				{
					text: 'Save',
					handler: async (data) => {
						try {
							await firstValueFrom(this.api.upsertGallery(data));
							this.env.showMessage('Enrolled', 'success');
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

	async disable(item: any) {
		await firstValueFrom(this.api.disableGallery(item.PersonId));
		this.reload();
	}
}
