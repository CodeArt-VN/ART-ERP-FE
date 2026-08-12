import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { VmsPermissionPage } from './vms-permission.page';

@NgModule({
	imports: [IonicModule, CommonModule, FormsModule, RouterModule.forChild([{ path: '', component: VmsPermissionPage }])],
	declarations: [VmsPermissionPage],
})
export class VmsPermissionPageModule {}
