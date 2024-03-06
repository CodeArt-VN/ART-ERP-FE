//------------------------------------------------------------------------------
//
//    www.codeart.vn
//    hungvq@live.com
//    (+84)908.061.119
//
//------------------------------------------------------------------------------

export interface AspNetRoles {
  Id: string;
  Name: string;
}

export interface AspNetUserClaims {
  Id: number;
  UserId: string;
  ClaimType: string;
  ClaimValue: string;
}

export interface AspNetUserLogins {
  LoginProvider: string;
  ProviderKey: string;
  UserId: string;
}

export interface AspNetUsers {
  Id: string;
  Email: string;
  EmailConfirmed: boolean;
  PasswordHash: string;
  SecurityStamp: string;
  PhoneNumber: string;
  PhoneNumberConfirmed: boolean;
  TwoFactorEnabled: boolean;
  LockoutEndDateUtc: Date;
  LockoutEnabled: boolean;
  AccessFailedCount: number;
  UserName: string;
  CreatedDate: Date;
  CreatedBy: string;
  Avatar: string;
  Fullname: string;
  DOB: string;
  StaffID: number;
  CustomerId: number;
  IDBranch: number;
}

export interface sysdiagrams {
  name: string;
  principal_id: number;
  diagram_id: number;
  version: number;
  definition: any; //byte[];
}

export interface AC_ARInvoice {
  IDBranch: number;
  IDBusinessPartner: number;
  IDSaleOrder: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Status: number;
  Type: number;
  InvoiceDate: Date;
  BuyerName: string;
  BuyerTaxCode: string;
  BuyerUnitName: string;
  BuyerAddress: string;
  BuyerBankAccount: string;
  PaymentMethod: string;
  ReceiveType: string;
  ReceiverEmail: string;
  ReceiverMobile: string;
  ReceiverAddress: string;
  ReceiverName: string;
  UserDefine: string;
  BillCode: string;
  Currency: string;
  ExchangeRate: number;
  InvoiceGUID: string;
  InvoiceForm: string;
  InvoiceSerial: string;
  InvoiceNo: string;
  InvoiceCode: string;
  SignedDate: Date;
  TypeCreateInvoice: string;
  OriginalInvoiceIdentify: string;
  IsCanceled: boolean;
  TotalBeforeDiscount: number;
  TotalDiscount: number;
  TotalAfterDiscount: number;
  Tax: number;
  TotalAfterTax: number;
}

export interface AC_ARInvoiceDetail {
  IDARInvoice: number;
  IDOrder: number;
  IDItem: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  ItemType: string;
  ItemName: string;
  UnitName: string;
  IDUoM: number;
  IDBaseUoM: number;
  UoMSwapAlter: number;
  UoMSwap: number;
  Quantity: number;
  BaseQuantity: number;
  UoMPrice: number;
  IsPromotionItem: boolean;
  TotalBeforeDiscount: number;
  TotalDiscount: number;
  TotalAfterDiscount: number;
  IDTax: number;
  TaxRate: number;
  Tax: number;
  TotalAfterTax: number;
  UserDefineDetails: string;
}

export interface AC_JournalEntry {
  IDBranch: number;
  Id: number;
  RefID: number;
  Code: string;
  Name: string;
  ForeignName: string;
  Remark: string;
  ForeignRemark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  OriginalJournalType: number;
  RefBase: number;
  Total: number;
  DueDate: Date;
  DocumentDate: Date;
  PostingPeriod: number;
  DataSource: number;
}

