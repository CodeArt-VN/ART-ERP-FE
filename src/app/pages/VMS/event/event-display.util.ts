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
		for (const key of [edge?.UUID, edge?.Uuid, edge?.uuid, edge?.EdgeNodeUUID, edge?.edge_node_uuid, edge?.Code, edge?.code, edge?.Id != null ? String(edge.Id) : '']) {
			const id = String(key ?? '').trim();
			if (id) next.set(id, name);
		}
	}
	return next;
}

export function eventEdgeLabel(
	row: { EdgeNodeName?: string; edge_node_name?: string; EdgeNodeUUID?: string; edge_node_uuid?: string } | null | undefined,
	edgeNameById?: ReadonlyMap<string, string> | Record<string, string>
): string {
	const name = String(row?.EdgeNodeName ?? row?.edge_node_name ?? '').trim();
	if (name) return name;

	const id = String(row?.EdgeNodeUUID ?? row?.edge_node_uuid ?? '').trim();
	if (!id) return '';

	const mapped = edgeNameById instanceof Map ? edgeNameById.get(id) : edgeNameById?.[id];
	if (mapped) return String(mapped).trim();

	return isUuidLike(id) ? '' : id;
}

export function eventCameraLabel(row: { CameraName?: string; camera_name?: string; CameraId?: string; camera_id?: string } | null | undefined): string {
	return String(row?.CameraName ?? row?.camera_name ?? row?.CameraId ?? row?.camera_id ?? '').trim();
}
