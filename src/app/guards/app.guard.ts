import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EnvService } from '../services/core/env.service';
import { UserProfileService } from '../services/auth/user-profile.service';
import { dogF } from 'src/environments/environment';
import { EVENT_TYPE } from '../services/static/event-type';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(
		public router: Router,
		public env: EnvService,
		private userProfileService: UserProfileService
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
		return new Promise<boolean>(async (resolve) => {
			if (this.env.user && this.env.user.Id) {
				try {
					await this.userProfileService.validateAccountStatus();
				} catch (error: any) {
					if (error?.message === 'USER_PROFILE_INVALID_STAFF_ID') {
						resolve(false);
						return;
					}
					dogF && console.warn('[AuthGuard] Account status check failed, continue with local permissions:', error);
				}
			}

			this.env.checkFormPermission(state.url).then((result: Boolean) => {
				if (result) {
					resolve(true);
				} else {
					if (this.env.user && this.env.user.Id) {
						let firstView = this.env.user.Forms.filter((m) => m.Type == 0 || m.Type == 1 || m.Type == 2);
						if (firstView.length) {
							if (state.url != '/default') {
								this.env.showMessage('You are not authorized to access here. System would transfer to authorised page.', 'warning');
							}
							this.router.navigateByUrl(firstView[0].Code);
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

						this.router.navigate(['/login'], {
							queryParams: { returnUrl: state.url },
						});
						resolve(false);
					}
				}
			});
		});
	}
}
