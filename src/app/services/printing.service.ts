import { Injectable } from '@angular/core';
import * as qz from 'qz-tray';
import { KJUR, KEYUTIL, stob64, hextorstr } from 'jsrsasign';
import { EnvService } from './core/env.service';
import { SYS_ConfigProvider, SYS_PrinterProvider } from './static/services.service';
import { Observable, from, of, concatMap } from 'rxjs';

export interface printData {
	content: string;
	type: 'html' | 'pdf' | 'image';
	options?: printOptions[];
	IDJob? : string;
}

export interface printOptions {
	printer?: string;
	host?: string;
	port?: string;
	isSecure?: boolean;
	jobName?: string;
	tray?: string;
	pages?: string;
	copies?: number;
	paperSize?: string;
	rotation?: number;
	scale?: number;
	duplex?: string; // [one-sided | duplex | long-edge | tumble | short-edge]
	orientation?: string; // [portrait | landscape | reverse-landscape | null],
	cssStyle?: string;
	autoStyle?: Element; // element
}
@Injectable({
	providedIn: 'root',
})

/*
BT các form sẽ lấy máy in từ cấu hình chung thì hàm in chỉ cần truyền vào nội dung cần in, tức là máy in null ko cần truyền
Nếu muốn chọn máy in thì truyền mảng máy in vô (Object bao gồm host,port,code,isSecure) 
Nếu mảng máy in rỗng thì lấy cấu hình mặc định
*/
export class PrintingService {
	qzConnectionPromise: Promise<boolean> | null = null;
	signingCertificate = false;
	printingServerConfig; //{ PrintingHost: '', PrintingPort: 0, PrintingIsSecure: true, DefaultPrinter:code };

