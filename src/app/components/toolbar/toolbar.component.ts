import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EnvService } from 'src/app/services/core/env.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  @ViewChild('importfile') importfile: any;

  @Input() pageTitle;
  @Input() selectedTitle;
  @Input() pageConfig;
  @Input() selectedItems;
  @Input() query;
  @Input() ShowAdd = true;
  @Input() ShowSearch = true;
  @Input() ShowRefresh = true;
  @Input() ShowArchive = true;
  @Input() ShowExport = true;
  @Input() ShowImport = true;
  @Input() ShowHelp = true;
  @Input() ShowFeature = true;
  @Input() NoBorder = false;
  @Input() page;
  @Input() title;
  @Input() BackHref;

  constructor(
    public translate: TranslateService,
    public env: EnvService,
  ) {
    this.env.getEvents().subscribe((data) => {
      if (data.Code == 'app:closePopListToolBar') {
        this.toolBarPopover.dismiss();
        this.isToolBarPopoverOpen = false;
      }
    });
  }

  ngOnInit() {
    if(this.page?.pageConfig && !this.pageConfig){
      this.pageConfig = this.page.pageConfig
    }
    // this.pageConfig.isMainPageActive = true;
    if (this.pageConfig.pageTitle)
      this.translate.get(this.pageConfig.pageTitle).subscribe((text: string) => {
        this.pageTitle = text;
        window.document.title = text;
      });
      console.log(this.pageConfig)
  
  }

  onClickImport() {
    this.importfile.nativeElement.value = '';
    this.importfile.nativeElement.click();
  }

  importFileChange(event) {
    this.page.import(event);
  }

  showSubmit = true;
  showApprove = true;
  showDisapprove = true;
  showCancel = true;
  showDelete = true;
  showSplit = true;
  showMerge = true;

  ngOnChanges(changes: SimpleChanges) {
    console.log('check');
    if (this.pageConfig?.pageName == 'sale-order') {
      this.showSubmit = true;
      this.showApprove = true;
      this.showDisapprove = true;
      this.showCancel = true;
      this.showDelete = true;

      this.selectedItems.forEach((i) => {
        // 101	new	Mới
        // 102	unapproved	Không duyệt
        // 103	submitted	Chờ duyệt
        // 104	approved	Đã duyệt
        // 105	scheduled	Đã giao việc
        // 106	picking	Đang lấy hàng - đóng gói
        // 107	in-carrier	Đã giao đơn vị vận chuyển
        // 108	in-delivery	Đang giao hàng
        // 109	delivered	Đã giao hàng
        // 110	pending	Chờ xử lý
        // 111	split	Đơn đã chia
        // 112	merged	Đơn đã gộp
        // 113	debt	Còn nợ
        // 114	done	Đã xong
        // 115	cancelled	Đã hủy

        // [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115];

        let notShowSubmitOrdersForApproval = [103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115];
        if (notShowSubmitOrdersForApproval.indexOf(i._Status.IDStatus) > -1) {
          this.showSubmit = false;
        }

        let notShowApproveOrders = [101, 102, 104, 105, 106, 107, 108, 109, 111, 112, 113, 114, 115];
        if (notShowApproveOrders.indexOf(i._Status.IDStatus) > -1) {
          this.showApprove = false;
        }

        let notShowDisapproveOrders = [101, 102, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115];
        if (notShowDisapproveOrders.indexOf(i._Status.IDStatus) > -1) {
          this.showDisapprove = false;
        }

        let notShowCancelOrders = [104, 105, 106, 107, 108, 109, 111, 112, 113, 114, 115];
        if (notShowCancelOrders.indexOf(i._Status.IDStatus) > -1) {
          this.showCancel = false;
        }

        let notShowDelete = [103, 104, 105, 106, 107, 108, 109, 111, 112, 113, 114];
        if (notShowDelete.indexOf(i._Status.IDStatus) > -1) {
          this.showDelete = false;
        }

        // let notShowSplit = [104, 105, 106, 107, 108, 109, 111, 112, 113, 114, 115];
        // if (notShowSplit.indexOf(i.Status) > -1) {
        // 	this.showSplit = false;
        // }

        // let notShowMerge = [104, 105, 106, 107, 108, 109, 111, 112, 113, 114, 115];
        // if (notShowMerge.indexOf(i.Status) > -1) {
        // 	this.showMerge = false;
        // }
      });
    }

    if (this.pageConfig?.pageName == 'purchase-order') {
      this.showSubmit = true;
      this.showApprove = true;
      this.showDisapprove = true;
      this.showCancel = true;
      this.showSubmit = true;
      this.showDelete = true;

      this.selectedItems.forEach((i) => {
        // Draft	Nháp
        // Unapproved	Không duyệt
        // Submitted	Chờ duyệt
        // Approved	Đã duyệt
        // Ordered	Đã đặt mua

        // PORequestQuotation	Chờ báo giá
        // Confirmed	NCC đã xác nhận
        // Shipping	Đang vận chuyển
        // PartiallyReceived	Đã nhận một phần
        // Received	Đã nhận hàng
        // Cancelled	Đã Hủy

        //['Draft', 'Unapproved', 'Ordered', 'Submitted', 'Approved', 'PORequestQuotation', 'Confirmed', 'Shipping', 'PartiallyReceived', 'Received', 'Cancelled'];

        let notShowSubmitOrdersForApproval = [
          'Ordered',
          'Submitted',
          'Approved',
          'PORequestQuotation',
          'Confirmed',
          'Shipping',
          'PartiallyReceived',
          'Received',
          'Cancelled',
        ];
        if (notShowSubmitOrdersForApproval.indexOf(i.Status) > -1) {
          this.showSubmit = false;
        }

        let notShowApproveOrders = [
          'Draft',
          'Unapproved',
          'Ordered',
          'Approved',
          'PORequestQuotation',
          'Confirmed',
          'Shipping',
          'PartiallyReceived',
          'Received',
          'Cancelled',
        ];
        if (notShowApproveOrders.indexOf(i.Status) > -1) {
          this.showApprove = false;
        }

        let notShowDisapproveOrders = [
          'Draft',
          'Unapproved',
          'Ordered',
          'PORequestQuotation',
          'Confirmed',
          'Shipping',
          'PartiallyReceived',
          'Received',
          'Cancelled',
        ];
        if (notShowDisapproveOrders.indexOf(i.Status) > -1) {
          this.showDisapprove = false;
        }

        let notShowCancelOrders = [
          'Ordered',
          'Approved',
          'PORequestQuotation',
          'Confirmed',
          'Shipping',
          'PartiallyReceived',
          'Received',
          'Cancelled',
        ];
        if (notShowCancelOrders.indexOf(i.Status) > -1) {
          this.showCancel = false;
        }

        let notShowSubmitOrders = [
          'Draft',
          'Unapproved',
          'Ordered',
          'Submitted',
          'PORequestQuotation',
          'Confirmed',
          'Shipping',
          'PartiallyReceived',
          'Received',
          'Cancelled',
        ];
        if (notShowSubmitOrders.indexOf(i.Status) > -1) {
          this.showSubmit = false;
        }

        let notShowDelete = [
          'Ordered',
          'Approved',
          'PORequestQuotation',
          'Confirmed',
          'Shipping',
          'PartiallyReceived',
          'Received',
        ];
        if (notShowDelete.indexOf(i.Status) > -1) {
          this.showDelete = false;
        }
      });
    }

    if (this.pageConfig?.pageName == 'arinvoice') {
      this.showSubmit = true;
      this.showApprove = true;
      this.showDisapprove = true;
      this.showCancel = true;
      this.showSubmit = true;

      this.showMerge = true;
      this.showSplit = true;
      this.showDelete = true;

      this.selectedItems.forEach((i) => {
        // ARInvoiceNew	Mới
        // ARInvoiceDraft	Nháp
        // ARInvoiceRejected	Không duyệt
        // ARInvoicePending	Chờ duyệt
        // ARInvoiceApproved	Đã duyệt
        // ARInvoiceCanceled	Đã Hủy

        // EInvoiceNew	Đã tạo HĐĐT
        // EInvoiceRelease	Đã phát hành HĐĐT
        // EInvoiceCancel	Đã hủy HĐĐT
        //, 'ARInvoiceNew', 'ARInvoiceDraft', 'ARInvoiceCanceled', '', 'ARInvoiceRejected', 'ARInvoicePending', 'ARInvoiceSplited', 'ARInvoiceMerged'

        let notShowSubmitARsForApproval = [
          'ARInvoicePending',
          'ARInvoiceApproved',
          'ARInvoiceCanceled',
          'EInvoiceNew',
          'EInvoiceRelease',
          'EInvoiceCancel',
          'EInvoiceEmpty',
          'ARInvoiceSplited',
          'ARInvoiceMerged',
        ];
        if (notShowSubmitARsForApproval.indexOf(i.Status) > -1) {
          this.showSubmit = false;
        }

        let notShowApproveARs = [
          'ARInvoiceApproved',
          'ARInvoiceRejected',
          'ARInvoiceCanceled',
          'EInvoiceEmpty',
          'EInvoiceNew',
          'EInvoiceRelease',
          'EInvoiceCancel',
          'ARInvoiceSplited',
          'ARInvoiceMerged',
        ];
        if (notShowApproveARs.indexOf(i.Status) > -1) {
          this.showApprove = false;
        }

        let notShowDisapproveARs = [
          'EInvoiceNew',
          'EInvoiceRelease',
          'EInvoiceCancel',
          'EInvoiceEmpty',
          'ARInvoiceNew',
          'ARInvoiceDraft',
          'ARInvoiceCanceled',
          'ARInvoiceRejected',
          'ARInvoiceRejected',
        ];
        if (notShowDisapproveARs.indexOf(i.Status) > -1) {
          this.showDisapprove = false;
        }

        let notShowCancelARs = ['ARInvoiceCanceled'];
        if (notShowCancelARs.indexOf(i.Status) > -1) {
          this.showCancel = false;
        }

        let notShowSubmitARs = [
          'ARInvoiceApproved',
          'ARInvoiceCanceled',
          'EInvoiceNew',
          'EInvoiceRelease',
          'EInvoiceCancel',
          'EInvoiceEmpty',
        ];
        if (notShowSubmitARs.indexOf(i.Status) > -1) {
          this.showSubmit = false;
        }

        let notShowDelete = ['EInvoiceNew', 'EInvoiceRelease', 'EInvoiceCancel', 'ARInvoiceApproved'];
        if (notShowDelete.indexOf(i.Status) > -1) {
          this.showDelete = false;
        }

        let notShowSplit = [
          'EInvoiceNew',
          'EInvoiceRelease',
          'EInvoiceCancel',
          'EInvoiceEmpty',
          'ARInvoiceCanceled',
          'ARInvoiceSplited',
          'ARInvoiceMerged',
        ];
        if (notShowSplit.indexOf(i.Status) > -1) {
          this.showSplit = false;
        }

        let notShowMerge = [
          'EInvoiceRelease',
          'EInvoiceNew',
          'EInvoiceCancel',
          'EInvoiceEmpty',
          'ARInvoiceCanceled',
          'ARInvoiceSplited',
          'ARInvoiceMerged',
        ];
        if (notShowMerge.indexOf(i.Status) > -1) {
          this.showMerge = false;
        }
      });
    }

    if (
      this.pageConfig?.pageName == 'business-partner' ||
      this.pageConfig?.pageName == 'outlet' ||
      this.pageConfig?.pageName == 'contact-mobile'
    ) {
      this.showSubmit = true;
      this.showApprove = true;
      this.showDisapprove = true;
      this.showCancel = true;

      //this.showCancel = false
      this.showDelete = true;

      this.selectedItems.forEach((i) => {
        // ['New', 'Unapproved', 'Submitted', 'Approved', 'Cancelled'];
        // if (['New', 'Unapproved', 'Submitted', 'Approved', 'Cancelled'].indexOf(i.Status) > -1) this.showCancelOrders = false;

        if (['Submitted', 'Approved', 'Cancelled'].indexOf(i.Status) > -1) this.showSubmit = false;
        if (['New', 'Unapproved', 'Approved', 'Cancelled'].indexOf(i.Status) > -1) this.showApprove = false;
        if (['New', 'Unapproved', 'Cancelled'].indexOf(i.Status) > -1) this.showDisapprove = false;
        if (['Submitted', 'Approved', 'Cancelled'].indexOf(i.Status) > -1) this.showDelete = false;
      });
    }

    if (this.pageConfig?.pageName == 'request') {
      this.showApprove = false;
      this.showDisapprove = false;
      this.showCancel = true;
      this.showDelete = false;
      this.showSubmit = true;
      this.selectedItems.forEach((i) => {
        // Draft	Nháp
        // Unapproved	Không duyệt
        // Submitted	Chờ duyệt
        // Approved	Đã duyệt
        // Ordered	Đã đặt mua

        // PORequestQuotation	Chờ báo giá
        // Confirmed	NCC đã xác nhận
        // Shipping	Đang vận chuyển
        // PartiallyReceived	Đã nhận một phần
        // Received	Đã nhận hàng
        // Cancelled	Đã Hủy

        //['Draft', 'Unapproved', 'Ordered', 'Submitted', 'Approved', 'PORequestQuotation', 'Confirmed', 'Shipping', 'PartiallyReceived', 'Received', 'Cancelled'];

        let notShowSubmitOrdersForApproval = ['Pending', 'Approved', 'InProgress', 'Forward', 'Denied', 'Cancelled'];
        if (notShowSubmitOrdersForApproval.indexOf(i.Status) > -1 || !i.canSubmit) {
          this.showSubmit = false;
        }
        // let notShowDisapproveOrders = ['Draft', 'Unapproved','Cancelled'];
        // if (notShowDisapproveOrders.indexOf(i.Status) > -1) {
        // 	this.showDisapproveOrders = false;
        // }

        let notShowCancelOrders = ['Cancelled', 'Draft'];
        if (notShowCancelOrders.indexOf(i.Status) > -1) {
          this.showCancel = false;
        }
      });
    }
  }

  ngOnDestroy(): void {
    // Perform cleanup operations here
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  toggleFeature() {
    if (this.page) {
      this.page.toggleFeature();
    } else {
      this.pageConfig.isShowFeature = !this.pageConfig.isShowFeature;
    }
  }

  deleteItem() {
    if (this.page?.item && this.page.item?.Id) {
      this.page.delete();
    } else {
      this.page.deleteItems();
    }
  }

  @ViewChild('toolBarPopover') toolBarPopover;
  isToolBarPopoverOpen = false;
  presentToolBarPopover(e: Event) {
    this.toolBarPopover.event = e;
    this.isToolBarPopoverOpen = true;
  }
}
