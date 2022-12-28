import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'vn.codeart.art.dms',
  appName: 'ART-DMS',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    cleartext: true
  }
};

export default config;
