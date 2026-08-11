import { Component, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subject, Subscription, concat, of, distinctUntilChanged, tap, switchMap, catchError, filter, mergeMap, from } from 'rxjs';

import { FormControlComponent } from './components/controls/form-control.component';
import { InputControlComponent } from './components/controls/input-control.component';
import { PageConfig } from './interfaces/base-page-interface';
import { AdvanceFilterModalComponent } from './modals/advance-filter-modal/advance-filter-modal.component';
import { PopoverPage } from './pages/SYS/popover/popover.page';
import { EnrichedLog, HistoryService, SnapshotAtStep } from './services/custom/history.service';
import { EVENT_TYPE } from './services/static/event-type';
import { lib } from './services/static/global-functions';
import { APIList } from './services/static/global-variable';
import { dogF, environment } from 'src/environments/environment';
import { PageDataManagementService } from './services/page/data-management.service';
import { FormManagementService } from './services/page/form-management.service';

@Component({
	template: '',
	providers: [PopoverPage],
	standalone: false,
})
export abstract class PageBase implements OnInit {
	historyService = inject(HistoryService);

	dataManagementService: PageDataManagementService;
	formManagementService = new FormManagementService();
	env;
	route;
	navCtrl;
	alertCtrl;
	popoverCtrl;
	pageProvider;
	modalController;
	loadingController;
	//Detail page
	id: any;
	cdr;
	formGroup: FormGroup;
	submitAttempt = false;
	isAutoSave = true;

	item = null;
	items: any = [];
	selectedItems: any = [];

	/** History view mode (inline Time Machine) */
	historyItems: EnrichedLog[] = [];
	historySnapshots: SnapshotAtStep[] = [];
	historyIndex = 0;
	/** Bumps on every snapshot apply so child grids always rebuild. */
	historyRevision = 0;
	historyViewTitle = '';
	historyViewSubtitle = '';
	historyViewPosition = '';
	historySnapshotBefore: any = null;
	historySavedCanEdit = false;

	localQuery: any = {};

	query: any = {
		Keyword: '',
		Take: 200,
		Skip: 0,
	};
	maskConfig = { thousandSeparator: ',' };
	schemaPage: any;
	pageConfig: PageConfig = {
		pageCode: '',
		pageName: '',
		pageTitle: '',
		pageRemark: '',
		pageIcon: 'star',
		pageColor: 'primary',

		isDetailPage: false,
		isShowMore: false,
		isShowSearch: false,
		isShowCheck: false,
		isShowFeature: false,
		infiniteScroll: true,
		forceLoadData: false,
		refresher: true,
		showSpinner: true,
		isEndOfData: false,
		didEnter: false,
		isMainPageActive: true,
		isSubActive: false,
		isFeatureAsMain: false,
		sort: [],
		dividers: [],

		ShowAdd: true,
		ShowSearch: true,
		ShowRefresh: true,
		ShowExport: true,
		ShowImport: true,
		ShowHelp: true,
		ShowHistory: false,
		ShowFeature: false,

		ShowCopy: true,
		ShowChangeBranch: true,
		ShowSubmit: true,
		ShowApprove: true,
		ShowDisapprove: true,
		ShowMerge: true,
		ShowSplit: true,
		ShowCancel: true,
		ShowArchive: true,
		ShowDelete: true,
		ShowPrint: false,
	};

	subscriptions: Subscription[] = [];

	//Data load
	preLoadData(event = null) {
		this.clearData();
		this.loadData();
	}

	clearData() {
		this.pageConfig.showSpinner = true;
		this.pageConfig.isEndOfData = false;
		this.items = [];
	}

	/** Last page when API returns fewer rows than requested page size (or none). */
	markEndOfDataIfLastPage(resultLength: number) {
		const pageSize = Number(this.query?.Take) || 100;
		if (resultLength === 0 || resultLength < pageSize) {
			this.pageConfig.isEndOfData = true;
		}
	}

	loadData(event = null, forceReload = false) {
		if (this.pageConfig.isDetailPage) {
			this.loadAnItem(event);
		} else {
			this.parseSort();

			if (this.pageProvider && !this.pageConfig.isEndOfData) {
				const apiQuery = this.getApiQuery();
				if (event == 'search') {
					this.pageProvider.read(apiQuery, this.pageConfig.forceLoadData || forceReload).then((result: any) => {
						this.markEndOfDataIfLastPage(result.data.length);
						this.items = result.data;
						this.loadedData(null);
					});
				} else {
					this.query.Skip = this.items.length;
					apiQuery.Skip = this.query.Skip;
					this.pageProvider
						.read(apiQuery, this.pageConfig.forceLoadData)
						.then((result: any) => {
							this.markEndOfDataIfLastPage(result.data.length);
							if (result.data.length > 0) {
								this.items = this.dataManagementService.appendPaginatedItems(this.items, result.data);
							}

							this.loadedData(event);
						})
						.catch((err) => {
							if (err.message != null) {
								this.env.showMessage(err.message, 'danger');
							} else {
								this.env.showMessage('Cannot extract data', 'danger');
							}

							this.loadedData(event);
						});
				}
			} else {
				this.loadedData(event);
			}
		}
	}

	/** Drop UI-only *TimeFrame objects; map Relative/Absolute Values → *From/*To for API. */
	getApiQuery(query = this.query) {
		const q = { ...(query || {}) };
		Object.keys(q).forEach((key) => {
			if (!(key.endsWith('TimeFrame') && q[key] && typeof q[key] === 'object' && !Array.isArray(q[key]))) {
				return;
			}
			const prop = key.slice(0, -'TimeFrame'.length);
			const tf = q[key];
			if (tf.From && tf.From.IsNull !== true) {
				q[prop + 'From'] =
					tf.From.Value ??
					(tf.From.Type === 'Relative' ? lib.dateFormat(lib.calcTimeValue(tf.From, false), 'yyyy-mm-ddThh:MM:ss') : null);
			}
			if (tf.To && tf.To.IsNull !== true) {
				q[prop + 'To'] =
					tf.To.Value ?? (tf.To.Type === 'Relative' ? lib.dateFormat(lib.calcTimeValue(tf.To, true), 'yyyy-mm-ddThh:MM:ss') : null);
			}
			delete q[key];
		});
		return q;
	}

