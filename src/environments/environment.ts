// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVersion: '9dev',
  appDomain: 'http://api.inholdings.vn/',
  //appDomain: 'https://erp-dev.appcenter.vn/',
  //appDomain: 'https://artlogistics.vn/',
  //appDomain: "http://art.appcenter.vn:54009/",
  //appDomain: "http://192.168.1.8:54009/",
  //appDomain: "http://10.211.55.4:54009/",
  //appDomain: "http://art.appcenter.vn:54009/",
  staffAvatarsServer: "https://api.inholdings.vn/Uploads/HRM/Staffs/Avatars/",
  posImagesServer: "https://api.inholdings.vn/",

  apiVersion: "api/v1/",
  showScrollbar: (navigator.appVersion.indexOf("Win") > -1) || true,
  // signalRServiceDomain: 'https://localhost:5001/' 
  signalRServiceDomain: 'https://signalrservice.appcenter.vn/',
  loginEmail: '@codeart.vn'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
 
