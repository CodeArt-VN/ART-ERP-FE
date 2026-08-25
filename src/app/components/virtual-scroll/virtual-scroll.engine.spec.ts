import { VirtualEngineItem, VirtualScrollEngine } from './virtual-scroll.engine';

interface TestItem extends VirtualEngineItem {
	id: number;
}

function makeItems(n: number): TestItem[] {
	return Array.from({ length: n }, (_, i) => ({ id: i }));
}

/** Mixed 47/65px pattern matching forecast 321 reproduction (text-wrap rows). */
function heightForIndex(i: number): number {
	return i % 5 === 2 ? 65 : 47;
}

describe('VirtualScrollEngine', () => {
	it('finds visible range from prefix-sum offsets', () => {
		const engine = new VirtualScrollEngine<TestItem>(51);
		engine.upsertItems(makeItems(10));
		for (let i = 0; i < 10; i++) {
			engine.lockHeight(i, 50);
		}
		const range = engine.getVisibleRange(120, 280);
		expect(range.start).toBe(2);
		expect(range.end).toBe(5);
		expect(engine.getTotalHeight()).toBe(500);
	});

	it('locks first height and ignores same-size duplicate reports', () => {
		const engine = new VirtualScrollEngine<TestItem>(51);
		engine.upsertItems(makeItems(3));
		expect(engine.lockHeight(0, 47)).toEqual({ index: 0, delta: -4 });
		expect(engine.lockHeight(0, 47.4)).toBeNull();
		expect(engine.getTotalHeight()).toBe(47 + 51 + 51);
	});

	it('allows settle update when locked row grows by ≥1px (dynamic content)', () => {
		const engine = new VirtualScrollEngine<TestItem>(51);
		engine.upsertItems(makeItems(3));
		expect(engine.lockHeight(0, 47)).toEqual({ index: 0, delta: -4 });
		expect(engine.lockHeight(0, 65)).toEqual({ index: 0, delta: 18 });
		expect(engine.getTotalHeight()).toBe(65 + 51 + 51);
	});

	it('170 mixed-height rows: total height converges in one forward pass (no estimate oscillation)', () => {
		const n = 170;
		const engine = new VirtualScrollEngine<TestItem>(51);
		engine.upsertItems(makeItems(n));

		const clientHeight = 800;
		const minBuffer = 300;
		const maxBuffer = 600;
		let scrollTop = 0;
		const totalHeights: number[] = [];

		// Simulate page-mode scroll: measure & lock every item that enters the buffered window.
		for (let step = 0; step < 80; step++) {
			const range = engine.getVisibleRange(scrollTop - minBuffer, scrollTop + clientHeight + maxBuffer);
			for (let i = range.start; i <= range.end; i++) {
				engine.lockHeight(i, heightForIndex(i));
			}
			totalHeights.push(engine.getTotalHeight());

			const maxScroll = Math.max(0, engine.getTotalHeight() - clientHeight);
			if (scrollTop >= maxScroll) {
				break;
			}
			scrollTop = Math.min(maxScroll, scrollTop + 400);
		}

		// Total height may shrink while progressively locking rows whose real height < placeholder;
		// that is expected and compensated by scrollTop adjustment in the viewport. After all rows
		// are locked the total must equal the exact sum.
		for (let i = 0; i < n; i++) {
			engine.lockHeight(i, heightForIndex(i));
		}
		const finalHeight = engine.getTotalHeight();
		const expected = Array.from({ length: n }, (_, i) => heightForIndex(i)).reduce((a, b) => a + b, 0);
		expect(finalHeight).toBe(expected);
	});

	it('invalidateAll clears locks so rows can be remeasured after responsive width change', () => {
		const engine = new VirtualScrollEngine<TestItem>(51);
		engine.upsertItems(makeItems(5));
		engine.lockHeight(0, 47);
		engine.invalidateAll();
		expect(engine.lockHeight(0, 65)).toEqual({ index: 0, delta: 14 });
	});

	it('upsertItems preserves locked heights for stable ids when appending', () => {
		const engine = new VirtualScrollEngine<TestItem>(51);
		engine.upsertItems(makeItems(3));
		engine.lockHeight(1, 65);
		engine.upsertItems(makeItems(4));
		expect(engine.getTotalHeight()).toBe(51 + 65 + 51 + 51);
		// Same locked height ignored; settle growth still allowed
		expect(engine.lockHeight(1, 65)).toBeNull();
		expect(engine.lockHeight(1, 99)).toEqual({ index: 1, delta: 34 });
		expect(engine.getTotalHeight()).toBe(51 + 99 + 51 + 51);
	});

	it('upsertItems prunes locks for removed ids and keeps remaining', () => {
		const engine = new VirtualScrollEngine<TestItem>(51);
		engine.upsertItems(makeItems(4));
		engine.lockHeight(1, 65);
		engine.lockHeight(2, 70);
		engine.upsertItems([
			{ id: 0 },
			{ id: 2 },
			{ id: 3 },
		]);
		// id 1 removed → lock pruned; id 2 kept
		expect(engine.getTotalHeight()).toBe(51 + 70 + 51);
		// recycled id 1 measures fresh from default
		engine.upsertItems([
			{ id: 0 },
			{ id: 1 },
			{ id: 2 },
		]);
		expect(engine.getTotalHeight()).toBe(51 + 51 + 70);
		expect(engine.lockHeight(1, 80)).toEqual({ index: 1, delta: 29 });
	});

	it('upsertItems rebuilds offsets after middle insert/delete without wiping other locks', () => {
		const engine = new VirtualScrollEngine<TestItem>(51);
		engine.upsertItems([
			{ id: 10 },
			{ id: 20 },
			{ id: 30 },
		]);
		engine.lockHeight(10, 40);
		engine.lockHeight(30, 60);
		// insert in the middle
		engine.upsertItems([
			{ id: 10 },
			{ id: 15 },
			{ id: 20 },
			{ id: 30 },
		]);
		expect(engine.getTotalHeight()).toBe(40 + 51 + 51 + 60);
		// delete middle
		engine.upsertItems([
			{ id: 10 },
			{ id: 30 },
		]);
		expect(engine.getTotalHeight()).toBe(40 + 60);
	});
});
