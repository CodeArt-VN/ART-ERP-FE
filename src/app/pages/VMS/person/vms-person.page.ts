import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, AlertController, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { SortConfig } from 'src/app/interfaces/options-interface';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { VmsApiService } from 'src/app/services/vms/vms-api.service';
import { VmsEnrollService } from 'src/app/services/vms/vms-enroll.service';
import { VMS_PersonProvider } from 'src/app/services/static/services.service';
import { environment } from 'src/environments/environment';
import { VmsPersonMergeModal } from './vms-person-merge.modal';
import {
	personAllSelected,
	personApplyShiftSelect,
	personAssignEventId,
	personAssignEventNumericId,
	personDeleteTargets,
	personItemKey,
	personMappedGuests,
	personMappedSelected,
	personMappedStaff,
	personNeedsMapping,
	personRebindSelection,
	personRowIsDeleted,
	personSplitPersonIds,
	personToggleSelectAll,
	personVisibleRows,
	identityIsDisabled,
	personPhotoPath,
	personDisplayName,
	personFromContact,
	personHasEmbedding,
	personOverlay,
	unmappedFaceOverlay,
} from './vms-person.util';

@Component({
	selector: 'app-vms-person',
	templateUrl: 'vms-person.page.html',
	styleUrls: ['vms-person.page.scss'],
	standalone: false,
})
export class VmsPersonPage extends PageBase {
	view: 'all' | 'staff' | 'guest' | 'unnamed' = 'all';
	staffPeople: any[] = [];
	bpPeople: any[] = [];
	needsMappingFaces: any[] = [];
	private personPoll: any = null;
	private deleting = false;
	private polling = false;
	private listStale = false;
	private merging = false;
	private bulkInput?: HTMLInputElement;

	constructor(
		public pageProvider: VMS_PersonProvider,
		public vmsApi: VmsApiService,
		public enroll: VmsEnrollService,
		public modalController: ModalController,
		public popoverCtrl: PopoverController,
		public alertCtrl: AlertController,
		public loadingController: LoadingController,
		public env: EnvService,
		public navCtrl: NavController,
		public location: Location
	) {
		super();
	}

	preLoadData(event?: any): void {
		this.pageConfig.pageIcon = 'people-outline';
		this.pageConfig.pageTitle = 'Persons';
		this.pageConfig.sort = [{ Dimension: 'Id', Order: 'DESC' } as SortConfig];
		this.pageConfig.ShowChangeBranch = false;
		this.pageConfig.canAdd = true;
		this.pageConfig.ShowAdd = false; // bulk upload lives in toolbar ng-content
		this.pageConfig.isShowSearch = false;
		this.pageConfig.ShowDelete = true;
		this.pageConfig.ShowMerge = true;
		this.pageConfig.canMerge = true;
		this.pageConfig.ShowSplit = true;
		this.pageConfig.canSplit = true;
		this.pageConfig.AllowSplitMany = true;
		this.query.Take = 200;
		// Person list is global — BE getCustom respects IgnoredBranch.
		this.query.IgnoredBranch = true;
		super.preLoadData(event);
	}

	async loadedData(event?: any) {
		this.rebuildPersonSlices();
		this.startPersonPolling();
		super.loadedData(event);
		this.pageConfig.ShowMerge = true;
		this.pageConfig.canMerge = true;
		this.pageConfig.ShowSplit = true;
		this.pageConfig.canSplit = true;
		this.pageConfig.AllowSplitMany = true;
		this.syncToolbarSelectionCommands();
	}

	ionViewWillEnter() {
		super.ionViewWillEnter();
		if (this.listStale) {
			this.listStale = false;
			this.refresh();
		}
	}

	events(e: any) {
		if (e?.Code === 'vms-person-list-stale') {
			this.listStale = true;
			if (this.pageConfig.didEnter && !this.pageConfig.isDetailPage) {
				this.listStale = false;
				this.refresh();
			}
		}
	}

