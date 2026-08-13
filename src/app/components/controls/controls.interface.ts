import { FormGroup } from '@angular/forms';

export interface InputControlField {
	form: FormGroup;

	type?:
		| 'text'
		| 'number'
		| 'email'
		| 'date'
		| 'datetime-local'
		| 'checkbox'
		| 'radio'
		| 'select'
		| 'ng-select'
		| 'ng-select-branch'
		| 'ng-select-status'
		| 'ng-select-bp'
		| 'ng-select-item'
		| 'ng-select-staff'
		| 'ng-select-async'
		| 'ng-select-schema'
		| 'textarea'
		| 'branch-breadcrumbs'
		| 'span-text'
		| 'span-number'
		| 'span-date'
		| 'span-datetime'
		| 'icon'
		| 'color'
		| 'icon-color'
		| 'time-frame'
		| 'date-compare-to'
		| string;

	id: string;
	secondaryId?: string;

	label?: string;
	color?: string;

	placeholder?: string;

	/** When false, form-control hides app-input-control. Default true. */
	showInput?: boolean;

	dataSource?: any[] | any;

	bindValue?: string;

	bindLabel?: string;

	multiple?: boolean;

	clearable?: boolean;

	noCheckDirty?: boolean;

	/** ngx-mask for type=number. Default separator.2 (money). Port: '99999' (digits, no thousand sep). */
	mask?: string;
	thousandSeparator?: string;

	appendTo?: string;

	condition?: any;

	virtualScroll?: boolean;

	treeConfig?: {
		isTree?: boolean;
		isCollapsed?: boolean;
		searchFn?: any;
		searchFnDefault?: boolean;
		rootCollapsed?: boolean;
	};

	branchConfig?: {
		selectedBranch?: number;
		showingType?: string;
		showingDisable?: boolean;
		showingMode?: 'showAll' | 'showSelectedAndChildren';
	};
}
