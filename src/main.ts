import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const isDev = !environment.production;
let versionUrl = window.location.origin + environment.appLocation + 'version.json';

if (true) {
	platformBrowserDynamic()
		.bootstrapModule(AppModule)
		.catch((err) => console.log(err));
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
				platformBrowserDynamic()
					.bootstrapModule(AppModule)
					.catch((err) => console.log(err));
			}
		})
		.catch((err) => {
			console.error('Failed to fetch version.json:', err);
			platformBrowserDynamic()
				.bootstrapModule(AppModule)
				.catch((err) => console.log(err));
		});
}
