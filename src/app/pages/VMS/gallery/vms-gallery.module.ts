import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { VmsGalleryPage } from './vms-gallery.page';

@NgModule({
	imports: [IonicModule, CommonModule, FormsModule, RouterModule.forChild([{ path: '', component: VmsGalleryPage }])],
	declarations: [VmsGalleryPage],
})
export class VmsGalleryPageModule {}
