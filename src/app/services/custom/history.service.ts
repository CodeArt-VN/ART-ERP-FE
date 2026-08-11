import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../core/common.service';

/** Business fields end-users can read. No raw FK Ids in diff labels. */
export const HISTORY_FIELD_LABELS: Record<string, string> = {
	Code: 'Code',
	Name: 'Name',
	Remark: 'Remark',
	Status: 'Status',
	Type: 'Type',
	ContentType: 'Content type',
	OrderDate: 'Order date',
	RequiredDate: 'Required date',
	DocumentDate: 'Document date',
	PostingDate: 'Posting date',
	DueDate: 'Due date',
	ExpectedReceiptDate: 'Expected receipt date',
	ReceiptedDate: 'Receipted date',
	PaymentStatus: 'Payment status',
	TotalDiscount: 'Total discount',
	TotalAfterTax: 'Total after tax',
	UoMQuantityExpected: 'Quantity',
	QuantityExpected: 'Base quantity',
	Quantity: 'Quantity',
	UoMPrice: 'Price',
	IDBranch: 'Branch',
	IDWarehouse: 'Warehouse',
	IDStorer: 'Goods owner',
	IDVendor: 'Vendor',
	IDRequester: 'Requester',
	IDRequestBranch: 'Request branch',
};

const SKIP_KEYS = new Set([
	'Id',
	'IDOrder',
	'IDRequest',
	'IsDeleted',
	'IsDisabled',
	'CreatedBy',
	'CreatedDate',
	'ModifiedBy',
	'ModifiedDate',
	'CreatedByName',
	'ModifiedByName',
	'SourceKey',
	'SourceType',
	'SourceLine',
	'Sort',
	'UUID',
	'AppVersion',
	'IDOwner',
	'IDParent',
	'ForeignName',
	'ForeignRemark',
	'DeletedLines',
]);

const LINES_KEYS = ['OrderLines', 'OrderDetails', 'Lines'];

const LINE_DIFF_KEYS = new Set([
	'UoMQuantityExpected',
	'QuantityExpected',
	'Quantity',
	'QuantityRemainingOpen',
	'UoMPrice',
	'IDItem',
	'IDUoM',
	'IDItemUoM',
	'IDVendor',
	'RequiredDate',
	'Remark',
	'Name',
	'QuantityAdjusted',
	'TotalAfterTax',
	'TotalBeforeDiscount',
	'TotalDiscount',
	'IsPromotionItem',
]);

export interface EnrichedLog {
	Id?: number;
	Method?: string;
	Segment5?: string;
	Date?: string;
	LoggedBy?: string;
	Data?: string;
	_label?: string;
	_badge?: string;
	_time?: Date | null;
	_data?: any;
	_action?: string;
	_prevData?: any;
}

export interface DiffRow {
	field: string;
	label: string;
	before: string;
	after: string;
}

export interface SnapshotAtStep {
	entry: EnrichedLog;
	snapshot: any;
}

export interface LineDiffResult {
	lineIds: Set<string>;
	lineFields: Map<string, Set<string>>;
}

@Injectable({
	providedIn: 'root',
})
export class HistoryService {
	active = false;
	changedHeaderFields = new Set<string>();
	changedLineIds = new Set<string>();
	changedLineFields = new Map<string, Set<string>>();

	constructor(
		public commonService: CommonService,
		private formBuilder: FormBuilder
	) {}

	clearHighlight() {
		this.changedHeaderFields = new Set();
		this.changedLineIds = new Set();
		this.changedLineFields = new Map();
		this.highlightRevision++;
	}

	applyHighlight(headerFields: Set<string>, lineIds: Set<string>, lineFieldMap: Map<string, Set<string>>) {
		this.changedHeaderFields = new Set(headerFields);
		this.changedLineIds = new Set(lineIds);
		this.changedLineFields = new Map(lineFieldMap);
		this.highlightRevision++;
	}

	/** Bumped on apply/clear highlight — OnPush datatable cells can react. */
	highlightRevision = 0;

	/** Ensure each line has a stable key for cumulative merge + grid highlight. */
	decorateLinesForView(lines: any[]): any[] {
		return (Array.isArray(lines) ? lines : []).map((line, idx) => {
			const id = Number(line?.Id);
			const key = id > 0 ? String(id) : line?._historyLineKey || `tmp:${idx}`;
			return { ...line, _historyLineKey: String(key) };
		});
	}

