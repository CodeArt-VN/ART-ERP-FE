import { environment } from 'src/environments/environment';

export var ApiSetting = {
  //Review API URL
  appDomain: function (api) {
    console.log('appDomain', environment.appDomain);
    
    return environment.appDomain + api;
  },
  apiDomain: function (api) {
    return environment.appDomain + environment.apiVersion + api;
  },
};
