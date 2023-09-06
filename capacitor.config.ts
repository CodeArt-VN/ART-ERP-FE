import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'vn.codeart.art.dms',
  appName: 'ART-DMS',
  //appId: 'vn.inholdings.erpdemo',
  //appName: 'In-Holdings',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    cleartext: true
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  }
  ,
  android: {
    buildOptions: {
        keystorePath: 'undefined',
        keystoreAlias: 'undefined',
    }
  }
  };

export default config;
