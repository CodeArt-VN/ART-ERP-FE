import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'vn.codeart.erp',
	appName: 'ART-ERP',
	webDir: 'www/browser',
	bundledWebRuntime: false,
	server: {
		cleartext: true,
		allowNavigation: ['*'],
	},
	plugins: {
		PushNotifications: {
			presentationOptions: ['badge', 'sound', 'alert'],
		},
	},
	android: {
		buildOptions: {
			keystorePath: 'undefined',
			keystoreAlias: 'undefined',
		},
		allowMixedContent: true,
	},
};

export default config;
