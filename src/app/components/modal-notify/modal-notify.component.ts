import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';

@Component({
  selector: 'app-modal-notify',
  templateUrl: './modal-notify.component.html',
  styleUrls: ['./modal-notify.component.scss'],
})
export class ModalNotifyComponent extends PageBase {
  constructor(
    public env: EnvService,
    public modalController: ModalController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cdr: ChangeDetectorRef,
    public loadingController: LoadingController,
    public navCtrl: NavController,
  ) { 
    super();
    
  }
  goToNofication(i,j){
    this.item[j].Watched = true;
    this.env.setStorage('Notifications',this.item);
    this.modalController.dismiss(); 
    if(i.Url!=null){
      this.nav(i.Url,'forward');
    }
  }
  removeNotification(j){
    this.item.splice(j, 1);
    this.env.setStorage('Notifications',this.item);
  }
  removeNotifications(){
    if(this.item.filter(n=>n.Watched == true).length <=0){
      this.env.showMessage("Không có thông báo nào đã xem!","warning");
      return
    }
    else{
      this.item.filter(n=>n.Watched == true).forEach((i,index)=>{
        this.item.splice(index,1);
      });
      this.env.setStorage('Notifications',this.item);
    }
  }
}
