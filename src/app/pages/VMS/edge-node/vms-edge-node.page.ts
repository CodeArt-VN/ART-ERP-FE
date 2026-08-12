import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EnvService } from 'src/app/services/core/env.service';
import { VmsApiService } from 'src/app/services/vms/vms-api.service';

@Component({
	selector: 'app-vms-edge-node',
	templateUrl: 'vms-edge-node.page.html',
	styleUrls: ['vms-edge-node.page.scss'],
	standalone: false,
})
export class VmsEdgeNodePage implements OnInit {
	items: any[] = [];

	constructor(public api: VmsApiService, public env: EnvService) {}

	ngOnInit() {
		this.reload();
	}

	async reload(event?: any) {
		try {
			this.items = (await firstValueFrom(this.api.listEdgeNodes())) as any[];
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Load failed', 'danger');
		} finally {
			event?.target?.complete?.();
		}
	}

	isOnline(n: any) {
		if (!n?.LastHeartbeat) return false;
		const t = new Date(n.LastHeartbeat).getTime();
		return Date.now() - t < 10 * 60 * 1000;
	}
}
