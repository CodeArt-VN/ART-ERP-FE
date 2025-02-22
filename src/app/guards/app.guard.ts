import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EnvService } from '../services/core/env.service';
import { AccountService } from '../services/account.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(
		public router: Router,
		public env: EnvService,
		public accountService: AccountService
	) {}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return new Promise<boolean>((resolve) => {
			if (!this.env.isloaded) {
				this.accountService
					.loadSavedData()
					.then((_) => {
						return this.checkCanUse(next, state).then((result) => {
							resolve(result);
						});
					})
					.catch((err) => {
						this.accountService.commonService.checkError(err);
					});
			} else {
				return this.checkCanUse(next, state).then((result) => {
					resolve(result);
				});
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
						let firstView = this.env.user.Forms.filter((m) => m.Type == 0 || m.Type == 1 || m.Type == 2);
						if (firstView.length) {
							if (state.url != '/default') {
								this.env.showMessage('You are not authorized to access here. System would transfer to authorised page.', 'warning');
							}
							this.router.navigateByUrl(firstView[0].Code);
							resolve(false);
						} else {
							// not logged in so redirect to login page with the return url
							this.env.showMessage('You are not authorized to access here, please contact Admin to get authorisation', 'warning');
							this.accountService.logout().then((_) => {
								this.router.navigate(['/login'], {
									queryParams: { returnUrl: state.url },
								});
								resolve(false);
							});
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
