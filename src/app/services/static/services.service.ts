//------------------------------------------------------------------------------
// 
//    www.codeart.vn
//    hungvq@live.com
//    (+84)908.061.119
// 
//------------------------------------------------------------------------------

import { Injectable } from '@angular/core';
import { APIList } from './global-variable';
import { CommonService, exService } from '../core/common.service';
import { SearchConfig } from './search-config';


@Injectable({ providedIn: 'root' })
export class AC_APInvoiceProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.AC_APInvoice, SearchConfig.getSearchFields('AC_APInvoice'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class AC_APInvoiceDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.AC_APInvoiceDetail, SearchConfig.getSearchFields('AC_APInvoiceDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class AC_ARInvoiceProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.AC_ARInvoice, SearchConfig.getSearchFields('AC_ARInvoice'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class AC_ARInvoiceContentProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.AC_ARInvoiceContent, SearchConfig.getSearchFields('AC_ARInvoiceContent'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class AC_ARInvoiceDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.AC_ARInvoiceDetail, SearchConfig.getSearchFields('AC_ARInvoiceDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class AC_ARInvoiceSODetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.AC_ARInvoiceSODetail, SearchConfig.getSearchFields('AC_ARInvoiceSODetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class AC_CaseProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.AC_Case, SearchConfig.getSearchFields('AC_Case'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class AC_JournalEntryProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.AC_JournalEntry, SearchConfig.getSearchFields('AC_JournalEntry'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class AC_JournalEntryRowProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.AC_JournalEntryRow, SearchConfig.getSearchFields('AC_JournalEntryRow'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class AC_PeriodCategoryProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.AC_PeriodCategory, SearchConfig.getSearchFields('AC_PeriodCategory'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class AC_PostingPeriodProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.AC_PostingPeriod, SearchConfig.getSearchFields('AC_PostingPeriod'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class APPROVAL_ApprovalRuleProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.APPROVAL_ApprovalRule, SearchConfig.getSearchFields('APPROVAL_ApprovalRule'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class APPROVAL_ApprovalRuleApproverProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.APPROVAL_ApprovalRuleApprover, SearchConfig.getSearchFields('APPROVAL_ApprovalRuleApprover'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class APPROVAL_ChangelogProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.APPROVAL_Changelog, SearchConfig.getSearchFields('APPROVAL_Changelog'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class APPROVAL_CommentProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.APPROVAL_Comment, SearchConfig.getSearchFields('APPROVAL_Comment'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class APPROVAL_RequestProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.APPROVAL_Request, SearchConfig.getSearchFields('APPROVAL_Request'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class APPROVAL_RequestApproverProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.APPROVAL_RequestApprover, SearchConfig.getSearchFields('APPROVAL_RequestApprover'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class APPROVAL_TemplateProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.APPROVAL_Template, SearchConfig.getSearchFields('APPROVAL_Template'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BANK_AccountProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BANK_Account, SearchConfig.getSearchFields('BANK_Account'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BANK_IncomingPaymentProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BANK_IncomingPayment, SearchConfig.getSearchFields('BANK_IncomingPayment'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BANK_IncomingPaymentDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BANK_IncomingPaymentDetail, SearchConfig.getSearchFields('BANK_IncomingPaymentDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BANK_OutgoingPaymentProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BANK_OutgoingPayment, SearchConfig.getSearchFields('BANK_OutgoingPayment'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BANK_OutgoingPaymentDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BANK_OutgoingPaymentDetail, SearchConfig.getSearchFields('BANK_OutgoingPaymentDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BANK_PaymentTermProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BANK_PaymentTerm, SearchConfig.getSearchFields('BANK_PaymentTerm'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BANK_StatementMatchingCriteriaProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BANK_StatementMatchingCriteria, SearchConfig.getSearchFields('BANK_StatementMatchingCriteria'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BANK_TransactionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BANK_Transaction, SearchConfig.getSearchFields('BANK_Transaction'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BC_RevenueExpenditureComponentProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BC_RevenueExpenditureComponent, SearchConfig.getSearchFields('BC_RevenueExpenditureComponent'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BC_RevenueExpenditureRefCodeProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BC_RevenueExpenditureRefCode, SearchConfig.getSearchFields('BC_RevenueExpenditureRefCode'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BI_CSVDataProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BI_CSVData, SearchConfig.getSearchFields('BI_CSVData'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BI_Daily_BalanceProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BI_Daily_Balance, SearchConfig.getSearchFields('BI_Daily_Balance'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BI_Daily_DebtProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BI_Daily_Debt, SearchConfig.getSearchFields('BI_Daily_Debt'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BI_Daily_GeneralProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BI_Daily_General, SearchConfig.getSearchFields('BI_Daily_General'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BI_Daily_RevenueProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BI_Daily_Revenue, SearchConfig.getSearchFields('BI_Daily_Revenue'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BI_Daily_RevenueExpenditure1Provider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BI_Daily_RevenueExpenditure1, SearchConfig.getSearchFields('BI_Daily_RevenueExpenditure1'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BI_Daily_RevenueExpenditure2Provider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BI_Daily_RevenueExpenditure2, SearchConfig.getSearchFields('BI_Daily_RevenueExpenditure2'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BI_DashboardProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BI_Dashboard, SearchConfig.getSearchFields('BI_Dashboard'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BI_DashboardDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BI_DashboardDetail, SearchConfig.getSearchFields('BI_DashboardDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BI_Finance_BalanceSheetCategoryProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BI_Finance_BalanceSheetCategory, SearchConfig.getSearchFields('BI_Finance_BalanceSheetCategory'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BI_Finance_BalanceSheetsProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BI_Finance_BalanceSheets, SearchConfig.getSearchFields('BI_Finance_BalanceSheets'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BI_Finance_CashFlowProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BI_Finance_CashFlow, SearchConfig.getSearchFields('BI_Finance_CashFlow'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BI_Finance_IncomeStatementProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BI_Finance_IncomeStatement, SearchConfig.getSearchFields('BI_Finance_IncomeStatement'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BI_Finance_ManagementProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BI_Finance_Management, SearchConfig.getSearchFields('BI_Finance_Management'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BI_HRM_PayrollPerBranchProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BI_HRM_PayrollPerBranch, SearchConfig.getSearchFields('BI_HRM_PayrollPerBranch'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BI_Operating_MarketResearchProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BI_Operating_MarketResearch, SearchConfig.getSearchFields('BI_Operating_MarketResearch'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BI_OppotunityProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BI_Oppotunity, SearchConfig.getSearchFields('BI_Oppotunity'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BI_ReportProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BI_Report, SearchConfig.getSearchFields('BI_Report'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BI_ReportTemplateProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BI_ReportTemplate, SearchConfig.getSearchFields('BI_ReportTemplate'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BI_ReportTemplateDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BI_ReportTemplateDetail, SearchConfig.getSearchFields('BI_ReportTemplateDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BP_PartnerProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BP_Partner, SearchConfig.getSearchFields('BP_Partner'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BRA_BranchProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BRA_Branch, SearchConfig.getSearchFields('BRA_Branch'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class BSC_RevenueTargetProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.BSC_RevenueTarget, SearchConfig.getSearchFields('BSC_RevenueTarget'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_ActivityProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_Activity, SearchConfig.getSearchFields('CRM_Activity'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_AttendanceProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_Attendance, SearchConfig.getSearchFields('CRM_Attendance'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_BusinessPartnerGroupProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_BusinessPartnerGroup, SearchConfig.getSearchFields('CRM_BusinessPartnerGroup'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_CampaignProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_Campaign, SearchConfig.getSearchFields('CRM_Campaign'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_CampaignMemberProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_CampaignMember, SearchConfig.getSearchFields('CRM_CampaignMember'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_ConfigProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_Config, SearchConfig.getSearchFields('CRM_Config'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_ContactProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_Contact, SearchConfig.getSearchFields('CRM_Contact'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_ContactReferenceProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_ContactReference, SearchConfig.getSearchFields('CRM_ContactReference'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_ContractProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_Contract, SearchConfig.getSearchFields('CRM_Contract'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_CustomerProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_Customer, SearchConfig.getSearchFields('CRM_Customer'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_LeadProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_Lead, SearchConfig.getSearchFields('CRM_Lead'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_MemberCardProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_MemberCard, SearchConfig.getSearchFields('CRM_MemberCard'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_OpportunityProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_Opportunity, SearchConfig.getSearchFields('CRM_Opportunity'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_OutletsProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_Outlets, SearchConfig.getSearchFields('CRM_Outlets'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_PartnerAddressProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_PartnerAddress, SearchConfig.getSearchFields('CRM_PartnerAddress'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_PartnerBankAccountProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_PartnerBankAccount, SearchConfig.getSearchFields('CRM_PartnerBankAccount'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_PartnerTaxInfoProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_PartnerTaxInfo, SearchConfig.getSearchFields('CRM_PartnerTaxInfo'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_PersonInfoProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_PersonInfo, SearchConfig.getSearchFields('CRM_PersonInfo'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_QuotationProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_Quotation, SearchConfig.getSearchFields('CRM_Quotation'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_RouteProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_Route, SearchConfig.getSearchFields('CRM_Route'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_RouteDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_RouteDetail, SearchConfig.getSearchFields('CRM_RouteDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_VoucherProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.CRM_Voucher, SearchConfig.getSearchFields('CRM_Voucher'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class DCM_CollectionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.DCM_Collection, SearchConfig.getSearchFields('DCM_Collection'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class DCM_CollectionDataProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.DCM_CollectionData, SearchConfig.getSearchFields('DCM_CollectionData'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class DCM_CollectionDataCommentProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.DCM_CollectionDataComment, SearchConfig.getSearchFields('DCM_CollectionDataComment'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class DCM_CollectionDataLogProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.DCM_CollectionDataLog, SearchConfig.getSearchFields('DCM_CollectionDataLog'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class DCM_CommentProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.DCM_Comment, SearchConfig.getSearchFields('DCM_Comment'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class DCM_DataDictionaryProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.DCM_DataDictionary, SearchConfig.getSearchFields('DCM_DataDictionary'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class DCM_DataTypeProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.DCM_DataType, SearchConfig.getSearchFields('DCM_DataType'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class DCM_PageProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.DCM_Page, SearchConfig.getSearchFields('DCM_Page'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class DCM_ProjectProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.DCM_Project, SearchConfig.getSearchFields('DCM_Project'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class DCM_ProjectPersonProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.DCM_ProjectPerson, SearchConfig.getSearchFields('DCM_ProjectPerson'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class FINANCE_CostCenterProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.FINANCE_CostCenter, SearchConfig.getSearchFields('FINANCE_CostCenter'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class FINANCE_GeneralLedgerProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.FINANCE_GeneralLedger, SearchConfig.getSearchFields('FINANCE_GeneralLedger'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class FINANCE_TaxDefinitionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.FINANCE_TaxDefinition, SearchConfig.getSearchFields('FINANCE_TaxDefinition'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_DeductionOnSalaryProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_DeductionOnSalary, SearchConfig.getSearchFields('HRM_DeductionOnSalary'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_OpenScheduleProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_OpenSchedule, SearchConfig.getSearchFields('HRM_OpenSchedule'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_OvertimePolicyProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_OvertimePolicy, SearchConfig.getSearchFields('HRM_OvertimePolicy'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_PayrollElementProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_PayrollElement, SearchConfig.getSearchFields('HRM_PayrollElement'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_PayrollPaySheetMasterProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_PayrollPaySheetMaster, SearchConfig.getSearchFields('HRM_PayrollPaySheetMaster'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_PayrollPaySheetMasterSalaryDecisionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_PayrollPaySheetMasterSalaryDecision, SearchConfig.getSearchFields('HRM_PayrollPaySheetMasterSalaryDecision'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_PersonalIncomePaymentProcessProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_PersonalIncomePaymentProcess, SearchConfig.getSearchFields('HRM_PersonalIncomePaymentProcess'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_PolAllowanceProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_PolAllowance, SearchConfig.getSearchFields('HRM_PolAllowance'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_PolAllowanceApplyForProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_PolAllowanceApplyFor, SearchConfig.getSearchFields('HRM_PolAllowanceApplyFor'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_PolCompulsoryInsuranceProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_PolCompulsoryInsurance, SearchConfig.getSearchFields('HRM_PolCompulsoryInsurance'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_PolCompulsoryInsuranceApplyForProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_PolCompulsoryInsuranceApplyFor, SearchConfig.getSearchFields('HRM_PolCompulsoryInsuranceApplyFor'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_PolicyHolidayProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_PolicyHoliday, SearchConfig.getSearchFields('HRM_PolicyHoliday'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_PolicyPaidTimeOffProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_PolicyPaidTimeOff, SearchConfig.getSearchFields('HRM_PolicyPaidTimeOff'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_PolicyPaidTimeOffGrantsByLengthOfServicesProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_PolicyPaidTimeOffGrantsByLengthOfServices, SearchConfig.getSearchFields('HRM_PolicyPaidTimeOffGrantsByLengthOfServices'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_PolWelfareProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_PolWelfare, SearchConfig.getSearchFields('HRM_PolWelfare'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_PolWelfareApplyForProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_PolWelfareApplyFor, SearchConfig.getSearchFields('HRM_PolWelfareApplyFor'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_ShiftProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_Shift, SearchConfig.getSearchFields('HRM_Shift'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_ShiftInTimesheetProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_ShiftInTimesheet, SearchConfig.getSearchFields('HRM_ShiftInTimesheet'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_Staff, SearchConfig.getSearchFields('HRM_Staff'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_Staff_CLApprovalProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_Staff_CLApproval, SearchConfig.getSearchFields('HRM_Staff_CLApproval'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_Staff_ConcurrentPositionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_Staff_ConcurrentPosition, SearchConfig.getSearchFields('HRM_Staff_ConcurrentPosition'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffAcademicLevelProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffAcademicLevel, SearchConfig.getSearchFields('HRM_StaffAcademicLevel'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffAddressProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffAddress, SearchConfig.getSearchFields('HRM_StaffAddress'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffAllowanceProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffAllowance, SearchConfig.getSearchFields('HRM_StaffAllowance'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffAnotherSkillProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffAnotherSkill, SearchConfig.getSearchFields('HRM_StaffAnotherSkill'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffAppointDecisionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffAppointDecision, SearchConfig.getSearchFields('HRM_StaffAppointDecision'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffBankProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffBank, SearchConfig.getSearchFields('HRM_StaffBank'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffBasicInfoProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffBasicInfo, SearchConfig.getSearchFields('HRM_StaffBasicInfo'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffBounusOnSalaryProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffBounusOnSalary, SearchConfig.getSearchFields('HRM_StaffBounusOnSalary'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffCompulsoryInsuranceProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffCompulsoryInsurance, SearchConfig.getSearchFields('HRM_StaffCompulsoryInsurance'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffConcurrentPositionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffConcurrentPosition, SearchConfig.getSearchFields('HRM_StaffConcurrentPosition'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffConcurrentProbationryPositionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffConcurrentProbationryPosition, SearchConfig.getSearchFields('HRM_StaffConcurrentProbationryPosition'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffCurrentWorkingProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffCurrentWorking, SearchConfig.getSearchFields('HRM_StaffCurrentWorking'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffDeductionOnSalaryProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffDeductionOnSalary, SearchConfig.getSearchFields('HRM_StaffDeductionOnSalary'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffFamilyProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffFamily, SearchConfig.getSearchFields('HRM_StaffFamily'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffForeignLanguageProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffForeignLanguage, SearchConfig.getSearchFields('HRM_StaffForeignLanguage'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffIdentityCardAndPITProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffIdentityCardAndPIT, SearchConfig.getSearchFields('HRM_StaffIdentityCardAndPIT'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffInsurancePaymentProcessProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffInsurancePaymentProcess, SearchConfig.getSearchFields('HRM_StaffInsurancePaymentProcess'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffInternetAccountProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffInternetAccount, SearchConfig.getSearchFields('HRM_StaffInternetAccount'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffLaborContractProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffLaborContract, SearchConfig.getSearchFields('HRM_StaffLaborContract'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffLearningProcessProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffLearningProcess, SearchConfig.getSearchFields('HRM_StaffLearningProcess'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffPhoneProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffPhone, SearchConfig.getSearchFields('HRM_StaffPhone'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffPTOEnrollmentProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffPTOEnrollment, SearchConfig.getSearchFields('HRM_StaffPTOEnrollment'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffRecruitmentInfoProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffRecruitmentInfo, SearchConfig.getSearchFields('HRM_StaffRecruitmentInfo'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffResignationInfoProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffResignationInfo, SearchConfig.getSearchFields('HRM_StaffResignationInfo'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffSalaryDecisionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffSalaryDecision, SearchConfig.getSearchFields('HRM_StaffSalaryDecision'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffScheduleProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffSchedule, SearchConfig.getSearchFields('HRM_StaffSchedule'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffSpecializedFieldProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffSpecializedField, SearchConfig.getSearchFields('HRM_StaffSpecializedField'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffSpecializedSkillProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffSpecializedSkill, SearchConfig.getSearchFields('HRM_StaffSpecializedSkill'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffStaffAndFamilyJobProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffStaffAndFamilyJob, SearchConfig.getSearchFields('HRM_StaffStaffAndFamilyJob'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffTimesheetEnrollmentProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffTimesheetEnrollment, SearchConfig.getSearchFields('HRM_StaffTimesheetEnrollment'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffTrainingProcessProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffTrainingProcess, SearchConfig.getSearchFields('HRM_StaffTrainingProcess'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffTrainingProcessSkillProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffTrainingProcessSkill, SearchConfig.getSearchFields('HRM_StaffTrainingProcessSkill'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffWelfareProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffWelfare, SearchConfig.getSearchFields('HRM_StaffWelfare'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffWorkExperienceProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffWorkExperience, SearchConfig.getSearchFields('HRM_StaffWorkExperience'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_StaffWorkingDiaryProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_StaffWorkingDiary, SearchConfig.getSearchFields('HRM_StaffWorkingDiary'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_TimesheetProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_Timesheet, SearchConfig.getSearchFields('HRM_Timesheet'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_TimesheetAndHolidayProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_TimesheetAndHoliday, SearchConfig.getSearchFields('HRM_TimesheetAndHoliday'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_TimesheetCheckInCodeProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_TimesheetCheckInCode, SearchConfig.getSearchFields('HRM_TimesheetCheckInCode'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_TimesheetCycleProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_TimesheetCycle, SearchConfig.getSearchFields('HRM_TimesheetCycle'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_TimesheetCycleDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_TimesheetCycleDetail, SearchConfig.getSearchFields('HRM_TimesheetCycleDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_TimesheetFormulaProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_TimesheetFormula, SearchConfig.getSearchFields('HRM_TimesheetFormula'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class HRM_TimesheetLogProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.HRM_TimesheetLog, SearchConfig.getSearchFields('HRM_TimesheetLog'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class LIST_AddressSubdivisionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.LIST_AddressSubdivision, SearchConfig.getSearchFields('LIST_AddressSubdivision'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class LIST_BankProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.LIST_Bank, SearchConfig.getSearchFields('LIST_Bank'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class LIST_ContractTemplateProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.LIST_ContractTemplate, SearchConfig.getSearchFields('LIST_ContractTemplate'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class LIST_CountryProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.LIST_Country, SearchConfig.getSearchFields('LIST_Country'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class LIST_ElementOfSalaryProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.LIST_ElementOfSalary, SearchConfig.getSearchFields('LIST_ElementOfSalary'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class LIST_GeneralProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.LIST_General, SearchConfig.getSearchFields('LIST_General'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class LIST_PayPeriodProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.LIST_PayPeriod, SearchConfig.getSearchFields('LIST_PayPeriod'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class MR_CompetiorOrderProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.MR_CompetiorOrder, SearchConfig.getSearchFields('MR_CompetiorOrder'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class MR_TrackingCompetitorProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.MR_TrackingCompetitor, SearchConfig.getSearchFields('MR_TrackingCompetitor'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class OST_OfficeProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.OST_Office, SearchConfig.getSearchFields('OST_Office'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class OST_OfficeGateProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.OST_OfficeGate, SearchConfig.getSearchFields('OST_OfficeGate'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PM_ProjectPeopleProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PM_ProjectPeople, SearchConfig.getSearchFields('PM_ProjectPeople'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PM_SpaceProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PM_Space, SearchConfig.getSearchFields('PM_Space'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PM_SpaceStatusProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PM_SpaceStatus, SearchConfig.getSearchFields('PM_SpaceStatus'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PM_TaskProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PM_Task, SearchConfig.getSearchFields('PM_Task'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PM_TaskAssignmentProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PM_TaskAssignment, SearchConfig.getSearchFields('PM_TaskAssignment'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PM_TaskLinkProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PM_TaskLink, SearchConfig.getSearchFields('PM_TaskLink'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PM_ViewProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PM_View, SearchConfig.getSearchFields('PM_View'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PM_WorkspaceProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PM_Workspace, SearchConfig.getSearchFields('PM_Workspace'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class POS_BillTableProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.POS_BillTable, SearchConfig.getSearchFields('POS_BillTable'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class POS_CashProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.POS_Cash, SearchConfig.getSearchFields('POS_Cash'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class POS_KitchenProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.POS_Kitchen, SearchConfig.getSearchFields('POS_Kitchen'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class POS_MemberCardPromotionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.POS_MemberCardPromotion, SearchConfig.getSearchFields('POS_MemberCardPromotion'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class POS_MemoProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.POS_Memo, SearchConfig.getSearchFields('POS_Memo'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class POS_MenuProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.POS_Menu, SearchConfig.getSearchFields('POS_Menu'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class POS_MenuDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.POS_MenuDetail, SearchConfig.getSearchFields('POS_MenuDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class POS_TableProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.POS_Table, SearchConfig.getSearchFields('POS_Table'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class POS_TableGroupProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.POS_TableGroup, SearchConfig.getSearchFields('POS_TableGroup'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class POS_TableGroupStaffProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.POS_TableGroupStaff, SearchConfig.getSearchFields('POS_TableGroupStaff'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class POS_TerminalProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.POS_Terminal, SearchConfig.getSearchFields('POS_Terminal'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class POS_WorkOrderCoordinateProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.POS_WorkOrderCoordinate, SearchConfig.getSearchFields('POS_WorkOrderCoordinate'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PR_DealProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PR_Deal, SearchConfig.getSearchFields('PR_Deal'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PR_ProgramProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PR_Program, SearchConfig.getSearchFields('PR_Program'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PR_ProgramConditionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PR_ProgramCondition, SearchConfig.getSearchFields('PR_ProgramCondition'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PR_ProgramItemProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PR_ProgramItem, SearchConfig.getSearchFields('PR_ProgramItem'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PR_ProgramPartnerProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PR_ProgramPartner, SearchConfig.getSearchFields('PR_ProgramPartner'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PR_ProgramRewardProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PR_ProgramReward, SearchConfig.getSearchFields('PR_ProgramReward'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PR_PromotionTrackingProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PR_PromotionTracking, SearchConfig.getSearchFields('PR_PromotionTracking'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PROD_BillOfMaterialsProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PROD_BillOfMaterials, SearchConfig.getSearchFields('PROD_BillOfMaterials'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PROD_BillOfMaterialsDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PROD_BillOfMaterialsDetail, SearchConfig.getSearchFields('PROD_BillOfMaterialsDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PROD_ItemInVendorProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PROD_ItemInVendor, SearchConfig.getSearchFields('PROD_ItemInVendor'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PROD_MRPItemProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PROD_MRPItem, SearchConfig.getSearchFields('PROD_MRPItem'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PROD_MRPPeggingProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PROD_MRPPegging, SearchConfig.getSearchFields('PROD_MRPPegging'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PROD_MRPPreventDocumentProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PROD_MRPPreventDocument, SearchConfig.getSearchFields('PROD_MRPPreventDocument'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PROD_MRPRecommendationProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PROD_MRPRecommendation, SearchConfig.getSearchFields('PROD_MRPRecommendation'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PROD_MRPResultProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PROD_MRPResult, SearchConfig.getSearchFields('PROD_MRPResult'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PROD_MRPScenarioProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PROD_MRPScenario, SearchConfig.getSearchFields('PROD_MRPScenario'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PROD_MRPWarehouseProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PROD_MRPWarehouse, SearchConfig.getSearchFields('PROD_MRPWarehouse'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PROD_OrderProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PROD_Order, SearchConfig.getSearchFields('PROD_Order'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PROD_OrderDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PROD_OrderDetail, SearchConfig.getSearchFields('PROD_OrderDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PURCHASE_OrderProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PURCHASE_Order, SearchConfig.getSearchFields('PURCHASE_Order'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PURCHASE_OrderDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PURCHASE_OrderDetail, SearchConfig.getSearchFields('PURCHASE_OrderDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PURCHASE_QuotationProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PURCHASE_Quotation, SearchConfig.getSearchFields('PURCHASE_Quotation'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PURCHASE_QuotationDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PURCHASE_QuotationDetail, SearchConfig.getSearchFields('PURCHASE_QuotationDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PURCHASE_RequestProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PURCHASE_Request, SearchConfig.getSearchFields('PURCHASE_Request'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class PURCHASE_RequestDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.PURCHASE_RequestDetail, SearchConfig.getSearchFields('PURCHASE_RequestDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SALE_ForecastProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SALE_Forecast, SearchConfig.getSearchFields('SALE_Forecast'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SALE_ForecastDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SALE_ForecastDetail, SearchConfig.getSearchFields('SALE_ForecastDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SALE_OrderProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SALE_Order, SearchConfig.getSearchFields('SALE_Order'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SALE_OrderAdditionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SALE_OrderAddition, SearchConfig.getSearchFields('SALE_OrderAddition'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SALE_OrderDeductionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SALE_OrderDeduction, SearchConfig.getSearchFields('SALE_OrderDeduction'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SALE_OrderDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SALE_OrderDetail, SearchConfig.getSearchFields('SALE_OrderDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SALE_QuotationProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SALE_Quotation, SearchConfig.getSearchFields('SALE_Quotation'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SALE_QuotationDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SALE_QuotationDetail, SearchConfig.getSearchFields('SALE_QuotationDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SHIFT_TimeSheetProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SHIFT_TimeSheet, SearchConfig.getSearchFields('SHIFT_TimeSheet'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SHIP_ShipmentProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SHIP_Shipment, SearchConfig.getSearchFields('SHIP_Shipment'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SHIP_ShipmentDebtProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SHIP_ShipmentDebt, SearchConfig.getSearchFields('SHIP_ShipmentDebt'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SHIP_ShipmentDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SHIP_ShipmentDetail, SearchConfig.getSearchFields('SHIP_ShipmentDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SHIP_VehicleProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SHIP_Vehicle, SearchConfig.getSearchFields('SHIP_Vehicle'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_AccountGroupProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_AccountGroup, SearchConfig.getSearchFields('SYS_AccountGroup'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_ActionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_Action, SearchConfig.getSearchFields('SYS_Action'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_ActionAPIRunnerProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_ActionAPIRunner, SearchConfig.getSearchFields('SYS_ActionAPIRunner'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_APICollectionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_APICollection, SearchConfig.getSearchFields('SYS_APICollection'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_APIControllerProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_APIController, SearchConfig.getSearchFields('SYS_APIController'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_AppleAppRedemptionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_AppleAppRedemption, SearchConfig.getSearchFields('SYS_AppleAppRedemption'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_AppsProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_Apps, SearchConfig.getSearchFields('SYS_Apps'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_BranchInGroupProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_BranchInGroup, SearchConfig.getSearchFields('SYS_BranchInGroup'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_ConfigProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_Config, SearchConfig.getSearchFields('SYS_Config'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_ConfigOptionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_ConfigOption, SearchConfig.getSearchFields('SYS_ConfigOption'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_CurrencyProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_Currency, SearchConfig.getSearchFields('SYS_Currency'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_DataPermissionListProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_DataPermissionList, SearchConfig.getSearchFields('SYS_DataPermissionList'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_FormProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_Form, SearchConfig.getSearchFields('SYS_Form'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_FormGroupProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_FormGroup, SearchConfig.getSearchFields('SYS_FormGroup'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_GlobalConfigProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_GlobalConfig, SearchConfig.getSearchFields('SYS_GlobalConfig'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_IntegrationProviderProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_IntegrationProvider, SearchConfig.getSearchFields('SYS_IntegrationProvider'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_IntegrationReferenceIdentityProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_IntegrationReferenceIdentity, SearchConfig.getSearchFields('SYS_IntegrationReferenceIdentity'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_LogProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_Log, SearchConfig.getSearchFields('SYS_Log'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_MessageTemplateProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_MessageTemplate, SearchConfig.getSearchFields('SYS_MessageTemplate'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_PermissionListProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_PermissionList, SearchConfig.getSearchFields('SYS_PermissionList'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_PrinterProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_Printer, SearchConfig.getSearchFields('SYS_Printer'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_RuningNoProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_RuningNo, SearchConfig.getSearchFields('SYS_RuningNo'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_SAP_DatabasesProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_SAP_Databases, SearchConfig.getSearchFields('SYS_SAP_Databases'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_SchemaProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_Schema, SearchConfig.getSearchFields('SYS_Schema'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_SchemaDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_SchemaDetail, SearchConfig.getSearchFields('SYS_SchemaDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_StatusProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_Status, SearchConfig.getSearchFields('SYS_Status'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_SyncJobProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_SyncJob, SearchConfig.getSearchFields('SYS_SyncJob'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_TranslateProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_Translate, SearchConfig.getSearchFields('SYS_Translate'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_TriggerProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_Trigger, SearchConfig.getSearchFields('SYS_Trigger'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_TriggerActionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_TriggerAction, SearchConfig.getSearchFields('SYS_TriggerAction'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_TriggerActionConfigProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_TriggerActionConfig, SearchConfig.getSearchFields('SYS_TriggerActionConfig'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_TriggerActionDataMappingProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_TriggerActionDataMapping, SearchConfig.getSearchFields('SYS_TriggerActionDataMapping'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_TypeProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_Type, SearchConfig.getSearchFields('SYS_Type'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_UserDeviceProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_UserDevice, SearchConfig.getSearchFields('SYS_UserDevice'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_UserInGroupProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_UserInGroup, SearchConfig.getSearchFields('SYS_UserInGroup'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_UserSettingProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_UserSetting, SearchConfig.getSearchFields('SYS_UserSetting'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_UserVoiceProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_UserVoice, SearchConfig.getSearchFields('SYS_UserVoice'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class SYS_VeifyPhoneNumberProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.SYS_VeifyPhoneNumber, SearchConfig.getSearchFields('SYS_VeifyPhoneNumber'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class TRACK_LinkProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.TRACK_Link, SearchConfig.getSearchFields('TRACK_Link'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class TRACK_LinkLogProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.TRACK_LinkLog, SearchConfig.getSearchFields('TRACK_LinkLog'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class VersionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.Version, SearchConfig.getSearchFields('Version'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WEB_CategoryProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WEB_Category, SearchConfig.getSearchFields('WEB_Category'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WEB_ContentProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WEB_Content, SearchConfig.getSearchFields('WEB_Content'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WEB_Content_TagProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WEB_Content_Tag, SearchConfig.getSearchFields('WEB_Content_Tag'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WEB_ContentInCategoryProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WEB_ContentInCategory, SearchConfig.getSearchFields('WEB_ContentInCategory'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WEB_TagProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WEB_Tag, SearchConfig.getSearchFields('WEB_Tag'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_AdjustmentProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_Adjustment, SearchConfig.getSearchFields('WMS_Adjustment'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_AdjustmentDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_AdjustmentDetail, SearchConfig.getSearchFields('WMS_AdjustmentDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_AllocationStrategyProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_AllocationStrategy, SearchConfig.getSearchFields('WMS_AllocationStrategy'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_CarrierProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_Carrier, SearchConfig.getSearchFields('WMS_Carrier'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_CartonProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_Carton, SearchConfig.getSearchFields('WMS_Carton'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_CartonGroupProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_CartonGroup, SearchConfig.getSearchFields('WMS_CartonGroup'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_CycleCountProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_CycleCount, SearchConfig.getSearchFields('WMS_CycleCount'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_CycleCountDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_CycleCountDetail, SearchConfig.getSearchFields('WMS_CycleCountDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_CycleCountDeterminationProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_CycleCountDetermination, SearchConfig.getSearchFields('WMS_CycleCountDetermination'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_CycleCountDeterminationDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_CycleCountDeterminationDetail, SearchConfig.getSearchFields('WMS_CycleCountDeterminationDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_CycleCountTaskProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_CycleCountTask, SearchConfig.getSearchFields('WMS_CycleCountTask'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_CycleCountTaskDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_CycleCountTaskDetail, SearchConfig.getSearchFields('WMS_CycleCountTaskDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_ItemProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_Item, SearchConfig.getSearchFields('WMS_Item'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_ItemBalanceProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_ItemBalance, SearchConfig.getSearchFields('WMS_ItemBalance'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_ItemGroupProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_ItemGroup, SearchConfig.getSearchFields('WMS_ItemGroup'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_ItemGroupAccountInBranchProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_ItemGroupAccountInBranch, SearchConfig.getSearchFields('WMS_ItemGroupAccountInBranch'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_ItemInBranchProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_ItemInBranch, SearchConfig.getSearchFields('WMS_ItemInBranch'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_ItemInLocationProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_ItemInLocation, SearchConfig.getSearchFields('WMS_ItemInLocation'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_ItemInWarehouseConfigProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_ItemInWarehouseConfig, SearchConfig.getSearchFields('WMS_ItemInWarehouseConfig'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_ItemUoMProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_ItemUoM, SearchConfig.getSearchFields('WMS_ItemUoM'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_LicencePlateNumberProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_LicencePlateNumber, SearchConfig.getSearchFields('WMS_LicencePlateNumber'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_LocationProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_Location, SearchConfig.getSearchFields('WMS_Location'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_LotProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_Lot, SearchConfig.getSearchFields('WMS_Lot'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_LotAttributeProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_LotAttribute, SearchConfig.getSearchFields('WMS_LotAttribute'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_LotLPNLocationProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_LotLPNLocation, SearchConfig.getSearchFields('WMS_LotLPNLocation'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_OutboundOrderProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_OutboundOrder, SearchConfig.getSearchFields('WMS_OutboundOrder'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_OutboundOrderDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_OutboundOrderDetail, SearchConfig.getSearchFields('WMS_OutboundOrderDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_OutboundTagProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_OutboundTag, SearchConfig.getSearchFields('WMS_OutboundTag'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_PackingProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_Packing, SearchConfig.getSearchFields('WMS_Packing'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_PackingDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_PackingDetail, SearchConfig.getSearchFields('WMS_PackingDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_PickingProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_Picking, SearchConfig.getSearchFields('WMS_Picking'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_PickingDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_PickingDetail, SearchConfig.getSearchFields('WMS_PickingDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_PriceListProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_PriceList, SearchConfig.getSearchFields('WMS_PriceList'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_PriceListDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_PriceListDetail, SearchConfig.getSearchFields('WMS_PriceListDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_PriceListVersionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_PriceListVersion, SearchConfig.getSearchFields('WMS_PriceListVersion'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_PriceListVersionDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_PriceListVersionDetail, SearchConfig.getSearchFields('WMS_PriceListVersionDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_PutawayStrategyProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_PutawayStrategy, SearchConfig.getSearchFields('WMS_PutawayStrategy'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_PutawayStrategyDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_PutawayStrategyDetail, SearchConfig.getSearchFields('WMS_PutawayStrategyDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_ReceiptProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_Receipt, SearchConfig.getSearchFields('WMS_Receipt'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_ReceiptDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_ReceiptDetail, SearchConfig.getSearchFields('WMS_ReceiptDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_ReceiptPalletizationProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_ReceiptPalletization, SearchConfig.getSearchFields('WMS_ReceiptPalletization'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_ShippingProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_Shipping, SearchConfig.getSearchFields('WMS_Shipping'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_ShippingDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_ShippingDetail, SearchConfig.getSearchFields('WMS_ShippingDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_StorerProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_Storer, SearchConfig.getSearchFields('WMS_Storer'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_StorerConfigProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_StorerConfig, SearchConfig.getSearchFields('WMS_StorerConfig'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_TaskDispatchStrategyProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_TaskDispatchStrategy, SearchConfig.getSearchFields('WMS_TaskDispatchStrategy'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_TaskDispatchStrategyDetailProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_TaskDispatchStrategyDetail, SearchConfig.getSearchFields('WMS_TaskDispatchStrategyDetail'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_TransactionProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_Transaction, SearchConfig.getSearchFields('WMS_Transaction'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_UoMProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_UoM, SearchConfig.getSearchFields('WMS_UoM'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_UoMGroupProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_UoMGroup, SearchConfig.getSearchFields('WMS_UoMGroup'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_VendorProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_Vendor, SearchConfig.getSearchFields('WMS_Vendor'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_WarehouseInfoProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_WarehouseInfo, SearchConfig.getSearchFields('WMS_WarehouseInfo'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_WavePlanningProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_WavePlanning, SearchConfig.getSearchFields('WMS_WavePlanning'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_ZoneProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.WMS_Zone, SearchConfig.getSearchFields('WMS_Zone'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class vw_SYS_LogProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.vw_SYS_Log, SearchConfig.getSearchFields('vw_SYS_Log'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class vw_SYS_SyncJobProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.vw_SYS_SyncJob, SearchConfig.getSearchFields('vw_SYS_SyncJob'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class vw_SYS_TrackingProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.vw_SYS_Tracking, SearchConfig.getSearchFields('vw_SYS_Tracking'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class vw_WMS_LotLocLPNProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.vw_WMS_LotLocLPN, SearchConfig.getSearchFields('vw_WMS_LotLocLPN'), commonService);
	}
}

//import { AC_APInvoiceProvider, AC_APInvoiceDetailProvider, AC_ARInvoiceProvider, AC_ARInvoiceContentProvider, AC_ARInvoiceDetailProvider, AC_ARInvoiceSODetailProvider, AC_CaseProvider, AC_JournalEntryProvider, AC_JournalEntryRowProvider, AC_PeriodCategoryProvider, AC_PostingPeriodProvider, APPROVAL_ApprovalRuleProvider, APPROVAL_ApprovalRuleApproverProvider, APPROVAL_ChangelogProvider, APPROVAL_CommentProvider, APPROVAL_RequestProvider, APPROVAL_RequestApproverProvider, APPROVAL_TemplateProvider, BANK_AccountProvider, BANK_IncomingPaymentProvider, BANK_IncomingPaymentDetailProvider, BANK_OutgoingPaymentProvider, BANK_OutgoingPaymentDetailProvider, BANK_PaymentTermProvider, BANK_StatementMatchingCriteriaProvider, BANK_TransactionProvider, BC_RevenueExpenditureComponentProvider, BC_RevenueExpenditureRefCodeProvider, BI_CSVDataProvider, BI_Daily_BalanceProvider, BI_Daily_DebtProvider, BI_Daily_GeneralProvider, BI_Daily_RevenueProvider, BI_Daily_RevenueExpenditure1Provider, BI_Daily_RevenueExpenditure2Provider, BI_DashboardProvider, BI_DashboardDetailProvider, BI_Finance_BalanceSheetCategoryProvider, BI_Finance_BalanceSheetsProvider, BI_Finance_CashFlowProvider, BI_Finance_IncomeStatementProvider, BI_Finance_ManagementProvider, BI_HRM_PayrollPerBranchProvider, BI_Operating_MarketResearchProvider, BI_OppotunityProvider, BI_ReportProvider, BI_ReportTemplateProvider, BI_ReportTemplateDetailProvider, BP_PartnerProvider, BRA_BranchProvider, BSC_RevenueTargetProvider, CRM_ActivityProvider, CRM_AttendanceProvider, CRM_BusinessPartnerGroupProvider, CRM_CampaignProvider, CRM_CampaignMemberProvider, CRM_ConfigProvider, CRM_ContactProvider, CRM_ContactReferenceProvider, CRM_ContractProvider, CRM_CustomerProvider, CRM_LeadProvider, CRM_MemberCardProvider, CRM_OpportunityProvider, CRM_OutletsProvider, CRM_PartnerAddressProvider, CRM_PartnerBankAccountProvider, CRM_PartnerTaxInfoProvider, CRM_PersonInfoProvider, CRM_QuotationProvider, CRM_RouteProvider, CRM_RouteDetailProvider, CRM_VoucherProvider, DCM_CollectionProvider, DCM_CollectionDataProvider, DCM_CollectionDataCommentProvider, DCM_CollectionDataLogProvider, DCM_CommentProvider, DCM_DataDictionaryProvider, DCM_DataTypeProvider, DCM_PageProvider, DCM_ProjectProvider, DCM_ProjectPersonProvider, FINANCE_CostCenterProvider, FINANCE_GeneralLedgerProvider, FINANCE_TaxDefinitionProvider, HRM_DeductionOnSalaryProvider, HRM_OpenScheduleProvider, HRM_OvertimePolicyProvider, HRM_PayrollElementProvider, HRM_PayrollPaySheetMasterProvider, HRM_PayrollPaySheetMasterSalaryDecisionProvider, HRM_PersonalIncomePaymentProcessProvider, HRM_PolAllowanceProvider, HRM_PolAllowanceApplyForProvider, HRM_PolCompulsoryInsuranceProvider, HRM_PolCompulsoryInsuranceApplyForProvider, HRM_PolicyHolidayProvider, HRM_PolicyPaidTimeOffProvider, HRM_PolicyPaidTimeOffGrantsByLengthOfServicesProvider, HRM_PolWelfareProvider, HRM_PolWelfareApplyForProvider, HRM_ShiftProvider, HRM_ShiftInTimesheetProvider, HRM_StaffProvider, HRM_Staff_CLApprovalProvider, HRM_Staff_ConcurrentPositionProvider, HRM_StaffAcademicLevelProvider, HRM_StaffAddressProvider, HRM_StaffAllowanceProvider, HRM_StaffAnotherSkillProvider, HRM_StaffAppointDecisionProvider, HRM_StaffBankProvider, HRM_StaffBasicInfoProvider, HRM_StaffBounusOnSalaryProvider, HRM_StaffCompulsoryInsuranceProvider, HRM_StaffConcurrentPositionProvider, HRM_StaffConcurrentProbationryPositionProvider, HRM_StaffCurrentWorkingProvider, HRM_StaffDeductionOnSalaryProvider, HRM_StaffFamilyProvider, HRM_StaffForeignLanguageProvider, HRM_StaffIdentityCardAndPITProvider, HRM_StaffInsurancePaymentProcessProvider, HRM_StaffInternetAccountProvider, HRM_StaffLaborContractProvider, HRM_StaffLearningProcessProvider, HRM_StaffPhoneProvider, HRM_StaffPTOEnrollmentProvider, HRM_StaffRecruitmentInfoProvider, HRM_StaffResignationInfoProvider, HRM_StaffSalaryDecisionProvider, HRM_StaffScheduleProvider, HRM_StaffSpecializedFieldProvider, HRM_StaffSpecializedSkillProvider, HRM_StaffStaffAndFamilyJobProvider, HRM_StaffTimesheetEnrollmentProvider, HRM_StaffTrainingProcessProvider, HRM_StaffTrainingProcessSkillProvider, HRM_StaffWelfareProvider, HRM_StaffWorkExperienceProvider, HRM_StaffWorkingDiaryProvider, HRM_TimesheetProvider, HRM_TimesheetAndHolidayProvider, HRM_TimesheetCheckInCodeProvider, HRM_TimesheetCycleProvider, HRM_TimesheetCycleDetailProvider, HRM_TimesheetFormulaProvider, HRM_TimesheetLogProvider, LIST_AddressSubdivisionProvider, LIST_BankProvider, LIST_ContractTemplateProvider, LIST_CountryProvider, LIST_ElementOfSalaryProvider, LIST_GeneralProvider, LIST_PayPeriodProvider, MR_CompetiorOrderProvider, MR_TrackingCompetitorProvider, OST_OfficeProvider, OST_OfficeGateProvider, PM_ProjectPeopleProvider, PM_SpaceProvider, PM_SpaceStatusProvider, PM_TaskProvider, PM_TaskAssignmentProvider, PM_TaskLinkProvider, PM_ViewProvider, PM_WorkspaceProvider, POS_BillTableProvider, POS_CashProvider, POS_KitchenProvider, POS_MemberCardPromotionProvider, POS_MemoProvider, POS_MenuProvider, POS_MenuDetailProvider, POS_TableProvider, POS_TableGroupProvider, POS_TableGroupStaffProvider, POS_TerminalProvider, POS_WorkOrderCoordinateProvider, PR_DealProvider, PR_ProgramProvider, PR_ProgramConditionProvider, PR_ProgramItemProvider, PR_ProgramPartnerProvider, PR_ProgramRewardProvider, PR_PromotionTrackingProvider, PROD_BillOfMaterialsProvider, PROD_BillOfMaterialsDetailProvider, PROD_ItemInVendorProvider, PROD_MRPItemProvider, PROD_MRPPeggingProvider, PROD_MRPPreventDocumentProvider, PROD_MRPRecommendationProvider, PROD_MRPResultProvider, PROD_MRPScenarioProvider, PROD_MRPWarehouseProvider, PROD_OrderProvider, PROD_OrderDetailProvider, PURCHASE_OrderProvider, PURCHASE_OrderDetailProvider, PURCHASE_QuotationProvider, PURCHASE_QuotationDetailProvider, PURCHASE_RequestProvider, PURCHASE_RequestDetailProvider, SALE_ForecastProvider, SALE_ForecastDetailProvider, SALE_OrderProvider, SALE_OrderAdditionProvider, SALE_OrderDeductionProvider, SALE_OrderDetailProvider, SALE_QuotationProvider, SALE_QuotationDetailProvider, SHIFT_TimeSheetProvider, SHIP_ShipmentProvider, SHIP_ShipmentDebtProvider, SHIP_ShipmentDetailProvider, SHIP_VehicleProvider, SYS_AccountGroupProvider, SYS_ActionProvider, SYS_ActionAPIRunnerProvider, SYS_APICollectionProvider, SYS_APIControllerProvider, SYS_AppleAppRedemptionProvider, SYS_AppsProvider, SYS_BranchInGroupProvider, SYS_ConfigProvider, SYS_ConfigOptionProvider, SYS_CurrencyProvider, SYS_DataPermissionListProvider, SYS_FormProvider, SYS_FormGroupProvider, SYS_GlobalConfigProvider, SYS_IntegrationProviderProvider, SYS_IntegrationReferenceIdentityProvider, SYS_LogProvider, SYS_MessageTemplateProvider, SYS_PermissionListProvider, SYS_PrinterProvider, SYS_RuningNoProvider, SYS_SAP_DatabasesProvider, SYS_SchemaProvider, SYS_SchemaDetailProvider, SYS_StatusProvider, SYS_SyncJobProvider, SYS_TranslateProvider, SYS_TriggerProvider, SYS_TriggerActionProvider, SYS_TriggerActionConfigProvider, SYS_TriggerActionDataMappingProvider, SYS_TypeProvider, SYS_UserDeviceProvider, SYS_UserInGroupProvider, SYS_UserSettingProvider, SYS_UserVoiceProvider, SYS_VeifyPhoneNumberProvider, TRACK_LinkProvider, TRACK_LinkLogProvider, VersionProvider, WEB_CategoryProvider, WEB_ContentProvider, WEB_Content_TagProvider, WEB_ContentInCategoryProvider, WEB_TagProvider, WMS_AdjustmentProvider, WMS_AdjustmentDetailProvider, WMS_AllocationStrategyProvider, WMS_CarrierProvider, WMS_CartonProvider, WMS_CartonGroupProvider, WMS_CycleCountProvider, WMS_CycleCountDetailProvider, WMS_CycleCountDeterminationProvider, WMS_CycleCountDeterminationDetailProvider, WMS_CycleCountTaskProvider, WMS_CycleCountTaskDetailProvider, WMS_ItemProvider, WMS_ItemBalanceProvider, WMS_ItemGroupProvider, WMS_ItemGroupAccountInBranchProvider, WMS_ItemInBranchProvider, WMS_ItemInLocationProvider, WMS_ItemInWarehouseConfigProvider, WMS_ItemUoMProvider, WMS_LicencePlateNumberProvider, WMS_LocationProvider, WMS_LotProvider, WMS_LotAttributeProvider, WMS_LotLPNLocationProvider, WMS_OutboundOrderProvider, WMS_OutboundOrderDetailProvider, WMS_OutboundTagProvider, WMS_PackingProvider, WMS_PackingDetailProvider, WMS_PickingProvider, WMS_PickingDetailProvider, WMS_PriceListProvider, WMS_PriceListDetailProvider, WMS_PriceListVersionProvider, WMS_PriceListVersionDetailProvider, WMS_PutawayStrategyProvider, WMS_PutawayStrategyDetailProvider, WMS_ReceiptProvider, WMS_ReceiptDetailProvider, WMS_ReceiptPalletizationProvider, WMS_ShippingProvider, WMS_ShippingDetailProvider, WMS_StorerProvider, WMS_StorerConfigProvider, WMS_TaskDispatchStrategyProvider, WMS_TaskDispatchStrategyDetailProvider, WMS_TransactionProvider, WMS_UoMProvider, WMS_UoMGroupProvider, WMS_VendorProvider, WMS_WarehouseInfoProvider, WMS_WavePlanningProvider, WMS_ZoneProvider, vw_SYS_LogProvider, vw_SYS_SyncJobProvider, vw_SYS_TrackingProvider, vw_WMS_LotLocLPNProvider, } from './services/static/services.service';




