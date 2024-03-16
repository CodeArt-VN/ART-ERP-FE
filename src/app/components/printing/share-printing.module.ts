import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollingModule as ExperimentalScrollingModule } from '@angular/cdk-experimental/scrolling';

import { PurchaseOrderNoteComponent } from '../printing/purchase-order-note/purchase-order-note';
import { SaleOrderNoteComponent } from '../printing/sale-order-note/sale-order-note';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, ScrollingModule, ExperimentalScrollingModule, IonicModule, TranslateModule],
  declarations: [PurchaseOrderNoteComponent, SaleOrderNoteComponent],
  exports: [PurchaseOrderNoteComponent, SaleOrderNoteComponent],
})
export class SharePrintingModule {}
