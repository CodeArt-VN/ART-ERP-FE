import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ShareModule } from 'src/app/share.module';
import { UiKitPage } from './ui-kit.page';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ShareModule,
		RouterModule.forChild([{ path: '', component: UiKitPage }]),
	],
	declarations: [UiKitPage],
})
export class UiKitPageModule {}
