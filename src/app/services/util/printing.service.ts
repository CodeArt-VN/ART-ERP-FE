import { Injectable } from '@angular/core';
import * as qz from 'qz-tray';
import { KJUR, KEYUTIL, stob64, hextorstr } from 'jsrsasign';
import { EnvService } from '../core/env.service';
import { SYS_ConfigProvider, SYS_PrinterProvider } from '../static/services.service';
import { Observable, from, of, concatMap, forkJoin, Subject } from 'rxjs';
import { SYS_ConfigService } from '../custom/system-config.service';
import { EVENT_TYPE } from '../static/event-type';

export interface printData {
	content: string;
	type: 'html' | 'pdf' | 'image';
	options?: printOptions[];
	IDJob?: string;
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
Forms will use printers from common configuration, so printing function only needs content input, printer options can be null
If you want to select specific printers, pass printer array (Object includes host, port, code, isSecure) 
If printer array is empty, use default configuration
*/
export class PrintingService {
	public tracking = new Subject<any>();
	isReady = false;
	printingServerConfig; //{ PrintingHost: '', PrintingPort: 0, PrintingIsSecure: true, DefaultPrinter:code };

	constructor(
		public env: EnvService,
		public printerService: SYS_PrinterProvider,
		public sysConfigService: SYS_ConfigService
	) {
		this.env.getEvents().subscribe(async (data) => {
			if (data.Code == EVENT_TYPE.TENANT.BRANCH_SWITCHED) {
				this.getConfig().then(() => {
					this.startConnection();
				});
			}
		});

		this.initQZ();
		this.getConfig().then(() => {
			this.startConnection();
		});
	}

	/**
	 * Get available printers for specified branch
	 * @param branchId Branch ID (null for current branch)
	 * @returns Promise resolving to object containing printers array and config
	 */
	getAvailablePrinters(branchId = null) {
		return new Promise((resolve, reject) => {
			this.getConfig(branchId)
				.then(() => {
					this.startConnection().then(async () => {
						qz.printers
							.find()
							.then((result) => {
								resolve({ printers: result, config: this.printingServerConfig });
							})
							.catch((err) => {
								reject(err);
							});
					});
				})
				.catch((err) => {
					reject(err);
					this.env.showMessage('Cannot connect to printing server!', 'danger');
				});
		});
	}

	/**
	 * Optimized print method - groups jobs by server and printer for efficient processing
	 * @param jobs Array of print jobs to execute
	 * @returns Promise with all print results
	 */
	async print(jobs: printData[]): Promise<any[]> {
		console.log('Processing print jobs:', jobs.length);
		console.log('Current printingServerConfig:', this.printingServerConfig);
		let allResults = [];

		try {
			// Validate and complete job options
			const failedValidation = await this.validateAndCompleteJobOptions(jobs);
			
			if (failedValidation.length > 0) {
				allResults.push(...failedValidation);
				// Remove failed jobs from processing - fix the filter logic
				const failedJobIds = failedValidation.map(f => f.jobId);
				
				jobs = jobs.filter(job => {
					const jobId = job.IDJob || 'unknown';
					const shouldKeep = !failedJobIds.includes(jobId);
					return shouldKeep;
				});
			}
			
			// If all jobs failed validation, return early
			if (jobs.length === 0) {
				return allResults;
			}

			// Group jobs by server (host + port combination)
			const serverGroups = new Map<string, Map<string, any>>();
			
			jobs.forEach(job => {
				job.options.forEach(option => {
					const serverKey = `${option.host}:${option.port}`;
					
					if (!serverGroups.has(serverKey)) {
						serverGroups.set(serverKey, new Map());
					}
					
					const serverGroup = serverGroups.get(serverKey);
					const printerKey = option.printer;
					
					if (!serverGroup.has(printerKey)) {
						serverGroup.set(printerKey, {
							printerConfig: {
								printer: option.printer,
								host: option.host,
								port: option.port,
								isSecure: option.isSecure,
								jobName: option.jobName,
								copies: option.copies,
								duplex: option.duplex,
								orientation: option.orientation,
								paperSize: option.paperSize,
								cssStyle: option.cssStyle,
							},
							contents: [],
						});
					}

					serverGroup.get(printerKey).contents.push(job);
				});
			});

			// Execute print jobs grouped by server and printer
			const serverPromises = [];
			
			for (const [serverKey, printerGroups] of serverGroups) {
				console.log(`Processing server: ${serverKey} with ${printerGroups.size} printers`);
				
				// Process all printers in this server sequentially to avoid conflicts
				const serverPromise = (async () => {
					let serverResults = [];
					
					for (const [printerKey, printerData] of printerGroups) {
						console.log(`Processing printer: ${printerKey} with ${printerData.contents.length} jobs`);
						
						try {
							const printerResults = await this.executePrintJob(
								printerData.printerConfig,
								printerData.contents
							);
							serverResults.push(...printerResults);
							
						} catch (printerError) {
							// If executePrintJob rejects, printerError contains failed results
							if (Array.isArray(printerError)) {
								serverResults.push(...printerError);
							} else {
								serverResults.push({
									printer: printerKey,
									server: serverKey,
									status: 'error',
									error: printerError.message || printerError
								});
							}
						}
					}
					
					return serverResults;
				})();
				
				serverPromises.push(serverPromise);
			}

			// Wait for all servers to complete (parallel execution)
			// Using Promise.all with individual try-catch for compatibility
			const serverResults = await Promise.all(
				serverPromises.map(promise => 
					promise.then(value => ({ status: 'fulfilled', value }))
						   .catch(reason => ({ status: 'rejected', reason }))
				)
			);
			
			// Collect all results
			serverResults.forEach(result => {
				if (result.status === 'fulfilled') {
					allResults.push(...result.value);
				} else {
					allResults.push({
						status: 'error',
						error: `Server processing failed: ${result.reason}`
					});
				}
			});

			console.log(`Print job completed. Success: ${allResults.filter(r => r.status === 'success').length}, Failed: ${allResults.filter(r => r.status === 'error').length}`);
			
			return allResults;

		} catch (error) {
			console.error('Print2 execution failed:', error);
			allResults.push({
				status: 'error',
				error: `Print execution failed: ${error.message || error}`
			});
			return allResults;
		}
	}
	
