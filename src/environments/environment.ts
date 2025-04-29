// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export let environment = {
	production: false,
	appVersion: '9dev',
	//appDomain: 'https://demo.inholdings.vn/',
	//appDomain: 'https://beta.inholdings.vn/',
	//appDomain: 'https://artlogistics.vn/',
	appDomain: "http://localhost:54009/",
	//appDomain: 'http://art.appcenter.vn:54009/',
	appServers: [
		{ Code: 'https://artlogistics.vn/', Name: 'Main server', Color: 'success', Icon: 'rocket' },
		{ Code: 'https://beta.artlogistics.vn/', Name: 'Beta server', Color: 'warning', Icon: 'cube-outline' },
		{ Code: 'https://demo.artlogistics.vn/', Name: 'Demo server', Color: 'danger', Icon: 'airplane' },

		{ Code: 'https://app.inholdings.vn/', Name: 'Main server', Color: 'success', Icon: 'rocket' },
		{ Code: 'https://beta.inholdings.vn/', Name: 'Beta server', Color: 'warning', Icon: 'cube-outline' },
		{ Code: 'https://demo.inholdings.vn/', Name: 'Demo server', Color: 'danger', Icon: 'airplane' },

		{ Code: 'http://art.appcenter.vn:54009/', Name: 'Code server', Color: 'primary', Icon: 'code-slash-outline' },
		{ Code: 'http://localhost:54009/', Name: 'Local server', Color: 'primary', Icon: 'home' },
		{ Code: 'http://10.211.55.3:54009/', Name: 'Local server', Color: 'primary', Icon: 'home' },
	],
	staffAvatarsServer: 'https://api.inholdings.vn/Uploads/HRM/Staffs/Avatars/',
	posImagesServer: 'https://api.inholdings.vn/',

	apiVersion: 'api/v1/',
	showScrollbar: navigator.appVersion.indexOf('Win') > -1 || true,
	// signalRServiceDomain: 'https://localhost:5001/'
	signalRServiceDomain: 'https://signalrservice.appcenter.vn/',
	appStoreURL: 'http://itunes.apple.com/lb/app/ART-ERP/id1540404648?mt=8',
	playStoreURL: 'https://play.google.com/store/apps/details?id=vn.codeart.erp&hl=vn',
	loginEmail: '@inholdings.vn',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
