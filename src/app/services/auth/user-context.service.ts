/**
 * UserContextService - Enterprise User Context Management Service
 * Handles user context, tenant switching, session management, and reactive state
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { lib } from '../static/global-functions';
import { dog, environment } from 'src/environments/environment';
import { CacheManagementService } from '../core/cache-management.service';
import { Role, Tenant, UserProfile, UserSession } from '../../interfaces/auth.interfaces';

@Injectable({
	providedIn: 'root',
})
export class UserContextService {
	private currentUser$ = new BehaviorSubject<UserProfile | null>(null);
	private currentTenant$ = new BehaviorSubject<Tenant | null>(null);
	private currentSession$ = new BehaviorSubject<UserSession | null>(null);
	private userRoles$ = new BehaviorSubject<Role[]>([]);

	nullUser: UserProfile = {
		Id: 0,
		Email: '',
		FirstName: '',
		LastName: '',
		Avatar: '',
		UserName: '',
		FullName: '',
		IsDisabled: false,
	};

	constructor(public cache: CacheManagementService) {
		this.cache.tracking().subscribe((tracking) => {
			if (tracking) {
				dog && console.log('🔧 [UserContextService] Cache ready', cache.app);
				this.switchTenant(cache.app.tenant || environment.appDomain);
				this.setCurrentUser(cache.app.userProfile || this.nullUser, false);
			}
		});
	}

	public async clearUserContext(): Promise<void> {
		dog && console.log('🧹 [UserContextService] Clearing user context...');
		this.currentUser$.next(this.nullUser);
		this.currentTenant$.next(null);
		this.currentSession$.next(null);
		this.userRoles$.next([]);
	}

	/**
	 * Setup user context
	 * Migrated from AccountService.setupUserContext()
	 */
	public async setupUserContext(userData: any): Promise<void> {
		dog && console.log('🔧 [UserContextService] Setting up user context...', userData);

		// Process avatar URL
		userData.Avatar = userData.Avatar ? (userData.Avatar.indexOf('http') != -1 ? userData.Avatar : environment.appDomain + userData.Avatar) : null;

		// Build forms tree
		const formsTree = await lib.buildFlatTree(userData.Forms, userData.Forms, true);
		dog && console.log('🌲 [UserContextService] Forms tree built:', (formsTree as any[])?.length);

		// Filter desktop forms
		userData.Forms = (formsTree as any[]).filter((d: any) => !d.isMobile);
		dog && console.log('📱 [UserContextService] Desktop forms filtered:', userData.Forms?.length);

		// Build branch tree
		const branchTree = await lib.buildFlatTree(userData.BranchList, userData.BranchList, true);
		dog && console.log('🌲 [UserContextService] Branch tree built:', (branchTree as any[])?.length);

		// Update branch list
		userData.BranchList = branchTree;

		// Normalize profile
		const normalizedProfile = this.normalizeProfile(userData);

		// Load user settings if available
		if (normalizedProfile.UserSetting && Array.isArray(normalizedProfile.UserSetting)) {
			normalizedProfile.UserSetting = this.loadUserSettings(normalizedProfile.UserSetting, normalizedProfile);
		}

		await this.setCurrentUser(normalizedProfile);

		dog && console.log('✅ [UserContextService] User context setup completed');
	}

	/**
	 * Get current user observable
	 */
	public getCurrentUser(): Observable<UserProfile | null> {
		return this.currentUser$.asObservable();
	}

	/**
	 * Set current user
	 */
	public async setCurrentUser(user: UserProfile, isSave = true): Promise<void> {
		dog &&
			console.log('👤 [UserContextService] Setting current user:', {
				userId: user?.Id,
				hasUser: !!user,
				hasRoles: !!user?.Roles?.length,
			});

		try {
			// Validate user object
			if (!user || !user.Id) {
				dog && console.warn('⚠️ [UserContextService] Cannot set user: user is null or undefined');
				return;
			}

			this.cache.app.userProfile = user;
			this.cache.app.userId = user.Id;
			if (!this.cache.app.selectedBranch && user.IDBranch) {
				this.cache.app.selectedBranch = user.IDBranch;
			}
			if (isSave) {
				this.cache.set(`UserProfile(${user.Id})`, user, { timeToLive: 365 * 24 * 60, enable: true }, 'auto', null);
				this.cache.setRoot('UserId', user.Id);
			}

			this.currentUser$.next(user);
			dog && console.log('✅ [UserContextService] User set in BehaviorSubject');

			// Update roles if available
			if (user.Roles) {
				dog && console.log('🎭 [UserContextService] Setting user roles:', user.Roles.length);
				this.userRoles$.next(user.Roles);
			}

			// Create user session
			dog && console.log('🔐 [UserContextService] Creating user session...');
			this.createUserSession(user);

			// Update last activity
			dog && console.log('⏰ [UserContextService] Updating session activity...');
			this.updateSessionActivity();

			dog && console.log('✅ [UserContextService] Current user set successfully');
		} catch (error) {
			dog && console.error('🚨 [UserContextService] Error setting current user:', error);
		}
	}

	/**
	 * Load user settings
	 * Migrated from AccountService.loadUserSettings()
	 */
	private loadUserSettings(settings: any[], profile: UserProfile): any {
		const settingList = ['Theme', 'IsCompactMenu', 'IsCacheQuery', 'PinnedForms'];
		let userSetting: any = {};

		for (let idx = 0; idx < settingList.length; idx++) {
			const s = settingList[idx];
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

	/**
	 * Normalize profile data
	 * Migrated from AccountService.normalizeProfile()
	 */
	private normalizeProfile(profile: UserProfile): UserProfile {
		// Ensure BranchList is always an array
		if (Array.isArray(profile.BranchList)) {
			// OK
		} else {
			profile.BranchList = [];
		}

		// Ensure Forms is always an array
		if (Array.isArray(profile.Forms)) {
			// OK
		} else {
			profile.Forms = [];
		}

		return profile;
	}

	/**
	 * Get current user observable
	 */

	/**
	 * Get current tenant observable
	 */
	getUserTenant(): Observable<Tenant | null> {
		return this.currentTenant$.asObservable();
	}

	/**
	 * Switch to different tenant
	 */
	async switchTenant(tenantId: string): Promise<void> {
		try {
			dog && console.log('🏢 [UserContextService] Switching to tenant:', tenantId);

			// Load tenant data
			const newTenant = await this.loadTenantData(tenantId);
			if (!newTenant) {
				throw new Error(`Tenant ${tenantId} not found`);
			}

			// Update tenant context
			environment.appDomain = tenantId;
			this.currentTenant$.next(newTenant);
			this.cache.setRoot('Tenant', tenantId);
			dog && console.log('✅ [UserContextService] Tenant context updated');
		} catch (error) {
			dog && console.error('🚨 [UserContextService] Error switching tenant:', error);
			throw error;
		}
	}

	/**
	 * Switch to different branch
	 */
	async switchBranch(branchId: string): Promise<void> {
		try {
			dog && console.log('🏢 [UserContextService] Switching to branch:', branchId);

			// Load branch data
			const newBranch = await this.loadBranchData(branchId);
			if (!newBranch) {
				throw new Error(`Branch ${branchId} not found`);
			}
		} catch (error) {
			dog && console.error('🚨 [UserContextService] Error switching branch:', error);
			throw error;
		}
	}

	/**
	 * Update session activity timestamp
	 */
	updateSessionActivity(): void {
		try {
			const currentSession = this.currentSession$.value;

			if (currentSession) {
				currentSession.lastActivity = new Date();
				this.currentSession$.next({ ...currentSession });
			}
		} catch (error) {
			dog && console.error('Error updating session activity:', error);
		}
	}

	/**
	 * Create user session
	 */
	private createUserSession(user: UserProfile): void {
		dog &&
			console.log('📝 [UserContextService] Creating user session for:', {
				userId: user?.Id,
				hasId: !!user?.Id,
				userType: typeof user?.Id,
			});

		try {
			// Validate user has required properties
			if (!user) {
				dog && console.warn('⚠️ [UserContextService] Cannot create session: user is null or undefined');
				return;
			}

			// Safely get user ID
			const userId = user.Id?.toString() || 'unknown';
			dog && console.log('🆔 [UserContextService] User ID resolved:', userId);

			const session: UserSession = {
				id: this.generateSessionId(),
				userId: userId,
				ipAddress: 'unknown', // Would be set by security service
				userAgent: navigator.userAgent || 'unknown',
				createdAt: new Date(),
				lastActivity: new Date(),
				expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
				isActive: true,
				deviceId: 'unknown',
			};

			dog && console.log('🔐 [UserContextService] Session created:');

			this.currentSession$.next(session);
			dog && console.log('✅ [UserContextService] Session set in BehaviorSubject');
		} catch (error) {
			dog && console.error('🚨 [UserContextService] Error creating user session:', error);
		}
	}

	/**
	 * Find branch by ID in nested structure
	 */
	private findBranchById(branches: any[], id: string): any {
		for (const branch of branches) {
			if (branch.Id.toString() === id) {
				return branch;
			}

			if (branch.children && branch.children.length > 0) {
				const found = this.findBranchById(branch.children, id);
				if (found) return found;
			}
		}
		return null;
	}

	/**
	 * Check form-based permissions
	 */
	private checkFormPermission(forms: any[], permission: string): boolean {
		for (const form of forms) {
			if (form.Code === permission || form.Name === permission) {
				return !form.IsHidden && !form.IsDisabled;
			}

			if (form.children && form.children.length > 0) {
				const hasChildPermission = this.checkFormPermission(form.children, permission);
				if (hasChildPermission) return true;
			}
		}
		return false;
	}

	/**
	 * Generate unique session ID
	 */
	private generateSessionId(): string {
		return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}

	/**
	 * Load tenant data
	 */
	private async loadTenantData(tenantId: string): Promise<Tenant | null> {
		try {
			// This would typically call an API to get tenant data
			// For now, return a mock tenant
			return {
				id: tenantId,
				name: `Tenant ${tenantId}`,
				code: `T${tenantId}`,
				isActive: true,
				settings: {},
			};
		} catch (error) {
			dog && console.error('Error loading tenant data:', error);
			return null;
		}
	}

	/**
	 * Load branch data
	 */
	private async loadBranchData(branchId: string): Promise<any> {
		try {
		} catch (error) {
			dog && console.error('Error loading branch data:', error);
			return null;
		}
	}
}