export interface AC_JournalEntryRow {
  IDBranch: number;
  Id: number;
  IDTransaction: number;
  RefTransaction: number;
  Line: number;
  Account: number;
  AccountCode: string;
  Debit: number;
  Credit: number;
  DueDate: Date;
  IDAccount: number;
  RefAccountCode: string;
  OffsetAccount: number;
  RefOffsetAccount: string;
  RefCFTId: number;
  RefCFWId: number;
  Remark: string;
  DocumentDate: Date;
  PostingPeriod: number;
  DistributionRule: string;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface AC_PostingPeriod {
  IDBranch: number;
  Id: number;
  RefID: number;
  Code: string;
  Name: string;
  ForeignName: string;
  FromDate: Date;
  ToDate: Date;
  Remark: string;
  ForeignRemark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface APPROVAL_Changelog {
  IDRequest: number;
  IDApprover: number;
  Status: string;
  Id: number;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface APPROVAL_Comment {
  IDStaff: number;
  IDRequest: number;
  ID: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface APPROVAL_Request {
  IDBranch: number;
  IDStaff: number;
  Id: number;
  Type: string;
  Status: string;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  FileURL: string;
  ApproverBy: string;
  AmountNo: number;
  Amount: string;
  Reason: string;
  DueDate: Date;
  ReceivedBy: string;
  HandingOverWork: string;
  Debator: string;
  DebatorDepartment: string;
  CurrentJobTitle: string;
  DebateJobTitle: string;
  Item: string;
  Quantity: number;
  Participant: string;
  Requirement: string;
  StartFrom: string;
  EndTo: string;
  ItemStatus: string;
  CurrentAmount: number;
  DesireAmount: number;
  Employee: string;
  FromDate: Date;
  ToDate: Date;
  UDF01: number;
  UDF02: number;
  UDF03: number;
  UDF04: number;
  UDF05: number;
  UDF06: Date;
  UDF07: Date;
  UDF08: Date;
  UDF09: string;
  UDF10: string;
  UDF11: string;
  UDF12: string;
  UDF13: string;
  UDF14: string;
  UDF15: string;
  UDF16: string;
  UDF17: number;
  UDF18: number;
  UDF19: number;
  UDF20: number;
  UDF21: number;
  UDF22: number;
}

export interface BANK_IncomingPayment {
  IDJournalEntry: number;
  IDBranch: number;
  IDStaff: number;
  IDCustomer: number;
  IDType: number;
  Id: number;
  Code: string;
  Name: string;
  ForeignName: string;
  Remark: string;
  ForeignRemark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Amount: number;
  IsCanceled: boolean;
  IsPrinted: boolean;
  PostingDate: Date;
  DueDate: Date;
  DocumentDate: Date;
}

export interface BANK_IncomingPaymentDetail {
  IDBranch: number;
  IDCustomer: number;
  IDIncomingPayment: number;
  IDSaleOrder: number;
  IDContract: number;
  IDInvoice: number;
  Id: number;
  Code: string;
  Name: string;
  ForeignName: string;
  Remark: string;
  ForeignRemark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Amount: number;
}

export interface BANK_PaymentTerm {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  DueDateBasedOn: string;
  StartFrom: string;
  NumberOfAdditionalMonths: number;
  NumberOfAdditionalDays: number;
  ToleranceDays: number;
  NumberOfInstallments: number;
  FirstPartialPayment: number;
  OpenIncomingPayment: string;
  IDPriceList: number;
}

export interface BC_RevenueExpenditureComponent {
  IDParent: number;
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  ForeignName: string;
  Remark: string;
  ForeignRemark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IsRevenue: boolean;
  Type: string;
  IsDividedByWeeks: boolean;
  IDAccount: number;
  AccountCode: string;
  CostCenter: string;
}

export interface BC_RevenueExpenditureRefCode {
  IDBranch: number;
  IDRevenueExpenditureComponent: number;
  Id: number;
  Code: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface BI_Finance_BalanceSheetCategory {
  IDBranch: number;
  IDParent: number;
  Id: number;
  N0: string;
  N1: string;
  Code: string;
  Level: number;
  Account: string;
  Name: string;
  ForeignName: string;
  Remark: string;
  ForeignRemark: string;
  Sort: number;
  IsTitle: boolean;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface BI_Finance_BalanceSheets {
  IDBranch: number;
  BalanceCateCode: string;
  Id: number;
  Frequency: number;
  Day: number;
  Month: number;
  Year: number;
  Amount: number;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface BI_Finance_CashFlow {
  IDBranch: number;
  IDCashFlowComponent: number;
  Id: number;
  Frequency: number;
  Day: number;
  Month: number;
  Year: number;
  Amount: number;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface BI_Finance_IncomeStatement {
  IDBranch: number;
  IDIncomeComponent: number;
  Id: number;
  Frequency: number;
  Day: number;
  Month: number;
  Year: number;
  Amount: number;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface BI_Finance_Management {
  IDBranch: number;
  IDPnLComponent: number;
  Id: number;
  Frequency: number;
  Day: number;
  Month: number;
  Year: number;
  Amount: number;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Percentage: number;
}

export interface BI_Operating_MarketResearch {
  IDAccount: number;
  IDService: number;
  IDProductType: number;
  Id: number;
  Frequency: number;
  Day: number;
  Month: number;
  Quarter: number;
  Year: number;
  NumberOfEvent: number;
  NumberOfGuests: number;
  Revenue: number;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface BI_Oppotunity {
  IDBranch: number;
  Id: number;
  Frequency: number;
  Day: number;
  Month: number;
  Quarter: number;
  Year: number;
  NumberOfEvent: number;
  NumberOfGuests: number;
  Revenue: number;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface BI_ReportTemplate {
  Id: number;
  Type: string;
  Code: string;
  Name: string;
  ForeignName: string;
  Remark: string;
  ForeignRemark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface BI_ReportTemplateDetail {
  IDTemplate: number;
  IDParent: number;
  Id: number;
  Code: string;
  Name: string;
  ForeignName: string;
  Remark: string;
  ForeignRemark: string;
  AccountCode: string;
  OffsetAccountCode: string;
  CostCenter: string;
  CostCenter2: string;
  ItemGroupCode: string;
  ItemCode: string;
  CashFlowID: number;
  IsDividedByWeeks: boolean;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Formula: string;
}

export interface BP_Partner {
  IDParent: number;
  Id: number;
  Code: string;
  Name: string;
  ForeignName: string;
  Remark: string;
  ForeignRemark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface BRA_Branch {
  IDType: number;
  IDParent: number;
  IDAdministrationManager: number;
  IDSpecializedManagement: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  BusinessRegistrationNumber: string;
  IssueDate: Date;
  IssuedBy: string;
  TaxCode: string;
  Website: string;
  Email: string;
  Fax: string;
  Phone: string;
  Phone2: string;
  Address: string;
  BankAccount: string;
  TemplateHeader: string;
  TemplateFooter: string;
  TemplateConfig: string;
  LogoURL: string;
  BannerURL: string;
  ImageURL: string;
  BackgroundColor: string;
  IsHeadOfDepartment: boolean;
  VuViec: string;
  IDPartner: number;
  ShortName: string;
  Type: string;
}

export interface BSC_RevenueTarget {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Value: number;
  Year: number;
  Month: number;
  IDSalesTeam: number;
}

export interface CRM_Activity {
  IDLead: number;
  IDOpportunity: number;
  IDContact: number;
  IDBranch: number;
  Id: number;
  Code: string;
  Type: number;
  Name: string;
  Remark: string;
  DueDate: Date;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface CRM_Attendance {
  Id: number;
  PartyDate: Date;
  CustomerName: string;
  Email: string;
  DOB: Date;
  LunchPax: number;
  DinnerPax: number;
  RealField: number;
  Kids: number;
  RegisteredTable: string;
  TypeOfParty: string;
  BillingInformation: string;
  Status: string;
  DiningCard: string;
  Arrivaled: number;
  CustomerType: string;
  Phone: string;
  NoRecords: number;
  ForeignerNo: number;
  TableOfLunch: string;
  TimeOfParty: string;
  CustomerGroup: string;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface CRM_BusinessPartnerGroup {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDGroupType: number;
  IsLocked: boolean;
  IDPriceList: number;
  IDEffectiveDiscount: number;
}

export interface CRM_Campaign {
  IDOwner: number;
  IDStatus: number;
  IDType: number;
  IDParent: number;
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  StartDate: Date;
  EndDate: Date;
  NumSent: number;
  ExpectedResponse: number;
  ExpectedRevenue: number;
  BudgetedCost: number;
  ActualCost: number;
  IsActive: boolean;
  HierarchyActualCost: number;
  HierarchyBudgetedCost: number;
  NumberOfContacts: number;
  HierarchyNumberOfContacts: number;
  NumberOfConvertedLeads: number;
  HierarchyNumberOfConvertedLeads: number;
  HierarchyExpectedRevenue: number;
  NumberOfLeads: number;
  HierarchyNumberOfLeads: number;
  HierarchyNumberSent: number;
  NumberOfOpportunities: number;
  HierarchyNumberOfOpportunities: number;
  NumberOfResponses: number;
  HierarchyNumberOfResponses: number;
  AmountAllOpportunities: number;
  HierarchyAmountAllOpportunities: number;
  AmountWonOpportunities: number;
  HierarchyAmountWonOpportunities: number;
  NumberOfWonOpportunities: number;
  HierarchyNumberOfWonOpportunities: number;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface CRM_CampaignMember {
  IDCampaign: number;
  IDLead: number;
  IDContact: number;
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface CRM_Config {
  IDBranch: number;
  IDParent: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IsSysAttrib: boolean;
  Value: string;
  IsDefault: boolean;
}

export interface CRM_Contact {
  IDBranch: number;
  IDIndividual: number;
  IDSource: number;
  IDSector: number;
  IDIndustry: number;
  IDRating: number;
  IDOwner: number;
  IDParent: number;
  Id: number;
  Code: string;
  Title: string;
  Name: string;
  CompanyName: string;
  TaxCode: string;
  Fax: string;
  Website: string;
  BillingAddress: string;
  NumberOfEmployees: number;
  AnnualRevenue: number;
  Remark: string;
  IsPersonal: boolean;
  IDPriceListForVendor: number;
  WorkPhone: string;
  OtherPhone: string;
  DoNotCall: boolean;
  Email: string;
  HasOptedOutOfEmail: boolean;
  IDPaymentTermForVendor: number;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IsStaff: boolean;
  IsCustomer: boolean;
  IsVendor: boolean;
  IsBranch: boolean;
  IsWholeSale: boolean;
  IDBusinessPartnerGroup: number;
  IDPriceList: number;
  IDPaymentTerm: number;
  IsDistributor: boolean;
  IsStorer: boolean;
  IsCarrier: boolean;
  IsOutlets: boolean;
  RefId: number;
}

export interface CRM_ContactReference {
  Id: number;
  IDContact: number;
  IDVendor: number;
  Code: string;
  IsDeleted: boolean;
}

export interface CRM_Contract {
  IDContact: number;
  IDOpportunity: number;
  IDBranch: number;
  Id: number;
  Code: string;
  RefContractID: number;
  Name: string;
  ContractDate: Date;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDQuotation: number;
  EventDate: Date;
  NumberOfGuests: number;
}

export interface CRM_Customer {
  IDContact: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IsWholeSale: boolean;
}

export interface CRM_Lead {
  IDCampaign: number;
  IDOwner: number;
  IDStatus: number;
  IDRating: number;
  IDSource: number;
  IDIndustry: number;
  IDSector: number;
  IDCountry: number;
  IDCity: number;
  IDProvince: number;
  IDBranch: number;
  Id: number;
  Code: string;
  Individual: string;
  Name: string;
  FirstName: string;
  LastName: string;
  Company: string;
  Title: string;
  Remark: string;
  Address: string;
  Street: string;
  ZipCode: string;
  AnnualRevenue: number;
  Email: string;
  HasOptedOutOfEmail: boolean;
  Phone: string;
  MobilePhone: string;
  DoNotCall: boolean;
  Fax: string;
  HasOptedOutOfFax: boolean;
  NumberOfEmployees: number;
  Website: string;
  LastTransferDate: Date;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface CRM_MemberCard {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
  Level: number;
  Amount: number;
}

export interface CRM_Opportunity {
  IDLead: number;
  IDContact: number;
  IDSource: number;
  IDStage: number;
  IDType: number;
  IDOwner: number;
  IDCampaign: number;
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Amount: number;
  StartDate: Date;
  EventDate: Date;
  PredictedClosingDate: Date;
  ClosedDate: Date;
  ExpectedRevenue: number;
  NextStep: string;
  IsPrivate: boolean;
  Probability: number;
  TotalOpportunityQuantity: number;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  NumberOfGuests: number;
  RefID: number;
  RefContactID: number;
  RefSourceID: number;
  RefOwnerID: number;
  RefAccountCode: string;
}

export interface CRM_Outlets {
  Id: number;
  Type: string;
  Location: string;
  BusinessType: string;
  PopulationDistribution: string;
  CustomersAccess: string;
  Display: string;
  MainRouteId: number;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Name: string;
}

export interface CRM_PartnerAddress {
  IDPartner: number;
  Id: number;
  Country: string;
  Province: string;
  District: string;
  Ward: string;
  AddressLine1: string;
  AddressLine2: string;
  ZipCode: string;
  Lat: string;
  Long: string;
  Remark: string;
  Contact: string;
  Phone1: string;
  Phone2: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Name: string;
}

export interface CRM_PartnerBankAccount {
  IDPartner: number;
  Id: number;
  AccountNo: string;
  BankName: string;
  Beneficiary: string;
  BankBranch: string;
}

export interface CRM_PersonInfo {
  Id: number;
  FullName: string;
  FirstName: string;
  LastName: string;
  Gender: boolean;
  DateOfBirth: Date;
  PlaceOfBirth: string;
  PlaceOfOrigin: string;
  IdentityCardNumber: string;
  DateOfIssue: Date;
  PlaceOfIssue: string;
  DateOfExpiration: Date;
  Nationality: string;
  Ethnic: string;
  Religion: string;
  MaritalStatus: string;
  MobilePhone: string;
  HomePhone: string;
  Email: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Name: string;
}

export interface CRM_Quotation {
  IDContact: number;
  IDOpportunity: number;
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface CRM_Route {
  IDBranch: number;
  IDSeller: number;
  IDParent: number;
  IDVehicle: number;
  IDVehicleForSample: number;
  IDVehicleForUrgent: number;
  IDVehicleForWholeSale: number;
  IDShipper: number;
  IDWarehouse: number;
  Id: number;
  Code: string;
  Name: string;
  StartDate: Date;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  EndDate: Date;
}

export interface CRM_RouteDetail {
  IDRoute: number;
  IDContact: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Week1: boolean;
  Week2: boolean;
  Week3: boolean;
  Week4: boolean;
  Monday: boolean;
  Tuesday: boolean;
  Wednesday: boolean;
  Thursday: boolean;
  Friday: boolean;
  Saturday: boolean;
  Sunday: boolean;
  Frequency: number;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface CRM_Voucher {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
  Amount: number;
  IsMileage: boolean;
  CreditCard: number;
  CreditAccount: string;
}

export interface FINANCE_GeneralLedger {
  IDBranch: number;
  IDParent: number;
  RefParentCode: string;
  Id: number;
  Code: string;
  Name: string;
  ForeignName: string;
  Remark: string;
  ForeignRemark: string;
  ExternalCode: string;
  IsActiveAccount: boolean;
  CurrentBalance: number;
  OpeningBalance: number;
  IsTaxIncome: boolean;
  IsControlAccount: boolean;
  IsCashAccount: boolean;
  IsBudget: boolean;
  IsFrozenAccount: boolean;
  Level: number;
  Counter: number;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IsCapitalAccount: boolean;
}

export interface FINANCE_TaxDefinition {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Rate: number;
  Category: string;
  TaxAccount: string;
  AcquisitionReverse: boolean;
  NonDeduct: number;
  AcquisitionTaxAccount: string;
  DeferredTaxAccount: string;
  NonDeductAccount: string;
}

export interface HRM_DeductionOnSalary {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  IDDeduction: number;
  AriseDay: Date;
  IDPayPeriod: number;
  DeductionRate: number;
  IsExecuted: boolean;
  IsAutomatedDeductionOnSalary: boolean;
}

export interface HRM_OpenSchedule {
  IDBranch: number;
  IDTimesheet: number;
  IDShift: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  WorkingDate: Date;
  NumberOfStaff: number;
  NumberOfEnrolled: number;
  IsPublished: boolean;
}

export interface HRM_PayrollElement {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDPaySheetMaster: number;
  IDElementOfSalary: number;
  ValueOfElement: number;
}

export interface HRM_PayrollPaySheetMaster {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  IDPayPeriod: number;
  TotalOfIncome: number;
}

export interface HRM_PayrollPaySheetMasterSalaryDecision {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDPaySheetMaster: number;
  IDSalaryDecision: number;
}

export interface HRM_PersonalIncomePaymentProcess {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  IDPayPeriod: number;
  IDMainJobTitle: number;
  IDMainBranch: number;
  PISalary: number;
  PIAnotherIncome: number;
  TotalInsuranceAmountPaidByEm: number;
  TaxableIncome: number;
  FamilyCircumtanceDeductions: number;
  AssessableIncome: number;
  PersonalIncomeTax: number;
}

export interface HRM_PolAllowance {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDAllowanceType: number;
  DecisionNumber: string;
  DecisionSignDate: Date;
  IDDecisionSignedBy: number;
  DecisionEffectiveDate: Date;
  TimeOfEvent: Date;
  AOMAccordingPol: number;
  AOMAccordingAct: number;
  IsApproved: boolean;
  IDFrequency: number;
  IsPaidInKind: boolean;
  IsIncomePerMonth: boolean;
  IsIncomePerYear: boolean;
}

export interface HRM_PolAllowanceApplyFor {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDJobTitleCategory: number;
  IDJobTitle: number;
  IDLevelOfManagement: number;
  IDStaffType: number;
  IsBOM: boolean;
  IsManager: boolean;
  IsShareholder: boolean;
  IDPolAllowance: number;
}

export interface HRM_PolCompulsoryInsurance {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  EffectiveDate: Date;
  DateOfExpiry: Date;
  RateOfSocialInsuranceCo: number;
  RateOfSocialInsuranceEm: number;
  IsCompanyPaySI: boolean;
  RateOfHealthInsuranceCo: number;
  RateOfHealthInsuranceEm: number;
  IsCompanyPayHI: boolean;
  RateOfUnemploymentInsuranceCo: number;
  RateOfUnemploymentInsuranceEm: number;
  IsCompanyPayUI: boolean;
  RateOfTradeUnionFeesCo: number;
  RateOfTradeUnionFeesEm: number;
  IsCompanyPayTUF: boolean;
  IsApproved: boolean;
  TotalOfRateOfCo: number;
  TotalOfRateOfEm: number;
}

export interface HRM_PolCompulsoryInsuranceApplyFor {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDJobTitleCategory: number;
  IDJobTitle: number;
  IDLevelOfManagement: number;
  IDStaffType: number;
  IsBOM: boolean;
  IsManager: boolean;
  IsShareholder: boolean;
  IDPolCompulsoryInsurance: number;
}

export interface HRM_PolicyHoliday {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  FromDate: Date;
  ToDate: Date;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface HRM_PolicyPaidTimeOff {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Type: string;
  NumberOfDays: number;
  NumberOfCarryOnDays: number;
}

export interface HRM_PolicyPaidTimeOffGrantsByLengthOfServices {
  IDPTO: number;
  Id: number;
  Code: string;
  Name: string;
  MonthsOfServices: number;
  DaysGranted: number;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface HRM_PolWelfare {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  AOMAccordingPol: number;
  AOMAccordingAct: number;
  DecisionNumber: string;
  DecisionSignDate: Date;
  IDDecisionSignedBy: number;
  DecisionEffectiveDate: Date;
  TimeOfEvent: Date;
  IsApproved: boolean;
  IDFrequency: number;
  IsPaidInKind: boolean;
  IsIncomePerMonth: boolean;
  IsIncomePerYear: boolean;
}

export interface HRM_PolWelfareApplyFor {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDJobTitleCategory: number;
  IDJobTitle: number;
  IDLevelOfManagement: number;
  IDStaffType: number;
  IsBOM: boolean;
  IsManager: boolean;
  IsShareholder: boolean;
  IDPOLWelfare: number;
}

export interface HRM_Shift {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Start: any; //System.TimeSpan;
  End: any; //System.TimeSpan;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDTimeSheet: number;
  Breaks: number;
  IsOvernightShift: boolean;
  Type: string;
  StdPoint: number;
  EarliestCheckIn: number;
  LatestCheckIn: number;
  EarliestCheckOut: number;
  LatestCheckOut: number;
}

export interface HRM_ShiftInTimesheet {
  IDTimesheet: number;
  IDShift: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface HRM_Staff {
  IDBranch: number;
  IDDepartment: number;
  IDJobTitle: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Title: string;
  FirstName: string;
  LastName: string;
  FullName: string;
  ShortName: string;
  Gender: boolean;
  DOB: string;
  IdentityCardNumber: string;
  Domicile: string;
  DateOfIssueID: Date;
  IssuedBy: string;
  PhoneNumber: string;
  Email: string;
  Address: string;
  BackgroundColor: string;
  ImageURL: string;
}

export interface HRM_Staff_ConcurrentPosition {
  IDStaff: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDDepartment: number;
  IDJobTitle: number;
}

export interface HRM_StaffAcademicLevel {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDAcademicLevel: number;
  IDAcademicRank: number;
  IDDegree: number;
  IsDeleted: boolean;
}

export interface HRM_StaffAddress {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  PermanentAddress: string;
  TemporaryAddress: string;
  HomeAddress: string;
  IsDeleted: boolean;
}

export interface HRM_StaffAllowance {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  IDPOLAllowanceApplyFor: number;
  DecisionNumber: string;
  DecisionSignDate: Date;
  IDDecisionSignedBy: number;
  DecisionEffectiveDate: Date;
  TimeOfEvent: Date;
  AOMAccordingPol: number;
  AOMAccordingAct: number;
  IsApproved: boolean;
  IDFrequency: number;
  IsPaidInKind: boolean;
  IsIncomePerMonth: boolean;
  IsIncomePerYear: boolean;
  IsHasRunSalary: boolean;
}

export interface HRM_StaffAnotherSkill {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  IDAnotherSkill: number;
}

export interface HRM_StaffAppointDecision {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  DecisionNumber: string;
  DecisionSignDate: Date;
  IDDecisionSignedBy: number;
  DecisionEffectiveDate: Date;
  IDDepartment: number;
  IDJobTitle: number;
  IDJobTitleType: number;
  IDSalaryDecision: number;
}

export interface HRM_StaffBank {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  IDBank: number;
  IDBankBranch: number;
  AccountNumber: string;
  IsPayrollAccount: boolean;
}

export interface HRM_StaffBasicInfo {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDNationality: number;
  IDEthnic: number;
  IDReligion: number;
  MaritalStatus: number;
  Gender: boolean;
  DOB: string;
  Domicile: string;
  POB: string;
  IsDeleted: boolean;
}

export interface HRM_StaffBounusOnSalary {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  IDBounus: number;
  AriseDay: Date;
  IDPayPeriod: number;
  BounusRate: number;
  IsExecuted: boolean;
  IsAutomatedAddedToSalary: boolean;
}

export interface HRM_StaffCompulsoryInsurance {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  SocialInsuranceNumber: string;
  DateOfIssue: Date;
  DateOfAnnouncement: Date;
  DateOfDelivery: Date;
  IDPOLCompulsoryInsuranceApplyFor: number;
  IDPOLCompulsoryInsurance: number;
  EffectiveDate: Date;
  DateOfExpiry: Date;
  IsJoinedSI: boolean;
  RateOfSocialInsuranceCo: number;
  RateOfSocialInsuranceEm: number;
  IsCompanyPaySI: boolean;
  StartMonthPayingSI: Date;
  SINote: string;
  IsJoinedHI: boolean;
  RateOfHealthInsuranceCo: number;
  RateOfHealthInsuranceEm: number;
  IsCompanyPayHI: boolean;
  StartMonthPayingHI: Date;
  HINote: string;
  IsJoinedUI: boolean;
  RateOfUnemploymentInsuranceCo: number;
  RateOfUnemploymentInsuranceEm: number;
  IsCompanyPayUI: boolean;
  StartMonthPayingUI: Date;
  UINote: string;
  IsJoinedTUF: boolean;
  RateOfTradeUnionFeesCo: number;
  RateOfTradeUnionFeesEm: number;
  IsCompanyPayTUF: boolean;
  StartMonthPayingUF: Date;
  UFNote: string;
  IsApproved: boolean;
  TotalOfRateOfCo: number;
  TotalOfRateOfEm: number;
  IsDeleted: boolean;
}

export interface HRM_StaffConcurrentPosition {
  IDStaff: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  IDJobTitle: number;
  IDDepartment: number;
  IDAppointDecision: number;
}

export interface HRM_StaffConcurrentProbationryPosition {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  IDConcurrentProbationryJobTitle: number;
  IDConcurrentProbationryDepartment: number;
}

export interface HRM_StaffCurrentWorking {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaffType: number;
  IsShareholder: boolean;
  IDDirectManager: number;
  IDIndirectManager: number;
  OfficialEntryDate: Date;
  IsResign: boolean;
  LaborBookNumber: string;
  DateOfIssueLaborBook: Date;
  IssuedLaborBookBy: string;
  StoredRecordCode: string;
  StoredPlace: string;
  IsDeleted: boolean;
}

export interface HRM_StaffDeductionOnSalary {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  IDBounus: number;
  AriseDay: Date;
  IDPayPeriod: number;
  BounusRate: number;
  IsExecuted: boolean;
  IsAutomatedAddedToSalary: boolean;
}

export interface HRM_StaffFamily {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  IDRelative: number;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  FullName: string;
  ShortName: string;
  Gender: boolean;
  DOB: string;
  IdentityCardNumber: string;
  DateOfIssueID: Date;
  PlaceOfIssueID: string;
  DateOfExpiryID: Date;
  PassportNumber: string;
  DateOfIssuePassport: Date;
  DateOfExpiryPassport: Date;
  PlaceOfIssuePassport: string;
  IDTypeOfPassport: number;
  IDCountryOfIssuePassport: number;
  Age: number;
  IsDependants: boolean;
  HomeAddress: string;
}

export interface HRM_StaffForeignLanguage {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  IDForeignLanguage: number;
  IDCertificateType: number;
  CertificateNumber: string;
  DateOfIssue: Date;
  PlaceOfIssue: string;
  DateOfExpiry: Date;
  IDListeningSkill: number;
  IDSpeakingSkill: number;
  IDReadingSkill: number;
  IDWritingSkill: number;
}

export interface HRM_StaffIdentityCardAndPIT {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IdentityCardNumber: string;
  DateOfIssueID: Date;
  PlaceOfIssueID: string;
  DateOfExpiryID: Date;
  IdentityCardNumber1: string;
  DateOfIssueId1: Date;
  DateOfExpiry1: Date;
  TaxIdentificationNumber: string;
  RegistrationDateOfTaxId: Date;
  RegistrationPlaceOfTaxId: string;
  PassportNumber: string;
  DateOfIssuePassport: Date;
  DateOfExpiryPassport: Date;
  PlaceOfIssuePassport: string;
  IDTypeOfPassport: number;
  IDCountryOfIssuePassport: number;
  VisaNumber: string;
  DateOfIssueVisa: Date;
  DateOfExpiryVisa: Date;
  IDCountryOfIssueVisa: number;
  IsDeleted: boolean;
}

export interface HRM_StaffInsurancePaymentProcess {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  IDPayPeriod: number;
  IDMainJobTitle: number;
  IDMainDepartment: number;
  InsuaranceSalary: number;
  TotalAmountSIByCo: number;
  TotalAmountHIByCo: number;
  TotalAmountUIByCo: number;
  TotalAmountTUFByCo: number;
  TotalAmountPaidByCo: number;
  TotalAmountSIByEm: number;
  TotalAmountHIByEm: number;
  TotalAmountUIByEm: number;
  TotalAmountTUFByEm: number;
  TotalAmountPaidByEm: number;
}

export interface HRM_StaffInternetAccount {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  Classification: string;
  Account: string;
  URL: string;
  IsBelongToCompany: boolean;
}

export interface HRM_StaffLaborContract {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  IsAppendixContract: boolean;
  IDParentContract: number;
  ContractNumber: string;
  IDContractType: number;
  SignDate: Date;
  EffectiveDate: Date;
  ExpiryDate: Date;
  IDContractSignedBy: number;
  IsRenewalAutomatilly: boolean;
  NumberOfYearsRenewal: number;
  IDContractTemplate: number;
  ContentOfContract: string;
}

export interface HRM_StaffLearningProcess {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  FromYear: Date;
  ToYear: Date;
  Place: string;
  IDSpecialist: number;
  Result: string;
  Certificate: string;
}

export interface HRM_StaffPhone {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  Classification: string;
  PhoneNumber: string;
  IsBelongToCompany: boolean;
}

export interface HRM_StaffPTOEnrollment {
  IDPolicyPTO: number;
  IDStaff: number;
  StartDate: Date;
  Id: number;
  Code: string;
  Name: string;
  ModifiedDate: Date;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
}

export interface HRM_StaffRecruitmentInfo {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDRecruitmentSource: number;
  ApplyDate: Date;
  IDApplyJobTitle: number;
  IDApplyDepartment: number;
  IDRecruitmentForm: number;
  IDProbationryDecisionSignedBy: number;
  ProbationryDecisionSignDate: Date;
  ProbationryDecisionEffectiveDate: Date;
  ProbationryStartDate: Date;
  ProbationryEndDate: Date;
  IDMainProbationryJobTitle: number;
  IsDeleted: boolean;
}

export interface HRM_StaffResignationInfo {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  DateOfApplication: Date;
  IDReasonForResign: number;
  DecisionNumber: string;
  DecisionSignDate: Date;
  IDDecisionSignedBy: number;
  DecisionEffectiveDate: Date;
}

export interface HRM_StaffSalaryDecision {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  IDAppointDecision: number;
  DecisionNumber: string;
  DecisionSignDate: Date;
  IDDecisionSignedBy: number;
  DecisionEffectiveDate: Date;
  IsApproved: boolean;
  WorkDay: number;
  InsuaranceSalary: number;
  IsCompanyPayInsance: boolean;
  PISalary: number;
  IsCompanyPayPI: boolean;
  PayRangesGrades: string;
  PositionSalary: number;
  PositionSalaryPercent: number;
  PositionSalaryActual: number;
}

export interface HRM_StaffSchedule {
  IDStaff: number;
  IDTimesheet: number;
  IDShift: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  WorkingDate: Date;
  IsPublished: boolean;
}

export interface HRM_StaffSpecializedField {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  IDSpecializedField: number;
}

export interface HRM_StaffSpecializedSkill {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  IDSpecializedSkill: number;
  Rating: string;
  CertificateNumber: string;
  DateOfIssue: Date;
  PlaceOfIssue: string;
  DateOfExpiry: Date;
}

export interface HRM_StaffStaffAndFamilyJob {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IsStaffJob: boolean;
  IDStaff: number;
  IDFamily: number;
  IDJob: number;
}

export interface HRM_StaffTimesheetEnrollment {
  IDTimesheet: number;
  IDStaff: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface HRM_StaffTrainingProcess {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  FromYear: Date;
  ToYear: Date;
  Place: string;
  Result: string;
  TrainingProgram: string;
  TrainingContent: string;
}

export interface HRM_StaffTrainingProcessSkill {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDTrainingProcess: number;
  IDSkill: number;
}

export interface HRM_StaffWelfare {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  AOMAccordingPol: number;
  AOMAccordingAct: number;
  DecisionNumber: string;
  DecisionSignDate: Date;
  IDDecisionSignedBy: number;
  DecisionEffectiveDate: Date;
  TimeOfEvent: Date;
  IDFrequency: number;
  IsIncomePerMonth: boolean;
  IsIncomePerYear: boolean;
  IsHasRunSalary: boolean;
  IDPOLWelfareApplyFor: number;
}

export interface HRM_StaffWorkExperience {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  FromDate: Date;
  ToDate: Date;
  Workplace: string;
  IDField: number;
  IDJobTitle: number;
  Description: string;
}

export interface HRM_StaffWorkingDiary {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDStaff: number;
  IDEventType: number;
  EventName: string;
  IDRoleInEvent: number;
  RoleDescription: string;
  CustomerName: string;
  StartTime: Date;
  EndTime: Date;
}

export interface HRM_Timesheet {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Type: string;
  CheckInPolicy: string;
  NumberOfShiftPerDay: number;
  IsCheckOutRequired: boolean;
  WorkingHoursPerDay: number;
  Manager: number;
  IsRequiredApproveToEnroll: boolean;
  IsRequiredApproveToTransfer: boolean;
  IsRequiredApproveToSwitch: boolean;
}

export interface HRM_TimesheetCheckInCode {
  IDOffice: number;
  IDStaff: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface HRM_TimesheetLog {
  IDStaff: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
  LogTime: Date;
  Lat: string;
  Long: string;
  IDGate: number;
  Image: string;
  IPAddress: string;
  UUID: string;
  IsValidLog: boolean;
  IsOpenLog: boolean;
  IsMockLocation: boolean;
}

export interface LIST_ContractTemplate {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  ContentOfContract: string;
}

export interface LIST_Country {
  Id: number;
  Code: string;
  Name: string;
  FormalName: string;
  CountryType: string;
  CountrySubType: string;
  Sovereignty: string;
  Capital: string;
  CurrencyCode: string;
  CurrencyName: string;
  TelephoneCode: string;
  CountryCode3: string;
  CountryNumber: string;
  InternetCountryCode: string;
  Flags: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface LIST_District {
  IDProvince: number;
  Id: number;
  Name: string;
  Type: string;
  LatiLongTude: string;
  Code: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface LIST_ElementOfSalary {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Recipe: string;
}

export interface LIST_General {
  IDPartner: number;
  IDParent: number;
  Id: number;
  Code: string;
  Name: string;
  ForeignName: string;
  Remark: string;
  ForeignRemark: string;
  Color: string;
  Sort: number;
  IsSysAttrib: boolean;
  IsDefault: boolean;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface LIST_PayPeriod {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  StartDay: Date;
  EndDay: Date;
}

export interface LIST_Province {
  IDCountry: number;
  Id: number;
  Code: string;
  Name: string;
  Type: string;
  TelephoneCode: number;
  ZipCode: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface LIST_Ward {
  IDDistrict: number;
  Id: number;
  Name: string;
  Type: string;
  LatiLongTude: string;
  Code: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface MR_CompetiorOrder {
  IDTrackingCompetitor: number;
  IDService: number;
  IDProductType: number;
  Id: number;
  CustomerName: string;
  Day: number;
  Month: number;
  Year: number;
  NumberOfEvent: number;
  NumberOfGuests: number;
  Revenue: number;
  Remark: string;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface MR_TrackingCompetitor {
  IDBranch: number;
  IDAccount: number;
  Id: number;
  Code: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDSegment: number;
  AveragePrice: number;
  FromDate: Date;
}

export interface OST_Office {
  Id: number;
  Code: string;
  Name: string;
  Address: string;
  Phone: string;
  Email: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface OST_OfficeGate {
  IDOffice: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Type: string;
  IPAddress: string;
  IsVerifyLocation: boolean;
  IsCateringService: boolean;
  Lat: string;
  Long: string;
  MaxDistance: number;
}

export interface PM_Task {
  IDBranch: number;
  IDOpportunity: number;
  IDLead: number;
  IDProject: number;
  IDOwner: number;
  Id: number;
  Code: string;
  Name: string;
  Type: string;
  Status: string;
  Remark: string;
  Sort: number;
  StartDate: Date;
  EndDate: Date;
  PredictedClosingDate: Date;
  Duration: number;
  ExpectedRevenue: number;
  BudgetedCost: number;
  ActualCost: number;
  ActualRevenue: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface POS_BillTable {
  IDOrder: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
  IDTable: number;
}

export interface POS_Cash {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface POS_Kitchen {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
  IDPrinter: number;
}

export interface POS_MemberCardPromotion {
  IDBranch: number;
  IDMemberCard: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
  FoodDiscount: number;
  WineDiscount: number;
  BirthdayDiscount: number;
  Over20PersonDiscount: number;
  OtherDiscount: number;
  GemLoungeDiscount: number;
}

export interface POS_Memo {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Type: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface POS_Menu {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
  Image: string;
  PDF: string;
}

export interface POS_MenuDetail {
  IDMenu: number;
  IDItem: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
  IDKitchen: number;
}

export interface POS_Table {
  IDBranch: number;
  IDTableGroup: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
  XCoordinate: number;
  YCoordinate: number;
  Length: number;
  Width: number;
  Height: number;
  MaxGuest: number;
  IsAllowSmoking: boolean;
  IsNearWindow: boolean;
  IsBooth: boolean;
  IsPrivacy: boolean;
  Status: string;
}

export interface POS_TableGroup {
  IDBranch: number;
  IDKitchen: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface PR_PromotionTracking {
  Id: number;
  MaNVBH: string;
  TenNVBH: string;
  MaKH: string;
  TenKH: string;
  DiaChi: string;
  MaDH: string;
  TrangThai: string;
  NgayDonHang: Date;
  NgayHoaDon: Date;
  ClaimDate: Date;
  TenChuongTrinh: string;
  MaSP: string;
  TenSP: string;
  SoThung: number;
  SoLe: number;
  TongLe: number;
  ChietKhau: number;
}

export interface PROD_BillOfMaterials {
  Id: number;
  Name: string;
  IDItem: number;
  Type: string;
  Quantity: number;
  IDWarehouse: number;
  IDPriceList: number;
  IDStdCostPriceList: number;
  BatchSize: number;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface PROD_BillOfMaterialsDetail {
  IDBOM: number;
  Id: number;
  Type: string;
  IDItem: number;
  IDUoM: number;
  Quantity: number;
  AdditionalQuantity: number;
  UoMPrice: number;
  IssueMethod: string;
  IDWarehouse: number;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface PROD_ItemInVendor {
  Id: number;
  IDVendor: number;
  IDItem: number;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface PROD_MRP {
  Id: number;
  IDMRP: number;
  IDMRPLineID: number;
  IDItem: number;
  IDUoM: number;
  IDPreferVendor: number;
  MRPType: string;
  Name: string;
  Code: string;
  Remark: string;
  Startdate: Date;
  EndDate: Date;
  MRPLeadtime: any; //Nullable<short>;
  MRPToleranDay: any; //Nullable<short>;
  DueDate: Date;
  UnitPrice: any; //Nullable<number>;
  Discount: any; //Nullable<number>;
  PriceAfterDiscount: any; //Nullable<number>;
  QuantityOrdered: any; //Nullable<number>;
  QuantityInStock: any; //Nullable<number>;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDPurchaseOrder: number;
  Status: string;
  IDBranch: number;
}

export interface PROD_MRPScenario {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
  Period: string;
  StartDate: Date;
  EndDate: Date;
  MaximumCumulativeLeadTime: number;
  IsHolidaysForProduction: boolean;
  IsHolidaysForPurchase: boolean;
  ItemsGroup: number;
  IsConsiderExistingInventory: boolean;
  IsConsiderPurchaseOrders: boolean;
  IsConsiderSalesOrders: boolean;
  IsConsiderWorkOrders: boolean;
  IsMinimumInventoryLevel: boolean;
  ForecastAbsoluteEntry: number;
  IsItemsWithoutRequirement: boolean;
  IsScenarioASimulation: boolean;
  LastExecuteDate: Date;
  IsReserveInvoice: boolean;
  IsInventoryTransferRequest: boolean;
  InventoryLevel: string;
  IsRecommendPurchaseOrder: boolean;
  IsRecommendProductionOrder: boolean;
  IsRecommendITRQ: boolean;
  IsRecommendToDefaultWarehouse: boolean;
  IsOnlyNettable: boolean;
  IsExpandedPurchaseOrder: boolean;
  IsExpandedSalesOrder: boolean;
  RecommendationCalculatedDate: Date;
  IsRecurringOrderTransactions: boolean;
  IsExpandedReserveInvoice: boolean;
  IsExpandedProductionOrder: boolean;
  IsIgnoreCumulativeLeadTime: boolean;
  IsConsiderPurchaseRequest: boolean;
  IsConsiderPurchaseQuotations: boolean;
  IsConsiderSalesQuotations: boolean;
  IsExpandedPurchaseRequest: boolean;
  IsExpandedPurchaseQuotations: boolean;
  IsExpandedSalesQuotations: boolean;
  IsExpandedTransferRequest: boolean;
  IsDisplaySelectedItemOnly: boolean;
}

export interface PURCHASE_Order {
  IDBranch: number;
  IDStorer: number;
  IDVendor: number;
  Id: number;
  Code: string;
  Name: string;
  ForeignName: string;
  Remark: string;
  ForeignRemark: string;
  ExpectedReceiptDate: Date;
  ReceiptedDate: Date;
  Status: string;
  PaymentStatus: string;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  OrderDate: Date;
}

export interface PURCHASE_OrderDetail {
  IDOrder: number;
  Id: number;
  Code: string;
  Remark: string;
  ForeignRemark: string;
  IDItem: number;
  IDUoM: number;
  IDBaseUoM: number;
  UoMSwap: number;
  UoMSwapAlter: number;
  UoMQuantityExpected: number;
  QuantityExpected: number;
  QuantityAdjusted: number;
  QuantityReceived: number;
  QuantityRejected: number;
  UoMPrice: number;
  IsPromotionItem: boolean;
  IDTax: number;
  TaxRate: number;
  TotalBeforeDiscount: number;
  TotalDiscount: number;
  TotalAfterDiscount: number;
  Tax: number;
  TotalAfterTax: number;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface SALE_Order {
  IDBranch: number;
  IDOpportunity: number;
  IDContact: number;
  IDContract: number;
  IDStatus: number;
  IDType: number;
  IDParent: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  IDOwner: number;
  OrderDate: Date;
  OriginalTotalBeforeDiscount: number;
  OriginalPromotion: number;
  OriginalDiscount1: number;
  OriginalDiscount2: number;
  OriginalDiscountByItem: number;
  OriginalDiscountByGroup: number;
  OriginalDiscountByLine: number;
  OriginalDiscountByOrder: number;
  OriginalDiscountFromSalesman: number;
  OriginalTotalDiscount: number;
  OriginalTotalAfterDiscount: number;
  OriginalTax: number;
  OriginalTotalAfterTax: number;
  TotalBeforeDiscount: number;
  ProductWeight: number;
  ProductDimensions: number;
  Discount1: number;
  Discount2: number;
  DiscountByItem: number;
  Promotion: number;
  DiscountByGroup: number;
  DiscountByLine: number;
  DiscountByOrder: number;
  DiscountFromSalesman: number;
  TotalDiscount: number;
  TotalAfterDiscount: number;
  Tax: number;
  TotalAfterTax: number;
  Received: number;
  Debt: number;
  IsDebt: boolean;
  IsPaymentReceived: boolean;
  SubType: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  ExpectedDeliveryDate: Date;
  ShippedDate: Date;
  ShippingAddress: string;
  ShippingAddressRemark: string;
  InvoiceNumber: string;
  InvoicDate: Date;
  TaxRate: number;
  RefID: string;
  RefOwner: string;
  RefContact: string;
  RefWarehouse: string;
  RefDepartment: string;
  RefShipper: string;
  IsCOD: boolean;
  CODAmount: number;
  ShipFee: number;
  ShipFeeBySender: boolean;
  IsSampleOrder: boolean;
  IsShipBySaleMan: boolean;
  IsUrgentOrders: boolean;
  IDUrgentShipper: number;
  IsWholeSale: boolean;
  ReceivedDiscountFromSalesman: number;
  OldReceived: number;
  IDAddress: number;
  PaymentMethod: string;
}

export interface SALE_OrderDetail {
  Id: number;
  RefID: number;
  IDOrder: number;
  RefOrder: string;
  IDItem: number;
  RefItem: string;
  IDUoM: number;
  UoMPrice: number;
  Quantity: number;
  UoMSwap: number;
  IDBaseUoM: number;
  BaseQuantity: number;
  IsPromotionItem: boolean;
  IDPromotion: number;
  IDTax: number;
  TaxRate: number;
  OriginalTotalBeforeDiscount: number;
  OriginalPromotion: number;
  OriginalDiscount1: number;
  OriginalDiscount2: number;
  OriginalDiscountByItem: number;
  OriginalDiscountByGroup: number;
  OriginalDiscountByLine: number;
  OriginalDiscountByOrder: number;
  OriginalDiscountFromSalesman: number;
  OriginalTotalDiscount: number;
  OriginalTotalAfterDiscount: number;
  OriginalTax: number;
  OriginalTotalAfterTax: number;
  ShippedQuantity: number;
  ReturnedQuantity: number;
  TotalBeforeDiscount: number;
  Discount1: number;
  Discount2: number;
  DiscountByItem: number;
  Promotion: number;
  DiscountByGroup: number;
  DiscountByLine: number;
  DiscountByOrder: number;
  DiscountFromSalesman: number;
  TotalDiscount: number;
  TotalAfterDiscount: number;
  Tax: number;
  TotalAfterTax: number;
  Remark: string;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  ProductStatus: string;
  ProductWeight: number;
  ProductDimensions: number;
  ExpectedDeliveryDate: Date;
  ShippedDate: Date;
  UoMSwapAlter: number;
}

export interface SHIFT_TimeSheet {
  IDBranch: number;
  IDDoctor: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Start: string;
  End: string;
  OffTimes: string;
  EventGroup: number;
  Type: number;
}

export interface SHIP_Shipment {
  IDBranch: number;
  IDContact: number;
  IDStatus: number;
  IDType: number;
  IDVehicle: number;
  IDShipper: number;
  IDWarehouse: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  DeliveryDate: Date;
  ShippedDate: Date;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  ConfirmFinishedBy: string;
  ConfirmFinishedDate: Date;
  IsLostMoney: boolean;
  LostAmount: number;
  LostRemark: string;
}

export interface SHIP_ShipmentDebt {
  IDShipment: number;
  IDSaleOrder: number;
  IDStatus: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Debt: number;
  Received: number;
}

export interface SHIP_ShipmentDetail {
  IDShipment: number;
  IDSaleOrder: number;
  IDStatus: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  ProductWeight: number;
  ProductDimensions: number;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Received: number;
}

export interface SHIP_Vehicle {
  IDBranch: number;
  IDVehicleGroup: number;
  IDShipper: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
  DateOfPurchase: Date;
  DateOfRegistration: Date;
  DateOfRegistrationExpire: Date;
  Length: number;
  Width: number;
  Height: number;
  VolumeMin: number;
  VolumeRecommend: number;
  VolumeMax: number;
  WeightMin: number;
  WeightRecommend: number;
  WeightMax: number;
  IsForSample: boolean;
  IsForUrgent: boolean;
  IsForWholeSale: boolean;
  RefShipper: string;
}

export interface SYS_Apps {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  AppSecret: string;
  IdentityTokenLifetime: number;
  AccessTokenLifetime: number;
  RequireConsent: boolean;
  AppColor: string;
}

export interface SYS_Config {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Value: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface SYS_ConfigOption {
  IDParent: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  DataType: string;
  DefaultValue: string;
  SelectOptions: string;
  Formula: string;
  UDFListID: number;
  IsRequired: boolean;
  IsHidden: boolean;
  HiddenFormula: boolean;
  IsValidated: boolean;
  ValidatePattern: string;
  ValidateMessage: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface SYS_Currency {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Decimals: number;
}

export interface SYS_DataPermissionList {
  IDRole: number;
  IDForm: number;
  Id: number;
  IDBranch: number;
  Visible: boolean;
  IsDeleted: boolean;
}

export interface SYS_Form {
  IDFormGroup: number;
  IDParent: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  APIs: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Type: number;
  Icon: string;
  BadgeColor: string;
}

export interface SYS_FormGroup {
  IDApp: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Type: number;
  Icon: string;
  ClassName: string;
}

export interface SYS_GlobalConfig {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Value: string;
  IsLocalHost: boolean;
}

export interface SYS_Log {
  Id: number;
  AppName: string;
  LoggedBy: string;
  Date: Date;
  Level: string;
  Logger: string;
  Message: string;
  Method: string;
  API: string;
  Data: string;
  Exception: string;
  Thread: string;
  IPAddress: string;
  IPAddressLan: string;
  IsDeleted: boolean;
  AppVersion: string;
  Segment0: string;
  Segment1: string;
  Segment2: string;
  Segment3: string;
  Segment4: string;
  Segment5: string;
  Segment6: string;
  Segment7: string;
  Segment8: string;
  Segment9: string;
}

export interface SYS_PermissionList {
  IDBranch: number;
  IDForm: number;
  Id: number;
  Value: number;
  Visible: boolean;
  IsDeleted: boolean;
}

export interface SYS_Printer {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
  Host: string;
  Port: string;
  IsSecure: boolean;
  MarginTop: number;
  MarginRight: number;
  MarginBottom: number;
  MarginLeft: number;
  PageSize: string;
  Scale: number;
}

export interface SYS_Role {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IsDefault: boolean;
}

export interface SYS_RuningNo {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Prefix: string;
  BaseRadixType: number;
  Value: string;
}

export interface SYS_SAP_Databases {
  Id: number;
  IDBranch: number;
  DatabaseName: string;
  Username: string;
  Password: string;
  APIBaseUrl: string;
}

export interface SYS_Status {
  IDParent: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Color: string;
  Sort: number;
  IsSysAttrib: boolean;
  IsDefault: boolean;
  IsSMS: boolean;
  IsEmail: boolean;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface SYS_SyncJob {
  Id: number;
  Type: string;
  Command: string;
  IDBranch: number;
  RefNum1: number;
  RefNum2: number;
  RefNum3: number;
  RefNum4: number;
  RefChar1: string;
  RefChar2: string;
  RefChar3: string;
  IsDone: boolean;
  CreatedDate: Date;
  CreatedBy: string;
  TryCount: number;
  ExeDate: Date;
  IsRunning: boolean;
  ErrorMessage: string;
}

export interface SYS_Type {
  IDPartner: number;
  IDParent: number;
  Id: number;
  Code: string;
  Name: string;
  ForeignName: string;
  Remark: string;
  ForeignRemark: string;
  Color: string;
  Sort: number;
  IsSysAttrib: boolean;
  IsDefault: boolean;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface SYS_UserDevice {
  IDStaff: number;
  Id: number;
  Code: string;
  Name: string;
  Model: string;
  Platform: string;
  OperatingSystem: string;
  OsVersion: string;
  Manufacturer: string;
  IsVirtual: boolean;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  MemUsed: number;
  DiskFree: number;
  DiskTotal: number;
  RealDiskFree: number;
  RealDiskTotal: number;
  WebViewVersion: string;
  BatteryLevel: number;
  IsCharging: boolean;
  IsAllowCheckIn: boolean;
}

export interface SYS_UserSetting {
  IDBranch: number;
  IDUser: string;
  Email: string;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Value: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface SYS_UserVoice {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Stars: number;
}

export interface SYS_VeifyPhoneNumber {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  PhoneNumber: string;
  VerifyCode: string;
  IsVerified: boolean;
  VerifiedDate: Date;
}

export interface Version {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  VersionDate: Date;
}

export interface WEB_Category {
  IDParent: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  ThumbnailImage: string;
  Duyet: boolean;
  NgonNgu: string;
  Summary: string;
  URL: string;
  SEO1: string;
  SEO2: string;
  IsBuildIn: boolean;
}

export interface WEB_Content {
  IDDanhMuc: number;
  IDParent: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Type: number;
  ThumbnailImage: string;
  Image: string;
  AlternateImage: string;
  NgayDangBaiViet: Date;
  LuotXem: number;
  DanhGia: string;
  AllowComment: boolean;
  LuotThich: number;
  NgonNgu: string;
  Summary: string;
  NoiDung: string;
  TenKhac: string;
  ReadMoreText: string;
  SEO1: string;
  SEO2: string;
  Duyet: boolean;
  URL: string;
  Pin: boolean;
  PinPos: number;
  Home: boolean;
  HomePos: number;
}

export interface WEB_Content_Tag {
  IDBaiViet: number;
  IDTag: number;
  Id: number;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface WEB_ContentInCategory {
  IDDanhMuc: number;
  IDBaiViet: number;
  Id: number;
  URL: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface WEB_Tag {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface WH_Branches {
  Id: number;
  IDParent: number;
  IDType: number;
  Code: string;
  Name: string;
  Remark: string;
  TaxCode: string;
  BankAccount: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface WH_CashFlows {
  Id: number;
  IDBranch: number;
  IDParent: any; //Nullable<short>;
  Level: any; //Nullable<byte>;
  Drawer: any; //Nullable<byte>;
  Name: string;
  Code: string;
  Remark: string;
  IsActive: boolean;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface WH_ContactGroups {
  Id: number;
  IDBranch: any; //Nullable<short>;
  Code: string;
  Name: string;
  Remark: string;
  IDGroupType: number;
  IsLocked: boolean;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface WH_Contacts {
  Id: number;
  IDBranch: any; //Nullable<short>;
  IDBusinessPartnerGroup: number;
  RefId: number;
  Code: string;
  Name: string;
  CompanyName: string;
  TaxCode: string;
  IsStaff: boolean;
  IsCustomer: boolean;
  IsVendor: boolean;
  IsBranch: boolean;
  IsWholeSale: boolean;
  IsDistributor: boolean;
  IsStorer: boolean;
  IsCarrier: boolean;
  IsOutlets: boolean;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface WH_GeneralLedgers {
  Id: number;
  IDParent: number;
  IDBranch: number;
  RefParentCode: string;
  Code: string;
  Name: string;
  ForeignName: string;
  Remark: string;
  ForeignRemark: string;
  CurrentBalance: number;
  OpeningBalance: number;
  IsTaxIncome: boolean;
  IsCashAccount: boolean;
  IsBudget: boolean;
  IsFrozenAccount: boolean;
  Level: number;
  Counter: number;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface WH_InvoiceRows {
  IDBranch: number;
  Id: number;
  IDInvoice: number;
  IDTransaction: number;
  Line: number;
  ItemCode: string;
  ItemGroup: string;
  BPCode: string;
  AccountCode: string;
  Total: number;
  Remark: string;
  DocumentDate: Date;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface WH_Invoices {
  Id: number;
  IDTransaction: number;
  IDReceipt: number;
  IDType: any; //Nullable<byte>;
  IsCanceled: boolean;
  IsManual: boolean;
  IsCreateJournalEntry: boolean;
  InvoiceStatus: boolean;
  WarehouseStatus: boolean;
  PostingPeriod: any; //Nullable<short>;
  IssuedDate: Date;
  DueDate: Date;
  TaxDate: Date;
  Code: string;
  Name: string;
  Remark: string;
  VATPercent: number;
  VATSum: number;
  DiscountPercent: number;
  DiscountSum: number;
  Currency: string;
  Total: number;
  PaidToDate: number;
  PaidSum: number;
  GrossProfit: number;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
  IDBranch: number;
  IDSaleOrder: number;
  IDContact: number;
  EInvoiceCode: string;
  EInvoiceSerial: string;
  EInvoiceDate: Date;
}

export interface WH_ItemGroups {
  Id: number;
  IDParent: number;
  IDBranch: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface WH_ItemPriceLists {
  Id: number;
  IDPriceList: number;
  IDItem: number;
  IDItemUoM: number;
  Code: string;
  Name: string;
  Remark: string;
  Price: number;
  Price1: number;
  Price2: number;
  IsManual: boolean;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface WH_Items {
  Id: number;
  IDItemGroup: number;
  IDBranch: number;
  Code: string;
  Name: string;
  Remark: string;
  IsInventoryItem: boolean;
  IsSalesItem: boolean;
  IsPurchaseItem: boolean;
  IsPhantomItem: boolean;
  UoMInventory: number;
  UoMSales: number;
  UoMPurchasing: number;
  UoMBase: number;
  IsExpired: boolean;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface WH_ItemUoM {
  Id: number;
  IDItem: number;
  IDUoM: number;
  Code: string;
  Name: string;
  Remark: string;
  IsBaseUoM: boolean;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface WH_JournalEntries {
  IDBranch: number;
  Id: number;
  RefID: number;
  Code: string;
  Name: string;
  ForeignName: string;
  Remark: string;
  ForeignRemark: string;
  OriginalJournalType: number;
  RefBase: number;
  Total: number;
  DueDate: Date;
  DocumentDate: Date;
  PostingPeriod: number;
  DataSource: number;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface WH_JournalEntryRows {
  IDBranch: number;
  Id: number;
  IDTransaction: number;
  AccountCode: string;
  Remark: string;
  RefTransaction: number;
  Debit: number;
  DueDate: Date;
  DocumentDate: Date;
  PostingPeriod: number;
  Line: number;
  Account: number;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
  Credit: number;
  IDAccount: number;
  RefAccountCode: string;
  OffsetAccount: number;
  RefOffsetAccount: string;
  RefCFTId: number;
  RefCFWId: number;
  DistributionRule: string;
  CostCenter: string;
  CostCenter2: string;
  ItemGroupCode: string;
  ItemCode: string;
}

export interface WH_PostingPeriods {
  Id: number;
  IDBranch: number;
  RefID: number;
  Code: string;
  Name: string;
  ForeignName: string;
  FromDate: Date;
  ToDate: Date;
  Remark: string;
  ForeignRemark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface WH_PriceLists {
  Id: number;
  IDBranch: number;
  IDBasePriceList: number;
  Code: string;
  Name: string;
  Remark: string;
  Factor: number;
  RoundingMethod: number;
  ValidFrom: Date;
  ValidTo: Date;
  PrimaryDefaultCurrency: string;
  PrimaryDefaultCurrency1: string;
  PrimaryDefaultCurrency2: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface WH_Staff {
  IDBranch: number;
  IDDepartment: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Title: string;
  FullName: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface WH_UoM {
  Id: number;
  IDBranch: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface WH_VTB_Statements {
  Id: number;
  TransactionDate: Date;
  TransactionContent: string;
  Debit: number;
  Credit: number;
  AccountBalance: number;
  TransactionNumber: string;
  CorresponsiveAccount: string;
  CorresponsiveAccountName: string;
  Agency: string;
  CorresponsiveBankID: number;
  CorresponsiveBankName: string;
  ServiceBranchID: number;
  ServiceBranchName: string;
  Channel: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface WMS_Adjustment {
  IDBranch: number;
  IDStorer: number;
  Id: number;
  Status: string;
  Reason: string;
  Remark: string;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}

export interface WMS_AdjustmentDetail {
  IDBranch: number;
  IDStorer: number;
  IDAdjustment: number;
  Id: number;
  Status: string;
  IDItem: number;
  Location: number;
  Lot: number;
  LPN: number;
  QuantityAdjusted: number;
  Cube: number;
  GrossWeight: number;
  NetWeight: number;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface WMS_Carrier {
  Id: number;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Name: string;
}

export interface WMS_Carton {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDCartonGroup: number;
  CartonType: string;
  ContainerType: string;
  UseSequence: number;
  Cube: number;
  MaxCount: number;
  MaxWeight: number;
  TareWeight: number;
  Length: number;
  Width: number;
  Height: number;
  DefaultPalletCartonType: string;
  DefaultNonPalletCartonType: string;
  DisplayForPicking: boolean;
  DisplayForPacking: boolean;
  DisplayForLoading: boolean;
}

export interface WMS_CartonGroup {
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface WMS_Item {
  AccountantUoM: number;
  IDItemGroup: number;
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  ForeignName: string;
  Remark: string;
  ForeignRemark: string;
  IsInventoryItem: boolean;
  IsSalesItem: boolean;
  IsPurchaseItem: boolean;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  InventoryUoM: number;
  PurchasingUoM: number;
  SalesUoM: number;
  Expiry: number;
  IDSalesTaxDefinition: number;
  IDPurchaseTaxDefinition: number;
  IDRevenueAccount: number;
  IDExemptRevenueAccount: number;
  IDDefaultWarehouse: number;
  IDPreferredVendor: number;
  MfrCatalogNo: string;
  PrefQtyInPurchaseUnits: number;
  AllocationStrategy: number;
  ProductionDateInDays: number;
  TaxRateForWholesaler: number;
  SalesTaxInPercent: number;
  Lottable0: string;
  IsTrackSales: boolean;
  NoOfItemsPerSalesUnit: number;
  IDCartonGroup: number;
  PutawayStrategy: number;
  BaseUoM: number;
  Division: string;
  Industry: string;
  SerialNumberStart: string;
  SerialNumberEnd: string;
  SerialNumberNext: string;
  CostToReorderItem: number;
  ReorderPoint: number;
  QuantityToReorder: number;
  CostToCarryingPerUnit: number;
  ItemType: string;
  Lottable1: string;
  Lottable2: string;
  Lottable3: string;
  Lottable4: string;
  Lottable5: string;
  Lottable6: string;
  Lottable7: string;
  Lottable8: string;
  Lottable9: string;
  ExpiryUnit: string;
  IsPhantomItem: boolean;
  TreeType: string;
  TI: number;
  HI: number;
}

export interface WMS_ItemGroup {
  IDBranch: number;
  IDParent: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  General: string;
  Accounting: string;
}

export interface WMS_ItemInLocation {
  IDBranch: number;
  IDStorer: number;
  IDItem: number;
  IDLocation: number;
  Id: number;
  QuantityExpected: number;
  QuantityOnHand: number;
  QuantityPreallocated: number;
  QuantityAllocated: number;
  QuantityPicked: number;
  QuantityOnHold: number;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface WMS_ItemInWarehouseConfig {
  IDBranch: number;
  IDStorer: number;
  IDItem: number;
  PutawayZone: number;
  Rotation: string;
  RotateBy: string;
  MaxPalletsPerZone: number;
  StackLimit: number;
  PutawayLocation: number;
  InboundQCLocation: number;
  OutboundQCLocation: number;
  ReturnLocation: number;
  MinimumInventoryLevel: number;
  MaximumInventoryLevel: number;
  Id: number;
  IsDisabled: boolean;
  IsAllowConsolidation: boolean;
  PutawayStrategy: number;
  AllocationStrategy: number;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface WMS_ItemUoM {
  IDItem: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Length: number;
  LengthUnit: number;
  Width: number;
  WidthUnit: number;
  Height: number;
  HeightUnit: number;
  Volume: number;
  Weight: number;
  WeightUnit: number;
  IsBaseUoM: boolean;
  AlternativeQuantity: number;
  BaseQuantity: number;
  Barcode: string;
  Image: string;
  IDUoM: number;
}

export interface WMS_LicencePlateNumber {
  IDBranch: number;
  IDStorer: number;
  Id: number;
  IDItem: number;
  Quantity: number;
  Status: string;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Code: string;
  IDReceipPalletization: number;
}

export interface WMS_Location {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDZone: number;
  LocationType: string;
  IsAutomaticallyShipPickedProduct: boolean;
  IsLoseID: boolean;
  RouteSequence: string;
  IsCommingleItem: boolean;
  IsCommingleLot: boolean;
  Length: number;
  Width: number;
  LocationFlag: string;
  FootPrint: number;
  StackLimit: number;
  Height: number;
  CubicCapacity: number;
  LocationCategory: string;
  LocationHandling: string;
  Level: number;
  WeightCapacity: number;
  MoverType: string;
  XCoordinate: number;
  YCoordinate: number;
  ZCoordinate: number;
  Orientation: number;
}

export interface WMS_Lot {
  IDBranch: number;
  IDStorer: number;
  Id: number;
  Name: string;
  IDItem: number;
  Cube: number;
  GrossWeight: number;
  NetWeight: number;
  QuantityOnHand: number;
  QuantityPreallocated: number;
  QuantityAllocated: number;
  QuantityPicked: number;
  QuantityOnHold: number;
  Lottable0: string;
  Lottable1: string;
  Lottable2: string;
  Lottable3: string;
  Lottable4: string;
  Lottable5: Date;
  Lottable6: Date;
  Lottable7: Date;
  Lottable8: Date;
  Lottable9: Date;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface WMS_LotAttribute {
  IDBranch: number;
  IDLot: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface WMS_LotLPNLocation {
  IDBranch: number;
  IDStorer: number;
  IDItem: number;
  Id: number;
  IDLot: number;
  IDLPN: number;
  IDLocation: number;
  QuantityExpected: number;
  QuantityOnHand: number;
  QuantityAllocated: number;
  QuantityPicked: number;
  QuantityOnHold: number;
  QuantityPickInProcess: number;
  QuantityPendingMoveIn: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface WMS_PriceList {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDBasePriceList: number;
  Factor: number;
  RoundingMethod: number;
  ValidFrom: Date;
  ValidTo: Date;
  PrimaryDefaultCurrency: string;
  PrimaryDefaultCurrency1: string;
  PrimaryDefaultCurrency2: string;
  IsPriceListForVendor: boolean;
}

export interface WMS_PriceListDetail {
  IDPriceList: number;
  IDItem: number;
  IDItemUoM: number;
  Id: number;
  Price: number;
  Price1: number;
  Price2: number;
  IsManual: boolean;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface WMS_PriceListVersion {
  IDPriceList: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDBasePriceList: number;
  Factor: number;
  RoundingMethod: number;
  ValidFrom: Date;
  ValidTo: Date;
  PrimaryDefaultCurrency: string;
  PrimaryDefaultCurrency1: string;
  PrimaryDefaultCurrency2: string;
  AppliedDate: Date;
}

export interface WMS_PriceListVersionDetail {
  IDPriceListVersion: number;
  Id: number;
  IDItem: number;
  IDItemUoM: number;
  Price: number;
  Price1: number;
  Price2: number;
  IsManual: boolean;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface WMS_PutawayStrategy {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface WMS_PutawayStrategyDetail {
  IDPutawayStrategy: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  PutawayType: number;
  PutawayZone: number;
  FromLocation: number;
  ToLocation: number;
  ChecksRestrictions: boolean;
  DimensionRestriction: number;
}

export interface WMS_Receipt {
  IDBranch: number;
  IDStorer: number;
  IDVendor: number;
  Id: number;
  IDPurchaseOrder: number;
  POCode: string;
  Code: string;
  Name: string;
  ForeignName: string;
  Remark: string;
  ForeignRemark: string;
  ExternalReceiptKey: string;
  IDCarrier: number;
  VehicleNumber: string;
  ExpectedReceiptDate: Date;
  ArrivalDate: Date;
  ReceiptedDate: Date;
  ClosedDate: Date;
  Type: string;
  Status: string;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface WMS_ReceiptDetail {
  IDReceipt: number;
  IDPO: number;
  IDPOLine: number;
  IDItem: number;
  Id: number;
  Code: string;
  Remark: string;
  ForeignRemark: string;
  ExternalReceipt: string;
  ExternalLine: string;
  Status: string;
  ReceivedDate: Date;
  IDUoM: number;
  UoMQuantityExpected: number;
  QuantityExpected: number;
  QuantityAdjusted: number;
  QuantityReceived: number;
  QuantityRejected: number;
  Cube: number;
  GrossWeight: number;
  NetWeight: number;
  Lottable0: string;
  Lottable1: string;
  Lottable2: string;
  Lottable3: string;
  Lottable4: string;
  Lottable5: Date;
  Lottable6: Date;
  Lottable7: Date;
  Lottable8: Date;
  Lottable9: Date;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface WMS_ReceiptPalletization {
  IDStorer: number;
  IDReceipt: number;
  IDItem: number;
  Id: number;
  ReceiptLine: number;
  Status: string;
  ReceivedDate: Date;
  IDUoM: number;
  UoMQuantityExpected: number;
  QuantityExpected: number;
  QuantityAdjusted: number;
  QuantityReceived: number;
  QuantityRejected: number;
  ToLocation: number;
  ToLot: number;
  Cube: number;
  GrossWeight: number;
  NetWeight: number;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IsFullPallet: boolean;
  Remark: string;
}

export interface WMS_Storer {
  Id: number;
  Remark: string;
  Sort: number;
  isActivated: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDCartonGroup: number;
  IsEnablePacking: boolean;
  IsQCInspectAtPack: boolean;
  IsAllowMultiZoneRainbowPallet: boolean;
  DefaultItemRotation: string;
  DefaultRotation: string;
  DefaultStrategy: number;
  DefaultPutawayStrategy: number;
  DefaultInboundQCLocation: number;
  DefaultOutboundQCLocation: number;
  DefaultReturnsReceiptLocation: number;
  DefaultPackingLocation: number;
  LPNBarcodeSymbology: string;
  LPNBarcodeFormat: string;
  LPNLength: number;
  LPNStartNumber: string;
  LPNNextNumber: string;
  LPNRollbackNumber: string;
  CaseLabelType: string;
  ApplicationID: string;
  SSCCFirstDigit: string;
  UCCVendor: string;
  AllowCommingledLPN: boolean;
  LabelTemplate: number;
  StandardCarrierAlphaCode: string;
  CreditLimit: number;
  Name: string;
}

export interface WMS_TaskDispatchStrategy {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  InterleaveTasks: boolean;
}

export interface WMS_TaskDispatchStrategyDetail {
  IDStrategy: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  TaskType: number;
  ProximityInterleaving: boolean;
}

export interface WMS_Transaction {
  IDBranch: number;
  IDStorer: number;
  Id: number;
  TransactionType: string;
  IDItem: number;
  Lot: number;
  FromLocation: number;
  ToLocation: number;
  FromLPN: number;
  ToLPN: number;
  SourceKey: number;
  SourceType: string;
  Status: string;
  IDUoM: number;
  UoMQuantity: number;
  Quantity: number;
  Cube: number;
  GrossWeight: number;
  NetWeight: number;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IDTransaction: number;
  TransactionDate: Date;
}

export interface WMS_UoM {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Type: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface WMS_UoMGroup {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface WMS_Vendor {
  Id: number;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  Name: string;
}

export interface WMS_WarehouseInfo {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  IsLocked: boolean;
  InventoryAccount: number;
  CostOfGoodsSoldAccount: number;
  AllocationAccount: number;
  RevenueAccount: number;
  VarianceAccount: number;
  InventoryOffsetDecreaseAccount: number;
  InventoryOffsetIncreaseAccount: number;
  SalesReturnsAccount: number;
  ExpenseAccount: number;
  RevenueAccountForeign: number;
  ExpenseAccountForeign: number;
  TaxGroup: number;
  IsDropShip: boolean;
  ExemptRevenueAccount: number;
  IsAllowUseTax: boolean;
  PriceDifferenceAccount: number;
  ExchangeRateDifferencesAccount: number;
  GoodsClearingAccount: number;
  PurchaseAccount: number;
  PurchaseReturnAccount: number;
  PurchaseOffsetAccount: number;
  ShippedGoodsAccount: number;
  VATinRevenueAccount: number;
  GLDecreaseAccount: number;
  GLIncreaseAccount: number;
  IsNettable: boolean;
  InventoryRevaluationAccount: number;
  InventoryRevaluationOffsetAccount: number;
  COGSRevaluationAccount: number;
  COGSRevaluationOffsetAccount: number;
  ExpenseClearingAccount: number;
  ExpenseOffsetAccount: number;
  SalesCreditAccount: number;
  SalesCreditAccountForeign: number;
  TaxExemptCreditAccount: number;
  PurchaseCreditAccount: number;
  PurchaseCreditAccountForeign: number;
  RevenueReturnsAccount: number;
  NegativeInventoryAdjustmentAccount: number;
  StockInTransitAccount: number;
  PurchaseBalanceAccount: number;
  InventoryOffsetPLAccount: number;
  Storekeeper: number;
  IsBinActivated: boolean;
  BinSeparator: string;
  DefaultBinInternalNumber: number;
  GlobalLocationNumber: string;
  FreeOfChargeSalesAccount: number;
  FreeOfChargePurchaseAccount: number;
}

export interface WMS_WavePlanning {
  IDStatus: number;
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  PickingDate: Date;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
}

export interface WMS_Zone {
  IDBranch: number;
  Id: number;
  Code: string;
  Name: string;
  Remark: string;
  Sort: number;
  IsDisabled: boolean;
  IsDeleted: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedDate: Date;
  ModifiedDate: Date;
  MaxPalletsPerItem: number;
  DefaultPickToLocation: number;
  InLocation: number;
  OutLocation: number;
  IsAllowVoicePicking: boolean;
  MaximumPickerOneTime: number;
  IsCreateAssignments: boolean;
  IsZoneBreak: boolean;
  MaxPickLines: number;
  MaxPickContainers: number;
  MaxCaseCount: number;
  MaxCube: number;
  MaxWeight: number;
  IDEquipmentProfile: number;
}
