export const environment = {
  production: true,
  appVersion: '0.20.15',
  appDomain: 'https://erp.codeart.vn/',
  appServers: [
    { Code: 'https://erp.codeart.vn/', Name: 'Main server', Color: 'success', Icon: 'rocket' },
    { Code: 'https://demoERP.codeart.vn/', Name: 'Demo server', Color: 'danger', Icon: 'airplane' },


    { Code: 'https://artlogistics.vn/', Name: 'Main server', Color: 'success', Icon: 'rocket' },
    { Code: 'https://beta.artlogistics.vn/', Name: 'Beta server', Color: 'warning', Icon: 'cube-outline' },
    { Code: 'https://demo.artlogistics.vn/', Name: 'Demo server', Color: 'danger', Icon: 'airplane' },

    { Code: 'https://app.inholdings.vn/', Name: 'Main server', Color: 'success', Icon: 'rocket' },
    { Code: 'https://beta.inholdings.vn/', Name: 'Beta server', Color: 'warning', Icon: 'cube-outline' },
    { Code: 'https://demo.inholdings.vn/', Name: 'Demo server', Color: 'danger', Icon: 'airplane' },

    { Code: 'http://art.appcenter.vn:54009/', Name: 'Code server', Color: 'primary', Icon: 'code-slash-outline' },
    { Code: 'http://localhost:54009/', Name: 'Local server', Color: 'primary', Icon: 'home' },
  ],
  staffAvatarsServer: 'https://erp.codeart.vn/Uploads/HRM/Staffs/Avatars/',
  posImagesServer: 'https://erp.codeart.vn/',
  apiVersion: 'api/v1/',
  showScrollbar: true, // (navigator.appVersion.indexOf("Win") > -1)
  signalRServiceDomain: 'https://signalrservice.appcenter.vn/',
  appStoreURL: 'http://itunes.apple.com/lb/app/ART-ERP/id1540404648?mt=8',
  playStoreURL: 'https://play.google.com/store/apps/details?id=vn.codeart.erp&hl=vn',
  loginEmail: '@codeart.vn',
};
