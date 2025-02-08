import { Injectable } from '@angular/core';
import * as qz from 'qz-tray';
import { KJUR, KEYUTIL, stob64, hextorstr } from 'jsrsasign';
import { EnvService } from './core/env.service';
import { SYS_PrinterProvider } from './static/services.service';
import { async, Subscription } from 'rxjs';

export interface printData {
  content: string;
  type: 'html' | 'pdf' | 'image';
  options?: printOptions;
}

export interface printOptions {
  printer?: string;
  jobName?: string;
  tray?: string;
  pages?: string;
  copies?: number;
  paperSize?: string;
  rotation?: number;
  scale?: number;
  duplex?:string ; // [one-sided | duplex | long-edge | tumble | short-edge]
  orientation?:string // [portrait | landscape | reverse-landscape | null],
  cssStyle?:string,
  autoStyle?:Element, // element

}
@Injectable({
  providedIn: 'root',
})
export class PrintingService {
  subscriptions: Subscription[] = [];
  qzConnectionPromise: Promise<boolean> | null = null;
  signingCertificate = false;
  defaultPrinter;
  hostList;
  printers;
  cssStyling = `
  .bill .items .name,.bill .items tr:last-child td{border:none!important}.bill,.bill .title,.sheet{color:#000;font-sized:13px;}.sheet .no-break-page,.sheet .no-break-page *,.sheet table break-guard,.sheet table break-guard *,.sheet table tr{page-break-inside:avoid}.bill{display:block;overflow:hidden!important}.bill .sheet{box-shadow:none!important}.bill .header,.bill .message,.sheet.rpt .cen,.text-center{text-align:center}.bill .header span{display:inline-block;width:100%}.bill .header .logo img{max-width:150px;max-height:75px}.bill .header .bill-no,.bill .header .brand,.bill .items .quantity,.bold,.sheet.rpt .bol{font-weight:700}.bill .header .address{font-size:80%;font-style:italic}.bill .table-info{border:solid;margin:5px 0;padding:5px;border-width:1px 0}.bill .table-info-top{border-top:solid;margin:5px 0;padding:5px;border-width:1px 0}.bill .table-info-bottom{border-bottom:solid;margin:5px 0;padding:5px;border-width:1px 0}.bill .items{margin:5px 0}.bill .items tr td{border-bottom:1px dashed #ccc;padding-bottom:5px}.bill .items .name{width:100%;padding-top:5px;padding-bottom:2px!important}.bill .items .code{font-weight:700;text-transform:uppercase}.bill .items .total,.sheet.rpt .num,.text-right{text-align:right}.bill .header,.bill .items,.bill .message,.bill .table-info,.bill .table-info-bottom,.bill .table-info-top{padding-left:8px;padding-right:8px}.page-footer-space{margin-top:10px}.table-name-bill{font-size:16px}.table-info-top td{padding-top:5px}.table-info-top .small{font-size:smaller!important}.sheet{margin:0;overflow:hidden;position:relative;box-sizing:border-box;page-break-after:always;font-family:'Times New Roman',Times,serif;font-size:13px;background:#fff}.sheet.rpt .top-zone{min-height:940px}.sheet.rpt table,.sheet.rpt tbody table{width:100%;border-collapse:collapse}.sheet.rpt tbody table td{padding:0}.sheet.rpt .rpt-header .ngay-hd{width:100px}.sheet.rpt .rpt-header .title{font-size:18px;font-weight:700;color:#000}.sheet.rpt .rpt-header .head-c1{width:75px}.sheet.rpt .chu-ky,.sheet.rpt .rpt-nvgh-header{margin-top:20px}.sheet.rpt .ds-san-pham{margin:10px 0}.sheet.rpt .ds-san-pham td{padding:2px 5px;border:1px solid #000;white-space:nowrap}.sheet.rpt .ds-san-pham .head{background-color:#f1f1f1;font-weight:700}.sheet.rpt .ds-san-pham .oven{background-color:#f1f1f1}.sheet.rpt .ds-san-pham .ghi-chu{min-width:170px}.sheet.rpt .ds-san-pham .tien{width:200px}.sheet.rpt .thanh-tien .c1{width:95px}.sheet.rpt .chu-ky td{font-weight:700;text-align:center}.sheet.rpt .chu-ky .line2{font-weight:400;height:100px;page-break-inside:avoid}.sheet.rpt .noti{margin-top:-105px}.sheet.rpt .noti td{vertical-align:bottom}.sheet.rpt .noti td .qrc{width:100px;height:100px;border:1px solid;display:block}.sheet.rpt .big{font-size:16px;font-weight:700;color:#b7332b}.sheet .page-footer,.sheet .page-footer-space,.sheet .page-header,.sheet .page-header-space{height:10mm}.sheet table{page-break-inside:auto}.sheet table tr{page-break-after:auto}.float-right{float:right}
  `;
  constructor(
    public env: EnvService,
    public printerService: SYS_PrinterProvider,
  ) {
    this.env.getEvents().subscribe((data) => {
      if (data.Code == 'changeBranch') {
        this.printers = null;
      }
    });
  }
  async print(data: printData) {
    // Lấy máy in theo data/options/printer hoặc máy in mặc định theo chi nhánh hiện tại
    // Signing certificate
    // Convert data/options to QZ Option
    // Tạo QZ config
    // Connect
    // Gửi in
    //Viết hàm connect(Khi in nếu chưa connect thì call),  disconnect(khi user rời khỏi page)
    if (!this.printers) {
      await this.getPrinterInBranch();
    }
    if (!this.printers) {
      this.env.showMessage('Printer not found', 'danger');
      return;
    }
    let printer = null;
    if (data?.options?.printer) {
      printer = this.printers.find((d) => d.Code == data.options.printer);
    } else printer = this.printers.find((d) => d.Name == 'Test'); // todo : default printer
    if (!printer) {
      this.env.showMessage('Printer not found', 'danger');
      return;
    }
    this.ensureCertificate().then(async () => {
      let printingData = this.getPrintingData(data)
      var config = qz.configs.create(printer.Code, printingData.options);
      this.qzConnect(printer.Host, printer.Port, printer.IsSecure).then(() => {
        qz.print(config, printingData.data)
          .then((success) => {})
          .catch( (e) =>{
            console.error(e);
          });
      });
    });
  }