	DefaultItem = { Id: 0, IsDisabled: false };
	loadedData(event = null, ignoredFromGroup = false) {
		this.pageConfig.showSpinner = false;
		event?.target?.complete();

		if (this.pageConfig.isDetailPage) {
			if (this.item) {
				if (this.item.hasOwnProperty('IsDeleted') && this.item.IsDeleted) this.nav('not-found', 'back');
				this.formGroup?.patchValue(this.item);
				this.formGroup?.markAsPristine();
				this.cdr?.detectChanges();

				if (this.item.IsDisabled) this.pageConfig.canEdit = false;

				this.showCommandBySelectedRows([this.item]);
			}

			if ((!this.item || this.id == 0) && this.pageConfig.canAdd) {
				if (!this.item) this.item = { Id: 0, IsDisabled: false };
				else Object.assign(this.item, this.DefaultItem);

				this.pageConfig.canEdit = this.pageConfig.canAdd;
				// this.formGroup?.reset();
				// this.formGroup?.patchValue(this.item);
			}

			if (!(this.pageConfig.canEdit || (this.pageConfig.canAdd && this.item.Id == 0) || ignoredFromGroup)) {
				this.formGroup?.disable();
			}
		}
		//set dividers: walk sort[0..n-1] in order; each step must match some divider.fields, else stop (any column without divider ⇒ no further dividers)
		else if (this.pageConfig.dividers?.length && this.pageConfig.sort?.length > 0) {
			const sort = this.pageConfig.sort;

			const clearRowDividers = () => {
				this.items.forEach((item) => {
					delete item['_divider'];
					delete item['_dividers'];
				});
			};

			const activeDividers: (typeof this.pageConfig.dividers)[number][] = [];
			const usedDividerIdx = new Set<number>();
			for (let j = 0; j < sort.length; j++) {
				const dim = sort[j].Dimension;
				const idx = this.pageConfig.dividers.findIndex((d) => d.fields?.includes(dim));
				if (idx < 0) {
					break;
				}
				if (!usedDividerIdx.has(idx)) {
					usedDividerIdx.add(idx);
					activeDividers.push(this.pageConfig.dividers[idx]);
				}
			}

			if (!activeDividers.length) {
				clearRowDividers();
			} else {
				this.items.forEach((item, index) => {
					delete item['_divider'];
					delete item['_dividers'];
					const lines: string[] = [];
					for (const divider of activeDividers) {
						const dividerValue = divider.dividerFn(item, index, this.items);
						if (dividerValue) {
							lines.push(dividerValue);
						}
					}
					if (lines.length) {
						item['_dividers'] = lines;
						item['_divider'] = lines[0];
					}
				});
			}
		}
	}

	setFormValues(data, form = this.formGroup, instantly = false, forceSave = false) {
		//Loop through data object and find control in form group
		//Check if control is form array or form group
		//If form array, loop through all controls in array
		//If form group, loop through all controls in group
		//Set value, mark as dirty and touched

		Object.keys(data).forEach((key) => {
			//if (data.hasOwnProperty(key)) {
			const value = data[key];
			if (form.controls[key]) {
				const control = form.controls[key];
				if (control instanceof FormGroup) {
					this.setFormValues(value, control, instantly, forceSave);
				} else if (control instanceof FormArray) {
					control.controls.forEach((arrayControl: any) => {
						this.setFormValues(value, arrayControl, instantly, forceSave);
					});
				} else {
					control.setValue(value);
					control.markAsDirty();
					control.markAsTouched();
				}
			}
			//}
		});

		//Check this.pageConfig.systemConfig.IsAutoSave then debounce to save change after 1s. Save change if instantly.
		//Else save change if forceSave is true

		if (this.pageConfig.systemConfig.IsAutoSave) {
			if (instantly) {
				this.saveChange2();
			} else {
				this.debounce(() => {
					this.saveChange2();
				}, 1000);
			}
		} else if (forceSave) {
			this.saveChange2();
		} else {
			//Shake save button if not save
			let saveBtnElm = document.querySelector('.save-btn');
			if (saveBtnElm) {
				saveBtnElm.classList.add('shake');
				setTimeout(() => {
					saveBtnElm.classList.remove('shake');
				}, 2000);
			}
		}
	}

	buildSelectDataSource(searchFunction, buildFlatTree = false) {
		return this.formManagementService.createSelectDataSource(searchFunction, buildFlatTree);
	}

	refresh(event = null) {
		this.selectedItems = [];
		if (!this.pageConfig.showSpinner) {
			this.clearData();
			this.loadData(event, true);
		}
	}

	search(ev) {
		this.selectedItems = [];
		var val = ev.target.value;
		if (val == undefined) {
			val = '';
		}
		if (val.length > 2 || val == '') {
			this.query.Keyword = val;
			this.query.Skip = 0;
			this.pageConfig.isEndOfData = false;
			this.loadData('search');
		}
	}

	unselect() {
		this.selectedItems.forEach((s) => {
			s.checked = false;
		});
		this.selectedItems = [];
	}

	lastchecked = null;
	changeSelection(i, e = null) {
		if (e && e.shiftKey) {
			let from = this.items.indexOf(this.lastchecked);
			let to = this.items.indexOf(i);

			let start = Math.min(from, to);
			let end = Math.max(from, to) + 1;

			let itemsToCheck = this.items.slice(start, end);
			for (let j = 0; j < itemsToCheck.length; j++) {
				const it = itemsToCheck[j];

				it.checked = this.lastchecked.checked;
				const index = this.selectedItems.indexOf(it, 0);

				if (this.lastchecked.checked && index == -1) {
					this.selectedItems.push(it);
				} else if (!this.lastchecked.checked && index > -1) {
					this.selectedItems.splice(index, 1);
				}
			}
		} else if (e) {
			if (e.target.checked) {
				this.selectedItems.push(i);
			} else {
				const index = this.selectedItems.indexOf(i, 0);
				if (index > -1) {
					this.selectedItems.splice(index, 1);
				}
			}
		} else {
			if (i.checked) {
				this.selectedItems.push(i);
			} else {
				const index = this.selectedItems.indexOf(i, 0);
				if (index > -1) {
					this.selectedItems.splice(index, 1);
				}
			}
		}

		this.selectedItems = [...this.selectedItems];
		this.lastchecked = i;

		//e?.preventDefault();
		e?.stopPropagation();

		this.showCommandBySelectedRows(this.selectedItems);
	}

	showCommandBySelectedRows(selectedRows) {
		const showCommandRules = this.pageProvider?.showCommandRules;
		if (showCommandRules?.length) {
			const statuses = selectedRows.map((row) => row.Status);
			const filteredRules = showCommandRules.filter((rule) => statuses.includes(rule.Status));

			if (filteredRules.length === 0) {
				return;
			}

			const commonButtons = filteredRules.reduce((acc, rule) => {
				return acc.filter((btn) => rule.ShowBtns.includes(btn));
			}, filteredRules[0].ShowBtns);

			const keysToUpdate = new Set(showCommandRules.flatMap((rule) => rule.ShowBtns));

			keysToUpdate.forEach((key: string) => {
				this.pageConfig[key] = commonButtons.includes(key);
			});
		}
	}

	archiveItems(publishEventCode = this.pageConfig.pageName) {
		if (this.pageConfig.isDetailPage) {
			this.pageProvider.disable(this.item, !this.item.IsDisabled).then(() => {
				if (this.item.IsDisabled) {
					this.env.showMessage('Archived', 'success');
				} else {
					this.env.showMessage('Reopened', 'success');
				}
				this.env.publishEvent({ Code: publishEventCode });
			});
		} else {
			this.pageProvider.disable(this.selectedItems, !this.query.IsDisabled).then(() => {
				if (this.query.IsDisabled) {
					this.env.showMessage('Reopened {{value}} lines!', 'success', this.selectedItems.length);
				} else {
					this.env.showMessage('Archived {{value}} lines!', 'success', this.selectedItems.length);
				}
				this.removeSelectedItems();
			});
		}
	}

	removeSelectedItems() {
		this.selectedItems.forEach((i) => {
			const index = this.items.indexOf(i, 0);
			if (index > -1) {
				this.items.splice(index, 1);
			}
			this.items = [...this.items];
		});

		this.selectedItems = [];
	}

