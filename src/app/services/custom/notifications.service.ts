import { Injectable } from '@angular/core';
import { OSM_NotificationProvider } from 'src/app/services/static/services.service';

@Injectable({ providedIn: 'root' })
export class OSM_NotificationService extends OSM_NotificationProvider {
	readNotification(query: any) {
		return new Promise((resolve, reject) => {
			this.commonService
				.connect('GET', 'OSM/Notification/GetUserNotification', query)
				.toPromise()
				.then((res) => {
					resolve(res);
				});
		});
	}

	getNotificationCount(query: any) {
		return new Promise((resolve, reject) => {
			this.commonService
			.connect('GET', 'OSM/Notification/GetNotifications', query)
			.toPromise()
			.then((res) => {
				resolve(res);
			});
		});
	}

	markAsRead(postDTO: any) {
		return new Promise((resolve, reject) => {
			this.commonService
				.connect('POST', 'OSM/Notification/MarkAsRead', postDTO)
				.toPromise()
				.then((res) => {
					resolve(res);
				});
		});
	}

	markAsUnRead(postDTO: any) {
		return new Promise((resolve, reject) => {
			this.commonService
				.connect('POST', 'OSM/Notification/MarkAsUnRead', postDTO)
				.toPromise()
				.then((res) => {
					resolve(res);
				});
		});
	}

	deleteNotification(postDTO: any) {
		return new Promise((resolve, reject) => {
			this.commonService
				.connect('POST', 'OSM/Notification/DeleteNotification', postDTO)
				.toPromise()
				.then((res) => {
					resolve(res);
				});
		});
	}
}
