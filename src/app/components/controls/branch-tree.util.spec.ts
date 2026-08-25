import { BranchTreeView } from './branch-tree.util';

describe('BranchTreeView', () => {
	const source: any[] = [
		{ Id: 1, IDParent: null, Name: 'Company', Type: 'Company', Code: 'C1' },
		{ Id: 2, IDParent: 1, Name: 'Dept A', Type: 'Department', Code: 'D1' },
		{ Id: 3, IDParent: 2, Name: 'Team B', Type: 'Department', Code: 'T1' },
	];

	it('does not mutate the original source items', () => {
		const before = source.map((i) => ({ ...i }));
		const view = new BranchTreeView(source, { showingMode: 'showAll' });
		view.toggle(1);
		view.search('Team');
		expect(source.every((s, idx) => s.Name === before[idx].Name && s.show === before[idx].show)).toBe(true);
		expect(view.workingItems).not.toBe(source);
	});

	it('resetPanelState restores default expand and clears search', () => {
		const view = new BranchTreeView(source, { showingMode: 'showAll' });
		view.toggle(2);
		view.search('Team');
		view.resetPanelState();
		expect(view.visibleItems.map((i) => i.Id)).toEqual([1, 2]);
	});

	it('expands root children by default (rootCollapsed != true)', () => {
		const view = new BranchTreeView(source, { showingMode: 'showAll' });
		expect(view.visibleItems.map((i) => i.Id)).toEqual([1, 2]);
	});

	it('shows only roots when rootCollapsed is true', () => {
		const view = new BranchTreeView(source, { showingMode: 'showAll', rootCollapsed: true });
		expect(view.visibleItems.map((i) => i.Id)).toEqual([1]);
	});

	it('expands children on toggle', () => {
		const view = new BranchTreeView(source, { showingMode: 'showAll' });
		expect(view.visibleItems.map((i) => i.Id)).toEqual([1, 2]);
		view.toggle(2);
		expect(view.visibleItems.map((i) => i.Id)).toEqual([1, 2, 3]);
		view.toggle(1);
		expect(view.visibleItems.map((i) => i.Id)).toEqual([1]);
	});

	it('filters by search term without losing tree matches', () => {
		const view = new BranchTreeView(source, { showingMode: 'showAll' });
		view.search('Team');
		const ids = view.visibleItems.map((i) => i.Id);
		expect(ids).toContain(3);
		expect(ids).toContain(2);
		expect(ids).toContain(1);
	});

	it('applies showingType filter on working copy only', () => {
		const view = new BranchTreeView(source, { showingMode: 'showAll', showingType: 'Department' });
		expect(view.workingItems.find((i) => i.Id === 1)?.disabled).toBe(true);
		expect(source.find((i) => i.Id === 1)?.disabled).toBeUndefined();
	});

	it('does not leak expand state between two views of the same source', () => {
		const a = new BranchTreeView(source, { showingMode: 'showAll' });
		const b = new BranchTreeView(source, { showingMode: 'showAll' });
		a.toggle(2);
		expect(a.visibleItems.map((i) => i.Id)).toEqual([1, 2, 3]);
		expect(b.visibleItems.map((i) => i.Id)).toEqual([1, 2]);
	});

	it('showingType Warehouse expands ancestors so nested warehouses are visible', () => {
		const warehouseSource = [
			{ Id: 10, IDParent: null, Name: 'ART', Type: 'Company', Code: 'ART' },
			{ Id: 20, IDParent: 10, Name: 'Office', Type: 'OfficeTitle', Code: 'OFF' },
			{ Id: 30, IDParent: 20, Name: 'Kho A', Type: 'Warehouse', Code: 'WH-A' },
			{ Id: 40, IDParent: 20, Name: 'Kho B', Type: 'Warehouse', Code: 'WH-B' },
		];
		const view = new BranchTreeView(warehouseSource, { showingMode: 'showAll', showingType: 'Warehouse' });
		const ids = view.visibleItems.map((i) => i.Id);
		expect(ids).toContain(30);
		expect(ids).toContain(40);
		expect(view.workingItems.find((i) => i.Id === 10)?.disabled).toBe(true);
		expect(view.workingItems.find((i) => i.Id === 30)?.disabled).toBe(false);
		expect(view.getLabelItems(30, 'Id')[0]?.Name).toBe('Kho A');
	});

	it('getLabelItems matches numeric and string ids', () => {
		const view = new BranchTreeView(source, { showingMode: 'showAll' });
		expect(view.getLabelItems(3, 'Id')[0]?.Name).toBe('Team B');
		expect(view.getLabelItems('3', 'Id')[0]?.Name).toBe('Team B');
	});

	it('firstSearchHitId is the first name/code match, not only the ancestor', () => {
		const view = new BranchTreeView(source, { showingMode: 'showAll' });
		view.search('Team');
		expect(view.firstSearchHitId()).toBe(3);
		expect(view.visibleItems[0].Id).toBe(1);
	});
});
