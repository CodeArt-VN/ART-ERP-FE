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
	heartbeat_seconds?: number | null;
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
		heartbeat_seconds: null,
		pipeline: {
			sample_interval_sec: 0.5,
			hit_cooldown_sec: 8,
			min_face_px: 80,
			unknown_min: 0.70,
			det_size: 640,
			require_crop_verify: true,
			min_skin_ratio: 0,
			min_sharpness: 100,
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

export function edgeOnlineThresholdMs(
	item: { RemoteConfig?: { heartbeat_seconds?: number | null } } | null | undefined
): number {
	const hb = item?.RemoteConfig?.heartbeat_seconds;
	if (hb != null && hb >= 30) return Math.max(3 * hb * 1000, 600_000);
	return EDGE_HEARTBEAT_ONLINE_MS;
}

export function isEdgeOnline(
	item: { LastHeartbeat?: string | Date | null; RemoteConfig?: { heartbeat_seconds?: number | null } } | null | undefined,
	now = Date.now()
): boolean {
	if (!item?.LastHeartbeat) return false;
	const t = new Date(item.LastHeartbeat).getTime();
	if (Number.isNaN(t)) return false;
	return now - t < edgeOnlineThresholdMs(item);
}

export type EdgeVersionManifest = {
	minVersion?: string;
	latestVersion?: string;
};

export function edgeManifestFields(manifest: EdgeVersionManifest | null | undefined): {
	min_version?: string;
	latest_version?: string;
} {
	if (!manifest) return {};
	return {
		min_version: manifest.minVersion,
		latest_version: manifest.latestVersion,
	};
}

export function edgeSoftwareStatus(item: {
	SoftwareVersion?: string;
	min_version?: string;
	latest_version?: string;
	minVersion?: string;
	latestVersion?: string;
}): 'ok' | 'update' | 'required' {
	const cur = String(item?.SoftwareVersion || '').trim();
	const minV = String(item?.min_version || item?.minVersion || '').trim();
	const latest = String(item?.latest_version || item?.latestVersion || '').trim();
	if (!cur || !minV) return 'ok';
	const cmp = (a: string, b: string) => {
		const pa = a.split('.').map((x) => parseInt(x, 10) || 0);
		const pb = b.split('.').map((x) => parseInt(x, 10) || 0);
		for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
			const va = pa[i] ?? 0;
			const vb = pb[i] ?? 0;
			if (va !== vb) return va < vb ? -1 : 1;
		}
		return 0;
	};
	if (cmp(cur, minV) < 0) return 'required';
	if (latest && cmp(cur, latest) < 0) return 'update';
	return 'ok';
}

export function edgeSoftwareStatusLabel(
	item: Parameters<typeof edgeSoftwareStatus>[0],
	manifest?: EdgeVersionManifest | null
): string {
	const st = edgeSoftwareStatus({ ...item, ...edgeManifestFields(manifest) });
	if (st === 'required') return 'Cần cập nhật gấp';
	if (st === 'update') return 'Có bản mới';
	return 'OK';
}

export function edgeSoftwareBadgeColor(
	item: Parameters<typeof edgeSoftwareStatus>[0],
	manifest?: EdgeVersionManifest | null
): string {
	const st = edgeSoftwareStatus({ ...item, ...edgeManifestFields(manifest) });
	if (st === 'required') return 'danger';
	if (st === 'update') return 'warning';
	return 'success';
}

export function edgeUpdatePhaseHint(phase?: string | null, staged?: string | null): string | null {
	const p = String(phase || '').trim().toLowerCase();
	if (!p || p === 'idle') return null;
	if (p === 'staged' && staged) return `→ ${staged}`;
	if (p === 'downloading') return '…';
	return p;
}

/** List-row fields refreshed by silent status poll (does not touch Name, BranchIds, selection, etc.). */
export const EDGE_NODE_STATUS_FIELD_KEYS = [
	'LastHeartbeat',
	'SoftwareVersion',
	'SoftwarePlatform',
	'UpdatePhase',
	'UpdateStagedVersion',
	'InferRuntime',
	'InferDevice',
	'CamerasOnline',
	'CamerasWatching',
	'PersonMapped',
	'PersonUnmapped',
	'OutboxPending',
	'ConfigVersion',
	'IsDisabled',
] as const;

export type EdgeNodeStatusFieldKey = (typeof EDGE_NODE_STATUS_FIELD_KEYS)[number];

/** Patch runtime/status metrics onto an existing list row; returns true if any field changed. */
export function patchEdgeNodeStatusFields(
	target: Record<string, unknown> | null | undefined,
	incoming: Record<string, unknown> | null | undefined
): boolean {
	if (!target || !incoming) return false;
	let changed = false;
	for (const key of EDGE_NODE_STATUS_FIELD_KEYS) {
		if (!Object.prototype.hasOwnProperty.call(incoming, key)) continue;
		const next = incoming[key];
		if (target[key] !== next) {
			target[key] = next;
			changed = true;
		}
	}
	return changed;
}

/** Merge status snapshot by Id into loaded rows (in-place). Preserves object refs for selection/scroll. */
export function mergeEdgeNodeStatusIntoItems(
	items: Array<Record<string, unknown>> | null | undefined,
	incomingRows: Array<Record<string, unknown>> | null | undefined
): boolean {
	const list = Array.isArray(items) ? items : [];
	const incoming = Array.isArray(incomingRows) ? incomingRows : [];
	if (!list.length || !incoming.length) return false;

	const byId = new Map<number, Record<string, unknown>>();
	for (const row of incoming) {
		const id = Number(row?.Id);
		if (id > 0) byId.set(id, row);
	}

	let anyChanged = false;
	for (const row of list) {
		const id = Number(row?.Id);
		const fresh = id > 0 ? byId.get(id) : null;
		if (fresh && patchEdgeNodeStatusFields(row, fresh)) anyChanged = true;
	}
	return anyChanged;
}

export function edgeStatusMeta(
	row?: { SoftwareVersion?: string; LastHeartbeat?: string | Date | null } | null,
	formatHeartbeat: (value: string | Date) => string = () => ''
): string {
	const ver = String(row?.SoftwareVersion || '').trim();
	const hb = row?.LastHeartbeat ? formatHeartbeat(row.LastHeartbeat) : '';
	if (ver && hb) return `${hb} - ${ver}`;
	if (ver) return ver;
	return hb;
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
