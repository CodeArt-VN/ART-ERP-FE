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
import { BiometricAuthService } from 'src/app/services/auth/biometric-auth.service';

interface ProfileUI {
	avatarURL: string;
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

	showBiometricSection = false;
	biometricSupported = false;
	biometricEnabled = false;
	biometricLabel = 'Face ID';
	biometricStatusMessage = '';
	biometricStatusParams: Record<string, string> = {};

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
		public commonService: CommonService,
		private biometricAuth: BiometricAuthService,
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
		this.formGroup = this.ui.formGroup;

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
		void this.refreshBiometricStatus();
	}

	ionViewWillEnter() {
		super.ionViewWillEnter();
		void this.refreshBiometricStatus();
	}

	loadedData(event) {
		if (this.item) {
			this.ui.item = this.item;
			this.ui.item.DateOfIssueID = lib.dateFormat(this.ui.item.DateOfIssueID, 'yyyy-mm-dd');
		}
		if (this.env.user?.UserSetting) {
			this.ui.userSetting = this.env.user.UserSetting;
			this.ui.userSetting.isLoaded = true;
		}
		this.ui.user = this.env.user;
		super.loadedData(event);
		void this.refreshBiometricStatus();
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

	async refreshBiometricStatus() {
		this.showBiometricSection = this.biometricAuth.showUi;
		this.biometricLabel = 'Face ID';
		this.biometricStatusMessage = '';
		this.biometricStatusParams = {};

		if (!this.showBiometricSection) {
			this.biometricSupported = false;
			this.biometricEnabled = false;
			this.cdr.detectChanges();
			return;
		}

		const probe = await this.biometricAuth.probe();
		this.biometricLabel = probe.label;
		this.biometricSupported = probe.available;
		this.biometricEnabled = probe.enabled;

		if (!probe.available) {
			if (probe.error === 'biometry-unavailable') {
				this.biometricStatusMessage = 'Biometry unavailable on this build';
				this.biometricStatusParams = {};
			} else {
				this.biometricStatusMessage = 'Unable to check biometry ({platform}/{error})';
				this.biometricStatusParams = {
					platform: probe.platform || '',
					error: probe.error || 'unknown',
				};
			}
		}

		this.cdr.detectChanges();
	}

	async enableBiometricLogin() {
		const label = this.biometricLabel;
		let password: string;
		try {
			const data: any = await this.env.showPrompt(
				{ code: 'Enter your password to enable {type} on this device', type: label },
				null,
				label,
				'Enable',
				'Cancel',
				[
					{
						name: 'password',
						type: 'password',
						placeholder: 'Password',
					},
				],
			);
			password = (data?.password || '').trim();
		} catch {
			return;
		}

		if (!password) {
			this.env.showMessage('Please enter password', 'warning');
			return;
		}

		const username = (this.env.user?.Email || this.env.user?.UserName || '').trim();
		if (!username) {
			this.env.showMessage('Unable to enable {type}', 'danger', { type: label });
			return;
		}

		try {
			await this.env.showLoading('Please wait for a few moments', async () => {
				const ok = await this.biometricAuth.enable(username, password);
				if (!ok) {
					throw new Error('enable-failed');
				}
			});
			await this.refreshBiometricStatus();
			this.env.showMessage('{type} enabled', 'success', { type: label });
		} catch {
			this.env.showMessage('Unable to enable {type}', 'danger', { type: label });
		}
	}

	async disableBiometricLogin() {
		try {
			await this.env.showPrompt(
				{ code: 'Disable {type} sign-in on this device?', type: this.biometricLabel },
				null,
				this.biometricLabel,
				'Disable',
				'Cancel',
			);
		} catch {
			return;
		}
		await this.biometricAuth.clearCredentials();
		await this.refreshBiometricStatus();
		this.env.showMessage('Biometric sign-in disabled', 'success');
	}

	logout() {
		event.preventDefault();
		event.stopPropagation();
		this.env.publishEvent({ Code: EVENT_TYPE.USER.LOGOUT_REQUESTED });
	}
}
