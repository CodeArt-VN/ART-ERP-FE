import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { SortConfig } from 'src/app/interfaces/options-interface';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { VmsApiService } from 'src/app/services/vms/vms-api.service';
import { VMS_EventProvider } from 'src/app/services/vms/vms.providers';

@Component({
	selector: 'app-vms-event',
	templateUrl: 'vms-event.page.html',
	styleUrls: ['vms-event.page.scss'],
	standalone: false,
})
export class VmsEventPage extends PageBase {
	eventTypeList = [
		{ Code: '', Name: 'All' },
		{ Code: 'attendance', Name: 'Attendance' },
		{ Code: 'guest', Name: 'Guest' },
		{ Code: 'pending_review', Name: 'Pending review' },
	];

	constructor(
		public pageProvider: VMS_EventProvider,
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
		this.pageConfig.canAdd = false;
		this.pageConfig.canDelete = false;
	}

	preLoadData(event?: any): void {
		this.pageConfig.pageIcon = 'pulse-outline';
		this.pageConfig.sort = [{ Dimension: 'OccurredAt', Order: 'DESC' } as SortConfig];
		this.query.IgnoredBranch = true;
		super.preLoadData(event);
	}

	async review(ev: any, approve: boolean) {
		try {
			await firstValueFrom(this.vmsApi.reviewEvent(ev.EventId, approve));
			this.env.showMessage(approve ? 'Approved' : 'Rejected', 'success');
			this.refresh();
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Error', 'danger');
		}
	}
}