	private rebuildPersonSlices() {
		const items = (this.items || []).filter((i) => i && !personRowIsDeleted(i));
		this.needsMappingFaces = personNeedsMapping(items);
		this.staffPeople = personMappedStaff(items);
		this.bpPeople = personMappedGuests(items);
		this.rebindSelection();
	}

	visibleRows(): any[] {
		return personVisibleRows(this.view, this.staffPeople, this.bpPeople, this.needsMappingFaces);
	}

	allVisibleSelected(): boolean {
		return personAllSelected(this.visibleRows(), this.selectedItems);
	}

	toggleSelectVisible(ev?: Event) {
		ev?.stopPropagation();
		this.selectedItems = personToggleSelectAll(this.visibleRows(), this.selectedItems);
		this.syncCheckedFlags();
		this.showCommandBySelectedRows(this.selectedItems);
	}

	showCommandBySelectedRows(selectedRows) {
		super.showCommandBySelectedRows(selectedRows);
		this.syncToolbarSelectionCommands();
	}

	/** Toolbar Merge/Split visibility from current selection (not form Status rules). */
	private syncToolbarSelectionCommands() {
		this.pageConfig.ShowMerge = this.canMergeSelected();
		this.pageConfig.canMerge = true;
		this.pageConfig.ShowSplit = this.canSplitSelected();
		this.pageConfig.canSplit = true;
		this.pageConfig.AllowSplitMany = true;
	}

	changeSelection(i, e = null) {
		if (e?.shiftKey) {
			e.preventDefault();
			e.stopPropagation();
			this.applyShiftSelect(i);
			return;
		}
		super.changeSelection(i, e);
		this.lastchecked = i;
	}

	onFaceClick(item: any, ev: MouseEvent) {
		if (ev?.shiftKey) {
			ev.preventDefault();
			this.applyShiftSelect(item);
			return;
		}
		if (!item?.Id) {
			this.env.showMessage('Person not found', 'warning');
			return;
		}
		this.navCtrl.navigateForward('/vms-person/' + item.Id);
	}

	/** Toolbar Add → bulk staff-card photos (create Person + auto-enroll). */
	add() {
		this.openBulkPhotoPicker();
	}

	openBulkPhotoPicker() {
		if (!this.bulkInput) {
			this.bulkInput = document.createElement('input');
			this.bulkInput.type = 'file';
			this.bulkInput.accept = 'image/*';
			this.bulkInput.multiple = true;
			this.bulkInput.style.display = 'none';
			this.bulkInput.addEventListener('change', () => void this.onBulkFilesSelected());
			document.body.appendChild(this.bulkInput);
		}
		this.bulkInput.value = '';
		this.bulkInput.click();
	}

	private async onBulkFilesSelected() {
		const files = Array.from(this.bulkInput?.files || []);
		if (!files.length) return;
		const loadingMsg = await this.env.translateResource('Uploading photos...');
		const loading = await this.loadingController.create({ message: loadingMsg as string });
		await loading.present();
		try {
			const rs: any = await firstValueFrom(this.vmsApi.bulkCreateFromPhotos(files));
			const results = rs?.results || [];
			const ok = results.filter((r: any) => r?.ok || r?.enrolled).length;
			this.env.showMessage('Created {{ok}}/{{total}}', ok ? 'success' : 'warning', { ok, total: results.length });
			this.refresh();
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Photo upload failed', 'danger');
		} finally {
			await loading.dismiss();
		}
	}

	edgeReady(row: any): boolean {
		return personHasEmbedding(row);
	}

	private applyShiftSelect(item: any) {
		this.selectedItems = personApplyShiftSelect(this.visibleRows(), this.selectedItems, this.lastchecked, item);
		this.syncCheckedFlags();
		const key = personItemKey(item);
		this.lastchecked = this.visibleRows().find((r) => personItemKey(r) === key) || item;
		this.showCommandBySelectedRows(this.selectedItems);
	}

