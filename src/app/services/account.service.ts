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

// Import new enterprise services - Facade Pattern
import { AuthenticationService } from './auth/authentication.service';
import { UserProfileService } from './auth/user-profile.service';
import { ExternalAuthService } from './auth/external-auth.service';
import { SecurityGatewayService } from './auth/security-gateway.service';
import { UserContextService } from './auth/user-context.service';

declare var window: any;

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
		// Initialize context service with environment - safely
		setTimeout(() => {
			if (this.env.user && this.env.user.Id) {
				this.contextService.setCurrentUser(this.env.user);
			}
		}, 0);
		
		// Done: flow
		// 1. check app version
		//   => old: clear all
		// 2. check token
		//   => null || expire: clear all
		// 3. get user info
		//   => fail: clear all
	}

	// ===== FACADE METHODS - DELEGATE TO SPECIALIZED SERVICES =====

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
				dog && console.log('✅ [AccountService] Login successful, loading user data...');
				// Load user data after successful authentication
				await this.loadSavedData(true);
				dog && console.log('✅ [AccountService] User data loaded, returning result');
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
		
		return new Promise((resolve, reject) => {
			if (forceReload) {
				dog && console.log('🔄 [AccountService] Force reload - calling syncGetUserData');
				this.syncGetUserData()
					.then(() => {
						dog && console.log('✅ [AccountService] syncGetUserData completed, loading saved profile');
						this.loadSavedProfile()
							.then(() => {
								dog && console.log('✅ [AccountService] Profile loaded successfully');
								resolve(true);
							})
							.catch((err) => {
								dog && console.error('❌ [AccountService] Error loading saved profile:', err);
								reject(err);
							});
					})
					.catch((err) => {
						dog && console.error('❌ [AccountService] Error in syncGetUserData:', err);
						reject(err);
					});
			} else {
				dog && console.log('📂 [AccountService] No force reload - loading from storage only');
				this.loadSavedProfile()
					.then(() => {
						dog && console.log('✅ [AccountService] Profile loaded from storage');
						resolve(true);
					})
					.catch((err) => {
						dog && console.error('❌ [AccountService] Error loading profile from storage:', err);
						reject(err);
					});
			}
		});
	}

	/**
	 * External OAuth login - Delegates to ExternalAuthService
	 */
	async ObtainLocalAccessToken(provider: string, externalAccessToken: string): Promise<any> {
		const result = await this.externalAuthService.handleOAuthCallback(provider, externalAccessToken);
		
		if (result.success && result.token) {
			await this.setToken(result.token);
			await this.loadSavedData(true);
			return result;
		} else {
			throw new Error(result.error || 'External authentication failed');
		}
	}

	/**
	 * Get external logins - Delegates to ExternalAuthService
	 */
	async getExternalLogins(): Promise<any> {
		return await this.externalAuthService.getLinkedProviders();
	}

	// ===== EXISTING METHODS REMAIN FOR COMPATIBILITY =====

	loadSavedData(forceReload = false) {
		dog && console.log('📂 [AccountService] Loading saved data...', {
			forceReload,
			accountLoaded: this.accountLoaded,
			hasUser: !!this.env.user
		});

		return new Promise((resolve, reject) => {
			if (this.accountLoaded && !forceReload) {
				dog && console.log('✅ [AccountService] Account already loaded, resolving');
				resolve(true);
			} else {
				dog && console.log('🔄 [AccountService] Starting data load sequence...');
				this.checkVersion().then((v) => {
					GlobalData.Version = v;
					dog && console.log('📋 [AccountService] Version checked:', v);
					
					this.getToken().then(() => {
						dog && console.log('🎫 [AccountService] Token retrieved');
						
						this.getProfile(forceReload)
							.then(() => {
								dog && console.log('👤 [AccountService] Profile loaded, updating context...');
								
								// Update UserContextService after profile is loaded
								if (this.env.user) {
									dog && console.log('🔄 [AccountService] Updating UserContextService with user:', this.env.user.Id);
									this.contextService.setCurrentUser(this.env.user);
								}
								
								this.accountLoaded = true;
								dog && console.log('✅ [AccountService] Account loaded successfully');
								
								setTimeout(() => {
									if (this.env.user) {
										dog && console.log('📊 [AccountService] Setting up analytics for user:', this.env.user.Id);
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
								}, 2000);

								this.env.isloaded = true;
								dog && console.log('📢 [AccountService] Publishing loadedLocalData event');
								this.env.publishEvent({
									Code: 'app:loadedLocalData',
								});
								resolve(true);
							})
							.catch((err) => {
								dog && console.error('❌ [AccountService] Error loading profile:', err);
								reject(err);
							});

						//TODO: lazy check profile;
						if (!forceReload)
							this.commonService
								.connect('GET', 'Account/UserName', null)
								.toPromise()
								.then((userName) => {
									if (this.env?.user?.Id && this.env.user.UserName != userName) {
										this.env.setStorage('appVersion', '0.0');
										this.checkVersion();
									} else {
										setTimeout(() => {
											this.getProfile(true)
												.then(() => {
													this.env.publishEvent({ Code: 'app:loadedLocalData' });
												})
												.catch((err) => {
													reject(err);
												});
										}, 5000);
									}
								})
								.catch((err) => {
									this.commonService.checkError(err);
								});
					});
				});
			}
		});
	}

	checkVersion() {
		return new Promise((resolve) => {
			this.env?.ready?.then((_) => {
				Promise.all([this.env.getStorage('appDomain'), this.env.getStorage('appVersion')])
					.then((values) => {
						let appDomain = values[0];
						let version = values[1];

						if (appDomain && appDomain != environment.appDomain) {
							environment.appDomain = appDomain;
						}

						if (this.env.version != version) {
							GlobalData.Token = {
								access_token: 'no token',
								expires_in: 0,
								token_type: '',
								refresh_token: 'no token',
							};
							this.env.clearStorage().then((_) => {
								this.env.setStorage('UserToken', GlobalData.Token).then(() => {
									this.env.user = null;
									this.env.setStorage('UserProfile', null).then(() => {
										this.env.setStorage('appVersion', this.env.version).then(() => {
											location.reload();
											//resolve(this.env.version);
										});
									});
								});
							});
						} else {
							resolve(this.env.version);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			});
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
					this.env.user = profile;
					this.env.rawBranchList = profile.BranchList || [];
					
					dog && console.log('🏢 [AccountService] Loading branches:', this.env.rawBranchList?.length);
					this.env.loadBranch().then((_) => {
						dog && console.log('📢 [AccountService] Publishing updatedUser event');
						this.env.publishEvent({
							Code: 'app:updatedUser',
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
						
						dog && console.log('👤 [AccountService] Setting env.user and branches...');
						this.env.user = profile;
						this.env.rawBranchList = profile.BranchList || [];
						
						dog && console.log('🏢 [AccountService] Loading branches...', this.env.rawBranchList?.length);
						this.env.loadBranch().then((_) => {
							dog && console.log('📢 [AccountService] Publishing updatedUser event');
							this.env.publishEvent({
								Code: 'app:updatedUser',
							});
							
							// Update context service
							this.contextService.setCurrentUser(profile);
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
							this.env.publishEvent({ Code: 'app:updatedUser' });
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
								that.env.publishEvent({ Code: 'app:updatedUser' });
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
								that.env.publishEvent({ Code: 'app:updatedUser' });
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
}
