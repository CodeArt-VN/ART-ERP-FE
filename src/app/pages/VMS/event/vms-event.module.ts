import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { VmsEventPage } from './vms-event.page';

@NgModule({
	imports: [IonicModule, CommonModule, FormsModule, RouterModule.forChild([{ path: '', component: VmsEventPage }])],
	declarations: [VmsEventPage],
})
export class VmsEventPageModule {}
