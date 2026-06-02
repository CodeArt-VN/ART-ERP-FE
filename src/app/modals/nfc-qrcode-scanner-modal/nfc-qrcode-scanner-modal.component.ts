import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { NFC } from '@exxili/capacitor-nfc';
import { BarcodeScannerService } from 'src/app/services/util/barcode-scanner.service';
import { Rd300NdefReadResult, Rd300WebSerialReader } from 'src/app/services/util/rd300-web-serial-reader';

type ScannerMode = 'NFC' | 'QR';

interface ScannerModalResult {
	mode: ScannerMode;
	value: string | object;
	rawValue?: string;
	tagInfo?: any;
}

interface NfcReadMessage<T = string> {
	records: Array<{
		type: string;
		payload: T;
	}>;
}

interface NfcReadPayload<T = string> {
	messages: NfcReadMessage<T>[];
	tagInfo?: any;
}

interface NfcMessagesTransformable {
	string: () => NfcReadPayload<string>;
	base64: () => NfcReadPayload<string>;
	uint8Array: () => NfcReadPayload<Uint8Array>;
	numberArray: () => NfcReadPayload<number[]>;
}

interface NfcPluginError {
	error?: string;
	message?: string;
}

interface NfcPlugin {
	isSupported: () => Promise<{ supported: boolean }>;
	startScan: (options?: { mode?: 'auto' | 'full' | 'compat' | 'ndef' }) => Promise<void>;
	cancelScan: () => Promise<void>;
	onRead: (listener: (data: NfcMessagesTransformable) => void) => () => void;
	onError: (listener: (error: NfcPluginError) => void) => () => void;
}

interface BrowserNdefRecord {
	recordType: string;
	mediaType?: string;
	id?: string;
	encoding?: string;
	lang?: string;
	data?: DataView;
}

interface BrowserNdefReadingEvent extends Event {
	serialNumber?: string;
	message: {
		records: BrowserNdefRecord[];
	};
}

interface BrowserNdefReader extends EventTarget {
	onreading: ((event: BrowserNdefReadingEvent) => void) | null;
	onreadingerror: ((event: Event) => void) | null;
	scan: (options?: { signal?: AbortSignal }) => Promise<void>;
}

interface BrowserNdefReaderConstructor {
	new (): BrowserNdefReader;
}

@Component({
	selector: 'app-nfc-qrcode-scanner-modal',
	templateUrl: './nfc-qrcode-scanner-modal.component.html',
	styleUrls: ['./nfc-qrcode-scanner-modal.component.scss'],
	standalone: false,
})
export class NfcQrcodeScannerModalComponent implements OnInit, OnDestroy {
	@Input() title = 'Title';
	@Input() label = 'Label';
	@Input() mode: ScannerMode = 'NFC';
	@Input() showQrCodeButton = false;

	currentMode: ScannerMode = 'NFC';
	isLoading = false;
	isSupported = true;
	errorMessage = '';
	statusMessage = '';
	result: ScannerModalResult | null = null;
	wasCancelled = false;

	private isDestroyed = false;
	private actionToken = 0;
	private nfcPlugin: NfcPlugin | null = null;
	private removeNfcReadListener?: () => void;
	private removeNfcErrorListener?: () => void;
	private rd300Reader?: Rd300WebSerialReader;
	private webNfcAbortController?: AbortController;

	constructor(
		private modalController: ModalController,
		private barcodeScannerService: BarcodeScannerService
	) {}

	async ngOnInit(): Promise<void> {
		this.currentMode = this.normalizeMode(this.mode);
		await this.startCurrentMode();
	}

	ngOnDestroy(): void {
		this.isDestroyed = true;
		this.actionToken++;
		void this.stopReadNfc();
	}

	get statusTitle(): string {
		if (this.errorMessage) return 'Unable to continue';
		if (this.result) return 'Read successful';
		if (this.currentMode === 'QR') return 'Scanning QR Code';
		return 'Waiting for NFC';
	}

	get activeDescription(): string {
		if (this.errorMessage) return this.errorMessage;
		if (this.statusMessage) return this.statusMessage;
		if (this.currentMode === 'QR') return 'Place the QR Code inside the camera frame to scan.';
		return 'Hold the NFC card or device near the phone.';
	}

	get statusIcon(): string {
		if (this.errorMessage) return 'alert-circle-outline';
		if (this.currentMode === 'QR') return 'qr-code-outline';
		return 'radio-outline';
	}

