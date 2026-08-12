import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { VmsLivePage } from './vms-live.page';

@NgModule({
	imports: [IonicModule, CommonModule, FormsModule, RouterModule.forChild([{ path: '', component: VmsLivePage }])],
	declarations: [VmsLivePage],
})
export class VmsLivePageModule {}
