import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { UserProfileService } from 'src/app/services/auth/user-profile.service';
import { EnvService } from 'src/app/services/core/env.service';
import { getFirstAllowedFormUrlTree } from 'src/app/guards/app.guard';
import { EVENT_TYPE } from 'src/app/services/static/event-type';

@Component({
	selector: 'app-unauthorized',
	templateUrl: './unauthorized.page.html',
	styleUrls: ['./unauthorized.page.scss'],
	standalone: false,
})
export class UnauthorizedPage extends PageBase {
	loading = false;

	constructor(
		public env: EnvService,
		public navCtrl: NavController,
		private router: Router,
		private authService: AuthenticationService,
		private profileService: UserProfileService,
	) {
		super();
	}

	async retryProfile() {
		this.loading = true;
		try {
			await this.profileService.getProfile();
			const tree = getFirstAllowedFormUrlTree(this.router, this.env);
			if (tree) {
				await this.router.navigateByUrl(tree, { replaceUrl: true });
			} else {
				this.env.showMessage('You still have no authorised forms. Please contact Admin.', 'warning');
			}
		} catch {
			this.env.showMessage('Unable to reload permissions. Please try again.', 'danger');
		} finally {
			this.loading = false;
		}
	}

	async logout() {
		await this.authService.logout();
	}

	ionViewWillEnter() {
		super.ionViewWillEnter();
		this.env.publishEvent({ Code: EVENT_TYPE.APP.SHOW_MENU, Value: false });
	}

	ionViewWillLeave() {
		this.env.publishEvent({ Code: EVENT_TYPE.APP.SHOW_MENU, Value: true });
	}
}
