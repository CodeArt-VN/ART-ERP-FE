import { Component, Input } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';
import {
  BRA_BranchProvider,
  CRM_ContactProvider,
  SALE_OrderDetailProvider,
  SALE_OrderProvider,
  SYS_ConfigProvider,
} from 'src/app/services/static/services.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import QRCode from 'qrcode';
import { lib } from 'src/app/services/static/global-functions';

@Component({
  selector: 'app-so-note',
  templateUrl: 'sale-order-note.html',
  styleUrls: ['sale-order-note.scss'],
})
export class SaleOrderNoteComponent extends PageBase {
  @Input() ID;
  @Input() item;
  branch;
  customer;
  constructor(
    public pageProvider: SALE_OrderProvider,
    public branchProvider: BRA_BranchProvider,
    public modalController: ModalController,
    public alertCtrl: AlertController,
    public loadingController: LoadingController,
    public env: EnvService,
    public navCtrl: NavController,
    public location: Location,
    public route: ActivatedRoute,
  ) {
    super();
    this.pageConfig.isDetailPage = true;
  }
  preLoadData(event?: any): void {
    this.id = this.ID;
    if (this.item != null) {
      this.loadedData(event);
    } else {
      super.preLoadData(event);
    }
  }
  loadedData(event) {
    super.loadedData(event);
    if (this.item.Id) {
      this.loadDeliveryNote();
    }
  }

  selectedShipmentID = 0;
  sheets: any = [];
  loadDeliveryNote() {
    // this.item.STT = this.item.NumberOfOrders;
    this.item.TotalOrders += this.item.OriginalTotalAfterTax;

    this.item.OrderDateText = lib.dateFormat(this.item.OrderDate, 'dd/mm/yyyy');
    this.item.OriginalTotalBeforeDiscountText = lib.currencyFormat(this.item.OriginalTotalBeforeDiscount);
    this.item.OriginalTotalDiscountText = lib.currencyFormat(this.item.OriginalTotalDiscount);
    this.item.OriginalTaxText = lib.currencyFormat(this.item.OriginalTax);

    this.item.OriginalTotalAfterTaxText = lib.currencyFormat(this.item.OriginalTotalAfterTax);
    this.item.OriginalDiscountFromSalesmanText = lib.currencyFormat(this.item.OriginalDiscountFromSalesman);
    this.item.OriginalTotalAfterDiscountFromSalesmanText = lib.currencyFormat(
      this.item.OriginalTotalAfterTax - this.item.OriginalDiscountFromSalesman,
    );
    this.item.DocTienBangChu = lib.DocTienBangChu(this.item.OriginalTotalAfterTax);
    this.item.HasDiscountFromSalesman = false;
    this.item.ShowCalcPromotion = false;
    // var that = this
    // QRCode.toDataURL('O:' + this.item.Id, { errorCorrectionLevel: 'H', version: 2, width: 500, scale: 20, type: 'image/webp' }, function (err, url) {
    //     that.item.QRC = url;
    // })

    this.item.OrderLines.forEach((i) => {
      i.UoMPriceText = lib.formatMoney(i.UoMPrice, 0);
      i.OriginalTotalDiscountText = lib.formatMoney(i.OriginalTotalDiscount, 0);
      i.OriginalTotalAfterDiscountText = lib.formatMoney(i.OriginalTotalAfterDiscount, 0);
      if (i.OriginalTotalDiscount || i.OriginalTotalAfterTax == 0) {
        this.item.ShowCalcPromotion = true;
      }
    });

    this.branch = this.env.branchList.find((d) => d.Id == this.item.IDBranch);
    this.item.BranchName = this.branch?.Name;
    this.item.BranchLogoURL = this.branch?.LogoURL;
    this.item.BranchAddress = this.branch?.Address;

    this.generatePaymentQRCODE(this.item.Id, this.item.OriginalTotalAfterTax);
    //this.item.OrderLines.sort((a, b) => (parseFloat(a.ItemSort) - parseFloat(b.ItemSort)) || a.Item.Code.localeCompare(b.Item.Code));
  }

  generatePaymentQRCODE(SOId: number, Amount: number = 0) {
    let that = this;
    let bankQRContent = lib.genBankTransferQRCode('mb', '0908061119', Amount, 'SO' + SOId);
    QRCode.toDataURL(
      bankQRContent,
      {
        errorCorrectionLevel: 'M',
        version: 6,
        width: 500,
        scale: 20,
        type: 'image/webp',
      },
      function (err, url) {
        that.item.QRC = url;
      },
    );
  }
}
