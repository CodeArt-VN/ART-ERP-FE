import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ShareModule } from 'src/app/share.module';
import { UnauthorizedPage } from './unauthorized.page';

const routes: Routes = [
	{
		path: '',
		component: UnauthorizedPage,
	},
];

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, ShareModule, RouterModule.forChild(routes)],
	declarations: [UnauthorizedPage],
})
export class UnauthorizedPageModule {}
