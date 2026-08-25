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
	eventStatusBadgeColor,
	eventStatusLabel,
	eventStatusVisible,
	eventTypeBadgeColor,
	eventTypeLabel,
} from './event-display.util';
import { vmsApplyAvatarFallback } from '../vms-image.util';

@Component({
	selector: 'app-vms-event',
	templateUrl: 'vms-event.page.html',
	styleUrls: ['vms-event.page.scss'],
	standalone: false,
})
export class VmsEventPage extends PageBase {
	private edgeNameById = new Map<string, string>();

	eventTypeList = [
		{ Code: '', Name: 'All' },
		{ Code: 'face.seen', Name: 'Face seen' },
		{ Code: 'attendance', Name: 'Attendance' },
		{ Code: 'guest', Name: 'Guest' },
	];

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
		void this.loadEdgeNames();
		super.preLoadData(event);
	}

	async loadedData(event?: any) {
		await this.loadEdgeNames();
		super.loadedData(event);
	}

	private async loadEdgeNames() {
		try {
			const rs: any = await this.edgeNodeProvider.read({ Take: 500, Skip: 0, IgnoredBranch: true }, true);
			const rows = Array.isArray(rs?.data) ? rs.data : Array.isArray(rs) ? rs : [];
			this.edgeNameById = buildEdgeNameLookup(rows);
			this.cdr.detectChanges();
		} catch {
			/* ignore transient edge list errors */
		}
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
		return eventTypeLabel(row?.EventType);
	}

	typeColor(row: { EventType?: string }): string {
		return eventTypeBadgeColor(row?.EventType);
	}

	statusVisible(row: { EventType?: string }): boolean {
		return eventStatusVisible(row?.EventType);
	}

	statusColor(row: { Status?: string }): string {
		return eventStatusBadgeColor(row?.Status);
	}

	statusLabel(row: { Status?: string }): string {
		return eventStatusLabel(row?.Status);
	}

	openPeople() {
		this.nav('/vms-person', 'forward');
	}
}