	private rebindSelection() {
		const rows = [...this.staffPeople, ...this.bpPeople, ...this.needsMappingFaces];
		this.selectedItems = personRebindSelection(rows, this.selectedItems);
		if (this.lastchecked) {
			const key = personItemKey(this.lastchecked);
			this.lastchecked = rows.find((r) => personItemKey(r) === key) || null;
		}
		this.syncCheckedFlags();
		this.syncToolbarSelectionCommands();
	}

	private syncCheckedFlags() {
		const keys = new Set((this.selectedItems || []).map(personItemKey).filter(Boolean));
		for (const row of [...this.staffPeople, ...this.bpPeople, ...this.needsMappingFaces]) {
			row.checked = keys.has(personItemKey(row));
		}
		this.selectedItems = [...(this.selectedItems || [])];
	}

	canMergeSelected(): boolean {
		return (this.selectedItems || []).filter((t) => t?.PersonId).length >= 2;
	}

	async merge() {
		const targets = [...(this.selectedItems || [])].filter((t) => t?.PersonId);
		if (targets.length < 2) {
			this.env.showMessage('Select at least 2 persons to merge', 'warning');
			return;
		}
		const modal = await this.modalController.create({
			component: VmsPersonMergeModal,
			componentProps: { items: targets },
			cssClass: 'modal-merge-person',
			backdropDismiss: true,
		});
		await modal.present();
		const { data, role } = await modal.onWillDismiss();
		if (role !== 'confirm' || !data) return;
		await this.mergeSelected(data);
	}

	private async mergeSelected(data: {
		sources: any[];
		targetPerson: any | null;
		advancedContact: any | null;
	}) {
		if (this.merging) return;
		const contact =
			data.advancedContact?.Id
				? data.advancedContact
				: data.targetPerson
					? {
							Id: data.targetPerson.IDContact,
							Name: data.targetPerson.DisplayName,
							Code: data.targetPerson.EmployeeCode,
							IsStaff: data.targetPerson.IsStaff ?? data.targetPerson.PersonType === 'staff',
							RefId: data.targetPerson.IDStaff,
						}
					: null;
		if (!contact?.Id) {
			this.env.showMessage('No merge target selected', 'warning');
			return;
		}

		const sources = (data.sources || []).filter((s) => !!personAssignEventId(s));
		if (!sources.length) {
			this.env.showMessage('No events to merge the selected persons', 'warning');
			return;
		}

		this.merging = true;
		this.deleting = true;
		let displayName = personFromContact(contact).displayName || personDisplayName(data.targetPerson);
		let ok = 0;
		let skipped = 0;
		try {
			for (const src of sources) {
				const eventId = personAssignEventId(src);
				if (!eventId) {
					skipped++;
					continue;
				}
				try {
					const rs = await this.enroll.assignFace({
						eventId,
						eventNumericId: personAssignEventNumericId(src) || undefined,
						framePath: personPhotoPath(src),
						personId: String(src.PersonId || ''),
						contact,
					});
					ok++;
					if (rs.displayName) displayName = rs.displayName;
				} catch {
					skipped++;
				}
			}
			this.selectedItems = [];
			this.syncToolbarSelectionCommands();
			if (ok) {
				this.env.showMessage('Merged {{ok}} persons into {{name}}', 'success', { ok, name: displayName });
			}
			if (skipped) {
				this.env.showMessage('Skipped {{skipped}} persons (missing event or assign error)', 'warning', { skipped });
			}
			await Promise.resolve(this.refresh());
		} finally {
			this.merging = false;
			this.deleting = false;
		}
	}

