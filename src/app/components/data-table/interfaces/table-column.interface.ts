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
	 * Min width of the column
	 *
	 * @memberOf TableColumn
	 */
	minWidth?: number;

	/**
	 * Max width of the column
	 *
	 * @memberOf TableColumn
	 */
	maxWidth?: number;

	/**
	 * The default width of the column, in pixels
	 *
	 * @memberOf TableColumn
	 */
	width?: number;

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

	canFilter?: boolean;
	canSort?: boolean;

	navLink?: string;
}
