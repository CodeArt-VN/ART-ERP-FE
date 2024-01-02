import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/app.guard';

import { BIRoutes} from './pages/BI/bi-routing.module'
const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
  //   canActivate: [AuthGuard]
  // },

  //PM
  { path: 'gantt', loadChildren: () => import('./pages/PM/gantt/gantt.module').then(m => m.GanttPageModule) },

  //ACCOUNTANT
  { path: 'arinvoice', loadChildren: () => import('./pages/ACCOUNTANT/arinvoice/arinvoice.module').then(m => m.ARInvoicePageModule), canActivate: [AuthGuard] },
  //{ path: 'arinvoice/:id', loadChildren: () => import('./pages/ACCOUNTANT/arinvoice-detail/arinvoice-detail.module').then(m => m.ARInvoiceDetailPageModule), canActivate: [AuthGuard] },
  { path: 'arinvoice/:id', loadChildren: () => import('./pages/ACCOUNTANT/ar-invoice-detail/ar-invoice-detail.module').then(m => m.ARInvoiceDetailPageModule), canActivate: [AuthGuard] },

  //{ path: 'ar-invoice', loadChildren: () => import('./pages/ACCOUNTANT/arinvoice/arinvoice.module').then(m => m.ARInvoicePageModule), canActivate: [AuthGuard] },
  //{ path: 'ar-invoice/:id', loadChildren: () => import('./pages/ACCOUNTANT/arinvoice-detail/arinvoice-detail.module').then(m => m.ARInvoiceDetailPageModule), canActivate: [AuthGuard] },

  { path: 'ap-invoice', loadChildren: () => import('./pages/ACCOUNTANT/ap-invoice/ap-invoice.module').then(m => m.APInvoicePageModule), canActivate: [AuthGuard] },
  { path: 'ap-invoice/:id', loadChildren: () => import('./pages/ACCOUNTANT/ap-invoice-detail/ap-invoice-detail.module').then(m => m.APInvoiceDetailPageModule), canActivate: [AuthGuard] },


  //CRM
  { path: 'contact-mobile', loadChildren: () => import('./pages/CRM/outlet/outlet.module').then(m => m.OutletPageModule), canActivate: [AuthGuard] },
  { path: 'contact-mobile/:id', loadChildren: () => import('./pages/CRM/outlet-detail/outlet-detail.module').then(m => m.OutletDetailPageModule), canActivate: [AuthGuard] },
  { path: 'outlet', loadChildren: () => import('./pages/CRM/outlet/outlet.module').then(m => m.OutletPageModule), canActivate: [AuthGuard] },
  { path: 'outlet/:id', loadChildren: () => import('./pages/CRM/outlet-detail/outlet-detail.module').then(m => m.OutletDetailPageModule), canActivate: [AuthGuard] },

  { path: 'attendance-booking', loadChildren: () => import('./pages/CRM/attendance-booking/attendance-booking.module').then(m => m.AttendanceBookingPageModule), canActivate: [AuthGuard] },
  { path: 'attendance-booking/:id', loadChildren: () => import('./pages/CRM/attendance-booking-detail/attendance-booking-detail.module').then(m => m.AttendanceBookingDetailPageModule), canActivate: [AuthGuard] },

  { path: 'business-partner', loadChildren: () => import('./pages/CRM/business-partner/business-partner.module').then(m => m.BusinessPartnerPageModule), canActivate: [AuthGuard] },
  { path: 'business-partner/:id', loadChildren: () => import('./pages/CRM/business-partner-detail/business-partner-detail.module').then(m => m.ContactDetailPageModule), canActivate: [AuthGuard] },
  { path: 'distributor', loadChildren: () => import('./pages/CRM/business-partner/business-partner.module').then(m => m.BusinessPartnerPageModule), canActivate: [AuthGuard] },
  { path: 'distributor/:id', loadChildren: () => import('./pages/CRM/business-partner-detail/business-partner-detail.module').then(m => m.ContactDetailPageModule), canActivate: [AuthGuard] },
  { path: 'storer', loadChildren: () => import('./pages/CRM/business-partner/business-partner.module').then(m => m.BusinessPartnerPageModule), canActivate: [AuthGuard] },
  { path: 'storer/:id', loadChildren: () => import('./pages/CRM/business-partner-detail/business-partner-detail.module').then(m => m.ContactDetailPageModule), canActivate: [AuthGuard] },
  { path: 'carrier', loadChildren: () => import('./pages/CRM/business-partner/business-partner.module').then(m => m.BusinessPartnerPageModule), canActivate: [AuthGuard] },
  { path: 'carrier/:id', loadChildren: () => import('./pages/CRM/business-partner-detail/business-partner-detail.module').then(m => m.ContactDetailPageModule), canActivate: [AuthGuard] },

  { path: 'customer', loadChildren: () => import('./pages/CRM/business-partner/business-partner.module').then(m => m.BusinessPartnerPageModule), canActivate: [AuthGuard] },
  { path: 'customer/:id', loadChildren: () => import('./pages/CRM/business-partner-detail/business-partner-detail.module').then(m => m.ContactDetailPageModule), canActivate: [AuthGuard] },
  { path: 'vendor', loadChildren: () => import('./pages/CRM/business-partner/business-partner.module').then(m => m.BusinessPartnerPageModule), canActivate: [AuthGuard] },
  { path: 'vendor/:id', loadChildren: () => import('./pages/CRM/business-partner-detail/business-partner-detail.module').then(m => m.ContactDetailPageModule), canActivate: [AuthGuard] },

  { path: 'mcp', loadChildren: () => import('./pages/CRM/mcp/mcp.module').then(m => m.MCPPageModule), canActivate: [AuthGuard] },
  { path: 'mcp/:id', loadChildren: () => import('./pages/CRM/mcp-detail/mcp-detail.module').then(m => m.MCPDetailPageModule), canActivate: [AuthGuard] },


  //SALE
  { path: 'sale-order', loadChildren: () => import('./pages/SALE/sale-order/sale-order.module').then(m => m.SaleOrderPageModule), canActivate: [AuthGuard] },
  { path: 'sale-order/:id', loadChildren: () => import('./pages/SALE/sale-order-detail/sale-order-detail.module').then(m => m.SaleOrderDetailPageModule), canActivate: [AuthGuard] },
  { path: 'sale-order/close-order/:id', loadChildren: () => import('./pages/SALE/close-order/close-order.module').then(m => m.CloseOrderPageModule), canActivate: [AuthGuard] },

  { path: 'receivable-debt', loadChildren: () => import('./pages/SALE/receivable-debt/receivable-debt.module').then(m => m.ReceivableDebtPageModule), canActivate: [AuthGuard] },
  { path: 'saleman-debt', loadChildren: () => import('./pages/SALE/saleman-debt/saleman-debt.module').then(m => m.SalemanDebtPageModule), canActivate: [AuthGuard] },

  { path: 'sale-order-mobile', loadChildren: () => import('./pages/SALE/sale-order-mobile/sale-order-mobile.module').then(m => m.SaleOrderMobilePageModule), canActivate: [AuthGuard] },
  { path: 'sale-order-mobile/:id', loadChildren: () => import('./pages/SALE/sale-order-mobile-detail/sale-order-mobile-detail.module').then(m => m.SaleOrderMobileDetailPageModule), canActivate: [AuthGuard] },
  { path: 'sale-order-mobile-viewer/:id', loadChildren: () => import('./pages/SALE/sale-order-mobile-viewer/sale-order-mobile-viewer.module').then(m => m.SaleOrderMobileViewerPageModule), canActivate: [AuthGuard] },

  { path: 'sale-order-note', loadChildren: () => import('./pages/SALE/sale-order-note/sale-order-note.module').then(m => m.SaleOrderNotePageModule), canActivate: [AuthGuard] },
  { path: 'sale-order-note/:id', loadChildren: () => import('./pages/SALE/sale-order-note/sale-order-note.module').then(m => m.SaleOrderNotePageModule), canActivate: [AuthGuard] },


  //FINANCIALS
  { path: 'general-ledger', loadChildren: () => import('./pages/FINANCIAL/general-ledger/general-ledger.module').then(m => m.GeneralLedgerPageModule), canActivate: [AuthGuard] },
  { path: 'general-ledger/:id', loadChildren: () => import('./pages/FINANCIAL/general-ledger-detail/general-ledger-detail.module').then(m => m.GeneralLedgerDetailPageModule), canActivate: [AuthGuard] },
  { path: 'tax-definition', loadChildren: () => import('./pages/FINANCIAL/tax-definition/tax-definition.module').then(m => m.TaxDefinitionPageModule), canActivate: [AuthGuard] },
  { path: 'tax-definition/:id', loadChildren: () => import('./pages/FINANCIAL/tax-definition-detail/tax-definition-detail.module').then(m => m.TaxDefinitionDetailPageModule), canActivate: [AuthGuard] },


  //PURCHASE
  { path: 'purchase-request', loadChildren: () => import('./pages/PURCHASE/purchase-order/purchase-order.module').then(m => m.PurchaseOrderPageModule), canActivate: [AuthGuard] },
  { path: 'purchase-request/:id', loadChildren: () => import('./pages/PURCHASE/purchase-order-detail/purchase-order-detail.module').then(m => m.PurchaseOrderDetailPageModule), canActivate: [AuthGuard] },
  { path: 'purchase-quotation', loadChildren: () => import('./pages/PURCHASE/purchase-order/purchase-order.module').then(m => m.PurchaseOrderPageModule), canActivate: [AuthGuard] },
  { path: 'purchase-quotation/:id', loadChildren: () => import('./pages/PURCHASE/purchase-order-detail/purchase-order-detail.module').then(m => m.PurchaseOrderDetailPageModule), canActivate: [AuthGuard] },
  { path: 'purchase-order', loadChildren: () => import('./pages/PURCHASE/purchase-order/purchase-order.module').then(m => m.PurchaseOrderPageModule), canActivate: [AuthGuard] },
  { path: 'purchase-order/:id', loadChildren: () => import('./pages/PURCHASE/purchase-order-detail/purchase-order-detail.module').then(m => m.PurchaseOrderDetailPageModule), canActivate: [AuthGuard] },
  { path: 'purchase-order-note', loadChildren: () => import('./pages/PURCHASE/purchase-order-note/purchase-order-note.module').then(m => m.PurchaseOrderNotePageModule), canActivate: [AuthGuard] },
  { path: 'purchase-order-note/:id', loadChildren: () => import('./pages/PURCHASE/purchase-order-note/purchase-order-note.module').then(m => m.PurchaseOrderNotePageModule), canActivate: [AuthGuard] },


  //PRODUCTION

  { path: 'bill-of-materials', loadChildren: () => import('./pages/PROD/bill-of-materials/bill-of-materials.module').then(m => m.BillOfMaterialsPageModule), canActivate: [AuthGuard] },
  { path: 'bill-of-materials/:id', loadChildren: () => import('./pages/PROD/bill-of-materials-detail/bill-of-materials-detail.module').then(m => m.BillOfMaterialsDetailPageModule), canActivate: [AuthGuard] },
  { path: 'bill-of-materials/note/:id', loadChildren: () => import('./pages/PROD/bill-of-materials-note/bill-of-materials-note.module').then(m => m.BillOfMaterialsNotePageModule), canActivate: [AuthGuard] },
  { path: 'order-recommendation', loadChildren: () => import('./pages/PROD/order-recommendation/order-recommendation.module').then(m => m.OrderRecommendationPageModule), canActivate: [AuthGuard] },
  { path: 'staff-catering-booking-note', loadChildren: () => import('./pages/PROD/staff-catering-booking-note/staff-catering-booking-note.module').then(m => m.StaffCateringBookingNotePageModule), canActivate: [AuthGuard] },
  { path: 'staff-catering-booking-note/:segment', loadChildren: () => import('./pages/PROD/staff-catering-booking-note/staff-catering-booking-note.module').then(m => m.StaffCateringBookingNotePageModule), canActivate: [AuthGuard] },

  //SHIP
  { path: 'delivery', loadChildren: () => import('./pages/SHIP/delivery/delivery.module').then(m => m.DeliveryPageModule), canActivate: [AuthGuard] },
  { path: 'delivery/:id', loadChildren: () => import('./pages/SHIP/delivery-detail/delivery-detail.module').then(m => m.DeliveryDetailPageModule), canActivate: [AuthGuard] },

  { path: 'delivery-note', loadChildren: () => import('./pages/SHIP/delivery-note/delivery-note.module').then(m => m.DeliveryNotePageModule), canActivate: [AuthGuard] },
  { path: 'delivery-note/:id', loadChildren: () => import('./pages/SHIP/delivery-note/delivery-note.module').then(m => m.DeliveryNotePageModule), canActivate: [AuthGuard] },

  { path: 'delivery-review', loadChildren: () => import('./pages/SHIP/delivery-review/delivery-review.module').then(m => m.DeliveryReviewPageModule), canActivate: [AuthGuard] },
  { path: 'delivery-review/:id', loadChildren: () => import('./pages/SHIP/delivery-review-detail/delivery-review-detail.module').then(m => m.DeliveryReviewDetailPageModule), canActivate: [AuthGuard] },

  { path: 'vehicle', loadChildren: () => import('./pages/SHIP/vehicle/vehicle.module').then(m => m.VehiclePageModule), canActivate: [AuthGuard] },
  { path: 'vehicle/:id', loadChildren: () => import('./pages/SHIP/vehicle-detail/vehicle-detail.module').then(m => m.VehicleDetailPageModule), canActivate: [AuthGuard] },

  { path: 'shipment', loadChildren: () => import('./pages/SHIP/shipment/shipment.module').then(m => m.ShipmentPageModule), canActivate: [AuthGuard] },
  { path: 'shipment/:id', loadChildren: () => import('./pages/SHIP/shipment-detail/shipment-detail.module').then(m => m.ShipmentDetailPageModule), canActivate: [AuthGuard] },





  //WMS
  { path: 'warehouse', loadChildren: () => import('./pages/WMS/warehouse/warehouse.module').then(m => m.WarehousePageModule), canActivate: [AuthGuard] },
  { path: 'warehouse/:segment/:id', loadChildren: () => import('./pages/WMS/warehouse/warehouse.module').then(m => m.WarehousePageModule), canActivate: [AuthGuard] },
  // { path: 'warehouse-transaction', loadChildren: () => import('./pages/WMS/warehouse-transaction/warehouse-transaction.module').then(m => m.WarehouseTransactionPageModule), canActivate: [AuthGuard] },
  // { path: 'item-location', loadChildren: () => import('./pages/WMS/item-location/item-location.module').then(m => m.ItemLocationPageModule), canActivate: [AuthGuard] },
  // { path: 'item-lot-lpn', loadChildren: () => import('./pages/WMS/item-lot-lpn/item-lot-lpn.module').then(m => m.itemLotLPNPageModule), canActivate: [AuthGuard] },
  { path: 'zone', loadChildren: () => import('./pages/WMS/zone/zone.module').then(m => m.ZonePageModule), canActivate: [AuthGuard] },
  { path: 'zone/:id', loadChildren: () => import('./pages/WMS/zone-detail/zone-detail.module').then(m => m.ZoneDetailPageModule), canActivate: [AuthGuard] },
  { path: 'location', loadChildren: () => import('./pages/WMS/location/location.module').then(m => m.LocationPageModule), canActivate: [AuthGuard] },
  { path: 'location/:id', loadChildren: () => import('./pages/WMS/location-detail/location-detail.module').then(m => m.LocationDetailPageModule), canActivate: [AuthGuard] },
  { path: 'item-group', loadChildren: () => import('./pages/WMS/item-group/item-group.module').then(m => m.ItemGroupPageModule), canActivate: [AuthGuard] },
  { path: 'item-group/:id', loadChildren: () => import('./pages/WMS/item-group-detail/item-group-detail.module').then(m => m.ItemGroupDetailPageModule), canActivate: [AuthGuard] },
  { path: 'item', loadChildren: () => import('./pages/WMS/item/item.module').then(m => m.ItemPageModule), canActivate: [AuthGuard] },
  { path: 'item/:id', loadChildren: () => import('./pages/WMS/item-detail/item-detail.module').then(m => m.ItemDetailPageModule), canActivate: [AuthGuard] },
  { path: 'item/uom/:id', loadChildren: () => import('./pages/WMS/item-uom-detail/item-uom-detail.module').then(m => m.ItemUomDetailPageModule), canActivate: [AuthGuard] },
  { path: 'batch-picking', loadChildren: () => import('./pages/WMS/batch-picking/batch-picking.module').then(m => m.BatchPickingPageModule), canActivate: [AuthGuard] },
  { path: 'returned-list', loadChildren: () => import('./pages/WMS/returned-list/returned-list.module').then(m => m.ReturnedLlistPageModule), canActivate: [AuthGuard] },
  { path: 'receipt', loadChildren: () => import('./pages/WMS/receipt/receipt.module').then(m => m.ReceiptPageModule), canActivate: [AuthGuard] },
  { path: 'receipt/:id', loadChildren: () => import('./pages/WMS/receipt-detail/receipt-detail.module').then(m => m.ReceiptDetailPageModule), canActivate: [AuthGuard] },
  { path: 'carton', loadChildren: () => import('./pages/WMS/carton/carton.module').then(m => m.CartonPageModule), canActivate: [AuthGuard] },
  { path: 'carton/:id', loadChildren: () => import('./pages/WMS/carton-detail/carton-detail.module').then(m => m.CartonDetailPageModule), canActivate: [AuthGuard] },
  { path: 'goods-receiving', loadChildren: () => import('./pages/WMS/goods-receiving/goods-receiving.module').then(m => m.GoodsReceivingPageModule), canActivate: [AuthGuard] },
  { path: 'goods-receiving/:id', loadChildren: () => import('./pages/WMS/goods-receiving-detail/goods-receiving-detail.module').then(m => m.GoodReceivingDetailPageModule), canActivate: [AuthGuard] },
  { path: 'lpn-label', loadChildren: () => import('./pages/WMS/lpn-label/lpn-label.module').then(m => m.LPNLabelPageModule), canActivate: [AuthGuard] },
  { path: 'lpn-label/:id', loadChildren: () => import('./pages/WMS/lpn-label/lpn-label.module').then(m => m.LPNLabelPageModule), canActivate: [AuthGuard] },
  { path: 'serial-label', loadChildren: () => import('./pages/WMS/serial-label/serial-label.module').then(m => m.SerialLabelPageModule), canActivate: [AuthGuard] },
  { path: 'item-uom-label', loadChildren: () => import('./pages/WMS/item-uom-label/item-uom-label.module').then(m => m.ItemUomLabelPageModule), canActivate: [AuthGuard] },
  { path: 'pos-table-label', loadChildren: () => import('./pages/WMS/pos-table-label/pos-table-label.module').then(m => m.POSTableLabelPageModule), canActivate: [AuthGuard] },
  


  //OST
  { path: 'branch', loadChildren: () => import('./pages/OST/branch/branch.module').then(m => m.BranchPageModule), canActivate: [AuthGuard] },
  { path: 'branch/:id', loadChildren: () => import('./pages/OST/branch-detail/branch-detail.module').then(m => m.BranchDetailPageModule), canActivate: [AuthGuard] },
  { path: 'office', loadChildren: () => import('./pages/OST/office/office.module').then(m => m.OfficePageModule), canActivate: [AuthGuard] },
  { path: 'office/:id', loadChildren: () => import('./pages/OST/office-detail/office-detail.module').then(m => m.OfficeDetailPageModule), canActivate: [AuthGuard] },


  //HRM
  { path: 'casual-labour-register', loadChildren: () => import('./pages/HRM/casual-labour-register/casual-labour-register.module').then(m => m.CasualLabourRegisterPageModule) },
  { path: 'staff', loadChildren: () => import('./pages/HRM/staff/staff.module').then(m => m.StaffPageModule), canActivate: [AuthGuard] },
  { path: 'staff/:id', loadChildren: () => import('./pages/HRM/staff-detail/staff-detail.module').then(m => m.StaffDetailPageModule), canActivate: [AuthGuard] },
  { path: 'scheduler', loadChildren: () => import('./pages/HRM/scheduler/scheduler.module').then(m => m.SchedulerPageModule), canActivate: [AuthGuard] },
  { path: 'scheduler/:id', loadChildren: () => import('./pages/HRM/scheduler/scheduler.module').then(m => m.SchedulerPageModule), canActivate: [AuthGuard] },
  { path: 'checkin-gate', loadChildren: () => import('./pages/HRM/checkin-gate/checkin-gate.module').then(m => m.CheckinGateDetailPageModule), canActivate: [AuthGuard] },
  { path: 'checkin-gate/:id', loadChildren: () => import('./pages/HRM/checkin-gate/checkin-gate.module').then(m => m.CheckinGateDetailPageModule), canActivate: [AuthGuard] },
  { path: 'checkin-log', loadChildren: () => import('./pages/HRM/checkin-log/checkin-log.module').then(m => m.CheckinLogPageModule), canActivate: [AuthGuard] },
  { path: 'checkin-log/:id', loadChildren: () => import('./pages/HRM/checkin-log/checkin-log.module').then(m => m.CheckinLogPageModule), canActivate: [AuthGuard] },
  { path: 'timesheet-cycle', loadChildren: () => import('./pages/HRM/timesheet-cycle/timesheet-cycle.module').then(m => m.TimesheetCyclePageModule), canActivate: [AuthGuard] },
  { path: 'timesheet-cycle/:id', loadChildren: () => import('./pages/HRM/timesheet-cycle-detail/timesheet-cycle-detail.module').then(m => m.TimesheetCycleDetailPageModule), canActivate: [AuthGuard] },
  { path: 'timesheet-cycle/:id/:idtimesheet', loadChildren: () => import('./pages/HRM/timesheet-cycle-detail/timesheet-cycle-detail.module').then(m => m.TimesheetCycleDetailPageModule), canActivate: [AuthGuard] },
  { path: 'holiday-policy', loadChildren: () => import('./pages/HRM/holiday-policy/holiday-policy.module').then(m => m.HolidayPolicyPageModule), canActivate: [AuthGuard] },
  { path: 'holiday-policy/:id', loadChildren: () => import('./pages/HRM/holiday-policy-detail/holiday-policy-detail.module').then(m => m.HolidayPolicyDetailPageModule), canActivate: [AuthGuard] },
  { path: 'paid-time-off-policy', loadChildren: () => import('./pages/HRM/paid-time-off-policy/paid-time-off-policy.module').then(m => m.PaidTimeOffPolicyPageModule), canActivate: [AuthGuard] },
  { path: 'paid-time-off-policy/:id', loadChildren: () => import('./pages/HRM/paid-time-off-policy-detail/paid-time-off-policy-detail.module').then(m => m.PaidTimeOffPolicyDetailPageModule), canActivate: [AuthGuard] },
  { path: 'overtime-policy', loadChildren: () => import('./pages/HRM/overtime-policy/overtime-policy.module').then(m => m.OvertimePolicyPageModule), canActivate: [AuthGuard] },
  { path: 'overtime-policy/:id', loadChildren: () => import('./pages/HRM/overtime-policy-detail/overtime-policy-detail.module').then(m => m.OvertimePolicyDetailPageModule), canActivate: [AuthGuard] },
  { path: 'ptos-enrollment', loadChildren: () => import('./pages/HRM/ptos-enrollment/ptos-enrollment.module').then(m => m.PTOsEnrollmentPageModule), canActivate: [AuthGuard] },
  { path: 'ptos-enrollment/:id', loadChildren: () => import('./pages/HRM/ptos-enrollment-detail/ptos-enrollment-detail.module').then(m => m.PTOsEnrollmentDetailPageModule), canActivate: [AuthGuard] },
  { path: 'checkin', loadChildren: () => import('./pages/HRM/checkin/checkin.module').then(m => m.CheckinPageModule), canActivate: [AuthGuard] },
  { path: 'personal-scheduler', loadChildren: () => import('./pages/HRM/personal-scheduler/personal-scheduler.module').then(m => m.PersonalSchedulerPageModule), canActivate: [AuthGuard] },
  { path: 'personal-scheduler/:id', loadChildren: () => import('./pages/HRM/personal-scheduler/personal-scheduler.module').then(m => m.PersonalSchedulerPageModule), canActivate: [AuthGuard] },



  //POS
  { path: 'pos-order', loadChildren: () => import('./pages/POS/pos-order/pos-order.module').then(m => m.POSOrderPageModule), canActivate: [AuthGuard] },
  { path: 'pos-order/:id', loadChildren: () => import('./pages/POS/pos-order-detail/pos-order-detail.module').then(m => m.POSOrderDetailPageModule), canActivate: [AuthGuard] },
  { path: 'pos-order/:id/:table', loadChildren: () => import('./pages/POS/pos-order-detail/pos-order-detail.module').then(m => m.POSOrderDetailPageModule), canActivate: [AuthGuard] },
  { path: 'pos-work-order', loadChildren: () => import('./pages/POS/pos-work-order/pos-work-order.module').then(m => m.POSWorkOrderPageModule), canActivate: [AuthGuard] },
  { path: 'pos-terminal', loadChildren: () => import('./pages/POS/pos-terminal/pos-terminal.module').then(m => m.POSTerminalPageModule), canActivate: [AuthGuard] },
  { path: 'pos-terminal/:id', loadChildren: () => import('./pages/POS/pos-terminal-detail/pos-terminal-detail.module').then(m => m.POSTerminalDetailPageModule), canActivate: [AuthGuard] },

  { path: 'pos-kitchen', loadChildren: () => import('./pages/POS/pos-kitchen/pos-kitchen.module').then(m => m.POSKitchenPageModule), canActivate: [AuthGuard] },
  { path: 'pos-kitchen/:id', loadChildren: () => import('./pages/POS/pos-kitchen-detail/pos-kitchen-detail.module').then(m => m.POSKitchenDetailPageModule), canActivate: [AuthGuard] },
  { path: 'pos-memo', loadChildren: () => import('./pages/POS/pos-memo/pos-memo.module').then(m => m.POSMemoPageModule), canActivate: [AuthGuard] },
  { path: 'pos-memo/:id', loadChildren: () => import('./pages/POS/pos-memo-detail/pos-memo-detail.module').then(m => m.POSMemoDetailPageModule), canActivate: [AuthGuard] },
  { path: 'pos-menu', loadChildren: () => import('./pages/POS/pos-menu/pos-menu.module').then(m => m.POSMenuPageModule), canActivate: [AuthGuard] },
  { path: 'pos-menu/:id', loadChildren: () => import('./pages/POS/pos-menu-detail/pos-menu-detail.module').then(m => m.POSMenuDetailPageModule), canActivate: [AuthGuard] },
  { path: 'pos-table', loadChildren: () => import('./pages/POS/pos-table/pos-table.module').then(m => m.POSTablePageModule), canActivate: [AuthGuard] },
  { path: 'pos-table/:id', loadChildren: () => import('./pages/POS/pos-table-detail/pos-table-detail.module').then(m => m.POSTableDetailPageModule), canActivate: [AuthGuard] },

  { path: 'pos-table-group', loadChildren: () => import('./pages/POS/pos-table-group/pos-table-group.module').then(m => m.POSTableGroupPageModule), canActivate: [AuthGuard] },
  { path: 'pos-table-group/:id', loadChildren: () => import('./pages/POS/pos-table-group-detail/pos-table-group-detail.module').then(m => m.POSTableGroupDetailPageModule), canActivate: [AuthGuard] },

  { path: 'pos-welcome/:id', loadChildren: () => import('./pages/POS/pos-for-customer/welcome/pos-welcome.module').then(m => m.POSWelcomePageModule) },
  { path: 'pos-customer-order/:id/:table', loadChildren: () => import('./pages/POS/pos-for-customer/order/pos-customer-order.module').then(m => m.POSCustomerOrderPageModule) },


  // { path: 'pos-table', loadChildren: () => import('./pages/POS/pos-table/pos-table.module').then(m => m.TablePageModule), canActivate: [AuthGuard] },
  // { path: 'pos-menu', loadChildren: () => import('./pages/POS/pos-menu/pos-menu.module').then(m => m.TablePageModule), canActivate: [AuthGuard] },


  //BI
  // { path: 'dashboard', loadChildren: () => import('./pages/BI/dashboard/dashboard.module').then(m => m.DashboardPageModule), canActivate: [AuthGuard] },
  { path: 'staff-dashboard', loadChildren: () => import('./pages/BI/HRM/staff-dashboard/staff-dashboard.module').then(m => m.StaffDashboardPageModule), canActivate: [AuthGuard] },

  // // { path: 'sale-kpi', loadChildren: () => import('./pages/BI').then(m => m), canActivate: [AuthGuard] },
  { path: 'finance-management', loadChildren: () => import('./pages/BI/finance-management/finance-management.module').then(m => m.FinanceManagementPageModule), canActivate: [AuthGuard] },
  { path: 'finance-daily-report', loadChildren: () => import('./pages/BI/finance-daily-report/finance-daily-report.module').then(m => m.FinanceDailyReportPageModule), canActivate: [AuthGuard] },
  { path: 'finance-statements', loadChildren: () => import('./pages/BI/finance-statements/finance-statements.module').then(m => m.FinanceStatementsPageModule), canActivate: [AuthGuard] },
  // { path: 'pipeline', loadChildren: () => import('./pages/BI/pipeline/pipeline.module').then(m => m.PipelinePageModule), canActivate: [AuthGuard] },
  // { path: 'sale-insignts', loadChildren: () => import('./pages/BI/sale-insignts/sale-insignts.module').then(m => m.SaleInsigntsPageModule), canActivate: [AuthGuard] },
  // { path: 'sale-performance', loadChildren: () => import('./pages/BI/sale-performance/sale-performance.module').then(m => m.SalePerformancePageModule), canActivate: [AuthGuard] },
  { path: 'ar-invoice-report', loadChildren: () => import('./pages/BI/ar-invoice-report/ar-invoice-report.module').then(m => m.ARInvoiceReportPageModule), canActivate: [AuthGuard] },
  { path: 'price-report', loadChildren: () => import('./pages/BI/price-report/price-report.module').then(m => m.PriceReportPageModule), canActivate: [AuthGuard] },
  { path: 'price-report/:segment/:id', loadChildren: () => import('./pages/BI/price-report/price-report.module').then(m => m.PriceReportPageModule), canActivate: [AuthGuard] },

  //BI/SALE
  //{ path: 'sale-daily-report', loadChildren: () => import('./pages/BI/SALE/sale-daily-report/sale-daily-report.module').then(m => m.SaleDailyReportPageModule), canActivate: [AuthGuard] },
  { path: 'sales-reports', loadChildren: () => import('./pages/BI/SALE/sales-reports/sales-reports.module').then(m => m.SalesReportsPageModule), canActivate: [AuthGuard] },
  { path: 'sales-reports-mobile', loadChildren: () => import('./pages/BI/SALE/sale-summary-mobile/sale-summary-mobile.module').then(m => m.SaleSummaryMobilePageModule), canActivate: [AuthGuard] },

  //BI/PURCHASE
  { path: 'purchase-reports', loadChildren: () => import('./pages/BI/PURCHASE/purchase-reports/purchase-reports.module').then(m => m.PurchaseReportsPageModule), canActivate: [AuthGuard] },

  //BI/POS
  { path: 'pos-dashboard', loadChildren: () => import('./pages/BI/pos-report/pos-dashboard/pos-dashboard.module').then(m => m.PosDashboardPageModule), canActivate: [AuthGuard] },
  { path: 'pos-shift', loadChildren: () => import('./pages/BI/pos-report/pos-shift/pos-shift.module').then(m => m.PosShiftPageModule), canActivate: [AuthGuard] },
  { path: 'pos-item', loadChildren: () => import('./pages/BI/pos-report/pos-item/pos-item.module').then(m => m.PosItemPageModule), canActivate: [AuthGuard] },
  { path: 'pos-receipt', loadChildren: () => import('./pages/BI/pos-report/pos-receipt/pos-receipt-report.module').then(m => m.POSReceiptReportPageModule), canActivate: [AuthGuard] },
  { path: 'pos-day', loadChildren: () => import('./pages/BI/pos-report/pos-day/pos-day.module').then(m => m.PosDayPageModule), canActivate: [AuthGuard] },
  { path: 'pos-category', loadChildren: () => import('./pages/BI/pos-report/pos-category/pos-category.module').then(m => m.PosCategoryPageModule), canActivate: [AuthGuard] },
  { path: 'pos-revenue', loadChildren: () => import('./pages/BI/pos-report/pos-revenue/pos-revenue.module').then(m => m.PosRevenuePageModule), canActivate: [AuthGuard] },

 



  //ADMIN
  { path: 'form', loadChildren: () => import('./pages/ADMIN/form/form.module').then(m => m.FormPageModule), canActivate: [AuthGuard] },
  { path: 'form/:id', loadChildren: () => import('./pages/ADMIN/form-detail/form-detail.module').then(m => m.FormDetailPageModule), canActivate: [AuthGuard] },
  { path: 'permission', loadChildren: () => import('./pages/ADMIN/permission/permission.module').then(m => m.PermissionPageModule), canActivate: [AuthGuard] },
  { path: 'config', loadChildren: () => import('./pages/ADMIN/config/config.module').then(m => m.ConfigPageModule), canActivate: [AuthGuard] },
  { path: 'config/:segment/:id', loadChildren: () => import('./pages/ADMIN/config/config.module').then(m => m.ConfigPageModule), canActivate: [AuthGuard] },
  { path: 'price-list', loadChildren: () => import('./pages/ADMIN/price-list/price-list.module').then(m => m.PriceListPageModule), canActivate: [AuthGuard] },
  { path: 'price-list/:id', loadChildren: () => import('./pages/ADMIN/price-list-detail/price-list-detail.module').then(m => m.PriceListDetailPageModule), canActivate: [AuthGuard] },

  //SYSTEM
  { path: 'login', loadChildren: () => import('./pages/SYS/login/login.module').then(m => m.LoginPageModule) },
  { path: 'about', loadChildren: () => import('./pages/SYS/about/about.module').then(m => m.AboutPageModule) },
  { path: 'not-found', loadChildren: () => import('./pages/SYS/not-found/not-found.module').then(m => m.NotFoundPageModule), canActivate: [AuthGuard] },
  { path: 'setting', loadChildren: () => import('./pages/SYS/setting/setting.module').then(m => m.SettingPageModule), canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: () => import('./pages/SYS/profile/profile.module').then(m => m.ProfilePageModule), canActivate: [AuthGuard] },
  { path: 'default', loadChildren: () => import('./pages/SYS/default/default.module').then(m => m.DefaultPageModule), canActivate: [AuthGuard] },
  { path: 'system-status', loadChildren: () => import('./pages/SYS/system-status/system-status.module').then(m => m.SystemStatusPageModule), canActivate: [AuthGuard] },
  { path: 'system-status/:id', loadChildren: () => import('./pages/SYS/system-status-detail/system-status-detail.module').then(m => m.SystemStatusDetailPageModule), canActivate: [AuthGuard] },
  { path: 'system-type', loadChildren: () => import('./pages/SYS/system-type/system-type.module').then(m => m.SystemTypePageModule), canActivate: [AuthGuard] },
  { path: 'system-type/:id', loadChildren: () => import('./pages/SYS/system-type-detail/system-type-detail.module').then(m => m.SystemTypeDetailPageModule), canActivate: [AuthGuard] },

  //schema
  { path: 'schema', loadChildren: () => import('./pages/SYS/schema/schema.module').then(m => m.SchemaPageModule), canActivate: [AuthGuard] },
  { path: 'schema/:id', loadChildren: () => import('./pages/SYS/schema-detail/schema-detail.module').then(m => m.SchemaDetailPageModule), canActivate: [AuthGuard] },
 
  // Request
  { path: 'request', loadChildren: () => import('./pages/APPROVAL/request/request.module').then(m => m.RequestPageModule), canActivate: [AuthGuard] },
  { path: 'request/:id', loadChildren: () => import('./pages/APPROVAL/request-detail/request-detail.module').then(m => m.RequestDetailPageModule), canActivate: [AuthGuard] },
  //Auto Approval Rule
  { path: 'approval-rule', loadChildren: () => import('./pages/APPROVAL/approval-rule/approval-rule.module').then(m => m.ApprovalRulePageModule), canActivate: [AuthGuard] },
  { path: 'approval-rule/:id', loadChildren: () => import('./pages/APPROVAL/approval-rule-detail/approval-rule-detail.module').then(m => m.ApprovalRuleDetailPageModule), canActivate: [AuthGuard] },


  // // User Device
  { path: 'user-device', loadChildren: () => import('./pages/HRM/user-device/user-device.module').then(m => m.UserDevicePageModule), canActivate: [AuthGuard] },
  { path: 'user-device/:id', loadChildren: () => import('./pages/HRM/user-device-detail/user-device-detail.module').then(m => m.UserDeviceDetailPageModule), canActivate: [AuthGuard] },

  // // Timesheet
  { path: 'timesheet', loadChildren: () => import('./pages/HRM/timesheet/timesheet.module').then(m => m.TimesheetPageModule), canActivate: [AuthGuard] },
  { path: 'timesheet/:id', loadChildren: () => import('./pages/HRM/timesheet-detail/timesheet-detail.module').then(m => m.TimesheetDetailPageModule), canActivate: [AuthGuard] },

  // // Shift
  { path: 'shift', loadChildren: () => import('./pages/HRM/shift/shift.module').then(m => m.ShiftPageModule), canActivate: [AuthGuard] },
  { path: 'shift/:id', loadChildren: () => import('./pages/HRM/shift-detail/shift-detail.module').then(m => m.ShiftDetailPageModule), canActivate: [AuthGuard] },
  
  //PR
  { path: 'pr-deal', loadChildren: () => import('./pages/PR/pr-deal/pr-deal.module').then( m => m.PRDealPageModule), canActivate: [AuthGuard]},
  { path: 'pr-deal/:id', loadChildren: () => import('./pages/PR/pr-deal-detail/pr-deal-detail.module').then( m => m.PRDealDetailPageModule),canActivate: [AuthGuard]},
  { path: 'pr-program', loadChildren: () => import('./pages/PR/pr-program/pr-program.module').then( m => m.PRProgramPageModule),canActivate: [AuthGuard]},
  { path: 'pr-program/:id', loadChildren: () => import('./pages/PR/pr-program-detail/pr-program-detail.module').then( m => m.PRProgramDetailPageModule),canActivate: [AuthGuard]},
  { path: 'pr-voucher-policy', loadChildren: () => import('./pages/PR/pr-voucher-policy/pr-voucher-policy.module').then( m => m.PRVoucherPolicyPageModule),canActivate: [AuthGuard]},
  { path: 'pr-voucher-policy/:id', loadChildren: () => import('./pages/PR/pr-voucher-policy-detail/pr-voucher-policy-detail.module').then( m => m.PRVoucherPolicyDetailPageModule),canActivate: [AuthGuard]},
  { path: 'pr-discount-policy', loadChildren: () => import('./pages/PR/pr-discount-policy/pr-discount-policy.module').then( m => m.PRDiscountPolicyPageModule),canActivate: [AuthGuard]},
  { path: 'pr-discount-policy/:id', loadChildren: () => import('./pages/PR/pr-discount-policy-detail/pr-discount-policy-detail.module').then( m => m.PRDiscountPolicyDetailPageModule),canActivate: [AuthGuard]},

  {
    path: '',
    redirectTo: 'default',
    pathMatch: 'full'
  },

  { path: '**', redirectTo: '/not-found' },
  



];

let allRoutes = [...BIRoutes,  ...routes ];


@NgModule({
  imports: [
    RouterModule.forRoot(allRoutes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