	delete(publishEventCode = this.pageConfig.pageName) {
		if (!this.pageConfig.ShowDelete) return;
		const targets = [...(this.selectedItems || [])];
		if (!targets.length) return;
		const first = targets[0];
		this.env
			.actionConfirm('delete', targets.length, personDisplayName(first) || first?.EventId, this.pageConfig.pageTitle, () =>
				this.deleteSelected(targets)
			)
			.then(() => {
				this.env.showMessage('DELETE_RESULT_SUCCESS', 'success');
				this.selectedItems = [];
				this.refresh();
			})
			.catch((err: any) => {
				if (err != 'User abort action') {
					this.env.showMessage(err?.error?.Message || err?.message || 'DELETE_RESULT_FAIL', 'danger');
				}
			});
	}

	canSplitSelected(): boolean {
		// Unmapped-only selection: Split has no meaning.
		return personMappedSelected(this.selectedItems || []).length > 0;
	}

	split() {
		if (!this.pageConfig.ShowSplit) return;
		const targets = personMappedSelected(this.selectedItems || []);
		if (!targets.length) {
			this.env.showMessage('Select assigned persons to split photos back to Unassigned', 'warning');
			return;
		}
		const first = targets[0];
		this.env
			.actionConfirm('split', targets.length, personDisplayName(first), this.pageConfig.pageTitle, () => this.splitSelected(targets))
			.then(() => {
				this.env.showMessage('Split photos back to Unassigned', 'success');
				this.selectedItems = [];
				this.syncToolbarSelectionCommands();
				this.refresh();
			})
			.catch((err: any) => {
				if (err != 'User abort action') {
					this.env.showMessage(err?.error?.Message || err?.message || 'Cannot split', 'danger');
				}
			});
	}

	private async splitSelected(targets: any[]) {
		this.deleting = true;
		try {
			const personIds = personSplitPersonIds(targets);
			if (!personIds.length) return;
			await firstValueFrom(this.vmsApi.unassignPerson(personIds));
		} finally {
			this.deleting = false;
		}
	}

	private async deleteSelected(targets: any[]) {
		this.deleting = true;
		try {
			const { personIds, eventIds } = personDeleteTargets(targets);
			await firstValueFrom(this.vmsApi.deletePerson({ person_ids: personIds, event_ids: eventIds }));
		} finally {
			this.deleting = false;
		}
	}

	private startPersonPolling() {
		if (this.personPoll) clearInterval(this.personPoll);
		this.personPoll = setInterval(() => {
			if (!this.deleting && !this.merging && !this.polling && !this.pageConfig.showSpinner) this.pollNewFaces();
		}, 5000);
	}

	/** Silent poll: reconcile full snapshot so soft-deleted / remapped rows update without manual refresh. */
	private async pollNewFaces() {
		this.polling = true;
		try {
			const apiQuery = { ...this.getApiQuery(), Skip: 0 };
			const result: any = await this.pageProvider.read(apiQuery, true);
			const incoming = Array.isArray(result?.data) ? result.data : Array.isArray(result) ? result : [];
			this.items = (incoming || []).filter((i) => i && !personRowIsDeleted(i));
			this.rebuildPersonSlices();
		} catch {
			/* ignore transient poll errors */
		} finally {
			this.polling = false;
		}
	}

	frameUrl(path: string): string {
		if (!path) return '';
		if (path.indexOf('http') === 0) return path;
		return environment.appDomain.replace(/\/?$/, '/') + path.replace(/^\//, '');
	}

	photoOf(person: any): string {
		return this.frameUrl(personPhotoPath(person));
	}

	personChipOf(person: any) {
		return personOverlay(person);
	}

	personLabel(person: any): string {
		return personDisplayName(person);
	}

	faceChipOf(person: any) {
		return unmappedFaceOverlay(person);
	}

	isDisabledPerson(person: any): boolean {
		return identityIsDisabled(person);
	}

	setView(ev: any) {
		this.view = ev?.detail?.value || 'all';
	}

	override ngOnDestroy() {
		if (this.personPoll) clearInterval(this.personPoll);
		super.ngOnDestroy();
	}
}
