import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ShareModule } from 'src/app/share.module';
import { VmsEdgeNodeDetailPage } from './vms-edge-node-detail.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		ShareModule,
		RouterModule.forChild([{ path: '', component: VmsEdgeNodeDetailPage }]),
	],
	declarations: [VmsEdgeNodeDetailPage],
})
export class VmsEdgeNodeDetailPageModule {}
