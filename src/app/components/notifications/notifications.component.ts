import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { CommonService } from 'src/app/services/core/common.service';
import { EnvService } from 'src/app/services/core/env.service';
import { OSM_NotificationService } from 'src/app/services/notifications.service';
import { OSM_NotificationReceiverProvider } from 'src/app/services/static/services.service';


@Component({
	selector: 'app-notifications-modal',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.scss'],
	standalone: false,
})
export class NotificationsComponent extends PageBase {
	items: any = [];
	isEndOfData = false;
	isOpenPopover = false;
	selectedNotification: any = [];
	@Input() autoLoad = true;
	constructor(
		public pageProvider: OSM_NotificationService,
		public notificationReceiverProvider : OSM_NotificationReceiverProvider,
		public commonService: CommonService,
		public env: EnvService,
		public navCtrl: NavController
	) {
		super();
	}
	// ngOnInit() {
	// 	if (this.autoLoad) {
	// 		this.loadData();
	// 	}
	// 	// this.items = [
	// 	// 	{
	// 	// 		Title: 'Notifications',
	// 	// 		Body: 'This is a notification message',
	// 	// 		Icon: 'assets/icon/favicon.png',
	// 	// 		Link: 'https://www.example.com',
	// 	// 		IsRead: true,
	// 	// 	},
	// 	// 	{
	// 	// 		Title: 'Notifications',
	// 	// 		Body: 'This is a notification message',
	// 	// 		Icon: 'assets/icon/favicon.png',
	// 	// 		Link: 'https://www.example.com',
	// 	// 		IsRead: true,
	// 	// 	},
	// 	// 	{
	// 	// 		Title: 'Notifications',
	// 	// 		Body: 'This is a notification message',
	// 	// 		Icon: 'assets/icon/favicon.png',
	// 	// 		Link: 'https://www.example.com',
	// 	// 		IsRead: true,
	// 	// 	},
	// 	// ];
	// }



	refresh() {
		this.clearData();
		this.loadData();
	}
	preLoadData(event?: any): void {
		super.preLoadData(event);
	}

	// loadData(event = null) {
	// 	let query = { Skip: this.items.length, Take: 20 };
	// 	if (this.pageConfig.isDetailPage) {
	// 		this.loadAnItem(event);
	// 	} else {
	// 		this.parseSort();

	// 		if (this.pageProvider && !this.pageConfig.isEndOfData) {
	// 			if (event == 'search') {
	// 				this.pageProvider.readNotification(query).then((result: any) => {
	// 					if (result.length == 0) {
	// 						this.pageConfig.isEndOfData = true;
	// 					}
	// 					this.items = result;
	// 					this.loadedData(null);
	// 				});
	// 			} else {
	// 				this.query.Skip = this.items.length;
	// 				this.pageProvider
	// 					.readNotification(query)
	// 					.then((result: any) => {
	// 						if (result.length == 0) {
	// 							this.pageConfig.isEndOfData = true;
	// 						}
	// 						if (result.length > 0) {
	// 							let firstRow = result[0];

	// 							//Fix dupplicate rows
	// 							if (this.items.findIndex((d) => d.Id == firstRow.Id) == -1) {
	// 								this.items = [...this.items, ...result];
	// 							}
	// 						}

	// 						this.loadedData(event);
	// 					})
	// 					.catch((err) => {
	// 						if (err.message != null) {
	// 							this.env.showMessage(err.message, 'danger');
	// 						} else {
	// 							this.env.showMessage('Cannot extract data', 'danger');
	// 						}

	// 						this.loadedData(event);
	// 					});
	// 			}
	// 		} else {
	// 			this.loadedData(event);
	// 		}
	// 	}
	// }


	readNoti(i) {
		let data = {
			Id: parseInt(i.IDReceiver),
			ReadDate: new Date(),
		};
		this.pageProvider.save(data).then((_) => {
			this.env.publishEvent({
				Code: 'app:notification',
			});
			this.nav(i.Link);
		});
	}

	markAsRead() {
		this.env.showPrompt('Do you want to mark as read?', null, 'Are you sure?', 'Yes', 'No').then((_) => {
			let postDTO = {
				Ids: this.selectedNotification.map((item) => item.IDReceiver),
				IsAll: this.selectedNotification.length == 0,
			};
			this.pageProvider.markAsRead(postDTO).then((result: any) => {
				this.env.publishEvent({
					Code: 'app:notification',
				});
			});
		});
	}

	markAsUnRead() {
		this.env.showPrompt('Do you want to mark as unread?', null, 'Are you sure?', 'Yes', 'No').then((_) => {
			let postDTO = {
				Ids: this.selectedNotification.map((item) => item.IDReceiver),
				IsAll: this.selectedNotification.length == 0,
			};
			this.pageProvider.markAsUnRead(postDTO).then((result: any) => {
				this.env.publishEvent({
					Code: 'app:notification',
				});
			});
		});
	}

	deleteNoti() {
		this.env.showPrompt('Do you want to delete notification?', null, 'Are you sure?', 'Yes', 'No').then((_) => {
			let postDTO = {
				Ids: this.selectedNotification.map((item) => item.IDReceiver),
				IsAll: this.selectedNotification.length == 0,
			};
			this.pageProvider.deleteNotification(postDTO).then((result: any) => {
				this.env.publishEvent({
					Code: 'app:notification',
				});
			});
		});
	}

	selectNotification(i, e) {
		if (!i.isChecked) {
			this.selectedNotification.push(i);
		} else {
			this.selectedNotification.splice(this.selectedNotification.indexOf(i), 1);
		}
		e.stopPropagation();
	}

	nav(URL, direction = 'forward', data = null) {
		event?.preventDefault();
		event?.stopPropagation();

		if (direction == 'forward') {
			if (data) {
				this.navCtrl.navigateForward(URL, data);
			} else {
				this.navCtrl.navigateForward(URL);
			}
		} else if (direction == 'back') {
			this.navCtrl.navigateBack(URL);
		} else {
			this.navCtrl.navigateRoot(URL);
		}
	}
	@ViewChild('morePopover') morePopover!: HTMLIonPopoverElement;
	presentCopyPopover(e) {
		this.morePopover.event = e;
		this.isOpenPopover = !this.isOpenPopover;
	}

	// {
	// 	Title : "Notifications",
	// 	Body : "This is a notification message",
	// 	Icon : "assets/icon/favicon.png",
	// 	Link : "https://www.example.com",
	// }
}
