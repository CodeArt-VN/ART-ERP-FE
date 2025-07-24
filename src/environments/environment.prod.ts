export const environment = {
	production: true,
	appVersion: '0.20.59',
	appLocation: '/', // VirtualDirectory
	versionLocation: 'V{{REPLACE_VERSION}}/',
	appServers: [
		{ Code: 'https://artlogistics.vn/', Name: 'Main server', Color: 'success', Icon: 'rocket' },
		{ Code: 'https://art.appcenter.vn/', Name: 'Backup server', Color: 'success', Icon: 'rocket' },
		{ Code: 'https://beta.artlogistics.vn/', Name: 'Beta server', Color: 'warning', Icon: 'cube-outline' },
		{ Code: 'https://demo.artlogistics.vn/', Name: 'Demo server', Color: 'danger', Icon: 'airplane' },
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
};
