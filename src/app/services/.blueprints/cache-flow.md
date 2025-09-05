# Cache Management Flow Documentation

## 🗄️ **Cache Management Flow Overview**

This document describes the cache management system in ART-ERP-FE, focusing on CacheManagementService operations and storage architecture.

## 📋 **Services Involved**

### **Core Cache Services**
- **CacheManagementService** (`src/app/services/core/cache-management.service.ts`)
- **StorageService** (`src/app/services/core/storage.service.ts`)
- **MigrationService** (`src/app/services/core/migration.service.ts`)

### **Supporting Services**
- **EnvService** (`src/app/services/core/env.service.ts`)

## 🔄 **Cache Management Flow Diagram**

```mermaid
flowchart TD
    Start([Service Request]) --> CheckCache{Cache exists?}
    CheckCache -->|Yes| CheckExpiry{Is expired?}
    CheckCache -->|No| CallAPI[Call API via CommonService]
    
    CheckExpiry -->|No| ReturnCache[Return cached data]
    CheckExpiry -->|Yes| CheckAction{Expire action?}
    
    CheckAction -->|remove| RemoveCache[Remove expired cache]
    CheckAction -->|update| RefreshCache[Refresh cache]
    
    RemoveCache --> CallAPI
    RefreshCache --> CallAPI
    
    CallAPI --> ProcessResponse[Process API response]
    ProcessResponse --> StoreCache[Store in cache]
    StoreCache --> ReturnData[Return data]
    
    ReturnCache --> UpdateStats[Update access stats]
    UpdateStats --> ReturnData
    
    ReturnData --> End([End])
```

## 🔄 **Cache Initialization Sequence**

```mermaid
sequenceDiagram
    participant CMS as CacheManagementService
    participant SS as StorageService
    participant MS as MigrationService
    participant ES as EnvService
    
    CMS->>SS: Constructor injection
    SS->>SS: Storage initialization
    SS-->>CMS: Storage ready
    CMS->>CMS: loadCacheRegistry
    CMS->>CMS: Load app data from cache
    CMS->>MS: Execute migration
    MS-->>CMS: Migration complete
    CMS->>CMS: Setup maintenance
    CMS-->>ES: Cache ready signal
```

## 🔄 **Cache Operations Flow**

```mermaid
flowchart TD
    GetRequest[Get cache request] --> GenerateKey[Generate cache key]
    GenerateKey --> CheckRegistry[Check cache registry]
    CheckRegistry --> Exists{Item exists?}
    
    Exists -->|No| CacheMiss[Cache miss]
    Exists -->|Yes| CheckExpiry[Check expiry time]
    
    CheckExpiry --> Expired{Is expired?}
    Expired -->|No| UpdateStats[Update access stats]
    Expired -->|Yes| ExpireAction{Expire action?}
    
    ExpireAction -->|remove| RemoveItem[Remove expired item]
    ExpireAction -->|update| RefreshItem[Refresh item]
    
    RemoveItem --> CacheMiss
    RefreshItem --> CallAPI[Call API]
    
    UpdateStats --> LoadValue[Load value from storage]
    LoadValue --> ReturnData[Return cached data]
    
    CacheMiss --> CallAPI
    CallAPI --> ProcessData[Process API data]
    ProcessData --> StoreMetadata[Store metadata in registry]
    StoreMetadata --> StoreValue[Store value separately]
    StoreValue --> SaveRegistry[Save registry to storage]
    SaveRegistry --> ReturnData
```

## 🔄 **Cache Maintenance Flow**

```mermaid
flowchart TD
    MaintenanceStart[Maintenance starts] --> ScanItems[Scan all cache items]
    ScanItems --> CategorizeItems[Categorize items by status]
    
    CategorizeItems --> ExpiredItems[Expired items]
    CategorizeItems --> RefreshItems[Items to refresh]
    CategorizeItems --> RetryItems[Items to retry]
    
    ExpiredItems --> RemoveExpired[Remove expired items]
    RefreshItems --> RefreshCache[Refresh cache items]
    RetryItems --> HandleRetry[Handle retry logic]
    
    RemoveExpired --> CleanupSize[Cleanup by size limit]
    RefreshCache --> CleanupSize
    HandleRetry --> CleanupSize
    
    CleanupSize --> UpdateRegistry[Update cache registry]
    UpdateRegistry --> SaveStorage[Save to storage]
    SaveStorage --> MaintenanceEnd[Maintenance complete]
```