  async getPrinters(host) {
    return new Promise((resolve, reject) => {
      qz.websocket.connect(host).then(async () => {
        qz.printers
          .find()
          .then((result) => {
            //this.printers = result;
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  }

  async getPrinterInBranch() {
    await this.printerService.read().then((data: any) => {
      this.printers = data.data;
    });
  }

  ensureCertificate() {
    return new Promise((resolve, reject) => {
      if (!this.signingCertificate) {
        this.QZsetCertificate().then(async () => {
          await this.QZsignMessage()
            .then(async () => {
              this.signingCertificate = true;
              resolve(true);
            })
            .catch((err) => {
              console.log(err);
              reject(false);
            });
        });
      } else resolve(true);
    });
  }
  
  qzConnect(host, port, isSecure) {
    if (this.qzConnectionPromise) {
      return this.qzConnectionPromise;
    }
  
    // Create a new connection promise
    this.qzConnectionPromise = new Promise((resolve, reject) => {
      if (!qz.websocket.isActive()) {
        let options: any = {};
        if (host) options.host = host;
        if (port) options.port = port;
        if (isSecure) options.isSecure = isSecure;
  
        qz.websocket
          .connect(options)
          .then(() => {
            console.log('QZ new connected!');
            resolve(true);
          })
          .catch((err) => {
            console.log('QZ connect error: ' + err);
            reject(false);
          })
          .finally(() => {
            this.qzConnectionPromise = null; // Reset promise after connection attempt completes
          });
      } else {
        console.log('QZ already connected!');
        resolve(true);
        this.qzConnectionPromise = null; // Reset immediately if already connected
      }
    });
  
    return this.qzConnectionPromise;
  }
  
  qzCloseConnection() {
    qz.websocket.disconnect();
  }

  getPrintingData(data:printData){
    let printingData: any = {};
    let style = '';
    printingData.options = {};
    printingData.data =[ 
      {
        type: 'pixel',
        format: data.type || 'html',
        flavor: data.type == 'pdf' || data.type == 'image' ? 'file' : 'plain', //'file', // or 'plain' if the data is raw HTML
        data: data.content,
      }];
    
    if (data.options) {
      if (data.options.duplex) printingData.options.duplex = data.options.duplex;
      printingData.options.orientation = data.options.orientation || 'null';
      if (data.options.jobName)  printingData.options.jobName = data.options.jobName;
      if (data.options.tray)  printingData.options.printerTray = data.options.tray;
      if (data.options.rotation)  printingData.options.orientation = data.options.rotation;
      if (data.options.copies)  printingData.options.copies = data.options.copies;
      if (data.options.pages)  printingData.options.orientation = data.options.pages;
      if (data.options.paperSize) {
        let paperSize = JSON.parse(data.options.paperSize);
        printingData.options.size = paperSize.size;
        printingData.options.units = paperSize.units;
      
        // size: {width: 2.25, height: 1.25}, units: 'in'
      }
      if(data.options.cssStyle){
        style = data.options.cssStyle;
      }else if(data.options.autoStyle){
        printingData.data[0].data = this.applyAllStyles(data.options.autoStyle)?.outerHTML;

      }else{
        style = this.cssStyling;
      }
      // if(data.options.scale)  convertOptions.orientation = data.options.scale; not found => todo
    }
 
    if ( printingData.data[0].format == 'html') {
      printingData.data[0].data =
        `
        <html>
            <head>
                <style>
             
                ` +
      style+
        `
                </style>
            </head>
            <body>
            ` +
            printingData.data[0].data +
        `
            </body>
        </html>
        `;
    }
    return  printingData;
  }

  async QZsetCertificate() {
    /// Authentication setup ///
    qz.security.setCertificatePromise(function (resolve, reject) {
      resolve(
        '-----BEGIN CERTIFICATE-----\n' +
          'MIIECzCCAvOgAwIBAgIGAZLgwX2hMA0GCSqGSIb3DQEBCwUAMIGiMQswCQYDVQQG\n' +
          'EwJVUzELMAkGA1UECAwCTlkxEjAQBgNVBAcMCUNhbmFzdG90YTEbMBkGA1UECgwS\n' +
          'UVogSW5kdXN0cmllcywgTExDMRswGQYDVQQLDBJRWiBJbmR1c3RyaWVzLCBMTEMx\n' +
          'HDAaBgkqhkiG9w0BCQEWDXN1cHBvcnRAcXouaW8xGjAYBgNVBAMMEVFaIFRyYXkg\n' +
          'RGVtbyBDZXJ0MB4XDTI0MTAzMDA0MDcwOVoXDTQ0MTAzMDA0MDcwOVowgaIxCzAJ\n' +
          'BgNVBAYTAlVTMQswCQYDVQQIDAJOWTESMBAGA1UEBwwJQ2FuYXN0b3RhMRswGQYD\n' +
          'VQQKDBJRWiBJbmR1c3RyaWVzLCBMTEMxGzAZBgNVBAsMElFaIEluZHVzdHJpZXMs\n' +
          'IExMQzEcMBoGCSqGSIb3DQEJARYNc3VwcG9ydEBxei5pbzEaMBgGA1UEAwwRUVog\n' +
          'VHJheSBEZW1vIENlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCf\n' +
          'o93WoqcVVErY13ZthbLIqFWhVc1Ol90lax0ldC7IONqNt0i7r4smjhtOgrBWTQt2\n' +
          'j/3t8jAZ0RLEI69cljn6ml/ImaZvRWkNocLSw225g8L0vIj6EEH5h+U973iPNbrV\n' +
          'X697d3JVRIMA4Q7nUbeDMr2QhWcqMK1rq1CWGFw9SZmbL+L5Dupq9KVSA6YjAwtb\n' +
          'moodQockZzJtvaermiKUXjRfO0LRBffNdWyKzB8mhq8afs20oExgXrpH5w9HEw4c\n' +
          'ECo7f6HzaljL+I/5dXiLPPMdwBSHy9+Jpm1vDxRqG9Nq/UBtr3VQ5x/ku1kyzyvx\n' +
          'ryxYdU3eZi7ZKHiOoNXPAgMBAAGjRTBDMBIGA1UdEwEB/wQIMAYBAf8CAQEwDgYD\n' +
          'VR0PAQH/BAQDAgEGMB0GA1UdDgQWBBRnpyjwCIKdaDatZYJcFxLB4A20FjANBgkq\n' +
          'hkiG9w0BAQsFAAOCAQEAO53gKaYROvQbhZWOjYj3LE7Zcevn54sVnLFHLAeQPx92\n' +
          'bGvjac6oRCGCMNSsQ5UbCmkbmycjRXMLsPfdSJPPHlRv1mW13vLLa3S98lhjJUTX\n' +
          '9OyHvChZ1z1nIuBDSj8VzlFX+bOS0LVZqbXuuTauvk5ykEiS/vg5Z13zu4FCJYON\n' +
          'V82SUZAYz8/40xqZiCOQr5Foo+AidyVY4P6eyDlcCAnHLgYlLpSXVcVdXbe1shKg\n' +
          'hXKbIu3KdvujkSwCJnvn9TFZ+huAJJc6uDuQf7m+/8eKfNYkW5boIUKbwAnw996h\n' +
          'A5rGIO+QGuJBplF8QUH4fiPpGha6IxrRtRKu/B6yag==\n' +
          '-----END CERTIFICATE-----',
      );
    });
  }

  async QZsignMessage() {
    var privateKey =
      '-----BEGIN PRIVATE KEY-----\n' +
      'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCfo93WoqcVVErY\n' +
      '13ZthbLIqFWhVc1Ol90lax0ldC7IONqNt0i7r4smjhtOgrBWTQt2j/3t8jAZ0RLE\n' +
      'I69cljn6ml/ImaZvRWkNocLSw225g8L0vIj6EEH5h+U973iPNbrVX697d3JVRIMA\n' +
      '4Q7nUbeDMr2QhWcqMK1rq1CWGFw9SZmbL+L5Dupq9KVSA6YjAwtbmoodQockZzJt\n' +
      'vaermiKUXjRfO0LRBffNdWyKzB8mhq8afs20oExgXrpH5w9HEw4cECo7f6HzaljL\n' +
      '+I/5dXiLPPMdwBSHy9+Jpm1vDxRqG9Nq/UBtr3VQ5x/ku1kyzyvxryxYdU3eZi7Z\n' +
      'KHiOoNXPAgMBAAECggEAAmLNGH2i2KdDXR1PSFDEvMoDSZ+CK4gKhpoku+ASKOzs\n' +
      'm0yfeiqj/kYGc3RxlUCeiL2bMni5rlEZIjRUVSJrqGqxPsrJGYWkjc8andLM64Zk\n' +
      'HgtJUs92ZPfafcP7/cv0SGcfNM2yuEKHYLZ8ZgmrH/tcqPHNemxy0xai5DNmAYZ3\n' +
      'hJhRhQBl2yYA8YL0j9sIj/CmfcFnC8Wgy4BHpocVzxCYg/YfX+oYZOa47jeQoL0N\n' +
      'DtYsjKBkrM3HXF7R4ViPRERjby1ro4KwUBfAYZMQcyrZSClo1suf6TIAoxGx1dkC\n' +
      '9wKmp9002sHAvOsGNo8czt+Exi3tP55+txog/9YXGQKBgQDbZBBVSRZXmo920gmo\n' +
      'DAkexc1TAjuFYD+Emj/+umawbOKwyzIHBM30oL0Sg2zegwObl1Mw7ISZw+ZYu5a4\n' +
      '4ayhsf3OFk3JMKJHmqDyKM2z251DXPzYNhhtsovPwcJ8GMJpxdARdppCX2YaDoO/\n' +
      'EcOCbxVv9tTu6bCVERc88IgcuQKBgQC6R17Fqj4hw8GMMVWUSgv6tJYWMvgpUPs7\n' +
      'DmhR1GPW/8fwriLCQbT90VhYvOLi/kmAAVh3EU2rPd7rxHVigYMDQ1mocc9+WV5k\n' +
      '4mU2wT/fSLOQID0oqeswzye6RuQTqueCd+5qBzE84nKmRAy0gSPfWocCooV4S62K\n' +
      'umMC6XmSxwKBgQCgIAuPw9VrwSJ+zdRAc/BgJmyy7kk1EsepZ8/XgoMat45JDTWJ\n' +
      'S+dqabs1/PiD+0mx0SPl7Grns8S29MuQSx5tsfSV60+AzV9UNbbMqB1i7aJ9nSvq\n' +
      'Pqlbv1ouG7RwUL3s53TymgcC9JAX6oob9cIlvCAAZT6K1cONOTklwEUH+QKBgQCs\n' +
      '8UgGwijPFjxiWQc4FosKppBVadrGGR42VQj7N/G9kVlilXlF2tUbdTnNoQgQcL9y\n' +
      'bU1hthni6x1EzO+ildU5uVTLM2bNylD93sbTUBVpysiS/atqTl9BwIIEyn5D2D75\n' +
      '/TjHDYhkG2UQAku9ZcwVOKnyA0thRPmIu8Ti1jp9zwKBgDLUpPGvhOYnqpQ5VqJh\n' +
      '6CWSNSoJ4p2TNMR9ETtGZ7J5fJBVb6OMFKRvqboVNqt0h7OjG6MPkbGUlNgb6g07\n' +
      'HFoHMqfYQyft/Erqv1lkMZALAxj8a3oDI0vqUoz9chdQkSZuNeYnLBbnJW0FYADa\n' +
      'EN2TjSni2ClcvmKHWJDQOc79\n' +
      '-----END PRIVATE KEY-----';

    qz.security.setSignatureAlgorithm('SHA512'); // Since 2.1
    qz.security.setSignaturePromise(function (toSign) {
      return function (resolve, reject) {
        try {
          var pk = KEYUTIL.getKey(privateKey);
          var sig = new KJUR.crypto.Signature({
            alg: 'SHA512withRSA',
          }); // Use "SHA1withRSA" for QZ Tray 2.0 and older
          sig.init(pk);
          sig.updateString(toSign);
          var hex = sig.sign();
          // console.log("DEBUG: \n\n" + stob64(hextorstr(hex)));
          resolve(stob64(hextorstr(hex)));
        } catch (err) {
          console.error(err);
          reject('false');
        }
      };
    });
  }

 // apply all style of element and nested to themseleve
    applyAllStyles(element) {
      // Clone the original element deeply
      let clonedElement = element.cloneNode(true);

      // Apply styles to the cloned element based on the original
      this.applyStyles(clonedElement, element);

      return clonedElement;
  }

  applyStyles(clonedEl, originalElement) {
      // Get computed styles for the current original element
      let computedStyles = getComputedStyle(originalElement);

      // Apply each computed style as inline to the cloned element
      for (let property of Array.from(computedStyles)) {
          clonedEl.style.setProperty(property, computedStyles.getPropertyValue(property));
      }

      // Recursively apply styles for all children
      for (let i = 0; i < originalElement.children.length; i++) {
          let child = originalElement.children[i];
          let childClone = clonedEl.children[i];
          this.applyStyles(childClone, child);
      }
  }
}
