import { Component, Input } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';
import { BRA_BranchProvider, CRM_ContactProvider, SALE_OrderDetailProvider, SALE_OrderProvider, SYS_ConfigProvider } from 'src/app/services/static/services.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import QRCode from 'qrcode'
import { lib } from 'src/app/services/static/global-functions';

@Component({
    selector: 'app-so-note',
    templateUrl: 'sale-order-note.html',
    styleUrls: ['sale-order-note.scss']
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
        this.id = this.ID
        if (this.item != null) {
            this.loadedData(event);
        }
        else {
            super.preLoadData(event);
        }
    }
    loadedData(event) {
        super.loadedData(event)
        this.loadDeliveryNote();
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
            this.item.OriginalTotalAfterDiscountFromSalesmanText = lib.currencyFormat(this.item.OriginalTotalAfterTax - this.item.OriginalDiscountFromSalesman);
            this.item.DocTienBangChu = this.DocTienBangChu(this.item.OriginalTotalAfterTax);
            this.item.HasDiscountFromSalesman = false;
            this.item.ShowCalcPromotion = false;
            var that = this
            QRCode.toDataURL('SO:' + this.item.Id, { errorCorrectionLevel: 'H', version: 2, width: 500, scale: 20, type: 'image/webp' }, function (err, url) {
                that.item.QRC = url;
            })
           this.item.OrderLines?.forEach(i=>{
            i.UoMPriceText =  lib.formatMoney(i.UoMPrice, 0)
            i.OriginalTotalDiscountText = lib.formatMoney(i.OriginalTotalDiscount, 0);
            i.OriginalTotalAfterDiscountText =  lib.formatMoney(i.OriginalTotalAfterDiscount, 0);
                if ((i.OriginalTotalDiscount || i.OriginalTotalAfterTax==0) ) {
                    this.item.ShowCalcPromotion = true;
                }
           })
         

           this.branch = this.env.branchList.find(d=> d.Id ==this.item.IDBranch);
            this.item.BranchName = this.branch?.Name;
            this.item.BranchLogoURL = this.branch?.LogoURL;
            this.item.BranchAddress = this.branch?.Address;
       

            //this.item.OrderLines.sort((a, b) => (parseFloat(a.ItemSort) - parseFloat(b.ItemSort)) || a.Item.Code.localeCompare(b.Item.Code));

    }

    DocSo3ChuSo(baso) {
        var ChuSo = new Array(" không ", " một ", " hai ", " ba ", " bốn ", " năm ", " sáu ", " bảy ", " tám ", " chín ");

        var tram;
        var chuc;
        var donvi;
        var KetQua = "";
        tram = parseInt((baso / 100) + '');
        chuc = parseInt(((baso % 100) / 10) + '');
        donvi = baso % 10;
        if (tram == 0 && chuc == 0 && donvi == 0) return "";
        if (tram != 0) {
            KetQua += ChuSo[tram] + " trăm ";
            if ((chuc == 0) && (donvi != 0)) KetQua += " linh ";
        }
        if ((chuc != 0) && (chuc != 1)) {
            KetQua += ChuSo[chuc] + " mươi";
            if ((chuc == 0) && (donvi != 0)) KetQua = KetQua + " linh ";
        }
        if (chuc == 1) KetQua += " mười ";
        switch (donvi) {
            case 1:
                if ((chuc != 0) && (chuc != 1)) {
                    KetQua += " mốt ";
                }
                else {
                    KetQua += ChuSo[donvi];
                }
                break;
            case 5:
                if (chuc == 0) {
                    KetQua += ChuSo[donvi];
                }
                else {
                    KetQua += " lăm ";
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
        var Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");

        var lan = 0;
        var i = 0;
        var so = 0;
        var KetQua = "";
        var tmp = "";
        var ViTri = new Array();
        if (SoTien < 0) return "Số tiền âm !";
        if (SoTien == 0) return "Không đồng !";
        if (SoTien > 0) {
            so = SoTien;
        }
        else {
            so = -SoTien;
        }
        if (SoTien > 8999999999999999) {
            //SoTien = 0;
            return "Số quá lớn!";
        }
        ViTri[5] = Math.floor(so / 1000000000000000);
        if (isNaN(ViTri[5]))
            ViTri[5] = "0";
        so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
        ViTri[4] = Math.floor(so / 1000000000000);
        if (isNaN(ViTri[4]))
            ViTri[4] = "0";
        so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
        ViTri[3] = Math.floor(so / 1000000000);
        if (isNaN(ViTri[3]))
            ViTri[3] = "0";
        so = so - parseFloat(ViTri[3].toString()) * 1000000000;
        ViTri[2] = parseInt((so / 1000000) + '');
        if (isNaN(ViTri[2]))
            ViTri[2] = "0";
        ViTri[1] = parseInt(((so % 1000000) / 1000) + '');
        if (isNaN(ViTri[1]))
            ViTri[1] = "0";
        ViTri[0] = parseInt((so % 1000) + '');
        if (isNaN(ViTri[0]))
            ViTri[0] = "0";
        if (ViTri[5] > 0) {
            lan = 5;
        }
        else if (ViTri[4] > 0) {
            lan = 4;
        }
        else if (ViTri[3] > 0) {
            lan = 3;
        }
        else if (ViTri[2] > 0) {
            lan = 2;
        }
        else if (ViTri[1] > 0) {
            lan = 1;
        }
        else {
            lan = 0;
        }
        for (i = lan; i >= 0; i--) {
            tmp = this.DocSo3ChuSo(ViTri[i]);
            KetQua += tmp;
            if (ViTri[i] > 0) KetQua += Tien[i];
            if ((i > 0) && (tmp.length > 0)) KetQua += ',';//&& (!string.IsNullOrEmpty(tmp))
        }
        if (KetQua.substring(KetQua.length - 1) == ',') {
            KetQua = KetQua.substring(0, KetQua.length - 1);
        }
        KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2) + ' đồng';
        return KetQua;//.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
    }

}
