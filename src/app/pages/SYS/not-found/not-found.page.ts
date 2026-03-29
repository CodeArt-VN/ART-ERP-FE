import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, NavController, Platform } from '@ionic/angular';

import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.page.html',
	styleUrls: ['./not-found.page.scss'],
	standalone: false,
})
export class NotFoundPage extends PageBase {
	isShowFeature = true;
	show404 = false;

	funnelChart: any;
	@ViewChild('funnelCanvas') funnelCanvas;

	constructor(
		public actionSheetController: ActionSheetController,
		public env: EnvService,
		public navCtrl: NavController,
		public platform: Platform,
		public router: Router
	) {
		super();
	}

	get isFromLogin(): boolean {
		const nav = this.router.lastSuccessfulNavigation;
		const prevUrl = nav?.previousNavigation?.finalUrl?.toString() ?? '';
		return prevUrl.includes('/login');
	}

	loadedData() {}
}
