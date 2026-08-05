/**
 * Column Type
 */
export interface TableColumn {
	/**
	 * Header template ref
	 * @memberOf TableColumn
	 */
	headerTemplate?: any;

	/**
	 * Filter template ref
	 * @memberOf TableColumn
	 */
	filterTemplate?: any;

	/**
	 * Cell template ref
	 * @memberOf TableColumn
	 */
	cellTemplate?: any;

	/**
	 * CSS Classes for the cell
	 * @memberOf TableColumn
	 */
	class?: string | ((data: any) => string | any);

	/**
	 * CSS Classes for the cell
	 * @memberOf TableColumn
	 */
	cellClass?: string | ((data: any) => string | any);

	/**
	 * CSS classes for the header
	 * @memberOf TableColumn
	 */
	filterClass?: string | ((data: any) => string | any);

	/**
	 * CSS classes for the header
	 * @memberOf TableColumn
	 */
	headerClass?: string | ((data: any) => string | any);

	/**
	 * Column name or label
	 *
	 * @memberOf TableColumn
	 */
	name?: string;

	/**
	 * Property to bind to the row. Example:
	 *
	 * `someField` or `some.field.nested`, 0 (numeric)
	 *
	 * If left blank, will use the name as camel case conversion
	 *
	 * @memberOf TableColumn
	 */
	property?: string;

	/**
	 * Min width of the column. Number = px, string = any CSS length ('20%', '10rem').
	 * Unset leaves whatever the column's CSS class defines.
	 *
	 * @memberOf TableColumn
	 */
	minWidth?: number | string;

	/**
	 * Max width of the column. Number = px, string = any CSS length ('20%', '10rem').
	 * Unset leaves whatever the column's CSS class defines.
	 *
	 * @memberOf TableColumn
	 */
	maxWidth?: number | string;

	/**
	 * Fixed width — shorthand that pins both minWidth and maxWidth (see column-width.util).
	 * Number = px, string = any CSS length.
	 *
	 * @memberOf TableColumn
	 */
	width?: number | string;

	/**
	 * Header checkbox enabled
	 *
	 * @memberOf TableColumn
	 */
	headerCheckboxable?: boolean;

	checkbox?: boolean;

	sticky?: boolean;

	format?: string;

	filterControlType?: string;
	filterDataSource?: any[];
	filterBindValue?: string;
	filterBindLabel?: string;

	canFilter?: boolean;
	canSort?: boolean;

	navLink?: string;
}

/** Active column filter shown in empty-state list. */
export interface DataTableActiveFilter {
	property: string;
	label: string;
	controlType: string;
	displayValue?: string;
	displayFrom?: string;
	displayTo?: string;
}
