import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Capacitor } from '@capacitor/core';

const isDev = !environment.production;
let versionUrl = window.location.origin + environment.appLocation + 'version.json?t=' + new Date().getTime();
const isHybrid = Capacitor.getPlatform() !== 'web';

if (isDev || isHybrid) {
	loadPlatform();
} else {
	fetch(versionUrl)
		.then((response) => response.json())
		.then((data) => {
			const minVersion = data.minVersion;
			const latestVersion = data.latestVersion;
			if (environment.appVersion < minVersion) {
				const basePath = window.location.origin + environment.appLocation + environment.versionLocation.replace('{{REPLACE_VERSION}}', latestVersion);
				window.location.href = `${basePath}`;
			} else {
				loadPlatform();
			}
		})
		.catch((err) => {
			loadPlatform();
		});
}

// Tạo function load platform
export function loadPlatform() {
	platformBrowserDynamic()
		.bootstrapModule(AppModule)
		.catch((err) => console.log(err));
}
