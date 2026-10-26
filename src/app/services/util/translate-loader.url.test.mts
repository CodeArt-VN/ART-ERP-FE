import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { assetI18nEndpoint, tenantI18nEndpoint } from './translate-loader.url.ts';

describe('tenantI18nEndpoint', () => {
	it('appends the current app version so the server i18n file is not cached', () => {
		assert.equal(
			tenantI18nEndpoint('https://erp.codeart.vn/', 'vi-VN', '0.22.28'),
			'https://erp.codeart.vn/uploads/i18n/vi-VN.json?v=0.22.28'
		);
	});

	it('uses the server origin when the tenant URL has a path', () => {
		assert.equal(
			tenantI18nEndpoint('https://erp.codeart.vn/api/v1/', 'en-US', '9dev'),
			'https://erp.codeart.vn/uploads/i18n/en-US.json?v=9dev'
		);
	});
});

describe('assetI18nEndpoint', () => {
	it('appends the current app version so the asset i18n file is not cached', () => {
		assert.equal(assetI18nEndpoint('vi-VN', '0.22.28'), './assets/i18n/vi-VN.json?v=0.22.28');
	});
});
