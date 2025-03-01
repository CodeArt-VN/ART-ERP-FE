import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'vn.codeart.art.dms2',
	appName: 'ART DMS',
	webDir: 'www',
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
