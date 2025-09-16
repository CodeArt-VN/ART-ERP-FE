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
				if (row[j] === 1) {
					showBtns.push(`Show${headers[j]}`);
				}
			}

			result.push({ Status: status, ShowBtns: showBtns });
		}

		return result;
	},

	PURCHASE_Request: [
		['Btns',			'ChangeBranch',		'Merge',		'Split',		'Submit',		'Disapprove',		'Approve',		'Cancel',		'Delete',		'Archive',		'CopyToPurchaseQuotation',	'CopyToPO'],
		['Draft',			1,					1,				1,				1,				0,					1,				1,				1,				1,				0,							0],
		['Splitted',		0,					0,				0,				0,				0,					0,				0,				0,				1,				0,							0],
		['Merged',			0,					0,				0,				0,				0,					0,				0,				0,				1,				0,							0],
		['Canceled',		0,					0,				0,				0,				0,					0,				0,				1,				1,				0,							0],
		['Submitted',		0,					0,				0,				0,				1,					1,				0,				0,				0,				0,							0],
		['Unapproved',		1,					1,				1,				1,				0,					1,				1,				1,				1,				0,							0],
		['Approved',		0,					0,				0,				0,				1,					0,				1,				0,				1,				1,							1],
		['Open',			0,					0,				0,				0,				0,					0,				0,				0,				1,				0,							0],
		['Closed',			0,					0,				0,				0,				0,					0,				0,				0,				1,				0,							0],
	],

	PURCHASE_Quotation: [
		['Btns',			'ChangeBranch',		'Merge',		'Split',		'Submit',		'Disapprove',		'Approve',		'Cancel',		'Delete',		'Archive',		'Confirm',		'SendQuotationRequest',		'CopyToPurchaseRequest',		'CopyToPO',		'CopyToPriceListVersion'],
		['Draft',			1,					1,				1,				1,				0,					1,				1,				1,				1,				0,				1,								0,								0,				0],
		['Splitted',		0,					0,				0,				0,				0,					0,				0,				0,				1,				0,				0,								0,								0,				0],
		['Merged',			0,					0,				0,				0,				0,					0,				0,				0,				1,				0,				0,								0,								0,				0],
		['Canceled',		0,					0,				0,				0,				0,					0,				0,				1,				1,				0,				0,								0,								0,				0],
		['Open',			0,					0,				0,				1,				0,					1,				1,				0,				1,				1,				0,								0,								0,				0],
		['Confirmed',		0,					0,				0,				1,				0,					1,				1,				0,				1,				0,				1,								0,								0,				0],
		['Submitted',		0,					0,				0,				0,				1,					1,				0,				0,				0,				0,				0,								0,								0,				0],
		['Unapproved',		1,					1,				1,				1,				0,					1,				1,				1,				1,				0,				1,								0,								0,				0],
		['Approved',		0,					0,				0,				0,				1,					0,				1,				0,				1,				0,				0,								1,								1,				1],
		['Closed',			0,					0,				0,				0,				0,					0,				0,				0,				1,				0,				0,								0,								0,				1],
	],

	PURCHASE_Order: [
		['Btns',				'ChangeBranch',		'Merge',		'Split',		'Submit',		'Disapprove',		'Approve',		'Cancel',		'Delete',		'Archive',		'SubmitOrders',		'CopyToReceipt',		'CopyToAPInvoice',		'RequestOutgoingPayment'],
		['Draft',				1,					1,				1,				1,				0,					1,				1,				1,				1,				0,					0,						0,						0],
		['Splitted',			0,					0,				0,				0,				0,					0,				0,				0,				1,				0,					0,						0,						0],
		['Merged',				0,					0,				0,				0,				0,					0,				0,				0,				1,				0,					0,						0,						0],
		['Canceled',			0,					0,				0,				0,				0,					0,				0,				1,				1,				0,					0,						0,						0],
		['Unapproved',			1,					1,				1,				1,				0,					1,				1,				1,				1,				0,					0,						0,						0],
		['Submitted',			0,					0,				0,				0,				1,					1,				0,				0,				0,				0,					0,						0,						0],
		['Approved',			0,					0,				0,				0,				1,					0,				1,				0,				1,				1,					0,						0,						0],
		['Open',				0,					0,				0,				0,				0,					0,				0,				0,				1,				0,					0,						0,						0],
		['Closed',				0,					0,				0,				0,				0,					0,				0,				0,				1,				0,					0,						0,						0],
		['Ordered',				0,					0,				0,				0,				0,					0,				0,				0,				1,				0,					1,						1,						1],
		['Confirmed',			0,					0,				0,				0,				0,					0,				0,				0,				0,				0,					1,						1,						1],
		['Shipping',			0,					0,				0,				0,				0,					0,				0,				0,				0,				0,					1,						1,						1],
		['PartiallyReceived',	0,					0,				0,				0,				0,					0,				0,				0,				0,				0,					1,						1,						1],
		['Received',			0,					0,				0,				0,				0,					0,				0,				0,				0,				0,					1,						1,						1],
	],

	WMS_Receipt: [
		['Btns',			'ChangeBranch',		'Cancel',		'Delete',		'Archive',		'Delivery',		'Receive',		'CopyToAPInvoice'],
		['New',				1,					1,				1,				1,				0,				0,				0],
		['Confirmed',		0,					1,				1,				1,				1,				0,				0],
		['Scheduled',		0,					1,				0,				1,				1,				0,				0],
		['Delivering',		0,					0,				0,				1,				0,				1,				0],
		['Palletized',		0,					0,				0,				1,				0,				1,				0],
		['Unloading',		0,					0,				0,				1,				0,				0,				0],
		['Received',		0,					0,				0,				1,				0,				0,				1],
		['Canceled',		0,					0,				0,				1,				0,				0,				0],
	],

	AC_APInvoice: [
		['Btns',			'Delete',			'Archive',			'RequestOutgoingPayment'],
		['Draft',			1,					1,					0],
		['Open',			0,					1,					1],
		['Canceled',		0,					1,					0],
		['Closed',			0,					1,					0],
	],

	BANK_OutgoingPayment: [
		['Btns',				'ChangeBranch',		'Merge',		'Split',		'Submit',		'Disapprove',		'Approve',		'Cancel',		'Delete',		'Archive',		'MarkAsPaid',		'Pay'],
		['NotSubmittedYet',		1,					1,				1,				0,				0,					1,				1,				1,				1,				0,					0],
		['Canceled',			0,					0,				0,				0,				0,					0,				0,				1,				0,				0,					0],
		['Unapproved',			1,					1,				1,				1,				0,					0,				1,				1,				1,				0,					0],
		['Submitted',			1,					1,				1,				0,				1,					1,				0,				1,				1,				0,					0],
		['Approved',			0,					0,				0,				0,				1,					0,				1,				0,				0,				1,					1],
		['WaitForPayment',		0,					0,				0,				0,				0,					0,				0,				0,				0,				1,					1],
		['PartiallyPaid',		0,					0,				0,				0,				0,					0,				0,				0,				0,				1,					1],
		['Paid',				0,					0,				0,				0,				0,					0,				0,				0,				0,				0,					0],
	],

	SALE_Quotation: [
		['Btns',			'ChangeBranch',		'Merge',		'Split',		'Submit',		'Disapprove',		'Approve',		'Cancel',		'Delete',		'Archive',		'Confirm'],
		['Open',			1,					1,				1,				1,				0,					1,				1,				1,				1,				0],
		['Splitted',		0,					0,				0,				0,				0,					0,				0,				0,				1,				0],
		['Merged',			0,					0,				0,				0,				0,					0,				0,				0,				1,				0],
		['Confirmed',		0,					0,				0,				0,				0,					0,				0,				0,				0,				0],
		['Submitted',		0,					0,				0,				0,				1,					1,				0,				0,				0,				0],
		['Unapproved',		0,					0,				0,				1,				0,					1,				1,				1,				1,				0],
		['Approved',		0,					0,				0,				0,				1,					0,				1,				0,				0,				1],
		['Canceled',		0,					0,				0,				0,				0,					0,				0,				0,				1,				0],
		['Closed',			0,					0,				0,				0,				0,					0,				0,				1,				1,				0],
	],

	SALE_Order: [
		['Btns',			'ChangeBranch',		'Merge',		'Split',		'Submit',		'Disapprove',		'Approve',		'Cancel',		'Delete',		'Archive',		'CopyToARInvoice'],
		['Draft',			1,					1,				1,				1,				0,					1,				1,				1,				1,				0],
		['New',				1,					1,				1,				1,				0,					1,				1,				1,				1,				0],
		['Splitted',		0,					0,				0,				0,				0,					0,				0,				0,				1,				0],
		['Merged',			0,					0,				0,				0,				0,					0,				0,				0,				1,				0],
		['Canceled',		0,					0,				0,				0,				0,					0,				0,				1,				1,				0],
		['Submitted',		0,					0,				0,				0,				1,					1,				0,				0,				0,				0],
		['Unapproved',		1,					1,				1,				1,				0,					1,				1,				1,				1,				0],
		['Approved',		0,					0,				0,				0,				1,					0,				1,				0,				1,				1],
		['Scheduled',		0,					0,				0,				0,				0,					0,				0,				0,				1,				1],
		['InCarrier',		0,					0,				0,				0,				0,					0,				0,				0,				1,				1],
		['Picking',			0,					0,				0,				0,				0,					0,				0,				0,				1,				1],
		['InDelivery',		0,					0,				0,				0,				0,					0,				0,				0,				1,				1],
		['Delivered',		0,					0,				0,				0,				0,					0,				0,				0,				1,				1],
		['Redelivery',		0,					0,				0,				0,				0,					0,				0,				0,				1,				0],
		['Debt',			0,					0,				0,				0,				0,					0,				0,				0,				1,				1],
		['Done',			0,					0,				0,				0,				0,					0,				0,				0,				1,				1],
	],

	CRM_Contact: [
		['Btns',			'ChangeBranch',		'Merge',		'Split',		'Submit',		'Disapprove',		'Approve',		'Cancel',		'Delete',		'Archive',		'RequestDataCorrection'],
		['New',				1,					1,				1,				1,				1,					1,				1,				1,				1,				0],
		['Submitted',		0,					0,				0,				0,				1,					1,				0,				0,				0,				0],
		['Unapproved',		1,					1,				1,				1,				0,					1,				1,				1,				1,				0],
		['Approved',		0,					0,				0,				0,				1,					0,				1,				0,				1,				1],
	],

	HRM_StaffPolEmployeeDecision: [
		['Btns',			'ChangeBranch',		'Submit',		'Disapprove',		'Approve',		'Cancel',		'Delete',		'Archive'],
		['Draft',			1,					1,				0,					1,				0,				1,				1],
		['Submitted',		0,					0,				1,					1,				0,				0,				0],
		['Unapproved',		1,					1,				0,					0,				1,				1,				1],
		['Approved',		0,					0,				0,					0,				0,				0,				0],
	],

	HRM_StaffOvertimRequest: [
		['Btns',			'ChangeBranch',		'Submit',		'Disapprove',		'Approve',		'Cancel',		'Delete',		'Archive'],
		['Draft',			1,					1,				0,					1,				0,				1,				1],
		['Submitted',		0,					0,				1,					1,				0,				0,				0],
		['Unapproved',		1,					1,				0,					0,				1,				1,				1],
		['Approved',		0,					0,				0,					0,				0,				0,				0],
	],

	HRM_StaffPayroll: [
		['Btns',			'ChangeBranch',		'Submit',		'Disapprove',		'Approve',		'Cancel',		'Delete',		'Archive', 		'Calculate',		'Export',			'Import',		'ConfigPayroll',	'ExportAllData',	'ExportInputData',	'ImportAllData',	'ImportInputData',		'SendPayslip'],
		['Draft',			1,					1,				0,					1,				0,				1,				1,				1,					1,					1,				1,					1,					1,					1,					1,						0],
		['Unapproved',		1,					1,				0,					0,				1,				1,				1,				1,					1,					1,				1,					1,					1,					1,					1,						0],
		['Submitted',		0,					0,				1,					1,				0,				0,				0,				0,					1,					0,				0,					1,					1,					0,					0,						0],
		['Approved',		0,					0,				0,					0,				0,				0,				0,				0,					1,					0,				0,					1,					1,					0,					0,						1],
	],
	HRM_TimesheetCycle: [
		['Btns',			'ChangeBranch',		'Submit',		'Disapprove',		'Approve',		'Cancel',		'Delete',		'Archive'],
		['Draft',			1,					1,				0,					1,				0,				1,				1],
		['Submitted',		0,					0,				1,					1,				0,				0,				0],
		['Unapproved',		1,					1,				0,					0,				1,				1,				1],
		['Approved',		0,					0,				0,					0,				0,				0,				0],
	],
	HRM_StaffTimeOffRequest: [
		['Btns',			'ChangeBranch',		'Submit',		'Disapprove',		'Approve',		'Cancel',		'Delete',		'Archive', 		'Cancel'],
		['Draft',			1,					1,				0,					1,				0,				1,				1,				1],
		['Submitted',		0,					0,				1,					1,				0,				0,				0,				1],
		['Unapproved',		1,					1,				0,					0,				1,				1,				1,				1],
		['Approved',		0,					0,				0,					0,				0,				0,				0,				0],
		['Canceled',		0,					0,				0,					0,				0,				0,				1,				0],

	],
};
