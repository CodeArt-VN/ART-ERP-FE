# Printing Service Flow Documentation

## 🖨️ **Printing Service Flow Overview**

This document describes the PrintingService flow in ART-ERP-FE, including QZ Tray integration, print job processing, and printer management.

## 📋 **Services Involved**

### **Core Services**
- **PrintingService** (`src/app/services/util/printing.service.ts`)
- **EnvService** (`src/app/services/core/env.service.ts`)
- **SYS_ConfigService** (`src/app/services/custom/system-config.service.ts`)

### **Supporting Services**
- **SYS_PrinterProvider** (`src/app/services/static/services.service.ts`)
- **QZ Tray** (External printing library)

## 🔄 **Printing Service Initialization Flow**

```mermaid
flowchart TD
    ServiceInit[PrintingService constructor] --> ListenEvents[Listen to branch switch events]
    ListenEvents --> InitQZ[Initialize QZ Tray]
    InitQZ --> LoadConfig[Load printing configuration]
    LoadConfig --> StartConnection[Start QZ connection]
    StartConnection --> ServiceReady[Service ready]
    
    InitQZ --> SetCertificate[Set QZ certificate]
    SetCertificate --> SetSignature[Set signature algorithm]
    SetSignature --> SetPrivateKey[Set private key]
    SetPrivateKey --> QZReady[QZ Tray ready]
```

## 🔄 **Print Job Processing Flow**

```mermaid
flowchart TD
    PrintRequest[Print jobs request] --> ValidateJobs[Validate and complete job options]
    ValidateJobs --> FailedValidation{Any jobs failed validation?}
    
    FailedValidation -->|Yes| RemoveFailedJobs[Remove failed jobs]
    FailedValidation -->|No| GroupJobs[Group jobs by server and printer]
    
    RemoveFailedJobs --> GroupJobs
    GroupJobs --> ProcessServers[Process each server group]
    
    ProcessServers --> ServerGroup{Server group exists?}
    ServerGroup -->|Yes| ProcessPrinters[Process printers sequentially]
    ServerGroup -->|No| CollectResults[Collect all results]
    
    ProcessPrinters --> ExecutePrintJob[Execute print job for printer]
    ExecutePrintJob --> PrintSuccess{Print successful?}
    PrintSuccess -->|Yes| AddSuccessResult[Add success result]
    PrintSuccess -->|No| AddErrorResult[Add error result]
    
    AddSuccessResult --> NextPrinter{More printers?}
    AddErrorResult --> NextPrinter
    NextPrinter -->|Yes| ProcessPrinters
    NextPrinter -->|No| NextServer{More servers?}
    
    NextServer -->|Yes| ProcessServers
    NextServer -->|No| CollectResults
    CollectResults --> ReturnResults[Return all results]
```

## 🔄 **Job Validation Flow**

```mermaid
flowchart TD
    ValidationStart[Start job validation] --> CheckConfig{Config loaded?}
    CheckConfig -->|No| LoadConfig[Load configuration]
    CheckConfig -->|Yes| CheckHost{Printing host configured?}
    
    LoadConfig --> CheckHost
    CheckHost -->|No| AllJobsFail[All jobs fail - no host]
    CheckHost -->|Yes| ValidateEachJob[Validate each job]
    
    ValidateEachJob --> JobHasOptions{Job has options?}
    JobHasOptions -->|No| CheckDefaultPrinter{Default printer exists?}
    JobHasOptions -->|Yes| ValidateOptions[Validate job options]
    
    CheckDefaultPrinter -->|No| JobFails[Job fails - no printer]
    CheckDefaultPrinter -->|Yes| UseDefaultConfig[Use default configuration]
    
    ValidateOptions --> FillMissingHost[Fill missing host from config]
    FillMissingHost --> FillMissingPrinter[Fill missing printer from config]
    FillMissingPrinter --> FillMissingPort[Fill missing port from config]
    FillMissingPort --> FillMissingSecure[Fill missing isSecure from config]
    FillMissingSecure --> FilterValidOptions[Filter valid options]
    
    FilterValidOptions --> HasValidOptions{Has valid options?}
    HasValidOptions -->|No| JobFails
    HasValidOptions -->|Yes| JobValid[Job validation successful]
    
    UseDefaultConfig --> JobValid
    JobValid --> NextJob{More jobs?}
    JobFails --> NextJob
    NextJob -->|Yes| ValidateEachJob
    NextJob -->|No| ReturnValidationResults[Return validation results]
    
    AllJobsFail --> ReturnValidationResults
```

