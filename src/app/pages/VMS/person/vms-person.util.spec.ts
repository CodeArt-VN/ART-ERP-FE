import { personActionLabel, identityIsDisabled, personHasEmbedding } from './vms-person.util';

describe('vms-person util', () => {
	it('detects disabled identity from common truthy values', () => {
		expect(identityIsDisabled({ IsDisabled: true })).toBeTrue();
		expect(identityIsDisabled({ IsDisabled: 1 })).toBeTrue();
		expect(identityIsDisabled({ disabled: 'true' })).toBeTrue();
	});

	it('detects enabled identity from common falsy values', () => {
		expect(identityIsDisabled({ IsDisabled: false })).toBeFalse();
		expect(identityIsDisabled({ IsDisabled: 0 })).toBeFalse();
		expect(identityIsDisabled({})).toBeFalse();
	});

	it('returns the correct action label for the person modal', () => {
		expect(personActionLabel({ IsDisabled: true })).toBe('Resume recognition');
		expect(personActionLabel({ IsDisabled: false })).toBe('Stop recognition');
	});

	it('detects HasEmbedding for Edge-ready badge', () => {
		expect(personHasEmbedding({ HasEmbedding: true })).toBeTrue();
		expect(personHasEmbedding({ HasEmbedding: 1 })).toBeTrue();
		expect(personHasEmbedding({ Recognition: { HasEmbedding: true } })).toBeTrue();
		expect(personHasEmbedding({})).toBeFalse();
	});
});
import { canConfirmPersonMerge, faceOverlay, personAllSelected, personApplyShiftSelect, personAssignEventId, personAssignEventNumericId, personDeleteTargets, personEventGuidIds, personEventIdsToHide, personEventNumericId, personFilterByPersonIds, personIdentityNumericIds, personItemKey, personMappedGuests, personMappedSelected, personMappedStaff, personMergeIncomingItems, personMergeSources, personMergeTargetDefault, personNeedsMapping, personRebindSelection, personShiftRange, personSplitPersonIds, personToggleSelectAll, personVisibleRows, identityFaceContext, identityIsStaff, identityNeedsBpMapping, mergeNamedPersons, namedPersonsByIsStaff, personDisplayName, personFromContact, personOverlay, unmappedFaceOverlay, unnamedFaceEvents } from './vms-person.util';

