import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'vn.mekongsun.app',
  appName: 'MKS ERP',
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
