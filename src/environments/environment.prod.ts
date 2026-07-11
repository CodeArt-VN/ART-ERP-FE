export const environment = {
	production: true,
	appVersion: '0.20.94',
	appLocation: '/', // VirtualDirectory
	versionLocation: '', // 'V{{REPLACE_VERSION}}/',
	appServers: [
		{ Code: 'https://demo1.appcenter.vn/', Name: 'Demo server 1', Color: 'success', Icon: 'airplane' },
		{ Code: 'https://demo2.appcenter.vn/', Name: 'Demo server 2', Color: 'warning', Icon: 'airplane' },

		{ Code: 'https://artlogistics.vn/', Name: 'ART server', Color: 'danger', Icon: 'cube-outline' },
		{ Code: 'https://app.inholdings.vn/', Name: 'IN server', Color: 'danger', Icon: 'cube-outline' },
		{ Code: 'https://beta.inholdings.vn/', Name: 'IN beta server', Color: 'danger', Icon: 'cube-outline' },
		{ Code: 'https://erp.codeart.vn/', Name: 'Main server', Color: 'danger', Icon: 'cube-outline' },
		
		{ Code: 'https://local.appcenter.vn:54009/', Name: 'Code server', Color: 'primary', Icon: 'code-slash-outline' },
		{ Code: 'https://art.appcenter.vn:54009/', Name: 'Code server', Color: 'primary', Icon: 'rocket' },
		{ Code: 'http://localhost:54009/', Name: 'Local server', Color: 'primary', Icon: 'home' },
		{ Code: 'http://192.168.1.99:54009/', Name: 'Local server', Color: 'primary', Icon: 'home' },
	],
	appDomain: 'https://erp.codeart.vn/',
	staffAvatarsServer: 'https://erp.codeart.vn/Uploads/HRM/Staffs/Avatars/',
	posImagesServer: 'https://erp.codeart.vn/',
	apiVersion: 'api/v1/',
	showScrollbar: true, // (navigator.appVersion.indexOf("Win") > -1)
	signalRServiceDomain: 'https://signalrservice.appcenter.vn/',
	appStoreURL: 'http://itunes.apple.com/lb/app/ART-ERP/id1540404648?mt=8',
	playStoreURL: 'https://play.google.com/store/apps/details?id=vn.codeart.erp&hl=vn',
	loginEmail: '@codeart.vn',

	// NEW: Cache keys to clear on version updates
	cacheKeysToClearOnNewVersion: [
		'Cache*'
	],

	// NEW: Cache keys to clear on server changes  
	cacheKeysToClearOnTenantSwitched: [

	],

	// NEW: Language loading strategy
	languageStrategy: {
		networkFirst: true,     // Try server URL first for web platform
		fallbackToAssets: true, // Ultimate fallback to assets folder
		cacheTimeout: 86400000, // 24 hours cache timeout (1 day)
		retryAttempts: 3,       // Number of retry attempts
		retryDelay: 1000       // Delay between retries (ms)
	},

	// NEW: Migration system settings
	migrationSettings: {
		forceVersion: null,     // Force specific version behavior (for testing)
		skipMigration: false,   // Skip migration completely (for testing)
		enableDetailedLogs: false // Enable verbose migration logs
	},
	sessionTimeout: 0, // In minutes
};

// dog = dev log;
export let dogF = false; // Framework log;
export let dog = !environment.production; // Dev log