	/** Latest-wins in-flight fetch-by-Id for create shape fallback. */
	private listFetchSeqById = new Map<string | number, number>();

	/**
	 * Detail → list sync after save/delete. Prefer in-memory patch; full refresh only as legacy fallback.
	 */
	applyListEvent(data: any) {
		if (!data) {
			this.refresh(null);
			return;
		}

		if (data.Action === 'delete') {
			const ids = (data.Ids?.length ? data.Ids : data.Id != null ? [data.Id] : []).filter((id) => id != null && id !== '');
			if (ids.length) {
				this.removeListItemsByIds(ids);
			} else {
				this.refresh(null);
			}
			return;
		}

		const id = data.Id ?? data.Data?.Id;
		const idx = id != null && id !== '' ? this.items.findIndex((x) => x?.Id == id) : -1;

		// Existing row by Id → always patch in place (do not remove via filter match)
		if (idx >= 0) {
			const row = this.mergeListRow(this.items[idx], data.Data);
			this.upsertListItemAt(idx, row);
			return;
		}

		// Create / insert — only then gate by current list filters
		if (!data.Data || typeof data.Data !== 'object') {
			this.refresh(null);
			return;
		}

		const tryInsert = (row: any) => {
			if (!row || !this.matchesListQuery(row)) {
				return;
			}
			this.insertListItemSorted(row);
		};

		const sample = this.items[0];
		if (sample && this.hasEnoughListShape(data.Data, sample)) {
			tryInsert(data.Data);
		} else if (id != null && id !== '') {
			this.fetchAndUpsertListItem(id).then((row) => row && tryInsert(row));
		} else {
			this.refresh(null);
		}
	}

	publishListUpsert(publishEventCode: string, wasCreate: boolean, savedItem: any = null, form = this.formGroup) {
		if (!publishEventCode) {
			return;
		}

		if (wasCreate) {
			if (savedItem && typeof savedItem === 'object' && savedItem.Id != null && savedItem.Id !== '' && savedItem.Id !== 0) {
				this.env.publishEvent({
					Code: publishEventCode,
					Action: 'upsert',
					Id: savedItem.Id,
					Data: savedItem,
				});
			} else {
				// Create without returned object — cannot patch safely
				this.env.publishEvent({ Code: publishEventCode });
			}
			return;
		}

		const data = this.buildListEventData(form, savedItem);
		const id = data?.Id ?? this.id ?? form?.controls?.Id?.value;
		this.env.publishEvent({
			Code: publishEventCode,
			Action: 'upsert',
			Id: id,
			Data: data,
		});
	}

	/** Snapshot for list patch after edit — UI form/item, not relying on save body. */
	buildListEventData(form = this.formGroup, savedItem: any = null) {
		const raw = form?.getRawValue?.() ?? form?.value ?? {};
		const data = { ...(this.item || {}), ...raw };
		if (savedItem && typeof savedItem === 'object') {
			Object.assign(data, savedItem);
		}
		if ((data.Id == null || data.Id === '' || data.Id === 0) && this.id) {
			data.Id = this.id;
		}
		return data;
	}

	mergeListRow(existing: any, patch: any) {
		if (!patch || typeof patch !== 'object') {
			return this.enrichListItem({ ...existing });
		}
		return this.enrichListItem({ ...existing, ...patch });
	}

	enrichListItem(row: any) {
		return row;
	}

	/** Hook after local list mutation (aggregates, etc.). */
	onListItemsPatched() {}

	listRowShapeKeys(sample: any): string[] {
		if (!sample || typeof sample !== 'object') {
			return [];
		}
		const clientOnly = new Set(['StatusText', 'StatusColor', 'TypeOfPartyText', 'checked', 'show']);
		return Object.keys(sample).filter((k) => !k.startsWith('_') && !clientOnly.has(k));
	}

	hasEnoughListShape(data: any, sample: any): boolean {
		if (!data || !sample) {
			return false;
		}
		const keys = this.listRowShapeKeys(sample);
		if (!keys.length) {
			return true;
		}
		return keys.every((k) => Object.prototype.hasOwnProperty.call(data, k));
	}

	matchesListQuery(row: any): boolean {
		if (!row) {
			return false;
		}
		const skip = new Set(['Skip', 'Take', 'SortBy', 'Sort']);
		// Normalize UI *TimeFrame → *From/*To (same as API query)
		const q = this.getApiQuery(this.query);
		for (const [key, qv] of Object.entries(q || {})) {
			if (skip.has(key) || key.startsWith('_')) {
				continue;
			}
			if (qv == null || qv === '') {
				continue;
			}
			// Defensive: never match raw objects against a row field
			if (typeof qv === 'object' && !Array.isArray(qv)) {
				continue;
			}
			if (key === 'Keyword') {
				if (!this.rowMatchesKeyword(row, String(qv))) {
					return false;
				}
				continue;
			}
			// Date/range filters: PartyDateFrom / PartyDateTo → row.PartyDate
			if (key.endsWith('From') && key.length > 4) {
				const prop = key.slice(0, -4);
				if (prop in (row || {})) {
					if (!this.rowMatchesRangeBound(row[prop], qv, 'from')) {
						return false;
					}
				}
				continue;
			}
			if (key.endsWith('To') && key.length > 2) {
				const prop = key.slice(0, -2);
				if (prop in (row || {})) {
					if (!this.rowMatchesRangeBound(row[prop], qv, 'to')) {
						return false;
					}
				}
				continue;
			}
			if (!this.queryValueMatches(row[key], qv, key)) {
				return false;
			}
		}
		return true;
	}

	rowMatchesKeyword(row: any, keyword: string): boolean {
		const term = keyword.toLowerCase();
		const fields = ['Name', 'Code', 'CustomerName', 'Remark', 'Phone', 'Email', 'Title'];
		return fields.some((f) => {
			const v = row?.[f];
			return v != null && String(v).toLowerCase().includes(term);
		});
	}

	/** Compare row date/value against query *From / *To bound. */
	rowMatchesRangeBound(rv: any, qv: any, bound: 'from' | 'to'): boolean {
		if (rv == null || rv === '') {
			return false;
		}
		const rowTime = new Date(rv).getTime();
		const boundTime = new Date(qv).getTime();
		if (!isNaN(rowTime) && !isNaN(boundTime)) {
			return bound === 'from' ? rowTime >= boundTime : rowTime <= boundTime;
		}
		const rs = String(rv);
		const qs = String(qv);
		return bound === 'from' ? rs >= qs : rs <= qs;
	}

	queryValueMatches(rv: any, qv: any, _key?: string): boolean {
		if (Array.isArray(qv)) {
			return qv.map(String).includes(String(rv));
		}
		if (typeof qv === 'string' && /^\d{4}-\d{2}-\d{2}/.test(qv)) {
			return String(rv ?? '').substring(0, 10) === String(qv).substring(0, 10);
		}
		return String(rv ?? '') === String(qv);
	}

