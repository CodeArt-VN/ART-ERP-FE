import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { Device } from '@capacitor/device';
import { Capacitor } from '@capacitor/core';
import { PushNotifications, Token } from '@capacitor/push-notifications';

import { CommonService } from '../core/common.service';
import { EnvService } from '../core/env.service';
import { GlobalData, APIList } from '../static/global-variable';
import { environment, dog } from '../../../environments/environment';
import { EVENT_TYPE } from '../static/event-type';

import { IAuthenticationService, AuthResult, TokenResponse, LoginCredentials, DeviceInfo, UserProfile, AuthState } from '../interfaces/auth.interfaces';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService implements IAuthenticationService {
	private authState$ = new BehaviorSubject<AuthState>({
		isAuthenticated: false,
		isLoading: false,
		user: undefined,
		token: undefined,
		error: undefined,
	});

	private tokenRefreshTimer?: any;

	constructor(
		private commonService: CommonService,
		private env: EnvService,
		private platform: Platform
	) {
		this.initializeAuthState();
		this.setupSessionMonitoring();
		this.setupMultiTabSync();
		this.setupRemoteLogoutDetection();
		this.setupEventListeners();
	}

	/**
	 * Initialize authentication state on service creation
	 */
	private async initializeAuthState(): Promise<void> {
		const token = await this.getCurrentTokenFromStorage();
		if (token && this.validateToken(token.access_token)) {
			this.updateAuthState({
				isAuthenticated: true,
				token: token,
				isLoading: false,
			});
			this.setupTokenRefresh(token);
		}
	}

	/**
	 * Authenticate user with username and password
	 */
	async login(credentials: LoginCredentials): Promise<AuthResult> {
		dog &&
			console.log('🔑 [AuthService] Starting login process...', {
				username: credentials.username,
				hasPassword: !!credentials.password,
			});

		try {
			this.updateAuthState({ isLoading: true, error: undefined });
			dog && console.log('📍 [AuthService] Auth state updated to loading');

			// Get device information for mobile platforms
			dog && console.log('📱 [AuthService] Getting device info...');
			const deviceInfo = await this.getDeviceInfo();
			dog && console.log('📱 [AuthService] Device info:', deviceInfo);

			const loginData = {
				username: credentials.username,
				password: credentials.password,
			};

			dog &&
				console.log('🌐 [AuthService] Calling login API...', {
					url: APIList.ACCOUNT.token.url,
					method: 'Login',
				});

			const response = await this.commonService
				.connect('Login', APIList.ACCOUNT.token.url, loginData)
				.pipe(
					tap((response) => {
						dog && console.log('✅ [AuthService] Login API response received:', response);
					}),
					catchError((error) => {
						dog && console.error('❌ [AuthService] Login API error:', error);
						this.updateAuthState({
							isLoading: false,
							error: error.message || 'Login failed',
							isAuthenticated: false,
						});
						// Publish login failed event
						this.env.publishEvent({ Code: EVENT_TYPE.USER.LOGIN_FAILED, data: error });
						return throwError(error);
					})
				)
				.toPromise();

			if (!response) {
				dog && console.error('❌ [AuthService] No response from login API');
				throw new Error('Invalid login response');
			}

			dog && console.log('🔄 [AuthService] Processing token response...');

			// Convert response to TokenResponse
			const tokenResponse = response as unknown as TokenResponse;
			dog &&
				console.log('📝 [AuthService] Token response:', {
					hasAccessToken: !!tokenResponse?.access_token,
					hasRefreshToken: !!tokenResponse?.refresh_token,
					expiresIn: tokenResponse?.expires_in,
				});

			// Use the extracted processLoginResponse method
			dog && console.log('✅ [AuthService] Login process completed successfully!');
			return await this.processLoginResponse(response);
		} catch (error) {
			dog && console.error('🚨 [AuthService] Login failed with error:', error);
			dog &&
				console.error('🚨 [AuthService] Error details:', {
					message: error?.message,
					status: error?.status,
					statusText: error?.statusText,
					error: error?.error,
				});

			const errorMessage = error?.message || 'Authentication failed';
			dog && console.log('📝 [AuthService] Setting error state:', errorMessage);

			this.updateAuthState({
				isLoading: false,
				error: errorMessage,
				isAuthenticated: false,
			});
			// Publish login failed event
			this.env.publishEvent({ Code: EVENT_TYPE.USER.LOGIN_FAILED, data: error });

			const failResult = {
				success: false,
				error: errorMessage,
			};

			dog && console.log('❌ [AuthService] Returning failed result:', failResult);
			return failResult;
		}
	}

	/**
	 * Logout user and clear authentication state
	 */
	async logout(): Promise<void> {
		try {
			// Clear token refresh timer
			if (this.tokenRefreshTimer) {
				clearTimeout(this.tokenRefreshTimer);
				this.tokenRefreshTimer = undefined;
			}

			// Clear stored token
			await this.clearToken();

			// Update auth state
			this.updateAuthState({
				isAuthenticated: false,
				isLoading: false,
				user: undefined,
				token: undefined,
				error: undefined,
			});

			// Publish context updated event với data = null để AppComponent biết đây là logout
			this.env.publishEvent({ Code: EVENT_TYPE.USER.CONTEXT_UPDATED, data: { user: null } });
			// Publish remote logout event (nếu cần, ví dụ: đa tab)
			this.env.publishEvent({ Code: EVENT_TYPE.USER.LOGGED_OUT_REMOTE });
		} catch (error) {
			dog && console.error('Logout error:', error);
			// Even if logout fails, clear local state
			this.updateAuthState({
				isAuthenticated: false,
				isLoading: false,
				user: undefined,
				token: undefined,
				error: 'Logout completed with warnings',
			});
		}
	}

	/**
	 * Refresh JWT token
	 */
	async refreshToken(): Promise<TokenResponse> {
		try {
			const currentToken = this.getCurrentToken();
			if (!currentToken) {
				throw new Error('No token available for refresh');
			}

			const tokenData = this.parseToken(currentToken);
			if (!tokenData?.refresh_token) {
				throw new Error('No refresh token available');
			}

			// Call refresh token endpoint (if available)
			// For now, using the existing token refresh mechanism
			const refreshData = {
				refresh_token: tokenData.refresh_token,
				grant_type: 'refresh_token',
			};

			const newToken = await this.commonService
				.connect('POST', APIList.ACCOUNT.token.url, refreshData)
				.pipe(
					catchError((error) => {
						dog && console.error('Token refresh error:', error);
						// If refresh fails, logout user
						this.logout();
						// Publish session expired event
						this.env.publishEvent({ Code: EVENT_TYPE.USER.SESSION_EXPIRED, data: error });
						return throwError(error);
					})
				)
				.toPromise();

			if (newToken) {
				const tokenResponse = newToken as unknown as TokenResponse;
				await this.setToken(tokenResponse);
				this.setupTokenRefresh(tokenResponse);

				this.updateAuthState({
					token: tokenResponse,
					lastActivity: new Date(),
				});

				return tokenResponse;
			}

			throw new Error('Token refresh failed');
		} catch (error) {
			dog && console.error('Token refresh error:', error);
			await this.logout();
			// Publish session expired event
			this.env.publishEvent({ Code: EVENT_TYPE.USER.SESSION_EXPIRED, data: error });
			throw error;
		}
	}

	/**
	 * Validate JWT token
	 */
	validateToken(token: string): boolean {
		if (!token || token === 'no token') {
			return false;
		}

		try {
			const tokenData = this.parseToken(token);
			if (!tokenData) {
				return false;
			}

			// Check expiration
			if (tokenData['.expires']) {
				const expires = new Date(tokenData['.expires']);
				const now = new Date();
				const buffer = new Date();
				buffer.setDate(buffer.getDate() + 2); // 2 day buffer as per original code

				return expires > buffer;
			}

			// If no expiration info, consider it valid for now
			return true;
		} catch (error) {
			dog && console.error('Token validation error:', error);
			return false;
		}
	}

	/**
	 * Get authentication headers for API requests
	 */
	getAuthHeaders(): HttpHeaders {
		const token = this.getCurrentToken();

		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Data-type': 'json',
			'App-Version': environment.appVersion,
		});

		if (token && token !== 'no token') {
			headers = headers.set('Authorization', `Bearer ${token}`);
		}

		return headers;
	}

	/**
	 * Check if user is authenticated
	 */
	isAuthenticated(): boolean {
		const token = this.getCurrentToken();
		return token ? this.validateToken(token) : false;
	}

	/**
	 * Get current JWT token
	 */
	getCurrentToken(): string | null {
		try {
			const tokenData = GlobalData.Token;
			if (tokenData && tokenData.access_token && tokenData.access_token !== 'no token') {
				return tokenData.access_token;
			}
			return null;
		} catch (error) {
			dog && console.error('Error getting current token:', error);
			return null;
		}
	}

	/**
	 * Set JWT token securely
	 */
	async setToken(token: TokenResponse): Promise<void> {
		try {
			if (token) {
				GlobalData.Token = token;
			} else {
				GlobalData.Token = {
					access_token: 'no token',
					expires_in: 0,
					token_type: '',
					refresh_token: 'no token',
				};
			}

			// Store in secure storage
			await this.env.setStorage('UserToken', GlobalData.Token);
		} catch (error) {
			dog && console.error('Error setting token:', error);
			throw error;
		}
	}

	/**
	 * Get authentication state observable
	 */
	getAuthState(): Observable<AuthState> {
		return this.authState$.asObservable();
	}

	// ===== PRIVATE HELPER METHODS =====

	/**
	 * Get current token from storage
	 */
	private async getCurrentTokenFromStorage(): Promise<TokenResponse | null> {
		try {
			const token = await this.env.getStorage('UserToken');

			if (token && token.access_token && token.access_token !== 'no token') {
				return token;
			}

			return null;
		} catch (error) {
			dog && console.error('Error getting token from storage:', error);
			return null;
		}
	}

	/**
	 * Clear stored token
	 */
	private async clearToken(): Promise<void> {
		try {
			GlobalData.Token = {
				access_token: 'no token',
				expires_in: 0,
				token_type: '',
				refresh_token: 'no token',
			};

			await this.env.setStorage('UserToken', GlobalData.Token);
		} catch (error) {
			dog && console.error('Error clearing token:', error);
		}
	}

	/**
	 * Parse JWT token to get payload
	 */
	private parseToken(token: string): any {
		try {
			if (!token || token === 'no token') {
				return null;
			}

			// For JWT tokens, decode the payload
			const parts = token.split('.');
			if (parts.length === 3) {
				const payload = parts[1];
				const decoded = atob(payload);
				return JSON.parse(decoded);
			}

			// For custom token format, return the token itself
			return GlobalData.Token;
		} catch (error) {
			dog && console.error('Error parsing token:', error);
			return null;
		}
	}

	/**
	 * Setup automatic token refresh
	 */
	private setupTokenRefresh(token: TokenResponse): void {
		if (this.tokenRefreshTimer) {
			clearTimeout(this.tokenRefreshTimer);
		}

		// Refresh token 5 minutes before expiration
		const refreshTime = (token.expires_in - 300) * 1000; // Convert to milliseconds

		if (refreshTime > 0) {
			this.tokenRefreshTimer = setTimeout(async () => {
				try {
					await this.refreshToken();
				} catch (error) {
					dog && console.error('Automatic token refresh failed:', error);
					await this.logout();
				}
			}, refreshTime);
		}
	}

	/**
	 * Update authentication state
	 */
	private updateAuthState(updates: Partial<AuthState>): void {
		const currentState = this.authState$.value;
		this.authState$.next({
			...currentState,
			...updates,
		});
	}

	/**
	 * Get device information for mobile platforms
	 */
	private async getDeviceInfo(): Promise<DeviceInfo | null> {
		try {
			if (!Capacitor.isPluginAvailable('Device')) {
				dog && console.warn('Device plugin not available');
				return null;
			}

			const info = await Device.getInfo();
			const uid = await Device.getId();
			const notifyToken = this.env.NotifyToken;

			return {
				Code: uid.identifier,
				Name: info.name,
				Model: info.model,
				Platform: info.platform,
				OperatingSystem: info.operatingSystem,
				OsVersion: info.osVersion,
				Manufacturer: info.manufacturer,
				IsVirtual: info.isVirtual,
				WebViewVersion: info.webViewVersion,
				NotifyToken: notifyToken,
				IDUser: null, // Will be set after login
			};
		} catch (error) {
			dog && console.error('Error getting device info:', error);
			return null;
		}
	}

	/**
	 * Register device for push notifications
	 */
	private async registerDevice(deviceInfo: DeviceInfo): Promise<void> {
		try {
			if (!this.env.user?.Id) {
				return;
			}

			deviceInfo.IDUser = this.env.user.Id;
			const platform = Capacitor.getPlatform();

			if (['mobile', 'tablet', 'ios', 'android'].includes(platform)) {
				await PushNotifications.register();

				PushNotifications.addListener('registration', (token: Token) => {
					this.env.setStorage('NotifyToken', token.value);
					deviceInfo.NotifyToken = token.value;
				});
			}

			// Register device with server (assuming userDeviceProvider exists)
			// This would be handled by the facade or another service
		} catch (error) {
			dog && console.error('Device registration error:', error);
		}
	}

	/**
	 * Setup session monitoring for automatic logout
	 */
	private setupSessionMonitoring(): void {
		// Monitor session activity every minute
		setInterval(() => {
			if (this.isAuthenticated()) {
				const lastActivity = this.getLastActivity();
				const sessionTimeout = this.getSessionTimeout();

				if (Date.now() - lastActivity > sessionTimeout) {
					this.env.publishEvent({ Code: EVENT_TYPE.USER.SESSION_EXPIRED });
					this.logout();
				}
			}
		}, 60000); // Check every minute
	}

	/**
	 * Setup multi-tab synchronization
	 */
	private setupMultiTabSync(): void {
		// Listen for storage changes (multi-tab sync)
		if (typeof window !== 'undefined') {
			window.addEventListener('storage', (event) => {
				if (event.key === 'UserToken' || event.key === 'UserProfile') {
					this.env.publishEvent({
						Code: EVENT_TYPE.USER.STATE_CHANGED_REMOTE,
						data: { key: event.key, newValue: event.newValue, oldValue: event.oldValue },
					});
				}
			});
		}
	}

	/**
	 * Setup remote logout detection
	 */
	private setupRemoteLogoutDetection(): void {
		// Check for remote logout on token validation every 30 seconds
		setInterval(async () => {
			if (this.isAuthenticated()) {
				try {
					await this.validateTokenWithServer();
				} catch (error: any) {
					if (error.status === 401) {
						this.env.publishEvent({ Code: EVENT_TYPE.USER.LOGGED_OUT_REMOTE });
						this.logout();
					}
				}
			}
		}, 30000); // Check every 30 seconds
	}

	/**
	 * Setup event listeners for authentication events
	 */
	private setupEventListeners(): void {
		try {
			// Subscribe to logout request events
			this.env.getEvents().subscribe((event) => {
				if (event.Code === EVENT_TYPE.USER.LOGOUT_REQUESTED) {
					dog && console.log('🚪 [AuthService] Received logout request event');
					this.logout();
				}
			});

			dog && console.log('✅ [AuthService] Event listeners setup completed');
		} catch (error) {
			dog && console.error('❌ [AuthService] Failed to setup event listeners:', error);
		}
	}

	/**
	 * Validate token with server
	 */
	private async validateTokenWithServer(): Promise<boolean> {
		try {
			const token = this.getCurrentToken();
			if (!token) {
				return false;
			}

			// Call validation endpoint
			const response = await this.commonService.connect('GET', APIList.ACCOUNT.validateToken?.url || 'Account/UserName', { token }).toPromise();

			return response && (response as any).valid === true;
		} catch (error) {
			dog && console.error('Token validation with tenant failed:', error);
			return false;
		}
	}

	/**
	 * Get last activity timestamp
	 */
	private getLastActivity(): number {
		const state = this.authState$.value;
		return state.lastActivity ? state.lastActivity.getTime() : Date.now();
	}

	/**
	 * Get session timeout in milliseconds (default: 8 hours)
	 */
	private getSessionTimeout(): number {
		return 8 * 60 * 60 * 1000; // 8 hours in milliseconds
	}

	/**
	 * Handle authentication errors with proper event publishing
	 */
	private handleAuthError(error: any, context: string): void {
		const errorEvent = {
			Code: EVENT_TYPE.USER.AUTH_ERROR,
			data: {
				error,
				context,
				timestamp: new Date(),
				userId: this.env.user?.Id,
			},
		};

		this.env.publishEvent(errorEvent);

		// Specific error handling
		if (error.status === 401) {
			this.env.publishEvent({ Code: EVENT_TYPE.USER.SESSION_EXPIRED });
		} else if (error.status === 403) {
			this.env.publishEvent({ Code: EVENT_TYPE.USER.ACCESS_DENIED });
		} else if (error.status === 429) {
			this.env.publishEvent({ Code: EVENT_TYPE.USER.RATE_LIMITED });
		}
	}

	/**
	 * Login with MFA support
	 */
	async loginWithMFA(credentials: LoginCredentials, mfaCode: string): Promise<AuthResult> {
		try {
			// First step: get MFA challenge
			const mfaChallenge = await this.getMFAChallenge(credentials);

			// Second step: verify MFA code
			const authResult = await this.verifyMFACode(mfaChallenge, mfaCode);

			if (authResult.requiresMfa) {
				this.env.publishEvent({ Code: EVENT_TYPE.USER.MFA_REQUIRED, data: mfaChallenge });
			}

			return authResult;
		} catch (error) {
			this.handleAuthError(error, 'mfa_login');
			throw error;
		}
	}

	/**
	 * Get MFA challenge
	 */
	private async getMFAChallenge(credentials: LoginCredentials): Promise<any> {
		try {
			const response = await this.commonService.connect('POST', APIList.ACCOUNT.mfaChallenge?.url || 'auth/mfa/challenge', credentials).toPromise();

			return response;
		} catch (error) {
			dog && console.error('Error getting MFA challenge:', error);
			throw error;
		}
	}

	/**
	 * Verify MFA code
	 */
	private async verifyMFACode(mfaChallenge: any, mfaCode: string): Promise<AuthResult> {
		try {
			const response = await this.commonService
				.connect('POST', APIList.ACCOUNT.mfaVerify?.url || 'auth/mfa/verify', {
					challengeId: mfaChallenge.id,
					code: mfaCode,
				})
				.toPromise();

			if ((response as any).requiresMFA) {
				return { success: false, requiresMfa: true, error: 'MFA required' };
			}

			// Process successful MFA verification
			return this.processLoginResponse(response);
		} catch (error) {
			dog && console.error('Error verifying MFA code:', error);
			throw error;
		}
	}

	/**
	 * Process login response (extracted from login method)
	 */
	private async processLoginResponse(response: any): Promise<AuthResult> {
		if (!response || !response.access_token) {
			throw new Error('Invalid login response');
		}

		const tokenResponse = response as unknown as TokenResponse;

		// Store token securely
		await this.setToken(tokenResponse);

		// Setup token refresh
		this.setupTokenRefresh(tokenResponse);

		// Get device info and register if mobile
		const deviceInfo = await this.getDeviceInfo();
		if (deviceInfo) {
			await this.registerDevice(deviceInfo);
		}

		const authResult: AuthResult = {
			success: true,
			token: tokenResponse,
			user: this.env.user,
		};

		this.updateAuthState({
			isAuthenticated: true,
			isLoading: false,
			token: tokenResponse,
			error: undefined,
			lastActivity: new Date(),
		});

		// Publish context updated event
		this.env.publishEvent({ Code: EVENT_TYPE.USER.CONTEXT_UPDATED, data: authResult });

		return authResult;
	}
}
