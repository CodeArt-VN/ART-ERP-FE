import { setOverlayMenuEnabled } from './menu-overlay.util';

describe('setOverlayMenuEnabled', () => {
	it('closes then disables when enabled is false', async () => {
		const calls: string[] = [];
		const menu = {
			enable: jasmine.createSpy('enable').and.callFake(async (enabled: boolean, menuId?: string) => {
				calls.push(`enable:${enabled}:${menuId}`);
				return true;
			}),
			close: jasmine.createSpy('close').and.callFake(async (menuId?: string) => {
				calls.push(`close:${menuId}`);
				return true;
			}),
		};

		await setOverlayMenuEnabled(menu, 'appHelpDetail', false);

		expect(calls).toEqual(['close:appHelpDetail', 'enable:false:appHelpDetail']);
	});

	it('enables without closing when enabled is true', async () => {
		const menu = {
			enable: jasmine.createSpy('enable').and.resolveTo(true),
			close: jasmine.createSpy('close').and.resolveTo(true),
		};

		await setOverlayMenuEnabled(menu, 'appHelpDetail', true);

		expect(menu.close).not.toHaveBeenCalled();
		expect(menu.enable).toHaveBeenCalledOnceWith(true, 'appHelpDetail');
	});
});
