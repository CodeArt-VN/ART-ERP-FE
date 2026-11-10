import {
	UI_KIT_MEASURED_SIZES,
	UI_KIT_SECTIONS,
	applyUiKitAppearance,
	filterUiKitSections,
} from './ui-kit.helper';

describe('ui-kit.helper', () => {
	describe('filterUiKitSections', () => {
		it('returns all sections when query is empty', () => {
			expect(filterUiKitSections(UI_KIT_SECTIONS, '')).toEqual(UI_KIT_SECTIONS);
			expect(filterUiKitSections(UI_KIT_SECTIONS, '   ')).toEqual(UI_KIT_SECTIONS);
		});

		it('filters by title', () => {
			const result = filterUiKitSections(UI_KIT_SECTIONS, 'toolbar');
			expect(result.length).toBeGreaterThan(0);
			expect(result.every((s) => s.title.toLowerCase().includes('toolbar') || s.id.includes('toolbar') || (s.keywords || []).some((k) => k.includes('toolbar')))).toBe(
				true
			);
		});

		it('filters by keyword', () => {
			const result = filterUiKitSections(UI_KIT_SECTIONS, 'swatch');
			expect(result.some((s) => s.id === 'foundations')).toBe(true);
		});

		it('filters by id', () => {
			const result = filterUiKitSections(UI_KIT_SECTIONS, 'modal-chrome');
			expect(result.length).toBe(1);
			expect(result[0].id).toBe('modal-chrome');
		});

		it('returns empty when nothing matches', () => {
			expect(filterUiKitSections(UI_KIT_SECTIONS, 'zzz-no-match-zzz')).toEqual([]);
		});
	});

	describe('UI_KIT_SECTIONS', () => {
		it('defines an icon for every section', () => {
			expect(UI_KIT_SECTIONS.length).toBeGreaterThan(0);
			expect(UI_KIT_SECTIONS.every((s) => !!s.icon)).toBe(true);
		});
	});

	describe('UI_KIT_MEASURED_SIZES', () => {
		it('matches live measured toolbar and menu metrics', () => {
			expect(UI_KIT_MEASURED_SIZES.toolbarHeight).toBe(44);
			expect(UI_KIT_MEASURED_SIZES.toolbarIconButtonHeight).toBe(32);
			expect(UI_KIT_MEASURED_SIZES.menuWidth).toBe(270);
			expect(UI_KIT_MEASURED_SIZES.menuItemHeight).toBe(37);
			expect(UI_KIT_MEASURED_SIZES.menuIconSize).toBe(20);
			expect(UI_KIT_MEASURED_SIZES.menuTitleFontSize).toBe(14);
			expect(UI_KIT_MEASURED_SIZES.logoWidth).toBe(240);
			expect(UI_KIT_MEASURED_SIZES.logoHeight).toBe(90);
			expect(UI_KIT_MEASURED_SIZES.modalFooterButtonMinHeight).toBe(40);
			expect(UI_KIT_MEASURED_SIZES.inputHeight).toBe(38);
			expect(UI_KIT_MEASURED_SIZES.inputRadius).toBe(4);
			expect(UI_KIT_MEASURED_SIZES.userFooterHeight).toBe(56);
			expect(UI_KIT_MEASURED_SIZES.menuActiveBorderLeft).toBe(5);
		});
	});

	describe('applyUiKitAppearance', () => {
		afterEach(() => {
			document.documentElement.classList.remove('light', 'dark', 'default-theme');
		});

		it('adds light and ensures default-theme', () => {
			applyUiKitAppearance('light');
			expect(document.documentElement.classList.contains('light')).toBe(true);
			expect(document.documentElement.classList.contains('dark')).toBe(false);
			expect(document.documentElement.classList.contains('default-theme')).toBe(true);
		});

		it('switches to dark', () => {
			applyUiKitAppearance('light');
			applyUiKitAppearance('dark');
			expect(document.documentElement.classList.contains('dark')).toBe(true);
			expect(document.documentElement.classList.contains('light')).toBe(false);
		});
	});
});
