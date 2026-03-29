import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { IonicModule, ModalController, NavController, NavParams } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import QRCode from 'qrcode';
import { PageBase } from 'src/app/page-base';
import { ShareModule } from 'src/app/share.module';
import { EnvService } from 'src/app/services/core/env.service';
import { CardItem, getCardBgUrl, isProfileType, isMemberCardType } from '../user-card/user-card.model';

@Component({
	selector: 'app-user-card-viewer',
	templateUrl: 'user-card-viewer.page.html',
	styleUrls: ['user-card-viewer.page.scss'],
	standalone: true,
	imports: [CommonModule, IonicModule, TranslateModule, ShareModule],
})
export class UserCardViewerPage extends PageBase implements OnDestroy {
	@ViewChild('cardContainer') cardContainer?: ElementRef<HTMLElement>;
	card: CardItem | null = null;
	displayQrUrl = '';
	isProfileType = isProfileType;
	isMemberCardType = isMemberCardType;
	getCardBgUrl = getCardBgUrl;
	countdownSeconds = 0;
	private readonly STAFF_POS_TIMEOUT = 30;
	private countdownInterval: ReturnType<typeof setInterval> | null = null;

	constructor(
		public env: EnvService,
		public navCtrl: NavController,
		public modalController: ModalController,
		public navParams: NavParams
	) {
		super();
		this.pageConfig.isDetailPage = true;
	}

	async ionViewWillEnter() {
		this.card = this.navParams?.data?.item ?? null;
		if (this.card) {
			await this.initDisplayQr();
			if (isMemberCardType(this.card.type)) {
				this.countdownSeconds = this.STAFF_POS_TIMEOUT;
				this.startCountdown();
			}
		}
	}

	ngOnDestroy() {
		this.stopCountdown();
	}

	private startCountdown() {
		this.stopCountdown();
		this.countdownInterval = setInterval(() => {
			if (this.countdownSeconds > 1) {
				this.countdownSeconds -= 1;
				return;
			}
			this.countdownSeconds = this.STAFF_POS_TIMEOUT;
			this.initDisplayQr();
		}, 1000);
	}

	private stopCountdown() {
		if (!this.countdownInterval) return;
		clearInterval(this.countdownInterval);
		this.countdownInterval = null;
	}

	async initDisplayQr() {
		const c = this.card;
		if (!c) return;
		let qrContent = c.qrContent ?? c.title ?? c.subtitle ?? '';
		if (isMemberCardType(c.type)) {
			qrContent = this.getMemberCardQrContent();
		}
		const hasRealQr = !isMemberCardType(c.type) && c.qrUrl && !c.qrUrl.includes('avartar-empty') && !c.qrUrl.includes('avartar');
		if (hasRealQr) {
			this.displayQrUrl = c.qrUrl!;
			return;
		}
		if (qrContent) {
			try {
				this.displayQrUrl = await QRCode.toDataURL(qrContent, {
					errorCorrectionLevel: 'M',
					width: 400,
					margin: 2,
				});
			} catch {
				this.displayQrUrl = c.qrUrl ?? '';
			}
		} else {
			this.displayQrUrl = c.qrUrl ?? '';
		}
	}

	/** member-card: payload giống qr-wallet, mã hóa base64 trước khi tạo QR */
	private getMemberCardQrContent(): string {
		const u = this.env.user || {};
		const payload = {
			StaffId: Number(u.StaffID || 0),
			BusinessPartnerId: Number(u.IDBusinessPartner || 0),
			Timespan: Date.now(),
		};
		return 'SMC:' + btoa(JSON.stringify(payload));
	}

	async closeModal() {
		try {
			if (this.modalController) {
				await this.modalController.dismiss(this.card);
			} else {
				this.navCtrl.back();
			}
		} catch {
			this.navCtrl.back();
		}
	}

	formatQrContent(content: string): string {
		const text = String(content ?? '').trim();
		if (!text) return '';
		const looksLikeJson = (text.startsWith('{') && text.endsWith('}')) || (text.startsWith('[') && text.endsWith(']'));
		if (!looksLikeJson) return content;
		try {
			return JSON.stringify(JSON.parse(text), null, 2);
		} catch {
			return content;
		}
	}

	async copyQrContent() {
		const content = this.card?.qrContent ?? '';
		if (!content.trim()) {
			this.env.showMessage('No content to copy', 'warning');
			return;
		}
		try {
			await navigator.clipboard.writeText(content);
			this.env.showMessage('Copied', 'success');
		} catch {
			this.env.showMessage('Cannot copy', 'danger');
		}
	}

