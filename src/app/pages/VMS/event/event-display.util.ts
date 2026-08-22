export function eventStatusVisible(eventType: string | null | undefined): boolean {
	const t = (eventType || '').toLowerCase();
	return t.startsWith('attendance.');
}

export function eventTypeKind(eventType: string | null | undefined): string {
	const t = (eventType || '').toLowerCase();
	if (t === 'face.seen') return 'face';
	if (t === 'attendance.check_in') return 'checkin';
	if (t === 'attendance.check_out') return 'checkout';
	if (t.includes('pending_review')) return 'pending';
	if (t.startsWith('guest')) return 'guest';
	if (t.startsWith('attendance')) return 'attendance';
	return 'other';
}

export function eventTypeLabel(eventType: string | null | undefined): string {
	const kind = eventTypeKind(eventType);
	if (kind === 'face') return 'Face seen';
	if (kind === 'checkin') return 'Check-in';
	if (kind === 'checkout') return 'Check-out';
	if (kind === 'pending') return 'Pending';
	if (kind === 'guest') return 'Guest';
	if (kind === 'attendance') return 'Attendance';
	return (eventType || '').trim() || '—';
}

export function eventStatusKind(status: string | null | undefined): string {
	const s = (status || '').toLowerCase();
	if (s === 'accepted' || s === 'approved') return 'ok';
	if (s === 'rejected' || s === 'denied') return 'no';
	if (s === 'pendingreview' || s === 'pending') return 'wait';
	return 'other';
}

export function eventStatusLabel(status: string | null | undefined): string {
	const kind = eventStatusKind(status);
	if (kind === 'ok') return 'Accepted';
	if (kind === 'no') return 'Rejected';
	if (kind === 'wait') return 'Pending';
	return (status || '').trim() || '—';
}

export function eventPersonLabel(row: { DisplayName?: string; PersonId?: string } | null | undefined): string {
	const name = String(row?.DisplayName || '').trim();
	if (name) return name;
	return 'Unknown';
}

export function eventPhotoPath(row: { FramePath?: string; PhotoPath?: string } | null | undefined): string {
	return String(row?.FramePath || row?.PhotoPath || '').trim();
}

export function isUuidLike(value: string | null | undefined): boolean {
	return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || '').trim());
}

/** Build lookup keys (UUID / legacy ids) → edge display name. */
export function buildEdgeNameLookup(edges: any[] | null | undefined): Map<string, string> {
	const next = new Map<string, string>();
	for (const edge of edges || []) {
		const name = String(edge?.Name ?? edge?.name ?? edge?.Code ?? edge?.code ?? '').trim();
		if (!name) continue;
		for (const key of [edge?.UUID, edge?.Uuid, edge?.uuid, edge?.EdgeNodeId, edge?.edge_node_id, edge?.Id != null ? String(edge.Id) : '']) {
			const id = String(key ?? '').trim();
			if (id) next.set(id, name);
		}
	}
	return next;
}

export function eventEdgeLabel(
	row: { EdgeNodeName?: string; edge_node_name?: string; EdgeNodeId?: string; edge_node_id?: string } | null | undefined,
	edgeNameById?: ReadonlyMap<string, string> | Record<string, string>
): string {
	const name = String(row?.EdgeNodeName ?? row?.edge_node_name ?? '').trim();
	if (name) return name;

	const id = String(row?.EdgeNodeId ?? row?.edge_node_id ?? '').trim();
	if (!id) return '';

	const mapped = edgeNameById instanceof Map ? edgeNameById.get(id) : edgeNameById?.[id];
	if (mapped) return String(mapped).trim();

	return isUuidLike(id) ? '' : id;
}

export function eventCameraLabel(row: { CameraName?: string; camera_name?: string; CameraId?: string; camera_id?: string } | null | undefined): string {
	return String(row?.CameraName ?? row?.camera_name ?? row?.CameraId ?? row?.camera_id ?? '').trim();
}

export function eventTypeBadgeColor(eventType: string | null | undefined): string {
	switch (eventTypeKind(eventType)) {
		case 'face':
			return 'primary';
		case 'checkin':
			return 'success';
		case 'checkout':
			return 'warning';
		case 'pending':
			return 'danger';
		case 'guest':
			return 'tertiary';
		case 'attendance':
			return 'secondary';
		default:
			return 'medium';
	}
}

export function eventStatusBadgeColor(status: string | null | undefined): string {
	switch (eventStatusKind(status)) {
		case 'ok':
			return 'success';
		case 'no':
			return 'danger';
		case 'wait':
			return 'warning';
		default:
			return 'medium';
	}
}

