import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { PurchaseOrderNoteComponent } from '../printing/purchase-order-note/purchase-order-note';
import { SaleOrderNoteComponent } from '../printing/sale-order-note/sale-order-note';

@NgModule({
	imports: [CommonModule, IonicModule, TranslateModule],
	declarations: [PurchaseOrderNoteComponent, SaleOrderNoteComponent],
	exports: [PurchaseOrderNoteComponent, SaleOrderNoteComponent],
})
export class SharePrintingModule {}