## 🔄 **Print Job Execution Flow**

```mermaid
flowchart TD
    ExecuteStart[Execute print job] --> ConnectToServer[Connect to printer server]
    ConnectToServer --> ConnectionSuccess{Connection successful?}
    
    ConnectionSuccess -->|No| AllJobsFail[Mark all jobs as failed]
    ConnectionSuccess -->|Yes| ProcessContents[Process each content item]
    
    ProcessContents --> FormatData[Format data for printing]
    FormatData --> CreateQZConfig[Create QZ configuration]
    CreateQZConfig --> ExecutePrint[Execute QZ print]
    
    ExecutePrint --> PrintSuccess{Print successful?}
    PrintSuccess -->|Yes| AddSuccessResult[Add success result]
    PrintSuccess -->|No| AddErrorResult[Add error result]
    
    AddSuccessResult --> NextContent{More content?}
    AddErrorResult --> NextContent
    NextContent -->|Yes| ProcessContents
    NextContent -->|No| ReturnResults[Return all results]
    
    AllJobsFail --> ReturnResults
```

## 🔄 **Data Formatting Flow**

```mermaid
flowchart TD
    FormatStart[Start data formatting] --> CheckContentType{Content type?}
    CheckContentType -->|html| OptimizeHTML[Optimize HTML content]
    CheckContentType -->|pdf| UsePDFData[Use PDF data as-is]
    CheckContentType -->|image| UseImageData[Use image data as-is]
    
    OptimizeHTML --> RemoveAngularAttrs[Remove Angular attributes]
    RemoveAngularAttrs --> RemoveComments[Remove Angular comments]
    RemoveComments --> CleanStyles[Clean inline styles]
    CleanStyles --> CleanWhitespace[Clean excessive whitespace]
    
    UsePDFData --> CreatePrintData[Create print data structure]
    UseImageData --> CreatePrintData
    CleanWhitespace --> CreatePrintData
    
    CreatePrintData --> ApplyOptions[Apply print options]
    ApplyOptions --> SetDuplex[Set duplex option]
    SetDuplex --> SetOrientation[Set orientation]
    SetOrientation --> SetJobName[Set job name]
    SetJobName --> SetTray[Set printer tray]
    SetTray --> SetCopies[Set copies]
    SetCopies --> SetPaperSize[Set paper size]
    SetPaperSize --> ApplyCSS[Apply CSS styles]
    
    ApplyCSS --> WrapHTML[Wrap in HTML structure]
    WrapHTML --> ReturnFormattedData[Return formatted data]
```

## 🔄 **QZ Tray Connection Flow**

```mermaid
flowchart TD
    ConnectionStart[Start QZ connection] --> CheckActiveConnection{Active connection exists?}
    CheckActiveConnection -->|Yes| CheckHostMatch{Host matches?}
    CheckActiveConnection -->|No| CreateConnection[Create new connection]
    
    CheckHostMatch -->|No| EndConnection[End existing connection]
    CheckHostMatch -->|Yes| UseExistingConnection[Use existing connection]
    
    EndConnection --> CreateConnection
    CreateConnection --> SetConnectionOptions[Set connection options]
    SetConnectionOptions --> ConnectWebSocket[Connect WebSocket]
    
    ConnectWebSocket --> ConnectionResult{Connection successful?}
    ConnectionResult -->|Yes| UpdateConnectionState[Update connection state]
    ConnectionResult -->|No| HandleConnectionError[Handle connection error]
    
    UpdateConnectionState --> SetReadyFlag[Set isReady flag]
    SetReadyFlag --> ConnectionComplete[Connection complete]
    
    HandleConnectionError --> ShowErrorMessage[Show error message]
    ShowErrorMessage --> ConnectionComplete
    UseExistingConnection --> ConnectionComplete
```

