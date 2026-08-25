export function unnamedFaceEvents(events: any[]): any[] {
	return (events || []).filter((e) => e && !e.PersonId && e.FramePath && !personRowIsDeleted(e));
}

export function identityNeedsBpMapping(identity: any): boolean {
	if (!identity) return false;
	const v = identity?.NeedsBpMapping ?? identity?.needs_bp_mapping;
	if (v === true || v === 1 || v === '1' || v === 'true') return true;
	if (v === false || v === 0 || v === '0' || v === 'false') return false;
	const idContact = identity?.IDContact ?? identity?.id_contact ?? identity?.IdContact;
	return idContact == null || idContact === '' || idContact === 0;
}

/** True when HQ has FaceVector — person is safe to sync to Edge. */
export function personHasEmbedding(person: any): boolean {
	if (!person) return false;
	const v =
		person?.HasEmbedding ??
		person?.hasEmbedding ??
		person?.Recognition?.HasEmbedding ??
		person?.recognition?.hasEmbedding ??
		person?.recognition?.HasEmbedding;
	return v === true || v === 1 || v === '1' || v === 'true';
}

/** Human label for a person; never fall back to UUID when unassigned / unnamed. */
export function personDisplayName(person: any, fallback = 'Unknown'): string {
	const name = String(person?.DisplayName ?? person?.display_name ?? person?.Name ?? '').trim();
	if (name) return name;
	const code = String(person?.EmployeeCode ?? person?.employee_code ?? person?.Code ?? '').trim();
	if (code) return code;
	return fallback;
}

export function personNeedsMapping(identities: any[]): any[] {
	return (identities || []).filter((i) => i && identityNeedsBpMapping(i));
}

export function personMappedStaff(identities: any[]): any[] {
	return (identities || []).filter((i) => i && !identityNeedsBpMapping(i) && identityIsStaff(i));
}

export function personMappedGuests(identities: any[]): any[] {
	return (identities || []).filter((i) => i && !identityNeedsBpMapping(i) && !identityIsStaff(i));
}

export function personAssignEventId(row: any): string {
	return String(row?.LatestEventId ?? row?.latest_event_id ?? '').trim();
}

export function personAssignEventNumericId(row: any): number | null {
	const n = Number(row?.LatestEventNumericId ?? row?.latest_event_numeric_id);
	return Number.isFinite(n) && n > 0 ? n : null;
}

export function identityIsStaff(identity: any): boolean {
	const v = identity?.IsStaff;
	if (v === true || v === 1 || v === '1' || v === 'true') return true;
	if (v === false || v === 0 || v === '0' || v === 'false') return false;
	return identity?.PersonType === 'staff';
}

export function namedPersonsByIsStaff(identities: any[], isStaff: boolean): any[] {
	return (identities || []).filter((i) => i && identityIsStaff(i) === isStaff);
}

export function mergeNamedPersons(identities: any[], namedEvents: any[]): any[] {
	const byId = new Map<string, any>();
	for (const i of identities || []) {
		if (!i?.PersonId) continue;
		byId.set(String(i.PersonId), { ...i });
	}
	for (const e of namedEvents || []) {
		if (!e?.PersonId || !e.FramePath || personRowIsDeleted(e)) continue;
		const id = String(e.PersonId);
		const cur = byId.get(id);
		if (!cur) {
			byId.set(id, {
				PersonId: e.PersonId,
				DisplayName: e.DisplayName || e.Name || '',
				EmployeeCode: e.EmployeeCode || '',
				PhotoPath: e.PhotoPath || e.FramePath,
				PersonType: e.PersonType,
				IsStaff: e.IsStaff,
			});
			continue;
		}
		if (!personPhotoPath(cur)) cur.PhotoPath = e.PhotoPath || e.FramePath;
		if (cur.IsStaff == null && e.IsStaff != null) cur.IsStaff = e.IsStaff;
		if (!cur.PersonType && e.PersonType) cur.PersonType = e.PersonType;
	}
	return Array.from(byId.values());
}

export function identityIsDisabled(identity: any): boolean {
	const v = identity?.IsDisabled ?? identity?.disabled;
	return v === true || v === 1 || v === '1' || v === 'true';
}

export function personActionLabel(identity: any): string {
	return identityIsDisabled(identity) ? 'Resume recognition' : 'Stop recognition';
}

export function personRowIsDeleted(row: any): boolean {
	const v = row?.IsDeleted ?? row?.isDeleted;
	return v === true || v === 1 || v === '1' || v === 'true';
}

export function personPhotoPath(identity: any): string {
	return identity?.PhotoPath || identity?.photo_path || identity?.FramePath || '';
}

