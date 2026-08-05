import { ElementRef, NgZone } from '@angular/core';
import { VirtualViewportComponent } from './virtual-viewport.component';

function makeViewport() {
	const el = { nativeElement: document.createElement('div') } as ElementRef<HTMLElement>;
	const zone = {
		run: (fn: () => any) => fn(),
		runOutsideAngular: (fn: () => any) => fn(),
	} as unknown as NgZone;
	return new VirtualViewportComponent(el, zone);
}

describe('VirtualViewportComponent item identity', () => {
	it('re-slices renderedItems when ids stay the same but object refs change', () => {
		const vp = makeViewport();
		(vp as any).scrollEl = { scrollTop: 0, clientHeight: 500, getBoundingClientRect: () => ({ top: 0 }) };
		(vp as any).el.nativeElement.getBoundingClientRect = () => ({ top: 0, width: 100, height: 100 });

		const a1 = { id: 1, name: 'A' };
		const a2 = { id: 2, name: 'B' };
		vp.items = [a1, a2];
		(vp as any).syncEngineItems();
		(vp as any).recompute();
		expect(vp.renderedItems.length).toBeGreaterThan(0);
		expect(vp.renderedItems[0]).toBe(a1);

		const b1 = { id: 1, name: 'A-updated' };
		const b2 = { id: 2, name: 'B' };
		vp.items = [b1, b2];

		expect(vp.renderedItems[0]).toBe(b1);
		expect((vp.renderedItems[0] as any).name).toBe('A-updated');
	});

	it('skips work when the same object refs are rebound (write-nfc style)', () => {
		const vp = makeViewport();
		(vp as any).scrollEl = { scrollTop: 0, clientHeight: 500, getBoundingClientRect: () => ({ top: 0 }) };
		(vp as any).el.nativeElement.getBoundingClientRect = () => ({ top: 0, width: 100, height: 100 });

		const row = { id: 9, name: 'X' };
		vp.items = [row];
		(vp as any).syncEngineItems();
		(vp as any).recompute();
		const before = vp.renderedItems;

		vp.items = [row];
		expect(vp.renderedItems).toBe(before);
	});

	it('rebuilds the engine when ids change', () => {
		const vp = makeViewport();
		(vp as any).scrollEl = { scrollTop: 0, clientHeight: 500, getBoundingClientRect: () => ({ top: 0 }) };
		(vp as any).el.nativeElement.getBoundingClientRect = () => ({ top: 0, width: 100, height: 100 });

		vp.items = [{ id: 1 }, { id: 2 }];
		(vp as any).syncEngineItems();
		expect((vp as any).engine.getItemCount()).toBe(2);

		vp.items = [{ id: 1 }, { id: 2 }, { id: 3 }];
		expect((vp as any).engine.getItemCount()).toBe(3);
	});

	it('does not wipe mid-list window when patched while hidden', () => {
		const vp = makeViewport();
		(vp as any).scrollEl = { scrollTop: 2000, clientHeight: 500, getBoundingClientRect: () => ({ top: 0 }) };
		(vp as any).el.nativeElement.getBoundingClientRect = () => ({ top: 0, width: 100, height: 100 });

		const rows = Array.from({ length: 40 }, (_, i) => ({ id: i + 1, name: `r${i + 1}` }));
		vp.items = rows;
		(vp as any).syncEngineItems();
		(vp as any).renderStart = 20;
		(vp as any).renderedItems = rows.slice(20, 28);

		// Page hidden (Ionic detail on top)
		(vp as any).el.nativeElement.getBoundingClientRect = () => ({ top: 0, width: 0, height: 0 });
		(vp as any).scrollEl.clientHeight = 0;

		const patched = rows.map((r) => (r.id === 21 ? { id: 21, name: 'updated' } : { ...r }));
		vp.items = patched;

		expect((vp as any).pendingRelayout).toBeTrue();
		expect(vp.renderedItems[0]).toEqual(jasmine.objectContaining({ id: 21, name: 'updated' }));
		expect((vp as any).renderStart).toBe(20);

		// Back to list
		(vp as any).el.nativeElement.getBoundingClientRect = () => ({ top: 0, width: 100, height: 100 });
		(vp as any).scrollEl.clientHeight = 500;
		vp.relayout();
		expect((vp as any).pendingRelayout).toBeFalse();
		expect(vp.renderedItems.length).toBeGreaterThan(0);
	});
});
