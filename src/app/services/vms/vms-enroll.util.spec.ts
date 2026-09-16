import { buildEnrollImageFormData, mapAssignEventResponse, resolveHqFrameUrl } from './vms-enroll.util';

describe('vms-enroll.util', () => {
	it('builds Edge enroll FormData with file field', () => {
		const blob = new Blob(['x'], { type: 'image/jpeg' });
		const fd = buildEnrollImageFormData({
			file: blob,
			fileName: 'face.jpg',
			personId: 'p-1',
			personType: 'staff',
			displayName: 'A',
			idStaff: 3,
		});
		expect(fd.get('person_id')).toBe('p-1');
		expect(fd.get('person_type')).toBe('staff');
		expect(fd.get('id_staff')).toBe('3');
		expect(fd.get('id_contact')).toBeNull();
		expect(fd.get('file')).toBeTruthy();
		expect(fd.get('image')).toBeNull();
	});

	it('resolves HQ frame URL from relative path', () => {
		expect(resolveHqFrameUrl('/Uploads/a.jpg', 'http://hq/')).toBe('http://hq/Uploads/a.jpg');
		expect(resolveHqFrameUrl('https://cdn/x.jpg', 'http://hq/')).toBe('https://cdn/x.jpg');
	});

	it('maps AssignFromEvent response without extra FE round-trips', () => {
		const rs = mapAssignEventResponse(
			{ person_id: 'abc', id: 42, merged: true, enrolled: 2, display_name: 'Hương' },
			'fallback'
		);
		expect(rs).toEqual({
			personId: 'abc',
			displayName: 'Hương',
			id: 42,
			merged: true,
			enrolled: 2,
			edgeError: undefined,
		});
		expect(mapAssignEventResponse(null, 'X', 'old').personId).toBe('old');
		expect(mapAssignEventResponse(null, 'X', 'old').displayName).toBe('X');
	});
});
