import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageBase } from 'src/app/page-base';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { UserProfileService } from '../../../services/auth/user-profile.service';
import { ExternalAuthService } from '../../../services/auth/external-auth.service';
import { EnvService } from 'src/app/services/core/env.service';
import { ActivatedRoute } from '@angular/router';
import { BRA_BranchProvider } from 'src/app/services/static/services.service';
import { CommonService } from 'src/app/services/core/common.service';
import { CustomService } from 'src/app/services/custom/custom.service';
import { environment, dog } from 'src/environments/environment';
import { EVENT_TYPE } from 'src/app/services/static/event-type';
import { APIList } from 'src/app/services/static/global-variable';

var URLSearchParams: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
	standalone: false,
})
export class LoginPage extends PageBase {
	password: string = '';
	formGroup: FormGroup;
	submitAttempt = false;
	returnUrl: string;
	showForgotPassword = false;
	partnerList = [];
	randomImg = '';

	constructor(
		public pageProvider: CustomService,
		public authService: AuthenticationService,
		public profileService: UserProfileService,
		public externalAuthService: ExternalAuthService,
		public env: EnvService,
		public partnerProvider: BRA_BranchProvider,

		public navCtrl: NavController,
		public formBuilder: FormBuilder,
		public loadingCtrl: LoadingController,
		public route: ActivatedRoute,
		public commonService: CommonService
	) {
		super();

		if (this.env.user && this.env.user.Id) {
			this.preLoadData();
		}
		this.formGroup = formBuilder.group({
			UserName: ['', Validators.compose([Validators.required])],
			Password: ['', Validators.compose([Validators.required])],
		});

		this.route.fragment.subscribe((fragment: string) => {
			if (!fragment) return;
			let external_access_token = fragment.match(/(?:external_access_token)\=([\S\s]*?)\&/)[1];
			let provider = fragment.match(/(?:provider)\=([\S\s]*?)\&/)[1];
			if (provider && external_access_token) this.ObtainLocalAccessToken(provider, external_access_token);
		});
	}

	events(e) {
		if (e.Code == EVENT_TYPE.APP.LOADED_LOCAL_DATA) {
			this.preLoadData();
		}
	}

	preLoadData() {
		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

		if (this.env.user && this.env.user.Id) {
			this.nav(this.returnUrl, 'back');
		}

		this.env.getStorage('Username')?.then((v) => {
			this.formGroup.controls.UserName.setValue(v);
		});
	}

	goBack() {
		this.nav(this.returnUrl, 'back');
		//this.navCtrl.back();
	}

	login() {
		if (this.formGroup.controls.UserName.value.indexOf('@') == -1) {
			this.formGroup.controls.UserName.setValue(this.formGroup.controls.UserName.value + '' + environment.loginEmail);
		}
		this.submitAttempt = true;
		if (!this.formGroup.valid) {
			return;
		}

		let account = this.formGroup.getRawValue();

		this.env
			.showLoading('Please wait for a few moments', this.authService.login({ username: account.UserName, password: account.Password }))
			.then(async (data) => {
				// After login success, get profile data and process through UserContextService
				dog && console.log('🔑 [LoginPage] Login successful, getting profile data...');
				await this.profileService.getProfile(); // Force reload fresh data
				dog && console.log('✅ [LoginPage] Profile data loaded, navigating back...');
				this.goBack();
			})
			.catch((err) => {
				if (err.error && typeof err.error.loaded == 'number' && err.error.loaded == 0) {
					this.env.showMessage('Cannot connect to tenant, please recheck', 'danger');
				} else if (err.error && err.error.error_description && err.error.error_description.indexOf('locked out') > -1) {
					this.env.showMessage('Account is not activated or being locked', 'danger');
				} else if (err.error && err.error.error_description && err.error.error_description.indexOf('user name or password is incorrect') > -1) {
					this.env.showMessage('Username or password is incorrect, please check again.', 'danger');
				} else {
					this.env.showMessage('Unable to log in, please try again', 'danger');
				}
			});
	}

