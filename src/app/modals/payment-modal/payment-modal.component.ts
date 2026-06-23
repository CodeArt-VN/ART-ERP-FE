import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/core/common.service';
import { EnvService } from 'src/app/services/core/env.service';
import { BANK_IncomingPaymentProvider, CRM_ContactProvider, SALE_OrderDeductionProvider, SALE_OrderProvider } from 'src/app/services/static/services.service';
import { PaymentService } from './paymentService';
import { POSVoucherModalPage } from 'src/app/pages/POS/pos-voucher-modal/pos-voucher-modal.page';
import { PromotionService } from 'src/app/services/custom/promotion.service';
import { BillPreviewComponent } from '../bill-preview-modal/bill-preview-modal';
import { EVENT_TYPE } from 'src/app/services/static/event-type';
import { FormManagementService } from 'src/app/services/page/form-management.service';
import QRCode from 'qrcode';

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

	listVoucherType = ['PromotionIntegration', 'CashVoucher'];
	listVoucherUsed: any[] = [];
	gotItUseResult: any = null;
	isVoucherChecking = false;
	private voucherSaleOrderPayload: any = null;
	private voucherSaleOrderSource: any = null;

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
		Point: '',
		PolLevelName: '',
		PointConversionRate: '',
		MaxPointUsagePercent: 0,
		DefaultBusinessPartnerId: null,
		LoyaltyPointUsage: null,
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
		private saleOrderDeductionProvider: SALE_OrderDeductionProvider,
		private saleOrderProvider: SALE_OrderProvider,
		private contactProvider: CRM_ContactProvider,
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
			InputPoint: [0],
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

	async back() {
		if (this.formGroup.get('Type').value == 'Card' && this._defaultREFID) {
			return this.step = 1;
		}
		if (!(await this.releasePendingGotitVouchers())) return;
		this.step--;
		if (this.formGroup.get('VoucherCode').value) {
			this.formGroup.get('VoucherCode').setValue('');
		}
		this.formGroup.get('InputAmount').enable();
		this.formGroup.get('InputPoint').setValue(0);
	}
	ngAfterViewInit() {
		if (!this.billElement?.nativeElement) return;

		const observer = new MutationObserver((mutations) => {

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
							this.payment.Status = value.Status;
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
								if (value.Type == 'LoyaltyPoint') {
									this.applyLoyaltyPointPaymentToUsage(value.Amount);
									this.item.DebtAmount = value._Order.CalcTotalOriginal - value._Order.OriginalDiscountFromSalesman;
								} else {
									this.item.DebtAmount -= value.Amount;
								}
								this.invalidateVoucherSaleOrderPayload();
								this.formGroup.patchValue(this.item);
								this.generateAmountButtons();
								if (this.payment && value.Id == this.payment.Id) this.payment = null;
							} else if (this.item.IsRefundTransaction && value.Amount < this.item.RefundAmount) {
								this.item.RefundAmount -= value.Amount;
								this.invalidateVoucherSaleOrderPayload();
								this.formGroup.patchValue(this.item);
								this.generateAmountButtons();
								if (this.payment && value.Id == this.payment.Id) this.payment = null;
							} else this.closeModal();
							if (this.step > 1) this.back();
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


	private async loadPoint(contactId): Promise<boolean> {
		this.item.Point = 0;
		this.item.PolLevelName = '';
		this.item.PointConversionRate = 0;

		if (!this.canUseLoyaltyPointPayment()) return false;

		try {
			const contact: any = await this.contactProvider.getAnItem(Number(contactId));
			if (!contact) {
				this.env.showMessage('Contact not found!', 'danger');
				return false;
			}

			const memberships = contact._MembershipLoyalty || [];
			const loyalty = memberships.find((m) => m._PolLevel?.IDBranch == this.item.IDBranch) || memberships[0];
			if (!loyalty) {
				this.env.showMessage('Customer loyalty membership not found', 'warning');
				return false;
			}

			this.item.Point = Number(loyalty.Point) || 0;
			this.item.PolLevelName = loyalty._PolLevel?.Name || '';
			this.item.PointConversionRate = Number(loyalty.PointConversionRate) || 0;

			if (this.item.Point <= 0) {
				this.env.showMessage('Customer loyalty point is not enough', 'warning');
				return false;
			}
			if (this.item.PointConversionRate <= 0) {
				this.env.showMessage('Active loyalty point conversion policy not found', 'warning');
				return false;
			}

			return true;
		} catch (err) {
			this.env.showMessage('Failed to get contact point!', 'danger');
			return false;
		}
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

	private getPayableAmount() {
		return Math.abs(Number(this.item.IsRefundTransaction ? this.item.RefundAmount : this.item.DebtAmount) || 0);
	}

	private getInputAmount() {
		return Number(this.formGroup.get('InputAmount').value) || 0;
	}

	private getInputPoint() {
		return Math.floor(Number(this.formGroup.get('InputPoint').value) || 0);
	}

	private getLoyaltyPointUsage() {
		return this.item?.LoyaltyPointUsage || null;
	}

	private getMaxLoyaltyPointPaymentAmount() {
		const payableAmount = this.getPayableAmount();
		const usage = this.getLoyaltyPointUsage();

		if (usage && usage.remainingCapAmount !== undefined && usage.remainingCapAmount !== null) {
			return Math.min(payableAmount, Math.max(0, Math.floor(Number(usage.remainingCapAmount) || 0)));
		}

		const maxPointUsagePercent = Number(this.item.MaxPointUsagePercent) || 0;
		return Math.floor((payableAmount * maxPointUsagePercent) / 100);
	}

	private applyLoyaltyPointPaymentToUsage(amount: number) {
		const usage = this.getLoyaltyPointUsage();
		if (!usage) return;

		const paidAmount = Math.max(0, Math.floor(Number(amount) || 0));
		usage.usedAmount = Math.max(0, (Number(usage.usedAmount) || 0) + paidAmount);
		usage.remainingCapAmount = Math.max(0, (Number(usage.capAmount) || 0) - usage.usedAmount);
		usage.exceededAmount = Math.max(0, usage.usedAmount - (Number(usage.capAmount) || 0));
		usage.isExceeded = usage.exceededAmount > 0;
	}

	loyaltyPointChange() {
		const inputPoint = this.getInputPoint();
		const pointConversionRate = Number(this.item.PointConversionRate) || 0;
		const amount = Math.floor(inputPoint * pointConversionRate);
		this.formGroup.get('InputPoint').setValue(inputPoint, { emitEvent: false });
		this.formGroup.get('InputAmount').setValue(amount, { emitEvent: false });
		this.formGroup.get('InputAmount').markAsDirty();
	}

	private canOverpay(type: string) {
		return !this.item.IsRefundTransaction && type == 'Cash';
	}

	private isGotitPayment(type: string) {
		return type == 'PromotionIntegration' && this.formGroup.get('SubType').value == 'Gotit';
	}

	canUseLoyaltyPointPayment() {
		const defaultBusinessPartnerId = Number(this.item.DefaultBusinessPartnerId) || 0;
		const isDefaultCustomer = defaultBusinessPartnerId && Number(this.item.IDCustomer) === defaultBusinessPartnerId;
		return !isDefaultCustomer && this.getMaxLoyaltyPointPaymentAmount() > 0;
	}

	private validatePaymentAmount(type: string) {
		const amount = this.getInputAmount();
		const payableAmount = this.getPayableAmount();

		if (!amount || amount <= 0) {
			this.env.showMessage('Please input valid amount', 'warning');
			return false;
		}

		if (amount > payableAmount && !this.canOverpay(type) && !this.isGotitPayment(type)) {
			this.env.showMessage('Payment amount cannot be greater than payment required', 'warning');
			return false;
		}

		return true;
	}

	private async validatePointLoyaltyPayment() {
		let inputPoint = this.getInputPoint();
		const payableAmount = this.getPayableAmount();
		const customerPoint = Number(this.item.Point) || 0;
		const pointConversionRate = Number(this.item.PointConversionRate) || 0;
		const maxAmount = this.getMaxLoyaltyPointPaymentAmount();
		const maxPointByAmount = pointConversionRate > 0 ? Math.floor(maxAmount / pointConversionRate) : 0;
		const customerId = Number(this.item.IDCustomer) || 0;
		const defaultBusinessPartnerId = Number(this.item.DefaultBusinessPartnerId) || 0;
		const confirmLimit = (limitPoint: number) => {
			const message = `Payment point cannot exceed: {{value}}`;

			return this.env
				.showPrompt({ code: message, value: limitPoint })
				.then(() => {
					this.formGroup.get('InputPoint').setValue(limitPoint);
					this.loyaltyPointChange();
					inputPoint = limitPoint;
					return true;
				})
				.catch(() => false);
		};

		if (defaultBusinessPartnerId && customerId == defaultBusinessPartnerId) {
			this.env.showMessage('Default customer cannot use loyalty point payment', 'warning');
			return false;
		}

		if (customerPoint <= 0 || pointConversionRate <= 0) {
			this.env.showMessage('Customer loyalty point is not enough', 'warning');
			return false;
		}

		if (maxAmount <= 0) {
			this.env.showMessage('Loyalty point payment has reached allowed limit', 'warning');
			return false;
		}

		if (!inputPoint || inputPoint <= 0) {
			this.env.showMessage('Please input valid loyalty point', 'warning');
			return false;
		}

		if (inputPoint > customerPoint) {
			if (!(await confirmLimit(customerPoint))) return false;
		}

		if (inputPoint > maxPointByAmount) {
			if (!(await confirmLimit(maxPointByAmount))) return false;
		}

		const amount = this.getInputAmount();
		if (!amount || amount <= 0) {
			this.env.showMessage('Please input valid amount', 'warning');
			return false;
		}

		this.item.Point = customerPoint - inputPoint;
		return true;
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
		const currentType = this.formGroup.get('Type').value;
		if (currentType == 'PromotionIntegration' && type != 'PromotionIntegration') {
			if (!(await this.releasePendingGotitVouchers())) return;
		}
		if (type == 'LoyaltyPoint') {
			if (!(await this.loadPoint(this.item.IDCustomer))) return;
		}

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
		this.formGroup.get('InputAmount').enable();
		this.formGroup.get('InputPoint').setValue(0);
		if (type == 'Card' && this._defaultREFID && this.edccList.length > 0) {
			let e = this.edccList.find((d) => d.REF_ID == this._defaultREFID);
			return this.changeEDCC(e);
		}
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
		} else if (type == 'PromotionIntegration') {
			this.gotItUseResult = null;
			this.listVoucherUsed = [];
			this.formGroup.get('InputAmount').markAsPristine();
			this.formGroup.get('InputAmount').disable();
			let total = this.paymentList.reduce((sum, p) => sum + (p.Type == 'PromotionIntegration' && p.SubType == 'Gotit' ? p.Amount : 0), 0);
			this.formGroup.get('InputAmount').setValue(total);
		} else if (type == 'LoyaltyPoint') {
			this.formGroup.get('InputAmount').markAsPristine();
			this.formGroup.get('InputAmount').setValue(0);
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
		if (this.submitAttempt) return;
		if (this.isGrabPaymentWaiting()) return;

		if (!this.formGroup.get('Type').value) {
			this.env.showMessage('Please choose payment method', 'warning');
			return;
		}

		if (this.formGroup.get('Type').value === 'LoyaltyPoint') {
			const isValidLoyaltyPoint = await this.validatePointLoyaltyPayment();
			if (!isValidLoyaltyPoint) return;
		} else if (!this.validatePaymentAmount(this.formGroup.get('Type').value)) {
			return;
		}

		this.submitAttempt = true;

		let obj = this.formGroup.getRawValue();
		if (obj?.IDApproverContact !== undefined) {
			delete obj.IDApproverContact;
		}
		obj.Status = 'Processing';
		if (
			obj.Type == 'Cash' ||
			obj.Type == 'Debt' ||
			obj.Type == 'PromotionIntegration' ||
			obj.Type == 'Urbox' ||
			obj.Type == 'VNPAY' ||
			obj.Type == 'BOD' ||
			obj.Type == 'Transfer' ||
			obj.Type == 'CashVoucher' ||
			obj.Type == 'LoyaltyPoint' ||
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
		if (obj.Type == 'LoyaltyPoint') {
			obj.Point = obj.InputPoint;
		}
		if (obj.Type == 'PaymentProposal') {
			const requestId = await this.createPaymentProposalRequest(obj.Amount);
			if (!requestId) {
				this.submitAttempt = false;
				return;
			}
		}
		if (obj.Type == 'PromotionIntegration' && obj.SubType == 'Gotit') {
			const gotitRes = await this.useGotit();
			if (!gotitRes?.success) {
				this.submitAttempt = false;
				return;
			}
			const usedVouchers = new Map<string, any>(
				(gotitRes.data || []).map((voucher): [string, any] => [String(voucher.code || '').trim(), voucher])
			);

			obj['PaymentDetails'] = (this.listVoucherUsed || [])
				.filter((voucher) => usedVouchers.has(voucher.code))
				.map((voucher) => {
					const usedVoucher = usedVouchers.get(voucher.code);
					return {
						Code: usedVoucher.code,
						Amount: usedVoucher.value,
						IDProgram: usedVoucher.idProgram,
					};
				});

			const hasInvalidPaymentDetail =
				obj.PaymentDetails.length !== this.listVoucherUsed.length ||
				obj.PaymentDetails.some((detail) => !detail.Code || !detail.IDProgram || Number(detail.Amount) <= 0);
			if (hasInvalidPaymentDetail) {
				this.env.showMessage('GotIt voucher payment data is incomplete', 'danger');
				this.submitAttempt = false;
				return;
			}
		}
		let str = window.btoa(JSON.stringify(payment));
		let code = this.convertUrl(str);
		obj.Code = code;
		if (this.payment && this.payment.Type == this.formGroup.get('Type').value) obj.Id = this.payment.Id;
		if (this.canOverpay(obj.Type) && obj.Amount > this.getPayableAmount()) obj.Amount = this.getPayableAmount();

		if (obj.Type == 'LoyaltyPoint') {
			let deduction = {
				IDBranch: this.item.IDBranch,
				IDCustomer: this.item.IDCustomer,
				IDOrder: this.item.IDSaleOrder,
				Type: 'LoyaltyPoint',
				OriginalAmount: obj.Point,
				Amount: obj.Point,
			}
			this.saleOrderDeductionProvider.save(deduction).then(async (res: any) => {
				this.submitAttempt = false;
			});
		}
		else {
			this.incomingPaymentProvider
				.save(obj)
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
						if (obj.Type == 'PromotionIntegration' && obj.SubType == 'Gotit') {
							this.listVoucherUsed = [];
							this.gotItUseResult = null;
							this.formGroup.get('VoucherCode').setValue('');
						}
						// this.env.publishEvent({
						// 	code: 'signalR:POSOrderPaymentUpdate', // giống code trong switch case
						// 	value: JSON.stringify({
						// 		IDSaleOrder: this.item.IDSaleOrder,
						// 		TableName: this.item.TableName,
						// 		Amount: this.payment.Amount,
						// 		IDBranch: this.item.IDBranch,
						// 		IDTable: this.item.IDTable,
						// 		Status: this.payment.Status,
						// 		Id: this.payment.Id,
						// 	}),
						// });
						this.submitAttempt = false;
					} else if (obj.Type == 'ZalopayApp') {
						if (this.payment.Status == 'Processing') window.open(this.payment.PaymentURL, '_blank');
						this.next();
						this.submitAttempt = false;
						// this.closeModal();
					} else {
						this.submitAttempt = false;
					}
				})
				.catch((err) => {
					this.env.showMessage(err?.error?.Message ?? err, 'danger');
					this.submitAttempt = false;
				});
		}
	}

	//#endregion
	isGrabPaymentWaiting() {
		return this.formGroup?.get('Type')?.value == 'GrabPay' && this.payment?.Id && this.payment?.Status == 'Processing';
	}
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
	async closeModal() {
		if (!(await this.releasePendingGotitVouchers())) return;
		this.modalController.dismiss();
	}

	isRetryButton = false;
	isRePostSaleButton = false;
	isReCheckResultButton = false;
	async postSale() {
		if (!this.validatePaymentAmount('Card')) return;
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
				if (this.step == 2) this.next();
				else this.step = 3;
			})
			.catch((err) => (this.submitAttempt = false));
	}

	private convertUrl(str) {
		return str.replace('=', '').replace('=', '').replace('+', '-').replace('_', '/');
	}

	ngOnDestroy() {
		if (this.hasPendingGotitReservations()) {
			void this.releasePendingGotitVouchers(false);
		}
		if (this.subPromotion) this.subPromotion.unsubscribe();
		if (this.subscribePOSOrderDetail) this.subscribePOSOrderDetail?.unsubscribe();
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
					this.invalidateVoucherSaleOrderPayload();
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
			this.invalidateVoucherSaleOrderPayload();
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
		let code = this.formGroup.get('VoucherCode').value?.trim();
		let type = this.formGroup.get('Type').value;
		let subtype = this.formGroup.get('SubType').value;
		if (this.isVoucherChecking || !code) {
			return;
		}

		switch (type) {
			case 'CashVoucher':
				this.checkCashVoucher(code);
				break;
			case 'PromotionIntegration':
				if (subtype == 'Gotit') this.checkGotit(code);

				break;
		}
	}

	//region CashVoucher
	async checkCashVoucher(code: string) {
		const normalizedCode = code?.trim();
		if (!normalizedCode) return;

		this.setVoucherCheckingState(true);
		try {
			let postDTO = {
				VoucherCodeList: [normalizedCode],
				SaleOrder: this.getVoucherSaleOrderPayload(),
			};
			const voucher: any = await this.promotionService.commonService.connect('POST', 'PR/Program/CheckVoucher', postDTO).toPromise();
			if (voucher.length > 0) {
				if (voucher[0].CanUse) {
					this.program = voucher[0].Program;
					let value = Number(this.program.Value) || 0;
					if (value > this.getPayableAmount()) value = this.getPayableAmount();
					this.formGroup.get('InputAmount').setValue(value);
					this.formGroup.get('InputAmount').markAsDirty();
				} else {
					this.env.showMessage(voucher[0].ErrorMesage, 'danger');
				}
			} else {
				this.env.showMessage('Voucher code is not valid', 'danger');
			}
		} catch (err) {
			this.env.showErrorMessage(err);
		} finally {
			this.setVoucherCheckingState(false);
		}
	}
	//endregion

	//region Gotit
	async checkGotit(code: string) {
		const normalizedCode = code?.trim();
		if (!normalizedCode) return;
		if (this.gotItUseResult?.success) {
			this.env.showMessage('GotIt vouchers have already been used for this payment', 'warning');
			this.formGroup.get('VoucherCode').setValue('');
			return;
		}
		if (this.listVoucherUsed.some((v) => v.code == normalizedCode)) {
			this.env.showMessage('Voucher code has already been reserved', 'danger');
			this.formGroup.get('VoucherCode').setValue('');
			return;
		}

		this.setVoucherCheckingState(true);
		try {
			let postDTO = {
				Type: 'PromotionIntegration',
				SubType: 'Gotit',
				VoucherCodeList: [normalizedCode],
				ExistingVouchers: this.listVoucherUsed.map((voucher) => ({
					Code: voucher.code,
					Amount: voucher.amount,
				})),
				SaleOrder: this.getVoucherSaleOrderPayload(),
			};
			const voucher: any = await this.commonService.connect('POST', 'PR/Program/CheckVoucher', postDTO).toPromise();
			if (voucher && voucher.length > 0) {
				if (voucher[0].CanUse) {
					const voucherCode = voucher[0].VoucherCode;
					let amount = voucher[0].Program.Value;
					let toltal = this.formGroup.get('InputAmount').value || 0;

					this.formGroup.get('InputAmount').setValue(toltal + amount);
					this.formGroup.get('InputAmount').markAsDirty();
					this.formGroup.get('Type').setValue('PromotionIntegration');
					this.formGroup.get('Type').markAsDirty();
					this.formGroup.get('SubType').setValue('Gotit');
					this.formGroup.get('SubType').markAsDirty();
					this.gotItUseResult = null;
					this.listVoucherUsed.push({ code: voucherCode, amount: amount });
					this.env.showMessage(voucher[0].ErrorMesage, 'success');
				} else {
					this.env.showMessage(voucher[0].ErrorMesage, 'danger');
				}
			} else {
				this.env.showMessage('Voucher code is not valid', 'danger');
			}
		} catch (err) {
			const detail = err?.error?.detail || err?.error?.message || err?.message;
			if (detail) {
				this.env.showMessage(detail, 'danger');
			}
			this.env.showErrorMessage(err);
		} finally {
			this.setVoucherCheckingState(false, true);
		}
	}

	async useGotit() {
		if (this.gotItUseResult?.success) {
			return this.gotItUseResult;
		}
		let code = this.listVoucherUsed.map((v) => v.code);
		let postDTO = {
			VoucherCodeList: code,
			SaleOrder: this.getVoucherSaleOrderPayload(),
			Type: 'PromotionIntegration',
			SubType: 'Gotit',
			ProviderCode: 'Gotit',
		};
		try {
			const res: any = await this.commonService.connect('POST', 'PR/Program/UseVoucher', postDTO).toPromise();
			if (res.success) {
				this.gotItUseResult = res;
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

	async removeGotitVoucher(idx) {
		if (this.listVoucherUsed.length == 0) return;
		if (this.gotItUseResult?.success) {
			this.env.showMessage('Used vouchers cannot be removed', 'warning');
			return;
		}
		const voucher = this.listVoucherUsed[idx];
		if (!voucher) return;
		if (!(await this.releaseGotitVoucherCodes([voucher.code]))) return;
		this.listVoucherUsed.splice(idx, 1);
		this.refreshGotitAmount();
	}

	private async releaseGotitVoucherCodes(voucherCodes: string[]) {
		if (!voucherCodes?.length) return true;

		try {
			await this.promotionService.releaseIntegrationVouchers(this.getVoucherSaleOrderPayload(), voucherCodes, {
				type: 'PromotionIntegration',
				subType: 'Gotit',
				providerCode: 'Gotit',
			});
			return true;
		} catch (err) {
			this.env.showErrorMessage(err);
			return false;
		}
	}
	//endregion

	private hasPendingGotitReservations() {
		return (
			this.formGroup.get('Type').value == 'PromotionIntegration' &&
			this.formGroup.get('SubType').value == 'Gotit' &&
			this.listVoucherUsed.length > 0 &&
			!this.gotItUseResult?.success
		);
	}

	private refreshGotitAmount() {
		const existingTotal = this.paymentList.reduce((sum, p) => sum + (p.Type == 'PromotionIntegration' && p.SubType == 'Gotit' ? p.Amount : 0), 0);
		let total = existingTotal + this.listVoucherUsed.reduce((sum, item) => sum + item.amount, 0);
		if (total > this.item.DebtAmount) total = this.item.DebtAmount;
		this.formGroup.get('InputAmount').setValue(total);
		this.formGroup.get('InputAmount').markAsDirty();
	}

	private async releasePendingGotitVouchers(showError = true) {
		if (!this.hasPendingGotitReservations()) {
			this.listVoucherUsed = [];
			this.gotItUseResult = null;
			return true;
		}
		const voucherCodes = this.listVoucherUsed.map((v) => v.code);
		try {
			await this.promotionService.releaseIntegrationVouchers(this.getVoucherSaleOrderPayload(), voucherCodes, {
				type: 'PromotionIntegration',
				subType: 'Gotit',
				providerCode: 'Gotit',
			});
			this.listVoucherUsed = [];
			this.gotItUseResult = null;
			this.refreshGotitAmount();
			return true;
		} catch (err) {
			if (showError) this.env.showErrorMessage(err);
			return false;
		}
	}

	private invalidateVoucherSaleOrderPayload() {
		this.voucherSaleOrderPayload = null;
		this.voucherSaleOrderSource = null;
	}

	private setVoucherCheckingState(isChecking: boolean, clearInput = false) {
		this.isVoucherChecking = isChecking;

		const voucherControl = this.formGroup.get('VoucherCode');
		if (!voucherControl) return;

		if (isChecking) {
			voucherControl.disable({ emitEvent: false });
			return;
		}

		voucherControl.enable({ emitEvent: false });
		if (clearInput) {
			voucherControl.setValue('', { emitEvent: false });
		}

		if (!this.listVoucherType.includes(this.formGroup.get('Type').value)) return;
		setTimeout(() => {
			const voucherInput = document.getElementById('VoucherCode') as HTMLInputElement | null;
			voucherInput?.focus();
			voucherInput?.select();
		}, 0);
	}

	// Strip the order graph down to the fields voucher APIs actually need.
	private getVoucherSaleOrderPayload() {
		const saleOrder = this.item?.SaleOrder || {};
		if (this.voucherSaleOrderSource === saleOrder && this.voucherSaleOrderPayload) {
			return this.voucherSaleOrderPayload;
		}

		const mapSubItems = (subItems: any[] = []) =>
			subItems
				.filter((sub) => sub && !sub.IsDeleted && Number(sub.Quantity || 0) > 0)
				.map((sub) => ({
					Id: sub.Id,
					IDItem: sub.IDItem,
					Quantity: Number(sub.Quantity || 0),
					UoMPrice: Number(sub.UoMPrice || 0),
					Tax: Number(sub.Tax ?? sub.OriginalTax ?? 0),
					OriginalTax: Number(sub.OriginalTax ?? sub.Tax ?? 0),
					IsDeleted: !!sub.IsDeleted,
				}));

		this.voucherSaleOrderSource = saleOrder;
		this.voucherSaleOrderPayload = {
			Id: saleOrder.Id,
			IDBranch: saleOrder.IDBranch ?? this.item?.IDBranch,
			IDCustomer: saleOrder.IDCustomer ?? this.item?.IDCustomer,
			IDContact: saleOrder.IDContact ?? saleOrder.IDCustomer ?? this.item?.IDCustomer,
			OrderDate: saleOrder.OrderDate,
			Debt: Number(this.item?.DebtAmount ?? saleOrder.Debt ?? 0),
			DebtAmount: Number(this.item?.DebtAmount ?? saleOrder.DebtAmount ?? 0),
			OriginalTotalBeforeDiscount: Number(saleOrder.OriginalTotalBeforeDiscount ?? saleOrder.TotalBeforeDiscount ?? 0),
			CalcTotalOriginal: Number(saleOrder.CalcTotalOriginal ?? saleOrder.TotalAfterTax ?? 0),
			TotalAfterTax: Number(saleOrder.TotalAfterTax ?? saleOrder.CalcTotalOriginal ?? 0),
			CalcTotalAdditions: Number(saleOrder.CalcTotalAdditions ?? 0),
			CalcTotalDeductions: Number(saleOrder.CalcTotalDeductions ?? 0),
			Deductions: (saleOrder.Deductions || [])
				.filter((deduction) => deduction && !deduction.IsDeleted)
				.map((deduction) => ({
					Id: deduction.Id,
					IDProgram: deduction.IDProgram,
					VoucherCode: deduction.VoucherCode,
					Type: deduction.Type,
					SubType: deduction.SubType,
					Amount: Number(deduction.Amount || 0),
					IsDeleted: !!deduction.IsDeleted,
				})),
			OrderLines: (saleOrder.OrderLines || [])
				.filter((line) => line && !line.IsDeleted && Number(line.Quantity || 0) > 0)
				.map((line) => ({
					Id: line.Id,
					IDItem: line.IDItem,
					Quantity: Number(line.Quantity || 0),
					UoMPrice: Number(line.UoMPrice || 0),
					Tax: Number(line.Tax ?? line.OriginalTax ?? 0),
					OriginalTax: Number(line.OriginalTax ?? line.Tax ?? 0),
					IsDeleted: !!line.IsDeleted,
					SubItems: mapSubItems(line.SubItems || []),
				})),
		};

		return this.voucherSaleOrderPayload;
	}

	//region GrabPay
	async generateGrabPayQr() {
		if (this.isGrabPayLoading) return;

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
				IDBranch: this.item?.IDBranch,
				IDCustomer: this.item?.IDCustomer,
				IDSaleOrder: this.item?.IDSaleOrder,
				Amount: Number(this.formGroup.get('InputAmount')?.value || this.item?.DebtAmount || 0),
				Type: 'GrabPay',
				SubType: 'Grab',
				saleOrder: saleOrder,
			};
			const response: any = await this.incomingPaymentProvider.save(payload);
			if (response?.success === false) {
				this.grabPayError = response?.message || 'Cannot generate GrabPay QR';
				this.env.showMessage(this.grabPayError, 'danger');
				return;
			}
			const qrHtml = await this.resolveGrabQrHtml(response);
			const incomingPayment = this.extractGrabIncomingPayment(response);
			if (incomingPayment?.Id) {
				this.payment = incomingPayment;
				this.payment._Status = this.paymentStatusList.find((d) => d.Code == this.payment.Status);
			}

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

	private extractGrabIncomingPayment(response: any): any {
		if (!response) return null;
		if (response?.Id) return response;
		const incomingPayment = response?.data?.incomingPayment || response?.data?.IncomingPayment;
		if (incomingPayment?.Id) return incomingPayment;
		const id = response?.IDIncomingPayment || response?.response?.IDIncomingPayment || response?.response?.meta?.IDIncomingPayment;
		if (id) {
			return {
				Id: id,
				Type: 'GrabPay',
				SubType: 'Grab',
				Status: 'Processing',
				Amount: Number(this.formGroup.get('InputAmount')?.value || this.item?.DebtAmount || 0),
			};
		}
		return null;
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
