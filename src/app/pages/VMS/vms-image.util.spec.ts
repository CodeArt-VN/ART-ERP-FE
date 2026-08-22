import {
	VMS_AVATAR_FALLBACK,
	VmsImageLoadTracker,
	VmsPhotoLoadState,
	vmsApplyAvatarFallback,
	vmsFrameUrl,
	vmsImageLoadKey,
	vmsPersonPhotoIcon,
} from './vms-image.util';

describe('vms-image.util', () => {
	it('builds frame URLs from app domain', () => {
		expect(vmsFrameUrl('', 'https://erp.test/')).toBe('');
		expect(vmsFrameUrl('https://cdn/a.jpg', 'https://erp.test/')).toBe('https://cdn/a.jpg');
		expect(vmsFrameUrl('/frames/a.jpg', 'https://erp.test')).toBe('https://erp.test/frames/a.jpg');
	});

	it('tracks failed image loads by id and url', () => {
		const tracker = new VmsImageLoadTracker();
		const key = vmsImageLoadKey('p:1', 'https://erp.test/a.jpg');
		expect(tracker.isFailed(key)).toBeFalse();
		tracker.markFailed(key);
		expect(tracker.isFailed(key)).toBeTrue();
		tracker.reset();
		expect(tracker.isFailed(key)).toBeFalse();
	});

	it('hides photos after load error', () => {
		const state = new VmsPhotoLoadState();
		const url = 'https://erp.test/a.jpg';
		expect(state.showPhoto('p:1', url)).toBeTrue();
		state.onError('p:1', url);
		expect(state.showPhoto('p:1', url)).toBeFalse();
	});

	it('maps person photo icons by mapping and staff flag', () => {
		expect(vmsPersonPhotoIcon({ IsStaff: true }, true)).toBe('person');
		expect(vmsPersonPhotoIcon({ PersonType: 'guest' }, true)).toBe('briefcase');
		expect(vmsPersonPhotoIcon({}, false)).toBe('help-circle');
	});

	it('applies avatar fallback once on img error', () => {
		const img = { src: 'https://erp.test/broken.jpg' } as HTMLImageElement;
		vmsApplyAvatarFallback({ target: img } as unknown as Event);
		expect(img.src).toBe(VMS_AVATAR_FALLBACK);
		vmsApplyAvatarFallback({ target: img } as unknown as Event);
		expect(img.src).toBe(VMS_AVATAR_FALLBACK);
	});
});
