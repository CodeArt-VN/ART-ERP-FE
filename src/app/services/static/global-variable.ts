import { ApiSetting } from './api-setting';
import { APIListBase } from './api-list';
import { introAppData } from '../static/intro';

export var APIList: any = APIListBase;

APIList.FILE_Import = {
	NhanSu: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('CUS/FILE/NhanSu');
		},
	},
};

APIList.ACCOUNT_ApplicationUser = {
	getList: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('Account/ApplicationUsers');
		},
	},
	getItem: {
		method: 'GET',
		url: function (id) {
			return ApiSetting.apiDomain('Account/ApplicationUsers/') + id;
		},
	},
	putItem: {
		method: 'PUT',
		url: function (id) {
			return ApiSetting.apiDomain('Account/ApplicationUsers/') + id;
		},
	},
	postItem: {
		method: 'POST',
		url: function () {
			return ApiSetting.apiDomain('Account/ApplicationUsers');
		},
	},
	delItem: {
		method: 'DELETE',
		url: function (id) {
			return ApiSetting.apiDomain('Account/ApplicationUsers/') + id;
		},
	},

	postChangePassword: {
		method: 'POST',
		url: function () {
			return ApiSetting.apiDomain('Account/ChangePassword');
		},
	},
	postSetPassword: {
		method: 'POST',
		url: function () {
			return ApiSetting.apiDomain('Account/SetPassword');
		},
	},
};
APIList.ManualAPI = {
	getAvailbleDoctorTime: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('BOOK/Bookings/AvailbleDoctorTime');
		},
	},
	getDonHangPhanTai: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('CUS/CRM/CONTRACT/DonHang/PhanTai');
		},
	},

	getRPT_FileInFolder: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('CUS/DOC/File/RPT_FileInFolder');
		},
	},

	getRPTFileByType: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('CUS/DOC/File/RPT_FileByType');
		},
	},
};
APIList.ReportAPI = {
	getDoanhThuTong: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('RPT/DoanhThuTong');
		},
	},
	getDoanhThuTheoKhachTongHop: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('RPT/DoanhThuTheoKhachTongHop');
		},
	},
	getDoanhThuTheoKhachKhoiLuongChiTiet: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('RPT/DoanhThuTheoKhachKhoiLuongChiTiet');
		},
	},
	getTongHopGioHoatDong: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('RPT/TongHopGioHoatDong');
		},
	},
	getBangKeThuChi: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('RPT/BangKeThuChi');
		},
	},
	getBangKeChiPhiTheoNhanVien: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('RPT/BangKeChiPhiTheoNhanVien');
		},
	},
	getBaoCaoChiPhiTheoLoai: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('RPT/BaoCaoChiPhiTheoLoai');
		},
	},
	getBaoCaoNgayCong: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('RPT/BaoCaoNgayCong');
		},
	},

	//Download files
	downloadDoanhThuTong: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('FILE/RPT/DoanhThuTong');
		},
	},
	downloadDoanhThuTheoKhachTongHop: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('FILE/RPT/DoanhThuTheoKhachTongHop');
		},
	},
	downloadDoanhThuTheoKhachKhoiLuongChiTiet: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('FILE/RPT/DoanhThuTheoKhachKhoiLuongChiTiet');
		},
	},
	downloadTongHopGioHoatDong: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('FILE/RPT/TongHopGioHoatDong');
		},
	},
	downloadBangKeThuChi: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('FILE/RPT/BangKeThuChi');
		},
	},
	downloadBangKeChiPhiTheoNhanVien: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('FILE/RPT/BangKeChiPhiTheoNhanVien');
		},
	},
	downloadBaoCaoChiPhiTheoLoai: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('FILE/RPT/BaoCaoChiPhiTheoLoai');
		},
	},
	downloadBaoCaoNgayCong: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('FILE/RPT/BaoCaoNgayCong');
		},
	},
};

APIList.POS_ForCustomer = {
	getSearchList: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('POS/ForCustomer/Search');
		},
	},
	getList: {
		method: 'GET',
		url: function () {
			return ApiSetting.apiDomain('POS/ForCustomer');
		},
	},

	getItem: {
		method: 'GET',
		url: function (id) {
			return ApiSetting.apiDomain('POS/ForCustomer/') + id;
		},
	},
	putItem: {
		method: 'PUT',
		url: function (id) {
			return ApiSetting.apiDomain('POS/ForCustomer/') + id;
		},
	},
	postItem: {
		method: 'POST',
		url: function () {
			return ApiSetting.apiDomain('POS/ForCustomer');
		},
	},
};
APIList.PURCHASE_Quotation.approve = {
	method: 'POST',
	url: function () {
		return 'PURCHASE/Quotation/Approve';
	},
};
APIList.PURCHASE_Quotation.submitForApproval = {
	method: 'POST',
	url: function () {
		return 'PURCHASE/Quotation/SubmitForApproval';
	},
};
APIList.PURCHASE_Quotation.disapprove = {
	method: 'POST',
	url: function () {
		return 'PURCHASE/Quotation/Disapprove';
	},
};

