import { Injectable } from '@angular/core';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerOptions,
  CapacitorBarcodeScannerScanResult,
} from '@capacitor/barcode-scanner';
import { lib } from './static/global-functions';

@Injectable({
  providedIn: 'root',
})
export class BarcodeScannerService {
  // Default options for the barcode scanner
  options: CapacitorBarcodeScannerOptions = {
    hint: 17,
    cameraDirection: 1,
  };

  constructor() {}

  /**
   * Scans a barcode using the provided options or default options.
   * @param options - Optional custom options for the barcode scanner.
   * @returns A promise that resolves with the scan result as a string.
   */
  scan(options: CapacitorBarcodeScannerOptions = null): Promise<string> {
    return new Promise((resolve, reject) => {
      // If custom options are provided, merge them with the default options
      if (options) lib.copyPropertiesValue(options, this.options);

      // Start the barcode scanning process
      CapacitorBarcodeScanner.scanBarcode(this.options)
        .then((result: CapacitorBarcodeScannerScanResult) => {
          // Handle the barcode scan result
          this.handleBarcodeScanResult(result)
            .then((processedResult) => resolve(processedResult))
            .catch((e) => reject(e));
        })
        .catch((e) => reject(e));
    });
  }

  /**
   * Handles the barcode scan result and returns the processed barcode.
   * @param result - The result of the barcode scan.
   * @returns A promise that resolves with the processed scan result.
   */
  handleBarcodeScanResult(result: CapacitorBarcodeScannerScanResult): Promise<string> {
    return new Promise((resolve) => {
      // Process the barcode scan result
      console.log('Barcode scan result:', result);
      resolve(result.ScanResult);
    });
  }
}
