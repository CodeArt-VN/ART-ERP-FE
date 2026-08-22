/** Pure FormData builder for Edge POST /vms/enroll (no Angular deps — unit-testable). */
export function buildEnrollImageFormData(p: {
	file: File | Blob;
	fileName: string;
	personId: string;
	personType?: string;
	displayName?: string;
	employeeCode?: string;
	idStaff?: number;
	idContact?: number;
}): FormData {
	const fd = new FormData();
	// Edge FastAPI field name is "file" (image kept as legacy alias on Edge).
	fd.append('file', p.file, p.fileName);
	fd.append('person_id', p.personId);
	fd.append('person_type', p.personType || 'guest');
	fd.append('display_name', p.displayName || '');
	fd.append('employee_code', p.employeeCode || '');
	if (p.idStaff) fd.append('id_staff', String(p.idStaff));
	if (p.idContact) fd.append('id_contact', String(p.idContact));
	return fd;
}

export function resolveHqFrameUrl(framePath: string, appDomain: string): string {
	const path = String(framePath || '').trim();
	if (!path) return '';
	if (/^https?:\/\//i.test(path)) return path;
	const base = String(appDomain || '').replace(/\/$/, '');
	if (!base) return path.startsWith('/') ? path : '/' + path;
	return base + (path.startsWith('/') ? path : '/' + path);
}

/** Normalize HQ AssignFromEvent response (1 request covers upsert + merge + auto-enroll). */
export function mapAssignEventResponse(
	assigned: any,
	fallbackDisplayName = '',
	fallbackPersonId = ''
): { personId: string; displayName: string; id?: number; merged?: boolean; enrolled?: number; edgeError?: string } {
	const personId = String(assigned?.person_id ?? assigned?.PersonId ?? fallbackPersonId ?? '').trim();
	const displayName = String(assigned?.display_name ?? assigned?.DisplayName ?? fallbackDisplayName ?? '').trim();
	const nid = Number(assigned?.id ?? assigned?.Id);
	const id = Number.isFinite(nid) && nid > 0 ? nid : undefined;
	const merged = assigned?.merged === true || assigned?.Merged === true;
	const enrolledRaw = assigned?.enrolled ?? assigned?.Enrolled;
	const enrolled = enrolledRaw == null ? undefined : Number(enrolledRaw) || 0;
	const edgeError = String(assigned?.edgeError || assigned?.EdgeError || '').trim() || undefined;
	return { personId, displayName, id, merged, enrolled, edgeError };
}
