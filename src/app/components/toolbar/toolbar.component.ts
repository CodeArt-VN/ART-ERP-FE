import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EnvService } from 'src/app/services/core/env.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @ViewChild('importfile') importfile: any;

  @Input() NoBorder = false;

  @Input() page;


  @Input() pageConfig; //remove this line

  
  @Input() BackHref;
  @Input() pageTitle;
  @Input() selectedTitle;
  @Input() selectedItems; //remove this line

  @Input() query: any = {}; //remove this line


  @Input() CenterTitle;

  @Input() ShowAdd = true;
  @Input() ShowSearch = true;
  @Input() ShowRefresh = true;

  @Input() ShowExport = true;
  @Input() ShowImport = true;

  @Input() ShowCopy = true;
  @Input() ShowChangeBranch = true;

  @Input() ShowSubmit = true;
  @Input() ShowApprove = true;
  @Input() ShowDisapprove = true;

  @Input() ShowMerge = true;
  @Input() ShowSplit = true;

  @Input() ShowCancel = true;
  @Input() ShowArchive = true;
  @Input() ShowDelete = true;


  @Input() ShowHelp = true;
  @Input() ShowFeature = false;













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
    if (this.page.pageConfig?.pageTitle)
      this.translate.get(this.page.pageConfig.pageTitle).subscribe((text: string) => {
        this.pageTitle = text;
        window.document.title = text;
      });
  }



  ngOnChanges(changes: SimpleChanges) {
    if (this.page.pageConfig?.pageName == 'sale-order') {
      this.ShowSubmit = true;
      this.ShowApprove = true;
      this.ShowDisapprove = true;
      this.ShowCancel = true;
      this.ShowDelete = true;

      this.page.selectedItems.forEach((i) => {
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
          this.ShowSubmit = false;
        }

        let notShowApproveOrders = [101, 102, 104, 105, 106, 107, 108, 109, 111, 112, 113, 114, 115];
        if (notShowApproveOrders.indexOf(i._Status.IDStatus) > -1) {
          this.ShowApprove = false;
        }

        let notShowDisapproveOrders = [101, 102, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115];
        if (notShowDisapproveOrders.indexOf(i._Status.IDStatus) > -1) {
          this.ShowDisapprove = false;
        }

        let notShowCancelOrders = [104, 105, 106, 107, 108, 109, 111, 112, 113, 114, 115];
        if (notShowCancelOrders.indexOf(i._Status.IDStatus) > -1) {
          this.ShowCancel = false;
        }

        let notShowDelete = [103, 104, 105, 106, 107, 108, 109, 111, 112, 113, 114];
        if (notShowDelete.indexOf(i._Status.IDStatus) > -1) {
          this.ShowDelete = false;
        }

        // let notShowSplit = [104, 105, 106, 107, 108, 109, 111, 112, 113, 114, 115];
        // if (notShowSplit.indexOf(i.Status) > -1) {
        // 	this.ShowSplit = false;
        // }

        // let notShowMerge = [104, 105, 106, 107, 108, 109, 111, 112, 113, 114, 115];
        // if (notShowMerge.indexOf(i.Status) > -1) {
        // 	this.ShowMerge = false;
        // }
      });
    }

    if (this.page.pageConfig?.pageName == 'purchase-order') {
      this.ShowSubmit = true;
      this.ShowApprove = true;
      this.ShowDisapprove = true;
      this.ShowCancel = true;
      this.ShowSubmit = true;
      this.ShowDelete = true;

      this.page.selectedItems.forEach((i) => {
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
          this.ShowSubmit = false;
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
          this.ShowApprove = false;
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
          this.ShowDisapprove = false;
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
          this.ShowCancel = false;
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
          this.ShowSubmit = false;
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
          this.ShowDelete = false;
        }
      });
    }

    if (this.page.pageConfig?.pageName == 'arinvoice') {
      this.ShowSubmit = true;
      this.ShowApprove = true;
      this.ShowDisapprove = true;
      this.ShowCancel = true;
      this.ShowSubmit = true;

      this.ShowMerge = true;
      this.ShowSplit = true;
      this.ShowDelete = true;

      this.page.selectedItems.forEach((i) => {
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
          this.ShowSubmit = false;
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
          this.ShowApprove = false;
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
          this.ShowDisapprove = false;
        }

        let notShowCancelARs = ['ARInvoiceCanceled'];
        if (notShowCancelARs.indexOf(i.Status) > -1) {
          this.ShowCancel = false;
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
          this.ShowSubmit = false;
        }

        let notShowDelete = ['EInvoiceNew', 'EInvoiceRelease', 'EInvoiceCancel', 'ARInvoiceApproved'];
        if (notShowDelete.indexOf(i.Status) > -1) {
          this.ShowDelete = false;
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
          this.ShowSplit = false;
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
          this.ShowMerge = false;
        }
      });
    }

    if (
      this.page.pageConfig?.pageName == 'business-partner' ||
      this.page.pageConfig?.pageName == 'outlet' ||
      this.page.pageConfig?.pageName == 'contact-mobile'
    ) {
      this.ShowSubmit = true;
      this.ShowApprove = true;
      this.ShowDisapprove = true;
      this.ShowCancel = true;

      //this.ShowCancel = false
      this.ShowDelete = true;

      this.page.selectedItems.forEach((i) => {
        // ['New', 'Unapproved', 'Submitted', 'Approved', 'Cancelled'];
        // if (['New', 'Unapproved', 'Submitted', 'Approved', 'Cancelled'].indexOf(i.Status) > -1) this.showCancelOrders = false;

        if (['Submitted', 'Approved', 'Cancelled'].indexOf(i.Status) > -1) this.ShowSubmit = false;
        if (['New', 'Unapproved', 'Approved', 'Cancelled'].indexOf(i.Status) > -1) this.ShowApprove = false;
        if (['New', 'Unapproved', 'Cancelled'].indexOf(i.Status) > -1) this.ShowDisapprove = false;
        if (['Submitted', 'Approved', 'Cancelled'].indexOf(i.Status) > -1) this.ShowDelete = false;
      });
    }

    if (this.page.pageConfig?.pageName == 'request') {
      this.ShowApprove = false;
      this.ShowDisapprove = false;
      this.ShowCancel = true;
      this.ShowDelete = false;
      this.ShowSubmit = true;
      this.page.selectedItems.forEach((i) => {
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
          this.ShowSubmit = false;
        }
        // let notShowDisapproveOrders = ['Draft', 'Unapproved','Cancelled'];
        // if (notShowDisapproveOrders.indexOf(i.Status) > -1) {
        // 	this.showDisapproveOrders = false;
        // }

        let notShowCancelOrders = ['Cancelled', 'Draft'];
        if (notShowCancelOrders.indexOf(i.Status) > -1) {
          this.ShowCancel = false;
        }
      });
    }
  }

  toggleFeature() {
    if (this.page) {
      this.page.toggleFeature();
    } else {
      this.page.pageConfig.isShowFeature = !this.page.pageConfig.isShowFeature;
    }
  }

  deleteItem() {
    if (this.page?.item?.Id) {
      this.page.delete();
    } else {
      this.page.deleteItems();
    }
  }

  onClickImport() {
    this.importfile.nativeElement.value = '';
    this.importfile.nativeElement.click();
  }

  importFileChange(event) {
    this.page.import(event);
  }
  

  @ViewChild('toolBarPopover') toolBarPopover;
  isToolBarPopoverOpen = false;
  presentToolBarPopover(e: Event) {
    this.toolBarPopover.event = e;
    this.isToolBarPopoverOpen = true;
  }
}
