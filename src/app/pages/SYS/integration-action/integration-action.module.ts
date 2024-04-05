import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IntegrationActionPage } from './integration-action.page';
import { ShareModule } from 'src/app/share.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ShareModule,
    RouterModule.forChild([{ path: '', component: IntegrationActionPage }])
  ],
  declarations: [IntegrationActionPage]
})
export class IntegrationActionPageModule {}
