import { cameraAiBadgeColor, cameraAiLabel, cameraRoleBadgeColor } from './vms-camera.util';

describe('cameraRoleBadgeColor', () => {
	it('maps IN / OUT / BOTH', () => {
		expect(cameraRoleBadgeColor('IN')).toBe('success');
		expect(cameraRoleBadgeColor('out')).toBe('warning');
		expect(cameraRoleBadgeColor('BOTH')).toBe('primary');
		expect(cameraRoleBadgeColor('')).toBe('medium');
	});
});

describe('cameraAiBadgeColor / cameraAiLabel', () => {
	it('flags AI on and off', () => {
		expect(cameraAiBadgeColor(true)).toBe('success');
		expect(cameraAiLabel(true)).toBe('AI ON');
		expect(cameraAiBadgeColor(false)).toBe('medium');
		expect(cameraAiLabel(0)).toBe('AI OFF');
	});
});

