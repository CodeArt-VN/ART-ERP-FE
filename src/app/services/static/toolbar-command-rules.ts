export var toolbarCommandRules = {
	getRules: function (serviceName) {
		console.log('Matrix button : ', this.convertArrayToObjects(this[serviceName]));
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
		['Btns', 'ChangeBranch', 'Merge', 'Split', 'Submit', 'Disapprove', 'Approve', 'Cancel', 'Delete', 'Archive'],
		['New', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
		['Submitted', null, null, null, null, 'x', 'x', null, null, null],
		['Unapproved', 'x', 'x', 'x', 'x', null, 'x', 'x', 'x', 'x'],
		['Approved', null, null, null, null, 'x', null, 'x', null, 'x'],
	],

	HRM_StaffPolBenefitEnrollment :[
		['Btns',  'Submit', 'Disapprove', 'Approve', 'Cancel', 'Delete', 'Archive'],
		['Draft', 'x', 'x', 'x', 'x', 'x', 'x',],
		['Submitted',null, 'x', 'x', null, null, null],
		['Unapproved', 'x', null, 'x', 'x', 'x', 'x'],
		['Approved', null, 'x', null, 'x', null, 'x'],
	],

	HRM_StaffContract :[
		['Btns',  'Submit', 'Disapprove', 'Approve', 'Cancel', 'Delete', 'Archive'],
		['Draft', 'x', 'x', 'x', 'x', 'x', 'x',],
		['Submitted',null, 'x', 'x', null, null, null],
		['Unapproved', 'x', null, 'x', 'x', 'x', 'x'],
		['Approved', null, 'x', null, 'x', null, 'x'],
	],

};
