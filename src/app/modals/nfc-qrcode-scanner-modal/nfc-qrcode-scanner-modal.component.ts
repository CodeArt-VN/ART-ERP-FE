import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { NFC } from '@exxili/capacitor-nfc';
import { BarcodeScannerService } from 'src/app/services/util/barcode-scanner.service';

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
		if (this.errorMessage) return 'Không thể tiếp tục';
		if (this.result) return 'Đã đọc thành công';
		if (this.currentMode === 'QR') return 'Đang quét QR Code';
		return 'Đang chờ NFC';
	}

	get activeDescription(): string {
		if (this.errorMessage) return this.errorMessage;
		if (this.statusMessage) return this.statusMessage;
		if (this.currentMode === 'QR') return 'Đưa QR Code vào khung camera để quét.';
		return 'Đưa thẻ hoặc thiết bị NFC lại gần điện thoại.';
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
		this.statusMessage = 'Camera sẽ mở để quét QR Code.';

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
				this.statusMessage = 'Bạn đã hủy quét QR. Nhấn "Thử lại" để quét tiếp.';
				return;
			}

			this.errorMessage = this.resolveErrorMessage(error, 'Không thể quét QR Code.');
		}
	}

	private async startReadNfc(token: number): Promise<void> {
		this.isLoading = true;
		this.statusMessage = 'Đang khởi tạo đầu đọc NFC.';

		if (Capacitor.getPlatform() === 'web') {
			this.isLoading = false;
			this.isSupported = false;
			this.errorMessage = 'NFC không hỗ trợ trên nền tảng web.';
			return;
		}

		await this.stopReadNfc();

		const plugin = await this.loadNfcPlugin();
		if (!this.isActionActive(token)) return;

		if (!plugin) {
			this.isLoading = false;
			this.isSupported = false;
			this.errorMessage = 'Plugin NFC chưa được cài trong project. Cần cài `@exxili/capacitor-nfc` trước khi dùng NFC.';
			return;
		}

		try {
			const support = await plugin.isSupported();
			if (!this.isActionActive(token)) return;

			if (!support?.supported) {
				this.isLoading = false;
				this.isSupported = false;
				this.errorMessage = 'Thiết bị này không hỗ trợ NFC hoặc NFC đang bị tắt.';
				return;
			}

			this.removeNfcReadListener = plugin.onRead((data) => {
				if (!this.isActionActive(token)) return;

				const output = this.normalizeNfcResult(data);
				this.result = output;
				this.isLoading = false;
				this.statusMessage = 'Đã đọc dữ liệu NFC.';

				void this.modalController.dismiss(output, 'confirm');
			});

			this.removeNfcErrorListener = plugin.onError((error) => {
				if (!this.isActionActive(token)) return;

				this.isLoading = false;
				if (this.isCancelError(error)) {
					this.wasCancelled = true;
					this.statusMessage = 'Phiên NFC đã bị hủy. Nhấn "Thử lại" để đọc lại.';
					return;
				}

				this.errorMessage = this.resolveErrorMessage(error, 'Không thể đọc NFC.');
			});

			this.statusMessage = 'Đưa thẻ NFC lại gần thiết bị để đọc dữ liệu.';
			if (Capacitor.getPlatform() !== 'android') {
				await plugin.startScan({ mode: 'auto' });
			}
		} catch (error) {
			if (!this.isActionActive(token)) return;

			this.isLoading = false;
			this.errorMessage = this.resolveErrorMessage(error, 'Không thể khởi động phiên đọc NFC.');
		}
	}

	private async stopReadNfc(): Promise<void> {
		try {
			this.removeNfcReadListener?.();
			this.removeNfcReadListener = undefined;
			this.removeNfcErrorListener?.();
			this.removeNfcErrorListener = undefined;

			if (this.nfcPlugin) {
				await this.nfcPlugin.cancelScan().catch(() => undefined);
			}
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
		if (/permission/i.test(message)) return 'Thiết bị chưa cấp quyền cần thiết.';
		if (/cancelled|canceled/i.test(message)) return fallback;
		if (/not support|unsupported/i.test(message)) return 'Thiết bị không hỗ trợ tính năng này.';
		return message;
	}

	private isCancelError(error: any): boolean {
		const message = `${error?.error || error?.message || error || ''}`.toLowerCase();
		return message.includes('cancelled') || message.includes('canceled') || message.includes('cancel');
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
}
