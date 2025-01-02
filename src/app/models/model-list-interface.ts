//------------------------------------------------------------------------------
// 
//    www.codeart.vn
//    hungvq@live.com
//    (+84)908.061.119
// 
//------------------------------------------------------------------------------


export interface AC_APInvoice
{
    IDBranch?: number;
    IDPurchaseOrder?: number;
    IDReceipt?: number;
    IDSeller?: number;
    IDBuyer?: number;
    IDOwner?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    RefSO?: string;
    RefCode?: string;
    Type?: string;
    Status?: string;
    PaymentStatus?: string;
    InvoiceForm?: string;
    InvoiceSerial?: string;
    InvoiceNo?: string;
    InvoiceGUID?: string;
    InvoiceCode?: string;
    InvoiceURL?: string;
    InvoiceDate?: Date;
    InvoiceSignedDate?: Date;
    TotalBeforeDiscount?: number;
    TotalDiscount?: number;
    CalcTotalAfterDiscount?: number;
    Tax?: number;
    WithholdingTax?: number;
    CalcTotalAfterTax?: number;
    Paid?: number;
    CalcBalance?: number;
    DueDate?: Date;
    Currency?: string;
    ExchangeRate?: number;
    SellerName?: string;
    SellerTaxCode?: string;
    SellerUnitName?: string;
    SellerAddress?: string;
    SellerBankAccount?: string;
    SellerPhone?: string;
    SellerEmail?: string;
    BuyerName?: string;
    BuyerTaxCode?: string;
    BuyerAddress?: string;
    
}

export interface AC_APInvoiceDetail
{
    IDAPInvoice?: number;
    IDItem?: number;
    IDUoM?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    ItemType?: string;
    ItemName?: string;
    UnitName?: string;
    Quantity?: number;
    UoMPrice?: number;
    IsPromotionItem?: boolean;
    CalcTotalBeforeDiscount?: number;
    TotalDiscount?: number;
    CalcTotalAfterDiscount?: number;
    TaxRate?: number;
    CalcTax?: number;
    CalcTotalAfterTax?: number;
    
}

export interface AC_ARInvoice
{
    IDBranch?: number;
    IDBusinessPartner?: number;
    IDSaleOrder?: number;
    IDParent?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Status?: string;
    Type?: string;
    InvoiceDate?: Date;
    BuyerName?: string;
    BuyerTaxCode?: string;
    BuyerUnitName?: string;
    BuyerAddress?: string;
    BuyerBankAccount?: string;
    PaymentMethod?: string;
    ReceiveType?: string;
    ReceiverEmail?: string;
    ReceiverMobile?: string;
    ReceiverAddress?: string;
    ReceiverName?: string;
    UserDefine?: string;
    BillCode?: string;
    Currency?: string;
    ExchangeRate?: number;
    InvoiceGUID?: string;
    InvoiceForm?: string;
    InvoiceSerial?: string;
    InvoiceNo?: number;
    InvoiceCode?: string;
    SignedDate?: Date;
    TypeCreateInvoice?: string;
    OriginalInvoiceIdentify?: string;
    IsCanceled?: boolean;
    TotalBeforeDiscount?: number;
    TotalDiscount?: number;
    TotalAfterDiscount?: number;
    Tax?: number;
    TotalAfterTax?: number;
    InvoiceNote?: string;
    
}

export interface AC_ARInvoiceContent
{
    IDARInvoice?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    ItemType?: string;
    ItemName?: string;
    UnitName?: string;
    Quantity?: number;
    UoMPrice?: number;
    IsPromotionItem?: boolean;
    TotalDiscount?: number;
    TaxRate?: number;
    CalcTotalBeforeDiscount?: number;
    CalcTotalAfterDiscount?: number;
    CalcTax?: number;
    CalcTotalAfterTax?: number;
    
}

export interface AC_ARInvoiceDetail
{
    IDARInvoice?: number;
    IDItem?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    ItemType?: string;
    ItemName?: string;
    UnitName?: string;
    IDUoM?: number;
    IDBaseUoM?: number;
    UoMSwapAlter?: number;
    UoMSwap?: number;
    Quantity?: number;
    BaseQuantity?: number;
    UoMPrice?: number;
    IsPromotionItem?: boolean;
    TotalBeforeDiscount?: number;
    TotalDiscount?: number;
    TotalAfterDiscount?: number;
    IDTax?: number;
    TaxRate?: number;
    Tax?: number;
    TotalAfterTax?: number;
    UserDefineDetails?: string;
    
}

