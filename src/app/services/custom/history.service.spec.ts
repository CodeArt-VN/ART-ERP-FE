import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { HistoryService, EnrichedLog } from './history.service';

describe('HistoryService', () => {
	let service: HistoryService;
	let formBuilder: FormBuilder;

	beforeEach(() => {
		formBuilder = new FormBuilder();
		service = new HistoryService({ connect: () => ({ toPromise: () => Promise.resolve([]) }) } as any, formBuilder);
	});

	function enrich(partial: Record<string, any>): EnrichedLog {
		const row: any = { ...partial };
		if (row.Data && typeof row.Data !== 'string') {
			row.Data = JSON.stringify(row.Data);
		}
		return service.enrich(row);
	}

	function linesAt(steps: ReturnType<HistoryService['buildCumulativeSnapshots']>, idx: number) {
		return steps[idx].snapshot.OrderLines as any[];
	}

	it('enrich marks DELETE / create / import badges', () => {
		expect(service.enrich({ Method: 'DELETE', Segment5: '%5B1%5D', Date: '2026-01-01T00:00:00Z' })._badge).toBe('delete');
		expect(service.enrich({ Method: 'POST', Segment5: '123', Date: '2026-01-01T00:00:00Z' })._badge).toBe('create');
		expect(service.enrich({ Method: 'POST', Segment5: 'ImportDetailFile', Date: '2026-01-01T00:00:00Z' })._badge).toBe('import');
	});

	it('buildCumulativeSnapshots merges header and lines then removes deleted lines', () => {
		const steps = service.buildCumulativeSnapshots([
			enrich({
				Id: 1,
				Method: 'POST',
				Segment5: '1',
				Date: '2026-01-01T00:00:00Z',
				Data: { Code: 'PO-1', OrderLines: [{ Id: 10, UoMQuantityExpected: 1 }] },
			}),
			enrich({
				Id: 2,
				Method: 'PUT',
				Segment5: '1',
				Date: '2026-01-02T00:00:00Z',
				Data: { Code: 'PO-2', OrderLines: [{ Id: 10, UoMQuantityExpected: 5 }] },
			}),
			enrich({
				Id: 3,
				Method: 'DELETE',
				Segment5: '%5B10%5D',
				Date: '2026-01-03T00:00:00Z',
				Data: {},
			}),
		]);

		expect(steps[0].snapshot.Code).toBe('PO-1');
		expect(steps[0].snapshot.OrderLines.length).toBe(1);
		expect(steps[1].snapshot.Code).toBe('PO-2');
		expect(steps[1].snapshot.OrderLines[0].UoMQuantityExpected).toBe(5);
		expect(steps[2].snapshot.OrderLines.length).toBe(0);
	});

	/** TC1: Two new lines via object map → cumulative snapshot has 2 lines */
	it('TC1: two lines added via OrderLines object map accumulate to 2 rows', () => {
		const steps = service.buildCumulativeSnapshots([
			enrich({
				Id: 1,
				Method: 'PUT',
				Segment5: '4822',
				Date: '2026-01-01T00:00:00Z',
				Data: {
					OrderLines: {
						0: { Id: 0, IDItem: 1, IDUoM: 10, UoMQuantityExpected: 10, UoMPrice: 100 },
						1: { Id: 0, IDItem: 2, IDUoM: 10, UoMQuantityExpected: 20, UoMPrice: 200 },
					},
				},
			}),
		]);
		expect(linesAt(steps, 0).length).toBe(2);
		expect(linesAt(steps, 0).map((l) => l.IDItem).sort()).toEqual([1, 2]);
	});

	/** TC2: Update one persisted line via map key 0 must not overwrite another line */
	it('TC2: single-line PUT with map key 0 updates correct Id not first row', () => {
		const steps = service.buildCumulativeSnapshots([
			enrich({
				Id: 1,
				Method: 'PUT',
				Date: '2026-01-01T00:00:00Z',
				Data: {
					OrderLines: {
						0: { Id: 27440, IDItem: 1, IDUoM: 10, UoMQuantityExpected: 10, UoMPrice: 100 },
						1: { Id: 27441, IDItem: 2, IDUoM: 10, UoMQuantityExpected: 20, UoMPrice: 200 },
					},
				},
			}),
			enrich({
				Id: 2,
				Method: 'PUT',
				Date: '2026-01-02T00:00:00Z',
				Data: {
					OrderLines: { 0: { Id: 27441, IDItem: 2, IDUoM: 10, UoMQuantityExpected: 99, UoMPrice: 200 } },
				},
			}),
		]);
		const lines = linesAt(steps, 1);
		expect(lines.length).toBe(2);
		const l40 = lines.find((l) => l.Id === 27440)!;
		const l41 = lines.find((l) => l.Id === 27441)!;
		expect(l40.UoMQuantityExpected).toBe(10);
		expect(l41.UoMQuantityExpected).toBe(99);
	});

	/** TC3: DELETE removes line from cumulative snapshot */
	it('TC3: DELETE removes persisted line from snapshot', () => {
		const steps = service.buildCumulativeSnapshots([
			enrich({
				Id: 1,
				Method: 'PUT',
				Date: '2026-01-01T00:00:00Z',
				Data: {
					OrderLines: [
						{ Id: 27440, UoMQuantityExpected: 10 },
						{ Id: 27441, UoMQuantityExpected: 20 },
					],
				},
			}),
			enrich({
				Id: 2,
				Method: 'DELETE',
				Segment5: '[27440]',
				Date: '2026-01-02T00:00:00Z',
				Data: {},
			}),
		]);
		expect(linesAt(steps, 1).length).toBe(1);
		expect(linesAt(steps, 1)[0].Id).toBe(27441);
	});

	/** TC4: DELETE parses ids from API URL when Segment5 empty */
	it('TC4: resolveDeletedLineIds falls back to API URL', () => {
		const row = service.enrich({
			Method: 'DELETE',
			Segment5: '',
			API: 'http://localhost/api/v1/PURCHASE/OrderDetail/%5B27440%2C27441%5D',
			Date: '2026-01-01T00:00:00Z',
		});
		expect(service.resolveDeletedLineIds(row)).toEqual([27440, 27441]);
	});

	/** TC5: Navigate forward/back — snapshot at step N is independent */
	it('TC5: forward then back snapshots match step indices', () => {
		const steps = service.buildCumulativeSnapshots([
			enrich({ Id: 1, Method: 'PUT', Date: '2026-01-01T00:00:00Z', Data: { OrderLines: [{ Id: 1, UoMQuantityExpected: 1 }] } }),
			enrich({ Id: 2, Method: 'PUT', Date: '2026-01-02T00:00:00Z', Data: { OrderLines: [{ Id: 1, UoMQuantityExpected: 5 }] } }),
			enrich({ Id: 3, Method: 'PUT', Date: '2026-01-03T00:00:00Z', Data: { OrderLines: [{ Id: 1, UoMQuantityExpected: 9 }] } }),
		]);
		const snap0 = JSON.stringify(linesAt(steps, 0));
		const snap2 = JSON.stringify(linesAt(steps, 2));
		expect(linesAt(steps, 1)[0].UoMQuantityExpected).toBe(5);
		expect(JSON.stringify(linesAt(steps, 0))).toBe(snap0);
		expect(JSON.stringify(linesAt(steps, 2))).toBe(snap2);
	});

	/** TC6: Id=0 line promoted to persisted Id on next PUT */
	it('TC6: unsaved line Id=0 promoted when server assigns Id', () => {
		const steps = service.buildCumulativeSnapshots([
			enrich({
				Id: 1,
				Method: 'PUT',
				Date: '2026-01-01T00:00:00Z',
				Data: { OrderLines: { 0: { Id: 0, IDItem: 99, IDUoM: 5, UoMQuantityExpected: 3 } } },
			}),
			enrich({
				Id: 2,
				Method: 'PUT',
				Date: '2026-01-02T00:00:00Z',
				Data: { OrderLines: { 0: { Id: 500, IDItem: 99, IDUoM: 5, UoMQuantityExpected: 3 } } },
			}),
		]);
		expect(linesAt(steps, 1).length).toBe(1);
		expect(linesAt(steps, 1)[0].Id).toBe(500);
	});

	/** TC7: diffLineChanges highlights only changed cell field */
	it('TC7: diffLineChanges detects single field change only', () => {
		const prev = { OrderLines: [{ Id: 10, UoMQuantityExpected: 1, UoMPrice: 100 }] };
		const curr = { OrderLines: [{ Id: 10, UoMQuantityExpected: 2, UoMPrice: 100 }] };
		const diff = service.diffLineChanges(prev, curr);
		expect(diff.lineIds.has('10')).toBe(true);
		expect(diff.lineFields.get('10')?.has('UoMQuantityExpected')).toBe(true);
		expect(diff.lineFields.get('10')?.has('UoMPrice')).toBeFalsy();
	});

	/** TC8: isWholeLineChange — field edit no row glow; delete yes */
	it('TC8: isWholeLineChange true for remove, false for field edit', () => {
		service.active = true;
		service.applyHighlight(new Set(), new Set(['10']), new Map([['10', new Set(['UoMQuantityExpected'])]]));
		expect(service.isWholeLineChange({ Id: 10 })).toBe(false);
		service.applyHighlight(new Set(), new Set(['10']), new Map([['10', new Set(['_removed'])]]));
		expect(service.isWholeLineChange({ Id: 10 })).toBe(true);
		service.active = false;
	});

	/** TC9: expandLineHighlight aliases Id and _historyLineKey */
	it('TC9: expandLineHighlight maps Id alias for grid FormGroup', () => {
		const curr = {
			OrderLines: [{ Id: 27441, _historyLineKey: '27441', UoMQuantityExpected: 99 }],
		};
		const diff = { lineIds: new Set(['27441']), lineFields: new Map([['27441', new Set(['UoMQuantityExpected'])]]) };
		const expanded = service.expandLineHighlight(diff, curr);
		expect(expanded.lineIds.has('27441')).toBe(true);
		expect(expanded.lineFields.get('27441')?.has('UoMQuantityExpected')).toBe(true);
	});

	/** TC10: header-only PUT preserves existing lines */
	it('TC10: header PUT without OrderLines keeps prior lines', () => {
		const steps = service.buildCumulativeSnapshots([
			enrich({
				Id: 1,
				Method: 'PUT',
				Date: '2026-01-01T00:00:00Z',
				Data: { Code: 'PO-A', OrderLines: [{ Id: 10, UoMQuantityExpected: 1 }] },
			}),
			enrich({
				Id: 2,
				Method: 'PUT',
				Date: '2026-01-02T00:00:00Z',
				Data: { Code: 'PO-B', Remark: 'note' },
			}),
		]);
		expect(steps[1].snapshot.Code).toBe('PO-B');
		expect(linesAt(steps, 1).length).toBe(1);
		expect(linesAt(steps, 1)[0].UoMQuantityExpected).toBe(1);
	});

	it('diffHeaderFields and diffLineChanges detect changes for highlight', () => {
		const prev = { Code: 'A', OrderLines: [{ Id: 10, UoMQuantityExpected: 1, UoMPrice: 100 }] };
		const curr = { Code: 'B', OrderLines: [{ Id: 10, UoMQuantityExpected: 2, UoMPrice: 100 }] };

		const header = service.diffHeaderFields(prev, curr);
		expect(header.has('Code')).toBe(true);

		const lines = service.diffLineChanges(prev, curr);
		expect(lines.lineIds.has('10')).toBe(true);
		expect(lines.lineFields.get('10')?.has('UoMQuantityExpected')).toBe(true);
		expect(lines.lineFields.get('10')?.has('UoMPrice')).toBeFalsy();
	});

	it('buildHistoryHeaderPatch clears form fields missing from create snapshot', () => {
		const form = formBuilder.group({
			Id: [4823],
			Code: ['Code'],
			Status: ['Unapproved'],
			OrderDate: ['2026-08-05T17:49:08.813'],
			IDVendor: [99],
			IDWarehouse: [1476],
			OrderLines: formBuilder.array([]),
		});

		const patch = service.buildHistoryHeaderPatch(
			form,
			{ IDBranch: 3800, IDStorer: 30591, IDVendor: 1, _uid: 'x' },
			4823
		);

		expect(patch.Id).toBe(4823);
		expect(patch.IDVendor).toBe(1);
		expect(patch.Code).toBeNull();
		expect(patch.Status).toBeNull();
		expect(patch.OrderDate).toBeNull();
		expect(patch.IDWarehouse).toBeNull();
		expect(patch.OrderLines).toBeUndefined();
	});

	it('applyCumulativeSnapshotToForm clears then patches 1..N (going back drops later fields)', () => {
		const form = formBuilder.group({
			Id: [1],
			Code: ['KEEP-ME'],
			Status: ['Unapproved'],
			IDVendor: [9],
			OrderLines: formBuilder.array([
				formBuilder.group({ Id: [10], UoMQuantityExpected: [5], _historyLineKey: ['10'] }),
			]),
		});

		// View step 2: only vendor in cumulative 1..2 — Code/Status/lines from step 3 must vanish
		service.applyCumulativeSnapshotToForm(form, { IDVendor: 1 }, 1, 'OrderLines');
		expect(form.get('Id')?.value).toBe(1);
		expect(form.get('IDVendor')?.value).toBe(1);
		expect(form.get('Code')?.value).toBeNull();
		expect(form.get('Status')?.value).toBeNull();
		expect((form.get('OrderLines') as FormArray).length).toBe(0);

		// View step 3: cumulative adds Code (lines rebuilt by page child, not here)
		service.applyCumulativeSnapshotToForm(form, { IDVendor: 1, Code: 'PO-3' }, 1, 'OrderLines');
		expect(form.get('Code')?.value).toBe('PO-3');
		expect(form.get('IDVendor')?.value).toBe(1);
		expect((form.get('OrderLines') as FormArray).length).toBe(0);

		// Back to step 2 again
		service.applyCumulativeSnapshotToForm(form, { IDVendor: 1 }, 1, 'OrderLines');
		expect(form.get('Code')?.value).toBeNull();
		expect((form.get('OrderLines') as FormArray).length).toBe(0);
	});

	it('syncFormArrayFromSnapshot patches and removes line groups', () => {
		const form = formBuilder.group({
			Code: [''],
			OrderLines: formBuilder.array([
				formBuilder.group({
					Id: [10],
					_historyLineKey: ['10'],
					UoMQuantityExpected: [1],
					UoMPrice: [100],
				}),
				formBuilder.group({
					Id: [11],
					_historyLineKey: ['11'],
					UoMQuantityExpected: [3],
					UoMPrice: [50],
				}),
			]),
		});

		service.syncFormArrayFromSnapshot(form, 'OrderLines', [{ Id: 10, _historyLineKey: '10', UoMQuantityExpected: 9, UoMPrice: 100 }]);
		const arr = form.get('OrderLines') as FormArray;
		expect(arr.length).toBe(1);
		expect(arr.at(0).get('UoMQuantityExpected')?.value).toBe(9);
	});

	it('formatViewTitle and subtitle for delete/import', () => {
		const del = service.enrich({
			Method: 'DELETE',
			Segment5: '[12,13]',
			Date: '2026-08-05T10:00:00Z',
			LoggedBy: 'hungvq',
		});
		expect(service.formatViewTitle(del, 0, 3)).toContain('hungvq');
		expect(service.formatViewTitle(del, 0, 3)).not.toContain('(1/3)');
		expect(service.formatViewPosition(0, 3)).toBe('3/3');
		expect(service.formatViewPosition(2, 3)).toBe('1/3');
		expect(service.formatViewSubtitle(del)).toContain('Removed 2 line(s)');
	});

	it('highlight apply/clear and isLineFieldChanged', () => {
		service.active = true;
		service.applyHighlight(new Set(['Code']), new Set(['10']), new Map([['10', new Set(['UoMPrice'])]]));
		expect(service.changedHeaderFields.has('Code')).toBe(true);
		expect(service.changedLineIds.has('10')).toBe(true);
		expect(service.isLineFieldChanged({ Id: 10 }, 'UoMPrice')).toBe(true);
		expect(service.isLineFieldChanged({ Id: 10 }, 'UoMQuantityExpected')).toBe(false);
		service.clearHighlight();
		expect(service.changedHeaderFields.size).toBe(0);
		service.active = false;
	});

	it('decorateLinesForView uses persisted Id as _historyLineKey', () => {
		const out = service.decorateLinesForView([{ Id: 27440, UoMQuantityExpected: 5 }]);
		expect(out[0]._historyLineKey).toBe('27440');
	});

	it('getLineIdentity prefers Id over _historyLineKey on FormGroup', () => {
		const g = formBuilder.group({ Id: [27441], _historyLineKey: ['0'] });
		expect(service.getLineIdentity(g)).toBe('27441');
	});
});
