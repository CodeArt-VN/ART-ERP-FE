import { DataTableMobileFilterService, MobileFilterClaim } from './data-table-mobile-filter.service';

describe('DataTableMobileFilterService', () => {
	let service: DataTableMobileFilterService;

	beforeEach(() => {
		service = new DataTableMobileFilterService();
	});

	it('returns false when no table claims the sheet', () => {
		expect(service.requestOpen()).toBeFalse();
	});

	it('opens the page table ahead of a larger table inside a modal', () => {
		const opened: string[] = [];
		service.requests$.subscribe((req) => {
			const claims: MobileFilterClaim[] = [
				{ inOverlay: true, area: 900, open: () => opened.push('modal') },
				{ inOverlay: false, area: 20, open: () => opened.push('page') },
			];
			for (const claim of claims) {
				req.register(claim);
			}
		});
		expect(service.requestOpen()).toBeTrue();
		expect(opened).toEqual(['page']);
	});

	it('clears the badge count only for the table that published it', () => {
		const page = {};
		const other = {};
		service.publishActiveCount(page, 2);
		expect(service.activeCount$.value).toBe(2);
		service.releaseActiveCount(other);
		expect(service.activeCount$.value).toBe(2);
		service.releaseActiveCount(page);
		expect(service.activeCount$.value).toBe(0);
	});
});
