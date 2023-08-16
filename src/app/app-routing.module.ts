import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/app.guard';

import { BIRoutes} from './pages/BI/bi-routing.module'
const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
  //   canActivate: [AuthGuard]
  // },

  //BI
  // { path: 'dashboard', loadChildren: () => import('./pages/BI/dashboard/dashboard.module').then(m => m.DashboardPageModule), canActivate: [AuthGuard] },
  { path: 'staff-dashboard', loadChildren: () => import('./pages/BI/HRM/staff-dashboard/staff-dashboard.module').then(m => m.StaffDashboardPageModule), canActivate: [AuthGuard] },

  // // { path: 'sale-kpi', loadChildren: () => import('./pages/BI').then(m => m), canActivate: [AuthGuard] },
  { path: 'finance-management', loadChildren: () => import('./pages/BI/finance-management/finance-management.module').then(m => m.FinanceManagementPageModule), canActivate: [AuthGuard] },
  { path: 'finance-daily-report', loadChildren: () => import('./pages/BI/finance-daily-report/finance-daily-report.module').then(m => m.FinanceDailyReportPageModule), canActivate: [AuthGuard] },
  { path: 'finance-statements', loadChildren: () => import('./pages/BI/finance-statements/finance-statements.module').then(m => m.FinanceStatementsPageModule), canActivate: [AuthGuard] },
  // { path: 'pipeline', loadChildren: () => import('./pages/BI/pipeline/pipeline.module').then(m => m.PipelinePageModule), canActivate: [AuthGuard] },
  // { path: 'sale-insignts', loadChildren: () => import('./pages/BI/sale-insignts/sale-insignts.module').then(m => m.SaleInsigntsPageModule), canActivate: [AuthGuard] },
  // { path: 'sale-performance', loadChildren: () => import('./pages/BI/sale-performance/sale-performance.module').then(m => m.SalePerformancePageModule), canActivate: [AuthGuard] },
  { path: 'ar-invoice-report', loadChildren: () => import('./pages/BI/ar-invoice-report/ar-invoice-report.module').then(m => m.ARInvoiceReportPageModule), canActivate: [AuthGuard] },
  { path: 'price-report', loadChildren: () => import('./pages/BI/price-report/price-report.module').then(m => m.PriceReportPageModule), canActivate: [AuthGuard] },
  { path: 'price-report/:segment/:id', loadChildren: () => import('./pages/BI/price-report/price-report.module').then(m => m.PriceReportPageModule), canActivate: [AuthGuard] },

  //BI/SALE
  //{ path: 'sale-daily-report', loadChildren: () => import('./pages/BI/SALE/sale-daily-report/sale-daily-report.module').then(m => m.SaleDailyReportPageModule), canActivate: [AuthGuard] },
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

 

  //SYSTEM
  { path: 'login', loadChildren: () => import('./pages/SYS/login/login.module').then(m => m.LoginPageModule) },
  { path: 'about', loadChildren: () => import('./pages/SYS/about/about.module').then(m => m.AboutPageModule) },
  { path: 'not-found', loadChildren: () => import('./pages/SYS/not-found/not-found.module').then(m => m.NotFoundPageModule), canActivate: [AuthGuard] },
  { path: 'setting', loadChildren: () => import('./pages/SYS/setting/setting.module').then(m => m.SettingPageModule), canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: () => import('./pages/SYS/profile/profile.module').then(m => m.ProfilePageModule), canActivate: [AuthGuard] },
  { path: 'default', loadChildren: () => import('./pages/SYS/default/default.module').then(m => m.DefaultPageModule), canActivate: [AuthGuard] },
  { path: 'system-status', loadChildren: () => import('./pages/SYS/system-status/system-status.module').then(m => m.SystemStatusPageModule), canActivate: [AuthGuard] },
  { path: 'system-status/:id', loadChildren: () => import('./pages/SYS/system-status-detail/system-status-detail.module').then(m => m.SystemStatusDetailPageModule), canActivate: [AuthGuard] },
  { path: 'system-type', loadChildren: () => import('./pages/SYS/system-type/system-type.module').then(m => m.SystemTypePageModule), canActivate: [AuthGuard] },
  { path: 'system-type/:id', loadChildren: () => import('./pages/SYS/system-type-detail/system-type-detail.module').then(m => m.SystemTypeDetailPageModule), canActivate: [AuthGuard] },

  {
    path: '',
    redirectTo: 'default',
    pathMatch: 'full'
  },

  { path: '**', redirectTo: '/not-found' },
  



];

let allRoutes = [...BIRoutes,  ...routes ];


@NgModule({
  imports: [
    RouterModule.forRoot(allRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