## 🔄 **Cache Storage Architecture**

```mermaid
flowchart LR
    CacheRequest[Cache Request] --> Registry[Cache Registry]
    Registry --> Metadata[Metadata Storage]
    Registry --> ValueStorage[Value Storage]
    
    Metadata --> CacheKey[Cache Key]
    Metadata --> TTL[Time To Live]
    Metadata --> ExpireAction[Expire Action]
    Metadata --> AccessStats[Access Stats]
    
    ValueStorage --> SeparateKey[Separate Value Key]
    ValueStorage --> ActualData[Actual Data]
    
    CacheKey --> GenerateKey[Generate Key Function]
    GenerateKey --> Tenant[Tenant]
    GenerateKey --> Branch[Branch]
    GenerateKey --> QueryHash[Query Hash]
```

## 🔄 **Cache Refresh Flow**

```mermaid
flowchart TD
    RefreshStart[Cache refresh starts] --> CheckStatus{Item status?}
    CheckStatus -->|refreshing| SkipRefresh[Skip refresh]
    CheckStatus -->|idle| StartRefresh[Start refresh]
    CheckStatus -->|error| CheckRetry{Should retry?}
    
    StartRefresh --> SetRefreshing[Set status = refreshing]
    SetRefreshing --> CallMockAPI[Call mock API]
    
    CheckRetry -->|Yes| RetryRefresh[Retry refresh]
    CheckRetry -->|No| RemoveItem[Remove item]
    
    RetryRefresh --> IncrementRetry[Increment retry count]
    IncrementRetry --> CallMockAPI
    
    CallMockAPI --> Success{API Success?}
    Success -->|Yes| UpdateCache[Update cache with new data]
    Success -->|No| HandleError[Handle API error]
    
    UpdateCache --> ResetStatus[Reset status = idle]
    ResetStatus --> SaveRegistry[Save registry]
    
    HandleError --> SetError[Set status = error]
    SetError --> CheckMaxRetry{Max retries reached?}
    CheckMaxRetry -->|Yes| RemoveItem
    CheckMaxRetry -->|No| SetNextRetry[Set next retry time]
    
    RemoveItem --> End([End])
    SaveRegistry --> End
    SetNextRetry --> End
    SkipRefresh --> End
```

## 📊 **Cache Configuration**

### **Default Cache Config**
```typescript
{
    enable: true,
    timeToLive: 1, // 1 hour
    expireAction: 'remove',
    maintenanceInterval: 1, // 1 hour
    autoRefresh: true,
    retryConfig: {
        maxRetries: 3,
        retryInterval: 5, // 5 minutes
    },
    valueKey: 'Cache_',
}
```

### **Cache Key Structure**
```
[key].[branch].[tenant].[queryHash]
```

### **Storage Separation**
- **Metadata**: Stored in CacheRegistry
- **Values**: Stored separately with `Cache_` prefix

## 🔧 **Cache Operations**

### **Get Operation**
1. Generate cache key
2. Check registry for metadata
3. Verify expiry time
4. Load value from separate storage
5. Update access statistics

### **Set Operation**
1. Generate cache key
2. Create metadata object
3. Store metadata in registry
4. Store value separately
5. Save registry to storage

### **Remove Operation**
1. Generate cache key
2. Remove from registry
3. Remove value from storage
4. Update registry

### **Clear Operation**
1. Clear all or tenant/branch specific
2. Remove all values from storage
3. Clear registry
4. Save updated registry

## 🚀 **Best Practices**

### **Performance**
- Separate metadata and value storage
- Efficient key generation with hash
- Lazy loading of values
- Automatic maintenance

### **Reliability**
- Retry mechanism for failed refreshes
- Error handling and recovery
- Migration support
- Size limit cleanup

### **Scalability**
- Tenant and branch isolation
- Configurable TTL and retry settings
- Maintenance automation
- Statistics tracking

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Maintained by**: Development Team