APIList.PURCHASE_Quotation.cancel = {
	method: 'POST',
	url: function () {
		return 'PURCHASE/Quotation/Cancel';
	},
};

APIList.PURCHASE_Order.approve = {
	method: 'POST',
	url: function () {
		return 'PURCHASE/Order/Approve';
	},
};
APIList.PURCHASE_Order.submitForApproval = {
	method: 'POST',
	url: function () {
		return 'PURCHASE/Order/SubmitForApproval';
	},
};
APIList.PURCHASE_Order.disapprove = {
	method: 'POST',
	url: function () {
		return 'PURCHASE/Order/Disapprove';
	},
};

APIList.PURCHASE_Order.cancel = {
	method: 'POST',
	url: function () {
		return 'PURCHASE/Order/Cancel';
	},
};

APIList.PURCHASE_Request.approve = {
	method: 'POST',
	url: function () {
		return 'PURCHASE/Request/Approve';
	},
};
APIList.PURCHASE_Request.submitForApproval = {
	method: 'POST',
	url: function () {
		return 'PURCHASE/Request/SubmitForApproval';
	},
};
APIList.PURCHASE_Request.disapprove = {
	method: 'POST',
	url: function () {
		return 'PURCHASE/Request/Disapprove';
	},
};

APIList.PURCHASE_Request.cancel = {
	method: 'POST',
	url: function () {
		return 'PURCHASE/Request/Cancel';
	},
};

APIList.SALE_Order.approve = {
	method: 'POST',
	url: function () {
		return 'SALE/Order/Approve';
	},
};

APIList.SALE_Order.disapprove = {
	method: 'POST',
	url: function () {
		return 'SALE/Order/Disapprove';
	},
};

APIList.SALE_Order.cancel = {
	method: 'POST',
	url: function () {
		return 'SALE/Order/Cancel';
	},
};

APIList.SALE_Order.submitForApproval = {
	method: 'POST',
	url: function () {
		return 'SALE/Order/SubmitForApproval';
	},
};

APIList.CRM_Contact.submitForApproval = {
	method: 'POST',
	url: function () {
		return 'CRM/Contact/SubmitForApproval';
	},
};

APIList.CRM_Contact.approve = {
	method: 'POST',
	url: function () {
		return 'CRM/Contact/Approve';
	},
};

APIList.CRM_Contact.disapprove = {
	method: 'POST',
	url: function () {
		return 'CRM/Contact/Disapprove';
	},
};

