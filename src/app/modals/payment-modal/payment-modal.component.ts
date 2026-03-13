import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/core/common.service';
import { EnvService } from 'src/app/services/core/env.service';
import { BANK_IncomingPaymentProvider, CRM_ContactProvider, SALE_OrderProvider } from 'src/app/services/static/services.service';
import { PaymentService } from './paymentService';
import { POSVoucherModalPage } from 'src/app/pages/POS/pos-voucher-modal/pos-voucher-modal.page';
import { PromotionService } from 'src/app/services/custom/promotion.service';
import { BillPreviewComponent } from '../bill-preview-modal/bill-preview-modal';
import { EVENT_TYPE } from 'src/app/services/static/event-type';
import { FormManagementService } from 'src/app/services/page/form-management.service';
import QRCode from 'qrcode';
import { SYS_ConfigService } from 'src/app/services/custom/system-config.service';
import { environment } from 'src/environments/environment';

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
	_defaultREFID = '';
	paymentStatusList: any = [];
	EDCCVCB_IsActive = false;
	ZPIsActive = false;
	IsActiveTypeCash = true;
	billHtml = '';
	qrCodeHtml = '';
	isGrabPayLoading = false;
	grabPayError = '';
	program: any;
	@Input() billElement: ElementRef;
	@Input() calcFunction: Function;
	@Input() onUpdateItem: Function;
	subPromotion: any;
	promotionAppliedPrograms = [];
	subscribePOSOrderDetail;
	paymentList: any[] = [];
	approverDataSource: any;
	requesterStaffId: number = null;
	requesterContact: any = null;
	private formManagementService = new FormManagementService();
	bankList: any = [
		{ Code: 'VCB', Name: 'Vietcombank', Image: '/assets/logos/banks/VCB.png' },
		{ Code: 'MB', Name: 'MB Bank', Image: '/assets/logos/banks/mb.png' },
	];

	listVoucherType = ['Gotit', 'CashVoucher'];
	listVoucherUsed: any[] = [];
	pin = '';

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
		private contactProvider: CRM_ContactProvider,
		private commonService: CommonService,
		private env: EnvService,
		private paymentService: PaymentService,
		public sysConfigProvider: SYS_ConfigService
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
			VoucherCode: [''],
			IDApproverContact: [''],
		});
	}
	next() {
		this.step++;
	}

	back() {
		this.step--;
		if (this.formGroup.get('VoucherCode').value) {
			this.formGroup.get('VoucherCode').setValue('');
		}
		this.formGroup.get('InputAmount').enable();
	}
	ngAfterViewInit() {
		if (!this.billElement?.nativeElement) return;

		const observer = new MutationObserver((mutations) => {
			// console.log('DOM changed', mutations);

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
			this.subPromotion = this.promotionService.voucherBySOObs$.subscribe((map) => {
				this.promotionAppliedPrograms = map[this.item?.IDSaleOrder] || [];
				this.analyticVoucher();
			});
		}

		this.analyticVoucher();
		if (!this.subscribePOSOrderDetail) {
			this.subscribePOSOrderDetail = this.env.getEvents().subscribe((data) => {
				if (!data.code?.startsWith('signalR:')) return;
				if (data.id == this.env.user.StaffID) return;
				//if (!this.payment) return;
				const value = JSON.parse(data.value);

				switch (data.code) {
					case 'signalR:POSOrderPaymentUpdate':
						if (value.IDSaleOrder != this.item.IDSaleOrder) return;
						if (this.payment && value.Id == this.payment.Id) {
							this.payment.Status == value.Status;
							this.payment._Status = this.paymentStatusList.find((d) => d.Code == this.payment.Status);
							if (value.Status == 'Fail') {
								this.payment = null;
								this.env.showAlert('', 'Please create new payment', 'Payment failed');
								this.env.showMessage('Payment fail', 'danger');
								//this.back();
							}
						}
						if (value.Status == 'Success') {
							this.env.showMessage('Payment success', 'success');
							if (!this.item.IsRefundTransaction && value.Amount < this.item.DebtAmount) {
								this.item.DebtAmount -= value.Amount;
								this.formGroup.patchValue(this.item);
								this.generateAmountButtons();
								if (this.payment && value.Id == this.payment.Id) this.payment = null;
							} else if (this.item.IsRefundTransaction && value.Amount < this.item.RefundAmount) {
								this.item.RefundAmount -= value.Amount;
								this.formGroup.patchValue(this.item);
								this.generateAmountButtons();
								if (this.payment && value.Id == this.payment.Id) this.payment = null;
							} else this.closeModal();
							this.back();
						}
						return;
				}
			});
		}

		let branch = this.env.branchList.find((b) => b.Id == this.item.IDBranch);
		if (branch) this.item.BranchName = branch.Name;
		if (this.EDCCVCB_IsActive) {
			this.retryAsync(() => this.paymentService.getEDCCConnection(), 3, 1000)
				.then((rs) => {
					this.edccList = rs;
				})
				.catch((err) => {
					console.error('EDCC failed after 3 retries:', err);
					this.env.showMessage('Unable to connect to terminal device!', 'danger');
				});
		}
		this.formGroup.patchValue(this.item);
		this.initApproverDataSource();
		if (this.item.IsRefundTransaction) {
			this.formGroup.controls.Type.setValue('Cash');
			this.formGroup.controls.Type.markAsDirty();
			this.step = 2;
		}
		this.generateAmountButtons();
	}

	private initApproverDataSource() {
		if (this.approverDataSource) return;
		this.approverDataSource = this.formManagementService.createSelectDataSource((term) => {
			return this.contactProvider.search({
				SkipMCP: term ? false : true,
				SortBy: ['Id_desc'],
				Take: 20,
				Skip: 0,
				Keyword: term,
				IsStaff: true,
			});
		});
		this.approverDataSource.initSearch();
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
		if (this.item.IsRefundTransaction) {
			this.formGroup.get('InputAmount').setValue(this.item.RefundAmount);
			this.formGroup.get('InputAmount').markAsDirty();
		}
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
	async changeType(type, subType = null) {
		if (type === 'PaymentProposal') {
			const ok = await this.ensureRequesterStaff();
			if (!ok) return;
		}
		this.formGroup.get('Type')?.setValue(type);
		this.formGroup.get('Type').markAsDirty();
		this.formGroup.get('SubType').setValue(null);
		if (type !== 'PaymentProposal') {
			this.formGroup.get('IDApproverContact')?.setValue(null);
		}
		if (subType) this.formGroup.get('SubType').setValue(subType);
		this.formGroup.get('InputAmount').setValue(Math.abs(this.item.DebtAmount));
		this.next();
		if (type == 'VietQR') {
			this.grabPayError = '';
			const qr = this.billElement?.nativeElement?.querySelector('.qr-section');
			if (qr) {
				this.qrCodeHtml = qr.outerHTML;
			}
		} else if (type == 'GrabPay') {
			this.generateGrabPayQr();
		} else if (type == 'CashVoucher') {
			this.formGroup.get('InputAmount').markAsPristine();
			this.formGroup.get('InputAmount').setValue(0);
			this.formGroup.get('InputAmount').disable();
		} else if (type == 'Gotit') {
			this.listVoucherUsed = [];
			this.sysConfigProvider.getConfig(this.env.selectedBranch, ['PinForGotit']).then((res: any) => {
				if (res) {
					this.pin = res['PinForGotit'] || '';
				}
			});
			this.formGroup.get('InputAmount').markAsPristine();
			this.formGroup.get('InputAmount').disable();
			let total = this.paymentList.reduce((sum, p) => sum + (p.Type == 'Gotit' ? p.Amount : 0), 0);
			this.formGroup.get('InputAmount').setValue(total);
		}
	}
	changeEDCC(e) {
		this.formGroup.get('Type').setValue('Card');
		this.formGroup.get('SubType').setValue(e.Bank);
		this.formGroup.get('EDCC').setValue(e.REF_ID);
		this.postSale();
	}
	//#region confirmPayment

	// --------------------------------------------------------------------
	// Gửi yêu cầu thanh toán
	// --------------------------------------------------------------------
	async confirmPayment() {
		if (this.item.IsRefundTransaction) {
			if (this.formGroup.get('InputAmount').value > this.item.RefundAmount) {
				this.env.showMessage('Refund amount cannot be greater than original amount', 'warning');
				return;
			}
		}

		if (!this.formGroup.get('InputAmount').value || this.formGroup.get('InputAmount').value <= 0) {
			this.env.showMessage('Please input valid amount', 'warning');
			return;
		}
		if (!this.formGroup.get('Type').value) {
			this.env.showMessage('Please choose payment method', 'warning');
			return;
		}
		let obj = this.formGroup.getRawValue();
		if (obj?.IDApproverContact !== undefined) {
			delete obj.IDApproverContact;
		}
		obj.Status = 'Processing';
		if (
			obj.Type == 'Cash' ||
			obj.Type == 'Debt' ||
			obj.Type == 'Gotit' ||
			obj.Type == 'Urbox' ||
			obj.Type == 'VNPAY' ||
			obj.Type == 'BOD' ||
			obj.Type == 'Transfer' ||
			obj.Type == 'CashVoucher' ||
			(obj.Type == 'Card' && this.payment?.Id)
		) {
			obj.Status = 'Success';
		}
		let payment = {
			IDBranch: this.item.IDBranch,
			IDStaff: this.env.user.StaffID,
			IDCustomer: this.item.IDCustomer,
			IDSaleOrder: this.item.IDSaleOrder,
			DebtAmount: this.item.DebtAmount,
			IsRefundTransaction: this.item.IsRefundTransaction,
			IDOriginalTransaction: this.item.IDOriginalTransaction,
			IsActiveInputAmount: true,
			IsActiveTypeCash: true,
			ReturnUrl: window.location.href,
			Lang: this.env.language.current,
			Timestamp: Date.now(),
			CreatedBy: this.env.user.Email,
		};
		if (obj.Type == 'CashVoucher' && this.program) {
			obj['Remark'] = this.program.Id + '-' + this.formGroup.get('VoucherCode').value;
		}
		obj.Amount = obj.InputAmount;
		if (obj.Type == 'PaymentProposal') {
			const requestId = await this.createPaymentProposalRequest(obj.Amount);
			if (!requestId) {
				return;
			}
		}
		if (obj.Type == 'Gotit') {
			const gotitRes = await this.useGotit();
			if (!gotitRes?.success) {
				return;
			}
			obj['Remark'] = gotitRes.data?.map((v) => v.code).join(',') || '';
		}
		let str = window.btoa(JSON.stringify(payment));
		let code = this.convertUrl(str);
		obj.Code = code;
		if (this.payment && this.payment.Type == this.formGroup.get('Type').value) obj.Id = this.payment.Id;
		if (!this.item.IsRefundTransaction && obj.Amount > this.item.DebtAmount && this.formGroup.get('Type').value == 'Cash') obj.Amount = this.item.DebtAmount;

		this.submitAttempt = true;

		this.commonService
			.connect('POST', 'BANK/IncomingPayment', obj)
			.toPromise()
			.then(async (res: any) => {
				this.payment = res;
				this.payment._Status = this.paymentStatusList.find((d) => d.Code == this.payment.Status);
				if (this.item.IsRefundTransaction) {
					const paymentUpdate = {
						IDSaleOrder: this.item.IDSaleOrder,
						IDBranch: this.item.IDBranch,
						IDTable: this.item.IDTable,
						Status: this.payment.Status,
						Amount: this.payment.Amount,
						Type: this.payment.Type || obj.Type,
						IsRefundTransaction: this.item.IsRefundTransaction,
						Id: this.payment.Id,
					};
					this.env.publishEvent({ code: EVENT_TYPE.POS.ORDER_PAYMENT_UPDATE, value: JSON.stringify(paymentUpdate) });
				}
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
							Status: this.payment.Status,
							Id: this.payment.Id,
						}),
					});
					this.submitAttempt = false;
				} else if (obj.Type == 'ZalopayApp') {
					if (this.payment.Status == 'Processing') window.open(this.payment.PaymentURL, '_blank');
					this.next();
					this.submitAttempt = false;
					// this.closeModal();
				}
			})
			.catch((err) => {
				this.env.showMessage(err?.error?.Message ?? err, 'danger');
				this.submitAttempt = false;
			});
	}

	//#endregion
	private async ensureRequesterStaff(): Promise<boolean> {
		if (this.requesterStaffId) return true;
		const contactId = this.item?.IDCustomer || this.item?.SaleOrder?.IDContact;
		if (!contactId) {
			this.env.showMessage('Please choose customer contact first', 'warning');
			return false;
		}
		try {
			this.requesterContact = this.item?.SaleOrder?._Customer || (await this.contactProvider.getAnItem(contactId));
			if (!this.requesterContact?.IsStaff || !this.requesterContact?.RefId) {
				this.env.showMessage('Customer contact must be staff to use payment proposal', 'warning');
				return false;
			}
			this.requesterStaffId = this.requesterContact.RefId;
			return true;
		} catch (err) {
			this.env.showErrorMessage(err);
			return false;
		}
	}

	private async createPaymentProposalRequest(amount: number): Promise<number | null> {
		const requesterOk = await this.ensureRequesterStaff();
		if (!requesterOk) return null;

		const approverContactId = this.formGroup.get('IDApproverContact')?.value;
		if (!approverContactId) {
			this.env.showMessage('Please select approver', 'warning');
			return null;
		}

		let approverContact: any = null;
		try {
			approverContact = await this.contactProvider.getAnItem(approverContactId);
		} catch (err) {
			this.env.showErrorMessage(err);
			return null;
		}

		if (!approverContact?.IsStaff || !approverContact?.RefId) {
			this.env.showMessage('Approver must be staff', 'warning');
			return null;
		}

		const request = {
			IDBranch: this.item.IDBranch,
			IDStaff: this.requesterStaffId,
			Type: 'PaymentProposal',
			Status: 'Pending',
			ApprovalMode: 'OnlyOneIsNeeded',
			Amount: amount,
			CreatedBy: this.env.user.Email,
			ModifiedBy: this.env.user.Email,
		};

		let requestId = null;
		try {
			const rs: any = await this.commonService.connect('POST', 'APPROVAL/Request', request).toPromise();
			requestId = rs?.Id ?? rs?.id ?? rs;
		} catch (err) {
			this.env.showMessage(err?.error?.Message ?? err, 'danger');
			return null;
		}

		if (!requestId) {
			this.env.showMessage('Cannot create approval request', 'danger');
			return null;
		}

		const approver = {
			IDRequest: requestId,
			IDApprover: approverContact.RefId,
			Type: 'Approver',
			Status: 'Pending',
			CreatedBy: this.env.user.Email,
			ModifiedBy: this.env.user.Email,
		};

		try {
			await this.commonService.connect('POST', 'APPROVAL/RequestApprover', approver).toPromise();
			return requestId;
		} catch (err) {
			this.env.showMessage(err?.error?.Message ?? err, 'danger');
			return null;
		}
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
			SubType: edcc.Bank,
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
				this.next();
			})
			.catch((err) => (this.submitAttempt = false));
	}

	private convertUrl(str) {
		return str.replace('=', '').replace('=', '').replace('+', '-').replace('_', '/');
	}

	ngOnDestroy() {
		if (this.subPromotion) this.subPromotion.unsubscribe();
	}
	private getQrCodeHtml(): string {
		if (!this.billElement?.nativeElement) return '';
		const qr = this.billElement.nativeElement.querySelector('.qr-section');
		return qr ? qr.outerHTML : '';
	}

	async viewBill() {
		if (!this.billElement) return;
		const billHtml = this.billElement.nativeElement.outerHTML;
		const qrCodeHtml = this.getQrCodeHtml();
		const modal = await this.modalController.create({
			component: BillPreviewComponent,
			componentProps: {
				billHtml: billHtml,
				cssStyle: this.cssStyle || '',
				title: 'Bill Preview',
				qrCodeHtml: qrCodeHtml || '',
			},
			cssClass: 'bill-preview-modal',
			showBackdrop: true,
			backdropDismiss: true,
		});
		await modal.present();
	}
	closeBillPreview() {
		this.isBillPreviewOpen = false;
	}
	isQrDisplayType() {
		const type = this.formGroup.get('Type')?.value;
		return type == 'VietQR' || type == 'GrabPay';
	}
	showConfirmButton() {
		let type = this.formGroup.get('Type').value;
		if (!['Card', 'ZalopayApp', 'VietQR'].includes(type) && this.step == 2) return true;
		else if (type == 'Card' && this.step == 3) return true;
	}

	// (formGroup.get('Type').value == 'Card' && (step == 3 ||(edccList.length==0 && step == 2)))
	// 	|| (formGroup.get('Type').value != 'Card' && formGroup.get('Type').value != 'ZalopayApp' && formGroup.get('Type').value != 'VietQR' && step == 2 ))

	//#region Voucher

	deleteVoucher(p, index) {
		if (p?.IsAutoApply) {
			return;
		}
		this.env.showPrompt('Do you want to remove this voucher?', 'REMOVING VOUCHER').then(() => {
			this.promotionService.deleteVoucher(this.item.SaleOrder, [p.VoucherCode]).then(() => {
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

	voucherCodeChange() {
		let code = this.formGroup.get('VoucherCode').value;
		let type = this.formGroup.get('Type').value;
		if (!code || code.trim() == '') {
			return;
		}

		switch (type) {
			case 'CashVoucher':
				this.checkCashVoucher(code);
				break;
			case 'Gotit':
				this.checkGotit(code);
				break;
		}
	}

	//region CashVoucher
	checkCashVoucher(code: string) {
		let postDTO = {
			VoucherCodeList: [code],
			SaleOrder: this.item.SaleOrder,
		};
		this.promotionService.commonService
			.connect('POST', 'PR/Program/CheckVoucher', postDTO)
			.toPromise()
			.then((voucher: any) => {
				if (voucher.length > 0) {
					if (voucher[0].CanUse) {
						this.program = voucher[0].Program;
						let value = this.program.Value;
						this.formGroup.get('InputAmount').setValue(value);
						this.formGroup.get('InputAmount').markAsDirty();
					} else {
						this.env.showMessage(voucher[0].ErrorMesage, 'danger');
					}
				} else {
					this.env.showMessage('Voucher code is not valid', 'danger');
				}
			})
			.catch((err) => this.env.showErrorMessage(err));
	}
	//endregion

	//region Gotit
	checkGotit(code: string) {
		let postDTO = {
			pin: this.pin,
			codes: [code],
			bill_number: this.item.SaleOrder.Id?.toString(),
			skip_reserved_when_mark_used: true,
		};
		this.commonService
			.connect('POST', environment.appDomain + 'api/GotIt/CheckMultiple', postDTO)
			.toPromise()
			.then((voucher: any) => {
				if (voucher) {
					if (voucher.success) {
						let toltal = this.formGroup.get('InputAmount').value || 0;
						this.formGroup.get('InputAmount').setValue(voucher.data[0].value + toltal);
						if (this.formGroup.get('InputAmount').value > this.item.DebtAmount) {
							this.formGroup.get('InputAmount').setValue(this.item.DebtAmount);
						}
						this.formGroup.get('InputAmount').markAsDirty();
						this.formGroup.get('Type').setValue('Gotit');
						this.formGroup.get('Type').markAsDirty();
						if (this.listVoucherUsed.some((v) => v.Code == voucher.data[0].code)) {
							this.env.showMessage('Voucher code has already been used', 'danger');
							return;
						}
						this.listVoucherUsed.push(voucher.data[0]);
						// this.program = { Name: 'Gotit Voucher', Value: voucher.value };
						this.env.showMessage(this.env.language.current == 'vi-VN' ? voucher.message_vi : voucher.message_en, 'success');
					} else {
						this.env.showMessage(this.env.language.current == 'vi-VN' ? voucher.message_vi : voucher.message_en, 'danger');
					}
				} else {
					this.env.showMessage('Voucher code is not valid', 'danger');
				}
			})
			.catch((err) => {
				const detail = err?.error?.detail || err?.error?.message || err?.message;
				if (detail) {
					this.env.showMessage(detail, 'danger');
				}
				this.env.showErrorMessage(err);
			})
			.finally(() => this.formGroup.get('VoucherCode').setValue(''));
	}

	async useGotit() {
		let code = this.listVoucherUsed.map((v) => v.code);
		let postDTO = { pin: this.pin, codes: code, bill_number: this.item.SaleOrder.Id?.toString(), skip_reserved_when_mark_used: true, bill_total: this.item.DebtAmount };
		try {
			const res: any = await this.commonService.connect('POST', environment.appDomain + 'api/GotIt/MarkUseMultiple', postDTO).toPromise();
			if (res.success) {
				this.env.showMessage('Vouchers used successfully', 'success');
			} else {
				this.env.showMessage('Failed to use vouchers', 'danger');
			}
			return res;
		} catch (err) {
			this.env.showErrorMessage(err);
			return null;
		}
	}

	removeGotitVoucher(idx) {
		if (this.listVoucherUsed.length == 0) return;
		this.listVoucherUsed.splice(idx, 1);
		this.formGroup.get('InputAmount').setValue(this.listVoucherUsed.reduce((sum, item) => sum + item.value, 0));
		this.formGroup.get('InputAmount').markAsDirty();
	}
	//endregion

	//region GrabPay
	async generateGrabPayQr() {
		const saleOrder = this.item?.SaleOrder;
		if (!saleOrder) {
			this.grabPayError = 'Sale order is required to generate GrabPay QR';
			this.env.showMessage(this.grabPayError, 'warning');
			return;
		}

		this.isGrabPayLoading = true;
		this.grabPayError = '';
		this.qrCodeHtml = '';

		try {
			const payload = {
				action: 'BILL_GENERATED',
				saleOrder: saleOrder,
			}; // this.buildGrabSyncPOSOrderPayload();
			const response: any = await this.commonService.connect('POST', 'BANK/IncomingPayment/GrabSyncPOSOrder', payload).toPromise();
			const qrHtml = await this.resolveGrabQrHtml(response);

			if (!qrHtml) {
				this.grabPayError = 'Grab API does not return QR code data';
				this.env.showMessage(this.grabPayError, 'warning');
				return;
			}

			this.qrCodeHtml = qrHtml;
		} catch (err) {
			const detail = err?.error?.message || err?.error?.Message || err?.error?.detail || err?.message || 'Cannot generate GrabPay QR';
			this.grabPayError = detail;
			this.env.showMessage(detail, 'danger');
		} finally {
			this.isGrabPayLoading = false;
		}
	}

	private buildGrabSyncPOSOrderPayload() {
		const saleOrder = this.item?.SaleOrder || {};
		const amount = Number(this.item?.DebtAmount);

		const mapSubItems = (subItems: any[]) =>
			(subItems || [])
				.filter((sub) => sub && !sub.IsDeleted && Number(sub.Quantity) > 0)
				.map((sub) => ({
					Id: sub.Id,
					Code: sub.Code,
					IDItem: sub.IDItem,
					RefItem: sub.RefItem || sub.ItemCode || sub.Code,
					ItemName: sub.ItemName || sub.Name,
					ItemCode: sub.ItemCode || sub.Code,
					Quantity: Number(sub.Quantity || 0),
					UoMPrice: Number(sub.UoMPrice || 0),
					Tax: Number(sub.Tax ?? sub.OriginalTax ?? 0),
					IsDeleted: !!sub.IsDeleted,
				}));

		const orderLines = (saleOrder.OrderLines || [])
			.filter((line) => line && !line.IsDeleted && Number(line.Quantity) > 0)
			.map((line) => ({
				Id: line.Id,
				Code: line.Code,
				IDItem: line.IDItem,
				RefItem: line.RefItem || line.ItemCode || line.Code,
				ItemName: line.ItemName || line.Name,
				ItemCode: line.ItemCode || line.Code,
				Quantity: Number(line.Quantity || 0),
				UoMPrice: Number(line.UoMPrice || 0),
				Tax: Number(line.Tax ?? line.OriginalTax ?? 0),
				IsDeleted: !!line.IsDeleted,
				SubItems: mapSubItems(line.SubItems),
			}));

		return {
			action: 'BILL_GENERATED',
			saleOrder: saleOrder,
		};

		// {
		// 		Id: saleOrder.Id,
		// 		Code: saleOrder.Code,
		// 		RefID: saleOrder.RefID,
		// 		OrderDate: saleOrder.OrderDate || new Date(),
		// 		Currency: saleOrder.Currency || 'VND',
		// 		CalcTotalOriginal: Number(saleOrder.CalcTotalOriginal || saleOrder.TotalAfterTax || amount),
		// 		TotalAfterTax: Number(saleOrder.TotalAfterTax || saleOrder.CalcTotalOriginal || amount),
		// 		Tax: Number(saleOrder.Tax || 0),
		// 		CalcTotalAdditions: Number(saleOrder.CalcTotalAdditions || 0),
		// 		CalcTotalDeductions: Number(saleOrder.CalcTotalDeductions || 0),
		// 		PaymentMethod: 'GRABPAY',
		// 		Received: amount,
		// 		IDTable: this.item?.IDTable ?? saleOrder.IDTable,
		// 		TableName: this.item?.TableName ?? saleOrder.TableName,
		// 		NumberOfGuests: saleOrder.NumberOfGuests || 1,
		// 		OrderLines: orderLines,
		// 	}
	}

	private async resolveGrabQrHtml(response: any): Promise<string> {
		const qrCandidate = this.findGrabQrCandidate(response);
		if (!qrCandidate) return '';
		return this.toQrHtml(qrCandidate);
	}

	private findGrabQrCandidate(payload: any): string {
		if (!payload) return '';
		if (typeof payload == 'string') return payload.trim();

		const keyPriority = ['qrcode', 'qr_code', 'qrimage', 'qr_image', 'paymentqr', 'qr', 'deeplink', 'deep_link', 'paymenturl', 'payment_url', 'url'];
		for (const key of keyPriority) {
			const value = this.findStringByKey(payload, key);
			if (value) return value;
		}

		return '';
	}

	private findStringByKey(value: any, keyFragment: string, depth: number = 0): string {
		if (value == null || depth > 8) return '';
		if (typeof value == 'string') return '';
		if (Array.isArray(value)) {
			for (const item of value) {
				const found = this.findStringByKey(item, keyFragment, depth + 1);
				if (found) return found;
			}
			return '';
		}

		if (typeof value != 'object') return '';

		for (const [key, nested] of Object.entries(value)) {
			if (typeof nested == 'string' && key.toLowerCase().includes(keyFragment)) {
				const text = nested.trim();
				if (text) return text;
			}
		}

		for (const nested of Object.values(value)) {
			const found = this.findStringByKey(nested, keyFragment, depth + 1);
			if (found) return found;
		}

		return '';
	}

	private async toQrHtml(rawValue: string): Promise<string> {
		const value = (rawValue || '').trim();
		if (!value) return '';

		const lower = value.toLowerCase();
		if (lower.startsWith('<img') || lower.startsWith('<svg')) return value;

		if (lower.startsWith('data:image/')) {
			return `<img src="${value}" style="max-width:260px;width:100%;" />`;
		}

		if (this.isBase64(value)) {
			return `<img src="data:image/png;base64,${value}" style="max-width:260px;width:100%;" />`;
		}

		if (this.isImageUrl(value)) {
			return `<img src="${value}" style="max-width:260px;width:100%;" />`;
		}

		const dataUrl = await QRCode.toDataURL(value, {
			errorCorrectionLevel: 'H',
			width: 260,
			margin: 1,
		});
		return `<img src="${dataUrl}" style="max-width:260px;width:100%;" />`;
	}

	private isBase64(value: string): boolean {
		return value.length > 80 && /^[A-Za-z0-9+/]+={0,2}$/.test(value);
	}

	private isImageUrl(value: string): boolean {
		return /^https?:\/\/.+\.(png|jpg|jpeg|gif|webp|svg)(\?.*)?$/i.test(value);
	}
	//endregion
}
