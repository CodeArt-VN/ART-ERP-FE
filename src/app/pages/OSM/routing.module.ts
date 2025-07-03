import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/app.guard';

export const OSMRoutes: Routes = [
    { path: 'notification-template', loadChildren: () => import('./notification-template/notification-template.module').then(m => m.NotificationTemplatePageModule), canActivate: [AuthGuard] },
    { path: 'notification-template/:id', loadChildren: () => import('./notification-template-detail/notification-template-detail.module').then(m => m.NotificationTemplateDetailPageModule), canActivate: [AuthGuard] },


    { path: 'notification', loadChildren: () => import('./notification/notification.module').then(m => m.NotificationPageModule), canActivate: [AuthGuard] },
    { path: 'notification/:id', loadChildren: () => import('./notification-detail/notification-detail.module').then(m => m.NotificationDetailPageModule), canActivate: [AuthGuard] },


    { path: 'notification-category', loadChildren: () => import('./notification-category/notification-category.module').then(m => m.NotificationCategoryPageModule), canActivate: [AuthGuard] },
    { path: 'notification-category/:id', loadChildren: () => import('./notification-category-detail/notification-category-detail.module').then(m => m.NotificationCategoryDetailPageModule), canActivate: [AuthGuard] },

    { path: 'notification-segment', loadChildren: () => import('./notification-segment/notification-segment.module').then(m => m.NotificationSegmentPageModule), canActivate: [AuthGuard] },
    { path: 'notification-segment/:id', loadChildren: () => import('./notification-segment-detail/notification-segment-detail.module').then(m => m.NotificationSegmentDetailPageModule), canActivate: [AuthGuard] },


    { path: 'notifications', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule), canActivate: [AuthGuard] },

    { path: 'notification-setting', loadChildren: () => import('./notification-setting/notification-setting.module').then(m => m.NotificationSettingPageModule), canActivate: [AuthGuard] },
];

