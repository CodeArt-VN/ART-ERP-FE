import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/app.guard';

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
import { OSMRoutes } from './pages/OSM/routing.module';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
  //   canActivate: [authGuard],
  // },

  { path: 'flat', loadChildren: () => import('./pages/_template/flat/flat.module').then(m => m.FlatPageModule), canActivate: [authGuard] },
  { path: 'flat/:id', loadChildren: () => import('./pages/_template/flat-detail/flat-detail.module').then(m => m.FlatDetailPageModule), canActivate: [authGuard] },

  { path: 'flat-tree', loadChildren: () => import('./pages/_template/tree/tree.module').then(m => m.TreePageModule), canActivate: [authGuard] },
  { path: 'flat-tree/:id', loadChildren: () => import('./pages/_template/flat-detail/flat-detail.module').then(m => m.FlatDetailPageModule), canActivate: [authGuard] },

  // BI
  { path: 'ar-invoice-report', loadChildren: () => import('./pages/BI/ar-invoice-report/ar-invoice-report.module').then(m => m.ARInvoiceReportPageModule), canActivate: [authGuard] },
  { path: 'price-report', loadChildren: () => import('./pages/BI/price-report/price-report.module').then(m => m.PriceReportPageModule), canActivate: [authGuard] },
  { path: 'price-report/:segment/:id', loadChildren: () => import('./pages/BI/price-report/price-report.module').then(m => m.PriceReportPageModule), canActivate: [authGuard] },

  // BI/SALE
  { path: 'sales-reports', loadChildren: () => import('./pages/BI/SALE/sales-reports/sales-reports.module').then(m => m.SalesReportsPageModule), canActivate: [authGuard] },
  { path: 'sales-reports-mobile', loadChildren: () => import('./pages/BI/SALE/sale-summary-mobile/sale-summary-mobile.module').then(m => m.SaleSummaryMobilePageModule), canActivate: [authGuard] },

  // BI/PURCHASE
  { path: 'purchase-reports', loadChildren: () => import('./pages/BI/PURCHASE/purchase-reports/purchase-reports.module').then(m => m.PurchaseReportsPageModule), canActivate: [authGuard] },

  { path: '', redirectTo: '/default', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' },

];

const allRoutes = [
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
  ...OSMRoutes,
  ...routes
];


@NgModule({
  imports: [
    RouterModule.forRoot(allRoutes, { preloadingStrategy: NoPreloading, useHash: true }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
