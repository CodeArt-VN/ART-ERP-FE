var replace = require('replace-in-file');

var res = [
  {
    From: 'erp.app.app-component.account-service.message.can-not-connect',
    To: 'Cannot connect to server, please try again.',
  },
  {
    From: 'erp.app.app-component.account-service.message.silent-logout',
    To: 'Your session has expired, please log in again.',
  },
  {
    From: 'erp.app.app-component.account-service.message.update-version-with-value',
    To: 'Please update the software ( to min version {{value}}).',
  },
  { From: 'erp.app.app-component.find-menu', To: 'Search menu' },
  {
    From: 'erp.app.app-component.log-out',
    To: 'You have log out of the system',
  },
  {
    From: 'erp.app.app-component.lost-connection-1',
    To: 'Cannot connect to server.',
  },
  {
    From: 'erp.app.app-component.lost-connection-2',
    To: 'Please try again.',
  },
  {
    From: 'erp.app.app-component.menu.branch-select-placeholder',
    To: 'Select unit',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.accountant',
    To: 'accountant',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.accounts-payable-invoice',
    To: 'accounts-payable-invoice',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.accounts-receivable-invoice',
    To: 'accounts-receivable-invoice',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.acknowledgment-improvement',
    To: 'acknowledgment-improvement',
  },
  { From: 'erp.app.app-component.menu.menu-group.admin', To: 'admin' },
  {
    From: 'erp.app.app-component.menu.menu-group.allowance-policy',
    To: 'allowance-policy',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.allowances-benefits',
    To: 'allowances-benefits',
  },
  { From: 'erp.app.app-component.menu.menu-group.approval', To: 'approval' },
  {
    From: 'erp.app.app-component.menu.menu-group.arinvoice',
    To: 'arinvoice',
  },
  { From: 'erp.app.app-component.menu.menu-group.article', To: 'article' },
  { From: 'erp.app.app-component.menu.menu-group.asset', To: 'asset' },
  {
    From: 'erp.app.app-component.menu.menu-group.attendance-booking',
    To: 'attendance-booking',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.audit-log',
    To: 'audit-log',
  },
  { From: 'erp.app.app-component.menu.menu-group.banking', To: 'banking' },
  {
    From: 'erp.app.app-component.menu.menu-group.batch-picking',
    To: 'batch-picking',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.beo-detail',
    To: 'beo-detail',
  },
  { From: 'erp.app.app-component.menu.menu-group.bi', To: 'bi' },
  {
    From: 'erp.app.app-component.menu.menu-group.bi-customer-satisfaction',
    To: 'bi-customer-satisfaction',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.bill-of-materials',
    To: 'bill-of-materials',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.bi-sale-budget-actual',
    To: 'bi-sale-budget-actual',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.bi-sale-budget-actual-cont',
    To: 'bi-sale-budget-actual-cont',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.bi-sale-budget-actual-cont2',
    To: 'bi-sale-budget-actual-cont2',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.bi-sale-debt',
    To: 'bi-sale-debt',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.bi-sale-inquiry-lost',
    To: 'bi-sale-inquiry-lost',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.bi-sale-market',
    To: 'bi-sale-market',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.bi-sale-occupancy-rate',
    To: 'bi-sale-occupancy-rate',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.bi-sale-occupancy-rate-cont',
    To: 'bi-sale-occupancy-rate-cont',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.bi-sale-performance',
    To: 'bi-sale-performance',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.bi-sale-promotion',
    To: 'bi-sale-promotion',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.bi-sale-sales-breakdown',
    To: 'bi-sale-sales-breakdown',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.bi-sale-sales-breakdown-cont',
    To: 'bi-sale-sales-breakdown-cont',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.bi-sale-sales-breakdown-cont2',
    To: 'bi-sale-sales-breakdown-cont2',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.ar-invoice-report',
    To: 'A/R Invoice Report',
  },
  { From: 'erp.app.app-component.menu.menu-group.branch', To: 'branch' },
  {
    From: 'erp.app.app-component.menu.menu-group.brand-analysis',
    To: 'brand-analysis',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.bsc-company',
    To: 'bsc-company',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.bsc-department',
    To: 'bsc-department',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.bsc-kpi-setup',
    To: 'Set up BSC - KPI',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.bsc-kpi-tracking',
    To: 'BSC / KPI Tracking',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.bsc-records',
    To: 'bsc-records',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.bsc-tracking',
    To: 'bsc-tracking',
  },
  { From: 'erp.app.app-component.menu.menu-group.budget', To: 'Budget' },
  {
    From: 'erp.app.app-component.menu.menu-group.budget-scenarios',
    To: 'budget-scenarios',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.business-partner',
    To: 'business-partner',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.business-social-network',
    To: 'business-social-network',
  },
  { From: 'erp.app.app-component.menu.menu-group.campaign', To: 'campaign' },
  {
    From: 'erp.app.app-component.menu.menu-group.capacity-rating',
    To: 'capacity-rating',
  },
  { From: 'erp.app.app-component.menu.menu-group.carrier', To: 'carrier' },
  { From: 'erp.app.app-component.menu.menu-group.carton', To: 'carton' },
  { From: 'erp.app.app-component.menu.menu-group.case', To: 'case' },
  {
    From: 'erp.app.app-component.menu.menu-group.cash-flow-item',
    To: 'cash-flow-item',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.cash-management',
    To: 'cash-management',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.casual-labour-register',
    To: 'casual-labour-register',
  },
  { From: 'erp.app.app-component.menu.menu-group.category', To: 'category' },
  {
    From: 'erp.app.app-component.menu.menu-group.cfo-dashboard',
    To: 'cfo-dashboard',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.chart-list',
    To: 'chart-list',
  },
  { From: 'erp.app.app-component.menu.menu-group.checkin', To: 'checkin' },
  {
    From: 'erp.app.app-component.menu.menu-group.checkin-gate',
    To: 'checkin-gate',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.checkin-log',
    To: 'checkin-log',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.cmo-dashboard',
    To: 'cmo-dashboard',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.compensation-benefit',
    To: 'C&B Policy',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.compulsory-insurance-policy',
    To: 'compulsory-insurance-policy',
  },
  { From: 'erp.app.app-component.menu.menu-group.config', To: 'config' },
  {
    From: 'erp.app.app-component.menu.menu-group.consumer-goods',
    To: 'consumer-goods',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.contact-mobile',
    To: 'contact-mobile',
  },
  { From: 'erp.app.app-component.menu.menu-group.contract', To: 'contract' },
  {
    From: 'erp.app.app-component.menu.menu-group.cost-accounting',
    To: 'Cost Accounting',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.cost-center',
    To: 'cost-center',
  },
  { From: 'erp.app.app-component.menu.menu-group.crm', To: 'crm' },
  {
    From: 'erp.app.app-component.menu.menu-group.crm-contacts',
    To: 'Contact list',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.crm-management',
    To: 'Management',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.crm-market-research',
    To: 'crm-market-research',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.crm-support',
    To: 'Support',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.cto-dashboard',
    To: 'cto-dashboard',
  },
  { From: 'erp.app.app-component.menu.menu-group.currency', To: 'currency' },
  { From: 'erp.app.app-component.menu.menu-group.customer', To: 'customer' },
  {
    From: 'erp.app.app-component.menu.menu-group.customer-retention',
    To: 'customer-retention',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.customer-satisfaction',
    To: 'customer-satisfaction',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.customer-service-team',
    To: 'customer-service-team',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.customer-support-kpi',
    To: 'customer-support-kpi',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.dashboard',
    To: 'dashboard',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.data-adjustment',
    To: 'data-adjustment',
  },
  { From: 'erp.app.app-component.menu.menu-group.dcm', To: 'dcm' },
  { From: 'erp.app.app-component.menu.menu-group.delivery', To: 'Delivery' },
  {
    From: 'erp.app.app-component.menu.menu-group.delivery-note',
    To: 'delivery-note',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.delivery-review',
    To: 'delivery-review',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.delivery-tracking',
    To: 'delivery-tracking',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.dimension',
    To: 'dimension',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.dimensions',
    To: 'dimensions',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.distribution-rule',
    To: 'distribution-rule',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.distributor',
    To: 'distributor',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.employee-performance',
    To: 'employee-performance',
  },
  { From: 'erp.app.app-component.menu.menu-group.finance', To: 'Finance' },
  {
    From: 'erp.app.app-component.menu.menu-group.finance-balance-sheet',
    To: 'finance-balance-sheet',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.finance-daily-report',
    To: 'finance-daily-report',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.finance-management',
    To: 'finance-management',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.finance-report',
    To: 'Financial report',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.finance-statements',
    To: 'finance-statements',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.financial-kpi',
    To: 'financial-kpi',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.financial-overview',
    To: 'financial-overview',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.financial-performance',
    To: 'financial-performance',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.financials',
    To: 'financials',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.financials-setup',
    To: 'Setup',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.fixed-assets',
    To: 'Fixed Assets',
  },
  { From: 'erp.app.app-component.menu.menu-group.fmcg', To: 'FMCG' },
  {
    From: 'erp.app.app-component.menu.menu-group.fmcg-financial',
    To: 'fmcg-financial',
  },
  { From: 'erp.app.app-component.menu.menu-group.form', To: 'form' },
  {
    From: 'erp.app.app-component.menu.menu-group.function-matrix',
    To: 'function-matrix',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.general-ledger',
    To: 'general-ledger',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.general-setting',
    To: 'General Setting',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.good-returns',
    To: 'good-returns',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.goods-dropping',
    To: 'goods-dropping',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.goods-sorting-management',
    To: 'goods-sorting-management',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.handling-damaged-goods',
    To: 'handling-damaged-goods',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.healthcare',
    To: 'Healthcare',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.holiday-policy',
    To: 'holiday-policy',
  },
  { From: 'erp.app.app-component.menu.menu-group.home', To: 'home' },
  {
    From: 'erp.app.app-component.menu.menu-group.hospitail-performance',
    To: 'hospitail-performance',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.hospital-kpi',
    To: 'hospital-kpi',
  },
  { From: 'erp.app.app-component.menu.menu-group.hrm', To: 'hrm' },
  {
    From: 'erp.app.app-component.menu.menu-group.human-resources',
    To: 'Human Resources',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.import-modal',
    To: 'import-modal',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.inbound',
    To: 'Goods receipt',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.incoming-payment',
    To: 'incoming-payment',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.insurance-tax',
    To: 'insurance-tax',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.inventory-sorting',
    To: 'Warehouse arrangement',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.investor-relations',
    To: 'investor-relations',
  },
  { From: 'erp.app.app-component.menu.menu-group.invoice', To: 'Invoice' },
  { From: 'erp.app.app-component.menu.menu-group.it', To: 'IT' },
  { From: 'erp.app.app-component.menu.menu-group.it-cost', To: 'it-cost' },
  { From: 'erp.app.app-component.menu.menu-group.item', To: 'item' },
  {
    From: 'erp.app.app-component.menu.menu-group.item-group',
    To: 'item-group',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.it-issue-management',
    To: 'it-issue-management',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.it-project-management',
    To: 'it-project-management',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.job-description',
    To: 'job-description',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.journal-entry',
    To: 'journal-entry',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.kpi-dashboard',
    To: 'kpi-dashboard',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.kpi-records',
    To: 'kpi-records',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.kpi-setting',
    To: 'kpi-setting',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.kpi-tracking',
    To: 'kpi-tracking',
  },
  { From: 'erp.app.app-component.menu.menu-group.label', To: 'label' },
  { From: 'erp.app.app-component.menu.menu-group.lead', To: 'lead' },
  {
    From: 'erp.app.app-component.menu.menu-group.loading-order',
    To: 'loading-order',
  },
  { From: 'erp.app.app-component.menu.menu-group.location', To: 'location' },
  { From: 'erp.app.app-component.menu.menu-group.login', To: 'Login' },
  {
    From: 'erp.app.app-component.menu.menu-group.management-kpi',
    To: 'management-kpi',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.manufactoring-cost-management',
    To: 'manufactoring-cost-management',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.manufactoring-kpi',
    To: 'manufactoring-kpi',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.manufacture-production',
    To: 'manufacture-production',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.manufacturing',
    To: 'Manufacturing',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.marketing',
    To: 'Marketing',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.marketing-kpi',
    To: 'marketing-kpi',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.marketing-performance',
    To: 'marketing-performance',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.market-research',
    To: 'Market Research',
  },
  { From: 'erp.app.app-component.menu.menu-group.mcp', To: 'mcp' },
  { From: 'erp.app.app-component.menu.menu-group.mrp', To: 'MRP' },
  { From: 'erp.app.app-component.menu.menu-group.news', To: 'news' },
  { From: 'erp.app.app-component.menu.menu-group.office', To: 'office' },
  {
    From: 'erp.app.app-component.menu.menu-group.operating-report',
    To: 'Operating report',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.opportunity',
    To: 'opportunity',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.order-export',
    To: 'order-export',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.order-pick-up',
    To: 'order-pick-up',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.order-recommendation',
    To: 'order-recommendation',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.organizational-structure',
    To: 'Organization structure',
  },
  { From: 'erp.app.app-component.menu.menu-group.ost', To: 'ost' },
  {
    From: 'erp.app.app-component.menu.menu-group.other-reports',
    To: 'other-reports',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.outbound',
    To: 'Goods delivery',
  },
  { From: 'erp.app.app-component.menu.menu-group.outlet', To: 'outlets' },
  {
    From: 'erp.app.app-component.menu.menu-group.overtime-policy',
    To: 'overtime-policy',
  },
  { From: 'erp.app.app-component.menu.menu-group.pack-uom', To: 'pack-uom' },
  {
    From: 'erp.app.app-component.menu.menu-group.page-forgot-password',
    To: 'page-forgot-password',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.page-intro',
    To: 'page-intro',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.page-login',
    To: 'page-login',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.paid-time-off-policy',
    To: 'paid-time-off-policy',
  },
  { From: 'erp.app.app-component.menu.menu-group.patient', To: 'patient' },
  {
    From: 'erp.app.app-component.menu.menu-group.patient-satisfaction',
    To: 'patient-satisfaction',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.payroll',
    To: 'Timekeeping',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.permission',
    To: 'permission',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.personal-scheduler',
    To: 'personal-scheduler',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.picking-order',
    To: 'picking-order',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.picking-rules',
    To: 'picking-rules',
  },
  { From: 'erp.app.app-component.menu.menu-group.portal', To: 'portal' },
  { From: 'erp.app.app-component.menu.menu-group.pos', To: 'pos' },
  {
    From: 'erp.app.app-component.menu.menu-group.pos-kitchen',
    To: 'pos-kitchen',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.pos-management',
    To: 'Management',
  },
  { From: 'erp.app.app-component.menu.menu-group.pos-memo', To: 'pos-memo' },
  { From: 'erp.app.app-component.menu.menu-group.pos-menu', To: 'pos-menu' },
  {
    From: 'erp.app.app-component.menu.menu-group.pos-order',
    To: 'pos-order',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.pos-table',
    To: 'pos-table',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.pos-work-order',
    To: 'pos-work-order',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.price-list',
    To: 'price-list',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.price-report',
    To: 'price-report',
  },
  { From: 'erp.app.app-component.menu.menu-group.prize', To: 'prize' },
  {
    From: 'erp.app.app-component.menu.menu-group.procurement',
    To: 'Procurement',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.procurement-cost',
    To: 'procurement-cost',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.procurement-kpi',
    To: 'procurement-kpi',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.procurement-quality',
    To: 'procurement-quality',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.product-innovation',
    To: 'product-innovation',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.production',
    To: 'production',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.production-order',
    To: 'production-order',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.production-planning',
    To: 'production-planning',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.production-quality',
    To: 'production-quality',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.profile',
    To: 'Personal profile',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.profile-info',
    To: 'profile-info',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.profit-and-lost',
    To: 'profit-and-lost',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.ptos-enrollment',
    To: 'ptos-enrollment',
  },
  { From: 'erp.app.app-component.menu.menu-group.purchase', To: 'Purchase' },
  {
    From: 'erp.app.app-component.menu.menu-group.purchase-order',
    To: 'purchase-order',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.purchase-order-note',
    To: 'purchase-order-note',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.purchase-plan',
    To: 'purchase-plan',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.purchase-quotation',
    To: 'purchase-quotation',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.purchase-quotation-request',
    To: 'purchase-quotation-request',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.purchase-request',
    To: 'purchase-request',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.purchasing',
    To: 'purchasing',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.quantity-adjustment',
    To: 'quantity-adjustment',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.queuing-action',
    To: 'queuing-action',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.queuing-rules',
    To: 'queuing-rules',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.quick-access',
    To: 'Quick access',
  },
  { From: 'erp.app.app-component.menu.menu-group.rank', To: 'rank' },
  { From: 'erp.app.app-component.menu.menu-group.receipt', To: 'receipt' },
  {
    From: 'erp.app.app-component.menu.menu-group.receivable-debt',
    To: 'receivable-debt',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.recruiting',
    To: 'recruiting',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.report-config',
    To: 'report-config',
  },
  { From: 'erp.app.app-component.menu.menu-group.request', To: 'request' },
  { From: 'erp.app.app-component.menu.menu-group.requests', To: 'requests' },
  { From: 'erp.app.app-component.menu.menu-group.retail', To: 'Retail' },
  {
    From: 'erp.app.app-component.menu.menu-group.retail-analytics',
    To: 'retail-analytics',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.retail-kpi',
    To: 'retail-kpi',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.retail-store',
    To: 'retail-store',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.returned-list',
    To: 'returned-list',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.revenue-detail-report',
    To: 'revenue-detail-report',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.saas-management',
    To: 'saas-management',
  },
  { From: 'erp.app.app-component.menu.menu-group.salary', To: 'salary' },
  {
    From: 'erp.app.app-component.menu.menu-group.sale-daily-report',
    To: 'sale-daily-report',
  },
  { From: 'erp.app.app-component.menu.menu-group.sale-kpi', To: 'sale-kpi' },
  {
    From: 'erp.app.app-component.menu.menu-group.saleman-debt',
    To: 'saleman-debt',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.sale-order',
    To: 'sale-order',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.sale-order-history',
    To: 'sale-order-history',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.sale-order-mobile',
    To: 'sale-order-mobile',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.sale-order-note',
    To: 'sale-order-note',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.sale-order-report',
    To: 'sale-order-report',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.sale-performance',
    To: 'sale-performance',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.sale-quotation',
    To: 'sale-quotation',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.sale-reports',
    To: 'SALE Reports',
  },
  { From: 'erp.app.app-component.menu.menu-group.sales', To: 'Sales' },
  {
    From: 'erp.app.app-component.menu.menu-group.sales-conversion',
    To: 'sales-conversion',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.sales-cycle-length',
    To: 'sales-cycle-length',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.sales-kpi',
    To: 'sales-kpi',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.sales-opportunity',
    To: 'sales-opportunity',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.sales-order-overview',
    To: 'sales-order-overview',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.sales-reports',
    To: 'sales-reports',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.sales-reports-mobile',
    To: 'sales-reports-mobile',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.sale-team',
    To: 'sale-team',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.scheduler',
    To: 'scheduler',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.seller-mobile',
    To: 'seller-mobile',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.service-support',
    To: 'Service - Support',
  },
  { From: 'erp.app.app-component.menu.menu-group.shift', To: 'shift' },
  { From: 'erp.app.app-component.menu.menu-group.shipment', To: 'shipment' },
  { From: 'erp.app.app-component.menu.menu-group.shipping', To: 'shipping' },
  {
    From: 'erp.app.app-component.menu.menu-group.social-media',
    To: 'social-media',
  },
  { From: 'erp.app.app-component.menu.menu-group.staff', To: 'staff' },
  {
    From: 'erp.app.app-component.menu.menu-group.staff-catering-booking-note',
    To: 'staff-catering-booking-note',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.staff-dashboard',
    To: 'staff-dashboard',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.store-configuration',
    To: 'Warehouse structure',
  },
  { From: 'erp.app.app-component.menu.menu-group.storer', To: 'storer' },
  {
    From: 'erp.app.app-component.menu.menu-group.strategy-map',
    To: 'strategy-map',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.summary-detail-report',
    To: 'summary-detail-report',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.summary-report',
    To: 'summary-report',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.supplier-delivery',
    To: 'supplier-delivery',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.supply-chain-management',
    To: 'supply-chain-management',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.surgery-appointment',
    To: 'surgery-appointment',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.surgery-appointment-mobile',
    To: 'surgery-appointment-mobile',
  },
  { From: 'erp.app.app-component.menu.menu-group.survey', To: 'survey' },
  {
    From: 'erp.app.app-component.menu.menu-group.system-status',
    To: 'system-status',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.system-type',
    To: 'system-type',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.talent-management',
    To: 'talent-management',
  },
  { From: 'erp.app.app-component.menu.menu-group.tally', To: 'Stock count' },
  {
    From: 'erp.app.app-component.menu.menu-group.tally-data-synchronization',
    To: 'tally-data-synchronization',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.tally-scheduling',
    To: 'tally-scheduling',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.tax-definition',
    To: 'tax-definition',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.tax-policy',
    To: 'tax-policy',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.timekeeping',
    To: 'Timekeeping',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.timesheet',
    To: 'timesheet',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.timesheet-cycle',
    To: 'timesheet-cycle',
  },
  { From: 'erp.app.app-component.menu.menu-group.training', To: 'training' },
  {
    From: 'erp.app.app-component.menu.menu-group.transferring-goods',
    To: 'transferring-goods',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.transportation',
    To: 'transportation',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.user-device',
    To: 'user-device',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.validation-rules',
    To: 'validation-rules',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.value-chain',
    To: 'value-chain',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.vehicle',
    To: 'Truck management',
  },
  { From: 'erp.app.app-component.menu.menu-group.vendor', To: 'vendor' },
  {
    From: 'erp.app.app-component.menu.menu-group.warehouse',
    To: 'warehouse',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.warehouse-dashboard',
    To: 'warehouse-dashboard',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.warehouse-kpi',
    To: 'warehouse-kpi',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.warehouse-receipt',
    To: 'warehouse-receipt',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.web-analytics',
    To: 'web-analytics',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.welfare-policy',
    To: 'welfare-policy',
  },
  { From: 'erp.app.app-component.menu.menu-group.wms', To: 'wms' },
  {
    From: 'erp.app.app-component.menu.menu-group.workforce-dashboard',
    To: 'workforce-dashboard',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.wrapping-order',
    To: 'wrapping-order',
  },
  { From: 'erp.app.app-component.menu.menu-group.zone', To: 'zone' },
  {
    From: 'erp.app.app-component.page-bage.archive-number-line',
    To: 'Archived {{value}} lines!',
  },
  {
    From: 'erp.app.app-component.page-bage.can-not-save',
    To: 'Cannot save, please try again',
  },
  {
    From: 'erp.app.app-component.page-bage.check-red-above',
    To: 'Please recheck information highlighted in red above',
  },
  { From: 'erp.app.app-component.page-bage.delete-complete', To: 'Deleted!' },
  {
    From: 'erp.app.app-component.page-bage.import-complete',
    To: 'Import completed!',
  },
  {
    From: 'erp.app.app-component.page-bage.open-number-line',
    To: 'Reopened {{value}} lines!',
  },
  {
    From: 'erp.app.app-component.page-bage.save-complete',
    To: 'Saving completed!',
  },
  {
    From: 'erp.app.app-component.page-bage.unit-change-complete',
    To: 'Unit changed',
  },
  {
    From: 'erp.app.app-component.pending-connect-1',
    To: 'Connecting to server',
  },
  {
    From: 'erp.app.app-component.pending-connect-2',
    To: 'Please wait for a few moments',
  },
  { From: 'erp.app.app-component.unit-placeholder', To: 'unit-placeholder' },
  { From: 'erp.app.components.detail-toolbar.delete', To: 'Delete' },
  { From: 'erp.app.components.detail-toolbar.help', To: 'Help' },
  { From: 'erp.app.components.detail-toolbar.refresh', To: 'Refresh' },
  {
    From: 'erp.app.components.detail-toolbar.show-feature',
    To: 'Expanded function',
  },
  { From: 'erp.app.components.list-toolbar.add', To: 'Add' },
  {
    From: 'erp.app.components.list-toolbar.approve-invoices',
    To: 'Approve Invoice',
  },
  {
    From: 'erp.app.components.list-toolbar.approve-orders',
    To: 'Approve Order',
  },
  {
    From: 'erp.app.components.list-toolbar.archive-items-disabled',
    To: 'Reopen',
  },
  {
    From: 'erp.app.components.list-toolbar.archive-items-notdisabled',
    To: 'Archive',
  },
  {
    From: 'erp.app.components.list-toolbar.cancel-invoices',
    To: 'Cancel Invoice',
  },
  {
    From: 'erp.app.components.list-toolbar.cancel-orders',
    To: 'Cancel order',
  },
  {
    From: 'erp.app.components.list-toolbar.change-branch',
    To: 'Change Branch',
  },
  {
    From: 'erp.app.components.list-toolbar.create-arinvoice',
    To: 'createARInvoice',
  },
  {
    From: 'erp.app.components.list-toolbar.create-einvoice',
    To: 'Create E-Invoice',
  },
  {
    From: 'erp.app.components.list-toolbar.create-merge-arinvoice',
    To: 'Create merged invoice',
  },
  {
    From: 'erp.app.components.list-toolbar.create-receipt',
    To: 'Collection',
  },
  {
    From: 'erp.app.components.list-toolbar.create-split-arinvoices',
    To: 'Create split invoice',
  },
  { From: 'erp.app.components.list-toolbar.delete-items', To: 'Delete' },
  {
    From: 'erp.app.components.list-toolbar.disapprove-invoices',
    To: 'Disapprove invoice',
  },
  {
    From: 'erp.app.components.list-toolbar.disapprove-orders',
    To: 'Disaaprove order',
  },
  { From: 'erp.app.components.list-toolbar.export', To: 'Export' },
  { From: 'erp.app.components.list-toolbar.help', To: 'Help' },
  { From: 'erp.app.components.list-toolbar.import', To: 'Import' },
  {
    From: 'erp.app.components.list-toolbar.merge-arinvoice',
    To: 'Merge Invoice',
  },
  { From: 'erp.app.components.list-toolbar.merge-orders', To: 'Merge order' },
  {
    From: 'erp.app.components.list-toolbar.present-popover',
    To: 'Open filter',
  },
  { From: 'erp.app.components.list-toolbar.refresh', To: 'Refresh' },
  { From: 'erp.app.components.list-toolbar.search', To: 'Search' },
  {
    From: 'erp.app.components.list-toolbar.show-archive',
    To: 'View archived items',
  },
  { From: 'erp.app.components.list-toolbar.show-feature', To: 'ShowFeature' },
  {
    From: 'erp.app.components.list-toolbar.split-arinvoice',
    To: 'splitARInvoice',
  },
  { From: 'erp.app.components.list-toolbar.split-order', To: 'Split Order' },
  {
    From: 'erp.app.components.list-toolbar.submit-invoices-for-approval',
    To: 'submit Invoices For Approval',
  },
  {
    From: 'erp.app.components.list-toolbar.submit-orders',
    To: 'Order submitted',
  },
  {
    From: 'erp.app.components.list-toolbar.submit-orders-for-approval',
    To: 'submit Orders For Approval',
  },
  {
    From: 'erp.app.components.list-toolbar.submit-receipt',
    To: 'Goods receipt',
  },
  { From: 'erp.app.components.list-toolbar.unselect', To: 'Unselect' },
  {
    From: 'erp.app.components.page-message.message',
    To: 'No data available',
  },
  {
    From: 'erp.app.components.page-message.sub-message',
    To: 'Please check again',
  },
  {
    From: 'erp.app.guards.no-permission-contact',
    To: 'You are not authorized to access here, please contact Admin to get authorisation',
  },
  {
    From: 'erp.app.guards.no-permission-login',
    To: 'You are not authorized to access here, please log in again or use another account.',
  },
  {
    From: 'erp.app.guards.no-permission-redirect',
    To: 'You are not authorized to access here. System would transfer to authorised page.',
  },
  { From: 'erp.app.pages.accountant.ar-invoice.all-option', To: 'All' },
  {
    From: 'erp.app.pages.accountant.ar-invoice.customer-name',
    To: 'Customer',
  },
  { From: 'erp.app.pages.accountant.ar-invoice.e-invoice', To: 'E-Invoice' },
  {
    From: 'erp.app.pages.accountant.ar-invoice.find-with-customer-id',
    To: 'find-with-customer-id',
  },
  { From: 'erp.app.pages.accountant.ar-invoice.id', To: '#Id' },
  { From: 'erp.app.pages.accountant.ar-invoice.id-saleorder', To: '#Id SO' },
  {
    From: 'erp.app.pages.accountant.ar-invoice.id-saleorder-placeholder',
    To: 'id-saleorder-placeholder',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.invoice-date',
    To: 'Created on',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.invoice-no',
    To: 'E-invoice Code',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.message.can-not-approve-pending-only',
    To: 'Your selected order cannot be approved. Please only select pending for approval order',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.message.can-not-cancel-pending-draft-only',
    To: 'Your selected invoices cannot be canceled. Please select draft or pending for approval invoice',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.message.can-not-create-einvoice-approved-only',
    To: 'Cannot generate e-invoice. Please only select approved order',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.message.can-not-delete-new-disapprove-only',
    To: 'Your selected invoices cannot be deleted. Please only delete new or disapproved invoice',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.message.can-not-disapprove-pending-approved-only',
    To: 'Your selected invoices cannot be disaaproved. Please select approved or pending for approval invoice',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.message.can-not-merge',
    To: 'Your selected invoices cannot be combined. Please select new or disapproved invoice',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.message.can-not-save',
    To: 'Cannot save, please try again',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.message.can-not-send-approve-new-draft-disapprove-only',
    To: 'Your selected invoices cannot be approved. Please select new or draft or disapproved ones',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.message.can-not-split',
    To: 'Your selected order cannot be split. Please choose draft, new, pending for approval or disaaproved order',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.message.can-not-split-try',
    To: 'Cannot split invoice, please try again',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.message.check-customer-vendor-name',
    To: "Please check customer or vendor's name",
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.message.check-merge-invoice-select-customer',
    To: 'Please check the invoice to combine and select customer',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.message.einvoice-sign-success',
    To: 'Successfully generated and sign e-invoice!',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.message.einvoice-success',
    To: 'Successfully generated e-invoice!',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.message.save-complete',
    To: 'Saving completed!',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.message.split-complete',
    To: 'Invoice splitting completed',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.original-total-after-tax',
    To: 'Invoice amount',
  },
  { From: 'erp.app.pages.accountant.ar-invoice.page-title', To: 'Invoice' },
  {
    From: 'erp.app.pages.accountant.ar-invoice.receiver-name',
    To: 'receiver-name',
  },
  { From: 'erp.app.pages.accountant.ar-invoice.selected-title', To: 'Order' },
  {
    From: 'erp.app.pages.accountant.ar-invoice.signed-date',
    To: 'Signing date',
  },
  { From: 'erp.app.pages.accountant.ar-invoice.status', To: 'Status' },
  { From: 'erp.app.pages.accountant.ar-invoice.taxid', To: 'Tax code' },
  {
    From: 'erp.app.pages.accountant.ar-invoice.view-bp-detail',
    To: 'view-bp-detail',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.view-business-partner',
    To: "View customers' information",
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.view-hddt',
    To: 'Search e-invoice',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.view-invoice-detail',
    To: 'View Invoice details',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.view-order-detail',
    To: 'view-order-detail',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.add-invoice-line',
    To: 'Add product',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.ar-invoice',
    To: 'A/R Invoice',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.ar-invoice-placeholder',
    To: 'Search for name or product code',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.bill-code',
    To: 'Bill code',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.buyer-address',
    To: 'Invoice address',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.buyer-bank-account',
    To: 'Bank account',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.buyer-name',
    To: 'Customer name',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.buyer-tax-code',
    To: 'Tax code',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.buyer-unit-name',
    To: 'Company name',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.create-date',
    To: 'Created on',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.create-einvoice',
    To: 'Generate e-invoice',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.create-sign-einvoice',
    To: 'Generate and sign e-invoice',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.customer-information',
    To: 'Customer information',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.dd-mm-yyyy',
    To: 'dd-mm-yyyy',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.discount',
    To: 'Discount',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.einvoice-total',
    To: 'Total amount biiled',
  },
  { From: 'erp.app.pages.accountant.ar-invoice-detail.id', To: 'Id' },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.id-business-partner',
    To: 'Customer ID',
  },
  { From: 'erp.app.pages.accountant.ar-invoice-detail.id-so', To: 'SO ID' },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.invoice-date',
    To: 'Invoice date',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.invoice-form',
    To: 'Form No.',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.invoice-information',
    To: 'Invoice information',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.invoice-no',
    To: 'Invoice Nmuber',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.invoice-serial',
    To: 'Serial',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.invoice-tab',
    To: 'Other information',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.invoice-type',
    To: 'Invoice type',
  },
  { From: 'erp.app.pages.accountant.ar-invoice-detail.item', To: 'Product' },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.item-list-tab',
    To: 'Product',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.name',
    To: 'Order list',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.original-invoice-identity',
    To: 'Original invoice code',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.other-information',
    To: 'Other information',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.page-title',
    To: 'Invoice',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.payment-method',
    To: 'Payment method',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.price',
    To: 'Unit price',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.promotion',
    To: 'Promotion',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.quantity',
    To: 'Quantity',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.receiver-mobile',
    To: 'Invoice receipt phone number',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.receive-type',
    To: 'Invoice receipt type',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.relevant-invoice-tab',
    To: 'Invoices',
  },
  { From: 'erp.app.pages.accountant.ar-invoice-detail.remark', To: 'Remark' },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.signed-date',
    To: 'Signing date',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.so-order-tab',
    To: 'SO',
  },
  { From: 'erp.app.pages.accountant.ar-invoice-detail.status', To: 'Status' },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.tax-rate',
    To: 'Tax rate (%)',
  },
  { From: 'erp.app.pages.accountant.ar-invoice-detail.total', To: 'Amount' },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.total-after-tax',
    To: 'Total amount',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.total-after-tax-title',
    To: '[Amount to be paid] = [Total amount] + [Tax charge]',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.total-label',
    To: 'Total',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.total-tax',
    To: 'Tax amount',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.type-create-invoice',
    To: 'Invoice generating type',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.unit-option',
    To: 'Select unit',
  },
  { From: 'erp.app.pages.accountant.ar-invoice-detail.uom', To: 'Unit' },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.user-define',
    To: 'Description',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-merge.close-modal',
    To: 'Close',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-merge.dd-mm-yyyy',
    To: 'dd-mm-yyyy',
  },
  { From: 'erp.app.pages.accountant.ar-invoice-merge.help', To: 'Help' },
  {
    From: 'erp.app.pages.accountant.ar-invoice-merge.id-business-partner',
    To: 'Customer',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-merge.id-business-partner-placeholder',
    To: 'Search for name, code or phone number',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-merge.invoice',
    To: 'Invoice',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-merge.invoice-date',
    To: 'Input invoice date',
  },
  { From: 'erp.app.pages.accountant.ar-invoice-merge.merge', To: 'Merge' },
  {
    From: 'erp.app.pages.accountant.ar-invoice-merge.merge-arinvoice',
    To: 'Merge Invoice',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-merge.select-merge-type',
    To: 'Merge type',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-merge.merge-type-normal',
    To: 'Merge only',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-merge.merge-type-create-einvoice',
    To: 'Issue E-invoice after merged',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-merge.merge-to-existed-einvoice',
    To: 'Merge to existing A/R having E-Invoice',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-merge.select-einvoice',
    To: 'Select A/R having E-Invoice',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-merge.find-einvoice-placeholder',
    To: 'Find by E-Invoice number...',
  },
  { From: 'erp.app.pages.accountant.ar-invoice-split.add', To: 'add' },
  {
    From: 'erp.app.pages.accountant.ar-invoice-split.close-modal',
    To: 'Close',
  },
  { From: 'erp.app.pages.accountant.ar-invoice-split.help', To: 'Help' },
  {
    From: 'erp.app.pages.accountant.ar-invoice-split.id-business-partner',
    To: 'A/R invoice for cash instead of promotion goods of Vendors',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-split.id-business-partner-placeholder',
    To: 'Search for name, code or phone number',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-split.item-placeholder',
    To: 'item-placeholder',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-split.page-title',
    To: 'splitARInvoice',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-split.quantity',
    To: 'quantity',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-split.split-arinvoice',
    To: 'splitARInvoice',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-split.split-arinvoice-button',
    To: 'split-arinvoice-button',
  },
  { From: 'erp.app.pages.accountant.ar-invoice-split.unit', To: 'unit' },
  {
    From: 'erp.app.pages.admin.config.config-search',
    To: 'Search confirguration',
  },
  { From: 'erp.app.pages.admin.config.page-title', To: 'Configuration' },
  {
    From: 'erp.app.pages.admin.config.save-complete',
    To: 'Saving completed!',
  },
  { From: 'erp.app.pages.admin.config.settings', To: 'Settings' },
  { From: 'erp.app.pages.admin.config.unit', To: 'Unit' },
  { From: 'erp.app.pages.admin.config.unit-placeholder', To: 'Select unit' },
  { From: 'erp.app.pages.admin.form.apis', To: 'APIs' },
  { From: 'erp.app.pages.admin.form.badge-color', To: 'Badge color' },
  { From: 'erp.app.pages.admin.form.cancel', To: 'Change cancel' },
  { From: 'erp.app.pages.admin.form.close-modal', To: 'Close' },
  { From: 'erp.app.pages.admin.form.code', To: 'Code' },
  { From: 'erp.app.pages.admin.form.code-detail', To: 'Code' },
  { From: 'erp.app.pages.admin.form.delete', To: 'Delete' },
  { From: 'erp.app.pages.admin.form.icon', To: 'Icon' },
  { From: 'erp.app.pages.admin.form.id-parent', To: 'Belonged to' },
  { From: 'erp.app.pages.admin.form.name', To: 'Name' },
  { From: 'erp.app.pages.admin.form.name-detail', To: 'Function' },
  { From: 'erp.app.pages.admin.form.page-title', To: 'System function' },
  { From: 'erp.app.pages.admin.form.remark', To: 'Description' },
  { From: 'erp.app.pages.admin.form.root', To: 'Root' },
  { From: 'erp.app.pages.admin.form.save', To: 'Add function' },
  { From: 'erp.app.pages.admin.form.save-change', To: 'Save' },
  { From: 'erp.app.pages.admin.form.sort', To: 'Sort' },
  { From: 'erp.app.pages.admin.form.type', To: 'Type' },
  {
    From: 'erp.app.pages.admin.permission.data-authorization',
    To: 'Data authorization',
  },
  { From: 'erp.app.pages.admin.permission.function', To: 'Function' },
  {
    From: 'erp.app.pages.admin.permission.id-branch',
    To: 'Branch data permission',
  },
  {
    From: 'erp.app.pages.admin.permission.page-title',
    To: 'Access authorazation',
  },
  { From: 'erp.app.pages.admin.permission.show-form', To: 'show-form' },
  {
    From: 'erp.app.pages.admin.permission.unit-job-titble',
    To: 'Unit/Job title',
  },
  {
    From: 'erp.app.pages.admin.permission.unit-placeholder',
    To: 'Select unit',
  },
  {
    From: 'erp.app.pages.admin.pricelist.add-version',
    To: 'Add pricing version',
  },
  {
    From: 'erp.app.pages.admin.pricelist.add-version-title',
    To: 'Add pricing adjustment list',
  },
  { From: 'erp.app.pages.admin.pricelist.all-option', To: 'All' },
  { From: 'erp.app.pages.admin.pricelist.apply-date', To: 'Applied date' },
  {
    From: 'erp.app.pages.admin.pricelist.apply-price-version',
    To: 'Apply price',
  },
  { From: 'erp.app.pages.admin.pricelist.apply-tab', To: 'Applying' },
  { From: 'erp.app.pages.admin.pricelist.base-uom-sort', To: 'Main unit' },
  {
    From: 'erp.app.pages.admin.pricelist.comment.delete-complete',
    To: 'Deleted!',
  },
  {
    From: 'erp.app.pages.admin.pricelist.comment.import-complete',
    To: 'Import completed!',
  },
  {
    From: 'erp.app.pages.admin.pricelist.comment.save-change-complete',
    To: 'Changes saved',
  },
  {
    From: 'erp.app.pages.admin.pricelist.currency-placeholder',
    To: 'Select unit',
  },
  {
    From: 'erp.app.pages.admin.pricelist.download-applying-price',
    To: 'Download applied price list',
  },
  { From: 'erp.app.pages.admin.pricelist.factor', To: 'Factor' },
  { From: 'erp.app.pages.admin.pricelist.group-tab', To: 'Subject group' },
  { From: 'erp.app.pages.admin.pricelist.id', To: 'Price list' },
  {
    From: 'erp.app.pages.admin.pricelist.id-base-price-list',
    To: 'Original price list',
  },
  { From: 'erp.app.pages.admin.pricelist.id-segment', To: 'Id' },
  { From: 'erp.app.pages.admin.pricelist.id-sort', To: 'Id' },
  { From: 'erp.app.pages.admin.pricelist.is-disabled', To: 'Disabled' },
  {
    From: 'erp.app.pages.admin.pricelist.is-pricelist-for-vendor',
    To: 'Vendor price list',
  },
  {
    From: 'erp.app.pages.admin.pricelist.is-tax-included',
    To: 'Price with VAT included',
  },
  { From: 'erp.app.pages.admin.pricelist.name-sort', To: 'Price list' },
  { From: 'erp.app.pages.admin.pricelist.page-title', To: 'Price list' },
  {
    From: 'erp.app.pages.admin.pricelist.page-title-detail',
    To: 'Price list',
  },
  {
    From: 'erp.app.pages.admin.pricelist.pricelist-placeholder',
    To: 'no price list for reference',
  },
  {
    From: 'erp.app.pages.admin.pricelist.pricelist-version',
    To: 'Price version',
  },
  {
    From: 'erp.app.pages.admin.pricelist.pricelist-version-tab',
    To: 'Price version',
  },
  { From: 'erp.app.pages.admin.pricelist.price-table', To: 'Price list' },
  {
    From: 'erp.app.pages.admin.pricelist.primary-default-currency',
    To: 'Main monetary unit',
  },
  {
    From: 'erp.app.pages.admin.pricelist.primary-default-currency-1',
    To: 'Monetary unit 1',
  },
  {
    From: 'erp.app.pages.admin.pricelist.primary-default-currency-2',
    To: 'Monetary unit 2',
  },
  {
    From: 'erp.app.pages.admin.pricelist.re-calc-price',
    To: 'Chạy lại bảng giá',
  },
  {
    From: 'erp.app.pages.admin.pricelist.rounding-method',
    To: 'Price rounding',
  },
  { From: 'erp.app.pages.admin.pricelist.sort', To: 'Arrange' },
  { From: 'erp.app.pages.admin.pricelist.target-tab', To: 'Subject' },
  { From: 'erp.app.pages.admin.pricelist.unit', To: 'Unit' },
  { From: 'erp.app.pages.approval.request.amount', To: 'Amount' },
  { From: 'erp.app.pages.approval.request.approve', To: 'Approve' },
  { From: 'erp.app.pages.approval.request.approvers', To: 'Approver' },
  { From: 'erp.app.pages.approval.request.approve-title', To: 'Approve' },
  { From: 'erp.app.pages.approval.request.close-modal', To: 'Close' },
  { From: 'erp.app.pages.approval.request.comment', To: 'Discussion' },
  {
    From: 'erp.app.pages.approval.request.comment-placeholder',
    To: 'Write your discussion',
  },
  { From: 'erp.app.pages.approval.request.denied', To: 'Deny' },
  { From: 'erp.app.pages.approval.request.draft', To: 'Save draft' },
  { From: 'erp.app.pages.approval.request.end', To: 'To date' },
  { From: 'erp.app.pages.approval.request.forward', To: 'Forward' },
  { From: 'erp.app.pages.approval.request.help', To: 'Help' },
  {
    From: 'erp.app.pages.approval.request.message.can-not-get-data',
    To: 'Cannot extract data',
  },
  {
    From: 'erp.app.pages.approval.request.message.check-red-above',
    To: 'Please recheck information highlighted in red above',
  },
  { From: 'erp.app.pages.approval.request.name', To: 'Title' },
  { From: 'erp.app.pages.approval.request.page-title', To: 'Request' },
  {
    From: 'erp.app.pages.approval.request.page-title-approve',
    To: 'Approve',
  },
  { From: 'erp.app.pages.approval.request.page-title-modal', To: 'Request' },
  { From: 'erp.app.pages.approval.request.pending', To: 'Not yet approved' },
  { From: 'erp.app.pages.approval.request.phone', To: 'Telephone' },
  { From: 'erp.app.pages.approval.request.refresh', To: 'Refresh' },
  { From: 'erp.app.pages.approval.request.remark', To: 'Content' },
  { From: 'erp.app.pages.approval.request.requested-by', To: 'Requester' },
  {
    From: 'erp.app.pages.approval.request.request-information',
    To: 'Suggestions',
  },
  { From: 'erp.app.pages.approval.request.search-placeholder', To: 'Search' },
  { From: 'erp.app.pages.approval.request.start', To: 'From date' },
  { From: 'erp.app.pages.approval.request.status', To: 'Status' },
  {
    From: 'erp.app.pages.approval.request.submit',
    To: 'submit Request For Approval',
  },
  {
    From: 'erp.app.pages.approval.request.sub-type',
    To: 'Leaves classification',
  },
  { From: 'erp.app.pages.approval.request.time', To: 'Time' },
  { From: 'erp.app.pages.approval.request.timeline', To: 'Main activities' },
  { From: 'erp.app.pages.approval.request.time-off', To: 'Number of days' },
  {
    From: 'erp.app.pages.approval.request.type',
    To: 'Request classification',
  },
  { From: 'erp.app.pages.bi.dashboard.branch', To: 'Branch' },
  { From: 'erp.app.pages.bi.dashboard.cash-flow', To: 'Cash flow' },
  { From: 'erp.app.pages.bi.dashboard.cost-target', To: 'Expenses/target' },
  { From: 'erp.app.pages.bi.dashboard.d', To: 'Today' },
  { From: 'erp.app.pages.bi.dashboard.day-info', To: 'Information by day' },
  { From: 'erp.app.pages.bi.dashboard.dm', To: 'This month' },
  { From: 'erp.app.pages.bi.dashboard.dw', To: 'This week' },
  {
    From: 'erp.app.pages.bi.dashboard.empty-detail',
    To: 'Cannot find relevant data. Please select other sorting conditions!',
  },
  { From: 'erp.app.pages.bi.dashboard.empty-title', To: 'No data available' },
  { From: 'erp.app.pages.bi.dashboard.gross', To: 'Net revenue' },
  { From: 'erp.app.pages.bi.dashboard.group-by', To: 'Group by / Nhóm theo' },
  {
    From: 'erp.app.pages.bi.dashboard.inquiry-by-resource',
    To: 'Inquiry by info source',
  },
  {
    From: 'erp.app.pages.bi.dashboard.lost-reason',
    To: 'Reasons for lost inquiry',
  },
  { From: 'erp.app.pages.bi.dashboard.m', To: 'This month' },
  { From: 'erp.app.pages.bi.dashboard.m3', To: '3 months' },
  { From: 'erp.app.pages.bi.dashboard.m6', To: '6 months' },
  { From: 'erp.app.pages.bi.dashboard.my', To: 'This year' },
  { From: 'erp.app.pages.bi.dashboard.number-event', To: 'banquet quantity' },
  { From: 'erp.app.pages.bi.dashboard.number-guest', To: 'number of guests' },
  {
    From: 'erp.app.pages.bi.dashboard.number-of-guests',
    To: 'Numbers of guests',
  },
  {
    From: 'erp.app.pages.bi.dashboard.numbers-of-events',
    To: 'Numbers of events',
  },
  { From: 'erp.app.pages.bi.dashboard.option', To: 'Options' },
  { From: 'erp.app.pages.bi.dashboard.page-title', To: 'Dashboard' },
  { From: 'erp.app.pages.bi.dashboard.pin-chart', To: 'Pin chart' },
  { From: 'erp.app.pages.bi.dashboard.pnl', To: 'PnL' },
  { From: 'erp.app.pages.bi.dashboard.q', To: 'This quarter' },
  { From: 'erp.app.pages.bi.dashboard.q2', To: '2 quarters' },
  { From: 'erp.app.pages.bi.dashboard.q3', To: '3 quarters' },
  { From: 'erp.app.pages.bi.dashboard.qy', To: 'This year' },
  { From: 'erp.app.pages.bi.dashboard.refresh', To: 'Refresh' },
  {
    From: 'erp.app.pages.bi.dashboard.show-feature',
    To: 'Expanded function',
  },
  {
    From: 'erp.app.pages.bi.dashboard.sumup-inquiry-lost',
    To: 'Inquiry status summary',
  },
  { From: 'erp.app.pages.bi.dashboard.time', To: 'Time / Thời gian' },
  {
    From: 'erp.app.pages.bi.dashboard.top-customer',
    To: 'Top customers by net revenue',
  },
  {
    From: 'erp.app.pages.bi.dashboard.total-per-customer-type',
    To: 'Revenue by customers type',
  },
  { From: 'erp.app.pages.bi.dashboard.total-target', To: 'Revenue/target' },
  { From: 'erp.app.pages.bi.dashboard.y', To: 'This year' },
  { From: 'erp.app.pages.bi.dashboard.y2', To: '2 years' },
  { From: 'erp.app.pages.bi.dashboard.y3', To: '3 years' },
  {
    From: 'erp.app.pages.bi.finance-daily-report.balance-report',
    To: 'Balance report',
  },
  { From: 'erp.app.pages.bi.finance-daily-report.branch', To: 'Branch' },
  { From: 'erp.app.pages.bi.finance-daily-report.cm', To: 'This month' },
  { From: 'erp.app.pages.bi.finance-daily-report.content', To: 'Content' },
  { From: 'erp.app.pages.bi.finance-daily-report.cost-tab', To: 'Cash out' },
  {
    From: 'erp.app.pages.bi.finance-daily-report.daily-balance-report-title',
    To: 'Daily cash balance',
  },
  {
    From: 'erp.app.pages.bi.finance-daily-report.daily-report',
    To: 'Daily report',
  },
  {
    From: 'erp.app.pages.bi.finance-daily-report.daily-report-title',
    To: 'Daily report',
  },
  { From: 'erp.app.pages.bi.finance-daily-report.date', To: 'Date' },
  {
    From: 'erp.app.pages.bi.finance-daily-report.debt',
    To: 'Vendors Payables',
  },
  { From: 'erp.app.pages.bi.finance-daily-report.debt-tab', To: 'Debt' },
  {
    From: 'erp.app.pages.bi.finance-daily-report.deposit',
    To: 'Banquet deposits',
  },
  { From: 'erp.app.pages.bi.finance-daily-report.other', To: 'Options' },
  {
    From: 'erp.app.pages.bi.finance-daily-report.page-title',
    To: 'Daily report',
  },
  { From: 'erp.app.pages.bi.finance-daily-report.pm', To: 'Last month' },
  {
    From: 'erp.app.pages.bi.finance-daily-report.receivable',
    To: 'Customers Receivables',
  },
  {
    From: 'erp.app.pages.bi.finance-daily-report.receivable-tab',
    To: 'Collect',
  },
  { From: 'erp.app.pages.bi.finance-daily-report.refresh', To: 'Refresh' },
  {
    From: 'erp.app.pages.bi.finance-daily-report.report-date',
    To: 'Report date',
  },
  { From: 'erp.app.pages.bi.finance-daily-report.revenue', To: 'Revenue' },
  {
    From: 'erp.app.pages.bi.finance-daily-report.revenue-tab',
    To: 'Revenue',
  },
  {
    From: 'erp.app.pages.bi.finance-daily-report.show-feature',
    To: 'Expanded function',
  },
  { From: 'erp.app.pages.bi.finance-daily-report.time', To: 'Time' },
  {
    From: 'erp.app.pages.bi.finance-daily-report.total-cost',
    To: 'Total Cash out',
  },
  {
    From: 'erp.app.pages.bi.finance-daily-report.total-receive',
    To: 'Total Cash in',
  },
  { From: 'erp.app.pages.bi.price-report.all', To: 'All' },
  { From: 'erp.app.pages.bi.price-report.applied-date', To: 'Applied date' },
  { From: 'erp.app.pages.bi.price-report.compare-to', To: 'Compared to' },
  { From: 'erp.app.pages.bi.price-report.item', To: 'Item' },
  { From: 'erp.app.pages.bi.price-report.load-node', To: 'View price list' },
  {
    From: 'erp.app.pages.bi.price-report.option-group',
    To: 'Detail listing',
  },
  { From: 'erp.app.pages.bi.price-report.page-title', To: 'Price reports' },
  {
    From: 'erp.app.pages.bi.price-report.price-list-select',
    To: 'Select price list',
  },
  {
    From: 'erp.app.pages.bi.price-report.price-report-placeholder',
    To: 'price-report-placeholder',
  },
  { From: 'erp.app.pages.bi.price-report.uom', To: 'Unit' },
  {
    From: 'erp.app.pages.bi.sales-report.calc-by-date',
    To: 'Calculated by delivery date',
  },
  {
    From: 'erp.app.pages.bi.sales-report.calc-by-order',
    To: 'Calculated by order date',
  },
  {
    From: 'erp.app.pages.bi.sales-report.calc-info',
    To: 'Calculation method',
  },
  {
    From: 'erp.app.pages.bi.sales-report.calc-shipped-only',
    To: 'Actual amount delivered',
  },
  {
    From: 'erp.app.pages.bi.sales-report.calc-shipped-only-false',
    To: 'Order',
  },
  { From: 'erp.app.pages.bi.sales-report.contact', To: 'Contact' },
  { From: 'erp.app.pages.bi.sales-report.d', To: 'Today' },
  { From: 'erp.app.pages.bi.sales-report.dm', To: 'This month' },
  { From: 'erp.app.pages.bi.sales-report.dw', To: 'This week' },
  {
    From: 'erp.app.pages.bi.sales-report.export-sale-product-report',
    To: 'Export to Excel',
  },
  { From: 'erp.app.pages.bi.sales-report.group-by', To: 'Group by' },
  { From: 'erp.app.pages.bi.sales-report.id-outlet', To: 'Customer' },
  { From: 'erp.app.pages.bi.sales-report.id-saleman', To: 'Sales staff' },
  { From: 'erp.app.pages.bi.sales-report.m', To: 'This month' },
  { From: 'erp.app.pages.bi.sales-report.m3', To: '3 months' },
  { From: 'erp.app.pages.bi.sales-report.m6', To: '6 months' },
  {
    From: 'erp.app.pages.bi.sales-report.message.can-not-get-data',
    To: 'Cannot extract data',
  },
  { From: 'erp.app.pages.bi.sales-report.my', To: 'This year' },
  { From: 'erp.app.pages.bi.sales-report.option', To: 'Options' },
  { From: 'erp.app.pages.bi.sales-report.page-title', To: 'Sales reports' },
  { From: 'erp.app.pages.bi.sales-report.phone', To: 'Telephone' },
  { From: 'erp.app.pages.bi.sales-report.print', To: 'Form printing' },
  { From: 'erp.app.pages.bi.sales-report.q', To: 'This quarter' },
  { From: 'erp.app.pages.bi.sales-report.q2', To: '2 quarters' },
  { From: 'erp.app.pages.bi.sales-report.q3', To: '3 quarters' },
  { From: 'erp.app.pages.bi.sales-report.qy', To: 'This year' },
  { From: 'erp.app.pages.bi.sales-report.refresh', To: 'Refresh' },
  {
    From: 'erp.app.pages.bi.sales-report.run-reports',
    To: 'Data calculation',
  },
  { From: 'erp.app.pages.bi.sales-report.sale-outlet', To: 'Customer' },
  { From: 'erp.app.pages.bi.sales-report.sale-product', To: 'Product' },
  { From: 'erp.app.pages.bi.sales-report.sale-saleman', To: 'Sales staff' },
  {
    From: 'erp.app.pages.bi.sales-report.search-placeholder',
    To: 'Search for name, code or phone number',
  },
  {
    From: 'erp.app.pages.bi.sales-report.show-feature',
    To: 'Expanded function',
  },
  {
    From: 'erp.app.pages.bi.sales-report.sort-conditions',
    To: 'Sort condition',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.chief-accountant',
    To: 'Chief accountant',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.company-selling',
    To: 'Sales from Company',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.customer',
    To: 'Customer',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.date-range',
    To: 'Time',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.expect-receipt-date',
    To: '(deliverate date)',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.form-creator',
    To: 'Preparer',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.general-manager',
    To: 'General Director',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.order-date',
    To: '(order date)',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.orders',
    To: 'Order',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.print-date',
    To: 'Printing date',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.report',
    To: 'Report',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.revenue',
    To: 'sales quantity',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.saleman',
    To: 'Sales staff',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.signed-full-name',
    To: 'Sign and write full name',
  },
  { From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.stt', To: 'No.' },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.time-range',
    To: 'Time',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.total',
    To: 'Total',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.total-after-discount',
    To: 'sales quantity after discount',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.total-before-discount',
    To: 'sales quantity before discount',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.total-discount',
    To: 'Discount',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-outlet.workphone',
    To: 'Telephone',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-overview.discount-per-order',
    To: 'Discount per order',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-overview.new-customer',
    To: 'New customer',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-overview.order',
    To: 'Order',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-overview.price-per-order',
    To: 'Value per order',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-overview.profit',
    To: 'Profit',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-overview.profit-per-order',
    To: 'Profit per order',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-overview.ratio',
    To: 'Ratio',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-overview.revenue',
    To: 'Revenue',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-overview.revenue-per-guest',
    To: 'Revenue/customer',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-overview.revenue-per-target',
    To: 'Revenue/target',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.chief-accountant',
    To: 'Chief accountant',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.company-selling',
    To: 'Sales from Company',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.customer',
    To: 'Customer',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.date-range',
    To: 'Time',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.expect-receipt-date',
    To: '(deliverate date)',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.form-creator',
    To: 'Preparer',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.general-manager',
    To: 'General Director',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.item',
    To: 'Product name',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.order-date',
    To: '(order date)',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.orders',
    To: 'Order',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.print-date',
    To: 'Printing date',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.quantity',
    To: 'Quantity',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.report',
    To: 'Report',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.revenue',
    To: 'sales quantity',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.saleman',
    To: 'Sales staff',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.signed-full-name',
    To: 'Sign and write full name',
  },
  { From: 'erp.app.pages.bi.sales-report.tabs.sale-product.stt', To: 'No.' },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.time-range',
    To: 'Time',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.total',
    To: 'Total',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.total-after-discount',
    To: 'sales quantity after discount',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.total-before-discount',
    To: 'sales quantity before discount',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.total-discount',
    To: 'Discount',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.unit',
    To: 'Unit',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-product.workphone',
    To: 'Telephone',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.chief-accountant',
    To: 'Chief accountant',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.company-selling',
    To: 'Sales from Company',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.customer',
    To: 'Customer',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.date-range',
    To: 'Time',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.expect-receipt-date',
    To: '(deliverate date)',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.form-creator',
    To: 'Preparer',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.general-manager',
    To: 'General Director',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.item',
    To: 'Product name',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.order-date',
    To: '(order date)',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.orders',
    To: 'Order',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.print-date',
    To: 'Printing date',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.quantity',
    To: 'Quantity',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.report',
    To: 'Report',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.revenue',
    To: 'sales quantity',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.saleman',
    To: 'Sales staff',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.signed-full-name',
    To: 'Sign and write full name',
  },
  { From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.stt', To: 'No.' },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.time-range',
    To: 'Time',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.total',
    To: 'Total',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.total-after-discount',
    To: 'sales quantity after discount',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.total-before-discount',
    To: 'sales quantity before discount',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.total-discount',
    To: 'Discount',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.unit',
    To: 'Unit',
  },
  {
    From: 'erp.app.pages.bi.sales-report.tabs.sale-saleman.workphone',
    To: 'Telephone',
  },
  { From: 'erp.app.pages.bi.sales-report.time', To: 'Time' },
  { From: 'erp.app.pages.bi.sales-report.y', To: 'This year' },
  { From: 'erp.app.pages.bi.sales-report.y2', To: '2 years' },
  { From: 'erp.app.pages.bi.sales-report.y3', To: '3 years' },
  {
    From: 'erp.app.pages.bi.sales-report-mobile.after-discount',
    To: 'After discount',
  },
  {
    From: 'erp.app.pages.bi.sales-report-mobile.before-discount',
    To: 'Before discount',
  },
  { From: 'erp.app.pages.bi.sales-report-mobile.date', To: 'Time' },
  {
    From: 'erp.app.pages.bi.sales-report-mobile.date-range-label',
    To: 'date-range-label',
  },
  { From: 'erp.app.pages.bi.sales-report-mobile.discount', To: 'Discount' },
  { From: 'erp.app.pages.bi.sales-report-mobile.item', To: 'Product' },
  { From: 'erp.app.pages.bi.sales-report-mobile.order', To: 'Order' },
  {
    From: 'erp.app.pages.bi.sales-report-mobile.page-title',
    To: 'Sale report',
  },
  { From: 'erp.app.pages.bi.sales-report-mobile.promotion', To: 'Promotion' },
  { From: 'erp.app.pages.bi.sales-report-mobile.refresh', To: 'Refresh' },
  { From: 'erp.app.pages.bi.sales-report-mobile.saleman', To: 'Sales staff' },
  {
    From: 'erp.app.pages.bi.sales-report-mobile.total-after-discount',
    To: 'Sales after discount',
  },
  {
    From: 'erp.app.pages.bi.sales-report-mobile.total-before-discount',
    To: 'Sales before discount',
  },
  {
    From: 'erp.app.pages.bi.sales-report-mobile.total-discount',
    To: 'Discount',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.page-title',
    To: 'A/R Invoice Report',
  },
  { From: 'erp.app.pages.bi.invoices-reports.revenue', To: 'Revenue' },
  {
    From: 'erp.app.pages.bi.invoices-reports.run-reports',
    To: 'Tính số liệu',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.export-invoice-report',
    To: 'Xuất excel chi tiết...',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.title1',
    To: 'PHỤ LỤC',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.title2',
    To: 'BẢNG KÊ HÓA ĐƠN, CHỨNG TỪ HÀNG HÓA, DỊCH VỤ BÁN RA',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.sub-title1',
    To: '(Kèm theo tờ khai thuế GTGT mẫu số 01/GTGT)',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.sub-title2',
    To: 'Kỳ tính thuế:',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.from-date',
    To: 'Từ ngày',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.to-date',
    To: 'đến ngày',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.posted-by',
    To: 'Tên người nộp thuế',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.poster-taxid',
    To: 'Mã số thuế',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.name-taxid',
    To: 'Tên đại lý thuế (nếu có)',
  },
  { From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.order', To: 'STT' },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.invoice-title',
    To: 'Hóa đơn, chứng từ bán ra',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.buyer-name',
    To: 'Tên người mua',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.buyer-taxid',
    To: 'Mã số thuế người mua',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.buyer-total-before',
    To: 'Doanh số bán chưa có GTGT',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.buyer-vat',
    To: 'Thuế GTGT',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.buyer-remark',
    To: 'Ghi chú',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.invoice-number',
    To: 'Số hóa đơn',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.invoice-create-date',
    To: 'Ngày, tháng, năm lập hóa đơn',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.nonetax-title',
    To: '1. Hàng hóa, dịch vụ không chịu thuế giá trị gia tăng (GTGT):',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.zerotax-title',
    To: '2. Hàng hóa, dịch vụ chịu thuế suất GTGT 0% (*):',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.fivetax-title',
    To: '3. Hàng hóa, dịch vụ chịu thuế suất GTGT 5%:',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.eighttax-title',
    To: '4. Hàng hóa, dịch vụ chịu thuế suất GTGT 8%:',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.tentax-title',
    To: '5. Hàng hóa, dịch vụ chịu thuế suất GTGT 10%:',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.sum-note1',
    To: 'Tổng doanh thu hàng hóa, dịch vụ bán ra chịu thuế GTGT (*)',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.sum-note2',
    To: 'Tổng thuế GTGT của hàng hóa, dịch vụ bán ra (**)',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.sum-note3',
    To: 'Tôi cam đoan số liệu khai trên là đúng và chịu trách nhiệm trước pháp luật về những số liệu đã khai.',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.tax-agency',
    To: 'NHÂN VIÊN ĐẠI LÝ THUẾ',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.tax-agency-fullname',
    To: 'Họ và tên:.........',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.practicing-number',
    To: 'Chứng chỉ hành nghề số:.........',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.date-time',
    To: '....., ngày...tháng...năm 2022',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.tax-payer-legal',
    To: 'NGƯỜI NỘP THUẾ HOẶC ĐẠI DIỆN HỢP PHÁP CỦA NGƯỜI NỘP THUẾ',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.sign-fullname-mark',
    To: '(Ký, ghi rõ họ tên; chức vụ và đóng dấu (nếu có))',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.paper-remark',
    To: 'Ghi chú:',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.paper-remark2',
    To: '(*) Tổng doanh thu hàng hóa, dịch vụ bán ra chịu thuế GTGT là tổng cộng số liệu tại cột 6 của dòng tổng các chỉ tiêu 2, 3, 4.',
  },
  {
    From: 'erp.app.pages.bi.invoices-reports.tabs.revenue.paper-remark3',
    To: '(**) Tổng số thuế GTGT của hàng hóa, dịch vụ bán ra là tổng cộng số liệu tại cột 7 của dòng tổng của các chỉ tiêu 2, 3, 4.',
  },
  { From: 'erp.app.pages.bi.staff-dashboard.checkin', To: 'Timekeeping' },
  {
    From: 'erp.app.pages.bi.staff-dashboard.empty-detail',
    To: 'Cannot find relevant data. Please select other sorting conditions!',
  },
  {
    From: 'erp.app.pages.bi.staff-dashboard.empty-title',
    To: 'No data available',
  },
  { From: 'erp.app.pages.bi.staff-dashboard.page-title', To: 'Dashboard' },
  { From: 'erp.app.pages.bi.staff-dashboard.payroll', To: 'Payroll' },
  {
    From: 'erp.app.pages.bi.staff-dashboard.personal-scheduler',
    To: 'Working schedule',
  },
  { From: 'erp.app.pages.bi.staff-dashboard.profile', To: 'Profile' },
  { From: 'erp.app.pages.bi.staff-dashboard.refresh', To: 'Refresh' },
  { From: 'erp.app.pages.bi.staff-dashboard.request', To: 'Request' },
  {
    From: 'erp.app.pages.bi.staff-dashboard.show-feature',
    To: 'Expanded function',
  },
  { From: 'erp.app.pages.bi.staff-dashboard.todo', To: 'Tasks' },
  {
    From: 'erp.app.pages.crm.attendance-booking.billing-information',
    To: 'Invoice note',
  },
  {
    From: 'erp.app.pages.crm.attendance-booking.customer-group',
    To: 'Group',
  },
  {
    From: 'erp.app.pages.crm.attendance-booking.customer-name',
    To: 'Customer name',
  },
  {
    From: 'erp.app.pages.crm.attendance-booking.customer-type',
    To: 'Customer type',
  },
  { From: 'erp.app.pages.crm.attendance-booking.delete', To: 'Delete' },
  {
    From: 'erp.app.pages.crm.attendance-booking.dining-card',
    To: 'DiningCard',
  },
  {
    From: 'erp.app.pages.crm.attendance-booking.dinner-pax',
    To: 'Dinner/Pax',
  },
  { From: 'erp.app.pages.crm.attendance-booking.email', To: 'Email' },
  {
    From: 'erp.app.pages.crm.attendance-booking.foreigner-no',
    To: 'Foreign',
  },
  { From: 'erp.app.pages.crm.attendance-booking.id', To: 'id' },
  { From: 'erp.app.pages.crm.attendance-booking.kids', To: 'Kids' },
  { From: 'erp.app.pages.crm.attendance-booking.no-records', To: 'Count' },
  {
    From: 'erp.app.pages.crm.attendance-booking.no-records-detail',
    To: 'Number of bookings',
  },
  {
    From: 'erp.app.pages.crm.attendance-booking.other-information',
    To: 'Other information',
  },
  { From: 'erp.app.pages.crm.attendance-booking.page-title', To: 'Booking' },
  {
    From: 'erp.app.pages.crm.attendance-booking.party-date',
    To: 'banquet date',
  },
  { From: 'erp.app.pages.crm.attendance-booking.phone', To: 'Telephone' },
  { From: 'erp.app.pages.crm.attendance-booking.real-field', To: 'bookings' },
  {
    From: 'erp.app.pages.crm.attendance-booking.refresh',
    To: 'Change cancel',
  },
  {
    From: 'erp.app.pages.crm.attendance-booking.registered-table',
    To: 'Table',
  },
  { From: 'erp.app.pages.crm.attendance-booking.remark', To: 'Remark' },
  { From: 'erp.app.pages.crm.attendance-booking.save', To: 'Booking saved' },
  { From: 'erp.app.pages.crm.attendance-booking.status', To: 'Status' },
  {
    From: 'erp.app.pages.crm.attendance-booking.type-of-party',
    To: 'Banquet type',
  },
  { From: 'erp.app.pages.crm.business-partner.branch', To: 'Branch' },
  { From: 'erp.app.pages.crm.business-partner.carrier', To: 'Carrier' },
  {
    From: 'erp.app.pages.crm.business-partner.customer-name-placeholder',
    To: 'Search by code, name, phone number',
  },
  { From: 'erp.app.pages.crm.business-partner.id', To: 'Id' },
  {
    From: 'erp.app.pages.crm.business-partner.message.remove-address-complete',
    To: 'Delete this address',
  },
  {
    From: 'erp.app.pages.crm.business-partner.message.remove-contact-complete',
    To: 'Contacts deleted',
  },
  {
    From: 'erp.app.pages.crm.business-partner.message.update-coordination-complete',
    To: 'Location updated',
  },
  { From: 'erp.app.pages.crm.business-partner.name', To: 'Name' },
  { From: 'erp.app.pages.crm.business-partner.outlets', To: 'Outlets' },
  { From: 'erp.app.pages.crm.business-partner.page-title', To: 'List' },
  { From: 'erp.app.pages.crm.business-partner.selected-title', To: 'line' },
  { From: 'erp.app.pages.crm.business-partner.staff', To: 'Staff' },
  { From: 'erp.app.pages.crm.business-partner.storer', To: 'Storer' },
  { From: 'erp.app.pages.crm.business-partner.vendor', To: 'Vendor' },
  { From: 'erp.app.pages.crm.business-partner.workphone', To: 'Telephone' },
  {
    From: 'erp.app.pages.crm.business-partner-detail.address-tab',
    To: 'Address',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.annual-revenue',
    To: 'Scale (revenue)',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bank-account',
    To: 'Bank account number',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bank-name',
    To: 'Bank name',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.billing-address',
    To: 'Invoice address',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.billing-information',
    To: 'Invoice information',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.add-address',
    To: 'Add address',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.address',
    To: 'Address',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.addressline1',
    To: 'House number, street name, quarter',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.addressline2',
    To: 'Apartment, Building, Unit…',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.contact',
    To: 'Contact',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.contact-person',
    To: 'contact-person',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.coordinates',
    To: 'coordinates',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.country',
    To: 'country',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.country-placeholder',
    To: 'country-placeholder',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.district',
    To: 'District',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.lat',
    To: 'lat',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.latitude',
    To: 'latitude',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.long',
    To: 'long',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.longtitude',
    To: 'longtitude',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.phone1',
    To: 'Telephone',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.phone2',
    To: 'Telephone number (other)',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.province',
    To: 'Provinces',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.remark',
    To: 'remark',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.remove-address',
    To: 'Delete this address',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.ward',
    To: 'Ward',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-address.zipcode',
    To: 'Zip code',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-contact-point.add-contact-point-placeholder',
    To: 'Add contacts (search name, code or phone number)',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-contact-point.add-new',
    To: 'Add new/ Change name',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-contact-point.contact',
    To: 'Contact point',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-contact-point.dob',
    To: 'Date of birth',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-contact-point.female',
    To: 'Female',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-contact-point.gender',
    To: 'Genders',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-contact-point.male',
    To: 'Male',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-contact-point.name',
    To: 'Full name',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-contact-point.title',
    To: 'Title',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-contact-point.workphone',
    To: 'Telephone',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-items.code',
    To: 'Product code',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-items.contact-placeholder',
    To: 'contact-placeholder',
  },
  { From: 'erp.app.pages.crm.business-partner-detail.bp-items.id', To: 'Id' },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-items.item-import',
    To: 'Import product/price list',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-items.items-list',
    To: 'Product list',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-items.name',
    To: 'Product name',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-items.phone',
    To: 'phone',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-items.price',
    To: 'Price',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-outlet-info.business-type',
    To: 'Business type',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-outlet-info.customer-access',
    To: 'Access of customers',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-outlet-info.display',
    To: 'Samples',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-outlet-info.location',
    To: 'Operating location',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-outlet-info.page-title',
    To: 'Outlets classification',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-outlet-info.population-distribution',
    To: 'Population distribution',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-outlet-info.remark',
    To: 'Remark',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-outlet-info.search-placeholder',
    To: 'Search',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-outlet-info.type',
    To: 'Consumption channel',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.date-of-birth',
    To: 'Date of birth',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.date-of-expiration',
    To: 'Expiration date',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.date-of-issue',
    To: 'Date of issue',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.email',
    To: 'Email',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.ethnic',
    To: 'Ethnic',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.female',
    To: 'Female',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.first-name',
    To: 'Name',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.full-name',
    To: 'Full name',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.home-phone',
    To: 'Home phone number',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.idcard',
    To: 'National ID Card',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.identity-card-number',
    To: 'National ID',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.last-name',
    To: 'Last name',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.male',
    To: 'Male',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.marital-status',
    To: 'Marital status',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.mobile-phone',
    To: 'Telephone number',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.nationality',
    To: 'Nationality',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.personal-information',
    To: 'Personal information',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.place-of-birth',
    To: 'Place of birth',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.place-of-issue',
    To: 'Place of issue',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.place-of-origin',
    To: 'Place of origin',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.religion',
    To: 'Religion',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-person-info.remark',
    To: 'Remark',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-reference-code.code',
    To: 'Code',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-reference-code.page-title',
    To: 'Reference code',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-reference-code.vendor',
    To: 'Vendor',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.activate',
    To: 'Activate',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.allow-commingled-lpn',
    To: 'Allow commingled LPN',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.application-id',
    To: 'Application ID',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.carton-group',
    To: 'Carton group',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.case-label-type',
    To: 'Case label type',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.code-128',
    To: 'Code 128',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.code-39',
    To: 'Code 39',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.credit-limit',
    To: 'CreditLimit',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.credit-limit-meaning',
    To: 'Maximum amount of the owner credit limit',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.data-matrix',
    To: 'Data matrix',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.default-inbound-qc-location',
    To: 'Default inbound QC location',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.default-item-rotation',
    To: 'Default item rotation',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.default-outbound-qc-location',
    To: 'Default outbound QC location',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.default-packing-location',
    To: 'Default packing location',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.default-putaway-strategy',
    To: 'Default putaway strategy',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.default-returns-receipt-location',
    To: 'Default returns receipt location',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.default-rotation',
    To: 'Default rotation',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.default-strategy',
    To: 'Default strategy',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.fifo',
    To: 'FIFO',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.is-allow-multi-zone-rainbow-pallet',
    To: 'Allow multi zone rainbow pallet',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.is-enable-packing',
    To: 'Enable packing',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.is-qc-inspect-at-pack',
    To: 'QC Inspect at pack',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.label',
    To: 'Label',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.lifo',
    To: 'LIFO',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.lpn-barcode-format',
    To: 'LPN barcode format',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.lpn-barcode-symbology',
    To: 'LPN barcode symbology',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.lpn-length',
    To: 'LPN length',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.lpn-next-number',
    To: 'LPN next number',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.lpn-rollback-number',
    To: 'LPN rollback number',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.lpn-start-number',
    To: 'LPN start number',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.page-title',
    To: 'General',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.qr-code',
    To: 'QR code',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.search-placeholder',
    To: 'Search',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.sgtin',
    To: 'SGTIN',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.sscc',
    To: 'SSCC',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.sscc-1st-digit',
    To: 'SSCC 1st digit',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.standard-carrier-alpha-code',
    To: 'StandardCarrierAlphaCode',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.std',
    To: 'STD',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.std-option',
    To: 'Std',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.task',
    To: 'Task',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.ucc-vendor',
    To: 'UCC vendor #',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.bp-storer-info.user-defined',
    To: 'User defined',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.change-avatar',
    To: 'Change contact profile picture',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.code',
    To: 'Reference code',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.company-name',
    To: 'Company / organization name',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.email',
    To: 'Email address',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.general-tab',
    To: 'General information',
  },
  { From: 'erp.app.pages.crm.business-partner-detail.id', To: '#Id' },
  {
    From: 'erp.app.pages.crm.business-partner-detail.idowner',
    To: 'Customer care staff',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.id-pricelist',
    To: 'Selling price list',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.id-pricelist-for-vendor',
    To: 'Purchase price list',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.id-pricelist-placeholder',
    To: 'no price list for reference',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.information-management',
    To: 'Management information',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.is-branch',
    To: 'Internal unit',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.is-carrier',
    To: 'Carrier',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.is-customer',
    To: 'Customer',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.is-disabled',
    To: 'Pause',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.is-distributor',
    To: 'Distributor',
  },
  { From: 'erp.app.pages.crm.business-partner-detail.is-staff', To: 'Staff' },
  {
    From: 'erp.app.pages.crm.business-partner-detail.is-storer',
    To: 'Warehouse storage customer',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.is-vendor',
    To: 'Vendor',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.items-list-tab',
    To: 'Product list',
  },
  { From: 'erp.app.pages.crm.business-partner-detail.map-tab', To: 'Map' },
  { From: 'erp.app.pages.crm.business-partner-detail.name', To: 'Name' },
  {
    From: 'erp.app.pages.crm.business-partner-detail.number-of-employees',
    To: 'Scale (staff)',
  },
  { From: 'erp.app.pages.crm.business-partner-detail.other', To: 'Other' },
  {
    From: 'erp.app.pages.crm.business-partner-detail.otherphone',
    To: 'Telephone number (other)',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.is-outlets',
    To: 'Outlets',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.page-title',
    To: 'Information',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.personal-tab',
    To: 'Contact',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.price-table',
    To: 'Price list',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.radio-cooperate',
    To: 'Organization',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.radio-personal',
    To: 'Individual',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.store-tab',
    To: 'warehousing',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.taxcode',
    To: 'Tax code',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.type-tab',
    To: 'Classification',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.vendor-tab',
    To: 'Provided product',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.website',
    To: 'Website',
  },
  {
    From: 'erp.app.pages.crm.business-partner-detail.workphone',
    To: 'Work phone number',
  },
  { From: 'erp.app.pages.crm.mcp.add-customer', To: 'Add customer' },
  { From: 'erp.app.pages.crm.mcp.add-route', To: 'Add routes' },
  { From: 'erp.app.pages.crm.mcp.customer', To: 'Customer' },
  { From: 'erp.app.pages.crm.mcp.date-fri', To: 'Fri' },
  { From: 'erp.app.pages.crm.mcp.date-mon', To: 'Mon' },
  { From: 'erp.app.pages.crm.mcp.date-sat', To: 'Sat' },
  { From: 'erp.app.pages.crm.mcp.date-sun', To: 'Sun' },
  { From: 'erp.app.pages.crm.mcp.date-thu', To: 'Collect' },
  { From: 'erp.app.pages.crm.mcp.date-tue', To: 'Tue' },
  { From: 'erp.app.pages.crm.mcp.date-wed', To: 'Wed' },
  { From: 'erp.app.pages.crm.mcp.export', To: 'Export' },
  { From: 'erp.app.pages.crm.mcp.f', To: 'F' },
  { From: 'erp.app.pages.crm.mcp.id', To: 'Id' },
  { From: 'erp.app.pages.crm.mcp.salesman', To: 'Sales staff' },
  {
    From: 'erp.app.pages.crm.mcp.salesman-placeholder',
    To: 'Search for name, code or phone number',
  },
  { From: 'erp.app.pages.crm.mcp.id-shipper', To: 'id-shipper' },
  {
    From: 'erp.app.pages.crm.mcp.id-vehicle',
    To: 'Standard delivery vehicle',
  },
  {
    From: 'erp.app.pages.crm.mcp.id-vehicle-for-sample',
    To: 'Samples delivery vehicle',
  },
  {
    From: 'erp.app.pages.crm.mcp.id-vehicle-for-urgent',
    To: 'Urgent delivery vehicle',
  },
  {
    From: 'erp.app.pages.crm.mcp.id-vehicle-for-wholesale',
    To: 'Wholesale delivery vehicle',
  },
  {
    From: 'erp.app.pages.crm.mcp.id-vehicle-placeholder',
    To: 'Search for truck',
  },
  { From: 'erp.app.pages.crm.mcp.id-warehouse', To: 'Warehouse' },
  {
    From: 'erp.app.pages.crm.mcp.id-warehouse-placeholder',
    To: 'Select warehouse',
  },
  { From: 'erp.app.pages.crm.mcp.import', To: 'Import' },
  {
    From: 'erp.app.pages.crm.mcp.item-information-title',
    To: 'item-information-title',
  },
  {
    From: 'erp.app.pages.crm.mcp.message.update-mcp-complete',
    To: 'MCP updated',
  },
  { From: 'erp.app.pages.crm.mcp.name', To: 'Route name' },
  { From: 'erp.app.pages.crm.mcp.name-detail', To: 'Name' },
  {
    From: 'erp.app.pages.crm.mcp.number-of-customer',
    To: 'Number of customers',
  },
  { From: 'erp.app.pages.crm.mcp.page-title', To: 'Selling route' },
  { From: 'erp.app.pages.crm.mcp.phone', To: 'Telephone' },
  { From: 'erp.app.pages.crm.mcp.pickup-order', To: 'Pick - up order' },
  { From: 'erp.app.pages.crm.mcp.route-info', To: 'Route information' },
  { From: 'erp.app.pages.crm.mcp.route-map', To: 'Route map' },
  { From: 'erp.app.pages.crm.mcp.seller-name', To: 'Sales staff' },
  {
    From: 'erp.app.pages.crm.mcp.shipper-list-placeholder',
    To: 'shipper-list-placeholder',
  },
  { From: 'erp.app.pages.crm.mcp.start-date', To: 'start-date' },
  { From: 'erp.app.pages.crm.mcp.vehicle-name', To: 'Planned delivery' },
  { From: 'erp.app.pages.crm.mcp.w1', To: 'W1' },
  { From: 'erp.app.pages.crm.mcp.w2', To: 'W2' },
  { From: 'erp.app.pages.crm.mcp.w3', To: 'W3' },
  { From: 'erp.app.pages.crm.mcp.w4', To: 'W4' },
  { From: 'erp.app.pages.crm.mcp-customer-picker.add', To: 'Add' },
  { From: 'erp.app.pages.crm.mcp-customer-picker.address', To: 'Address' },
  { From: 'erp.app.pages.crm.mcp-customer-picker.close-modal', To: 'Close' },
  { From: 'erp.app.pages.crm.mcp-customer-picker.help', To: 'Help' },
  { From: 'erp.app.pages.crm.mcp-customer-picker.id-sort', To: 'Id' },
  { From: 'erp.app.pages.crm.mcp-customer-picker.name-sort', To: 'Customer' },
  { From: 'erp.app.pages.crm.mcp-customer-picker.refresh', To: 'Refresh' },
  {
    From: 'erp.app.pages.crm.mcp-customer-picker.selected-items',
    To: 'khách vào tuyến',
  },
  {
    From: 'erp.app.pages.crm.mcp-customer-picker.unselect-all',
    To: 'Unselect all',
  },
  {
    From: 'erp.app.pages.crm.mcp-customer-picker.vendor-code-sort',
    To: 'Vendor code',
  },
  { From: 'erp.app.pages.financial.general-ledger.account', To: 'Account' },
  {
    From: 'erp.app.pages.financial.general-ledger.account-2',
    To: 'Parent account',
  },
  { From: 'erp.app.pages.financial.general-ledger.add', To: 'Add account' },
  {
    From: 'erp.app.pages.financial.general-ledger.cancel',
    To: 'Change cancel',
  },
  { From: 'erp.app.pages.financial.general-ledger.close-modal', To: 'Close' },
  {
    From: 'erp.app.pages.financial.general-ledger.code-detail',
    To: 'Account',
  },
  { From: 'erp.app.pages.financial.general-ledger.delete', To: 'Delete' },
  {
    From: 'erp.app.pages.financial.general-ledger.external-code',
    To: 'ExternalCode',
  },
  {
    From: 'erp.app.pages.financial.general-ledger.foreign-name',
    To: 'Foreign Name',
  },
  {
    From: 'erp.app.pages.financial.general-ledger.idbranch-detail',
    To: 'Belonged to unit',
  },
  {
    From: 'erp.app.pages.financial.general-ledger.idparent-detail',
    To: 'Thuộc tài khoản',
  },
  { From: 'erp.app.pages.financial.general-ledger.name', To: 'Name' },
  {
    From: 'erp.app.pages.financial.general-ledger.name-detail',
    To: 'Account name',
  },
  {
    From: 'erp.app.pages.financial.general-ledger.page-title',
    To: 'Account',
  },
  { From: 'erp.app.pages.financial.general-ledger.remark', To: 'Remark' },
  {
    From: 'erp.app.pages.financial.general-ledger.remark-detail',
    To: 'Description',
  },
  { From: 'erp.app.pages.financial.general-ledger.save', To: 'Save' },
  {
    From: 'erp.app.pages.financial.tax-definition.account-placeholder',
    To: 'Select account',
  },
  {
    From: 'erp.app.pages.financial.tax-definition.acquisition-reverse',
    To: 'Acquisition / Reverse',
  },
  {
    From: 'erp.app.pages.financial.tax-definition.acquisition-tax-account',
    To: 'Acquisition Tax Account',
  },
  { From: 'erp.app.pages.financial.tax-definition.category', To: 'Category' },
  { From: 'erp.app.pages.financial.tax-definition.code', To: 'Code' },
  {
    From: 'erp.app.pages.financial.tax-definition.deferred-tax-account',
    To: 'Deferred Tax Account',
  },
  {
    From: 'erp.app.pages.financial.tax-definition.general',
    To: 'General information',
  },
  { From: 'erp.app.pages.financial.tax-definition.id', To: 'Id' },
  { From: 'erp.app.pages.financial.tax-definition.id-detail', To: 'Id' },
  { From: 'erp.app.pages.financial.tax-definition.input-tax', To: 'Deduct' },
  { From: 'erp.app.pages.financial.tax-definition.name', To: 'Name' },
  {
    From: 'erp.app.pages.financial.tax-definition.non-deduct',
    To: 'Non-Deduct',
  },
  {
    From: 'erp.app.pages.financial.tax-definition.non-deduct-account',
    To: 'Non Deduct. Acct',
  },
  { From: 'erp.app.pages.financial.tax-definition.page-title', To: 'List' },
  {
    From: 'erp.app.pages.financial.tax-definition.page-title-detail',
    To: 'Tax information',
  },
  { From: 'erp.app.pages.financial.tax-definition.rate', To: 'Rate' },
  {
    From: 'erp.app.pages.financial.tax-definition.remark',
    To: 'Description',
  },
  {
    From: 'erp.app.pages.financial.tax-definition.tax-account',
    To: 'TaxAccount',
  },
  {
    From: 'erp.app.pages.hrm.casual-labour-register.confirm-password',
    To: 'Confirm password',
  },
  {
    From: 'erp.app.pages.hrm.casual-labour-register.date-of-issue-id',
    To: 'Date of issue',
  },
  {
    From: 'erp.app.pages.hrm.casual-labour-register.dob',
    To: 'Date of birth',
  },
  {
    From: 'erp.app.pages.hrm.casual-labour-register.domicile',
    To: 'Place of origin',
  },
  { From: 'erp.app.pages.hrm.casual-labour-register.email', To: 'Email' },
  { From: 'erp.app.pages.hrm.casual-labour-register.first-name', To: 'Name' },
  {
    From: 'erp.app.pages.hrm.casual-labour-register.full-name',
    To: 'Full name',
  },
  {
    From: 'erp.app.pages.hrm.casual-labour-register.general-information',
    To: 'General information',
  },
  {
    From: 'erp.app.pages.hrm.casual-labour-register.id-card-information',
    To: 'National ID Card',
  },
  {
    From: 'erp.app.pages.hrm.casual-labour-register.identity-card-number',
    To: 'National ID',
  },
  {
    From: 'erp.app.pages.hrm.casual-labour-register.id-interviewer',
    To: 'Interviewer',
  },
  {
    From: 'erp.app.pages.hrm.casual-labour-register.idinterview-placeholder',
    To: 'Search for name, code or phone number',
  },
  {
    From: 'erp.app.pages.hrm.casual-labour-register.issued-by',
    To: 'Place of issue',
  },
  {
    From: 'erp.app.pages.hrm.casual-labour-register.last-name',
    To: 'Last name',
  },
  {
    From: 'erp.app.pages.hrm.casual-labour-register.login-information',
    To: 'Log in account',
  },
  {
    From: 'erp.app.pages.hrm.casual-labour-register.message.account-locked',
    To: 'Account has been locked, cannot log in',
  },
  {
    From: 'erp.app.pages.hrm.casual-labour-register.message.account-normal',
    To: 'Account functions normally',
  },
  {
    From: 'erp.app.pages.hrm.casual-labour-register.name',
    To: 'Display name',
  },
  {
    From: 'erp.app.pages.hrm.casual-labour-register.new-password',
    To: 'Enter password',
  },
  {
    From: 'erp.app.pages.hrm.casual-labour-register.page-title',
    To: 'Part-time staff registration',
  },
  { From: 'erp.app.pages.hrm.casual-labour-register.phone', To: 'Telephone' },
  {
    From: 'erp.app.pages.hrm.casual-labour-register.phone-number',
    To: 'Phone number',
  },
  {
    From: 'erp.app.pages.hrm.casual-labour-register.radio-female',
    To: 'Female',
  },
  { From: 'erp.app.pages.hrm.casual-labour-register.radio-male', To: 'Male' },
  { From: 'erp.app.pages.hrm.casual-labour-register.submit', To: 'Register' },
  {
    From: 'erp.app.pages.hrm.catering-voucher-modal.close-modal',
    To: 'Close',
  },
  {
    From: 'erp.app.pages.hrm.catering-voucher-modal.page-title',
    To: 'Meal Coupon',
  },
  { From: 'erp.app.pages.hrm.catering-voucher-modal.time', To: 'Time' },
  { From: 'erp.app.pages.hrm.catering-voucher-modal.used-at', To: 'Use at' },
  { From: 'erp.app.pages.hrm.checkin.from', To: 'From' },
  { From: 'erp.app.pages.hrm.checkin.log-time', To: 'Date' },
  { From: 'erp.app.pages.hrm.checkin.log-time-from', To: 'From date' },
  { From: 'erp.app.pages.hrm.checkin.log-time-to', To: 'To date' },
  { From: 'erp.app.pages.hrm.checkin.name', To: 'Checkin' },
  { From: 'erp.app.pages.hrm.checkin.page-title', To: 'Check-in history' },
  {
    From: 'erp.app.pages.hrm.checkin-gate.add-gate',
    To: 'Add check-in gate',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.breakfast-end',
    To: 'Breakfast check-in ending time',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.breakfast-start',
    To: 'Breakfast check-in starting time',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.can-checkin-breakfast',
    To: 'Serve breakfast',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.can-checkin-dinner',
    To: 'Serve dinner',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.can-checkin-lunch',
    To: 'Serve lunch',
  },
  { From: 'erp.app.pages.hrm.checkin-gate.checkin-gate', To: 'Checkin gate' },
  {
    From: 'erp.app.pages.hrm.checkin-gate.checkin-gate-list',
    To: 'Checkin gate',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.checkin-time',
    To: 'Check-in time',
  },
  { From: 'erp.app.pages.hrm.checkin-gate.code', To: 'Code' },
  {
    From: 'erp.app.pages.hrm.checkin-gate.create-new',
    To: 'Create new QR code',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.dinner-end',
    To: 'Dinner check-in ending time',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.dinner-start',
    To: 'Dinner check-in starting time',
  },
  { From: 'erp.app.pages.hrm.checkin-gate.download', To: 'Download QR Code' },
  { From: 'erp.app.pages.hrm.checkin-gate.id', To: 'Id' },
  { From: 'erp.app.pages.hrm.checkin-gate.ip-address', To: 'IPAddress' },
  {
    From: 'erp.app.pages.hrm.checkin-gate.is-catering-service',
    To: 'This is meal check - in gate',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.is-verifiy-location',
    To: 'Verify check-in location',
  },
  { From: 'erp.app.pages.hrm.checkin-gate.lat', To: 'Lat' },
  { From: 'erp.app.pages.hrm.checkin-gate.long', To: 'Long' },
  {
    From: 'erp.app.pages.hrm.checkin-gate.lunch-end',
    To: 'Lunch check-in ending time',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.lunch-start',
    To: 'Lunch check-in starting time',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.max-distance',
    To: 'Maximum distance from check-in location (12 - meter - variance)',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.message.catering-voucher-has-been-used',
    To: 'Meal Check-in completed',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.message.checkin-complete',
    To: 'Check-in completed',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.message.checkin-gate-with-value',
    To: 'You just scan: {{value}}, please scan valid check-in QR code.',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.message.invalid-coordinate',
    To: 'Cannot verify check-in location, please turn on GPS during chech-in',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.message.invalid-distance',
    To: 'Please check in at specified location',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.message.invalid-gate-coordinate',
    To: "Check-in gate's coordintates are invalid.",
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.message.invalid-ip',
    To: "IP is invalid. Please use company's wify when checking in",
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.message.invalid-logtime',
    To: 'Check-in time is invalid, please check-in at specfied time',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.message.mobile-only',
    To: 'This function is only available on phone',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.message.no-pre-ordered',
    To: 'You have not register for meals. Please register at least 01 day in advance',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.message.schedule-not-found',
    To: 'You do not have working schedule',
  },
  { From: 'erp.app.pages.hrm.checkin-gate.name', To: 'Name' },
  { From: 'erp.app.pages.hrm.checkin-gate.office-list', To: 'Office' },
  {
    From: 'erp.app.pages.hrm.checkin-gate.office-placeholder',
    To: 'Select office',
  },
  {
    From: 'erp.app.pages.hrm.checkin-gate.other-information',
    To: 'Other information',
  },
  { From: 'erp.app.pages.hrm.checkin-gate.page-title', To: 'Checkin logs' },
  { From: 'erp.app.pages.hrm.checkin-gate.qr-code-title', To: 'QR Code' },
  { From: 'erp.app.pages.hrm.checkin-gate.remark', To: 'Remark' },
  { From: 'erp.app.pages.hrm.checkin-gate.search-placeholder', To: 'Search' },
  { From: 'erp.app.pages.hrm.checkin-gate.sort', To: 'Sort' },
  { From: 'erp.app.pages.hrm.checkin-gate.type', To: 'Classification' },
  { From: 'erp.app.pages.hrm.checkin-logs.fc-next', To: 'Next day' },
  { From: 'erp.app.pages.hrm.checkin-logs.fc-prev', To: 'Previous day' },
  {
    From: 'erp.app.pages.hrm.checkin-logs.fc-today',
    To: 'Move to current date',
  },
  { From: 'erp.app.pages.hrm.checkin-logs.fc-today-button', To: 'Today' },
  { From: 'erp.app.pages.hrm.checkin-logs.help', To: 'Help' },
  {
    From: 'erp.app.pages.hrm.checkin-logs.mass-shifft-assignment',
    To: 'mass-shifft-assignment',
  },
  {
    From: 'erp.app.pages.hrm.checkin-logs.not-select',
    To: 'Not yet selected working schedule',
  },
  { From: 'erp.app.pages.hrm.checkin-logs.office-list', To: 'Location' },
  { From: 'erp.app.pages.hrm.checkin-logs.refresh', To: 'Refresh' },
  { From: 'erp.app.pages.hrm.checkin-logs.shift-list', To: 'Shift' },
  { From: 'erp.app.pages.hrm.checkin-logs.show-filter', To: 'Filter' },
  {
    From: 'erp.app.pages.hrm.checkin-logs.show-staff-picker',
    To: 'show-staff-picker',
  },
  {
    From: 'erp.app.pages.hrm.checkin-logs.sub-message',
    To: 'Please select working schedule to start',
  },
  {
    From: 'erp.app.pages.hrm.checkin-logs.timesheet-list',
    To: 'Working schedule',
  },
  {
    From: 'erp.app.pages.hrm.checkin-logs.timesheet-placeholder',
    To: 'Select working schedule',
  },
  { From: 'erp.app.pages.hrm.holiday-policy.from-date', To: 'From date' },
  {
    From: 'erp.app.pages.hrm.holiday-policy.from-date-sort',
    To: 'From date',
  },
  {
    From: 'erp.app.pages.hrm.holiday-policy.general-information',
    To: 'General information',
  },
  { From: 'erp.app.pages.hrm.holiday-policy.id', To: 'Id' },
  { From: 'erp.app.pages.hrm.holiday-policy.name', To: 'Event name' },
  { From: 'erp.app.pages.hrm.holiday-policy.name-sort', To: 'Name' },
  { From: 'erp.app.pages.hrm.holiday-policy.page-title', To: 'Leaves list' },
  {
    From: 'erp.app.pages.hrm.holiday-policy.page-title-detail',
    To: 'Detailed information',
  },
  { From: 'erp.app.pages.hrm.holiday-policy.remark', To: 'Remark' },
  { From: 'erp.app.pages.hrm.holiday-policy.to-date', To: 'To date' },
  { From: 'erp.app.pages.hrm.holiday-policy.to-date-sort', To: 'To date' },
  { From: 'erp.app.pages.hrm.log-generator.all', To: 'All' },
  { From: 'erp.app.pages.hrm.log-generator.close-modal', To: 'Close' },
  {
    From: 'erp.app.pages.hrm.log-generator.date-select-placeholder',
    To: 'Select weekdays',
  },
  { From: 'erp.app.pages.hrm.log-generator.days-of-week', To: 'Weekdays' },
  { From: 'erp.app.pages.hrm.log-generator.from-date', To: 'From date' },
  { From: 'erp.app.pages.hrm.log-generator.help', To: 'Help' },
  { From: 'erp.app.pages.hrm.log-generator.id-gate', To: 'Check -in gate' },
  { From: 'erp.app.pages.hrm.log-generator.id-office', To: 'Location' },
  { From: 'erp.app.pages.hrm.log-generator.id-staff', To: 'Staff' },
  {
    From: 'erp.app.pages.hrm.log-generator.is-all-staff',
    To: 'All staff in working schedule',
  },
  { From: 'erp.app.pages.hrm.log-generator.log-time', To: 'Log time' },
  {
    From: 'erp.app.pages.hrm.log-generator.mass-shift-assignment',
    To: 'Save',
  },
  {
    From: 'erp.app.pages.hrm.log-generator.message.check-red-above',
    To: 'Please recheck information highlighted in red above',
  },
  { From: 'erp.app.pages.hrm.log-generator.page-title', To: 'Checkin logs' },
  { From: 'erp.app.pages.hrm.log-generator.refresh', To: 'Refresh' },
  {
    From: 'erp.app.pages.hrm.log-generator.search-placeholder',
    To: 'Search',
  },
  {
    From: 'erp.app.pages.hrm.log-generator.staff-placeholder',
    To: 'Select staff',
  },
  { From: 'erp.app.pages.hrm.log-generator.staffs', To: 'Select staff' },
  { From: 'erp.app.pages.hrm.log-generator.time-span', To: 'Time' },
  { From: 'erp.app.pages.hrm.log-generator.to-date', To: 'To date' },
  { From: 'erp.app.pages.hrm.overtime-policy.end', To: 'Finishing time' },
  { From: 'erp.app.pages.hrm.overtime-policy.id', To: 'Id' },
  {
    From: 'erp.app.pages.hrm.overtime-policy.is-overnight-shift',
    To: 'Overnight',
  },
  {
    From: 'erp.app.pages.hrm.overtime-policy.max-minute-of-ot-in-cycle',
    To: 'Maximum overtime of the period (minutes)',
  },
  { From: 'erp.app.pages.hrm.overtime-policy.name', To: 'Name' },
  { From: 'erp.app.pages.hrm.overtime-policy.name-sort', To: 'Name' },
  { From: 'erp.app.pages.hrm.overtime-policy.overtime-title', To: 'Ovetime' },
  { From: 'erp.app.pages.hrm.overtime-policy.page-title', To: 'List' },
  {
    From: 'erp.app.pages.hrm.overtime-policy.page-title-detail',
    To: 'Ovetime',
  },
  { From: 'erp.app.pages.hrm.overtime-policy.remark', To: 'Remark' },
  { From: 'erp.app.pages.hrm.overtime-policy.start', To: 'Starting time' },
  { From: 'erp.app.pages.hrm.overtime-policy.type', To: 'Shift type' },
  {
    From: 'erp.app.pages.hrm.overtime-policy.type-placeholder',
    To: 'Select type',
  },
  {
    From: 'erp.app.pages.hrm.paid-time-off-policy.add-dates',
    To: 'Add rewarded leaves',
  },
  { From: 'erp.app.pages.hrm.paid-time-off-policy.code', To: 'Code' },
  { From: 'erp.app.pages.hrm.paid-time-off-policy.code-sort', To: 'Code' },
  {
    From: 'erp.app.pages.hrm.paid-time-off-policy.days',
    To: 'Quantity of rewarded leaves',
  },
  {
    From: 'erp.app.pages.hrm.paid-time-off-policy.general-information',
    To: 'General information',
  },
  { From: 'erp.app.pages.hrm.paid-time-off-policy.id', To: 'Id' },
  { From: 'erp.app.pages.hrm.paid-time-off-policy.id-sort', To: 'Id' },
  {
    From: 'erp.app.pages.hrm.paid-time-off-policy.is-grants-by-length-of-services',
    To: 'Rewarded leaves by senority',
  },
  {
    From: 'erp.app.pages.hrm.paid-time-off-policy.message.delete-complete',
    To: 'Deleted!',
  },
  {
    From: 'erp.app.pages.hrm.paid-time-off-policy.months',
    To: 'Number of months',
  },
  { From: 'erp.app.pages.hrm.paid-time-off-policy.name', To: 'Policy name' },
  { From: 'erp.app.pages.hrm.paid-time-off-policy.name-sort', To: 'Name' },
  {
    From: 'erp.app.pages.hrm.paid-time-off-policy.number-of-carry-on-days',
    To: 'Remaning leaves carried forward next year',
  },
  {
    From: 'erp.app.pages.hrm.paid-time-off-policy.number-of-days',
    To: 'Standard yearly leaves',
  },
  { From: 'erp.app.pages.hrm.paid-time-off-policy.page-title', To: 'List' },
  {
    From: 'erp.app.pages.hrm.paid-time-off-policy.page-title-detail',
    To: 'Leaves policy',
  },
  { From: 'erp.app.pages.hrm.paid-time-off-policy.remark', To: 'Remark' },
  { From: 'erp.app.pages.hrm.paid-time-off-policy.type', To: 'Policy type' },
  {
    From: 'erp.app.pages.hrm.paid-time-off-policy.type-placeholder',
    To: 'Search',
  },
  {
    From: 'erp.app.pages.hrm.personal-scheduler.checkbox-remark',
    To: 'Note: only able to register at least 01 day in advance',
  },
  { From: 'erp.app.pages.hrm.personal-scheduler.close-modal', To: 'Close' },
  { From: 'erp.app.pages.hrm.personal-scheduler.fc-next', To: 'Next day' },
  {
    From: 'erp.app.pages.hrm.personal-scheduler.fc-prev',
    To: 'Previous day',
  },
  {
    From: 'erp.app.pages.hrm.personal-scheduler.fc-today',
    To: 'Move to current date',
  },
  {
    From: 'erp.app.pages.hrm.personal-scheduler.fc-today-button',
    To: 'Today',
  },
  {
    From: 'erp.app.pages.hrm.personal-scheduler.from-date',
    To: 'Working day',
  },
  {
    From: 'erp.app.pages.hrm.personal-scheduler.from-hour',
    To: 'Working time',
  },
  { From: 'erp.app.pages.hrm.personal-scheduler.help', To: 'Help' },
  { From: 'erp.app.pages.hrm.personal-scheduler.id-shift', To: 'Shift' },
  {
    From: 'erp.app.pages.hrm.personal-scheduler.is-book-breakfast-catering',
    To: 'Register for breakfast (B-Breakfast)',
  },
  {
    From: 'erp.app.pages.hrm.personal-scheduler.is-book-dinner-catering',
    To: 'Register for dinner (D-Dinner)',
  },
  {
    From: 'erp.app.pages.hrm.personal-scheduler.is-book-lunch-catering',
    To: 'Register for lunch (L-Lunch)',
  },
  {
    From: 'erp.app.pages.hrm.personal-scheduler.mass-shift-assignment',
    To: 'Save options',
  },
  {
    From: 'erp.app.pages.hrm.personal-scheduler.message.check-red-above',
    To: 'Please recheck information highlighted in red above',
  },
  {
    From: 'erp.app.pages.hrm.personal-scheduler.message.save-info-complete',
    To: 'Information saved successfully',
  },
  {
    From: 'erp.app.pages.hrm.personal-scheduler.page-title-detail',
    To: 'Daily working schedule',
  },
  { From: 'erp.app.pages.hrm.personal-scheduler.refresh', To: 'Refresh' },
  {
    From: 'erp.app.pages.hrm.personal-scheduler.search-placeholder',
    To: 'Search',
  },
  {
    From: 'erp.app.pages.hrm.personal-scheduler.time-off-type',
    To: 'Leave type',
  },
  { From: 'erp.app.pages.hrm.point-modal.breaks', To: 'Break-time' },
  {
    From: 'erp.app.pages.hrm.point-modal.calc-point',
    To: 'Timesheet calculation',
  },
  { From: 'erp.app.pages.hrm.point-modal.checkin', To: 'Check-in time' },
  { From: 'erp.app.pages.hrm.point-modal.checkin-late', To: 'Late check-in' },
  { From: 'erp.app.pages.hrm.point-modal.checkout', To: 'Check-out time' },
  {
    From: 'erp.app.pages.hrm.point-modal.checkout-early',
    To: 'Check - out early',
  },
  { From: 'erp.app.pages.hrm.point-modal.close-modal', To: 'Close' },
  {
    From: 'erp.app.pages.hrm.point-modal.log-count',
    To: 'Number of Recorded logs',
  },
  { From: 'erp.app.pages.hrm.point-modal.minute', To: 'minutes' },
  {
    From: 'erp.app.pages.hrm.point-modal.minutes-of-work',
    To: 'Working time',
  },
  { From: 'erp.app.pages.hrm.point-modal.point', To: 'Working time' },
  { From: 'erp.app.pages.hrm.point-modal.shift', To: 'Shift allocation' },
  {
    From: 'erp.app.pages.hrm.point-modal.shift-assignment',
    To: 'Shifts allocation',
  },
  {
    From: 'erp.app.pages.hrm.point-modal.shift-record-title',
    To: 'Record working hours',
  },
  {
    From: 'erp.app.pages.hrm.point-modal.std-time-in',
    To: 'Working hours counting start',
  },
  {
    From: 'erp.app.pages.hrm.point-modal.std-time-out',
    To: 'Working hours counting end',
  },
  { From: 'erp.app.pages.hrm.point-modal.timesheet', To: 'Timesheet' },
  { From: 'erp.app.pages.hrm.point-modal.working-date', To: 'Working day' },
  { From: 'erp.app.pages.hrm.ptos-enrollment.code-sort', To: 'Code' },
  { From: 'erp.app.pages.hrm.ptos-enrollment.day-off', To: 'Leaves' },
  { From: 'erp.app.pages.hrm.ptos-enrollment.id', To: 'Id' },
  {
    From: 'erp.app.pages.hrm.ptos-enrollment.id-policypto',
    To: 'Leaves policy',
  },
  { From: 'erp.app.pages.hrm.ptos-enrollment.id-policy-pto', To: 'Policy' },
  { From: 'erp.app.pages.hrm.ptos-enrollment.id-staff', To: 'Staff' },
  {
    From: 'erp.app.pages.hrm.ptos-enrollment.idstaff-placeholder',
    To: 'Search for name, code or phone number',
  },
  { From: 'erp.app.pages.hrm.ptos-enrollment.id-staff-sort', To: 'Staff' },
  { From: 'erp.app.pages.hrm.ptos-enrollment.page-title', To: 'List' },
  {
    From: 'erp.app.pages.hrm.ptos-enrollment.page-title-detail',
    To: 'Detailed information',
  },
  { From: 'erp.app.pages.hrm.ptos-enrollment.phone', To: 'Telephone' },
  {
    From: 'erp.app.pages.hrm.ptos-enrollment.policy-information',
    To: 'Policy information',
  },
  {
    From: 'erp.app.pages.hrm.ptos-enrollment.pto-balance',
    To: 'Total leaves',
  },
  {
    From: 'erp.app.pages.hrm.ptos-enrollment.pto-carry-over',
    To: 'Leaves balance',
  },
  {
    From: 'erp.app.pages.hrm.ptos-enrollment.pto-compensatory-leave',
    To: 'Roasted day off',
  },
  {
    From: 'erp.app.pages.hrm.ptos-enrollment.pto-length-of-service',
    To: 'Senority leaves',
  },
  {
    From: 'erp.app.pages.hrm.ptos-enrollment.pto-year-earned',
    To: 'Annual leaves',
  },
  { From: 'erp.app.pages.hrm.ptos-enrollment.remark', To: 'Description' },
  {
    From: 'erp.app.pages.hrm.ptos-enrollment.start-date',
    To: 'Effective date',
  },
  {
    From: 'erp.app.pages.hrm.ptos-enrollment.type-placeholder',
    To: 'Select type',
  },
  { From: 'erp.app.pages.hrm.scheduler.fc-next', To: 'Next day' },
  { From: 'erp.app.pages.hrm.scheduler.fc-prev', To: 'Previous day' },
  {
    From: 'erp.app.pages.hrm.scheduler.fc-today',
    To: 'Move to current date',
  },
  { From: 'erp.app.pages.hrm.scheduler.fc-today-button', To: 'Today' },
  {
    From: 'erp.app.pages.hrm.scheduler.mass-shift-assignment',
    To: 'Mass shift allocation',
  },
  {
    From: 'erp.app.pages.hrm.scheduler.message.update-shift-complete',
    To: 'Shifts updated',
  },
  {
    From: 'erp.app.pages.hrm.scheduler.not-select',
    To: 'Not yet selected working schedule',
  },
  { From: 'erp.app.pages.hrm.scheduler.office-list', To: 'Location' },
  {
    From: 'erp.app.pages.hrm.scheduler.scheduler-placeholder',
    To: 'Select working schedule',
  },
  { From: 'erp.app.pages.hrm.scheduler.shift-list', To: 'Shift' },
  { From: 'erp.app.pages.hrm.scheduler.show-filter', To: 'show-filter' },
  {
    From: 'erp.app.pages.hrm.scheduler.show-staff-picker-modal',
    To: 'Add staff into working schedule',
  },
  {
    From: 'erp.app.pages.hrm.scheduler.sub-message',
    To: 'Please select working schedule to begin',
  },
  {
    From: 'erp.app.pages.hrm.scheduler.timesheet-list',
    To: 'Working schedule',
  },
  { From: 'erp.app.pages.hrm.scheduler-generator.all', To: 'All' },
  { From: 'erp.app.pages.hrm.scheduler-generator.close-modal', To: 'Close' },
  {
    From: 'erp.app.pages.hrm.scheduler-generator.days-of-week-placeholder',
    To: 'Select weekdays',
  },
  {
    From: 'erp.app.pages.hrm.scheduler-generator.days-of-weeks',
    To: 'Weekdays',
  },
  {
    From: 'erp.app.pages.hrm.scheduler-generator.from-date',
    To: 'From date',
  },
  { From: 'erp.app.pages.hrm.scheduler-generator.help', To: 'Help' },
  {
    From: 'erp.app.pages.hrm.scheduler-generator.id-shift',
    To: 'Select shift',
  },
  {
    From: 'erp.app.pages.hrm.scheduler-generator.id-staff',
    To: 'Select staff',
  },
  {
    From: 'erp.app.pages.hrm.scheduler-generator.is-all-staff',
    To: 'All staff in working schedule',
  },
  {
    From: 'erp.app.pages.hrm.scheduler-generator.is-book-breafast-catering',
    To: 'Register for breakfast (B-Breakfast)',
  },
  {
    From: 'erp.app.pages.hrm.scheduler-generator.is-book-dinner-catering',
    To: 'Register for dinner (D-Dinner)',
  },
  {
    From: 'erp.app.pages.hrm.scheduler-generator.is-book-lunch-catering',
    To: 'Register for lunch (L-Lunch)',
  },
  {
    From: 'erp.app.pages.hrm.scheduler-generator.mass-shift-assignment',
    To: 'Save',
  },
  {
    From: 'erp.app.pages.hrm.scheduler-generator.message.check-red-above',
    To: 'Please recheck information highlighted in red above',
  },
  {
    From: 'erp.app.pages.hrm.scheduler-generator.message.select-shift-or-sub-type',
    To: 'Please choose working shift or classify leaves',
  },
  {
    From: 'erp.app.pages.hrm.scheduler-generator.page-title',
    To: 'Shift allocation',
  },
  { From: 'erp.app.pages.hrm.scheduler-generator.refresh', To: 'Refresh' },
  {
    From: 'erp.app.pages.hrm.scheduler-generator.search-placeholder',
    To: 'Search',
  },
  {
    From: 'erp.app.pages.hrm.scheduler-generator.staff-placeholder',
    To: 'Select staff',
  },
  {
    From: 'erp.app.pages.hrm.scheduler-generator.time-off-type',
    To: 'Leaves classification',
  },
  { From: 'erp.app.pages.hrm.scheduler-generator.to-date', To: 'To date' },
  { From: 'erp.app.pages.hrm.shift.breaks', To: 'Days off' },
  {
    From: 'erp.app.pages.hrm.shift.earliest-checkin',
    To: 'Earliest shift starting time',
  },
  {
    From: 'erp.app.pages.hrm.shift.earliest-checkout',
    To: 'Earliest shift ending time',
  },
  { From: 'erp.app.pages.hrm.shift.end', To: 'Finishing time' },
  { From: 'erp.app.pages.hrm.shift.id-sort', To: 'Id' },
  {
    From: 'erp.app.pages.hrm.shift.is-overnight-shift',
    To: 'IsOvernightShift',
  },
  {
    From: 'erp.app.pages.hrm.shift.latest-checkin',
    To: 'Latest shift starting time',
  },
  {
    From: 'erp.app.pages.hrm.shift.latest-checkout',
    To: 'Latest shift ending time',
  },
  { From: 'erp.app.pages.hrm.shift.minutes', To: 'Minutes' },
  { From: 'erp.app.pages.hrm.shift.name', To: 'Name' },
  { From: 'erp.app.pages.hrm.shift.name-sort', To: 'Name' },
  { From: 'erp.app.pages.hrm.shift.page-title', To: 'List' },
  { From: 'erp.app.pages.hrm.shift.page-title-detail', To: 'Shift' },
  { From: 'erp.app.pages.hrm.shift.remark', To: 'Remark' },
  { From: 'erp.app.pages.hrm.shift.shift-title', To: 'Shift' },
  { From: 'erp.app.pages.hrm.shift.start', To: 'Starting time' },
  { From: 'erp.app.pages.hrm.shift.std-point', To: 'Standard working days' },
  { From: 'erp.app.pages.hrm.shift.type', To: 'Shift type' },
  { From: 'erp.app.pages.hrm.shift.type-placeholder', To: 'Select type' },
  { From: 'erp.app.pages.hrm.shift.type-sort', To: 'Classification' },
  { From: 'erp.app.pages.hrm.staff.business-tab', To: 'Busisness trip' },
  { From: 'erp.app.pages.hrm.staff.change-avatar', To: 'change-avatar' },
  { From: 'erp.app.pages.hrm.staff.change-lock', To: 'Allow to use account' },
  {
    From: 'erp.app.pages.hrm.staff.change-role-host',
    To: 'Assign system admin role',
  },
  {
    From: 'erp.app.pages.hrm.staff.checkbox-is-disabled',
    To: 'Resigned staff',
  },
  { From: 'erp.app.pages.hrm.staff.code-sort', To: 'Reference code' },
  { From: 'erp.app.pages.hrm.staff.code-title', To: 'code-title' },
  {
    From: 'erp.app.pages.hrm.staff.confirm-password',
    To: 'Confirm password',
  },
  {
    From: 'erp.app.pages.hrm.staff.contract-renewal',
    To: 'Contract renewal',
  },
  { From: 'erp.app.pages.hrm.staff.create-account', To: 'Create account' },
  { From: 'erp.app.pages.hrm.staff.date-of-issue-id', To: 'Date of issue' },
  { From: 'erp.app.pages.hrm.staff.degree-tab', To: 'Qualifications' },
  { From: 'erp.app.pages.hrm.staff.department-sort', To: 'Unit' },
  { From: 'erp.app.pages.hrm.staff.dob', To: 'Date of birth' },
  { From: 'erp.app.pages.hrm.staff.domicile', To: 'Place of origin' },
  { From: 'erp.app.pages.hrm.staff.email', To: 'Email' },
  { From: 'erp.app.pages.hrm.staff.email-sort', To: 'Account' },
  { From: 'erp.app.pages.hrm.staff.family-tab', To: 'Family' },
  { From: 'erp.app.pages.hrm.staff.firstname', To: 'Name' },
  { From: 'erp.app.pages.hrm.staff.full-name', To: 'Full name' },
  { From: 'erp.app.pages.hrm.staff.fullname-sort', To: 'Staff name' },
  {
    From: 'erp.app.pages.hrm.staff.general-information',
    To: 'General information',
  },
  { From: 'erp.app.pages.hrm.staff.id', To: 'Id' },
  { From: 'erp.app.pages.hrm.staff.id-card', To: 'National ID Card' },
  { From: 'erp.app.pages.hrm.staff.id-department', To: 'Unit' },
  { From: 'erp.app.pages.hrm.staff.identity-card-number', To: 'National ID' },
  { From: 'erp.app.pages.hrm.staff.id-job-title', To: 'Title' },
  { From: 'erp.app.pages.hrm.staff.id-sort', To: 'Id' },
  { From: 'erp.app.pages.hrm.staff.id-title', To: 'id-title' },
  { From: 'erp.app.pages.hrm.staff.is-disabled', To: 'Resigned/ on pause' },
  { From: 'erp.app.pages.hrm.staff.issued-by', To: 'Place of issue' },
  { From: 'erp.app.pages.hrm.staff.job-title-sort', To: 'Title' },
  { From: 'erp.app.pages.hrm.staff.lastname', To: 'Last name' },
  { From: 'erp.app.pages.hrm.staff.login-account', To: 'Log in account' },
  {
    From: 'erp.app.pages.hrm.staff.message.account-locked',
    To: 'Account has been locked, cannot log in',
  },
  {
    From: 'erp.app.pages.hrm.staff.message.account-normal',
    To: 'Account functions normally',
  },
  {
    From: 'erp.app.pages.hrm.staff.message.can-not-save',
    To: 'Cannot save, please try again',
  },
  {
    From: 'erp.app.pages.hrm.staff.message.check-red-above',
    To: 'Please recheck information highlighted in red above',
  },
  {
    From: 'erp.app.pages.hrm.staff.message.confirmation-password-not-match',
    To: 'log-in password does not match',
  },
  {
    From: 'erp.app.pages.hrm.staff.message.create-account-with-value',
    To: 'Account created {{value}}',
  },
  {
    From: 'erp.app.pages.hrm.staff.message.email-registerd',
    To: 'Email has already been used for account registration, please check again',
  },
  {
    From: 'erp.app.pages.hrm.staff.message.least-6-char',
    To: 'Password must contain more than 6 characters',
  },
  {
    From: 'erp.app.pages.hrm.staff.message.remove-contact-complete',
    To: 'Contacts deleted',
  },
  {
    From: 'erp.app.pages.hrm.staff.message.update-password-complete',
    To: 'Password changed',
  },
  { From: 'erp.app.pages.hrm.staff.name', To: 'Display name' },
  { From: 'erp.app.pages.hrm.staff.new-password', To: 'Enter password' },
  { From: 'erp.app.pages.hrm.staff.page-title', To: 'Staff' },
  {
    From: 'erp.app.pages.hrm.staff.page-title-detail',
    To: 'Personnel profile',
  },
  {
    From: 'erp.app.pages.hrm.staff.personal-information',
    To: 'Personal information',
  },
  { From: 'erp.app.pages.hrm.staff.phonenumber', To: 'Phone number' },
  { From: 'erp.app.pages.hrm.staff.phone-number', To: 'Phone number' },
  { From: 'erp.app.pages.hrm.staff.radio-female', To: 'Female' },
  { From: 'erp.app.pages.hrm.staff.radio-male', To: 'Male' },
  { From: 'erp.app.pages.hrm.staff.ref-code', To: 'Reference code' },
  { From: 'erp.app.pages.hrm.staff.remark', To: 'Remark' },
  { From: 'erp.app.pages.hrm.staff.reset-password', To: 'Change password' },
  { From: 'erp.app.pages.hrm.staff.skill-tab', To: 'Skills' },
  {
    From: 'erp.app.pages.hrm.staff.staff-family.add-edit',
    To: 'Add new/ Change name',
  },
  { From: 'erp.app.pages.hrm.staff.staff-family.address', To: 'Address' },
  {
    From: 'erp.app.pages.hrm.staff.staff-family.contact-title',
    To: 'Contact point',
  },
  { From: 'erp.app.pages.hrm.staff.staff-family.dob', To: 'Date of birth' },
  { From: 'erp.app.pages.hrm.staff.staff-family.expire-date', To: 'Expired' },
  { From: 'erp.app.pages.hrm.staff.staff-family.female', To: 'Female' },
  { From: 'erp.app.pages.hrm.staff.staff-family.fullname', To: 'Full name' },
  { From: 'erp.app.pages.hrm.staff.staff-family.gender', To: 'Genders' },
  {
    From: 'erp.app.pages.hrm.staff.staff-family.id-card-number',
    To: 'National ID',
  },
  {
    From: 'erp.app.pages.hrm.staff.staff-family.issue-by',
    To: 'Place of issue',
  },
  {
    From: 'erp.app.pages.hrm.staff.staff-family.issue-date',
    To: 'Date of issue',
  },
  { From: 'erp.app.pages.hrm.staff.staff-family.male', To: 'Male' },
  { From: 'erp.app.pages.hrm.staff.staff-family.no', To: 'No' },
  {
    From: 'erp.app.pages.hrm.staff.staff-family.passport-number',
    To: 'Passport',
  },
  { From: 'erp.app.pages.hrm.staff.staff-family.phone', To: 'Telephone' },
  {
    From: 'erp.app.pages.hrm.staff.staff-family.staff-family-placeholder',
    To: 'Add contacts (search name, code or phone number)',
  },
  { From: 'erp.app.pages.hrm.staff.staff-family.yes', To: 'Yes' },
  { From: 'erp.app.pages.hrm.staff.unit-select', To: 'Select unit' },
  { From: 'erp.app.pages.hrm.staff-picker.add', To: 'Add' },
  { From: 'erp.app.pages.hrm.staff-picker.close-modal', To: 'Close' },
  { From: 'erp.app.pages.hrm.staff-picker.code-sort', To: 'Code' },
  { From: 'erp.app.pages.hrm.staff-picker.department-sort', To: 'Unit' },
  { From: 'erp.app.pages.hrm.staff-picker.email-sort', To: 'Account' },
  { From: 'erp.app.pages.hrm.staff-picker.fullname-sort', To: 'Staff name' },
  { From: 'erp.app.pages.hrm.staff-picker.help', To: 'Help' },
  { From: 'erp.app.pages.hrm.staff-picker.id', To: 'Id' },
  { From: 'erp.app.pages.hrm.staff-picker.jobtitle-sort', To: 'Title' },
  { From: 'erp.app.pages.hrm.staff-picker.page-title', To: 'Select staff' },
  { From: 'erp.app.pages.hrm.staff-picker.refresh', To: 'Refresh' },
  {
    From: 'erp.app.pages.hrm.staff-picker.select-change-by-department',
    To: 'Select by department',
  },
  {
    From: 'erp.app.pages.hrm.staff-picker.select-change-by-job-title',
    To: 'Select by titile',
  },
  { From: 'erp.app.pages.hrm.staff-picker.staff', To: 'Staff' },
  { From: 'erp.app.pages.hrm.staff-picker.unselect-all', To: 'Unselect all' },
  { From: 'erp.app.pages.hrm.timesheet.checkin-policy', To: 'CheckInPolicy' },
  { From: 'erp.app.pages.hrm.timesheet.code', To: 'code' },
  {
    From: 'erp.app.pages.hrm.timesheet.general-information',
    To: 'General information',
  },
  { From: 'erp.app.pages.hrm.timesheet.id-branch', To: 'id-branch' },
  {
    From: 'erp.app.pages.hrm.timesheet.id-branch-placeholder',
    To: 'id-branch-placeholder',
  },
  { From: 'erp.app.pages.hrm.timesheet.id-sort', To: 'Id' },
  {
    From: 'erp.app.pages.hrm.timesheet.is-checkout-required',
    To: 'Check-out required',
  },
  {
    From: 'erp.app.pages.hrm.timesheet.is-required-approve-to-enroll',
    To: 'Required approve to enroll',
  },
  {
    From: 'erp.app.pages.hrm.timesheet.is-required-approve-to-switch',
    To: 'Required approve to switch',
  },
  {
    From: 'erp.app.pages.hrm.timesheet.is-required-approve-to-transfer',
    To: 'Required approve to transfer',
  },
  { From: 'erp.app.pages.hrm.timesheet.manager', To: 'manager' },
  { From: 'erp.app.pages.hrm.timesheet.name', To: 'Name' },
  { From: 'erp.app.pages.hrm.timesheet.name-sort', To: 'Name' },
  {
    From: 'erp.app.pages.hrm.timesheet.number-of-shift-per-day',
    To: 'Number of Daily working shift',
  },
  { From: 'erp.app.pages.hrm.timesheet.page-title', To: 'Timesheet' },
  {
    From: 'erp.app.pages.hrm.timesheet.page-title-detail',
    To: 'Working schedule',
  },
  {
    From: 'erp.app.pages.hrm.timesheet.policy-placeholder',
    To: 'Select policy',
  },
  { From: 'erp.app.pages.hrm.timesheet.remark', To: 'Remark' },
  { From: 'erp.app.pages.hrm.timesheet.type', To: 'Classification' },
  {
    From: 'erp.app.pages.hrm.timesheet.type-placeholder',
    To: 'Select classification',
  },
  { From: 'erp.app.pages.hrm.timesheet.unit-sort', To: 'Unit' },
  {
    From: 'erp.app.pages.hrm.timesheet.working-hours-per-day',
    To: 'Working hours per day',
  },
  { From: 'erp.app.pages.hrm.timesheet-cycle.close-modal', To: 'Close' },
  { From: 'erp.app.pages.hrm.timesheet-cycle.cycle-name', To: 'Period name' },
  { From: 'erp.app.pages.hrm.timesheet-cycle.end-sort', To: 'To date' },
  { From: 'erp.app.pages.hrm.timesheet-cycle.export', To: 'Export' },
  { From: 'erp.app.pages.hrm.timesheet-cycle.fc-next', To: 'Next day' },
  { From: 'erp.app.pages.hrm.timesheet-cycle.fc-prev', To: 'Previous day' },
  {
    From: 'erp.app.pages.hrm.timesheet-cycle.fc-today',
    To: 'Move to current date',
  },
  { From: 'erp.app.pages.hrm.timesheet-cycle.fc-today-button', To: 'Today' },
  { From: 'erp.app.pages.hrm.timesheet-cycle.help', To: 'Help' },
  { From: 'erp.app.pages.hrm.timesheet-cycle.id-sort', To: 'Id' },
  {
    From: 'erp.app.pages.hrm.timesheet-cycle.mass-shift-assignment',
    To: 'Mass shift allocation',
  },
  {
    From: 'erp.app.pages.hrm.timesheet-cycle.message.check-red-above',
    To: 'Please recheck information highlighted in red above',
  },
  { From: 'erp.app.pages.hrm.timesheet-cycle.name-sort', To: 'Period' },
  {
    From: 'erp.app.pages.hrm.timesheet-cycle.not-select',
    To: 'Not yet selected working schedule',
  },
  { From: 'erp.app.pages.hrm.timesheet-cycle.office-list', To: 'Location' },
  { From: 'erp.app.pages.hrm.timesheet-cycle.page-title', To: 'List' },
  {
    From: 'erp.app.pages.hrm.timesheet-cycle.page-title-modal',
    To: 'Period',
  },
  { From: 'erp.app.pages.hrm.timesheet-cycle.refresh', To: 'Refresh' },
  {
    From: 'erp.app.pages.hrm.timesheet-cycle.search-placeholder',
    To: 'Search',
  },
  { From: 'erp.app.pages.hrm.timesheet-cycle.shift-list', To: 'Shift' },
  { From: 'erp.app.pages.hrm.timesheet-cycle.show-filter', To: 'Filter' },
  { From: 'erp.app.pages.hrm.timesheet-cycle.start-sort', To: 'From date' },
  {
    From: 'erp.app.pages.hrm.timesheet-cycle.sub-message',
    To: 'Please select working schedule to start',
  },
  { From: 'erp.app.pages.hrm.timesheet-cycle.submit', To: 'Save' },
  { From: 'erp.app.pages.hrm.timesheet-cycle.timesheet', To: 'Timesheet' },
  {
    From: 'erp.app.pages.hrm.timesheet-cycle.timesheet-list',
    To: 'Working schedule',
  },
  {
    From: 'erp.app.pages.hrm.timesheet-cycle.timesheet-placeholder',
    To: 'Select working schedule',
  },
  { From: 'erp.app.pages.hrm.user-device.code', To: 'Code' },
  {
    From: 'erp.app.pages.hrm.user-device.device-information',
    To: 'Equipment information',
  },
  { From: 'erp.app.pages.hrm.user-device.id-sort', To: 'Id' },
  { From: 'erp.app.pages.hrm.user-device.id-staff-sort', To: 'Staff' },
  {
    From: 'erp.app.pages.hrm.user-device.is-allow-checkin',
    To: 'Allow checkin',
  },
  {
    From: 'erp.app.pages.hrm.user-device.is-allow-checkin-sort',
    To: 'CanCheckIn',
  },
  { From: 'erp.app.pages.hrm.user-device.is-virtual', To: 'Virtual device' },
  { From: 'erp.app.pages.hrm.user-device.manufacturer', To: 'Manufacturer' },
  { From: 'erp.app.pages.hrm.user-device.model', To: 'Model' },
  { From: 'erp.app.pages.hrm.user-device.name', To: 'Name' },
  { From: 'erp.app.pages.hrm.user-device.name-sort', To: 'Equipment Name' },
  {
    From: 'erp.app.pages.hrm.user-device.operating-system',
    To: 'OperatingSystem',
  },
  { From: 'erp.app.pages.hrm.user-device.os-version', To: 'OsVersion' },
  { From: 'erp.app.pages.hrm.user-device.page-title', To: 'List' },
  {
    From: 'erp.app.pages.hrm.user-device.page-title-detail',
    To: 'Detailed information',
  },
  { From: 'erp.app.pages.hrm.user-device.phone', To: 'Telephone' },
  { From: 'erp.app.pages.hrm.user-device.platform', To: 'Platform' },
  { From: 'erp.app.pages.hrm.user-device.remark', To: 'Description' },
  { From: 'erp.app.pages.hrm.user-device.staff', To: 'Staff' },
  {
    From: 'erp.app.pages.hrm.user-device.staff-placeholder',
    To: 'Search for name, code or phone number',
  },
  {
    From: 'erp.app.pages.hrm.user-device.web-view-version',
    To: 'WebViewVersion',
  },
  { From: 'erp.app.pages.ost.branch.add', To: 'Add' },
  { From: 'erp.app.pages.ost.branch.address', To: 'Address' },
  {
    From: 'erp.app.pages.ost.branch.business-registration-number',
    To: 'Business registration number',
  },
  { From: 'erp.app.pages.ost.branch.cancel', To: 'Change cancel' },
  { From: 'erp.app.pages.ost.branch.close-modal', To: 'Close' },
  { From: 'erp.app.pages.ost.branch.delete', To: 'Delete' },
  { From: 'erp.app.pages.ost.branch.department', To: 'Unit' },
  { From: 'erp.app.pages.ost.branch.email', To: 'Email' },
  { From: 'erp.app.pages.ost.branch.fax', To: 'Fax' },
  { From: 'erp.app.pages.ost.branch.id-parent', To: 'Belonged to unit' },
  {
    From: 'erp.app.pages.ost.branch.id-specialized-management',
    To: 'Line manager',
  },
  { From: 'erp.app.pages.ost.branch.id-type', To: 'Organization level' },
  {
    From: 'erp.app.pages.ost.branch.is-administration-manager',
    To: 'Admistration',
  },
  {
    From: 'erp.app.pages.ost.branch.is-head-of-department',
    To: 'Head of department',
  },
  { From: 'erp.app.pages.ost.branch.issue-by', To: 'Place of issue' },
  { From: 'erp.app.pages.ost.branch.issue-date', To: 'Date of issue' },
  { From: 'erp.app.pages.ost.branch.jobtitle', To: 'Title' },
  { From: 'erp.app.pages.ost.branch.logo-url', To: 'URL Logo' },
  { From: 'erp.app.pages.ost.branch.name', To: 'Name' },
  { From: 'erp.app.pages.ost.branch.name-detail', To: '' },
  {
    From: 'erp.app.pages.ost.branch.page-title',
    To: 'Organization structure',
  },
  { From: 'erp.app.pages.ost.branch.phone', To: 'Phone number' },
  { From: 'erp.app.pages.ost.branch.phone2', To: 'Phone number 02' },
  { From: 'erp.app.pages.ost.branch.remark', To: 'Description' },
  { From: 'erp.app.pages.ost.branch.save', To: 'Save' },
  { From: 'erp.app.pages.ost.branch.short-name', To: 'Short name' },
  { From: 'erp.app.pages.ost.branch.sort', To: 'Sort' },
  { From: 'erp.app.pages.ost.branch.tax-code', To: 'Tax code' },
  {
    From: 'erp.app.pages.ost.branch.template-header',
    To: 'Company name (on printed form)',
  },
  { From: 'erp.app.pages.ost.branch.union-code', To: 'Code (Union)' },
  { From: 'erp.app.pages.ost.office.code', To: 'Code' },
  {
    From: 'erp.app.pages.ost.office.general-information',
    To: 'General information',
  },
  { From: 'erp.app.pages.ost.office.id-sort', To: 'Id' },
  { From: 'erp.app.pages.ost.office.name', To: 'Name' },
  { From: 'erp.app.pages.ost.office.name-sort', To: 'Name' },
  { From: 'erp.app.pages.ost.office.page-title', To: 'List' },
  {
    From: 'erp.app.pages.ost.office.page-title-detail',
    To: 'Detailed information',
  },
  { From: 'erp.app.pages.ost.office.remark', To: 'Description' },
  { From: 'erp.app.pages.ost.office.remark-sort', To: 'Note' },
  { From: 'erp.app.pages.pms.vendor.add-new', To: 'Add contacts' },
  { From: 'erp.app.pages.pms.vendor.address1', To: 'Address' },
  { From: 'erp.app.pages.pms.vendor.address-line1', To: 'Address line 1' },
  { From: 'erp.app.pages.pms.vendor.address-line2', To: 'Address line 2' },
  { From: 'erp.app.pages.pms.vendor.address-title', To: 'Address' },
  { From: 'erp.app.pages.pms.vendor.analytic-kpi-tab', To: 'KPI Analysis' },
  { From: 'erp.app.pages.pms.vendor.annual-revenue', To: 'Scale (revenue)' },
  {
    From: 'erp.app.pages.pms.vendor.bank-account',
    To: 'Bank account number',
  },
  { From: 'erp.app.pages.pms.vendor.bank-name', To: 'Bank name' },
  {
    From: 'erp.app.pages.pms.vendor.business-information',
    To: 'Company information',
  },
  {
    From: 'erp.app.pages.pms.vendor.change-avatar',
    To: "Change vendor's avatar",
  },
  { From: 'erp.app.pages.pms.vendor.code', To: 'Reference code' },
  {
    From: 'erp.app.pages.pms.vendor.company-name',
    To: 'Company / organization name',
  },
  { From: 'erp.app.pages.pms.vendor.date-of-issue-id', To: 'Date of issue' },
  {
    From: 'erp.app.pages.pms.vendor.debt-docs',
    To: 'Acounts receivables - Documents',
  },
  { From: 'erp.app.pages.pms.vendor.department', To: 'Department' },
  { From: 'erp.app.pages.pms.vendor.dob', To: 'Date of birth' },
  { From: 'erp.app.pages.pms.vendor.domicile', To: 'Place of origin' },
  { From: 'erp.app.pages.pms.vendor.email', To: 'Email' },
  { From: 'erp.app.pages.pms.vendor.first-name', To: 'Name' },
  { From: 'erp.app.pages.pms.vendor.full-name', To: 'Full name' },
  {
    From: 'erp.app.pages.pms.vendor.general-information',
    To: 'General information',
  },
  { From: 'erp.app.pages.pms.vendor.homephone', To: 'Home phone number' },
  { From: 'erp.app.pages.pms.vendor.id', To: '' },
  {
    From: 'erp.app.pages.pms.vendor.id-card-information',
    To: 'National ID Card',
  },
  { From: 'erp.app.pages.pms.vendor.idcity', To: 'District' },
  { From: 'erp.app.pages.pms.vendor.idcountry', To: 'Nation' },
  {
    From: 'erp.app.pages.pms.vendor.identity-card-number',
    To: 'National ID',
  },
  { From: 'erp.app.pages.pms.vendor.idowner', To: 'Customer care staff' },
  { From: 'erp.app.pages.pms.vendor.idprovince', To: 'Provinces' },
  { From: 'erp.app.pages.pms.vendor.id-sort', To: 'Id' },
  { From: 'erp.app.pages.pms.vendor.info-name', To: 'Name' },
  {
    From: 'erp.app.pages.pms.vendor.information-management',
    To: 'Management information',
  },
  { From: 'erp.app.pages.pms.vendor.is-cooperate', To: 'Organization' },
  { From: 'erp.app.pages.pms.vendor.is-disabled', To: 'Pause' },
  { From: 'erp.app.pages.pms.vendor.is-personal', To: 'Individual' },
  { From: 'erp.app.pages.pms.vendor.issued-by', To: 'Place of issue' },
  { From: 'erp.app.pages.pms.vendor.is-vendor', To: 'Vendor' },
  { From: 'erp.app.pages.pms.vendor.last-name', To: 'Last name' },
  { From: 'erp.app.pages.pms.vendor.mobilephone', To: 'Telephone number' },
  { From: 'erp.app.pages.pms.vendor.name', To: 'Vendor name' },
  { From: 'erp.app.pages.pms.vendor.name-sort', To: 'Vendor' },
  {
    From: 'erp.app.pages.pms.vendor.number-of-employees',
    To: 'Scale (staff)',
  },
  { From: 'erp.app.pages.pms.vendor.page-title', To: 'Vendor' },
  { From: 'erp.app.pages.pms.vendor.page-title-detail', To: 'Vendor' },
  {
    From: 'erp.app.pages.pms.vendor.personal-information',
    To: 'Personal information',
  },
  { From: 'erp.app.pages.pms.vendor.policy', To: 'Policy' },
  { From: 'erp.app.pages.pms.vendor.product-tab', To: 'Product' },
  { From: 'erp.app.pages.pms.vendor.radio-female', To: 'Female' },
  { From: 'erp.app.pages.pms.vendor.radio-male', To: 'Male' },
  { From: 'erp.app.pages.pms.vendor.remark', To: 'Remark' },
  { From: 'erp.app.pages.pms.vendor.tax-code', To: 'Tax code' },
  { From: 'erp.app.pages.pms.vendor.title', To: 'Title' },
  { From: 'erp.app.pages.pms.vendor.website', To: 'Website' },
  { From: 'erp.app.pages.pms.vendor.workphone', To: 'Work phone number' },
  { From: 'erp.app.pages.pms.vendor.workphone-sort', To: 'Telephone' },
  { From: 'erp.app.pages.pos.pos-kitchen.code', To: 'Code' },
  { From: 'erp.app.pages.pos.pos-kitchen.id', To: 'Id' },
  { From: 'erp.app.pages.pos.pos-kitchen.name', To: 'Name' },
  { From: 'erp.app.pages.pos.pos-kitchen.page-title', To: 'Kitchen' },
  { From: 'erp.app.pages.pos.pos-kitchen.remark', To: 'Remark' },
  { From: 'erp.app.pages.pos.pos-kitchen.selected-title', To: 'line' },
  {
    From: 'erp.app.pages.pos.pos-kitchen-detail.general-information',
    To: 'General information',
  },
  { From: 'erp.app.pages.pos.pos-kitchen-detail.id', To: 'Id' },
  { From: 'erp.app.pages.pos.pos-kitchen-detail.name', To: 'Name' },
  { From: 'erp.app.pages.pos.pos-kitchen-detail.page-title', To: 'Kitchen' },
  { From: 'erp.app.pages.pos.pos-kitchen-detail.printer', To: 'Printer' },
  {
    From: 'erp.app.pages.pos.pos-kitchen-detail.printer-info',
    To: 'Printer',
  },
  {
    From: 'erp.app.pages.pos.pos-kitchen-detail.printer-placeholder',
    To: 'Search',
  },
  { From: 'erp.app.pages.pos.pos-kitchen-detail.remark', To: 'Description' },
  { From: 'erp.app.pages.pos.pos-memo.code', To: 'Code' },
  { From: 'erp.app.pages.pos.pos-memo.id', To: 'Id' },
  { From: 'erp.app.pages.pos.pos-memo.name', To: 'Name' },
  { From: 'erp.app.pages.pos.pos-memo.page-title', To: 'Note' },
  { From: 'erp.app.pages.pos.pos-memo.remark', To: 'Remark' },
  { From: 'erp.app.pages.pos.pos-memo.selected-title', To: 'line' },
  { From: 'erp.app.pages.pos.pos-memo.type', To: 'Classification' },
  {
    From: 'erp.app.pages.pos.pos-memo-detail.general',
    To: 'General information',
  },
  { From: 'erp.app.pages.pos.pos-memo-detail.id', To: 'Id' },
  { From: 'erp.app.pages.pos.pos-memo-detail.name', To: 'Name' },
  { From: 'erp.app.pages.pos.pos-memo-detail.page-title', To: 'Note' },
  { From: 'erp.app.pages.pos.pos-memo-detail.type', To: 'Classification' },
  { From: 'erp.app.pages.pos.pos-menu.code', To: 'Code' },
  { From: 'erp.app.pages.pos.pos-menu.id', To: 'Id' },
  { From: 'erp.app.pages.pos.pos-menu.name', To: 'Name' },
  { From: 'erp.app.pages.pos.pos-menu.page-title', To: 'List' },
  { From: 'erp.app.pages.pos.pos-menu.remark', To: 'Remark' },
  { From: 'erp.app.pages.pos.pos-menu.selected-title', To: 'line' },
  {
    From: 'erp.app.pages.pos.pos-menu-detail.change-avatar',
    To: 'Change profile picture',
  },
  { From: 'erp.app.pages.pos.pos-menu-detail.code', To: 'Code' },
  {
    From: 'erp.app.pages.pos.pos-menu-detail.detail',
    To: 'Detailed information',
  },
  { From: 'erp.app.pages.pos.pos-menu-detail.disabled', To: 'Pause' },
  {
    From: 'erp.app.pages.pos.pos-menu-detail.general',
    To: 'General information',
  },
  { From: 'erp.app.pages.pos.pos-menu-detail.id', To: 'Id' },
  {
    From: 'erp.app.pages.pos.pos-menu-detail.maintenance',
    To: 'Maintenance schedule',
  },
  { From: 'erp.app.pages.pos.pos-menu-detail.name', To: 'Name' },
  {
    From: 'erp.app.pages.pos.pos-order.add-contact',
    To: 'Create new customer',
  },
  { From: 'erp.app.pages.pos.pos-order.all', To: 'All' },
  { From: 'erp.app.pages.pos.pos-order.amount', To: 'Amount' },
  {
    From: 'erp.app.pages.pos.pos-order.amount-receive',
    To: 'Amount received',
  },
  { From: 'erp.app.pages.pos.pos-order.bill', To: 'Bill' },
  {
    From: 'erp.app.pages.pos.pos-order.bill-info',
    To: "This bill's invoice can only be generated in the same day",
  },
  { From: 'erp.app.pages.pos.pos-order.bill-no', To: 'Bill No.' },
  { From: 'erp.app.pages.pos.pos-order.cancel', To: 'Cancel' },
  { From: 'erp.app.pages.pos.pos-order.cart-placeholder', To: 'Cart' },
  { From: 'erp.app.pages.pos.pos-order.cash', To: 'Cash on hand' },
  { From: 'erp.app.pages.pos.pos-order.change', To: 'Forward' },
  { From: 'erp.app.pages.pos.pos-order.contact', To: 'Contact' },
  { From: 'erp.app.pages.pos.pos-order.customer', To: 'Customer' },
  { From: 'erp.app.pages.pos.pos-order.date', To: 'Date' },
  { From: 'erp.app.pages.pos.pos-order.discount', To: 'Discounted' },
  {
    From: 'erp.app.pages.pos.pos-order.idaddress-placeholder',
    To: 'Search for name, code or phone number',
  },
  { From: 'erp.app.pages.pos.pos-order.item', To: 'Item' },
  { From: 'erp.app.pages.pos.pos-order.menu-placeholder', To: 'Search menu' },
  {
    From: 'erp.app.pages.pos.pos-order.message.delete-complete',
    To: 'Deleted!',
  },
  {
    From: 'erp.app.pages.pos.pos-order.message.save-complete',
    To: 'Saving completed!',
  },
  { From: 'erp.app.pages.pos.pos-order.odd-guest', To: 'Individual guest' },
  { From: 'erp.app.pages.pos.pos-order.page-title', To: 'POS' },
  { From: 'erp.app.pages.pos.pos-order.print-date', To: 'PrintDate' },
  { From: 'erp.app.pages.pos.pos-order.quantity', To: 'Qty' },
  { From: 'erp.app.pages.pos.pos-order.receive', To: 'Receive' },
  {
    From: 'erp.app.pages.pos.pos-order.searchitem-placeholder',
    To: 'Search',
  },
  {
    From: 'erp.app.pages.pos.pos-order.search-placeholder',
    To: 'Search order ID',
  },
  {
    From: 'erp.app.pages.pos.pos-order.see-you',
    To: 'Thank you! See you again!',
  },
  { From: 'erp.app.pages.pos.pos-order.send-to', To: 'Send To' },
  { From: 'erp.app.pages.pos.pos-order.show-feature', To: 'View order' },
  { From: 'erp.app.pages.pos.pos-order.table', To: 'Table' },
  {
    From: 'erp.app.pages.pos.pos-order.table-placeholder',
    To: 'Select Table',
  },
  { From: 'erp.app.pages.pos.pos-order.tax', To: 'VAT' },
  { From: 'erp.app.pages.pos.pos-order.the-change', To: 'The change' },
  { From: 'erp.app.pages.pos.pos-order.total', To: 'Total' },
  {
    From: 'erp.app.pages.pos.pos-order.total-after-discount',
    To: 'Base VAT',
  },
  { From: 'erp.app.pages.pos.pos-order.total-after-tax', To: 'Amount Due' },
  {
    From: 'erp.app.pages.pos.pos-order.total-discount-from-saleman',
    To: 'Discount From SaleMan',
  },
  { From: 'erp.app.pages.pos.pos-order.total-before-discount', To: 'Total' },
  { From: 'erp.app.pages.pos.pos-order.total-discount', To: 'Discounted' },
  { From: 'erp.app.pages.pos.pos-order.vat', To: 'VAT' },
  { From: 'erp.app.pages.pos.pos-order.wire-transfer', To: 'Discount' },
  { From: 'erp.app.pages.pos.pos-table.code', To: 'Code' },
  { From: 'erp.app.pages.pos.pos-table.id', To: 'Id' },
  { From: 'erp.app.pages.pos.pos-table.name', To: 'Name' },
  { From: 'erp.app.pages.pos.pos-table.page-title', To: 'List' },
  { From: 'erp.app.pages.pos.pos-table.remark', To: 'Remark' },
  { From: 'erp.app.pages.pos.pos-table.selected-title', To: 'line' },
  {
    From: 'erp.app.pages.pos.pos-table-detail.change-avatar',
    To: 'Change profile picture',
  },
  { From: 'erp.app.pages.pos.pos-table-detail.code', To: 'Code' },
  {
    From: 'erp.app.pages.pos.pos-table-detail.detail',
    To: 'Detailed information',
  },
  { From: 'erp.app.pages.pos.pos-table-detail.disabled', To: 'Pause' },
  {
    From: 'erp.app.pages.pos.pos-table-detail.general',
    To: 'General information',
  },
  { From: 'erp.app.pages.pos.pos-table-detail.id', To: 'Id' },
  {
    From: 'erp.app.pages.pos.pos-table-detail.maintenance',
    To: 'Maintenance schedule',
  },
  { From: 'erp.app.pages.pos.pos-table-detail.name', To: 'Name' },
  { From: 'erp.app.pages.pos.pos-work-order.all', To: 'All' },
  {
    From: 'erp.app.pages.pos.pos-work-order.id-search-placeholder',
    To: 'Search order ID',
  },
  { From: 'erp.app.pages.pos.pos-work-order.page-title', To: 'POS' },
  {
    From: 'erp.app.pages.product.bill-of-material.add-orderline',
    To: 'Add component',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.add-order-line',
    To: 'Add product',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.batch-for',
    To: 'Prodcution quantity',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.batch-production',
    To: '(Finished goods / Batch)',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.batch-size',
    To: 'Quantity/batch',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.batch-size-title',
    To: 'Quantity/batch',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.cost-product',
    To: 'Production cost',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.general-information',
    To: 'General information',
  },
  { From: 'erp.app.pages.product.bill-of-material.id', To: 'Id' },
  { From: 'erp.app.pages.product.bill-of-material.id-detail', To: 'BOM' },
  {
    From: 'erp.app.pages.product.bill-of-material.id-item',
    To: 'Finished goods',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.id-pricelist',
    To: 'Selling price list',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.id-std-cost-pricelist',
    To: 'BOM price list',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.import',
    To: 'Import component',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.info-header',
    To: 'To enhance account security, your password should have…',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.item-code',
    To: 'Code/ Finished goods name',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.item-name',
    To: 'Finished goods with BOM',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.item-placeholder',
    To: 'Search for name or product code',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.message.can-not-create-order',
    To: 'Cannot create sales order. Please try again',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.message.delete-complete',
    To: 'Deleted!',
  },
  { From: 'erp.app.pages.product.bill-of-material.page-title', To: 'List' },
  {
    From: 'erp.app.pages.product.bill-of-material.page-title-detail',
    To: 'Production BOM',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.price',
    To: 'Unit selling price',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.pricelist-placeholder',
    To: 'Select price list',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.price-recommend',
    To: 'Suggested selling price',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.print-bom',
    To: 'Print BOM',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.production',
    To: 'Finished goods',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.quantity-for',
    To: 'BOM for',
  },
  { From: 'erp.app.pages.product.bill-of-material.quota', To: 'BOM' },
  { From: 'erp.app.pages.product.bill-of-material.quota-for', To: 'BOM for' },
  {
    From: 'erp.app.pages.product.bill-of-material.quota-tab',
    To: 'Production BOM',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.recommend-selling-price',
    To: 'Suggested selling price',
  },
  { From: 'erp.app.pages.product.bill-of-material.save', To: 'Save' },
  {
    From: 'erp.app.pages.product.bill-of-material.save-change',
    To: 'save-change',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.show-price',
    To: 'View price',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.standard-cost',
    To: 'Production unit price',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.std-cost',
    To: 'Standard costing',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.total-standard-cost',
    To: 'Production cost',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.total-std-cost',
    To: 'Total standard cost =',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.total-std-cost-1',
    To: '[StdCost] * [quantity] / [number of finished goods]',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.total-std-cost-2',
    To: '[StdCost] * ([Additional]/ [production quantity])',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.type',
    To: 'Classification',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.type-placeholder',
    To: 'Search',
  },
  { From: 'erp.app.pages.product.bill-of-material.uom-add-more', To: 'Add' },
  {
    From: 'erp.app.pages.product.bill-of-material.uom-add-more-title',
    To: 'Is the required resource to start or finish the production',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.uom-name',
    To: 'Component',
  },
  { From: 'erp.app.pages.product.bill-of-material.uom-price', To: 'Price' },
  {
    From: 'erp.app.pages.product.bill-of-material.uom-provide',
    To: 'Provide',
  },
  { From: 'erp.app.pages.product.bill-of-material.uom-qty', To: 'Quantity' },
  { From: 'erp.app.pages.product.bill-of-material.uom-reset', To: 'Reset' },
  {
    From: 'erp.app.pages.product.bill-of-material.uom-std-cost',
    To: 'Std Cost',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.uom-total-price',
    To: 'Total price',
  },
  {
    From: 'erp.app.pages.product.bill-of-material.uom-total-std-cost',
    To: 'Total Std Cost',
  },
  { From: 'erp.app.pages.product.bill-of-material.uom-type', To: 'Type' },
  { From: 'erp.app.pages.product.bill-of-material.uom-unit', To: 'Unit' },
  {
    From: 'erp.app.pages.product.bill-of-material.view-detail',
    To: 'View details',
  },
  { From: 'erp.app.pages.product.bill-of-material.vnd', To: 'đ' },
  {
    From: 'erp.app.pages.product.bill-of-material-note.batch-size',
    To: 'Quantity per one-time production',
  },
  {
    From: 'erp.app.pages.product.bill-of-material-note.bom-table',
    To: 'BOM table',
  },
  {
    From: 'erp.app.pages.product.bill-of-material-note.cannot-print',
    To: 'You are not allowed to use printing function',
  },
  { From: 'erp.app.pages.product.bill-of-material-note.for', To: 'for' },
  {
    From: 'erp.app.pages.product.bill-of-material-note.ingredients',
    To: 'Raw materials',
  },
  {
    From: 'erp.app.pages.product.bill-of-material-note.introduction',
    To: 'Insruction',
  },
  {
    From: 'erp.app.pages.product.bill-of-material-note.page-title',
    To: 'Print the BOM slip',
  },
  {
    From: 'erp.app.pages.product.bill-of-material-note.price',
    To: 'Selling price',
  },
  {
    From: 'erp.app.pages.product.bill-of-material-note.print',
    To: 'Form printing',
  },
  {
    From: 'erp.app.pages.product.bill-of-material-note.print-date',
    To: 'Printing date',
  },
  {
    From: 'erp.app.pages.product.bill-of-material-note.print-mode',
    To: 'print-mode',
  },
  {
    From: 'erp.app.pages.product.bill-of-material-note.product',
    To: 'Finished goods',
  },
  {
    From: 'erp.app.pages.product.bill-of-material-note.quantity',
    To: 'Quantity',
  },
  {
    From: 'erp.app.pages.product.bill-of-material-note.refresh',
    To: 'Refresh',
  },
  {
    From: 'erp.app.pages.product.bill-of-material-note.show-feature',
    To: 'Expanded function',
  },
  { From: 'erp.app.pages.product.bill-of-material-note.stage', To: 'Period' },
  {
    From: 'erp.app.pages.product.bill-of-material-note.std-cost',
    To: 'Production cost',
  },
  { From: 'erp.app.pages.product.bill-of-material-note.total', To: 'Total' },
  { From: 'erp.app.pages.product.bill-of-material-note.uom', To: 'Unit' },
  {
    From: 'erp.app.pages.product.order-recommendation.close-modal',
    To: 'Close',
  },
  {
    From: 'erp.app.pages.product.order-recommendation.create-po',
    To: 'Create PO',
  },
  {
    From: 'erp.app.pages.product.order-recommendation.delivery',
    To: 'Delivery',
  },
  {
    From: 'erp.app.pages.product.order-recommendation.dinner-pax',
    To: 'Quantity',
  },
  { From: 'erp.app.pages.product.order-recommendation.id', To: 'Id' },
  {
    From: 'erp.app.pages.product.order-recommendation.id-sort',
    To: 'id-sort',
  },
  {
    From: 'erp.app.pages.product.order-recommendation.id-storer',
    To: 'Goods owner',
  },
  {
    From: 'erp.app.pages.product.order-recommendation.id-warehouse',
    To: 'Warehouse',
  },
  {
    From: 'erp.app.pages.product.order-recommendation.kpi-sort',
    To: 'kpi-sort',
  },
  {
    From: 'erp.app.pages.product.order-recommendation.message.can-not-create',
    To: 'Cannot create PO, please try again later',
  },
  {
    From: 'erp.app.pages.product.order-recommendation.message.check-red-above',
    To: 'Please recheck information highlighted in red above',
  },
  {
    From: 'erp.app.pages.product.order-recommendation.message.created-po',
    To: 'PO created!',
  },
  {
    From: 'erp.app.pages.product.order-recommendation.message.select-vendor-with-value',
    To: 'NCC {{value}} selected',
  },
  { From: 'erp.app.pages.product.order-recommendation.name', To: 'Item' },
  { From: 'erp.app.pages.product.order-recommendation.order', To: 'Order' },
  {
    From: 'erp.app.pages.product.order-recommendation.order-date-placeholder',
    To: 'order-date-placeholder',
  },
  {
    From: 'erp.app.pages.product.order-recommendation.page-title',
    To: 'Order recommendation',
  },
  {
    From: 'erp.app.pages.product.order-recommendation.party-date',
    To: 'Duration',
  },
  {
    From: 'erp.app.pages.product.order-recommendation.payment',
    To: 'Payment',
  },
  { From: 'erp.app.pages.product.order-recommendation.price', To: 'Price' },
  {
    From: 'erp.app.pages.product.order-recommendation.quality',
    To: 'Quality',
  },
  {
    From: 'erp.app.pages.product.order-recommendation.search-placeholder',
    To: 'search-placeholder',
  },
  {
    From: 'erp.app.pages.product.order-recommendation.submit',
    To: 'Create PO',
  },
  {
    From: 'erp.app.pages.product.order-recommendation.suggest-vendor',
    To: 'Vendors recommendation',
  },
  {
    From: 'erp.app.pages.product.staff-catering-book-note.catering-booking-schedule.afternoon',
    To: 'Afternoon',
  },
  {
    From: 'erp.app.pages.product.staff-catering-book-note.catering-booking-schedule.evening',
    To: 'Evening',
  },
  {
    From: 'erp.app.pages.product.staff-catering-book-note.catering-booking-schedule.morning',
    To: 'Morning',
  },
  {
    From: 'erp.app.pages.product.staff-catering-book-note.catering-booking-schedule.unit-placeholder',
    To: 'unit-placeholder',
  },
  {
    From: 'erp.app.pages.product.staff-catering-book-note.catering-booking-schedule.uom',
    To: 'Unit',
  },
  {
    From: 'erp.app.pages.product.staff-catering-book-note.page-title',
    To: 'Meals summary',
  },
  {
    From: 'erp.app.pages.product.staff-catering-book-note.submit',
    To: 'Create list',
  },
  {
    From: 'erp.app.pages.product.staff-catering-book-note.table',
    To: 'Detail listing',
  },
  { From: 'erp.app.pages.product.staff-catering-book-note.unit', To: 'Unit' },
  {
    From: 'erp.app.pages.product.staff-catering-book-note.valid-from',
    To: 'From date',
  },
  {
    From: 'erp.app.pages.product.staff-catering-book-note.valid-to',
    To: 'To date',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.add-order-line',
    To: 'Add product',
  },
  { From: 'erp.app.pages.purchase.purchase-order.all-option', To: 'All' },
  {
    From: 'erp.app.pages.purchase.purchase-order.changeitem-placeholder',
    To: 'changeitem-placeholder',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.code-search-placerholder',
    To: 'code-search-placerholder',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.copy-to-receipt',
    To: 'Goods receipt',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.discount-label',
    To: 'Discount',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.expected-receipt-date',
    To: 'Expected date',
  },
  { From: 'erp.app.pages.purchase.purchase-order.id', To: 'Id' },
  {
    From: 'erp.app.pages.purchase.purchase-order.id-branch',
    To: 'Warehouse',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.id-search-placeholder',
    To: 'id-search-placeholder',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.import',
    To: 'Import product',
  },
  { From: 'erp.app.pages.purchase.purchase-order.item-label', To: 'Product' },
  {
    From: 'erp.app.pages.purchase.purchase-order.item-list',
    To: 'Product list',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.approved-with-value',
    To: '{{value}} orders approved',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.can-not-add',
    To: 'Cannot add product. Please try again later.',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.can-not-approve-pending-only',
    To: 'Your selected order cannot be approved. Please only select pending for approval order',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.can-not-cancel-pending-draft-only',
    To: 'Your selected invoices cannot be canceled. Please select draft or pending for approval invoice',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.can-not-create-asn',
    To: 'Cannot create ASN, please try again later',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.can-not-create-einvoice-approved-only',
    To: 'Cannot generate e-invoice. Please only select approved order',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.can-not-create-order',
    To: 'Cannot create sales order. Please try again',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.can-not-delete-new-disapprove-only',
    To: 'Your selected invoices cannot be deleted. Please only delete new or disapproved invoice',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.can-not-disapprove-pending-approved-only',
    To: 'Your selected invoices cannot be disaaproved. Please select approved or pending for approval invoice',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.can-not-merge',
    To: 'Your selected invoices cannot be combined. Please select new or disapproved invoice',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.can-not-save',
    To: 'Cannot save, please try again',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.can-not-send-approve-new-draft-disapprove-only',
    To: 'Your selected invoices cannot be approved. Please select new or draft or disapproved ones',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.can-not-split',
    To: 'Your selected order cannot be split. Please choose draft, new, pending for approval or disaaproved order',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.can-not-split-try',
    To: 'Cannot split invoice, please try again',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.check-atleast-one',
    To: 'Please check again, orders must have at least 1 item to be approved',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.check-customer-vendor-name',
    To: "Please check customer or vendor's name",
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.check-merge-invoice-select-customer',
    To: 'Please check the invoice to combine and select customer',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.create-asn-complete',
    To: 'ASN created!',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.delete-complete',
    To: 'Deleted!',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.einvoice-sign-success',
    To: 'Successfully generated and sign e-invoice!',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.einvoice-success',
    To: 'Successfully generated e-invoice!',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.import-complete',
    To: 'Import completed!',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.save-complete',
    To: 'Saving completed!',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.send-to-approve-with-value',
    To: '{{value}} orders sent for approval',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.split-complete',
    To: 'Invoice splitting completed',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.message.submit-orders-complete',
    To: 'Purchased ordered',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.order-date',
    To: 'Order created date',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.owner-search-placeholder',
    To: 'owner-search-placeholder',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.page-title',
    To: 'Purchase order list',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.page-title-detail',
    To: 'Order',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.payment-status',
    To: 'Payment status',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.po-vendor-code',
    To: 'PO code (Vendors)',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.price-label',
    To: 'Unit price',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.promotion-label',
    To: 'Promotion',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.promotion-label-title',
    To: 'Promotion goods',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.purchase-order',
    To: 'Purchase order',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.quantity-label',
    To: 'Quantity',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.search-placeholder',
    To: 'Search',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.show-sale-order-picker',
    To: 'Add items from SO',
  },
  { From: 'erp.app.pages.purchase.purchase-order.status', To: 'Status' },
  {
    From: 'erp.app.pages.purchase.purchase-order.status-detail',
    To: 'Status',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.storer-name',
    To: 'Goods owner',
  },
  { From: 'erp.app.pages.purchase.purchase-order.total', To: 'Total' },
  {
    From: 'erp.app.pages.purchase.purchase-order.total-after-tax',
    To: 'Value',
  },
  { From: 'erp.app.pages.purchase.purchase-order.total-label', To: 'Amount' },
  { From: 'erp.app.pages.purchase.purchase-order.uom-label', To: 'Unit' },
  { From: 'erp.app.pages.purchase.purchase-order.vat-label', To: '%VAT' },
  {
    From: 'erp.app.pages.purchase.purchase-order.vendor-code',
    To: 'Vendor code',
  },
  { From: 'erp.app.pages.purchase.purchase-order.vendor-name', To: 'Vendor' },
  {
    From: 'erp.app.pages.purchase.purchase-order.vendor-search-placeholder',
    To: 'vendor-search-placeholder',
  },
  { From: 'erp.app.pages.purchase.purchase-order-note.box', To: 'Box' },
  { From: 'erp.app.pages.purchase.purchase-order-note.buyer', To: 'Buyer' },
  { From: 'erp.app.pages.purchase.purchase-order-note.dear', To: 'Dear' },
  {
    From: 'erp.app.pages.purchase.purchase-order-note.expected-receipt-date',
    To: 'Expected delivery date',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order-note.footer',
    To: 'Please deliver on time with specified quantity and quality.',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order-note.footer-2',
    To: 'We truly appriciate.',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order-note.item-name',
    To: 'Product / Service name',
  },
  { From: 'erp.app.pages.purchase.purchase-order-note.odd', To: 'LCL' },
  {
    From: 'erp.app.pages.purchase.purchase-order-note.order-date',
    To: 'Order created date',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order-note.page-title',
    To: 'Print purchase order',
  },
  { From: 'erp.app.pages.purchase.purchase-order-note.po', To: 'PO' },
  {
    From: 'erp.app.pages.purchase.purchase-order-note.po-title',
    To: 'Purchase order',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order-note.price',
    To: 'Unit price',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order-note.print',
    To: 'Form printing',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order-note.print-mode',
    To: 'print-mode',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order-note.purchase-order',
    To: 'Purchase order',
  },
  { From: 'erp.app.pages.purchase.purchase-order-note.qty', To: 'S.L' },
  {
    From: 'erp.app.pages.purchase.purchase-order-note.quota',
    To: 'Specification',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order-note.refresh',
    To: 'Refresh',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order-note.rule',
    To: 'According to our agreement, we would like to order the following items:',
  },
  { From: 'erp.app.pages.purchase.purchase-order-note.seller', To: 'Seller' },
  {
    From: 'erp.app.pages.purchase.purchase-order-note.show-feature',
    To: 'Expanded function',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order-note.sign-full-name',
    To: '(Sign and write full name)',
  },
  { From: 'erp.app.pages.purchase.purchase-order-note.stt', To: 'No.' },
  { From: 'erp.app.pages.purchase.purchase-order-note.total', To: 'Amount' },
  {
    From: 'erp.app.pages.purchase.purchase-order-note.total-after-tax',
    To: 'Total amount',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order-note.total-before-discount',
    To: 'Total amount',
  },
  { From: 'erp.app.pages.purchase.purchase-order-note.total-tax', To: 'VAT' },
  { From: 'erp.app.pages.purchase.purchase-order-note.uom', To: 'Unit' },
  { From: 'erp.app.pages.purchase.sale-order-picker.address', To: 'Address' },
  {
    From: 'erp.app.pages.purchase.sale-order-picker.close-modal',
    To: 'Close',
  },
  {
    From: 'erp.app.pages.purchase.sale-order-picker.customer-name-sort',
    To: 'Customer',
  },
  { From: 'erp.app.pages.purchase.sale-order-picker.help', To: 'Help' },
  { From: 'erp.app.pages.purchase.sale-order-picker.id-sort', To: 'Order' },
  { From: 'erp.app.pages.purchase.sale-order-picker.order', To: 'Order' },
  {
    From: 'erp.app.pages.purchase.sale-order-picker.order-date-sort',
    To: 'Order created date',
  },
  {
    From: 'erp.app.pages.purchase.sale-order-picker.page-title',
    To: 'Select order',
  },
  { From: 'erp.app.pages.purchase.sale-order-picker.refresh', To: 'Refresh' },
  { From: 'erp.app.pages.purchase.sale-order-picker.save', To: 'Add' },
  {
    From: 'erp.app.pages.purchase.sale-order-picker.total-after-tax-sort',
    To: 'Total',
  },
  {
    From: 'erp.app.pages.purchase.sale-order-picker.unselect-all',
    To: 'Unselect all',
  },
  {
    From: 'erp.app.pages.purchase.sale-order-picker.vendor-code',
    To: 'Vendor code',
  },
  {
    From: 'erp.app.pages.purchase.sale-order-picker.view-contact-detail',
    To: "View customers' information",
  },
  {
    From: 'erp.app.pages.purchase.sale-order-picker.view-order-detail',
    To: "View order's details",
  },
  {
    From: 'erp.app.pages.sale.operation.date-range-label',
    To: 'date-range-label',
  },
  {
    From: 'erp.app.pages.sale.receivable-debt.customer-name',
    To: 'Customer',
  },
  { From: 'erp.app.pages.sale.receivable-debt.debt', To: 'Remaining debt' },
  {
    From: 'erp.app.pages.sale.receivable-debt.discount-from-vender',
    To: 'Vendor code',
  },
  {
    From: 'erp.app.pages.sale.receivable-debt.find-with-contact-id',
    To: 'Search for this customer',
  },
  { From: 'erp.app.pages.sale.receivable-debt.id', To: 'Order' },
  {
    From: 'erp.app.pages.sale.receivable-debt.order-date',
    To: 'Order created date',
  },
  {
    From: 'erp.app.pages.sale.receivable-debt.page-title',
    To: 'Debts to be collected',
  },
  { From: 'erp.app.pages.sale.receivable-debt.total-after-tax', To: 'Total' },
  {
    From: 'erp.app.pages.sale.receivable-debt.view-contact-detail',
    To: "View customers' information",
  },
  {
    From: 'erp.app.pages.sale.receivable-debt.view-order-detail',
    To: "View order's details",
  },
  { From: 'erp.app.pages.sale.saleman-debt.customer-name', To: 'Customer' },
  {
    From: 'erp.app.pages.sale.saleman-debt.discount-from-salesman',
    To: 'Discount from saleman',
  },
  {
    From: 'erp.app.pages.sale.saleman-debt.discount-from-vendor',
    To: 'Vendor code',
  },
  {
    From: 'erp.app.pages.sale.saleman-debt.find-with-contact-id',
    To: 'Search for this customer',
  },
  { From: 'erp.app.pages.sale.saleman-debt.id', To: 'Order' },
  { From: 'erp.app.pages.sale.saleman-debt.id-seller', To: '' },
  {
    From: 'erp.app.pages.sale.saleman-debt.order-date',
    To: 'Order created date',
  },
  {
    From: 'erp.app.pages.sale.saleman-debt.page-title',
    To: 'Debt of Saleman',
  },
  {
    From: 'erp.app.pages.sale.saleman-debt.received-discount-from-salesman',
    To: 'Amount paid',
  },
  {
    From: 'erp.app.pages.sale.saleman-debt.view-contact-detail',
    To: "View customers' information",
  },
  {
    From: 'erp.app.pages.sale.saleman-debt.view-order-detail',
    To: "View order's details",
  },
  { From: 'erp.app.pages.sale.saleman-debt-modal.amount', To: 'Amount paid' },
  { From: 'erp.app.pages.sale.saleman-debt-modal.close-modal', To: 'Close' },
  {
    From: 'erp.app.pages.sale.saleman-debt-modal.create-receipt',
    To: 'Collection',
  },
  { From: 'erp.app.pages.sale.saleman-debt-modal.debt', To: 'Debt note' },
  { From: 'erp.app.pages.sale.saleman-debt-modal.for', To: 'for' },
  { From: 'erp.app.pages.sale.saleman-debt-modal.help', To: 'Help' },
  { From: 'erp.app.pages.sale.saleman-debt-modal.id-owner', To: 'Payer' },
  {
    From: 'erp.app.pages.sale.saleman-debt-modal.id-owner-placeholder',
    To: 'Search for name, code or phone number',
  },
  {
    From: 'erp.app.pages.sale.saleman-debt-modal.message.can-not-save',
    To: 'Cannot save, please try again',
  },
  {
    From: 'erp.app.pages.sale.saleman-debt-modal.message.check-poster-amount',
    To: 'Please information of payer and amount paid.',
  },
  {
    From: 'erp.app.pages.sale.saleman-debt-modal.message.save-complete',
    To: 'Saving completed!',
  },
  {
    From: 'erp.app.pages.sale.saleman-debt-modal.page-title',
    To: 'Salesman discount to collect',
  },
  { From: 'erp.app.pages.sale.saleman-debt-modal.phone', To: 'Telephone' },
  {
    From: 'erp.app.pages.sale.saleman-debt-modal.post-date',
    To: 'Paid date',
  },
  { From: 'erp.app.pages.sale.sale-order.add-order', To: 'add-order' },
  { From: 'erp.app.pages.sale.sale-order.add-order-line', To: 'Add product' },
  { From: 'erp.app.pages.sale.sale-order.address', To: 'Address' },
  { From: 'erp.app.pages.sale.sale-order.add-shipment', To: 'Add shipment' },
  {
    From: 'erp.app.pages.sale.sale-order.after-discount',
    To: '(before discount from salesman)',
  },
  { From: 'erp.app.pages.sale.sale-order.all-option', To: 'All' },
  { From: 'erp.app.pages.sale.sale-order.bl-code', To: 'Bill No.' },
  {
    From: 'erp.app.pages.sale.sale-order.bl-estimated-delivery',
    To: 'Expected delivery date',
  },
  { From: 'erp.app.pages.sale.sale-order.bl-route', To: 'Route' },
  { From: 'erp.app.pages.sale.sale-order.bl-sellman', To: 'Shipper' },
  {
    From: 'erp.app.pages.sale.sale-order.bl-shipped-date',
    To: 'Delivery date',
  },
  {
    From: 'erp.app.pages.sale.sale-order.bl-shipping-address',
    To: 'Address',
  },
  {
    From: 'erp.app.pages.sale.sale-order.bl-vehiclenumber',
    To: 'License plate',
  },
  { From: 'erp.app.pages.sale.sale-order.bp', To: 'Coverage' },
  { From: 'erp.app.pages.sale.sale-order.call', To: 'call' },
  {
    From: 'erp.app.pages.sale.sale-order.can-use-promotion-item',
    To: 'Promotion goods',
  },
  { From: 'erp.app.pages.sale.sale-order.ck', To: '' },
  { From: 'erp.app.pages.sale.sale-order.ck1', To: 'Discount 1' },
  { From: 'erp.app.pages.sale.sale-order.ck2', To: 'Discount 2' },
  { From: 'erp.app.pages.sale.sale-order.ck-sp', To: 'Discount/product' },
  {
    From: 'erp.app.pages.sale.sale-order.ck-sp-title',
    To: 'Discount per product',
  },
  {
    From: 'erp.app.pages.sale.sale-order.ck-title',
    To: '= [%discount] * [value before discount]',
  },
  { From: 'erp.app.pages.sale.sale-order.click-import', To: 'Import file' },
  { From: 'erp.app.pages.sale.sale-order.contact', To: 'Contact' },
  { From: 'erp.app.pages.sale.sale-order.contact-address', To: 'Address' },
  {
    From: 'erp.app.pages.sale.sale-order.contact-code',
    To: 'Reference code',
  },
  {
    From: 'erp.app.pages.sale.sale-order.contact-company-name',
    To: 'Company / organization name',
  },
  {
    From: 'erp.app.pages.sale.sale-order.contact-mobile-phone',
    To: 'Telephone',
  },
  { From: 'erp.app.pages.sale.sale-order.contact-name', To: 'Name' },
  { From: 'erp.app.pages.sale.sale-order.contact-tax-code', To: 'Tax code' },
  {
    From: 'erp.app.pages.sale.sale-order.contact-workphone',
    To: 'Telephone',
  },
  { From: 'erp.app.pages.sale.sale-order.create-arinvoice.add', To: 'Add' },
  {
    From: 'erp.app.pages.sale.sale-order.create-arinvoice.add-splited-invoice',
    To: 'Add order',
  },
  {
    From: 'erp.app.pages.sale.sale-order.create-arinvoice.close-modal',
    To: 'Close',
  },
  {
    From: 'erp.app.pages.sale.sale-order.create-arinvoice.detail',
    To: 'Details',
  },
  { From: 'erp.app.pages.sale.sale-order.create-arinvoice.help', To: 'Help' },
  {
    From: 'erp.app.pages.sale.sale-order.create-arinvoice.idcontact',
    To: 'Customer (Individual)',
  },
  {
    From: 'erp.app.pages.sale.sale-order.create-arinvoice.message.can-not-save',
    To: 'Cannot save, please try again',
  },
  {
    From: 'erp.app.pages.sale.sale-order.create-arinvoice.message.check-atleast-one',
    To: 'Please check again, orders must have at least 1 item to be approved',
  },
  {
    From: 'erp.app.pages.sale.sale-order.create-arinvoice.message.invoice-complete',
    To: 'Invoice created!',
  },
  {
    From: 'erp.app.pages.sale.sale-order.create-arinvoice.placeholder-idcontact',
    To: 'Search for name, code or phone number',
  },
  {
    From: 'erp.app.pages.sale.sale-order.create-arinvoice.placeholder-iditem',
    To: 'Search for name or product code',
  },
  {
    From: 'erp.app.pages.sale.sale-order.create-arinvoice.split-arinvoice',
    To: 'Split Order',
  },
  {
    From: 'erp.app.pages.sale.sale-order.create-arinvoice.split-order',
    To: 'split order',
  },
  { From: 'erp.app.pages.sale.sale-order.create-arinvoice.unit', To: 'Unit' },
  {
    From: 'erp.app.pages.sale.sale-order.customer-information',
    To: 'Customer information',
  },
  { From: 'erp.app.pages.sale.sale-order.customer-name', To: 'Customer' },
  { From: 'erp.app.pages.sale.sale-order.delivery-date', To: '' },
  {
    From: 'erp.app.pages.sale.sale-order.delivery-list',
    To: 'delivery list',
  },
  {
    From: 'erp.app.pages.sale.sale-order.discount-from-distributor',
    To: 'Discount from distributor',
  },
  {
    From: 'erp.app.pages.sale.sale-order.discount-from-salesman',
    To: 'Discount from saleman',
  },
  {
    From: 'erp.app.pages.sale.sale-order.discount-from-salesman-title',
    To: 'Discount from saleman',
  },
  {
    From: 'erp.app.pages.sale.sale-order.discount-from-vendor',
    To: 'Discount from vendor',
  },
  {
    From: 'erp.app.pages.sale.sale-order.distributing-tab',
    To: 'Driver allocation',
  },
  {
    From: 'erp.app.pages.sale.sale-order.documents-debts',
    To: 'Documents / debts',
  },
  {
    From: 'erp.app.pages.sale.sale-order.feature-date',
    To: 'Order created date',
  },
  {
    From: 'erp.app.pages.sale.sale-order.find-phone-number',
    To: 'find-phone-number',
  },
  {
    From: 'erp.app.pages.sale.sale-order.find-with-contact-id',
    To: 'Search for this customer',
  },
  { From: 'erp.app.pages.sale.sale-order.group', To: 'Group' },
  { From: 'erp.app.pages.sale.sale-order.id', To: '#Order' },
  { From: 'erp.app.pages.sale.sale-order.id-address', To: 'customer' },
  { From: 'erp.app.pages.sale.sale-order.id-short', To: 'Id' },
  { From: 'erp.app.pages.sale.sale-order.id-status', To: 'Status' },
  { From: 'erp.app.pages.sale.sale-order.id-type', To: 'id-type' },
  { From: 'erp.app.pages.sale.sale-order.id-uom', To: 'id-uom' },
  { From: 'erp.app.pages.sale.sale-order.id-vehicle', To: 'License plate' },
  {
    From: 'erp.app.pages.sale.sale-order.id-vehicle-placeholder',
    To: 'Search for license plate',
  },
  {
    From: 'erp.app.pages.sale.sale-order.import-orders-tab',
    To: 'Import order',
  },
  { From: 'erp.app.pages.sale.sale-order.invoice', To: 'Invoice' },
  {
    From: 'erp.app.pages.sale.sale-order.invoice-title',
    To: '= [%Discount] * ([value before discount] - [Line discount])',
  },
  { From: 'erp.app.pages.sale.sale-order.is-sample-order', To: 'Sample' },
  {
    From: 'erp.app.pages.sale.sale-order.is-ship-by-saleman',
    To: 'Coverage',
  },
  {
    From: 'erp.app.pages.sale.sale-order.is-urgent-orders',
    To: 'Urgent order',
  },
  {
    From: 'erp.app.pages.sale.sale-order.is-wholesale',
    To: 'Wholesale customer',
  },
  { From: 'erp.app.pages.sale.sale-order.item', To: 'item' },
  { From: 'erp.app.pages.sale.sale-order.item-debt', To: 'Remaining debt' },
  {
    From: 'erp.app.pages.sale.sale-order.item-information-title',
    To: 'item-information-title',
  },
  {
    From: 'erp.app.pages.sale.sale-order.item-invoice-date',
    To: 'Invoice date',
  },
  {
    From: 'erp.app.pages.sale.sale-order.item-invoice-number',
    To: 'Invoice',
  },
  {
    From: 'erp.app.pages.sale.sale-order.item-placeholder',
    To: 'item-placeholder',
  },
  { From: 'erp.app.pages.sale.sale-order.item-received', To: 'Received' },
  { From: 'erp.app.pages.sale.sale-order.items-list', To: 'Product list' },
  { From: 'erp.app.pages.sale.sale-order.item-tax-rate', To: 'Tax' },
  { From: 'erp.app.pages.sale.sale-order.item-total-after-tax', To: 'Total' },
  { From: 'erp.app.pages.sale.sale-order.km', To: 'Promotion' },
  { From: 'erp.app.pages.sale.sale-order.line', To: 'line' },
  { From: 'erp.app.pages.sale.sale-order.line-header', To: 'line-header' },
  {
    From: 'erp.app.pages.sale.sale-order.line-title',
    To: '= [Discount /product] + [Group discount]',
  },
  { From: 'erp.app.pages.sale.sale-order.long-thanh', To: 'long-thanh' },
  { From: 'erp.app.pages.sale.sale-order.map', To: 'Map' },
  {
    From: 'erp.app.pages.sale.sale-order.masan-import',
    To: 'Import Masan order',
  },
  { From: 'erp.app.pages.sale.sale-order.merge.add', To: 'Add' },
  { From: 'erp.app.pages.sale.sale-order.merge.close-modal', To: 'Close' },
  { From: 'erp.app.pages.sale.sale-order.merge.detail', To: 'Details' },
  { From: 'erp.app.pages.sale.sale-order.merge.help', To: 'Help' },
  { From: 'erp.app.pages.sale.sale-order.merge.idcontact', To: 'Customer' },
  {
    From: 'erp.app.pages.sale.sale-order.merge.is-sample-order',
    To: 'Sample',
  },
  {
    From: 'erp.app.pages.sale.sale-order.merge.is-urgent-orders',
    To: 'Urgent order',
  },
  {
    From: 'erp.app.pages.sale.sale-order.merge.is-wholesale',
    To: 'Wholesale customer',
  },
  { From: 'erp.app.pages.sale.sale-order.merge.merge', To: 'Merge' },
  {
    From: 'erp.app.pages.sale.sale-order.merge.merge-sale-orders',
    To: 'Merge order',
  },
  { From: 'erp.app.pages.sale.sale-order.merge.order', To: 'Order' },
  {
    From: 'erp.app.pages.sale.sale-order.merge.placeholder-idcontact',
    To: 'Search for name, code or phone number',
  },
  { From: 'erp.app.pages.sale.sale-order.merge-arinvoice.add', To: 'Add' },
  {
    From: 'erp.app.pages.sale.sale-order.merge-arinvoice.close-modal',
    To: 'Close',
  },
  {
    From: 'erp.app.pages.sale.sale-order.merge-arinvoice.contact-select',
    To: 'Select customer',
  },
  {
    From: 'erp.app.pages.sale.sale-order.merge-arinvoice.delete',
    To: 'Delete',
  },
  {
    From: 'erp.app.pages.sale.sale-order.merge-arinvoice.detail',
    To: 'Details',
  },
  { From: 'erp.app.pages.sale.sale-order.merge-arinvoice.help', To: 'Help' },
  {
    From: 'erp.app.pages.sale.sale-order.merge-arinvoice.idcontact',
    To: 'Customer',
  },
  {
    From: 'erp.app.pages.sale.sale-order.merge-arinvoice.id-uom',
    To: 'Unit',
  },
  {
    From: 'erp.app.pages.sale.sale-order.merge-arinvoice.merge',
    To: 'Create Invoice',
  },
  {
    From: 'erp.app.pages.sale.sale-order.merge-arinvoice.placeholder-idcontact',
    To: 'Search for name, code or phone number',
  },
  {
    From: 'erp.app.pages.sale.sale-order.merge-arinvoice.placeholder-iditem',
    To: 'Search for name or product code',
  },
  {
    From: 'erp.app.pages.sale.sale-order.merge-arinvoice.quantity',
    To: 'Quantity',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-add',
    To: 'Cannot add product. Please try again later.',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-add-to-shipment',
    To: 'Your chosen order cannot be allocated for delivery. Please only select approved or pending for delivery orders.',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-approve-pending-only',
    To: 'Your selected order cannot be approved. Please only select pending for approval order',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-cancel-pending-draft-only',
    To: 'Your chosen invoice cannot be canceled. Please only select draft and waiting for approval invoices.',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-create-already',
    To: 'Your chosen orders have their invoices generated. Please check again!',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-create-arinvoice',
    To: 'Cannot generate invoice from your chosen orders. Please only select approved orders!',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-create-asn',
    To: 'Cannot create ASN, please try again later',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-create-einvoice-approved-only',
    To: 'Cannot generate e-invoice. Please only select approved order',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-create-invoice',
    To: 'Cannot generate invoice, please try again.',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-create-invoice-status',
    To: 'Cannot generate invoice with this orders status',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-create-merge-arinvoice',
    To: 'Cannot generate merged invoice from your chosen orders. Please only select approved orders!',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-create-order',
    To: 'Cannot create sale order. Please try again.',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-create-split-arinvoice',
    To: 'Cannot split invoice from your chosen order. Please only select approved orders!',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-delete-new-disapprove-only',
    To: 'Your selected invoices cannot be deleted. Please only delete new or disapproved invoice',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-disapprove-pending-approved-only',
    To: 'Your selected invoices cannot be disaaproved. Please select approved or pending for approval invoice',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-merge',
    To: 'Your selected invoices cannot be combined. Please select new or disapproved invoice',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-save',
    To: 'Cannot save, please try again',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-save-negative-order',
    To: 'Order not saved as discount from sales man less than 0',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-send-approve-new-draft-disapprove-only',
    To: 'Your selected invoices cannot be approved. Please select new or draft or disapproved ones',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-split',
    To: 'Your selected order cannot be split. Please choose draft, new, pending for approval or disaaproved order',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.can-not-split-try',
    To: 'Cannot split invoice, please try again',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.check-atleast-one',
    To: 'Please check again, orders must have at least 1 item to be approved',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.check-customer-atleast-one',
    To: 'Please check customer name and order must have at least 01 item.',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.check-customer-vendor-name',
    To: "Please check customer or vendor's name",
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.check-merge-invoice-select-customer',
    To: 'Please check the invoice to combine and select customer',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.check-split-atleast-one',
    To: 'Please check customer name and split order must have at least 01 item.',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.create-asn-complete',
    To: 'ASN created!',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.delete-complete',
    To: 'Deleted!',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.einvoice-sign-success',
    To: 'Successfully generated and sign e-invoice!',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.einvoice-success',
    To: 'Successfully generated e-invoice!',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.import-complete',
    To: 'Import completed!',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.import-error',
    To: 'Import error, please check again',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.importing',
    To: 'File being imported, please wait till complete',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.importing-masan',
    To: 'Order from Masan being imported, please wait till complete',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.invoice-complete',
    To: 'Invoice created!',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.mobile-only',
    To: 'This function is only available on phone',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.save-complete',
    To: 'Saving completed!',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.scanning-with-value',
    To: 'You just scanned: {{value}}, please scanned QR code on paid delivery notes',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.split-complete',
    To: 'Invoice splitting completed',
  },
  {
    From: 'erp.app.pages.sale.sale-order.message.submit-orders-complete',
    To: 'Purchased ordered',
  },
  { From: 'erp.app.pages.sale.sale-order.more', To: 'More…' },
  { From: 'erp.app.pages.sale.sale-order.name', To: 'Product' },
  {
    From: 'erp.app.pages.sale.sale-order.not-giving',
    To: 'Not yet delivered',
  },
  { From: 'erp.app.pages.sale.sale-order.order-code', To: 'Code' },
  { From: 'erp.app.pages.sale.sale-order.order-date', To: 'Daily order' },
  {
    From: 'erp.app.pages.sale.sale-order.order-date-detail',
    To: 'Order created date',
  },
  { From: 'erp.app.pages.sale.sale-order.order-disabled', To: 'Archive' },
  { From: 'erp.app.pages.sale.sale-order.order-idbranch', To: 'Branch' },
  { From: 'erp.app.pages.sale.sale-order.order-idcontract', To: 'Contract' },
  {
    From: 'erp.app.pages.sale.sale-order.order-idopportunity',
    To: 'Opportunity',
  },
  { From: 'erp.app.pages.sale.sale-order.order-idowner', To: 'Sales staff' },
  {
    From: 'erp.app.pages.sale.sale-order.order-idstatus',
    To: 'Order Status',
  },
  {
    From: 'erp.app.pages.sale.sale-order.order-import-title',
    To: 'order-import-title',
  },
  {
    From: 'erp.app.pages.sale.sale-order.order-information',
    To: 'Order information',
  },
  { From: 'erp.app.pages.sale.sale-order.order-name', To: 'Content' },
  { From: 'erp.app.pages.sale.sale-order.order-remark', To: 'Remark' },
  { From: 'erp.app.pages.sale.sale-order.order-subtype', To: 'Order type' },
  {
    From: 'erp.app.pages.sale.sale-order.order-subtype-1',
    To: 'Sản phẩm trưng bày',
  },
  { From: 'erp.app.pages.sale.sale-order.order-subtype-2', To: 'Pre Sales' },
  {
    From: 'erp.app.pages.sale.sale-order.order-subtype-3',
    To: 'Close to expiry date',
  },
  {
    From: 'erp.app.pages.sale.sale-order.original-total-after-discount-from-salesman',
    To: 'Total amount paid',
  },
  {
    From: 'erp.app.pages.sale.sale-order.original-total-after-tax',
    To: 'Value after discount',
  },
  {
    From: 'erp.app.pages.sale.sale-order.original-total-after-tax-detail',
    To: 'Total amount',
  },
  { From: 'erp.app.pages.sale.sale-order.others', To: 'Other information' },
  { From: 'erp.app.pages.sale.sale-order.page-title', To: 'Order' },
  { From: 'erp.app.pages.sale.sale-order.price', To: 'Unit price' },
  {
    From: 'erp.app.pages.sale.sale-order.price-discount-from-saleman',
    To: 'Unit price',
  },
  {
    From: 'erp.app.pages.sale.sale-order.price-discount-from-saleman-title',
    To: 'Unit price before salesman discount',
  },
  { From: 'erp.app.pages.sale.sale-order.product-dimensions', To: 'Volume' },
  { From: 'erp.app.pages.sale.sale-order.product-weight', To: 'Weight' },
  {
    From: 'erp.app.pages.sale.sale-order.promotion',
    To: 'Promotion/ applied discount',
  },
  { From: 'erp.app.pages.sale.sale-order.quantity', To: 'Quantity' },
  {
    From: 'erp.app.pages.sale.sale-order.radio-cooperate',
    To: 'Organization',
  },
  { From: 'erp.app.pages.sale.sale-order.radio-personal', To: 'Individual' },
  { From: 'erp.app.pages.sale.sale-order.saleman', To: 'Sales staff' },
  { From: 'erp.app.pages.sale.sale-order.sample', To: 'Sample' },
  {
    From: 'erp.app.pages.sale.sale-order.search-placeholder',
    To: 'Search for name, code or phone number',
  },
  { From: 'erp.app.pages.sale.sale-order.selected-title', To: 'Order' },
  {
    From: 'erp.app.pages.sale.sale-order.shipping-address-remark',
    To: 'shipping-address-remark',
  },
  {
    From: 'erp.app.pages.sale.sale-order.shipping-information',
    To: 'delivery information',
  },
  { From: 'erp.app.pages.sale.sale-order.split.add', To: 'Add' },
  {
    From: 'erp.app.pages.sale.sale-order.split.add-order-line',
    To: 'add-order-line',
  },
  {
    From: 'erp.app.pages.sale.sale-order.split.add-splited-invoice',
    To: 'Add order',
  },
  { From: 'erp.app.pages.sale.sale-order.split.close-modal', To: 'Close' },
  { From: 'erp.app.pages.sale.sale-order.split.detail', To: 'Details' },
  {
    From: 'erp.app.pages.sale.sale-order.split.discount-from-distributor',
    To: 'Distributor discount',
  },
  {
    From: 'erp.app.pages.sale.sale-order.split.discount-from-salesman',
    To: 'Discount from saleman',
  },
  {
    From: 'erp.app.pages.sale.sale-order.split.discount-from-vendor',
    To: 'Vendor discount',
  },
  { From: 'erp.app.pages.sale.sale-order.split.help', To: 'Help' },
  { From: 'erp.app.pages.sale.sale-order.split.idcontact', To: 'Customer -' },
  { From: 'erp.app.pages.sale.sale-order.split.id-uom', To: 'Unit' },
  {
    From: 'erp.app.pages.sale.sale-order.split.is-sample-order',
    To: 'Sample',
  },
  {
    From: 'erp.app.pages.sale.sale-order.split.is-urgent-orders',
    To: 'Urgent order',
  },
  {
    From: 'erp.app.pages.sale.sale-order.split.is-wholesale',
    To: 'Wholesale customer',
  },
  {
    From: 'erp.app.pages.sale.sale-order.split.page-title',
    To: 'page-title',
  },
  {
    From: 'erp.app.pages.sale.sale-order.split.placeholder-idcontact',
    To: 'Search for name, code or phone number',
  },
  {
    From: 'erp.app.pages.sale.sale-order.split.placeholder-iditem',
    To: 'Search for name or product code',
  },
  {
    From: 'erp.app.pages.sale.sale-order.split.promotion',
    To: 'Promotion product',
  },
  { From: 'erp.app.pages.sale.sale-order.split.quantity', To: 'Quantity' },
  {
    From: 'erp.app.pages.sale.sale-order.split.split-order',
    To: 'split order',
  },
  {
    From: 'erp.app.pages.sale.sale-order.split.split-sale-order',
    To: 'Split Order',
  },
  {
    From: 'erp.app.pages.sale.sale-order.split.unit-option',
    To: 'Select unit',
  },
  { From: 'erp.app.pages.sale.sale-order.sum-up', To: 'Total' },
  {
    From: 'erp.app.pages.sale.sale-order.to-approve',
    To: 'Order to be approved',
  },
  { From: 'erp.app.pages.sale.sale-order.total', To: 'Amount' },
  {
    From: 'erp.app.pages.sale.sale-order.total-after-tax',
    To: 'Customers payable',
  },
  {
    From: 'erp.app.pages.sale.sale-order.total-after-tax-title',
    To: '[Customer pays] = [Total amount] - [Discount 3]',
  },
  {
    From: 'erp.app.pages.sale.sale-order.type-purchase-order',
    To: 'type-purchase-order',
  },
  {
    From: 'erp.app.pages.sale.sale-order.type-sales-order',
    To: 'type-sales-order',
  },
  {
    From: 'erp.app.pages.sale.sale-order.type-ship-order',
    To: 'type-ship-order',
  },
  { From: 'erp.app.pages.sale.sale-order.unit-option', To: 'Select unit' },
  { From: 'erp.app.pages.sale.sale-order.uom', To: 'Unit' },
  { From: 'erp.app.pages.sale.sale-order.uom-price', To: 'uom-price' },
  { From: 'erp.app.pages.sale.sale-order.vat', To: 'VAT(%)' },
  { From: 'erp.app.pages.sale.sale-order.vendor-code', To: 'Vendor code' },
  {
    From: 'erp.app.pages.sale.sale-order.view-bp-detail',
    To: 'view-bp-detail',
  },
  {
    From: 'erp.app.pages.sale.sale-order.view-contact-detail',
    To: "View customers' information",
  },
  {
    From: 'erp.app.pages.sale.sale-order.view-order-detail',
    To: "View order's details",
  },
  {
    From: 'erp.app.pages.sale.sale-order.waiting-distribution',
    To: 'Orders waiting for Driver allocation',
  },
  { From: 'erp.app.pages.sale.sale-order.warehouse', To: 'Warehouse' },
  { From: 'erp.app.pages.sale.sale-order.xuan-loc', To: 'xuan-loc' },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.add-customer',
    To: 'Create new customer',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.add-orderline',
    To: 'Add product',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.calc',
    To: 'Price recalculation',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.can-not-get-data',
    To: 'Cannot extract data',
  },
  { From: 'erp.app.pages.sale.sale-order-mobile.contact', To: 'Customer' },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.contact-line',
    To: 'Contact',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.date-range-label',
    To: 'date-range-label',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.discount-from-distributor',
    To: 'Distributor discount',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.discount-from-salesman',
    To: 'Discount from saleman',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.discount-from-vendor',
    To: 'Vendor discount',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.id-address-placeholder',
    To: 'Search for name, code or phone number',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.is-promotion',
    To: 'Promotion product',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.is-sample-order',
    To: 'Sample',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.is-ship-by-saleman',
    To: 'Coverage',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.is-urgent-orders',
    To: 'Urgent order',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.is-wholesale',
    To: 'Wholesale customer',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.item-list-tab',
    To: 'Product list',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.new-saleorder',
    To: 'Create new order',
  },
  { From: 'erp.app.pages.sale.sale-order-mobile.order', To: 'Order' },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.original-total-after-discount-from-salesman',
    To: 'Payables from customer',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.original-total-after-tax',
    To: 'Total amount',
  },
  { From: 'erp.app.pages.sale.sale-order-mobile.page-title', To: 'Order' },
  { From: 'erp.app.pages.sale.sale-order-mobile.price', To: 'Unit price' },
  { From: 'erp.app.pages.sale.sale-order-mobile.quantity', To: 'Quantity' },
  { From: 'erp.app.pages.sale.sale-order-mobile.remark', To: 'Remark' },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.salesman-price',
    To: 'Unit price before salesman discount',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.search-placeholder',
    To: 'Search order',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.total-after-discount',
    To: 'Total amount paid',
  },
  { From: 'erp.app.pages.sale.sale-order-mobile.uom', To: 'Unit' },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.uom-placeholder',
    To: 'Search for name or product code',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.uom-select',
    To: 'Select unit',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile.view-detail',
    To: 'Order details',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile-add-contact.add-new',
    To: 'Add customer',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile-add-contact.addressline1',
    To: 'House number, street name, quarter',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile-add-contact.addressline2',
    To: 'Apartment, Building, Utility poles…',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile-add-contact.close-modal',
    To: 'Close',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile-add-contact.code',
    To: 'Customer code',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile-add-contact.contact',
    To: 'Contact point',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile-add-contact.district',
    To: 'District',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile-add-contact.name',
    To: 'Shop name',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile-add-contact.page-title',
    To: 'Add new customer',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile-add-contact.phone1',
    To: 'Phone number',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile-add-contact.province',
    To: 'Provinces',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile-add-contact.remark',
    To: 'Remark',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile-add-contact.ward',
    To: 'Ward',
  },
  {
    From: 'erp.app.pages.sale.sale-order-note.a-side',
    To: 'Party A (Service provider)',
  },
  {
    From: 'erp.app.pages.sale.sale-order-note.branch-address',
    To: 'Address',
  },
  { From: 'erp.app.pages.sale.sale-order-note.branch-name', To: 'Company' },
  {
    From: 'erp.app.pages.sale.sale-order-note.b-side',
    To: 'Party B (Service user)',
  },
  {
    From: 'erp.app.pages.sale.sale-order-note.customer-name',
    To: 'Customer name',
  },
  {
    From: 'erp.app.pages.sale.sale-order-note.detail-table',
    To: 'Payment detail listings',
  },
  { From: 'erp.app.pages.sale.sale-order-note.in-text', To: 'In words' },
  {
    From: 'erp.app.pages.sale.sale-order-note.orde-date',
    To: 'Order created date',
  },
  { From: 'erp.app.pages.sale.sale-order-note.order-name', To: 'Content' },
  {
    From: 'erp.app.pages.sale.sale-order-note.page-title',
    To: 'Print sale order',
  },
  { From: 'erp.app.pages.sale.sale-order-note.price', To: 'Unit price' },
  { From: 'erp.app.pages.sale.sale-order-note.print', To: 'Form printing' },
  { From: 'erp.app.pages.sale.sale-order-note.print-mode', To: 'print-mode' },
  { From: 'erp.app.pages.sale.sale-order-note.qty', To: 'S.L' },
  { From: 'erp.app.pages.sale.sale-order-note.refresh', To: 'Refresh' },
  { From: 'erp.app.pages.sale.sale-order-note.sale-order', To: 'Order' },
  {
    From: 'erp.app.pages.sale.sale-order-note.service-charge',
    To: 'Service charge (%)',
  },
  {
    From: 'erp.app.pages.sale.sale-order-note.service-name',
    To: 'Service name',
  },
  {
    From: 'erp.app.pages.sale.sale-order-note.show-feature',
    To: 'Expanded function',
  },
  {
    From: 'erp.app.pages.sale.sale-order-note.sign-full-name',
    To: '(Sign and write full name)',
  },
  { From: 'erp.app.pages.sale.sale-order-note.stt', To: 'No.' },
  { From: 'erp.app.pages.sale.sale-order-note.sum-up', To: 'Total' },
  {
    From: 'erp.app.pages.sale.sale-order-note.sum-up-debt',
    To: 'Deposit net-off',
  },
  {
    From: 'erp.app.pages.sale.sale-order-note.sum-up-remain',
    To: 'Remaining amount',
  },
  { From: 'erp.app.pages.sale.sale-order-note.total', To: 'Amount' },
  {
    From: 'erp.app.pages.sale.sale-order-note.total-after-tax',
    To: 'Total amount',
  },
  {
    From: 'erp.app.pages.sale.sale-order-note.total-service',
    To: 'Service charge (Amount)',
  },
  { From: 'erp.app.pages.sale.sale-order-note.total-vat', To: 'VAT' },
  { From: 'erp.app.pages.sale.sale-order-note.uom', To: 'Unit' },
  { From: 'erp.app.pages.sale.sale-order-note.vat', To: 'VAT(%)' },
  {
    From: 'erp.app.pages.sale.sale-order-note.workphone',
    To: 'Phone number',
  },
  { From: 'erp.app.pages.shipping.delivery._state', To: 'processed' },
  {
    From: 'erp.app.pages.shipping.delivery.chip-label',
    To: 'processed order - Click to send back',
  },
  {
    From: 'erp.app.pages.shipping.delivery.clear-state-orders',
    To: 'Cancel to process again',
  },
  { From: 'erp.app.pages.shipping.delivery.customer-debt', To: 'Debt' },
  {
    From: 'erp.app.pages.shipping.delivery.discount-from-salesman',
    To: 'Discount from saleman',
  },
  { From: 'erp.app.pages.shipping.delivery.drop-all', To: '100% returned' },
  {
    From: 'erp.app.pages.shipping.delivery.message.can-not-create-list',
    To: 'Cannote create list',
  },
  {
    From: 'erp.app.pages.shipping.delivery.message.can-not-create-picking-list',
    To: 'Cannot create pick - up list',
  },
  {
    From: 'erp.app.pages.shipping.delivery.message.checking-data',
    To: 'Data checking',
  },
  {
    From: 'erp.app.pages.shipping.delivery.message.check-not-found-with-value',
    To: 'Please recheck. Cannot find Order {{value}} within the saved list.',
  },
  {
    From: 'erp.app.pages.shipping.delivery.message.mobile-only',
    To: 'This function is only available on phone',
  },
  {
    From: 'erp.app.pages.shipping.delivery.message.money-received-complete',
    To: 'Cash received',
  },
  {
    From: 'erp.app.pages.shipping.delivery.message.save-coordinate-complete',
    To: 'Coordinates updated',
  },
  {
    From: 'erp.app.pages.shipping.delivery.message.scanning-with-value',
    To: 'You just scanned: {{value}}, please scanned QR code on paid delivery notes',
  },
  {
    From: 'erp.app.pages.shipping.delivery.message.updating-order-error',
    To: 'Order update error',
  },
  {
    From: 'erp.app.pages.shipping.delivery.not-found',
    To: 'Cannot find order',
  },
  {
    From: 'erp.app.pages.shipping.delivery.original-discount1',
    To: 'Vendor discount',
  },
  {
    From: 'erp.app.pages.shipping.delivery.original-discount2',
    To: 'Distributor discount',
  },
  { From: 'erp.app.pages.shipping.delivery.page-title', To: 'Order' },
  {
    From: 'erp.app.pages.shipping.delivery.reason',
    To: 'Reasons for undelivered goods',
  },
  {
    From: 'erp.app.pages.shipping.delivery.received',
    To: 'Payment completed',
  },
  {
    From: 'erp.app.pages.shipping.delivery.received-percent',
    To: 'Received',
  },
  {
    From: 'erp.app.pages.shipping.delivery.receive-reason',
    To: 'Failed to collect reasons',
  },
  { From: 'erp.app.pages.shipping.delivery.refresh', To: 'Refresh' },
  { From: 'erp.app.pages.shipping.delivery.remark', To: 'Remark' },
  {
    From: 'erp.app.pages.shipping.delivery.remark-placeholder',
    To: 'More description',
  },
  {
    From: 'erp.app.pages.shipping.delivery.reopen-order',
    To: 'Change order',
  },
  { From: 'erp.app.pages.shipping.delivery.save', To: 'Complete' },
  {
    From: 'erp.app.pages.shipping.delivery.save-don-hang',
    To: 'Status update',
  },
  { From: 'erp.app.pages.shipping.delivery.search', To: 'Search order' },
  {
    From: 'erp.app.pages.shipping.delivery.total-after-tax',
    To: 'Total amount after tax',
  },
  {
    From: 'erp.app.pages.shipping.delivery.update-position',
    To: 'Update coordinates',
  },
  { From: 'erp.app.pages.shipping.delivery.view-detail', To: 'View details' },
  {
    From: 'erp.app.pages.shipping.delivery-note.accountant',
    To: 'Accountant',
  },
  { From: 'erp.app.pages.shipping.delivery-note.box', To: 'Box' },
  { From: 'erp.app.pages.shipping.delivery-note.ck', To: 'Discount' },
  { From: 'erp.app.pages.shipping.delivery-note.company-name', To: 'Outlet' },
  { From: 'erp.app.pages.shipping.delivery-note.customer', To: 'Customer' },
  {
    From: 'erp.app.pages.shipping.delivery-note.customer-name',
    To: 'Customer name',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.delivery-date',
    To: 'Delivery date',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.delivery-detail',
    To: 'Goods delivery note for customer',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.discount-for',
    To: 'discount for',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.discount-from-salemans',
    To: 'Discount from saleman',
  },
  { From: 'erp.app.pages.shipping.delivery-note.id', To: 'SH' },
  { From: 'erp.app.pages.shipping.delivery-note.id-2', To: 'O' },
  {
    From: 'erp.app.pages.shipping.delivery-note.item-service',
    To: 'Product / Service name',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.item-type',
    To: 'Promotion scheme/ Samples/ Rewards',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.line-2-note',
    To: 'Distributor will be held accountable for addressing further complaints',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.line-3-note',
    To: 'Please check the invoice carefully.',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.line-3-note-2',
    To: 'goods before receipt and payment.',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.line-4-note',
    To: 'Customers can contact for products and service information',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.line-5-note',
    To: 'or contact shipping department through hotline',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.line-note',
    To: 'All parties please carefully check the doccuments',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.line-note-1',
    To: 'and total goods value',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.line-note-2',
    To: 'Total amount collected',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.line-note-3',
    To: 'trước khi bàn giao.',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.number-of-orders',
    To: 'Including',
  },
  { From: 'erp.app.pages.shipping.delivery-note.odd', To: 'LCL' },
  { From: 'erp.app.pages.shipping.delivery-note.order', To: 'Order' },
  { From: 'erp.app.pages.shipping.delivery-note.order-title', To: 'Order' },
  {
    From: 'erp.app.pages.shipping.delivery-note.page-detail',
    To: 'Print delivery note',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.payment-detail-title',
    To: 'Delivery - payment slip',
  },
  { From: 'erp.app.pages.shipping.delivery-note.price', To: 'Unit price' },
  { From: 'erp.app.pages.shipping.delivery-note.print', To: 'Form printing' },
  {
    From: 'erp.app.pages.shipping.delivery-note.print-mode',
    To: 'Printing option',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.promotion-item',
    To: 'Goods promotion',
  },
  { From: 'erp.app.pages.shipping.delivery-note.qty', To: 'Quanity' },
  { From: 'erp.app.pages.shipping.delivery-note.quantity', To: 'Quantity' },
  {
    From: 'erp.app.pages.shipping.delivery-note.received',
    To: 'Cash collected',
  },
  { From: 'erp.app.pages.shipping.delivery-note.refresh', To: 'Refresh' },
  { From: 'erp.app.pages.shipping.delivery-note.saleman', To: 'Sales staff' },
  {
    From: 'erp.app.pages.shipping.delivery-note.shipper',
    To: 'Giao hàng xe',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.shipper-name',
    To: 'shipper',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.shipper-title',
    To: 'Shipper',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.show-feature',
    To: 'Expanded function',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.sign-full-name',
    To: 'Sign and write full name',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.stocker',
    To: 'Warehouse keeper',
  },
  { From: 'erp.app.pages.shipping.delivery-note.stt', To: 'No.' },
  { From: 'erp.app.pages.shipping.delivery-note.sum-up', To: 'Amount' },
  {
    From: 'erp.app.pages.shipping.delivery-note.template-header',
    To: 'Company',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.toggle-date-filter',
    To: 'Maintenance schedule',
  },
  { From: 'erp.app.pages.shipping.delivery-note.total', To: 'Amount' },
  {
    From: 'erp.app.pages.shipping.delivery-note.total-after-tax',
    To: 'Total payables',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.total-before-discount',
    To: 'Total amount',
  },
  {
    From: 'erp.app.pages.shipping.delivery-note.total-discount',
    To: 'Total discount',
  },
  { From: 'erp.app.pages.shipping.delivery-note.total-orders', To: 'Value' },
  { From: 'erp.app.pages.shipping.delivery-note.unit', To: 'Unit' },
  {
    From: 'erp.app.pages.shipping.delivery-note.warehouse',
    To: 'Pick - up warehouse',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.accountant',
    To: 'Accountant',
  },
  { From: 'erp.app.pages.shipping.delivery-review.box', To: 'Box' },
  { From: 'erp.app.pages.shipping.delivery-review.cash', To: 'Cash on hand' },
  {
    From: 'erp.app.pages.shipping.delivery-review.debt',
    To: 'Debt collected',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.debt-collected',
    To: 'Debt collected',
  },
  { From: 'erp.app.pages.shipping.delivery-review.debt-order', To: 'Slip' },
  {
    From: 'erp.app.pages.shipping.delivery-review.debt-remaining',
    To: 'Outstanding Debt',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.debt-total',
    To: 'Sales receivable',
  },
  { From: 'erp.app.pages.shipping.delivery-review.delivery', To: 'Delivery' },
  {
    From: 'erp.app.pages.shipping.delivery-review.delivery-date',
    To: 'Delivery date',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.delivery-order',
    To: 'Delivery order',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.delivery-table-title',
    To: 'Delivery Status Reconciliation',
  },
  { From: 'erp.app.pages.shipping.delivery-review.drop', To: 'Returned' },
  {
    From: 'erp.app.pages.shipping.delivery-review.drop-all',
    To: '100% returned',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.drop-all-total',
    To: 'Returned goods value',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.filter',
    To: 'Data Filter',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.have-to-collect',
    To: 'Debts to collect',
  },
  { From: 'erp.app.pages.shipping.delivery-review.id', To: 'SH' },
  { From: 'erp.app.pages.shipping.delivery-review.id-text', To: 'HD' },
  {
    From: 'erp.app.pages.shipping.delivery-review.item-drop',
    To: 'Returned goods',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.item-name',
    To: 'Product name',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.line-1-note',
    To: 'All parties please carefully check the doccuments',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.line-1-note-2',
    To: 'hàng hóa trước khi rời kho.',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.line-2-note',
    To: 'Distributor will be held accountable for addressing further complaints',
  },
  { From: 'erp.app.pages.shipping.delivery-review.new-debt', To: 'New debt' },
  {
    From: 'erp.app.pages.shipping.delivery-review.number-of-done',
    To: 'Delivered order',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.number-of-new-debt',
    To: 'receivable order',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.number-of-remaining-debt',
    To: 'Uncollected bill',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.number-of-return-product',
    To: '100% Order',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.number-of-undone',
    To: 'undelivered order',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.number-of-undone-order',
    To: 'undelivered order',
  },
  { From: 'erp.app.pages.shipping.delivery-review.odd', To: 'LCL' },
  { From: 'erp.app.pages.shipping.delivery-review.old-debt', To: 'Old debt' },
  { From: 'erp.app.pages.shipping.delivery-review.order', To: 'Order' },
  { From: 'erp.app.pages.shipping.delivery-review.order-title', To: 'Order' },
  {
    From: 'erp.app.pages.shipping.delivery-review.page-title',
    To: 'Cash transfer',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.page-title-detail',
    To: 'Delivery result',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.print',
    To: 'Form printing',
  },
  { From: 'erp.app.pages.shipping.delivery-review.quantity', To: 'Quantity' },
  { From: 'erp.app.pages.shipping.delivery-review.reality', To: 'Actual' },
  {
    From: 'erp.app.pages.shipping.delivery-review.received',
    To: 'Collected',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.received-debt',
    To: 'Debt note',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.received-debt-title',
    To: 'Debt note',
  },
  { From: 'erp.app.pages.shipping.delivery-review.refresh', To: 'Refresh' },
  {
    From: 'erp.app.pages.shipping.delivery-review.remaining-debt',
    To: 'Remaining debt',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.saleman',
    To: 'Sales staff',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.shipment-debt',
    To: 'Debt note',
  },
  { From: 'erp.app.pages.shipping.delivery-review.shipper', To: 'shipper' },
  {
    From: 'erp.app.pages.shipping.delivery-review.shipper-title',
    To: 'Shipper',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.sign-full-name',
    To: 'Sign and write full name',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.stocker',
    To: 'Warehouse keeper',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.stock-on-vehicle-title',
    To: 'Goods in transit',
  },
  { From: 'erp.app.pages.shipping.delivery-review.stt', To: 'No.' },
  { From: 'erp.app.pages.shipping.delivery-review.sum-up', To: 'Amount' },
  { From: 'erp.app.pages.shipping.delivery-review.total', To: 'Total' },
  {
    From: 'erp.app.pages.shipping.delivery-review.total-cash',
    To: 'Cash revenue',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.total-of-cash',
    To: 'Total cash on hand',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.total-of-cash-order',
    To: 'Cash on hand',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.total-of-debt',
    To: 'Total debt note',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.total-of-new-debt-orders',
    To: 'Debts',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.total-value',
    To: 'Total value',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.undone-order',
    To: 'Not yet delivered',
  },
  {
    From: 'erp.app.pages.shipping.delivery-review.undone-order-total',
    To: 'Not yet delivered value',
  },
  { From: 'erp.app.pages.shipping.delivery-review.uom', To: 'Unit' },
  { From: 'erp.app.pages.shipping.delivery-review.vehicle', To: 'Truck' },
  {
    From: 'erp.app.pages.shipping.delivery-review.warehouse',
    To: 'Pick - up warehouse',
  },
  {
    From: 'erp.app.pages.shipping.shipment.add-debt-detail',
    To: 'Add debt note',
  },
  { From: 'erp.app.pages.shipping.shipment.add-detail', To: 'Add order' },
  { From: 'erp.app.pages.shipping.shipment.address', To: 'Address' },
  { From: 'erp.app.pages.shipping.shipment.all-option', To: 'All' },
  {
    From: 'erp.app.pages.shipping.shipment.auto-create-shipment',
    To: 'Automatic driver allocation',
  },
  {
    From: 'erp.app.pages.shipping.shipment.auto-create-shipment-title',
    To: 'Driver allocation based on MCP',
  },
  {
    From: 'erp.app.pages.shipping.shipment.customer-name-sort',
    To: 'Customer',
  },
  { From: 'erp.app.pages.shipping.shipment.debt', To: 'Debt' },
  { From: 'erp.app.pages.shipping.shipment.debt-sort', To: 'Remaining debt' },
  {
    From: 'erp.app.pages.shipping.shipment.debt-to-be-collected',
    To: 'Debt to collect',
  },
  {
    From: 'erp.app.pages.shipping.shipment.delivery-date',
    To: 'Delivery date',
  },
  {
    From: 'erp.app.pages.shipping.shipment.delivery-date-part',
    To: 'Delivery date and time',
  },
  {
    From: 'erp.app.pages.shipping.shipment.delivery-note',
    To: 'Print delivery note',
  },
  {
    From: 'erp.app.pages.shipping.shipment.delivery-review',
    To: 'Delivery result',
  },
  { From: 'erp.app.pages.shipping.shipment.delivery-trip', To: 'Shipments' },
  {
    From: 'erp.app.pages.shipping.shipment.driver-allocation',
    To: 'driver allocation',
  },
  {
    From: 'erp.app.pages.shipping.shipment.export-availble-orders',
    To: '1. Export to excel',
  },
  {
    From: 'erp.app.pages.shipping.shipment.export-availble-orders-title',
    To: 'Export tp excel for manual driver allocation, then import back to system',
  },
  { From: 'erp.app.pages.shipping.shipment.id', To: 'Trip' },
  { From: 'erp.app.pages.shipping.shipment.id-detail', To: 'Id' },
  { From: 'erp.app.pages.shipping.shipment.idshipper', To: 'Shipper' },
  {
    From: 'erp.app.pages.shipping.shipment.idshipper-placeholder',
    To: 'Search for name, code or phone number',
  },
  { From: 'erp.app.pages.shipping.shipment.id-sort', To: 'Order' },
  { From: 'erp.app.pages.shipping.shipment.idstatus', To: 'Status' },
  {
    From: 'erp.app.pages.shipping.shipment.idstatus-detail',
    To: 'Delivery Status',
  },
  { From: 'erp.app.pages.shipping.shipment.idvehicle', To: 'License plate' },
  {
    From: 'erp.app.pages.shipping.shipment.idvehicle-placeholder',
    To: 'Search for license plate',
  },
  { From: 'erp.app.pages.shipping.shipment.idwarehouse', To: 'Warehouse' },
  {
    From: 'erp.app.pages.shipping.shipment.idwarehouse-placeholder',
    To: 'Select warehouse',
  },
  {
    From: 'erp.app.pages.shipping.shipment.import-manual-shipment',
    To: '2. Import excel',
  },
  {
    From: 'erp.app.pages.shipping.shipment.is-all-orders',
    To: 'Export orders allocated for delivery',
  },
  { From: 'erp.app.pages.shipping.shipment.map', To: 'Map' },
  {
    From: 'erp.app.pages.shipping.shipment.message.can-not-assign',
    To: 'Cannot assign for delivery',
  },
  {
    From: 'erp.app.pages.shipping.shipment.message.can-not-save',
    To: 'Cannot save, please try again',
  },
  {
    From: 'erp.app.pages.shipping.shipment.message.check-red-above',
    To: 'Please recheck information highlighted in red above',
  },
  {
    From: 'erp.app.pages.shipping.shipment.message.distribute-complete-check-condition',
    To: 'Delivery assigned. Please check and adjust if necessary',
  },
  {
    From: 'erp.app.pages.shipping.shipment.message.importing',
    To: 'Importing driver allocation. Please wait for completion',
  },
  {
    From: 'erp.app.pages.shipping.shipment.message.importing-error',
    To: 'Import error, please check again',
  },
  {
    From: 'erp.app.pages.shipping.shipment.message.save-complete',
    To: 'Saving completed!',
  },
  {
    From: 'erp.app.pages.shipping.shipment.not-allocated',
    To: 'Not yet assigned',
  },
  {
    From: 'erp.app.pages.shipping.shipment.not-done',
    To: 'Not yet finished',
  },
  {
    From: 'erp.app.pages.shipping.shipment.not-shipping',
    To: 'Not yet delivered',
  },
  { From: 'erp.app.pages.shipping.shipment.order', To: 'Order' },
  {
    From: 'erp.app.pages.shipping.shipment.order-date',
    To: 'Order created date',
  },
  {
    From: 'erp.app.pages.shipping.shipment.order-date-sort',
    To: 'Order created date',
  },
  {
    From: 'erp.app.pages.shipping.shipment.order-quantity',
    To: 'Number of order/Debt',
  },
  {
    From: 'erp.app.pages.shipping.shipment.order-to-delivery',
    To: 'Orders for delivery',
  },
  {
    From: 'erp.app.pages.shipping.shipment.original-total-after-tax',
    To: 'Value after discount',
  },
  {
    From: 'erp.app.pages.shipping.shipment.original-total-after-tax-sort',
    To: 'Total amount',
  },
  {
    From: 'erp.app.pages.shipping.shipment.page-title',
    To: 'Maintenance schedule',
  },
  {
    From: 'erp.app.pages.shipping.shipment.page-title-detail',
    To: 'Driver allocation',
  },
  {
    From: 'erp.app.pages.shipping.shipment.product-dimensions',
    To: 'Number of cube',
  },
  {
    From: 'erp.app.pages.shipping.shipment.product-dimensions-detail',
    To: 'Volume',
  },
  { From: 'erp.app.pages.shipping.shipment.product-weight', To: 'Tons' },
  {
    From: 'erp.app.pages.shipping.shipment.product-weight-detail',
    To: 'Weight',
  },
  {
    From: 'erp.app.pages.shipping.shipment.remove-all-selected-debt-order',
    To: 'Delete chosen debt notes',
  },
  {
    From: 'erp.app.pages.shipping.shipment.remove-selected-debt-order',
    To: 'remove-selected-debt-order',
  },
  {
    From: 'erp.app.pages.shipping.shipment.remove-selected-order',
    To: 'Delete this order',
  },
  {
    From: 'erp.app.pages.shipping.shipment.remove-select-order',
    To: 'Delete chosen orders',
  },
  {
    From: 'erp.app.pages.shipping.shipment.route-segment',
    To: 'Sort by route',
  },
  {
    From: 'erp.app.pages.shipping.shipment.sale-segment',
    To: 'Sort by sale',
  },
  { From: 'erp.app.pages.shipping.shipment.search', To: 'Search' },
  {
    From: 'erp.app.pages.shipping.shipment.select-debt-orders',
    To: 'Select debt notes to collect',
  },
  {
    From: 'erp.app.pages.shipping.shipment.select-orders',
    To: 'Select orders',
  },
  {
    From: 'erp.app.pages.shipping.shipment.shipment-term',
    To: 'Search by customers, license plate or sales staff',
  },
  { From: 'erp.app.pages.shipping.shipment.shipper', To: 'shipper' },
  {
    From: 'erp.app.pages.shipping.shipment.show-shipment-debt-modal',
    To: 'Add debt note',
  },
  {
    From: 'erp.app.pages.shipping.shipment.show-shipment-modal',
    To: 'Add order',
  },
  {
    From: 'erp.app.pages.shipping.shipment.toggle-date-filter',
    To: 'Add filter condition to export excel file of orders to be allocated for delivery',
  },
  { From: 'erp.app.pages.shipping.shipment.ton', To: 'ton' },
  { From: 'erp.app.pages.shipping.shipment.vehicle', To: 'Truck' },
  { From: 'erp.app.pages.shipping.shipment.vendor-code', To: 'Vendor code' },
  {
    From: 'erp.app.pages.shipping.shipment.view-contact-detail',
    To: "View customers' information",
  },
  {
    From: 'erp.app.pages.shipping.shipment.view-delivery-detail',
    To: 'View Delivery details',
  },
  {
    From: 'erp.app.pages.shipping.shipment.view-order-detail',
    To: "View order's details",
  },
  {
    From: 'erp.app.pages.shipping.shipment.view-shipment-detail',
    To: 'View details',
  },
  {
    From: 'erp.app.pages.shipping.shipment.view-staff-detail',
    To: 'View shipper information',
  },
  {
    From: 'erp.app.pages.shipping.shipment-debt-picker.address',
    To: 'Address',
  },
  {
    From: 'erp.app.pages.shipping.shipment-debt-picker.close-modal',
    To: 'Close',
  },
  {
    From: 'erp.app.pages.shipping.shipment-debt-picker.customer-name-sort',
    To: 'Customer',
  },
  {
    From: 'erp.app.pages.shipping.shipment-debt-picker.debt',
    To: 'Debt note',
  },
  {
    From: 'erp.app.pages.shipping.shipment-debt-picker.debt-sort',
    To: 'Remaining debt',
  },
  { From: 'erp.app.pages.shipping.shipment-debt-picker.help', To: 'Help' },
  {
    From: 'erp.app.pages.shipping.shipment-debt-picker.id-sort',
    To: 'Order',
  },
  {
    From: 'erp.app.pages.shipping.shipment-debt-picker.order-date-sort',
    To: 'Order created date',
  },
  {
    From: 'erp.app.pages.shipping.shipment-debt-picker.page-title',
    To: 'Select debt note',
  },
  {
    From: 'erp.app.pages.shipping.shipment-debt-picker.quick-select-change-route',
    To: 'Quick select by route',
  },
  {
    From: 'erp.app.pages.shipping.shipment-debt-picker.quick-select-change-sale',
    To: 'Quick select by sales staff',
  },
  {
    From: 'erp.app.pages.shipping.shipment-debt-picker.refresh',
    To: 'Refresh',
  },
  {
    From: 'erp.app.pages.shipping.shipment-debt-picker.save-debt',
    To: 'Add',
  },
  {
    From: 'erp.app.pages.shipping.shipment-debt-picker.total-after-tax',
    To: 'Total',
  },
  {
    From: 'erp.app.pages.shipping.shipment-debt-picker.unselect-all',
    To: 'Unselect all',
  },
  {
    From: 'erp.app.pages.shipping.shipment-debt-picker.vendor-code',
    To: 'Vendor code',
  },
  {
    From: 'erp.app.pages.shipping.shipment-debt-picker.view-contact-detail',
    To: "View customers' information",
  },
  {
    From: 'erp.app.pages.shipping.shipment-debt-picker.view-order-detail',
    To: "View order's details",
  },
  { From: 'erp.app.pages.shipping.shipment-modal.address', To: 'Address' },
  { From: 'erp.app.pages.shipping.shipment-modal.close-modal', To: 'Close' },
  {
    From: 'erp.app.pages.shipping.shipment-modal.customer-name-sort',
    To: 'Customer',
  },
  { From: 'erp.app.pages.shipping.shipment-modal.help', To: 'Help' },
  { From: 'erp.app.pages.shipping.shipment-modal.id-sort', To: 'Order' },
  { From: 'erp.app.pages.shipping.shipment-modal.order', To: 'Order' },
  {
    From: 'erp.app.pages.shipping.shipment-modal.order-date-sort',
    To: 'Order created date',
  },
  {
    From: 'erp.app.pages.shipping.shipment-modal.original-total-after-tax',
    To: 'Value after discount',
  },
  {
    From: 'erp.app.pages.shipping.shipment-modal.page-title',
    To: 'Select order',
  },
  {
    From: 'erp.app.pages.shipping.shipment-modal.product-dimensions',
    To: 'Volume',
  },
  {
    From: 'erp.app.pages.shipping.shipment-modal.product-weight',
    To: 'weight',
  },
  {
    From: 'erp.app.pages.shipping.shipment-modal.quick-select-change-route',
    To: 'Quick select by route',
  },
  {
    From: 'erp.app.pages.shipping.shipment-modal.quick-select-change-sale',
    To: 'Quick select by sales staff',
  },
  { From: 'erp.app.pages.shipping.shipment-modal.refresh', To: 'Refresh' },
  { From: 'erp.app.pages.shipping.shipment-modal.save-selected', To: 'Add' },
  { From: 'erp.app.pages.shipping.shipment-modal.total', To: 'Total' },
  {
    From: 'erp.app.pages.shipping.shipment-modal.total-after-tax',
    To: 'Total',
  },
  {
    From: 'erp.app.pages.shipping.shipment-modal.unselect-all',
    To: 'Unselect all',
  },
  {
    From: 'erp.app.pages.shipping.shipment-modal.vendor-code',
    To: 'Vendor code',
  },
  {
    From: 'erp.app.pages.shipping.shipment-modal.view-contact-detail',
    To: "View customers' information",
  },
  {
    From: 'erp.app.pages.shipping.shipment-modal.view-order-detail',
    To: "View order's details",
  },
  {
    From: 'erp.app.pages.shipping.vehicle.change-avatar',
    To: 'Change truck picture',
  },
  {
    From: 'erp.app.pages.shipping.vehicle.date-of-purchase',
    To: 'Date of purchase',
  },
  {
    From: 'erp.app.pages.shipping.vehicle.date-of-registration',
    To: 'latest registry date',
  },
  {
    From: 'erp.app.pages.shipping.vehicle.date-of-registration-expire',
    To: 'Registry expiration date',
  },
  { From: 'erp.app.pages.shipping.vehicle.diary', To: 'Journal' },
  { From: 'erp.app.pages.shipping.vehicle.disabled', To: 'Pause' },
  {
    From: 'erp.app.pages.shipping.vehicle.docs',
    To: 'Documents/ Due date reminder',
  },
  { From: 'erp.app.pages.shipping.vehicle.expenses', To: 'Expenses' },
  {
    From: 'erp.app.pages.shipping.vehicle.general-information',
    To: 'General information',
  },
  { From: 'erp.app.pages.shipping.vehicle.height', To: 'Height (m)' },
  { From: 'erp.app.pages.shipping.vehicle.id', To: 'Id' },
  { From: 'erp.app.pages.shipping.vehicle.id-sort', To: 'Id' },
  {
    From: 'erp.app.pages.shipping.vehicle.lease-contract',
    To: 'Lease contract - renewal',
  },
  { From: 'erp.app.pages.shipping.vehicle.length', To: 'Length (m)' },
  {
    From: 'erp.app.pages.shipping.vehicle.maintainance',
    To: 'Maintenance schedule',
  },
  { From: 'erp.app.pages.shipping.vehicle.name', To: 'License plate' },
  { From: 'erp.app.pages.shipping.vehicle.name-sort', To: 'License plate' },
  { From: 'erp.app.pages.shipping.vehicle.page-title', To: 'Truck list' },
  {
    From: 'erp.app.pages.shipping.vehicle.page-title-detail',
    To: 'Vehicle information',
  },
  { From: 'erp.app.pages.shipping.vehicle.phone', To: 'phone' },
  {
    From: 'erp.app.pages.shipping.vehicle.ref-shipper-detail',
    To: 'Reference (Sales staff name RPT061)',
  },
  {
    From: 'erp.app.pages.shipping.vehicle.ref-shipper-sort',
    To: 'Reference',
  },
  {
    From: 'erp.app.pages.shipping.vehicle.shipper-list-placeholder',
    To: 'shipper-list-placeholder',
  },
  { From: 'erp.app.pages.shipping.vehicle.shipper-name', To: 'Shipper' },
  {
    From: 'erp.app.pages.shipping.vehicle.shipper-name-sort',
    To: 'Shippers',
  },
  { From: 'erp.app.pages.shipping.vehicle.tonnage', To: 'Load' },
  {
    From: 'erp.app.pages.shipping.vehicle.vehicle -info',
    To: 'Vehicle information',
  },
  {
    From: 'erp.app.pages.shipping.vehicle.vehicle-dimension-title',
    To: 'Truck body dimension',
  },
  {
    From: 'erp.app.pages.shipping.vehicle.volumn-max',
    To: 'Maximum volumes (m³)',
  },
  {
    From: 'erp.app.pages.shipping.vehicle.volumn-min',
    To: 'Minimum volumes (m³)',
  },
  {
    From: 'erp.app.pages.shipping.vehicle.volumn-recommend',
    To: 'Most efficient volume (m³)',
  },
  {
    From: 'erp.app.pages.shipping.vehicle.weight-max',
    To: 'Maximum weight (tons)',
  },
  { From: 'erp.app.pages.shipping.vehicle.weight-max-sort', To: 'Tons' },
  {
    From: 'erp.app.pages.shipping.vehicle.weight-min',
    To: 'Minimum weight (tons)',
  },
  {
    From: 'erp.app.pages.shipping.vehicle.weight-recommend',
    To: 'Most efficient weight (tons)',
  },
  { From: 'erp.app.pages.shipping.vehicle.width', To: 'Width (m)' },
  {
    From: 'erp.app.pages.sys.login.account-placeholder',
    To: 'Account - email',
  },
  { From: 'erp.app.pages.sys.login.cl-register', To: 'CL Registration' },
  { From: 'erp.app.pages.sys.login.else', To: 'Or' },
  { From: 'erp.app.pages.sys.login.email-example', To: 'email@domain.com' },
  {
    From: 'erp.app.pages.sys.login.forgotpassword',
    To: 'Request to change password',
  },
  { From: 'erp.app.pages.sys.login.login', To: 'Login' },
  {
    From: 'erp.app.pages.sys.login.message.can-not-connect',
    To: 'Cannot connect to server, please recheck',
  },
  {
    From: 'erp.app.pages.sys.login.message.can-not-find-email',
    To: 'Cannot find email, please recheck',
  },
  {
    From: 'erp.app.pages.sys.login.message.can-not-login',
    To: 'Unable to log in, please try again',
  },
  {
    From: 'erp.app.pages.sys.login.message.can-not-send-email',
    To: 'Unable to send email, please try again',
  },
  {
    From: 'erp.app.pages.sys.login.message.forgot-password',
    To: 'System has sent email for changing password, please check and follow instruction.',
  },
  {
    From: 'erp.app.pages.sys.login.message.lock-or-not-active',
    To: 'Account is not activated or being locked',
  },
  {
    From: 'erp.app.pages.sys.login.message.username-password-incorrect',
    To: 'Username or password is incorrect, please check again.',
  },
  { From: 'erp.app.pages.sys.login.password', To: 'Password' },
  { From: 'erp.app.pages.sys.login.password-placeholder', To: 'Password' },
  { From: 'erp.app.pages.sys.login.register', To: 'Register' },
  { From: 'erp.app.pages.sys.login.username', To: 'Username (email)' },
  {
    From: 'erp.app.pages.sys.not-found.detail',
    To: 'Cannot find relevant data. Please select other sorting conditions!',
  },
  { From: 'erp.app.pages.sys.not-found.page-title', To: 'Cannot find' },
  { From: 'erp.app.pages.sys.not-found.title', To: 'No data available' },
  { From: 'erp.app.pages.sys.popover.all', To: 'all' },
  { From: 'erp.app.pages.sys.popover.all-unit', To: 'all-unit' },
  {
    From: 'erp.app.pages.sys.popover.date-range-label',
    To: 'date-range-label',
  },
  {
    From: 'erp.app.pages.sys.popover.id-branch-placeholder',
    To: 'id-branch-placeholder',
  },
  { From: 'erp.app.pages.sys.popover.not-shipping', To: 'not-shipping' },
  { From: 'erp.app.pages.sys.popover.order-date-from', To: 'From date' },
  { From: 'erp.app.pages.sys.popover.order-date-to', To: 'Till date' },
  {
    From: 'erp.app.pages.sys.popover.pending-approve',
    To: 'pending-approve',
  },
  { From: 'erp.app.pages.sys.popover.phone', To: 'phone' },
  {
    From: 'erp.app.pages.sys.popover.sale-order-status-select-label',
    To: 'sale-order-status-select-label',
  },
  {
    From: 'erp.app.pages.sys.popover.single-date-label',
    To: 'single-date-label',
  },
  {
    From: 'erp.app.pages.sys.popover.staff-list-placeholder',
    To: 'staff-list-placeholder',
  },
  {
    From: 'erp.app.pages.sys.popover.staff-select-label',
    To: 'staff-select-label',
  },
  {
    From: 'erp.app.pages.sys.popover.submit-button-label',
    To: 'submit-button-label',
  },
  { From: 'erp.app.pages.sys.popover.this-week', To: 'Weel' },
  { From: 'erp.app.pages.sys.popover.today', To: 'Today' },
  {
    From: 'erp.app.pages.sys.popover.wating-allocation',
    To: 'wating-allocation',
  },
  { From: 'erp.app.pages.sys.popover.yesterday', To: 'Yesterday' },
  { From: 'erp.app.pages.sys.profile.bonus-tab', To: 'rewards' },
  {
    From: 'erp.app.pages.sys.profile.change-password',
    To: 'Change password',
  },
  { From: 'erp.app.pages.sys.profile.compact-menu', To: 'Collapsed menu' },
  {
    From: 'erp.app.pages.sys.profile.confirm-password',
    To: 'Confirm password',
  },
  { From: 'erp.app.pages.sys.profile.dark-theme', To: 'Dark mode' },
  {
    From: 'erp.app.pages.sys.profile.date-of-issued-id',
    To: 'Date of issue',
  },
  { From: 'erp.app.pages.sys.profile.day-off-tab', To: 'Leaves' },
  { From: 'erp.app.pages.sys.profile.dob', To: 'Date of birth' },
  { From: 'erp.app.pages.sys.profile.domicile', To: 'Place of origin' },
  { From: 'erp.app.pages.sys.profile.email', To: 'Email' },
  { From: 'erp.app.pages.sys.profile.full-name', To: 'Full name' },
  { From: 'erp.app.pages.sys.profile.id', To: 'Id' },
  {
    From: 'erp.app.pages.sys.profile.id-card-information',
    To: 'National ID Card',
  },
  { From: 'erp.app.pages.sys.profile.id-card-number', To: 'National ID' },
  { From: 'erp.app.pages.sys.profile.issued-by', To: 'Place of issue' },
  { From: 'erp.app.pages.sys.profile.logout', To: 'Account sign - out' },
  {
    From: 'erp.app.pages.sys.profile.messsage.can-not-save',
    To: 'Cannot save, please try again',
  },
  {
    From: 'erp.app.pages.sys.profile.messsage.check-password',
    To: 'Please recheck password',
  },
  {
    From: 'erp.app.pages.sys.profile.messsage.confirmation-password-not-match',
    To: 'log-in password does not match',
  },
  {
    From: 'erp.app.pages.sys.profile.messsage.invalid-request',
    To: 'Password incorrect, please recheck',
  },
  {
    From: 'erp.app.pages.sys.profile.messsage.least-6-char',
    To: 'Password must contain more than 6 characters',
  },
  {
    From: 'erp.app.pages.sys.profile.messsage.password-changed',
    To: 'Password changed',
  },
  { From: 'erp.app.pages.sys.profile.new-password', To: 'Enter password' },
  {
    From: 'erp.app.pages.sys.profile.old-password',
    To: 'Input old password',
  },
  { From: 'erp.app.pages.sys.profile.other-tab', To: 'Other…' },
  { From: 'erp.app.pages.sys.profile.page-title', To: 'Account information' },
  {
    From: 'erp.app.pages.sys.profile.password-hint',
    To: 'To enhance account security, your password should have…',
  },
  {
    From: 'erp.app.pages.sys.profile.password-hint-1',
    To: 'at least 8 characters',
  },
  {
    From: 'erp.app.pages.sys.profile.password-hint-2',
    To: 'with at least one character that is',
  },
  {
    From: 'erp.app.pages.sys.profile.password-hint-caps',
    To: 'Capitalised letter',
  },
  {
    From: 'erp.app.pages.sys.profile.password-hint-normal',
    To: 'Lowercase letter',
  },
  { From: 'erp.app.pages.sys.profile.password-hint-number', To: 'Numbers' },
  {
    From: 'erp.app.pages.sys.profile.password-hint-special',
    To: 'Special symbol',
  },
  { From: 'erp.app.pages.sys.profile.payroll-tab', To: 'Payroll' },
  {
    From: 'erp.app.pages.sys.profile.personal-info',
    To: 'Personal information',
  },
  {
    From: 'erp.app.pages.sys.profile.personal-information',
    To: 'Personal information',
  },
  { From: 'erp.app.pages.sys.profile.phone-number', To: 'Phone number' },
  { From: 'erp.app.pages.sys.profile.suggests-tab', To: 'Feedback' },
  { From: 'erp.app.pages.sys.profile.theme', To: 'Theme' },
  {
    From: 'erp.app.pages.sys.profile.theme-customize',
    To: 'Interface options',
  },
  {
    From: 'erp.app.pages.sys.register.art-shipper-acc',
    To: 'ART Shipper account',
  },
  {
    From: 'erp.app.pages.sys.register.confirm-password',
    To: 'Confirm password',
  },
  {
    From: 'erp.app.pages.sys.register.confirm-password-placeholder',
    To: 'Please confirm above password',
  },
  { From: 'erp.app.pages.sys.register.dob', To: 'dob' },
  {
    From: 'erp.app.pages.sys.register.dob-placeholder',
    To: 'dob-placeholder',
  },
  { From: 'erp.app.pages.sys.register.email', To: 'Email' },
  {
    From: 'erp.app.pages.sys.register.email-address-placeholder',
    To: 'email-address-placeholder',
  },
  { From: 'erp.app.pages.sys.register.full-name', To: 'Full name' },
  {
    From: 'erp.app.pages.sys.register.full-name-placeholder',
    To: 'Please input full name',
  },
  {
    From: 'erp.app.pages.sys.register.message.already-register-with-value',
    To: 'Email {{value}} has been registered. Please log in or register with another email.',
  },
  {
    From: 'erp.app.pages.sys.register.message.can-not-register',
    To: 'Registration failed. Please try again.',
  },
  {
    From: 'erp.app.pages.sys.register.message.confirm-password',
    To: 'Password verified',
  },
  { From: 'erp.app.pages.sys.register.message.email', To: 'email' },
  { From: 'erp.app.pages.sys.register.message.full-name', To: 'Full name' },
  { From: 'erp.app.pages.sys.register.message.password', To: 'Password' },
  {
    From: 'erp.app.pages.sys.register.message.phone-number',
    To: 'Phone number',
  },
  {
    From: 'erp.app.pages.sys.register.message.please',
    To: 'Please input password again to reconfirm',
  },
  {
    From: 'erp.app.pages.sys.register.message.please-confirm-password',
    To: 'Please input password again to reconfirm',
  },
  { From: 'erp.app.pages.sys.register.password', To: 'Password' },
  {
    From: 'erp.app.pages.sys.register.password-placeholder',
    To: 'Please choose passwords with minimum of 6 characters',
  },
  { From: 'erp.app.pages.sys.register.phone', To: 'Telephone' },
  {
    From: 'erp.app.pages.sys.register.phone-placeholder',
    To: 'Please input telephone number',
  },
  { From: 'erp.app.pages.sys.register.register', To: 'Account registration' },
  { From: 'erp.app.pages.sys.register.sign-up', To: 'Register' },
  { From: 'erp.app.pages.sys.setting.page-title', To: 'Personal settings' },
  { From: 'erp.app.pages.sys.system-status.add-new', To: 'Add new' },
  { From: 'erp.app.pages.sys.system-status.cancel', To: 'Cancel' },
  { From: 'erp.app.pages.sys.system-status.close-modal', To: 'Close' },
  { From: 'erp.app.pages.sys.system-status.code', To: 'Code' },
  { From: 'erp.app.pages.sys.system-status.code-sort', To: 'Code' },
  { From: 'erp.app.pages.sys.system-status.color', To: 'Status color' },
  { From: 'erp.app.pages.sys.system-status.delete', To: 'Delete' },
  { From: 'erp.app.pages.sys.system-status.id', To: 'Id' },
  { From: 'erp.app.pages.sys.system-status.idparent', To: 'Belonged to' },
  { From: 'erp.app.pages.sys.system-status.id-sort', To: 'Id' },
  { From: 'erp.app.pages.sys.system-status.name', To: 'Name' },
  { From: 'erp.app.pages.sys.system-status.name-sort', To: 'Name' },
  { From: 'erp.app.pages.sys.system-status.page-title', To: 'Status' },
  { From: 'erp.app.pages.sys.system-status.remark', To: 'Description' },
  { From: 'erp.app.pages.sys.system-status.remark-sort', To: 'Note' },
  { From: 'erp.app.pages.sys.system-status.save', To: 'Save' },
  { From: 'erp.app.pages.sys.system-status.sort', To: 'Sort' },
  { From: 'erp.app.pages.sys.system-type.add-new', To: 'Add new' },
  { From: 'erp.app.pages.sys.system-type.cancel', To: 'Cancel' },
  { From: 'erp.app.pages.sys.system-type.close-modal', To: 'Close' },
  { From: 'erp.app.pages.sys.system-type.code-sort', To: 'Code' },
  { From: 'erp.app.pages.sys.system-type.color', To: 'Status color' },
  { From: 'erp.app.pages.sys.system-type.delete', To: 'Delete' },
  { From: 'erp.app.pages.sys.system-type.id', To: 'Code' },
  { From: 'erp.app.pages.sys.system-type.idparent', To: 'Belonged to' },
  { From: 'erp.app.pages.sys.system-type.id-sort', To: 'Id' },
  { From: 'erp.app.pages.sys.system-type.name', To: 'Name' },
  { From: 'erp.app.pages.sys.system-type.name-sort', To: 'Name' },
  { From: 'erp.app.pages.sys.system-type.page-title', To: 'Classification' },
  { From: 'erp.app.pages.sys.system-type.remark', To: 'Description' },
  { From: 'erp.app.pages.sys.system-type.remark-sort', To: 'Note' },
  { From: 'erp.app.pages.sys.system-type.save', To: 'Save' },
  { From: 'erp.app.pages.sys.system-type.sort', To: 'Sort' },
  { From: 'erp.app.pages.wms.batch-picking.accountant', To: 'Accountant' },
  { From: 'erp.app.pages.wms.batch-picking.box', To: 'Box' },
  {
    From: 'erp.app.pages.wms.batch-picking.delivery-date',
    To: 'Delivery date',
  },
  {
    From: 'erp.app.pages.wms.batch-picking.export-picking',
    To: 'Export to Excel',
  },
  { From: 'erp.app.pages.wms.batch-picking.for', To: 'for' },
  { From: 'erp.app.pages.wms.batch-picking.item', To: 'Product name' },
  {
    From: 'erp.app.pages.wms.batch-picking.line-1-note',
    To: 'All parties please carefully check the goods and doccuments before leaving the warehouse.',
  },
  {
    From: 'erp.app.pages.wms.batch-picking.line-2-note',
    To: 'Distributor will be held accountable for addressing further complaints',
  },
  {
    From: 'erp.app.pages.wms.batch-picking.load-batch-picking',
    To: 'Create list',
  },
  {
    From: 'erp.app.pages.wms.batch-picking.message.can-not-create-list',
    To: 'Cannote create list',
  },
  {
    From: 'erp.app.pages.wms.batch-picking.message.importing',
    To: 'Please wait for creating lists',
  },
  {
    From: 'erp.app.pages.wms.batch-picking.message.select-picking-vehicle',
    To: 'Please select trucks to pick up',
  },
  { From: 'erp.app.pages.wms.batch-picking.odd', To: 'LCL' },
  {
    From: 'erp.app.pages.wms.batch-picking.page-title',
    To: 'Goods for pick - up list',
  },
  {
    From: 'erp.app.pages.wms.batch-picking.picking-title',
    To: 'Picked - up goods list - Warehouse',
  },
  { From: 'erp.app.pages.wms.batch-picking.print', To: 'Form printing' },
  { From: 'erp.app.pages.wms.batch-picking.print-date', To: 'Printing date' },
  { From: 'erp.app.pages.wms.batch-picking.refresh', To: 'Refresh' },
  { From: 'erp.app.pages.wms.batch-picking.remark', To: 'Remark' },
  { From: 'erp.app.pages.wms.batch-picking.saleman', To: 'Sales staff' },
  { From: 'erp.app.pages.wms.batch-picking.shipper', To: 'shipper' },
  { From: 'erp.app.pages.wms.batch-picking.shipper-title', To: 'Shipper' },
  {
    From: 'erp.app.pages.wms.batch-picking.show-feature',
    To: 'Expanded function',
  },
  {
    From: 'erp.app.pages.wms.batch-picking.sign-full-name',
    To: 'Sign and write full name',
  },
  { From: 'erp.app.pages.wms.batch-picking.stocker', To: 'Warehouse keeper' },
  { From: 'erp.app.pages.wms.batch-picking.stt', To: 'No.' },
  { From: 'erp.app.pages.wms.batch-picking.vehicle', To: 'Truck' },
  {
    From: 'erp.app.pages.wms.batch-picking.vehicle-pending',
    To: 'Trucks waiting to pick up',
  },
  {
    From: 'erp.app.pages.wms.batch-picking.warehouse',
    To: 'Pick - up warehouse',
  },
  { From: 'erp.app.pages.wms.carton.carton-group-name', To: 'Group' },
  {
    From: 'erp.app.pages.wms.carton.carton-information',
    To: 'carton specification',
  },
  { From: 'erp.app.pages.wms.carton.carton-type', To: 'Classification' },
  { From: 'erp.app.pages.wms.carton.code', To: 'code' },
  { From: 'erp.app.pages.wms.carton.container-type', To: 'Container type' },
  {
    From: 'erp.app.pages.wms.carton.cube',
    To: 'Maximum cube (Length x Width x Height)',
  },
  { From: 'erp.app.pages.wms.carton.cube-sort', To: 'Cube' },
  {
    From: 'erp.app.pages.wms.carton.default-non-pallet-carton-type',
    To: 'DefaultNonPalletCartonType',
  },
  {
    From: 'erp.app.pages.wms.carton.default-pallet-carton-type',
    To: 'DefaultPalletCartonType',
  },
  {
    From: 'erp.app.pages.wms.carton.display-for-loading',
    To: 'DisplayForLoading',
  },
  {
    From: 'erp.app.pages.wms.carton.display-for-packing',
    To: 'DisplayForPacking',
  },
  {
    From: 'erp.app.pages.wms.carton.display-for-picking',
    To: 'DisplayForPicking',
  },
  {
    From: 'erp.app.pages.wms.carton.general-information',
    To: 'General information',
  },
  { From: 'erp.app.pages.wms.carton.height', To: 'Height' },
  { From: 'erp.app.pages.wms.carton.height-sort', To: 'High' },
  { From: 'erp.app.pages.wms.carton.id', To: 'Id' },
  { From: 'erp.app.pages.wms.carton.length', To: 'Length (cm)' },
  { From: 'erp.app.pages.wms.carton.length-sort', To: 'Length (cm)' },
  { From: 'erp.app.pages.wms.carton.maintenance', To: 'maintenance' },
  {
    From: 'erp.app.pages.wms.carton.max-count',
    To: 'Maixmum quantity of product types',
  },
  { From: 'erp.app.pages.wms.carton.max-weight', To: 'Maximum weight (kg)' },
  { From: 'erp.app.pages.wms.carton.max-weight-sort', To: 'MaxWeight' },
  { From: 'erp.app.pages.wms.carton.name-sort', To: 'Name' },
  { From: 'erp.app.pages.wms.carton.page-title', To: 'List' },
  { From: 'erp.app.pages.wms.carton.page-title-detail', To: 'Carton' },
  { From: 'erp.app.pages.wms.carton.remark', To: 'Remark' },
  {
    From: 'erp.app.pages.wms.carton.search-placeholder',
    To: 'search-placeholder',
  },
  { From: 'erp.app.pages.wms.carton.tare-weight', To: 'Tare Weight' },
  { From: 'erp.app.pages.wms.carton.use-sequence', To: 'Priotised to use' },
  {
    From: 'erp.app.pages.wms.carton.vihecle-detail-tab',
    To: 'vihecle-detail-tab',
  },
  { From: 'erp.app.pages.wms.carton.width', To: 'Width' },
  { From: 'erp.app.pages.wms.carton.width-sort', To: 'Width' },
  { From: 'erp.app.pages.wms.item.add-config', To: 'Add goods owner' },
  { From: 'erp.app.pages.wms.item.add-uom', To: 'Add unit' },
  {
    From: 'erp.app.pages.wms.item.allocation-strategy',
    To: 'Goods pick-up assignment',
  },
  {
    From: 'erp.app.pages.wms.item.available-quantity',
    To: 'Available quantity',
  },
  { From: 'erp.app.pages.wms.item.barcode', To: 'Barcode' },
  { From: 'erp.app.pages.wms.item.base-uom', To: 'Original unit' },
  { From: 'erp.app.pages.wms.item.code-sort', To: 'Product code' },
  {
    From: 'erp.app.pages.wms.item.customer-ordered-quantity',
    To: 'Quantity ordered',
  },
  { From: 'erp.app.pages.wms.item.division', To: 'Division' },
  { From: 'erp.app.pages.wms.item.exchange', To: 'Convert' },
  {
    From: 'erp.app.pages.wms.item.general-information',
    To: 'General information',
  },
  {
    From: 'erp.app.pages.wms.item.group-search-placeholder',
    To: 'Search product group',
  },
  { From: 'erp.app.pages.wms.item.height', To: 'High' },
  { From: 'erp.app.pages.wms.item.hi', To: 'HI - Number of stack' },
  {
    From: 'erp.app.pages.wms.item.hi-remark',
    To: 'HI: Number of stack (High)',
  },
  { From: 'erp.app.pages.wms.item.id', To: 'Id' },
  { From: 'erp.app.pages.wms.item.id-branch', To: 'Warehouse' },
  { From: 'erp.app.pages.wms.item.id-carton-group', To: 'Carton group' },
  { From: 'erp.app.pages.wms.item.id-item-group', To: 'Belonged to group' },
  { From: 'erp.app.pages.wms.item.id-item-group-sort', To: 'Product group' },
  { From: 'erp.app.pages.wms.item.id-item-type', To: 'Product type' },
  {
    From: 'erp.app.pages.wms.item.id-purchase-tax-definition',
    To: 'Purchase Tax',
  },
  { From: 'erp.app.pages.wms.item.id-sales-tax-definition', To: 'Sales Tax' },
  { From: 'erp.app.pages.wms.item.id-storer', To: 'Goods owner' },
  { From: 'erp.app.pages.wms.item.images-info', To: 'Pictures' },
  {
    From: 'erp.app.pages.wms.item.import-item-in-vendor',
    To: 'Import item theo NCC',
  },
  {
    From: 'erp.app.pages.wms.item.inbound-qc-location',
    To: 'Inbound QC location',
  },
  { From: 'erp.app.pages.wms.item.industry', To: 'Industry' },
  { From: 'erp.app.pages.wms.item.inventory', To: 'Inventory' },
  { From: 'erp.app.pages.wms.item.inventory-uom', To: 'warehousing' },
  {
    From: 'erp.app.pages.wms.item.is-allow-consolidation',
    To: 'Allow to gather LCL goods',
  },
  {
    From: 'erp.app.pages.wms.item.is-disabled',
    To: '(operation discontinued)',
  },
  {
    From: 'erp.app.pages.wms.item.is-inventory-item',
    To: 'Goods for storage',
  },
  { From: 'erp.app.pages.wms.item.is-purchase-item', To: 'Goods to order' },
  { From: 'erp.app.pages.wms.item.is-sales-item', To: 'Goods for sale' },
  { From: 'erp.app.pages.wms.item.item-code', To: 'Product code' },
  { From: 'erp.app.pages.wms.item.item-code-from-vendor', To: 'from vendor' },
  {
    From: 'erp.app.pages.wms.item.item-expiry',
    To: 'Shelf life from manufactured date',
  },
  { From: 'erp.app.pages.wms.item.item-expiry-unit', To: 'Unit' },
  {
    From: 'erp.app.pages.wms.item.item-expiry-unit-placeholder',
    To: 'Search',
  },
  { From: 'erp.app.pages.wms.item.item-foreign-name', To: 'English name' },
  {
    From: 'erp.app.pages.wms.item.item-information',
    To: 'Product information',
  },
  {
    From: 'erp.app.pages.wms.item.item-is-disabled',
    To: 'Sản phẩm đã ngưng sử dụng',
  },
  { From: 'erp.app.pages.wms.item.item-name', To: 'Product name' },
  {
    From: 'erp.app.pages.wms.item.item-specification',
    To: 'Products classification',
  },
  { From: 'erp.app.pages.wms.item.le-kt', To: 'Lẻ KT' },
  { From: 'erp.app.pages.wms.item.length', To: 'Length (cm)' },
  { From: 'erp.app.pages.wms.item.let-item', To: 'Cứ' },
  { From: 'erp.app.pages.wms.item.lottable', To: 'Lottable' },
  { From: 'erp.app.pages.wms.item.lottable0', To: 'Lottable0' },
  { From: 'erp.app.pages.wms.item.lottable1', To: 'Lottable1' },
  { From: 'erp.app.pages.wms.item.lottable2', To: 'Lottable2' },
  { From: 'erp.app.pages.wms.item.lottable3', To: 'Lottable3' },
  { From: 'erp.app.pages.wms.item.lottable4', To: 'Lottable4' },
  { From: 'erp.app.pages.wms.item.lottable5', To: 'Lottable5' },
  { From: 'erp.app.pages.wms.item.lottable6', To: 'Lottable6' },
  { From: 'erp.app.pages.wms.item.lottable7', To: 'Lottable7' },
  { From: 'erp.app.pages.wms.item.lottable8', To: 'Lottable8' },
  { From: 'erp.app.pages.wms.item.lottable9', To: 'Lottable9' },
  {
    From: 'erp.app.pages.wms.item.maximum-inventory-level',
    To: 'Max inventory',
  },
  { From: 'erp.app.pages.wms.item.max-inventory', To: 'Max inventory' },
  {
    From: 'erp.app.pages.wms.item.max-pallets-per-zone',
    To: 'Max pallets/Zone',
  },
  { From: 'erp.app.pages.wms.item.message.delete-complete', To: 'Deleted!' },
  {
    From: 'erp.app.pages.wms.item.message.delete-complete-2',
    To: 'Deleted!',
  },
  {
    From: 'erp.app.pages.wms.item.message.import-complete',
    To: 'Import completed!',
  },
  {
    From: 'erp.app.pages.wms.item.message.save-changed',
    To: 'Changes saved',
  },
  {
    From: 'erp.app.pages.wms.item.message.save-new-uom-complete',
    To: 'New unit saved',
  },
  {
    From: 'erp.app.pages.wms.item.message.save-uom-complete',
    To: 'Unit saved',
  },
  {
    From: 'erp.app.pages.wms.item.message.set-base-uom-delete',
    To: 'Please set up origianl unit before deleting',
  },
  {
    From: 'erp.app.pages.wms.item.message.update-uom',
    To: 'Changed unit saved',
  },
  {
    From: 'erp.app.pages.wms.item.minimum-inventory-level',
    To: 'Min inventory',
  },
  { From: 'erp.app.pages.wms.item.min-inventory', To: 'Min inventory' },
  { From: 'erp.app.pages.wms.item.name-sort', To: 'Product name' },
  {
    From: 'erp.app.pages.wms.item.ordered-quantity',
    To: 'Upcoming goods receipt',
  },
  { From: 'erp.app.pages.wms.item.other', To: 'Other' },
  { From: 'erp.app.pages.wms.item.page-title', To: 'Product list' },
  { From: 'erp.app.pages.wms.item.page-title-detail', To: 'Product' },
  { From: 'erp.app.pages.wms.item.price-info', To: 'Unit price' },
  { From: 'erp.app.pages.wms.item.purchasing-uom', To: 'Purchase' },
  { From: 'erp.app.pages.wms.item.putaway-location', To: 'PutawayLocation' },
  {
    From: 'erp.app.pages.wms.item.putaway-strategy',
    To: 'Arrange goods into warehouse',
  },
  { From: 'erp.app.pages.wms.item.putaway-zone', To: 'Putaway zone' },
  { From: 'erp.app.pages.wms.item.remark', To: 'Description' },
  { From: 'erp.app.pages.wms.item.return-location', To: 'Return location' },
  { From: 'erp.app.pages.wms.item.rotate-by', To: 'RotateBy' },
  { From: 'erp.app.pages.wms.item.rotation', To: 'Rotation' },
  { From: 'erp.app.pages.wms.item.sales-uom', To: 'Sales' },
  { From: 'erp.app.pages.wms.item.search-placeholder', To: 'Search' },
  { From: 'erp.app.pages.wms.item.serial-number', To: 'Serial number' },
  { From: 'erp.app.pages.wms.item.serial-number-end', To: 'End' },
  { From: 'erp.app.pages.wms.item.serial-number-next', To: 'Next' },
  { From: 'erp.app.pages.wms.item.serial-number-start', To: 'Start' },
  { From: 'erp.app.pages.wms.item.stack-limit', To: 'StackLimit' },
  { From: 'erp.app.pages.wms.item.storer-info', To: 'Goods owner' },
  { From: 'erp.app.pages.wms.item.tax', To: 'Tax' },
  { From: 'erp.app.pages.wms.item.ti', To: 'TI - Boxes /Tie' },
  { From: 'erp.app.pages.wms.item.ti-remark', To: 'TI - Boxes /Tie' },
  {
    From: 'erp.app.pages.wms.item.ti-x-hi',
    To: 'TI x HI = No. of boxes / pallet',
  },
  {
    From: 'erp.app.pages.wms.item.unit-specification',
    To: 'Unit/Specification',
  },
  { From: 'erp.app.pages.wms.item.uom', To: 'Unit' },
  { From: 'erp.app.pages.wms.item.uom-placeholder', To: 'Unit' },
  { From: 'erp.app.pages.wms.item.vendor-info', To: 'Vendor' },
  { From: 'erp.app.pages.wms.item.vendor-placeholder', To: 'Select Vendor' },
  { From: 'erp.app.pages.wms.item.warehouse', To: 'Warehouse' },
  {
    From: 'erp.app.pages.wms.item.warehouse-allocation',
    To: 'Warehouse arrangement',
  },
  { From: 'erp.app.pages.wms.item.weight', To: 'Weight (kg)' },
  { From: 'erp.app.pages.wms.item.width', To: 'Width' },
  { From: 'erp.app.pages.wms.item-group.cancel', To: 'Change cancel' },
  { From: 'erp.app.pages.wms.item-group.close-modal', To: 'Close' },
  { From: 'erp.app.pages.wms.item-group.code-sort', To: 'Product code' },
  {
    From: 'erp.app.pages.wms.item-group.code-union',
    To: 'Group code (in Union)',
  },
  { From: 'erp.app.pages.wms.item-group.delete', To: 'Delete' },
  { From: 'erp.app.pages.wms.item-group.id', To: 'Id' },
  { From: 'erp.app.pages.wms.item-group.id-parent', To: 'Belonged to group' },
  {
    From: 'erp.app.pages.wms.item-group.item-group-name',
    To: 'Add material group',
  },
  {
    From: 'erp.app.pages.wms.item-group.item-group-placeholder',
    To: 'item-group-placeholder',
  },
  { From: 'erp.app.pages.wms.item-group.name', To: 'Group name' },
  { From: 'erp.app.pages.wms.item-group.name-sort', To: 'Group name' },
  { From: 'erp.app.pages.wms.item-group.page-title', To: 'Product group' },
  { From: 'erp.app.pages.wms.item-group.remark', To: 'Description' },
  { From: 'erp.app.pages.wms.item-group.save', To: 'Save' },
  { From: 'erp.app.pages.wms.item-group.sort', To: 'Sort' },
  {
    From: 'erp.app.pages.wms.item-uom-detail.base-uom',
    To: '(Original unit)',
  },
  { From: 'erp.app.pages.wms.item-uom-detail.height', To: 'Height' },
  { From: 'erp.app.pages.wms.item-uom-detail.hi', To: 'Number of ties' },
  { From: 'erp.app.pages.wms.item-uom-detail.is-disabled', To: 'Disabled' },
  { From: 'erp.app.pages.wms.item-uom-detail.item', To: 'Item' },
  { From: 'erp.app.pages.wms.item-uom-detail.length', To: 'Length (cm)' },
  { From: 'erp.app.pages.wms.item-uom-detail.let-item', To: 'Cứ' },
  {
    From: 'erp.app.pages.wms.item-uom-detail.message.mobile-only',
    To: 'This function is only available on phone',
  },
  {
    From: 'erp.app.pages.wms.item-uom-detail.message.save-change',
    To: 'Changes saved',
  },
  { From: 'erp.app.pages.wms.item-uom-detail.rule', To: 'Specification' },
  { From: 'erp.app.pages.wms.item-uom-detail.scan-code', To: 'Scan barcode' },
  {
    From: 'erp.app.pages.wms.item-uom-detail.ti',
    To: 'Number of boxes/ Ties',
  },
  { From: 'erp.app.pages.wms.item-uom-detail.weight', To: 'Weight (kg)' },
  { From: 'erp.app.pages.wms.item-uom-detail.width', To: 'Width' },
  {
    From: 'erp.app.pages.wms.location.cubic-capacity',
    To: 'Maximum cube (Length x Width x Height)',
  },
  {
    From: 'erp.app.pages.wms.location.foot-print',
    To: 'Number of pallet by depth',
  },
  {
    From: 'erp.app.pages.wms.location.general-information',
    To: 'General information',
  },
  { From: 'erp.app.pages.wms.location.height', To: 'Height' },
  { From: 'erp.app.pages.wms.location.id', To: 'Id' },
  { From: 'erp.app.pages.wms.location.idzone', To: 'Zone' },
  {
    From: 'erp.app.pages.wms.location.is-automatically-ship-picked-product',
    To: 'Automatically deliver received goods',
  },
  {
    From: 'erp.app.pages.wms.location.is-commingle-item',
    To: 'Allow storing different goods in one place',
  },
  {
    From: 'erp.app.pages.wms.location.is-commingle-lot',
    To: 'Allow storing goods from different batch in one place',
  },
  {
    From: 'erp.app.pages.wms.location.is-lose-id',
    To: "Omit item's LPN when transferring here",
  },
  { From: 'erp.app.pages.wms.location.length', To: 'Length' },
  { From: 'erp.app.pages.wms.location.level', To: 'Level location' },
  { From: 'erp.app.pages.wms.location.location', To: 'Location' },
  { From: 'erp.app.pages.wms.location.location-flag', To: 'Location locked' },
  {
    From: 'erp.app.pages.wms.location.location-handling',
    To: 'Goods on shelf',
  },
  {
    From: 'erp.app.pages.wms.location.location-information',
    To: 'Location parameter',
  },
  { From: 'erp.app.pages.wms.location.location-type', To: 'Classification' },
  { From: 'erp.app.pages.wms.location.name', To: 'Name' },
  { From: 'erp.app.pages.wms.location.orientation', To: 'Angles (degrees)' },
  { From: 'erp.app.pages.wms.location.page-title', To: 'List' },
  { From: 'erp.app.pages.wms.location.page-title-detail', To: 'Location' },
  { From: 'erp.app.pages.wms.location.remark', To: 'Remark' },
  { From: 'erp.app.pages.wms.location.route-sequence', To: 'Route Sequence' },
  {
    From: 'erp.app.pages.wms.location.search-placeholder',
    To: 'search-placeholder',
  },
  {
    From: 'erp.app.pages.wms.location.stack-limit',
    To: 'Number of stacked pallets',
  },
  { From: 'erp.app.pages.wms.location.weight-capacity', To: 'Max Weight' },
  { From: 'erp.app.pages.wms.location.width', To: 'Width' },
  { From: 'erp.app.pages.wms.location.x-coordinate', To: 'X coordinate' },
  { From: 'erp.app.pages.wms.location.y-coordinate', To: 'Y coordinate' },
  { From: 'erp.app.pages.wms.location.z-coordinate', To: 'Z coordinate' },
  { From: 'erp.app.pages.wms.location.zone-sort', To: 'Zone' },
  { From: 'erp.app.pages.wms.receipt.all-option', To: 'All' },
  {
    From: 'erp.app.pages.wms.receipt.expected-receipt-date',
    To: 'Input date',
  },
  {
    From: 'erp.app.pages.wms.receipt.expected-receipt-date-sort',
    To: 'Expected date',
  },
  { From: 'erp.app.pages.wms.receipt.id', To: 'Id' },
  { From: 'erp.app.pages.wms.receipt.idstorer-sort', To: 'Goods owner' },
  {
    From: 'erp.app.pages.wms.receipt.message.can-not-create-asn',
    To: 'Cannot create ASN, please try again later',
  },
  {
    From: 'erp.app.pages.wms.receipt.message.can-not-find-po',
    To: 'Cannot find PO in the system. Please check again.',
  },
  {
    From: 'erp.app.pages.wms.receipt.message.can-not-receive-planned-palletize-only',
    To: 'Your chosen order cannot be received. Please only choose goods receipt notes that are planned or divided by pallet',
  },
  {
    From: 'erp.app.pages.wms.receipt.message.create-asn-complete',
    To: 'ASN created!',
  },
  {
    From: 'erp.app.pages.wms.receipt.message.delete-complete',
    To: 'Deleted!',
  },
  {
    From: 'erp.app.pages.wms.receipt.message.import-complete',
    To: 'Import completed!',
  },
  {
    From: 'erp.app.pages.wms.receipt.message.mobile-only',
    To: 'This function is only available on phone',
  },
  {
    From: 'erp.app.pages.wms.receipt.message.save-complete',
    To: 'Saving completed!',
  },
  {
    From: 'erp.app.pages.wms.receipt.message.scanning-with-value',
    To: 'You just scanned: {{value}}, please scanned QR code on paid delivery notes',
  },
  {
    From: 'erp.app.pages.wms.receipt.message.update-coordinate-complete',
    To: 'Location updated',
  },
  { From: 'erp.app.pages.wms.receipt.page-title', To: 'Goods receipt' },
  { From: 'erp.app.pages.wms.receipt.receipted-date', To: 'Receipt date' },
  {
    From: 'erp.app.pages.wms.receipt.receipted-date-sort',
    To: 'Receipt date',
  },
  { From: 'erp.app.pages.wms.receipt.status-sort', To: 'Status' },
  { From: 'erp.app.pages.wms.receipt.type-sort', To: 'Classification' },
  { From: 'erp.app.pages.wms.receipt.vehicle-number', To: 'License plate' },
  {
    From: 'erp.app.pages.wms.receipt.vehicle-number-sort',
    To: 'Delivery truck',
  },
  {
    From: 'erp.app.pages.wms.receipt-detail.add-orderline',
    To: 'Add product',
  },
  {
    From: 'erp.app.pages.wms.receipt-detail.arrival-date',
    To: 'Actual delivery date',
  },
  {
    From: 'erp.app.pages.wms.receipt-detail.asn-receipt-title',
    To: 'ASN/Receipt',
  },
  { From: 'erp.app.pages.wms.receipt-detail.carrier-title', To: 'Delivery' },
  {
    From: 'erp.app.pages.wms.receipt-detail.expected-receipt-date',
    To: 'Expected delivery date',
  },
  {
    From: 'erp.app.pages.wms.receipt-detail.expire-date',
    To: 'Expiration date',
  },
  { From: 'erp.app.pages.wms.receipt-detail.gross', To: 'Gross (ton)' },
  { From: 'erp.app.pages.wms.receipt-detail.group', To: 'Volume (m³)' },
  { From: 'erp.app.pages.wms.receipt-detail.id', To: 'Id' },
  { From: 'erp.app.pages.wms.receipt-detail.id-branch', To: 'Warehouse' },
  { From: 'erp.app.pages.wms.receipt-detail.id-carrier', To: 'Carrier' },
  { From: 'erp.app.pages.wms.receipt-detail.id-storer', To: 'Goods owner' },
  { From: 'erp.app.pages.wms.receipt-detail.id-vendor', To: 'Vendor' },
  { From: 'erp.app.pages.wms.receipt-detail.import', To: 'Import product' },
  { From: 'erp.app.pages.wms.receipt-detail.item-list', To: 'Product list' },
  {
    From: 'erp.app.pages.wms.receipt-detail.item-placeholder',
    To: 'Search for name or product code',
  },
  { From: 'erp.app.pages.wms.receipt-detail.lot-batch', To: 'LOT/Batch' },
  {
    From: 'erp.app.pages.wms.receipt-detail.manufacture-date',
    To: 'Manufacture date',
  },
  { From: 'erp.app.pages.wms.receipt-detail.net', To: 'Net (ton)' },
  { From: 'erp.app.pages.wms.receipt-detail.odd-product', To: 'LCL goods' },
  {
    From: 'erp.app.pages.wms.receipt-detail.page-title',
    To: 'Goods receipt',
  },
  {
    From: 'erp.app.pages.wms.receipt-detail.palletize',
    To: 'Pallet Allocation',
  },
  { From: 'erp.app.pages.wms.receipt-detail.po-code', To: 'PO code' },
  { From: 'erp.app.pages.wms.receipt-detail.product', To: 'Product' },
  { From: 'erp.app.pages.wms.receipt-detail.quantity', To: 'Quantity' },
  {
    From: 'erp.app.pages.wms.receipt-detail.receipted-date',
    To: 'Adequate Goods receipt date',
  },
  {
    From: 'erp.app.pages.wms.receipt-detail.receive-tab',
    To: 'Receipt note information',
  },
  { From: 'erp.app.pages.wms.receipt-detail.remark', To: 'Description' },
  {
    From: 'erp.app.pages.wms.receipt-detail.search-placeholder',
    To: 'Search',
  },
  { From: 'erp.app.pages.wms.receipt-detail.status', To: 'Order Status' },
  { From: 'erp.app.pages.wms.receipt-detail.type', To: 'Classification' },
  {
    From: 'erp.app.pages.wms.receipt-detail.unpalletize',
    To: 'Bỏ chia để chỉnh số liệu',
  },
  { From: 'erp.app.pages.wms.receipt-detail.uom', To: 'Unit' },
  {
    From: 'erp.app.pages.wms.receipt-detail.vehicle-number',
    To: 'License plate',
  },
  { From: 'erp.app.pages.wms.returned-list.accountant', To: 'Accountant' },
  { From: 'erp.app.pages.wms.returned-list.box', To: 'Box' },
  {
    From: 'erp.app.pages.wms.returned-list.confirm-inbound-return',
    To: 'Goods receipt',
  },
  {
    From: 'erp.app.pages.wms.returned-list.delivery-date',
    To: 'Delivery date',
  },
  {
    From: 'erp.app.pages.wms.returned-list.drop-table-list',
    To: 'Undelivered goods list',
  },
  {
    From: 'erp.app.pages.wms.returned-list.drop-table-list-1',
    To: 'Returned goods list - Warehouse',
  },
  { From: 'erp.app.pages.wms.returned-list.for', To: 'for' },
  { From: 'erp.app.pages.wms.returned-list.item', To: 'Product name' },
  {
    From: 'erp.app.pages.wms.returned-list.line-1-note',
    To: 'All parties please carefully check the goods and doccuments before leaving the warehouse.',
  },
  {
    From: 'erp.app.pages.wms.returned-list.line-2-note',
    To: 'Distributor will be held accountable for addressing further complaints',
  },
  {
    From: 'erp.app.pages.wms.returned-list.load-returned-list',
    To: 'Returned goods calculated',
  },
  {
    From: 'erp.app.pages.wms.returned-list.message.can-not-create-list',
    To: 'Cannote create list',
  },
  {
    From: 'erp.app.pages.wms.returned-list.message.can-not-create-picking-list',
    To: 'Cannot create pick - up list',
  },
  {
    From: 'erp.app.pages.wms.returned-list.message.confirm-inbound-return',
    To: 'Returned goods inbound confirmed',
  },
  {
    From: 'erp.app.pages.wms.returned-list.message.creating',
    To: 'Please wait for creating lists',
  },
  {
    From: 'erp.app.pages.wms.returned-list.message.select-picking-vehicle',
    To: 'Please select trucks to pick up',
  },
  { From: 'erp.app.pages.wms.returned-list.odd', To: 'LCL' },
  {
    From: 'erp.app.pages.wms.returned-list.page-title',
    To: 'Undelivered goods list',
  },
  { From: 'erp.app.pages.wms.returned-list.print', To: 'Form printing' },
  { From: 'erp.app.pages.wms.returned-list.print-date', To: 'Printing date' },
  { From: 'erp.app.pages.wms.returned-list.refresh', To: 'Refresh' },
  { From: 'erp.app.pages.wms.returned-list.remark', To: 'Remark' },
  { From: 'erp.app.pages.wms.returned-list.saleman', To: 'Sales staff' },
  { From: 'erp.app.pages.wms.returned-list.shipper', To: 'shipper' },
  { From: 'erp.app.pages.wms.returned-list.shipper-title', To: 'Shipper' },
  {
    From: 'erp.app.pages.wms.returned-list.show-feature',
    To: 'Expanded function',
  },
  {
    From: 'erp.app.pages.wms.returned-list.sign-full-name',
    To: 'Sign and write full name',
  },
  { From: 'erp.app.pages.wms.returned-list.stocker', To: 'Warehouse keeper' },
  { From: 'erp.app.pages.wms.returned-list.stt', To: 'No.' },
  { From: 'erp.app.pages.wms.returned-list.vehicle', To: 'Truck' },
  {
    From: 'erp.app.pages.wms.returned-list.vehicle-pending',
    To: 'Waiting to process truck',
  },
  { From: 'erp.app.pages.wms.returned-list.warehouse', To: 'Xuống hàng' },
  { From: 'erp.app.pages.wms.warehouse.all', To: 'all' },
  { From: 'erp.app.pages.wms.warehouse.item', To: 'Item' },
  {
    From: 'erp.app.pages.wms.warehouse.item-placeholder',
    To: 'Search for name or product code',
  },
  { From: 'erp.app.pages.wms.warehouse.location', To: 'Location' },
  {
    From: 'erp.app.pages.wms.warehouse.page-title',
    To: 'Warehouse information',
  },
  { From: 'erp.app.pages.wms.warehouse.storer', To: 'Goods owner' },
  {
    From: 'erp.app.pages.wms.warehouse.storer-placeholder',
    To: 'Select goods owner',
  },
  { From: 'erp.app.pages.wms.warehouse.table', To: 'Detail listing' },
  {
    From: 'erp.app.pages.wms.warehouse.unit-select-placeholder',
    To: 'Select unit',
  },
  { From: 'erp.app.pages.wms.warehouse.valid-from', To: 'From date' },
  { From: 'erp.app.pages.wms.warehouse.valid-to', To: 'To date' },
  { From: 'erp.app.pages.wms.warehouse.warehouse', To: 'Warehouse' },
  {
    From: 'erp.app.pages.wms.warehouse.warehouse-input-output-inventory',
    To: 'warehouse-input-output-inventory',
  },
  {
    From: 'erp.app.pages.wms.warehouse.warehouse-item-location',
    To: 'warehouse-item-location',
  },
  {
    From: 'erp.app.pages.wms.warehouse.warehouse-item-location-lot-lpn',
    To: 'warehouse-item-location-lot-lpn',
  },
  {
    From: 'erp.app.pages.wms.warehouse.warehouse-item-lot',
    To: 'warehouse-item-lot',
  },
  {
    From: 'erp.app.pages.wms.warehouse.warehouse-transaction',
    To: 'warehouse-transaction',
  },
  { From: 'erp.app.pages.wms.warehouse.zone', To: 'Zone' },
  { From: 'erp.app.pages.wms.zone.assignment-rule', To: 'Delegation rules' },
  { From: 'erp.app.pages.wms.zone.branch-name', To: 'Warehouse' },
  { From: 'erp.app.pages.wms.zone.code', To: 'code' },
  {
    From: 'erp.app.pages.wms.zone.default-pick-to-location',
    To: 'Gathering location',
  },
  {
    From: 'erp.app.pages.wms.zone.general-information',
    To: 'General information',
  },
  { From: 'erp.app.pages.wms.zone.id', To: 'Id' },
  { From: 'erp.app.pages.wms.zone.in-location', To: 'Way - in location' },
  {
    From: 'erp.app.pages.wms.zone.is-create-assignments',
    To: 'Use jobs delegation',
  },
  {
    From: 'erp.app.pages.wms.zone.is-zone-break',
    To: 'Jobs divided by zone',
  },
  { From: 'erp.app.pages.wms.zone.max-case-count', To: 'Number of boxes' },
  { From: 'erp.app.pages.wms.zone.max-cube', To: 'Maximum volume' },
  {
    From: 'erp.app.pages.wms.zone.maximum-per-pick',
    To: 'Maximum per pick - up',
  },
  {
    From: 'erp.app.pages.wms.zone.maximum-picker-one-time',
    To: 'Number of staff to pick up',
  },
  {
    From: 'erp.app.pages.wms.zone.max-pallets-per-item',
    To: 'Maximum number of pallet for each item',
  },
  {
    From: 'erp.app.pages.wms.zone.max-pick-containers',
    To: 'Number of containers',
  },
  {
    From: 'erp.app.pages.wms.zone.max-pick-lines',
    To: 'Number of product type',
  },
  { From: 'erp.app.pages.wms.zone.max-weight', To: 'Maximum weight' },
  { From: 'erp.app.pages.wms.zone.name', To: 'Name' },
  { From: 'erp.app.pages.wms.zone.out-location', To: 'OutLocation' },
  { From: 'erp.app.pages.wms.zone.page-title', To: 'Zone' },
  { From: 'erp.app.pages.wms.zone.page-title-detail', To: 'Zone' },
  { From: 'erp.app.pages.wms.zone.remark', To: 'Remark' },
  {
    From: 'erp.app.pages.wms.zone.search-placeholder',
    To: 'search-placeholder',
  },
  { From: 'erp.app.pages.wms.zone.sort', To: 'Arrange' },
  { From: 'erp.app.pages.wms.zone.zone-removal', To: 'zone-removal' },
  {
    From: 'erp.app.pages.accountant.ar-invoice.issue-einvoice-message-question',
    To: 'Bạn chưa chọn hoá đơn nào, bạn có muốn hệ thống tự tạo hóa đơn gộp và xuất HĐĐT cho các KHÁCH HÀNG KHÔNG LẤY HÓA ĐƠN hay không?',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.issue-einvoice-message-empty',
    To: 'Không có hóa đơn phù hợp để thực hiện gộp và xuất HĐDT!',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice.issue-einvoice-message-success',
    To: 'Đã gộp hóa đơn và xuất HĐĐT thành công!',
  },
  {
    From: 'erp.app.pages.bi.ar-invoice-report.tabs.revenue.print-date',
    To: 'Ngày in',
  },
  {
    From: 'erp.app.pages.bi.ar-invoice-report.tabs.revenue.unit',
    To: 'Đơn vị',
  },
  {
    From: 'erp.app.pages.bi.ar-invoice-report.tabs.revenue.ar-invoice-report',
    To: 'BẢNG KÊ HÓA ĐƠN',
  },
  { From: 'erp.app.pages.bi.ar-invoice-report.tabs.revenue.idx', To: 'STT' },
  {
    From: 'erp.app.pages.bi.ar-invoice-report.tabs.revenue.idar',
    To: 'IDAR',
  },
  {
    From: 'erp.app.pages.bi.ar-invoice-report.tabs.revenue.idso',
    To: 'IDSO',
  },
  {
    From: 'erp.app.pages.bi.ar-invoice-report.tabs.revenue.invoice-no',
    To: 'InvoiceNo',
  },
  {
    From: 'erp.app.pages.bi.ar-invoice-report.tabs.revenue.invoice-date',
    To: 'InvoiceDate',
  },
  {
    From: 'erp.app.pages.bi.ar-invoice-report.tabs.revenue.customer-name',
    To: 'CustomerName',
  },
  {
    From: 'erp.app.pages.bi.ar-invoice-report.tabs.revenue.total-after-tax',
    To: 'TotalAfterTax',
  },
  { From: 'erp.app.pages.hrm.staff.area', To: 'Area' },
  { From: 'erp.app.pages.hrm.staff.area-placeholder', To: 'Select area' },
  {
    From: 'erp.app.pages.pos.pos-order.split.idtable',
    To: 'Choose new table',
  },
  {
    From: 'erp.app.pages.pos.pos-order.split.placeholder-idtable',
    To: 'Search by ID, Code, Name...',
  },
  {
    From: 'erp.app.pages.pos.pos-order.split.add-splited-bill',
    To: 'Add more bill',
  },
  {
    From: 'erp.app.pages.pos.pos-order.split.message.can-not-save',
    To: 'Cannot save, please try again!',
  },
  {
    From: 'erp.app.pages.pos.pos-order.merge.message.can-not-save',
    To: 'Cannot save, please try again!',
  },
  {
    From: 'erp.app.components.list-toolbar.change-table',
    To: 'Change Table',
  },
  {
    From: 'erp.app.pages.pos.pos-order.change.message.can-not-change',
    To: 'Table is occupied, cannot change to.',
  },
  {
    From: 'erp.app.pages.pos.pos-order.change.page-title',
    To: 'Changing Table',
  },
  {
    From: 'erp.app.pages.pos.pos-order.change.current-table',
    To: 'from table',
  },
  {
    From: 'erp.app.pages.pos.pos-order.change.move-table-to',
    To: 'To table',
  },
  {
    From: 'erp.app.pages.pos.pos-order.change.change-button',
    To: 'Change/Merge Table',
  },
  {
    From: 'erp.app.pages.pos.pos-order.change.mergin-alert',
    To: 'Selected table already occupied, do you want merging?',
  },
  { From: 'erp.app.pages.pos.pos-order.split-bill', To: 'Split bill' },
  {
    From: 'erp.app.app-component.menu.menu-group.goods-receiving',
    To: 'Goods Receiving (Mobile)',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.pos-table-group',
    To: 'Table Group',
  },
  {
    From: 'erp.app.components.list-toolbar.submit-business-partner',
    To: 'Submit Business Partner',
  },
  {
    From: 'erp.app.components.list-toolbar.approve-business-partner',
    To: 'Approve Business Partner',
  },
  {
    From: 'erp.app.components.list-toolbar.disapprove-business-partner',
    To: 'Disapprove Business Partner',
  },
  {
    From: 'erp.app.components.list-toolbar.update-einvoice',
    To: 'Update EInvoice',
  },
  {
    From: 'erp.app.components.list-toolbar.sync-einvoice',
    To: 'Sync EInvoice',
  },
  {
    From: 'erp.app.pages.crm.business-partner.message.submit-business-partner-error',
    To: 'Selected Business Partners Cannot Be submitted. New Business Partner Only!',
  },
  {
    From: 'erp.app.pages.crm.business-partner.message.approve-business-partner-error',
    To: 'Selected Business Partners Cannot Be Approved. Submitted Business Partners Only!',
  },
  {
    From: 'erp.app.pages.crm.business-partner.message.disapprove-business-partner-error',
    To: 'Selected Business Partners Cannot Be Disapproved. Submitted Business Partners Only!',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile-add-contact.check-bp',
    To: 'Check',
  },
  {
    From: 'erp.app.pages.sale.add-contact-modal.message.business-partner-not-found',
    To: 'Business Partner Not Found, Please Create New!',
  },
  {
    From: 'erp.app.pages.sale.add-contact-modal.message.business-partner-existed',
    To: 'Business Partner Exist, Please Confirm!',
  },
  {
    From: 'erp.app.pages.sale.sale-order-mobile-add-contact.apply-bp',
    To: 'Apply',
  },
  {
    From: 'erp.app.pages.accountant.ar-invoice-detail.seller-information',
    To: 'Seller information',
  },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.seller-name',
    To: 'Seller name',
  },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.seller-unit-name',
    To: 'Company name',
  },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.seller-tax-code',
    To: 'Tax code',
  },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.seller-address',
    To: 'Invoice address',
  },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.seller-bank-account',
    To: 'Bank account',
  },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.seller-mobile',
    To: 'Seller mobile',
  },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.seller-email',
    To: 'Seller email',
  },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.ref-code',
    To: 'Ref code',
  },
  { From: 'erp.app.pages.accountant.ap-invoice.id-saleorder', To: '#ID PO' },
  {
    From: 'erp.app.pages.accountant.ap-invoice.id-saleorder-placeholder',
    To: '#ID PO',
  },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.ap-invoice',
    To: 'A/P Invoice',
  },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.seller-information',
    To: 'Seller Id',
  },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.id-business-partner',
    To: 'Id Business Partner',
  },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.id-order',
    To: 'PO code (Vendors)',
  },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.name',
    To: 'Invoice name',
  },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.total-discount',
    To: 'Total discount',
  },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.total-after-discount',
    To: 'Total after discount',
  },
  { From: 'erp.app.pages.accountant.ap-invoice-detail.tax', To: 'Tax' },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.total-after-tax',
    To: 'Total after tax',
  },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.total-discount-placeholder',
    To: 'Total discount amount',
  },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.total-after-discount-placeholder',
    To: 'Total after discount amount',
  },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.tax-placeholder',
    To: 'Tax amount',
  },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.total-after-tax-placeholder',
    To: 'Total after tax amount',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.ap-invoice',
    To: 'A/P Invoice',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.lpn-label',
    To: 'LPN Printing',
  },
  {
    From: 'erp.app.pages.wms.lpn-label.page-title',
    To: 'LPN Label Printing',
  },
  { From: 'erp.app.pages.wms.lpn-label.lpn-label', To: 'LPN Label' },
  { From: 'erp.app.pages.wms.lpn-label.asn', To: 'ASN' },
  { From: 'erp.app.pages.wms.lpn-label.asn-placeholder', To: 'Find ASN' },
  { From: 'erp.app.pages.wms.lpn-label.item', To: 'Item' },
  { From: 'erp.app.pages.wms.lpn-label.item-placeholder', To: 'Find Item' },
  { From: 'erp.app.pages.wms.lpn-label.from-lpn', To: 'From LPN' },
  { From: 'erp.app.pages.wms.lpn-label.to-lpn', To: 'To LPN' },
  { From: 'erp.app.pages.wms.lpn-label.lpn-placeholder', To: 'Find LPN' },
  { From: 'erp.app.pages.wms.lpn-label.create-lpn', To: 'Create LPN' },
  { From: 'erp.app.pages.wms.lpn-label.from', To: 'FROM' },
  { From: 'erp.app.pages.wms.lpn-label.to', To: 'TO' },
  { From: 'erp.app.pages.wms.lpn-label.item-name', To: 'Item Name' },
  { From: 'erp.app.pages.wms.lpn-label.quantity', To: 'Quantity' },
  { From: 'erp.app.pages.wms.lpn-label.unit', To: 'Unit' },
  {
    From: 'erp.app.pages.wms.lpn-label.malnufacture-date',
    To: 'Malnufacture Date',
  },
  { From: 'erp.app.pages.wms.lpn-label.expired-date', To: 'Expired Date' },
  { From: 'erp.app.pages.wms.lpn-label.volume', To: 'Volume (m³)' },
  { From: 'erp.app.pages.wms.lpn-label.gross', To: 'Gross (Ton)' },
  { From: 'erp.app.pages.wms.lpn-label.net', To: 'Net (Ton)' },
  { From: 'erp.app.pages.wms.lpn-label.item-code', To: 'Item Code' },
  { From: 'erp.app.pages.wms.lpn-label.location', To: 'Location' },
  { From: 'erp.app.pages.wms.lpn-label.lpn', To: 'LPN' },
  { From: 'erp.app.pages.wms.lpn-label.batch', To: 'Batch' },
  { From: 'erp.app.pages.wms.lpn-label.workphone', To: 'Phone' },
  { From: 'erp.app.pages.pos.pos-menu-detail.sort', To: 'Sort' },
  {
    From: 'erp.app.pages.pos.pos-menu-detail.foreign-name',
    To: 'Foreign Name',
  },
  { From: 'erp.app.pages.pos.pos-order.title', To: 'Title' },
  {
    From: 'erp.app.pages.bi.sales-report-mobile.the-change',
    To: 'The Change',
  },
  {
    From: 'erp.app.pages.bi.sales-report-mobile.total-after-tax',
    To: 'Total after tax',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.apinvoice',
    To: 'A/P Invoices',
  },
  {
    From: 'erp.app.pages.accountant.ap-invoice-detail.ap-invoice-placeholder',
    To: 'Search for seller name or code',
  },
  { From: 'erp.app.pages.accountant.ap-invoice-detail.id', To: 'Id' },
  { From: 'erp.app.pages.pos.pos-order.order-quantity', To: 'Order Qty' },
  {
    From: 'erp.app.pages.pos.pos-order.customer-quantity',
    To: 'Customer Qty',
  },
  {
    From: 'erp.app.pages.pos.pos-order.history-order-quantity',
    To: 'History Order Qty',
  },
  {
    From: 'erp.app.pages.pos.pos-order.history-customer-quantity',
    To: 'History Customer Qty',
  },
  {
    From: 'erp.app.components.list-toolbar.show-history',
    To: 'Show History',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.branch-payroll-report',
    To: 'Báo cáo lương',
  },
  { From: 'erp.app.app-component.menu.menu-group.echarts', To: 'ECharts' },
  {
    From: 'erp.app.app-component.menu.menu-group.pos-item',
    To: 'POS Item Report',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.pos-test',
    To: 'POS Test Report',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.pos-dashboard',
    To: 'POS Dashboard Report',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.pos-receipt',
    To: 'POS Receipt Report',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.pos-day',
    To: 'POS Day Report',
  },
  { From: 'erp.app.pages.bi.pos-dashboard.page-title', To: 'POS Dashboard' },
  {
    From: 'erp.app.app-component.menu.menu-group.pos-category',
    To: 'POS Category',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.pos-revenue',
    To: 'POS Revenue',
  },
  { From: 'erp.app.app-component.menu.menu-group.bi-pos', To: 'POS Report' },
  {
    From: 'erp.app.app-component.menu.menu-group.purchase-reports',
    To: 'Purchase Report',
  },
  { From: 'erp.app.app-component.menu.menu-group.pr', To: 'PR' },
  { From: 'erp.app.app-component.menu.menu-group.pr-deal', To: 'Deal' },
  { From: 'erp.app.pages.purchase.purchase-order.remark', To: 'Remark' },
  {
    From: 'erp.app.pages.purchase.purchase-order.total-after-tax-detail',
    To: 'Total after tax',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.order-information',
    To: 'Order information',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.po-code-from-vendor',
    To: 'PO Code (from Vendor)',
  },
  { From: 'erp.app.pages.purchase.purchase-order.name', To: 'Name' },
  {
    From: 'erp.app.pages.purchase.purchase-order.payment-status-detail',
    To: 'Payment status',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.expected-receipt-date-detail',
    To: 'Expected receipt date',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.receipt-date-detail',
    To: 'Receipt date',
  },
  {
    From: 'erp.app.pages.sale.sale-order.expected-delivery-date',
    To: 'Expected delivery date',
  },
  {
    From: 'erp.app.pages.purchase.purchase-order.adjusted-quantity-label',
    To: 'Adjusted',
  },
  {
    From: 'erp.app.pages.sale.sale-order-detail.transaction-existed',
    To: 'Transaction existed! Cannot change UoM configs',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.label-printing',
    To: 'In tem/nhãn',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.serial-label',
    To: 'In nhãn theo serial',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.item-uom-label',
    To: 'Tạo và in nhãn cho item',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.pos-table-label',
    To: 'In nhãn bàn',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.voucher-printing',
    To: 'In voucher',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.member-card-printing',
    To: 'In thẻ thành viên',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.staff-label',
    To: 'In thẻ nhân viên',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.pos-kitchen-dashboard',
    To: 'POS Kitchen Dashboard',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.pos-terminal',
    To: 'POS Terminal',
  },
  { From: 'erp.app.app-component.menu.menu-group.pr-program', To: 'Program' },
  {
    From: 'erp.app.app-component.menu.menu-group.pr-voucher-policy',
    To: 'Voucher Policy',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.pr-discount-policy',
    To: 'Discount Policy',
  },
  {
    From: 'erp.app.app-component.menu.menu-group.pos-shift',
    To: 'POS Shift Report',
  },
  { From: 'erp.app.pages.bi.pos-shift.page-title', To: 'Shift Report' },
];

const options = {
  files: [
    //'src/app/pages/OST/**/*.html',
    //'src/app/pages/OST/**/*.ts',
    //   'src/app/pages/POS/pos-order/*.html',
    //   'src/app/pages/POS/pos-order/*.ts',
    'src/**/*.html',
    'src/**/*.ts',
  ],
  from: res.map((m) => new RegExp("'" + m.From + "'", 'g')),
  to: res.map((m) => "'" + m.To + "'"),
  //dry: true,
};

try {
  const results = replace.sync(options);
  console.log('Replacement results:', results);
} catch (error) {
  console.error('Error occurred:', error);
}
