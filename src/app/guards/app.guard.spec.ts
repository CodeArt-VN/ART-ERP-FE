import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthGuard, authGuard, authenticatedGuard } from './app.guard';
import { EnvService } from '../services/core/env.service';
import { UserContextService } from '../services/auth/user-context.service';
import { UserProfileService } from '../services/auth/user-profile.service';

describe('AuthGuard', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				AuthGuard,
				{
					provide: Router,
					useValue: {
						config: [],
						createUrlTree: jasmine.createSpy('createUrlTree').and.returnValue({} as UrlTree),
						parseUrl: jasmine.createSpy('parseUrl').and.returnValue({} as UrlTree),
					},
				},
				{
					provide: EnvService,
					useValue: {
						ready: Promise.resolve(),
						checkFormPermission: () => Promise.resolve(true),
						showMessage: jasmine.createSpy('showMessage'),
						publishEvent: jasmine.createSpy('publishEvent'),
						user: null,
						storage: { app: { token: null } },
					},
				},
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
});