	async shareCard() {
		const c = this.card;
		if (!c) return;
		const shareText = c.qrContent ?? c.title ?? c.fullName ?? c.subtitle ?? '';
		const qrUrl = this.displayQrUrl || c.qrUrl;

		try {
			const nav = navigator as Navigator & { share?: (data: ShareData) => Promise<void>; canShare?: (data: ShareData) => boolean };
			if (!nav.share) {
				if (shareText) {
					await navigator.clipboard?.writeText(shareText);
					this.env.showMessage('Copied', 'success');
				} else {
					this.env.showMessage('No content to share', 'warning');
				}
				return;
			}

			let file: File | null = null;
			const dataUrl = await this.renderCardToCanvas();
			if (dataUrl) {
				const blob = await this.dataUrlToBlob(dataUrl);
				if (blob) file = new File([blob], `card-${c.id ?? 'card'}.png`, { type: 'image/png' });
			}
			if (!file && qrUrl) {
				file = await this.dataUrlToFile(qrUrl, `card-${c.id ?? 'card'}.webp`);
			}

			if (file) {
				const fileShareData: ShareData = { title: c.title, text: shareText, files: [file] };
				if (!nav.canShare || nav.canShare(fileShareData)) {
					await nav.share(fileShareData);
					return;
				}
			}

			if (shareText) {
				await nav.share({ title: c.title, text: shareText });
			} else {
				this.env.showMessage('No content to share', 'warning');
			}
		} catch (err) {
			if ((err as Error)?.name !== 'AbortError') {
				this.env.showMessage('Cannot share', 'danger');
			}
		}
	}

	/** Vẽ thẻ lên canvas, trả về data URL PNG. */
	private async renderCardToCanvas(): Promise<string | null> {
		const c = this.card;
		if (!c || !this.displayQrUrl) return null;

		await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
		const ionCard = this.cardContainer?.nativeElement?.querySelector?.('ion-card') as HTMLElement | null;
		const doc = document.documentElement;
		let colorRgb = ionCard ? getComputedStyle(ionCard).getPropertyValue('--card-color-rgb').trim() : '';
		if (!colorRgb || colorRgb.startsWith('var(')) {
			const colorKey = `--ion-color-${c.color || 'primary'}-rgb`;
			colorRgb = getComputedStyle(doc).getPropertyValue(colorKey).trim() || '0, 0, 0';
		}
		const lightRgb = getComputedStyle(doc).getPropertyValue('--ion-color-light-rgb').trim() || '244, 245, 248';
		const [lr, lg, lb] = lightRgb.split(',').map((x) => parseInt(x.trim(), 10) || 0);
		const [r, g, b] = colorRgb.split(',').map((x) => parseInt(x.trim(), 10) || 0);

		const W = 360;
		const H = 480;
		const PAD = 16;
		const canvas = document.createElement('canvas');
		canvas.width = W * 2;
		canvas.height = H * 2;
		const ctx = canvas.getContext('2d');
		if (!ctx) return null;

		ctx.scale(2, 2);

		// 0. Nền primary bên dưới (trên màn hình gradient 0.5 opacity blend với nền tối → trái sáng hơn nhưng vẫn đỏ; nền trắng làm trái quá trắng)
		ctx.fillStyle = `rgb(${r},${g},${b})`;
		ctx.fillRect(0, 0, W, H);

		// 1. Gradient nền (giống CSS: light 0.5 opacity trái → primary 1 phải)
		const grad = ctx.createLinearGradient(0, 0, W, 0);
		grad.addColorStop(0, `rgba(${lr},${lg},${lb},0.5)`);
		grad.addColorStop(1, `rgba(${r},${g},${b},1)`);
		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, W, H);

