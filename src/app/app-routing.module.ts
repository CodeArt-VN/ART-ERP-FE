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
