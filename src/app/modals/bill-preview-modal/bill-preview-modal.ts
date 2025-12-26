import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-bill-preview',
  templateUrl: './bill-preview-modal.html',
  styleUrls: ['./bill-preview-modal.scss'],
  standalone: false,
})
export class BillPreviewComponent implements AfterViewInit {
  @ViewChild('billIframe', { static: false }) billIframe: ElementRef<HTMLIFrameElement>;
  
  @Input() billHtml: string = '';
  @Input() cssStyle: string = '';
  @Input() title: string = 'Bill Preview';
  @Input() qrCodeHtml: string = '';

  constructor(private modalController: ModalController) {}

  ngAfterViewInit() {
    this.loadBillToIframe();
  }

private loadBillToIframe() {
  setTimeout(() => {
    const iframe = this.billIframe?.nativeElement;
    if (!iframe) return;

    const doc = iframe.contentDocument!;
    doc.open();
    doc.write(`
      <html>
        <head>
          <style>
            html, body {
              margin: 0;
              padding: 0;
            }
            ${this.cssStyle}
          </style>
        </head>
        <body>${this.billHtml}</body>
      </html>
    `);
    doc.close();

    // 🔥 AUTO RESIZE IFRAME → ion-content sẽ scroll
    setTimeout(() => {
      iframe.style.height = doc.body.scrollHeight + 'px';
    }, 50);
  });
}

  close() {
    this.modalController.dismiss();
  }
}