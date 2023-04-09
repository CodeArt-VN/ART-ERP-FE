import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PRDealPage } from './pr-deal.page';
import { ShareModule } from 'src/app/share.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ShareModule,
    RouterModule.forChild([{ path: '', component: PRDealPage }])
  ],
  declarations: [PRDealPage]
})
export class PRDealPageModule {}
