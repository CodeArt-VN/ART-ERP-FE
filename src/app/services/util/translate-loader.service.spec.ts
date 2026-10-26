import { environment } from 'src/environments/environment';
import { assetI18nEndpoint, tenantI18nEndpoint } from './translate-loader.url';

describe('tenantI18nEndpoint', () => {
	it('appends the current app version so the server i18n file is not cached', () => {
		expect(tenantI18nEndpoint('https://erp.codeart.vn/', 'vi-VN', environment.appVersion)).toBe(
			`https://erp.codeart.vn/uploads/i18n/vi-VN.json?v=${environment.appVersion}`
		);
	});
});

describe('assetI18nEndpoint', () => {
	it('appends the current app version so the asset i18n file is not cached', () => {
		expect(assetI18nEndpoint('vi-VN', environment.appVersion)).toBe(`./assets/i18n/vi-VN.json?v=${environment.appVersion}`);
	});
});
