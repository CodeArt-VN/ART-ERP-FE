import { liveSnapshotErrorMessage } from './vms-live.util';

describe('vms-live.util', () => {
	it('maps HTTP status to live snapshot messages', () => {
		const msg = liveSnapshotErrorMessage({ status: 417 });
		expect(msg).toBe('Cannot get live image. Reload the page and try again.');
	});

	it('covers auth and fallback', () => {
		expect(liveSnapshotErrorMessage({ status: 401 })).toContain('sign in');
		expect(liveSnapshotErrorMessage({})).toBe('Cannot get live image.');
	});
});
