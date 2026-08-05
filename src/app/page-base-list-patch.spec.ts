import { PageBase } from 'src/app/page-base';

/** Minimal stand-in — exercises list-patch helpers without Ionic DI. */
class ListPatchHarness extends PageBase {
	constructor() {
		super();
		this.query = { Keyword: '', Take: 200, Skip: 0 };
		this.pageConfig = { ...(this.pageConfig || {}), sort: [], isDetailPage: false } as any;
		this.items = [];
	}
}

describe('PageBase list patch helpers', () => {
	it('hasEnoughListShape requires sample keys on data', () => {
		const page = new ListPatchHarness();
		const sample = { Id: 1, CustomerName: 'A', PartyDate: '2026-07-31', StatusText: 'X', checked: false };
		expect(page.hasEnoughListShape({ Id: 2, CustomerName: 'B', PartyDate: '2026-07-31' }, sample)).toBeTrue();
		expect(page.hasEnoughListShape({ Id: 2, CustomerName: 'B' }, sample)).toBeFalse();
	});

	it('matchesListQuery ignores paging and compares PartyDate by day', () => {
		const page = new ListPatchHarness();
		page.query = { PartyDate: '2026-07-31', Status: '', Skip: 0, Take: 200, SortBy: '[Id_desc]' };
		expect(page.matchesListQuery({ PartyDate: '2026-07-31T18:00:00', Status: 'WAITING' })).toBeTrue();
		expect(page.matchesListQuery({ PartyDate: '2026-07-30T18:00:00', Status: 'WAITING' })).toBeFalse();
	});

	it('insertListItemSorted places by Id DESC by default', () => {
		const page = new ListPatchHarness();
		page.items = [
			{ Id: 30, Name: 'c' },
			{ Id: 20, Name: 'b' },
			{ Id: 10, Name: 'a' },
		];
		page.insertListItemSorted({ Id: 25, Name: 'new' });
		expect(page.items.map((i) => i.Id)).toEqual([30, 25, 20, 10]);
	});

	it('applyListEvent edit patches in place without refresh', () => {
		const page = new ListPatchHarness();
		page.items = [
			{ Id: 5, CustomerName: 'Old', PartyDate: '2026-07-31' },
			{ Id: 6, CustomerName: 'Other', PartyDate: '2026-07-31' },
		];
		page.query = { PartyDate: '2026-07-31', Skip: 0, Take: 200 };
		let refreshed = false;
		page.refresh = (() => {
			refreshed = true;
		}) as any;

		page.applyListEvent({
			Action: 'upsert',
			Id: 5,
			Data: { Id: 5, CustomerName: 'New', PartyDate: '2026-07-31' },
		});

		expect(refreshed).toBeFalse();
		expect(page.items[0].CustomerName).toBe('New');
		expect(page.items[0]).not.toBe(page.items[1]);
	});

	it('applyListEvent create inserts when shape matches top-1', () => {
		const page = new ListPatchHarness();
		page.items = [{ Id: 10, CustomerName: 'A', PartyDate: '2026-07-31', Status: 'WAITING' }];
		page.query = { PartyDate: '2026-07-31', Skip: 0, Take: 200 };

		page.applyListEvent({
			Action: 'upsert',
			Id: 99,
			Data: { Id: 99, CustomerName: 'B', PartyDate: '2026-07-31', Status: 'WAITING' },
		});

		expect(page.items.length).toBe(2);
		expect(page.items.some((i) => i.Id === 99)).toBeTrue();
	});

	it('applyListEvent create skips insert when outside filter', () => {
		const page = new ListPatchHarness();
		page.items = [{ Id: 10, CustomerName: 'A', PartyDate: '2026-07-31', Status: 'WAITING' }];
		page.query = { PartyDate: '2026-07-31', Skip: 0, Take: 200 };

		page.applyListEvent({
			Action: 'upsert',
			Id: 99,
			Data: { Id: 99, CustomerName: 'B', PartyDate: '2026-07-30', Status: 'WAITING' },
		});

		expect(page.items.length).toBe(1);
	});

	it('applyListEvent delete removes by Ids', () => {
		const page = new ListPatchHarness();
		page.items = [{ Id: 1 }, { Id: 2 }, { Id: 3 }];
		page.applyListEvent({ Action: 'delete', Ids: [1, 3] });
		expect(page.items.map((i) => i.Id)).toEqual([2]);
	});

	it('applyListEvent without Data falls back to refresh', () => {
		const page = new ListPatchHarness();
		let refreshed = false;
		page.refresh = (() => {
			refreshed = true;
		}) as any;
		page.applyListEvent({ Code: 'attendance-booking' });
		expect(refreshed).toBeTrue();
	});
});
