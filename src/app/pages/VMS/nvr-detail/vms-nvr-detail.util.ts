export function nvrChannelNo(value: any): number | null {
	const n = Number(value);
	return Number.isFinite(n) && n > 0 ? n : null;
}

export function mergeNvrCameras(dbRows: any[], scanned: any[]): any[] {
	const db = Array.isArray(dbRows) ? dbRows : [];
	const byCh = new Set(db.map((c) => nvrChannelNo(c?.ChannelNo)).filter((n): n is number => n != null));
	const extra = (Array.isArray(scanned) ? scanned : []).filter((c) => {
		const ch = nvrChannelNo(c?.ChannelNo);
		return ch != null && !byCh.has(ch);
	});
	return [...db, ...extra];
}

export function nvrCamBusyKey(cam: any): string {
	const id = Number(cam?.Id) || 0;
	if (id > 0) return 'id-' + id;
	return 'ch-' + (nvrChannelNo(cam?.ChannelNo) ?? cam?.Code ?? 'x');
}

export function nvrIsInUse(cam: any): boolean {
	return !!(cam && !cam.IsDisabled);
}

/** true = put selected cameras into use; false = stop using them. */
export function nvrBulkNextInUse(rows: any[]): boolean {
	return (rows || []).some((c) => !nvrIsInUse(c));
}

export function nvrRebindSelected(cameras: any[], selected: any[]): any[] {
	const ids = new Set((selected || []).map((c) => Number(c?.Id) || 0).filter((id) => id > 0));
	const chs = new Set((selected || []).map((c) => nvrChannelNo(c?.ChannelNo)).filter((n): n is number => n != null));
	if (!ids.size && !chs.size) return [];
	return (cameras || []).filter((c) => {
		const id = Number(c?.Id) || 0;
		const ch = nvrChannelNo(c?.ChannelNo);
		return (id > 0 && ids.has(id)) || (ch != null && chs.has(ch));
	});
}

export function nvrAllSelected(cameras: any[], selected: any[]): boolean {
	const cams = cameras || [];
	return cams.length > 0 && nvrRebindSelected(cams, selected).length === cams.length;
}

/** If every camera is selected, clear selection; otherwise select all. */
export function nvrToggleSelectAll(cameras: any[], selected: any[]): any[] {
	const cams = cameras || [];
	return nvrAllSelected(cams, selected) ? [] : [...cams];
}
