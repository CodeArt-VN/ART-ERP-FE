import { NgZone } from '@angular/core';
import { DataTablBodyComponent } from './datatable-body.component';

function makeBody(virtualScroll = true): DataTablBodyComponent {
	const zone = { run: (fn: () => any) => fn() } as unknown as NgZone;
	const comp = new DataTablBodyComponent(zone);
	comp.virtualScroll = virtualScroll;
	return comp;
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
		comp.rows = [{ Id: 11 }, { Id: 22 }];
		expect(comp.virtualItems.map((i) => i.id)).toEqual([0, 1]);

		comp.trackBy = 'Id';
		expect(comp.virtualItems.map((i) => i.id)).toEqual([11, 22]);
	});
});