	get canShowQrButton(): boolean {
		return this.showQrCodeButton || this.currentMode === 'QR';
	}

	get canRetry(): boolean {
		if (this.isLoading || !this.isSupported) return false;
		return this.wasCancelled || !!this.errorMessage;
	}

	isMode(mode: ScannerMode): boolean {
		return this.currentMode === mode;
	}

	async closeModal(): Promise<void> {
		this.actionToken++;
		await this.stopReadNfc();
		await this.modalController.dismiss(null, 'cancel');
	}

	async retryCurrentMode(): Promise<void> {
		await this.startCurrentMode();
	}

	async changeMode(mode: ScannerMode): Promise<void> {
		const nextMode = this.normalizeMode(mode);
		if (nextMode === this.currentMode && !this.canRetry) return;

		this.currentMode = nextMode;
		await this.startCurrentMode();
	}

	private async startCurrentMode(): Promise<void> {
		const token = ++this.actionToken;
		this.resetRuntimeState();

		if (this.currentMode === 'QR') {
			await this.stopReadNfc();
			await this.scanQrCode(token);
			return;
		}

		await this.startReadNfc(token);
	}

	private async scanQrCode(token: number): Promise<void> {
		this.isLoading = true;
		this.statusMessage = 'The camera will open to scan the QR Code.';

		try {
			const rawValue = await this.barcodeScannerService.scan();
			if (!this.isActionActive(token) || !rawValue) return;

			const output: ScannerModalResult = {
				mode: 'QR',
				value: this.parsePossibleJson(rawValue),
				rawValue,
			};

			this.result = output;
			this.isLoading = false;
			await this.modalController.dismiss(output, 'confirm');
		} catch (error) {
			if (!this.isActionActive(token)) return;

			this.isLoading = false;
			if (this.isCancelError(error)) {
				this.wasCancelled = true;
				this.statusMessage = 'You canceled the QR scan. Press "Retry" to scan again.';
				return;
			}

			this.errorMessage = this.resolveErrorMessage(error, 'Unable to scan the QR Code.');
		}
	}

	private async startReadNfc(token: number): Promise<void> {
		this.isLoading = true;
		this.statusMessage = 'Initializing the NFC reader.';

		if (Capacitor.getPlatform() === 'web') {
			await this.startReadWebNfc(token);
			return;
		}

		await this.stopReadNfc();

		const plugin = await this.loadNfcPlugin();
		if (!this.isActionActive(token)) return;

		if (!plugin) {
			this.isLoading = false;
			this.isSupported = false;
			this.errorMessage = 'The NFC plugin is not installed in this project. Install `@exxili/capacitor-nfc` before using NFC.';
			return;
		}

		try {
			const support = await plugin.isSupported();
			if (!this.isActionActive(token)) return;

			if (!support?.supported) {
				this.isLoading = false;
				this.isSupported = false;
				this.errorMessage = 'This device does not support NFC or NFC is turned off.';
				return;
			}

			this.removeNfcReadListener = plugin.onRead((data) => {
				if (!this.isActionActive(token)) return;

				const output = this.normalizeNfcResult(data);
				this.result = output;
				this.isLoading = false;
				this.statusMessage = 'NFC data read successfully.';

				void this.modalController.dismiss(output, 'confirm');
			});

			this.removeNfcErrorListener = plugin.onError((error) => {
				if (!this.isActionActive(token)) return;

				this.isLoading = false;
				if (this.isCancelError(error)) {
					this.wasCancelled = true;
					this.statusMessage = 'The NFC session was canceled. Press "Retry" to read again.';
					return;
				}

				this.errorMessage = this.resolveErrorMessage(error, 'Unable to read NFC.');
			});

			this.statusMessage = 'Hold the NFC card near the device to read data.';
			if (Capacitor.getPlatform() !== 'android') {
				await plugin.startScan({ mode: 'auto' });
			}
		} catch (error) {
			if (!this.isActionActive(token)) return;

			this.isLoading = false;
			this.errorMessage = this.resolveErrorMessage(error, 'Unable to start the NFC reading session.');
		}
	}

	private async startReadWebNfc(token: number): Promise<void> {
		await this.stopReadNfc();
		if (!this.isActionActive(token)) return;

		if (this.isBrowserNfcAvailable()) {
			await this.startReadBrowserNfc(token);
			return;
		}

		await this.startReadRd300Nfc(token);
	}

