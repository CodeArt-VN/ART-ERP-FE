import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/core/common.service';
import { EnvService } from 'src/app/services/core/env.service';
import { BANK_IncomingPaymentProvider, SALE_OrderProvider } from 'src/app/services/static/services.service';
import { PaymentService } from './paymentService';
import { POSVoucherModalPage } from 'src/app/pages/POS/pos-voucher-modal/pos-voucher-modal.page';
import { PromotionService } from 'src/app/services/custom/promotion.service';
@Component({
	selector: 'app-payment-modal',
	templateUrl: './payment-modal.component.html',
	styleUrls: ['./payment-modal.component.scss'],
	standalone: false,
})
export class PaymentModalComponent implements OnInit {
	@ViewChild('billIframe', { static: false }) billIframe: ElementRef<HTMLIFrameElement>;
	cssStyle = '';
	isBillPreviewOpen = false;
	step = 1;
	title = '';
	canEditVoucher: false;
	formGroup: FormGroup;
	edccList: any = [];
	paymentStatusList: any = [];
	EDCCVCB_IsActive = false;
	ZPIsActive = false;
	IsActiveTypeCash = true;
	billHtml = '';
	qrCodeHtml = '';
	@Input() billElement: ElementRef;
	@Input() calcFunction: Function;
	@Input() onUpdateItem: Function;
	subPromotion: any;
	promotionAppliedPrograms = [];
	subscribePOSOrderDetail;

