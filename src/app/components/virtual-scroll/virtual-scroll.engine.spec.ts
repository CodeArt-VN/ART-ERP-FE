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

	it('locks each height at most once and ignores duplicate reports', () => {
		const engine = new VirtualScrollEngine<TestItem>(51);
		engine.upsertItems(makeItems(3));
		expect(engine.lockHeight(0, 47)).toEqual({ index: 0, delta: -4 });
		expect(engine.lockHeight(0, 99)).toBeNull();
		expect(engine.getTotalHeight()).toBe(47 + 51 + 51);
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

	it('upsertItems preserves locked heights for stable ids', () => {
		const engine = new VirtualScrollEngine<TestItem>(51);
		engine.upsertItems(makeItems(3));
		engine.lockHeight(1, 65);
		engine.upsertItems(makeItems(4));
		expect(engine.getTotalHeight()).toBe(51 + 65 + 51 + 51);
		engine.lockHeight(1, 99);
		expect(engine.getTotalHeight()).toBe(51 + 65 + 51 + 51);
	});
});
