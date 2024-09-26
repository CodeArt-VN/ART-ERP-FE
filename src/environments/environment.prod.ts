export let environment = {
  production: true,
  appVersion: '0.19.82',
  //appDomain: window.location.origin + '/',
  //appDomain: 'https://demo.inholdings.vn/',
  appDomain: 'https://api.inholdings.vn/',
  //appDomain: 'https://beta.inholdings.vn/',
  appServers: [
    { Code: 'https://api.inholdings.vn/', Name: 'Main server', Color: 'success', Icon: 'rocket' },
    { Code: 'https://beta.inholdings.vn/', Name: 'Beta server', Color: 'warning', Icon: 'cube-outline' },
    { Code: 'https://demo.inholdings.vn/', Name: 'Demo server', Color: 'danger', Icon: 'airplane' },
  ],
  staffAvatarsServer: 'https://api.inholdings.vn/Uploads/HRM/Staffs/Avatars/',
  posImagesServer: 'https://api.inholdings.vn/',
  apiVersion: 'api/v1/',
  showScrollbar: true, // (navigator.appVersion.indexOf("Win") > -1)
  signalRServiceDomain: 'https://signalrservice.appcenter.vn/',
  appStoreURL: 'https://itunes.apple.com/',
  playStoreURL: 'https://play.google.com/',
  loginEmail: '@inholdings.vn',
};