	compareListRows(a: any, b: any, sort = this.pageConfig?.sort): number {
		const terms = sort?.length ? sort : [{ Dimension: 'Id', Order: 'DESC' }];
		for (const t of terms) {
			const av = a?.[t.Dimension];
			const bv = b?.[t.Dimension];
			if (av == bv) {
				continue;
			}
			if (av == null) {
				return t.Order === 'DESC' ? 1 : -1;
			}
			if (bv == null) {
				return t.Order === 'DESC' ? -1 : 1;
			}
			const cmp = av > bv ? 1 : -1;
			return t.Order === 'DESC' ? -cmp : cmp;
		}
		return 0;
	}

	getListInsertIndex(row: any): number {
		let index = this.items.findIndex((it) => this.compareListRows(row, it) < 0);
		return index < 0 ? this.items.length : index;
	}

	upsertListItemAt(index: number, row: any) {
		const enriched = this.enrichListItem({ ...row });
		const next = this.items.slice();
		next[index] = enriched;
		this.items = next;
		this.onListItemsPatched();
	}

	insertListItemSorted(row: any) {
		const enriched = this.enrichListItem({ ...row });
		const id = enriched?.Id;
		if (id != null && this.items.some((x) => x?.Id == id)) {
			const idx = this.items.findIndex((x) => x?.Id == id);
			this.upsertListItemAt(idx, enriched);
			return;
		}
		const index = this.getListInsertIndex(enriched);
		const next = this.items.slice();
		next.splice(index, 0, enriched);
		this.items = next;
		this.onListItemsPatched();
	}

	removeListItemsByIds(ids: any[]) {
		const idSet = new Set(ids.map(String));
		const next = this.items.filter((x) => !idSet.has(String(x?.Id)));
		if (next.length === this.items.length) {
			return;
		}
		this.items = next;
		this.onListItemsPatched();
	}

	fetchAndUpsertListItem(id: any): Promise<any | null> {
		const seq = (this.listFetchSeqById.get(id) || 0) + 1;
		this.listFetchSeqById.set(id, seq);
		const q = { Id: id };
		return this.pageProvider
			.read(q, true)
			.then((result: any) => {
				if (this.listFetchSeqById.get(id) !== seq) {
					return null;
				}
				const row = result?.data?.[0];
				if (!row) {
					this.removeListItemsByIds([id]);
					return null;
				}
				return row;
			})
			.catch(() => null);
	}

	print() {
		window.print();
	}

	add() {
		this.nav(this.pageConfig.pageName + '/' + 0);
		//this.nav('/price-list/0');
	}

	async import(event) {
		if (event.target.files.length == 0) return;
		this.env
			.showLoading('Please wait for a few moments', this.pageProvider.import(event.target.files[0]))
			.then((resp) => {
				this.refresh();
				if (resp.ErrorList && resp.ErrorList.length) {
					let message = '';
					for (let i = 0; i < resp.ErrorList.length && i <= 5; i++)
						if (i == 5) message += '<br> Còn nữa...';
						else {
							const e = resp.ErrorList[i];
							message += '<br> ' + e.Id + '. Tại dòng ' + e.Line + ': ' + e.Message;
						}
					this.env
						.showPrompt(
							{
								code: '{{value}} error(s) during import: {{value1}}',
								value: { value: resp.ErrorList.length, value1: message },
							},
							'Do you want to review the items with errors?',
							'Data import error'
						)
						.then((_) => {
							this.downloadURLContent(resp.FileUrl);
						})
						.catch((e) => {});
				} else {
					this.env.showMessage('Import completed!', 'success');
				}
			})
			.catch((err) => {
				if (err.statusText == 'Conflict') {
					// var contentDispositionHeader = err.headers.get('Content-Disposition');
					// var result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
					// this.downloadContent(result.replace(/"/g, ''),err._body);
					this.downloadURLContent(err._body);
				}
			});
	}

	async export() {
		if (this.submitAttempt) return;
		this.submitAttempt = true;
		this.env
			.showLoading('Please wait for a few moments', this.pageProvider.export(this.getApiQuery()))
			.then((response: any) => {
				this.downloadURLContent(response);
				this.submitAttempt = false;
			})
			.catch((err) => {
				this.submitAttempt = false;
			});
	}

	download(url) {
		this.downloadURLContent(url);
	}

	downloadURLContent(url) {
		if (url.indexOf('http') == -1) {
			url = environment.appDomain + url;
		}
		var pom = document.createElement('a');
		pom.setAttribute('target', '_blank');
		pom.setAttribute('href', url);
		//pom.setAttribute('target', '_blank');
		pom.style.display = 'none';
		document.body.appendChild(pom);
		pom.click();
		document.body.removeChild(pom);
	}

	loadAnItem(event = null) {
		this.id = typeof this.id == 'string' ? parseInt(this.id) : this.id;

		if (this.id) {
			this.pageProvider
				.getAnItem(this.id, null)
				.then((ite) => {
					this.item = ite;
					this.loadedData(event);
				})
				.catch((err) => {
					console.log(err);

					// Kiểm tra err có phải là object và có thuộc tính status không
					if (err && typeof err === 'object' && 'status' in err && err.status == 404) {
						//this.nav('not-found', 'back');
					} else {
						this.item = null;
						this.loadedData(event);
					}
				});
		} else if (this.id == 0) {
			if (!this.item) this.item = {};

			Object.assign(this.item, this.DefaultItem);
			this.loadedData(event);
		} else {
			this.loadedData(event);
		}
	}

	debounceTimeout;
	debounce(fn, delay) {
		if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
		this.debounceTimeout = setTimeout(() => {
			fn();
		}, delay);
	}

	saveChange(publishEventCode = this.pageConfig.pageName) {
		return new Promise(async (resolve, reject) => {
			this.formGroup.updateValueAndValidity();

			if (!this.formGroup.valid) {
				let invalidControls = this.findInvalidControlsRecursive(this.formGroup);
				const translationPromises = invalidControls.map((control) => this.env.translateResource(control));
				Promise.all(translationPromises).then((values) => {
					invalidControls = values;
					this.env.showMessage('Please recheck control(s): {{value}}', 'warning', invalidControls.join(' | '));
					reject('form invalid');
				});
			} else if (this.submitAttempt == false) {
				this.submitAttempt = true;
				//lib.copyPropertiesValue(this.formGroup.value, this.item);
				// this.item = this.formGroup.value;
				// this.item.Id = this.id;
				Object.assign(this.item, this.formGroup.value);
				Object.keys(this.item).forEach((k) => {
					if (this.item[k] === undefined) delete this.item[k];
				});
				if (!this.item.hasOwnProperty('Id')) {
					this.item.Id = 0;
				}
				if (!this.item.hasOwnProperty('IsDisabled')) {
					this.item.IsDisabled = false;
				}

				// this.loadingController.create({
				//     cssClass: 'my-custom-class',
				//     message: 'Đang lưu dữ liệu...'
				// }).then(loading => {
				//     loading.present();
				if (!this.item.IDBranch) {
					this.item.IDBranch = this.env.selectedBranch;
				}
				this.pageProvider
					.save(this.item, this.pageConfig.isForceCreate)
					.then((savedItem: any) => {
						const wasCreate = !this.id || this.id == 0;
						if (this.item.Id != savedItem?.Id && savedItem?.Id) {
							this.item.Id = savedItem.Id;
							this.id = savedItem.Id;
							this.loadedData();
							if (window.location.hash.endsWith('/0')) {
								let newURL = window.location.hash.substring(0, window.location.hash.length - 1) + savedItem.Id;
								history.pushState({}, null, newURL);
							}
						}

						// if (loading) loading.dismiss();
						this.env.showMessage('Saving completed!', 'success');
						this.formGroup.markAsPristine();
						this.cdr.detectChanges();
						resolve(savedItem?.Id ?? this.id);
						this.submitAttempt = false;
						this.savedChange(savedItem);
						if (publishEventCode) {
							this.publishListUpsert(publishEventCode, wasCreate, savedItem);
						}
					})
					.catch((err) => {
						// if (loading) loading.dismiss();
						this.env.showMessage('Cannot save, please try again', 'danger');
						this.cdr.detectChanges();
						this.submitAttempt = false;
						reject(err);
					});
				// });
			}
		});
	}