		// 2. Hình nền SVG (right bottom)
		const bgUrl = getCardBgUrl(c);
		const bgPath = bgUrl
			.replace(/^url\(["']?/, '')
			.replace(/["']?\)$/, '')
			.trim();
		if (bgPath) {
			const bgSrc = bgPath.startsWith('/') ? location.origin + bgPath : bgPath;
			const bgImg = await this.loadImage(bgSrc);
			if (bgImg) {
				const bw = bgImg.naturalWidth || 608;
				const bh = bgImg.naturalHeight || 246;
				const scale = W / bw;
				const drawH = bh * scale;
				const drawW = W;
				ctx.drawImage(bgImg, W - drawW, H - drawH, drawW, drawH);
			}
		}

		const isProfile = isProfileType(c.type) || isMemberCardType(c.type);

		// QR layout (không có header)
		const qrSize = Math.min(280, W - PAD * 2);
		const qrX = (W - qrSize) / 2;
		const qrY = PAD + 32;
		const qrPadding = 12;
		const qrRadius = 12;
		const qrBoxW = qrSize + qrPadding * 2;
		const qrBoxH = qrSize + qrPadding * 2;
		const qrBoxX = qrX - qrPadding;
		const qrBoxY = qrY - qrPadding;

		// QR (border-radius 12px giống CSS)
		ctx.fillStyle = '#fff';
		this.roundRect(ctx, qrBoxX, qrBoxY, qrBoxW, qrBoxH, qrRadius);
		ctx.fill();
		try {
			const qrImg = await this.loadImage(this.displayQrUrl);
			if (qrImg) {
				ctx.save();
				this.roundRect(ctx, qrBoxX, qrBoxY, qrBoxW, qrBoxH, qrRadius);
				ctx.clip();
				ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
				ctx.restore();
			}
		} catch {
			// skip
		}

		// Countdown badge
		if (isMemberCardType(c.type) && this.countdownSeconds > 0) {
			ctx.fillStyle = 'rgba(0,0,0,0.6)';
			ctx.fillRect((W - 60) / 2, qrY + qrSize + 8, 60, 28);
			ctx.fillStyle = '#fff';
			ctx.font = '600 14px system-ui, sans-serif';
			ctx.textAlign = 'center';
			ctx.fillText(`${this.countdownSeconds}s`, W / 2, qrY + qrSize + 22);
			ctx.textAlign = 'left';
		}

		// Footer
		const footerY = H - PAD - 40;
		ctx.fillStyle = '#fff';
		ctx.font = '600 16px system-ui, sans-serif';
		ctx.textAlign = 'center';
		ctx.fillText(isProfile ? c.fullName || c.subtitle || '' : c.title || '', W / 2, footerY);
		ctx.font = '14px system-ui, sans-serif';
		ctx.fillText(isProfile ? c.email || '' : c.remark || '', W / 2, footerY + 20);
		ctx.textAlign = 'left';

		return canvas.toDataURL('image/png');
	}

	private roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
		ctx.beginPath();
		ctx.moveTo(x + r, y);
		ctx.lineTo(x + w - r, y);
		ctx.quadraticCurveTo(x + w, y, x + w, y + r);
		ctx.lineTo(x + w, y + h - r);
		ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
		ctx.lineTo(x + r, y + h);
		ctx.quadraticCurveTo(x, y + h, x, y + h - r);
		ctx.lineTo(x, y + r);
		ctx.quadraticCurveTo(x, y, x + r, y);
		ctx.closePath();
	}

	private loadImage(src: string): Promise<HTMLImageElement | null> {
		return new Promise((resolve) => {
			const img = new Image();
			const fullSrc = src.startsWith('/') && !src.startsWith('//') ? location.origin + src : src;
			const isSameOrigin =
				fullSrc.startsWith('data:') || fullSrc.startsWith('blob:') || fullSrc.startsWith(location.origin) || (fullSrc.startsWith('/') && !fullSrc.startsWith('//'));
			if (!isSameOrigin) img.crossOrigin = 'anonymous';
			img.onload = () => resolve(img);
			img.onerror = () => resolve(null);
			img.src = fullSrc;
		});
	}

	private async dataUrlToBlob(dataUrl: string): Promise<Blob | null> {
		const res = await fetch(dataUrl);
		return res.blob();
	}

	private async dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
		const blob = await this.dataUrlToBlob(dataUrl);
		return new File([blob ?? new Blob()], fileName, { type: blob?.type || 'image/webp' });
	}

	async saveCard() {
		const c = this.card;
		if (!c) return;
		const dataUrl = await this.renderCardToCanvas();
		if (dataUrl) {
			const link = document.createElement('a');
			link.href = dataUrl;
			link.download = `card-${c.id ?? 'card'}-${Date.now()}.png`;
			document.body.appendChild(link);
			link.click();
			link.remove();
			this.env.showMessage('Saved', 'success');
			return;
		}
		const qrToSave = this.displayQrUrl || c.qrUrl;
		if (!qrToSave) {
			this.env.showMessage('No QR to save', 'warning');
			return;
		}
		const link = document.createElement('a');
		link.href = qrToSave;
		link.download = `card-${c.id ?? 'card'}-${Date.now()}.png`;
		document.body.appendChild(link);
		link.click();
		link.remove();
		this.env.showMessage('Saved', 'success');
	}
}
