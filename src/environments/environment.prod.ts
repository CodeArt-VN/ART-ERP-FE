export let environment = {
	production: true,
	appVersion: '0.20.96',
	appLocation: '/ERP/', // VirtualDirectory
	versionLocation: 'V{{REPLACE_VERSION}}/',
	appServers: [
		{ Code: 'https://api.inholdings.vn/', Name: 'Main server', Color: 'success', Icon: 'rocket' },
		{ Code: 'https://demo1.appcenter.vn/', Name: 'Demo server 1', Color: 'danger', Icon: 'airplane' },
		{ Code: 'https://demo2.appcenter.vn/', Name: 'Demo server 2', Color: 'danger', Icon: 'airplane' },
	],
	appDomain: 'https://api.inholdings.vn/',
	staffAvatarsServer: 'https://api.inholdings.vn/Uploads/HRM/Staffs/Avatars/',
	posImagesServer: 'https://api.inholdings.vn/',
	apiVersion: 'api/v1/',
	showScrollbar: true, // (navigator.appVersion.indexOf("Win") > -1)
	signalRServiceDomain: 'https://signalrservice.appcenter.vn/',
	appStoreURL: 'https://itunes.apple.com/',
	playStoreURL: 'https://play.google.com/',
	loginEmail: '@inholdings.vn',
};