	saveChange2(form = this.formGroup, publishEventCode = this.pageConfig.pageName, provider = this.pageProvider) {
		return new Promise((resolve, reject) => {
			form.updateValueAndValidity();
			if (!form.valid) {
				let invalidControls = this.findInvalidControlsRecursive(form);
				const translationPromises = invalidControls.map((control) => this.env.translateResource(control));
				Promise.all(translationPromises).then((values) => {
					invalidControls = values;
					this.env.showMessage('Please recheck control(s): {{value}}', 'warning', invalidControls.join(' | '));
					reject('form invalid');
				});
			} else if (this.submitAttempt == false) {
				this.submitAttempt = true;
				let submitItem = this.getDirtyValues(form);
				const wasCreate = !this.id || this.id == 0 || form?.controls?.Id?.value == 0;

				provider
					.save(submitItem, this.pageConfig.isForceCreate)
					.then((savedItem: any) => {
						this.savedChange(savedItem, form);
						if (publishEventCode) {
							this.publishListUpsert(publishEventCode, wasCreate, savedItem, form);
						}
						resolve(savedItem);
					})
					.catch((err) => {
						this.env.showMessage('Cannot save, please try again', 'danger');
						this.cdr.detectChanges();
						this.submitAttempt = false;
						reject(err);
					});
			} else {
				reject('submitAttempt');
			}
		});
	}

	savedChange(savedItem = null, form = this.formGroup) {
		if (savedItem) {
			if (form.controls.Id && savedItem.Id && form.controls.Id.value != savedItem.Id) form.controls.Id.setValue(savedItem.Id);

			if (this.pageConfig.isDetailPage && form == this.formGroup && this.id == 0) {
				this.item = savedItem;
				this.id = savedItem.Id;
				if (window.location.hash.endsWith('/0')) {
					let newURL = window.location.hash.substring(0, window.location.hash.length - 1) + savedItem.Id;
					history.pushState({}, null, newURL);
				}
			}
		}

		form.markAsPristine();
		this.cdr.detectChanges();
		this.submitAttempt = false;
		this.env.showMessage('Saving completed!', 'success');
	}

	alwaysReturnProps = ['Id', 'IDBranch'];
	getDirtyValues(fg) {
		if (!fg.valid) return;

		let dirtyValues = {}; // initialize empty object
		Object.keys(fg.controls).forEach((c) => {
			if (c.indexOf('_') != 0) {
				let currentControl = fg.controls[c];
				if (currentControl.dirty || this.alwaysReturnProps.indexOf(c) > -1) {
					if (currentControl.controls)
						//check for nested controlGroups

						dirtyValues[c] = this.getDirtyValues(currentControl); //recursion for nested controlGroups
					else dirtyValues[c] = currentControl.value; //simple control
				}
			}
		});
		return dirtyValues;
	}

	submitForApproval() {
		if (!this.pageConfig.canSubmit || !this.pageConfig.ShowSubmit || this.submitAttempt) return;

		this.env
			.actionConfirm('submit', this.selectedItems.length, this.item?.Name, this.pageConfig.pageTitle, () =>
				this.pageProvider.submitForApproval(this.pageConfig.isDetailPage ? this.item : this.selectedItems)
			)
			.then((_) => {
				this.env.publishEvent({
					Code: this.pageConfig.pageName,
				});
				this.env.showMessage('Submit successfully!', 'success');
				this.submitAttempt = false;
				this.refresh();
			})
			.catch((err: any) => {
				if (err != 'User abort action') this.env.showMessage('Cannot submit, please try again', 'danger');
				console.log(err);
			});
	}

	approve() {
		if (!this.pageConfig.canApprove || !this.pageConfig.ShowApprove || this.submitAttempt) return;
		this.env
			.actionConfirm('approve', this.selectedItems.length, this.item?.Name, this.pageConfig.pageTitle, () =>
				this.pageProvider.approve(this.pageConfig.isDetailPage ? this.item : this.selectedItems)
			)
			.then((_) => {
				this.env.publishEvent({
					Code: this.pageConfig.pageName,
				});
				this.env.showMessage('Approved successfully!', 'success');
				this.submitAttempt = false;
				this.refresh();
			})
			.catch((err: any) => {
				if (err != 'User abort action') this.env.showMessage('Cannot approve, please try again', 'danger');
				console.log(err);
			});
	}

	disapprove() {
		if (!this.pageConfig.canApprove || !this.pageConfig.ShowDisapprove || this.submitAttempt) return;
		this.env
			.actionConfirm('disapprove', this.selectedItems.length, this.item?.Name, this.pageConfig.pageTitle, () =>
				this.pageProvider.disapprove(this.pageConfig.isDetailPage ? this.item : this.selectedItems)
			)
			.then((_) => {
				this.env.publishEvent({
					Code: this.pageConfig.pageName,
				});
				this.env.showMessage('Disapprove successfully!', 'success');
				this.submitAttempt = false;
				this.refresh();
			})
			.catch((err: any) => {
				if (err != 'User abort action') this.env.showMessage('Cannot disapprove, please try again', 'danger');
				console.log(err);
			});
	}

	copy() {}
	merge() {}
	split() {}

	cancel() {
		if (!this.pageConfig.canCancel || !this.pageConfig.ShowCancel || this.submitAttempt) return;
		this.env
			.actionConfirm('cancel', this.selectedItems.length, this.item?.Name, this.pageConfig.pageTitle, () =>
				this.pageProvider.cancel(this.pageConfig.isDetailPage ? this.item : this.selectedItems)
			)
			.then((_) => {
				this.env.publishEvent({
					Code: this.pageConfig.pageName,
				});
				this.env.showMessage('Canceled successfully!', 'success');
				this.submitAttempt = false;
				this.refresh();
			})
			.catch((err: any) => {
				if (err != 'User abort action') this.env.showMessage('Cannot cancel, please try again', 'danger');
				console.log(err);
			});
	}
	deleteItems(event = null) {}
	delete(publishEventCode = this.pageConfig.pageName) {
		if (this.pageConfig.ShowDelete) {
			this.env
				.actionConfirm('delete', this.selectedItems.length, this.item?.Name, this.pageConfig.pageTitle, () =>
					this.pageProvider.delete(this.pageConfig.isDetailPage ? this.item : this.selectedItems)
				)
				.then((_) => {
					this.env.showMessage('DELETE_RESULT_SUCCESS', 'success');
					const ids = this.pageConfig.isDetailPage
						? this.item?.Id != null
							? [this.item.Id]
							: []
						: (this.selectedItems || []).map((i) => i.Id).filter((id) => id != null);
					this.env.publishEvent({
						Code: publishEventCode,
						Action: 'delete',
						Id: ids[0],
						Ids: ids,
					});

					if (this.pageConfig.isDetailPage) {
						this.goBack();
						this.deleted();
						this.closeModal();
					} else {
						this.removeSelectedItems();
					}
				})
				.catch((err: any) => {
					if (err != 'User abort action') this.env.showMessage('DELETE_RESULT_FAIL', 'danger');
					console.log(err);
				});
		}
	}

