import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of, throwError, from } from 'rxjs';
import { catchError, retry, timeout, switchMap, take, mergeMap } from 'rxjs/operators';
import { Capacitor } from '@capacitor/core';
import { dog, environment } from 'src/environments/environment';
import { StorageService } from '../core/storage.service';
import { CacheManagementService } from '../core/cache-management.service';

@Injectable({
	providedIn: 'root',
})
export class DynamicTranslateLoaderService implements TranslateLoader {
	private readonly isHybrid = Capacitor.getPlatform() !== 'web';

	constructor(
		private http: HttpClient,
		private storage: CacheManagementService
	) {}

	getTranslation(lang: string): Observable<any> {
		dog && console.log(`Loading translation for language: ${lang}`);
		// For hybrid apps, always use local assets
		if (this.isHybrid) {
			dog && console.log('Loading from assets (hybrid mode)');
			return this.loadFromAssets(lang);
		}

		// For web, load from current tenant
		if (environment.languageStrategy?.networkFirst) {
			return this.storage.tracking().pipe(
				// Wait until tracking is true, then take the first true value
				switchMap((tracking) => {
					if (tracking) return of(tracking);

					// Wait for tracking to become true
					return this.storage.tracking().pipe(
						// filter for true values only
						switchMap((t) => (t ? of(t) : [])),
						take(1)
					);
				}),
				switchMap(() => {
					const tenant = this.storage.app.tenant;
					if (lang == 'cache') {
						lang = this.storage.app.lang;
					}
					if (tenant) {
						// Update environment.appDomain with tenant URL
						environment.appDomain = tenant;
						dog && console.log(`Updated environment.appDomain to tenant: ${tenant}`);

						// Load language from updated tenant
						return this.loadFromTenant(tenant, lang).pipe(
							catchError((error) => {
								dog && console.warn(`Failed to load from tenant ${tenant}, falling back to assets:`, error);
								return this.loadFromAssets(lang);
							})
						);
					} else {
						// No tenant found, use current environment.appDomain
						dog && console.log('No tenant found in storage, using current environment.appDomain');
						return this.loadFromTenant(environment.appDomain, lang).pipe(
							catchError((error) => {
								dog && console.warn(`Failed to load from current tenant, falling back to assets:`, error);
								return this.loadFromAssets(lang);
							})
						);
					}
				}),
				catchError((error) => {
					dog && console.error('Error getting tenant from storage:', error);
					// Fallback to current environment.appDomain
					return this.loadFromTenant(environment.appDomain, lang).pipe(
						catchError((fallbackError) => {
							dog && console.warn(`Failed to load from current tenant, falling back to assets:`, fallbackError);
							return this.loadFromAssets(lang);
						})
					);
				})
			);
		}

		// Fallback to assets
		return this.loadFromAssets(lang);
	}

	private loadFromTenant(serverUrl: string, lang: string): Observable<any> {
		try {
			const url = new URL(serverUrl);
			const endpoint = `${url.origin}/uploads/i18n/${lang}.json`;

			return this.http.get(endpoint).pipe(
				timeout(3000),
				catchError((error) => {
					dog && console.warn(`Failed to load language from tenant ${serverUrl}:`, error);
					return throwError(() => error);
				})
			);
		} catch (error) {
			dog && console.warn(`Invalid tenant URL: ${serverUrl}`, error);
			return throwError(() => error);
		}
	}

	private loadFromAssets(lang: string): Observable<any> {
		const endpoint = `./assets/i18n/${lang}.json`;
		dog && console.log(`Loading language from assets: ${endpoint}`);

		return this.http.get(endpoint).pipe(
			catchError((error) => {
				dog && console.error(`Failed to load language from assets: ${endpoint}`, error);
				// Return empty object to prevent app crash
				return of({});
			})
		);
	}
}
