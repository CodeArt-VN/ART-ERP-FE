import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ShareModule } from 'src/app/share.module';
import { RegisterPage } from './register.page';

const routes: Routes = [
	{
		path: '',
		component: RegisterPage,
	},
];

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, ShareModule, RouterModule.forChild(routes)],
	declarations: [RegisterPage],
})
export class RegisterPageModule {}