describe('vms-person.util', () => {
	it('keeps only unnamed faces that have a frame', () => {
		const rows = [
			{ PersonId: null, FramePath: '/a.jpg' },
			{ PersonId: 'staff-1', FramePath: '/b.jpg' },
			{ PersonId: null, FramePath: '' },
			{ EventId: 'x', FramePath: '/c.jpg' },
			{ EventId: 'gone', FramePath: '/d.jpg', IsDeleted: true },
		];
		expect(unnamedFaceEvents(rows).map((e) => e.FramePath)).toEqual(['/a.jpg', '/c.jpg']);
	});

	it('classifies staff from IsStaff, with PersonType fallback', () => {
		expect(identityIsStaff({ IsStaff: true })).toBe(true);
		expect(identityIsStaff({ IsStaff: false, PersonType: 'staff' })).toBe(false);
		expect(identityIsStaff({ PersonType: 'staff' })).toBe(true);
		expect(identityIsStaff({ PersonType: 'guest' })).toBe(false);
	});

	it('splits named persons by IsStaff including identities without photo', () => {
		const identities = [
			{ IsStaff: true, IsDisabled: false, DisplayName: 'A', PhotoPath: '/a.jpg' },
			{ IsStaff: true, IsDisabled: true, DisplayName: 'B', PhotoPath: '/b.jpg' },
			{ IsStaff: false, IsDisabled: false, DisplayName: 'C', PhotoPath: '/c.jpg' },
			{ PersonType: 'staff', IsDisabled: false, DisplayName: 'D', PhotoPath: '/d.jpg' },
			{ IsStaff: false, DisplayName: 'Empty' },
		];
		expect(namedPersonsByIsStaff(identities, true).map((p) => p.DisplayName)).toEqual(['A', 'B', 'D']);
		expect(namedPersonsByIsStaff(identities, false).map((p) => p.DisplayName)).toEqual(['C', 'Empty']);
	});

	it('builds face overlay from edge, camera and time, skips empty events', () => {
		expect(faceOverlay({})).toBeNull();
		expect(faceOverlay({ CameraId: 'cam-1', OccurredAt: '2026-08-18T16:41:00' })).toEqual({
			edge: '',
			camera: 'cam-1',
			time: '2026-08-18T16:41:00',
		});
		expect(faceOverlay({ EdgeNodeName: 'EDGE-NAS-16', CameraId: 'TEST-CLIP', OccurredAt: 't' })).toEqual({
			edge: 'EDGE-NAS-16',
			camera: 'TEST-CLIP',
			time: 't',
		});
		expect(faceOverlay({ camera_id: ' lobby ', occurred_at: 't' })).toEqual({ edge: '', camera: 'lobby', time: 't' });
	});

	it('builds person overlay from code and name', () => {
		expect(personOverlay({})).toBeNull();
		expect(personOverlay({ NeedsBpMapping: true, EmployeeCode: 'S3100030', DisplayName: 'Tạ Đức Hương' })).toBeNull();
		expect(personOverlay({ IDContact: 9, EmployeeCode: 'S3100030', DisplayName: 'Tạ Đức Hương' })).toEqual({
			code: 'S3100030',
			name: 'Tạ Đức Hương',
		});
		expect(personOverlay({ IDContact: 1, Code: 'KH01', Name: 'Khách' })).toEqual({ code: 'KH01', name: 'Khách' });
	});

	it('personDisplayName never falls back to UUID', () => {
		expect(personDisplayName({ DisplayName: 'Hương' })).toBe('Hương');
		expect(personDisplayName({ EmployeeCode: 'S1', PersonId: 'uuid-long' })).toBe('S1');
		expect(personDisplayName({ PersonId: '3f374332-06da-46be-b66b-3c743280eda4' })).toBe('Unknown');
		expect(personDisplayName(null)).toBe('Unknown');
	});

	it('builds unmapped face overlay from latest event context', () => {
		expect(identityFaceContext({ LatestCameraId: 'TEST-CLIP', LatestOccurredAt: '2026-08-20T10:00:00', LatestEdgeNodeName: 'EDGE-NAS-16' })).toEqual({
			EdgeNodeName: 'EDGE-NAS-16',
			EdgeNodeId: undefined,
			CameraId: 'TEST-CLIP',
			OccurredAt: '2026-08-20T10:00:00',
		});
		expect(unmappedFaceOverlay({ LatestCameraId: 'TEST-CLIP', LatestOccurredAt: '2026-08-20T10:00:00', LatestEdgeNodeName: 'EDGE-NAS-16' })).toEqual({
			edge: 'EDGE-NAS-16',
			camera: 'TEST-CLIP',
			time: '2026-08-20T10:00:00',
		});
	});

	it('merges named events into person identities and fills missing photos', () => {
		const identities = [{ PersonId: 'guest-819', DisplayName: 'A', IsStaff: true, PhotoPath: '/a.jpg' }];
		const events = [
			{ PersonId: 'guest-819', FramePath: '/a2.jpg' },
			{ PersonId: 'guest-820', FramePath: '/b.jpg', DisplayName: 'Hương', EmployeeCode: 'S1', IsStaff: true, PersonType: 'staff' },
			{ PersonId: 'guest-9', FramePath: '/c.jpg', Name: 'BP', EmployeeCode: 'KH01', IsStaff: false },
		];
		const merged = mergeNamedPersons(identities, events);
		expect(merged.map((p) => p.PersonId).sort()).toEqual(['guest-819', 'guest-820', 'guest-9']);
		expect(namedPersonsByIsStaff(merged, true).map((p) => p.PersonId).sort()).toEqual(['guest-819', 'guest-820']);
		expect(namedPersonsByIsStaff(merged, false).map((p) => p.PersonId)).toEqual(['guest-9']);
	});

	it('maps BP contact to person row; staff uses RefId', () => {
		const staff = personFromContact({ Id: 9, Name: 'An', Code: 'NV01', IsStaff: true, RefId: 44 });
		expect(staff).toEqual({
			personId: 'guest-9',
			personType: 'staff',
			displayName: 'An',
			employeeCode: 'NV01',
			idContact: 9,
			idStaff: 44,
			isStaff: true,
		});
		const bp = personFromContact({ Id: 3, Name: 'Khách', Code: 'KH01', IsStaff: false });
		expect(bp.personType).toBe('guest');
		expect(bp.idStaff).toBeNull();
		expect(bp.isStaff).toBe(false);
	});

	it('keys persons by PersonId and unnamed faces by EventId', () => {
		expect(personItemKey({ PersonId: 'guest-1', EventId: 'e-9' })).toBe('p:guest-1');
		expect(personItemKey({ EventId: 'e-9' })).toBe('e:e-9');
		expect(personItemKey({})).toBe('');
	});

	it('merges only new person rows and keeps existing object refs', () => {
		const kept = { PersonId: 'a', checked: true };
		const same = { PersonId: 'a', PhotoPath: '/newer.jpg' };
		const neu = { PersonId: 'b', PhotoPath: '/b.jpg' };
		const rs = personMergeIncomingItems([kept], [neu, same]);
		expect(rs.added).toBe(1);
		expect(rs.items).toEqual([neu, kept]);
		expect(rs.items[1]).toBe(kept);
		expect(personMergeIncomingItems([kept], [same]).added).toBe(0);
	});

	it('splits visible rows by person tab', () => {
		const staff = [{ PersonId: 's1' }];
		const bp = [{ PersonId: 'g1' }];
		const needsMapping = [{ PersonId: 'unknown-1' }];
		expect(personVisibleRows('staff', staff, bp, needsMapping)).toEqual(staff);
		expect(personVisibleRows('guest', staff, bp, needsMapping)).toEqual(bp);
		expect(personVisibleRows('unnamed', staff, bp, needsMapping)).toEqual(needsMapping);
		expect(personVisibleRows('all', staff, bp, needsMapping)).toEqual([...staff, ...bp, ...needsMapping]);
	});

	it('uses NeedsBpMapping from BE and keeps IDContact null faces for mapping tab', () => {
		const identities = [
			{ PersonId: 'unknown-1', NeedsBpMapping: true, PhotoPath: '/u.jpg' },
			{ PersonId: 'guest-9', NeedsBpMapping: false, IsStaff: false, PhotoPath: '/g.jpg', IDContact: 9 },
			{ PersonId: 'guest-10', NeedsBpMapping: false, IsStaff: true, PhotoPath: '/s.jpg', IDContact: 10 },
			{ PersonId: 'unknown-2', IDContact: null, PhotoPath: '/u2.jpg' },
			{ PersonId: 'empty', NeedsBpMapping: true },
		];
		expect(identityNeedsBpMapping(identities[0])).toBe(true);
		expect(identityNeedsBpMapping(identities[3])).toBe(true);
		expect(personNeedsMapping(identities).map((p) => p.PersonId)).toEqual(['unknown-1', 'unknown-2', 'empty']);
		expect(personMappedStaff(identities).map((p) => p.PersonId)).toEqual(['guest-10']);
		expect(personMappedGuests(identities).map((p) => p.PersonId)).toEqual(['guest-9']);
	});

	it('resolves assign event ids from person row metadata', () => {
		const row = {
			LatestEventId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
			LatestEventNumericId: 42,
			PhotoPath: '/x.jpg',
		};
		expect(personAssignEventId(row)).toBe('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
		expect(personAssignEventNumericId(row)).toBe(42);
		expect(personAssignEventId({ PersonId: 'unknown-1', Id: 99 })).toBe('');
	});

	it('rebinds selection after reload and toggles select-all', () => {
		const selected = [{ PersonId: 's1' }, { EventId: 'gone' }];
		const rows = [{ PersonId: 's1', DisplayName: 'A' }, { PersonId: 's2' }, { EventId: 'e1' }];
		expect(personRebindSelection(rows, selected).map((r) => personItemKey(r))).toEqual(['p:s1']);
		expect(personAllSelected(rows, rows)).toBeTrue();
		expect(personToggleSelectAll(rows, []).map(personItemKey)).toEqual(['p:s1', 'p:s2', 'e:e1']);
		expect(personToggleSelectAll(rows, rows)).toEqual([]);
	});

	it('partitions delete targets: persons first, unnamed events next', () => {
		const targets = [
			{ PersonId: 'guest-1', EventId: 'ignored' },
			{ PersonId: 'guest-1' },
			{ EventId: 'e-1' },
			{ EventId: 'e-1' },
			{ EventId: 'e-2' },
			{},
		];
		expect(personDeleteTargets(targets)).toEqual({
			personIds: ['guest-1'],
			eventIds: ['e-1', 'e-2'],
		});
	});

	it('shift-selects the inclusive range from the last item to the target', () => {
		const rows = [{ PersonId: 'a' }, { PersonId: 'b' }, { PersonId: 'c' }, { PersonId: 'd' }];
		expect(personShiftRange(rows, rows[0], rows[2]).map(personItemKey)).toEqual(['p:a', 'p:b', 'p:c']);
		expect(personShiftRange(rows, rows[3], rows[1]).map(personItemKey)).toEqual(['p:b', 'p:c', 'p:d']);
		expect(personShiftRange(rows, null, rows[1]).map(personItemKey)).toEqual(['p:b']);
	});

	it('adds the shift range onto the current selection without dropping others', () => {
		const rows = [{ PersonId: 'a' }, { PersonId: 'b' }, { PersonId: 'c' }, { EventId: 'e1' }];
		const selected = [rows[3]];
		expect(personApplyShiftSelect(rows, selected, rows[0], rows[1]).map(personItemKey)).toEqual(['p:a', 'p:b', 'e:e1']);
	});

	it('collects numeric event ids to hide for people and unnamed faces', () => {
		const targets = [
			{ PersonId: 'guest-1' },
			{ EventId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', Id: 9 },
		];
		const events = [
			{ Id: 1, PersonId: 'guest-1', EventId: 'e-keep' },
			{ Id: 2, PersonId: 'guest-2', EventId: 'e-other' },
			{ Id: 9, EventId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' },
		];
		expect(personEventIdsToHide(targets, events).sort()).toEqual([1, 9]);
		expect(personEventNumericId({ Id: '9' })).toBe(9);
		expect(personEventNumericId({ Id: 0 })).toBeNull();
	});

	it('reads FaceIdentity numeric ids from array or wrapped payloads', () => {
		expect(personIdentityNumericIds([{ Id: 11 }, { ID: 12 }, { Id: 0 }])).toEqual([11, 12]);
		expect(personIdentityNumericIds({ data: [{ Id: 3 }] })).toEqual([3]);
		expect(personIdentityNumericIds({ Data: [{ Id: 4 }] })).toEqual([4]);
		expect(personIdentityNumericIds(null)).toEqual([]);
		expect(personFilterByPersonIds([{ PersonId: 'clip-002', Id: 9 }, { PersonId: 'clip-003', Id: 10 }], ['clip-002']).map((x) => x.Id)).toEqual([9]);
	});

	it('collects named persons for split and skips unnamed faces', () => {
		expect(personSplitPersonIds([{ PersonId: 'clip-002' }, { EventId: 'e1' }, { PersonId: 'clip-002' }])).toEqual(['clip-002']);
		expect(personSplitPersonIds([{ EventId: 'e1' }])).toEqual([]);
	});

	it('hides split meaning for unmapped-only selection (mapped filter)', () => {
		const unmapped = [
			{ PersonId: 'u1', NeedsBpMapping: true, LatestEventId: 'e1' },
			{ PersonId: 'u2', NeedsBpMapping: true, LatestEventId: 'e2' },
		];
		const mapped = { PersonId: 'm1', IDContact: 5, DisplayName: 'A', LatestEventId: 'e3' };
		expect(personMappedSelected(unmapped).length).toBe(0);
		expect(personMappedSelected([...unmapped, mapped]).length).toBe(1);
		expect(personMergeTargetDefault(unmapped)).toBeNull();
		expect(canConfirmPersonMerge(unmapped, null, { Id: 9, Name: 'X' })).toBeTrue();
	});

	it('resolves merge target default and sources for list Merge', () => {
		const unmapped = { PersonId: 'u1', NeedsBpMapping: true, LatestEventId: 'e-u1' };
		const mappedA = { PersonId: 'm1', NeedsBpMapping: false, IDContact: 10, LatestEventId: 'e-m1' };
		const mappedB = { PersonId: 'm2', NeedsBpMapping: false, IDContact: 20, LatestEventId: 'e-m2' };
		expect(personMappedSelected([unmapped, mappedA]).map((p) => p.PersonId)).toEqual(['m1']);
		expect(personMergeTargetDefault([unmapped, mappedA])).toBe('p:m1');
		expect(personMergeTargetDefault([unmapped])).toBeNull();
		expect(personMergeTargetDefault([mappedA, mappedB])).toBeNull();
		expect(personMergeSources([unmapped, mappedA], 'p:m1').map((p) => p.PersonId)).toEqual(['u1']);
		expect(canConfirmPersonMerge([unmapped, mappedA], 'p:m1')).toBeTrue();
		expect(canConfirmPersonMerge([unmapped], null)).toBeFalse();
		expect(canConfirmPersonMerge([unmapped], null, { Id: 99 })).toBeTrue();
		expect(canConfirmPersonMerge([mappedA, mappedB], null)).toBeFalse();
		expect(canConfirmPersonMerge([mappedA, mappedB], 'p:m1')).toBeTrue();
		expect(canConfirmPersonMerge([{ PersonId: 'u2', NeedsBpMapping: true }], null, { Id: 99 })).toBeFalse();
	});

	it('reads EventId guids from array or wrapped payloads', () => {
		expect(personEventGuidIds([{ EventId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' }, { event_id: 'b' }, { EventId: ' ' }])).toEqual([
			'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
			'b',
		]);
		expect(personEventGuidIds({ data: [{ EventId: 'x' }] })).toEqual(['x']);
	});
});