	ObtainLocalAccessToken(provider, externalAccessToken) {
		this.loadingCtrl
			.create({
				message: 'Please wait for a few moments',
			})
			.then((loading) => {
				loading.present();

				this.externalAuthService.handleOAuthCallback(provider, externalAccessToken)
					.then(async (data) => {
						// Load user data after successful external login
						dog && console.log('🔑 [LoginPage] External login successful, loading user data...');
						await this.profileService.getProfile(); // Force reload fresh data
						dog && console.log('✅ [LoginPage] User data loaded, navigating back...');
						loading.dismiss();
						this.goBack();
					})
					.catch((err) => {
						loading.dismiss();
						this.env.showMessage('Unable to log in, please try again');
					});
			});
	}

	facebooklogin() {
		//TODO: facebook login
		//http://bitoftech.net/2014/08/11/asp-net-web-api-2-external-logins-social-logins-facebook-google-angularjs-app/
		//https://stackoverflow.com/questions/21065648/asp-net-web-api-2-how-to-login-with-external-authentication-services
		//1. GET /api/Account/ExternalLogins?returnUrl=%2F&generateState=true
		// => call Facebook provider URL
		//2. Redirected to http://hungvq-w10.local:54009/BOOKING/login#external_access_token=ggg&provider=Facebook&haslocalaccount=True&external_user_name=Hùng%20Vũ
		// => gọi ObtainLocalAccessToken => lấy token.

		this.loadingCtrl
			.create({
				message: 'Please wait for a few moments',
			})
			.then((loading) => {
				loading.present();

				this.externalAuthService
					.getLinkedProviders()
					.then((data: [any]) => {
						var it = data.filter((ite) => ite.Name == 'Facebook');
						if (it.length) {
							let ExternalLoginURL = environment.appDomain + it[0].Url;
							window.location.replace(ExternalLoginURL);
							//Sau khi pass chalenge lấy fragment từ URL redirect về và gọi ObtainLocalAccessToken(string provider, string externalAccessToken) để lấy token.
							//xem tiếp preLoadData()
						}
						loading.dismiss();
						// this.goBack();
					})
					.catch((err) => {
						loading.dismiss();
						this.env.showMessage('Unable to log in, please try again', 'danger');
					});
			});
	}

	googlelogin() {
		this.loadingCtrl
			.create({
				message: 'Please wait for a few moments',
			})
			.then((loading) => {
				loading.present();

				this.externalAuthService
					.getLinkedProviders()
					.then((data: [any]) => {
						var it = data.filter((ite) => ite.Name == 'Google');
						if (it.length) {
							let ExternalLoginURL = environment.appDomain + it[0].Url;
							window.location.replace(ExternalLoginURL);
							//Sau khi pass chalenge lấy fragment từ URL redirect về và gọi ObtainLocalAccessToken(string provider, string externalAccessToken) để lấy token.
							//xem tiếp preLoadData()
						}
						loading.dismiss();
						// this.goBack();
					})
					.catch((err) => {
						loading.dismiss();
						this.env.showMessage('Unable to log in, please try again');
					});
			});
	}

	ionViewWillEnter() {
		super.ionViewWillEnter();
		this.env.publishEvent({ Code: EVENT_TYPE.APP.SHOW_MENU, Value: false });
	}

	/**
	 * Request password reset
	 * Migrated from AccountService.forgotPassword()
	 */
	async forgotPassword(email: string): Promise<any> {
		dog && console.log('🔐 [LoginPage] Requesting password reset...', { email });

		try {
			const data = { Email: email };

			dog && console.log('🌐 [LoginPage] Calling forgot password API...', {
				url: APIList.ACCOUNT.forgotPassword.url,
				method: APIList.ACCOUNT.forgotPassword.method
			});

			const response = await this.commonService
				.connect(APIList.ACCOUNT.forgotPassword.method, APIList.ACCOUNT.forgotPassword.url, data)
				.toPromise();

			dog && console.log('✅ [LoginPage] Password reset request successful:', response);

			return response;
		} catch (error) {
			dog && console.error('❌ [LoginPage] Password reset request failed:', error);
			throw error;
		}
	}

	ionViewWillLeave() {
		this.env.publishEvent({ Code: EVENT_TYPE.APP.SHOW_MENU, Value: true });
	}
}
