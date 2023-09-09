import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintFixDirective } from './print-fix.directive';
import { ScrollbarThemeDirective } from './scrollbar-theme.directive';
import { TranslateResourceDirective } from './translate-resource.directive';



@NgModule({
	imports: [CommonModule],
	declarations: [
		PrintFixDirective, ScrollbarThemeDirective, TranslateResourceDirective, 
	],
	exports: [
		PrintFixDirective, ScrollbarThemeDirective, TranslateResourceDirective,
	],
})
export class ShareDirectivesModule { }



