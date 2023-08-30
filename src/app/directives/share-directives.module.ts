import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintFixDirective } from './print-fix.directive';
import { ScrollbarThemeDirective } from './scrollbar-theme.directive';



@NgModule({
	imports: [CommonModule],
	declarations: [
		PrintFixDirective, ScrollbarThemeDirective, 
	],
	exports: [
		PrintFixDirective, ScrollbarThemeDirective, 
	],
})
export class ShareDirectivesModule { }



