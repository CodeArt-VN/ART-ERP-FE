import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { SortConfig } from 'src/app/interfaces/options-interface';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { VmsApiService } from 'src/app/services/vms/vms-api.service';
import { VMS_GalleryProvider } from 'src/app/services/vms/vms.providers';

@Component({
	selector: 'app-vms-gallery',
	templateUrl: 'vms-gallery.page.html',
	styleUrls: ['vms-gallery.page.scss'],
	standalone: false,
})
export class VmsGalleryPage extends PageBase {
	personTypeList = [
		{ Code: '', Name: 'All' },
		{ Code: 'staff', Name: 'Staff' },
		{ Code: 'guest', Name: 'Guest' },
	];

	constructor(
		public pageProvider: VMS_GalleryProvider,
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
		this.pageConfig.pageIcon = 'people-outline';
		this.pageConfig.sort = [{ Dimension: 'Id', Order: 'DESC' } as SortConfig];
		this.query.IgnoredBranch = true;
		super.preLoadData(event);
	}

	async add() {
		const t = async (k: string) => String((await this.env.translateResource(k)) ?? k);
		const [header, cancel, save, phPerson, phType, phName, phEmp] = await Promise.all([
			t('Enroll identity (corp-wide)'),
			t('Cancel'),
			t('Save'),
			t('person_id (optional)'),
			t('staff | guest'),
			t('Display name'),
			t('Employee code (staff)'),
		]);
		const alert = await this.alertCtrl.create({
			header,
			inputs: [
				{ name: 'person_id', placeholder: phPerson, type: 'text' },
				{ name: 'person_type', placeholder: phType, value: 'guest', type: 'text' },
				{ name: 'display_name', placeholder: phName, type: 'text' },
				{ name: 'employee_code', placeholder: phEmp, type: 'text' },
			],
			buttons: [
				{ text: cancel, role: 'cancel' },
				{
					text: save,
					handler: async (data) => {
						try {
							await firstValueFrom(this.vmsApi.upsertGallery(data));
							this.env.showMessage('Enrolled', 'success');
							this.refresh();
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
		await firstValueFrom(this.vmsApi.disableGallery(item.PersonId));
		this.refresh();
	}
}