	/**
	 * Validate and fill missing printer options for jobs using default configuration
	 * @param jobs Array of print jobs to validate and complete
	 * @returns Array of results for jobs that failed validation
	 */
	private async validateAndCompleteJobOptions(jobs: printData[]): Promise<any[]> {
		const failedJobs = [];
		
		// Ensure we have config loaded
		if (!this.printingServerConfig) {
			await this.getConfig();
		}
		
		if (!this.printingServerConfig || !this.printingServerConfig.PrintingHost) {
			// All jobs will fail if no host configured
			return jobs.map(job => ({
				jobId: job.IDJob || 'unknown',
				status: 'error',
				error: 'Printing host not configured'
			}));
		}

		for (const job of jobs) {
			try {
				// Check if job has options array
				if (!job.options || job.options.length === 0) {
					// No options at all, check if we have default printer
					if (!this.printingServerConfig.DefaultPrinter) {
						// No default printer and no job-specific printer - this job fails
						failedJobs.push({
							jobId: job.IDJob || 'unknown',
							status: 'error',
							error: 'No printer specified and no default printer configured'
						});
						continue; // Skip to next job
					}
					
					// Use default configuration
					job.options = [{
						printer: this.printingServerConfig.DefaultPrinter,
						host: this.printingServerConfig.PrintingHost,
						port: this.printingServerConfig.PrintingPort,
						isSecure: this.printingServerConfig.IsSecure || true,
					}];
				} else {
					// Job has options, but check each option for missing host/printer
					let hasValidOption = false;
					
					for (let i = 0; i < job.options.length; i++) {
						const option = job.options[i];
						
						// Check and fill missing host
						if (!option.host || option.host.trim() === '') {
							option.host = this.printingServerConfig.PrintingHost;
						}
						
						// Check and fill missing printer
						if (!option.printer || option.printer.trim() === '') {
							if (this.printingServerConfig.DefaultPrinter) {
								option.printer = this.printingServerConfig.DefaultPrinter;
							} else {
								continue; // Skip this option
							}
						}
						
						// Check and fill missing port
						if (!option.port) {
							option.port = this.printingServerConfig.PrintingPort;
						}
						
						// Check and fill missing isSecure
						if (option.isSecure === undefined || option.isSecure === null) {
							option.isSecure = this.printingServerConfig.IsSecure || true;
						}
						
						// If we reach here, this option is valid
						if (option.host && option.printer) {
							hasValidOption = true;
						}
					}
					
					// Remove invalid options
					job.options = job.options.filter(option => option.host && option.printer);
					
					// If no valid options remain, job fails
					if (!hasValidOption || job.options.length === 0) {
						failedJobs.push({
							jobId: job.IDJob || 'unknown',
							status: 'error',
							error: 'No valid printer options available'
						});
						continue; // Skip to next job
					}
				}
				
			} catch (error) {
				// If individual job fails validation, add to failed list
				failedJobs.push({
					jobId: job.IDJob || 'unknown',
					status: 'error',
					error: `Job validation failed: ${error.message || error}`
				});
			}
		}
		
		return failedJobs;
	}

