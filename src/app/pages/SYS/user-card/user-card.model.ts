/**
 * Loại thẻ - có thể mở rộng thêm
 * - my-profile: profile cá nhân của user
 * - profile: profile của người khác
 * - member-card: thẻ thành viên, QR content tự đổi mỗi 30s
 * - voucher: voucher, ...
 */
export type CardType = 'my-profile' | 'profile' | 'member-card' | 'voucher' | (string & {});

export interface CardItem {
	id: string;
	type: CardType;
	title: string;
	subtitle?: string;

	color: string;
	icon?: string;
	imageUrl?: string;
	

	qrUrl?: string;
	qrContent?: string;
	remark?: string;

	avatarUrl?: string;
	fullName?: string;
	email?: string;

	/** URL hình nền - upload hoặc từ API, ưu tiên hơn map tĩnh */
	bgUrl?: string;
}

/** Map type -> đường dẫn file tĩnh. Fallback: bg-layers.svg */
const CARD_BG_MAP: Record<string, string> = {
	//'my-profile': '/assets/bg-layers-profile.svg',
	'profile': '/assets/bg-layers-profile.svg',
	'member-card': '/assets/bg-layers-member-card.svg',
	'voucher': '/assets/bg-layers-voucher.svg',
	'insurance': '/assets/bg-layers-insurance.svg',
	'waves': '/assets/bg-layers-waves.svg',
};
const DEFAULT_BG = '/assets/bg-layers.svg';

/** Trả về full url CSS cho background. Ưu tiên card.bgUrl. */
export function getCardBgUrl(card: CardItem | null): string {
	if (!card) return `url(${DEFAULT_BG})`;
	if (card.bgUrl) return card.bgUrl.startsWith('url(') ? card.bgUrl : `url(${card.bgUrl})`;
	const path = card.type ? (CARD_BG_MAP[card.type] ?? DEFAULT_BG) : DEFAULT_BG;
	return `url(${path})`;
}

/** Layout profile (avatar + subtitle) */
export function isProfileType(type: CardType): boolean {
	return type === 'my-profile' || type === 'profile';
}

/** Thẻ member-card: QR content thay đổi theo timespan mỗi 30s */
export function isMemberCardType(type: CardType): boolean {
	return type === 'member-card';
}

