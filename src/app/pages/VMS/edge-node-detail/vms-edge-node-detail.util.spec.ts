import {
	defaultRemoteConfig,
	ensureHomeInServed,
	inferRuntimeColor,
	inferRuntimeLabel,
	isEdgeOnline,
	normalizeBranchIds,
	parseRemoteConfig,
	servedBranchLabel,
	summarizeEdgeFleet,
	fleetOnlineRemark,
	groupCamerasByBranch,
	truthyFlag,
} from './vms-edge-node-detail.util';

describe('parseRemoteConfig', () => {
	it('fills defaults when payload is empty', () => {
		const cfg = parseRemoteConfig(null);
		expect(cfg.confidence_auto).toBe(0.55);
		expect(cfg.pipeline.min_face_px).toBe(40);
	});

	it('overlays ERP values onto defaults', () => {
		const cfg = parseRemoteConfig({ confidence_auto: 0.8, pipeline: { min_face_px: 64 } });
		expect(cfg.confidence_auto).toBe(0.8);
		expect(cfg.pipeline.min_face_px).toBe(64);
		expect(cfg.pipeline.det_size).toBe(defaultRemoteConfig().pipeline.det_size);
	});
});

describe('normalizeBranchIds', () => {
	it('keeps unique positive ids', () => {
		expect(normalizeBranchIds(['3', 3, 0, 8, 'x'])).toEqual([3, 8]);
	});

	it('parses csv string from list API', () => {
		expect(normalizeBranchIds('5, 9;12')).toEqual([5, 9, 12]);
		expect(normalizeBranchIds('')).toEqual([]);
	});
});

describe('ensureHomeInServed', () => {
	it('prepends home branch when missing', () => {
		expect(ensureHomeInServed(5, [8, 9])).toEqual([5, 8, 9]);
	});

	it('does not duplicate home', () => {
		expect(ensureHomeInServed(5, [5, 8])).toEqual([5, 8]);
	});
});

describe('servedBranchLabel', () => {
	it('prefers served branch names from API', () => {
		expect(servedBranchLabel({ ServedBranches: 'A, B', BranchName: 'Home' })).toBe('A, B');
	});

	it('falls back to branch name, then dash', () => {
		expect(servedBranchLabel({ BranchName: 'Home' })).toBe('Home');
		expect(servedBranchLabel({})).toBe('—');
	});
});

describe('inferRuntimeLabel', () => {
	it('maps runtime codes to readable labels', () => {
		expect(inferRuntimeLabel({ InferRuntime: 'coral' })).toBe('Coral TPU');
		expect(inferRuntimeLabel({ InferRuntime: 'gpu' })).toBe('GPU');
		expect(inferRuntimeLabel({ InferRuntime: 'cpu' })).toBe('CPU');
	});

	it('maps edgetpu device strings to Coral TPU', () => {
		expect(inferRuntimeLabel({ InferDevice: 'edgetpu:det+cpu:emb' })).toBe('Coral TPU');
		expect(inferRuntimeLabel({ InferRuntime: 'coral-hybrid' })).toBe('Coral TPU');
	});

	it('does not call DirectML-only embed a GPU runtime', () => {
		expect(
			inferRuntimeLabel({ InferRuntime: 'mixed', InferDevice: 'det=cpu:yunet+emb=directml:GPU' })
		).toBe('Mixed');
	});

	it('falls back to infer device when runtime missing', () => {
		expect(inferRuntimeLabel({ InferDevice: 'onnxruntime:CPU' })).toBe('onnxruntime:CPU');
		expect(inferRuntimeLabel(null)).toBe('—');
	});
});

describe('inferRuntimeColor', () => {
	it('maps runtime to ion badge colors', () => {
		expect(inferRuntimeColor({ InferRuntime: 'coral' })).toBe('warning');
		expect(inferRuntimeColor({ InferRuntime: 'gpu' })).toBe('tertiary');
		expect(inferRuntimeColor({ InferRuntime: 'cpu' })).toBe('medium');
	});
});

