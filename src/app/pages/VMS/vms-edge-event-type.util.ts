import { lib } from 'src/app/services/static/global-functions';

/** Parent Code in tbl_SYS_Type — children Code = EventType (IdentifiedPerson, NewFace, …). */
export const VMS_EDGE_EVENT_TYPE_GROUP = 'VMSEdgeEventType';

export function eventTypeFilterList(types: any[] | null | undefined): Array<{ Code: string; Name: string }> {
	const rows = (types || [])
		.filter((t) => t && t.IsDeleted !== true && t.IsDisabled !== true)
		.sort((a, b) => (Number(a?.Sort) || 0) - (Number(b?.Sort) || 0));
	return [{ Code: '', Name: 'All' }, ...rows.map((t) => ({ Code: String(t.Code || '').trim(), Name: String(t.Name || t.Code || '').trim() }))];
}

export function eventTypeLabel(eventType: string | null | undefined, types: any[] | null | undefined): string {
	const code = String(eventType || '').trim();
	if (!code) return '—';
	return lib.getAttrib(code, types, 'Name', code, 'Code') || code;
}

export function eventTypeColor(eventType: string | null | undefined, types: any[] | null | undefined): string {
	const code = String(eventType || '').trim();
	if (!code) return 'medium';
	return lib.getAttrib(code, types, 'Color', 'medium', 'Code') || 'medium';
}

export function eventTypeIcon(eventType: string | null | undefined, types: any[] | null | undefined): string {
	const code = String(eventType || '').trim();
	if (!code) return '';
	return lib.getAttrib(code, types, 'Icon', '', 'Code') || '';
}
