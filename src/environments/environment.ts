export let environment = {
	production: false,
	appVersion: '9dev',
	appLocation: '/',
	versionLocation: '',
	appServers: [
		{ Code: 'https://api.inholdings.vn/', Name: 'Main server', Color: 'success', Icon: 'rocket' },
		{ Code: 'https://artlogistics.vn/', Name: 'Main server', Color: 'success', Icon: 'rocket' },
		{ Code: 'https://vnetwork.appcenter.vn/', Name: 'VNetwork server', Color: 'success', Icon: 'rocket' },
		{ Code: 'https://demo1.appcenter.vn/', Name: 'Demo server 1', Color: 'danger', Icon: 'airplane' },
		{ Code: 'https://demo2.appcenter.vn/', Name: 'Demo server 2', Color: 'danger', Icon: 'airplane' },

		{ Code: 'http://art.appcenter.vn:54009/', Name: 'Code server', Color: 'primary', Icon: 'code-slash-outline' },
		{ Code: 'http://localhost:54009/', Name: 'Local server', Color: 'primary', Icon: 'home' },
		{ Code: 'http://10.211.55.3:54009/', Name: 'Local server', Color: 'primary', Icon: 'home' },
	],
	appDomain: 'http://10.211.55.3:54009/',
	staffAvatarsServer: 'https://app.inholdings.vn/Uploads/HRM/Staffs/Avatars/',
	posImagesServer: 'https://app.inholdings.vn/',
	apiVersion: 'api/v1/',
	showScrollbar: navigator.appVersion.indexOf('Win') > -1 || true,
	// signalRServiceDomain: 'https://localhost:5001/'
	signalRServiceDomain: 'https://signalrservice.appcenter.vn/',
	appStoreURL: 'http://itunes.apple.com/lb/app/ART-ERP/id1540404648?mt=8',
	playStoreURL: 'https://play.google.com/store/apps/details?id=vn.codeart.erp&hl=vn',
	loginEmail: '@inholdings.vn',

	// NEW: Cache keys to clear on version updates
	cacheKeysToClearOnNewVersion: [
		// 'tempCache',        // Clear temp caches
		// 'language/*'          // Clear old language cache
	],

	// NEW: Cache keys to clear on server changes  
	cacheKeysToClearOnTenantSwitched: [
		// 'tempCache/*'         // Clear temp server-specific cache
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

export let dog = !environment.production; // dog = dev log;