	/**
	 * Format and optimize print data for QZ Tray consumption
	 * @param option Printer options and configurations
	 * @param printData Raw print data to format
	 * @returns Formatted printing data ready for QZ Tray
	 */
	private formatDataForPrinting(option: printOptions, printData: printData) {
		let printingData: any = {};
		let style = '';
		printingData.options = {};
		let cleanContent = printData.content;

		if ((printData.type || 'html') === 'html') {
			cleanContent = this.optimizeHTMLForPrinting(printData.content);
		}

		printingData.data = [
			{
				type: 'pixel',
				format: printData.type || 'html',
				flavor: printData.type == 'pdf' || printData.type == 'image' ? 'file' : 'plain', //'file', // or 'plain' if the data is raw HTML
				data: cleanContent,
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

			style = this.getOptimizedCSS('thermal');
			if (option.cssStyle) {
				style = option.cssStyle;
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
	
	/**
	 * Optimize HTML content for printing by removing Angular artifacts and unnecessary content
	 * @param htmlContent Raw HTML content from Angular components
	 * @returns Cleaned and optimized HTML for printing
	 */
	private optimizeHTMLForPrinting(htmlContent: string): string {
		let cleaned = htmlContent
			// Remove Angular attributes phổ biến nhất
			.replace(/_ngcontent-[^\s>]*/g, '')
			.replace(/ng-reflect-ng-if="[^"]*"/g, '')
			.replace(/ng-reflect-ng-for-of="[^"]*"/g, '')
			.replace(/ng-reflect-app-translate-resource="[^"]*"/g, '')

			// Remove Angular comments
			.replace(/<!--bindings=\{[^}]*\}-->/g, '')
			.replace(/<!--ng-container-->/g, '')

			// Replace [object Object] trong text content
			.replace(/\[object Object\]/g, '')

			// Clean specific inline styles
			.replace(/style="overflow:\s*auto;\s*width:\s*72mm;\s*display:\s*block\s*!\s*important;"/g, 'style="width:72mm"')
			.replace(/style="overflow:\s*auto;"/g, '')

			// Minimal whitespace cleanup
			.replace(/\s{3,}/g, ' ') // Only remove excessive whitespace
			.trim();

		console.log('Reduction:', Math.round((1 - cleaned.length / htmlContent.length) * 100) + '%');

		return cleaned;
	}

	/**
	 * Get optimized CSS styles for different printer types
	 * @param printerType Type of printer ('thermal' for receipt printers, 'regular' for standard printers)
	 * @returns Minified CSS string optimized for the specified printer type
	 */
	private getOptimizedCSS(printerType: 'thermal' | 'regular'): string {
		if (printerType === 'thermal')
			return `:root{--font-size: 10px}body{font-family: "Times New Roman", Times, serif !important;color: #000 !important;margin: 0;padding: 0;box-sizing: border-box;width: 72mm;padding: 5px;background: #fff;-webkit-print-color-adjust: exact;font-size: var(--font-size)}.bill{display: block;overflow: hidden !important;color: #000}.bill .sheet{box-shadow: none !important;font-size: calc(var(--font-size) * 1.3)}.bill .title{color: #000;font-size: calc(var(--font-size) * 1.3)}.bill .header{text-align: center}.bill .header span{display: inline-block;width: 100%}.bill .header .logo img{max-width: 150px;max-height: 75px}.bill .header .brand,.bill .header .bill-no{font-weight: bold}.bill .header .address{font-size: 80%;font-style: italic}.bill .table-info{border: solid;margin: 5px 0;padding: 5px;border-width: 1px 0}.bill .table-info table{width: 100%;border-collapse: collapse}.bill .table-info-top{border-top: solid;margin: 5px 0;padding: 5px;border-width: 1px 0}.bill .table-info-top table{width: 100%;border-collapse: collapse}.bill .items{margin: 5px 0}.bill .items table{width: 100%;border-collapse: collapse}.bill .items tr td{border-bottom: 1px dashed #ccc;padding-bottom: 5px}.bill .items tr:last-child td{border: none !important}.bill .items .name{font-size: calc(var(--font-size) * 1.3);width: 100%;padding-top: 5px;padding-bottom: 2px !important;border: none !important}.bill .items .code{font-weight: bold;text-transform: uppercase}.bill .items .quantity{font-weight: bold}.bill .items .total{text-align: right}.bill .message{text-align: center}.bill .header,.bill .table-info,.bill .table-info-top,.bill .items,.bill .message{padding-left: 8px;padding-right: 8px}.sheet{font-family: "Times New Roman", Times, serif !important;margin: 0;overflow: hidden;position: relative;box-sizing: border-box;page-break-after: always;font-size: 13px;background: #fff}.sheet.rpt table{width: 100%;border-collapse: collapse}.page-header-space,.page-footer-space{height: 10mm}.bold{font-weight: 700}.text-right{text-align: right}.small{font-size:smaller!important;}@media print{body{margin: 0 !important;padding: 5px !important}.bill{overflow: visible !important}}`
		else return '';
	}

	/**
	 * Execute print job for a single printer with multiple documents
	 * @param printerConfig Single printer configuration (host, port, printer code)
	 * @param printContents Array of content to print on this printer
	 * @returns Promise with print results
	 */
	private async executePrintJob(printerConfig: any, printContents: printData[]): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				// Connect to the specific server for this printer
				await this.startConnection(printerConfig.host, printerConfig.port, printerConfig.isSecure);

				let results = [];
				
				// Print each content item on this printer
				for (const content of printContents) {
					try {
						// Format data for printing
						let printingData = this.formatDataForPrinting(printerConfig, content);
						
						// Create QZ config for this printer
						let config = qz.configs.create(printerConfig.printer, printerConfig);

						// Execute the actual print
						await qz.print(config, printingData.data);
						
						results.push({
							jobId: content.IDJob || 'unknown',
							printer: printerConfig.printer,
							host: printerConfig.host,
							status: 'success',
							timestamp: new Date()
						});

					} catch (printError) {
						results.push({
							jobId: content.IDJob || 'unknown',
							printer: printerConfig.printer,
							host: printerConfig.host,
							status: 'error',
							error: printError.message || printError,
							timestamp: new Date()
						});
					}
				}

				resolve(results);

			} catch (connectionError) {
				// If connection fails, mark all jobs as failed
				const failedResults = printContents.map(content => ({
					jobId: content.IDJob || 'unknown',
					printer: printerConfig.printer,
					host: printerConfig.host,
					status: 'error',
					error: `Connection failed: ${connectionError.message || connectionError}`,
					timestamp: new Date()
				}));

				reject(failedResults);
			}
		});
	}

