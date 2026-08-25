export function cameraRoleBadgeColor(role: string | null | undefined): string {
	const r = String(role || '').toUpperCase();
	if (r === 'IN') return 'success';
	if (r === 'OUT') return 'warning';
	if (r === 'BOTH') return 'primary';
	return 'medium';
}

export function cameraAiBadgeColor(aiEnabled: unknown): string {
	return aiEnabled === true || aiEnabled === 1 || aiEnabled === '1' ? 'success' : 'medium';
}

export function cameraAiLabel(aiEnabled: unknown): string {
	return aiEnabled === true || aiEnabled === 1 || aiEnabled === '1' ? 'AI ON' : 'AI OFF';
}