## 🔄 **Configuration Loading Flow**

```mermaid
flowchart TD
    ConfigRequest[Configuration request] --> DetermineBranch{Specify branch ID?}
    DetermineBranch -->|Yes| UseSpecifiedBranch[Use specified branch]
    DetermineBranch -->|No| UseCurrentBranch[Use current selected branch]
    
    UseSpecifiedBranch --> LoadConfig[Load configuration from SYS_ConfigService]
    UseCurrentBranch --> LoadConfig
    
    LoadConfig --> ConfigSuccess{Configuration loaded?}
    ConfigSuccess -->|Yes| SetPrintingConfig[Set printingServerConfig]
    ConfigSuccess -->|No| ConfigError[Configuration error]
    
    SetPrintingConfig --> ConfigComplete[Configuration complete]
    ConfigError --> ConfigComplete
```

## 🔄 **Available Printers Flow**

```mermaid
flowchart TD
    GetPrintersRequest[Get available printers request] --> LoadPrinterConfig[Load printer configuration]
    LoadPrinterConfig --> StartPrinterConnection[Start QZ connection]
    StartPrinterConnection --> ConnectionReady{Connection ready?}
    
    ConnectionReady -->|No| PrinterError[Show connection error]
    ConnectionReady -->|Yes| FindPrinters[Find available printers]
    
    FindPrinters --> PrinterSuccess{Printers found?}
    PrinterSuccess -->|Yes| ReturnPrinters[Return printers and config]
    PrinterSuccess -->|No| PrinterError
    
    PrinterError --> End([End])
    ReturnPrinters --> End
```

## 📊 **Print Data Structure**

### **printData Interface**
```typescript
{
    content: string,           // HTML/PDF/Image content
    type: 'html' | 'pdf' | 'image',
    options?: printOptions[],  // Printer options array
    IDJob?: string            // Job identifier
}
```

### **printOptions Interface**
```typescript
{
    printer?: string,         // Printer name/code
    host?: string,           // Printer server host
    port?: string,           // Printer server port
    isSecure?: boolean,      // Use secure connection
    jobName?: string,        // Print job name
    tray?: string,           // Printer tray
    pages?: string,          // Page range
    copies?: number,         // Number of copies
    paperSize?: string,      // Paper size configuration
    rotation?: number,       // Rotation angle
    scale?: number,          // Scale factor
    duplex?: string,         // Duplex mode
    orientation?: string,    // Page orientation
    cssStyle?: string,       // Custom CSS
    autoStyle?: Element      // Auto style element
}
```

### **Printing Server Configuration**
```typescript
{
    PrintingHost: string,      // Default printing host
    PrintingPort: number,      // Default printing port
    PrintingIsSecure: boolean, // Use secure connection
    DefaultPrinter: string     // Default printer code
}
```

## 🔧 **QZ Tray Integration**

### **Security Configuration**
- **Certificate**: Hardcoded ERP signing certificate
- **Private Key**: RSA private key for signing
- **Signature Algorithm**: SHA512withRSA
- **Connection**: WebSocket with optional SSL

### **Print Data Format**
```typescript
{
    data: [{
        type: 'pixel',
        format: 'html' | 'pdf' | 'image',
        flavor: 'file' | 'plain',
        data: string
    }],
    options: {
        duplex?: string,
        orientation?: string,
        jobName?: string,
        printerTray?: string,
        copies?: number,
        size?: object,
        units?: string
    }
}
```

## 🚀 **Best Practices**

### **Performance**
- Group jobs by server and printer for efficiency
- Process printers sequentially to avoid conflicts
- Optimize HTML content before printing
- Use connection pooling for multiple jobs

### **Error Handling**
- Validate all job options before processing
- Handle connection failures gracefully
- Provide meaningful error messages
- Track job status and results

### **Configuration**
- Load configuration per branch
- Support both default and custom printer settings
- Handle missing configuration gracefully
- Update configuration on branch switch

### **Security**
- Use secure connections when possible
- Validate all input data
- Handle certificate errors properly
- Implement proper error logging

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Maintained by**: Development Team
