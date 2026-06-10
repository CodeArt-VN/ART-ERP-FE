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
import { UserProfileService } from '../services/auth/user-profile.service';
import { dogF } from 'src/environments/environment';
import { EVENT_TYPE } from '../services/static/event-type';
import { hasValidUserId } from '../interfaces/auth.interfaces';

export const UNAUTHORIZED_PATH = '/unauthorized';

type AuthGuardContext = {
	router: Router;
	env: EnvService;
	profileService?: UserProfileService;
};

/** Build a UrlTree from a form `Code` path (with or without leading `/`). */
export function formCodeToUrlTree(router: Router, code: string | undefined): UrlTree {
	const trimmed = (code ?? '').trim();
	if (!trimmed) {
		return router.createUrlTree(['/default']);
	}
	const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
	return router.parseUrl(path);
}

function hasAccessToken(env: EnvService): boolean {
	return !!env.storage?.app?.token?.access_token;
}

function isValidFormRoute(router: Router, m: { Type?: number; Code?: string }): boolean {
	if (!(m.Type == 0 || m.Type == 1 || m.Type == 2)) {
		return false;
	}
	const formCodeWithSlash = ((m.Code || '').replace(/^\/+|\/+$/g, '') || '') + '/';
	return !!m.Code && router.config.some((r) => ((r?.path || '') + '/').startsWith(formCodeWithSlash));
}

/** Pinned first, then first valid form — nhánh giữ nguyên theo plan. */
export function getFirstAllowedFormUrlTree(router: Router, env: EnvService): UrlTree | null {
	if (!hasValidUserId(env.user?.Id) || !env.user?.Forms?.length) {
		return null;
	}

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
			.filter((f): f is NonNullable<typeof f> => !!f && isValidFormRoute(router, f));
	}
	if (!firstView.length) {
		firstView = env.user.Forms.filter((m: { Type?: number; Code?: string }) => isValidFormRoute(router, m));
	}
	if (!firstView.length) {
		return null;
	}
	return formCodeToUrlTree(router, firstView[0].Code);
}

function loginUrlTree(router: Router, returnUrl: string): UrlTree {
	return router.createUrlTree(['/login'], { queryParams: { returnUrl } });
}

/** Token có nhưng chưa có profile cache — await getProfile (edge case). */
async function ensureUserProfileForGuard(ctx: AuthGuardContext, returnUrl: string): Promise<boolean | UrlTree> {
	if (!hasAccessToken(ctx.env)) {
		return true;
	}
	if (hasValidUserId(ctx.env.user?.Id)) {
		return true;
	}
	if (!ctx.profileService) {
		return true;
	}

	try {
		dogF && console.log('[AuthGuard] Token without profile cache — loading getProfile');
		await ctx.profileService.getProfile();
		return true;
	} catch (error: any) {
		dogF && console.error('[AuthGuard] getProfile failed:', error);
		if (error?.status === 401) {
			ctx.env.publishEvent({ Code: EVENT_TYPE.USER.LOGOUT_REQUESTED });
			return loginUrlTree(ctx.router, returnUrl);
		}
		return true;
	}
}

/** Quyết định redirect khi đã có/không có quyền route. */
export async function resolveDeniedRoute(
	router: Router,
	env: EnvService,
	targetUrl: string,
	options?: { showRedirectMessage?: boolean },
): Promise<UrlTree | false> {
	if (!hasValidUserId(env.user?.Id)) {
		env.showMessage('You are not authorized to access here, please log in again or use another account.', 'warning');
		return loginUrlTree(router, targetUrl);
	}

	const firstAllowed = getFirstAllowedFormUrlTree(router, env);
	if (firstAllowed) {
		if (options?.showRedirectMessage !== false && targetUrl != '/default') {
			env.showMessage('You are not authorized to access here. System would transfer to authorised page.', 'warning');
		}
		return firstAllowed;
	}

	env.showMessage('You are not authorized to access here, please contact Admin to get authorisation', 'warning');
	if (hasAccessToken(env)) {
		return router.createUrlTree([UNAUTHORIZED_PATH]);
	}
	env.publishEvent({ Code: EVENT_TYPE.USER.LOGOUT_REQUESTED });
	return false;
}

/**
 * Sau CONTEXT_UPDATED / getProfile — re-check route đang mở (optional plan).
 */
export async function recheckCurrentRoutePermission(
	router: Router,
	env: EnvService,
	profileService?: UserProfileService,
): Promise<void> {
	const path = router.url.split('?')[0].split('#')[0];
	if (!path || path === '/login' || path === UNAUTHORIZED_PATH || path === '/not-found') {
		return;
	}

	if (hasAccessToken(env) && !hasValidUserId(env.user?.Id) && profileService) {
		try {
			await profileService.getProfile();
		} catch {
			return;
		}
	}

	const allowed = await env.checkFormPermission(path);
	if (allowed) {
		return;
	}

	const result = await resolveDeniedRoute(router, env, path);
	if (result === false) {
		return;
	}
	if (result instanceof UrlTree) {
		const current = router.parseUrl(router.url);
		if (result.toString() !== current.toString()) {
			await router.navigateByUrl(result, { replaceUrl: true });
		}
	}
}

/**
 * Shared auth + permission logic for both functional and class-based guards.
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
		return loginUrlTree(router, state.url);
	}

	const profileReady = await ensureUserProfileForGuard(ctx, state.url);
	if (profileReady !== true) {
		return profileReady;
	}

	dogF && console.log('[AuthGuard] Environment ready, checking permissions for:', state.url);

	const allowed = await env.checkFormPermission(state.url);
	dogF && console.log('[AuthGuard] Permissions checked:', allowed);

	if (allowed) {
		return true;
	}

	const denied = await resolveDeniedRoute(router, env, state.url);
	if (denied === false) {
		return false;
	}
	return denied;
}

/** Đã authenticated (có token) — dùng cho /unauthorized. */
export const authenticatedGuard: CanActivateFn = (_next, state) => {
	const router = inject(Router);
	const env = inject(EnvService);
	if (hasAccessToken(env)) {
		return true;
	}
	return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};

/** Functional guard — use `inject()` in Angular injection context (e.g. `canActivate: [authGuard]`). */
export const authGuard: CanActivateFn = (next, state) => {
	return runAuthGuard(next, state, {
		router: inject(Router),
		env: inject(EnvService),
		profileService: inject(UserProfileService),
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
		public profileService: UserProfileService,
	) {}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		dogF && console.log('[AuthGuard] canActivate for route:', state.url);
		return runAuthGuard(next, state, {
			router: this.router,
			env: this.env,
			profileService: this.profileService,
		});
	}
}
