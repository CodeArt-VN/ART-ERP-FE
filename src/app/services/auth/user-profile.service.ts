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
import { dogF } from 'src/environments/environment';
import { SYS_StatusProvider, SYS_TypeProvider, SYS_UserSettingProvider } from '../static/services.service';
import { CacheManagementService } from '../core/cache-management.service';
import { EVENT_TYPE } from '../static/event-type';

@Injectable({
	providedIn: 'root',
})
export class UserProfileService {
	private accountStatusCheckingPromise?: Promise<void>;

	constructor(
		private typeProvider: SYS_TypeProvider,
		private statusProvider: SYS_StatusProvider,
		private userSettingProvider: SYS_UserSettingProvider,
		private commonService: CommonService,
		private userContextService: UserContextService,
		private env: EnvService,
		private cache: CacheManagementService
	) {
		this.cache.tracking().subscribe((tracking) => {
			if (tracking) {
				if (this.cache.app.userProfile) {
					this.checkAppStatusAndTypeList();
				}
			}
		});
	}

	async getProfile(): Promise<void> {
		dogF && console.log('👤 [UserProfileService] Getting profile...');

		try {
			// Get fresh data from API and process through UserContextService
			const userData: any = await this.commonService.connect(APIList.ACCOUNT.getUserData.method, APIList.ACCOUNT.getUserData.url + '?GetMenu=true', null).toPromise();
			this.assertProfileIsActive(userData);

			dogF && console.log('👤 [UserProfileService] Profile loaded from server', userData);
			await this.userContextService.setupUserContext(userData);
			await this.checkAppStatusAndTypeList();
		} catch (error) {
			dogF && console.error('❌ [UserProfileService] Error getting profile:', error);
			throw error;
		}
	}

	/**
	 * Validate account status on route navigation.
	 * This call is lightweight (no GetMenu) and allows forced logout without page refresh.
	 */
	async validateAccountStatus(): Promise<void> {
		if (!this.env.user || !this.env.user.Id) {
			return;
		}

		if (this.accountStatusCheckingPromise) {
			return this.accountStatusCheckingPromise;
		}

		this.accountStatusCheckingPromise = this.commonService
			.connect(APIList.ACCOUNT.getUserData.method, APIList.ACCOUNT.getUserData.url, null)
			.toPromise()
			.then((userData: any) => {
				this.assertProfileIsActive(userData);
			})
			.finally(() => {
				this.accountStatusCheckingPromise = undefined;
			});

		return this.accountStatusCheckingPromise;
	}

	private assertProfileIsActive(userData: any): void {
		if (Number(userData?.StaffID ?? 0) === 0) {
			dogF && console.warn('[UserProfileService] Invalid profile detected: StaffID = 0. Force logout.');
			this.env.showMessage('Account is no longer valid. Please sign in again or contact administrator.', 'danger');
			this.env.publishEvent({ Code: EVENT_TYPE.USER.LOGOUT_REQUESTED });
			throw new Error('USER_PROFILE_INVALID_STAFF_ID');
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

	async checkAppStatusAndTypeList(forceLoad = false): Promise<void> {
		let statusList = (await this.cache.get('SYS_Status', 'auto', null)) || [];
		let typeList = (await this.cache.get('SYS_Type', 'auto', null)) || [];

		if (forceLoad || typeList.length == 0 || statusList.length == 0) {
			typeList = await this.typeProvider.read({ Take: 10000 }, true);
			statusList = await this.statusProvider.read({ Take: 10000 }, true);
			this.cache.set('SYS_Type', typeList['data'], { enable: true, timeToLive: 365 * 24 * 60 }, 'auto', null);
			this.cache.set('SYS_Status', statusList['data'], { enable: true, timeToLive: 365 * 24 * 60 }, 'auto', null);
		}
	}
}
