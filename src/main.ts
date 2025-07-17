import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const isDev = !environment.production;
let versionUrl = 'version.json';

if (isDev) {
   platformBrowserDynamic()
	   .bootstrapModule(AppModule)
	   .catch(err => console.log(err));
} else {
   fetch(versionUrl)
	   .then(response => response.json())
	   .then(data => {
		   const latestVersion = data.latestVersion;
		   if (!window.location.pathname.includes(latestVersion)) {
			   const basePath = environment.baseHref.replace('{{REPLACE_VERSION}}', latestVersion);
			   window.location.href = `${basePath}index.html`;
		   } else {
			   platformBrowserDynamic()
				   .bootstrapModule(AppModule)
				   .catch(err => console.log(err));
		   }
	   })
	   .catch(err => {
		   console.error('Failed to fetch version.json:', err);
		   platformBrowserDynamic()
			   .bootstrapModule(AppModule)
			   .catch(err => console.log(err));
	   });
}
