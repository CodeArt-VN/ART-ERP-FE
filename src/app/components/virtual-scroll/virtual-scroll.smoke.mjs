/**
 * Thorough smoke test for shared virtual-scroll engine + idKey semantics used by write-NFC.
 * Run: npx tsx src/app/components/virtual-scroll/virtual-scroll.smoke.mjs
 */
import { VirtualScrollEngine } from './virtual-scroll.engine.ts';

function assert(cond, msg) {
	if (!cond) throw new Error(msg);
}

function resolveItemId(item, idKey, index = 0) {
	const fromKey = item?.[idKey];
	if (fromKey != null && fromKey !== '') return fromKey;
	if (item?.id != null && item?.id !== '') return item.id;
	return index;
}

function sameItemIds(a, b, idKey) {
	if (a === b) return true;
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) {
		if (resolveItemId(a[i], idKey, i) !== resolveItemId(b[i], idKey, i)) return false;
	}
	return true;
}

// --- Engine mixed heights (forecast repro) ---
{
	const n = 170;
	const engine = new VirtualScrollEngine(51);
	engine.upsertItems(Array.from({ length: n }, (_, i) => ({ id: i })));
	const h = (i) => (i % 5 === 2 ? 65 : 47);
	let scrollTop = 0;
	const clientHeight = 800;
	const scrollTops = [];
	let renderStart = 0;
	for (let step = 0; step < 100; step++) {
		const range = engine.getVisibleRange(scrollTop - 300, scrollTop + clientHeight + 600);
		renderStart = range.start;
		let compensation = 0;
		for (let i = range.start; i <= range.end; i++) {
			const result = engine.lockHeight(i, h(i));
			if (result && result.index < renderStart) compensation += result.delta;
		}
		scrollTop += compensation;
		scrollTops.push(scrollTop);
		const maxScroll = Math.max(0, engine.getTotalHeight() - clientHeight);
		if (scrollTop >= maxScroll - 1) break;
		scrollTop = Math.min(maxScroll, scrollTop + 400);
	}
	for (let i = 0; i < n; i++) engine.lockHeight(i, h(i));
	const expected = Array.from({ length: n }, (_, i) => h(i)).reduce((a, b) => a + b, 0);
	assert(engine.getTotalHeight() === expected, `final height ${engine.getTotalHeight()} !== ${expected}`);
	for (let i = 1; i < scrollTops.length; i++) {
		assert(scrollTops[i] >= scrollTops[i - 1], `scrollTop decreased at ${i}`);
	}
	console.log('OK engine mixed-height scroll');
}

// --- idKey semantics (write-NFC requestId / Id) ---
{
	const requests = [
		{ requestId: 'r1', displayName: 'A', requestStatus: 'Pending' },
		{ requestId: 'r2', displayName: 'B', requestStatus: 'Pending' },
		{ requestId: 'r3', displayName: 'C', requestStatus: 'Completed' },
	];
	const idKey = 'requestId';
	const engine = new VirtualScrollEngine(72);
	engine.upsertItems(requests.map((item, i) => ({ id: resolveItemId(item, idKey, i) })));
	engine.lockHeight('r1', 80);
	engine.lockHeight('r2', 90);
	assert(engine.getTotalHeight() === 80 + 90 + 72, 'idKey heights');

	// Getter churn: new filtered array each time with same pending ids must be considered "same"
	const filter1 = requests.filter((r) => r.requestStatus === 'Pending');
	const filter2 = requests.filter((r) => r.requestStatus === 'Pending');
	assert(filter1 !== filter2, 'filters are new refs');
	assert(sameItemIds(filter1, filter2, idKey), 'same ids despite new array refs');

	const afterComplete = [
		{ requestId: 'r1', displayName: 'A', requestStatus: 'Completed' },
		{ requestId: 'r2', displayName: 'B', requestStatus: 'Pending' },
	];
	const pendingAfter = afterComplete.filter((r) => r.requestStatus === 'Pending');
	assert(!sameItemIds(filter1, pendingAfter, idKey), 'ids change when item leaves queue');
	console.log('OK idKey + sameItemIds (write-NFC getter churn)');
}

// --- Contact picker Id key ---
{
	const contacts = [
		{ Id: 10, Name: 'X' },
		{ Id: 20, Name: 'Y' },
	];
	const engine = new VirtualScrollEngine(72);
	engine.upsertItems(contacts.map((c, i) => ({ id: resolveItemId(c, 'Id', i) })));
	engine.lockHeight(10, 70);
	engine.lockHeight(20, 75);
	assert(engine.getTotalHeight() === 145, 'contact Id heights');
	console.log('OK contact picker Id key');
}

// --- Page-mode virtualProgress formula ---
{
	const D = 500;
	const scrollElScrollTop = 1200;
	const virtualProgress = Math.max(0, scrollElScrollTop - D);
	assert(virtualProgress === 700, 'page-mode virtualProgress');
	const engine = new VirtualScrollEngine(50);
	engine.upsertItems(Array.from({ length: 40 }, (_, i) => ({ id: i })));
	for (let i = 0; i < 40; i++) engine.lockHeight(i, 50);
	const range = engine.getVisibleRange(virtualProgress - 300, virtualProgress + 800 + 600);
	assert(range.start >= 0 && range.end >= range.start, 'visible range valid');
	assert(range.start <= 14, `start near progress index, got ${range.start}`);
	console.log('OK page-mode range', range);
}

// --- invalidateAll unlocks for responsive ---
{
	const engine = new VirtualScrollEngine(51);
	engine.upsertItems([{ id: 1 }, { id: 2 }]);
	engine.lockHeight(1, 47);
	engine.invalidateAll();
	assert(engine.lockHeight(1, 65)?.delta === 14, 'remeasure after invalidate');
	console.log('OK invalidateAll');
}

console.log('ALL virtual-scroll smoke tests passed');
