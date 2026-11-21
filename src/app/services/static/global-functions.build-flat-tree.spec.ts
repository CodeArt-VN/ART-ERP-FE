import { lib } from './global-functions';

describe('lib.buildFlatTree', () => {
	it('preserves expanded show flags when treeState shares object refs with items', async () => {
		const root: any = { Id: 1, IDParent: null, Name: 'Root', Sort: 1 };
		const child: any = { Id: 2, IDParent: 1, Name: 'Child', Sort: 1 };
		const grandchild: any = { Id: 3, IDParent: 2, Name: 'Grand', Sort: 1 };
		const items = [root, child, grandchild];

		const first = (await lib.buildFlatTree(items, [], true)) as any[];
		expect(first.filter((r) => r.show !== false).map((r) => r.Id)).toEqual([1, 2, 3]);

		const patchedGrand = { ...grandchild, Name: 'Grand-edited' };
		const itemsAfterEdit = [root, child, patchedGrand];
		const treeState = first;

		const rebuilt = (await lib.buildFlatTree(itemsAfterEdit, treeState, true)) as any[];
		const visible = rebuilt.filter((r) => r.show !== false).map((r) => r.Id);

		expect(visible).toEqual([1, 2, 3]);
		expect(rebuilt.find((r) => r.Id === 3).Name).toBe('Grand-edited');
	});

	it('keeps collapsed children hidden when prior showdetail was false', async () => {
		const root: any = { Id: 1, IDParent: null, Name: 'Root', Sort: 1, show: true, showdetail: false };
		const child: any = { Id: 2, IDParent: 1, Name: 'Child', Sort: 1, show: false, showdetail: false };
		const treeState = [root, child];
		const items = [
			{ Id: 1, IDParent: null, Name: 'Root', Sort: 1 },
			{ Id: 2, IDParent: 1, Name: 'Child', Sort: 1 },
		];

		const rebuilt = (await lib.buildFlatTree(items, treeState, false)) as any[];
		expect(rebuilt.find((r) => r.Id === 1).show).toBe(true);
		expect(rebuilt.find((r) => r.Id === 1).showdetail).toBe(false);
		expect(rebuilt.find((r) => r.Id === 2).show).toBe(false);
	});

	it('shows newly created child under an expanded parent', async () => {
		const root: any = { Id: 1, IDParent: null, Name: 'Root', Sort: 1 };
		const child: any = { Id: 2, IDParent: 1, Name: 'Child', Sort: 1 };
		const first = (await lib.buildFlatTree([root, child], [], true)) as any[];

		const created: any = { Id: 3, IDParent: 1, Name: 'Created', Sort: 2 };
		const rebuilt = (await lib.buildFlatTree([root, child, created], first, true)) as any[];

		expect(rebuilt.filter((r) => r.show !== false).map((r) => r.Id)).toEqual([1, 2, 3]);
		expect(rebuilt.find((r) => r.Id === 3).show).toBe(true);
	});

	it('auto-expands ancestors so a newly created child under a collapsed parent is visible', async () => {
		const root: any = { Id: 1, IDParent: null, Name: 'Root', Sort: 1 };
		const child: any = { Id: 2, IDParent: 1, Name: 'Child', Sort: 1 };
		const first = (await lib.buildFlatTree([root, child], [], true)) as any[];
		first.find((r) => r.Id === 1).showdetail = false;
		first.find((r) => r.Id === 2).show = false;

		const created: any = { Id: 3, IDParent: 1, Name: 'Created', Sort: 2 };
		const rebuilt = (await lib.buildFlatTree([root, child, created], first, true)) as any[];

		expect(rebuilt.find((r) => r.Id === 1).showdetail).toBe(true);
		expect(rebuilt.find((r) => r.Id === 3).show).toBe(true);
		expect(rebuilt.filter((r) => r.show !== false).map((r) => r.Id)).toEqual([1, 2, 3]);
	});

	it('does not force-expand on first load when isAllRowOpened is false', async () => {
		const items: any[] = [
			{ Id: 1, IDParent: null, Name: 'Root', Sort: 1 },
			{ Id: 2, IDParent: 1, Name: 'Child', Sort: 1 },
		];

		const tree = (await lib.buildFlatTree(items, [], false)) as any[];
		expect(tree.find((r) => r.Id === 1).show).toBe(true);
		expect(tree.find((r) => r.Id === 1).showdetail).toBe(false);
		expect(tree.find((r) => r.Id === 2).show).toBe(false);
	});

	it('builds DFS order by Sort and sets HasChild without mutating extra numeric fields', async () => {
		const items: any[] = [
			{ Id: 2, IDParent: 1, Name: 'B', Sort: 2, Amount: 10 },
			{ Id: 1, IDParent: null, Name: 'Root', Sort: 1, Amount: 1 },
			{ Id: 3, IDParent: 1, Name: 'A', Sort: 1, Amount: 5 },
		];

		const tree = (await lib.buildFlatTree(items, [], true)) as any[];

		expect(tree.map((r) => r.Id)).toEqual([1, 3, 2]);
		expect(tree.find((r) => r.Id === 1).HasChild).toBe(true);
		expect(tree.find((r) => r.Id === 3).HasChild).toBe(false);
		expect(tree.find((r) => r.Id === 3).level).toBe(2);
		expect(tree.find((r) => r.Id === 2).Amount).toBe(10);
		expect(tree.find((r) => r.Id === 1).Amount).toBe(1);
	});

	it('builds under root without including the root node itself', async () => {
		const root: any = { Id: 10, IDParent: null, Name: 'Root', Sort: 1 };
		const child: any = { Id: 11, IDParent: 10, Name: 'Child', Sort: 1 };
		const other: any = { Id: 20, IDParent: null, Name: 'Other', Sort: 1 };
		const items = [root, child, other];

		const tree = (await lib.buildFlatTree(items, [], true, root)) as any[];
		expect(tree.map((r) => r.Id)).toEqual([11]);
		expect(tree[0].level).toBe(1);
		expect(tree[0].IDParent).toBe(10);
	});
});
