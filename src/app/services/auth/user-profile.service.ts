/**
 * UserProfileService - Enterprise User Profile Management Service
 * Handles user profile CRUD, settings, permissions, and roles
 */

import { Injectable } from '@angular/core';
import { CommonService } from '../core/common.service';
import { EnvService } from '../core/env.service';
import { APIList } from '../static/global-variable';

import { UserContextService } from './user-context.service';

import { UserProfile, UserSettings } from '../../interfaces/auth.interfaces';
import { dog } from 'src/environments/environment';
import { SYS_StatusProvider, SYS_TypeProvider, SYS_UserSettingProvider } from '../static/services.service';
import { CacheManagementService } from '../core/cache-management.service';

@Injectable({
	providedIn: 'root',
})
export class UserProfileService {
	constructor(
		private typeProvider: SYS_TypeProvider,
		private statusProvider: SYS_StatusProvider,
		private userSettingProvider: SYS_UserSettingProvider,
		private commonService: CommonService,
		private userContextService: UserContextService,
		private env: EnvService,
		private cache: CacheManagementService
	) {}

	async getProfile(): Promise<void> {
		dog && console.log('👤 [UserProfileService] Getting profile...');

		try {
			// Get fresh data from API and process through UserContextService
			const userData = await this.commonService.connect(APIList.ACCOUNT.getUserData.method, APIList.ACCOUNT.getUserData.url + '?GetMenu=true', null).toPromise();

			dog && console.log('👤 [UserProfileService] Profile loaded from server', userData);
			await this.userContextService.setupUserContext(userData);
			await this.preLoadData();
		} catch (error) {
			dog && console.error('❌ [UserProfileService] Error getting profile:', error);
			throw error;
		}
	}

	async setPinnedForms(pinnedForms: any[]): Promise<void> {
		this.env.user.UserSetting.PinnedForms.Value = JSON.stringify(pinnedForms);
		this.userSettingProvider.save(this.env.user.UserSetting.PinnedForms).then((response: any) => {
			if (!this.env.user.UserSetting.PinnedForms.Id) {
				this.env.user.UserSetting.PinnedForms.Id = response.Id;
			}
			this.userContextService.setCurrentUser(this.env.user);
		});
	}

	async changeTheme(theme: string): Promise<void> {
		this.env.user.UserSetting.Theme.Value = theme;
		this.cache.set('Theme', theme, { enable: true, timeToLive: 365 * 24 * 60 });
		this.userSettingProvider.save(this.env.user.UserSetting.Theme).then((response: any) => {
			this.userContextService.setCurrentUser(this.env.user);
		});
	}

	toogleCompactMenu() {
		this.env.user.UserSetting.IsCompactMenu.Value = !this.env.user.UserSetting.IsCompactMenu.Value;
		this.userContextService.setCurrentUser(this.env.user);
	}

	async preLoadData(): Promise<void> {
		let typeList = await this.typeProvider.read({ Take: 10000 }, true);
		let statusList = await this.statusProvider.read({ Take: 10000 }, true);
		this.cache.set('SYS_Type', typeList);
		this.cache.set('SYS_Status', statusList);
	}
}
