# Provider Service Flow Documentation

## 🔧 **Provider Service Flow Overview**

This document describes the providerService (ExtendService) flow in ART-ERP-FE, including CRUD operations, caching, and data access patterns.

## 📋 **Services Involved**

### **Core Services**
- **providerService** (`src/app/services/core/extend-service.ts`)
- **CommonService** (`src/app/services/core/common.service.ts`)
- **EnvService** (`src/app/services/core/env.service.ts`)

### **Supporting Services**
- **CacheManagementService** (`src/app/services/core/cache-management.service.ts`)
- **exService** (`src/app/services/core/common.service.ts`)

## 🔄 **Provider Service Initialization Flow**

```mermaid
flowchart TD
    ServiceInit[Service initialization] --> InjectDeps[Inject dependencies]
    InjectDeps --> SetApiPath[Set API path configuration]
    SetApiPath --> SetServiceName[Set service name]
    SetServiceName --> SetSearchFields[Set search fields array]
    SetSearchFields --> SetCacheConfig[Set cache configuration]
    SetCacheConfig --> SetCommonService[Set CommonService reference]
    SetCommonService --> LoadCommandRules[Load toolbar command rules]
    LoadCommandRules --> ServiceReady[Service ready for use]
```

## 🔄 **Data Reading Flow**

```mermaid
flowchart TD
    ReadRequest[Read data request] --> CheckCache{Cache enabled?}
    CheckCache -->|Yes| CheckForceReload{Force reload?}
    CheckCache -->|No| ReadServer[Read from server]
    
    CheckForceReload -->|No| TryLocalCache[Try local cache first]
    CheckForceReload -->|Yes| ReadServer
    
    TryLocalCache --> CacheHit{Cache hit?}
    CacheHit -->|Yes| ReturnCachedData[Return cached data]
    CacheHit -->|No| FallbackServer[Fallback to server]
    
    FallbackServer --> ReadServer
    ReadServer --> ProcessServerData[Process server data]
    ProcessServerData --> StoreInCache{Cache enabled?}
    StoreInCache -->|Yes| CacheData[Store data in cache]
    StoreInCache -->|No| ReturnData[Return data]
    CacheData --> ReturnData
    ReturnCachedData --> ReturnData
```

## 🔄 **Single Item Retrieval Flow**

```mermaid
flowchart TD
    GetItemRequest[Get item by ID request] --> CheckCacheEnabled{Cache enabled?}
    CheckCacheEnabled -->|Yes| GetLocalItem[Get from local cache]
    CheckCacheEnabled -->|No| GetServerItem[Get from server]
    
    GetLocalItem --> LocalFound{Item found locally?}
    LocalFound -->|Yes| ReturnLocalItem[Return local item]
    LocalFound -->|No| FallbackToServer[Fallback to server]
    
    FallbackToServer --> GetServerItem
    GetServerItem --> ProcessItem[Process server item]
    ProcessItem --> ReturnServerItem[Return server item]
    
    ReturnLocalItem --> End([End])
    ReturnServerItem --> End
```

## 🔄 **CRUD Operations Flow**

```mermaid
flowchart TD
    CRUDRequest[CRUD operation request] --> OperationType{Operation Type?}
    
    OperationType -->|Save| SaveFlow[Save Flow]
    OperationType -->|Delete| DeleteFlow[Delete Flow]
    OperationType -->|Approve| ApproveFlow[Approve Flow]
    OperationType -->|Cancel| CancelFlow[Cancel Flow]
    OperationType -->|Disable| DisableFlow[Disable Flow]
    OperationType -->|ChangeBranch| BranchFlow[Change Branch Flow]
    
    SaveFlow --> CheckId{Has ID?}
    CheckId -->|Yes| UpdateItem[Update existing item]
    CheckId -->|No| CreateItem[Create new item]
    
    DeleteFlow --> SetDeleteState[Set _state = delete]
    SetDeleteState --> SetIsDeleted[Set IsDeleted = true]
    SetIsDeleted --> CallDeleteAPI[Call delete API]
    
    ApproveFlow --> ExtractIds[Extract item IDs]
    ExtractIds --> CallApproveAPI[Call approve API]
    
    CancelFlow --> ExtractCancelIds[Extract item IDs]
    ExtractCancelIds --> CallCancelAPI[Call cancel API]
    
    DisableFlow --> CheckDisableFlag{IsDisabled flag?}
    CheckDisableFlag -->|true| CallDisableAPI[Call disable API]
    CheckDisableFlag -->|false| CallEnableAPI[Call enable API]
    
    BranchFlow --> ExtractBranchData[Extract branch data]
    ExtractBranchData --> CallBranchAPI[Call change branch API]
    
    UpdateItem --> End([End])
    CreateItem --> End
    CallDeleteAPI --> End
    CallApproveAPI --> End
    CallCancelAPI --> End
    CallDisableAPI --> End
    CallEnableAPI --> End
    CallBranchAPI --> End
```

## 🔄 **File Operations Flow**

