# Common Service Flow Documentation

## 🌐 **Common Service Flow Overview**

This document describes the CommonService API communication flow in ART-ERP-FE, including HTTP methods, error handling, and data processing.

## 📋 **Services Involved**

### **Core Services**
- **CommonService** (`src/app/services/core/common.service.ts`)
- **exService** (`src/app/services/core/common.service.ts`)
- **EnvService** (`src/app/services/core/env.service.ts`)

### **Supporting Services**
- **HttpClient** (Angular HTTP Client)
- **ApiSetting** (`src/app/services/static/api-setting.ts`)

## 🔄 **CommonService API Flow**

```mermaid
flowchart TD
    APICall[API call request] --> PrepareHeaders[Prepare headers]
    PrepareHeaders --> AddToken[Add Bearer token]
    AddToken --> AddBranch[Add branch parameters]
    AddBranch --> ProcessData[Process request data]
    
    ProcessData --> MethodCheck{HTTP Method?}
    MethodCheck -->|Login| LoginAuth[Basic auth headers]
    MethodCheck -->|GET| GetRequest[GET request]
    MethodCheck -->|POST| PostRequest[POST request]
    MethodCheck -->|PUT| PutRequest[PUT request]
    MethodCheck -->|DELETE| DeleteRequest[DELETE request]
    MethodCheck -->|UPLOAD| UploadRequest[Upload request]
    MethodCheck -->|DOWNLOAD| DownloadRequest[Download request]
    
    LoginAuth --> SendRequest[Send HTTP request]
    GetRequest --> SendRequest
    PostRequest --> SendRequest
    PutRequest --> SendRequest
    DeleteRequest --> SendRequest
    UploadRequest --> SendRequest
    DownloadRequest --> SendRequest
    
    SendRequest --> Response{Response status?}
    Response -->|Success| ReturnData[Return response data]
    Response -->|Error| CheckError[Check error type]
    
    CheckError --> Error401[401 Unauthorized]
    CheckError --> Error417[417 Force update]
    CheckError --> Error0[0 Connection fail]
    CheckError --> OtherError[Other errors]
    
    Error401 --> LogoutEvent[Publish logout event]
    Error417 --> UpdateEvent[Publish update event]
    Error0 --> ConnectFailEvent[Publish connect fail event]
    OtherError --> ShowError[Show error message]
    
    LogoutEvent --> End([End])
    UpdateEvent --> End
    ConnectFailEvent --> End
    ShowError --> End
    ReturnData --> End
```

## 🔄 **HTTP Method Processing Flow**

```mermaid
flowchart TD
    MethodInput[HTTP Method Input] --> MethodType{Method Type?}
    
    MethodType -->|Login| LoginFlow[Login Flow]
    MethodType -->|GET| GetFlow[GET Flow]
    MethodType -->|POST| PostFlow[POST Flow]
    MethodType -->|PUT| PutFlow[PUT Flow]
    MethodType -->|DELETE| DeleteFlow[DELETE Flow]
    MethodType -->|UPLOAD| UploadFlow[Upload Flow]
    MethodType -->|DOWNLOAD| DownloadFlow[Download Flow]
    
    LoginFlow --> BasicAuth[Basic Authentication]
    BasicAuth --> FormData[Form URL Encoded]
    FormData --> GrantType[grant_type=password]
    
    GetFlow --> QueryParams[Query Parameters]
    QueryParams --> HttpGet[HTTP GET]
    
    PostFlow --> JsonData[JSON Data]
    JsonData --> HttpPost[HTTP POST]
    
    PutFlow --> PutData[PUT Data]
    PutData --> HttpPut[HTTP PUT]
    
    DeleteFlow --> DeleteParams[Delete Parameters]
    DeleteParams --> HttpDelete[HTTP DELETE]
    
    UploadFlow --> FormDataUpload[FormData Upload]
    FormDataUpload --> HttpUpload[HTTP Upload]
    
    DownloadFlow --> DownloadParams[Download Parameters]
    DownloadParams --> HttpDownload[HTTP Download]
```

## 🔄 **Data Processing Flow**

```mermaid
flowchart TD
    RawData[Raw Request Data] --> CloneData[Clone object data]
    CloneData --> RemoveFields[Remove system fields]
    
    RemoveFields --> RemoveIsDeleted[Remove IsDeleted]
    RemoveFields --> RemoveCreatedBy[Remove CreatedBy]
    RemoveFields --> RemoveModifiedBy[Remove ModifiedBy]
    RemoveFields --> RemoveDates[Remove CreatedDate/ModifiedDate]
    RemoveFields --> RemoveUI[Remove UI fields]
    
    RemoveUI --> RemoveLevels[Remove levels]
    RemoveUI --> RemoveShow[Remove show/showdetail]
    RemoveUI --> RemoveState[Remove _state]
    RemoveUI --> RemoveUndefined[Remove undefined]
    RemoveUI --> RemoveCount[Remove count]
    RemoveUI --> RemoveChecked[Remove checked/selected]
    
    RemoveChecked --> ProcessAdvance[Process _AdvanceConfig]
    ProcessAdvance --> Base64Encode[Base64 encode]
    Base64Encode --> FinalData[Final processed data]
```