	private async startReadBrowserNfc(token: number): Promise<void> {
		this.isLoading = true;
		this.statusMessage = 'Hold the NFC card near the phone to read data.';

		try {
			const NdefReader = (window as any).NDEFReader as BrowserNdefReaderConstructor;
			const reader = new NdefReader();
			this.webNfcAbortController = new AbortController();

			reader.onreading = (event) => {
				if (!this.isActionActive(token)) return;

				const output = this.normalizeBrowserNfcResult(event);
				this.result = output;
				this.isLoading = false;
				this.statusMessage = 'NFC data read successfully.';

				void this.modalController.dismiss(output, 'confirm');
			};

			reader.onreadingerror = () => {
				if (!this.isActionActive(token)) return;

				this.isLoading = false;
				this.errorMessage = 'Unable to read NFC. Keep the card steady and try again.';
			};

			await reader.scan({ signal: this.webNfcAbortController.signal });
			if (!this.isActionActive(token)) return;
			this.statusMessage = 'Hold the NFC card near the phone to read data.';
		} catch (error) {
			if (!this.isActionActive(token)) return;

			this.isLoading = false;
			if (this.isCancelError(error)) {
				this.wasCancelled = true;
				this.statusMessage = 'The NFC session was canceled. Press "Retry" to read again.';
				return;
			}

			if (this.isUnsupportedBrowserNfcError(error)) {
				this.isSupported = false;
			}

			this.errorMessage = this.resolveErrorMessage(error, 'Unable to start the browser NFC reading session.');
		}
	}

	private async startReadRd300Nfc(token: number): Promise<void> {
		this.isLoading = true;
		this.statusMessage = 'Select the RD300 serial port.';

		try {
			const reader = this.getRd300Reader();
			const result = await reader.readNdefCard({ stableReads: 1 });
			if (!this.isActionActive(token)) return;

			const output = this.normalizeRd300Result(result);
			this.result = output;
			this.isLoading = false;
			this.statusMessage = 'NFC data read successfully.';

			await this.modalController.dismiss(output, 'confirm');
		} catch (error) {
			if (!this.isActionActive(token)) return;

			this.isLoading = false;
			if (this.isCancelError(error)) {
				this.wasCancelled = true;
				this.statusMessage = 'The RD300 NFC session was canceled. Press "Retry" to read again.';
				return;
			}

			if (this.isUnsupportedSerialError(error)) {
				this.isSupported = false;
			}

			this.errorMessage = this.resolveErrorMessage(error, 'Unable to read NFC from RD300.');
		}
	}

	private async stopReadNfc(): Promise<void> {
		try {
			this.webNfcAbortController?.abort();
			this.webNfcAbortController = undefined;

			this.removeNfcReadListener?.();
			this.removeNfcReadListener = undefined;
			this.removeNfcErrorListener?.();
			this.removeNfcErrorListener = undefined;

			if (this.nfcPlugin) {
				await this.nfcPlugin.cancelScan().catch(() => undefined);
			}

			await this.rd300Reader?.disconnect().catch(() => undefined);
			this.rd300Reader = undefined;
		} catch (error) {
			console.warn('stopReadNfc error', error);
		}
	}

	private normalizeNfcResult(data: NfcMessagesTransformable): ScannerModalResult {
		const stringView = data?.string?.();
		const numberView = data?.numberArray?.();
		const firstPayload = stringView?.messages?.[0]?.records?.[0]?.payload;

		if (firstPayload && typeof firstPayload === 'string') {
			return {
				mode: 'NFC',
				value: this.parsePossibleJson(firstPayload),
				rawValue: firstPayload,
				tagInfo: stringView?.tagInfo,
			};
		}

		return {
			mode: 'NFC',
			value: {
				messages: stringView?.messages || [],
				tagInfo: stringView?.tagInfo,
				rawMessages: numberView?.messages || [],
			},
			tagInfo: stringView?.tagInfo,
		};
	}

	private normalizeBrowserNfcResult(event: BrowserNdefReadingEvent): ScannerModalResult {
		const firstRecord = event?.message?.records?.[0];
		const rawValue = this.readBrowserNfcRecordPayload(firstRecord);
		const tagInfo = {
			uid: event?.serialNumber || '',
			type: 'web-nfc',
			reader: 'Browser NFC',
		};

		if (rawValue) {
			return {
				mode: 'NFC',
				value: this.parsePossibleJson(rawValue),
				rawValue,
				tagInfo,
			};
		}

		return {
			mode: 'NFC',
			value: {
				messages: [
					{
						records: event?.message?.records || [],
					},
				],
				tagInfo,
			},
			tagInfo,
		};
	}

