import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ShareComponentsModule } from './components/share-components.module';
import { DynamicFormBuilderModule } from './components/dynamic-field.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
@NgModule({
	declarations: [],
	exports: [
		ShareComponentsModule,
		TranslateModule,
		NgOptionHighlightModule,
	],
	imports: [IonicModule, CommonModule, ShareComponentsModule, DynamicFormBuilderModule],
})
export class ShareModule { }
