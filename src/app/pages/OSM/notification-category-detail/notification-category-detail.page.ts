import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';
import { OSM_CategoryProvider } from 'src/app/services/static/services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lib } from 'src/app/services/static/global-functions';

@Component({
	selector: 'app-notification-category-detail',
	templateUrl: './notification-category-detail.page.html',
	styleUrls: ['./notification-category-detail.page.scss'],
	standalone: false,
})
export class NotificationCategoryDetailPage extends PageBase {
	formGroup: FormGroup;
	categoryList = [];
	constructor(
		public pageProvider: OSM_CategoryProvider,
		public env: EnvService,
		public navCtrl: NavController,
		public route: ActivatedRoute,

		public modalController: ModalController,
		public alertCtrl: AlertController,
		public navParams: NavParams,
		public formBuilder: FormBuilder,
		public cdr: ChangeDetectorRef,
		public loadingController: LoadingController
	) {
		super();
		this.pageConfig.isDetailPage = true;
		this.id = this.route.snapshot.paramMap.get('id');
		this.formGroup = formBuilder.group({
			IDParent: [''],
			Id: [''],
			Code: ['', Validators.required],
			Name: ['', Validators.required],
			Sound: [''],
			Importance: [''],
			Lights: [''],
			LightColor: [''],
			Vibration: [''],
			Icon: [''],
		});
	}

	preLoadData() {
		Promise.all([this.pageProvider.read()]).then((values: any) => {
			lib.buildFlatTree(values[0].data, []).then((result: any) => {
				this.categoryList = result;
				if (this.navParams) {
					this.item = JSON.parse(JSON.stringify(this.navParams.data.item));

					this.id = this.navParams.data.id;

					this.cdr.detectChanges();
				}
				this.loadedData();
			});
		});
	}
	loadedData(event?: any, ignoredFromGroup?: boolean): void {
		super.loadedData(event, ignoredFromGroup);
		// if (!this.item.Id) this.formGroup.get('IDBranch').markAsDirty();
	}
	refresh(event?: any): void {
		this.preLoadData();
	}

	async saveChange() {
		super.saveChange2();
	}
}
