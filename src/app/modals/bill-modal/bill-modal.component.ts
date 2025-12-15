import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-bill-modal',
	templateUrl: './bill-modal.component.html',
	styleUrls: ['./bill-modal.component.scss'],
	standalone: false,
})
export class BillModalComponent {
	@ViewChild('billFrame') billFrame: ElementRef;
  constructor(private modalController: ModalController,) {
      }
    

	@Input() billHtml: string = '';
	zoom = 1;

	close() {
		this.modalController.dismiss();
	}

	ngAfterViewInit() {
		const iframe = this.billFrame.nativeElement as HTMLIFrameElement;
		const doc = iframe.contentDocument || iframe.contentWindow.document;

		// inject bill html (from parent)
		doc.open();
		doc.write(`
      <html>
      <head>
          <style>
            	body{font-size:10px} +
					.bold{font-weight: bold}.bill,.sheet{color: #000;font-size: 1rem}.sheet table tr{page-break-inside: avoid}.bill{display: block;overflow: hidden !important}.bill .sheet{box-shadow: none !important}.bill .header,.bill .message,.text-center{text-align: center}.bill .header span{display: inline-block;width: 100%}.bill .header .logo img{max-width: 8.33rem;max-height: 4.17rem}.bill .header .brand,.bill .items .quantity{font-weight: 700}.bill .header .address{font-size: 80%;font-style: italic}.bill .table-info,.bill .table-info-top{border-top: solid;margin: 5px 0;padding: 5px 8px;border-width: 1px 0}.bill .items{margin: 5px 0;padding-left: 8px;padding-right: 8px}.bill .items tr td{border-bottom: 1px dashed #ccc;padding-bottom: 5px}.bill .items .name{font-size: 1rem;width: 100%;padding-top: 5px;padding-bottom: 2px !important;border: none !important}.bill .items tr.subOrder td{border-bottom: none !important}.bill .items tr.subOrder.isLast td{border-bottom: 1px dashed #ccc !important;padding-bottom: 5px}.bill .items tr:last-child td{border: none !important}.bill .items tr.subOrder.isLast:last-child td{border: none !important}.bill .items .total,.text-right{text-align: right}.bill .message{padding-left: 8px;padding-right: 8px}.page-footer-space{margin-top: 10px}.table-info-top td{padding-top: 5px}.sheet{margin: 0;overflow: hidden;position: relative;box-sizing: border-box;page-break-after: always;font-family: "Times New Roman", Times, serif;font-size: 0.72rem;background: #fff}.sheet .page-footer,.sheet .page-footer-space{height: 10mm}.sheet table{page-break-inside: auto;width: 100%;border-collapse: collapse}.sheet table tr{page-break-after: auto}
          </style>
      </head>
      <body>
          ${this.billHtml}
      </body>
      </html>
  `);
		doc.close();
	}
}
