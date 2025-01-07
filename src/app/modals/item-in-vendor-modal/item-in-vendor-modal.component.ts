import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { CommonService } from 'src/app/services/core/common.service';
import { EnvService } from 'src/app/services/core/env.service';
import { lib } from 'src/app/services/static/global-functions';
import { PROD_ItemInVendorProvider } from 'src/app/services/static/services.service';

@Component({
  selector: 'app-item-in-vendor-modal',
  templateUrl: './item-in-vendor-modal.component.html',
  styleUrls: ['./item-in-vendor-modal.component.scss'],
  standalone : false
})
export class ItemInVendorModalPage extends PageBase {


  @Input() itemInVendors: any;
  item: any;
  @Input() isMultiple: any = false;
  constructor(
    public modal: ModalController,
    public itemInVendorProvider: PROD_ItemInVendorProvider,
    public route: ActivatedRoute,
    public router: Router,
    public navCtrl: NavController,
    public env: EnvService,
    public pageProvider: PROD_ItemInVendorProvider

  ) {
    super();
  }

  preLoadData(event?: any): void {
    if (this.itemInVendors){

      this.query.IDItem = this.itemInVendors.map(d=> d.IDItem);
    } 
    super.preLoadData();
  }

  loadedData(event?: any, ignoredFromGroup?: boolean): void {
    super.loadedData();
    console.log(this.items);
    this.items = [...this.items.reduce((acc, item) => {
      if (item['IDItem']) {
        let i = acc.find(d => d.IDItem == item['IDItem'])
        if (i) {
          i._Vendors.push(item._Vendor)
        } else {
          item._Vendors = [item._Vendor];
          acc.push(item);
        }
      }
      return acc;
    }, [])];
    this.itemInVendors = this.itemInVendors?.map(d => {
      let i = this.items.find(item => item.IDItem == d['IDItem']);
      if(i){
        let temp = lib.cloneObject(i);
        temp._Vendors.forEach(v=> v.checked = (v.Id == d.IDVendor))
        return {...temp, Quantity: d.Quantity, UoMName: d.UoMName,IDDetail:d.IDDetail} ;
      } 
      return d;
    });
 
    
    console.log(this.items)
  }


  changeVendor(i, index) {
    if (!this.isMultiple) {
      if (i._Vendors[index].checked) {
        i._Vendors.forEach(d => d.checked = false)
        i._Vendors[index].checked = true;
      }
    }
  }
  

  submitForm() {
    let obj = this.itemInVendors.map(d=>{return {
      IDDetail : d.IDDetail,
      IDItem : d.IDItem,
      _Vendors: d._Vendors
    }});
    console.log(obj);
    
    this.modal.dismiss(obj);
  }
}
