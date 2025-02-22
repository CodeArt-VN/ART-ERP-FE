import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ShareModule } from 'src/app/share.module';
import { IntegrationTriggerDetailPage } from './integration-trigger-detail.page';
import { IntegrationTriggerActionModalPage } from '../integration-trigger-action-modal/integration-trigger-action-modal.page';

const routes: Routes = [
	{
		path: '',
		component: IntegrationTriggerDetailPage,
	},
];

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, ShareModule, RouterModule.forChild(routes)],
	declarations: [IntegrationTriggerDetailPage, IntegrationTriggerActionModalPage],
})
export class IntegrationTriggerDetailPageModule {}
