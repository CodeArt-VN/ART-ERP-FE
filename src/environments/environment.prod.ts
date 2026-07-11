export const environment = {
	production: true,
	appVersion: '0.21.55',
	appLocation: '/', // VirtualDirectory
	versionLocation: 'V{{REPLACE_VERSION}}/', // 'V{{REPLACE_VERSION}}/',
	appServers: [
		{ Code: 'https://artlogistics.vn/', Name: 'Main server', Color: 'success', Icon: 'rocket' },
		{ Code: 'https://art.appcenter.vn/', Name: 'Backup server', Color: 'success', Icon: 'rocket' },
		
		{ Code: 'https://demo1.appcenter.vn/', Name: 'Demo server 1', Color: 'danger', Icon: 'airplane' },
		{ Code: 'https://demo2.appcenter.vn/', Name: 'Demo server 2', Color: 'danger', Icon: 'airplane' },
		{ Code: 'https://local.appcenter.vn:54009/', Name: 'Code server', Color: 'primary', Icon: 'code-slash-outline' },

	],
	appDomain: 'https://artlogistics.vn/',
	staffAvatarsServer: 'https://artlogistics.vn/Uploads/HRM/Staffs/Avatars/',
	posImagesServer: 'https://artlogistics.vn/',
	apiVersion: 'api/v1/',
	showScrollbar: true, // (navigator.appVersion.indexOf("Win") > -1)
	signalRServiceDomain: 'https://signalrservice.appcenter.vn/',
	appStoreURL: 'http://itunes.apple.com/lb/app/art-dms/id1540404648?mt=8',
	playStoreURL: 'https://play.google.com/store/apps/details?id=vn.codeart.art.dms2&hl=vn',
	loginEmail: '@artlogistics.vn',

	// NEW: Cache keys to clear on version updates
	cacheKeysToClearOnNewVersion: [
		//'Cache*'
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