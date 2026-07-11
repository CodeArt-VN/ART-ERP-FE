import { Injectable } from '@angular/core';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerOptions, CapacitorBarcodeScannerScanResult } from '@capacitor/barcode-scanner';
import { Capacitor } from '@capacitor/core';
import { EnvService } from '../core/env.service';
import { EVENT_TYPE } from '../static/event-type';
import { lib } from '../static/global-functions';

@Injectable({
	providedIn: 'root',
})
export class BarcodeScannerService {
	// Default options for the barcode scanner
	options: CapacitorBarcodeScannerOptions = {
		hint: 17,
		scanInstructions: '',
		//scanButton: false, scanText: 'Scan',
		//cameraDirection: 1; //BACK	1; FRONT	2
		scanOrientation: 3, //PORTRAIT	1; LANDSCAPE	2; ADAPTIVE	3
	};
	constructor(public env: EnvService) {}
	/**
	 * Scans a barcode using the provided options or default options.
	 * @param options - Optional custom options for the barcode scanner.
	 * @returns A promise that resolves with the scan result as a string.
	 */
	async scan(type: string = null, scanInstructions: string = null): Promise<string> {
		if (Capacitor.getPlatform() == 'web') {
			this.env.showMessage('Barcode scanner is not available on this platform.', 'warning');
			throw new Error('Barcode scanner is not available on this platform.');
		}

		//if (scanInstructions) this.options.scanInstructions = await this.env.translate.get(scanInstructions);

		let result: CapacitorBarcodeScannerScanResult;
		try {
			result = await CapacitorBarcodeScanner.scanBarcode(this.options);
		} catch (error) {
			this.handleError(error);
			throw error;
		} finally {
			this.scheduleStatusBarRestore();
		}

		if (type) {
			return this.handleBarcodeScanResult(type, result, scanInstructions);
		}

		return result.ScanResult;
	}

	private scheduleStatusBarRestore(): void {
		if (!Capacitor.isPluginAvailable('StatusBar')) {
			return;
		}

		window.setTimeout(() => {
			this.env.publishEvent({ Code: EVENT_TYPE.APP.RESTORE_STATUS_BAR });
		}, 150);
	}

	/**
	 * Handles the barcode scan result and returns the processed barcode.
	 * @param scanResult - The result of the barcode scan.
	 * @returns A promise that resolves with the processed scan result.
	 */
	handleBarcodeScanResult(type: string, scanResult: CapacitorBarcodeScannerScanResult, scanInstructions: string = null): Promise<string> {
		return new Promise((resolve) => {
			// Process the barcode scan result
			console.log('handleBarcodeScanResult:', type, scanResult);

			let code = scanResult.ScanResult;
			let result = null;

			//switch type SO, PO, ...
			switch (type) {
				case 'SO':
					if (code.indexOf('O:') == 0 || code.indexOf('000201') == 0) {
						if (code.indexOf('O:') == 0) {
							result = code.replace('O:', '');
						} else {
							let qrContent = lib.readVietQRCode(code);
							result = qrContent.message.replace('SO', '');
						}
					}
					if (!result) {
						this.env
							.showPrompt('Please scan valid QR code', 'Invalid QR code', null, 'Retry', 'Cancel')
							.then(() => {
								this.scan(type, scanInstructions)
									.then((res) => resolve(res))
									.catch(() => {});
							})
							.catch(() => {});
						return;
					}
					break;

				default:
					break;
			}

			resolve(result);
		});
	}

	handleError(error: any): void {
		let message = error.message || error;
		if (message.includes('cancelled'))
			return; //Couldn't scan because the process was cancelled.
		else if (message.includes('permission')) message = 'Permission denied. Please enable camera access.';
		else if (message.includes('camera')) message = 'Camera not available. Please check your camera settings.';
		else if (message.includes('unavailable')) message = 'Barcode scanner is not available on this platform.';
		else message = 'An unknown error occurred. Please try again.';
		this.env.showMessage(message, 'danger');
	}
}
