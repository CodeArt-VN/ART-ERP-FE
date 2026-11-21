import { ADORA_LOGOS, ADORA_THEME_CLASS, ADORA_THEME_COLORS } from './adora-theme.tokens';

describe('ADORA theme tokens', () => {
	it('uses adora-theme class name', () => {
		expect(ADORA_THEME_CLASS).toBe('adora-theme');
	});

	it('keeps light primary as The ADORA navy', () => {
		expect(ADORA_THEME_COLORS.primaryLight.toLowerCase()).toBe('#002c5b');
		expect(ADORA_THEME_COLORS.primaryLightRgb).toBe('0, 44, 91');
		expect(ADORA_THEME_COLORS.themeColorMeta).toBe('#002C5B');
	});

	it('keeps a lighter navy for dark surfaces', () => {
		expect(ADORA_THEME_COLORS.primaryDark.toLowerCase()).toBe('#4a7fb5');
		expect(ADORA_THEME_COLORS.surfaceDark.toLowerCase()).toBe('#161c24');
		expect(ADORA_THEME_COLORS.menuDark.toLowerCase()).toBe('#212b36');
	});

	it('keeps ion dark as neutral near-black, not navy', () => {
		expect(ADORA_THEME_COLORS.dark.toLowerCase()).toBe('#1b1a16');
		expect(ADORA_THEME_COLORS.dark.toLowerCase()).not.toBe(ADORA_THEME_COLORS.primaryLight.toLowerCase());
		expect(ADORA_THEME_COLORS.medium.toLowerCase()).toBe('#6b6b6b');
	});

	it('uses the same original SVG for branding', () => {
		expect(ADORA_LOGOS.svg).toBe('assets/logos/logo-adora.svg');
		expect(ADORA_LOGOS.favicon).toBe('assets/icons/favicon-adora-32.png');
		expect((ADORA_LOGOS as { wide?: string }).wide).toBeUndefined();
	});
});
