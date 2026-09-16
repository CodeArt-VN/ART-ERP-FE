import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ShareModule } from 'src/app/share.module';
import { VmsPersonDetailPage } from './vms-person-detail.page';

const routes: Routes = [{ path: '', component: VmsPersonDetailPage }];

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, ShareModule, RouterModule.forChild(routes)],
	declarations: [VmsPersonDetailPage],
})
export class VmsPersonDetailPageModule {}