```mermaid
flowchart TD
    FileRequest[File operation request] --> FileType{File Operation Type?}
    
    FileType -->|Import| ImportFlow[Import Flow]
    FileType -->|Export| ExportFlow[Export Flow]
    FileType -->|Upload| UploadFlow[Upload Flow]
    FileType -->|Download| DownloadFlow[Download Flow]
    
    ImportFlow --> CreateFormData[Create FormData]
    CreateFormData --> AppendFile[Append file to FormData]
    AppendFile --> CallImportAPI[Call import API]
    
    ExportFlow --> PrepareQuery[Prepare export query]
    PrepareQuery --> CallExportAPI[Call export API]
    
    UploadFlow --> CreateUploadForm[Create upload FormData]
    CreateUploadForm --> AppendUploadFile[Append file to FormData]
    AppendUploadFile --> CallUploadAPI[Call upload API]
    
    DownloadFlow --> PrepareDownloadQuery[Prepare download query]
    PrepareDownloadQuery --> CallDownloadAPI[Call download API]
    
    CallImportAPI --> End([End])
    CallExportAPI --> End
    CallUploadAPI --> End
    CallDownloadAPI --> End
```

## 🔄 **Search Operation Flow**

```mermaid
flowchart TD
    SearchRequest[Search request] --> PrepareQuery[Prepare search query]
    PrepareQuery --> GetSearchAPI[Get search API path]
    GetSearchAPI --> CallSearchAPI[Call search API via CommonService]
    CallSearchAPI --> ProcessResults[Process search results]
    ProcessResults --> ReturnResults[Return search results]
    ReturnResults --> End([End])
```

## 🔄 **Cache Integration Flow**

```mermaid
flowchart TD
    CacheOperation[Cache operation] --> CheckCacheConfig{Cache config enabled?}
    CheckCacheConfig -->|Yes| PrepareCacheData[Prepare cache data]
    CheckCacheConfig -->|No| SkipCache[Skip caching]
    
    PrepareCacheData --> SetQuery[Set query in cache config]
    SetQuery --> CallEnvSetStorage[Call env.setStorage]
    CallEnvSetStorage --> CacheStored[Cache stored successfully]
    
    SkipCache --> End([End])
    CacheStored --> End
```

## 🔄 **Service Configuration Flow**

```mermaid
flowchart TD
    ServiceConfig[Service configuration] --> SetApiPath[Set API path]
    SetApiPath --> SetSearchFields[Set search fields]
    SetSearchFields --> SetCacheConfig[Set cache configuration]
    SetCacheConfig --> SetServiceName[Set service name]
    SetServiceName --> SetCommandRules[Set command rules]
    SetCommandRules --> SetCommonService[Set CommonService reference]
    SetCommonService --> ServiceConfigured[Service configured]
```

## 📊 **Service Properties**

### **Core Properties**
```typescript
{
    apiPath: any,           // API path configuration
    searchField: [],       // Fields to search in
    allowCache: true,      // Enable/disable caching
    serviceName: '',       // Service identifier
    commonService: CommonService, // CommonService reference
    showCommandRules: [],  // UI command rules
    cacheConfig: CacheConfig // Cache configuration
}
```

### **API Path Structure**
```typescript
{
    getList: { method: 'GET', url: () => 'api/endpoint' },
    getItem: { method: 'GET', url: (id) => `api/endpoint/${id}` },
    postItem: { method: 'POST', url: () => 'api/endpoint' },
    putItem: { method: 'PUT', url: (id) => `api/endpoint/${id}` },
    delItem: { method: 'DELETE', url: (ids) => `api/endpoint/${ids}` },
    getSearchList: { method: 'GET', url: () => 'api/search' }
}
```

## 🔧 **Method Categories**

### **Read Operations**
- `read(query, forceReload)` - Read with caching
- `readServer(query)` - Read from server only
- `getAnItem(Id, UID)` - Get single item
- `search(query)` - Search operation

### **Write Operations**
- `save(item, isForceCreate)` - Save/create item
- `delete(items)` - Delete items
- `disable(items, IsDisabled)` - Enable/disable items

### **Workflow Operations**
- `submitForApproval(items)` - Submit for approval
- `approve(items)` - Approve items
- `disapprove(items)` - Disapprove items
- `cancel(items)` - Cancel items

### **File Operations**
- `import(fileToUpload)` - Import from file
- `export(query)` - Export data
- `upload(fileToUpload)` - Upload file
- `download(query)` - Download data

### **Utility Operations**
- `changeBranch(item)` - Change item branch

## 🚀 **Best Practices**

### **Service Design**
- Extend providerService for consistent interface
- Configure API paths properly
- Set appropriate cache configurations
- Use meaningful service names

### **Caching Strategy**
- Enable cache for frequently accessed data
- Use forceReload for critical updates
- Configure appropriate TTL values
- Handle cache misses gracefully

### **Error Handling**
- Leverage CommonService error handling
- Provide meaningful error messages
- Handle network failures appropriately

### **Performance**
- Use local cache when possible
- Implement proper search fields
- Optimize API calls
- Use pagination for large datasets

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Maintained by**: Development Team
