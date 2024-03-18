import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/app.guard';

export const SYSRoutes: Routes = [
    
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
    { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule) },
    { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundPageModule), canActivate: [AuthGuard] },
    { path: 'setting', loadChildren: () => import('./setting/setting.module').then(m => m.SettingPageModule), canActivate: [AuthGuard] },
    { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule), canActivate: [AuthGuard] },
    { path: 'default', loadChildren: () => import('./default/default.module').then(m => m.DefaultPageModule), canActivate: [AuthGuard] },
    
    { path: 'system-status', loadChildren: () => import('./system-status/system-status.module').then(m => m.SystemStatusPageModule), canActivate: [AuthGuard] },
    { path: 'system-status/:id', loadChildren: () => import('./system-status-detail/system-status-detail.module').then(m => m.SystemStatusDetailPageModule), canActivate: [AuthGuard] },
    
    { path: 'system-type', loadChildren: () => import('./system-type/system-type.module').then(m => m.SystemTypePageModule), canActivate: [AuthGuard] },
    { path: 'system-type/:id', loadChildren: () => import('./system-type-detail/system-type-detail.module').then(m => m.SystemTypeDetailPageModule), canActivate: [AuthGuard] },

    { path: 'schema', loadChildren: () => import('./schema/schema.module').then(m => m.SchemaPageModule), canActivate: [AuthGuard] },
    { path: 'schema/:id', loadChildren: () => import('./schema-detail/schema-detail.module').then(m => m.SchemaDetailPageModule), canActivate: [AuthGuard] },
   
    { path: 'api-collection', loadChildren: () => import('./api-collection/api-collection.module').then(m => m.APICollectionPageModule) },
    { path: 'api-collection/:id', loadChildren: () => import('./api-collection-detail/api-collection-detail.module').then(m => m.APICollectionDetailPageModule)},

];
