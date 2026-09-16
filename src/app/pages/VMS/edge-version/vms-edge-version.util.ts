export type EdgeUpdateScheduleKind = {
	autoUpdate?: boolean;
	quietHours?: string;
	prefetchImmediately?: boolean;
	timezone?: string;
	manualAnytime?: boolean;
	maxDeferMinutes?: number;
	blockVmsWhenBelowMin?: boolean;
};

export type EdgeVersionManifest = {
	minVersion?: string;
	latestVersion?: string;
	releasedAt?: string;
	baseUrl?: string;
	updateSchedule?: {
		normal?: EdgeUpdateScheduleKind;
		required?: EdgeUpdateScheduleKind;
	};
};

export function defaultEdgeVersionManifest(): EdgeVersionManifest {
	return {
		minVersion: '0.1.0',
		latestVersion: '0.1.0',
		updateSchedule: {
			normal: {
				autoUpdate: true,
				quietHours: '02:00-05:00',
				prefetchImmediately: true,
				timezone: 'local',
			},
			required: {
				autoUpdate: true,
				quietHours: '01:00-06:00',
				manualAnytime: true,
				maxDeferMinutes: 120,
				blockVmsWhenBelowMin: true,
			},
		},
	};
}

export function parseQuietHours(spec: string | null | undefined): boolean {
	if (!spec || !spec.includes('-')) return false;
	const m = spec.trim().match(/^(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/);
	return !!m;
}

export function validateManifestForm(m: EdgeVersionManifest): string | null {
	if (!m.minVersion?.trim() || !m.latestVersion?.trim()) return 'minVersion and latestVersion required';
	const pa = m.minVersion.split('.').map((x) => parseInt(x, 10) || 0);
	const pb = m.latestVersion.split('.').map((x) => parseInt(x, 10) || 0);
	for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
		const a = pa[i] ?? 0;
		const b = pb[i] ?? 0;
		if (a > b) return 'minVersion cannot be greater than latestVersion';
		if (a < b) break;
	}
	const nq = m.updateSchedule?.normal?.quietHours;
	const rq = m.updateSchedule?.required?.quietHours;
	if (nq && !parseQuietHours(nq)) return 'Invalid normal quietHours (HH:MM-HH:MM)';
	if (rq && !parseQuietHours(rq)) return 'Invalid required quietHours (HH:MM-HH:MM)';
	return null;
}

export function manifestFromAdminResponse(data: any): EdgeVersionManifest {
	const eff = data?.effective || data?.overlay || {};
	const d = defaultEdgeVersionManifest();
	return {
		...d,
		minVersion: eff.minVersion ?? d.minVersion,
		latestVersion: eff.latestVersion ?? d.latestVersion,
		releasedAt: eff.releasedAt,
		baseUrl: eff.baseUrl,
		updateSchedule: {
			normal: { ...d.updateSchedule!.normal, ...(eff.updateSchedule?.normal || {}) },
			required: { ...d.updateSchedule!.required, ...(eff.updateSchedule?.required || {}) },
		},
	};
}

export function artifactRowsFromRelease(
	staticRelease: { artifacts?: Record<string, { file?: string; sha256?: string }> } | null | undefined
): Array<{ platform: string; file: string; sha256: string }> {
	const arts = staticRelease?.artifacts;
	if (!arts || typeof arts !== 'object') return [];
	return Object.keys(arts).map((platform) => ({
		platform,
		file: String(arts[platform]?.file || ''),
		sha256: String(arts[platform]?.sha256 || ''),
	}));
}