export interface AC_ARInvoiceSODetail
{
    IDBranch?: number;
    Id?: number;
    IDSaleOrder?: number;
    IDSaleOrderDetail?: number;
    IDARInvoice?: number;
    IDARInvoiceDetail?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    IDItem?: number;
    ItemType?: string;
    ItemName?: string;
    UnitName?: string;
    IDUoM?: number;
    IDBaseUoM?: number;
    UoMSwapAlter?: number;
    UoMSwap?: number;
    Quantity?: number;
    BaseQuantity?: number;
    UoMPrice?: number;
    IsPromotionItem?: boolean;
    TotalBeforeDiscount?: number;
    TotalDiscount?: number;
    TotalAfterDiscount?: number;
    IDTax?: number;
    TaxRate?: number;
    Tax?: number;
    TotalAfterTax?: number;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface AC_Case
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Type?: string;
    Debit?: string;
    Credit?: string;
    CostingCode1?: string;
    CostingCode2?: string;
    CostingCode3?: string;
    CostingCode4?: string;
    CostingCode5?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface AC_JournalEntry
{
    IDBranch?: number;
    IDPeriod?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Remark?: string;
    ForeignRemark?: string;
    Status?: string;
    DocumentEntry?: number;
    DocumentType?: string;
    TotalInLocalCurrency?: number;
    TotalInForeignCurrency?: number;
    Currency?: string;
    CurrencyRate?: number;
    Total?: number;
    PostDate?: Date;
    DueDate?: Date;
    DocumentDate?: Date;
    ReverseTransaction?: number;
    ReversalDate?: Date;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface AC_JournalEntryRow
{
    IDJournalEntry?: number;
    IDPostingPeriod?: number;
    IDAccount?: number;
    IDOffsetAccount?: number;
    Id?: number;
    Name?: string;
    Sort?: number;
    Account?: string;
    OffsetAccount?: string;
    Currency?: string;
    CurrencyRate?: number;
    DebitInLocalCurrency?: number;
    DebitInForeignCurrency?: number;
    Debit?: number;
    CreditInLocalCurrency?: number;
    CreditInForeignCurrency?: number;
    Credit?: number;
    DueDate?: Date;
    DocumentEntry?: number;
    DocumentType?: string;
    DocumentDate?: Date;
    DocumentLine?: number;
    Remark?: string;
    DistributionRule?: string;
    CostingCode1?: string;
    CostingCode2?: string;
    CostingCode3?: string;
    CostingCode4?: string;
    CostingCode5?: string;
    TaxGroup?: string;
    TaxRate?: number;
    BaseAmount?: number;
    IsTaxLine?: boolean;
    IsClosed?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface AC_PeriodCategory
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Remark?: string;
    ForeignRemark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    FinancialYear?: number;
    FinancialYearFirstDate?: Date;
    PostingPeriodType?: string;
    NumberOfPeriods?: number;
    PostingDateFrom?: Date;
    PostingDateTo?: Date;
    DueDateFrom?: Date;
    DueDateTo?: Date;
    DocumentDateFrom?: Date;
    DocumentDateTo?: Date;
    
}

export interface AC_PostingPeriod
{
    IDBranch?: number;
    IDPeriodsCategory?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Status?: string;
    Remark?: string;
    ForeignRemark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    PostingDateFrom?: Date;
    PostingDateTo?: Date;
    DueDateFrom?: Date;
    DueDateTo?: Date;
    DocumentDateFrom?: Date;
    DocumentDateTo?: Date;
    SubPeriod?: number;
    
}

export interface APPROVAL_ApprovalRule
{
    IDBranch?: number;
    IDApprovalTemplate?: number;
    Id?: number;
    Type?: string;
    SubType?: string;
    Config?: string;
    SetStatus?: string;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface APPROVAL_ApprovalRuleApprover
{
    IDApprovalRule?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    Config?: string;
    ApprovalMode?: string;
    ApproverList?: string;
    
}

export interface APPROVAL_Changelog
{
    IDRequest?: number;
    IDApprover?: number;
    Status?: string;
    Id?: number;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface APPROVAL_Comment
{
    IDStaff?: number;
    IDRequest?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface APPROVAL_Request
{
    IDBranch?: number;
    IDStaff?: number;
    IDApprovalTemplate?: number;
    Id?: number;
    Type?: string;
    SubType?: string;
    ApprovalMode?: string;
    Status?: string;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Start?: Date;
    End?: Date;
    Amount?: number;
    UDF01?: number;
    UDF02?: number;
    UDF03?: number;
    UDF04?: number;
    UDF05?: number;
    UDF06?: Date;
    UDF07?: Date;
    UDF08?: Date;
    UDF09?: string;
    UDF10?: string;
    UDF11?: string;
    UDF12?: string;
    UDF13?: string;
    UDF14?: string;
    UDF15?: string;
    UDF16?: string;
    UDF17?: number;
    UDF18?: number;
    UDF19?: number;
    UDF20?: number;
    UDF21?: number;
    UDF22?: number;
    
}

export interface APPROVAL_RequestApprover
{
    IDRequest?: number;
    IDApprover?: number;
    Status?: string;
    Id?: number;
    Type?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface APPROVAL_Template
{
    IDBranch?: number;
    IDSchemaMapping?: number;
    Id?: number;
    Type?: string;
    SubType?: string;
    HoursToApprove?: number;
    ApprovalMode?: string;
    IsSentToAdministrationManager?: boolean;
    IsSentToSpecializedManager?: boolean;
    FixedApproverList?: string;
    IsUserCanChooseApprover?: boolean;
    SelectableApproverList?: string;
    SupperApproverList?: string;
    FollowerList?: string;
    UDFLabel01?: string;
    UDFLabel02?: string;
    UDFLabel03?: string;
    UDFLabel04?: string;
    UDFLabel05?: string;
    UDFLabel06?: string;
    UDFLabel07?: string;
    UDFLabel08?: string;
    UDFLabel09?: string;
    UDFLabel10?: string;
    UDFLabel11?: string;
    UDFLabel12?: string;
    UDFLabel13?: string;
    UDFLabel14?: string;
    UDFLabel15?: string;
    UDFLabel16?: string;
    UDFLabel17?: string;
    UDFLabel18?: string;
    UDFLabel19?: string;
    UDFLabel20?: string;
    UDFLabel21?: string;
    UDFLabel22?: string;
    IsUseUDF01?: boolean;
    IsUseUDF02?: boolean;
    IsUseUDF03?: boolean;
    IsUseUDF04?: boolean;
    IsUseUDF05?: boolean;
    IsUseUDF06?: boolean;
    IsUseUDF07?: boolean;
    IsUseUDF08?: boolean;
    IsUseUDF09?: boolean;
    IsUseUDF10?: boolean;
    IsUseUDF11?: boolean;
    IsUseUDF12?: boolean;
    IsUseUDF13?: boolean;
    IsUseUDF14?: boolean;
    IsUseUDF15?: boolean;
    IsUseUDF16?: boolean;
    IsUseUDF17?: boolean;
    IsUseUDF18?: boolean;
    IsUseUDF19?: boolean;
    IsUseUDF20?: boolean;
    IsUseUDF21?: boolean;
    IsUseUDF22?: boolean;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    UDFMapping01?: string;
    UDFMapping02?: string;
    UDFMapping03?: string;
    UDFMapping04?: string;
    UDFMapping05?: string;
    UDFMapping06?: string;
    UDFMapping07?: string;
    UDFMapping08?: string;
    UDFMapping09?: string;
    UDFMapping10?: string;
    UDFMapping11?: string;
    UDFMapping12?: string;
    UDFMapping13?: string;
    UDFMapping14?: string;
    UDFMapping15?: string;
    UDFMapping16?: string;
    UDFMapping17?: string;
    UDFMapping18?: string;
    UDFMapping19?: string;
    UDFMapping20?: string;
    UDFMapping21?: string;
    UDFMapping22?: string;
    
}

export interface BANK_Account
{
    IDBranch?: number;
    IDBank?: number;
    IDParent?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Product?: string;
    Type?: string;
    SWIFT?: string;
    Currency?: string;
    WorkingBalance?: number;
    LastCheckedDate?: Date;
    NextCheckNo?: number;
    GLAccount?: string;
    DebtOfDiscountedBoEAccount?: string;
    BankOnCollectionAccount?: string;
    BankOnDiscounted?: string;
    GLInterimAccount?: string;
    FineAccount?: string;
    InterestAccount?: string;
    DiscountAccount?: string;
    ServiceFeeAccount?: string;
    OtherExpensesAccount?: string;
    OtherIncomesAccount?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsLoanAccount?: boolean;
    IsInDue?: boolean;
    FixedPeriod?: number;
    InterestRate?: number;
    CurentInterestRate?: number;
    IsStepdownInterestRateScheme?: boolean;
    IsEarlyRepayment?: boolean;
    LoanTenor?: number;
    DisbursementDate?: Date;
    EndDate?: Date;
    IDAccountDebtCollection?: number;
    TotalOutstandingLoans?: number;
    PrincipalPaid?: number;
    
}

export interface BANK_IncomingPayment
{
    IDJournalEntry?: number;
    IDBranch?: number;
    IDStaff?: number;
    IDCustomer?: number;
    IDType?: number;
    IDTransaction?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Remark?: string;
    ForeignRemark?: string;
    Amount?: number;
    PostingDate?: Date;
    DueDate?: Date;
    DocumentDate?: Date;
    Type?: string;
    SubType?: string;
    PaymentReason?: string;
    Status?: string;
    PaymentURL?: string;
    ReferenceNumber?: string;
    TransactionDate?: Date;
    TransactionFee?: number;
    IsRefundTransaction?: boolean;
    IDOriginalTransaction?: number;
    Sort?: number;
    IsCanceled?: boolean;
    IsPrinted?: boolean;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface BANK_IncomingPaymentDetail
{
    IDBranch?: number;
    IDCustomer?: number;
    IDIncomingPayment?: number;
    IDSaleOrder?: number;
    IDContract?: number;
    IDInvoice?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Remark?: string;
    ForeignRemark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Amount?: number;
    
}

export interface BANK_OutgoingPayment
{
    IDJournalEntry?: number;
    IDBranch?: number;
    IDStaff?: number;
    IDBusinessPartner?: number;
    IDTransaction?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Remark?: string;
    ForeignRemark?: string;
    Amount?: number;
    PostingDate?: Date;
    DueDate?: Date;
    DocumentDate?: Date;
    Type?: string;
    SubType?: string;
    PaymentReason?: string;
    Status?: string;
    PaymentURL?: string;
    ReferenceNumber?: string;
    TransactionDate?: Date;
    TransactionFee?: number;
    IsRefundTransaction?: boolean;
    IDOriginalTransaction?: number;
    Sort?: number;
    IsCanceled?: boolean;
    IsPrinted?: boolean;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface BANK_OutgoingPaymentDetail
{
    IDOutgoingpayment?: number;
    Id?: number;
    DocumentType?: string;
    DocumentEntry?: number;
    Amount?: number;
    ModifiedDate?: Date;
    Remark?: string;
    ForeignRemark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    
}

export interface BANK_PaymentTerm
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    DueDateBasedOn?: string;
    StartFrom?: string;
    NumberOfAdditionalMonths?: number;
    NumberOfAdditionalDays?: number;
    ToleranceDays?: number;
    NumberOfInstallments?: number;
    FirstPartialPayment?: number;
    OpenIncomingPayment?: string;
    IDPriceList?: number;
    
}

export interface BANK_StatementMatchingCriteria
{
    IDBranch?: number;
    IDParent?: number;
    Id?: number;
    Type?: string;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface BANK_Transaction
{
    IDBranch?: number;
    IDAccount?: number;
    IDBusinessPartner?: number;
    Id?: number;
    Remark?: string;
    ReferenceNumber?: string;
    Amount?: number;
    TransactionDate?: Date;
    ReciprocalAccount?: string;
    ReciprocalName?: string;
    Currency?: string;
    TransactionStatus?: string;
    ReconciliationStatus?: string;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface BC_RevenueExpenditureComponent
{
    IDParent?: number;
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Remark?: string;
    ForeignRemark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsRevenue?: boolean;
    Type?: string;
    IsDividedByWeeks?: boolean;
    IDAccount?: number;
    AccountCode?: string;
    CostCenter?: string;
    
}

export interface BC_RevenueExpenditureRefCode
{
    IDBranch?: number;
    IDRevenueExpenditureComponent?: number;
    Id?: number;
    Code?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface BI_CSVData
{
    Id?: number;
    Data?: string;
    
}

export interface BI_Daily_Balance
{
    Id?: number;
    IDBranch?: number;
    ReportDate?: Date;
    IDParent?: number;
    IDTemplate?: number;
    Code?: string;
    TemplateCode?: string;
    Name?: string;
    ForeignName?: string;
    Value?: number;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface BI_Daily_Debt
{
    Id?: number;
    IDBranch?: number;
    adate?: Date;
    Code?: string;
    Value?: number;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface BI_Daily_General
{
    Id?: number;
    IDBranch?: number;
    adate?: string;
    Deposit?: string;
    Liability?: string;
    Receiveble?: string;
    Revenue?: string;
    TotalExpenditure?: string;
    TotalRevenue?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface BI_Daily_Revenue
{
    Id?: number;
    IDBranch?: number;
    adate?: Date;
    Code?: string;
    Value?: number;
    AccountCode?: string;
    CostCenter?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface BI_Daily_RevenueExpenditure1
{
    Id?: number;
    IDBranch?: number;
    adate?: Date;
    Code?: string;
    Value?: number;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface BI_Daily_RevenueExpenditure2
{
    Id?: number;
    IDBranch?: number;
    adate?: Date;
    Code?: string;
    Value?: number;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface BI_Dashboard
{
    Id?: number;
    Type?: string;
    Icon?: string;
    Color?: string;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    MinCols?: number;
    MaxCols?: number;
    MinRows?: number;
    MaxRows?: number;
    Config?: string;
    
}

export interface BI_DashboardDetail
{
    IDDashboard?: number;
    IDReport?: number;
    Id?: number;
    Type?: string;
    Code?: string;
    Name?: string;
    Remark?: string;
    Config?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface BI_Finance_BalanceSheetCategory
{
    IDBranch?: number;
    IDParent?: number;
    Id?: number;
    N0?: string;
    N1?: string;
    Code?: string;
    Level?: number;
    Account?: string;
    Name?: string;
    ForeignName?: string;
    Remark?: string;
    ForeignRemark?: string;
    Sort?: number;
    IsTitle?: boolean;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface BI_Finance_BalanceSheets
{
    IDBranch?: number;
    BalanceCateCode?: string;
    Id?: number;
    Frequency?: number;
    Day?: number;
    Month?: number;
    Year?: number;
    Amount?: number;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface BI_Finance_CashFlow
{
    IDBranch?: number;
    IDCashFlowComponent?: number;
    Id?: number;
    Frequency?: number;
    Day?: number;
    Month?: number;
    Year?: number;
    Amount?: number;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface BI_Finance_IncomeStatement
{
    IDBranch?: number;
    IDIncomeComponent?: number;
    Id?: number;
    Frequency?: number;
    Day?: number;
    Month?: number;
    Year?: number;
    Amount?: number;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface BI_Finance_Management
{
    IDBranch?: number;
    IDPnLComponent?: number;
    Id?: number;
    Frequency?: number;
    Day?: number;
    Month?: number;
    Year?: number;
    Amount?: number;
    Percentage?: number;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface BI_HRM_PayrollPerBranch
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Year?: number;
    Month?: number;
    DataType?: string;
    Value?: number;
    
}

export interface BI_Operating_MarketResearch
{
    IDAccount?: number;
    IDService?: number;
    IDProductType?: number;
    Id?: number;
    Frequency?: number;
    Day?: number;
    Month?: number;
    Quarter?: number;
    Year?: number;
    NumberOfEvent?: number;
    NumberOfGuests?: number;
    Revenue?: number;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface BI_Oppotunity
{
    IDBranch?: number;
    Id?: number;
    Frequency?: number;
    Day?: number;
    Month?: number;
    Quarter?: number;
    Year?: number;
    NumberOfEvent?: number;
    NumberOfGuests?: number;
    Revenue?: number;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface BI_Report
{
    Id?: number;
    Type?: string;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    Icon?: string;
    Color?: string;
    DataConfig?: string;
    ChartConfig?: string;
    Dimensions?: string;
    ViewDimension?: string;
    ChartScript?: string;
    MockDataAPI?: string;
    
}

export interface BI_ReportTemplate
{
    Id?: number;
    Type?: string;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Remark?: string;
    ForeignRemark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface BI_ReportTemplateDetail
{
    IDTemplate?: number;
    IDParent?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Remark?: string;
    ForeignRemark?: string;
    AccountCode?: string;
    OffsetAccountCode?: string;
    CostCenter?: string;
    CostCenter2?: string;
    ItemGroupCode?: string;
    ItemCode?: string;
    CashFlowID?: number;
    IsDividedByWeeks?: boolean;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Formula?: string;
    
}

export interface BP_Partner
{
    IDParent?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Remark?: string;
    ForeignRemark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface BRA_Branch
{
    IDType?: number;
    IDParent?: number;
    IDAdministrationManager?: number;
    IDSpecializedManagement?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    BusinessRegistrationNumber?: string;
    IssueDate?: Date;
    IssuedBy?: string;
    TaxCode?: string;
    Website?: string;
    Email?: string;
    Fax?: string;
    Phone?: string;
    Phone2?: string;
    Address?: string;
    BankAccount?: string;
    TemplateHeader?: string;
    TemplateFooter?: string;
    TemplateConfig?: string;
    LogoURL?: string;
    BannerURL?: string;
    ImageURL?: string;
    BackgroundColor?: string;
    IsHeadOfDepartment?: boolean;
    VuViec?: string;
    IDPartner?: number;
    ShortName?: string;
    Type?: string;
    CanViewDataIn?: string;
    SaveDataTo?: number;
    
}

export interface BSC_RevenueTarget
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Value?: number;
    Year?: number;
    Month?: number;
    IDSalesTeam?: number;
    
}

export interface CRM_Activity
{
    IDLead?: number;
    IDOpportunity?: number;
    IDContact?: number;
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Type?: number;
    Name?: string;
    Remark?: string;
    DueDate?: Date;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface CRM_Attendance
{
    Id?: number;
    PartyDate?: Date;
    CustomerName?: string;
    Email?: string;
    DOB?: Date;
    LunchPax?: number;
    DinnerPax?: number;
    RealField?: number;
    Kids?: number;
    RegisteredTable?: string;
    TypeOfParty?: string;
    BillingInformation?: string;
    Status?: string;
    DiningCard?: string;
    Arrivaled?: number;
    CustomerType?: string;
    Phone?: string;
    NoRecords?: number;
    ForeignerNo?: number;
    TableOfLunch?: string;
    TimeOfParty?: string;
    CustomerGroup?: string;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface CRM_BusinessPartnerGroup
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDGroupType?: number;
    IsLocked?: boolean;
    IDPriceList?: number;
    IDEffectiveDiscount?: number;
    
}

export interface CRM_Campaign
{
    IDOwner?: number;
    IDStatus?: number;
    IDType?: number;
    IDParent?: number;
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    StartDate?: Date;
    EndDate?: Date;
    NumSent?: number;
    ExpectedResponse?: number;
    ExpectedRevenue?: number;
    BudgetedCost?: number;
    ActualCost?: number;
    IsActive?: boolean;
    HierarchyActualCost?: number;
    HierarchyBudgetedCost?: number;
    NumberOfContacts?: number;
    HierarchyNumberOfContacts?: number;
    NumberOfConvertedLeads?: number;
    HierarchyNumberOfConvertedLeads?: number;
    HierarchyExpectedRevenue?: number;
    NumberOfLeads?: number;
    HierarchyNumberOfLeads?: number;
    HierarchyNumberSent?: number;
    NumberOfOpportunities?: number;
    HierarchyNumberOfOpportunities?: number;
    NumberOfResponses?: number;
    HierarchyNumberOfResponses?: number;
    AmountAllOpportunities?: number;
    HierarchyAmountAllOpportunities?: number;
    AmountWonOpportunities?: number;
    HierarchyAmountWonOpportunities?: number;
    NumberOfWonOpportunities?: number;
    HierarchyNumberOfWonOpportunities?: number;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface CRM_CampaignMember
{
    IDCampaign?: number;
    IDLead?: number;
    IDContact?: number;
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface CRM_Config
{
    IDBranch?: number;
    IDParent?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsSysAttrib?: boolean;
    Value?: string;
    IsDefault?: boolean;
    
}

export interface CRM_Contact
{
    IDBranch?: number;
    IDIndividual?: number;
    IDSource?: number;
    IDSector?: number;
    IDIndustry?: number;
    IDRating?: number;
    IDOwner?: number;
    IDParent?: number;
    Id?: number;
    Code?: string;
    Title?: string;
    Name?: string;
    CompanyName?: string;
    TaxCode?: string;
    Fax?: string;
    Website?: string;
    BillingAddress?: string;
    NumberOfEmployees?: number;
    AnnualRevenue?: number;
    Remark?: string;
    IsPersonal?: boolean;
    IDPriceListForVendor?: number;
    WorkPhone?: string;
    OtherPhone?: string;
    DoNotCall?: boolean;
    Email?: string;
    HasOptedOutOfEmail?: boolean;
    IDPaymentTermForVendor?: number;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsStaff?: boolean;
    IsCustomer?: boolean;
    IsVendor?: boolean;
    IsBranch?: boolean;
    IsWholeSale?: boolean;
    IDBusinessPartnerGroup?: number;
    IDPriceList?: number;
    IDPaymentTerm?: number;
    IsDistributor?: boolean;
    IsStorer?: boolean;
    IsCarrier?: boolean;
    IsOutlets?: boolean;
    RefId?: number;
    Status?: string;
    IsProvideReferenceCode?: boolean;
    BillingPhone?: string;
    
}

export interface CRM_ContactReference
{
    Id?: number;
    IDContact?: number;
    IDVendor?: number;
    Code?: string;
    IsDeleted?: boolean;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface CRM_Contract
{
    IDContact?: number;
    IDOpportunity?: number;
    IDBranch?: number;
    Id?: number;
    Code?: string;
    RefContractID?: number;
    Name?: string;
    ContractDate?: Date;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDQuotation?: number;
    EventDate?: Date;
    NumberOfGuests?: number;
    EndDate?: Date;
    Amount?: number;
    
}

export interface CRM_Customer
{
    IDContact?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsWholeSale?: boolean;
    
}

export interface CRM_Lead
{
    IDCampaign?: number;
    IDOwner?: number;
    IDStatus?: number;
    IDRating?: number;
    IDSource?: number;
    IDIndustry?: number;
    IDSector?: number;
    IDCountry?: number;
    IDCity?: number;
    IDProvince?: number;
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Individual?: string;
    Name?: string;
    FirstName?: string;
    LastName?: string;
    Company?: string;
    Title?: string;
    Remark?: string;
    Address?: string;
    Street?: string;
    ZipCode?: string;
    AnnualRevenue?: number;
    Email?: string;
    HasOptedOutOfEmail?: boolean;
    Phone?: string;
    MobilePhone?: string;
    DoNotCall?: boolean;
    Fax?: string;
    HasOptedOutOfFax?: boolean;
    NumberOfEmployees?: number;
    Website?: string;
    LastTransferDate?: Date;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface CRM_MemberCard
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    Level?: number;
    Amount?: number;
    
}

export interface CRM_Opportunity
{
    IDLead?: number;
    IDContact?: number;
    IDSource?: number;
    IDStage?: number;
    IDType?: number;
    IDOwner?: number;
    IDCampaign?: number;
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Amount?: number;
    StartDate?: Date;
    EventDate?: Date;
    PredictedClosingDate?: Date;
    ClosedDate?: Date;
    ExpectedRevenue?: number;
    NextStep?: string;
    IsPrivate?: boolean;
    Probability?: number;
    TotalOpportunityQuantity?: number;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    NumberOfGuests?: number;
    RefID?: number;
    RefContactID?: number;
    RefSourceID?: number;
    RefOwnerID?: number;
    RefAccountCode?: string;
    
}

export interface CRM_Outlets
{
    Id?: number;
    Type?: string;
    Location?: string;
    BusinessType?: string;
    PopulationDistribution?: string;
    CustomersAccess?: string;
    Display?: string;
    MainRouteId?: number;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Name?: string;
    
}

export interface CRM_PartnerAddress
{
    IDPartner?: number;
    Id?: number;
    Country?: string;
    Province?: string;
    District?: string;
    Ward?: string;
    AddressLine1?: string;
    AddressLine2?: string;
    ZipCode?: string;
    Lat?: string;
    Long?: string;
    Remark?: string;
    Contact?: string;
    Phone1?: string;
    Phone2?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Name?: string;
    
}

export interface CRM_PartnerBankAccount
{
    IDPartner?: number;
    Id?: number;
    AccountNo?: string;
    BankName?: string;
    Beneficiary?: string;
    BankBranch?: string;
    Code?: string;
    Name?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface CRM_PartnerTaxInfo
{
    IDPartner?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    CompanyName?: string;
    TaxCode?: string;
    Email?: string;
    WorkPhone?: string;
    BillingAddress?: string;
    IsDefault?: boolean;
    
}

export interface CRM_PersonInfo
{
    Id?: number;
    FullName?: string;
    FirstName?: string;
    LastName?: string;
    Gender?: boolean;
    DateOfBirth?: Date;
    PlaceOfBirth?: string;
    PlaceOfOrigin?: string;
    IdentityCardNumber?: string;
    DateOfIssue?: Date;
    PlaceOfIssue?: string;
    DateOfExpiration?: Date;
    Nationality?: string;
    Ethnic?: string;
    Religion?: string;
    MaritalStatus?: string;
    MobilePhone?: string;
    HomePhone?: string;
    Email?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Name?: string;
    
}

export interface CRM_Quotation
{
    IDContact?: number;
    IDOpportunity?: number;
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface CRM_Route
{
    IDBranch?: number;
    IDSeller?: number;
    IDParent?: number;
    IDVehicle?: number;
    IDVehicleForSample?: number;
    IDVehicleForUrgent?: number;
    IDVehicleForWholeSale?: number;
    IDShipper?: number;
    IDWarehouse?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    StartDate?: Date;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    EndDate?: Date;
    Type?: string;
    
}

export interface CRM_RouteDetail
{
    IDRoute?: number;
    IDContact?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Week1?: boolean;
    Week2?: boolean;
    Week3?: boolean;
    Week4?: boolean;
    Monday?: boolean;
    Tuesday?: boolean;
    Wednesday?: boolean;
    Thursday?: boolean;
    Friday?: boolean;
    Saturday?: boolean;
    Sunday?: boolean;
    Frequency?: number;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface CRM_Voucher
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    Amount?: number;
    IsMileage?: boolean;
    CreditCard?: number;
    CreditAccount?: string;
    
}

export interface FINANCE_CostCenter
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Remark?: string;
    Balance?: number;
    VariableCost?: string;
    FixedCost?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Type?: string;
    
}

export interface FINANCE_GeneralLedger
{
    IDBranch?: number;
    IDParent?: number;
    RefParentCode?: string;
    Id?: number;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Remark?: string;
    ForeignRemark?: string;
    ExternalCode?: string;
    IsActiveAccount?: boolean;
    CurrentBalance?: number;
    OpeningBalance?: number;
    IsTaxIncome?: boolean;
    IsControlAccount?: boolean;
    IsCashAccount?: boolean;
    IsBudget?: boolean;
    IsFrozenAccount?: boolean;
    Level?: number;
    Counter?: number;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsCapitalAccount?: boolean;
    
}

export interface FINANCE_TaxDefinition
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Category?: string;
    AcquisitionReverse?: boolean;
    Rate?: number;
    NonDeduct?: number;
    TaxAccount?: string;
    AcquisitionTaxAccount?: string;
    DeferredTaxAccount?: string;
    NonDeductAccount?: string;
    
}

export interface HRM_DeductionOnSalary
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    IDDeduction?: number;
    AriseDay?: Date;
    IDPayPeriod?: number;
    DeductionRate?: number;
    IsExecuted?: boolean;
    IsAutomatedDeductionOnSalary?: boolean;
    
}

export interface HRM_OpenSchedule
{
    IDBranch?: number;
    IDTimesheet?: number;
    IDShift?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    WorkingDate?: Date;
    NumberOfStaff?: number;
    NumberOfEnrolled?: number;
    IsPublished?: boolean;
    IDOffice?: number;
    
}

export interface HRM_OvertimePolicy
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Type?: string;
    Start?: Date;
    End?: Date;
    IsOvernightShift?: boolean;
    MaxMinuteOfOTInCycle?: number;
    Factor?: number;
    ConvertToPTO?: boolean;
    
}

export interface HRM_PayrollElement
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDPaySheetMaster?: number;
    IDElementOfSalary?: number;
    ValueOfElement?: number;
    
}

export interface HRM_PayrollPaySheetMaster
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    IDPayPeriod?: number;
    TotalOfIncome?: number;
    
}

export interface HRM_PayrollPaySheetMasterSalaryDecision
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDPaySheetMaster?: number;
    IDSalaryDecision?: number;
    
}

export interface HRM_PersonalIncomePaymentProcess
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    IDPayPeriod?: number;
    IDMainJobTitle?: number;
    IDMainBranch?: number;
    PISalary?: number;
    PIAnotherIncome?: number;
    TotalInsuranceAmountPaidByEm?: number;
    TaxableIncome?: number;
    FamilyCircumtanceDeductions?: number;
    AssessableIncome?: number;
    PersonalIncomeTax?: number;
    
}

export interface HRM_PolAllowance
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDAllowanceType?: number;
    DecisionNumber?: string;
    DecisionSignDate?: Date;
    IDDecisionSignedBy?: number;
    DecisionEffectiveDate?: Date;
    TimeOfEvent?: Date;
    AOMAccordingPol?: number;
    AOMAccordingAct?: number;
    IsApproved?: boolean;
    IDFrequency?: number;
    IsPaidInKind?: boolean;
    IsIncomePerMonth?: boolean;
    IsIncomePerYear?: boolean;
    
}

export interface HRM_PolAllowanceApplyFor
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDJobTitleCategory?: number;
    IDJobTitle?: number;
    IDLevelOfManagement?: number;
    IDStaffType?: number;
    IsBOM?: boolean;
    IsManager?: boolean;
    IsShareholder?: boolean;
    IDPolAllowance?: number;
    
}

export interface HRM_PolCompulsoryInsurance
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    EffectiveDate?: Date;
    DateOfExpiry?: Date;
    RateOfSocialInsuranceCo?: number;
    RateOfSocialInsuranceEm?: number;
    IsCompanyPaySI?: boolean;
    RateOfHealthInsuranceCo?: number;
    RateOfHealthInsuranceEm?: number;
    IsCompanyPayHI?: boolean;
    RateOfUnemploymentInsuranceCo?: number;
    RateOfUnemploymentInsuranceEm?: number;
    IsCompanyPayUI?: boolean;
    RateOfTradeUnionFeesCo?: number;
    RateOfTradeUnionFeesEm?: number;
    IsCompanyPayTUF?: boolean;
    IsApproved?: boolean;
    TotalOfRateOfCo?: number;
    TotalOfRateOfEm?: number;
    
}

export interface HRM_PolCompulsoryInsuranceApplyFor
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDJobTitleCategory?: number;
    IDJobTitle?: number;
    IDLevelOfManagement?: number;
    IDStaffType?: number;
    IsBOM?: boolean;
    IsManager?: boolean;
    IsShareholder?: boolean;
    IDPolCompulsoryInsurance?: number;
    
}

export interface HRM_PolicyHoliday
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    FromDate?: Date;
    ToDate?: Date;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface HRM_PolicyPaidTimeOff
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Type?: string;
    NumberOfDays?: number;
    NumberOfCarryOnDays?: number;
    IsGrantsByLengthOfServices?: boolean;
    
}

export interface HRM_PolicyPaidTimeOffGrantsByLengthOfServices
{
    IDPTO?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    MonthsOfServices?: number;
    DaysGranted?: number;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface HRM_PolWelfare
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    AOMAccordingPol?: number;
    AOMAccordingAct?: number;
    DecisionNumber?: string;
    DecisionSignDate?: Date;
    IDDecisionSignedBy?: number;
    DecisionEffectiveDate?: Date;
    TimeOfEvent?: Date;
    IsApproved?: boolean;
    IDFrequency?: number;
    IsPaidInKind?: boolean;
    IsIncomePerMonth?: boolean;
    IsIncomePerYear?: boolean;
    
}

export interface HRM_PolWelfareApplyFor
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDJobTitleCategory?: number;
    IDJobTitle?: number;
    IDLevelOfManagement?: number;
    IDStaffType?: number;
    IsBOM?: boolean;
    IsManager?: boolean;
    IsShareholder?: boolean;
    IDPOLWelfare?: number;
    
}

export interface HRM_Shift
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Start?: Date;
    End?: Date;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Breaks?: number;
    IsOvernightShift?: boolean;
    Type?: string;
    StdPoint?: number;
    EarliestCheckIn?: number;
    LatestCheckIn?: number;
    EarliestCheckOut?: number;
    LatestCheckOut?: number;
    CanBookBreakfastCatering?: boolean;
    CanBookLunchCatering?: boolean;
    CanBookDinnerCatering?: boolean;
    BreakfastStart?: Date;
    BreakfastEnd?: Date;
    LunchStart?: Date;
    LunchEnd?: Date;
    DinnerStart?: Date;
    DinnerEnd?: Date;
    IsDefaultBookBreakfast?: boolean;
    IsDefaultBookLunch?: boolean;
    IsDefaultBookDinner?: boolean;
    
}

export interface HRM_ShiftInTimesheet
{
    IDTimesheet?: number;
    IDShift?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface HRM_Staff
{
    IDBranch?: number;
    IDDepartment?: number;
    IDJobTitle?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Title?: string;
    FirstName?: string;
    LastName?: string;
    FullName?: string;
    ShortName?: string;
    Gender?: boolean;
    DOB?: string;
    IdentityCardNumber?: string;
    Domicile?: string;
    DateOfIssueID?: Date;
    IssuedBy?: string;
    PhoneNumber?: string;
    Email?: string;
    Address?: string;
    BackgroundColor?: string;
    ImageURL?: string;
    Area?: string;
    
}

export interface HRM_Staff_CLApproval
{
    IDStaff?: number;
    IDInterviewer?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    IsApproved?: boolean;
    InterviewDate?: Date;
    ApprovedDate?: Date;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface HRM_Staff_ConcurrentPosition
{
    IDStaff?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDDepartment?: number;
    IDJobTitle?: number;
    
}

export interface HRM_StaffAcademicLevel
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDAcademicLevel?: number;
    IDAcademicRank?: number;
    IDDegree?: number;
    IsDeleted?: boolean;
    
}

export interface HRM_StaffAddress
{
    Id?: number;
    IDStaff?: number;
    AddressLine1?: string;
    AddressLine2?: string;
    Type?: string;
    Country?: string;
    Province?: string;
    District?: string;
    Ward?: string;
    ZipCode?: string;
    Lat?: string;
    Long?: string;
    Contact?: string;
    Phone1?: string;
    Phone2?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface HRM_StaffAllowance
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    IDPOLAllowanceApplyFor?: number;
    DecisionNumber?: string;
    DecisionSignDate?: Date;
    IDDecisionSignedBy?: number;
    DecisionEffectiveDate?: Date;
    TimeOfEvent?: Date;
    AOMAccordingPol?: number;
    AOMAccordingAct?: number;
    IsApproved?: boolean;
    IDFrequency?: number;
    IsPaidInKind?: boolean;
    IsIncomePerMonth?: boolean;
    IsIncomePerYear?: boolean;
    IsHasRunSalary?: boolean;
    
}

export interface HRM_StaffAnotherSkill
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    IDAnotherSkill?: number;
    
}

export interface HRM_StaffAppointDecision
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    DecisionNumber?: string;
    DecisionSignDate?: Date;
    IDDecisionSignedBy?: number;
    DecisionEffectiveDate?: Date;
    IDDepartment?: number;
    IDJobTitle?: number;
    IDJobTitleType?: number;
    IDSalaryDecision?: number;
    
}

export interface HRM_StaffBank
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    IDBank?: number;
    IDBankBranch?: number;
    AccountNumber?: string;
    IsPayrollAccount?: boolean;
    
}

export interface HRM_StaffBasicInfo
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDNationality?: number;
    IDEthnic?: number;
    IDReligion?: number;
    MaritalStatus?: number;
    Gender?: boolean;
    DOB?: string;
    Domicile?: string;
    POB?: string;
    IsDeleted?: boolean;
    
}

export interface HRM_StaffBounusOnSalary
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    IDBounus?: number;
    AriseDay?: Date;
    IDPayPeriod?: number;
    BounusRate?: number;
    IsExecuted?: boolean;
    IsAutomatedAddedToSalary?: boolean;
    
}

export interface HRM_StaffCompulsoryInsurance
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    SocialInsuranceNumber?: string;
    DateOfIssue?: Date;
    DateOfAnnouncement?: Date;
    DateOfDelivery?: Date;
    IDPOLCompulsoryInsuranceApplyFor?: number;
    IDPOLCompulsoryInsurance?: number;
    EffectiveDate?: Date;
    DateOfExpiry?: Date;
    IsJoinedSI?: boolean;
    RateOfSocialInsuranceCo?: number;
    RateOfSocialInsuranceEm?: number;
    IsCompanyPaySI?: boolean;
    StartMonthPayingSI?: Date;
    SINote?: string;
    IsJoinedHI?: boolean;
    RateOfHealthInsuranceCo?: number;
    RateOfHealthInsuranceEm?: number;
    IsCompanyPayHI?: boolean;
    StartMonthPayingHI?: Date;
    HINote?: string;
    IsJoinedUI?: boolean;
    RateOfUnemploymentInsuranceCo?: number;
    RateOfUnemploymentInsuranceEm?: number;
    IsCompanyPayUI?: boolean;
    StartMonthPayingUI?: Date;
    UINote?: string;
    IsJoinedTUF?: boolean;
    RateOfTradeUnionFeesCo?: number;
    RateOfTradeUnionFeesEm?: number;
    IsCompanyPayTUF?: boolean;
    StartMonthPayingUF?: Date;
    UFNote?: string;
    IsApproved?: boolean;
    TotalOfRateOfCo?: number;
    TotalOfRateOfEm?: number;
    IsDeleted?: boolean;
    
}

export interface HRM_StaffConcurrentPosition
{
    IDStaff?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    IDJobTitle?: number;
    IDDepartment?: number;
    IDAppointDecision?: number;
    
}

export interface HRM_StaffConcurrentProbationryPosition
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    IDConcurrentProbationryJobTitle?: number;
    IDConcurrentProbationryDepartment?: number;
    
}

export interface HRM_StaffCurrentWorking
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaffType?: number;
    IsShareholder?: boolean;
    IDDirectManager?: number;
    IDIndirectManager?: number;
    OfficialEntryDate?: Date;
    IsResign?: boolean;
    LaborBookNumber?: string;
    DateOfIssueLaborBook?: Date;
    IssuedLaborBookBy?: string;
    StoredRecordCode?: string;
    StoredPlace?: string;
    IsDeleted?: boolean;
    
}

export interface HRM_StaffDeductionOnSalary
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    IDBounus?: number;
    AriseDay?: Date;
    IDPayPeriod?: number;
    BounusRate?: number;
    IsExecuted?: boolean;
    IsAutomatedAddedToSalary?: boolean;
    
}

export interface HRM_StaffFamily
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    IDRelative?: number;
    FirstName?: string;
    LastName?: string;
    MiddleName?: string;
    FullName?: string;
    ShortName?: string;
    Gender?: boolean;
    DOB?: string;
    IdentityCardNumber?: string;
    DateOfIssueID?: Date;
    PlaceOfIssueID?: string;
    DateOfExpiryID?: Date;
    PassportNumber?: string;
    DateOfIssuePassport?: Date;
    DateOfExpiryPassport?: Date;
    PlaceOfIssuePassport?: string;
    IDTypeOfPassport?: number;
    IDCountryOfIssuePassport?: number;
    Age?: number;
    IsDependants?: boolean;
    HomeAddress?: string;
    
}

export interface HRM_StaffForeignLanguage
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    IDForeignLanguage?: number;
    IDCertificateType?: number;
    CertificateNumber?: string;
    DateOfIssue?: Date;
    PlaceOfIssue?: string;
    DateOfExpiry?: Date;
    IDListeningSkill?: number;
    IDSpeakingSkill?: number;
    IDReadingSkill?: number;
    IDWritingSkill?: number;
    
}

export interface HRM_StaffIdentityCardAndPIT
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IdentityCardNumber?: string;
    DateOfIssueID?: Date;
    PlaceOfIssueID?: string;
    DateOfExpiryID?: Date;
    IdentityCardNumber1?: string;
    DateOfIssueId1?: Date;
    DateOfExpiry1?: Date;
    TaxIdentificationNumber?: string;
    RegistrationDateOfTaxId?: Date;
    RegistrationPlaceOfTaxId?: string;
    PassportNumber?: string;
    DateOfIssuePassport?: Date;
    DateOfExpiryPassport?: Date;
    PlaceOfIssuePassport?: string;
    IDTypeOfPassport?: number;
    IDCountryOfIssuePassport?: number;
    VisaNumber?: string;
    DateOfIssueVisa?: Date;
    DateOfExpiryVisa?: Date;
    IDCountryOfIssueVisa?: number;
    IsDeleted?: boolean;
    
}

export interface HRM_StaffInsurancePaymentProcess
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    IDPayPeriod?: number;
    IDMainJobTitle?: number;
    IDMainDepartment?: number;
    InsuaranceSalary?: number;
    TotalAmountSIByCo?: number;
    TotalAmountHIByCo?: number;
    TotalAmountUIByCo?: number;
    TotalAmountTUFByCo?: number;
    TotalAmountPaidByCo?: number;
    TotalAmountSIByEm?: number;
    TotalAmountHIByEm?: number;
    TotalAmountUIByEm?: number;
    TotalAmountTUFByEm?: number;
    TotalAmountPaidByEm?: number;
    
}

export interface HRM_StaffInternetAccount
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    Classification?: string;
    Account?: string;
    URL?: string;
    IsBelongToCompany?: boolean;
    
}

export interface HRM_StaffLaborContract
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    IsAppendixContract?: boolean;
    IDParentContract?: number;
    ContractNumber?: string;
    IDContractType?: number;
    SignDate?: Date;
    EffectiveDate?: Date;
    ExpiryDate?: Date;
    IDContractSignedBy?: number;
    IsRenewalAutomatilly?: boolean;
    NumberOfYearsRenewal?: number;
    IDContractTemplate?: number;
    ContentOfContract?: string;
    
}

export interface HRM_StaffLearningProcess
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    FromYear?: Date;
    ToYear?: Date;
    Place?: string;
    IDSpecialist?: number;
    Result?: string;
    Certificate?: string;
    
}