	/**
	 * Lines for history UI at step N.
	 * When includeRemoved (DELETE step): keep deleted rows in their FormArray index
	 * (strikethrough in-place) so lower rows do not jump up.
	 * Do NOT use on Id-promote PUTs — identity idx:N → "27444" would false-flag a ghost delete.
	 */
	buildViewLinesWithRemoved(
		prevSnapshot: any,
		currSnapshot: any,
		linesKey = 'OrderLines',
		includeRemoved = true
	): any[] {
		const key =
			this.findLinesKeyInSnapshot(currSnapshot) ||
			this.findLinesKeyInSnapshot(prevSnapshot) ||
			linesKey;
		const prevLines = this.getLinesArray(prevSnapshot, key);
		const currLines = this.getLinesArray(currSnapshot, key).map((l) => ({ ...l, _historyRemoved: false }));
		if (!includeRemoved) {
			return this.decorateLinesForView(currLines);
		}

		const currById = new Map<string, any>();
		currLines.forEach((l) => {
			const id = this.getLineIdentity(l);
			if (id) currById.set(id, l);
		});
		const usedCurr = new Set<string>();
		const view: any[] = [];

		prevLines.forEach((prevLine, idx) => {
			const prevId = this.getLineIdentity(prevLine);
			if (prevId && currById.has(prevId)) {
				view.push({ ...currById.get(prevId), _historyRemoved: false });
				usedCurr.add(prevId);
				return;
			}
			// Id 0→N promote at same slot — continuity, not a delete
			const currAt = currLines[idx];
			if (currAt && this.isLineIdentityPromotion(prevLine, currAt)) {
				const currId = this.getLineIdentity(currAt);
				view.push({ ...currAt, _historyRemoved: false });
				if (currId) usedCurr.add(currId);
				return;
			}
			// Real delete: keep row at this index (do not append at bottom)
			if (prevId && !currById.has(prevId)) {
				view.push({ ...prevLine, _historyRemoved: true });
			}
		});

		// Lines added at this step (not present in prev)
		currLines.forEach((l) => {
			const id = this.getLineIdentity(l);
			if (!id || usedCurr.has(id)) return;
			view.push({ ...l, _historyRemoved: false });
		});

		return this.decorateLinesForView(view);
	}

	/** True when curr is the same FormArray row as prev after API assigned a real Id. */
	isLineIdentityPromotion(prevLine: any, currLine: any): boolean {
		const prevId = Number(prevLine?.Id) || 0;
		const currId = Number(currLine?.Id) || 0;
		return prevId <= 0 && currId > 0;
	}

	/** True when this row is a deleted line kept visible for history (FormGroup or plain). */
	isHistoryRemovedLine(line: any): boolean {
		if (!line) return false;
		if (typeof line.get === 'function') {
			return !!line.get('_historyRemoved')?.value;
		}
		return !!line._historyRemoved;
	}

	/**
	 * History step N = cumulative logs 1..N only.
	 * Always clear header values first, then patchValue(snapshot_1_to_N).
	 * Going back from 3 → 2 must not keep fields that only appeared in log 3.
	 *
	 * Does NOT rebuild line FormGroups here — incomplete groups would drop ng-select
	 * dataSources (_IDItemDataSource, …). Caller clears the array; detail child
	 * rebuilds rows after historyRevision bump (with item._Items helpers intact).
	 */
	applyCumulativeSnapshotToForm(
		form: FormGroup,
		snapshot: any,
		entityId?: number | string,
		linesKey: string = 'OrderLines'
	): void {
		if (!form?.controls) return;

		// 1) Clear every header control (except Id / private _helpers if ever on form)
		Object.keys(form.controls).forEach((key) => {
			if (LINES_KEYS.includes(key)) return;
			if (key.startsWith('_')) return;
			const ctrl = form.get(key);
			if (!ctrl || ctrl instanceof FormArray) return;
			if (key === 'Id') {
				ctrl.setValue(entityId ?? snapshot?.Id ?? null, { emitEvent: false });
				return;
			}
			ctrl.setValue(null, { emitEvent: false });
		});

		// 2) Clear line FormArray only — child rebuilds proper groups + dataSources
		const lineCtrl = form.get(linesKey);
		if (lineCtrl instanceof FormArray) {
			while (lineCtrl.length > 0) lineCtrl.removeAt(0);
		}

		// 3) Patch only fields present in cumulative snapshot 1..N
		const patch: Record<string, any> = {};
		Object.keys(snapshot || {}).forEach((key) => {
			if (LINES_KEYS.includes(key)) return;
			if (key === 'Id' || key.startsWith('_')) return;
			if (!form.get(key)) return;
			const val = snapshot[key];
			if (val !== null && typeof val === 'object' && !(val instanceof Date)) return;
			patch[key] = val;
		});
		if (Object.keys(patch).length) {
			form.patchValue(patch, { emitEvent: false });
		}
	}

