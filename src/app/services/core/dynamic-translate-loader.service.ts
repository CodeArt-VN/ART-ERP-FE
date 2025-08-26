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

    // For web, always load from current server
    if (environment.languageStrategy?.networkFirst) {
      console.log(`Loading language from current server: ${environment.appDomain}`);
      return this.loadFromServer(environment.appDomain, lang).pipe(
        catchError(error => {
          console.warn(`Failed to load from current server, falling back to assets:`, error);
          return this.loadFromAssets(lang);
        })
      );
    }

    // Fallback to assets
    return this.loadFromAssets(lang);
  }

  private loadFromCurrentServer(lang: string): Observable<any> {
    // Use current environment.appDomain directly (no server waiting)
    console.log(`Loading language from current server: ${environment.appDomain}`);
    return this.loadFromServer(environment.appDomain, lang).pipe(
      catchError(error => {
        console.warn(`Failed to load from current server, falling back to assets:`, error);
        return this.loadFromAssets(lang);
      })
    );
  }

  private loadWithFallbackChain(lang: string, serverUrl?: string): Observable<any> {
    // Use provided server or try to get from storage
    let currentServer = serverUrl;
    if (!currentServer) {
      currentServer = localStorage.getItem('selectedServer');
    }
    
    if (currentServer) {
      console.log(`Loading language from selected server: ${currentServer}`);
      return this.loadFromServer(currentServer, lang).pipe(
        catchError(error => {
          console.warn('Failed to load from selected server, trying appDomain:', error);
          return this.loadFromAppDomain(lang);
        })
      );
    }

    // No server selected, try appDomain
    console.log('No server selected, trying appDomain');
    return this.loadFromAppDomain(lang);
  }

  private loadFromServer(serverUrl: string, lang: string): Observable<any> {
    try {
      const url = new URL(serverUrl);
      const endpoint = `${url.origin}/uploads/i18n/${lang}.json`;
      
      return this.http.get(endpoint).pipe(
          timeout(3000),
          catchError(error => {
            console.warn(`Failed to load language from server ${serverUrl}:`, error);
            return throwError(() => error);
          })
        );
    } catch (error) {
      console.warn(`Invalid server URL: ${serverUrl}`, error);
      return throwError(() => error);
    }
  }

  private loadFromAppDomain(lang: string): Observable<any> {
    if (!environment.appDomain) {
      console.warn('No appDomain configured, falling back to assets');
      return this.loadFromAssets(lang);
    }

    const endpoint = `${environment.appDomain}uploads/i18n/${lang}.json`;
    console.log(`Loading language from appDomain: ${endpoint}`);
    
    return this.http.get(endpoint).pipe(
      timeout(environment.languageStrategy?.cacheTimeout || 10000),
      retry(environment.languageStrategy?.retryAttempts || 2),
      catchError(error => {
        console.warn('Failed to load from appDomain, falling back to assets:', error);
        return this.loadFromAssets(lang);
      })
    );
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

  // Method to reload translations when server changes
  reloadTranslation(lang: string): Observable<any> {
    console.log(`Reloading translation for ${lang} after server change`);
    return this.getTranslation(lang);
  }
}
