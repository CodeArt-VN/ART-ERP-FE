import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CacheManagementService } from './cache-management.service';
import { dog } from 'src/environments/environment.prod';

@Injectable({
	providedIn: 'root',
})
export class MigrationService {
	constructor() {}

	/**
	 * Execute migration based on version and server changes
	 */
	async executeMigration(cache: CacheManagementService): Promise<MigrationResult> {
		if (environment.migrationSettings.skipMigration) {
			dog && console.log('🔧 [MigrationService] Migration skipped by configuration');

			return {
				versionChanged: false,
				serverChanged: false,
				clearedKeys: [],
				success: true,
			};
		}

		const storedVersion = await cache.app.version;
		const storedServer = await cache.app.tenant;
		const currentServer = await this.getCurrentServer();

		const result: MigrationResult = {
			versionChanged: false,
			serverChanged: false,
			clearedKeys: [],
			success: true,
		};

		dog &&
			console.log('🔧 [MigrationService] Migration check started:', {
				storedVersion,
				currentVersion: environment.appVersion,
				storedServer,
				currentServer,
			});

		try {
			// Version change detection
			if (this.compareVersions(storedVersion, environment.appVersion)) {
				result.versionChanged = true;
				await this.clearCacheKeys(environment.cacheKeysToClearOnNewVersion, cache);
				result.clearedKeys.push(...environment.cacheKeysToClearOnNewVersion);

				// Update stored version
				await cache.setRoot('AppVersion', environment.appVersion);

				dog &&
					console.log('🔧 [MigrationService] Version migration completed:', {
						from: storedVersion,
						to: environment.appVersion,
						clearedKeys: environment.cacheKeysToClearOnNewVersion,
					});
			}

			// Tenant change detection
			if (storedServer && storedServer !== currentServer) {
				result.serverChanged = true;
				await this.clearCacheKeys(environment.cacheKeysToClearOnTenantSwitched, cache);
				result.clearedKeys.push(...environment.cacheKeysToClearOnTenantSwitched);

				// Update stored server
				await cache.setRoot('Tenant', currentServer);

				dog &&
					console.log('🔧 [MigrationService] Tenant migration completed:', {
						from: storedServer,
						to: currentServer,
						clearedKeys: environment.cacheKeysToClearOnTenantSwitched,
					});
			}

			if (!result.versionChanged && !result.serverChanged) {
				dog && console.log('🔧 [MigrationService] No migration needed');
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
	private async clearCacheKeys(keys: string[], cache: CacheManagementService): Promise<void> {
		if (environment.migrationSettings.enableDetailedLogs) {
			console.log('Clearing cache keys:', keys);
		}

		for (const key of keys) {
			try {
				if (key.includes('*')) {
					// Handle wildcard keys
					await this.clearWildcardKeys(key, cache);
				} else {
					// Clear exact key
					await cache.removeRoot(key);
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
	private async clearWildcardKeys(pattern: string, cache: CacheManagementService): Promise<void> {
		try {
			const prefix = pattern.replace('/*', '').replace('*', '');
			const allKeys = await cache.keys();

			if (environment.migrationSettings.enableDetailedLogs) {
				console.log('Wildcard pattern:', pattern, 'prefix:', prefix, 'total keys:', allKeys.length);
			}

			let clearedCount = 0;
			for (const key of allKeys) {
				if (key.startsWith(prefix)) {
					await cache.removeRoot(key);
					clearedCount++;

					if (environment.migrationSettings.enableDetailedLogs) {
						console.log('Cleared wildcard key:', key);
					}
				}
			}

			dog && console.log(`Cleared ${clearedCount} keys matching pattern: ${pattern}`);
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