	deleted() {}

	async closeModal() {
		try {
			if (!this.modalController) {
				this.goBack();
				return;
			}
			await this.modalController.dismiss();
		} catch (error) {
			this.goBack();
			return;
		}
	}

	//Datatable funcions
	sort: any = {};
	sortToggle(field, stop = false, sort = this.sort, query = this.query) {
		if (!sort[field]) {
			sort[field] = field;
		} else if (sort[field] == field) {
			sort[field] = field + '_desc';
		} else {
			delete sort[field];
		}

		let sortTerms = sort;

		let s = Object.keys(sortTerms).reduce(function (res, v) {
			return res.concat(sortTerms[v]);
		}, []);

		if (s.length) {
			query.SortBy = '[' + s.join(',') + ']';
		} else {
			delete query.SortBy;
		}
		if (!stop) {
			this.refresh();
		}
	}

	//Public methods
	getAttrib(Id, Lst, Attrib = 'Name', defaultValue: any = '...') {
		if (!Lst) {
			return defaultValue;
		}
		var it = Lst.filter((ite) => (ite.IsDeleted == undefined || ite.IsDeleted === false) && ite.Id == Id);
		if (it.length) {
			return it[0][Attrib];
		}
		return defaultValue;
	}

	//ION methods
	ionViewWillEnter() {
		//console.log('ionViewWillEnter');
	}

	ionViewDidEnter() {
		this.pageConfig.didEnter = true;
		// Virtual viewport may have patched items while this page was display:none; force
		// a correct mid-list recompute now that scroll metrics are usable again.
		this.relayoutVirtualViewports();
	}

	ionViewWillLeave() {
		// //console.log('ionViewWillLeave');
	}

	ionViewDidLeave() {}

	/** Ask every app-virtual-viewport to recompute after this page becomes visible again. */
	relayoutVirtualViewports() {
		if (typeof document === 'undefined') {
			return;
		}
		// Defer one frame so Ionic has applied display/size before viewports measure.
		requestAnimationFrame(() => {
			document.dispatchEvent(new CustomEvent('app:virtual-viewport-relayout'));
		});
	}

	events(e) {}

	ngOnInit() {
		this.dataManagementService = new PageDataManagementService(this.env, this.pageProvider, this.pageConfig, this.items);

		// this.searchShowAllChildren = this.searchShowAllChildren.bind(this);
		let pageUrl = '';

		if (this.route && !this.pageConfig.pageCode) {
			this.pageConfig.pageCode = this.route.snapshot?.routeConfig?.component?.name;
			this.id = this.route.snapshot?.paramMap?.get('id');
			pageUrl = this.navCtrl.router.routerState.snapshot.url + '/';
		} else if (this.pageConfig.pageCode == 'help') {
			pageUrl = '/' + this.pageConfig.pageCode + '/';
		} else {
			//pageUrl = this.pageConfig.pageCode + '/';
			pageUrl = this.navCtrl.router.routerState.snapshot.url + '/';
		}

		if (this.navCtrl && this.env.user && this.env.user.Forms) {
			//console.log('snapshot.url', this.navCtrl.router.routerState.snapshot.url);
			let currentForm = this.env.user.Forms.find((d) => pageUrl.startsWith('/' + d.Code + '/') && (d.Type == 0 || d.Type == 1 || d.Type == 2));
			if (currentForm) {
				this.pageConfig.pageName = currentForm.Code;
				this.pageConfig.pageTitle = currentForm.Name;
				this.pageConfig.pageIcon = currentForm.Icon;
				this.pageConfig.pageColor = currentForm.BadgeColor;
				this.pageConfig.pageRemark = currentForm.Remark;
				this.pageConfig.canEditHelpContent = true;

				this.env.publishEvent({ Code: EVENT_TYPE.APP.VIEW_DID_ENTER, Value: currentForm });

				let permissionList = this.env.user.Forms.filter((d) => d.IDParent == currentForm.Id);
				if (permissionList.length) {
					permissionList.forEach((p) => {
						this.pageConfig[p.Code] = true;
					});
				}
			}
		}

		this.subscriptions.push(
			this.env.getEvents().subscribe((data) => {
				if (data.Code == EVENT_TYPE.TENANT.BRANCH_SWITCHED) {
					this.preLoadData(null);
				} else if (!this.pageConfig.isDetailPage && data.Code == this.pageConfig.pageName) {
					this.applyListEvent(data);
				} else {
					this.events(data);
				}
			})
		);

		if (this.env.user?.UserSetting?.IsCacheQuery.Value) {
			this.env
				.getStorage('saved-query-' + this.pageConfig.pageName)
				.then((result) => {
					if (result) {
						this.query = result;
					}
					this.preLoadData();
				})
				.catch((err) => {
					this.preLoadData();
				});
		} else {
			this.preLoadData();
		}
	}

	getPagePermission(pageCode) {
		let currentForm = this.env.user.Forms.find((d) => pageCode == d.Code && (d.Type == 0 || d.Type == 1 || d.Type == 2));
		if (currentForm) {
			let permissionList = this.env.user.Forms.filter((d) => d.IDParent == currentForm.Id);
			if (permissionList.length)
				permissionList.forEach((p) => {
					this.pageConfig[p.Code] = true;
				});
		}
	}

	ngOnDestroy() {
		this.subscriptions.forEach((subscription) => subscription.unsubscribe());
	}

	nav(URL, direction = 'forward', data = null) {
		event?.preventDefault();
		event?.stopPropagation();

		if (direction == 'forward') {
			if (data) {
				this.navCtrl.navigateForward(URL, data);
			} else {
				this.navCtrl.navigateForward(URL);
			}
		} else if (direction == 'back') {
			this.navCtrl.navigateBack(URL);
		} else {
			const url = Array.isArray(URL) ? URL[0] : URL;
			this.navCtrl.router.navigateByUrl(url, { replaceUrl: true });
		}
	}

	goBack() {
		this.navCtrl.back();
	}

	toggleFeature() {
		this.pageConfig.isShowFeature = !this.pageConfig.isShowFeature;
		if (!this.pageConfig.isFeatureAsMain) {
			this.pageConfig.isSubActive = this.pageConfig.isShowFeature;
		}
	}

	backToMainView() {
		if (this.pageConfig.isFeatureAsMain && !this.pageConfig.isShowFeature) {
			this.pageConfig.isShowFeature = true;
		}
		this.pageConfig.isSubActive = false;
	}

