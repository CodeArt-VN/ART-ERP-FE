import {
	eventPersonLabel,
	eventPhotoPath,
	eventCameraLabel,
	eventEdgeLabel,
	buildEdgeNameLookup,
	isUuidLike,
	eventStatusKind,
	eventStatusLabel,
	eventStatusVisible,
	eventTypeKind,
	eventTypeLabel,
	eventTypeBadgeColor,
	eventStatusBadgeColor,
} from './event-display.util';

describe('eventStatusVisible', () => {
	it('hides status for face.seen', () => {
		expect(eventStatusVisible('face.seen')).toBe(false);
	});

	it('shows status for attendance events', () => {
		expect(eventStatusVisible('attendance.check_in')).toBe(true);
		expect(eventStatusVisible('attendance.pending_review')).toBe(true);
	});

	it('hides status when type is missing', () => {
		expect(eventStatusVisible(null)).toBe(false);
		expect(eventStatusVisible('')).toBe(false);
	});
});

describe('eventTypeKind / eventTypeLabel', () => {
	it('maps known types to pills', () => {
		expect(eventTypeKind('face.seen')).toBe('face');
		expect(eventTypeLabel('face.seen')).toBe('Face seen');
		expect(eventTypeKind('attendance.check_in')).toBe('checkin');
		expect(eventTypeLabel('attendance.check_in')).toBe('Check-in');
		expect(eventTypeKind('attendance.check_out')).toBe('checkout');
		expect(eventTypeLabel('attendance.check_out')).toBe('Check-out');
		expect(eventTypeKind('attendance.pending_review')).toBe('pending');
		expect(eventTypeLabel('attendance.pending_review')).toBe('Pending');
		expect(eventTypeKind('guest')).toBe('guest');
		expect(eventTypeLabel('guest')).toBe('Guest');
	});

	it('falls back when type is empty', () => {
		expect(eventTypeKind(null)).toBe('other');
		expect(eventTypeLabel('')).toBe('—');
	});
});

describe('eventStatusKind / eventStatusLabel', () => {
	it('maps review statuses', () => {
		expect(eventStatusKind('Accepted')).toBe('ok');
		expect(eventStatusLabel('Accepted')).toBe('Accepted');
		expect(eventStatusKind('Rejected')).toBe('no');
		expect(eventStatusLabel('Rejected')).toBe('Rejected');
		expect(eventStatusKind('PendingReview')).toBe('wait');
		expect(eventStatusLabel('PendingReview')).toBe('Pending');
	});
});

describe('eventTypeBadgeColor / eventStatusBadgeColor', () => {
	it('maps kinds to ion-badge colors', () => {
		expect(eventTypeBadgeColor('face.seen')).toBe('primary');
		expect(eventTypeBadgeColor('attendance.check_in')).toBe('success');
		expect(eventTypeBadgeColor('attendance.check_out')).toBe('warning');
		expect(eventTypeBadgeColor('attendance.pending_review')).toBe('danger');
		expect(eventTypeBadgeColor('guest')).toBe('tertiary');
		expect(eventStatusBadgeColor('Accepted')).toBe('success');
		expect(eventStatusBadgeColor('Rejected')).toBe('danger');
		expect(eventStatusBadgeColor('PendingReview')).toBe('warning');
	});
});

describe('eventPersonLabel / eventPhotoPath', () => {
	it('prefers display name then employee code; never UUID', () => {
		expect(eventPersonLabel({ DisplayName: 'Hương' })).toBe('Hương');
		expect(eventPersonLabel({ PersonId: 'guest-1' })).toBe('Unknown');
		expect(eventPersonLabel({} as any)).toBe('Unknown');
		expect(eventPersonLabel({ Name: 'stale', PersonId: 'x' } as any)).toBe('Unknown');
	});

	it('prefers frame path then photo path', () => {
		expect(eventPhotoPath({ FramePath: '/a.jpg', PhotoPath: '/b.jpg' })).toBe('/a.jpg');
		expect(eventPhotoPath({ PhotoPath: '/b.jpg' })).toBe('/b.jpg');
		expect(eventPhotoPath({})).toBe('');
	});
});

describe('eventEdgeLabel / eventCameraLabel', () => {
	it('prefers edge name over uuid id', () => {
		const uuid = 'a1111111-1111-4111-8111-111111111111';
		expect(eventEdgeLabel({ EdgeNodeName: 'EDGE-NAS-16', EdgeNodeId: uuid })).toBe('EDGE-NAS-16');
		expect(eventEdgeLabel({ EdgeNodeId: uuid }, buildEdgeNameLookup([{ UUID: uuid, Name: 'EDGE-NAS-16' }]))).toBe('EDGE-NAS-16');
		expect(eventEdgeLabel({ EdgeNodeId: uuid }, new Map([[uuid, 'EDGE-NAS-16']]))).toBe('EDGE-NAS-16');
		expect(eventEdgeLabel({ EdgeNodeId: uuid })).toBe('');
		expect(isUuidLike(uuid)).toBeTrue();
	});

	it('builds lookup from edge UUID and legacy ids', () => {
		const uuid = 'b2222222-2222-4222-8222-222222222222';
		const map = buildEdgeNameLookup([
			{ UUID: uuid, Name: 'EDGE-NAS-16' },
			{ EdgeNodeId: 'legacy-edge', Name: 'Legacy Edge' },
		]);
		expect(map.get(uuid)).toBe('EDGE-NAS-16');
		expect(map.get('legacy-edge')).toBe('Legacy Edge');
	});

	it('prefers camera name then camera id', () => {
		expect(eventCameraLabel({ CameraName: 'Lobby', CameraId: 'CAM-01' })).toBe('Lobby');
		expect(eventCameraLabel({ CameraId: 'CAM-01' })).toBe('CAM-01');
	});
});
