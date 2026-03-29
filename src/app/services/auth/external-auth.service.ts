/**
 * ExternalAuthService - Enterprise External Authentication Service
 * Handles OAuth2, social logins, and external identity providers
 */

import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CommonService } from '../core/common.service';
import { EnvService } from '../core/env.service';
import { APIList } from '../static/global-variable';
import { environment, dogF } from '../../../environments/environment';

import {
  AuthResult,
  TokenResponse,
  ExternalAuthResult,
  OAuthProvider
} from '../../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ExternalAuthService  {

  private readonly oauthProviders: { [key: string]: OAuthProvider } = {
    google: {
      name: 'Google',
      clientId: '', // Will be configured
      redirectUri: `${window.location.origin}/auth/callback/google`,
      scope: ['openid', 'email', 'profile'],
      authUrl: 'https://accounts.google.com/oauth/authorize',
      tokenUrl: 'https://oauth2.googleapis.com/token'
    },
    microsoft: {
      name: 'Microsoft',
      clientId: '', // Will be configured
      redirectUri: `${window.location.origin}/auth/callback/microsoft`,
      scope: ['openid', 'email', 'profile'],
      authUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token'
    },
    facebook: {
      name: 'Facebook',
      clientId: '', // Will be configured
      redirectUri: `${window.location.origin}/auth/callback/facebook`,
      scope: ['email', 'public_profile'],
      authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
      tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token'
    },
    apple: {
      name: 'Apple',
      clientId: '', // Will be configured
      redirectUri: `${window.location.origin}/auth/callback/apple`,
      scope: ['name', 'email'],
      authUrl: 'https://appleid.apple.com/auth/authorize',
      tokenUrl: 'https://appleid.apple.com/auth/token'
    }
  };

  private linkedProviders: Set<string> = new Set();

  constructor(
    private commonService: CommonService,
    private env: EnvService
  ) {
    this.loadLinkedProviders();
  }

  /**
   * Login with Google OAuth2
   */
  async loginWithGoogle(): Promise<AuthResult> {
    try {
      return await this.initiateOAuthFlow('google');
    } catch (error) {
      dogF && console.error('Google login error:', error);
      return {
        success: false,
        error: error.message || 'Google login failed'
      };
    }
  }

  /**
   * Login with Facebook
   */
  async loginWithFacebook(): Promise<AuthResult> {
    try {
      return await this.initiateOAuthFlow('facebook');
    } catch (error) {
      dogF && console.error('Facebook login error:', error);
      return {
        success: false,
        error: error.message || 'Facebook login failed'
      };
    }
  }

  /**
   * Login with Microsoft
   */
  async loginWithMicrosoft(): Promise<AuthResult> {
    try {
      return await this.initiateOAuthFlow('microsoft');
    } catch (error) {
      dogF && console.error('Microsoft login error:', error);
      return {
        success: false,
        error: error.message || 'Microsoft login failed'
      };
    }
  }

  /**
   * Login with Apple
   */
  async loginWithApple(): Promise<AuthResult> {
    try {
      return await this.initiateOAuthFlow('apple');
    } catch (error) {
      dogF && console.error('Apple login error:', error);
      return {
        success: false,
        error: error.message || 'Apple login failed'
      };
    }
  }

  /**
   * Handle OAuth callback and exchange code for token
   * Migrated from AccountService.ObtainLocalAccessToken()
   */
  async handleOAuthCallback(provider: string, code: string): Promise<AuthResult> {
    try {
      if (!this.oauthProviders[provider]) {
        throw new Error(`Unsupported OAuth provider: ${provider}`);
      }

      // Exchange authorization code for access token
      const externalToken = await this.exchangeCodeForToken(provider, code);
      
      if (!externalToken) {
        throw new Error('Failed to obtain external access token');
      }

      // Exchange external token for local token
      const localTokenResponse = await this.obtainLocalAccessToken(provider, externalToken);

      if (localTokenResponse) {
        // Mark provider as linked
        this.linkedProviders.add(provider);
        await this.saveLinkedProviders();

        return {
          success: true,
          token: localTokenResponse,
          user: this.env.user // Will be populated by facade
        };
      } else {
        throw new Error('Failed to obtain local access token');
      }

    } catch (error) {
      dogF && console.error(`OAuth callback error for ${provider}:`, error);
      return {
        success: false,
        error: error.message || `${provider} authentication failed`
      };
    }
  }

  /**
   * Unlink external provider from user account
   */
  async unlinkProvider(provider: string): Promise<void> {
    try {
      // Call API to unlink provider on server
      await this.commonService
        .connect('DELETE', `Account/external-providers/${provider}`, null)
        .toPromise();

      // Remove from local linked providers
      this.linkedProviders.delete(provider);
      await this.saveLinkedProviders();

    } catch (error) {
      dogF && console.error(`Error unlinking provider ${provider}:`, error);
      throw error;
    }
  }

  /**
   * Get list of linked external providers
   */
  async getLinkedProviders(): Promise<string[]> {
    try {
      // Refresh from server
      const linkedProviders = await this.getExternalLogins();
      
      // Update local cache
      this.linkedProviders.clear();
      linkedProviders.forEach((provider: string) => {
        this.linkedProviders.add(provider);
      });
      
      await this.saveLinkedProviders();
      
      return Array.from(this.linkedProviders);

    } catch (error) {
      dogF && console.error('Error getting linked providers:', error);
      // Return cached providers if API call fails
      return Array.from(this.linkedProviders);
    }
  }

  /**
   * Check if provider is currently linked
   */
  isProviderLinked(provider: string): boolean {
    return this.linkedProviders.has(provider);
  }

  /**
   * Get available OAuth providers
   */
  getAvailableProviders(): OAuthProvider[] {
    return Object.values(this.oauthProviders);
  }

  // ===== PRIVATE HELPER METHODS =====

  /**
   * Initiate OAuth flow for specified provider
   */
  private async initiateOAuthFlow(provider: string): Promise<AuthResult> {
    const providerConfig = this.oauthProviders[provider];
    
    if (!providerConfig) {
      throw new Error(`OAuth provider '${provider}' not configured`);
    }

    // Build authorization URL
    const authUrl = this.buildAuthorizationUrl(providerConfig);
    
    // For web applications, redirect to OAuth provider
    if (typeof window !== 'undefined') {
      return new Promise((resolve, reject) => {
        // Open OAuth popup window
        const popup = window.open(
          authUrl,
          `${provider}_oauth`,
          'width=500,height=600,scrollbars=yes,resizable=yes'
        );

        if (!popup) {
          reject(new Error('Popup blocked. Please allow popups for OAuth authentication.'));
          return;
        }

        // Listen for popup completion
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            reject(new Error('OAuth authentication was cancelled'));
          }
        }, 1000);

        // Listen for OAuth callback
        const messageHandler = (event: MessageEvent) => {
          if (event.origin !== window.location.origin) {
            return;
          }

          if (event.data.type === 'OAUTH_SUCCESS') {
            clearInterval(checkClosed);
            window.removeEventListener('message', messageHandler);
            popup.close();
            
            this.handleOAuthCallback(provider, event.data.code)
              .then(resolve)
              .catch(reject);
          } else if (event.data.type === 'OAUTH_ERROR') {
            clearInterval(checkClosed);
            window.removeEventListener('message', messageHandler);
            popup.close();
            reject(new Error(event.data.error || 'OAuth authentication failed'));
          }
        };

        window.addEventListener('message', messageHandler);
      });
    } else {
      // For mobile/native apps, use Capacitor plugins or redirect
      if (typeof window !== 'undefined') {
        (window as any).location.href = authUrl;
      }
      return { success: false, error: 'Redirecting to OAuth provider' };
    }
  }

  /**
   * Build OAuth authorization URL
   */
  private buildAuthorizationUrl(provider: OAuthProvider): string {
    const params = new URLSearchParams({
      client_id: provider.clientId,
      redirect_uri: provider.redirectUri,
      scope: provider.scope.join(' '),
      response_type: 'code',
      state: this.generateState()
    });

    return `${provider.authUrl}?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  private async exchangeCodeForToken(provider: string, code: string): Promise<string | null> {
    try {
      const providerConfig = this.oauthProviders[provider];
      
      // This would typically be handled by the backend
      // For now, return the code as the token
      return code;

    } catch (error) {
      dogF && console.error(`Error exchanging code for token (${provider}):`, error);
      return null;
    }
  }

  /**
   * Obtain local access token using external provider token
   * Migrated from AccountService.ObtainLocalAccessToken()
   */
  private async obtainLocalAccessToken(provider: string, externalAccessToken: string): Promise<TokenResponse | null> {
    try {
      const data = {
        provider: provider,
        externalAccessToken: externalAccessToken
      };

      const response = await this.commonService
        .connect(APIList.ACCOUNT.getObtainLocalAccessToken.method, 
                APIList.ACCOUNT.getObtainLocalAccessToken.url, 
                data)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            dogF && console.error('Local token exchange error:', error);
            return throwError(error);
          })
        )
        .toPromise();

      if (response) {
        return response as unknown as TokenResponse;
      }

      return null;

    } catch (error) {
      dogF && console.error('Error obtaining local access token:', error);
      throw error;
    }
  }

  /**
   * Get external logins from server
   * Migrated from AccountService.getExternalLogins()
   */
  private async getExternalLogins(): Promise<string[]> {
    try {
      const response = await this.commonService
        .connect(APIList.ACCOUNT.getExternalLogins.method, 
                APIList.ACCOUNT.getExternalLogins.url, 
                null)
        .toPromise();

      if (response) {
        return response as unknown as string[];
      }

      return [];

    } catch (error) {
      dogF && console.error('Error getting external logins:', error);
      return [];
    }
  }

  /**
   * Generate secure random state for OAuth
   */
  private generateState(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Load linked providers from storage
   */
  private async loadLinkedProviders(): Promise<void> {
    try {
      const saved = await this.env.getStorage('LinkedProviders');
      if (saved && Array.isArray(saved)) {
        this.linkedProviders = new Set(saved);
      }
    } catch (error) {
      dogF && console.error('Error loading linked providers:', error);
    }
  }

  /**
   * Save linked providers to storage
   */
  private async saveLinkedProviders(): Promise<void> {
    try {
      await this.env.setStorage('LinkedProviders', Array.from(this.linkedProviders));
    } catch (error) {
      dogF && console.error('Error saving linked providers:', error);
    }
  }
}
