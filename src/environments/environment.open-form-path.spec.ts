import { isOpenFormPath } from './environment';

describe('isOpenFormPath', () => {
	it('allows ui-kit', () => {
		expect(isOpenFormPath('/ui-kit')).toBe(true);
		expect(isOpenFormPath('ui-kit')).toBe(true);
		expect(isOpenFormPath('/ui-kit?x=1')).toBe(true);
	});

	it('rejects normal form paths', () => {
		expect(isOpenFormPath('/inventory-balance')).toBe(false);
		expect(isOpenFormPath('/sale-order')).toBe(false);
		expect(isOpenFormPath('/sale-mockup-saleman')).toBe(false);
	});

	it('treats empty as open', () => {
		expect(isOpenFormPath('')).toBe(true);
		expect(isOpenFormPath(null)).toBe(true);
	});
});
