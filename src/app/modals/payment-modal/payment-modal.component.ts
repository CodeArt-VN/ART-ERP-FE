import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/core/common.service';
import { EnvService } from 'src/app/services/core/env.service';
import { BANK_IncomingPaymentProvider, SYS_ConfigProvider } from 'src/app/services/static/services.service';
import { environment } from 'src/environments/environment';
import { PaymentService } from './paymentService';
@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
  standalone: false,
})
export class PaymentModalComponent implements OnInit {
  formGroup: FormGroup;
  edccList: any = [];
  paymentStatusList: any = [];
  bankList: any = [{ Code: 'VCB', Name: 'Vietcombank', Image: '/assets/logos/banks/VCB.png' }, { Code: 'MB', Name: 'MB Bank', Image: '/assets/logos/banks/mb.png' }];
  URI = "http://113.161.81.81:8771/api/action";
  submitAttempt: boolean = false;
  item: any = {
    IDBranch: '',
    IDStaff: '',
    IDCustomer: '',
    IDSaleOrder: '',
    DebtAmount: '',
    IsActiveInputAmount: true,
    IsActiveTypeCash: true,
    ReturnUrl: '',
    Lang: '',
    Timestamp: '',
    CreatedBy: '',
    IsRefundTransaction: false,
  };
  // ----- Các biến binding cho view -----
  btnAmounts: number[] = [];
  changeAmount: number = 0;
  payment: any;
  constructor(private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private incomingPaymentProvider: BANK_IncomingPaymentProvider,
    private commonService: CommonService,
    private env: EnvService,
    private paymentService: PaymentService
  ) {
    this.formGroup = this.formBuilder.group({
      IDBranch: [''],
      IDCustomer: [''],
      IDStaff: [''],
      Code: [''],
      IDSaleOrder: [''],
      DebtAmount: [''],
      InputAmount: [''],
      Amount: [0],
      Type: ['Cash'],
      SubType: [''],
      Remark: [''],
      CreatedBy: [''],
      Status: [''],
      Timestamp: [''],
      IsActiveInputAmount: [true],
      IsActiveTypeCash: [true],
      IsActiveZlpay: [true],
      IsActiveTypeZalopayApp: [true],
      IsActiveTypeATM: [true],
      IsActiveTypeCC: [true],
      IsRefundTransaction: [false],
      ReturnUrl: [''],
      Lang: [''],
      EDCC: [''],
      IDOriginalTransaction: [],
    });
  }
  subscribePOSOrderDetail
  // --------------------------------------------------------------------
  // Lifecycle
  // --------------------------------------------------------------------
  async ngOnInit() {
    this.subscribePOSOrderDetail = this.env.getEvents().subscribe((data) => {
      if (!data.code?.startsWith('signalR:')) return;
      if (data.id == this.env.user.StaffID) return;
      if (!this.payment) return;
      const value = JSON.parse(data.value);

      switch (data.code) {
        case 'signalR:POSOrderPaymentUpdate':
          if (value.Id != this.payment?.Id) return;
          this.payment.Status = value.Status;
          this.payment._Status = this.paymentStatusList.find(d => d.Code == this.payment.Status)

          if (this.payment.Status == 'Fail') {
            this.payment = null;
            this.env.showAlert('', 'Please create new payment', 'Payment failed')
            this.env.showMessage('Payment fail', 'danger');
          }
          else if (this.payment.Status == 'Success') {
            this.env.showMessage('Payment success', 'success');
            this.closeModal();
          }
          return;

      }
    });

    let branch = this.env.branchList.find(b => b.Id == this.item.IDBranch);
    if (branch) this.item.BranchName = branch.Name;
    this.retryAsync(() => this.getEDCCConnection(), 3, 1000)
      .then((rs) => {
        this.edccList = rs;
      })
      .catch((err) => {
        console.error("EDCC failed after 3 retries:", err);
        this.env.showMessage("Unable to connect to terminal device!", "danger");
      });

    this.formGroup.patchValue(this.item);
    this.generateAmountButtons();
  }
  getEDCCConnection() {
    return new Promise((resolve, reject) => {
      this.incomingPaymentProvider.commonService.connect('GET', 'BANK/IncomingPayment/GetEDCCConnection', {}).toPromise().then((rs) => {
        console.log(rs);
        resolve(rs)
      }).catch(err => {
        this.env.showMessage(err.error?.ExceptionMessage, 'danger');
        reject(null)
      })
    })
  }
  async retryAsync<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
    try {
      return await fn();
    } catch (err) {
      if (retries <= 0) throw err;
      await new Promise(res => setTimeout(res, delay));
      return this.retryAsync(fn, retries - 1, delay);
    }
  }
  // --------------------------------------------------------------------
  // Sinh danh sách mệnh giá gợi ý
  // --------------------------------------------------------------------
  generateAmountButtons() {
    const listMenhGia = [10000, 20000, 50000, 100000, 200000, 500000];
    const debt = Math.abs(this.item?.DebtAmount || 0);

    this.btnAmounts = [debt];
    if (debt <= 500000) {
      listMenhGia.forEach((mg) => {
        if (mg > debt) this.btnAmounts.push(mg);
      });
    } else {
      const num = Math.floor(debt / 500000);
      listMenhGia.forEach((mg) => {
        const val = num * 500000 + mg;
        if (val > debt) this.btnAmounts.push(val);
      });
    }

    this.formGroup.get('InputAmount').setValue(debt);
    this.formGroup.get('InputAmount').markAsDirty();
  }

  // --------------------------------------------------------------------
  // Khi người dùng chọn mệnh giá
  // --------------------------------------------------------------------
  selectAmount(amount: number) {
    this.formGroup.get('InputAmount').setValue(amount);
    if (!this.item.IsRefundTransaction) {
      const debt = Math.abs(this.item.DebtAmount);
      this.changeAmount = Math.max(0, amount - debt);
    }
  }


  // --------------------------------------------------------------------
  // Chọn ngân hàng con (SubType) trong card / transfer
  // --------------------------------------------------------------------
  changeSubType(sub?: string) {
    this.formGroup.get('SubType')?.setValue(sub);
    this.formGroup.get('SubType').markAsDirty();
  }
  changeType(type) {
    this.formGroup.get('Type')?.setValue(type);
    this.formGroup.get('Type').markAsDirty();
  }
  changeEDCC(e) {
    this.formGroup.get('SubType').setValue('VCB');
    this.formGroup.get('Type').setValue('Card');
  }
  // --------------------------------------------------------------------
  // Gửi yêu cầu thanh toán
  // --------------------------------------------------------------------
  async confirmPayment() {
    this.submitAttempt = true;

    if (!this.formGroup.get('InputAmount').value || this.formGroup.get('InputAmount').value <= 0) {
      this.env.showMessage('Please input valid amount', 'warning');
      return;
    }
    if (!this.formGroup.get('Type').value) {
      this.env.showMessage('Please choose payment method', 'warning');
      return;
    }

    let obj = this.formGroup.getRawValue();
    obj.Status = 'Processing';
    if (obj.Type == 'Cash' || obj.Type == 'Debt' || obj.Type == 'BOD' || obj.Type == 'Transfer') {
      obj.Status = 'Success';
    }
    let payment = {
      IDBranch: this.item.IDBranch,
      IDStaff: this.env.user.StaffID,
      IDCustomer: this.item.IDCustomer,
      IDSaleOrder: this.item.IDSaleOrder,
      DebtAmount: this.item.DebtAmount,
      IsActiveInputAmount: true,
      IsActiveTypeCash: true,
      ReturnUrl: window.location.href,
      Lang: this.env.language.current,
      Timestamp: Date.now(),
      CreatedBy: this.env.user.Email,
    };
    let str = window.btoa(JSON.stringify(payment));
    let code = this.convertUrl(str);
    obj.Code = code;
    obj.Amount = obj.InputAmount;
    if (obj.Amount > this.item.DebtAmount && this.formGroup.get('Type').value == 'Cash') obj.Amount = this.item.DebtAmount;
    this.commonService.connect('POST', 'BANK/IncomingPayment', obj).toPromise().then(async (res: any) => {
      this.payment = res;
      this.payment._Status = this.paymentStatusList.find(d => d.Code == this.payment.Status)

      if (this.payment.Status == "Success") {
        this.env.showMessage('Payment success', 'success');
        this.env.publishEvent({
          code: 'signalR:POSOrderPaymentUpdate',  // giống code trong switch case
          value: JSON.stringify({
            IDSaleOrder: this.item.IDSaleOrder,
            TableName: this.item.TableName,
            Amount: this.payment.Amount,
            IDBranch: this.item.IDBranch,
            IDTable: this.item.IDTable
          })
        });
        this.closeModal();
      }
      else if (obj.Type == 'ZalopayApp') {
        if (this.payment.Status == "Processing") window.open(this.payment.PaymentURL, '_blank');
        this.closeModal();
      }
    })
  }
  // --------------------------------------------------------------------
  // Đóng modal
  // --------------------------------------------------------------------
  closeModal() {
    this.modalCtrl.dismiss(this.payment);
  }

  isRetryButton = false;
  isRePostSaleButton = false;
  isReCheckResultButton = false;
  async postSale() {

    let edcc = this.edccList.find(d => d.REF_ID == this.formGroup.get('EDCC').value);
    if (!edcc) return;
    let payment = {
      IDBranch: this.item.IDBranch,
      IDStaff: this.env.user.StaffID,
      IDCustomer: this.item.IDCustomer,
      IDSaleOrder: this.item.IDSaleOrder,
      IDTable: this.item.IDTable,
      Type: 'Card',
      SubType: 'VCB',
      DebtAmount: this.item.DebtAmount,
      Amount: this.formGroup.get('InputAmount').value,
      IsActiveInputAmount: true,
      IsActiveTypeCash: true,
      ReturnUrl: window.location.href,
      Lang: this.env.language.current,
      Timestamp: Date.now(),
      CreatedBy: this.env.user.Email,
      SERIAL_NUMBER: "",
      REF_ID: ""
    };
    payment.SERIAL_NUMBER = edcc?.SERIAL;
    payment.REF_ID = edcc?.REF_ID;
    payment.SubType = edcc?.Bank;
    this.submitAttempt = true;
    this.paymentService.postEDCCSale(payment).then((rs) => {
      this.payment = rs;
      this.payment._Status = this.paymentStatusList.find(d => d.Code == this.payment.Status)

      this.submitAttempt = false;
    }).catch(err => this.submitAttempt = false);
  }


  private convertUrl(str) {
    return str.replace('=', '').replace('=', '').replace('+', '-').replace('_', '/');
  }

  formatAmount(amount: number | string): string {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (!isFinite(num) || isNaN(num)) return '000000000000';
    // Convert to minor units (e.g. cents) expected by some terminals: multiply by 100
    const minor = Math.round(num * 100);
    return Math.abs(minor).toString().padStart(12, '0');
  }
  checkResult() {
    this.paymentService.checkResultRequest(this.payment.Id);
  }
}