	private readBrowserNfcRecordPayload(record?: BrowserNdefRecord): string {
		if (!record?.data) return '';

		const bytes = new Uint8Array(record.data.buffer, record.data.byteOffset, record.data.byteLength);
		if (record.recordType === 'text') {
			return new TextDecoder(record.encoding || 'utf-8').decode(bytes);
		}

		if (record.recordType === 'mime' && record.mediaType?.toLowerCase().includes('json')) {
			return new TextDecoder().decode(bytes);
		}

		if (record.recordType === 'url' || record.recordType === 'absolute-url') {
			return new TextDecoder().decode(bytes);
		}

		return '';
	}

	private normalizeRd300Result(data: Rd300NdefReadResult): ScannerModalResult {
		if (!data.rawValue) {
			return {
				mode: 'NFC',
				value: {
					messages: [
						{
							records: data.records || [],
						},
					],
					tagInfo: this.buildRd300TagInfo(data),
					rawMessages: data.ndefMessage || [],
				},
				tagInfo: this.buildRd300TagInfo(data),
			};
		}

		return {
			mode: 'NFC',
			value: this.parsePossibleJson(data.rawValue),
			rawValue: data.rawValue,
			tagInfo: this.buildRd300TagInfo(data),
		};
	}

	private buildRd300TagInfo(data: Rd300NdefReadResult): any {
		return {
			uid: data.uid,
			type: data.tagType,
			uidSource: data.uidSource,
			reader: 'RD300',
		};
	}

	private parsePossibleJson(value: string): string | object {
		const rawValue = (value || '').trim();
		if (!rawValue) return value;

		if (!['{', '['].includes(rawValue.charAt(0))) {
			return rawValue;
		}

		try {
			return JSON.parse(rawValue);
		} catch {
			return rawValue;
		}
	}

	private resetRuntimeState(): void {
		this.isLoading = false;
		this.isSupported = true;
		this.errorMessage = '';
		this.statusMessage = '';
		this.result = null;
		this.wasCancelled = false;
	}

	private normalizeMode(mode: ScannerMode | string): ScannerMode {
		return `${mode}`.toUpperCase() === 'QR' ? 'QR' : 'NFC';
	}

	private resolveErrorMessage(error: any, fallback: string): string {
		const message = `${error?.error || error?.message || error || fallback}`.trim();

		if (!message) return fallback;
		if (/permission/i.test(message)) return 'Required permissions have not been granted.';
		if (/cancelled|canceled/i.test(message)) return fallback;
		if (/not support|unsupported/i.test(message)) return 'This device does not support this feature.';
		return message;
	}

	private isCancelError(error: any): boolean {
		const message = `${error?.error || error?.message || error || ''}`.toLowerCase();
		return message.includes('cancelled') || message.includes('canceled') || message.includes('cancel') || error?.name === 'NotFoundError';
	}

	private isUnsupportedSerialError(error: any): boolean {
		const message = `${error?.error || error?.message || error || ''}`.toLowerCase();
		return message.includes('web serial is not supported');
	}

	private isUnsupportedBrowserNfcError(error: any): boolean {
		const message = `${error?.error || error?.message || error || ''}`.toLowerCase();
		return error?.name === 'NotSupportedError' || message.includes('web nfc is not supported') || message.includes('nfc is not supported');
	}

	private isBrowserNfcAvailable(): boolean {
		return typeof window !== 'undefined' && 'NDEFReader' in window;
	}

	private isActionActive(token: number): boolean {
		return !this.isDestroyed && token === this.actionToken;
	}

	private async loadNfcPlugin(): Promise<NfcPlugin | null> {
		if (this.nfcPlugin) return this.nfcPlugin;

		if (!Capacitor.isPluginAvailable('NFC')) {
			console.warn('Capacitor NFC plugin is not available in this build.');
			return null;
		}

		this.nfcPlugin = NFC as unknown as NfcPlugin;
		return this.nfcPlugin;
	}

	private getRd300Reader(): Rd300WebSerialReader {
		if (!this.rd300Reader) {
			this.rd300Reader = new Rd300WebSerialReader((message) => {
				this.statusMessage = message;
			});
		}

		return this.rd300Reader;
	}
}
