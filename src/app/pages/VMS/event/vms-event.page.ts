import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { SortConfig } from 'src/app/interfaces/options-interface';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { VMS_EventProvider } from 'src/app/services/static/services.service';
import { environment } from 'src/environments/environment';
import {
	eventPersonLabel,
	eventPhotoPath,
	eventStatusBadgeColor,
	eventStatusLabel,
	eventStatusVisible,
	eventTypeBadgeColor,
	eventTypeLabel,
} from './event-display.util';


@Component({
	selector: 'app-vms-event',
	templateUrl: 'vms-event.page.html',
	styleUrls: ['vms-event.page.scss'],
	standalone: false,
})
export class VmsEventPage extends PageBase {
	eventTypeList = [
		{ Code: '', Name: 'All' },
		{ Code: 'face.seen', Name: 'Face seen' },
		{ Code: 'attendance', Name: 'Attendance' },
		{ Code: 'guest', Name: 'Guest' },
	];

	constructor(
		public pageProvider: VMS_EventProvider,
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
		this.pageConfig.ShowChangeBranch = false;
	}

	preLoadData(event?: any): void {
		this.pageConfig.pageIcon = 'pulse-outline';
		this.pageConfig.sort = [{ Dimension: 'OccurredAt', Order: 'DESC' } as SortConfig];
		super.preLoadData(event);
	}

	frameUrl(path: string): string {
		if (!path) return '';
		if (path.indexOf('http') === 0) return path;
		return environment.appDomain.replace(/\/?$/, '/') + path.replace(/^\//, '');
	}

	photoSrc(row: { FramePath?: string; PhotoPath?: string }): string {
		return this.frameUrl(eventPhotoPath(row));
	}

	personLabel(row: { DisplayName?: string; PersonId?: string }): string {
		return eventPersonLabel(row);
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