	/** @deprecated Prefer applyCumulativeSnapshotToForm — kept for tests/callers that only need the patch map. */
	buildHistoryHeaderPatch(form: FormGroup, snapshot: any, entityId?: number | string): Record<string, any> {
		const patch: Record<string, any> = {};
		if (!form?.controls) return patch;

		Object.keys(form.controls).forEach((key) => {
			if (LINES_KEYS.includes(key)) return;
			const ctrl = form.get(key);
			if (!ctrl || ctrl instanceof FormArray) return;

			if (key === 'Id') {
				patch[key] = entityId ?? snapshot?.Id ?? null;
				return;
			}
			if (snapshot && Object.prototype.hasOwnProperty.call(snapshot, key)) {
				const val = snapshot[key];
				if (val !== null && typeof val === 'object' && !(val instanceof Date)) return;
				patch[key] = val;
			} else {
				patch[key] = null;
			}
		});
		return patch;
	}

	/** Map highlight keys to both history key and persisted line Id (grid uses Id after save). */
	expandLineHighlight(
		diff: LineDiffResult,
		currSnapshot: any,
		linesKey = 'OrderLines'
	): LineDiffResult {
		const lineIds = new Set<string>();
		const lineFields = new Map<string, Set<string>>();
		const lines = this.getLinesArray(currSnapshot, linesKey);

		diff.lineIds.forEach((key) => {
			lineIds.add(key);
			const line =
				lines.find((l) => this.getLineIdentity(l) === key) ||
				lines.find((l) => String(l?.Id) === key);
			const aliases = new Set<string>([key]);
			if (line?._historyLineKey) aliases.add(String(line._historyLineKey));
			if (Number(line?.Id) > 0) aliases.add(String(line.Id));

			const fields = diff.lineFields.get(key);
			aliases.forEach((alias) => {
				lineIds.add(alias);
				if (fields?.size) lineFields.set(alias, new Set(fields));
			});
		});

		return { lineIds, lineFields };
	}

	isLineFieldChanged(line: any, fieldId: string): boolean {
		if (!this.active || !fieldId) return false;
		const key = this.getLineIdentity(line);
		if (!key) return false;
		let fields = this.changedLineFields.get(key);
		if (!fields && Number(line?.Id) > 0) {
			fields = this.changedLineFields.get(String(line.Id));
		}
		return fields?.has(fieldId) ?? false;
	}

	loadHistory(segment3: string, segment4: string, entityId: number | string, take = 200): Promise<EnrichedLog[]> {
		const query: any = {
			Segment3: segment3,
			Segment4: segment4,
			EntityId: entityId,
			Take: take,
		};
		return this.commonService
			.connect('GET', 'SYS/Log/EntityHistory', query)
			.toPromise()
			.then((data: any) => {
				const rows = (Array.isArray(data) ? data : []).map((row) => this.enrich(row));
				const asc = [...rows].sort((a, b) => {
					const ta = a._time ? a._time.getTime() : 0;
					const tb = b._time ? b._time.getTime() : 0;
					if (ta !== tb) return ta - tb;
					return (a.Id || 0) - (b.Id || 0);
				});
				asc.forEach((row, i) => {
					row._prevData = i > 0 ? asc[i - 1]._data : null;
				});
				return asc;
			});
	}

	/** Newest-first list for UI navigation */
	toNewestFirst(itemsAsc: EnrichedLog[]): EnrichedLog[] {
		return [...itemsAsc].reverse();
	}

	enrich(row: any): EnrichedLog {
		const method = (row.Method || '').toUpperCase();
		const action = this.decodeSegment(row.Segment5);
		let label = 'Update';
		let badge = 'update';

		let parsed: any = null;
		if (row.Data) {
			try {
				parsed = typeof row.Data === 'string' ? JSON.parse(row.Data) : row.Data;
			} catch {
				parsed = null;
			}
		}

		if (method === 'DELETE' || this.hasDeletedLinesPayload(parsed)) {
			label = 'Delete lines';
			badge = 'delete';
		} else if (method === 'POST' && (!action || /^\d+$/.test(String(action)))) {
			label = 'Create';
			badge = 'create';
		} else if (method === 'PUT' && (!action || /^\d+$/.test(String(action)))) {
			label = 'Update';
			badge = 'update';
		} else if (action) {
			if (/ImportDetailFile/i.test(action)) {
				label = 'Import lines';
				badge = 'import';
			} else if (/ImportDetailFromSaleOrders/i.test(action)) {
				label = 'Import from SO';
				badge = 'import';
			} else if (
				/^(Approve|ApproveOrders|SubmitForApproval|SubmitOrdersForApproval|Disapprove|DisapproveOrders|Cancel|CancelOrders|ConfirmOrders|ConfirmDelivery)$/i.test(
					String(action)
				)
			) {
				label = parsed?.Status ? `${this.humanizeAction(action)} → ${parsed.Status}` : this.humanizeAction(action);
				badge = 'action';
			} else {
				label = this.humanizeAction(action);
				badge = 'action';
			}
		}

		return {
			...row,
			_label: label,
			_badge: badge,
			_time: row.Date ? new Date(row.Date) : null,
			_data: parsed,
			_action: action,
			_prevData: null,
		};
	}

