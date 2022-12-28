import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintFixDirective } from './print-fix.directive';
import { ScrollbarThemeDirective } from './scrollbar-theme.directive';
import { SvgImageDirective } from './svg-image.directive';



@NgModule({
	imports: [CommonModule],
	declarations: [
		PrintFixDirective, ScrollbarThemeDirective, SvgImageDirective, 
	],
	exports: [
		PrintFixDirective, ScrollbarThemeDirective, SvgImageDirective, 
	],
})
export class ShareDirectivesModule { }



