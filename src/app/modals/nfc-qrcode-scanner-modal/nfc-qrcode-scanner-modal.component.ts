import { Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { App, type AppState } from '@capacitor/app';
import { Capacitor, type PluginListenerHandle } from '@capacitor/core';
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

export interface NfcScanResolveResult {
	ok: boolean;
	message?: string;
	/** Extra detail for UI (Id, Name từ API, IDBP trên thẻ, ...) */
	detail?: string;
	foundContact?: { Id?: number | string; Code?: string; Name?: string };
	cardIdbp?: string | number;
	memberCardCode?: string;
}

export type NfcScanResolver = (data: ScannerModalResult) => Promise<NfcScanResolveResult>;

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
	@Input() resolveNfcScan?: NfcScanResolver;

	currentMode: ScannerMode = 'NFC';
	isLoading = false;
	isSupported = true;
	errorMessage = '';
	errorDetail = '';
	statusMessage = '';
	scanPreview = '';
	parsedIdbp = '';
	lastTagUid = '';
	foundContactPreview = '';
	result: ScannerModalResult | null = null;
	wasCancelled = false;
	private processingNfcRead = false;

	private isDestroyed = false;
	private actionToken = 0;
	private nfcPlugin: NfcPlugin | null = null;
	private removeNfcReadListener?: () => void;
	private removeNfcErrorListener?: () => void;
	private rd300Reader?: Rd300WebSerialReader;
	private webNfcAbortController?: AbortController;
	private appStateListener?: PluginListenerHandle;
	private nfcSystemUiPresented = false;
	private nfcListeningForCancel = false;
	private suppressCancelUi = false;
	private cancelDetectTimer?: ReturnType<typeof setTimeout>;

	constructor(
		private modalController: ModalController,
		private barcodeScannerService: BarcodeScannerService,
		private ngZone: NgZone
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
		if (this.errorMessage) return 'Scan failed';
		if (this.result) return 'Read successful';
		if (this.wasCancelled) return 'Scan stopped';
		if (this.currentMode === 'QR') return 'Scanning QR Code';
		return 'Bring your membership card close';
	}

	get statusIcon(): string {
		if (this.errorMessage) return 'alert-circle-outline';
		if (this.wasCancelled) return 'pause-circle-outline';
		if (this.currentMode === 'QR') return 'qr-code-outline';
		return 'radio-outline';
	}

	get canShowQrButton(): boolean {
		return this.showQrCodeButton || this.currentMode === 'QR';
	}

	get canRestartCurrentMode(): boolean {
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

	async changeMode(mode: ScannerMode): Promise<void> {
		const nextMode = this.normalizeMode(mode);
		if (nextMode === this.currentMode && !this.canRestartCurrentMode) return;

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
				this.statusMessage = 'You canceled the QR scan. Tap "Scan QR code" to scan again.';
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

			this.attachNfcListeners(plugin, token);

			this.statusMessage = 'Please bring your membership card close to the device to read it.';
			// 'ndef' (legacy NDEFReaderSession) không trả tag UID trên iOS.
			// MemberCard.Code = UID → cần tag session (auto/full) giống lúc ghi thẻ.
			if (Capacitor.getPlatform() !== 'android') {
				await plugin.startScan({ mode: 'auto' });
				await this.attachIosNfcCancelWatcher(token);
			}
			this.isLoading = false;
		} catch (error) {
			if (!this.isActionActive(token)) return;

			this.isLoading = false;
			if (this.isCancelError(error)) {
				this.markNfcScanCanceled();
				return;
			}
			this.errorMessage = this.resolveErrorMessage(error, 'Unable to start the NFC reading session.');
		}
	}

	private attachNfcListeners(plugin: NfcPlugin, token: number): void {
		this.removeNfcReadListener = plugin.onRead((data) => {
			if (!this.isActionActive(token)) return;

			const output = this.normalizeNfcResult(data);
			if (output.tagInfo?.fallback === true) return;

			void this.handleNfcReadOutput(output, token);
		});

		this.removeNfcErrorListener = plugin.onError((error) => {
			if (!this.isActionActive(token)) return;
			if (this.processingNfcRead || this.suppressCancelUi) return;

			this.isLoading = false;
			if (this.isCancelError(error)) {
				this.markNfcScanCanceled();
				return;
			}

			if (this.isBenignNfcSessionError(error)) return;

			this.errorMessage = this.resolveErrorMessage(error, 'Unable to read NFC.');
		});
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
		this.statusMessage = 'Please bring your membership card close to the device to read it.';

		try {
			const NdefReader = (window as any).NDEFReader as BrowserNdefReaderConstructor;
			const reader = new NdefReader();
			this.webNfcAbortController = new AbortController();

			reader.onreading = (event) => {
				if (!this.isActionActive(token)) return;

				const output = this.normalizeBrowserNfcResult(event);
				void this.handleNfcReadOutput(output, token);
			};

			reader.onreadingerror = () => {
				if (!this.isActionActive(token)) return;

				this.isLoading = false;
				this.errorMessage = 'Unable to read the membership card. Keep it steady and try again.';
			};

			await reader.scan({ signal: this.webNfcAbortController.signal });
			if (!this.isActionActive(token)) return;
			this.statusMessage = 'Please bring your membership card close to the device to read it.';
		} catch (error) {
			if (!this.isActionActive(token)) return;

			this.isLoading = false;
			if (this.isCancelError(error)) {
				this.markNfcScanCanceled();
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
			await this.handleNfcReadOutput(output, token);
		} catch (error) {
			if (!this.isActionActive(token)) return;

			this.isLoading = false;
			if (this.isCancelError(error)) {
				this.markNfcScanCanceled();
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
			await this.detachIosNfcCancelWatcher();

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
		// Giống write-nfc-modal: UID nằm ở tagInfo.uid (Capacitor native / RD300)
		const tagInfo = this.normalizeTagInfo(stringView?.tagInfo || numberView?.tagInfo || (data as any)?.tagInfo);

		if (firstPayload && typeof firstPayload === 'string') {
			return {
				mode: 'NFC',
				value: this.parsePossibleJson(firstPayload),
				rawValue: firstPayload,
				tagInfo,
			};
		}

		return {
			mode: 'NFC',
			value: {
				messages: stringView?.messages || [],
				tagInfo,
				rawMessages: numberView?.messages || [],
			},
			tagInfo,
		};
	}

	/** Chuẩn hóa tagInfo về { uid } — khớp Code lưu khi ghi thẻ */
	private normalizeTagInfo(tagInfo: any): any {
		if (!tagInfo || typeof tagInfo !== 'object') return tagInfo || {};
		const uid =
			tagInfo.uid ||
			tagInfo.UID ||
			tagInfo.serialNumber ||
			tagInfo.id ||
			tagInfo.Id ||
			(Array.isArray(tagInfo.identifier) ? tagInfo.identifier.map((b: number) => Number(b).toString(16).padStart(2, '0')).join('') : '') ||
			'';
		return {
			...tagInfo,
			uid: `${uid || ''}`.trim(),
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

	private async handleNfcReadOutput(output: ScannerModalResult, token: number): Promise<void> {
		if (output.mode !== 'NFC') {
			await this.completeNfcRead(output);
			return;
		}

		console.log('[POS-NFC][Modal] 0. NFC read raw output', {
			mode: output.mode,
			rawValue: output.rawValue,
			value: output.value,
			tagInfo: output.tagInfo,
			hasResolveNfcScan: !!this.resolveNfcScan,
		});

		this.processingNfcRead = true;
		this.isLoading = true;
		this.errorMessage = '';
		this.applyScannedContentPreview(output);

		try {
			if (this.resolveNfcScan) {
				try {
					console.log('[POS-NFC][Modal] → call resolveNfcScan');
					const resolved = await this.resolveNfcScan(output);
					console.log('[POS-NFC][Modal] ← resolveNfcScan result', resolved);
					if (!this.isActionActive(token)) return;

					if (!resolved.ok) {
						const msg = resolved.message || 'No customer found for scanned code';
						console.warn('[POS-NFC][Modal] SHOW ERROR', msg, resolved);
						this.isLoading = false;
						this.setScanFailure(msg, output, resolved);
						await this.pauseNfcAfterScanFailure();
						return;
					}
					console.log('[POS-NFC][Modal] resolve OK → completeNfcRead');
				} catch (err) {
					console.error('[POS-NFC][Modal] resolveNfcScan threw', err);
					if (!this.isActionActive(token)) return;
					this.isLoading = false;
					this.setScanFailure('Unable to verify scanned card', output);
					await this.pauseNfcAfterScanFailure();
					return;
				}
			} else {
				const idbp = this.extractBusinessPartnerIdFromOutput(output);
				console.log('[POS-NFC][Modal] no resolveNfcScan, extract IDBP', idbp);
				if (idbp == null) {
					console.warn('[POS-NFC][Modal] SHOW ERROR Invalid NFC content');
					this.isLoading = false;
					this.setScanFailure('Invalid NFC content', output);
					await this.pauseNfcAfterScanFailure();
					return;
				}
			}

			await this.completeNfcRead(output);
		} finally {
			this.processingNfcRead = false;
		}
	}

	private async pauseNfcAfterScanFailure(): Promise<void> {
		this.suppressCancelUi = true;
		this.wasCancelled = true;
		this.statusMessage = 'Tap "Scan card" to try again.';
		await this.stopReadNfc();
	}

	private markNfcScanCanceled(): void {
		this.isLoading = false;
		this.nfcListeningForCancel = false;
		void this.detachIosNfcCancelWatcher();

		// Keep the previous scan failure visible (e.g. customer not found).
		if (this.suppressCancelUi || this.errorMessage || this.result) {
			this.wasCancelled = true;
			return;
		}

		this.wasCancelled = true;
		this.errorMessage = '';
		this.statusMessage =
			'The system scan screen was closed. Scanning is paused. Tap "Scan card" to start again.';
		void this.nfcPlugin?.cancelScan().catch(() => undefined);
	}

	private async attachIosNfcCancelWatcher(token: number): Promise<void> {
		if (Capacitor.getPlatform() !== 'ios') return;

		await this.detachIosNfcCancelWatcher();
		this.nfcListeningForCancel = true;
		this.nfcSystemUiPresented = false;

		this.appStateListener = await App.addListener('appStateChange', (state: AppState) => {
			this.ngZone.run(() => {
				if (!this.isActionActive(token) || !this.nfcListeningForCancel || this.wasCancelled) return;
				if (this.suppressCancelUi || this.errorMessage || this.result || this.processingNfcRead) return;

				if (!state.isActive) {
					this.nfcSystemUiPresented = true;
					return;
				}

				if (!this.nfcSystemUiPresented) return;

				if (this.cancelDetectTimer) clearTimeout(this.cancelDetectTimer);
				this.cancelDetectTimer = setTimeout(() => {
					if (!this.isActionActive(token) || !this.nfcListeningForCancel) return;
					if (this.suppressCancelUi || this.processingNfcRead || this.result || this.wasCancelled || this.errorMessage) {
						return;
					}
					this.markNfcScanCanceled();
				}, 350);
			});
		});
	}

	private async detachIosNfcCancelWatcher(): Promise<void> {
		this.nfcListeningForCancel = false;
		this.nfcSystemUiPresented = false;
		if (this.cancelDetectTimer) {
			clearTimeout(this.cancelDetectTimer);
			this.cancelDetectTimer = undefined;
		}
		await this.appStateListener?.remove().catch(() => undefined);
		this.appStateListener = undefined;
	}

	private async completeNfcRead(output: ScannerModalResult): Promise<void> {
		await this.stopReadNfc();
		this.result = output;
		this.isLoading = false;
		this.statusMessage = 'NFC data read successfully.';
		await this.modalController.dismiss(output, 'confirm');
	}

	private extractBusinessPartnerIdFromOutput(output: ScannerModalResult): string | number | null {
		const rawValue = typeof output.rawValue === 'string' ? output.rawValue.trim() : '';
		if (rawValue) {
			const bpMatch = /^\s*BP-(\d+)\s*$/i.exec(rawValue);
			if (bpMatch) return parseInt(bpMatch[1], 10);
			if (/^\d+$/.test(rawValue)) return parseInt(rawValue, 10);
		}

		let value: string | object = output.value;
		if (typeof value === 'string') {
			value = this.parsePossibleJson(value);
		}

		if (value && typeof value === 'object' && !Array.isArray(value)) {
			const record = value as Record<string, unknown>;
			const id = record.IDBP ?? record.Id ?? record.id;
			if (id != null && id !== '') return id as string | number;
		}

		if (rawValue) {
			const parsed = this.parsePossibleJson(rawValue);
			if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
				const record = parsed as Record<string, unknown>;
				const id = record.IDBP ?? record.Id ?? record.id;
				if (id != null && id !== '') return id as string | number;
			}
		}

		return null;
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
		this.errorDetail = '';
		this.statusMessage = '';
		this.scanPreview = '';
		this.parsedIdbp = '';
		this.lastTagUid = '';
		this.foundContactPreview = '';
		this.result = null;
		this.wasCancelled = false;
		this.suppressCancelUi = false;
	}

	private setScanFailure(messageKey: string, output: ScannerModalResult, resolved?: NfcScanResolveResult): void {
		this.errorMessage = messageKey;
		this.errorDetail = resolved?.detail || '';
		this.suppressCancelUi = true;
		this.applyScannedContentPreview(output);

		if (resolved?.foundContact) {
			const c = resolved.foundContact;
			this.foundContactPreview = `#${c.Id ?? '-'} · ${c.Name || c.Code || '-'}`;
		} else {
			this.foundContactPreview = '';
		}
		if (resolved?.cardIdbp != null && resolved.cardIdbp !== '') {
			this.parsedIdbp = String(resolved.cardIdbp);
		}
		if (resolved?.memberCardCode) {
			this.lastTagUid = resolved.memberCardCode;
		}
	}

	private applyScannedContentPreview(output: ScannerModalResult): void {
		this.scanPreview = this.buildScanPreview(output);
		this.parsedIdbp = this.formatParsedIdbp(this.extractBusinessPartnerIdFromOutput(output));
		const tagInfo = output.tagInfo || {};
		this.lastTagUid = `${tagInfo.uid || tagInfo.serialNumber || tagInfo.id || ''}`.trim();
	}

	private formatParsedIdbp(idbp: string | number | null): string {
		if (idbp == null) return '';
		return String(idbp);
	}

	private buildScanPreview(output: ScannerModalResult): string {
		if (output.rawValue?.trim()) return output.rawValue.trim();

		if (typeof output.value === 'string' && output.value.trim()) return output.value.trim();

		if (output.value && typeof output.value === 'object') {
			const value = output.value as {
				messages?: Array<{ records?: Array<{ payload?: unknown }> }>;
			};
			const firstPayload = value.messages?.[0]?.records?.[0]?.payload;
			if (typeof firstPayload === 'string' && firstPayload.trim()) return firstPayload.trim();
			if (Array.isArray(firstPayload) && firstPayload.length) {
				try {
					return new TextDecoder().decode(Uint8Array.from(firstPayload as number[]));
				} catch {
					return JSON.stringify(firstPayload);
				}
			}

			try {
				return JSON.stringify(output.value, null, 2);
			} catch {
				return '';
			}
		}

		if (output.tagInfo?.uid) return output.tagInfo.uid;
		return '';
	}

	private normalizeMode(mode: ScannerMode | string): ScannerMode {
		return `${mode}`.toUpperCase() === 'QR' ? 'QR' : 'NFC';
	}

	private resolveErrorMessage(error: any, fallback: string): string {
		const message = `${error?.error || error?.message || error || fallback}`.trim();

		if (!message) return fallback;
		if (this.isBenignNfcSessionError(error)) return fallback;
		if (/permission/i.test(message)) return 'Required permissions have not been granted.';
		if (/cancelled|canceled/i.test(message)) return fallback;
		if (/not support|unsupported/i.test(message)) return 'This device does not support this feature.';
		if (/timeout/i.test(message)) return 'Scan timed out. Bring your membership card close to the device and try again.';
		if (/tag/i.test(message) && /not found|lost|removed/i.test(message)) {
			return 'Unable to read the membership card. Keep it steady near the device and try again.';
		}
		return message;
	}

	private isBenignNfcSessionError(error: any): boolean {
		if (this.isCancelError(error)) return false;

		const message = `${error?.error || error?.message || error || ''}`.toLowerCase();
		return (
			message.includes('invalidated unexpectedly') ||
			message.includes('first ndef tag') ||
			message.includes('readersessioninvalidationerrorfirstndeftagread') ||
			(message.includes('session invalidated') && !message.includes('user'))
		);
	}

	private isCancelError(error: any): boolean {
		const message = `${error?.error || error?.message || error || ''}`.toLowerCase();
		return (
			message.includes('cancelled') ||
			message.includes('canceled') ||
			message.includes('usercanceled') ||
			message.includes('user canceled') ||
			message.includes('user cancelled') ||
			message.includes('invalidationerrorusercanceled') ||
			message.includes('session invalidated by user') ||
			(message.includes('cancel') && !message.includes('unable to cancel')) ||
			error?.name === 'NotFoundError'
		);
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
