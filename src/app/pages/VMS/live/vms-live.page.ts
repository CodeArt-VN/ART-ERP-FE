import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EnvService } from 'src/app/services/core/env.service';
import { VmsApiService } from 'src/app/services/vms/vms-api.service';

@Component({
	selector: 'app-vms-live',
	templateUrl: 'vms-live.page.html',
	styleUrls: ['vms-live.page.scss'],
	standalone: false,
})
export class VmsLivePage implements OnInit {
	cameras: any[] = [];
	recent: any[] = [];

	constructor(public api: VmsApiService, public env: EnvService) {}

	ngOnInit() {
		this.reload();
	}

	async reload(event?: any) {
		try {
			this.cameras = (await firstValueFrom(this.api.listCamera())) as any[];
			this.recent = (await firstValueFrom(this.api.listEvents())) as any[];
			this.recent = (this.recent || []).slice(0, 20);
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Load failed', 'danger');
		} finally {
			event?.target?.complete?.();
		}
	}
}
