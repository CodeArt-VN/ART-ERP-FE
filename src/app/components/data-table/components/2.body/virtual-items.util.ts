export type DatatableVirtualItem =
	| { kind: 'divider'; text: string; id: string }
	| { kind: 'row'; row: any; rowIndex: number; id: string | number };

/** Stable identity for object rows (FormGroup / plain row) so delete/reorder does not collide on index. */
const rowIdentityKeys = new WeakMap<object, number>();
let nextRowIdentity = 1;

function stableObjectKey(row: object): number {
	let id = rowIdentityKeys.get(row);
	if (id == null) {
		id = nextRowIdentity++;
		rowIdentityKeys.set(row, id);
	}
	return id;
}

/** True for values safe as trackBy keys — excludes new-line Id = 0 and empty strings. */
function isStableTrackValue(v: unknown): boolean {
	if (v == null || v === '') {
		return false;
	}
	if (typeof v === 'number' && v === 0) {
		return false;
	}
	return true;
}

function readTrackByValue(row: any, trackByProp: string): unknown {
	if (typeof row.get === 'function') {
		const ctrl = row.get(trackByProp);
		const v = ctrl?.value;
		if (isStableTrackValue(v)) {
			return v;
		}
	}
	if (isStableTrackValue(row[trackByProp])) {
		return row[trackByProp];
	}
	if (isStableTrackValue(row.value?.[trackByProp])) {
		return row.value[trackByProp];
	}
	return undefined;
}

/**
 * Identity for a table row used by virtual-scroll *ngFor trackBy (and non-VS rowTrackingFn).
 * Prefer an explicit trackBy property when its value is stable; otherwise stamp the object itself
 * so removeAt/splice mid-list does not reuse the deleted row's view for the next FormGroup.
 */
export function rowTrackKey(row: any, rowIndex: number, trackByProp?: string): string | number {
	if (row != null && typeof row === 'object') {
		if (trackByProp) {
			const v = readTrackByValue(row, trackByProp);
			if (isStableTrackValue(v)) {
				return v as string | number;
			}
		}
		return `r:${stableObjectKey(row)}`;
	}
	return rowIndex;
}

/**
 * Flatten rows into virtual-scroll items: optional divider lines then the row.
 * Skips rows with show === false (collapsed tree nodes).
 */
export function buildVirtualItems(rows: any[] | null | undefined, trackByProp?: string): DatatableVirtualItem[] {
	if (!rows?.length) {
		return [];
	}

	const items: DatatableVirtualItem[] = [];

	for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
		const row = rows[rowIndex];
		if (row?.show === false) {
			continue;
		}

		const key = rowTrackKey(row, rowIndex, trackByProp);

		if (row?._dividers?.length) {
			for (let d = 0; d < row._dividers.length; d++) {
				items.push({
					kind: 'divider',
					text: row._dividers[d],
					id: `${key}:d:${d}`,
				});
			}
		} else if (row?._divider) {
			items.push({
				kind: 'divider',
				text: row._divider,
				id: `${key}:d:0`,
			});
		}

		items.push({
			kind: 'row',
			row,
			rowIndex,
			id: key,
		});
	}

	return items;
}

export function virtualItemTrackBy(_index: number, item: DatatableVirtualItem): string | number {
	return item.id;
}
