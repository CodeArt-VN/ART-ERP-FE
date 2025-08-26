import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment, dog } from './environments/environment';
import { Capacitor } from '@capacitor/core';

const isDev = !environment.production;
const isHybrid = Capacitor.getPlatform() !== 'web';

dog && console.log('🚀 [main.ts] Application starting...', {
  isDev,
  isHybrid,
  platform: Capacitor.getPlatform(),
  appVersion: environment.appVersion,
  appLocation: environment.appLocation,
  timestamp: new Date().toISOString()
});

let versionUrl = window.location.origin + environment.appLocation + 'version.json?t=' + new Date().getTime();

if (isDev || isHybrid) {
  dog && console.log('🔧 [main.ts] Development mode or hybrid app detected, loading platform directly');
  loadPlatform();
} else {
  dog && console.log('🌐 [main.ts] Production mode detected, checking version compatibility...');
  dog && console.log('📡 [main.ts] Version check URL:', versionUrl);
  
  fetch(versionUrl)
    .then((response) => {
      dog && console.log('✅ [main.ts] Version check response received:', response.status, response.statusText);
      return response.json();
    })
    .then((data) => {
      dog && console.log('📋 [main.ts] Version data:', data);
      
      const minVersion = data.minVersion;
      const latestVersion = data.latestVersion;
      const currentVersion = environment.appVersion;
      
      dog && console.log('🔍 [main.ts] Version comparison:', {
        current: currentVersion,
        minimum: minVersion,
        latest: latestVersion,
        needsUpdate: currentVersion < minVersion
      });
      
      if (currentVersion < minVersion) {
        dog && console.log('⚠️ [main.ts] Current version is too old, redirecting to latest version');
        const basePath = window.location.origin + environment.appLocation + environment.versionLocation.replace('{{REPLACE_VERSION}}', latestVersion);
        dog && console.log('🔄 [main.ts] Redirecting to:', basePath);
        window.location.href = `${basePath}`;
      } else {
        dog && console.log('✅ [main.ts] Version is compatible, loading platform');
        loadPlatform();
      }
    })
    .catch((err) => {
      dog && console.error('❌ [main.ts] Version check failed:', err);
      dog && console.log('🔄 [main.ts] Falling back to platform loading');
      loadPlatform();
    });
}

// Tạo function load platform
export function loadPlatform() {
  dog && console.log('🏗️ [main.ts] Loading Angular platform...');
  dog && console.log('📦 [main.ts] AppModule:', AppModule);
  
  const startTime = performance.now();
  
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then((moduleRef) => {
      const loadTime = performance.now() - startTime;
      dog && console.log('✅ [main.ts] Angular platform loaded successfully!', {
        moduleRef,
        loadTimeMs: Math.round(loadTime),
        timestamp: new Date().toISOString()
      });
      
      // Log module information
      dog && console.log('📊 [main.ts] Module information:', {
        moduleType: typeof moduleRef,
        hasInjector: !!moduleRef.injector,
        hasComponentFactoryResolver: !!moduleRef.componentFactoryResolver
      });
      
      // Log environment info
      dog && console.log('🌍 [main.ts] Environment info:', {
        production: environment.production,
        appVersion: environment.appVersion,
        appDomain: environment.appDomain,
        signalRServiceDomain: environment.signalRServiceDomain
      });
      
      // Log platform info
      dog && console.log('📱 [main.ts] Platform info:', {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine
      });
      
      dog && console.log('🎉 [main.ts] Application startup completed!');
    })
    .catch((err) => {
      const loadTime = performance.now() - startTime;
      dog && console.error('💥 [main.ts] Failed to load Angular platform:', {
        error: err,
        loadTimeMs: Math.round(loadTime),
        timestamp: new Date().toISOString()
      });
      
      // Log detailed error information
      if (err.message) {
        dog && console.error('📝 [main.ts] Error message:', err.message);
      }
      if (err.stack) {
        dog && console.error('📚 [main.ts] Error stack:', err.stack);
      }
      if (err.name) {
        dog && console.error('🏷️ [main.ts] Error name:', err.name);
      }
      
      // Log additional debugging info
      dog && console.log('🔍 [main.ts] Debug information:', {
        documentReady: document.readyState,
        hasAppModule: !!AppModule,
        hasPlatformBrowserDynamic: !!platformBrowserDynamic,
        windowLocation: window.location.href
      });
    });
}

// Add global error handler
window.addEventListener('error', (event) => {
  dog && console.error('🌍 [main.ts] Global error caught:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error,
    timestamp: new Date().toISOString()
  });
});

window.addEventListener('unhandledrejection', (event) => {
  dog && console.error('🌍 [main.ts] Unhandled promise rejection:', {
    reason: event.reason,
    promise: event.promise,
    timestamp: new Date().toISOString()
  });
});

// Log when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    dog && console.log('📄 [main.ts] DOM content loaded');
  });
} else {
  dog && console.log('📄 [main.ts] DOM already loaded, readyState:', document.readyState);
}

// Log when window is fully loaded
window.addEventListener('load', () => {
  dog && console.log('🌐 [main.ts] Window fully loaded');
});

dog && console.log('📋 [main.ts] Main.ts initialization completed, waiting for platform...');
