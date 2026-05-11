import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthGuard, authGuard } from './app.guard';
import { EnvService } from '../services/core/env.service';
import { UserContextService } from '../services/auth/user-context.service';

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
					},
				},
				{ provide: UserContextService, useValue: {} },
			],
		});
	});

	it('injects AuthGuard', () => {
		expect(TestBed.inject(AuthGuard)).toBeTruthy();
	});

	it('exports authGuard as a CanActivateFn', () => {
		expect(typeof authGuard).toBe('function');
	});
});
