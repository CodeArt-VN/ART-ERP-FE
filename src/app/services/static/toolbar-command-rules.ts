export var toolbarCommandRules = {
	getRules: function (serviceName) {
		return this.convertArrayToObjects(this[serviceName]) || [];
	},

	convertArrayToObjects(matrix) {
		if (!matrix) return [];

		const headers = matrix[0];
		const result = [];

		for (let i = 1; i < matrix.length; i++) {
			const row = matrix[i];
			const status = row[0];
			const showBtns = [];

			for (let j = 1; j < row.length; j++) {
				if (row[j] === 'x') {
					showBtns.push(`Show${headers[j]}`);
				}
			}

			result.push({ Status: status, ShowBtns: showBtns });
		}

		return result;
	},

	PURCHASE_Request: [
		['Btns', 'ChangeBranch', 'Merge', 'Split', 'Submit', 'Disapprove', 'Approve', 'Cancel', 'Delete', 'Archive', 'CopyToPurchaseQuotation', 'CopyToPO'],
		['Draft', 'x', 'x', 'x', 'x', null, 'x', 'x', 'x', 'x', null, null],
		['Splitted', null, null, null, null, null, null, null, null, 'x', null, null],
		['Merged', null, null, null, null, null, null, null, null, 'x', null, null],
		['Canceled', null, null, null, null, null, null, null, 'x', 'x', null, null],
		['Submitted', null, null, null, null, 'x', 'x', null, null, null, null, null],
		['Unapproved', 'x', 'x', 'x', 'x', null, 'x', 'x', 'x', 'x', null, null],
		['Approved', null, null, null, null, 'x', null, 'x', null, 'x', 'x', 'x'],
		['Open', null, null, null, null, null, null, null, null, 'x', null, null],
		['Closed', null, null, null, null, null, null, null, null, 'x', null, null],
	],

	PURCHASE_Quotation: [
		[
			'Btns',
			'ChangeBranch',
			'Merge',
			'Split',
			'Submit',
			'Disapprove',
			'Approve',
			'Cancel',
			'Delete',
			'Archive',
			'Confirm',
			'SendQuotationRequest',
			'CopyToPurchaseRequest',
			'CopyToPO',
			'CopyToPriceListVersion',
		],
		['Draft', 'x', 'x', 'x', 'x', null, 'x', 'x', 'x', 'x', null, 'x', null, null, null],
		['Splitted', null, null, null, null, null, null, null, null, 'x', null, null, null, null, null],
		['Merged', null, null, null, null, null, null, null, null, 'x', null, null, null, null, null],
		['Canceled', null, null, null, null, null, null, null, 'x', 'x', null, null, null, null, null],
		['Open', null, null, null, 'x', null, 'x', 'x', null, 'x', 'x', null, null, null, null],
		['Confirmed', null, null, null, 'x', null, 'x', 'x', null, 'x', null, 'x', null, null, null],
		['Submitted', null, null, null, null, 'x', 'x', null, null, null, null, null, null, null, null],
		['Unapproved', 'x', 'x', 'x', 'x', null, 'x', 'x', 'x', 'x', null, 'x', null, null, null],
		['Approved', null, null, null, null, 'x', null, 'x', null, 'x', null, null, 'x', 'x', 'x'],
		['Closed', null, null, null, null, null, null, null, null, 'x', null, null, null, null, 'x'],
	],

	PURCHASE_Order: [
		[
			'Btns',
			'ChangeBranch',
			'Merge',
			'Split',
			'Submit',
			'Disapprove',
			'Approve',
			'Cancel',
			'Delete',
			'Archive',
			'SubmitOrders',
			'CopyToReceipt',
			'CopyToAPInvoice',
			'RequestOutgoingPayment',
		],
		['Draft', 'x', 'x', 'x', 'x', null, 'x', 'x', 'x', 'x', null, null, null, null],
		['Splitted', null, null, null, null, null, null, null, null, 'x', null, null, null, null],
		['Merged', null, null, null, null, null, null, null, null, 'x', null, null, null, null],
		['Canceled', null, null, null, null, null, null, null, 'x', 'x', null, null, null, null],
		['Unapproved', 'x', 'x', 'x', 'x', null, 'x', 'x', 'x', 'x', null, null, null, null],
		['Submitted', null, null, null, null, 'x', 'x', null, null, null, null, null, null, null],
		['Approved', null, null, null, null, 'x', null, 'x', null, 'x', 'x', null, null, null],
		['Open', null, null, null, null, null, null, null, null, 'x', null, null, null, null],
		['Closed', null, null, null, null, null, null, null, null, 'x', null, null, null, null],
		['Ordered', null, null, null, null, null, null, null, null, 'x', null, 'x', 'x', 'x'],
		['Confirmed', null, null, null, null, null, null, null, null, null, null, 'x', 'x', 'x'],
		['Shipping', null, null, null, null, null, null, null, null, null, null, 'x', 'x', 'x'],
		['PartiallyReceived', null, null, null, null, null, null, null, null, null, null, 'x', 'x', 'x'],
		['Received', null, null, null, null, null, null, null, null, null, null, 'x', 'x', 'x'],
	],

	WMS_Receipt: [
		['Btns', 'ChangeBranch', 'Cancel', 'Delete', 'Archive', 'Delivery', 'Receive', 'CopyToAPInvoice'],
		['New', 'x', 'x', 'x', 'x', null, null, null],
		['Confirmed', null, 'x', 'x', 'x', 'x', null, null],
		['Scheduled', null, 'x', null, 'x', 'x', null, null],
		['Delivering', null, null, null, 'x', null, 'x', null],
		['Palletized', null, null, null, 'x', null, 'x', null],
		['Unloading', null, null, null, 'x', null, null, null],
		['Received', null, null, null, 'x', null, null, 'x'],
		['Canceled', null, null, null, 'x', null, null, null],
	],

	AC_APInvoice: [
		['Btns', 'Delete', 'Archive', 'RequestOutgoingPayment'],
		['Draft', 'x', 'x', null],
		['Open', null, 'x', 'x'],
		['Canceled', null, 'x', null],
		['Closed', null, 'x', null],
	],

	BANK_OutgoingPayment: [
		['Btns', 'ChangeBranch', 'Merge', 'Split', 'Submit', 'Disapprove', 'Approve', 'Cancel', 'Delete', 'Archive', 'MarkAsPaid', 'Pay'],
		['NotSubmittedYet', 'x', 'x', 'x', null, null, 'x', 'x', 'x', 'x', null, null],
		['Canceled', null, null, null, null, null, null, null, 'x', null, null, null],
		['Unapproved', 'x', 'x', 'x', 'x', null, null, 'x', 'x', 'x', null, null],
		['Submitted', 'x', 'x', 'x', null, 'x', 'x', null, 'x', 'x', null, null],
		['Approved', null, null, null, null, 'x', null, 'x', null, null, 'x', 'x'],
		['WaitForPayment', null, null, null, null, null, null, null, null, null, 'x', 'x'],
		['PartiallyPaid', null, null, null, null, null, null, null, null, null, 'x', 'x'],
		['Paid', null, null, null, null, null, null, null, null, null, null, null],
	],

	SALE_Quotation: [
		['Btns', 'ChangeBranch', 'Merge', 'Split', 'Submit', 'Disapprove', 'Approve', 'Cancel', 'Delete', 'Archive', 'Confirm'],
		['Open', 'x', 'x', 'x', 'x', null, 'x', 'x', 'x', 'x', null],
		['Splitted', null, null, null, null, null, null, null, null, 'x', null],
		['Merged', null, null, null, null, null, null, null, null, 'x', null],
		['Confirmed', null, null, null, null, null, null, null, null, null, null],
		['Submitted', null, null, null, null, 'x', 'x', null, null, null, null],
		['Unapproved', null, null, null, 'x', null, 'x', 'x', 'x', 'x', null],
		['Approved', null, null, null, null, 'x', null, 'x', null, null, 'x'],
		['Canceled', null, null, null, null, null, null, null, null, 'x', null],
		['Closed', null, null, null, null, null, null, null, 'x', 'x', null],
	],

	SALE_Order: [
		['Btns', 'ChangeBranch', 'Merge', 'Split', 'Submit', 'Disapprove', 'Approve', 'Cancel', 'Delete', 'Archive', 'CopyToARInvoice'],
		['Draft', 'x', 'x', 'x', 'x', null, 'x', 'x', 'x', 'x', null],
		['New', 'x', 'x', 'x', 'x', null, 'x', 'x', 'x', 'x', null],
		['Splitted', null, null, null, null, null, null, null, null, 'x', null],
		['Merged', null, null, null, null, null, null, null, null, 'x', null],
		['Canceled', null, null, null, null, null, null, null, 'x', 'x', null],
		['Submitted', null, null, null, null, 'x', 'x', null, null, null, null],
		['Unapproved', 'x', 'x', 'x', 'x', null, 'x', 'x', 'x', 'x', null],
		['Approved', null, null, null, null, 'x', null, 'x', null, 'x', 'x'],
		['Scheduled', null, null, null, null, null, null, null, null, 'x', 'x'],
		['InCarrier', null, null, null, null, null, null, null, null, 'x', 'x'],
		['Picking', null, null, null, null, null, null, null, null, 'x', 'x'],
		['InDelivery', null, null, null, null, null, null, null, null, 'x', 'x'],
		['Delivered', null, null, null, null, null, null, null, null, 'x', 'x'],
		['Redelivery', null, null, null, null, null, null, null, null, 'x', null],
		['Debt', null, null, null, null, null, null, null, null, 'x', 'x'],
		['Done', null, null, null, null, null, null, null, null, 'x', 'x'],
	],

	CRM_Contact: [
		['Btns', 'ChangeBranch', 'Merge', 'Split', 'Submit', 'Disapprove', 'Approve', 'Cancel', 'Delete', 'Archive', 'RequestDataCorrection'],
		['New', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', null],
		['Submitted', null, null, null, null, 'x', 'x', null, null, null, null],
		['Unapproved', 'x', 'x', 'x', 'x', null, 'x', 'x', 'x', 'x', null],
		['Approved', null, null, null, null, 'x', null, 'x', null, 'x', 'x'],
	],

	HRM_StaffPolEmployeeDecision: [
		['Btns', 'ChangeBranch', 'Submit', 'Disapprove', 'Approve', 'Cancel', 'Delete', 'Archive'],
		['Draft', 'x', 'x', null, 'x', null, 'x', 'x'],
		['Submitted', null, null, 'x', 'x', null, null,null],
		['Unapproved', 'x', 'x', null, null,  'x', 'x', 'x' ],
		['Approved', null, null, null, null, null, null,null],
	],

	HRM_StaffOvertimRequest: [
		['Btns', 'ChangeBranch', 'Submit', 'Disapprove', 'Approve', 'Cancel', 'Delete', 'Archive'],
		['Draft', 'x', 'x', null, 'x', null, 'x', 'x'],
		['Submitted', null, null, 'x', 'x', null, null,null],
		['Unapproved', 'x', 'x', null, null,  'x', 'x', 'x' ],
		['Approved', null, null, null, null, null, null,null],
	],

	_PURCHASE_Request: [
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
	_PURCHASE_Quotation: [
		{ Status: 'Draft', ShowBtns: ['ShowSplit', 'ShowMerge', 'ShowSendQuotationRequest'] },
		{ Status: 'Open', ShowBtns: ['ShowSubmit', 'ShowApprove', 'ShowCancel', 'ShowDelete', 'ShowArchive'] },
		{ Status: 'Unapproved', ShowBtns: ['ShowSubmit', 'ShowApprove', 'ShowCancel', 'ShowDelete', 'ShowArchive', 'ShowSendQuotationRequest'] },
		{ Status: 'Submitted', ShowBtns: ['ShowApprove', 'ShowDisapprove'] },
		{ Status: 'Approved', ShowBtns: ['ShowDisapprove', 'ShowCancel', 'ShowConfirm', 'ShowCopyToPriceListVersion', 'ShowCopyToPurchaseOrder'] },
		{ Status: 'Confirmed', ShowBtns: ['ShowSubmit', 'ShowApprove', 'ShowCancel', 'ShowReopenConfirmedQuotation', 'ShowSendQuotationRequest'] },
		{ Status: 'Canceled', ShowBtns: ['ShowDelete', 'ShowArchive'] },
		{ Status: 'Closed', ShowBtns: ['ShowCopyToPriceListVersion'] },
	],
	_PURCHASE_Order: [
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

	_SALE_Quotation: [
		{ Status: 'Open', ShowBtns: ['ShowSubmit', 'ShowApprove', 'ShowCancel', 'ShowDelete', 'ShowArchive'] },
		{ Status: 'Unapproved', ShowBtns: ['ShowSubmit', 'ShowApprove', 'ShowCancel', 'ShowDelete', 'ShowArchive'] },
		{ Status: 'Submitted', ShowBtns: ['ShowApprove', 'ShowDisapprove'] },
		{ Status: 'Approved', ShowBtns: ['ShowDisapprove', 'ShowCancel', 'ShowConfirm'] },
		{ Status: 'Confirmed', ShowBtns: [] },
		{ Status: 'Canceled', ShowBtns: ['ShowDelete', 'ShowArchive'] },
	],

	_SALE_Order: [
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

	_CRM_Contact: [
		{ Status: 'New', ShowBtns: ['ShowChangeBranch', 'ShowMerge', 'ShowSplit', 'ShowSubmit', 'ShowApprove', 'ShowCancel', 'ShowDelete', 'ShowArchive'] }, // Mới
		{ Status: 'Unapproved', ShowBtns: ['ShowChangeBranch', 'ShowMerge', 'ShowSplit', 'ShowSubmit', 'ShowApprove', 'ShowCancel', 'ShowDelete', 'ShowArchive'] }, // Không duyệt
		{ Status: 'Submitted', ShowBtns: ['ShowApprove', 'ShowDisapprove'] }, // Chờ duyệt
		{ Status: 'Approved', ShowBtns: ['ShowDisapprove', 'ShowCopyToARInvoice', 'ShowCancel', 'ShowArchive'] }, // Đã duyệt
	],

	_WMS_Receipt: [
		{ Status: 'New', ShowBtns: ['ShowChangeBranch', 'ShowCancel', 'ShowDelete', 'ShowArchive'] },
		{ Status: 'Confirmed', ShowBtns: ['ShowCancel', 'ShowDelete', 'ShowArchive', 'ShowDelivery'] },
		{ Status: 'Scheduled', ShowBtns: ['ShowCancel', 'ShowArchive', 'ShowDelivery'] },
		{ Status: 'Delivering', ShowBtns: ['ShowArchive', 'ShowReceive'] },
		{ Status: 'Palletized', ShowBtns: ['ShowArchive', 'ShowReceive'] },
		{ Status: 'Unloading', ShowBtns: ['ShowArchive', 'ShowReceive'] },
		{ Status: 'Received', ShowBtns: ['ShowArchive', 'ShowCopyToAPInvoice'] },
		{ Status: 'Canceled', ShowBtns: ['ShowArchive', 'ShowDelete'] },
	],
};