export interface HRM_StaffPhone
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    Classification?: string;
    PhoneNumber?: string;
    IsBelongToCompany?: boolean;
    
}

export interface HRM_StaffPTOEnrollment
{
    IDPolicyPTO?: number;
    IDStaff?: number;
    StartDate?: Date;
    Id?: number;
    Code?: string;
    Name?: string;
    ModifiedDate?: Date;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    PTOBalance?: number;
    PTOCarryOver?: number;
    PTOYearEarned?: number;
    PTOLengthOfService?: number;
    PTOCompensatoryLeave?: number;
    StartWorkingDate?: Date;
    
}

export interface HRM_StaffRecruitmentInfo
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDRecruitmentSource?: number;
    ApplyDate?: Date;
    IDApplyJobTitle?: number;
    IDApplyDepartment?: number;
    IDRecruitmentForm?: number;
    IDProbationryDecisionSignedBy?: number;
    ProbationryDecisionSignDate?: Date;
    ProbationryDecisionEffectiveDate?: Date;
    ProbationryStartDate?: Date;
    ProbationryEndDate?: Date;
    IDMainProbationryJobTitle?: number;
    IsDeleted?: boolean;
    
}

export interface HRM_StaffResignationInfo
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    DateOfApplication?: Date;
    IDReasonForResign?: number;
    DecisionNumber?: string;
    DecisionSignDate?: Date;
    IDDecisionSignedBy?: number;
    DecisionEffectiveDate?: Date;
    
}