	/// Connection ///
	/**
	 * Update connection state and notify UI components
	 * @param isConnected Boolean indicating current connection status
	 */
	private updateConnectionState(isConnected) {
		this.env.showBarMessage('printingServcerConnected', 'print-sharp', 'dark', isConnected);
		this.tracking.next(isConnected ? 'connected' : 'disconnected');
	}

	/**
	 * Handle QZ Tray connection errors and display appropriate user messages
	 * @param err Error object from QZ Tray connection attempt
	 */
	private handleQZConnectionError(err) {
		this.updateConnectionState(false);
		this.tracking.next('failed');

		if (err.target != undefined) {
			if (err.target.readyState >= 2) {
				// if CLOSING or CLOSED
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

	/**
	 * Initialize QZ Tray with security certificates and signature algorithms
	 */
	private initQZ() {
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
					resolve(stob64(hextorstr(hex)));
				} catch (err) {
					console.error(err);
					reject('false');
				}
			};
		});
		this.tracking.next('init');
	}

	/**
	 * Establish WebSocket connection to QZ Tray server
	 * @param host Server hostname (defaults to config value)
	 * @param port Server port (defaults to config value)  
	 * @param isSecure Whether to use secure connection (defaults to config value)
	 * @returns Promise resolving to true if connection successful
	 */
	private async startConnection(
		host = this.printingServerConfig.PrintingHost,
		port = this.printingServerConfig.PrintingPort,
		isSecure = this.printingServerConfig.PrintingIsSecure
	) {
		return new Promise(async (resolve, reject) => {
			if (!host) {
				reject('Invalid printing server configuration');
				return;
			}

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
						that.updateConnectionState(true);
						this.tracking.next('connected');
						this.isReady = true;
					})
					.catch((err) => {
						reject(err);
						this.handleQZConnectionError(err);
					});
			} else {
				resolve(true);
			}
		});
	}

	/**
	 * Disconnect from QZ Tray WebSocket server
	 * @returns Promise that resolves when disconnection is complete
	 */
	private async endConnection() {
		if (qz.websocket.isActive()) {
			let that = this;
			await qz.websocket
				.disconnect()
				.then(() => {
					that.updateConnectionState(false);
				})
				.catch((err) => this.handleQZConnectionError(err));
		}
	}

	/**
	 * Load printing configuration from system config service
	 * @param IDBranch Branch ID to load config for (null for current selected branch)
	 * @returns Promise resolving to true when config is loaded successfully
	 */
	private getConfig(IDBranch = null) {
		return new Promise((resolve, reject) => {
			const keys = ['PrintingHost', 'PrintingPort', 'PrintingIsSecure', 'DefaultPrinter'];
			this.sysConfigService
				.getConfig(IDBranch ?? this.env.selectedBranch, keys)
				.then((config) => {
					this.printingServerConfig = config;
					resolve(true);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
}
