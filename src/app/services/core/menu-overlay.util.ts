/**
 * Keep an Ionic overlay menu in sync with app visibility.
 * Hiding with [hidden] alone still lets MenuController open it and lock body scroll.
 */
export async function setOverlayMenuEnabled(
	menu: { enable: (enabled: boolean, menuId?: string) => Promise<unknown>; close: (menuId?: string) => Promise<unknown> },
	menuId: string,
	enabled: boolean
): Promise<void> {
	if (!enabled) {
		await menu.close(menuId);
	}
	await menu.enable(enabled, menuId);
}