	buildCumulativeSnapshots(itemsAsc: EnrichedLog[]): SnapshotAtStep[] {
		let snapshot: any = {};
		const steps: SnapshotAtStep[] = [];

		for (const entry of itemsAsc) {
			snapshot = this.mergeStepIntoSnapshot(snapshot, entry);
			steps.push({
				entry,
				snapshot: this.cloneSnapshot(snapshot),
			});
		}

		return steps;
	}

	mergeStepIntoSnapshot(base: any, row: EnrichedLog): any {
		const snapshot = this.cloneSnapshot(base);
		const method = (row.Method || '').toUpperCase();
		const data = row._data;

		if (method === 'DELETE') {
			const ids = this.resolveDeletedLineIds(row);
			const linesKey = this.findLinesKeyInSnapshot(snapshot) || 'OrderLines';
			this.applyDeleteToLines(snapshot, linesKey, ids);
			return snapshot;
		}

		if (data && typeof data === 'object' && !Array.isArray(data)) {
			Object.keys(data).forEach((key) => {
				if (LINES_KEYS.includes(key)) return;
				if (SKIP_KEYS.has(key)) return;
				if (data[key] !== undefined && data[key] !== null && typeof data[key] !== 'object') {
					snapshot[key] = data[key];
				}
			});

			const linesKey = LINES_KEYS.find((k) => data[k] != null && (Array.isArray(data[k]) || typeof data[k] === 'object'));
			if (linesKey) {
				// Pass raw payload (array or FormArray-index map) — merge simulates FormArray indices.
				this.mergeLinesIntoSnapshot(snapshot, linesKey, data[linesKey]);
			}

			// PR / PQ / POS… soft-delete via PUT { DeletedLines: [ids] } (not HTTP DELETE Detail).
			const softDeleted = this.parseDeletedLinesField(data.DeletedLines);
			if (softDeleted.length) {
				const key = linesKey || this.findLinesKeyInSnapshot(snapshot) || 'OrderLines';
				this.applyDeleteToLines(snapshot, key, softDeleted);
			}
		}

		return snapshot;
	}

	/** True when PUT body carries soft-deleted detail Ids (PR pattern). */
	hasDeletedLinesPayload(data: any): boolean {
		return this.parseDeletedLinesField(data?.DeletedLines).length > 0;
	}

	parseDeletedLinesField(raw: any): number[] {
		if (raw == null || raw === '') return [];
		if (Array.isArray(raw)) {
			return raw.map((x) => Number(x?.Id ?? x)).filter((n) => n > 0);
		}
		if (typeof raw === 'number') return raw > 0 ? [raw] : [];
		if (typeof raw === 'string') return this.parseIdList(raw);
		return [];
	}

	/**
	 * Remove deleted detail Ids. Id is often assigned in API response (not in prior PUT body),
	 * so snapshot may still have Id=0 for that FormArray row — fall back to oldest unsaved line.
	 */
	applyDeleteToLines(snapshot: any, linesKey: string, ids: number[]) {
		if (!ids.length) return;
		let lines = this.getLinesArray(snapshot, linesKey).map((l) => ({ ...l }));
		const idSet = new Set(ids);

		for (const id of ids) {
			const byId = lines.findIndex((l) => Number(l?.Id) === id);
			if (byId >= 0) {
				lines.splice(byId, 1);
				continue;
			}
			const pending = lines.findIndex((l) => Number(l?.Id) <= 0);
			if (pending >= 0) lines.splice(pending, 1);
		}

		lines = lines.filter((l) => !idSet.has(Number(l?.Id)));
		snapshot[linesKey] = lines;
	}

