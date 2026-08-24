/**
 * Standalone runner for VMS edge util tests (no Karma — avoids legacy spec compile errors).
 * Usage: npx tsx src/app/pages/VMS/edge-version/run-vms-util-tests.ts
 */
import {
	artifactRowsFromRelease,
	defaultEdgeVersionManifest,
	manifestFromAdminResponse,
	parseQuietHours,
	validateManifestForm,
} from './vms-edge-version.util';
import {
	edgeSoftwareStatus,
	edgeStatusMeta,
	isEdgeOnline,
} from '../edge-node-detail/vms-edge-node-detail.util';

function assert(cond: boolean, msg: string) {
	if (!cond) throw new Error(msg);
}

// edge-version util
assert(parseQuietHours('02:00-05:00'), 'quiet hours valid');
assert(!parseQuietHours('bad'), 'quiet hours invalid');
assert(
	validateManifestForm({ ...defaultEdgeVersionManifest(), minVersion: '2.0.0', latestVersion: '1.0.0' })!.includes('minVersion'),
	'min>latest'
);
assert(validateManifestForm(defaultEdgeVersionManifest()) === null, 'default valid');
const mapped = manifestFromAdminResponse({
	effective: { minVersion: '0.1.8', latestVersion: '0.1.10', updateSchedule: { normal: { quietHours: '03:00-04:00' } } },
});
assert(mapped.minVersion === '0.1.8' && mapped.latestVersion === '0.1.10', 'manifest map');
assert(artifactRowsFromRelease({ artifacts: { 'linux-x64': { file: 'a.tar.gz', sha256: 'x' } } }).length === 1, 'artifacts');

// edge-node-detail util
assert(edgeSoftwareStatus({ SoftwareVersion: '0.1.0', min_version: '0.2.0', latest_version: '0.3.0' }) === 'required', 'required st');
assert(edgeStatusMeta({ SoftwareVersion: '0.1.7', LastHeartbeat: '2026-08-22T10:00:00Z' }, () => '5 phút trước') === '5 phút trước - 0.1.7', 'status meta');
const now = new Date('2026-08-19T12:00:00.000Z').getTime();
assert(isEdgeOnline({ LastHeartbeat: '2026-08-19T11:55:00.000Z' }, now), 'online');

console.log('OK vms util tests');
