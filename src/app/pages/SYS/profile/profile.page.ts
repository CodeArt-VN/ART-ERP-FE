import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

import { PageBase } from 'src/app/page-base';
import { ACCOUNT_ApplicationUserProvider } from 'src/app/services/custom/custom.service';
import { CommonService } from 'src/app/services/core/common.service';
import { EnvService } from 'src/app/services/core/env.service';
import { EVENT_TYPE } from 'src/app/services/static/event-type';
import { lib } from 'src/app/services/static/global-functions';
import { HRM_StaffProvider, SYS_UserDeviceProvider, SYS_UserSettingProvider } from 'src/app/services/static/services.service';
import { CompareValidator } from 'src/app/services/util/validators';

interface ProfileUI {
	avatarURL: string;
	segmentView: string;
	passwordViewType: string;
	minDOB: string;
	maxDOB: string;
	changePasswordForm: FormGroup;
	userSetting: any;
	item: any;
	formGroup: FormGroup;
	submitAttempt: boolean;
	user: any;
}

@Component({
	selector: 'app-profile',
	templateUrl: 'profile.page.html',
	styleUrls: ['profile.page.scss'],
	standalone: false,
})
export class ProfilePage extends PageBase {
	ui: ProfileUI = {
		avatarURL: 'assets/imgs/avartar-empty.jpg',
		segmentView: 's1',
		passwordViewType: 'password',
		minDOB: '',
		maxDOB: '',
		changePasswordForm: null,
		userSetting: null,
		item: null,
		formGroup: null,
		submitAttempt: false,
		user: null,
	};

	@ViewChild('importfile') importfile: any;

	hasBaseDropZoneOver = false;

	constructor(
		public pageProvider: HRM_StaffProvider,
		public userProvider: ACCOUNT_ApplicationUserProvider,
		public userSettingProvider: SYS_UserSettingProvider,
		public userDeviceProvider: SYS_UserDeviceProvider,

		public env: EnvService,
		public navCtrl: NavController,
		public formBuilder: FormBuilder,
		public cdr: ChangeDetectorRef,
		public alertCtrl: AlertController,
		public loadingController: LoadingController,
		public commonService: CommonService
	) {
		super();

		this.pageConfig.isDetailPage = true;

		// Initialize ui.user
		this.ui.user = this.env.user;

		this.ui.formGroup = formBuilder.group({
			Id: new FormControl({ value: '', disabled: true }),
			IDBranch: new FormControl(),
			Code: [{ value: '' }],
			Name: new FormControl('', Validators.maxLength(128)),
			Remark: new FormControl(),
			IDDepartment: new FormControl('', Validators.required),
			IDJobTitle: new FormControl('', Validators.required),
			IsDisabled: new FormControl(),
			LastName: new FormControl(),
			Title: new FormControl(),
			FirstName: new FormControl(),
			FullName: new FormControl('', Validators.required),
			ShortName: new FormControl(),
			Gender: new FormControl(),
			DOB: new FormControl(),
			PhoneNumber: new FormControl(),
			Email: new FormControl({ value: '', disabled: true }),
			Address: new FormControl(),
			ImageURL: new FormControl(),
			IdentityCardNumber: new FormControl(),
			Domicile: new FormControl(),
			DateOfIssueID: new FormControl(),
			IssuedBy: new FormControl(),
			BackgroundColor: new FormControl(),
		});

		this.ui.changePasswordForm = formBuilder.group({
			// Email: ['', Validators.required],
			oldPassword: ['', Validators.required],
			newPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
			confirmPassword: ['', Validators.compose([Validators.required, CompareValidator.confirmPassword])],
		});
		this.ui.changePasswordForm.controls['confirmPassword'].setParent(this.ui.changePasswordForm);

		let cYear = new Date().getFullYear();
		this.ui.minDOB = cYear - 70 + '-01-01';
		this.ui.maxDOB = cYear - 16 + '-12-31';
	}

	preLoadData() {
		this.id = this.env.user.StaffID;
		super.preLoadData();
	}

	loadedData(event) {
		//if (this.id && this.item) {
		if (this.item) {
			this.ui.item = this.item;
			this.ui.item.DateOfIssueID = lib.dateFormat(this.ui.item.DateOfIssueID, 'yyyy-mm-dd');
			this.ui.userSetting = this.env.user.UserSetting;
			this.ui.userSetting.isLoaded = true;
			// Update ui.user to ensure it's current
			this.ui.user = this.env.user;
		}
		super.loadedData(event);
	}

	async changePassword() {
		if (!this.ui.changePasswordForm.valid) {
			this.env.showMessage('Please recheck password', 'warning');
		} else {
			const loading = await this.loadingController.create({
				cssClass: 'my-custom-class',
				message: 'Đang dữ liệu...',
			});

			await loading.present().then(() => {
				this.userProvider
					.changePassword(
						this.ui.changePasswordForm.controls.oldPassword.value,
						this.ui.changePasswordForm.controls.newPassword.value,
						this.ui.changePasswordForm.controls.confirmPassword.value
					)
					.then((savedItem: any) => {
						this.env.showMessage('Password changed', 'warning');
						this.ui.changePasswordForm.reset();
						this.cdr.detectChanges();
						this.ui.changePasswordForm.markAsPristine();
						if (loading) loading.dismiss();
					})
					.catch((err) => {
						let message = '';
						if (err._body && err._body.indexOf('confirmation password do not match') > -1) {
							this.env.showMessage('erp.app.pages.sys.profile.message.confirmation-password-not-match', 'danger');
						} else if (err._body && err._body.indexOf('least 6 characters') > -1) {
							this.env.showMessage('erp.app.pages.sys.profile.message.least-6-char', 'danger');
						} else if (err.error && err.error.Message.indexOf('The request is invalid.') > -1) {
							this.env.showMessage('Password incorrect, please recheck', 'danger');
						} else {
							this.env.showMessage('erp.app.pages.sys.profile.message.can-not-save', 'danger');
						}
						if (loading) loading.dismiss();
						this.cdr.detectChanges();
					});
			});
		}
	}

	updateTheme(event) {
		this.ui.userSetting.Theme.Value = event.detail.value;
		this.updateUserSetting(this.ui.userSetting.Theme, true);
	}

	updateUserSetting(setting, isStringValue = false) {
		if (this.ui.submitAttempt) return;
		this.ui.submitAttempt = true;
		if (!isStringValue) setting.Value = JSON.stringify(!setting.Value);

		this.userSettingProvider.save(setting).then((response: any) => {
			if (!setting.Id) {
				setting.Id = response.Id;
			}

			if (!isStringValue) setting.Value = JSON.parse(setting.Value);

			this.ui.submitAttempt = false;
			this.env.user.UserSetting = this.ui.userSetting;
		
		});
	}

	changeTheme() {
		this.env.publishEvent({ Code: EVENT_TYPE.APP.CHANGE_THEME });
	}

	segmentChanged(ev: any) {
		this.ui.segmentView = ev.detail.value;
	}

	logout() {
		event.preventDefault();
		event.stopPropagation();
		this.env.publishEvent({ Code: EVENT_TYPE.USER.LOGOUT_REQUESTED });
	}
}
