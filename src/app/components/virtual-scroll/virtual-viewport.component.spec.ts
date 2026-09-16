import { ElementRef, NgZone, fakeAsync, tick } from '@angular/core';
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

	it('scrolls the selected id into view', () => {
		const vp = makeViewport();
		vp.mode = 'container';
		vp.defaultItemSize = 36;
		const scrollEl = { scrollTop: 0, clientHeight: 280, getBoundingClientRect: () => ({ top: 0 }) };
		(vp as any).scrollEl = scrollEl;
		(vp as any).el.nativeElement.getBoundingClientRect = () => ({ top: 0, width: 100, height: 280 });

		const rows = Array.from({ length: 40 }, (_, i) => ({ id: i + 1 }));
		vp.items = rows;
		(vp as any).syncEngineItems();
		(vp as any).recompute();

		vp.scrollToId = 20;
		expect(scrollEl.scrollTop).toBeGreaterThan(0);
		expect(vp.renderedItems.some((r: any) => r.id === 20)).toBeTrue();
	});

	it('scrollAlign start places the row at the top of the viewport', () => {
		const vp = makeViewport();
		vp.mode = 'container';
		vp.defaultItemSize = 36;
		vp.scrollAlign = 'start';
		(vp as any).engine.setDefaultItemSize(36);
		const scrollEl = { scrollTop: 0, clientHeight: 280, getBoundingClientRect: () => ({ top: 0 }) };
		(vp as any).scrollEl = scrollEl;
		(vp as any).el.nativeElement.getBoundingClientRect = () => ({ top: 0, width: 200, height: 280 });

		vp.items = Array.from({ length: 40 }, (_, i) => ({ id: i + 1 }));
		(vp as any).syncEngineItems();
		(vp as any).recompute();
		vp.scrollToId = 20;
		expect(scrollEl.scrollTop).toBe(19 * 36);
	});

	it('retries scroll once the dropdown viewport has height', () => {
		const vp = makeViewport();
		vp.mode = 'container';
		vp.defaultItemSize = 36;
		const scrollEl = { scrollTop: 0, clientHeight: 0, getBoundingClientRect: () => ({ top: 0 }) };
		(vp as any).scrollEl = scrollEl;
		(vp as any).el.nativeElement.getBoundingClientRect = () => ({ top: 0, width: 0, height: 0 });

		const rows = Array.from({ length: 40 }, (_, i) => ({ Id: i + 1 }));
		vp.idKey = 'Id';
		vp.items = rows;
		(vp as any).syncEngineItems();
		vp.scrollToId = '20';
		expect(scrollEl.scrollTop).toBe(0);

		scrollEl.clientHeight = 280;
		(vp as any).el.nativeElement.getBoundingClientRect = () => ({ top: 0, width: 200, height: 280 });
		(vp as any).tryScrollToId();
		expect(scrollEl.scrollTop).toBeGreaterThan(0);
		expect(vp.renderedItems.some((r: any) => r.Id === 20)).toBeTrue();
	});

	it('scrollToTick re-attempts a pending scroll after panel positioning', () => {
		const vp = makeViewport();
		vp.mode = 'container';
		vp.defaultItemSize = 36;
		const scrollEl = { scrollTop: 0, clientHeight: 280, getBoundingClientRect: () => ({ top: 0 }) };
		(vp as any).scrollEl = scrollEl;
		(vp as any).el.nativeElement.getBoundingClientRect = () => ({ top: 0, width: 200, height: 280 });

		vp.idKey = 'Id';
		vp.items = Array.from({ length: 40 }, (_, i) => ({ Id: i + 1 }));
		(vp as any).syncEngineItems();
		(vp as any).recompute();
		vp.scrollToId = 20;
		scrollEl.scrollTop = 0;
		(vp as any).pendingScrollToId = 20;
		vp.scrollToTick = 2;
		expect(scrollEl.scrollTop).toBeGreaterThan(0);
	});

	it('seeds renderedItems when items arrive before the viewport has height (ng-select dropdown)', () => {
		const vp = makeViewport();
		vp.mode = 'container';
		(vp as any).scrollEl = { scrollTop: 0, clientHeight: 0, getBoundingClientRect: () => ({ top: 0 }) };
		(vp as any).el.nativeElement.getBoundingClientRect = () => ({ top: 0, width: 0, height: 0 });

		vp.items = [
			{ id: 1, Name: 'ART' },
			{ id: 2, Name: 'Kho A' },
		];

		expect(vp.renderedItems.length).toBe(2);
		expect((vp.renderedItems[0] as any).Name).toBe('ART');
	});

	it('keeps locked heights during active resize and remeasures without collapse after settle', fakeAsync(() => {
		const vp = makeViewport();
		(vp as any).scrollEl = { scrollTop: 0, clientHeight: 500, getBoundingClientRect: () => ({ top: 0 }) };
		(vp as any).el.nativeElement.getBoundingClientRect = () => ({ top: 0, width: 400, height: 100 });

		vp.items = [{ id: 1 }, { id: 2 }];
		(vp as any).syncEngineItems();
		(vp as any).engine.lockHeight(1, 80);
		(vp as any).engine.lockHeight(2, 90);
		(vp as any).recompute();

		const genBefore = vp.measureGeneration;
		const heightBefore = vp.totalHeight;
		expect(heightBefore).toBe(170);

		(vp as any).pendingWidthRemeasure = true;
		(vp as any).scheduleResizeSettle(VirtualViewportComponent.RESIZE_SETTLE_MS);

		tick(50);
		expect(vp.measureGeneration).toBe(genBefore);
		expect(vp.totalHeight).toBe(heightBefore);

		tick(50);
		expect(vp.measureGeneration).toBe(genBefore + 1);
		expect(vp.totalHeight).toBe(heightBefore);
		expect((vp as any).engine.getTotalHeight()).toBe(heightBefore);
	}));
});
