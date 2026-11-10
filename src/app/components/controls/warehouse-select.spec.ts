import { clearWarehouseSelectCache, pickDefaultWarehouseId, WarehouseSelectController } from './warehouse-select';

describe('pickDefaultWarehouseId', () => {
	const tree = [
		{ Id: 1, Type: 'Company' },
		{ Id: 20, Type: 'Company' },
		{ Id: 21, Type: 'Warehouse' },
		{ Id: 22, Type: 'Warehouse' },
	];

	it('keeps the current warehouse when it is still in the tree', () => {
		expect(pickDefaultWarehouseId(tree, 22)).toBe(22);
	});

	it('selects the first consignment warehouse when the branch has no warehouse selected', () => {
		expect(pickDefaultWarehouseId(tree, '')).toBe(21);
		expect(pickDefaultWarehouseId(tree, 10)).toBe(21);
	});

	it('returns empty when the storer has no warehouse', () => {
		expect(pickDefaultWarehouseId([{ Id: 1, Type: 'Company' }], '')).toBe('');
		expect(pickDefaultWarehouseId([], 21)).toBe('');
	});
});

describe('WarehouseSelectController', () => {
	beforeEach(() => clearWarehouseSelectCache());

	const tree = [
		{ Id: 3, Type: 'Company' },
		{ Id: 104, Type: 'Warehouse' },
		{ Id: 105, Type: 'Warehouse' },
	];

	it('loads the storer warehouses once for the same branch', (done) => {
		const controller = new WarehouseSelectController();
		let calls = 0;
		const connect = () => {
			calls++;
			return Promise.resolve(tree);
		};
		Promise.all([controller.load(3, connect), controller.load(3, connect)]).then(([first, second]) => {
			expect(calls).toBe(1);
			expect(first).toEqual(tree);
			expect(second).toBe(first);
			expect(pickDefaultWarehouseId(first, '')).toBe(104);
			expect(pickDefaultWarehouseId(first, 105)).toBe(105);
			done();
		});
	});

	it('returns no warehouses when no branch is selected', (done) => {
		const controller = new WarehouseSelectController();
		controller.load(0, () => Promise.reject('skip')).then((rows) => {
			expect(rows).toEqual([]);
			done();
		});
	});

	it('returns no warehouses when the request fails', (done) => {
		const controller = new WarehouseSelectController();
		controller.load(3, () => Promise.reject('down')).then((rows) => {
			expect(rows).toEqual([]);
			done();
		});
	});
});
