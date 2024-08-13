import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/app.guard';

import { ACCOUNTTANTRoutes } from './pages/ACCOUNTANT/routing.module';
import { ADMINRoutes } from './pages/ADMIN/routing.module';
import { BIRoutes } from './pages/BI/routing.module';
import { APPROVALRoutes } from './pages/APPROVAL/routing.module';
import { CRMRoutes } from './pages/CRM/routing.module';
import { FINANCIALRoutes } from './pages/FINANCIAL/routing.module';
import { HRMRoutes } from './pages/HRM/routing.module';
import { OSTRoutes } from './pages/OST/routing.module';
import { PMRoutes } from './pages/PM/routing.module';
import { POSRoutes } from './pages/POS/routing.module';
import { PRRoutes } from './pages/PR/routing.module';
import { PRODRoutes } from './pages/PROD/routing.module';
import { PURCHASERoutes } from './pages/PURCHASE/routing.module';
import { SALERoutes } from './pages/SALE/routing.module';
import { SHIPRoutes } from './pages/SHIP/routing.module';
import { SYSRoutes } from './pages/SYS/routing.module';
import { WMSRoutes } from './pages/WMS/routing.module';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
  //   canActivate: [AuthGuard]
  // },

  { path: 'flat', loadChildren: () => import('./pages/_template/flat/flat.module').then(m => m.FlatPageModule), canActivate: [AuthGuard] },
  { path: 'flat/:id', loadChildren: () => import('./pages/_template/flat-detail/flat-detail.module').then(m => m.FlatDetailPageModule), canActivate: [AuthGuard] },
    
  { path: 'flat-tree', loadChildren: () => import('./pages/_template/tree/tree.module').then(m => m.TreePageModule), canActivate: [AuthGuard] },
  { path: 'flat-tree/:id', loadChildren: () => import('./pages/_template/flat-detail/flat-detail.module').then(m => m.FlatDetailPageModule), canActivate: [AuthGuard] },
    

  //BI
  { path: 'staff-dashboard', loadChildren: () => import('./pages/BI/HRM/staff-dashboard/staff-dashboard.module').then(m => m.StaffDashboardPageModule), canActivate: [AuthGuard] },
  { path: 'finance-management', loadChildren: () => import('./pages/BI/finance-management/finance-management.module').then(m => m.FinanceManagementPageModule), canActivate: [AuthGuard] },
  { path: 'finance-daily-report', loadChildren: () => import('./pages/BI/finance-daily-report/finance-daily-report.module').then(m => m.FinanceDailyReportPageModule), canActivate: [AuthGuard] },
  { path: 'finance-statements', loadChildren: () => import('./pages/BI/finance-statements/finance-statements.module').then(m => m.FinanceStatementsPageModule), canActivate: [AuthGuard] },
  { path: 'ar-invoice-report', loadChildren: () => import('./pages/BI/ar-invoice-report/ar-invoice-report.module').then(m => m.ARInvoiceReportPageModule), canActivate: [AuthGuard] },
  { path: 'price-report', loadChildren: () => import('./pages/BI/price-report/price-report.module').then(m => m.PriceReportPageModule), canActivate: [AuthGuard] },
  { path: 'price-report/:segment/:id', loadChildren: () => import('./pages/BI/price-report/price-report.module').then(m => m.PriceReportPageModule), canActivate: [AuthGuard] },

  //BI/SALE
  { path: 'sales-reports', loadChildren: () => import('./pages/BI/SALE/sales-reports/sales-reports.module').then(m => m.SalesReportsPageModule), canActivate: [AuthGuard] },
  { path: 'sales-reports-mobile', loadChildren: () => import('./pages/BI/SALE/sale-summary-mobile/sale-summary-mobile.module').then(m => m.SaleSummaryMobilePageModule), canActivate: [AuthGuard] },

  //BI/PURCHASE
  { path: 'purchase-reports', loadChildren: () => import('./pages/BI/PURCHASE/purchase-reports/purchase-reports.module').then(m => m.PurchaseReportsPageModule), canActivate: [AuthGuard] },

  //BI/POS
  { path: 'pos-dashboard', loadChildren: () => import('./pages/BI/pos-report/pos-dashboard/pos-dashboard.module').then(m => m.PosDashboardPageModule), canActivate: [AuthGuard] },
  { path: 'pos-shift', loadChildren: () => import('./pages/BI/pos-report/pos-shift/pos-shift.module').then(m => m.PosShiftPageModule), canActivate: [AuthGuard] },
  { path: 'pos-item', loadChildren: () => import('./pages/BI/pos-report/pos-item/pos-item.module').then(m => m.PosItemPageModule), canActivate: [AuthGuard] },
  { path: 'pos-receipt', loadChildren: () => import('./pages/BI/pos-report/pos-receipt/pos-receipt-report.module').then(m => m.POSReceiptReportPageModule), canActivate: [AuthGuard] },
  { path: 'pos-day', loadChildren: () => import('./pages/BI/pos-report/pos-day/pos-day.module').then(m => m.PosDayPageModule), canActivate: [AuthGuard] },
  { path: 'pos-category', loadChildren: () => import('./pages/BI/pos-report/pos-category/pos-category.module').then(m => m.PosCategoryPageModule), canActivate: [AuthGuard] },
  { path: 'pos-revenue', loadChildren: () => import('./pages/BI/pos-report/pos-revenue/pos-revenue.module').then(m => m.PosRevenuePageModule), canActivate: [AuthGuard] },

  { path: '', redirectTo: 'default', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' },

];

let allRoutes = [
  ...ACCOUNTTANTRoutes,
  ...ADMINRoutes,
  ...APPROVALRoutes,
  ...BIRoutes,
  ...CRMRoutes,
  ...FINANCIALRoutes,
  ...HRMRoutes,
  ...OSTRoutes,
  ...PMRoutes,
  ...POSRoutes,
  ...PRRoutes,
  ...PRODRoutes,
  ...PURCHASERoutes,
  ...SALERoutes,
  ...SHIPRoutes,
  ...SYSRoutes,
  ...WMSRoutes,
  ...routes
];


@NgModule({
  imports: [
    RouterModule.forRoot(allRoutes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
