/**
 * UserProfileService - Enterprise User Profile Management Service
 * Handles user profile CRUD, settings, permissions, and roles
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CommonService } from '../core/common.service';
import { EnvService } from '../core/env.service';
import { APIList } from '../static/global-variable';
import { lib } from '../static/global-functions';
import { environment, dog } from '../../../environments/environment';
import { EVENT_TYPE } from '../static/event-type';
import { UserContextService } from './user-context.service';

import { UserProfile, UserSettings, SettingValue, Permission, Role } from '../interfaces/auth.interfaces';

@Injectable({
	providedIn: 'root',
})
export class UserProfileService  {
	private userProfile$ = new BehaviorSubject<UserProfile | null>(null);
	private userSettings$ = new BehaviorSubject<UserSettings>({});

	private settingList = ['Theme', 'IsCompactMenu', 'IsCacheQuery', 'PinnedForms'];

	constructor(
		private commonService: CommonService,
		private env: EnvService,
		private userContextService: UserContextService
	) {}

	/**
	 * Get user profile with optional force reload
	 */
	async getProfile(forceReload = false): Promise<UserProfile | null> {
		dog && console.log('👤 [UserProfileService] Getting profile...', { forceReload });

		try {
			// Get fresh data from API and process through UserContextService
			const userData = await this.commonService.connect(APIList.ACCOUNT.getUserData.method, APIList.ACCOUNT.getUserData.url + '?GetMenu=true', null).toPromise();

			await this.userContextService.setupUserContext(userData);

			const profile = await this.loadSavedProfile();
			dog &&
				console.log('👤 [UserProfileService] Final profile loaded:', {
					hasProfile: !!profile,
					userId: profile?.Id,
					formsCount: profile?.Forms?.length,
					branchCount: profile?.BranchList?.length,
				});

			return profile;
		} catch (error) {
			dog && console.error('❌ [UserProfileService] Error getting profile:', error);
			// Return null instead of throwing error when no profile found
			if (error.message?.includes('No user profile found')) {
				return null;
			}
			throw error;
		}
	}

	/**
	 * Update user profile
	 */
	async updateProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
		try {
			// Merge with current profile
			const currentProfile = await this.loadSavedProfile();
			const updatedProfile = { ...currentProfile, ...profile };

			// Save to storage
			await this.setProfile(updatedProfile);

			// Update observable
			this.userProfile$.next(updatedProfile);

			// Publish event: cập nhật thông tin user
			this.env.publishEvent({ Code: EVENT_TYPE.USER.PROFILE_UPDATED, data: updatedProfile });

			return updatedProfile;
		} catch (error) {
			dog && console.error('Error updating profile:', error);
			throw error;
		}
	}

	/**
	 * Get user settings
	 */
	async getUserSettings(): Promise<UserSettings> {
		try {
			const profile = await this.loadSavedProfile();

			if (profile && profile.UserSetting) {
				return profile.UserSetting;
			}

			// Return default settings if none exist
			return this.loadUserSettings([], profile);
		} catch (error) {
			dog && console.error('Error getting user settings:', error);
			throw error;
		}
	}

	/**
	 * Update user settings
	 */
	async updateUserSettings(settings: Partial<UserSettings>): Promise<void> {
		try {
			const profile = await this.loadSavedProfile();

			if (profile) {
				// Merge settings
				const currentSettings = profile.UserSetting || {};
				const updatedSettings = { ...currentSettings, ...settings };

				// Update profile with new settings
				profile.UserSetting = updatedSettings;

				// Save updated profile
				await this.setProfile(profile);

				// Update observables
				this.userSettings$.next(updatedSettings);
				this.userProfile$.next(profile);

				// Publish event
				this.env.publishEvent({ Code: EVENT_TYPE.APP.UPDATED_USER });
			}
		} catch (error) {
			dog && console.error('Error updating user settings:', error);
			throw error;
		}
	}

	/**
	 * Get user permissions
	 */
	async getUserPermissions(): Promise<Permission[]> {
		try {
			const profile = await this.loadSavedProfile();
			let permissions: Permission[] = [];

			if (profile && profile.Permissions) {
				permissions = profile.Permissions;
			} else if (profile && profile.Forms) {
				this.extractPermissionsFromForms(profile.Forms, permissions);
			}
			// Publish event: cập nhật quyền/role động
			this.env.publishEvent({ Code: EVENT_TYPE.USER.PERMISSIONS_UPDATED, data: permissions });
			return permissions;
		} catch (error) {
			dog && console.error('Error getting user permissions:', error);
			return [];
		}
	}

	/**
	 * Check if user has specific permission
	 */
	async hasPermission(permission: string): Promise<boolean> {
		try {
			const permissions = await this.getUserPermissions();
			return permissions.some((p) => p.id === permission || p.name === permission || `${p.resource}:${p.action}` === permission);
		} catch (error) {
			dog && console.error('Error checking permission:', error);
			return false;
		}
	}

	/**
	 * Get user roles
	 */
	async getUserRoles(): Promise<Role[]> {
		try {
			const profile = await this.loadSavedProfile();

			if (profile && profile.Roles) {
				return profile.Roles;
			}

			return [];
		} catch (error) {
			dog && console.error('Error getting user roles:', error);
			return [];
		}
	}

	/**
	 * Update user permissions
	 */
	async updateUserPermissions(permissions: Permission[]): Promise<void> {
		try {
			dog && console.log('🔐 [UserProfileService] Updating user permissions:', permissions.length);

			// Get current profile
			const currentProfile = await this.loadSavedProfile();
			if (currentProfile) {
				// Update permissions
				currentProfile.Permissions = permissions;

				// Save updated profile
				await this.setProfile(currentProfile);

				// Publish event: cập nhật quyền/role động
				this.env.publishEvent({ Code: EVENT_TYPE.USER.PERMISSIONS_UPDATED, data: permissions });
				dog && console.log('📢 [UserProfileService] Permissions updated event published');
			}
		} catch (error) {
			dog && console.error('Error updating user permissions:', error);
			throw error;
		}
	}

	/**
	 * Update user roles
	 */
	async updateUserRoles(roles: Role[]): Promise<void> {
		try {
			dog && console.log('🎭 [UserProfileService] Updating user roles:', roles.length);

			// Get current profile
			const currentProfile = await this.loadSavedProfile();
			if (currentProfile) {
				// Update roles
				currentProfile.Roles = roles;

				// Save updated profile
				await this.setProfile(currentProfile);

				// Publish event: cập nhật quyền/role động
				this.env.publishEvent({ Code: EVENT_TYPE.USER.ROLES_UPDATED, data: roles });
				dog && console.log('📢 [UserProfileService] Roles updated event published');
			}
		} catch (error) {
			dog && console.error('Error updating user roles:', error);
			throw error;
		}
	}

	/**
	 * Update user profile with specific fields
	 */
	async updateProfileFields(fields: Partial<UserProfile>): Promise<UserProfile> {
		try {
			dog && console.log('📝 [UserProfileService] Updating profile fields:', Object.keys(fields));

			// Get current profile
			const currentProfile = await this.loadSavedProfile();
			if (!currentProfile) {
				throw new Error('No profile found to update');
			}

			// Merge fields
			const updatedProfile = { ...currentProfile, ...fields };

			// Save updated profile
			await this.setProfile(updatedProfile);

			// Publish event: cập nhật thông tin user động
			this.env.publishEvent({ Code: EVENT_TYPE.USER.PROFILE_UPDATED, data: updatedProfile });
			dog && console.log('📢 [UserProfileService] Profile fields updated event published');

			return updatedProfile;
		} catch (error) {
			dog && console.error('Error updating profile fields:', error);
			throw error;
		}
	}

	/**
	 * Get user profile observable
	 */
	getUserProfile(): Observable<UserProfile | null> {
		return this.userProfile$.asObservable();
	}

	/**
	 * Get user settings observable
	 */
	getUserSettingsObservable(): Observable<UserSettings> {
		return this.userSettings$.asObservable();
	}

	// ===== PRIVATE HELPER METHODS =====

	/**
	 * Load saved profile from storage
	 * Migrated from AccountService.loadSavedProfile()
	 */
	private async loadSavedProfile(): Promise<UserProfile | null> {
		try {
			const profile = await this.env.getStorage('UserProfile');

			if (profile && profile.Id) {
				// Process user settings
				if (Array.isArray(profile.UserSetting)) {
					const settings = lib.cloneObject(profile.UserSetting);
					profile.UserSetting = this.loadUserSettings(settings, profile);
				}

				// Update environment
				this.env.user = profile;
				this.env.rawBranchList = profile.BranchList || [];

				// Load branch data
				await this.env.loadBranch();

				// Update observables
				this.userProfile$.next(profile);
				if (profile.UserSetting) {
					this.userSettings$.next(profile.UserSetting);
				}

				return profile;
			} else {
				// No profile found - return null instead of throwing error
				dog && console.log('📭 [UserProfileService] No user profile found in storage');

				this.env.user = null;
				this.env.rawBranchList = [];
				await this.env.loadBranch();

				// Update observables
				this.userProfile$.next(null);
				this.userSettings$.next({});

				return null;
			}
		} catch (error) {
			dog && console.error('🚨 [UserProfileService] Error loading saved profile:', error);
			throw error;
		}
	}

	/**
	 * Set profile in storage
	 * Migrated from AccountService.setProfile()
	 */
	async setProfile(profile: UserProfile): Promise<boolean> {
		dog &&
			console.log('💾 [UserProfileService] Setting profile:', {
				hasProfile: !!profile,
				userId: profile?.Id,
				branchCount: profile?.BranchList?.length,
				formsCount: profile?.Forms?.length,
			});

		try {
			// Validate profile
			if (!profile || !profile.Id) {
				dog && console.log('🚫 [UserProfileService] No profile to set');
				this.env.user = null;
				this.env.rawBranchList = [];
				return true;
			}

			// Save to storage
			await this.env.setStorage('UserProfile', profile);

			// Update environment immediately
			dog && console.log('👤 [UserProfileService] Updating env.user immediately');

			let settings = null;
			if (Array.isArray(profile.UserSetting)) {
				settings = lib.cloneObject(profile.UserSetting);
				profile.UserSetting = this.loadUserSettings(settings, profile);
			}

			// Ensure BranchList and Forms are always present
			if (profile.Branchs && !profile.BranchList) {
				profile.BranchList = profile.Branchs;
			}
			if (!profile.Forms && profile.Menu) {
				profile.Forms = profile.Menu;
			}

			this.env.user = profile;
			this.env.rawBranchList = profile.BranchList || [];

			dog && console.log('🏢 [UserProfileService] Loading branches:', this.env.rawBranchList?.length);

			await this.env.loadBranch();

			dog && console.log('📢 [UserProfileService] Publishing updatedUser event');
			this.env.publishEvent({
				Code: EVENT_TYPE.APP.UPDATED_USER,
			});

			return true;
		} catch (error) {
			dog && console.error('❌ [UserProfileService] Error setting profile:', error);
			throw error;
		}
	}

	/**
	 * Load user settings
	 * Migrated from AccountService.loadUserSettings()
	 */
	private loadUserSettings(settings: any[], profile: UserProfile): UserSettings {
		const userSetting: UserSettings = {};

		for (let idx = 0; idx < this.settingList.length; idx++) {
			const settingCode = this.settingList[idx];
			let setting = settings ? settings.find((d) => d.Code === settingCode) : null;

			if (setting && setting.Value) {
				try {
					setting.Value = JSON.parse(setting.Value);
				} catch (error) {
					// Keep original value if JSON parsing fails
				}
			} else {
				setting = {
					Id: 0,
					Code: settingCode,
					Value: null,
					IDUser: profile.Id,
					Email: profile.Email,
				};
			}

			userSetting[settingCode] = setting as SettingValue;
		}

		return userSetting;
	}

	/**
	 * Extract permissions from form structure
	 */
	private extractPermissionsFromForms(forms: any[], permissions: Permission[]): void {
		for (const form of forms) {
			if (form.Code) {
				permissions.push({
					id: form.Code,
					name: form.Name || form.Code,
					description: `Access to ${form.Name || form.Code}`,
					resource: form.Code,
					action: 'access',
				});
			}

			// Recursively extract from children
			if (form.children && form.children.length > 0) {
				this.extractPermissionsFromForms(form.children, permissions);
			}
		}
	}
}
