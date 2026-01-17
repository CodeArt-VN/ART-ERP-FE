export const environment = {
	production: true,
	appVersion: '0.21.35',
	appLocation: '/ERP/', // VirtualDirectory
	versionLocation: 'V{{REPLACE_VERSION}}/',
	appServers: [
		{ Code: 'https://app.inholdings.vn/', Name: 'Main server', Color: 'success', Icon: 'rocket' },
		{ Code: 'https://demo1.appcenter.vn/', Name: 'Demo server 1', Color: 'danger', Icon: 'airplane' },
		{ Code: 'https://demo2.appcenter.vn/', Name: 'Demo server 2', Color: 'danger', Icon: 'airplane' },
	],
	appDomain: 'https://app.inholdings.vn/',
	staffAvatarsServer: 'https://app.inholdings.vn/Uploads/HRM/Staffs/Avatars/',
	posImagesServer: 'https://app.inholdings.vn/',
	apiVersion: 'api/v1/',
	showScrollbar: true, // (navigator.appVersion.indexOf("Win") > -1)
	signalRServiceDomain: 'https://signalrservice.appcenter.vn/',
	appStoreURL: 'https://itunes.apple.com/',
	playStoreURL: 'https://play.google.com/',
	loginEmail: '@inholdings.vn',

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
	}
};

// dog = dev log;
export let dogF = false; // Framework log;
export let dog = false; // Dev log