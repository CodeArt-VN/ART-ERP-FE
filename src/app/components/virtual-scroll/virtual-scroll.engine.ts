export interface VirtualEngineItem {
	id: string | number;
}

export interface VirtualRange {
	/** Inclusive. */
	start: number;
	/** Inclusive; -1 when the list is empty. */
	end: number;
}

export interface VirtualLockResult {
	index: number;
	delta: number;
}

/**
 * Pure (DOM-free) engine for variable-height virtual scrolling.
 *
 * Design principle: every row's height is measured at most ONCE and then locked forever — there
 * is no running-average re-estimation step. That re-estimation loop is what made CDK's
 * `AutoSizeVirtualScrollStrategy` oscillate/jump near the tail of a list with real, varying row
 * heights (angular/components#32715): every newly-rendered row nudged the running average,
 * shrinking/growing the estimated total height, which the browser then "corrected" by
 * snapping scrollTop — worse the faster you scrolled, and never converging.
 *
 * Here, unmeasured rows use `defaultItemSize` as a placeholder in the prefix-sum table until
 * `lockHeight()` reports their real height exactly once. Because a lock can never be undone or
 * re-applied, any scroll-position compensation triggered by a lock (see `VirtualViewportComponent`)
 * happens at most once per row for the lifetime of the cache — there is no feedback loop for it
 * to run away in.
 */
export class VirtualScrollEngine<T extends VirtualEngineItem = VirtualEngineItem> {
	constructor(private defaultItemSize: number) {}

	private items: T[] = [];
	private idToIndex = new Map<string | number, number>();
	private heights = new Map<string | number, number>();
	/** offsets[i] = pixel offset of the START of item i; offsets[items.length] = total height. */
	private offsets: number[] = [0];

	setDefaultItemSize(size: number): void {
		if (size > 0) {
			this.defaultItemSize = size;
		}
	}

	upsertItems(items: T[]): void {
		this.items = items || [];
		this.idToIndex = new Map();
		for (let i = 0; i < this.items.length; i++) {
			this.idToIndex.set(this.items[i].id, i);
		}
		this.offsets = new Array(this.items.length + 1).fill(0);
		this.rebuildOffsetsFrom(0);
	}

	getItemCount(): number {
		return this.items.length;
	}

	getTotalHeight(): number {
		return this.offsets[this.items.length] ?? 0;
	}

	getOffset(index: number): number {
		if (index <= 0) {
			return 0;
		}
		if (index >= this.offsets.length) {
			return this.getTotalHeight();
		}
		return this.offsets[index];
	}

	private heightOf(id: string | number): number {
		const h = this.heights.get(id);
		return h != null ? h : this.defaultItemSize;
	}

	private rebuildOffsetsFrom(startIndex: number): void {
		const n = this.items.length;
		const from = Math.max(0, startIndex);
		let acc = this.offsets[from] ?? 0;
		for (let i = from; i < n; i++) {
			acc += this.heightOf(this.items[i].id);
			this.offsets[i + 1] = acc;
		}
	}

	/**
	 * Reports the real measured height for an item. First report wins and is locked forever;
	 * subsequent reports for the same id (e.g. the row scrolled out of the rendered window and
	 * back in, re-triggering its ResizeObserver) are silently ignored.
	 *
	 * Returns null when the id is unknown, already locked, or the height is within rounding of
	 * the placeholder it replaces (nothing to do). Otherwise returns the changed index and the
	 * delta, so the caller can decide whether a scroll-position compensation is needed — only
	 * required when `index` is before the currently rendered window start.
	 */
	lockHeight(id: string | number, px: number): VirtualLockResult | null {
		if (this.heights.has(id) || !(px > 0)) {
			return null;
		}
		const index = this.idToIndex.get(id);
		if (index == null) {
			return null;
		}
		const old = this.heightOf(id);
		this.heights.set(id, px);
		const delta = px - old;
		if (Math.abs(delta) < 0.5) {
			return null;
		}
		this.rebuildOffsetsFrom(index);
		return { index, delta };
	}

	/** Drops every locked height (e.g. responsive breakpoint / width change invalidates layout). */
	invalidateAll(): void {
		this.heights.clear();
		this.rebuildOffsetsFrom(0);
	}

	/** Indices whose [offset, offset+height) span intersects [fromPx, toPx]. */
	getVisibleRange(fromPx: number, toPx: number): VirtualRange {
		const n = this.items.length;
		if (!n) {
			return { start: 0, end: -1 };
		}
		const from = Math.max(0, fromPx);
		const to = Math.max(from, toPx);
		const start = this.upperBound(from);
		let end = this.lowerBound(to) - 1;
		if (end < start) {
			end = start;
		}
		if (end > n - 1) {
			end = n - 1;
		}
		return { start, end };
	}

	/** First index i such that offsets[i+1] > px (first item whose bottom edge is past px). */
	private upperBound(px: number): number {
		let lo = 0;
		let hi = this.items.length - 1;
		while (lo < hi) {
			const mid = (lo + hi) >> 1;
			if (this.offsets[mid + 1] <= px) {
				lo = mid + 1;
			} else {
				hi = mid;
			}
		}
		return lo;
	}

	/** First index i such that offsets[i] >= px. */
	private lowerBound(px: number): number {
		const n = this.items.length;
		let lo = 0;
		let hi = n;
		while (lo < hi) {
			const mid = (lo + hi) >> 1;
			if (this.offsets[mid] < px) {
				lo = mid + 1;
			} else {
				hi = mid;
			}
		}
		return lo;
	}
}
