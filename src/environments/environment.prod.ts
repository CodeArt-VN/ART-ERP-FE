export const environment = {
	production: true,
	appVersion: '0.20.92',
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
};