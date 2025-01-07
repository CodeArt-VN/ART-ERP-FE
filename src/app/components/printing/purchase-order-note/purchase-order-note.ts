import { Component, Input } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';
import { PURCHASE_OrderProvider } from 'src/app/services/static/services.service';
import { Location } from '@angular/common';
import { lib } from 'src/app/services/static/global-functions';
import QRCode from 'qrcode';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-po-note',
    templateUrl: 'purchase-order-note.html',
    styleUrls: ['purchase-order-note.scss'],
    standalone: false
})
export class PurchaseOrderNoteComponent extends PageBase {
  @Input() ID;
  @Input() item;
  @Input() PONShowPackingUoM;
  @Input() PONShowEACaseOnly;
  @Input() PONConvertToLargerUoM;

  sheets: any[] = [];
  constructor(
    public pageProvider: PURCHASE_OrderProvider,
    public modalController: ModalController,
    public alertCtrl: AlertController,
    public loadingController: LoadingController,
    public env: EnvService,
    public navCtrl: NavController,
    public location: Location,
    public route: ActivatedRoute,
  ) {
    super();
    this.pageConfig.isShowFeature = true;
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
    this.loadPurchaseOrderNote();
  }
  loadPurchaseOrderNote() {
    this.submitAttempt = true;

    this.loadingController
      .create({
        cssClass: 'my-custom-class',
        message: 'Đang tạo phiếu mua hàng...',
      })
      .then((loading) => {
        loading.present();
        //const o = this.PO;
        this.item.OrderDateText = lib.dateFormat(this.item.OrderDate, 'dd/mm/yy hh:MM');
        this.item.ExpectedReceiptDateText = lib.dateFormat(this.item.ExpectedReceiptDate, 'dd/mm/yy hh:MM');
        this.item.StatusText = lib.getAttrib(this.item.Status, this.env.statusList, 'Name', 'NA', 'Code');
        var self = this;
        QRCode.toDataURL(
          'PO:' + this.item.Id,
          {
            errorCorrectionLevel: 'H',
            version: 2,
            width: 500,
            scale: 20,
            type: 'image/webp',
          },
          function (err, url) {
            self.item.QRC = url;
          },
        );

        this.item.OrderLines.forEach((l) => {
          l._Item = this.item._Items.find((d) => d.Id == l.IDItem);
          l.UoMPriceText = lib.formatMoney(l.UoMPrice, 0);
          l.TotalBeforeDiscountText = lib.formatMoney(l.TotalBeforeDiscount, 0);
          l.TotalDiscountText = lib.formatMoney(l.TotalDiscount, 0);
          l.TotalAfterDiscountText = lib.formatMoney(l.TotalAfterDiscount, 0);
          l.TotalAfterTaxText = lib.formatMoney(l.TotalAfterTax, 0);
        });
        this.item.OrderLines.sort(
          (a, b) => parseFloat(a.ItemSort) - parseFloat(b.ItemSort) || a._Item.Code.localeCompare(b._Item.Code),
        );

        this.item.TotalBeforeDiscountText = lib.formatMoney(this.item.TotalBeforeDiscount, 0);
        this.item.TotalDiscountText = lib.formatMoney(this.item.TotalDiscount, 0);
        this.item.TotalAfterDiscountText = lib.formatMoney(this.item.TotalAfterDiscount, 0);
        this.item.TotalTaxText = lib.formatMoney(this.item.TotalTax, 0);
        this.item.TotalAfterTaxText = lib.formatMoney(this.item.TotalAfterTax, 0);
        // this.PO.DocTienBangChu = this.DocTienBangChu(this.PO.TotalAfterTax);

        this.submitAttempt = false;
        if (loading) loading.dismiss();

        if (loading) loading.dismiss();
      });
  }

  DocSo3ChuSo(baso) {
    var ChuSo = new Array(' không ', ' một ', ' hai ', ' ba ', ' bốn ', ' năm ', ' sáu ', ' bảy ', ' tám ', ' chín ');

    var tram;
    var chuc;
    var donvi;
    var KetQua = '';
    tram = parseInt(baso / 100 + '');
    chuc = parseInt((baso % 100) / 10 + '');
    donvi = baso % 10;
    if (tram == 0 && chuc == 0 && donvi == 0) return '';
    if (tram != 0) {
      KetQua += ChuSo[tram] + ' trăm ';
      if (chuc == 0 && donvi != 0) KetQua += ' linh ';
    }
    if (chuc != 0 && chuc != 1) {
      KetQua += ChuSo[chuc] + ' mươi';
      if (chuc == 0 && donvi != 0) KetQua = KetQua + ' linh ';
    }
    if (chuc == 1) KetQua += ' mười ';
    switch (donvi) {
      case 1:
        if (chuc != 0 && chuc != 1) {
          KetQua += ' mốt ';
        } else {
          KetQua += ChuSo[donvi];
        }
        break;
      case 5:
        if (chuc == 0) {
          KetQua += ChuSo[donvi];
        } else {
          KetQua += ' lăm ';
        }
        break;
      default:
        if (donvi != 0) {
          KetQua += ChuSo[donvi];
        }
        break;
    }
    return KetQua;
  }

  DocTienBangChu(SoTien) {
    var Tien = new Array('', ' nghìn', ' triệu', ' tỷ', ' nghìn tỷ', ' triệu tỷ');

    var lan = 0;
    var i = 0;
    var so = 0;
    var KetQua = '';
    var tmp = '';
    var ViTri = new Array();
    if (SoTien < 0) return 'Số tiền âm !';
    if (SoTien == 0) return 'Không đồng !';
    if (SoTien > 0) {
      so = SoTien;
    } else {
      so = -SoTien;
    }
    if (SoTien > 8999999999999999) {
      //SoTien = 0;
      return 'Số quá lớn!';
    }
    ViTri[5] = Math.floor(so / 1000000000000000);
    if (isNaN(ViTri[5])) ViTri[5] = '0';
    so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
    ViTri[4] = Math.floor(so / 1000000000000);
    if (isNaN(ViTri[4])) ViTri[4] = '0';
    so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
    ViTri[3] = Math.floor(so / 1000000000);
    if (isNaN(ViTri[3])) ViTri[3] = '0';
    so = so - parseFloat(ViTri[3].toString()) * 1000000000;
    ViTri[2] = parseInt(so / 1000000 + '');
    if (isNaN(ViTri[2])) ViTri[2] = '0';
    ViTri[1] = parseInt((so % 1000000) / 1000 + '');
    if (isNaN(ViTri[1])) ViTri[1] = '0';
    ViTri[0] = parseInt((so % 1000) + '');
    if (isNaN(ViTri[0])) ViTri[0] = '0';
    if (ViTri[5] > 0) {
      lan = 5;
    } else if (ViTri[4] > 0) {
      lan = 4;
    } else if (ViTri[3] > 0) {
      lan = 3;
    } else if (ViTri[2] > 0) {
      lan = 2;
    } else if (ViTri[1] > 0) {
      lan = 1;
    } else {
      lan = 0;
    }
    for (i = lan; i >= 0; i--) {
      tmp = this.DocSo3ChuSo(ViTri[i]);
      KetQua += tmp;
      if (ViTri[i] > 0) KetQua += Tien[i];
      if (i > 0 && tmp.length > 0) KetQua += ','; //&& (!string.IsNullOrEmpty(tmp))
    }
    if (KetQua.substring(KetQua.length - 1) == ',') {
      KetQua = KetQua.substring(0, KetQua.length - 1);
    }
    KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2) + ' đồng';
    return KetQua; //.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
  }
}
