import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './app.guard';

describe('AppGuard', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AuthGuard],
		});
	});

	it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
		expect(guard).toBeTruthy();
	}));
});