export function faceOverlay(event: any): { edge: string; camera: string; time: any } | null {
	const edge = String(
		event?.EdgeNodeName ??
			event?.edge_node_name ??
			event?.LatestEdgeNodeName ??
			event?.latest_edge_node_name ??
			event?.EdgeNodeId ??
			event?.edge_node_id ??
			event?.LatestEdgeNodeId ??
			''
	).trim();
	const camera = String(event?.CameraId ?? event?.camera_id ?? '').trim();
	const time = event?.OccurredAt ?? event?.occurred_at ?? null;
	if (!edge && !camera && !time) return null;
	return { edge, camera, time };
}

export function identityFaceContext(identity: any): { EdgeNodeName?: string; EdgeNodeId?: string; CameraId?: string; OccurredAt?: any } {
	return {
		EdgeNodeName: identity?.LatestEdgeNodeName ?? identity?.latest_edge_node_name ?? identity?.EdgeNodeName ?? identity?.edge_node_name,
		EdgeNodeId: identity?.LatestEdgeNodeId ?? identity?.latest_edge_node_id ?? identity?.EdgeNodeId ?? identity?.edge_node_id,
		CameraId: identity?.LatestCameraId ?? identity?.latest_camera_id ?? identity?.CameraId ?? identity?.camera_id,
		OccurredAt: identity?.LatestOccurredAt ?? identity?.latest_occurred_at ?? identity?.OccurredAt ?? identity?.occurred_at,
	};
}

export function personOverlay(person: any): { code: string; name: string } | null {
	if (!person || identityNeedsBpMapping(person)) return null;
	const code = String(person.EmployeeCode ?? person.employee_code ?? person.Code ?? '').trim();
	const name = String(person.DisplayName ?? person.display_name ?? person.Name ?? '').trim();
	if (!code && !name) return null;
	return { code, name };
}

export function unmappedFaceOverlay(person: any): { edge: string; camera: string; time: any } | null {
	return faceOverlay(identityFaceContext(person));
}

export function personItemKey(item: any): string {
	if (item?.PersonId) return 'p:' + String(item.PersonId);
	if (item?.EventId) return 'e:' + String(item.EventId);
	return '';
}

/** Mapped (already has BP) rows among a selection. */
export function personMappedSelected(rows: any[]): any[] {
	return (rows || []).filter((r) => r && !identityNeedsBpMapping(r));
}

/** When exactly one mapped row is selected, that person is the default merge target key. */
export function personMergeTargetDefault(rows: any[]): string | null {
	const mapped = personMappedSelected(rows);
	if (mapped.length !== 1) return null;
	return personItemKey(mapped[0]) || null;
}

/** Selected rows to merge away (everything except the target key). */
export function personMergeSources(rows: any[], targetKey: string | null): any[] {
	return (rows || []).filter((r) => {
		const key = personItemKey(r);
		if (!key) return false;
		if (targetKey && key === targetKey) return false;
		return true;
	});
}

/** Confirm enabled when a BP target is resolved and at least one source has LatestEventId. */
export function canConfirmPersonMerge(rows: any[], targetKey: string | null, advancedContact?: any): boolean {
	const hasAdvanced = advancedContact?.Id != null && advancedContact.Id !== '' && Number(advancedContact.Id) > 0;
	if (!hasAdvanced) {
		if (!targetKey) return false;
		const target = (rows || []).find((r) => personItemKey(r) === targetKey);
		if (!target || identityNeedsBpMapping(target)) return false;
	}
	const sources = personMergeSources(rows, targetKey);
	return sources.some((s) => !!personAssignEventId(s));
}

/** Keep current rows (and selection refs); only prepend items whose key is new. */
export function personMergeIncomingItems(current: any[], incoming: any[]): { items: any[]; added: number } {
	const existing = current || [];
	const known = new Set(existing.map(personItemKey).filter(Boolean));
	const fresh: any[] = [];
	for (const row of incoming || []) {
		if (!row || personRowIsDeleted(row)) continue;
		const key = personItemKey(row);
		if (!key || known.has(key)) continue;
		known.add(key);
		fresh.push(row);
	}
	if (!fresh.length) return { items: existing, added: 0 };
	return { items: [...fresh, ...existing], added: fresh.length };
}

export function personVisibleRows(
	view: 'all' | 'staff' | 'guest' | 'unnamed',
	staffPeople: any[],
	bpPeople: any[],
	needsMappingFaces: any[]
): any[] {
	if (view === 'staff') return staffPeople || [];
	if (view === 'guest') return bpPeople || [];
	if (view === 'unnamed') return needsMappingFaces || [];
	return [...(staffPeople || []), ...(bpPeople || []), ...(needsMappingFaces || [])];
}

export function personRebindSelection(rows: any[], selected: any[]): any[] {
	const keys = new Set((selected || []).map(personItemKey).filter(Boolean));
	if (!keys.size) return [];
	return (rows || []).filter((r) => keys.has(personItemKey(r)));
}

export function personAllSelected(rows: any[], selected: any[]): boolean {
	const list = rows || [];
	return list.length > 0 && personRebindSelection(list, selected).length === list.length;
}

