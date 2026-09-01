import { Component, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { SortConfig } from 'src/app/interfaces/options-interface';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { VMS_EdgeNodeProvider, VMS_EventProvider } from 'src/app/services/static/services.service';
import { environment } from 'src/environments/environment';
import {
	eventCameraLabel,
	eventEdgeLabel,
	buildEdgeNameLookup,
	eventPersonLabel,
	eventPhotoPath,
} from './event-display.util';
import {
	VMS_EDGE_EVENT_TYPE_GROUP,
	eventTypeFilterList,
	eventTypeColor,
	eventTypeIcon,
	eventTypeLabel,
} from '../vms-edge-event-type.util';
import { vmsApplyAvatarFallback } from '../vms-image.util';

@Component({
	selector: 'app-vms-event',
	templateUrl: 'vms-event.page.html',
	styleUrls: ['vms-event.page.scss'],
	standalone: false,
})
export class VmsEventPage extends PageBase {
	private edgeNameById = new Map<string, string>();
	edgeEventTypeList: any[] = [];
	eventTypeList: Array<{ Code: string; Name: string }> = [{ Code: '', Name: 'All' }];

	constructor(
		public pageProvider: VMS_EventProvider,
		public edgeNodeProvider: VMS_EdgeNodeProvider,
		public modalController: ModalController,
		public popoverCtrl: PopoverController,
		public alertCtrl: AlertController,
		public loadingController: LoadingController,
		public env: EnvService,
		public navCtrl: NavController,
		public location: Location,
		public cdr: ChangeDetectorRef
	) {
		super();
		this.pageConfig.canAdd = false;
		this.pageConfig.canDelete = false;
		this.pageConfig.ShowChangeBranch = false;
	}

	preLoadData(event?: any): void {
		this.pageConfig.pageIcon = 'pulse-outline';
		this.pageConfig.sort = [{ Dimension: 'OccurredAt', Order: 'DESC' } as SortConfig];
		Promise.all([
			this.env.getType(VMS_EDGE_EVENT_TYPE_GROUP),
			this.edgeNodeProvider.read({ Take: 500, Skip: 0, IgnoredBranch: true }, true),
		]).then(([types, edgeRs]: any) => {
			this.edgeEventTypeList = types || [];
			this.eventTypeList = eventTypeFilterList(this.edgeEventTypeList);
			const rows = Array.isArray(edgeRs?.data) ? edgeRs.data : Array.isArray(edgeRs) ? edgeRs : [];
			this.edgeNameById = buildEdgeNameLookup(rows);
			super.preLoadData(event);
		});
	}

	async loadedData(event?: any) {
		if (!this.edgeEventTypeList.length) {
			this.edgeEventTypeList = (await this.env.getType(VMS_EDGE_EVENT_TYPE_GROUP)) || [];
			this.eventTypeList = eventTypeFilterList(this.edgeEventTypeList);
		}
		try {
			const rs: any = await this.edgeNodeProvider.read({ Take: 500, Skip: 0, IgnoredBranch: true }, true);
			const rows = Array.isArray(rs?.data) ? rs.data : Array.isArray(rs) ? rs : [];
			this.edgeNameById = buildEdgeNameLookup(rows);
		} catch {
			/* ignore transient edge list errors */
		}
		super.loadedData(event);
	}

	frameUrl(path: string): string {
		if (!path) return '';
		if (path.indexOf('http') === 0) return path;
		return environment.appDomain.replace(/\/?$/, '/') + path.replace(/^\//, '');
	}

	photoSrc(row: { FramePath?: string; PhotoPath?: string }): string {
		return this.frameUrl(eventPhotoPath(row));
	}

	onEventThumbError(event: Event): void {
		vmsApplyAvatarFallback(event);
	}

	personLabel(row: { DisplayName?: string; PersonId?: string }): string {
		return eventPersonLabel(row);
	}

	cameraLabel(row: any): string {
		return eventCameraLabel(row);
	}

	edgeLabel(row: any): string {
		return eventEdgeLabel(row, this.edgeNameById);
	}

	typeLabel(row: { EventType?: string }): string {
		return eventTypeLabel(row?.EventType, this.edgeEventTypeList);
	}

	typeColor(row: { EventType?: string }): string {
		return eventTypeColor(row?.EventType, this.edgeEventTypeList);
	}

	typeIcon(row: { EventType?: string }): string {
		return eventTypeIcon(row?.EventType, this.edgeEventTypeList);
	}
}
