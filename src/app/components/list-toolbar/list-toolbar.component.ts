import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-list-toolbar',
	templateUrl: './list-toolbar.component.html',
	styleUrls: ['./list-toolbar.component.scss'],
})
export class ListToolbarComponent implements OnInit {
	@ViewChild('importfile') importfile: any;
	@Input() pageTitle;
	@Input() selectedTitle;
	@Input() pageConfig;
	@Input() selectedItems;
	@Input() query;
	@Input() ShowAdd = true;
	@Input() ShowSearch = true;
	@Input() ShowRefresh = true;
	@Input() ShowArchive = true;
	@Input() ShowExport = true;
	@Input() ShowImport = true;
	@Input() ShowHelp = true;
	@Input() ShowFeature = true;
	@Input() ShowPopover = false;
	@Input() NoBorder = false;
	@Input() canSelect = true;
	@Input() ShowChangeTable = true;

	@Output() add = new EventEmitter();
	@Output() refresh = new EventEmitter();
	@Output() export = new EventEmitter();
	@Output() import = new EventEmitter();
	@Output() help = new EventEmitter();
	@Output() unselect = new EventEmitter();
	@Output() archiveItems = new EventEmitter();
	@Output() deleteItems = new EventEmitter();
	@Output() mergeOrders = new EventEmitter();
	@Output() splitOrder = new EventEmitter();
	@Output() approveOrders = new EventEmitter();
	@Output() disapproveOrders = new EventEmitter();
	@Output() cancelOrders = new EventEmitter();
	@Output() submitOrders = new EventEmitter();
	
	@Output() presentPopover = new EventEmitter();
	@Output() submitOrdersForApproval = new EventEmitter();
	@Output() createReceipt = new EventEmitter();
	@Output() submitReceipt = new EventEmitter();
	@Output() changeBranch = new EventEmitter();

	@Output() createARInvoice = new EventEmitter();
	@Output() approveInvoices = new EventEmitter();
	@Output() disapproveInvoices = new EventEmitter();
	@Output() cancelInvoices = new EventEmitter();
	@Output() createMergeARInvoice = new EventEmitter();
	@Output() createSplitARInvoices = new EventEmitter();
	@Output() submitInvoicesForApproval = new EventEmitter();
	@Output() mergeARInvoice = new EventEmitter();
	@Output() splitARInvoice = new EventEmitter();

	@Output() createEInvoice = new EventEmitter();
	@Output() updateEInvoice = new EventEmitter();
	@Output() syncEInvoice = new EventEmitter();

	@Output() changeTable = new EventEmitter();

	@Output() submitBusinessPartner = new EventEmitter();
	@Output() approveBusinessPartner = new EventEmitter();
	@Output() disapproveBusinessPartner = new EventEmitter();
	constructor() { }

	ngOnInit() { 
		window.document.title = this.pageTitle;
	}

	emit(eventName) {
		this[eventName].emit();
	}

	onClickImport() {
		this.importfile.nativeElement.value = "";
		this.importfile.nativeElement.click();
	}

	importFileChange(event) {
		this.import.emit(event);
	}

	showSubmitOrdersForApproval = true;
	showApproveOrders = true;
	showDisapproveOrders = true;
	showCancelOrders = true;
	showSubmitOrders = true;
	showDelete = true;
	showSplit = true;
	showMerge = true;
	// createReceipt
	// mergeOrders
	// splitOrder

	showSubmitARsForApproval = true;
	showApproveARs = true;
	showDisapproveARs = true;
	showCancelARs = true;
	showSubmitARs = true;
	
	showCreateEInvoice = true;
	showUpdateEInvoice = true;
	// createARInvoice
	// createMergeARInvoice
	// createEInvoice
	// submitInvoicesForApproval
	// approveInvoices
	// disapproveInvoices
	// cancelInvoices

	showSubmitBusinessPartner = true;
	showApproveBusinessPartner = true;
	showDisapproveBusinessPartner = true;
	
