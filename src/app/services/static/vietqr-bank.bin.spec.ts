import { resolveVietQrBankBin, resolveVietQrBankCodeFromBin, VIETQR_BANK_ID_BY_CODE } from './vietqr-bank.bin';

describe('vietqr-bank.bin', () => {
	it('maps techcombank to NAPAS BIN 970407', () => {
		expect(resolveVietQrBankBin('techcombank')).toBe('970407');
		expect(VIETQR_BANK_ID_BY_CODE.techcombank).toBe('970407');
	});

	it('keeps existing bank bins', () => {
		expect(resolveVietQrBankBin('vcb')).toBe('970436');
		expect(resolveVietQrBankBin('mb')).toBe('970422');
		expect(resolveVietQrBankBin('vietinbank')).toBe('970415');
	});

	it('returns empty for unknown bank', () => {
		expect(resolveVietQrBankBin('unknown')).toBe('');
		expect(resolveVietQrBankBin('')).toBe('');
	});

	it('resolves bank code from BIN', () => {
		expect(resolveVietQrBankCodeFromBin('970407')).toBe('techcombank');
		expect(resolveVietQrBankCodeFromBin('970436')).toBe('vcb');
	});
});
