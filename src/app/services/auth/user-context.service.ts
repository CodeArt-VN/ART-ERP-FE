/**
 * UserContextService - Enterprise User Context Management Service
 * Handles user context, tenant switching, session management, and reactive state
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EnvService } from '../core/env.service';
import { EVENT_TYPE } from '../static/event-type';
import { lib } from '../static/global-functions';

import { UserProfile, Tenant, Role, Permission, UserSession } from '../interfaces/auth.interfaces';
import { environment, dog } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class UserContextService {
	private currentUser$ = new BehaviorSubject<UserProfile | null>(null);
	private currentTenant$ = new BehaviorSubject<Tenant | null>(null);
	private currentSession$ = new BehaviorSubject<UserSession | null>(null);
	private userRoles$ = new BehaviorSubject<Role[]>([]);

	constructor(private env: EnvService) {
		this.initializeContext();
		this.setupEventListeners();
	}

	/**
	 * Set current user
	 */
	setCurrentUser(user: UserProfile): void {
		dog &&
			console.log('👤 [UserContextService] Setting current user:', {
				userId: user?.Id,
				hasUser: !!user,
				hasRoles: !!user?.Roles?.length,
			});

		try {
			// Validate user object
			if (!user) {
				dog && console.warn('⚠️ [UserContextService] Cannot set user: user is null or undefined');
				return;
			}

			this.currentUser$.next(user);
			dog && console.log('✅ [UserContextService] User set in BehaviorSubject');

			// Update roles if available
			if (user.Roles) {
				dog && console.log('🎭 [UserContextService] Setting user roles:', user.Roles.length);
				this.userRoles$.next(user.Roles);
			}

			// Update tenant context if user has tenant info
			if (user && this.env.selectedBranch) {
				dog && console.log('🏢 [UserContextService] Updating tenant context...');
				this.updateTenantContext();
			}

			// Create user session
			dog && console.log('🔐 [UserContextService] Creating user session...');
			this.createUserSession(user);

			// Update last activity
			dog && console.log('⏰ [UserContextService] Updating session activity...');
			this.updateSessionActivity();

			// Publish event: cập nhật user context
			this.env.publishEvent({ Code: EVENT_TYPE.USER.CONTEXT_UPDATED, data: user });

			dog && console.log('✅ [UserContextService] Current user set successfully');
		} catch (error) {
			dog && console.error('🚨 [UserContextService] Error setting current user:', error);
		}
	}

	/**
	 * Get current user observable
	 */
	getCurrentUser(): Observable<UserProfile | null> {
		return this.currentUser$.asObservable();
	}

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
			this.currentTenant$.next(newTenant);
			dog && console.log('✅ [UserContextService] Tenant context updated');

			// Update environment - use selectedBranch for now since tenant property doesn't exist
			// this.env.tenant = newTenant; // TODO: Add tenant property to EnvService if needed

			// Publish event
			this.env.publishEvent({ Code: EVENT_TYPE.TENANT.SWITCHED, data: newTenant });
			dog && console.log('📢 [UserContextService] Tenant switched event published');
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

			// Update branch context
			this.env.selectedBranch = newBranch;
			dog && console.log('✅ [UserContextService] Branch context updated');

			// Publish event
			this.env.publishEvent({ Code: EVENT_TYPE.TENANT.BRANCH_SWITCHED, data: newBranch });
			dog && console.log('📢 [UserContextService] Branch switched event published');
		} catch (error) {
			dog && console.error('🚨 [UserContextService] Error switching branch:', error);
			throw error;
		}
	}

	/**
	 * Update user permissions
	 */
	updateUserPermissions(permissions: Permission[]): void {
		try {
			dog && console.log('🔐 [UserContextService] Updating user permissions:', permissions.length);

			// Update permissions in current user
			const currentUser = this.currentUser$.value;
			if (currentUser) {
				currentUser.Permissions = permissions;
				this.currentUser$.next(currentUser);
			}

			// Publish event
			this.env.publishEvent({ Code: EVENT_TYPE.USER.PERMISSIONS_UPDATED, data: permissions });
			dog && console.log('📢 [UserContextService] Permissions updated event published');
		} catch (error) {
			dog && console.error('🚨 [UserContextService] Error updating permissions:', error);
		}
	}

	/**
	 * Update user roles
	 */
	updateUserRoles(roles: Role[]): void {
		try {
			dog && console.log('🎭 [UserContextService] Updating user roles:', roles.length);

			// Update roles in current user
			const currentUser = this.currentUser$.value;
			if (currentUser) {
				currentUser.Roles = roles;
				this.currentUser$.next(currentUser);
			}

			// Update roles observable
			this.userRoles$.next(roles);

			// Publish event
			this.env.publishEvent({ Code: EVENT_TYPE.USER.ROLES_UPDATED, data: roles });
			dog && console.log('📢 [UserContextService] Roles updated event published');
		} catch (error) {
			dog && console.error('🚨 [UserContextService] Error updating roles:', error);
		}
	}

	/**
	 * Get user roles observable
	 */
	getUserRoles(): Observable<Role[]> {
		return this.userRoles$.asObservable();
	}

	/**
	 * Check if user has permission (reactive)
	 */
	hasPermission(permission: string): Observable<boolean> {
		return this.currentUser$.pipe(
			map((user) => {
				if (!user) return false;

				// Check explicit permissions
				if (user.Permissions) {
					const hasExplicitPermission = user.Permissions.some((p) => p.id === permission || p.name === permission || `${p.resource}:${p.action}` === permission);

					if (hasExplicitPermission) return true;
				}

				// Check role-based permissions
				if (user.Roles) {
					const hasRolePermission = user.Roles.some((role) =>
						role.permissions.some((p) => p.id === permission || p.name === permission || `${p.resource}:${p.action}` === permission)
					);

					if (hasRolePermission) return true;
				}

				// Check form-based permissions
				if (user.Forms) {
					const hasFormPermission = this.checkFormPermission(user.Forms, permission);
					if (hasFormPermission) return true;
				}

				return false;
			})
		);
	}

	/**
	 * Get current session observable
	 */
	getCurrentSession(): Observable<UserSession | null> {
		return this.currentSession$.asObservable();
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
	 * Clear user context (logout)
	 */
	clearContext(): void {
		try {
			this.currentUser$.next(null);
			this.currentTenant$.next(null);
			this.currentSession$.next(null);
			this.userRoles$.next([]);
		} catch (error) {
			dog && console.error('Error clearing context:', error);
		}
	}

	/**
	 * Get current context snapshot
	 */
	getContextSnapshot(): {
		user: UserProfile | null;
		tenant: Tenant | null;
		session: UserSession | null;
		roles: Role[];
	} {
		return {
			user: this.currentUser$.value,
			tenant: this.currentTenant$.value,
			session: this.currentSession$.value,
			roles: this.userRoles$.value,
		};
	}

	// ===== PRIVATE HELPER METHODS =====

	/**
	 * Initialize context from environment
	 */
	private initializeContext(): void {
		try {
			// Initialize with current env user if available and valid
			if (this.env.user && this.env.user.Id) {
				this.setCurrentUser(this.env.user);
			}

			// Initialize tenant context if branch is selected
			if (this.env.selectedBranch) {
				this.updateTenantContext();
			}
		} catch (error) {
			dog && console.error('Error initializing context:', error);
		}
	}

	/**
	 * Setup event listeners for environment changes
	 */
	private setupEventListeners(): void {
		try {
			// Listen for user updates
			this.env.EventTracking.subscribe((event) => {
				if (event.Code === EVENT_TYPE.APP.UPDATED_USER && this.env.user) {
					this.setCurrentUser(this.env.user);
				}

				if (event.Code === EVENT_TYPE.APP.LOADED_LOCAL_DATA && this.env.user) {
					this.setCurrentUser(this.env.user);
				}

				if (event.Code === EVENT_TYPE.AUTH.LOGOUT) {
					this.clearContext();
				}
			});
		} catch (error) {
			dog && console.error('Error setting up event listeners:', error);
		}
	}

	/**
	 * Update tenant context based on selected branch
	 */
	private updateTenantContext(): void {
		try {
			const currentUser = this.currentUser$.value;

			if (!currentUser || !this.env.selectedBranch) {
				return;
			}

			const selectedBranchId = this.env.selectedBranch.toString();
			const branch = this.findBranchById(currentUser.BranchList || [], selectedBranchId);

			if (branch) {
				const tenant: Tenant = {
					id: branch.Id.toString(),
					name: branch.Name,
					code: branch.Code,
					isActive: !branch.IsDisabled,
					settings: {
						// Add tenant-specific settings
					},
					features: [],
				};

				this.currentTenant$.next(tenant);
			}
		} catch (error) {
			dog && console.error('Error updating tenant context:', error);
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
				deviceId: this.env.deviceInfo?.Code || 'unknown',
				ipAddress: 'unknown', // Would be set by security service
				userAgent: navigator.userAgent || 'unknown',
				createdAt: new Date(),
				lastActivity: new Date(),
				expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
				isActive: true,
			};

			dog &&
				console.log('🔐 [UserContextService] Session created:', {
					sessionId: session.id,
					userId: session.userId,
					deviceId: session.deviceId,
					expiresAt: session.expiresAt,
				});

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
			// Find branch in existing branch list
			const branch = this.findBranchById(this.env.branchList || [], branchId);
			if (branch) {
				return branch;
			}

			// If not found, try to load from server
			// This would typically call an API
			return null;
		} catch (error) {
			dog && console.error('Error loading branch data:', error);
			return null;
		}
	}

	/**
	 * Load saved profile from storage
	 * Migrated from AccountService.loadSavedProfile()
	 */
	async loadSavedProfile(): Promise<UserProfile | null> {
		dog && console.log('📖 [UserContextService] Loading saved profile from storage...');

		try {
			const profile = await this.env.getStorage('UserProfile');

			dog &&
				console.log('📋 [UserContextService] Profile from storage:', {
					hasProfile: !!profile,
					userId: profile?.Id,
					formsCount: profile?.Forms?.length,
					branchCount: profile?.BranchList?.length,
				});

			if (profile && profile.Id) {
				// Process user settings
				let settings = null;
				if (Array.isArray(profile.UserSetting)) {
					settings = lib.cloneObject(profile.UserSetting);
					profile.UserSetting = this.loadUserSettings(settings, profile);
				}

				// Normalize profile
				const normalizedProfile = this.normalizeProfile(profile);
				dog && console.log('✅ [UserContextService] Normalized profile:', normalizedProfile);

				this.env.user = normalizedProfile;
				this.env.rawBranchList = normalizedProfile.BranchList || [];

				dog && console.log('🏢 [UserContextService] Loading branches:', this.env.rawBranchList?.length);

				await this.env.loadBranch();

				dog && console.log('📢 [UserContextService] Publishing updatedUser event');
				this.env.publishEvent({
					Code: EVENT_TYPE.APP.UPDATED_USER,
				});

				dog && console.log('✅ [UserContextService] Profile loaded and context updated');
				return normalizedProfile;
			} else {
				dog && console.log('🚫 [UserContextService] No profile found, clearing data');
				this.env.user = null;
				this.env.rawBranchList = [];

				await this.env.loadBranch();
				this.env.publishEvent({ Code: EVENT_TYPE.APP.UPDATED_USER });

				return null;
			}
		} catch (error) {
			dog && console.error('❌ [UserContextService] Error getting profile from storage:', error);
			throw error;
		}
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

		// Normalize profile
		const normalizedProfile = this.normalizeProfile(userData);

		

		// Load user settings if available
		if (normalizedProfile.UserSetting && Array.isArray(normalizedProfile.UserSetting)) {
			normalizedProfile.UserSetting = this.loadUserSettings(normalizedProfile.UserSetting, normalizedProfile);
		}

		this.env.storage.set('UserProfile', normalizedProfile);

		// Setup user profile
		this.env.user = normalizedProfile;
		this.env.rawBranchList = normalizedProfile.BranchList;

		// Load branch tree
		await this.env.loadBranch();

		// Publish event
		this.env.publishEvent({
			Code: EVENT_TYPE.APP.UPDATED_USER,
		});

		dog && console.log('✅ [UserContextService] User context setup completed');
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
}
