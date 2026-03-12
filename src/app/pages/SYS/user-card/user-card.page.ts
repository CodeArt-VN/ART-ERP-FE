import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import QRCode from 'qrcode';
import { PageBase } from 'src/app/page-base';
import { ShareModule } from 'src/app/share.module';
import { EnvService } from 'src/app/services/core/env.service';
import { UserCardDetailPage } from '../user-card-detail/user-card-detail.page';
import { UserCardViewerPage } from '../user-card-viewer/user-card-viewer.page';
import { CardItem, CardType, getCardBgUrl, isProfileType, isMemberCardType } from './user-card.model';

type CardFilterMode = 'all' | 'profile' | 'other';

@Component({
	selector: 'app-user-card',
	templateUrl: 'user-card.page.html',
	styleUrls: ['user-card.page.scss'],
	standalone: true,
	imports: [CommonModule, FormsModule, IonicModule, TranslateModule, ShareModule],
})
export class UserCardPage extends PageBase {
	filterMode: CardFilterMode = 'all';
	getCardBgUrl = getCardBgUrl;
	/** Mockup các loại thẻ để review hình nền */
	private mockData: CardItem[] = [
		// { id: 'mock-my-profile', title: 'Danh thiếp cá nhân', type: 'waves', color: 'red', icon: 'person-outline', avatarUrl: 'assets/avartar-empty.jpg', fullName: 'Nguyễn Văn A', email: 'nguyenvana@example.com', qrContent: 'BEGIN:VCARD\nFN:Nguyễn Văn A\nEND:VCARD' },
		// { id: 'mock-profile', title: 'Profile', type: 'profile', color: 'pink', icon: 'person-circle-outline', avatarUrl: 'assets/avartar-empty.jpg', fullName: 'Trần Thị B', email: 'tranthib@example.com', qrContent: 'BEGIN:VCARD\nFN:Trần Thị B\nEND:VCARD' },
		// { id: 'mock-voucher', title: 'Mã giảm giá GEM', type: 'voucher', color: 'purple', icon: 'pricetag-outline', qrContent: 'GEM-2024-SALE20', remark: 'Giảm 20%' },
		// { id: 'mock-voucher', title: 'Cashvoucher 500k', type: 'voucher', color: 'blue', icon: 'pricetag-outline', qrContent: 'GEM-2024-SALE20', remark: 'Giảm 20%' },
		// { id: 'mock-insurance', title: 'Bảo hiểm xe máy', type: 'insurance', color: 'bluegreen', icon: 'shield-outline', qrContent: 'INS-MOTOR-001', remark: 'Bảo hiểm TNDS' },
	]; 
	cards: CardItem[] = [];

	filteredCards: CardItem[] = [];

	constructor(
		public env: EnvService,
		public navCtrl: NavController,
		public modalController: ModalController
	) {
		super();
		this.pageConfig.isDetailPage = true;
	}

	async ionViewWillEnter() {
		await this.buildCards();
		this.applyFilter();
	}

	private async buildCards() {
		const memberCard = this.buildMemberCardFromEnv();
		const profileCard = this.buildProfileCardFromEnv();
		const dynamicCards: CardItem[] = [];
		if (memberCard) dynamicCards.push(memberCard);
		if (profileCard) dynamicCards.push(profileCard);
		this.cards = [...this.mockData, ...dynamicCards];
		await this.generateQrForProfileCards();
	}

	private buildMemberCardFromEnv(): CardItem | null {
		const u = this.env.user;
		if (!u?.Id) return null;
		return {
			id: 'member-card',
			title: 'My membership card',
			type: 'member-card',
			color: 'blue',
			imageUrl: u.Avatar || 'assets/avartar-empty.jpg',
			fullName: u.FullName || u.UserName || '',
			email: u.Email || u.UserName || ''
		};
	}

	private async generateQrForProfileCards() {
		let changed = false;
		for (const card of this.cards) {
			if (card.qrContent && !card.qrUrl && !isMemberCardType(card.type)) {
				try {
					card.qrUrl = await QRCode.toDataURL(card.qrContent, {
						errorCorrectionLevel: 'M',
						width: 160,
						margin: 2,
					});
					changed = true;
				} catch {
					// ignore
				}
			}
		}
		if (changed) this.cards = [...this.cards];
	}

	private buildProfileCardFromEnv(): CardItem | null {
		const u = this.env.user;
		if (!u?.Id) return null;
		return {
			id: 'my-profile',
			title: 'My profile card',
			type: 'my-profile',
			color: 'red',
			//icon: 'grid-outline',
			imageUrl: u.Avatar || 'assets/avartar-empty.jpg',
			fullName: u.FullName || u.UserName || '',
			email: u.Email || u.UserName || '',
			qrContent: this.buildVCard(u),
		};
	}

	private buildVCard(u: { FullName?: string; UserName?: string; Email?: string; PhoneNumber?: string }): string {
		const fn = (u.FullName || u.UserName || '').trim() || 'Contact';
		const parts = fn.split(/\s+/);
		const last = parts.pop() || '';
		const first = parts.join(' ') || fn;
		const lines: string[] = ['BEGIN:VCARD', 'VERSION:3.0', `N:${this.vcardEscape(last)};${this.vcardEscape(first)};;;`, `FN:${this.vcardEscape(fn)}`];
		if (u.PhoneNumber?.trim()) {
			lines.push(`TEL;TYPE=CELL:${this.vcardEscape(u.PhoneNumber.trim())}`);
		}
		if (u.Email?.trim()) {
			lines.push(`EMAIL:${this.vcardEscape(u.Email)}`);
		}
		lines.push('END:VCARD');
		return lines.join('\r\n');
	}

	private vcardEscape(s: string): string {
		return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
	}

	setFilterMode(mode: CardFilterMode) {
		this.filterMode = mode;
		this.applyFilter();
	}

	applyFilter() {
		if (this.filterMode === 'all') {
			this.filteredCards = [...this.cards];
		} else if (this.filterMode === 'profile') {
			this.filteredCards = this.cards.filter((c) => isProfileType(c.type));
		} else {
			this.filteredCards = this.cards.filter((c) => !isProfileType(c.type));
		}
	}

	async addNew() {
		const modal = await this.modalController.create({
			component: UserCardDetailPage,
			componentProps: { id: 0, item: null, isModal: true },
			cssClass: 'modal90vh',
		});
		await modal.present();
		const { data } = await modal.onWillDismiss();
		if (data) {
			this.cards = [...this.cards, { ...data, icon: 'grid-outline' }];
			this.applyFilter();
		}
	}

	async openCardViewer(card: CardItem) {
		const modal = await this.modalController.create({
			component: UserCardViewerPage,
			componentProps: { item: card },
			cssClass: 'modal90vh',
		});
		await modal.present();
		const { data } = await modal.onWillDismiss();
		if (data?.deleted) {
			this.cards = this.cards.filter((c) => c.id !== (data.id || card.id));
			this.applyFilter();
		} else if (data && typeof data === 'object' && !data.deleted) {
			const idx = this.cards.findIndex((c) => c.id === data.id);
			if (idx >= 0) this.cards[idx] = { ...this.cards[idx], ...data };
			this.applyFilter();
		}
	}
}
