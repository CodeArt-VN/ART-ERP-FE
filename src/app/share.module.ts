import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ShareComponentsModule } from './components/share-components.module';
@NgModule({
	imports: [IonicModule, CommonModule, ShareComponentsModule],
	declarations: [],
	exports: [ShareComponentsModule],
})
export class ShareModule {}
