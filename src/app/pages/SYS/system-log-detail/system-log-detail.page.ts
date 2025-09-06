import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, NavParams, LoadingController, AlertController } from '@ionic/angular';

import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { vw_SYS_LogDetailProvider } from 'src/app/services/static/services.service';

@Component({
	selector: 'app-system-log-detail',
	templateUrl: './system-log-detail.page.html',
	styleUrls: ['./system-log-detail.page.scss'],
	standalone: false,
})
export class SystemLogDetailPage extends PageBase {

	constructor(
		public pageProvider: vw_SYS_LogDetailProvider,
		public env: EnvService,
		public navCtrl: NavController,
		public route: ActivatedRoute,
		public modalController: ModalController,
		public alertCtrl: AlertController,
		public navParams: NavParams,
		public formBuilder: FormBuilder,
		public cdr: ChangeDetectorRef,
	) {
		super();
		this.pageConfig.isDetailPage = true;
		this.id = this.route.snapshot.paramMap.get('id');
	}
	preLoadData(event) {
		if (this.navParams) {
			this.id = this.navParams.data.id;
		}
		super.preLoadData(event);
	}
	
}
