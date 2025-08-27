import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of, throwError, from } from 'rxjs';
import { catchError, retry, timeout, switchMap, take, mergeMap } from 'rxjs/operators';
import { Capacitor } from '@capacitor/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DynamicTranslateLoaderService implements TranslateLoader {
  private readonly isHybrid = Capacitor.getPlatform() !== 'web';

  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    console.log(`Loading translation for language: ${lang}`);
    
    // For hybrid apps, always use local assets
    if (this.isHybrid) {
      console.log('Loading from assets (hybrid mode)');
      return this.loadFromAssets(lang);
    }

    // For web, always load from current tenant
    if (environment.languageStrategy?.networkFirst) {
      console.log(`Loading language from current tenant: ${environment.appDomain}`);
      return this.loadFromTenant(environment.appDomain, lang).pipe(
        catchError(error => {
          console.warn(`Failed to load from current tenant, falling back to assets:`, error);
          return this.loadFromAssets(lang);
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
          catchError(error => {
            console.warn(`Failed to load language from tenant ${serverUrl}:`, error);
            return throwError(() => error);
          })
        );
    } catch (error) {
      console.warn(`Invalid tenant URL: ${serverUrl}`, error);
      return throwError(() => error);
    }
  }

  private loadFromAssets(lang: string): Observable<any> {
    const endpoint = `./assets/i18n/${lang}.json`;
    console.log(`Loading language from assets: ${endpoint}`);
    
    return this.http.get(endpoint).pipe(
      catchError(error => {
        console.error(`Failed to load language from assets: ${endpoint}`, error);
        // Return empty object to prevent app crash
        return of({});
      })
    );
  }

}