	/** Collect detail Ids removed by DELETE Detail/[ids] or PUT DeletedLines. */
	resolveDeletedLineIds(row: EnrichedLog): number[] {
		const data = row._data;
		if (data && typeof data === 'object' && !Array.isArray(data)) {
			const soft = this.parseDeletedLinesField(data.DeletedLines);
			if (soft.length) return soft;
		}

		const method = (row.Method || '').toUpperCase();
		// Segment5 on PUT parent is often the header Id — only treat as detail Ids for HTTP DELETE.
		if (method === 'DELETE') {
			const fromSegment = this.parseIdList(row._action || row.Segment5);
			if (fromSegment.length) return fromSegment;
			const fromUrl = this.parseIdListFromApiUrl((row as any).API);
			if (fromUrl.length) return fromUrl;
		} else {
			const fromUrl = this.parseIdListFromApiUrl((row as any).API);
			if (fromUrl.length) return fromUrl;
		}

		if (!data) return [];
		if (Array.isArray(data)) {
			return data.map((x) => Number(x?.Id ?? x)).filter((n) => n > 0);
		}
		if (typeof data === 'object') {
			if (Array.isArray(data.Ids)) {
				return data.Ids.map((x: any) => Number(x)).filter((n: number) => n > 0);
			}
			for (const key of LINES_KEYS) {
				if (data[key] == null) continue;
				const lines = this.linesFromPayload(data[key]);
				const ids = lines.map((l) => Number(l?.Id)).filter((n) => n > 0);
				if (ids.length) return ids;
			}
		}
		return [];
	}

