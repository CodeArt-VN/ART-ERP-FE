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

