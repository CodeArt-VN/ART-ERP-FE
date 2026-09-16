import { Injector, NgZone, runInInjectionContext } from '@angular/core';
import { DataTablBodyComponent } from './datatable-body.component';
import { buildVirtualItems, rowTrackKey } from './virtual-items.util';
import { HistoryService } from 'src/app/services/custom/history.service';

function makeBody(virtualScroll = true): DataTablBodyComponent {
	const zone = { run: (fn: () => any) => fn() } as unknown as NgZone;
	const historyStub = {
		isHistoryRemovedLine: () => false,
		isWholeLineChange: () => false,
		getLineIdentity: () => null,
		changedLineFields: new Map(),
	} as unknown as HistoryService;
	const injector = Injector.create({
		providers: [
			{ provide: NgZone, useValue: zone },
			{ provide: HistoryService, useValue: historyStub },
		],
	});
	return runInInjectionContext(injector, () => {
		const comp = new DataTablBodyComponent(zone);
		comp.virtualScroll = virtualScroll;
		return comp;
	});
}

describe('DataTablBodyComponent in-place row mutation', () => {
	it('renders a row pushed in place (FormArray.push keeps the same array reference)', () => {
		const comp = makeBody();
		const rows: any[] = [{ Id: 1 }, { Id: 2 }];
		comp.rows = rows;
		expect(comp.virtualItems.length).toBe(2);

		rows.push({ Id: 3 });
		comp.ngDoCheck();

		expect(comp.virtualItems.length).toBe(3);
		expect((comp as any).watchVisibility).toBeFalse();
	});

	it('drops a row spliced in place', () => {
		const comp = makeBody();
		const rows: any[] = [{ Id: 1 }, { Id: 2 }, { Id: 3 }];
		comp.rows = rows;

		rows.splice(1, 1);
		comp.ngDoCheck();

		expect(comp.virtualItems.length).toBe(2);
	});

	it('does not rebuild a view-only table when nothing changed', () => {
		const comp = makeBody();
		comp.rows = [{ Id: 1 }, { Id: 2 }];
		const before = comp.virtualItems;

		comp.ngDoCheck();
		comp.ngDoCheck();

		expect(comp.virtualItems).toBe(before);
	});

	it('watches visibility for tree rows and reacts to collapse/expand of an already expanded tree', () => {
		const comp = makeBody();
		const rows: any[] = [
			{ Id: 1, show: true },
			{ Id: 2, show: true },
			{ Id: 3, show: true },
		];
		comp.rows = rows;
		expect(comp.virtualItems.length).toBe(3);
		expect((comp as any).watchVisibility).toBeTrue();

		rows[2].show = false;
		comp.ngDoCheck();
		expect(comp.virtualItems.length).toBe(2);

		rows[2].show = true;
		comp.ngDoCheck();
		expect(comp.virtualItems.length).toBe(3);
	});

	it('reacts to divider changes without a length change', () => {
		const comp = makeBody();
		const rows: any[] = [{ Id: 1, _divider: 'A' }, { Id: 2 }];
		comp.rows = rows;
		expect(comp.virtualItems.length).toBe(3);
		expect((comp as any).watchVisibility).toBeTrue();

		rows[1]._divider = 'B';
		comp.ngDoCheck();
		expect(comp.virtualItems.length).toBe(4);
	});

	it('stays inert when virtual scroll is off', () => {
		const comp = makeBody(false);
		const rows: any[] = [{ Id: 1 }];
		comp.rows = rows;
		rows.push({ Id: 2 });
		comp.ngDoCheck();

		expect(comp.virtualItems.length).toBe(0);
	});

	it('rebuilds item ids when trackBy arrives after rows', () => {
		const comp = makeBody();
		const a = { Id: 11 };
		const b = { Id: 22 };
		comp.rows = [a, b];
		const before = comp.virtualItems.map((i) => i.id);
		expect(before.length).toBe(2);
		expect(before[0]).not.toEqual(before[1]);
		// Without trackBy, ids are stable object keys — not row indices.
		expect(before).toEqual([rowTrackKey(a, 0), rowTrackKey(b, 1)]);

		comp.trackBy = 'Id';
		expect(comp.virtualItems.map((i) => i.id)).toEqual([11, 22]);
	});

	it('keeps stable ids for remaining rows after deleting the middle row (no index collision)', () => {
		const comp = makeBody();
		const a = { Id: 1 };
		const b = { Id: 2 };
		const c = { Id: 3 };
		const rows = [a, b, c];
		comp.rows = rows;

		const idA = comp.virtualItems[0].id;
		const idB = comp.virtualItems[1].id;
		const idC = comp.virtualItems[2].id;
		expect(new Set([idA, idB, idC]).size).toBe(3);

		rows.splice(1, 1);
		comp.ngDoCheck();

		expect(comp.virtualItems.length).toBe(2);
		const row0 = comp.virtualItems[0];
		const row1 = comp.virtualItems[1];
		expect(row0.kind).toBe('row');
		expect(row1.kind).toBe('row');
		if (row0.kind === 'row' && row1.kind === 'row') {
			expect(row0.id).toBe(idA);
			expect(row0.row).toBe(a);
			expect(row1.id).toBe(idC);
			expect(row1.row).toBe(c);
		}
		expect(comp.virtualItems.map((i) => i.id)).not.toContain(idB);
	});
});

describe('rowTrackKey / buildVirtualItems identity', () => {
	it('gives distinct stable keys to three object rows without trackBy', () => {
		const a = { name: 'a' };
		const b = { name: 'b' };
		const c = { name: 'c' };
		const keys = [rowTrackKey(a, 0), rowTrackKey(b, 1), rowTrackKey(c, 2)];
		expect(new Set(keys).size).toBe(3);
		expect(keys.every((k) => typeof k === 'string' && String(k).startsWith('r:'))).toBeTrue();
	});

	it('does not reuse deleted middle id after splice when rebuilding virtual items', () => {
		const a = { Id: 1 };
		const b = { Id: 2 };
		const c = { Id: 3 };
		const before = buildVirtualItems([a, b, c]);
		const idA = before[0].id;
		const idB = before[1].id;
		const idC = before[2].id;

		const after = buildVirtualItems([a, c]);
		expect(after.map((i) => i.id)).toEqual([idA, idC]);
		expect(after.map((i) => i.id)).not.toContain(idB);
	});

	it('uses Id when stable, and object keys for Id=0 so new lines do not collide', () => {
		const saved = { Id: 10 };
		const draft1 = { Id: 0 };
		const draft2 = { Id: 0 };
		const items = buildVirtualItems([saved, draft1, draft2], 'Id');

		expect(items[0].id).toBe(10);
		expect(items[1].id).toBe(rowTrackKey(draft1, 1, 'Id'));
		expect(items[2].id).toBe(rowTrackKey(draft2, 2, 'Id'));
		expect(items[1].id).not.toBe(0);
		expect(items[2].id).not.toBe(0);
		expect(items[1].id).not.toEqual(items[2].id);

		const afterDelete = buildVirtualItems([saved, draft2], 'Id');
		expect(afterDelete[0].id).toBe(10);
		expect(afterDelete[1].id).toBe(items[2].id);
	});
});
