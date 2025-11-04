import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { PageBase } from 'src/app/page-base';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { CommonService } from 'src/app/services/core/common.service';
import { EnvService } from 'src/app/services/core/env.service';
import { EVENT_TYPE } from 'src/app/services/static/event-type';
import { APIList } from 'src/app/services/static/global-variable';
import { dogF, environment } from 'src/environments/environment';

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
	standalone: false,
})
export class RegisterPage extends PageBase {
	constructor(
		public env: EnvService,
		public authService: AuthenticationService,
		public commonService: CommonService,
		public loadingCtrl: LoadingController,
		public navCtrl: NavController,
		public translate: TranslateService
	) {
		super();
		this.item = {
			// FullName: 'Mạc Thị Bưởi',
			// EmailAddress: 'host@codeart.vn',
			// PhoneNumber: '0908061119',
			// Password:'123123',
			// ConfirmPassword: '123123'
		};
	}

	events(e) {
		if (e.Code == EVENT_TYPE.APP.LOADED_LOCAL_DATA || e.Code == EVENT_TYPE.USER.CONTEXT_UPDATED) {
			this.preLoadData();
		}
	}

	preLoadData() {
		if (this.env.user && this.env.user.Id) {
			this.nav('/', 'back');
		}
	}

	postRegister() {
		this.loadingCtrl
			.create({
				message: 'Please wait for a few moments',
			})
			.then((loading) => {
				loading.present();

				this.register(this.item.EmailAddress, this.item.Password, this.item.ConfirmPassword, this.item.PhoneNumber, this.item.FullName)
					.then((data) => {
						loading.dismiss();
					})
					.catch((err) => {
						loading.dismiss();
						if (err.error && err.error.ModelState[''] && err.error.ModelState[''].toString().indexOf('already taken')) {
							this.env.showMessage('Email {{value}} has been registered. Please log in or register with another email.', '', this.item.EmailAddress);
						} else {
							this.env.showMessage('Registration failed. Please try again.');
						}
					});
			});
	}

	/**
	 * Register new user account
	 * Migrated from AccountService.register()
	 */
	async register(username: string, password: string, confirmpassword: string, PhoneNumber: string, FullName: string): Promise<any> {
		dogF &&
			console.log('📝 [RegisterPage] Starting user registration...', {
				username,
				hasPassword: !!password,
				hasPhone: !!PhoneNumber,
				hasFullName: !!FullName,
			});

		try {
			const data = {
				Email: username,
				Password: password,
				ConfirmPassword: confirmpassword,
				FullName: FullName,
				PhoneNumber: PhoneNumber,
			};

			dogF &&
				console.log('🌐 [RegisterPage] Calling registration API...', {
					url: APIList.ACCOUNT.register.url,
					method: APIList.ACCOUNT.register.method,
				});

			const response = await this.commonService.connect(APIList.ACCOUNT.register.method, APIList.ACCOUNT.register.url, data).toPromise();

			dogF && console.log('✅ [RegisterPage] Registration successful:', response);

			// Auto-login after successful registration
			dogF && console.log('🔑 [RegisterPage] Auto-login after registration...');
			await this.authService.login({ username, password });

			return response;
		} catch (error) {
			dogF && console.error('❌ [RegisterPage] Registration failed:', error);
			throw error;
		}
	}
}
