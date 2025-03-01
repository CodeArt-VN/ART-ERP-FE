import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';
import { BRA_BranchProvider, SYS_IntegrationProviderProvider } from 'src/app/services/static/services.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/services/core/common.service';

@Component({
	selector: 'app-integration-provider-detail',
	templateUrl: './integration-provider-detail.page.html',
	styleUrls: ['./integration-provider-detail.page.scss'],
	standalone: false,
})
export class IntegrationProviderDetailPage extends PageBase {
	constructor(
		public pageProvider: SYS_IntegrationProviderProvider,
		public branchProvider: BRA_BranchProvider,
		public env: EnvService,
		public navCtrl: NavController,
		public route: ActivatedRoute,
		public alertCtrl: AlertController,
		public formBuilder: FormBuilder,
		public cdr: ChangeDetectorRef,
		public loadingController: LoadingController,
		public commonService: CommonService
	) {
		super();
		this.pageConfig.isDetailPage = true;

		this.formGroup = formBuilder.group({
			IDBranch: [this.env.selectedBranch],
			Id: new FormControl({ value: '', disabled: true }),
			Code: [''],
			Type: [''],
			Icon: [''],
			Color: [''],
			Name: ['', Validators.required],
			Remark: [''],
			Sort: [''],
			IsDisabled: new FormControl({ value: '', disabled: true }),
			IsDeleted: new FormControl({ value: '', disabled: true }),
			CreatedBy: new FormControl({ value: '', disabled: true }),
			CreatedDate: new FormControl({ value: '', disabled: true }),
			ModifiedBy: new FormControl({ value: '', disabled: true }),
			ModifiedDate: new FormControl({ value: '', disabled: true }),
		});
	}

	typeDataSource: any;
	isAllRowOpened = true;

	preLoadData(event?: any): void {
		this.env.getType('IntegrationProviderType').then((values) => {
			this.typeDataSource = values;
			super.preLoadData(event);
		});
	}
	async saveChange() {
		super.saveChange2();
	}
}
