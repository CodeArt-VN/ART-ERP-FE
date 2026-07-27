export type DatatableVirtualItem =
	| { kind: 'divider'; text: string; id: string }
	| { kind: 'row'; row: any; rowIndex: number; id: string | number };

function rowTrackKey(row: any, rowIndex: number, trackByProp?: string): string | number {
	if (!trackByProp || row == null) {
		return rowIndex;
	}
	if (typeof row.get === 'function') {
		const ctrl = row.get(trackByProp);
		const v = ctrl?.value;
		if (v != null && v !== '') {
			return v;
		}
	}
	if (row[trackByProp] != null && row[trackByProp] !== '') {
		return row[trackByProp];
	}
	if (row.value?.[trackByProp] != null && row.value[trackByProp] !== '') {
		return row.value[trackByProp];
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
