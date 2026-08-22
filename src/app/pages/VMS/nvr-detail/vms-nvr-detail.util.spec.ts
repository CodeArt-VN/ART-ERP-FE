import { mergeNvrCameras, nvrAllSelected, nvrBulkNextInUse, nvrCamBusyKey, nvrChannelNo, nvrRebindSelected, nvrToggleSelectAll } from './vms-nvr-detail.util';

describe('nvrChannelNo', () => {
	it('normalizes string and number channel ids', () => {
		expect(nvrChannelNo(7)).toBe(7);
		expect(nvrChannelNo('7')).toBe(7);
		expect(nvrChannelNo(0)).toBeNull();
		expect(nvrChannelNo(null)).toBeNull();
	});
});

describe('mergeNvrCameras', () => {
	it('keeps db rows and appends scanned channels missing from db', () => {
		const db = [
			{ Id: 1, ChannelNo: '1', Name: 'A' },
			{ Id: 2, ChannelNo: 2, Name: 'B' },
			{ Id: 3, ChannelNo: 3, Name: 'C' },
		];
		const scanned = [
			{ ChannelNo: 1, Name: 'A' },
			{ ChannelNo: '4', Name: 'D' },
			{ ChannelNo: 5, Name: 'E' },
			{ ChannelNo: 6, Name: 'F' },
			{ ChannelNo: 7, Name: 'G' },
		];
		const merged = mergeNvrCameras(db, scanned);
		expect(merged.length).toBe(7);
		expect(merged.map((c) => nvrChannelNo(c.ChannelNo))).toEqual([1, 2, 3, 4, 5, 6, 7]);
	});
});

describe('nvrCamBusyKey', () => {
	it('keys saved cameras by id and preview cameras by channel', () => {
		expect(nvrCamBusyKey({ Id: 9, ChannelNo: 2 })).toBe('id-9');
		expect(nvrCamBusyKey({ Id: 0, ChannelNo: '4' })).toBe('ch-4');
	});
});

describe('nvrBulkNextInUse', () => {
	it('puts into use when any selected camera is unused', () => {
		expect(nvrBulkNextInUse([{ IsDisabled: true }, { IsDisabled: false }])).toBeTrue();
		expect(nvrBulkNextInUse([{ IsDisabled: true }])).toBeTrue();
	});

	it('stops using when every selected camera is already in use', () => {
		expect(nvrBulkNextInUse([{ IsDisabled: false }, { IsDisabled: false }])).toBeFalse();
	});
});

describe('nvrRebindSelected', () => {
	it('remaps selection onto refreshed rows by channel/id', () => {
		const selected = [{ Id: 0, ChannelNo: '4' }, { Id: 2, ChannelNo: 2 }];
		const cameras = [
			{ Id: 9, ChannelNo: 4 },
			{ Id: 2, ChannelNo: 2 },
			{ Id: 3, ChannelNo: 3 },
		];
		expect(nvrRebindSelected(cameras, selected).map((c) => c.Id)).toEqual([9, 2]);
	});
});

describe('nvrToggleSelectAll', () => {
	const cameras = [
		{ Id: 1, ChannelNo: 1 },
		{ Id: 2, ChannelNo: 2 },
	];

	it('selects every camera when none or some are selected', () => {
		expect(nvrAllSelected(cameras, [])).toBeFalse();
		expect(nvrToggleSelectAll(cameras, []).map((c) => c.Id)).toEqual([1, 2]);
		expect(nvrToggleSelectAll(cameras, [{ Id: 1, ChannelNo: 1 }]).map((c) => c.Id)).toEqual([1, 2]);
	});

	it('clears selection when every camera is already selected', () => {
		expect(nvrAllSelected(cameras, cameras)).toBeTrue();
		expect(nvrToggleSelectAll(cameras, cameras)).toEqual([]);
	});
});
