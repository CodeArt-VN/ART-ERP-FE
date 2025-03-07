export var toolbarCommandRules = {
	getRules: function (serviceName) {
		return this[serviceName] || [];
	},

	PURCHASE_Request: [
		{ Status: 'Draft', ShowBtns: ['ShowChangeBranch', 'ShowSubmit', 'ShowApprove', 'ShowCancel', 'ShowDelete', 'ShowArchive'] }, // Mới
		{ Status: 'Unapproved', ShowBtns: ['ShowChangeBranch', 'ShowSubmit', 'ShowApprove', 'ShowCancel', 'ShowDelete', 'ShowArchive'] }, // Không duyệt
		{ Status: 'Submitted', ShowBtns: ['ShowApprove', 'ShowDisapprove'] },
		{ Status: 'Approved', ShowBtns: ['ShowDisapprove', 'ShowCancel', 'ShowArchive', 'ShowCopyToPurchaseQuotation', 'ShowCopyToPO'] }, // Đã duyệt

		{ Status: 'Open', ShowBtns: ['ShowArchive'] },
		{ Status: 'Closed', ShowBtns: ['ShowArchive'] },

		{ Status: 'Splitted', ShowBtns: ['ShowArchive'] },
		{ Status: 'Merged', ShowBtns: ['ShowArchive'] },
		{ Status: 'Canceled', ShowBtns: ['ShowArchive'] },
	],
	PURCHASE_Quotation: [
		{ Status: 'Draft', ShowBtns: ['ShowSplit', 'ShowMerge','ShowSendQuotationRequest'] },
		{ Status: 'Open', ShowBtns: ['ShowSubmit', 'ShowApprove', 'ShowCancel', 'ShowDelete', 'ShowArchive'] },
		{ Status: 'Unapproved', ShowBtns: ['ShowSubmit', 'ShowApprove', 'ShowCancel', 'ShowDelete', 'ShowArchive','ShowSendQuotationRequest'] },
		{ Status: 'Submitted', ShowBtns: ['ShowApprove', 'ShowDisapprove'] },
		{ Status: 'Approved', ShowBtns: ['ShowDisapprove', 'ShowCancel', 'ShowConfirm', 'ShowCopyToPriceListVersion', 'ShowCopyToPurchaseOrder'] },
		{ Status: 'Confirmed', ShowBtns: ['ShowSubmit', 'ShowApprove', 'ShowCancel', 'ShowReopenConfirmedQuotation','ShowSendQuotationRequest'] },
		{ Status: 'Canceled', ShowBtns: ['ShowDelete', 'ShowArchive'] },
		{ Status: 'Closed', ShowBtns: ['ShowCopyToPriceListVersion'] },
	],
	PURCHASE_Order: [
		{ Status: 'Draft', ShowBtns: ['ShowChangeBranch', 'ShowMerge', 'ShowSplit', 'ShowSubmit', 'ShowApprove', 'ShowCancel', 'ShowDelete', 'ShowArchive'] },
		{ Status: 'Unapproved', ShowBtns: ['ShowChangeBranch', 'ShowMerge', 'ShowSplit', 'ShowSubmit', 'ShowApprove', 'ShowCancel', 'ShowDelete', 'ShowArchive'] },
		{ Status: 'Submitted', ShowBtns: ['ShowApprove', 'ShowDisapprove'] },
		{ Status: 'Approved', ShowBtns: ['ShowDisapprove', 'ShowCancel', 'ShowArchive', 'ShowSubmitOrders'] },

		{ Status: 'Ordered', ShowBtns: ['ShowArchive', 'ShowCopyToReceipt', 'ShowCopyToAPInvoice', 'ShowRequestOutgoingPayment'] }, // Đã đặt mua
		{ Status: 'Confirmed', ShowBtns: ['ShowCopyToReceipt', 'ShowCopyToAPInvoice', 'ShowRequestOutgoingPayment'] }, // Đã xác nhận
		{ Status: 'Shipping', ShowBtns: ['ShowCopyToReceipt', 'ShowCopyToAPInvoice', 'ShowRequestOutgoingPayment'] }, // Đang giao hàng

		{ Status: 'PartiallyReceived', ShowBtns: ['ShowCopyToReceipt', 'ShowCopyToAPInvoice', 'ShowRequestOutgoingPayment'] }, // Đã nhận một phần
		{ Status: 'Received', ShowBtns: ['ShowCopyToAPInvoice', 'ShowRequestOutgoingPayment'] }, // Đã nhận đủ

		{ Status: 'Closed', ShowBtns: ['ShowArchive'] }, // Đã đóng
		{ Status: 'Splitted', ShowBtns: ['ShowArchive'] }, // Đã chia
		{ Status: 'Merged', ShowBtns: ['ShowArchive'] }, // Đã gộp
		{ Status: 'Canceled', ShowBtns: ['ShowDelete', 'ShowArchive'] }, // Đã hủy
	],

	SALE_Quotation: [
		{ Status: 'Open', ShowBtns: ['ShowSubmit', 'ShowApprove', 'ShowCancel', 'ShowDelete', 'ShowArchive'] },
		{ Status: 'Unapproved', ShowBtns: ['ShowSubmit', 'ShowApprove', 'ShowCancel', 'ShowDelete', 'ShowArchive'] },
		{ Status: 'Submitted', ShowBtns: ['ShowApprove', 'ShowDisapprove'] },
		{ Status: 'Approved', ShowBtns: ['ShowDisapprove', 'ShowCancel', 'ShowConfirm'] },
		{ Status: 'Confirmed', ShowBtns: [] },
		{ Status: 'Canceled', ShowBtns: ['ShowDelete', 'ShowArchive'] },
	],

	SALE_Order: [
		{ Status: 'New', ShowBtns: ['ShowChangeBranch', 'ShowMerge', 'ShowSplit', 'ShowSubmit', 'ShowApprove', 'ShowCancel', 'ShowDelete', 'ShowArchive'] }, // Mới
		{ Status: 'Unapproved', ShowBtns: ['ShowChangeBranch', 'ShowMerge', 'ShowSplit', 'ShowSubmit', 'ShowApprove', 'ShowCancel', 'ShowDelete', 'ShowArchive'] }, // Không duyệt
		{ Status: 'Submitted', ShowBtns: ['ShowApprove', 'ShowDisapprove'] }, // Chờ duyệt
		{ Status: 'Approved', ShowBtns: ['ShowDisapprove', 'ShowCopyToARInvoice', 'ShowCancel', 'ShowArchive'] }, // Đã duyệt
		{ Status: 'Scheduled', ShowBtns: ['ShowCopyToARInvoice', 'ShowArchive'] }, // Đã phân tài
		{ Status: 'Picking', ShowBtns: ['ShowCopyToARInvoice', 'ShowArchive'] }, // Đang lấy hàng - đóng gói
		{ Status: 'InCarrier', ShowBtns: ['ShowCopyToARInvoice', 'ShowArchive'] }, // Đã giao đơn vị vận chuyển
		{ Status: 'InDelivery', ShowBtns: ['ShowCopyToARInvoice', 'ShowArchive'] }, // Đang giao hàng
		{ Status: 'Delivered', ShowBtns: ['ShowCopyToARInvoice', 'ShowArchive'] }, // Đã giao hàng
		{ Status: 'Redelivery', ShowBtns: ['ShowArchive'] }, // Chờ giao lại
		{ Status: 'Splitted', ShowBtns: ['ShowArchive'] }, // Đơn đã chia
		{ Status: 'Merged', ShowBtns: ['ShowArchive'] }, // Đơn đã gộp
		{ Status: 'Debt', ShowBtns: ['ShowCopyToARInvoice', 'ShowArchive'] }, // Còn nợ
		{ Status: 'Done', ShowBtns: ['ShowCopyToARInvoice', 'ShowArchive'] }, // Đã xong
		{ Status: 'Canceled', ShowBtns: ['ShowDelete', 'ShowArchive'] }, // Đã hủy
	],

	CRM_Contact: [
		{ Status: 'New', ShowBtns: ['ShowChangeBranch', 'ShowMerge', 'ShowSplit', 'ShowSubmit', 'ShowApprove', 'ShowCancel', 'ShowDelete', 'ShowArchive'] }, // Mới
		{ Status: 'Unapproved', ShowBtns: ['ShowChangeBranch', 'ShowMerge', 'ShowSplit', 'ShowSubmit', 'ShowApprove', 'ShowCancel', 'ShowDelete', 'ShowArchive'] }, // Không duyệt
		{ Status: 'Submitted', ShowBtns: ['ShowApprove', 'ShowDisapprove'] }, // Chờ duyệt
		{ Status: 'Approved', ShowBtns: ['ShowDisapprove', 'ShowCopyToARInvoice', 'ShowCancel', 'ShowArchive'] }, // Đã duyệt
	],

	WMS_Receipt: [
		{ Status: 'New', ShowBtns: ['ShowChangeBranch', 'ShowCancel', 'ShowDelete', 'ShowArchive'] },
		{ Status: 'Confirmed', ShowBtns: ['ShowCancel', 'ShowDelete', 'ShowArchive', 'ShowDelivery'] },
		{ Status: 'Scheduled', ShowBtns: ['ShowCancel', 'ShowArchive', 'ShowDelivery'] },
		{ Status: 'Delivering', ShowBtns: ['ShowArchive', 'ShowReceive'] },
		{ Status: 'Palletized', ShowBtns: ['ShowArchive', 'ShowReceive'] },
		{ Status: 'Unloading', ShowBtns: ['ShowArchive',  'ShowReceive'] },
		{ Status: 'Received', ShowBtns: ['ShowArchive',  'ShowCopyToAPInvoice'] },
		{ Status: 'Canceled', ShowBtns: ['ShowArchive','ShowDelete'] },
	],
};