	defaultPrinter;
	hostList;
	cssStyling = `
  .bill .items .name,.bill .items tr:last-child td{border:none!important}.bill,.bill .title,.sheet{color:#000;font-sized:13px;}.sheet .no-break-page,.sheet .no-break-page *,.sheet table break-guard,.sheet table break-guard *,.sheet table tr{page-break-inside:avoid}.bill{display:block;overflow:hidden!important}.bill .sheet{box-shadow:none!important}.bill .header,.bill .message,.sheet.rpt .cen,.text-center{text-align:center}.bill .header span{display:inline-block;width:100%}.bill .header .logo img{max-width:150px;max-height:75px}.bill .header .bill-no,.bill .header .brand,.bill .items .quantity,.bold,.sheet.rpt .bol{font-weight:700}.bill .header .address{font-size:80%;font-style:italic}.bill .table-info{border:solid;margin:5px 0;padding:5px;border-width:1px 0}.bill .table-info-top{border-top:solid;margin:5px 0;padding:5px;border-width:1px 0}.bill .table-info-bottom{border-bottom:solid;margin:5px 0;padding:5px;border-width:1px 0}.bill .items{margin:5px 0}.bill .items tr td{border-bottom:1px dashed #ccc;padding-bottom:5px}.bill .items .name{width:100%;padding-top:5px;padding-bottom:2px!important}.bill .items .code{font-weight:700;text-transform:uppercase}.bill .items .total,.sheet.rpt .num,.text-right{text-align:right}.bill .header,.bill .items,.bill .message,.bill .table-info,.bill .table-info-bottom,.bill .table-info-top{padding-left:8px;padding-right:8px}.page-footer-space{margin-top:10px}.table-name-bill{font-size:16px}.table-info-top td{padding-top:5px}.table-info-top .small{font-size:smaller!important}.sheet{margin:0;overflow:hidden;position:relative;box-sizing:border-box;page-break-after:always;font-family:'Times New Roman',Times,serif;font-size:13px;background:#fff}.sheet.rpt .top-zone{min-height:940px}.sheet.rpt table,.sheet.rpt tbody table{width:100%;border-collapse:collapse}.sheet.rpt tbody table td{padding:0}.sheet.rpt .rpt-header .ngay-hd{width:100px}.sheet.rpt .rpt-header .title{font-size:18px;font-weight:700;color:#000}.sheet.rpt .rpt-header .head-c1{width:75px}.sheet.rpt .chu-ky,.sheet.rpt .rpt-nvgh-header{margin-top:20px}.sheet.rpt .ds-san-pham{margin:10px 0}.sheet.rpt .ds-san-pham td{padding:2px 5px;border:1px solid #000;white-space:nowrap}.sheet.rpt .ds-san-pham .head{background-color:#f1f1f1;font-weight:700}.sheet.rpt .ds-san-pham .oven{background-color:#f1f1f1}.sheet.rpt .ds-san-pham .ghi-chu{min-width:170px}.sheet.rpt .ds-san-pham .tien{width:200px}.sheet.rpt .thanh-tien .c1{width:95px}.sheet.rpt .chu-ky td{font-weight:700;text-align:center}.sheet.rpt .chu-ky .line2{font-weight:400;height:100px;page-break-inside:avoid}.sheet.rpt .noti{margin-top:-105px}.sheet.rpt .noti td{vertical-align:bottom}.sheet.rpt .noti td .qrc{width:100px;height:100px;border:1px solid;display:block}.sheet.rpt .big{font-size:16px;font-weight:700;color:#b7332b}.sheet .page-footer,.sheet .page-footer-space,.sheet .page-header,.sheet .page-header-space{height:10mm}.sheet table{page-break-inside:auto}.sheet table tr{page-break-after:auto}.float-right{float:right}
  `;
	constructor(
		public env: EnvService,
		public printerService: SYS_PrinterProvider,
		public sysConfigProvider: SYS_ConfigProvider
	) {
		this.env.getEvents().subscribe(async (data) => {
			if (data.Code == 'changeBranch') {
				await this.endConnection();
				this.getConfig(this.env.selectedBranch).then((rs: any) => {
					this.printingServerConfig = rs;
					if (this.printingServerConfig) {
						this.startConnection(this.printingServerConfig.PrintingHost, this.printingServerConfig.PrintingPort, this.printingServerConfig.PrintingIsSecure);
					}
				});
			}
		});

		this.initQZ();
		this.getConfig(this.env.selectedBranch).then((rs: any) => {
			this.printingServerConfig = rs;
			if (this.printingServerConfig) {
				this.startConnection(this.printingServerConfig.PrintingHost, this.printingServerConfig.PrintingPort, this.printingServerConfig.PrintingIsSecure);
			}
		});
	}
	initQZ() {
		qz.security.setCertificatePromise((resolve, reject) => {
			resolve(
				'-----BEGIN CERTIFICATE-----\n' +
					'MIIC8zCCAdugAwIBAgIUP/OJvGgwxvsSeXNXVqyWbbPLi6owDQYJKoZIhvcNAQEL\n' +
					'BQAwIjEgMB4GA1UEAwwXRVJQIFNpZ25pbmcgQ2VydGlmaWNhdGUwHhcNMjUwNzE1\n' +
					'MTA1NDIzWhcNMzUwNzEzMTA1NDIzWjAiMSAwHgYDVQQDDBdFUlAgU2lnbmluZyBD\n' +
					'ZXJ0aWZpY2F0ZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAPS8NFvc\n' +
					'zoQzMa71FOc2+QIanebQJi6qWZhX8QRN0ivh6e4UdYOxPYFiPUCaA99674ynnowl\n' +
					'KCQDGYpBf0OuVpBpddXmpDnLO/My/tviwNjFs78RPKf6eEUaEM6FsbxlWvFS7uf0\n' +
					'vM2wstigAR06sGwNIde28/8pCcE5DUOv28HZoUIHeqkpr4KdZgb18lExs/0NrloU\n' +
					'aR5hLiFmHXOjcHLzMioiwViqS19gaCOMLK+J4iDGlu0hD1L6Hha6Wq2wkxZpOISk\n' +
					'L77uVmDNcSxci/8Bs2rvQCtU27QJqAsEJXii5nBhHa+miaUURqHRFu53pUmeYWDY\n' +
					'T5MTKafURp8es58CAwEAAaMhMB8wHQYDVR0OBBYEFNr9Fxz2/Q1qDb5bBOehrnvT\n' +
					'EetHMA0GCSqGSIb3DQEBCwUAA4IBAQDnW7wGi20g22WArY9hJhiAnrCZfIFiZFPs\n' +
					'A63q6A3VQ6vv4pAhnVyj2kK/oaGlGcpV+0lgRRtuQiRfOkeGPXFX7PmaWQEI3m1E\n' +
					'8F82RumUbzgqF94bM1kJhVAqBPavderrEc/ny0oS14/u0dGSTOnrQvr8A6YZ8szE\n' +
					'X90yaCDVSSQLJXCEQITvTY/hJFr8R0Z0oCXuRt0UD+hQwQ+KV4HzjG83DPSmODGo\n' +
					'NoDwugnwAGhJIuCM/jQap5KN5TThmhd1m2G7hUnenLHNfUpG92Y7TW96WAPaq/Oj\n' +
					'BANOivO9jHQnPDuLCXNRzzT6i0MBC3iRP7PRLXpW1YlBW7Nl2N+I\n' +
					'-----END CERTIFICATE-----'
			);
		});

		qz.security.setSignatureAlgorithm('SHA512'); // Since 2.1

		var privateKey =
			'-----BEGIN PRIVATE KEY-----\n' +
			'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQD0vDRb3M6EMzGu\n' +
			'9RTnNvkCGp3m0CYuqlmYV/EETdIr4enuFHWDsT2BYj1AmgPfeu+Mp56MJSgkAxmK\n' +
			'QX9DrlaQaXXV5qQ5yzvzMv7b4sDYxbO/ETyn+nhFGhDOhbG8ZVrxUu7n9LzNsLLY\n' +
			'oAEdOrBsDSHXtvP/KQnBOQ1Dr9vB2aFCB3qpKa+CnWYG9fJRMbP9Da5aFGkeYS4h\n' +
			'Zh1zo3By8zIqIsFYqktfYGgjjCyvieIgxpbtIQ9S+h4WulqtsJMWaTiEpC++7lZg\n' +
			'zXEsXIv/AbNq70ArVNu0CagLBCV4ouZwYR2vpomlFEah0Rbud6VJnmFg2E+TEymn\n' +
			'1EafHrOfAgMBAAECggEAZeRzsilgy/aagVqlbMxc6OzW//F6bCRdcAlxHZce4UlK\n' +
			'AWcANCeXUWZq1RoqcaF32aox3uxbZX7q4754M2ACx1Y5Cqjfh/ZfC9aX+ElUfAv3\n' +
			'1Z1iERe9ehurkqhkAul57w5VzDn/X23pUDpxrE8yg5IGHI8d0AaweoN7y8oMZwyZ\n' +
			'3b4er8trfhgy4y11RRk3GEncO7KrO1+TCV0A1H/8F8zFkId9MW/knbAfMZEX7xOf\n' +
			'o6BkLUsQHvq9zwqeXwXlIWRnmFbg8sFfSfI3Vc+6B67O/16QpS9+SUwjAPle/udp\n' +
			'7ScksxKiFFF51KvhRvqFWSYE3R/ymJ3F8tZ065K4PQKBgQD+B8t2LAzDTRLfpT1f\n' +
			'pDw8v+KX9ud/ZCT8m35AiAbFZZUgGJEIq1gGlR8fMcz0aWbOLUUyqmJyrFLe5MqH\n' +
			'hvJ0GozjpYFEq0ZFgn3ouAlTcDGk6mBDOwCvRsC1COc4lFhkwV5E43itxx13tGSq\n' +
			'ZpRCZPyp+RCR4CQecYJQHBWogwKBgQD2ofXViAAG/GuH3+n8NPbj24NqqcJawClv\n' +
			'N39oh07O+p0S5Wk66IqdCyxle8HqzsGmf/xlJBOM6W2gq2aAgs3AHfI2Czu7T3TD\n' +
			'YcU1IVMAfrRylzFUUXeETtN9YIEoDcVa3llF5ukqRT0rVQGsRUanAb3PwEQnDny5\n' +
			'kkDVSywFtQKBgDsrU5/d2Mcwz6GaGnaJiaJYy4276+YHTHouObUMOg+GfrqwHjAX\n' +
			'wPQfjdU1Q1j2qASEFOcdOrsdGlxijC4PJ7AVcxWfOkHlZwPPxkYLf9iYfGe+U9e1\n' +
			'CY7J+x7vyPOr0f7971g6Z6SKiXmVYhEyvXvNi/CHW+2ueJtCsyi3se/DAoGAKBYS\n' +
			'+u3r8za7043VXiTNrCNVrNSCvnVVRrpifv7fFE0vko6vF+AMB5J1WNlQn3WTjBhp\n' +
			'UZcXhmO6ac7yDhk0j/FOGPKidsNnWwpdH1GXSBFQCwAACJBlOKAHR+2TkIsMdMSH\n' +
			'BhGN/EzcsFpUt0dbQHHMBCRf72kvZIoc944MTbECgYBs9LyoN+VHXGviw+SlE2v3\n' +
			'NSikirIAP+NBxFV4QZEsM4iywerBTHNG0UIkmWp7ppmUGBRh/uS4gFrQawi/yfsh\n' +
			'0P1c2SetPmdHEk6jWSE0kEcXYM1Ec5bBJLsQPndHIJ2yeBx99pstuXB4qxyDYvv+\n' +
			'AcItCtueRAb6jUeK+qLnJA==\n' +
			'-----END PRIVATE KEY-----';

		qz.security.setSignatureAlgorithm('SHA512'); // Since 2.1
		qz.security.setSignaturePromise(function (toSign) {
			return function (resolve, reject) {
				try {
					var pk = KEYUTIL.getKey(privateKey);
					var sig = new KJUR.crypto.Signature({ alg: 'SHA512withRSA' }); // Use "SHA1withRSA" for QZ Tray 2.0 and older
					sig.init(pk);
					sig.updateString(toSign);
					var hex = sig.sign();
					console.log('DEBUG: \n\n' + stob64(hextorstr(hex)));
					resolve(stob64(hextorstr(hex)));
				} catch (err) {
					console.error(err);
					reject('false');
				}
			};
		});
	}
	getConfig(IDBranch = null) {
		let sysConfigQuery = ['PrintingHost', 'PrintingPort', 'PrintingIsSecure', 'DefaultPrinter'];
		this.printingServerConfig = null;
		return new Promise((resolve, reject) => {
			this.sysConfigProvider
				.read({
					Code_in: sysConfigQuery,
					IDBranch: IDBranch ?? this.env.selectedBranch,
				})
				.then((values: any) => {
					if (values?.data?.length > 0) {
						let configResult: any = {};
						values['data'].forEach((e) => {
							if ((e.Value == null || e.Value == 'null') && e._InheritedConfig) {
								e.Value = e._InheritedConfig.Value;
							}
							configResult[e.Code] = JSON.parse(e.Value);
						});
						resolve(configResult);
					} else resolve(null);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
	getPrintersFromPrintingServer(IDBranch = null) {
		return new Promise((resolve, reject) => {
			this.getConfig(IDBranch)
				.then((rs: any) => {
					if (rs) {
						this.startConnection(rs.PrintingHost, rs.PrintingPort, rs.PrintingIsSecure).then(async () => {
							qz.printers
								.find()
								.then((result) => {
									//this.printers = result;
									resolve({ printers: result, config: rs });
								})
								.catch((err) => {
									reject(err);
								});
						});
					}
				})
				.catch((err) => {
					reject(err);
					this.env.showMessage('Cannot connect to printing server!', 'danger');
				});
		});
	}

	async startConnection(host, port, isSecure) {
		return new Promise(async (resolve, reject) => {
			let options: any = {};
			if (host) options.host = host;
			if (port) options.port = port;
			if (isSecure != null) options.isSecure = isSecure;
			// Connect to a print-server instance, if specified
			if (qz.websocket.isActive() && host != qz?.websocket?.getConnectionInfo()?.host) await this.endConnection();
			if (!qz.websocket.isActive()) {
				let that = this;
				qz.websocket
					.connect(options)
					.then(() => {
						resolve(true);
						that.updateState(true);
					})
					.catch((err) => {
						reject(err);
						this.handleConnectionError(err);
					});
			} else {
				resolve(true);
			}
		});
	}

	async endConnection() {
		if (qz.websocket.isActive()) {
			let that = this;
			await qz.websocket
				.disconnect()
				.then(() => {
					that.updateState(false);
				})
				.catch((err) => this.handleConnectionError(err));
		}
	}

	printJobsWithProgress(jobs: printData[]): Observable<{ job: printData; result: any }> {
		return from(jobs).pipe(
			concatMap((job) => this.runJob(job)) // Chạy từng job nối tiếp nhau
		);
	}

	private runJob(data: printData): Observable<{ job: printData; result: any }> {
		return new Observable((observer) => {
			if (!data?.options?.length) {
				if (!this.printingServerConfig) {
					observer.error('Printer not found!');
					return;
				}
				data.options = [
					{
						printer: this.printingServerConfig.DefaultPrinter,
						host: this.printingServerConfig.PrintingHost,
						port: this.printingServerConfig.PrintingPort,
						isSecure: this.printingServerConfig.IsSecure ?? true,
					},
				];
			}

			const serverList = data.options.reduce((acc: any[], rs) => {
				const existing = acc.find((x) => x.host === rs.host && x.port === rs.port);
				if (existing) {
					existing.printerOptions.push(rs);
				} else {
					acc.push({ host: rs.host, port: rs.port, isSecure: rs.isSecure, printerOptions: [rs] });
				}
				return acc;
			}, []);

			this.printJobs(serverList, data).subscribe({
				next: (result) => observer.next({ job: data, result }),
				complete: () => observer.complete(),
				error: (err) => observer.error(err),
			});
		});
	}

	print(jobs: printData[]) {
		return new Promise(async (resolve, reject) => {
			// Lấy máy in theo data/options/printer hoặc máy in mặc định theo chi nhánh hiện tại
			// Signing certificate
			// Convert data/options to QZ Option
			// Tạo QZ config
			// Connect
			// Gửi in
			//Viết hàm connect(Khi in nếu chưa connect thì call),  disconnect(khi user rời khỏi page)
			console.log(jobs);
			let allResults = [];
			jobs.forEach(async (data) => {
				if (data?.options?.length > 0) {
				} else {
					if (!this.printingServerConfig) {
						await this.getConfig();
					}
					if (!this.printingServerConfig || !this.printingServerConfig.PrintingHost || !this.printingServerConfig.DefaultPrinter) {
						reject('Printer not found!');
						this.env.showMessage('Printer not found', 'danger');
						return;
					}
					data?.options?.push({
						printer: this.printingServerConfig.DefaultPrinter,
						host: this.printingServerConfig.PrintingHost,
						port: this.printingServerConfig.PrintingPort,
						isSecure: this.printingServerConfig.IsSecure || true,
					});
				}
				const serverList = data?.options?.reduce((acc: any[], rs) => {
					const existing = acc.find((x) => x.host === rs.host && x.port === rs.port);

					if (existing) {
						existing.printerOptions.push(rs);
					} else {
						acc.push({
							host: rs.host,
							port: rs.port,
							isSecure: rs.isSecure,
							printerOptions: [rs],
						});
					}

					return acc;
				}, []);
				this.printJobs(serverList, data).subscribe({
					next: (result) => {
						console.log('Job done:', result);
						// Có thể show thông báo từng máy in xong
					},
					complete: () => {
						console.log('Tất cả job đã xong');
					},
				});
				await this.printAllServers(serverList, data, allResults);
			});
			resolve(allResults);
		});
	}

	printJobs(serverList, data) {
		return new Observable((observer) => {
			(async () => {
				for (const s of serverList) {
					await this.startConnection(s.host, s.port, s.isSecure);

					for (const p of s.printerOptions) {
						let printingData = this.getPrintingData(p, data);
						let config = qz.configs.create(p.printer, p);

						try {
							await qz.print(config, printingData.data);
							observer.next({
								host: s.host,
								printer: p.printer,
								status: 'success',
							});
						} catch (err) {
							observer.next({
								host: s.host,
								printer: p.printer,
								status: 'error',
								error: err,
							});
						}
					}
				}

				observer.complete(); // báo là đã in hết
			})();
		});
	}

	async printAllServers(serverList, data, allResults) {
		for (const s of serverList) {
			await this.startConnection(s.host, s.port, s.isSecure);

			for (const p of s.printerOptions) {
				let printingData = this.getPrintingData(p, data);
				let config = qz.configs.create(p.printer, p);

				try {
					await qz.print(config, printingData.data);
					allResults.push({ host: s.host, printer: p.printer, status: 'success' });
				} catch (err) {
					allResults.push({ host: s.host, printer: p.printer, status: 'error', error: err });
				}
			}
		}

		return allResults;
	}

	getPrintingData(option: printOptions, printData: printData) {
		let printingData: any = {};
		let style = '';
		printingData.options = {};
		printingData.data = [
			{
				type: 'pixel',
				format: printData.type || 'html',
				flavor: printData.type == 'pdf' || printData.type == 'image' ? 'file' : 'plain', //'file', // or 'plain' if the data is raw HTML
				data: printData.content,
			},
		];

		if (option) {
			if (option.duplex) printingData.options.duplex = option.duplex;
			printingData.options.orientation = option.orientation || 'null';
			if (option.jobName) printingData.options.jobName = option.jobName;
			if (option.tray) printingData.options.printerTray = option.tray;
			if (option.rotation) printingData.options.orientation = option.rotation;
			if (option.copies) printingData.options.copies = option.copies;
			if (option.pages) printingData.options.orientation = option.pages;
			if (option.paperSize) {
				let paperSize = JSON.parse(option.paperSize);
				printingData.options.size = paperSize.size;
				printingData.options.units = paperSize.units;

				// size: {width: 2.25, height: 1.25}, units: 'in'
			}
			if (option.cssStyle) {
				style = option.cssStyle;
			} else {
				style = this.cssStyling;
			}
			// if(data.options.scale)  convertOptions.orientation = data.options.scale; not found => todo
		}

		if (printingData.data[0].format == 'html') {
			printingData.data[0].data =
				`
        <html>
            <head>
                <style>
             
                ` +
				style +
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
		return printingData;
	}

	/// Connection ///
	updateState(isShow) {
		this.env.showBarMessage('printingServcerConnected', 'print-sharp', 'dark', isShow);
	}
	handleConnectionError(err) {
		this.updateState(false);

		if (err.target != undefined) {
			if (err.target.readyState >= 2) {
				//if CLOSING or CLOSED
				this.env.showMessage('Connection to QZ Tray was closed', 'danger');
			} else {
				this.env.showMessage('A connection error occurred, check log for details', 'danger');
				console.error(err);
			}
		} else {
			this.env.showMessage('QZ connection error! ', 'danger');
			console.error(err);
		}
	}
}
