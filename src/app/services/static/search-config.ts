export var SearchConfig: SearchSetup = {
	defaultSearchFields: { cache: { enable: false }, fields: ['Code', 'Name', '_uid'] },
	// SALE_Order: {
	// 	cache: {
	// 		enable: false,
	// 		timeToLive: 30, // 30 phút
	// 		query: { Status: "['New','Unapproved','Submitted','Approved','Redelivery']" },
	// 		expireAction: 'update', // Tự động refresh thay vì xóa
	// 		autoRefresh: true,
	// 		retryConfig: {
	// 			maxRetries: 3,
	// 			retryInterval: 5, // 5 phút
	// 		},
	// 	},
	// 	fields: ['Id', 'Code', 'Name', '_uid'],
	// },
	// SYS_Status: {
	// 	cache: {
	// 		enable: true,
	// 		timeToLive: 120, // 2 giờ
	// 		expireAction: 'remove',
	// 		autoRefresh: false,
	// 	},
	// },
	// SYS_Type: {
	// 	cache: {
	// 		enable: true,
	// 		timeToLive: 120, // 2 giờ
	// 		expireAction: 'remove',
	// 		autoRefresh: false,
	// 	},
	// },

	getSearchFields: function (name) {
		let result: SearchConfig = {
			name: name,
			value: this.defaultSearchFields,
		};

		if (this[name]) {
			result.value = this[name];
		}

		return result;
	},
};

export interface SearchSetup {
	[key: string]: SearchConfigItem | ((name: string) => SearchConfig);
	getSearchFields(name: string): SearchConfig;
}

export interface SearchConfig {
	name: string;
	value: SearchConfigItem;
}

export interface SearchConfigItem {
	cache?: CacheConfig;
	fields?: string[];
}

export interface CacheConfig {
	enable: boolean;
	timeToLive?: number; // in minutes
	query?: any;
	expireAction?: 'remove' | 'update';
	autoRefresh?: boolean; // Auto refresh trước khi expire, default true
	retryConfig?: RetryConfig;
	maintenanceInterval?: number; // in minutes, default 60 (1 hour)
	maxCacheSize?: number; // Lấy từ query string, không có default
	valueKey?: string; // Key để lưu value trong storage, default là CacheValue_${key}
}

export interface RetryConfig {
	maxRetries: number; // Số lần thử lại tối đa, default 3
	retryInterval: number; // Thời gian giữa các lần thử lại (phút), default 5
}

export interface ICacheItem {
	key: string;
	value: any;
	tenant: string;
	branch?: string;
	timeToLive: number; // Time to live in minutes
	createdAt: number;
	expiresAt: number;
	version: string;
	accessCount: number;
	lastAccessed: number;
	fromProvider?: string; // Service name (ví dụ: 'SALE_Order', 'SYS_Status')
	api?: string; // API để gọi khi refresh
	method?: 'GET' | 'POST'; // Phương thức HTTP
	expireAction: 'remove' | 'update'; // Làm gì khi hết hạn
	query?: any; // Query để gọi API khi refresh
	status: 'idle' | 'refreshing' | 'error' | 'retry'; // Trạng thái cache
	retryCount: number; // Số lần đã thử lại
	lastRetryAt?: number; // Thời gian lần cuối thử lại
	nextRetryAt?: number; // Thời gian lần tiếp theo sẽ thử lại
	errorMessage?: string; // Thông báo lỗi nếu có
	autoRefresh?: boolean; // Auto refresh trước khi expire
	retryConfig?: RetryConfig; // Retry configuration
}

export enum CacheStrategy {
	NONE = 'none', // Không cache
	MEMORY = 'memory', // Chỉ cache trong memory
	STORAGE = 'storage', // Cache trong storage
	HYBRID = 'hybrid', // Memory + Storage
	INTELLIGENT = 'intelligent', // Tự động chọn strategy dựa trên data size
}

export interface ICacheStats {
	totalItems: number;
	expiredItems: number;
	errorItems: number;
	retryItems: number;
	tenantStats: { [tenant: string]: number };
	branchStats: { [branch: string]: number };
	memoryUsage: number; // in bytes
	storageUsage: number; // in bytes
}