	help() {
		let code = 'help' + this.navCtrl.router.routerState.snapshot.url;
		this.env.publishEvent({ Code: EVENT_TYPE.APP.SHOW_HELP, Value: code });
	}

	/** Derive Segment3/Segment4 from pageProvider API path (e.g. PURCHASE/Order) or serviceName. */
	resolveHistorySegments(): { segment3: string; segment4: string } | null {
		if (this.pageConfig?.historySegment3 && this.pageConfig?.historySegment4) {
			return { segment3: this.pageConfig.historySegment3, segment4: this.pageConfig.historySegment4 };
		}
		try {
			const urlFn = this.pageProvider?.apiPath?.getItem?.url;
			if (typeof urlFn === 'function') {
				const path = String(urlFn(0) || '');
				const parts = path.split('/').filter((p) => p && !/^\d+$/.test(p));
				if (parts.length >= 2) {
					return { segment3: parts[0], segment4: parts[1] };
				}
			}
		} catch {
			/* ignore */
		}
		const name = this.pageProvider?.serviceName || '';
		const idx = name.indexOf('_');
		if (idx > 0) {
			return { segment3: name.substring(0, idx), segment4: name.substring(idx + 1) };
		}
		return null;
	}

	showEditHistory() {
		this.enterHistoryView();
	}

	async enterHistoryView() {
		if (!this.pageConfig?.isDetailPage || !this.id || this.id == 0) {
			return;
		}
		const segments = this.resolveHistorySegments();
		if (!segments) {
			this.env.showMessage('Cannot resolve history for this form', 'warning');
			return;
		}

		try {
			const itemsAsc = await this.historyService.loadHistory(segments.segment3, segments.segment4, this.id);
			this.historySnapshots = this.historyService.buildCumulativeSnapshots(itemsAsc);
			this.historyItems = this.historyService.toNewestFirst(itemsAsc);

			if (!this.historyItems.length) {
				this.env.showMessage('No history logs found', 'warning');
				return;
			}

			this.historySnapshotBefore = lib.cloneObject(this.item);
			this.historySavedCanEdit = this.pageConfig.canEdit ?? false;
			this.pageConfig.isHistoryView = true;
			this.pageConfig.canEdit = false;
			this.historyService.active = true;
			this.formGroup?.disable({ emitEvent: false });

			// Detail pages may preload ng-select sources for lines that only appear in older logs
			// (e.g. deleted OrderLines whose IDItem is not in live _Items).
			await this.onHistoryDataReady();

			this.selectHistoryIndex(0);
		} catch (err: any) {
			this.env.showMessage(err?.message || 'Cannot load history', 'danger');
		}
	}

	/**
	 * Hook after history snapshots are built and historySnapshotBefore is cloned.
	 * Override to enrich helpers (e.g. _Items) so deleted-line ng-selects can render.
	 */
	protected async onHistoryDataReady(): Promise<void> {}

	exitHistoryView() {
		if (!this.pageConfig.isHistoryView) return;

		this.pageConfig.isHistoryView = false;
		this.historyService.active = false;
		this.historyService.clearHighlight();

		if (this.historySnapshotBefore) {
			this.item = lib.cloneObject(this.historySnapshotBefore);
			this.formGroup?.patchValue(this.item, { emitEvent: false });
		}

		this.pageConfig.canEdit = this.historySavedCanEdit;
		if (this.formGroup) {
			this.formGroup.enable({ emitEvent: false });
			if (!this.pageConfig.canEdit) {
				this.formGroup.disable({ emitEvent: false });
			}
		}

		this.historyItems = [];
		this.historySnapshots = [];
		this.historyIndex = 0;
		this.historyRevision++;
		this.historyViewTitle = '';
		this.historyViewSubtitle = '';
		this.historyViewPosition = '';
		this.historySnapshotBefore = null;
		this.cdr?.detectChanges();
	}

	historyPrev() {
		if (!this.pageConfig.isHistoryView || !this.historyItems.length) return;
		if (this.historyIndex < this.historyItems.length - 1) {
			this.selectHistoryIndex(this.historyIndex + 1);
		}
	}

	historyNext() {
		if (!this.pageConfig.isHistoryView || !this.historyItems.length) return;
		if (this.historyIndex > 0) {
			this.selectHistoryIndex(this.historyIndex - 1);
		}
	}

	historyFirst() {
		if (!this.pageConfig.isHistoryView || !this.historyItems.length) return;
		this.selectHistoryIndex(this.historyItems.length - 1);
	}

	historyLast() {
		if (!this.pageConfig.isHistoryView || !this.historyItems.length) return;
		this.selectHistoryIndex(0);
	}

	selectHistoryIndex(index: number) {
		if (!this.historyItems.length) return;
		const i = Math.max(0, Math.min(index, this.historyItems.length - 1));
		this.historyIndex = i;
		const entry = this.historyItems[i];
		this.historyViewTitle = this.historyService.formatViewTitle(entry, i, this.historyItems.length);
		this.historyViewPosition = this.historyService.formatViewPosition(i, this.historyItems.length);
		this.historyViewSubtitle = this.historyService.formatViewSubtitle(entry) || '';
		this.applyHistorySnapshotAt(i);
		this.cdr?.detectChanges();
	}

	/**
	 * Apply history step at newest-first index.
	 * Snapshot list is chronological (asc): step N = merge(log1..logN).
	 * Viewing step 3 → clear form, patchValue(1+2+3).
	 * Viewing step 2 → clear form, patchValue(1+2) — nothing from log 3 remains.
	 */
	applyHistorySnapshotAt(newestFirstIndex: number) {
		const ascIndex = this.historySnapshots.length - 1 - newestFirstIndex;
		if (ascIndex < 0 || ascIndex >= this.historySnapshots.length) return;

		const currStep = this.historySnapshots[ascIndex];
		const prevStep = ascIndex > 0 ? this.historySnapshots[ascIndex - 1] : null;
		const currSnapshot = currStep.snapshot || {};
		const prevSnapshot = prevStep?.snapshot || {};
		const entry = currStep.entry;

		const linesKey =
			this.historyService.findLinesKeyInSnapshot(currSnapshot) ||
			this.historyService.findLinesKeyInSnapshot(prevSnapshot) ||
			'OrderLines';
		// Keep deleted lines visible (danger + strikethrough) only on DELETE steps.
		// Id-promote PUTs (0→real Id) change identity — must not look like a delete.
		const includeRemoved = (entry.Method || '').toUpperCase() === 'DELETE' || entry._badge === 'delete';
		const lines = this.historyService.buildViewLinesWithRemoved(
			prevSnapshot,
			currSnapshot,
			linesKey,
			includeRemoved
		);

		// Keep display helpers (_Vendor, _Items, …) from live item — snapshot has business fields only.
		// Wiping them breaks ng-select dataSource.selected / line item pickers.
		const helpers: Record<string, any> = {};
		const helperSource = this.historySnapshotBefore || this.item || {};
		Object.keys(helperSource).forEach((k) => {
			if (k.startsWith('_')) helpers[k] = helperSource[k];
		});

		// item = helpers + cumulative 1..N (never merge live business fields)
		this.item = lib.cloneObject({
			...helpers,
			Id: this.id,
			...currSnapshot,
			[linesKey]: lines,
		});

		if (this.formGroup) {
			this.historyService.applyCumulativeSnapshotToForm(this.formGroup, currSnapshot, this.id, linesKey);
		}

		const isCreate = entry._badge === 'create';
		const headerChanged = this.historyService.diffHeaderFields(prevSnapshot, currSnapshot, isCreate);
		const lineDiff = this.historyService.diffLineChanges(prevSnapshot, currSnapshot);
		const expanded = this.historyService.expandLineHighlight(lineDiff, currSnapshot, linesKey);
		this.historyService.applyHighlight(headerChanged, expanded.lineIds, expanded.lineFields);
		this.historyRevision++;
	}

