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

	it('indents each child one step past its parent', () => {
		const view = new BranchTreeView(source, { showingMode: 'showAll' });
		const indent = (id: number) => {
			const levels = view.workingItems.find((i) => i.Id === id)?.levels || [];
			return levels.slice(1).length;
		};
		expect(indent(1)).toBe(0);
		expect(indent(2)).toBe(1);
		expect(indent(3)).toBe(2);
	});

	it('keeps levels that were already computed', () => {
		const preset = [
			{ Id: 1, IDParent: null, Name: 'Company', Type: 'Company', levels: ['preset'] },
			{ Id: 2, IDParent: 1, Name: 'Dept A', Type: 'Department', levels: ['preset', 'Company'] },
		];
		const view = new BranchTreeView(preset, { showingMode: 'showAll' });
		expect(view.workingItems.find((i) => i.Id === 1)?.levels).toEqual(['preset']);
		expect(view.workingItems.find((i) => i.Id === 2)?.levels).toEqual(['preset', 'Company']);
	});

	it('selected department keeps the full parent chain and descendant job titles', () => {
		const source = [
			{ Id: 1, IDParent: null, Name: 'Company', Type: 'Company', disabled: true },
			{ Id: 2, IDParent: 1, Name: 'Division', Type: 'Department', disabled: true },
			{ Id: 3, IDParent: 2, Name: 'Dept', Type: 'Department', disabled: true },
			{ Id: 4, IDParent: 3, Name: 'Lead', Type: 'TitlePosition', disabled: false },
			{ Id: 5, IDParent: 4, Name: 'Staff', Type: 'TitlePosition', disabled: false },
			{ Id: 6, IDParent: 3, Name: 'Locked title', Type: 'TitlePosition', disabled: true },
			{ Id: 9, IDParent: 1, Name: 'Other division', Type: 'Department', disabled: true },
			{ Id: 10, IDParent: 9, Name: 'Other title', Type: 'TitlePosition', disabled: false },
		];
		const view = new BranchTreeView(source, {
			selectedBranch: 3,
			showingType: 'TitlePosition',
			showingKeepDisabled: true,
		});

		expect(view.workingItems.map((i) => i.Id)).toEqual([1, 2, 3, 4, 5, 6]);
		expect(view.workingItems.find((i) => i.Id === 1)?.disabled).toBe(true);
		expect(view.workingItems.find((i) => i.Id === 2)?.disabled).toBe(true);
		expect(view.workingItems.find((i) => i.Id === 4)?.disabled).toBe(false);
		expect(view.workingItems.find((i) => i.Id === 6)?.disabled).toBe(true);
		expect(view.workingItems.find((i) => i.Id === 5)?.levels?.slice(1)).toEqual(['Company', 'Division', 'Dept', 'Lead']);

		const visible = view.visibleItems.map((i) => i.Id);
		expect(visible).toEqual([1, 2, 3, 4, 5]);
		expect(source.find((i) => i.Id === 4)?.disabled).toBe(false);
	});

	it('showingType still re-enables a node unless showingKeepDisabled is set', () => {
		const source = [{ Id: 1, IDParent: null, Name: 'Locked title', Type: 'TitlePosition', disabled: true }];
		const overwritten = new BranchTreeView(source, { showingMode: 'showAll', showingType: 'TitlePosition' });
		const kept = new BranchTreeView(source, { showingMode: 'showAll', showingType: 'TitlePosition', showingKeepDisabled: true });
		expect(overwritten.workingItems[0].disabled).toBe(false);
		expect(kept.workingItems[0].disabled).toBe(true);
	});

	it('firstSearchHitId is the first name/code match, not only the ancestor', () => {
		const view = new BranchTreeView(source, { showingMode: 'showAll' });
		view.search('Team');
		expect(view.firstSearchHitId()).toBe(3);
		expect(view.visibleItems[0].Id).toBe(1);
	});
});