	ngOnChanges(changes: SimpleChanges) {
		console.log('check');
		if (this.pageConfig.pageName == 'sale-order') {
			this.showSubmitBusinessPartner = false;
			this.showApproveBusinessPartner = false;
			this.showDisapproveBusinessPartner = false;
			
			this.showSubmitOrdersForApproval = true;
			this.showApproveOrders = true;
			this.showDisapproveOrders = true;
			this.showCancelOrders = true;
			this.showDelete = true;

			this.selectedItems.forEach(i => {
				// 101	new	Mới
				// 102	unapproved	Không duyệt
				// 103	submitted	Chờ duyệt
				// 104	approved	Đã duyệt
				// 105	scheduled	Đã giao việc
				// 106	picking	Đang lấy hàng - đóng gói
				// 107	in-carrier	Đã giao đơn vị vận chuyển
				// 108	in-delivery	Đang giao hàng
				// 109	delivered	Đã giao hàng
				// 110	pending	Chờ xử lý
				// 111	split	Đơn đã chia
				// 112	merged	Đơn đã gộp
				// 113	debt	Còn nợ
				// 114	done	Đã xong
				// 115	cancelled	Đã hủy

				// [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115];

				let notShowSubmitOrdersForApproval = [103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115];
				if (notShowSubmitOrdersForApproval.indexOf(i.Status.IDStatus) > -1) {
					this.showSubmitOrdersForApproval = false;
				}

				let notShowApproveOrders = [101, 102, 104, 105, 106, 107, 108, 109, 111, 112, 113, 114, 115];
				if (notShowApproveOrders.indexOf(i.Status.IDStatus) > -1) {
					this.showApproveOrders = false;
				}

				let notShowDisapproveOrders = [101, 102, 103, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115];
				if (notShowDisapproveOrders.indexOf(i.Status.IDStatus) > -1) {
					this.showDisapproveOrders = false;
				}

				let notShowCancelOrders = [104, 105, 106, 107, 108, 109, 111, 112, 113, 114, 115];
				if (notShowCancelOrders.indexOf(i.Status.IDStatus) > -1) {
					this.showCancelOrders = false;
				}

				let notShowDelete = [103, 104, 105, 106, 107, 108, 109, 111, 112, 113, 114];
				if (notShowDelete.indexOf(i.Status.IDStatus) > -1) {
					this.showDelete = false;
				}

				// let notShowSplit = [104, 105, 106, 107, 108, 109, 111, 112, 113, 114, 115];
				// if (notShowSplit.indexOf(i.Status) > -1) {
				// 	this.showSplit = false;
				// }

				// let notShowMerge = [104, 105, 106, 107, 108, 109, 111, 112, 113, 114, 115];
				// if (notShowMerge.indexOf(i.Status) > -1) {
				// 	this.showMerge = false;
				// }
			});
		}

		if (this.pageConfig.pageName == 'purchase-order') {
			this.showSubmitBusinessPartner = false;
			this.showApproveBusinessPartner = false;
			this.showDisapproveBusinessPartner = false;

			this.showSubmitOrdersForApproval = true;
			this.showApproveOrders = true;
			this.showDisapproveOrders = true;
			this.showCancelOrders = true;
			this.showSubmitOrders = true;
			this.showDelete = true;

			this.selectedItems.forEach(i => {
				// PODraft	Nháp
				// PORequestUnapproved	Không duyệt
				// PORequestSubmitted	Chờ duyệt
				// PORequestApproved	Đã duyệt
				// POSubmitted	Đã đặt mua
				
				// PORequestQuotation	Chờ báo giá
				// POConfirmed	NCC đã xác nhận
				// POIsShipping	Đang vận chuyển
				// POPartiallyReceived	Đã nhận một phần 
				// POReceived	Đã nhận hàng
				// POCancelled	Đã Hủy

				//['PODraft', 'PORequestUnapproved', 'POSubmitted', 'PORequestSubmitted', 'PORequestApproved', 'PORequestQuotation', 'POConfirmed', 'POIsShipping', 'POPartiallyReceived', 'POReceived', 'POCancelled'];

				let notShowSubmitOrdersForApproval = ['POSubmitted', 'PORequestSubmitted', 'PORequestApproved', 'PORequestQuotation', 'POConfirmed', 'POIsShipping', 'POPartiallyReceived', 'POReceived', 'POCancelled'];
				if (notShowSubmitOrdersForApproval.indexOf(i.Status) > -1) {
					this.showSubmitOrdersForApproval = false;
				}

				let notShowApproveOrders = ['PODraft', 'PORequestUnapproved', 'POSubmitted', 'PORequestApproved', 'PORequestQuotation', 'POConfirmed', 'POIsShipping', 'POPartiallyReceived', 'POReceived', 'POCancelled'];
				if (notShowApproveOrders.indexOf(i.Status) > -1) {
					this.showApproveOrders = false;
				}

				let notShowDisapproveOrders = ['PODraft', 'PORequestUnapproved', 'POSubmitted', 'PORequestQuotation', 'POConfirmed', 'POIsShipping', 'POPartiallyReceived', 'POReceived', 'POCancelled'];
				if (notShowDisapproveOrders.indexOf(i.Status) > -1) {
					this.showDisapproveOrders = false;
				}

				let notShowCancelOrders = ['POSubmitted', 'PORequestApproved', 'PORequestQuotation', 'POConfirmed', 'POIsShipping', 'POPartiallyReceived', 'POReceived', 'POCancelled'];
				if (notShowCancelOrders.indexOf(i.Status) > -1) {
					this.showCancelOrders = false;
				}

				let notShowSubmitOrders = ['PODraft', 'PORequestUnapproved', 'POSubmitted', 'PORequestSubmitted', 'PORequestQuotation', 'POConfirmed', 'POIsShipping', 'POPartiallyReceived', 'POReceived', 'POCancelled'];
				if (notShowSubmitOrders.indexOf(i.Status) > -1) {
					this.showSubmitOrders = false;
				}

				let notShowDelete = ['POSubmitted', 'PORequestApproved', 'PORequestQuotation', 'POConfirmed', 'POIsShipping', 'POPartiallyReceived', 'POReceived'];
				if (notShowDelete.indexOf(i.Status) > -1) {
					this.showDelete = false;
				}
				
			});
		}

		if (this.pageConfig.pageName == 'arinvoice') {
			this.showSubmitBusinessPartner = false;
			this.showApproveBusinessPartner = false;
			this.showDisapproveBusinessPartner = false;
			
			this.showSubmitARsForApproval = true;
			this.showApproveARs = true;
			this.showDisapproveARs = true;
			this.showCancelARs = true;
			this.showSubmitARs = true;
			this.showCreateEInvoice = true;
			this.showUpdateEInvoice = true;
			this.showMerge = true;
			this.showSplit = true;
			this.showDelete = true;

			this.selectedItems.forEach(i => {
				// ARInvoiceNew	Mới
				// ARInvoiceDraft	Nháp
				// ARInvoiceRejected	Không duyệt
				// ARInvoicePending	Chờ duyệt
				// ARInvoiceApproved	Đã duyệt
				// ARInvoiceCanceled	Đã Hủy

				// EInvoiceNew	Đã tạo HĐĐT
				// EInvoiceRelease	Đã phát hành HĐĐT
				// EInvoiceCancel	Đã hủy HĐĐT
				//, 'ARInvoiceNew', 'ARInvoiceDraft', 'ARInvoiceCanceled', '', 'ARInvoiceRejected', 'ARInvoicePending', 'ARInvoiceSplited', 'ARInvoiceMerged'
				
				let notShowSubmitARsForApproval = ['ARInvoicePending', 'ARInvoiceApproved', 'ARInvoiceCanceled', 'EInvoiceNew', 'EInvoiceRelease', 'EInvoiceCancel', 'EInvoiceEmpty', 'ARInvoiceSplited', 'ARInvoiceMerged'];
				if (notShowSubmitARsForApproval.indexOf(i.Status) > -1) {
					this.showSubmitARsForApproval = false;
				}

				let notShowApproveARs = ['ARInvoiceApproved', 'ARInvoiceRejected', 'ARInvoiceCanceled', 'EInvoiceEmpty', 'EInvoiceNew', 'EInvoiceRelease', 'EInvoiceCancel','ARInvoiceSplited', 'ARInvoiceMerged'];
				if (notShowApproveARs.indexOf(i.Status) > -1) {
					this.showApproveARs = false;
				}

				let notShowDisapproveARs = ['EInvoiceNew', 'EInvoiceRelease', 'EInvoiceCancel', 'EInvoiceEmpty', 'ARInvoiceNew', 'ARInvoiceDraft', 'ARInvoiceCanceled', 'ARInvoiceRejected', 'ARInvoiceRejected'];
				if (notShowDisapproveARs.indexOf(i.Status) > -1) {
					this.showDisapproveARs = false;
				}

				let notShowCancelARs = ['ARInvoiceCanceled'];
				if (notShowCancelARs.indexOf(i.Status) > -1) {
					this.showCancelARs = false;
				}

				let notShowCreateEInvoice = ['EInvoiceNew', 'EInvoiceRelease', 'EInvoiceCancel', 'EInvoiceEmpty', 'ARInvoiceNew', 'ARInvoiceDraft', 'ARInvoiceCanceled', 'ARInvoiceRejected', 'ARInvoicePending', 'ARInvoiceSplited', 'ARInvoiceMerged'];
				if (notShowCreateEInvoice.indexOf(i.Status) > -1) {
					this.showCreateEInvoice = false;
				}

				let notShowUpdateEInvoice = ['EInvoiceRelease', 'EInvoiceCancel', 'ARInvoiceNew', 'ARInvoiceApproved', 'ARInvoiceDraft', 'ARInvoiceCanceled', 'ARInvoiceRejected', 'ARInvoicePending', 'ARInvoiceSplited', 'ARInvoiceMerged'];
				if (notShowUpdateEInvoice.indexOf(i.Status) > -1) {
					this.showUpdateEInvoice = false;
				}

				let notShowSubmitARs = ['ARInvoiceApproved', 'ARInvoiceCanceled', 'EInvoiceNew', 'EInvoiceRelease', 'EInvoiceCancel', 'EInvoiceEmpty'];
				if (notShowSubmitARs.indexOf(i.Status) > -1) {
					this.showSubmitARs = false;
				}

				let notShowDelete = ['EInvoiceNew', 'EInvoiceRelease', 'EInvoiceCancel', 'ARInvoiceApproved'];
				if (notShowDelete.indexOf(i.Status) > -1) {
					this.showDelete = false;
				}

				let notShowSplit = ['EInvoiceNew', 'EInvoiceRelease', 'EInvoiceCancel', 'EInvoiceEmpty', 'ARInvoiceCanceled', 'ARInvoiceSplited', 'ARInvoiceMerged'];
				if (notShowSplit.indexOf(i.Status) > -1) {
					this.showSplit = false;
				}
				
				let notShowMerge = ['EInvoiceRelease', 'EInvoiceNew', 'EInvoiceCancel', 'EInvoiceEmpty', 'ARInvoiceCanceled', 'ARInvoiceSplited', 'ARInvoiceMerged'];
				if (notShowMerge.indexOf(i.Status) > -1) {
					this.showMerge = false;
				}
				
			});			
		}
		
		if (this.pageConfig.pageName == 'business-partner' || this.pageConfig.pageName == 'outlet' || this.pageConfig.pageName == 'contact-mobile') {
			this.showSubmitOrdersForApproval = false;
			this.showApproveOrders = false;
			this.showDisapproveOrders = false;
			this.showCancelOrders = false;

			this.showSubmitBusinessPartner = true;
			this.showApproveBusinessPartner = true;
			this.showDisapproveBusinessPartner = true;
			//this.showCancel = false
			this.showDelete = true;

			this.selectedItems.forEach(i => {
				
				// ['New', 'Unapproved', 'Submitted', 'Approved', 'Cancelled'];
				// if (['New', 'Unapproved', 'Submitted', 'Approved', 'Cancelled'].indexOf(i.Status) > -1) this.showCancelOrders = false;
				
				if (['Submitted', 'Approved', 'Cancelled'].indexOf(i.Status) > -1) 					this.showSubmitBusinessPartner = false;
				if (['New', 'Unapproved', 'Approved', 'Cancelled'].indexOf(i.Status) > -1) 			this.showApproveBusinessPartner = false;
				if (['New', 'Unapproved', 'Cancelled'].indexOf(i.Status) > -1) 						this.showDisapproveBusinessPartner = false;
				if (['Submitted', 'Approved', 'Cancelled'].indexOf(i.Status) > -1) 					this.showDelete = false;
			});
		}

	}

}

