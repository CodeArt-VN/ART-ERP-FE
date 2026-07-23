import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualViewportComponent } from './virtual-viewport.component';
import { VirtualItemMeasureDirective } from './virtual-item-measure.directive';

@NgModule({
	imports: [CommonModule],
	declarations: [VirtualViewportComponent, VirtualItemMeasureDirective],
	exports: [VirtualViewportComponent, VirtualItemMeasureDirective],
})
export class ShareVirtualScrollModule {}