	parseIdListFromApiUrl(api: string): number[] {
		if (!api) return [];
		try {
			const path = decodeURIComponent(String(api));
			const m = path.match(/Detail\/(\[[^\]]+\]|\d+(?:\s*,\s*\d+)*)/i);
			return m ? this.parseIdList(m[1]) : [];
		} catch {
			return [];
		}
	}

	/**
	 * FE saves dirty OrderLines as a map keyed by FormArray index: `{0: row, 2: row}`.
	 * Merge patches by that index (FormArray simulation). Id=0 + later Id>0 at same index → promote.
	 */
	mergeLinesIntoSnapshot(snapshot: any, linesKey: string, rawLines: any) {
		const result = this.getLinesArray(snapshot, linesKey).map((l) => ({ ...l }));

		if (rawLines && typeof rawLines === 'object' && !Array.isArray(rawLines)) {
			Object.keys(rawLines)
				.map((k) => ({ k, idx: Number(k) }))
				.filter((x) => !isNaN(x.idx) && x.idx >= 0)
				.sort((a, b) => a.idx - b.idx)
				.forEach(({ k, idx }) => {
					const incoming = rawLines[k];
					if (!incoming || typeof incoming !== 'object') return;
					this.patchLineAtFormIndex(result, idx, incoming);
				});
		} else if (Array.isArray(rawLines)) {
			rawLines.forEach((incoming, idx) => {
				if (!incoming || typeof incoming !== 'object') return;
				const id = Number(incoming.Id);
				if (id > 0) {
					const existing = result.findIndex((l) => Number(l.Id) === id);
					if (existing >= 0) {
						result[existing] = this.mergeLineObjects(result[existing], incoming);
						return;
					}
				}
				this.patchLineAtFormIndex(result, idx, incoming);
			});
		}

		snapshot[linesKey] = result;
	}

	patchLineAtFormIndex(result: any[], idx: number, incoming: any) {
		while (result.length < idx) {
			result.push({ Id: 0, _historyLineKey: `idx:${result.length}` });
		}
		if (result[idx]) {
			result[idx] = this.mergeLineObjects(result[idx], incoming);
		} else if (idx === result.length) {
			result.push(this.mergeLineObjects({}, incoming));
		} else {
			result[idx] = this.mergeLineObjects({}, incoming);
		}
		const id = Number(result[idx].Id);
		result[idx]._historyLineKey = id > 0 ? String(id) : `idx:${idx}`;
	}

	mergeLineObjects(prev: any, incoming: any): any {
		const merged = { ...prev, ...incoming };
		const id = Number(merged.Id);
		if (id > 0) merged._historyLineKey = String(id);
		return merged;
	}

	/** Normalize for consumers that still expect an array (diff / decorate). */
	normalizeLines(val: any): any[] {
		return this.linesFromPayload(val);
	}

	linesFromPayload(val: any): any[] {
		if (Array.isArray(val)) {
			return val
				.filter((l) => l && typeof l === 'object')
				.map((l, i) => {
					const id = Number(l.Id);
					return {
						...l,
						_historyLineKey: id > 0 ? String(id) : l._historyLineKey ? String(l._historyLineKey) : `idx:${i}`,
						_payloadIndex: i,
					};
				});
		}
		if (val && typeof val === 'object') {
			return Object.keys(val)
				.sort((a, b) => (Number(a) || 0) - (Number(b) || 0))
				.map((k) => {
					const line = val[k];
					if (!line || typeof line !== 'object') return null;
					const id = Number(line.Id);
					const idx = Number(k);
					return {
						...line,
						_historyLineKey: id > 0 ? String(id) : `idx:${k}`,
						_payloadIndex: isNaN(idx) ? undefined : idx,
					};
				})
				.filter((l) => !!l);
		}
		return [];
	}

	findLinesKeyInSnapshot(snapshot: any): string | null {
		for (const key of LINES_KEYS) {
			if (Array.isArray(snapshot[key])) return key;
		}
		return null;
	}

	getLinesArray(snapshot: any, linesKey: string): any[] {
		return Array.isArray(snapshot?.[linesKey]) ? snapshot[linesKey] : [];
	}

	diffHeaderFields(prevSnapshot: any, currSnapshot: any, isCreate = false): Set<string> {
		const changed = new Set<string>();
		const keys = new Set([...Object.keys(currSnapshot || {}), ...Object.keys(prevSnapshot || {})]);

		keys.forEach((key) => {
			if (SKIP_KEYS.has(key)) return;
			if (LINES_KEYS.includes(key)) return;
			if (!(key in HISTORY_FIELD_LABELS) && /^ID[A-Z]/.test(key)) return;
			if (!(key in HISTORY_FIELD_LABELS)) return;

			const afterVal = currSnapshot?.[key];
			const beforeVal = prevSnapshot?.[key];
			if (afterVal !== undefined && afterVal !== null && typeof afterVal === 'object') return;

			const afterStr = this.formatValue(afterVal);
			const beforeStr = this.formatValue(beforeVal);

			if (isCreate) {
				if (afterStr !== '—') changed.add(key);
				return;
			}
			if (afterStr !== beforeStr && afterStr !== '—') changed.add(key);
		});

		return changed;
	}

	diffLineChanges(prevSnapshot: any, currSnapshot: any): LineDiffResult {
		const lineIds = new Set<string>();
		const lineFields = new Map<string, Set<string>>();

		const linesKey =
			this.findLinesKeyInSnapshot(currSnapshot) ||
			this.findLinesKeyInSnapshot(prevSnapshot) ||
			'OrderLines';

		const prevLines = this.getLinesArray(prevSnapshot, linesKey);
		const currLines = this.getLinesArray(currSnapshot, linesKey);

		const pairedPrev = new Set<number>();
		const pairedCurr = new Set<number>();

		const pairFieldDiff = (prevLine: any, currLine: any) => {
			const key = this.getLineIdentity(currLine) || this.getLineIdentity(prevLine);
			if (!key) return;
			const fields = new Set<string>();
			LINE_DIFF_KEYS.forEach((k) => {
				if (k === 'Id') return; // Id 0→N promote is continuity, not a user edit
				const a = this.formatValue(prevLine?.[k]);
				const b = this.formatValue(currLine?.[k]);
				if (a !== b) fields.add(k);
			});
			if (fields.size) {
				lineIds.add(key);
				lineFields.set(key, fields);
			}
		};

		// Pass 1: FormArray-index continuity (incl. Id 0→N promote at same slot)
		const slotN = Math.min(prevLines.length, currLines.length);
		for (let i = 0; i < slotN; i++) {
			const p = prevLines[i];
			const c = currLines[i];
			const pId = Number(p?.Id) || 0;
			const cId = Number(c?.Id) || 0;
			// After a mid-list DELETE, index i may hold a different persisted Id — do not pair.
			if (pId > 0 && cId > 0 && pId !== cId) continue;
			pairedPrev.add(i);
			pairedCurr.add(i);
			pairFieldDiff(p, c);
		}

		// Pass 2: remaining by identity (lines that shifted index after delete)
		const prevById = new Map<string, number>();
		const currById = new Map<string, number>();
		prevLines.forEach((l, i) => {
			if (pairedPrev.has(i)) return;
			const key = this.getLineIdentity(l);
			if (key) prevById.set(key, i);
		});
		currLines.forEach((l, i) => {
			if (pairedCurr.has(i)) return;
			const key = this.getLineIdentity(l);
			if (key) currById.set(key, i);
		});

		const allKeys = new Set([...prevById.keys(), ...currById.keys()]);
		allKeys.forEach((id) => {
			const pi = prevById.get(id);
			const ci = currById.get(id);
			const prevLine = pi !== undefined ? prevLines[pi] : undefined;
			const currLine = ci !== undefined ? currLines[ci] : undefined;

			if (!prevLine && currLine) {
				lineIds.add(id);
				const fields = new Set<string>();
				LINE_DIFF_KEYS.forEach((k) => {
					if (currLine[k] !== undefined && currLine[k] !== null && currLine[k] !== '') fields.add(k);
				});
				if (fields.size) lineFields.set(id, fields);
				return;
			}

			if (prevLine && !currLine) {
				lineIds.add(id);
				lineFields.set(id, new Set(['_removed']));
				return;
			}

			if (prevLine && currLine) {
				pairFieldDiff(prevLine, currLine);
			}
		});

		return { lineIds, lineFields };
	}

	buildDiff(prev: any, curr: any, isCreate: boolean): DiffRow[] {
		const rows: DiffRow[] = [];
		const keys = new Set([...Object.keys(curr || {}), ...Object.keys(prev || {})]);

		keys.forEach((key) => {
			if (SKIP_KEYS.has(key)) return;
			if (LINES_KEYS.includes(key)) return;
			if (!(key in HISTORY_FIELD_LABELS) && /^ID[A-Z]/.test(key)) return;
			if (!(key in HISTORY_FIELD_LABELS)) return;

			const afterVal = curr?.[key];
			const beforeVal = prev?.[key];

			if (afterVal !== undefined && afterVal !== null && typeof afterVal === 'object') return;

			const afterStr = this.formatValue(afterVal);
			const beforeStr = this.formatValue(beforeVal);

			if (isCreate) {
				if (afterStr === '—') return;
				rows.push({ field: key, label: HISTORY_FIELD_LABELS[key] || key, before: '—', after: afterStr });
				return;
			}

			if (afterStr === beforeStr) return;
			if (afterStr === '—' && beforeStr === '—') return;
			if (!(key in (curr || {})) && key in (prev || {})) return;

			rows.push({
				field: key,
				label: HISTORY_FIELD_LABELS[key] || key,
				before: beforeStr,
				after: key in (curr || {}) ? afterStr : '—',
			});
		});

		return rows;
	}

	summarizeLines(data: any): string | null {
		const lines = data?.OrderLines || data?.OrderDetails || data?.Lines;
		if (!Array.isArray(lines) || !lines.length) return null;

		const changed = lines.filter((l) => l && typeof l === 'object');
		if (!changed.length) return null;

		const parts = changed.slice(0, 8).map((line: any, idx: number) => {
			const qty = line.UoMQuantityExpected ?? line.QuantityExpected;
			const price = line.UoMPrice;
			const bits: string[] = [];
			if (line.Id) bits.push(`#${line.Id}`);
			else bits.push(`new #${idx + 1}`);
			if (qty !== undefined && qty !== null && qty !== '') bits.push(`qty ${qty}`);
			if (price !== undefined && price !== null && price !== '') bits.push(`price ${price}`);
			return bits.join(' · ');
		});

		const more = changed.length > 8 ? ` (+${changed.length - 8} more)` : '';
		return `${changed.length} line(s) in this save: ${parts.join('; ')}${more}`;
	}

	formatViewTitle(entry: EnrichedLog, index: number, total: number): string {
		const who = entry?.LoggedBy || '—';
		const dateStr = entry?._time ? this.formatValue(entry._time.toISOString()) : '—';
		return `${who} — ${dateStr}`;
	}

	formatViewPosition(index: number, total: number): string {
		// Newest-first index 0 → show N; oldest (left) → show 1
		if (total <= 0) return '0/0';
		return `${total - index}/${total}`;
	}

	formatViewSubtitle(entry: EnrichedLog): string | null {
		if (!entry) return null;
		const method = (entry.Method || '').toUpperCase();
		const data = entry._data;

		if (method === 'DELETE' || entry._badge === 'delete') {
			const ids = this.resolveDeletedLineIds(entry);
			return ids.length ? `Removed ${ids.length} line(s): ${ids.join(', ')}` : 'Removed order line(s)';
		}

		if (entry._action && /ImportDetailFile/i.test(entry._action)) {
			const created = data?.CreatedIds?.length ?? 0;
			const updated = data?.UpdatedIds?.length ?? 0;
			const parts = ['Imported product lines from Excel'];
			if (created) parts.push(`Added ${created} line(s)`);
			if (updated) parts.push(`Updated ${updated} line(s)`);
			return parts.join(' · ');
		}

		if (entry._action && /ImportDetailFromSaleOrders/i.test(entry._action)) {
			const soIds = data?.SOIds;
			if (Array.isArray(soIds) && soIds.length) {
				return `Imported from ${soIds.length} sale order(s): ${soIds.join(', ')}`;
			}
			return 'Imported lines from sale orders';
		}

		if (entry._badge === 'action') {
			return entry._label || null;
		}

		const lineSummary = data ? this.summarizeLines(data) : null;
		return lineSummary;
	}

	findLinesControlName(formGroup: FormGroup): string | null {
		if (!formGroup) return null;
		for (const key of LINES_KEYS) {
			if (formGroup.get(key) instanceof FormArray) return key;
		}
		return null;
	}

	syncFormArrayFromSnapshot(formGroup: FormGroup, linesControlName: string, lines: any[]): void {
		if (!formGroup || !linesControlName) return;
		const control = formGroup.get(linesControlName);
		if (!(control instanceof FormArray)) return;

		const formArray = control as FormArray;
		const snapshotLines = Array.isArray(lines) ? lines : [];
		const byId = new Map<string, any>();
		snapshotLines.forEach((l) => {
			const key = this.getLineIdentity(l);
			if (key) byId.set(key, l);
		});

		// Update existing rows
		for (let i = formArray.length - 1; i >= 0; i--) {
			const group = formArray.at(i) as FormGroup;
			const id = this.getLineIdentity({
				Id: group.get('Id')?.value,
				_historyLineKey: group.get('_historyLineKey')?.value,
			});
			if (id && byId.has(id)) {
				group.patchValue(byId.get(id), { emitEvent: false });
				if (group.get('_historyLineKey')) {
					group.get('_historyLineKey')?.setValue(byId.get(id)?._historyLineKey || id, { emitEvent: false });
				}
				byId.delete(id);
			} else {
				formArray.removeAt(i);
			}
		}

		// Add new rows
		byId.forEach((line) => {
			const template = formArray.length > 0 ? (formArray.at(0) as FormGroup) : null;
			const newGroup = template ? this.cloneEmptyLineGroup(template) : this.formBuilder.group(line);
			newGroup.patchValue(line, { emitEvent: false });
			if (!(newGroup as any).controls['_historyLineKey']) {
				(newGroup as any).controls['_historyLineKey'] = this.formBuilder.control(line._historyLineKey || this.getLineIdentity(line));
			}
			formArray.push(newGroup);
		});
	}

	cloneEmptyLineGroup(templateGroup: FormGroup): FormGroup {
		const controls: Record<string, any> = {};
		Object.keys(templateGroup.controls).forEach((key) => {
			const c = templateGroup.get(key);
			if (c) {
				controls[key] = this.formBuilder.control({ value: null, disabled: c.disabled });
			}
		});
		return this.formBuilder.group(controls);
	}

	getLineIdentity(line: any): string | null {
		if (!line) return null;
		// Persisted Id always wins — map-index keys must never override it.
		if (typeof line.get === 'function') {
			const id = Number(line.get('Id')?.value);
			if (id > 0) return String(id);
			const hist = line.get('_historyLineKey')?.value;
			if (hist !== undefined && hist !== null && hist !== '') return String(hist);
			return null;
		}
		const id = Number(line.Id);
		if (id > 0) return String(id);
		if (line._historyLineKey !== undefined && line._historyLineKey !== null && line._historyLineKey !== '') {
			return String(line._historyLineKey);
		}
		return null;
	}

	/** True when the whole row should glow (add / remove), not a field-only edit. */
	isWholeLineChange(line: any): boolean {
		if (!this.active) return false;
		const key = this.getLineIdentity(line);
		if (!key || !this.changedLineIds.has(key)) return false;
		const fields = this.changedLineFields.get(key);
		if (!fields || fields.size === 0) return true;
		if (fields.has('_removed')) return true;
		// New line: many business fields changed at once — still highlight cells, not row chrome.
		return false;
	}

	formatValue(val: any): string {
		if (val === null || val === undefined || val === '') return '—';
		if (typeof val === 'boolean') return val ? 'Yes' : 'No';
		if (typeof val === 'object') return '—';
		const s = String(val);
		if (/^\d{4}-\d{2}-\d{2}T/.test(s)) {
			const d = new Date(s);
			if (!isNaN(d.getTime())) {
				const dd = String(d.getDate()).padStart(2, '0');
				const mm = String(d.getMonth() + 1).padStart(2, '0');
				const yyyy = d.getFullYear();
				return `${dd}/${mm}/${yyyy}`;
			}
		}
		return s;
	}

	decodeSegment(raw: any): string {
		if (raw == null) return '';
		try {
			return decodeURIComponent(String(raw));
		} catch {
			return String(raw);
		}
	}

	parseIdList(raw: string): number[] {
		const s = this.decodeSegment(raw).replace(/[\[\]]/g, '');
		return s
			.split(',')
			.map((p) => parseInt(p.trim(), 10))
			.filter((n) => n > 0);
	}

	humanizeAction(action: string): string {
		return String(action)
			.replace(/([a-z])([A-Z])/g, '$1 $2')
			.replace(/_/g, ' ')
			.trim();
	}

	private cloneSnapshot(snapshot: any): any {
		const copy = { ...(snapshot || {}) };
		LINES_KEYS.forEach((key) => {
			if (Array.isArray(copy[key])) {
				copy[key] = copy[key].map((l: any) => ({ ...l }));
			}
		});
		return copy;
	}
}
