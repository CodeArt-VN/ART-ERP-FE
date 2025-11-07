import { SortConfig } from "./options-interface";

export interface PageConfig {

	[key: string]: any;
	// Basic page information
	pageCode: string;
	pageName: string;
	pageTitle: string;
	pageRemark: string;
	pageIcon: string;
	pageColor: string;

	// Page behavior flags
	isDetailPage: boolean;
	isShowMore: boolean;
	isShowSearch: boolean;
	isShowCheck: boolean;
	isShowFeature: boolean;
	infiniteScroll: boolean;
	forceLoadData: boolean;
	refresher: boolean;
	showSpinner: boolean;
	isEndOfData: boolean;
	didEnter: boolean;
	isMainPageActive: boolean;
	isSubActive: boolean;
	isFeatureAsMain: boolean;

	// Sorting and display
	sort: SortConfig[];
	dividers: Array<{
		field: string;
		dividerFn: (item: any, index: number, items: any[]) => string | null;
	}>;

	// Action buttons visibility
	ShowAdd: boolean;
	ShowSearch: boolean;
	ShowRefresh: boolean;
	ShowExport: boolean;
	ShowImport: boolean;
	ShowHelp: boolean;
	ShowFeature: boolean;

	// Advanced action buttons
	ShowCopy: boolean;
	ShowChangeBranch: boolean;
	ShowSubmit: boolean;
	ShowApprove: boolean;
	ShowDisapprove: boolean;
	ShowMerge: boolean;
	ShowSplit: boolean;
	ShowCancel: boolean;
	ShowArchive: boolean;
	ShowDelete: boolean;
	ShowPrint: boolean;

	// Permission flags
	canEdit?: boolean;
	canAdd?: boolean;
	canApprove?: boolean;
	canCancel?: boolean;
	canChangeBranch?: boolean;
	canEditHelpContent?: boolean;
	canSubmit?: boolean;
	canSubmitOrdersForApproval?: boolean;
	canSubmitSalesmanOrdersForApproval?: boolean;
	canSubmitBusinessPartnerForApproval?: boolean;
	canSubmitDealForApproval?: boolean;

	// System configuration
	systemConfig?: {
		IsAutoSave: boolean;
		SODefaultBusinessPartner?: number;
		POSSettleAtCheckout?: boolean;
		POSHideSendBarKitButton?: boolean;
		POSEnableTemporaryPayment?: boolean;
		POSEnablePrintTemporaryBill?: boolean;
		POSAutoPrintBillAtSettle?: boolean;
	};

	// Force create flag
	isForceCreate?: boolean;
}
