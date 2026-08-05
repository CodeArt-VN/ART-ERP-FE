import { TableColumn } from './interfaces/table-column.interface';

/** Number = px; string = any CSS length ('20%', '10rem', 'fit-content'). */
export type ColumnWidth = number | string;

export function toCssWidth(value: ColumnWidth | null | undefined): string | null {
	if (value == null) {
		return null;
	}
	if (typeof value === 'number') {
		return Number.isFinite(value) ? `${value}px` : null;
	}
	const raw = String(value).trim();
	if (!raw) {
		return null;
	}
	return /^-?\d*\.?\d+$/.test(raw) ? `${raw}px` : raw;
}

/**
 * Cells are `flex: 1` items, so a bare `width` never wins over the flex basis — pinning
 * min-width and max-width to the same value is what actually fixes a column, which is also
 * how the `.col-*` classes in data-table.scss do it. `width` is therefore a shorthand for
 * both, and an explicit `minWidth` / `maxWidth` overrides it.
 *
 * Returns null when unset so the style binding is removed and the CSS class keeps its default.
 */
export function columnMinWidth(column: TableColumn | null | undefined): string | null {
	return toCssWidth(column?.minWidth) ?? toCssWidth(column?.width);
}

export function columnMaxWidth(column: TableColumn | null | undefined): string | null {
	return toCssWidth(column?.maxWidth) ?? toCssWidth(column?.width);
}
