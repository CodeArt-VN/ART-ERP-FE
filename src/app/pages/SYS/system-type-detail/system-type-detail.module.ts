import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SystemTypeDetailPage } from './system-type-detail.page';
import { ShareModule } from 'src/app/share.module';

const routes: Routes = [
  {
    path: '',
    component: SystemTypeDetailPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShareModule,
    IonicModule,
    ReactiveFormsModule,
    ShareModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SystemTypeDetailPage],
})
export class SystemTypeDetailPageModule {}
