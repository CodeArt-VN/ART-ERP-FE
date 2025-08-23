export const environment = {
	production: true,
	appVersion: '0.20.94',
	appLocation: '/', // VirtualDirectory
	versionLocation: '', // 'V{{REPLACE_VERSION}}/',
	appServers: [
		{ Code: 'https://erp.codeart.vn/', Name: 'Main server', Color: 'success', Icon: 'rocket' },
		{ Code: 'https://vnetwork.appcenter.vn/', Name: 'VNetwork server', Color: 'warning', Icon: 'cube-outline'},
		{ Code: 'https://artlogistics.vn/', Name: 'ART server', Color: 'warning', Icon: 'cube-outline' },
		{ Code: 'https://app.inholdings.vn/', Name: 'IN server', Color: 'warning', Icon: 'cube-outline' },
		
		{ Code: 'https://demo1.appcenter.vn/', Name: 'Demo server 1', Color: 'danger', Icon: 'airplane' },
		{ Code: 'https://demo2.appcenter.vn/', Name: 'Demo server 2', Color: 'danger', Icon: 'airplane' },

		{ Code: 'http://art.appcenter.vn:54009/', Name: 'Code server', Color: 'primary', Icon: 'code-slash-outline' },
		{ Code: 'http://localhost:54009/', Name: 'Local server', Color: 'primary', Icon: 'home' },
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
		'SYS/Type',           // System data might change
		'SYS/Status',         // System data might change  
		'UserToken',          // Force re-login on major updates
		'BranchList',         // Branch structure might change
		'tempCache/*',        // Clear temp caches
		'language/*'          // Clear old language cache
	],

	// NEW: Cache keys to clear on server changes  
	cacheKeysToClearOnServerChange: [
		'UserToken',          // Token invalid for different server
		'UserProfile',        // Profile from different server
		'SYS/Type',           // Server-specific data
		'SYS/Status',         // Server-specific data
		'BranchList',         // Server-specific data
		'selectedBranch',     // Branch selection invalid
		'language/*',         // Language cache from old server
		'tempCache/*'         // Clear temp server-specific cache
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
		enableLogging: false,   // Disable detailed logging in production
		forceVersion: null,     // Force specific version behavior (for testing)
		skipMigration: false,   // Skip migration completely (for testing)
		enableDetailedLogs: false // Disable verbose logs in production
	},

	// NEW: Server selection settings
	serverSettings: {
		allowGuestSwitching: true,  // Allow server switching before login
		defaultServer: null,        // null = use first server in appServers
		validateServerOnStartup: true, // Validate selected server exists
		fallbackToDefault: true    // Fallback to default if selected server invalid
	}
};

export let dog = !environment.production; //Dev log