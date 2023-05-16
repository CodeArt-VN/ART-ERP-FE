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
  loadedData(event?: any, ignoredFromGroup?: boolean): void {
    super.loadedData();
    this.env.getStorage('Notifications').then((result:any)=>{
        if(result){
            this.items = result;
        }
    });
  }
  goToNofication(i,j){
    this.items = this.items.splice(j, 1);
    console.log(this.items);
    this.env.setStorage('Notifications',this.items);
    this.modalController.dismiss(); 
    this.nav(i.Url,'forward');
  }
}
