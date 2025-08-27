import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MigrationService {
  constructor(private env: EnvService) {}

  /**
   * Execute migration based on version and server changes
   */
  async executeMigration(): Promise<MigrationResult> {
    if (environment.migrationSettings.skipMigration) {
      if (environment.migrationSettings.enableLogging) {
        console.log('Migration skipped by configuration');
      }
      return {
        versionChanged: false,
        serverChanged: false,
        clearedKeys: [],
        success: true
      };
    }

    const storedVersion = await this.env.getStorage('appVersion');
    const storedServer = await this.env.getStorage('selectedTenant');
    const currentServer = await this.getCurrentServer();
    
    const result: MigrationResult = {
      versionChanged: false,
      serverChanged: false,
      clearedKeys: [],
      success: true
    };

    if (environment.migrationSettings.enableLogging) {
      console.log('Migration check started:', {
        storedVersion,
        currentVersion: environment.appVersion,
        storedServer,
        currentServer
      });
    }

    try {
      // Version change detection
      if (this.compareVersions(storedVersion, environment.appVersion)) {
        result.versionChanged = true;
        await this.clearCacheKeys(environment.cacheKeysToClearOnNewVersion);
        result.clearedKeys.push(...environment.cacheKeysToClearOnNewVersion);
        
        // Update stored version
        await this.env.setStorage('appVersion', environment.appVersion);
        
        if (environment.migrationSettings.enableLogging) {
          console.log('Version migration completed:', {
            from: storedVersion,
            to: environment.appVersion,
            clearedKeys: environment.cacheKeysToClearOnNewVersion
          });
        }
      }

      // Tenant change detection  
      if (storedServer && storedServer !== currentServer) {
        result.serverChanged = true;
        await this.clearCacheKeys(environment.cacheKeysToClearOnServerChange);
        result.clearedKeys.push(...environment.cacheKeysToClearOnServerChange);
        
        // Update stored server
        await this.env.setStorage('selectedTenant', currentServer);
        
        if (environment.migrationSettings.enableLogging) {
          console.log('Tenant migration completed:', {
            from: storedServer,
            to: currentServer,
            clearedKeys: environment.cacheKeysToClearOnServerChange
          });
        }
      }

      if (environment.migrationSettings.enableLogging && !result.versionChanged && !result.serverChanged) {
        		console.log('No migration needed - versions and tenants match');
      }

    } catch (error) {
      console.error('Migration failed:', error);
      result.success = false;
    }

    return result;
  }

  /**
   * Compare version strings (semantic versioning)
   */
  private compareVersions(stored: string, current: string): boolean {
    if (!stored) {
      if (environment.migrationSettings.enableDetailedLogs) {
        console.log('No stored version found - treating as first install');
      }
      return true; // First time installation
    }
    
    if (environment.migrationSettings.forceVersion) {
      return stored !== environment.migrationSettings.forceVersion;
    }
    
    // Simple version comparison - can be enhanced for semantic versioning
    const isChanged = stored !== current;
    
    if (environment.migrationSettings.enableDetailedLogs) {
      console.log('Version comparison:', { stored, current, changed: isChanged });
    }
    
    return isChanged;
  }

  /**
   * Clear specific cache keys with wildcard support
   */
  private async clearCacheKeys(keys: string[]): Promise<void> {
    if (environment.migrationSettings.enableDetailedLogs) {
      console.log('Clearing cache keys:', keys);
    }

    for (const key of keys) {
      try {
        if (key.includes('*')) {
          // Handle wildcard keys
          await this.clearWildcardKeys(key);
        } else {
          // Clear exact key
          await this.env.storage.remove(key);
          if (environment.migrationSettings.enableDetailedLogs) {
            console.log('Cleared cache key:', key);
          }
        }
      } catch (error) {
        console.warn('Failed to clear cache key:', key, error);
      }
    }
  }

  /**
   * Handle wildcard key patterns
   */
  private async clearWildcardKeys(pattern: string): Promise<void> {
    try {
      const prefix = pattern.replace('/*', '').replace('*', '');
      const allKeys = await this.env.storage.keys();
      
      if (environment.migrationSettings.enableDetailedLogs) {
        console.log('Wildcard pattern:', pattern, 'prefix:', prefix, 'total keys:', allKeys.length);
      }
      
      let clearedCount = 0;
      for (const key of allKeys) {
        if (key.startsWith(prefix)) {
          await this.env.storage.remove(key);
          clearedCount++;
          
          if (environment.migrationSettings.enableDetailedLogs) {
            console.log('Cleared wildcard key:', key);
          }
        }
      }
      
      if (environment.migrationSettings.enableLogging) {
        console.log(`Cleared ${clearedCount} keys matching pattern: ${pattern}`);
      }
    } catch (error) {
      console.error('Failed to clear wildcard keys:', pattern, error);
    }
  }

  /**
   * Get current selected server
   */
  private async getCurrentServer(): Promise<string> {
    // Get from environment - this is the currently selected server
    return environment.appDomain;
  }

  /**
   * Force clear all cache (for testing/debugging)
   */
  async forceClearAllCache(): Promise<void> {
    try {
      const allKeys = await this.env.storage.keys();
      for (const key of allKeys) {
        await this.env.storage.remove(key);
      }
      console.log('Forced clear all cache completed');
    } catch (error) {
      console.error('Force clear all cache failed:', error);
    }
  }

  /**
   * Get migration status for debugging
   */
  async getMigrationStatus(): Promise<MigrationStatus> {
    const storedVersion = await this.env.getStorage('appVersion');
    const storedServer = await this.env.getStorage('selectedTenant');
    const currentServer = environment.appDomain;
    
    return {
      storedVersion,
      currentVersion: environment.appVersion,
      storedServer,
      currentServer,
      versionMismatch: this.compareVersions(storedVersion, environment.appVersion),
      serverMismatch: storedServer && storedServer !== currentServer
    };
  }
}

export interface MigrationResult {
  versionChanged: boolean;
  serverChanged: boolean;
  clearedKeys: string[];
  success: boolean;
}

export interface MigrationStatus {
  storedVersion: string;
  currentVersion: string;
  storedServer: string;
  currentServer: string;
  versionMismatch: boolean;
  serverMismatch: boolean;
}
