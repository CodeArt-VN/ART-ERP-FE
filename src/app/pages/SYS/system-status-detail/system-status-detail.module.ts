import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ShareModule } from 'src/app/share.module';
import { SystemStatusDetailPage } from './system-status-detail.page';

const routes: Routes = [
	{
		path: '',
		component: SystemStatusDetailPage,
	},
];

@NgModule({
	imports: [CommonModule, FormsModule, ShareModule, IonicModule, ReactiveFormsModule, ShareModule, RouterModule.forChild(routes)],
	declarations: [SystemStatusDetailPage],
})
export class SystemStatusDetailPageModule {}
