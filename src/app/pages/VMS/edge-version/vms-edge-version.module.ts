import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ShareModule } from 'src/app/share.module';
import { VmsEdgeVersionPage } from './vms-edge-version.page';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ShareModule,
		RouterModule.forChild([{ path: '', component: VmsEdgeVersionPage }]),
	],
	declarations: [VmsEdgeVersionPage],
})
export class VmsEdgeVersionPageModule {}