	bankList: any = [
		{ Code: 'VCB', Name: 'Vietcombank', Image: '/assets/logos/banks/VCB.png' },
		{ Code: 'MB', Name: 'MB Bank', Image: '/assets/logos/banks/mb.png' },
	];
	submitAttempt: boolean = false;
	item: any = {
		IDBranch: '',
		IDStaff: '',
		IDCustomer: '',
		IDSaleOrder: '',
		DebtAmount: '',
		TotalAmount: '',
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
	constructor(
		private modalController: ModalController,
		private promotionService: PromotionService,
		private formBuilder: FormBuilder,
		private incomingPaymentProvider: BANK_IncomingPaymentProvider,
		private saleOrderProvider: SALE_OrderProvider,
		private commonService: CommonService,
		private env: EnvService,
		private paymentService: PaymentService,
		private voucherService: PromotionService
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
			IsRefundTransaction: [false],
			ReturnUrl: [''],
			Lang: [''],
			EDCC: [''],
			IDOriginalTransaction: [],
		});
	}
	next() {
		this.step++;
	}

	back() {
		this.step--;
	}
	ngAfterViewInit() {
		if (!this.billElement?.nativeElement) return;

		const observer = new MutationObserver((mutations) => {
			console.log('DOM changed', mutations);

			const qr = this.billElement.nativeElement.querySelector('.qr-section');
			if (qr) {
				this.qrCodeHtml = qr.outerHTML;
			}
		});

		observer.observe(this.billElement.nativeElement, {
			childList: true,
			subtree: true,
		});
	}
	async ngOnInit() {
		if (!this.subPromotion) {
			this.subPromotion = this.promotionService.appliedPromotions$.subscribe((list) => {
				this.promotionAppliedPrograms = list;
				this.analyticVoucher();
			});
		}

		this.analyticVoucher();
		if (!this.subscribePOSOrderDetail) {
			this.subscribePOSOrderDetail = this.env.getEvents().subscribe((data) => {
				if (!data.code?.startsWith('signalR:')) return;
				if (data.id == this.env.user.StaffID) return;
				if (!this.payment) return;
				const value = JSON.parse(data.value);

				switch (data.code) {
					case 'signalR:POSOrderPaymentUpdate':
						if (value.Id != this.payment?.Id) return;
						this.payment.Status = value.Status;
						this.payment._Status = this.paymentStatusList.find((d) => d.Code == this.payment.Status);

						if (this.payment.Status == 'Fail') {
							this.payment = null;
							this.env.showAlert('', 'Please create new payment', 'Payment failed');
							this.env.showMessage('Payment fail', 'danger');
							//this.back();
						} else if (this.payment.Status == 'Success') {
							this.env.showMessage('Payment success', 'success');
							if (this.payment.Amount < this.item.DebtAmount) {
								this.item.DebtAmount -= this.payment.Amount;
								this.payment = null;
								this.formGroup.patchValue(this.item);
								this.generateAmountButtons();
							} else this.closeModal();
						}
						return;
				}
			});
		}

		let branch = this.env.branchList.find((b) => b.Id == this.item.IDBranch);
		if (branch) this.item.BranchName = branch.Name;
		if (this.EDCCVCB_IsActive) {
			this.retryAsync(() => this.getEDCCConnection(), 3, 1000)
				.then((rs) => {
					this.edccList = rs;
				})
				.catch((err) => {
					console.error('EDCC failed after 3 retries:', err);
					this.env.showMessage('Unable to connect to terminal device!', 'danger');
				});
		}
		this.formGroup.patchValue(this.item);
		this.generateAmountButtons();
	}
	getEDCCConnection() {
		return new Promise((resolve, reject) => {
			this.incomingPaymentProvider.commonService
				.connect('GET', 'BANK/IncomingPayment/GetEDCCConnection', {})
				.toPromise()
				.then((rs) => {
					console.log(rs);
					resolve(rs);
				})
				.catch((err) => {
					this.env.showMessage(err.error?.ExceptionMessage, 'danger');
					reject(null);
				});
		});
	}
	async retryAsync<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
		try {
			return await fn();
		} catch (err) {
			if (retries <= 0) throw err;
			await new Promise((res) => setTimeout(res, delay));
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
		let type = this.formGroup.get('Type').value;
		if (type == 'Card') {
			this.postSale();
		}
	}
	changeType(type, subType = null) {
		this.formGroup.get('Type')?.setValue(type);
		this.formGroup.get('Type').markAsDirty();
		this.formGroup.get('SubType').setValue(null);
		if (subType) this.formGroup.get('SubType').setValue(subType);
		this.formGroup.get('InputAmount').setValue(Math.abs(this.item.DebtAmount));
		this.next();
		if (type == 'VietQR') {
			const qr = this.billElement?.nativeElement?.querySelector('.qr-section');
			if (qr) {
				this.qrCodeHtml = qr.outerHTML;
			}
		}
	}
	changeEDCC(e) {
		this.formGroup.get('Type').setValue('Card');
		this.formGroup.get('SubType').setValue(e.Bank);
		this.formGroup.get('EDCC').setValue(e.REF_ID);
		this.postSale();
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
		this.commonService
			.connect('POST', 'BANK/IncomingPayment', obj)
			.toPromise()
			.then(async (res: any) => {
				this.payment = res;
				this.payment._Status = this.paymentStatusList.find((d) => d.Code == this.payment.Status);
				//this.next();
				if (this.payment.Status == 'Success') {
					this.env.showMessage('Payment success', 'success');
					this.env.publishEvent({
						code: 'signalR:POSOrderPaymentUpdate', // giống code trong switch case
						value: JSON.stringify({
							IDSaleOrder: this.item.IDSaleOrder,
							TableName: this.item.TableName,
							Amount: this.payment.Amount,
							IDBranch: this.item.IDBranch,
							IDTable: this.item.IDTable,
						}),
					});
					if (res.Amount < this.item.DebtAmount) {
						this.item.DebtAmount -= res.Amount;
						this.payment = null;
						this.formGroup.patchValue(this.item);
						this.generateAmountButtons();
						this.submitAttempt = false;
					} else this.closeModal();
				} else if (obj.Type == 'ZalopayApp') {
					if (this.payment.Status == 'Processing') window.open(this.payment.PaymentURL, '_blank');
					// this.closeModal();
				}
			})
			.catch((err) => {
				this.env.showMessage(err?.error?.Message ?? err, 'danger');
				this.submitAttempt = false;
			});
	}
	// --------------------------------------------------------------------
	// Đóng modal
	// --------------------------------------------------------------------
	closeModal() {
		this.modalController.dismiss();
	}

	isRetryButton = false;
	isRePostSaleButton = false;
	isReCheckResultButton = false;
	async postSale() {
		let edcc = this.edccList.find((d) => d.REF_ID == this.formGroup.get('EDCC').value);
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
			ReturnUrl: window.location.href,
			Lang: this.env.language.current,
			Timestamp: Date.now(),
			CreatedBy: this.env.user.Email,
			SERIAL_NUMBER: '',
			REF_ID: '',
		};
		payment.SERIAL_NUMBER = edcc?.SERIAL;
		payment.REF_ID = edcc?.REF_ID;
		payment.SubType = edcc?.Bank;
		this.submitAttempt = true;
		this.paymentService
			.postEDCCSale(payment)
			.then((rs) => {
				this.payment = rs;
				this.payment._Status = this.paymentStatusList.find((d) => d.Code == this.payment.Status);
				//this.next();
				this.submitAttempt = false;
			})
			.catch((err) => (this.submitAttempt = false));
	}

	private convertUrl(str) {
		return str.replace('=', '').replace('=', '').replace('+', '-').replace('_', '/');
	}

	ngOnDestroy() {
		if (this.subPromotion) this.subPromotion.unsubscribe();
	}

	async viewBill() {
		if (this.billElement) {
			this.billHtml = this.billElement.nativeElement.outerHTML; // lấy nội dung thật
		}
		setTimeout(() => {
			const iframeDoc = this.billIframe.nativeElement.contentDocument;
			iframeDoc.open();
			iframeDoc.write(`
            <html>
                <head>
                    <style>
                      ${this.cssStyle}
                    </style>
                </head>
                <body>${this.billHtml}</body>
            </html>
        `);
			iframeDoc.close();
		});
		this.isBillPreviewOpen = true;
	}
	closeBillPreview() {
		this.isBillPreviewOpen = false;
	}

	//#region Voucher

	deleteVoucher(p, index) {
		this.env.showPrompt('Do you want to remove this voucher?', 'REMOVING VOUCHER').then(() => {
			this.voucherService.deleteVoucher(this.item.SaleOrder, [p.VoucherCode]).then(() => {
				this.saleOrderProvider.getAnItem(this.item.SaleOrder.Id).then(async (rs: any) => {
					this.item.SaleOrder = await this.onUpdateItem(rs);
					this.item.DebtAmount = Math.round(this.item.SaleOrder?.Debt);
					this.formGroup.patchValue(this.item);
					this.generateAmountButtons();
				});
			});
		});
	}
	async processVouchers() {
		const modal = await this.modalController.create({
			component: POSVoucherModalPage,
			canDismiss: true,
			backdropDismiss: true,
			cssClass: 'modal90vh',
			componentProps: {
				SaleOrder: this.item.SaleOrder,
			},
		});
		await modal.present();
		const { data, role } = await modal.onWillDismiss();
		if (data && this.onUpdateItem) {
			this.item.SaleOrder = await this.onUpdateItem(data);
			this.item.DebtAmount = Math.round(this.item.SaleOrder?.Debt);
			this.formGroup.patchValue(this.item);
			this.generateAmountButtons();
		}
	}
	analyticVoucher() {
		this.promotionAppliedPrograms?.forEach((item) => {
			let i = item;
			if (i.IsByPercent == true) {
				if (!i.ReduceByPercent) {
					i.ReduceByPercent = (i.Value * this.item.SaleOrder.OriginalTotalBeforeDiscount) / 100;
					if (i.ReduceByPercent > i.MaxValue) {
						i.ReduceByPercent = i.MaxValue;
					}
				}
			}
		});
	}
	//#endregion
}