export interface HRM_StaffSalaryDecision
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    IDAppointDecision?: number;
    DecisionNumber?: string;
    DecisionSignDate?: Date;
    IDDecisionSignedBy?: number;
    DecisionEffectiveDate?: Date;
    IsApproved?: boolean;
    WorkDay?: number;
    InsuaranceSalary?: number;
    IsCompanyPayInsance?: boolean;
    PISalary?: number;
    IsCompanyPayPI?: boolean;
    PayRangesGrades?: string;
    PositionSalary?: number;
    PositionSalaryPercent?: number;
    PositionSalaryActual?: number;
    
}

export interface HRM_StaffSchedule
{
    IDStaff?: number;
    IDTimesheet?: number;
    IDShift?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    WorkingDate?: Date;
    IsPublished?: boolean;
    IDOffice?: number;
    TimeOffType?: string;
    IsBookBreakfastCatering?: boolean;
    IsBookLunchCatering?: boolean;
    IsBookDinnerCatering?: boolean;
    IsBreakfastChecked?: boolean;
    IsLunchChecked?: boolean;
    IsDinnerChecked?: boolean;
    IDOTPolicy?: number;
    
}

export interface HRM_StaffSpecializedField
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    IDSpecializedField?: number;
    
}

export interface HRM_StaffSpecializedSkill
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    IDSpecializedSkill?: number;
    Rating?: string;
    CertificateNumber?: string;
    DateOfIssue?: Date;
    PlaceOfIssue?: string;
    DateOfExpiry?: Date;
    
}

export interface HRM_StaffStaffAndFamilyJob
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsStaffJob?: boolean;
    IDStaff?: number;
    IDFamily?: number;
    IDJob?: number;
    
}

export interface HRM_StaffTimesheetEnrollment
{
    IDTimesheet?: number;
    IDStaff?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface HRM_StaffTrainingProcess
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    FromYear?: Date;
    ToYear?: Date;
    Place?: string;
    Result?: string;
    TrainingProgram?: string;
    TrainingContent?: string;
    
}

export interface HRM_StaffTrainingProcessSkill
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDTrainingProcess?: number;
    IDSkill?: number;
    
}

export interface HRM_StaffWelfare
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    AOMAccordingPol?: number;
    AOMAccordingAct?: number;
    DecisionNumber?: string;
    DecisionSignDate?: Date;
    IDDecisionSignedBy?: number;
    DecisionEffectiveDate?: Date;
    TimeOfEvent?: Date;
    IDFrequency?: number;
    IsIncomePerMonth?: boolean;
    IsIncomePerYear?: boolean;
    IsHasRunSalary?: boolean;
    IDPOLWelfareApplyFor?: number;
    
}

export interface HRM_StaffWorkExperience
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    FromDate?: Date;
    ToDate?: Date;
    Workplace?: string;
    IDField?: number;
    IDJobTitle?: number;
    Description?: string;
    
}

export interface HRM_StaffWorkingDiary
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDStaff?: number;
    IDEventType?: number;
    EventName?: string;
    IDRoleInEvent?: number;
    RoleDescription?: string;
    CustomerName?: string;
    StartTime?: Date;
    EndTime?: Date;
    
}

export interface HRM_Timesheet
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Type?: string;
    CheckInPolicy?: string;
    NumberOfShiftPerDay?: number;
    IsCheckOutRequired?: boolean;
    WorkingHoursPerDay?: number;
    Manager?: number;
    IsRequiredApproveToEnroll?: boolean;
    IsRequiredApproveToTransfer?: boolean;
    IsRequiredApproveToSwitch?: boolean;
    
}

