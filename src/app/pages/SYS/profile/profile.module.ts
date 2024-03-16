import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilePage } from './profile.page';
import { ShareModule } from 'src/app/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ShareModule,
    RouterModule.forChild([{ path: '', component: ProfilePage }]),
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