export var GlobalData: any = {
	Filter: {
		FromDate: new Date().setDate(1),
		ToDate: new Date(),
		IDBranch: null,
	},
	IntroApp: introAppData,
	IsCordova: true,
	Token: {
		access_token: '',
		expires_in: 0,
		token_type: '',
		refresh_token: '',
	},
	WebData: {
		menu: [],
		pinPost: [],
	},
	UserData: {
		MenuItem: [],
		Setting: {
			tablePageSize: 30,
			ToastMessageDelay: 5000,
		},
	},
	Version: '',

	commonOptions: {
		timeConfigType: [
			{ code: 'Relative', name: 'Relative' },
			{ code: 'Absolute', name: 'Absolute' },
		],

		timeConfigPeriod: [
			{ code: 'Minute', name: 'Minutes' },
			{ code: 'Hour', name: 'Hours' },
			{ code: 'Day', name: 'Days' },
			{ code: 'Week', name: 'Weekss' },
			{ code: 'Month', name: 'Months' },
			{ code: 'Year', name: 'Years' },
		],

		quickPickTimeRange: [
			//Today
			{
				code: 'Today',
				name: 'Today',
				from: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Day',
					Amount: 0,
				},
				to: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Day',
					Amount: 0,
				},
			},
			//Yesterday
			{
				code: 'Yesterday',
				name: 'Yesterday',
				from: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Day',
					Amount: 1,
				},
				to: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Day',
					Amount: 1,
				},
			},
			//Last 2 days
			{
				code: 'Last2Days',
				name: 'Last 2 days',
				from: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Day',
					Amount: 2,
				},
				to: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Day',
					Amount: 0,
				},
			},
			//Last 7 days
			{
				code: 'Last7Days',
				name: 'Last 7 days',
				from: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Week',
					Amount: 1,
				},
				to: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Day',
					Amount: 0,
				},
			},
			//Last 30 days
			{
				code: 'Last30Days',
				name: 'Last 30 days',
				from: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Month',
					Amount: 1,
				},
				to: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Day',
					Amount: 0,
				},
			},
			//Last 90 days
			{
				code: 'Last90Days',
				name: 'Last 90 days',
				from: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Month',
					Amount: 3,
				},
				to: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Day',
					Amount: 0,
				},
			},
		],

		/**
		 * Timeframe is the period in which BI will examine all your data during that time frame
		 * Can use relate date like '-90' 90 days ago
		 * or absolute date linke '2023-08-01'
		 */
		timeframe: [
			{
				timeConfig: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Day',
					Amount: 0,
				},
				name: 'Today',
			},
			{
				timeConfig: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Day',
					Amount: 1,
				},
				name: 'Yesterday',
			},
			{
				timeConfig: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Day',
					Amount: 2,
				},
				name: '2 days ago',
			},
			{
				timeConfig: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Week',
					Amount: 1,
				},
				name: '1 week ago',
			},
			{
				timeConfig: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Month',
					Amount: 1,
				},
				name: '1 month ago',
			},
			{
				timeConfig: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Month',
					Amount: 3,
				},
				name: '3 months ago',
			},
		],

		/**
		 * The comparison to compare the results of the chart to a previous period
		 */
		compareTo: [
			{
				timeConfig: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Day',
					Amount: 1,
				},
				name: 'Previous day',
			},
			{
				timeConfig: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Week',
					Amount: 1,
				},
				name: 'Previous week',
			},
			{
				timeConfig: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Week',
					Amount: 2,
				},
				name: 'Previous 2 weeks',
			},
			{
				timeConfig: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Month',
					Amount: 1,
				},
				name: 'Previous month',
			},
			{
				timeConfig: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Month',
					Amount: 3,
				},
				name: 'Previous 3 months',
			},
			{
				timeConfig: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Year',
					Amount: 1,
				},
				name: 'Previous year',
			},
		],

		/**
		 * This is the time interval for the chart. This can be by hour, day, week, or month.
		 */
		interval: [
			{ code: 'Hour', name: 'Hour' },
			{ code: 'HourOfDay', name: 'Hour of Day' },
			{ code: 'Day', name: 'Day' },
			{ code: 'DayOfWeek', name: 'Day of Week' },
			{ code: 'Week', name: 'Week' },
			{ code: 'Month', name: 'Month' },
			{ code: 'Quater', name: 'Quater' },
			{ code: 'Year', name: 'Year' },
		],

		transformOperator: [
			{ code: 'TextGroup', name: 'Text', icon: '', disabled: true },
			{ code: '=', name: 'is', icon: '' },
			// { code: 'like', name: 'contains', icon: '' },
			// { code: 'Text', name: 'starts with', icon: '' },
			// { code: 'Text', name: 'ends with', icon: '' },
			// { code: 'Text', name: 'is not', icon: '' },
			// { code: 'Text', name: 'does not contain', icon: '' },
			// { code: 'Text', name: 'does not start with', icon: '' },
			// { code: 'Text', name: 'does not end with', icon: '' },
			//{ code: 'Text', name: 'matches regexp', icon: '' },

			{ code: 'NumberGroup', name: 'Number', icon: '', disabled: true },
			{ code: '=', name: 'equals', icon: '' },
			{ code: '>', name: 'greater than', icon: '' },
			{ code: '<', name: 'less than', icon: '' },
			{ code: '>=', name: 'greater than or equals', icon: '' },
			{ code: '<=', name: 'less than or equals', icon: '' },
			{ code: '<>', name: 'does not equal', icon: '' },

			{ code: 'BooleanGroup', name: 'Boolean', icon: '', disabled: true },
			{ code: '1', name: 'true', icon: '' },
			{ code: '0', name: 'false', icon: '' },
		],

		logicalOperator: [
			{ code: 'AND', name: 'AND', icon: '' },
			{ code: 'OR', name: 'OR', icon: '' },
		],

		measureMethod: [
			{ code: 'count', name: 'Count {0}', icon: '' },
			{ code: 'sum', name: 'Sum of {0}', icon: '' },
			{ code: 'max', name: 'Max of {0}', icon: '' },
			{ code: 'min', name: 'Min of {0}', icon: '' },
			{ code: 'average', name: 'Average {0}', icon: '' },
		],

		visualCategories: [
			{
				code: 'count',
				name: 'Comparison',
				remark: 'To compare the magnitude of measures',
				icon: '',
			},
			{
				code: 'count',
				name: 'Change over time',
				remark: 'To display the changing trend of measures',
				icon: '',
			},
			{
				code: 'count',
				name: 'Part-to-whole',
				remark: 'To identify the parts making up a measure total',
				icon: '',
			},
			{
				code: 'count',
				name: 'Flow',
				remark: 'To display a flow or dynamic relations',
				icon: '',
			},
			{
				code: 'count',
				name: 'Ranking',
				remark: 'To rank measures in an order',
				icon: '',
			},
			{
				code: 'count',
				name: 'Spatial',
				remark: 'To display measures over spatial maps',
				icon: '',
			},
			{
				code: 'count',
				name: 'Distribution',
				remark: 'To display the distribution of values',
				icon: '',
			},
			{
				code: 'count',
				name: 'Correlation',
				remark: 'To show correlations between measures',
				icon: '',
			},
			{
				code: 'count',
				name: 'Single',
				remark: 'To present single values',
				icon: '',
			},
			{
				code: 'count',
				name: 'Narrative',
				remark: 'To tell a story with data',
				icon: '',
			},
			{
				code: 'count',
				name: 'Filter',
				remark: 'To control report filters',
				icon: '',
			},
			{ code: 'count', name: 'Miscellaneous', remark: '', icon: '' },
		],

		hoursOfDay: Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')),
		daysOfWeek: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
		monthsOfYear: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
	},
};
