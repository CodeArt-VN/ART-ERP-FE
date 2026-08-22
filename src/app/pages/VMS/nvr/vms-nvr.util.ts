function num(value: unknown): number {
	const n = Number(value);
	return Number.isFinite(n) && n > 0 ? n : 0;
}

export function nvrCameraInUse(row: { CameraInUse?: number | string | null; cameraInUse?: number | string | null } | null | undefined): number {
	return num(row?.CameraInUse ?? row?.cameraInUse);
}

export function nvrCameraCount(row: { CameraCount?: number | string | null; cameraCount?: number | string | null } | null | undefined): number {
	return num(row?.CameraCount ?? row?.cameraCount);
}

export function nvrCameraUsageLabel(row: { CameraInUse?: number | string | null; CameraCount?: number | string | null } | null | undefined): string {
	return nvrCameraInUse(row) + '/' + nvrCameraCount(row);
}

export function nvrHasCameraCountField(row: { CameraCount?: unknown; cameraCount?: unknown } | null | undefined): boolean {
	return row?.CameraCount != null || row?.cameraCount != null;
}

export function nvrNeedsCameraCounts(rows: Array<{ CameraCount?: unknown; cameraCount?: unknown }> | null | undefined): boolean {
	const list = rows || [];
	return list.length > 0 && list.some((row) => !nvrHasCameraCountField(row));
}

export function nvrApplyCameraCounts<T extends { Id?: number; id?: number; CameraCount?: number; CameraInUse?: number }>(
	nvrs: T[] | null | undefined,
	cameras: Array<{ IDNvr?: number | string | null; idNvr?: number | string | null; IsDisabled?: unknown; isDisabled?: unknown }> | null | undefined
): T[] {
	const list = nvrs || [];
	const byNvr: { [id: number]: { total: number; used: number } } = {};
	(cameras || []).forEach((cam) => {
		const id = num(cam?.IDNvr ?? cam?.idNvr);
		if (!id) return;
		if (!byNvr[id]) byNvr[id] = { total: 0, used: 0 };
		byNvr[id].total += 1;
		const disabled = cam?.IsDisabled === true || cam?.IsDisabled === 1 || cam?.isDisabled === true || cam?.isDisabled === 1;
		if (!disabled) byNvr[id].used += 1;
	});
	list.forEach((nvr) => {
		const id = num(nvr?.Id ?? nvr?.id);
		const s = byNvr[id] || { total: 0, used: 0 };
		nvr.CameraCount = s.total;
		nvr.CameraInUse = s.used;
	});
	return list;
}
