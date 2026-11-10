/** Measured sizes from live ART-ERP-FE on localhost:8100 — showroom must match these. */
export const UI_KIT_MEASURED_SIZES = {
	toolbarHeight: 44,
	toolbarIconButtonHeight: 32,
	menuWidth: 270,
	menuItemHeight: 37,
	menuIconSize: 20,
	menuTitleFontSize: 14,
	menuTitlePadding: '10px 5px 10px 0',
	menuIconPadding: '0 16px',
	menuActiveBorderLeft: 5,
	logoWidth: 240,
	logoHeight: 90,
	modalFooterButtonMinHeight: 40,
	inputHeight: 38,
	inputRadius: 4,
	userFooterHeight: 56,
} as const;

export interface UiKitSection {
	id: string;
	title: string;
	icon?: string;
	keywords?: string[];
}

export const UI_KIT_SECTIONS: UiKitSection[] = [
	{ id: 'foundations', title: 'Foundations', icon: 'color-palette-outline', keywords: ['color', 'swatch', 'token', 'primary'] },
	{ id: 'toolbar-icons', title: 'Toolbar Icon Buttons', icon: 'apps-outline', keywords: ['icon', 'add', 'search', 'trash'] },
	{ id: 'app-toolbar', title: 'App Toolbar', icon: 'browsers-outline', keywords: ['list', 'detail', 'back'] },
	{ id: 'side-menu', title: 'Side Menu', icon: 'menu-outline', keywords: ['nav', 'logo', 'active', 'footer'] },
	{ id: 'page-title', title: 'Page Title', icon: 'text-outline', keywords: ['heading', 'remark'] },
	{ id: 'form-controls', title: 'Form controls', icon: 'create-outline', keywords: ['input', 'form', 'checkbox'] },
	{ id: 'modal-chrome', title: 'Modal chrome', icon: 'tablet-landscape-outline', keywords: ['popup', 'footer', 'delete', 'save'] },
	{ id: 'data-table', title: 'Data table', icon: 'grid-outline', keywords: ['row', 'grid', 'list'] },
	{ id: 'layout-shells', title: 'Layout shells', icon: 'phone-portrait-outline', keywords: ['desktop', 'mobile', 'sketch'] },
];

export function filterUiKitSections(sections: UiKitSection[], query: string): UiKitSection[] {
	const q = (query || '').trim().toLowerCase();
	if (!q) {
		return sections.slice();
	}
	return sections.filter(
		(s) =>
			s.title.toLowerCase().includes(q) ||
			s.id.toLowerCase().includes(q) ||
			(s.keywords || []).some((k) => k.toLowerCase().includes(q))
	);
}

export type UiKitAppearance = 'light' | 'dark';

/** Apply Light/Dark appearance classes on documentElement (keeps default-theme). */
export function applyUiKitAppearance(appearance: UiKitAppearance): void {
	const el = document.documentElement;
	el.classList.remove('light', 'dark');
	el.classList.add(appearance);
	if (!Array.from(el.classList).some((c) => c.indexOf('theme') > -1)) {
		el.classList.add('default-theme');
	}
}
