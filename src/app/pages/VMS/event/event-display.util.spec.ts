import {
	eventPersonLabel,
	eventPhotoPath,
	eventCameraLabel,
	eventEdgeLabel,
	buildEdgeNameLookup,
	isUuidLike,
} from './event-display.util';

describe('eventPersonLabel / eventPhotoPath', () => {
	it('prefers display name then employee code; never UUID', () => {
		expect(eventPersonLabel({ DisplayName: 'Hương' })).toBe('Hương');
		expect(eventPersonLabel({ PersonId: 'guest-1' })).toBe('Unknown');
		expect(eventPersonLabel({} as any)).toBe('Unknown');
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
		expect(eventEdgeLabel({ EdgeNodeName: 'EDGE-NAS-16', EdgeNodeUUID: uuid })).toBe('EDGE-NAS-16');
		expect(eventEdgeLabel({ EdgeNodeUUID: uuid }, buildEdgeNameLookup([{ UUID: uuid, Name: 'EDGE-NAS-16' }]))).toBe('EDGE-NAS-16');
		expect(eventEdgeLabel({ EdgeNodeUUID: uuid })).toBe('');
		expect(isUuidLike(uuid)).toBeTrue();
	});

	it('prefers camera name then camera id', () => {
		expect(eventCameraLabel({ CameraName: 'Lobby', CameraId: 'CAM-01' })).toBe('Lobby');
		expect(eventCameraLabel({ CameraId: 'CAM-01' })).toBe('CAM-01');
	});
});
