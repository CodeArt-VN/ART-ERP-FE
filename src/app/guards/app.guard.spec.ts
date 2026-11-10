import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthGuard, authGuard, authenticatedGuard } from './app.guard';
import { EnvService } from '../services/core/env.service';
import { UserContextService } from '../services/auth/user-context.service';
import { UserProfileService } from '../services/auth/user-profile.service';

describe('AuthGuard', () => {
	let envStub: {
		ready: Promise<void>;
		checkFormPermission: () => Promise<boolean>;
		showMessage: jasmine.Spy;
		publishEvent: jasmine.Spy;
		user: unknown;
		storage: { app: { token: { access_token?: string } | null } };
	};
	let routerStub: { config: unknown[]; createUrlTree: jasmine.Spy; parseUrl: jasmine.Spy };

	beforeEach(() => {
		envStub = {
			ready: Promise.resolve(),
			checkFormPermission: () => Promise.resolve(true),
			showMessage: jasmine.createSpy('showMessage'),
			publishEvent: jasmine.createSpy('publishEvent'),
			user: null,
			storage: { app: { token: null } },
		};
		routerStub = {
			config: [],
			createUrlTree: jasmine.createSpy('createUrlTree').and.returnValue({} as UrlTree),
			parseUrl: jasmine.createSpy('parseUrl').and.returnValue({} as UrlTree),
		};
		TestBed.configureTestingModule({
			providers: [
				AuthGuard,
				{ provide: Router, useValue: routerStub },
				{ provide: EnvService, useValue: envStub },
				{ provide: UserContextService, useValue: {} },
				{ provide: UserProfileService, useValue: { getProfile: () => Promise.resolve() } },
			],
		});
	});

	it('injects AuthGuard', () => {
		expect(TestBed.inject(AuthGuard)).toBeTruthy();
	});

	it('exports authGuard as a CanActivateFn', () => {
		expect(typeof authGuard).toBe('function');
	});

	it('exports authenticatedGuard as a CanActivateFn', () => {
		expect(typeof authenticatedGuard).toBe('function');
	});

	it('authenticatedGuard waits for env.ready then allows token session', async () => {
		let resolveReady!: () => void;
		envStub.ready = new Promise<void>((r) => {
			resolveReady = r;
		});
		envStub.storage.app.token = { access_token: 't' };

		const state = { url: '/ui-kit' } as any;
		const next = {} as any;
		let settled: boolean | UrlTree | undefined;
		const pending = Promise.resolve(
			TestBed.runInInjectionContext(() => authenticatedGuard(next, state))
		).then((v) => {
			settled = v as boolean | UrlTree;
			return settled;
		});

		expect(settled).toBeUndefined();
		resolveReady();
		await expectAsync(pending).toBeResolvedTo(true);
	});

	it('authenticatedGuard redirects to login when no token after ready', async () => {
		envStub.storage.app.token = null;
		const loginTree = { path: 'login' } as unknown as UrlTree;
		routerStub.createUrlTree.and.returnValue(loginTree);

		const result = await Promise.resolve(
			TestBed.runInInjectionContext(() => authenticatedGuard({} as any, { url: '/ui-kit' } as any))
		);
		expect(result).toBe(loginTree);
		expect(routerStub.createUrlTree).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: '/ui-kit' } });
	});
});
