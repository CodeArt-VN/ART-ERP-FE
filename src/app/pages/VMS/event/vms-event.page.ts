import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EnvService } from 'src/app/services/core/env.service';
import { VmsApiService } from 'src/app/services/vms/vms-api.service';

@Component({
	selector: 'app-vms-event',
	templateUrl: 'vms-event.page.html',
	styleUrls: ['vms-event.page.scss'],
	standalone: false,
})
export class VmsEventPage implements OnInit {
	items: any[] = [];
	filterType = '';

	constructor(public api: VmsApiService, public env: EnvService) {}

	ngOnInit() {
		this.reload();
	}

	async reload(event?: any) {
		try {
			this.items = (await firstValueFrom(this.api.listEvents(this.filterType || undefined))) as any[];
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Load failed', 'danger');
		} finally {
			event?.target?.complete?.();
		}
	}

	async review(ev: any, approve: boolean) {
		try {
			await firstValueFrom(this.api.reviewEvent(ev.EventId, approve));
			this.env.showMessage(approve ? 'Approved' : 'Rejected', 'success');
			this.reload();
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Error', 'danger');
		}
	}
}
