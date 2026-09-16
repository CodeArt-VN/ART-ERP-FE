import { faceOverlay } from '../person/vms-person.util';

export type PersonDetailTab = 'person-info' | 'person-photos' | 'person-visits' | 'person-events';

export function visitPeriodCounts(stats: any): { total: number; lunch: number; dinner: number; other: number; branchCount: number } {
	const byService = stats?.by_service_period || stats?.ByServicePeriod || {};
	return {
		total: Number(stats?.total ?? stats?.Total ?? 0) || 0,
		lunch: Number(byService?.lunch ?? byService?.Lunch ?? 0) || 0,
		dinner: Number(byService?.dinner ?? byService?.Dinner ?? 0) || 0,
		other: Number(byService?.other ?? byService?.Other ?? 0) || 0,
		branchCount: Number(stats?.branch_count ?? stats?.BranchCount ?? 0) || 0,
	};
}

export function recognitionSummary(recognition: any): {
	hasEmbedding: boolean;
	modelName: string;
	version: string;
	lastCameraId: string;
	lastEventType: string;
	lastConfidence: number | null;
	lastOccurredAt: any;
	lastEdgeNodeName: string;
	dim: number | null;
} {
	return {
		hasEmbedding: !!(recognition?.HasEmbedding ?? recognition?.has_embedding),
		modelName: String(recognition?.ModelName ?? recognition?.model_name ?? '').trim(),
		version: String(recognition?.Version ?? recognition?.version ?? '').trim(),
		lastCameraId: String(recognition?.LastCameraId ?? recognition?.last_camera_id ?? '').trim(),
		lastEventType: String(recognition?.LastEventType ?? recognition?.last_event_type ?? '').trim(),
		lastConfidence:
			recognition?.LastConfidence == null && recognition?.last_confidence == null
				? null
				: Number(recognition?.LastConfidence ?? recognition?.last_confidence),
		lastOccurredAt: recognition?.LastOccurredAt ?? recognition?.last_occurred_at ?? null,
		lastEdgeNodeName: String(recognition?.LastEdgeNodeName ?? recognition?.last_edge_node_name ?? '').trim(),
		dim: recognition?.Dim == null && recognition?.dim == null ? null : Number(recognition?.Dim ?? recognition?.dim),
	};
}

/** Enrollment album rows (tbl_VMS_PersonPhoto), not face.seen events. */
export function personEnrollmentPhotoRows(rows: any[]): any[] {
	return (rows || [])
		.filter((row) => row?.FramePath || row?.framePath)
		.map((row) => ({
			...row,
			Id: row.Id ?? row.id,
			FramePath: row.FramePath ?? row.framePath,
			IsPrimary: row.IsPrimary === true || row.isPrimary === true,
		}));
}

export function personEventsPage(payload: any): { data: any[]; total: number; skip: number; take: number } {
	// GenCode-style list: plain array. Legacy `{ data, total, skip, take }` still accepted.
	const data = Array.isArray(payload)
		? payload
		: payload?.data || payload?.Data || payload?.Visits || payload?.visits || [];
	const rows = Array.isArray(data) ? data : [];
	return {
		data: rows,
		total: Number(payload?.total ?? payload?.Total ?? rows.length) || 0,
		skip: Number(payload?.skip ?? payload?.Skip ?? 0) || 0,
		take: Number(payload?.take ?? payload?.Take ?? 50) || 50,
	};
}

/** Same paged shape as events (`data`/`Visits` + total/skip/take). */
export function personVisitsPage(payload: any): { data: any[]; total: number; skip: number; take: number } {
	return personEventsPage(payload);
}

export function shouldLazyLoadTab(loaded: Partial<Record<PersonDetailTab, boolean>>, tab: PersonDetailTab): boolean {
	if (tab === 'person-info') return false;
	return !loaded?.[tab];
}

export function eventConfidencePercent(row: any): number | null {
	const raw = row?.Confidence ?? row?.confidence;
	if (raw == null || raw === '') return null;
	const n = Number(raw);
	if (!Number.isFinite(n)) return null;
	const pct = n <= 1 ? n * 100 : n;
	return Math.max(0, Math.min(100, Math.round(pct)));
}

export function eventIdOf(row: any): string {
	return String(row?.EventId ?? row?.event_id ?? row?.eventId ?? '').trim();
}

/** UX readiness from enrollment sample count + last match confidence (no new analytics tables). */
export function personRecognitionReadiness(
	sampleCount: number,
	recognition?: { hasEmbedding?: boolean; lastConfidence?: number | null } | null
): {
	sampleCount: number;
	percent: number;
	label: string;
	suggestMore: boolean;
	message: string;
	note: string;
	noteParams: { count: number; label?: string };
} {
	const count = Math.max(0, Number(sampleCount) || 0);
	if (!recognition?.hasEmbedding) {
		const message =
			count < 3
				? 'Add more photos (staff card / other angles) for better recognition'
				: 'No embedding yet — add photos to enroll the face';
		const note =
			count < 3
				? '{{count}} sample photos · Not enrolled. Add more photos (staff card / other angles) for better recognition'
				: '{{count}} sample photos · Not enrolled. No embedding yet — add photos to enroll the face';
		return {
			sampleCount: count,
			percent: 0,
			label: 'Not enrolled',
			suggestMore: true,
			message,
			note,
			noteParams: { count },
		};
	}
	const last = recognition.lastConfidence == null ? 0 : Number(recognition.lastConfidence);
	const lastClamped = Number.isFinite(last) ? Math.max(0, Math.min(1, last <= 1 ? last : last / 100)) : 0;
	const percent = Math.min(95, 40 + count * 15 + Math.round(lastClamped * 20));
	const suggestMore = count < 3;
	const message = suggestMore ? 'Add more photos (staff card / other angles) for better recognition' : '';
	const label = `${percent}%`;
	return {
		sampleCount: count,
		percent,
		label,
		suggestMore,
		message,
		note: suggestMore
			? '{{count}} sample photos · Recognition {{label}}. Add more photos (staff card / other angles) for better recognition'
			: '{{count}} sample photos · Recognition {{label}}',
		noteParams: { count, label },
	};
}
