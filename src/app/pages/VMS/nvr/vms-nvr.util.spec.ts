import { nvrApplyCameraCounts, nvrCameraCount, nvrCameraInUse, nvrCameraUsageLabel, nvrNeedsCameraCounts } from './vms-nvr.util';

describe('nvrCameraUsageLabel', () => {
	it('prints in-use over total', () => {
		expect(nvrCameraUsageLabel({ CameraInUse: 3, CameraCount: 8 })).toBe('3/8');
		expect(nvrCameraUsageLabel({ CameraInUse: '2', CameraCount: '2' })).toBe('2/2');
		expect(nvrCameraUsageLabel({ cameraInUse: 1, cameraCount: 4 } as any)).toBe('1/4');
		expect(nvrCameraUsageLabel({})).toBe('0/0');
		expect(nvrCameraUsageLabel(null)).toBe('0/0');
	});
});

describe('nvrCameraInUse / nvrCameraCount', () => {
	it('treats missing values as zero', () => {
		expect(nvrCameraInUse({ CameraInUse: 0 })).toBe(0);
		expect(nvrCameraCount({ CameraCount: null })).toBe(0);
	});
});

describe('nvrApplyCameraCounts', () => {
	it('counts in-use vs total per NVR', () => {
		const nvrs = [{ Id: 10 }, { Id: 11 }];
		nvrApplyCameraCounts(nvrs, [
			{ IDNvr: 10, IsDisabled: false },
			{ IDNvr: 10, IsDisabled: true },
			{ IDNvr: 10, IsDisabled: 0 },
			{ IDNvr: 11, IsDisabled: true },
		]);
		expect(nvrs[0].CameraInUse).toBe(2);
		expect(nvrs[0].CameraCount).toBe(3);
		expect(nvrs[1].CameraInUse).toBe(0);
		expect(nvrs[1].CameraCount).toBe(1);
	});
});

describe('nvrNeedsCameraCounts', () => {
	it('is true when API omitted the field', () => {
		expect(nvrNeedsCameraCounts([{ Id: 1 }])).toBe(true);
		expect(nvrNeedsCameraCounts([{ CameraCount: 0 }])).toBe(false);
	});
});
