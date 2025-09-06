import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ShareModule } from 'src/app/share.module';
import { NotificationSettingPage } from './notification-setting.page';

@NgModule({
	imports: [IonicModule, CommonModule, FormsModule, ShareModule, RouterModule.forChild([{ path: '', component: NotificationSettingPage }])],
	declarations: [NotificationSettingPage],
})
export class NotificationSettingPageModule {}
