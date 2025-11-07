import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ICacheItem, CacheConfig, CacheStrategy, ICacheStats, RetryConfig } from '../static/search-config';
import { dogF, environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { MigrationService } from './migration.service';

@Injectable({
	providedIn: 'root',
})
export class CacheManagementService {
	private _tracking$ = new BehaviorSubject<boolean>(false);
	private cacheRegistry: Map<string, ICacheItem> = new Map();
	private cacheRegistry$ = new BehaviorSubject<ICacheItem[]>([]);
	private maintenanceInterval: any;
	private defaultConfig: CacheConfig = {
		enable: true,
		timeToLive: 60, // 1 minutes
		expireAction: 'remove',
		maintenanceInterval: 15, // 1 minutes
		autoRefresh: true,
		retryConfig: {
			maxRetries: 3,
			retryInterval: 5, // 5 minutes
		},
		valueKey: 'Cache_',
	};

	public app = {
		version: null,
		tenant: environment.appDomain,
		userId: null,
		lang: null,
		theme: null,
		token: null,
		userProfile: null,
		selectedBranch: null,
	};

	constructor(
		private storage: StorageService,
		private migration: MigrationService
	) {
		dogF && console.log('🚀 [CacheManagementService] Constructor initialized');
		this.storage.tracking().subscribe((tracking) => {
			if (tracking) {
				dogF && console.log('🔧 [CacheManagementService] Storage ready');
				this.init();
			}
		});
	}

	tracking(): Observable<boolean> {
		return this._tracking$.asObservable();
	}

	private async init(): Promise<void> {
		try {
			await this.loadCacheRegistry();

			this.app.version = await this.getRoot('AppVersion');

			const currentTenant = await this.getRoot('Tenant');
			if (currentTenant && this.app.tenant !== currentTenant) {
				dogF && console.log('🔧 [CacheManagementService] Set tenant', environment.appDomain, currentTenant);
				this.app.tenant = currentTenant;
				environment.appDomain = currentTenant;
			}

			this.app.userId = await this.getRoot('UserId');
			this.app.lang = await this.get('Lang', 'auto', null);
			if (!this.app.lang) this.app.lang = 'vi-VN';

			this.app.theme = await this.get('Theme', 'auto', null);
			this.app.token = await this.get('Token', 'auto', null);

			const userProfile = await this.get(`UserProfile(${this.app.userId})`, 'auto', null);
			if (userProfile) {
				this.app.userProfile = userProfile;
			}
			this.app.selectedBranch = await this.get(`SelectedBranch(${this.app.userId})`, 'auto', null);
			if (!this.app.selectedBranch && this.app.userProfile) {
				this.app.selectedBranch = this.app.userProfile.IDBranch;
			}

			dogF && console.log('🔧 [CacheManagementService] Loaded saved environment', this.app);
			await this.migration.executeMigration(this);
			this._tracking$.next(true);

			this.setupMaintenance();

			dogF && console.log('✅ [CacheManagementService] Cache management initialized successfully');
		} catch (error) {
			dogF && console.error('❌ [CacheManagementService] Failed to initialize:', error);
			throw error;
		}
	}

	/**
	 * Get cache registry as observable for tracking
	 */
	getCacheRegistry$(): Observable<ICacheItem[]> {
		return this.cacheRegistry$.asObservable();
	}

	/**
	 * Get current cache registry state
	 */
	getCacheRegistry(): ICacheItem[] {
		return Array.from(this.cacheRegistry.values());
	}

	/**
	 * Update cache registry tracking
	 */
	private updateCacheTracking(): void {
		const currentRegistry = Array.from(this.cacheRegistry.values());
		this.cacheRegistry$.next(currentRegistry);
		dogF && console.log(`📊 [CacheManagementService] Cache tracking updated: ${currentRegistry.length} items`);
	}

	/**
	 * Initialize cache management service
	 * Load cache registry from storage and setup maintenance
	 */

	/**
	 * Get cache item with TTL check
	 */
	async get(key: string, tenant: string = this.app.tenant, branch?: string, query?: any): Promise<any> {
		if (tenant === 'auto') tenant = this.app.tenant;
		const cacheKey = this.generateCacheKey(key, tenant, branch, query);
		const item = this.cacheRegistry.get(cacheKey);

		if (!item) {
			dogF && console.log(`🔍 [CacheManagementService] Cache miss: ${cacheKey}`);
			return null;
		}

		// Check if expired
		if (Date.now() > item.expiresAt) {
			dogF && console.log(`⏰ [CacheManagementService] Cache expired: ${cacheKey}`);

			if (item.expireAction === 'update') {
				// Auto refresh if enabled
				if (item.autoRefresh !== false) {
					setTimeout(() => this.refreshCache(item), 0);
				}
			}

			// Remove expired item if action is 'remove'
			if (item.expireAction === 'remove') {
				await this.remove(key, tenant, branch);
				return null;
			}
		}

		// Update access stats
		item.accessCount++;
		item.lastAccessed = Date.now();

		// Đọc value từ storage riêng biệt
		const valueKey = `${this.defaultConfig.valueKey}${cacheKey}`;
		const value = await this.getRoot(valueKey);

		if (value === null || value === undefined) {
			dogF && console.log(`⚠️ [CacheManagementService] Cache value not found: ${valueKey}`);
			await this.remove(key, tenant, branch);
			return null;
		}

		dogF && console.log(`✅ [CacheManagementService] Cache hit: ${cacheKey}, Value loaded from separate storage`);
		return value;
	}

	private updateCacheApp(key: string, value: any): void {
		//Check if key is in app
		if (this.app[key.charAt(0).toLowerCase() + key.slice(1)]) {
			this.app[key.charAt(0).toLowerCase() + key.slice(1)] = value;
		}
	}

	/**
	 * Set cache item with metadata
	 */
	async set(key: string, value: any, config: CacheConfig = this.defaultConfig, tenant: string = this.app.tenant, branch?: string, serviceName?: string): Promise<void> {
		if (tenant === 'auto') tenant = this.app.tenant;
		if (!config) config = this.defaultConfig;
		this.updateCacheApp(key, value);
		
		const cacheKey = this.generateCacheKey(key, tenant, branch, config.query);
		const now = Date.now();
		const timeToLive = config.timeToLive || this.defaultConfig.timeToLive || 60;

		const cacheItem: ICacheItem = {
			key,
			value: null, // Không lưu value trong metadata
			tenant,
			branch,
			timeToLive,
			createdAt: now,
			expiresAt: now + timeToLive * 60 * 1000,
			version: '1.0.0',
			accessCount: 0,
			lastAccessed: now,
			fromProvider: serviceName || 'unknown',
			expireAction: config.expireAction || this.defaultConfig.expireAction || 'remove',
			query: config.query,
			status: 'idle',
			retryCount: 0,
			autoRefresh: config.autoRefresh !== false,
		};

		// Merge with default retry config
		if (config.retryConfig) {
			cacheItem.retryConfig = {
				maxRetries: config.retryConfig.maxRetries || this.defaultConfig.retryConfig!.maxRetries,
				retryInterval: config.retryConfig.retryInterval || this.defaultConfig.retryConfig!.retryInterval,
			};
		} else {
			cacheItem.retryConfig = { ...this.defaultConfig.retryConfig! };
		}

		// Lưu metadata vào CacheRegistry
		this.cacheRegistry.set(cacheKey, cacheItem);

		// Lưu value vào key riêng biệt
		const valueKey = `${this.defaultConfig.valueKey}${cacheKey}`;
		await this.storage.set(valueKey, value);

		await this.saveCacheRegistry();
		this.updateCacheTracking();

		dogF && console.log(`💾 [CacheManagementService] Cache set: ${cacheKey}, TTL: ${timeToLive}min, Value stored separately`);
	}

	/**
	 * Remove specific cache item
	 */
	async remove(key: string, tenant: string, branch?: string): Promise<void> {
		if (tenant === 'auto') tenant = this.app.tenant;
		const cacheKey = this.generateCacheKey(key, tenant, branch);
		const removed = this.cacheRegistry.delete(cacheKey);

		if (removed) {
			// Xóa value từ storage riêng biệt
			const valueKey = `${this.defaultConfig.valueKey}${cacheKey}`;
			await this.storage.remove(valueKey);
			this.updateCacheApp(key, null);
			await this.saveCacheRegistry();
			this.updateCacheTracking();
			dogF && console.log(`🗑️ [CacheManagementService] Cache removed: ${cacheKey}, Value deleted from separate storage`);
		}
	}

	/**
	 * Clear all cache or tenant/branch specific
	 */
	async clear(tenant?: string, branch?: string): Promise<void> {
		if (!tenant) {
			// Clear all - xóa tất cả value trước
			for (const [cacheKey, item] of this.cacheRegistry.entries()) {
				const valueKey = `${this.defaultConfig.valueKey}${cacheKey}`;
				await this.storage.remove(valueKey);
			}
			this.cacheRegistry.clear();
			dogF && console.log('🧹 [CacheManagementService] All cache cleared, values deleted from separate storage');
		} else if (!branch) {
			// Clear tenant specific - xóa value trước
			for (const [cacheKey, item] of this.cacheRegistry.entries()) {
				if (item.tenant === tenant) {
					const valueKey = `${this.defaultConfig.valueKey}${cacheKey}`;
					await this.storage.remove(valueKey);
					this.cacheRegistry.delete(cacheKey);
				}
			}
			dogF && console.log(`🧹 [CacheManagementService] Cache cleared for tenant: ${tenant}, values deleted from separate storage`);
		} else {
			// Clear branch specific - xóa value trước
			for (const [cacheKey, item] of this.cacheRegistry.entries()) {
				if (item.tenant === tenant && item.branch === branch) {
					const valueKey = `${this.defaultConfig.valueKey}${cacheKey}`;
					await this.storage.remove(valueKey);
					this.cacheRegistry.delete(cacheKey);
				}
			}
			dogF && console.log(`🧹 [CacheManagementService] Cache cleared for ${tenant}-${branch}, values deleted from separate storage`);
		}

		await this.saveCacheRegistry();
		this.updateCacheTracking();
	}

	async getRoot(key: string): Promise<any> {
		return await this.storage.get(key);
	}

	async setRoot(key: string, value: any): Promise<void> {
		this.updateCacheApp(key, value);
		await this.storage.set(key, value);
	}

	async removeRoot(key: string): Promise<void> {
		await this.storage.remove(key).then(() => {
			this.updateCacheApp(key, null);
		});
	}

	async keys(): Promise<string[]> {
		return await this.storage.keys();
	}

	/**
	 * Get cache statistics
	 */
	async getCacheStats(tenant?: string): Promise<ICacheStats> {
		const now = Date.now();
		let totalItems = 0;
		let expiredItems = 0;
		let errorItems = 0;
		let retryItems = 0;
		const tenantStats: { [key: string]: number } = {};
		const branchStats: { [key: string]: number } = {};

		for (const item of this.cacheRegistry.values()) {
			if (tenant && item.tenant !== tenant) continue;

			totalItems++;

			// Count by tenant
			tenantStats[item.tenant] = (tenantStats[item.tenant] || 0) + 1;

			// Count by branch
			const branchKey = item.branch || 'no-branch';
			branchStats[branchKey] = (branchStats[branchKey] || 0) + 1;

			// Count by status
			if (item.expiresAt <= now) {
				expiredItems++;
			}
			if (item.status === 'error') {
				errorItems++;
			}
			if (item.status === 'retry') {
				retryItems++;
			}
		}

		return {
			totalItems,
			expiredItems,
			errorItems,
			retryItems,
			tenantStats,
			branchStats,
			memoryUsage: 0, // TODO: Implement memory usage calculation
			storageUsage: 0, // TODO: Implement storage usage calculation
		};
	}

	/**
	 * Maintenance: cleanup expired cache + refresh theo expireAction
	 */
	async maintain(): Promise<void> {
		const now = Date.now();
		const expiredItems: ICacheItem[] = [];
		const refreshItems: ICacheItem[] = [];
		const retryItems: ICacheItem[] = [];

		dogF && console.log('🔧 [CacheManagementService] Starting cache maintenance...');

		// Phân loại cache items
		for (const item of this.cacheRegistry.values()) {
			if (item.expiresAt <= now) {
				if (item.expireAction === 'update') {
					if (item.status === 'error' && this.shouldRetry(item)) {
						retryItems.push(item);
					} else if (item.status === 'idle') {
						refreshItems.push(item);
					}
				} else {
					expiredItems.push(item);
				}
			}
		}

		// Xóa expired items
		for (const item of expiredItems) {
			await this.remove(item.key, item.tenant, item.branch);
		}

		// Refresh items cần update
		for (const item of refreshItems) {
			if (item.status === 'idle') {
				await this.refreshCache(item);
			}
		}

		// Retry items có lỗi
		for (const item of retryItems) {
			await this.handleRetry(item);
		}

		// Cleanup theo maxCacheSize (lấy từ query string)
		await this.cleanupBySizeFromQuery();

		dogF && console.log(`🔧 [CacheManagementService] Maintenance completed. Expired: ${expiredItems.length}, Refresh: ${refreshItems.length}, Retry: ${retryItems.length}`);
	}

	/**
	 * Refresh cache item by calling API
	 */
	async refreshCache(item: ICacheItem): Promise<void> {
		debugger;
		if (item.status === 'refreshing' || !item.query) return;

		item.status = 'refreshing';
		item.retryCount = 0;
		delete item.errorMessage;

		try {
			dogF && console.log(`🔄 [CacheManagementService] Refreshing cache: ${item.key}`);

			// TODO: Implement actual API call based on query
			// For now, simulate API call with mock data
			const mockApiResponse = await this.callMockAPI(item.query);

			// Update cache với data mới
			item.expiresAt = Date.now() + item.timeToLive * 60 * 1000;

			// Update value trong storage riêng biệt
			const cacheKey = this.generateCacheKey(item.key, item.tenant, item.branch);
			const valueKey = `${this.defaultConfig.valueKey}${cacheKey}`;
			await this.storage.set(valueKey, mockApiResponse);

			// Reset status
			item.status = 'idle';
			item.lastRetryAt = undefined;
			item.nextRetryAt = undefined;

			await this.saveCacheRegistry();
			this.updateCacheTracking();
			dogF && console.log(`✅ [CacheManagementService] Cache refreshed: ${item.key}`);
		} catch (error) {
			dogF && console.error(`❌ [CacheManagementService] Failed to refresh cache: ${item.key}`, error);

			// Xử lý lỗi
			item.status = 'error';
			item.errorMessage = error instanceof Error ? error.message : 'Unknown error';
			item.lastRetryAt = Date.now();

			// Tính toán thời gian retry tiếp theo
			if (item.retryCount < (item.retryConfig?.maxRetries || 3)) {
				item.nextRetryAt = Date.now() + (item.retryConfig?.retryInterval || 5) * 60 * 1000;
			} else {
				// Đã hết số lần thử lại, xóa cache
				await this.remove(item.key, item.tenant, item.branch);
			}

			await this.saveCacheRegistry();
			this.updateCacheTracking();
		}
	}

	/**
	 * Mock API call for testing purposes
	 * TODO: Replace with actual API call implementation
	 */
	private async callMockAPI(query: any): Promise<any> {
		// Simulate API call delay
		await new Promise((resolve) => setTimeout(resolve, 100));

		// Return mock data based on query
		if (query?.Status) {
			return [
				{ Id: 1, Code: 'SO001', Name: 'Sale Order 1', Status: 'New', _lastRefreshed: Date.now() },
				{ Id: 2, Code: 'SO002', Name: 'Sale Order 2', Status: 'Approved', _lastRefreshed: Date.now() },
			];
		}

		// Default mock response
		return {
			message: 'Mock API response',
			timestamp: Date.now(),
			query: query,
			_lastRefreshed: Date.now(),
		};
	}

	/**
	 * Handle retry logic for failed cache items
	 */
	private async handleRetry(item: ICacheItem): Promise<void> {
		if (item.status !== 'error' || !this.shouldRetry(item)) return;

		item.status = 'retry';
		item.retryCount++;

		try {
			await this.refreshCache(item);
		} catch (error) {
			// Xử lý lỗi retry
			if (item.retryCount >= (item.retryConfig?.maxRetries || 3)) {
				// Đã hết số lần thử lại, xóa cache
				await this.remove(item.key, item.tenant, item.branch);
			} else {
				// Tính toán thời gian retry tiếp theo
				item.nextRetryAt = Date.now() + (item.retryConfig?.retryInterval || 5) * 60 * 1000;
				item.status = 'error';
			}

			await this.saveCacheRegistry();
			this.updateCacheTracking();
		}
	}

	/**
	 * Check if item should be retried
	 */
	private shouldRetry(item: ICacheItem): boolean {
		if (item.status !== 'error') return false;
		if (item.retryCount >= (item.retryConfig?.maxRetries || 3)) return false;
		if (!item.nextRetryAt) return false;

		return Date.now() >= item.nextRetryAt;
	}

	/**
	 * Cleanup cache by size limit from query string
	 */
	private async cleanupBySizeFromQuery(): Promise<void> {
		// Lấy maxCacheSize từ query string của từng cache item
		for (const [tenant, items] of this.groupByTenant()) {
			for (const [branch, branchItems] of this.groupByBranch(items)) {
				const maxSize = this.getMaxSizeFromQuery(branchItems);
				if (maxSize && branchItems.length > maxSize) {
					await this.cleanupBySize(tenant, branch, maxSize);
				}
			}
		}
	}

	/**
	 * Get max cache size from query string
	 */
	private getMaxSizeFromQuery(items: ICacheItem[]): number | null {
		// Tìm maxCacheSize trong query string của items
		for (const item of items) {
			if (item.query?.maxCacheSize) {
				return parseInt(item.query.maxCacheSize);
			}
		}
		return null;
	}

	/**
	 * Cleanup cache by size limit
	 */
	private async cleanupBySize(tenant: string, branch: string, maxSize: number): Promise<void> {
		const items = Array.from(this.cacheRegistry.values())
			.filter((item) => item.tenant === tenant && item.branch === branch)
			.sort((a, b) => a.lastAccessed - b.lastAccessed); // Xóa những item ít được access nhất

		const itemsToRemove = items.slice(0, items.length - maxSize);

		for (const item of itemsToRemove) {
			await this.remove(item.key, item.tenant, item.branch);
		}

		dogF && console.log(`🧹 [CacheManagementService] Cleaned up ${itemsToRemove.length} items for ${tenant}-${branch}, values deleted from separate storage`);
	}

	/**
	 * Group cache items by tenant
	 */
	private groupByTenant(): Map<string, ICacheItem[]> {
		const groups = new Map<string, ICacheItem[]>();

		for (const item of this.cacheRegistry.values()) {
			if (!groups.has(item.tenant)) {
				groups.set(item.tenant, []);
			}
			groups.get(item.tenant)!.push(item);
		}

		return groups;
	}

	/**
	 * Group cache items by branch
	 */
	private groupByBranch(items: ICacheItem[]): Map<string, ICacheItem[]> {
		const groups = new Map<string, ICacheItem[]>();

		for (const item of items) {
			const branchKey = item.branch || 'no-branch';
			if (!groups.has(branchKey)) {
				groups.set(branchKey, []);
			}
			groups.get(branchKey)!.push(item);
		}

		return groups;
	}

	/**
	 * Generate cache key with tenant-branch prefix
	 */
	private generateCacheKey(key: string, tenant: string, branch?: string, query?: any): string {
		let queryHash = this.generateQueryHash(query);
		return branch ? `[${key}].[${branch}].[${tenant}].[${queryHash}]` : `[${key}].[${tenant}].[${queryHash}]`;
	}

	private generateQueryHash(query: any): string {
		if (!query) return 'NOQUERY';

		// Tạo hash đơn giản nhưng hiệu quả
		const queryStr = JSON.stringify(query);
		let hash = 0;

		// Sử dụng thuật toán hash đơn giản để tạo hash ngắn
		for (let i = 0; i < queryStr.length; i++) {
			const char = queryStr.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash = hash & hash; // Convert to 32-bit integer
		}

		// Chuyển đổi thành hex string ngắn gọn
		return Math.abs(hash).toString(16).substring(0, 8);
	}

	/**
	 * Load cache registry from storage
	 */
	private async loadCacheRegistry(): Promise<void> {
		try {
			const registry = await this.getRoot('CacheRegistry');
			if (registry && Array.isArray(registry)) {
				for (const item of registry) {
					// Đảm bảo value = null khi load metadata
					item.value = null;
					const cacheKey = this.generateCacheKey(item.key, item.tenant, item.branch);
					this.cacheRegistry.set(cacheKey, item);
				}
				dogF && console.log(`📖 [CacheManagementService] Loaded ${registry.length} cache metadata items from storage (values stored separately)`);
				this.updateCacheTracking();
			}
		} catch (error) {
			dogF && console.error('❌ [CacheManagementService] Failed to load cache registry:', error);
		}
	}

	/**
	 * Save cache registry to storage
	 */
	private async saveCacheRegistry(): Promise<void> {
		try {
			const registry = Array.from(this.cacheRegistry.values());
			await this.storage.set('CacheRegistry', registry);
		} catch (error) {
			dogF && console.error('❌ [CacheManagementService] Failed to save cache registry:', error);
		}
	}

	/**
	 * Setup maintenance interval
	 */
	private setupMaintenance(): void {
		const interval = this.defaultConfig.maintenanceInterval || 60;
		this.maintenanceInterval = setInterval(
			() => {
				this.maintain();
			},
			interval * 60 * 1000
		);

		dogF && console.log(`⏰ [CacheManagementService] Maintenance interval set to ${interval} minutes`);
	}

	/**
	 * Cleanup on destroy
	 */
	ngOnDestroy(): void {
		if (this.maintenanceInterval) {
			clearInterval(this.maintenanceInterval);
		}
	}
}