export function personToggleSelectAll(rows: any[], selected: any[]): any[] {
	const list = rows || [];
	return personAllSelected(list, selected) ? [] : [...list];
}

export function personShiftRange(rows: any[], lastItem: any, target: any): any[] {
	const list = rows || [];
	if (!target) return [];
	const to = list.findIndex((r) => personItemKey(r) === personItemKey(target));
	if (to < 0) return [];
	let from = list.findIndex((r) => personItemKey(r) === personItemKey(lastItem));
	if (from < 0) from = to;
	const start = Math.min(from, to);
	const end = Math.max(from, to);
	return list.slice(start, end + 1);
}

export function personApplyShiftSelect(rows: any[], selected: any[], lastItem: any, target: any): any[] {
	const range = personShiftRange(rows, lastItem, target);
	const keys = new Set((selected || []).map(personItemKey).filter(Boolean));
	for (const row of range) {
		const k = personItemKey(row);
		if (k) keys.add(k);
	}
	return (rows || []).filter((r) => keys.has(personItemKey(r)));
}

export function personDeleteTargets(selected: any[]): { personIds: string[]; eventIds: string[] } {
	const personIds: string[] = [];
	const eventIds: string[] = [];
	const seenP = new Set<string>();
	const seenE = new Set<string>();
	for (const row of selected || []) {
		const personId = row?.PersonId ? String(row.PersonId) : '';
		if (personId) {
			if (!seenP.has(personId)) {
				seenP.add(personId);
				personIds.push(personId);
			}
			continue;
		}
		const eventId = row?.EventId ? String(row.EventId) : '';
		if (eventId && !seenE.has(eventId)) {
			seenE.add(eventId);
			eventIds.push(eventId);
		}
	}
	return { personIds, eventIds };
}

export function personSplitPersonIds(selected: any[]): string[] {
	return personDeleteTargets(selected).personIds;
}

export function personEventNumericId(row: any): number | null {
	const n = Number(row?.Id ?? row?.ID);
	return Number.isFinite(n) && n > 0 ? n : null;
}

/** Numeric FaceIdentity.Id from a GET payload or person rows (Id / data / Data). */
export function personIdentityNumericIds(payload: any): number[] {
	const rows = Array.isArray(payload) ? payload : payload?.data || payload?.Data || [];
	const ids = new Set<number>();
	for (const x of rows || []) {
		const n = Number(x?.Id ?? x?.ID);
		if (Number.isFinite(n) && n > 0) ids.add(n);
	}
	return Array.from(ids);
}

export function personEventGuidIds(payload: any): string[] {
	const rows = Array.isArray(payload) ? payload : payload?.data || payload?.Data || [];
	const ids = new Set<string>();
	for (const x of rows || []) {
		const g = String(x?.EventId ?? x?.event_id ?? '').trim();
		if (g) ids.add(g);
	}
	return Array.from(ids);
}

export function personFilterByPersonIds(payload: any, personIds: string[]): any[] {
	const want = new Set((personIds || []).map((id) => String(id || '').trim()).filter(Boolean));
	const rows = Array.isArray(payload) ? payload : payload?.data || payload?.Data || [];
	if (!want.size) return [];
	return (rows || []).filter((x) => want.has(String(x?.PersonId || '').trim()));
}

export function personEventIdsToHide(targets: any[], allEvents: any[]): number[] {
	const { personIds, eventIds } = personDeleteTargets(targets);
	const personSet = new Set(personIds);
	const eventSet = new Set(eventIds);
	const ids = new Set<number>();
	for (const t of targets || []) {
		const n = personEventNumericId(t);
		if (n && !t?.PersonId) ids.add(n);
	}
	for (const e of allEvents || []) {
		const n = personEventNumericId(e);
		if (!n) continue;
		const pid = e?.PersonId ? String(e.PersonId) : '';
		const eid = e?.EventId != null ? String(e.EventId) : e?.event_id != null ? String(e.event_id) : '';
		if (pid && personSet.has(pid)) ids.add(n);
		else if (!pid && eid && eventSet.has(eid)) ids.add(n);
	}
	return Array.from(ids);
}

export function personFromContact(contact: any): {
	personId: string;
	personType: 'staff' | 'guest';
	displayName: string;
	employeeCode: string;
	idContact: number | null;
	idStaff: number | null;
	isStaff: boolean;
} {
	const isStaff = contact?.IsStaff === true || contact?.IsStaff === 1 || contact?.IsStaff === 'true';
	return {
		personId: 'guest-' + contact?.Id,
		personType: isStaff ? 'staff' : 'guest',
		displayName: contact?.Name || contact?.FullName || contact?.Code || '',
		employeeCode: contact?.Code || '',
		idContact: contact?.Id ?? null,
		idStaff: isStaff ? contact?.RefId ?? null : null,
		isStaff,
	};
}