	async changeBranch(ev: any) {
		if (!this.pageConfig.canChangeBranch) {
			return;
		}
		let popover = await this.popoverCtrl.create({
			component: PopoverPage,
			componentProps: {
				popConfig: {
					isShowBranchSelect: true,
					submitButtonLabel: 'Select unit...',
				},
			},
			event: ev,
			cssClass: 'w300',
			translucent: true,
		});
		popover.onDidDismiss().then((result: any) => {
			console.log(result);
			if (result.data) {
				this.pageProvider
					.changeBranch({
						Ids: this.selectedItems.map((m) => m.Id),
						IDBranch: result.data.branch.Id,
					})
					.then((_) => {
						this.env.showMessage('Unit changed', 'success');
						this.refresh();
					});
			}
		});
		return await popover.present();
	}

	//Tree view
	buildFlatTree(items, treeState, isAllRowOpened = true) {
		return lib.buildFlatTree(items, treeState, isAllRowOpened);
	}

	isAllRowOpened = true;
	toggleRowAll(ls = this.items) {
		this.isAllRowOpened = !this.isAllRowOpened;
		ls.forEach((i) => {
			i.showdetail = !this.isAllRowOpened;
			this.toggleRow(ls, i, true);
		});
	}

	toggleRow(ls, ite, toogle = false) {
		if (ite && ite.showdetail && toogle) {
			//hide
			ite.showdetail = false;
			this.showHideAllNestedFolder(ls, ite.Id, false, ite.showdetail);
		} else if (ite && !ite.showdetail && toogle) {
			//show loaded
			ite.showdetail = true;
			this.showHideAllNestedFolder(ls, ite.Id, true, ite.showdetail);
		}
	}

	showHideAllNestedFolder(ls, Id, isShow, showDetail) {
		if (Id == null) return;
		ls.filter((d) => d.IDParent == Id).forEach((i) => {
			if (!isShow || showDetail) {
				i.show = isShow;
			}
			this.showHideAllNestedFolder(ls, i.Id, isShow, i.showdetail);
		});
	}

	trackByFn(index, item) {
		return item && item.Id ? item.Id : index;
	}
	itemHeightFn(item, index) {
		return 27;
	}

	onKeydown(event) {
		console.log(event);
		if (event.key === 'Enter') {
			this.refresh();
		}
	}

	onDatatableFilter(e) {
		Object.assign(this.query, e.query);
		Object.keys(this.query).forEach((key) => (this.query[key] === null || this.query[key] === '') && delete this.query[key]);
		this.refresh();
	}

	parseSort() {
		let sortTerms = this.pageConfig.sort.map((m) => m.Dimension + (m.Order == 'DESC' ? '_desc' : ''));
		if (sortTerms.length) {
			this.query.SortBy = '[' + sortTerms.join(',') + ']';
		}
	}

	onSort(event) {
		this.pageConfig.sort = event;
		this.refresh();
	}

	searchResultIdList = { term: '', ids: [] };
	searchShowAllChildren(term: string, item: any): any {
		if (this.searchResultIdList.term != term) {
			this.searchResultIdList.term = term;
			this.searchResultIdList.ids = lib.searchTreeReturnId(this.env.branchList, term);
		}
		return this.searchResultIdList.ids.indexOf(item.Id) > -1;
	}

	closePopListToolBar() {
		this.env.publishEvent({ Code: 'app:closePopListToolBar' });
	}

	@ViewChildren(FormControlComponent) formControls: QueryList<FormControlComponent>;
	@ViewChildren(InputControlComponent) inputControls: QueryList<InputControlComponent>;

	findInvalidControlsRecursive(form: FormGroup | FormArray): string[] {
		const invalidControls: string[] = [];
		const recursiveFunc = (form: FormGroup | FormArray) => {
			// Handle FormGroup
			Object.keys(form.controls).forEach((field) => {
				const control = form.get(field);
				if (control) {
					if (control instanceof FormGroup || control instanceof FormArray) {
						recursiveFunc(control);
					} else if (control.invalid) {
						let label = this.formControls.find((d) => d.id === field && d.form === form)?.label;
						if (!label) label = this.inputControls.find((d) => d.id === field && d.form === form)?.label;
						invalidControls.push(label ?? field);
					}
				}
			});
		};
		recursiveFunc(form);
		return invalidControls;
	}

	getAdvaneFilterConfig() {
		if (!this.query._AdvanceConfig) {
			this.query._AdvanceConfig = {
				Schema: {
					Code: this.pageProvider.serviceName,
					Type: 'Form',
				},
				TimeFrame: {
					From: {
						Type: 'Relative',
						IsPastDate: true,
						Period: 'Day',
						Amount: 1,
					},
					To: {
						Type: 'Relative',
						IsPastDate: true,
						Period: 'Day',
						Amount: 0,
					},
				},
				CompareTo: {
					Type: 'Relative',
					IsPastDate: true,
					Period: 'Day',
					Amount: 0,
				},
				Interval: {},
				CompareBy: [],
				MeasureBy: [],
				Transform: {
					Filter: {
						Dimension: 'logical',
						Operator: 'AND',
						Value: null,
						Logicals: [],
					},
				},
			};
			// if (advanceFilterRules[this.pageProvider.serviceName]) {
			// 	this.query._AdvanceConfig = lib.cloneObject(advanceFilterRules[this.pageProvider.serviceName]);
			// }
		}
	}

	// khi muốn thay đổi config mặc định thì chỉ cần overload getAdvaneFilterConfig() trong component con
	// vd trong page: scheduler.page.ts
	async openAdvanceFilter(callback?: (data: any) => void) {
		this.getAdvaneFilterConfig();
		const modal = await this.modalController.create({
			component: AdvanceFilterModalComponent,
			cssClass: 'modal90',
			componentProps: {
				_AdvanceConfig: this.query._AdvanceConfig,
				schemaType: 'Form',
				selectedSchema: this.schemaPage,
			},
		});
		await modal.present();
		const { data } = await modal.onWillDismiss();
		if (data) {
			if (data.isApplyFilter) this.query._AdvanceConfig = data?.data;
			if (data.schema) this.schemaPage = data?.schema;
			if (data.data) {
				this.env.showLoading('Please wait for a few moments', this.pageProvider.read(this.getApiQuery())).then((resp) => {
					if (resp && resp.data) {
						if (callback) callback(resp['data']);
						else {
							this.items = resp['data'];
							this.loadedData();
						}
					} else this.env.showMessage('No data found!', 'warning');
				});
			}
		}
	}
}
