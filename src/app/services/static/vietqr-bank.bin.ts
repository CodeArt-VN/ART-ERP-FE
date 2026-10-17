/** NAPAS BIN map for VietQR. Keys match BKIncomingDefaultBankName.Code. */
export const VIETQR_BANK_ID_BY_CODE: Record<string, string> = {
	vcb: '970436',
	mb: '970422',
	vietinbank: '970415',
	techcombank: '970407',
};

export function resolveVietQrBankBin(bankCode: string): string {
	if (!bankCode) return '';
	return VIETQR_BANK_ID_BY_CODE[bankCode] || '';
}

export function resolveVietQrBankCodeFromBin(bin: string): string {
	if (!bin) return '';
	return Object.keys(VIETQR_BANK_ID_BY_CODE).find((key) => VIETQR_BANK_ID_BY_CODE[key] === bin) || '';
}
