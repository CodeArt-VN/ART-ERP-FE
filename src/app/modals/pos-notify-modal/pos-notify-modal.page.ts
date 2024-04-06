import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';

@Component({
  selector: 'app-pos-notify-modal',
  templateUrl: './pos-notify-modal.page.html',
  styleUrls: ['./pos-notify-modal.page.scss'],
})
export class POSNotifyModalPage extends PageBase {
  typeList = [];
  constructor(
    public env: EnvService,
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public modalController: ModalController,
    public navParams: NavParams,
  ) {
    super();
  }

  goToNofication(i, j) {
    this.item[j].Watched = true;
    this.env.setStorage('Notifications', this.item);
    this.modalController.dismiss();
    if (i.Url != null) {
      this.nav(i.Url, 'forward');
    }
  }
  removeNotification(j) {
    this.item.splice(j, 1);
    this.env.setStorage('Notifications', this.item);
  }
  removeNotifications() {
    if (this.item.filter((n) => n.Watched == true).length > 0) {
      this.item = this.item.filter((n) => n.Watched == false);
      this.env.setStorage('Notifications', this.item);
      this.modalController.dismiss(this.item);
    } else {
      this.env.showMessage('Không có thông báo nào đã xem', 'warning');
      return;
    }
  }

  preLoadData(event?: any): void {
    super.loadedData(event);
  }
  // dismiss(role = 'cancel') {
  // 	if (role == 'confirm' && this.item.Code == 'Other' && !this.item.NotifyNote ) {
  // 		this.env.showMessage('Xin vui lòng nhập lý do.');
  // 		return;
  // 	}

  // 	return this.modalController.dismiss(this.item, role, 'POSNotifyModalPage');
  // }
}
