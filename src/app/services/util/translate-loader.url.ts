export function tenantI18nEndpoint(serverUrl: string, lang: string, version: string): string {
	const url = new URL(serverUrl);
	return `${url.origin}/uploads/i18n/${lang}.json?v=${encodeURIComponent(version)}`;
}

export function assetI18nEndpoint(lang: string, version: string): string {
	return `./assets/i18n/${lang}.json?v=${encodeURIComponent(version)}`;
}
