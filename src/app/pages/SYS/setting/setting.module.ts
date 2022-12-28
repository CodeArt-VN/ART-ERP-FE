import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SettingPage } from './setting.page';
import { ShareModule } from 'src/app/share.module';

const routes: Routes = [
  {
    path: '',
    component: SettingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShareModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SettingPage]
})
export class SettingPageModule {}
