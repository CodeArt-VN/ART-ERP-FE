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
import { environment } from '../../../environments/environment';

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
  async getProfile(forceReload = false): Promise<UserProfile> {
    try {
      if (forceReload) {
        await this.syncGetUserData();
      }
      
      return await this.loadSavedProfile();
    } catch (error) {
      console.error('Error getting profile:', error);
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
      console.error('Error updating profile:', error);
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
      console.error('Error getting user settings:', error);
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
      console.error('Error updating user settings:', error);
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
      console.error('Error getting user permissions:', error);
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
      console.error('Error checking permission:', error);
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
      console.error('Error getting user roles:', error);
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
    try {
      // This would require access to status and type providers
      // For now, we'll use the common service directly
      const response = await this.commonService
        .connect(APIList.ACCOUNT.getUserData.method, 
                APIList.ACCOUNT.getUserData.url + '?GetMenu=true', 
                null)
        .toPromise();

      if (response) {
        const userData = response as unknown as UserProfile;
        
        // Process avatar URL
        if (userData.Avatar) {
          userData.Avatar = userData.Avatar.indexOf('http') !== -1 
            ? userData.Avatar 
            : environment.appDomain + userData.Avatar;
        }

        // Build flat tree for forms
        if (userData.Forms) {
          const flatForms = await lib.buildFlatTree(userData.Forms, userData.Forms, true);
          userData.Forms = (flatForms as any[]).filter((d: any) => !d.isMobile);
        }

        // Save profile
        await this.setProfile(userData);
      } else {
        throw new Error('No user data received');
      }

    } catch (error) {
      console.error('Error syncing user data:', error);
      throw error;
    }
  }

  /**
   * Load saved profile from storage
   * Migrated from AccountService.loadSavedProfile()
   */
  private async loadSavedProfile(): Promise<UserProfile> {
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
        // No profile found
        this.env.user = null;
        this.env.rawBranchList = [];
        await this.env.loadBranch();
        
        // Update observables
        this.userProfile$.next(null);
        this.userSettings$.next({});
        
        throw new Error('No user profile found');
      }

    } catch (error) {
      console.error('Error loading saved profile:', error);
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
      console.error('Error setting profile:', error);
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
