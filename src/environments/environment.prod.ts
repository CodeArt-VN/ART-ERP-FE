export const environment = {
	production: true,
	appVersion: '0.20.61',
	appLocation: '/', // VirtualDirectory
	versionLocation: 'V{{REPLACE_VERSION}}/',
	appServers: [
		{ Code: 'https://vnetwork.appcenter.vn/', Name: 'VNetwork server', Color: 'success', Icon: 'rocket' },
		{ Code: 'https://demo1.appcenter.vn/', Name: 'Demo server 1', Color: 'danger', Icon: 'airplane' },
		{ Code: 'https://demo2.appcenter.vn/', Name: 'Demo server 2', Color: 'danger', Icon: 'airplane' },
		{ Code: 'http://art.appcenter.vn:54009/', Name: 'Dev server', Color: 'primary', Icon: 'code-slash-outline' },
		{ Code: 'http://localhost:54009/', Name: 'Local server', Color: 'primary', Icon: 'home' },
	],

	appDomain: 'https://vnetwork.appcenter.vn/',
	staffAvatarsServer: 'https://vnetwork.appcenter.vn/Uploads/HRM/Staffs/Avatars/',
	posImagesServer: 'https://vnetwork.appcenter.vn/',
	apiVersion: 'api/v1/',
	showScrollbar: true, // (navigator.appVersion.indexOf("Win") > -1)
	signalRServiceDomain: 'https://signalrservice.appcenter.vn/',
	appStoreURL: 'http://itunes.apple.com/lb/app/ART-ERP/id1540404648?mt=8',
	playStoreURL: 'https://play.google.com/store/apps/details?id=vn.codeart.erp&hl=vn',
	loginEmail: '@vnetwork.vn',
};