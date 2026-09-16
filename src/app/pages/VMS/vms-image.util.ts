export const VMS_AVATAR_FALLBACK = 'assets/avartar-empty.jpg';

export type VmsPersonPhotoIcon = 'person' | 'briefcase' | 'help-circle';

export function vmsFrameUrl(path: string, appDomain: string): string {
	if (!path) return '';
	if (path.indexOf('http') === 0) return path;
	return appDomain.replace(/\/?$/, '/') + path.replace(/^\//, '');
}

export function vmsImageLoadKey(id: string | number | undefined | null, url: string): string {
	return `${id ?? ''}:${url}`;
}

export class VmsImageLoadTracker {
	private readonly failed = new Set<string>();

	isFailed(key: string): boolean {
		return this.failed.has(key);
	}

	markFailed(key: string): void {
		if (key) this.failed.add(key);
	}

	reset(): void {
		this.failed.clear();
	}
}

/** Tracks per-row image URLs that failed to load (show icon / empty thumb instead). */
export class VmsPhotoLoadState {
	constructor(private readonly tracker = new VmsImageLoadTracker()) {}

	reset(): void {
		this.tracker.reset();
	}

	showPhoto(id: string | number | undefined | null, url: string): boolean {
		return !!url && !this.tracker.isFailed(vmsImageLoadKey(id, url));
	}

	onError(id: string | number | undefined | null, url: string): void {
		this.tracker.markFailed(vmsImageLoadKey(id, url));
	}
}

export function vmsPersonPhotoIcon(person: any, mapped = true): VmsPersonPhotoIcon {
	if (!mapped) return 'help-circle';
	return person?.IsStaff || person?.PersonType === 'staff' ? 'person' : 'briefcase';
}

export function vmsApplyAvatarFallback(event: Event): void {
	const img = event.target as HTMLImageElement | null;
	if (!img) return;
	if (img.src.endsWith(VMS_AVATAR_FALLBACK) || img.src.includes('/avartar-empty.jpg')) return;
	img.src = VMS_AVATAR_FALLBACK;
}
