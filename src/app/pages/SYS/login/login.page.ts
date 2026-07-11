import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageBase } from 'src/app/page-base';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { UserProfileService } from '../../../services/auth/user-profile.service';
import { ExternalAuthService } from '../../../services/auth/external-auth.service';
import { EnvService } from 'src/app/services/core/env.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BRA_BranchProvider } from 'src/app/services/static/services.service';
import { CommonService } from 'src/app/services/core/common.service';
import { CustomService } from 'src/app/services/custom/custom.service';
import { environment, dogF } from 'src/environments/environment';
import { EVENT_TYPE } from 'src/app/services/static/event-type';
import { APIList } from 'src/app/services/static/global-variable';
import { firstValueFrom } from 'rxjs';
import { hasValidUserId } from 'src/app/interfaces/auth.interfaces';
import { getFirstAllowedFormUrlTree, UNAUTHORIZED_PATH } from 'src/app/guards/app.guard';

var URLSearchParams: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
	standalone: false,
})
export class LoginPage extends PageBase {
	password: string = '';
	email = '';
	formGroup: FormGroup;
	submitAttempt = false;
	returnUrl: string | undefined;
	showForgotPassword = false;
	partnerList = [];
	randomImg = '';
	private resumeAttempted = false;

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
		public commonService: CommonService,
		private router: Router,
	) {
		super();

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

	private async navigateAfterAuth(): Promise<void> {
		const rawReturn = (this.returnUrl ?? '').trim();
		if (rawReturn && rawReturn !== 'default') {
			const path = rawReturn.startsWith('/') ? rawReturn : `/${rawReturn}`;
			const allowed = await this.env.checkFormPermission(path);
			if (allowed) {
				await this.router.navigateByUrl(this.router.parseUrl(path), { replaceUrl: true });
				return;
			}
		}

		const firstAllowed = getFirstAllowedFormUrlTree(this.router, this.env);
		if (firstAllowed) {
			await this.router.navigateByUrl(firstAllowed, { replaceUrl: true });
			return;
		}

		if (hasValidUserId(this.env.user?.Id)) {
			await this.router.navigateByUrl(this.router.createUrlTree([UNAUTHORIZED_PATH]), { replaceUrl: true });
			return;
		}

		await this.router.navigateByUrl(this.router.createUrlTree(['/default']), { replaceUrl: true });
	}

	/** Resume khi có token + user từ cache (tránh kẹt login sau redirect nhầm). */
	private async tryResumeSession(): Promise<void> {
		if (this.resumeAttempted) {
			return;
		}
		this.resumeAttempted = true;

		const hasToken = !!this.env.storage?.app?.token?.access_token;
		if (!hasToken) {
			return;
		}

		if (!hasValidUserId(this.env.user?.Id)) {
			try {
				await this.profileService.getProfile();
			} catch {
				return;
			}
		}

		if (hasValidUserId(this.env.user?.Id)) {
			await this.navigateAfterAuth();
		}
	}

	preLoadData() {
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] ?? undefined;

		void this.tryResumeSession();

		if (!this.env.user?.Id) {
			this.env.getStorage('Username')?.then((v) => {
				this.formGroup.controls.UserName.setValue(v);
			});
		}
	}

	goBack() {
		void this.navigateAfterAuth();
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
			.showLoading('Please wait for a few moments', async () => {
				await this.authService.login({ username: account.UserName, password: account.Password });
				dogF && console.log('🔑 [LoginPage] Login successful, getting profile data...');
				await this.profileService.getProfile();
				dogF && console.log('✅ [LoginPage] Profile data loaded, navigating back...');
				await this.navigateAfterAuth();
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

				this.externalAuthService
					.handleOAuthCallback(provider, externalAccessToken)
					.then(async (data) => {
						dogF && console.log('🔑 [LoginPage] External login successful, loading user data...');
						await this.profileService.getProfile();
						dogF && console.log('✅ [LoginPage] User data loaded, navigating back...');
						loading.dismiss();
						await this.navigateAfterAuth();
					})
					.catch((err) => {
						loading.dismiss();
						this.env.showMessage('Unable to log in, please try again');
					});
			});
	}

	facebooklogin() {
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
						}
						loading.dismiss();
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
						}
						loading.dismiss();
					})
					.catch((err) => {
						loading.dismiss();
						this.env.showMessage('Unable to log in, please try again');
					});
			});
	}

	ionViewWillEnter() {
		super.ionViewWillEnter();
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] ?? undefined;
		this.env.publishEvent({ Code: EVENT_TYPE.APP.SHOW_MENU, Value: false });
		void this.tryResumeSession();
	}

	async forgotPassword(email: string = null): Promise<any> {
		dogF && console.log('🔐 [LoginPage] Requesting password reset...', { email });

		try {
			const data = { Email: email };

			const response = await firstValueFrom(
				this.commonService.connect(APIList.ACCOUNT.forgotPassword.method, APIList.ACCOUNT.forgotPassword.url, data),
			);

			return response;
		} catch (error) {
			dogF && console.error('❌ [LoginPage] Password reset request failed:', error);
			throw error;
		}
	}

	ionViewWillLeave() {
		this.env.publishEvent({ Code: EVENT_TYPE.APP.SHOW_MENU, Value: true });
	}
}
