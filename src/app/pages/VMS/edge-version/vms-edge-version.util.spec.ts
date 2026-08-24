import { validateManifestForm, defaultEdgeVersionManifest, parseQuietHours, manifestFromAdminResponse, artifactRowsFromRelease } from './vms-edge-version.util';

describe('vms-edge-version.util', () => {
	it('validates quiet hours format', () => {
		expect(parseQuietHours('02:00-05:00')).toBe(true);
		expect(parseQuietHours('bad')).toBe(false);
	});

	it('rejects minVersion > latestVersion', () => {
		const err = validateManifestForm({
			...defaultEdgeVersionManifest(),
			minVersion: '2.0.0',
			latestVersion: '1.0.0',
		});
		expect(err).toContain('minVersion');
	});

	it('accepts valid manifest', () => {
		expect(validateManifestForm(defaultEdgeVersionManifest())).toBeNull();
	});

	it('maps admin response effective manifest', () => {
		const m = manifestFromAdminResponse({
			effective: {
				minVersion: '0.1.8',
				latestVersion: '0.1.10',
				updateSchedule: { normal: { quietHours: '03:00-04:00' } },
			},
		});
		expect(m.minVersion).toBe('0.1.8');
		expect(m.latestVersion).toBe('0.1.10');
		expect(m.updateSchedule?.normal?.quietHours).toBe('03:00-04:00');
	});

	it('builds artifact rows from static release', () => {
		const rows = artifactRowsFromRelease({
			artifacts: {
				'linux-x64': { file: 'a.tar.gz', sha256: 'abc' },
				'windows-x64': { file: 'b.exe', sha256: 'def' },
			},
		});
		expect(rows.length).toBe(2);
		expect(rows[0].platform).toBe('linux-x64');
	});
});