describe('isEdgeOnline', () => {
	const now = Date.parse('2026-08-19T12:00:00.000Z');

	it('is online when heartbeat is within 10 minutes', () => {
		expect(isEdgeOnline({ LastHeartbeat: '2026-08-19T11:55:00.000Z' }, now)).toBe(true);
	});

	it('is offline when heartbeat is stale or missing', () => {
		expect(isEdgeOnline({ LastHeartbeat: '2026-08-19T11:49:00.000Z' }, now)).toBe(false);
		expect(isEdgeOnline({ LastHeartbeat: null }, now)).toBe(false);
		expect(isEdgeOnline(null, now)).toBe(false);
	});
});

describe('summarizeEdgeFleet', () => {
	it('counts online nodes and rolls up camera/outbox stats', () => {
		const now = Date.parse('2026-08-19T12:00:00.000Z');
		const summary = summarizeEdgeFleet(
			[
				{ LastHeartbeat: '2026-08-19T11:59:00.000Z', CamerasOnline: 3, CamerasWatching: 4, OutboxPending: 2 },
				{ LastHeartbeat: '2026-08-19T10:00:00.000Z', CamerasOnline: 0, CamerasWatching: 2, OutboxPending: 1 },
			],
			now
		);
		expect(summary).toEqual({
			total: 2,
			online: 1,
			offline: 1,
			camerasOnline: 3,
			camerasWatching: 6,
			outboxPending: 3,
		});
	});
});

describe('fleetOnlineRemark', () => {
	it('formats online/total in the list subtitle', () => {
		const now = Date.parse('2026-08-19T12:00:00.000Z');
		expect(
			fleetOnlineRemark(
				[
					{ LastHeartbeat: '2026-08-19T11:59:00.000Z' },
					{ LastHeartbeat: '2026-08-19T11:59:00.000Z' },
					{ LastHeartbeat: '2026-08-19T10:00:00.000Z' },
				],
				now
			)
		).toBe('2/3 devices online');
	});
});

describe('groupCamerasByBranch', () => {
	it('groups cameras under served branch order', () => {
		const groups = groupCamerasByBranch(
			[
				{ Id: 2, Name: 'Cam B', IDBranch: 9, BranchName: 'Shop B' },
				{ Id: 1, Name: 'Cam A', IDBranch: 5, BranchName: 'Shop A' },
			],
			[5, 9]
		);
		expect(groups.map((g) => g.idBranch)).toEqual([5, 9]);
		expect(groups[0].cameras.map((c) => c.Id)).toEqual([1]);
		expect(groups[1].branchName).toBe('Shop B');
	});

	it('keeps empty served branches', () => {
		const groups = groupCamerasByBranch([], [3]);
		expect(groups).toEqual([{ idBranch: 3, branchName: '#3', cameras: [] }]);
	});
});

describe('truthyFlag', () => {
	it('treats sql bit 1 as on', () => {
		expect(truthyFlag(1)).toBe(true);
		expect(truthyFlag(false)).toBe(false);
	});
});

describe('remote config control kinds', () => {
	it('keeps checkbox flags as booleans and the rest as numbers', () => {
		const cfg = defaultRemoteConfig();
		expect(typeof cfg.enabled).toBe('boolean');
		expect(typeof cfg.pipeline.require_crop_verify).toBe('boolean');
		const numbers = [
			cfg.confidence_auto,
			cfg.confidence_review_min,
			cfg.guest_throttle_minutes,
			cfg.in_window_before_minutes,
			cfg.in_window_after_minutes,
			cfg.out_window_after_minutes,
			cfg.eod_checkout_hour_local,
			cfg.eod_checkout_minute_local,
			cfg.pipeline.sample_interval_sec,
			cfg.pipeline.hit_cooldown_sec,
			cfg.pipeline.min_face_px,
			cfg.pipeline.det_size,
			cfg.pipeline.unknown_confirm_frames,
		];
		for (const n of numbers) {
			expect(typeof n).toBe('number');
		}
	});
});
