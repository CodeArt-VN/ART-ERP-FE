import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/app.guard';

export const VMSRoutes: Routes = [
	{
		path: 'vms-camera',
		loadChildren: () => import('./camera/vms-camera.module').then((m) => m.VmsCameraPageModule),
		canActivate: [AuthGuard],
	},
	{
		path: 'vms-edge-node',
		loadChildren: () => import('./edge-node/vms-edge-node.module').then((m) => m.VmsEdgeNodePageModule),
		canActivate: [AuthGuard],
	},
	{
		path: 'vms-event',
		loadChildren: () => import('./event/vms-event.module').then((m) => m.VmsEventPageModule),
		canActivate: [AuthGuard],
	},
	{
		path: 'vms-gallery',
		loadChildren: () => import('./gallery/vms-gallery.module').then((m) => m.VmsGalleryPageModule),
		canActivate: [AuthGuard],
	},
	{
		path: 'vms-live',
		loadChildren: () => import('./live/vms-live.module').then((m) => m.VmsLivePageModule),
		canActivate: [AuthGuard],
	},
	{
		path: 'vms-permission',
		loadChildren: () => import('./permission/vms-permission.module').then((m) => m.VmsPermissionPageModule),
		canActivate: [AuthGuard],
	},
];
