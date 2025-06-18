import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { CommonService } from 'src/app/services/core/common.service';
import { EnvService } from 'src/app/services/core/env.service';
import { OSM_NotificationService } from 'src/app/services/notifications.service';
import { OSM_NotificationReceiverProvider } from 'src/app/services/static/services.service';

@Component({
	selector: 'app-page-notification',
	templateUrl: './page-notification.component.html',
	styleUrls: ['./page-notification.component.scss'],
	standalone: false,
})
export class PageNotificationComponent extends PageBase {
	@Input() pageName: any;
	constructor(
		public pageProvider: OSM_NotificationService,
		public notificationReceiverProvider: OSM_NotificationReceiverProvider,
		public commonService: CommonService,
		public env: EnvService,
		public navCtrl: NavController
	) {
		super();
	}

	preLoadData(event?: any): void {
		this.query.Form = this.pageName;

		super.preLoadData(event);
	}
	loadedData(event?: any, ignoredFromGroup?: boolean): void {
		super.loadedData(event, ignoredFromGroup);
	}

	readNoti(i) {
		let data = {
			Id: parseInt(i.IDReceiver),
			ReadDate: new Date(),
		};
		this.notificationReceiverProvider.save(data).then((_) => {
			this.env.publishEvent({
				Code: 'app:notification',
			});
			// this.nav(i.Link);
		});
	}

	deleteNoti(i, event) {
		event.stopPropagation();
		this.env.showPrompt('Do you want to delete notification?', null, 'Are you sure?', 'Yes', 'No').then((_) => {
			let postDTO = {
				Ids: [i.IDReceiver],
				IsAll: false,
			};
			this.pageProvider.deleteNotification(postDTO).then((result: any) => {
				this.env.publishEvent({
					Code: 'app:notification',
				});
				const index = this.items.indexOf(i);
				if (index > -1) {
					this.items.splice(index, 1);
				}
			});
		});
	}
}
