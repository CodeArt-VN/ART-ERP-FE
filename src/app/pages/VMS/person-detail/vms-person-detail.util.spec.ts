import {
	eventConfidencePercent,
	eventIdOf,
	personEnrollmentPhotoRows,
	personEventsPage,
	personRecognitionReadiness,
	personVisitsPage,
	recognitionSummary,
	shouldLazyLoadTab,
	visitPeriodCounts,
} from './vms-person-detail.util';

describe('vms-person-detail.util', () => {
	it('builds visit counters with defaults', () => {
		expect(visitPeriodCounts(null)).toEqual({ total: 0, lunch: 0, dinner: 0, other: 0, branchCount: 0 });
		expect(
			visitPeriodCounts({
				total: 7,
				branch_count: 2,
				by_service_period: { lunch: 3, dinner: 2, other: 2 },
			})
		).toEqual({ total: 7, lunch: 3, dinner: 2, other: 2, branchCount: 2 });
	});

	it('normalizes recognition payload', () => {
		expect(
			recognitionSummary({
				has_embedding: true,
				model_name: 'mobilefacenet',
				version: 'v1',
				last_camera_id: 'cam-01',
				last_event_type: 'face.seen',
				last_confidence: 0.91,
				last_occurred_at: '2026-08-20T10:00:00',
				last_edge_node_name: 'EDGE-NAS-16',
				dim: 512,
			})
		).toEqual({
			hasEmbedding: true,
			modelName: 'mobilefacenet',
			version: 'v1',
			lastCameraId: 'cam-01',
			lastEventType: 'face.seen',
			lastConfidence: 0.91,
			lastOccurredAt: '2026-08-20T10:00:00',
			lastEdgeNodeName: 'EDGE-NAS-16',
			dim: 512,
		});
	});

	it('maps enrollment album rows without treating them as events', () => {
		const rows = personEnrollmentPhotoRows([
			{ Id: 1, FramePath: '/a.jpg' },
			{ id: 2, framePath: '/b.jpg' },
			{ Id: 3 },
		]);
		expect(rows.map((r) => r.FramePath)).toEqual(['/a.jpg', '/b.jpg']);
		expect(rows[0].Id).toBe(1);
	});

	it('parses person events page payload', () => {
		expect(personEventsPage({ data: [{ Id: 1 }], total: 9, skip: 0, take: 50 })).toEqual({
			data: [{ Id: 1 }],
			total: 9,
			skip: 0,
			take: 50,
		});
		expect(personEventsPage([{ Id: 2 }, { Id: 3 }])).toEqual({
			data: [{ Id: 2 }, { Id: 3 }],
			total: 2,
			skip: 0,
			take: 50,
		});
	});

	it('parses person visits page payload (Visits alias)', () => {
		expect(personVisitsPage({ Visits: [{ Id: 2 }], total: 3, skip: 0, take: 50 })).toEqual({
			data: [{ Id: 2 }],
			total: 3,
			skip: 0,
			take: 50,
		});
		expect(personVisitsPage([{ Id: 4 }]).data).toEqual([{ Id: 4 }]);
	});

	it('lazy-loads photos/visits/events only once per tab', () => {
		expect(shouldLazyLoadTab({}, 'person-info')).toBe(false);
		expect(shouldLazyLoadTab({}, 'person-photos')).toBe(true);
		expect(shouldLazyLoadTab({ 'person-photos': true }, 'person-photos')).toBe(false);
		expect(shouldLazyLoadTab({ 'person-photos': true }, 'person-events')).toBe(true);
	});

	it('formats event confidence and event id', () => {
		expect(eventConfidencePercent({ Confidence: 0.8 })).toBe(80);
		expect(eventConfidencePercent({ confidence: 75 })).toBe(75);
		expect(eventConfidencePercent({})).toBeNull();
		expect(eventIdOf({ EventId: 'abc' })).toBe('abc');
		expect(eventIdOf({ event_id: 'xyz' })).toBe('xyz');
	});

	it('builds recognition readiness from samples + embedding', () => {
		expect(personRecognitionReadiness(0, { hasEmbedding: false }).percent).toBe(0);
		expect(personRecognitionReadiness(1, { hasEmbedding: false }).suggestMore).toBe(true);
		const one = personRecognitionReadiness(1, { hasEmbedding: true, lastConfidence: 0.8 });
		expect(one.sampleCount).toBe(1);
		expect(one.suggestMore).toBe(true);
		expect(one.percent).toBe(Math.min(95, 40 + 15 + Math.round(0.8 * 20)));
		expect(one.note).toContain('{{count}} sample photos');
		expect(one.noteParams.label).toBe(one.label);
		const three = personRecognitionReadiness(3, { hasEmbedding: true, lastConfidence: 0.9 });
		expect(three.suggestMore).toBe(false);
		expect(three.percent).toBeGreaterThanOrEqual(one.percent);
		expect(three.note).toContain('{{count}} sample photos');
	});
});
