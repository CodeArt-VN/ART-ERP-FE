import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ShareModule } from 'src/app/share.module';
import { VmsPersonMergeModal } from './vms-person-merge.modal';
import { VmsPersonPage } from './vms-person.page';

@NgModule({
	imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, ShareModule, RouterModule.forChild([{ path: '', component: VmsPersonPage }])],
	declarations: [VmsPersonPage, VmsPersonMergeModal],
})
export class VmsPersonPageModule {}
