import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/app.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      // {
      // 	path: 'dashboard',
      // 	children: [
      // 		{
      // 			path: '',
      // 			loadChildren: () => import('../RPT/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      // 		}
      // 	]
      // },
      //{ path: 'finance-management', loadChildren: () => import('../BI/finance-management/finance-management.module').then(m => m.FinanceManagementPageModule)}, //, canActivate: [AuthGuard]
      {
        path: '',
        redirectTo: '/tabs/finance-management',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/finance-management',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