## 🔄 **Error Handling Flow**

```mermaid
flowchart TD
    ErrorOccurred[Error occurred] --> CheckStatus{Error Status?}
    
    CheckStatus -->|401| Unauthorized[Unauthorized Error]
    CheckStatus -->|417| ForceUpdate[Force Update Error]
    CheckStatus -->|0| ConnectionFail[Connection Fail Error]
    CheckStatus -->|Other| GeneralError[General Error]
    
    Unauthorized --> LogoutEvent[Publish LOGOUT_REQUESTED event]
    Unauthorized --> ShowSessionExpired[Show session expired message]
    
    ForceUpdate --> ParseVersion[Parse version from statusText]
    ForceUpdate --> ShowUpdateMessage[Show update required message]
    ForceUpdate --> PublishUpdateEvent[Publish FORCE_UPDATE_MOBILEAPP event]
    
    ConnectionFail --> ShowConnectionError[Show connection error message]
    ConnectionFail --> PublishConnectFail[Publish CONNECT_FAIL event]
    
    GeneralError --> ShowErrorMessage[Show error message]
    GeneralError --> DevModeCheck{Development mode?}
    DevModeCheck -->|Yes| ShowDevMessage[Show dev error message]
    DevModeCheck -->|No| SkipDevMessage[Skip dev message]
```

## 🔄 **exService Provider Flow**

```mermaid
flowchart TD
    ServiceInit[exService initialization] --> InjectDeps[Inject dependencies]
    InjectDeps --> SetApiPath[Set API path]
    SetApiPath --> SetServiceName[Set service name]
    SetServiceName --> SetSearchFields[Set search fields]
    SetSearchFields --> SetCacheConfig[Set cache configuration]
    SetCacheConfig --> SetCommonService[Set CommonService reference]
    SetCommonService --> LoadCommandRules[Load toolbar command rules]
    LoadCommandRules --> ServiceReady[Service ready]
```

## 🔄 **CRUD Operations Flow**

```mermaid
flowchart TD
    CRUDRequest[CRUD operation request] --> OperationType{Operation Type?}
    
    OperationType -->|Save| SaveFlow[Save Flow]
    OperationType -->|Add| AddFlow[Add Flow]
    OperationType -->|Update| UpdateFlow[Update Flow]
    OperationType -->|Delete| DeleteFlow[Delete Flow]
    OperationType -->|Approve| ApproveFlow[Approve Flow]
    OperationType -->|Cancel| CancelFlow[Cancel Flow]
    
    SaveFlow --> CheckId{Has ID?}
    CheckId -->|Yes| UpdateFlow
    CheckId -->|No| AddFlow
    
    AddFlow --> SetState[Set _state = 'add']
    SetState --> GenerateUID[Generate UID]
    GenerateUID --> CallAPI[Call POST API]
    
    UpdateFlow --> SetUpdateState[Set _state = 'update']
    SetUpdateState --> CallPutAPI[Call PUT API]
    
    DeleteFlow --> SetDeleteState[Set _state = 'delete']
    SetDeleteState --> SetIsDeleted[Set IsDeleted = true]
    SetIsDeleted --> CallDeleteAPI[Call DELETE API]
    
    ApproveFlow --> ExtractIds[Extract item IDs]
    ExtractIds --> CallApproveAPI[Call approve API]
    
    CancelFlow --> ExtractCancelIds[Extract item IDs]
    ExtractCancelIds --> CallCancelAPI[Call cancel API]
```

## 🔄 **File Operations Flow**

```mermaid
flowchart TD
    FileOperation[File operation request] --> FileType{File Operation Type?}
    
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
```

## 📊 **API Configuration**

### **Headers Configuration**
```typescript
{
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json',
    'Data-type': 'json',
    'App-Version': environment.appVersion
}
```

### **Login Headers**
```typescript
{
    'Content-Type': 'application/x-www-form-urlencoded',
    'App-Version': environment.appVersion,
    Authorization: 'Basic ' + btoa(username + ':' + password)
}
```

### **Upload Headers**
```typescript
{
    Authorization: 'Bearer ' + token,
    'App-Version': environment.appVersion,
    withCredentials: 'true'
}
```

## 🔧 **URL Processing**

### **URL Construction**
1. Check if URL starts with 'http'
2. Use ApiSetting for domain resolution
3. Add branch parameters if needed
4. Add query parameters for GET requests

### **Branch Parameters**
- **IDBranch**: Added automatically if not present
- **SelectedBranch**: Added for branch-specific operations

## 🚀 **Best Practices**

### **Security**
- Bearer token authentication
- Basic auth for login
- Secure file upload handling

### **Performance**
- Data cloning to prevent mutations
- Efficient parameter processing
- Proper error handling

### **Reliability**
- Comprehensive error handling
- Event publishing for critical errors
- Development mode debugging

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Maintained by**: Development Team
