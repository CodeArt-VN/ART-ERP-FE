import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EnvService } from '../services/core/env.service';
import { UserContextService } from '../services/auth/user-context.service';
import { dogF } from 'src/environments/environment';
import { EVENT_TYPE } from '../services/static/event-type';
import { NavController } from '@ionic/angular';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(
		public navCtrl: NavController,
		public router: Router,
		public env: EnvService,
		public userContextService: UserContextService
	) {}

	// canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
	// 	dog && console.log('🔒 [AuthGuard] canActivate');
	// 	return new Promise<boolean>((resolve) => {
	// 		this.checkCanUse(next, state).then((result) => {
	// 			resolve(result);
	// 		});
	// 	});
	// }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		dogF && console.log('�� [AuthGuard] canActivate for route:', state.url);

		return new Promise<boolean>(async (resolve) => {
			try {
				this.env.ready.then(async (_) => {
					dogF && console.log('✅ [AuthGuard] Environment ready, checking permissions...');
					const result = await this.checkCanUse(next, state);
					resolve(result);
					dogF && console.log('✅ [AuthGuard] Permissions checked:', result);
				});
			} catch (error) {
				dogF && console.error('❌ [AuthGuard] Error waiting for environment:', error);

				// Fallback: redirect to login
				this.env.showMessage('System is initializing, please try again', 'warning');
				this.router.navigate(['/login'], {
					queryParams: { returnUrl: state.url },
				});
				resolve(false);
			}
		});
	}

	checkCanUse(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return new Promise<boolean>((resolve) => {
			this.env.checkFormPermission(state.url).then((result: Boolean) => {
				if (result) {
					resolve(true);
				} else {
					if (this.env.user && this.env.user.Id) {
						let firstView = this.env.user.Forms.filter((m) => {
							if (!(m.Type == 0 || m.Type == 1 || m.Type == 2)) {
								return false;
							}
							const formCodeWithSlash = m.Code + '/';
							return this.router.config.some((r) => ((r?.path || '') + '/').startsWith(formCodeWithSlash));
						});
						if (firstView.length) {
							if (state.url != '/default') {
								this.env.showMessage('You are not authorized to access here. System would transfer to authorised page.', 'warning');
							}
							//this.router.navigateByUrl(firstView[0].Code);
							this.navCtrl.navigateBack(firstView[0].Code);
							resolve(false);
						} else {
							// not have any form so redirect to login page with the return url
							this.env.showMessage('You are not authorized to access here, please contact Admin to get authorisation', 'warning');
							this.env.publishEvent({ Code: EVENT_TYPE.USER.LOGOUT_REQUESTED });
							resolve(false);
						}
					} else {
						// not logged in so redirect to login page with the return url
						this.env.showMessage('You are not authorized to access here, please log in again or use another account.', 'warning');

						this.navCtrl.navigateForward('/login', {
							queryParams: { returnUrl: state.url },
						});
						// this.router.navigate(['/login'], {
						// 	queryParams: { returnUrl: state.url },
						// });
						resolve(false);
					}
				}
			});
		});
	}
}
