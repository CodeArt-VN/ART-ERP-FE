export type EdgeRemotePipeline = {
	sample_interval_sec: number;
	hit_cooldown_sec: number;
	min_face_px: number;
	unknown_min: number;
	det_size: number;
	require_crop_verify: boolean;
	min_skin_ratio: number;
	min_sharpness: number;
	unknown_confirm_frames: number;
};

export type EdgeRemoteConfig = {
	enabled: boolean;
	confidence_auto: number;
	confidence_review_min: number;
	guest_throttle_minutes: number;
	in_window_before_minutes: number;
	in_window_after_minutes: number;
	out_window_after_minutes: number;
	eod_checkout_hour_local: number;
	eod_checkout_minute_local: number;
	pipeline: EdgeRemotePipeline;
};

export function defaultRemoteConfig(): EdgeRemoteConfig {
	return {
		enabled: true,
		confidence_auto: 0.55,
		confidence_review_min: 0.45,
		guest_throttle_minutes: 5,
		in_window_before_minutes: 60,
		in_window_after_minutes: 30,
		out_window_after_minutes: 120,
		eod_checkout_hour_local: 23,
		eod_checkout_minute_local: 30,
		pipeline: {
			sample_interval_sec: 0.5,
			hit_cooldown_sec: 8,
			min_face_px: 40,
			unknown_min: 0.35,
			det_size: 640,
			require_crop_verify: true,
			min_skin_ratio: 0,
			min_sharpness: 18,
			unknown_confirm_frames: 2,
		},
	};
}

export function parseRemoteConfig(raw: any): EdgeRemoteConfig {
	const d = defaultRemoteConfig();
	if (!raw || typeof raw !== 'object') return d;
	const pipe = raw.pipeline && typeof raw.pipeline === 'object' ? raw.pipeline : {};
	return {
		...d,
		...raw,
		pipeline: { ...d.pipeline, ...pipe },
	};
}

export function normalizeBranchIds(ids: any): number[] {
	const list = Array.isArray(ids)
		? ids
		: typeof ids === 'string'
			? ids.split(/[,;\s]+/).filter(Boolean)
			: [];
	return [...new Set(list.map((x) => Number(x)).filter((n) => n > 0))];
}

export function servedBranchLabel(item: { ServedBranches?: string; BranchName?: string }): string {
	if (item?.ServedBranches) return item.ServedBranches;
	if (item?.BranchName) return item.BranchName;
	return '—';
}

export function ensureHomeInServed(homeId: number, served: number[]): number[] {
	const ids = normalizeBranchIds(served);
	if (homeId > 0 && !ids.includes(homeId)) ids.unshift(homeId);
	return ids;
}

export function inferRuntimeLabel(item: { InferRuntime?: string; InferDevice?: string } | null | undefined): string {
	const rt = (item?.InferRuntime || '').trim().toLowerCase();
	const dev = (item?.InferDevice || '').trim();
	const blob = `${rt} ${dev.toLowerCase()}`;
	if (blob.includes('coral') || blob.includes('edgetpu')) return 'Coral TPU';
	if (rt === 'mixed' || blob.includes('det=cpu')) return 'Mixed';
	if (rt === 'gpu' || blob.includes('cuda') || blob.includes('coreml') || blob.includes('vulkan')) return 'GPU';
	if (rt === 'cpu') return 'CPU';
	if (dev) return dev;
	return '—';
}

export function inferRuntimeColor(item: { InferRuntime?: string; InferDevice?: string } | null | undefined): string {
	const label = inferRuntimeLabel(item);
	if (label === 'Coral TPU') return 'warning';
	if (label === 'GPU') return 'tertiary';
	if (label === 'Mixed') return 'primary';
	if (label === 'CPU') return 'medium';
	return 'medium';
}

export const EDGE_HEARTBEAT_ONLINE_MS = 10 * 60 * 1000;

export function isEdgeOnline(item: { LastHeartbeat?: string | Date | null } | null | undefined, now = Date.now()): boolean {
	if (!item?.LastHeartbeat) return false;
	const t = new Date(item.LastHeartbeat).getTime();
	if (Number.isNaN(t)) return false;
	return now - t < EDGE_HEARTBEAT_ONLINE_MS;
}

export type EdgeFleetSummary = {
	total: number;
	online: number;
	offline: number;
	camerasOnline: number;
	camerasWatching: number;
	outboxPending: number;
};

export function summarizeEdgeFleet(items: Array<{ LastHeartbeat?: string | Date | null; CamerasOnline?: number; CamerasWatching?: number; OutboxPending?: number }> | null | undefined, now = Date.now()): EdgeFleetSummary {
	const list = Array.isArray(items) ? items : [];
	let online = 0;
	let camerasOnline = 0;
	let camerasWatching = 0;
	let outboxPending = 0;
	for (const n of list) {
		if (isEdgeOnline(n, now)) online++;
		camerasOnline += Number(n?.CamerasOnline) || 0;
		camerasWatching += Number(n?.CamerasWatching) || 0;
		outboxPending += Number(n?.OutboxPending) || 0;
	}
	return {
		total: list.length,
		online,
		offline: list.length - online,
		camerasOnline,
		camerasWatching,
		outboxPending,
	};
}

export function fleetOnlineRemark(
	items: Array<{ LastHeartbeat?: string | Date | null }> | null | undefined,
	now = Date.now()
): string {
	const f = summarizeEdgeFleet(items, now);
	return `${f.online}/${f.total} devices online`;
}

export function fleetOnlineRemarkKey(): string {
	return '{{online}}/{{total}} devices online';
}

export function fleetOnlineRemarkParams(
	items: Array<{ LastHeartbeat?: string | Date | null }> | null | undefined,
	now = Date.now()
): { online: number; total: number } {
	const f = summarizeEdgeFleet(items, now);
	return { online: f.online, total: f.total };
}

export type EdgeCameraRow = {
	Id: number;
	Code?: string;
	Name?: string;
	Role?: string;
	IDBranch?: number;
	BranchName?: string;
	AiEnabled?: boolean;
	CameraDisabled?: boolean;
	ProcessingEnabled?: boolean;
};

export type EdgeCameraGroup = {
	idBranch: number;
	branchName: string;
	cameras: EdgeCameraRow[];
};

export function truthyFlag(v: unknown): boolean {
	return v === true || v === 1 || v === '1' || v === 'true';
}

export function groupCamerasByBranch(rows: EdgeCameraRow[] | null | undefined, branchOrder: number[] = []): EdgeCameraGroup[] {
	const list = Array.isArray(rows) ? rows : [];
	const byId = new Map<number, EdgeCameraGroup>();
	const order: number[] = [];
	for (const id of branchOrder || []) {
		if (id > 0 && !byId.has(id)) {
			byId.set(id, { idBranch: id, branchName: '#' + id, cameras: [] });
			order.push(id);
		}
	}
	for (const row of list) {
		const id = Number(row?.IDBranch) || 0;
		if (!byId.has(id)) {
			byId.set(id, { idBranch: id, branchName: row?.BranchName || (id ? '#' + id : '—'), cameras: [] });
			order.push(id);
		}
		const g = byId.get(id)!;
		if (row?.BranchName) g.branchName = row.BranchName;
		g.cameras.push(row);
	}
	return order.filter((id) => byId.has(id)).map((id) => byId.get(id)!);
}
