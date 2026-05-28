import { inject, Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateFn,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { EnvService } from '../services/core/env.service';
import { UserContextService } from '../services/auth/user-context.service';
import { dogF } from 'src/environments/environment';
import { EVENT_TYPE } from '../services/static/event-type';

type AuthGuardContext = {
	router: Router;
	env: EnvService;
};

/** Build a UrlTree from a form `Code` path (with or without leading `/`). */
function formCodeToUrlTree(router: Router, code: string | undefined): UrlTree {
	const trimmed = (code ?? '').trim();
	if (!trimmed) {
		return router.createUrlTree(['/default']);
	}
	const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
	return router.parseUrl(path);
}

/**
 * Shared auth + permission logic for both functional and class-based guards.
 * Redirects use UrlTree (Angular router guard standard).
 */
async function runAuthGuard(
	_next: ActivatedRouteSnapshot,
	state: RouterStateSnapshot,
	ctx: AuthGuardContext,
): Promise<boolean | UrlTree> {
	const { router, env } = ctx;

	try {
		if (env.ready) {
			await env.ready;
		}
	} catch (error) {
		dogF && console.error('[AuthGuard] Error waiting for environment:', error);
		env.showMessage('System is initializing, please try again', 'warning');
		return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
	}

	dogF && console.log('[AuthGuard] Environment ready, checking permissions for:', state.url);

	const allowed = await env.checkFormPermission(state.url);
	dogF && console.log('[AuthGuard] Permissions checked:', allowed);

	if (allowed) {
		return true;
	}

	if (env.user && env.user.Id) {
		const isValidForm = (m: { Type?: number; Code?: string }) => {
			if (!(m.Type == 0 || m.Type == 1 || m.Type == 2)) {
				return false;
			}
			const formCodeWithSlash = ((m.Code || '').replace(/^\/+|\/+$/g, '') || '') + '/';
			return !!m.Code && router.config.some((r) => ((r?.path || '') + '/').startsWith(formCodeWithSlash));
		};

		let pinnedIds: unknown[] = [];
		const pinnedValue = env.user?.UserSetting?.PinnedForms?.Value;
		if (Array.isArray(pinnedValue)) {
			pinnedIds = pinnedValue;
		} else if (typeof pinnedValue == 'string' && pinnedValue) {
			try {
				const parsed = JSON.parse(pinnedValue);
				pinnedIds = Array.isArray(parsed) ? parsed : [];
			} catch {
				pinnedIds = [];
			}
		} else if (pinnedValue && typeof pinnedValue == 'object') {
			pinnedIds = Array.isArray(pinnedValue) ? pinnedValue : [];
		}

		let firstView: Array<{ Id?: unknown; Code?: string }> = [];
		if (pinnedIds.length) {
			firstView = pinnedIds
				.map((id) => env.user.Forms.find((f: { Id?: unknown }) => f.Id == id))
				.filter((f): f is NonNullable<typeof f> => !!f && isValidForm(f));
		}

		if (!firstView.length) {
			firstView = env.user.Forms.filter((m: { Type?: number; Code?: string }) => isValidForm(m));
		}
		if (firstView.length) {
			if (state.url != '/default') {
				env.showMessage('You are not authorized to access here. System would transfer to authorised page.', 'warning');
			}
			return formCodeToUrlTree(router, firstView[0].Code);
		}

		env.showMessage('You are not authorized to access here, please contact Admin to get authorisation', 'warning');
		env.publishEvent({ Code: EVENT_TYPE.USER.LOGOUT_REQUESTED });
		return false;
	}

	env.showMessage('You are not authorized to access here, please log in again or use another account.', 'warning');
	return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
}

/** Functional guard — use `inject()` in Angular injection context (e.g. `canActivate: [authGuard]`). */
export const authGuard: CanActivateFn = (next, state) => {
	return runAuthGuard(next, state, {
		router: inject(Router),
		env: inject(EnvService),
	});
};

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(
		public router: Router,
		public env: EnvService,
		public userContextService: UserContextService,
	) {}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		dogF && console.log('[AuthGuard] canActivate for route:', state.url);
		return runAuthGuard(next, state, {
			router: this.router,
			env: this.env,
		});
	}
}