export interface HRM_TimesheetAndHoliday
{
    IDTimesheet?: number;
    IDHoliday?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface HRM_TimesheetCheckInCode
{
    IDOffice?: number;
    IDStaff?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface HRM_TimesheetCycle
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Start?: Date;
    End?: Date;
    
}

export interface HRM_TimesheetCycleDetail
{
    IDTimesheetCycle?: number;
    IDTimesheet?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface HRM_TimesheetFormula
{
    IDTimesheet?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Formua?: string;
    
}

export interface HRM_TimesheetLog
{
    IDStaff?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    LogTime?: Date;
    Lat?: string;
    Long?: string;
    IDGate?: number;
    Image?: string;
    IPAddress?: string;
    UUID?: string;
    IsValidLog?: boolean;
    IsOpenLog?: boolean;
    IsMockLocation?: boolean;
    
}

export interface LIST_AddressSubdivision
{
    IDParent?: number;
    Id?: number;
    Icon?: string;
    Color?: string;
    Type?: string;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    ZipCode?: string;
    Lat?: string;
    Long?: string;
    FromDate?: Date;
    ToDate?: Date;
    Remark?: string;
    ForeignRemark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface LIST_Bank
{
    Id?: number;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Type?: string;
    Icon?: string;
    Color?: string;
    Logo?: string;
    Remark?: string;
    ForeignRemark?: string;
    Address?: string;
    Hotline?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface LIST_ContractTemplate
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    ContentOfContract?: string;
    
}

export interface LIST_Country
{
    Id?: number;
    Code?: string;
    Name?: string;
    FormalName?: string;
    CountryType?: string;
    CountrySubType?: string;
    Sovereignty?: string;
    Capital?: string;
    CurrencyCode?: string;
    CurrencyName?: string;
    TelephoneCode?: string;
    CountryCode3?: string;
    CountryNumber?: string;
    InternetCountryCode?: string;
    Flags?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface LIST_ElementOfSalary
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Recipe?: string;
    
}

export interface LIST_General
{
    IDPartner?: number;
    IDParent?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Remark?: string;
    ForeignRemark?: string;
    Color?: string;
    Sort?: number;
    IsSysAttrib?: boolean;
    IsDefault?: boolean;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface LIST_PayPeriod
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    StartDay?: Date;
    EndDay?: Date;
    
}

export interface MR_CompetiorOrder
{
    IDTrackingCompetitor?: number;
    IDService?: number;
    IDProductType?: number;
    Id?: number;
    CustomerName?: string;
    Day?: number;
    Month?: number;
    Year?: number;
    NumberOfEvent?: number;
    NumberOfGuests?: number;
    Revenue?: number;
    Remark?: string;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface MR_TrackingCompetitor
{
    IDBranch?: number;
    IDAccount?: number;
    Id?: number;
    Code?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDSegment?: number;
    AveragePrice?: number;
    FromDate?: Date;
    
}

export interface OST_Office
{
    Id?: number;
    Code?: string;
    Name?: string;
    Address?: string;
    Phone?: string;
    Email?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface OST_OfficeGate
{
    IDOffice?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Type?: string;
    IPAddress?: string;
    IsVerifyLocation?: boolean;
    Lat?: string;
    Long?: string;
    MaxDistance?: number;
    IsCateringService?: boolean;
    CanCheckinBreakfast?: boolean;
    CanCheckinLunch?: boolean;
    CanCheckinDinner?: boolean;
    BreakfastStart?: Date;
    BreakfastEnd?: Date;
    LunchStart?: Date;
    LunchEnd?: Date;
    DinnerStart?: Date;
    DinnerEnd?: Date;
    
}

export interface PM_ProjectPeople
{
    IDProject?: number;
    IDStaff?: number;
    IDContact?: number;
    Id?: number;
    Type?: string;
    Code?: string;
    Name?: string;
    ShortName?: string;
    Avatar?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Role?: string;
    Rate?: number;
    
}

export interface PM_Space
{
    IDBrannch?: number;
    IDWorkspace?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Icon?: string;
    Color?: string;
    Remark?: string;
    Sort?: number;
    IsPrivate?: boolean;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    ViewConfig?: string;
    
}

export interface PM_SpaceStatus
{
    IDSpace?: number;
    IDProject?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Type?: string;
    Icon?: string;
    Color?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface PM_Task
{
    IDBranch?: number;
    IDOpportunity?: number;
    IDLead?: number;
    IDSpace?: number;
    IDProject?: number;
    IDOwner?: number;
    IDParent?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Type?: string;
    SubType?: string;
    Status?: string;
    Remark?: string;
    Sort?: number;
    StartDate?: Date;
    EndDate?: Date;
    PredictedClosingDate?: Date;
    Duration?: number;
    ExpectedRevenue?: number;
    BudgetedCost?: number;
    ActualCost?: number;
    ActualRevenue?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    StartDatePlan?: Date;
    EndDatePlan?: Date;
    DurationPlan?: number;
    Deadline?: Date;
    Progress?: number;
    IsOpen?: boolean;
    Priority?: number;
    IsUnscheduled?: boolean;
    IsSplited?: boolean;
    IDLinkedDocument?: number;
    DocumentType?: string;
    
}

export interface PM_TaskAssignment
{
    IDTask?: number;
    IDPerson?: number;
    Id?: number;
    Type?: string;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface PM_TaskLink
{
    Id?: number;
    Type?: string;
    Source?: number;
    Target?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface PM_View
{
    IDProject?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Type?: string;
    Icon?: string;
    Color?: string;
    Remark?: string;
    Sort?: number;
    IsPrivate?: boolean;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    ViewConfig?: string;
    
}

export interface PM_Workspace
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Icon?: string;
    Color?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface POS_BillTable
{
    IDOrder?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    IDTable?: number;
    
}

export interface POS_Cash
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface POS_Kitchen
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    IDPrinter?: number;
    
}

export interface POS_MemberCardPromotion
{
    IDBranch?: number;
    IDMemberCard?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    FoodDiscount?: number;
    WineDiscount?: number;
    BirthdayDiscount?: number;
    Over20PersonDiscount?: number;
    OtherDiscount?: number;
    GemLoungeDiscount?: number;
    
}

export interface POS_Memo
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Type?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface POS_Menu
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    Image?: string;
    PDF?: string;
    
}

export interface POS_MenuDetail
{
    IDMenu?: number;
    IDItem?: number;
    IDKitchen?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    Image?: string;
    
}

export interface POS_Table
{
    IDBranch?: number;
    IDTableGroup?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    XCoordinate?: number;
    YCoordinate?: number;
    Length?: number;
    Width?: number;
    Height?: number;
    MaxGuest?: number;
    IsAllowSmoking?: boolean;
    IsNearWindow?: boolean;
    IsBooth?: boolean;
    IsPrivacy?: boolean;
    Status?: string;
    Type?: string;
    IsRoundTable?: boolean;
    Rotation?: number;
    ChairImage?: string;
    ChairNumber?: number;
    IsAllowMultipleOrder?: boolean;
    IsAllowCustomerOrder?: boolean;
    
}

export interface POS_TableGroup
{
    IDBranch?: number;
    IDKitchen?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    Length?: number;
    Width?: number;
    Height?: number;
    IDPrinter?: number;
    
}

export interface POS_TableGroupStaff
{
    IDTableGroup?: number;
    IDStaff?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface POS_Terminal
{
    IDBranch?: number;
    IDPrinter?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface POS_WorkOrderCoordinate
{
    IDTableGroup?: number;
    IDMenuDetail?: number;
    IDKitchen?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface PR_Deal
{
    IDBranch?: number;
    IDItem?: number;
    IDItemUoM?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Status?: string;
    FromDate?: Date;
    ToDate?: Date;
    FromHour?: Date;
    ToHour?: Date;
    IsByPercent?: boolean;
    DiscountByPercent?: number;
    Price?: number;
    Price1?: number;
    Price2?: number;
    Quantity?: number;
    MaxPerOrder?: number;
    NumberOfUsed?: number;
    
}

export interface PR_Program
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Type?: string;
    Status?: string;
    FromDate?: Date;
    ToDate?: Date;
    IsPublic?: boolean;
    IsAutoApply?: boolean;
    IsApplyAllProduct?: boolean;
    IsApplyAllCustomer?: boolean;
    MinOrderValue?: number;
    IsByPercent?: boolean;
    MaxValue?: number;
    Value?: number;
    NumberOfCoupon?: number;
    MaxUsagePerCustomer?: number;
    IsDiscount?: boolean;
    IsItemPromotion?: boolean;
    NumberOfUsed?: number;
    
}

export interface PR_ProgramCondition
{
    IDProgram?: number;
    IDParent?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Attribute?: string;
    Operator?: string;
    Type?: string;
    IDItemUoM?: number;
    Amount?: number;
    Value?: string;
    
}

export interface PR_ProgramItem
{
    IDProgram?: number;
    IDItem?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDItemUoM?: number;
    
}

export interface PR_ProgramPartner
{
    IDProgram?: number;
    IDPartner?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface PR_ProgramReward
{
    IDCondition?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Type?: string;
    IDItem?: number;
    IDItemUoM?: number;
    PromotionQuantity?: number;
    DiscountAmount?: number;
    DiscountPercent?: number;
    IsRewardByOrder?: boolean;
    MaxAmount?: number;
    
}

export interface PR_PromotionTracking
{
    Id?: number;
    MaNVBH?: string;
    TenNVBH?: string;
    MaKH?: string;
    TenKH?: string;
    DiaChi?: string;
    MaDH?: string;
    TrangThai?: string;
    NgayDonHang?: Date;
    NgayHoaDon?: Date;
    ClaimDate?: Date;
    TenChuongTrinh?: string;
    MaSP?: string;
    TenSP?: string;
    SoThung?: number;
    SoLe?: number;
    TongLe?: number;
    ChietKhau?: number;
    
}

export interface PROD_BillOfMaterials
{
    Id?: number;
    Name?: string;
    IDItem?: number;
    Type?: string;
    Quantity?: number;
    IDWarehouse?: number;
    IDPriceList?: number;
    IDStdCostPriceList?: number;
    BatchSize?: number;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface PROD_BillOfMaterialsDetail
{
    IDBOM?: number;
    Id?: number;
    Type?: string;
    IDItem?: number;
    IDUoM?: number;
    Quantity?: number;
    AdditionalQuantity?: number;
    UoMPrice?: number;
    IssueMethod?: string;
    IDWarehouse?: number;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface PROD_ItemInVendor
{
    Id?: number;
    IDVendor?: number;
    IDItem?: number;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface PROD_MRPItem
{
    IDMRP?: number;
    IDItem?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface PROD_MRPPegging
{
    IDMRP?: number;
    IDWarehouse?: number;
    IDParentItem?: number;
    IDItem?: number;
    Id?: number;
    Period?: string;
    Quantity?: number;
    BaseDocument?: number;
    BaseRow?: number;
    Type?: string;
    DueDate?: Date;
    StockType?: string;
    StartDate?: Date;
    EndDate?: Date;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface PROD_MRPPreventDocument
{
    IDMRP?: number;
    Id?: number;
    RefId?: number;
    Code?: string;
    Type?: string;
    SubType?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface PROD_MRPRecommendation
{
    IDMRP?: number;
    Id?: number;
    SAPMRP?: number;
    SAPMRPLine?: number;
    IDItem?: number;
    IDUoM?: number;
    IDPreferVendor?: number;
    MRPType?: string;
    Name?: string;
    Code?: string;
    Remark?: string;
    Startdate?: Date;
    EndDate?: Date;
    MRPLeadtime?: number;
    MRPToleranDay?: number;
    DueDate?: Date;
    UnitPrice?: number;
    Discount?: number;
    PriceAfterDiscount?: number;
    QuantityOrdered?: number;
    QuantityInStock?: number;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDPurchaseOrder?: number;
    Status?: string;
    IDBranch?: number;
    
}

export interface PROD_MRPResult
{
    IDMRP?: number;
    IDItem?: number;
    Id?: number;
    Period?: string;
    InitialQuantity?: number;
    OriginalInitialQuantity?: number;
    IncomingStock?: number;
    OutgoingStock?: number;
    FinalQuantity?: number;
    OriginalFinalQuantity?: number;
    Requests?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface PROD_MRPScenario
{
    IDBranch?: number;
    IDSaleForecast?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    Period?: string;
    StartDate?: Date;
    EndDate?: Date;
    MaximumCumulativeLeadTime?: number;
    IsHolidaysForProduction?: boolean;
    IsHolidaysForPurchase?: boolean;
    ItemsGroup?: number;
    IsConsiderExistingInventory?: boolean;
    IsConsiderPurchaseOrders?: boolean;
    IsConsiderSalesOrders?: boolean;
    IsConsiderWorkOrders?: boolean;
    IsMinimumInventoryLevel?: boolean;
    IsItemsWithoutRequirement?: boolean;
    IsScenarioASimulation?: boolean;
    LastExecuteDate?: Date;
    IsReserveInvoice?: boolean;
    IsInventoryTransferRequest?: boolean;
    InventoryLevel?: string;
    IsRecommendPurchaseOrder?: boolean;
    IsRecommendProductionOrder?: boolean;
    IsRecommendITRQ?: boolean;
    IsRecommendToDefaultWarehouse?: boolean;
    IsOnlyNettable?: boolean;
    IsExpandedPurchaseOrder?: boolean;
    IsExpandedSalesOrder?: boolean;
    RecommendationCalculatedDate?: Date;
    IsRecurringOrderTransactions?: boolean;
    IsExpandedReserveInvoice?: boolean;
    IsExpandedProductionOrder?: boolean;
    IsIgnoreCumulativeLeadTime?: boolean;
    IsConsiderPurchaseRequest?: boolean;
    IsConsiderPurchaseQuotations?: boolean;
    IsConsiderSalesQuotations?: boolean;
    IsExpandedPurchaseRequest?: boolean;
    IsExpandedPurchaseQuotations?: boolean;
    IsExpandedSalesQuotations?: boolean;
    IsExpandedTransferRequest?: boolean;
    IsDisplaySelectedItemOnly?: boolean;
    
}

export interface PROD_MRPWarehouse
{
    IDMRP?: number;
    IDWarehouse?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface PROD_Order
{
    IDBranch?: number;
    IDWarehouse?: number;
    IDCustomer?: number;
    IDProject?: number;
    IDSaleOrder?: number;
    IDParent?: number;
    IDTransaction?: number;
    IDBOM?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    PickRemark?: string;
    JournalRemark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    Status?: string;
    Type?: string;
    PlannedQuantity?: number;
    CompletedQuantity?: number;
    RejectedQuantity?: number;
    OrderDate?: Date;
    StartDate?: Date;
    DueDate?: Date;
    ClosingDate?: Date;
    ReleaseDate?: Date;
    IsPrinted?: boolean;
    DistributionRule1?: string;
    DistributionRule2?: string;
    DistributionRule3?: string;
    DistributionRule4?: string;
    DistributionRule5?: string;
    SequenceCode?: number;
    SerialNumber?: number;
    Series?: number;
    SeriesString?: string;
    SubseriesString?: string;
    Priority?: number;
    RoutingDateCalculation?: string;
    DataSource?: string;
    
}

export interface PROD_OrderDetail
{
    IDProductionOrder?: number;
    Id?: number;
    Type?: string;
    IDItem?: number;
    IDUoM?: number;
    BaseQuantity?: number;
    AdditionalQuantity?: number;
    PlannedQuantity?: number;
    IssuedQuantity?: number;
    IssueMethod?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    WIPAccount?: string;
    DistributionRule1?: string;
    DistributionRule2?: string;
    DistributionRule3?: string;
    DistributionRule4?: string;
    DistributionRule5?: string;
    PickStatus?: string;
    PickQuantity?: number;
    IDPickingList?: number;
    ReleasedQuantity?: number;
    ResourceAllocation?: string;
    StartDate?: Date;
    EndDate?: Date;
    IDStage?: number;
    RequiredDays?: number;
    Status?: string;
    
}

export interface PURCHASE_Order
{
    IDBranch?: number;
    IDStorer?: number;
    IDVendor?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Remark?: string;
    ForeignRemark?: string;
    ExpectedReceiptDate?: Date;
    ReceiptedDate?: Date;
    Status?: string;
    PaymentStatus?: string;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    OrderDate?: Date;
    Type?: string;
    RefId?: string;
    
}

export interface PURCHASE_OrderDetail
{
    IDOrder?: number;
    Id?: number;
    Code?: string;
    Remark?: string;
    ForeignRemark?: string;
    IDItem?: number;
    IDUoM?: number;
    IDBaseUoM?: number;
    UoMSwap?: number;
    UoMSwapAlter?: number;
    UoMQuantityExpected?: number;
    QuantityAdjusted?: number;
    QuantityExpected?: number;
    QuantityReceived?: number;
    QuantityRejected?: number;
    IsPromotionItem?: boolean;
    IDTax?: number;
    TaxRate?: number;
    TotalAfterTax?: number;
    TotalBeforeDiscount?: number;
    UoMPrice?: number;
    TotalDiscount?: number;
    TotalAfterDiscount?: number;
    Tax?: number;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    SuggestedQuantity?: number;
    
}

export interface PURCHASE_Request
{
    IDBranch?: number;
    IDRequester?: number;
    IDRequestBranch?: number;
    IDVendor?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Remark?: string;
    ForeignRemark?: string;
    ContentType?: string;
    Status?: string;
    RequiredDate?: Date;
    PostingDate?: Date;
    DueDate?: Date;
    DocumentDate?: Date;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface PURCHASE_RequestDetail
{
    IDRequest?: number;
    IDItem?: number;
    IDItemUoM?: number;
    IDBaseUoM?: number;
    IDVendor?: number;
    Id?: number;
    Sort?: number;
    Code?: string;
    Name?: string;
    Status?: string;
    Remark?: string;
    RequiredDate?: Date;
    UoMPrice?: number;
    Quantity?: number;
    QuantityRemainingOpen?: number;
    UoMSwap?: number;
    UoMSwapAlter?: number;
    IDTax?: number;
    TaxRate?: number;
    TotalAfterTax?: number;
    TotalBeforeDiscount?: number;
    TotalDiscount?: number;
    TotalAfterDiscount?: number;
    Tax?: number;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface SALE_Forecast
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    StartDate?: Date;
    EndDate?: Date;
    Period?: string;
    LastExecuteDate?: Date;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    Multiply?: number;
    Filter?: string;
    Config?: string;
    
}

export interface SALE_ForecastDetail
{
    IDWarehouse?: number;
    IDForecast?: number;
    IDItem?: number;
    IDUoM?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Date?: Date;
    Quantity?: number;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface SALE_Order
{
    IDBranch?: number;
    IDOpportunity?: number;
    IDContact?: number;
    IDContract?: number;
    IDStatus?: number;
    IDType?: number;
    IDParent?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    IDOwner?: number;
    OrderDate?: Date;
    OriginalTotalBeforeDiscount?: number;
    OriginalPromotion?: number;
    OriginalDiscount1?: number;
    OriginalDiscount2?: number;
    OriginalDiscountByItem?: number;
    OriginalDiscountByGroup?: number;
    OriginalDiscountByLine?: number;
    OriginalDiscountByOrder?: number;
    OriginalDiscountFromSalesman?: number;
    OriginalTotalDiscount?: number;
    OriginalTotalAfterDiscount?: number;
    OriginalTax?: number;
    OriginalTotalAfterTax?: number;
    TotalBeforeDiscount?: number;
    ProductWeight?: number;
    ProductDimensions?: number;
    Discount1?: number;
    Discount2?: number;
    DiscountByItem?: number;
    Promotion?: number;
    DiscountByGroup?: number;
    DiscountByLine?: number;
    DiscountByOrder?: number;
    DiscountFromSalesman?: number;
    TotalDiscount?: number;
    TotalAfterDiscount?: number;
    Tax?: number;
    TotalAfterTax?: number;
    Received?: number;
    Debt?: number;
    IsDebt?: boolean;
    IsPaymentReceived?: boolean;
    SubType?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    ExpectedDeliveryDate?: Date;
    ShippedDate?: Date;
    ShippingAddress?: string;
    ShippingAddressRemark?: string;
    InvoiceNumber?: string;
    InvoicDate?: Date;
    TaxRate?: number;
    RefID?: string;
    RefOwner?: string;
    RefContact?: string;
    RefWarehouse?: string;
    RefDepartment?: string;
    RefShipper?: string;
    IsCOD?: boolean;
    CODAmount?: number;
    ShipFee?: number;
    ShipFeeBySender?: boolean;
    IsSampleOrder?: boolean;
    IsShipBySaleMan?: boolean;
    IsUrgentOrders?: boolean;
    IDUrgentShipper?: number;
    IsWholeSale?: boolean;
    ReceivedDiscountFromSalesman?: number;
    OldReceived?: number;
    IDAddress?: number;
    PaymentMethod?: string;
    Type?: string;
    Status?: string;
    IsInvoiceRequired?: boolean;
    OrderSource?: string;
    Currency?: string;
    DueDate?: Date;
    IDDistributor?: number;
    IDSalesTeam?: number;
    NumberOfGuests?: number;
    IDCashier?: number;
    IDPriceList?: number;
    CalcTotal?: number;
    CalcOriginalTotalAdditions?: number;
    CalcOriginalTotalDeductions?: number;
    CalcTotalOriginal?: number;
    CalcTotalAdditions?: number;
    CalcTotalDeductions?: number;
    CancellationReason?: string;
    TaxCode?: string;
    
}

export interface SALE_OrderAddition
{
    IDOrder?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Type?: string;
    IssuedFor?: number;
    Amount?: number;
    IDOrderLine?: number;
    IDTax?: number;
    TaxRate?: number;
    JournalAccount?: string;
    OriginalAmount?: number;
    CalcTotalAfterTax?: number;
    CalcOriginalTotalAfterTax?: number;
    
}

export interface SALE_OrderDeduction
{
    IDOrder?: number;
    IDOrderLine?: number;
    IDProgram?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Type?: string;
    IssuedBy?: number;
    IsByPercent?: boolean;
    Percent?: number;
    OriginalAmount?: number;
    Amount?: number;
    
}

export interface SALE_OrderDetail
{
    Id?: number;
    RefID?: number;
    IDOrder?: number;
    RefOrder?: string;
    IDItem?: number;
    RefItem?: string;
    IDUoM?: number;
    UoMPrice?: number;
    Quantity?: number;
    UoMSwap?: number;
    IDBaseUoM?: number;
    BaseQuantity?: number;
    IsPromotionItem?: boolean;
    IDPromotion?: number;
    IDTax?: number;
    TaxRate?: number;
    OriginalTotalBeforeDiscount?: number;
    OriginalPromotion?: number;
    OriginalDiscount1?: number;
    OriginalDiscount2?: number;
    OriginalDiscountByItem?: number;
    OriginalDiscountByGroup?: number;
    OriginalDiscountByLine?: number;
    OriginalDiscountByOrder?: number;
    OriginalDiscountFromSalesman?: number;
    OriginalTotalDiscount?: number;
    OriginalTotalAfterDiscount?: number;
    OriginalTax?: number;
    OriginalTotalAfterTax?: number;
    ShippedQuantity?: number;
    ReturnedQuantity?: number;
    TotalBeforeDiscount?: number;
    Discount1?: number;
    Discount2?: number;
    DiscountByItem?: number;
    Promotion?: number;
    DiscountByGroup?: number;
    DiscountByLine?: number;
    DiscountByOrder?: number;
    DiscountFromSalesman?: number;
    TotalDiscount?: number;
    TotalAfterDiscount?: number;
    Tax?: number;
    TotalAfterTax?: number;
    Remark?: string;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    ProductStatus?: string;
    ProductWeight?: number;
    ProductDimensions?: number;
    ExpectedDeliveryDate?: Date;
    ShippedDate?: Date;
    UoMSwapAlter?: number;
    CalcOriginalTotalAdditions?: number;
    CalcOriginalTotalDeductions?: number;
    CalcTotalOriginal?: number;
    CalcTotalAdditions?: number;
    CalcTotalDeductions?: number;
    CalcTotal?: number;
    Type?: string;
    Status?: string;
    Sort?: number;
    IDDeal?: number;
    IDPriceList?: number;
    CancellationReason?: string;
    
}

export interface SHIFT_TimeSheet
{
    IDBranch?: number;
    IDDoctor?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Start?: string;
    End?: string;
    OffTimes?: string;
    EventGroup?: number;
    Type?: number;
    
}

export interface SHIP_Shipment
{
    IDBranch?: number;
    IDContact?: number;
    IDStatus?: number;
    IDType?: number;
    IDVehicle?: number;
    IDShipper?: number;
    IDWarehouse?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    DeliveryDate?: Date;
    ShippedDate?: Date;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    ConfirmFinishedBy?: string;
    ConfirmFinishedDate?: Date;
    IsLostMoney?: boolean;
    LostAmount?: number;
    LostRemark?: string;
    
}

export interface SHIP_ShipmentDebt
{
    IDShipment?: number;
    IDSaleOrder?: number;
    IDStatus?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Debt?: number;
    Received?: number;
    
}

export interface SHIP_ShipmentDetail
{
    IDShipment?: number;
    IDSaleOrder?: number;
    IDStatus?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    ProductWeight?: number;
    ProductDimensions?: number;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Received?: number;
    ShippedDate?: Date;
    
}

export interface SHIP_Vehicle
{
    IDBranch?: number;
    IDVehicleGroup?: number;
    IDShipper?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    DateOfPurchase?: Date;
    DateOfRegistration?: Date;
    DateOfRegistrationExpire?: Date;
    Length?: number;
    Width?: number;
    Height?: number;
    VolumeMin?: number;
    VolumeRecommend?: number;
    VolumeMax?: number;
    WeightMin?: number;
    WeightRecommend?: number;
    WeightMax?: number;
    IsForSample?: boolean;
    IsForUrgent?: boolean;
    IsForWholeSale?: boolean;
    RefShipper?: string;
    
}

export interface SYS_AccountGroup
{
    Id?: number;
    Type?: string;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface SYS_Action
{
    IDProvider?: number;
    IDSchema?: number;
    Id?: number;
    Type?: string;
    Group?: string;
    Icon?: string;
    Color?: string;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    IsTriggerable?: boolean;
    RunnerConfig?: string;
    
}

export interface SYS_ActionAPIRunner
{
    IDAction?: number;
    IDAPICollection?: number;
    Id?: number;
    Type?: string;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface SYS_APICollection
{
    IDProvider?: number;
    IDParent?: number;
    Id?: number;
    Type?: string;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    Params?: string;
    URL?: string;
    Method?: string;
    Header?: string;
    Body?: string;
    Authorization?: string;
    BeforeRequestScript?: string;
    AfterResponseScript?: string;
    Setting?: string;
    Varibles?: string;
    
}

export interface SYS_APIController
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    
}

export interface SYS_AppleAppRedemption
{
    Id?: number;
    Code?: string;
    Url?: string;
    IsUsed?: boolean;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface SYS_Apps
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    AppSecret?: string;
    IdentityTokenLifetime?: number;
    AccessTokenLifetime?: number;
    RequireConsent?: boolean;
    AppColor?: string;
    
}

export interface SYS_BranchInGroup
{
    IDBranch?: number;
    IDAccountGroup?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface SYS_Config
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Value?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface SYS_ConfigOption
{
    IDProvider?: number;
    IDParent?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    DataType?: string;
    DefaultValue?: string;
    SelectOptions?: string;
    Formula?: string;
    UDFListID?: number;
    IsRequired?: boolean;
    IsHidden?: boolean;
    HiddenFormula?: boolean;
    IsValidated?: boolean;
    ValidatePattern?: string;
    ValidateMessage?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsProtected?: boolean;
    
}

export interface SYS_Currency
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Decimals?: number;
    
}

export interface SYS_DataPermissionList
{
    IDRole?: number;
    IDForm?: number;
    Id?: number;
    IDBranch?: number;
    Visible?: boolean;
    IsDeleted?: boolean;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface SYS_Form
{
    IDFormGroup?: number;
    IDParent?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    APIs?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Type?: number;
    Icon?: string;
    BadgeColor?: string;
    
}

export interface SYS_FormGroup
{
    IDApp?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Type?: number;
    Icon?: string;
    ClassName?: string;
    
}

export interface SYS_GlobalConfig
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Value?: string;
    IsLocalHost?: boolean;
    
}

export interface SYS_IntegrationProvider
{
    Id?: number;
    Type?: string;
    Icon?: string;
    Color?: string;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface SYS_IntegrationReferenceIdentity
{
    Id?: number;
    ERPId?: number;
    ERPCode?: string;
    Type?: string;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    Provider?: string;
    SubProvider?: string;
    RefNum1?: number;
    RefNum2?: number;
    RefNum3?: number;
    RefNum4?: number;
    RefChar1?: string;
    RefChar2?: string;
    RefChar3?: string;
    RefChar4?: string;
    
}

export interface SYS_Log
{
    Id?: number;
    AppName?: string;
    LoggedBy?: string;
    Date?: Date;
    Level?: string;
    Logger?: string;
    Message?: string;
    Method?: string;
    API?: string;
    Data?: string;
    Exception?: string;
    Thread?: string;
    IPAddress?: string;
    IPAddressLan?: string;
    IsDeleted?: boolean;
    AppVersion?: string;
    Segment0?: string;
    Segment1?: string;
    Segment2?: string;
    Segment3?: string;
    Segment4?: string;
    Segment5?: string;
    Segment6?: string;
    Segment7?: string;
    Segment8?: string;
    Segment9?: string;
    
}

export interface SYS_MessageTemplate
{
    IDPartner?: number;
    IDBranch?: number;
    Id?: number;
    Type?: string;
    Icon?: string;
    Color?: string;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface SYS_PermissionList
{
    IDBranch?: number;
    IDAccountGroup?: number;
    IDForm?: number;
    Id?: number;
    Value?: number;
    Visible?: boolean;
    IsDeleted?: boolean;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface SYS_Printer
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    Host?: string;
    Port?: string;
    IsSecure?: boolean;
    MarginTop?: number;
    MarginRight?: number;
    MarginBottom?: number;
    MarginLeft?: number;
    PageSize?: string;
    Scale?: number;
    
}

export interface SYS_RuningNo
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Prefix?: string;
    BaseRadixType?: number;
    Value?: string;
    
}

export interface SYS_SAP_Databases
{
    Id?: number;
    IDBranch?: number;
    DatabaseName?: string;
    Username?: string;
    Password?: string;
    APIBaseUrl?: string;
    
}

export interface SYS_Schema
{
    Id?: number;
    Type?: string;
    Icon?: string;
    Color?: string;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface SYS_SchemaDetail
{
    IDSchema?: number;
    IDParent?: number;
    Id?: number;
    PropertyType?: string;
    DataType?: string;
    Format?: string;
    Aggregate?: string;
    Icon?: string;
    Color?: string;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface SYS_Status
{
    IDParent?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Color?: string;
    Sort?: number;
    IsSysAttrib?: boolean;
    IsDefault?: boolean;
    IsSMS?: boolean;
    IsEmail?: boolean;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Icon?: string;
    
}

export interface SYS_SyncJob
{
    Id?: number;
    Type?: string;
    Command?: string;
    IDBranch?: number;
    RefNum1?: number;
    RefNum2?: number;
    RefNum3?: number;
    RefNum4?: number;
    RefChar1?: string;
    RefChar2?: string;
    RefChar3?: string;
    RefChar4?: string;
    RefChar5?: string;
    RefChar6?: string;
    RefChar7?: string;
    RefChar8?: string;
    RefChar9?: string;
    RefDate1?: Date;
    RefDate2?: Date;
    RefDate3?: Date;
    RefDate4?: Date;
    IsDone?: boolean;
    IsRunning?: boolean;
    TryCount?: number;
    ExeDate?: Date;
    ErrorMessage?: string;
    Request?: string;
    Response?: string;
    CreatedDate?: Date;
    CreatedBy?: string;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface SYS_Translate
{
    Id?: number;
    Code?: string;
    Name?: string;
    Lang1?: string;
    Lang2?: string;
    Lang3?: string;
    Lang4?: string;
    Lang5?: string;
    Lang6?: string;
    Lang7?: string;
    Lang8?: string;
    Lang9?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface SYS_Trigger
{
    IDProvider?: number;
    IDAction?: number;
    Id?: number;
    Type?: string;
    Icon?: string;
    Color?: string;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    PerformedBy?: string;
    TriggerWhen?: string;
    Frequency?: string;
    
}

export interface SYS_TriggerAction
{
    IDTrigger?: number;
    IDAction?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface SYS_TriggerActionConfig
{
    IDTriggerAction?: number;
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Value?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface SYS_TriggerActionDataMapping
{
    IDTriggerAction?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    ERPProperty?: string;
    ProviderProperty?: string;
    DataType?: string;
    Format?: string;
    
}

export interface SYS_Type
{
    IDPartner?: number;
    IDParent?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Remark?: string;
    ForeignRemark?: string;
    Color?: string;
    Sort?: number;
    IsSysAttrib?: boolean;
    IsDefault?: boolean;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Type?: string;
    Icon?: string;
    
}

export interface SYS_UserDevice
{
    IDStaff?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Model?: string;
    Platform?: string;
    OperatingSystem?: string;
    OsVersion?: string;
    Manufacturer?: string;
    IsVirtual?: boolean;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    MemUsed?: number;
    DiskFree?: number;
    DiskTotal?: number;
    RealDiskFree?: number;
    RealDiskTotal?: number;
    WebViewVersion?: string;
    BatteryLevel?: number;
    IsCharging?: boolean;
    IsAllowCheckIn?: boolean;
    NotifyToken?: string;
    
}

export interface SYS_UserInGroup
{
    IDUser?: string;
    IDAccountGroup?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface SYS_UserSetting
{
    IDBranch?: number;
    IDUser?: string;
    Email?: string;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Value?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface SYS_UserVoice
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Stars?: number;
    
}

export interface SYS_VeifyPhoneNumber
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    PhoneNumber?: string;
    VerifyCode?: string;
    IsVerified?: boolean;
    VerifiedDate?: Date;
    
}

export interface TRACK_Link
{
    IDBranch?: number;
    Id?: number;
    Type?: string;
    LongURL?: string;
    Code?: string;
    Name?: string;
    Remark?: string;
    QRCodeLevel?: string;
    QRCodeMode?: string;
    QRCodeVersion?: string;
    ExpiryDate?: Date;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface TRACK_LinkLog
{
    IDLink?: number;
    Id?: number;
    Code?: string;
    Domain?: string;
    IsFirstEventInVisit?: string;
    IsLastEventInVisit?: string;
    IsFirstEvent?: string;
    IsCurrentEvent?: string;
    EventName?: string;
    EventDisplayName?: string;
    Integration?: string;
    Platform?: string;
    IsHTTPS?: string;
    EventType?: string;
    EventDuration?: string;
    EventTimestamp?: string;
    Triggerable?: string;
    CampaignName?: string;
    CampaignSource?: string;
    CampaignMedium?: string;
    CampaignContent?: string;
    CampaignTerm?: string;
    CampaignID?: string;
    FirstEventTimestamp?: string;
    FirstReferrerType?: string;
    FirstReferrerURL?: string;
    FirstLandingPage?: string;
    FirstCampaignName?: string;
    FirstCampaignSource?: string;
    FirstCampaignMedium?: string;
    FirstCampaignContent?: string;
    FirstCampaignTerm?: string;
    City?: string;
    State?: string;
    Country?: string;
    Continent?: string;
    TimeZone?: string;
    TimeZoneOffset?: string;
    DeviceType?: string;
    IPAddress?: string;
    ScreenResolution?: string;
    Language?: string;
    OperatingSystem?: string;
    Browser?: string;
    VisitDate?: string;
    HourOfVisit?: string;
    DayOfVisit?: string;
    WeekOfVisit?: string;
    MonthOfVisit?: string;
    YearOfVisit?: string;
    DurationOfVisit?: string;
    ReferrerType?: string;
    ReferrerURL?: string;
    LandingPagePath?: string;
    TotalOfEventsperVisit?: string;
    IsFirstVisit?: string;
    
}

export interface Version
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    VersionDate?: Date;
    
}

export interface WEB_Category
{
    IDParent?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    ThumbnailImage?: string;
    Approved?: boolean;
    Language?: string;
    Summary?: string;
    URL?: string;
    SEO1?: string;
    SEO2?: string;
    IsBuildIn?: boolean;
    
}

export interface WEB_Content
{
    IDCategory?: number;
    IDParent?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Type?: number;
    ThumbnailImage?: string;
    Image?: string;
    AlternateImage?: string;
    PublishDate?: Date;
    ViewCount?: number;
    Reviews?: string;
    AllowComment?: boolean;
    LikeCount?: number;
    Language?: string;
    Summary?: string;
    Content?: string;
    AlterName?: string;
    ReadMoreText?: string;
    SEO1?: string;
    SEO2?: string;
    Approved?: boolean;
    URL?: string;
    Pin?: boolean;
    PinPos?: number;
    Home?: boolean;
    HomePos?: number;
    
}

export interface WEB_Content_Tag
{
    IDContent?: number;
    IDTag?: number;
    Id?: number;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WEB_ContentInCategory
{
    IDCategory?: number;
    IDContent?: number;
    Id?: number;
    URL?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WEB_Tag
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WH_Branches
{
    Id?: number;
    IDParent?: number;
    IDType?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    TaxCode?: string;
    BankAccount?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    CreatedBy?: string;
    ModifiedBy?: string;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    Sort?: number;
    
}

export interface WH_CashFlows
{
    Id?: number;
    IDBranch?: number;
    IDParent?: number;
    Level?: number;
    Drawer?: number;
    Name?: string;
    Code?: string;
    Remark?: string;
    IsActive?: boolean;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface WH_ContactGroups
{
    Id?: number;
    IDBranch?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDGroupType?: number;
    IsLocked?: boolean;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    Sort?: number;
    
}

export interface WH_Contacts
{
    Id?: number;
    IDBranch?: number;
    IDBusinessPartnerGroup?: number;
    RefId?: number;
    Code?: string;
    Name?: string;
    CompanyName?: string;
    TaxCode?: string;
    IsStaff?: boolean;
    IsCustomer?: boolean;
    IsVendor?: boolean;
    IsBranch?: boolean;
    IsWholeSale?: boolean;
    IsDistributor?: boolean;
    IsStorer?: boolean;
    IsCarrier?: boolean;
    IsOutlets?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    Sort?: number;
    
}

export interface WH_GeneralLedgers
{
    Id?: number;
    IDParent?: number;
    IDBranch?: number;
    RefParentCode?: string;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Remark?: string;
    ForeignRemark?: string;
    CurrentBalance?: number;
    OpeningBalance?: number;
    IsTaxIncome?: boolean;
    IsCashAccount?: boolean;
    IsBudget?: boolean;
    IsFrozenAccount?: boolean;
    Level?: number;
    Counter?: number;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    Sort?: number;
    
}

export interface WH_InvoiceRows
{
    IDBranch?: number;
    Id?: number;
    IDInvoice?: number;
    IDTransaction?: number;
    Line?: number;
    ItemCode?: string;
    ItemGroup?: string;
    BPCode?: string;
    AccountCode?: string;
    CostCenter?: string;
    CostCenter3?: string;
    Total?: number;
    Remark?: string;
    DocumentDate?: Date;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WH_Invoices
{
    IDBranch?: number;
    Id?: number;
    IDSaleOrder?: number;
    IDContact?: number;
    IDTransaction?: number;
    IDReceipt?: number;
    IDType?: number;
    IsCanceled?: boolean;
    IsManual?: boolean;
    IsCreateJournalEntry?: boolean;
    InvoiceStatus?: boolean;
    EInvoiceCode?: string;
    EInvoiceSerial?: string;
    EInvoiceDate?: Date;
    WarehouseStatus?: boolean;
    PostingPeriod?: number;
    IssuedDate?: Date;
    DueDate?: Date;
    TaxDate?: Date;
    Code?: string;
    Name?: string;
    Remark?: string;
    VATPercent?: number;
    VATSum?: number;
    DiscountPercent?: number;
    DiscountSum?: number;
    Currency?: string;
    Total?: number;
    PaidToDate?: number;
    PaidSum?: number;
    GrossProfit?: number;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    
}

export interface WH_ItemGroups
{
    Id?: number;
    IDParent?: number;
    IDBranch?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    CreatedBy?: string;
    ModifiedBy?: string;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    Sort?: number;
    
}

export interface WH_ItemPriceLists
{
    Id?: number;
    IDPriceList?: number;
    IDItem?: number;
    IDItemUoM?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Price?: number;
    Price1?: number;
    Price2?: number;
    IsManual?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    Sort?: number;
    
}

export interface WH_Items
{
    Id?: number;
    IDItemGroup?: number;
    IDBranch?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    IsInventoryItem?: boolean;
    IsSalesItem?: boolean;
    IsPurchaseItem?: boolean;
    IsPhantomItem?: boolean;
    UoMInventory?: number;
    UoMSales?: number;
    UoMPurchasing?: number;
    UoMBase?: number;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsExpired?: boolean;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    Sort?: number;
    
}

export interface WH_ItemUoM
{
    Id?: number;
    IDItem?: number;
    IDUoM?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    IsBaseUoM?: boolean;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    CreatedBy?: string;
    ModifiedBy?: string;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    Sort?: number;
    
}

export interface WH_JournalEntries
{
    IDBranch?: number;
    Id?: number;
    RefID?: number;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Remark?: string;
    ForeignRemark?: string;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    OriginalJournalType?: number;
    RefBase?: number;
    Total?: number;
    DueDate?: Date;
    ARStatus?: string;
    DocumentDate?: Date;
    PostingPeriod?: number;
    DataSource?: number;
    Sort?: number;
    
}

export interface WH_JournalEntryRows
{
    IDBranch?: number;
    Id?: number;
    IDTransaction?: number;
    RefTransaction?: number;
    Line?: number;
    Account?: number;
    AccountCode?: string;
    Debit?: number;
    Credit?: number;
    DueDate?: Date;
    IDAccount?: number;
    RefAccountCode?: string;
    OffsetAccount?: number;
    RefOffsetAccount?: string;
    RefCFTId?: number;
    RefCFWId?: number;
    Remark?: string;
    ARStatus?: string;
    DocumentDate?: Date;
    PostingPeriod?: number;
    DistributionRule?: string;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    CostCenter?: string;
    CostCenter2?: string;
    ItemGroupCode?: string;
    ItemCode?: string;
    
}

export interface WH_PostingPeriods
{
    Id?: number;
    IDBranch?: number;
    RefID?: number;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    FromDate?: Date;
    ToDate?: Date;
    Remark?: string;
    ForeignRemark?: string;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    Sort?: number;
    
}

export interface WH_PriceLists
{
    Id?: number;
    IDBranch?: number;
    IDBasePriceList?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Factor?: number;
    RoundingMethod?: number;
    ValidFrom?: Date;
    ValidTo?: Date;
    PrimaryDefaultCurrency?: string;
    PrimaryDefaultCurrency1?: string;
    PrimaryDefaultCurrency2?: string;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    Sort?: number;
    
}

export interface WH_Staff
{
    IDBranch?: number;
    IDDepartment?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Title?: string;
    FullName?: string;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    Sort?: number;
    
}

export interface WH_UoM
{
    Id?: number;
    IDBranch?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    Sort?: number;
    
}

export interface WH_VTB_Statements
{
    Id?: number;
    TransactionDate?: Date;
    TransactionContent?: string;
    Debit?: number;
    Credit?: number;
    AccountBalance?: number;
    TransactionNumber?: string;
    CorresponsiveAccount?: string;
    CorresponsiveAccountName?: string;
    Agency?: string;
    CorresponsiveBankID?: number;
    CorresponsiveBankName?: string;
    ServiceBranchID?: number;
    ServiceBranchName?: string;
    Channel?: string;
    CreatedDate?: Date;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface WMS_Adjustment
{
    IDBranch?: number;
    IDStorer?: number;
    IDCycleCount?: number;
    Id?: number;
    Status?: string;
    Reason?: string;
    Remark?: string;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    CreatedDate?: Date;
    ModifiedBy?: string;
    ModifiedDate?: Date;
    
}

export interface WMS_AdjustmentDetail
{
    IDAdjustment?: number;
    Id?: number;
    Status?: string;
    IDItem?: number;
    Location?: number;
    Lot?: number;
    LPN?: number;
    QuantityAdjusted?: number;
    Cube?: number;
    GrossWeight?: number;
    NetWeight?: number;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_AllocationStrategy
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsStrictLotRotation?: boolean;
    IsOverallocateAssigned?: boolean;
    IsUseSpeedPickLocations?: boolean;
    Type?: string;
    FindInZone?: number;
    FindLocationType?: string;
    FindLocationCategory?: string;
    CanBreakPallets?: boolean;
    SortPriority1?: string;
    SortPriority2?: string;
    SortPriority3?: string;
    SortPriority4?: string;
    SortPriority5?: string;
    LPNQuantityRule?: string;
    
}

export interface WMS_Carrier
{
    Id?: number;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Name?: string;
    
}

export interface WMS_Carton
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDCartonGroup?: number;
    CartonType?: string;
    ContainerType?: string;
    UseSequence?: number;
    Cube?: number;
    MaxCount?: number;
    MaxWeight?: number;
    TareWeight?: number;
    Length?: number;
    Width?: number;
    Height?: number;
    DefaultPalletCartonType?: string;
    DefaultNonPalletCartonType?: string;
    DisplayForPicking?: boolean;
    DisplayForPacking?: boolean;
    DisplayForLoading?: boolean;
    
}

export interface WMS_CartonGroup
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_CycleCount
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    CountType?: string;
    CountDate?: Date;
    Status?: string;
    Counters?: string;
    IsShowSysQty?: boolean;
    IsPrintAllCounterPerSheet?: boolean;
    IsCountByLocation?: boolean;
    IsCountByLot?: boolean;
    
}

export interface WMS_CycleCountDetail
{
    IDCycleCount?: number;
    IDItem?: number;
    IDUoM?: number;
    IDLocation?: number;
    IDLot?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    CurrentQuantity?: number;
    IsCounted?: boolean;
    CountedQuantity?: number;
    IDCycleCountTask?: number;
    Status?: string;
    
}

export interface WMS_CycleCountDetermination
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Type?: string;
    ScheduleType?: string;
    FrequencyOccurs?: string;
    RecursEvery?: string;
    StartDate?: Date;
    EndDate?: Date;
    
}

export interface WMS_CycleCountDeterminationDetail
{
    IDCycleCountDetermination?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDItemGroup?: number;
    IDZone?: number;
    Row?: number;
    Location?: number;
    IsAlert?: boolean;
    
}

export interface WMS_CycleCountTask
{
    IDCycleCount?: number;
    IDStaff?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    CountType?: string;
    CountDate?: Date;
    Status?: string;
    
}

export interface WMS_CycleCountTaskDetail
{
    IDCycleCountTask?: number;
    IDItem?: number;
    IDUoM?: number;
    IDLocation?: number;
    IDLPN?: number;
    IDLot?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    CountedQuantity?: number;
    
}

export interface WMS_Item
{
    AccountantUoM?: number;
    IDItemGroup?: number;
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Remark?: string;
    ForeignRemark?: string;
    IsInventoryItem?: boolean;
    IsSalesItem?: boolean;
    IsPurchaseItem?: boolean;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    InventoryUoM?: number;
    PurchasingUoM?: number;
    SalesUoM?: number;
    Expiry?: number;
    IDSalesTaxDefinition?: number;
    IDPurchaseTaxDefinition?: number;
    IDRevenueAccount?: number;
    IDExemptRevenueAccount?: number;
    IDDefaultWarehouse?: number;
    IDPreferredVendor?: number;
    MfrCatalogNo?: string;
    PrefQtyInPurchaseUnits?: number;
    AllocationStrategy?: number;
    ProductionDateInDays?: number;
    TaxRateForWholesaler?: number;
    SalesTaxInPercent?: number;
    Lottable0?: string;
    IsTrackSales?: boolean;
    NoOfItemsPerSalesUnit?: number;
    IDCartonGroup?: number;
    PutawayStrategy?: number;
    BaseUoM?: number;
    Division?: string;
    Industry?: string;
    SerialNumberStart?: string;
    SerialNumberEnd?: string;
    SerialNumberNext?: string;
    CostToReorderItem?: number;
    ReorderPoint?: number;
    QuantityToReorder?: number;
    CostToCarryingPerUnit?: number;
    ItemType?: string;
    Lottable1?: string;
    Lottable2?: string;
    Lottable3?: string;
    Lottable4?: string;
    Lottable5?: string;
    Lottable6?: string;
    Lottable7?: string;
    Lottable8?: string;
    Lottable9?: string;
    Attribute1?: string;
    Attribute2?: string;
    Attribute3?: string;
    Attribute4?: string;
    Attribute5?: string;
    Attribute6?: string;
    Attribute7?: string;
    Attribute8?: string;
    Attribute9?: string;
    ExpiryUnit?: string;
    IsPhantomItem?: boolean;
    TreeType?: string;
    TI?: number;
    HI?: number;
    RefNum?: number;
    RefChar?: string;
    IsLocked?: boolean;
    
}

export interface WMS_ItemBalance
{
    IDBranch?: number;
    IDStorer?: number;
    IDPeriod?: number;
    IDItem?: number;
    Id?: number;
    OpenQuantity?: number;
    ClosedQuantity?: number;
    
}

export interface WMS_ItemGroup
{
    IDBranch?: number;
    IDParent?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsLocked?: boolean;
    DataSource?: string;
    AccountInventory?: string;
    AccountCostOfGoodsSold?: string;
    AccountAllocation?: string;
    AccountRevenue?: string;
    AccountRevenueReturns?: string;
    AccountVariance?: string;
    AccountInventoryOffsetDecrease?: string;
    AccountInventoryOffsetIncrease?: string;
    AccountSalesReturns?: string;
    AccountSalesCredit?: string;
    AccountExpense?: string;
    AccountExpenseClearing?: string;
    AccountExpenseOffset?: string;
    AccountExemptRevenue?: string;
    AccountPriceDifference?: string;
    AccountExchangeRateDifferences?: string;
    AccountGoodsClearing?: string;
    AccountPurchase?: string;
    AccountPurchaseCredit?: string;
    AccountPurchaseReturn?: string;
    AccountPurchaseOffset?: string;
    AccountShippedGoods?: string;
    AccountVATInRevenue?: string;
    AccountGLDecrease?: string;
    AccountGLIncrease?: string;
    AccountInventoryRevaluation?: string;
    AccountInventoryRevaluationOffset?: string;
    AccountWIPInventory?: string;
    AccountWIPInventoryVariance?: string;
    AccountCOGSRevaluation?: string;
    AccountCOGSRevaluationOffset?: string;
    AccountTaxExemptCredit?: string;
    AccountStockInTransit?: string;
    AccountPurchaseBalance?: string;
    AccountWIPOffsetPnL?: string;
    AccountInventoryOffsetPnL?: string;
    AccountFreeOfChargeSales?: string;
    AccountFreeOfChargePurchase?: string;
    Account?: string;
    General?: string;
    Accounting?: string;
    
}

export interface WMS_ItemGroupAccountInBranch
{
    IDItemGroup?: number;
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsLocked?: boolean;
    DataSource?: string;
    AccountInventory?: string;
    AccountCostOfGoodsSold?: string;
    AccountAllocation?: string;
    AccountRevenue?: string;
    AccountRevenueReturns?: string;
    AccountVariance?: string;
    AccountInventoryOffsetDecrease?: string;
    AccountInventoryOffsetIncrease?: string;
    AccountSalesReturns?: string;
    AccountSalesCredit?: string;
    AccountExpense?: string;
    AccountExpenseClearing?: string;
    AccountExpenseOffset?: string;
    AccountExemptRevenue?: string;
    AccountPriceDifference?: string;
    AccountExchangeRateDifferences?: string;
    AccountGoodsClearing?: string;
    AccountPurchase?: string;
    AccountPurchaseCredit?: string;
    AccountPurchaseReturn?: string;
    AccountPurchaseOffset?: string;
    AccountShippedGoods?: string;
    AccountVATInRevenue?: string;
    AccountGLDecrease?: string;
    AccountGLIncrease?: string;
    AccountInventoryRevaluation?: string;
    AccountInventoryRevaluationOffset?: string;
    AccountWIPInventory?: string;
    AccountWIPInventoryVariance?: string;
    AccountCOGSRevaluation?: string;
    AccountCOGSRevaluationOffset?: string;
    AccountTaxExemptCredit?: string;
    AccountStockInTransit?: string;
    AccountPurchaseBalance?: string;
    AccountWIPOffsetPnL?: string;
    AccountInventoryOffsetPnL?: string;
    AccountFreeOfChargeSales?: string;
    AccountFreeOfChargePurchase?: string;
    Account?: string;
    General?: string;
    Accounting?: string;
    
}

export interface WMS_ItemInBranch
{
    IDBranch?: number;
    IDItemGroup?: number;
    IDSalesTaxDefinition?: number;
    IDPurchaseTaxDefinition?: number;
    IDRevenueAccount?: number;
    IDExemptRevenueAccount?: number;
    IDDefaultWarehouse?: number;
    IDPreferredVendor?: number;
    IDCartonGroup?: number;
    Id?: number;
    IDItem?: number;
    ItemType?: string;
    TreeType?: string;
    InventoryUoM?: number;
    PurchasingUoM?: number;
    SalesUoM?: number;
    AccountantUoM?: number;
    IsInventoryItem?: boolean;
    IsSalesItem?: boolean;
    IsPurchaseItem?: boolean;
    PrefQtyInPurchaseUnits?: number;
    AllocationStrategy?: number;
    ProductionDateInDays?: number;
    IsTrackSales?: boolean;
    NoOfItemsPerSalesUnit?: number;
    PutawayStrategy?: number;
    IsLocked?: boolean;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    PlanningMethod?: string;
    ProcurementMethod?: string;
    OrderInterval?: string;
    OrderMultiple?: number;
    MinimumOrderQty?: number;
    CheckingRule?: string;
    LeadTime?: number;
    ToleranceDays?: number;
    InventoryLevelRequired?: number;
    InventoryLevelMinimum?: number;
    InventoryLevelMaximum?: number;
    
}

export interface WMS_ItemInLocation
{
    IDBranch?: number;
    IDStorer?: number;
    IDItem?: number;
    IDLocation?: number;
    Id?: number;
    QuantityExpected?: number;
    QuantityOnHand?: number;
    QuantityPreallocated?: number;
    QuantityAllocated?: number;
    QuantityPicked?: number;
    QuantityOnHold?: number;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_ItemInWarehouseConfig
{
    IDBranch?: number;
    IDStorer?: number;
    IDItem?: number;
    PutawayZone?: number;
    Rotation?: string;
    RotateBy?: string;
    MaxPalletsPerZone?: number;
    StackLimit?: number;
    PutawayLocation?: number;
    InboundQCLocation?: number;
    OutboundQCLocation?: number;
    ReturnLocation?: number;
    MinimumInventoryLevel?: number;
    MaximumInventoryLevel?: number;
    Id?: number;
    IsDisabled?: boolean;
    IsAllowConsolidation?: boolean;
    PutawayStrategy?: number;
    AllocationStrategy?: number;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_ItemUoM
{
    IDItem?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Length?: number;
    LengthUnit?: number;
    Width?: number;
    WidthUnit?: number;
    Height?: number;
    HeightUnit?: number;
    Volume?: number;
    Weight?: number;
    WeightUnit?: number;
    IsBaseUoM?: boolean;
    AlternativeQuantity?: number;
    BaseQuantity?: number;
    Barcode?: string;
    Image?: string;
    IDUoM?: number;
    
}

export interface WMS_LicencePlateNumber
{
    IDBranch?: number;
    IDStorer?: number;
    Id?: number;
    IDItem?: number;
    Quantity?: number;
    Status?: string;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Code?: string;
    IDReceipPalletization?: number;
    
}

export interface WMS_Location
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDZone?: number;
    LocationType?: string;
    IsAutomaticallyShipPickedProduct?: boolean;
    IsLoseID?: boolean;
    RouteSequence?: string;
    IsCommingleItem?: boolean;
    IsCommingleLot?: boolean;
    Length?: number;
    Width?: number;
    LocationFlag?: string;
    FootPrint?: number;
    StackLimit?: number;
    Height?: number;
    CubicCapacity?: number;
    LocationCategory?: string;
    LocationHandling?: string;
    Level?: number;
    WeightCapacity?: number;
    MoverType?: string;
    XCoordinate?: number;
    YCoordinate?: number;
    ZCoordinate?: number;
    Orientation?: number;
    
}

export interface WMS_Lot
{
    IDBranch?: number;
    IDStorer?: number;
    Id?: number;
    Name?: string;
    IDItem?: number;
    Cube?: number;
    GrossWeight?: number;
    NetWeight?: number;
    QuantityOnHand?: number;
    QuantityPreallocated?: number;
    QuantityAllocated?: number;
    QuantityPicked?: number;
    QuantityOnHold?: number;
    Lottable0?: string;
    Lottable1?: string;
    Lottable2?: string;
    Lottable3?: string;
    Lottable4?: string;
    Lottable5?: Date;
    Lottable6?: Date;
    Lottable7?: Date;
    Lottable8?: Date;
    Lottable9?: Date;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_LotAttribute
{
    IDBranch?: number;
    IDLot?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_LotLPNLocation
{
    IDBranch?: number;
    IDStorer?: number;
    IDItem?: number;
    Id?: number;
    IDLot?: number;
    IDLPN?: number;
    IDLocation?: number;
    QuantityExpected?: number;
    QuantityOnHand?: number;
    QuantityAllocated?: number;
    QuantityPicked?: number;
    QuantityOnHold?: number;
    QuantityPickInProcess?: number;
    QuantityPendingMoveIn?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_OutboundOrder
{
    IDWarehouse?: number;
    IDStorer?: number;
    IDParent?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Status?: string;
    OrderDate?: Date;
    DeliveryDate?: Date;
    ShippedDate?: Date;
    PackingTag?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_OutboundOrderDetail
{
    IDOutboundOrder?: number;
    IDItem?: number;
    IDUoM?: number;
    IDParent?: number;
    Id?: number;
    Quantity?: number;
    QuantityPicked?: number;
    QuantityPacked?: number;
    QuantityShipped?: number;
    Code?: string;
    Name?: string;
    Status?: string;
    Type?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_OutboundTag
{
    IDOutboundOrder?: number;
    IDShipment?: number;
    IDCustomer?: number;
    IDSaleOrder?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    QRCode?: string;
    Line1?: string;
    Line2?: string;
    
}

export interface WMS_Packing
{
    IDOutboundOrder?: number;
    IDTag?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Status?: string;
    ExpectedDate?: Date;
    PackagedDate?: Date;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_PackingDetail
{
    IDPacking?: number;
    IDItem?: number;
    IDUoM?: number;
    IDParent?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Status?: string;
    Type?: string;
    FromLocation?: number;
    ToLocation?: number;
    Lot?: number;
    LPN?: number;
    Quantity?: number;
    QuantityPacked?: number;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_Picking
{
    IDOutboundOrder?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Status?: string;
    ExpectedDate?: Date;
    PickedDate?: Date;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_PickingDetail
{
    IDPicking?: number;
    IDItem?: number;
    IDUoM?: number;
    Id?: number;
    FromLocation?: number;
    ToLocation?: number;
    Lot?: number;
    LPN?: number;
    Quantity?: number;
    QuantityPicked?: number;
    Code?: string;
    Name?: string;
    Status?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_PriceList
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDBasePriceList?: number;
    Factor?: number;
    RoundingMethod?: number;
    ValidFrom?: Date;
    ValidTo?: Date;
    PrimaryDefaultCurrency?: string;
    PrimaryDefaultCurrency1?: string;
    PrimaryDefaultCurrency2?: string;
    IsPriceListForVendor?: boolean;
    IsTaxIncluded?: boolean;
    
}

export interface WMS_PriceListDetail
{
    IDPriceList?: number;
    IDItem?: number;
    IDItemUoM?: number;
    Id?: number;
    Price?: number;
    Price1?: number;
    Price2?: number;
    IsManual?: boolean;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_PriceListVersion
{
    IDPriceList?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDBasePriceList?: number;
    Factor?: number;
    RoundingMethod?: number;
    ValidFrom?: Date;
    ValidTo?: Date;
    PrimaryDefaultCurrency?: string;
    PrimaryDefaultCurrency1?: string;
    PrimaryDefaultCurrency2?: string;
    AppliedDate?: Date;
    
}

export interface WMS_PriceListVersionDetail
{
    IDPriceListVersion?: number;
    Id?: number;
    IDItem?: number;
    IDItemUoM?: number;
    Price?: number;
    Price1?: number;
    Price2?: number;
    IsManual?: boolean;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_PutawayStrategy
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_PutawayStrategyDetail
{
    IDPutawayStrategy?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Type?: string;
    FromZone?: number;
    ToZone?: number;
    FromLocation?: number;
    ToLocation?: number;
    IsSinglePutawayForMultiplePallets?: boolean;
    IsChecksRestrictions?: boolean;
    DimensionRestriction?: string;
    LocationSortType?: string;
    AreaTypeRestrictions?: string;
    
}

export interface WMS_Receipt
{
    IDBranch?: number;
    IDStorer?: number;
    IDVendor?: number;
    Id?: number;
    IDPurchaseOrder?: number;
    POCode?: string;
    Code?: string;
    Name?: string;
    ForeignName?: string;
    Remark?: string;
    ForeignRemark?: string;
    ExternalReceiptKey?: string;
    IDCarrier?: number;
    VehicleNumber?: string;
    ExpectedReceiptDate?: Date;
    ArrivalDate?: Date;
    ReceiptedDate?: Date;
    ClosedDate?: Date;
    Type?: string;
    Status?: string;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_ReceiptDetail
{
    IDReceipt?: number;
    IDPO?: number;
    IDPOLine?: number;
    IDItem?: number;
    Id?: number;
    Code?: string;
    Remark?: string;
    ForeignRemark?: string;
    ExternalReceipt?: string;
    ExternalLine?: string;
    Status?: string;
    ReceivedDate?: Date;
    IDUoM?: number;
    UoMQuantityExpected?: number;
    QuantityExpected?: number;
    QuantityAdjusted?: number;
    QuantityReceived?: number;
    QuantityRejected?: number;
    Cube?: number;
    GrossWeight?: number;
    NetWeight?: number;
    Lottable0?: string;
    Lottable1?: string;
    Lottable2?: string;
    Lottable3?: string;
    Lottable4?: string;
    Lottable5?: Date;
    Lottable6?: Date;
    Lottable7?: Date;
    Lottable8?: Date;
    Lottable9?: Date;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_ReceiptPalletization
{
    IDStorer?: number;
    IDReceipt?: number;
    IDItem?: number;
    Id?: number;
    ReceiptLine?: number;
    Status?: string;
    ReceivedDate?: Date;
    IDUoM?: number;
    UoMQuantityExpected?: number;
    QuantityExpected?: number;
    QuantityAdjusted?: number;
    QuantityReceived?: number;
    QuantityRejected?: number;
    ToLocation?: number;
    ToLot?: number;
    Cube?: number;
    GrossWeight?: number;
    NetWeight?: number;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsFullPallet?: boolean;
    Remark?: string;
    
}

export interface WMS_Shipping
{
    IDOutboundOrder?: number;
    IDCarrier?: number;
    IDShipment?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Status?: string;
    Vehicle?: string;
    Shipper?: string;
    ExpectedDate?: Date;
    ShippedDate?: Date;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_ShippingDetail
{
    IDShipping?: number;
    IDItem?: number;
    IDUoM?: number;
    IDTag?: number;
    IDParent?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Status?: string;
    FromLocation?: number;
    Lot?: number;
    LPN?: number;
    Quantity?: number;
    QuantityShipped?: number;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_Storer
{
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_StorerConfig
{
    IDWarehouse?: number;
    IDStorer?: number;
    Id?: number;
    IDCartonGroup?: number;
    isActivated?: boolean;
    IsEnablePacking?: boolean;
    IsQCInspectAtPack?: boolean;
    IsAllowMultiZoneRainbowPallet?: boolean;
    DefaultItemRotation?: string;
    DefaultRotation?: string;
    DefaultAllocationStrategy?: number;
    DefaultPutawayStrategy?: number;
    DefaultInboundQCLocation?: number;
    DefaultOutboundQCLocation?: number;
    DefaultReturnsReceiptLocation?: number;
    DefaultPackingLocation?: number;
    LPNBarcodeSymbology?: string;
    LPNBarcodeFormat?: string;
    LPNLength?: number;
    LPNStartNumber?: string;
    LPNNextNumber?: string;
    LPNRollbackNumber?: string;
    CaseLabelType?: string;
    ApplicationID?: string;
    SSCCFirstDigit?: string;
    UCCVendor?: string;
    AllowCommingledLPN?: boolean;
    LabelTemplate?: number;
    StandardCarrierAlphaCode?: string;
    CreditLimit?: number;
    
}

export interface WMS_TaskDispatchStrategy
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    InterleaveTasks?: boolean;
    
}

export interface WMS_TaskDispatchStrategyDetail
{
    IDStrategy?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    TaskType?: number;
    ProximityInterleaving?: boolean;
    
}

export interface WMS_Transaction
{
    IDBranch?: number;
    IDStorer?: number;
    Id?: number;
    TransactionType?: string;
    IDItem?: number;
    Lot?: number;
    FromLocation?: number;
    ToLocation?: number;
    FromLPN?: number;
    ToLPN?: number;
    SourceKey?: number;
    SourceLine?: number;
    SourceType?: string;
    Status?: string;
    IDUoM?: number;
    UoMQuantity?: number;
    Quantity?: number;
    Cube?: number;
    GrossWeight?: number;
    NetWeight?: number;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IDTransaction?: number;
    TransactionDate?: Date;
    
}

export interface WMS_UoM
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Type?: string;
    
}

export interface WMS_UoMGroup
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    General?: string;
    Accounting?: string;
    
}

export interface WMS_Vendor
{
    Id?: number;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    Name?: string;
    
}

export interface WMS_WarehouseInfo
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    IsLocked?: boolean;
    InventoryAccount?: number;
    CostOfGoodsSoldAccount?: number;
    AllocationAccount?: number;
    RevenueAccount?: number;
    VarianceAccount?: number;
    InventoryOffsetDecreaseAccount?: number;
    InventoryOffsetIncreaseAccount?: number;
    SalesReturnsAccount?: number;
    ExpenseAccount?: number;
    RevenueAccountForeign?: number;
    ExpenseAccountForeign?: number;
    TaxGroup?: number;
    IsDropShip?: boolean;
    ExemptRevenueAccount?: number;
    IsAllowUseTax?: boolean;
    PriceDifferenceAccount?: number;
    ExchangeRateDifferencesAccount?: number;
    GoodsClearingAccount?: number;
    PurchaseAccount?: number;
    PurchaseReturnAccount?: number;
    PurchaseOffsetAccount?: number;
    ShippedGoodsAccount?: number;
    VATinRevenueAccount?: number;
    GLDecreaseAccount?: number;
    GLIncreaseAccount?: number;
    IsNettable?: boolean;
    InventoryRevaluationAccount?: number;
    InventoryRevaluationOffsetAccount?: number;
    COGSRevaluationAccount?: number;
    COGSRevaluationOffsetAccount?: number;
    ExpenseClearingAccount?: number;
    ExpenseOffsetAccount?: number;
    SalesCreditAccount?: number;
    SalesCreditAccountForeign?: number;
    TaxExemptCreditAccount?: number;
    PurchaseCreditAccount?: number;
    PurchaseCreditAccountForeign?: number;
    RevenueReturnsAccount?: number;
    NegativeInventoryAdjustmentAccount?: number;
    StockInTransitAccount?: number;
    PurchaseBalanceAccount?: number;
    InventoryOffsetPLAccount?: number;
    Storekeeper?: number;
    IsBinActivated?: boolean;
    BinSeparator?: string;
    DefaultBinInternalNumber?: number;
    GlobalLocationNumber?: string;
    FreeOfChargeSalesAccount?: number;
    FreeOfChargePurchaseAccount?: number;
    
}

export interface WMS_WavePlanning
{
    IDStatus?: number;
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    PickingDate?: Date;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    
}

export interface WMS_Zone
{
    IDBranch?: number;
    Id?: number;
    Code?: string;
    Name?: string;
    Remark?: string;
    Sort?: number;
    IsDisabled?: boolean;
    IsDeleted?: boolean;
    CreatedBy?: string;
    ModifiedBy?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
    MaxPalletsPerItem?: number;
    DefaultPickToLocation?: number;
    InLocation?: number;
    OutLocation?: number;
    IsAllowVoicePicking?: boolean;
    MaximumPickerOneTime?: number;
    IsCreateAssignments?: boolean;
    IsZoneBreak?: boolean;
    MaxPickLines?: number;
    MaxPickContainers?: number;
    MaxCaseCount?: number;
    MaxCube?: number;
    MaxWeight?: number;
    IDEquipmentProfile?: number;
    
}

export interface vw_SYS_SyncJob
{
    Id?: number;
    Type?: string;
    Command?: string;
    IDBranch?: number;
    RefNum1?: number;
    RefChar9?: string;
    IsDone?: boolean;
    TryCount?: number;
    ExeDate?: Date;
    IsRunning?: boolean;
    ErrorMessage?: string;
    Priority?: number;
    
}

export interface vw_SYS_Tracking
{
    Id?: number;
    Type?: string;
    Command?: string;
    IDBranch?: number;
    RefNum1?: number;
    RefNum2?: number;
    RefChar1?: string;
    RefChar2?: string;
    CreatedBy?: string;
    CreatedDate?: Date;
    IsScheduled?: boolean;
    
}

export interface vw_WMS_LotLocLPN
{
    IDBranch?: number;
    StorerId?: number;
    StorerName?: string;
    GroupId?: number;
    GroupName?: string;
    ItemId?: number;
    ItemCode?: string;
    ItemName?: string;
    UoMId?: number;
    UoMName?: string;
    AlternativeQuantity?: number;
    BaseQuantity?: number;
    ZoneId?: number;
    ZoneName?: string;
    LocationId?: number;
    LocationName?: string;
    LocationLevel?: number;
    LotId?: number;
    Lottable0?: string;
    Lottable1?: string;
    Lottable2?: string;
    Lottable3?: string;
    Lottable4?: string;
    Lottable5?: Date;
    Lottable6?: Date;
    Lottable7?: Date;
    Lottable8?: Date;
    Lottable9?: Date;
    LPNId?: number;
    QuantityExpected?: number;
    QuantityOnHand?: number;
    QuantityAllocated?: number;
    QuantityPicked?: number;
    QuantityOnHold?: number;
    QuantityPickInProcess?: number;
    QuantityPendingMoveIn?: number;
    Id?: number;
    
}


