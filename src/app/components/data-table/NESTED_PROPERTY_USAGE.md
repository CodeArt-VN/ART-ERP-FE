# Nested Property Support - Usage Guide

## Overview
DataTable component now supports nested property access for displaying, sorting, and filtering data with unlimited nesting levels.

## Basic Usage

### Single-level Property (Backward Compatible)
```html
<datatable-column property="Id" name="ID"></datatable-column>
<datatable-column property="Name" name="Name"></datatable-column>
```

### Nested Property (New Feature)
```html
<datatable-column property="_SaleOrder.DailyBillNo" name="Bill No"></datatable-column>
<datatable-column property="_SaleOrder._Customer.Name" name="Customer"></datatable-column>
```

## Features

### 1. Display
Automatically displays nested property values:
```typescript
// Data structure
const rows = [
  {
    Id: 1,
    Name: "Order 1",
    _SaleOrder: {
      DailyBillNo: "SO-12345",
      _Customer: {
        Name: "Customer A"
      }
    }
  }
];
```

```html
<!-- Template -->
<app-data-table [rows]="rows">
  <datatable-column property="_SaleOrder.DailyBillNo" name="Bill No"></datatable-column>
  <datatable-column property="_SaleOrder._Customer.Name" name="Customer"></datatable-column>
</app-data-table>
```

### 2. Local Sort (Client-side)
When `isQueryLocalOnly="true"`, sorting works automatically with nested properties:
```html
<app-data-table [rows]="rows" [isQueryLocalOnly]="true">
  <datatable-column property="_SaleOrder.DailyBillNo" name="Bill No" [canSort]="true"></datatable-column>
</app-data-table>
```

### 3. Local Filter (Client-side)
When `isQueryLocalOnly="true"`, filtering works automatically with nested properties:
```html
<app-data-table [rows]="rows" [isQueryLocalOnly]="true" [showFilter]="true">
  <datatable-column property="_SaleOrder.DailyBillNo" name="Bill No" [canFilter]="true"></datatable-column>
</app-data-table>
```

### 4. Server Sort & Filter (Server-side)
When `isQueryLocalOnly="false"`, component emits events that backend needs to handle:

#### Sort Event
```typescript
// Frontend emits
(sort)="onSort($event)"

// Event data
[
  { Dimension: "_SaleOrder.DailyBillNo", Order: "ASC" }
]
```

#### Filter Event
```typescript
// Frontend emits
(filter)="onFilter($event)"

// Event data
{
  event: MouseEvent,
  query: {
    "_SaleOrder.DailyBillNo": "SO-12345",
    "Name": "Order 1"  // single-level still works
  }
}
```

## Backend API Requirements

### For Server Mode (`isQueryLocalOnly = false`)

Backend API must handle nested properties in sort and filter operations:

**Sort:**
1. Detect nested property (contains ".")
2. Parse path: `_SaleOrder.DailyBillNo` → table: `_SaleOrder`, field: `DailyBillNo`
3. Generate appropriate JOIN and ORDER BY clauses

**Filter:**
1. Detect nested property keys (contains ".")
2. Parse path and generate JOIN if needed
3. Apply WHERE clause on nested field

**Response:**
Always return data with nested objects structure:
```json
{
  "Id": 1,
  "Name": "Order 1",
  "_SaleOrder": {
    "Id": 100,
    "DailyBillNo": "SO-12345",
    "_Customer": {
      "Name": "Customer A"
    }
  }
}
```

### For Local Mode (`isQueryLocalOnly = true`)

Backend only needs to return data with nested objects. Frontend handles all sort/filter operations.

## Null Handling

When parent object is null or undefined, the component returns empty string:
```typescript
// Data
{ Id: 1, _SaleOrder: null }

// Result when accessing '_SaleOrder.DailyBillNo'
"" // empty string
```

## Examples

### Complete Example
```html
<app-data-table 
  [rows]="orderItems"
  [isQueryLocalOnly]="false"
  [showFilter]="true"
  (sort)="handleSort($event)"
  (filter)="handleFilter($event)">
  
  <!-- Single-level properties -->
  <datatable-column property="Id" name="ID"></datatable-column>
  <datatable-column property="Name" name="Name"></datatable-column>
  
  <!-- Nested properties -->
  <datatable-column 
    property="_SaleOrder.DailyBillNo" 
    name="Bill No"
    [canSort]="true"
    [canFilter]="true">
  </datatable-column>
  
  <datatable-column 
    property="_SaleOrder._Customer.Name" 
    name="Customer"
    [canSort]="true"
    [canFilter]="true">
  </datatable-column>
  
  <!-- With custom template (still works) -->
  <datatable-column property="_SaleOrder.Amount" name="Amount">
    <ng-template datatable-cell-template let-value="value">
      {{ value | currency }}
    </ng-template>
  </datatable-column>
</app-data-table>
```

### Component Code
```typescript
export class MyComponent {
  orderItems = [
    {
      Id: 1,
      Name: "Item 1",
      _SaleOrder: {
        Id: 100,
        DailyBillNo: "SO-12345",
        Amount: 1000000,
        _Customer: {
          Id: 50,
          Name: "Customer A"
        }
      }
    },
    {
      Id: 2,
      Name: "Item 2",
      _SaleOrder: null  // Handles null gracefully
    }
  ];

  handleSort(event) {
    // event = [{ Dimension: "_SaleOrder.DailyBillNo", Order: "ASC" }]
    // Send to backend API
  }

  handleFilter(event) {
    // event.query = { "_SaleOrder.DailyBillNo": "SO-12345" }
    // Send to backend API
  }
}
```

## Technical Details

Implementation uses `lib.getNestedProperty(obj, path)` utility function:
- Splits property path by "."
- Traverses object hierarchy
- Returns empty string if any level is null/undefined
- Maintains backward compatibility with single-level properties

### Form Control Key Handling
When using nested properties for filtering, the form control key is the full property path string:
- Form control key: `"_SaleOrder.DailyBillNo"` (string with dot)
- Access via: `formGroup.get('_SaleOrder.DailyBillNo')` ✅
- NOT via: `formGroup.controls._SaleOrder.DailyBillNo` ❌

The filter clear button properly detects values using `field.form.get(field.id)?.value`

## Testing

Test scenarios covered:
- ✅ Single-level property (backward compatibility)
- ✅ Two-level nested property (`_SaleOrder.DailyBillNo`)
- ✅ Multi-level nested property (`_SaleOrder._Customer.Name`)
- ✅ Null parent object handling
- ✅ Undefined property handling
- ✅ Local sort with nested properties
- ✅ Local filter with nested properties
- ✅ Server sort event emission
- ✅ Server filter event emission
- ✅ Custom cell templates with nested properties
- ✅ Different data types (string, number, date)

