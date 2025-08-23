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

import {
  IUserProfileService,
  UserProfile,
  UserSettings,
  SettingValue,
  Permission,
  Role
} from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService implements IUserProfileService {

  private userProfile$ = new BehaviorSubject<UserProfile | null>(null);
  private userSettings$ = new BehaviorSubject<UserSettings>({});
  
  private settingList = ['Theme', 'IsCompactMenu', 'IsCacheQuery', 'PinnedForms'];

  constructor(
    private commonService: CommonService,
    private env: EnvService
  ) {}

  /**
   * Get user profile with optional force reload
   */
  async getProfile(forceReload = false): Promise<UserProfile | null> {
    dog && console.log('👤 [UserProfileService] Getting profile...', { forceReload });
    
    try {
      // Check if we have a cached profile
      const cachedProfile = await this.loadSavedProfile();
      dog && console.log('📂 [UserProfileService] Cached profile check:', {
        hasProfile: !!cachedProfile,
        userId: cachedProfile?.Id,
        hasForms: !!cachedProfile?.Forms?.length,
        branchCount: cachedProfile?.BranchList?.length
      });
      
      // Always fetch fresh data if:
      // 1. Force reload requested
      // 2. No cached profile exists  
      // 3. Cached profile doesn't have forms (incomplete data)
      const shouldFetchFresh = forceReload || !cachedProfile || !cachedProfile?.Forms?.length;
      
      if (shouldFetchFresh) {
        dog && console.log('🔄 [UserProfileService] Fetching fresh user data...', {
          reason: forceReload ? 'force_reload' : !cachedProfile ? 'no_cache' : 'incomplete_data'
        });
        await this.syncGetUserData();
      } else {
        dog && console.log('✅ [UserProfileService] Using cached profile');
      }
      
      const profile = await this.loadSavedProfile();
      dog && console.log('👤 [UserProfileService] Final profile loaded:', {
        hasProfile: !!profile,
        userId: profile?.Id,
        formsCount: profile?.Forms?.length,
        branchCount: profile?.BranchList?.length
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
      
      // Publish event
      this.env.publishEvent({ Code: 'app:updatedUser' });
      
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
        this.env.publishEvent({ Code: 'app:updatedUser' });
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
      
      if (profile && profile.Permissions) {
        return profile.Permissions;
      }
      
      // Extract permissions from forms if no explicit permissions
      const permissions: Permission[] = [];
      if (profile && profile.Forms) {
        this.extractPermissionsFromForms(profile.Forms, permissions);
      }
      
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
      return permissions.some(p => 
        p.id === permission || 
        p.name === permission ||
        `${p.resource}:${p.action}` === permission
      );
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
   * Sync get user data from server
   * Migrated from AccountService.syncGetUserData()
   */
  private async syncGetUserData(): Promise<void> {
    dog && console.log('🔄 [UserProfileService] Starting syncGetUserData...');
    
    try {
      dog && console.log('🌐 [UserProfileService] Calling getUserData API...', {
        method: APIList.ACCOUNT.getUserData.method,
        url: APIList.ACCOUNT.getUserData.url + '?GetMenu=true'
      });
      
      // This would require access to status and type providers
      // For now, we'll use the common service directly
      const response = await this.commonService
        .connect(APIList.ACCOUNT.getUserData.method, 
                APIList.ACCOUNT.getUserData.url + '?GetMenu=true', 
                null)
        .toPromise();

      dog && console.log('📊 [UserProfileService] API response received:', {
        hasResponse: !!response,
        hasAvatar: !!(response as any)?.Avatar,
        formsCount: (response as any)?.Forms?.length,
        branchesCount: (response as any)?.Branchs?.length || (response as any)?.BranchList?.length
      });

      if (response) {
        const userData = response as unknown as UserProfile;
        const responseData = response as any;
        
        // Process avatar URL
        if (userData.Avatar) {
          dog && console.log('🖼️ [UserProfileService] Processing avatar URL');
          userData.Avatar = userData.Avatar.indexOf('http') !== -1 
            ? userData.Avatar 
            : environment.appDomain + userData.Avatar;
        }

        // Build flat tree for forms
        if (userData.Forms) {
          dog && console.log('🌲 [UserProfileService] Building forms tree...', userData.Forms.length);
          const flatForms = await lib.buildFlatTree(userData.Forms, userData.Forms, true);
          userData.Forms = (flatForms as any[]).filter((d: any) => !d.isMobile);
          dog && console.log('📱 [UserProfileService] Desktop forms filtered:', userData.Forms.length);
        }

        // Ensure BranchList is set
        if (responseData.Branchs && !userData.BranchList) {
          dog && console.log('🏢 [UserProfileService] Setting BranchList from Branchs');
          userData.BranchList = responseData.Branchs;
        }

        dog && console.log('💾 [UserProfileService] Saving profile...', {
          userId: userData.Id,
          formsCount: userData.Forms?.length,
          branchCount: userData.BranchList?.length
        });

        // Save profile
        await this.setProfile(userData);
        dog && console.log('✅ [UserProfileService] Profile saved successfully');
      } else {
        dog && console.error('❌ [UserProfileService] No user data received');
        throw new Error('No user data received');
      }

    } catch (error) {
      dog && console.error('❌ [UserProfileService] Error syncing user data:', error);
      throw error;
    }
  }

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
   */
  private async setProfile(profile: UserProfile): Promise<void> {
    try {
      await this.env.setStorage('UserProfile', profile);
    } catch (error) {
      dog && console.error('Error setting profile:', error);
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
      let setting = settings ? settings.find(d => d.Code === settingCode) : null;

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
          Email: profile.Email
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
          action: 'access'
        });
      }

      // Recursively extract from children
      if (form.children && form.children.length > 0) {
        this.extractPermissionsFromForms(form.children, permissions);
      }
    }
  }
}
