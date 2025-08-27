import { Injectable } from '@angular/core';
import { APIList, GlobalData } from '../services/static/global-variable';
import { CommonService } from '../services/core/common.service';
import { ApiSetting } from './static/api-setting';
import { EnvService } from './core/env.service';
import { Platform } from '@ionic/angular';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { lib } from './static/global-functions';
import { SYS_StatusProvider, SYS_TypeProvider, SYS_UserDeviceProvider } from './static/services.service';
import { Device } from '@capacitor/device';
import { Capacitor } from '@capacitor/core';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { environment, dog } from 'src/environments/environment';
import { EVENT_TYPE } from './static/event-type';

// Import new enterprise services - Facade Pattern
import { AuthenticationService } from './auth/authentication.service';
import { UserProfileService } from './auth/user-profile.service';
import { ExternalAuthService } from './auth/external-auth.service';
import { SecurityGatewayService } from './auth/security-gateway.service';
import { UserContextService } from './auth/user-context.service';

declare var window: any;

interface AuthData {
	userToken: any;
	userProfile: any; 
	appVersion: string;
	lastServer: string;
	currentServer: string;
}

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	accountLoaded = false;
	
	constructor(
		public commonService: CommonService,
		private statusProvider: SYS_StatusProvider,
		private typeProvider: SYS_TypeProvider,
		private userDeviceProvider: SYS_UserDeviceProvider,
		public env: EnvService,
		public plt: Platform,
		
		// Enterprise services - Facade Pattern
		private authService: AuthenticationService,
		private profileService: UserProfileService,
		private externalAuthService: ExternalAuthService,
		private securityService: SecurityGatewayService,
		private contextService: UserContextService
	) {
	}


	
	/**
	 * Login user - Delegates to AuthenticationService
	 */
	async login(username: string, password: string): Promise<any> {
		dog && console.log('🏛️ [AccountService] Login facade called', {
			username,
			hasPassword: !!password
		});

		try {
			dog && console.log('🔄 [AccountService] Delegating to AuthenticationService...');
			const result = await this.authService.login({ username, password });
			dog && console.log('📋 [AccountService] AuthService result:', result);
			
			if (result.success && result.token) {
				dog && console.log('✅ [AccountService] Login successful, fetching user info...');
				// Step 2: Fetch user info from server
				await this.syncGetUserData();
				dog && console.log('✅ [AccountService] User info fetched, validating auth...');
				// Now validate stored auth (token + profile)
				await this.validateStoredAuth();
				dog && console.log('✅ [AccountService] Auth validated, returning result');
				return result;
			} else {
				dog && console.error('❌ [AccountService] Login failed:', result.error);
				throw new Error(result.error || 'Login failed');
			}
		} catch (error) {
			dog && console.error('🚨 [AccountService] Login exception:', error);
			throw error;
		}
	}

	/**
	 * Get user profile - Uses original logic but with debugging
	 */
	async getProfile(forceReload = false): Promise<any> {
		dog && console.log('🔍 [AccountService] getProfile called:', { forceReload });
		// Delegate to UserProfileService
		return await this.profileService.getProfile(forceReload);
	}

	async updateProfile(profile: Partial<any>): Promise<any> {
		dog && console.log('📝 [AccountService] updateProfile called');
		return await this.profileService.updateProfile(profile);
	}

	async getUserSettings(): Promise<any> {
		dog && console.log('🔍 [AccountService] getUserSettings called');
		return await this.profileService.getUserSettings();
	}

	async updateUserSettings(settings: Partial<any>): Promise<void> {
		dog && console.log('📝 [AccountService] updateUserSettings called');
		return await this.profileService.updateUserSettings(settings);
	}

	async getUserPermissions(): Promise<any[]> {
		dog && console.log('🔍 [AccountService] getUserPermissions called');
		return await this.profileService.getUserPermissions();
	}

	async hasPermission(permission: string): Promise<boolean> {
		dog && console.log('🔍 [AccountService] hasPermission called');
		return await this.profileService.hasPermission(permission);
	}

	async getUserRoles(): Promise<any[]> {
		dog && console.log('🔍 [AccountService] getUserRoles called');
		return await this.profileService.getUserRoles();
	}


	/**
	 * Validate stored authentication data
	 * Replaces the old loadSavedData method
	 */
	async validateStoredAuth(): Promise<boolean> {
		dog && console.log('📂 [AccountService] Validating stored authentication data...');
		
		try {
			// Batch load all authentication data
			const authData = await this.batchLoadAuthData();
			
			// Cross-validate data consistency
			if (!this.crossValidateAuthData(authData)) {
				dog && console.log('❌ [AccountService] Cross validation failed, clearing auth data');
				// Clear invalid data and return false
				await this.clearAuthData();
				return false;
			}

			// Setup user context with validated data
			await this.setupUserContext(authData);
			this.accountLoaded = true;
			this.env.isloaded = true;
			
			// Trigger success events
			this.env.publishEvent({ Code: EVENT_TYPE.APP.LOADED_LOCAL_DATA });
			
			dog && console.log('✅ [AccountService] Authentication validation successful');
			return true;
		} catch (error) {
			console.error('❌ [AccountService] Auth validation failed:', error);
			return false;
		}
	}

	/**
	 * Batch load all authentication related data
	 */
	private async batchLoadAuthData(): Promise<AuthData> {
		dog && console.log('� [AccountService] Batch loading auth data...');
		
		const [userToken, userProfile, appVersion, lastServer] = await Promise.all([
			this.env.getStorage('UserToken'),
			this.env.getStorage('UserProfile'), 
			this.env.getStorage('appVersion'),
			this.env.getStorage('selectedTenant')
		]);

		return {
			userToken,
			userProfile,
			appVersion,
			lastServer,
								currentServer: this.env.selectedTenant
		};
	}

	/**
	 * Cross-validate authentication data consistency
	 */
	private crossValidateAuthData(data: AuthData): boolean {
		dog && console.log('� [AccountService] Cross-validating auth data...', {
			hasToken: !!data.userToken,
			hasProfile: !!data.userProfile,
			serverMatch: data.lastServer === data.currentServer
		});
		
		// Token validation
		if (!data.userToken || !this.authService.validateToken(data.userToken.access_token)) {
			dog && console.log('❌ [AccountService] Token validation failed');
			return false;
		}
		
		// Profile validation  
		if (!data.userProfile || !data.userProfile.Id) {
			dog && console.log('❌ [AccountService] Profile validation failed');
			return false;
		}
		
		// Tenant consistency check
		if (data.lastServer && data.lastServer !== data.currentServer) {
			dog && console.log('❌ [AccountService] Tenant mismatch detected');
			// Tenant changed - auth data invalid
			return false;
		}
		
		// Token-Profile consistency
		// Add additional checks as needed
		
		dog && console.log('✅ [AccountService] Cross validation passed');
		return true;
	}

	/**
	 * Setup user context after validation
	 */
	private async setupUserContext(data: AuthData): Promise<void> {
		dog && console.log('� [AccountService] Setting up user context...');
		
		// Update global token
		GlobalData.Token = data.userToken;
		
		// Setup user profile
		this.env.user = data.userProfile;
		this.env.rawBranchList = data.userProfile.BranchList || [];
		
		// Load branch tree
		await this.env.loadBranch();
		
	// Không gọi trực tiếp setCurrentUser, chỉ publish event
	// UserContextService sẽ tự động xử lý event này
		
		// Load user settings if available
		if (data.userProfile.UserSetting) {
			// Process user settings
		}
		
		// Setup analytics (existing logic)
		this.setupAnalytics();
		
		dog && console.log('✅ [AccountService] User context setup completed');
	}

	/**
	 * Clear authentication data
	 */
	async clearAuthData(): Promise<void> {
		dog && console.log('🧹 [AccountService] Clearing authentication data...');
		
		this.env.user = null;
		this.env.rawBranchList = [];
		this.contextService.setCurrentUser(null);
		this.accountLoaded = false;
		this.env.isloaded = false;
		
		// Clear sensitive storage
		await Promise.all([
			this.env.storage.remove('UserToken'),
			this.env.storage.remove('UserProfile')
		]);
	}

	/**
	 * Setup analytics for the user
	 */
	private setupAnalytics(): void {
		if (this.env.user) {
		
			let woopraId = {
				id: this.env.user.Id,
				email: this.env.user.Email,
				name: this.env.user.FullName,
				avatar: this.env.user.Avatar,
			};
			let woopraInterval: any = setInterval(() => {
				if (window?.woopra) {
					window.woopra.identify(woopraId);
					window.woopra.push();
					if (woopraInterval) {
						clearInterval(woopraInterval);
						woopraInterval = null;
					}
				}
			}, 3000);
		}
	}

	/**
	 * Simplified version check - migration handled separately
	 */
	checkVersion(): Promise<string> {
		return new Promise((resolve) => {
			// Just return the current version
			// Migration is now handled by MigrationService
			resolve(this.env.version);
		});
	}
	
	setToken(token: any) {
		if (token != null) {
			GlobalData.Token = token;
		} else {
			GlobalData.Token = {
				access_token: 'no token',
				expires_in: 0,
				token_type: '',
				refresh_token: 'no token',
			};
		}
		return this.env.setStorage('UserToken', GlobalData.Token);
	}

	getToken() {
		return new Promise((resolve) => {
			this.env?.getStorage('UserToken')?.then((token) => {
				if (token != null) {
					let expires = new Date(token['.expires']);
					let cDate = new Date();
					cDate.setDate(cDate.getDate() + 2);

					if (expires > cDate) {
						GlobalData.Token = token;
					} else {
						GlobalData.Token = null;
					}
				} else {
					GlobalData.Token = null;
				}
				resolve(GlobalData.Token);
			});
		});
	}

	settingList = ['Theme', 'IsCompactMenu', 'IsCacheQuery', 'PinnedForms'];
	
	loadUserSettings(settings: any[], profile = this.env.user) {
		let userSetting: any = {};
		for (let idx = 0; idx < this.settingList.length; idx++) {
			const s = this.settingList[idx];
			let setting = settings ? settings.find((d) => d.Code == s) : null;

			if (setting && setting.Value) {
				try {
					setting.Value = JSON.parse(setting.Value);
				} catch (error) {}
			} else {
				setting = {
					Id: 0,
					Code: s,
					Value: null,
					IDUser: profile.Id,
					Email: profile.Email,
				};
			}
			userSetting[s] = setting;
		}
		return userSetting;
	}

	syncGetUserData() {
		dog && console.log('📋 [AccountService] Starting syncGetUserData...');
		let that = this;
		return new Promise(function (resolve, reject) {
			dog && console.log('🔗 [AccountService] Making API calls for user data...');
			Promise.all([
				that.statusProvider.read({ Take: 10000 }, true),
				that.typeProvider.read({ Take: 10000 }, true),
				that.commonService.connect(APIList.ACCOUNT.getUserData.method, APIList.ACCOUNT.getUserData.url + '?GetMenu=true', null).toPromise(),
			])
				.then((values: any[]) => {
					dog && console.log('📊 [AccountService] API responses received:', {
						statusCount: values[0]['data']?.length,
						typeCount: values[1]['data']?.length,
						userData: !!values[2]
					});
					
					that.env.statusList = values[0]['data'];
					that.env.typeList = values[1]['data'];

					let data = values[2];
					if (data) {
						dog && console.log('👤 [AccountService] Processing user data:', {
							hasAvatar: !!data.Avatar,
							formsCount: data.Forms?.length,
							branchesCount: data.Branchs?.length
						});
						
						data.Avatar = data.Avatar ? (data.Avatar.indexOf('http') != -1 ? data.Avatar : environment.appDomain + data.Avatar) : null;

						lib.buildFlatTree(data.Forms, data.Forms, true).then((resp: any) => {
							dog && console.log('🌲 [AccountService] Forms tree built:', resp?.length);
							data.Forms = resp.filter((d: any) => !d.isMobile);
							dog && console.log('📱 [AccountService] Desktop forms filtered:', data.Forms?.length);
							
							that.setProfile(data)
								.then((_) => {
									dog && console.log('✅ [AccountService] Profile set successfully');
									resolve(true);
								})
								.catch((err) => {
									dog && console.error('❌ [AccountService] Error setting profile:', err);
									reject(err);
								});
						});
					}else{
						dog && console.error('❌ [AccountService] No user data received, logging out');
						that.logout();
					}
				})
				.catch((err) => reject(err));
		});
	}

	setProfile(profile: any) {
		dog && console.log('💾 [AccountService] Setting profile:', {
			hasProfile: !!profile,
			userId: profile?.Id,
			branchCount: profile?.BranchList?.length,
			formsCount: profile?.Forms?.length
		});
		
		return new Promise((resolve, reject) => {
			this.env.setStorage('UserProfile', profile).then((_) => {
				// Immediately update env.user for real-time UI updates
				if (profile && profile.Id) {
					dog && console.log('👤 [AccountService] Updating env.user immediately');
					let settings = null;
					if (Array.isArray(profile.UserSetting)) {
						settings = lib.cloneObject(profile.UserSetting);
						profile.UserSetting = this.loadUserSettings(settings, profile);
					}
					// Ensure BranchList and Forms are always present and correct
					if (profile.Branchs && !profile.BranchList) {
						profile.BranchList = profile.Branchs;
					}
					if (!profile.Forms && profile.Menu) {
						profile.Forms = profile.Menu;
					}
					this.env.user = profile;
					this.env.rawBranchList = profile.BranchList || [];
					dog && console.log('🏢 [AccountService] Loading branches:', this.env.rawBranchList?.length);
					this.env.loadBranch().then((_) => {
						dog && console.log('📢 [AccountService] Publishing updatedUser event');
						this.env.publishEvent({
							Code: EVENT_TYPE.APP.UPDATED_USER,
						});
						resolve(true);
					}).catch(err => {
						dog && console.error('❌ [AccountService] Error loading branches:', err);
						resolve(true); // Still resolve to not break the flow
					});
				} else {
					dog && console.log('🚫 [AccountService] No profile to set');
					this.env.user = null;
					this.env.rawBranchList = [];
					resolve(true);
				}
			}).catch(err => {
				dog && console.error('❌ [AccountService] Error saving profile to storage:', err);
				reject(err);
			});
		});
	}

	// Move normalizeProfile above loadSavedProfile to ensure visibility
	private normalizeProfile(profile: any) {
		// Đảm bảo BranchList luôn là mảng
		if (Array.isArray(profile.BranchList)) {
			// OK
		} else if (Array.isArray(profile.Branchs)) {
			profile.BranchList = profile.Branchs;
		} else {
			profile.BranchList = [];
		}
		// Đảm bảo Forms luôn là mảng
		if (Array.isArray(profile.Forms)) {
			// OK
		} else if (Array.isArray(profile.Menu)) {
			profile.Forms = profile.Menu;
		} else {
			profile.Forms = [];
		}
		return profile;
	}

	loadSavedProfile() {
		dog && console.log('📖 [AccountService] Loading saved profile from storage...');
		return new Promise((resolve, reject) => {
			this.env
				.getStorage('UserProfile')
				.then((profile) => {
					dog && console.log('📋 [AccountService] Profile from storage:', {
						hasProfile: !!profile,
						userId: profile?.Id,
						formsCount: profile?.Forms?.length,
						branchCount: profile?.BranchList?.length
					});
					if (profile && profile.Id) {
						let settings = null;
						if (Array.isArray(profile.UserSetting)) {
							settings = lib.cloneObject(profile.UserSetting);
							profile.UserSetting = this.loadUserSettings(settings, profile);
						}
						profile = this.normalizeProfile(profile);
						dog && console.log('✅ [AccountService] Normalized profile:', profile);
						this.env.user = profile;
						this.env.rawBranchList = profile.BranchList || [];
						dog && console.log('🏢 [AccountService] Loading branches:', this.env.rawBranchList?.length);
						this.env.loadBranch().then((_) => {
							dog && console.log('📢 [AccountService] Publishing updatedUser event');
							this.env.publishEvent({
								Code: EVENT_TYPE.APP.UPDATED_USER,
							});
							// Không gọi trực tiếp setCurrentUser, chỉ publish event
							// UserContextService sẽ tự động xử lý event này
							dog && console.log('✅ [AccountService] Profile loaded and context updated');
							resolve(true);
						}).catch(err => {
							dog && console.error('❌ [AccountService] Error loading branches:', err);
							resolve(true); // Still resolve to not break flow
						});
					} else {
						dog && console.log('🚫 [AccountService] No profile found, clearing data');
						this.env.user = null;
						this.env.rawBranchList = [];
						this.env.loadBranch().then((_) => {
							this.env.publishEvent({ Code: EVENT_TYPE.APP.UPDATED_USER });
							resolve(true);
						});
					}
				})
				.catch((err) => {
					dog && console.error('❌ [AccountService] Error getting profile from storage:', err);
					reject(err);
				});
		});
	}

	register(username: string, password: string, confirmpassword: string, PhoneNumber: string, FullName: string) {
		var that = this;
		return new Promise(function (resolve, reject) {
			let data = {
				Email: username,
				Password: password,
				ConfirmPassword: confirmpassword,
				FullName: FullName,
				PhoneNumber: PhoneNumber,
			};

			that.commonService
				.connect('POST', APIList.ACCOUNT.register.url, data)
				.pipe(
					catchError((error: HttpErrorResponse) => {
						reject(error);
						return throwError(error);
					})
				)
				.subscribe((data) => {
					that.login(username, password)
						.then(() => {
							resolve(true);
						})
						.catch((err) => {
							reject(err);
						});
				});
		});
	}

	logout() {
		var that = this;
		var curentUsername = this.env?.user?.UserName;
		var currentVersion = this.env?.version;
		
		return new Promise(function (resolve, reject) {
			// Use authentication service for logout
			that.authService.logout().then(() => {
				that.env.clearStorage().then((_) => {
					that.env.setStorage('appVersion', currentVersion);

					that.setToken(null);
					that.setProfile(null)
						.then((_) => {
							Promise.all([that.loadSavedProfile(), that.env.setStorage('Username', curentUsername)]).then(() => {
								that.env.publishEvent({ Code: EVENT_TYPE.APP.UPDATED_USER });
								resolve(true);
							});
						})
						.catch((err) => reject(err));
				});
			}).catch((err) => {
				// Fallback to original logout if authentication service fails
				that.env.clearStorage().then((_) => {
					that.env.setStorage('appVersion', currentVersion);

					that.setToken(null);
					that.setProfile(null)
						.then((_) => {
							Promise.all([that.loadSavedProfile(), that.env.setStorage('Username', curentUsername)]).then(() => {
								that.env.publishEvent({ Code: EVENT_TYPE.APP.UPDATED_USER });
								resolve(true);
							});
						})
						.catch((err) => reject(err));
				});
			});
		});
	}

	forgotPassword(email: string) {
		let data = { Email: email };
		return this.commonService.connect(APIList.ACCOUNT.forgotPassword.method, APIList.ACCOUNT.forgotPassword.url, data).toPromise();
	}

	/**
	 * External OAuth login - Delegates to ExternalAuthService
	 */
	async ObtainLocalAccessToken(provider: string, externalAccessToken: string): Promise<any> {
		return await this.externalAuthService.handleOAuthCallback(provider, externalAccessToken);
	}

	/**
	 * Get external logins - Delegates to ExternalAuthService
	 */
	async getExternalLogins(): Promise<any> {
		return await this.externalAuthService.getLinkedProviders();
	}
}
