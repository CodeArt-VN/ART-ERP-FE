/**
 * UserContextService - Enterprise User Context Management Service
 * Handles user context, tenant switching, session management, and reactive state
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EnvService } from '../core/env.service';

import {
  IUserContextService,
  UserProfile,
  Tenant,
  Role,
  Permission,
  UserSession
} from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserContextService implements IUserContextService {

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
    try {
      this.currentUser$.next(user);
      
      // Update roles if available
      if (user.Roles) {
        this.userRoles$.next(user.Roles);
      }

      // Update tenant context if user has tenant info
      if (user && this.env.selectedBranch) {
        this.updateTenantContext();
      }

      // Create user session
      this.createUserSession(user);

      // Update last activity
      this.updateSessionActivity();

    } catch (error) {
      console.error('Error setting current user:', error);
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
   * Switch tenant context
   */
  async switchTenant(tenantId: string): Promise<void> {
    try {
      const currentUser = this.currentUser$.value;
      
      if (!currentUser || !currentUser.BranchList) {
        throw new Error('No user or branch list available for tenant switching');
      }

      // Find the tenant/branch
      const targetBranch = this.findBranchById(currentUser.BranchList, tenantId);
      
      if (!targetBranch) {
        throw new Error(`Tenant/Branch with ID ${tenantId} not found`);
      }

      // Update environment selected branch
      this.env.selectedBranch = tenantId;
      await this.env.loadBranch();

      // Create tenant object
      const tenant: Tenant = {
        id: targetBranch.Id.toString(),
        name: targetBranch.Name,
        code: targetBranch.Code,
        isActive: !targetBranch.IsDisabled,
        settings: {
          // Add tenant-specific settings here
        },
        features: []
      };

      // Update tenant context
      this.currentTenant$.next(tenant);

      // Update session with new tenant
      const currentSession = this.currentSession$.value;
      if (currentSession) {
        currentSession.lastActivity = new Date();
        this.currentSession$.next(currentSession);
      }

      // Publish tenant switch event
      this.env.publishEvent({
        Code: 'user:tenantSwitched',
        data: { tenantId, tenantName: targetBranch.Name }
      });

    } catch (error) {
      console.error('Error switching tenant:', error);
      throw error;
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
      map(user => {
        if (!user) return false;

        // Check explicit permissions
        if (user.Permissions) {
          const hasExplicitPermission = user.Permissions.some(p => 
            p.id === permission || 
            p.name === permission ||
            `${p.resource}:${p.action}` === permission
          );
          
          if (hasExplicitPermission) return true;
        }

        // Check role-based permissions
        if (user.Roles) {
          const hasRolePermission = user.Roles.some(role =>
            role.permissions.some(p => 
              p.id === permission || 
              p.name === permission ||
              `${p.resource}:${p.action}` === permission
            )
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
      console.error('Error updating session activity:', error);
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
      console.error('Error clearing context:', error);
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
      roles: this.userRoles$.value
    };
  }

  // ===== PRIVATE HELPER METHODS =====

  /**
   * Initialize context from environment
   */
  private initializeContext(): void {
    try {
      // Initialize with current env user if available
      if (this.env.user) {
        this.setCurrentUser(this.env.user);
      }

      // Initialize tenant context if branch is selected
      if (this.env.selectedBranch) {
        this.updateTenantContext();
      }

    } catch (error) {
      console.error('Error initializing context:', error);
    }
  }

  /**
   * Setup event listeners for environment changes
   */
  private setupEventListeners(): void {
    try {
      // Listen for user updates
      this.env.EventTracking.subscribe((event) => {
        if (event.Code === 'app:updatedUser' && this.env.user) {
          this.setCurrentUser(this.env.user);
        }
        
        if (event.Code === 'app:loadedLocalData' && this.env.user) {
          this.setCurrentUser(this.env.user);
        }
        
        if (event.Code === 'auth:logout') {
          this.clearContext();
        }
      });

    } catch (error) {
      console.error('Error setting up event listeners:', error);
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
          features: []
        };

        this.currentTenant$.next(tenant);
      }

    } catch (error) {
      console.error('Error updating tenant context:', error);
    }
  }

  /**
   * Create user session
   */
  private createUserSession(user: UserProfile): void {
    try {
      const session: UserSession = {
        id: this.generateSessionId(),
        userId: user.Id.toString(),
        deviceId: this.env.deviceInfo?.Code || 'unknown',
        ipAddress: 'unknown', // Would be set by security service
        userAgent: navigator.userAgent || 'unknown',
        createdAt: new Date(),
        lastActivity: new Date(),
        expiresAt: new Date(Date.now() + (24 * 60 * 60 * 1000)), // 24 hours
        isActive: true
      };

      this.currentSession$.next(session);

    } catch (error) {
      console.error('Error creating user session:', error);
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
}
