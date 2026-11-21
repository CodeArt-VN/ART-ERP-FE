/** The ADORA brand tokens — keep in sync with `_adora-theme.scss` and theadora.vn. */
export const ADORA_THEME_CLASS = 'adora-theme';

export const ADORA_THEME_COLORS = {
	primaryLight: '#002c5b',
	primaryLightRgb: '0, 44, 91',
	primaryDark: '#4a7fb5',
	primaryDarkRgb: '74, 127, 181',
	/** Near-black UI ink — distinct from navy primary. */
	dark: '#1b1a16',
	medium: '#6b6b6b',
	surfaceDark: '#161c24',
	menuDark: '#212b36',
	themeColorMeta: '#002C5B',
} as const;

/** Original assets from theadora.vn — menu/login share the same SVG. */
export const ADORA_LOGOS = {
	svg: 'assets/logos/logo-adora.svg',
	footer: 'assets/logos/logo-adora-footer.png',
	favicon: 'assets/icons/favicon-adora-32.png',
} as const;
