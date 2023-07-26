import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ShareComponentsModule } from './components/share-components.module';
@NgModule({
	declarations: [],
	exports: [
		ShareComponentsModule,
	],
	imports: [IonicModule, CommonModule, ShareComponentsModule],
})
export class ShareModule { }
