import { Injectable } from '@angular/core';
import { CommonService } from './core/common.service';
import { EnvService } from './core/env.service';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})

//PromotionService là service để quản lý các chương trình khuyến mãi cho POS khi chạy offline
export class PromotionService {
  promotionList: any;
  constructor(
    public commonService: CommonService,
    public env: EnvService,
    public plt: Platform,
  ) {}

  
  //Kiểm tra kết nối internet
  checkInternetConnection(): boolean {
    return navigator.onLine;
  }
  


  getPromotionList() {
    //Select từ database láy danh sách các promotion đang hoạt động
    //Sau đó gán vào biến promotionList

    //Vấn đề. Khi chạy offline thì không thể lấy dữ liệu từ database được
    // Cần giải quyết : xác định xem cách thức lấy dữ liệu và đồng bộ dữ liệu ngược lên server


    return new Promise((resolve, reject) => {
      Promise.all([this.env.getStorage('promotions')]).then((values) => {
        let promotions = values[0];
        if (false) {
          // ToDo 
          // Nếu có promotions trong storage rồi thì gán vô  promotionList
          this.promotionList = promotions;
          resolve(true);
        } else {
          let date = new Date();
          let time = date.toTimeString().split(' ')[0];
          date.setHours(0, 0, 0, 0);
          let query = {
            IsDeleted: false,
            BetweenDate: date, //Lấy các chương trình có thời hạn từ ngày hiện tại
            Type: 'Voucher',
            CanUse: true,
            Status: 'Approved',
          };
          this.commonService
            .connect('GET', 'SALE/Order/Program', query)
            .toPromise()
            .then((resp) => {
              this.promotionList = resp;
              this.env.setStorage('promotions', this.promotionList);
              resolve(true);
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
    });
  }
}

// Code: 'M5NQOU13ORKU';
// CreatedBy: 'loipham@inholdings.vn';
// CreatedDate: '2025-01-08T17:11:33.38';
// FromDate: '2025-01-06T00:00:00';
// IDBranch: 16;
// Id: 24;
// IsApplyAllCustomer: true;
// IsApplyAllProduct: true;
// IsAutoApply: false;
// IsByPercent: false;
// IsDeleted: false;
// IsDisabled: false;
// IsDiscount: false;
// IsItemPromotion: false;
// IsPublic: true;
// MaxUsagePerCustomer: 5;
// MaxValue: 0;
// MinOrderValue: 100000;
// ModifiedBy: 'loipham@inholdings.vn';
// ModifiedDate: '2025-01-10T11:44:03.22';
// Name: 'Test 111111';
// NumberOfCoupon: 4;
// NumberOfUsed: 0;
// Remark: null;
// Sort: null;
// Status: 'Approved';
// ToDate: '2025-01-14T00:00:00';
// Type: 'Voucher';
// Value: 30000;
// Items: [];
// Partners:[];

