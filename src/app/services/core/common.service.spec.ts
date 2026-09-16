import { TestBed } from '@angular/core/testing';

import { CommonService } from './common.service';

describe('CommonService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: CommonService = TestBed.inject(CommonService);
		expect(service).toBeTruthy();
	});
});
