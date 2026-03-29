import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ShareModule } from 'src/app/share.module';
import { NotificationSegmentDetailPage } from './notification-segment-detail.page';

const routes: Routes = [
	{
		path: '',
		component: NotificationSegmentDetailPage,
	},
];

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, ShareModule, RouterModule.forChild(routes)],
	declarations: [NotificationSegmentDetailPage],
})
export class NotificationSegmentDetailPageModule {}
