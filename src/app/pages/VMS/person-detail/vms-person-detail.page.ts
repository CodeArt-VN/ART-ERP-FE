import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { CRM_ContactProvider, VMS_PersonProvider } from 'src/app/services/static/services.service';
import { VmsApiService } from 'src/app/services/vms/vms-api.service';
import { VmsEnrollService } from 'src/app/services/vms/vms-enroll.service';
import { environment } from 'src/environments/environment';
import { personActionLabel, identityIsDisabled, identityIsStaff, personPhotoPath, personDisplayName } from '../person/vms-person.util';
import {
	PersonDetailTab,
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
import { VMS_AVATAR_FALLBACK, vmsApplyAvatarFallback } from '../vms-image.util';

@Component({
	selector: 'app-vms-person-detail',
	templateUrl: './vms-person-detail.page.html',
	styleUrls: ['./vms-person-detail.page.scss'],
	standalone: false,
})
export class VmsPersonDetailPage extends PageBase {
	branchList: any[] = [];
	optionGroup = [
		{
			Code: 'person-info',
			Name: 'General information',
			Remark: 'Identity, recognition and other information',
			Icon: 'information-circle-outline',
		},
		{
			Code: 'person-photos',
			Name: 'Images',
			Remark: 'Enrollment album for face learning',
			Icon: 'images-outline',
		},
		{
			Code: 'person-visits',
			Name: 'Visits',
			Remark: 'Visit history and stats',
			Icon: 'footsteps-outline',
		},
		{
			Code: 'person-events',
			Name: 'Events',
			Remark: 'Face seen events',
			Icon: 'flash-outline',
		},
	];
	segmentView: { Page: PersonDetailTab } = { Page: 'person-info' };
	selectedOption = this.optionGroup[0];
	photos: any[] = [];
	visits: any[] = [];
	visitStats = { total: 0, lunch: 0, dinner: 0, other: 0, branchCount: 0 };
	visitsTotal = 0;
	visitsSkip = 0;
	visitsTake = 50;
	visitsEnd = false;
	visitsLoading = false;
	personEvents: any[] = [];
	eventsTotal = 0;
	eventsSkip = 0;
	eventsTake = 50;
	eventsEnd = false;
	eventsLoading = false;
	photoUploading = false;
	photoLearning = false;
	tabLoading: Partial<Record<PersonDetailTab, boolean>> = {};
	private tabLoaded: Partial<Record<PersonDetailTab, boolean>> = {};
	readonly vmsAvatarFallback = VMS_AVATAR_FALLBACK;
	recognition = {
		hasEmbedding: false,
		modelName: '',
		version: '',
		lastCameraId: '',
		lastEventType: '',
		lastConfidence: null as number | null,
		lastOccurredAt: null as any,
		lastEdgeNodeName: '',
		dim: null as number | null,
	};
	private bpAssigning = false;
	private mismatchBusy = false;

	_contactDataSource = this.buildSelectDataSource((term) => {
		return this.contactProvider.search({
			SortBy: ['Id_desc'],
			Take: 20,
			Skip: 0,
			SkipMCP: true,
			SkipAddress: true,
			Keyword: term,
		});
	});

	constructor(
		public pageProvider: VMS_PersonProvider,
		public vmsApi: VmsApiService,
		public enroll: VmsEnrollService,
		public contactProvider: CRM_ContactProvider,
		public env: EnvService,
		public navCtrl: NavController,
		public route: ActivatedRoute,
		public alertCtrl: AlertController,
		public formBuilder: FormBuilder,
		public loadingController: LoadingController
	) {
		super();
		this.pageConfig.isDetailPage = true;
		this.pageConfig.isShowFeature = true;
		this.pageConfig.canAdd = false;
		this.pageConfig.ShowAdd = false;
		this.formGroup = formBuilder.group({
			Id: new FormControl({ value: '', disabled: true }),
			PersonId: new FormControl({ value: '', disabled: true }),
			DisplayName: new FormControl({ value: '', disabled: true }),
			EmployeeCode: new FormControl({ value: '', disabled: true }),
			PersonType: new FormControl({ value: '', disabled: true }),
			IDStaff: new FormControl({ value: '', disabled: true }),
			IDContact: [''],
			IDBranch: new FormControl({ value: '', disabled: true }),
			FirstSeenBranch: new FormControl({ value: '', disabled: true }),
			LastSeenBranch: new FormControl({ value: '', disabled: true }),
			IsDisabled: new FormControl({ value: '', disabled: true }),
			Remark: [''],
			CreatedBy: new FormControl({ value: '', disabled: true }),
			CreatedDate: new FormControl({ value: '', disabled: true }),
			ModifiedBy: new FormControl({ value: '', disabled: true }),
			ModifiedDate: new FormControl({ value: '', disabled: true }),
			ModelName: new FormControl({ value: '', disabled: true }),
			Dim: new FormControl({ value: '', disabled: true }),
			Version: new FormControl({ value: '', disabled: true }),
			LastConfidence: new FormControl({ value: '', disabled: true }),
			LastEdgeNodeName: new FormControl({ value: '', disabled: true }),
			LastCameraId: new FormControl({ value: '', disabled: true }),
			LastEventType: new FormControl({ value: '', disabled: true }),
			LastOccurredAt: new FormControl({ value: '', disabled: true }),
		});
	}

	preLoadData(event?: any): void {
		this.pageConfig.pageIcon = 'people-outline';
		this.pageConfig.pageTitle = 'Persons';
		this.branchList = [...(this.env.branchList || [])];
		this.bindPersonRouteReload();
		super.preLoadData(event);
	}

	delete(publishEventCode = this.pageConfig.pageName) {
		if (!this.pageConfig.ShowDelete) return;
		const personId = String(this.item?.PersonId || '').trim();
		if (!personId) {
			this.env.showMessage('Missing PersonId to delete', 'warning');
			return;
		}
		const label = personDisplayName(this.item) || personId;
		this.env
			.actionConfirm('delete', 1, label, this.pageConfig.pageTitle, () =>
				firstValueFrom(this.vmsApi.deletePerson({ person_ids: [personId] }))
			)
			.then(() => {
				this.env.showMessage('DELETE_RESULT_SUCCESS', 'success');
				this.env.publishEvent({
					Code: publishEventCode,
					Action: 'delete',
					Id: this.item?.Id,
					Ids: this.item?.Id != null ? [this.item.Id] : [],
				});
				this.env.publishEvent({ Code: 'vms-person-list-stale' });
				this.goBack();
				this.deleted();
				this.closeModal();
			})
			.catch((err: any) => {
				if (err != 'User abort action') {
					this.env.showMessage(err?.error?.Message || err?.message || 'DELETE_RESULT_FAIL', 'danger');
				}
			});
	}

	loadedData(event?: any, ignoredFromGroup?: boolean): void {
		this._contactDataSource.selected = [];
		if (this.item?._Contact) {
			this._contactDataSource.selected.push(this.item._Contact);
		} else if (this.item?.IDContact) {
			this._contactDataSource.selected.push({
				Id: this.item.IDContact,
				Code: this.item.EmployeeCode,
				Name: this.item.DisplayName,
				IsStaff: this.item.IsStaff,
			});
		}
		this._contactDataSource.initSearch();

		super.loadedData(event, ignoredFromGroup);
		this.photos = [];
		this.visits = [];
		this.visitStats = visitPeriodCounts(this.item?.VisitStats || this.item?.visitStats);
		this.visitsTotal = 0;
		this.visitsSkip = 0;
		this.visitsEnd = false;
		this.personEvents = [];
		this.eventsTotal = 0;
		this.eventsSkip = 0;
		this.eventsEnd = false;
		this.tabLoaded = {};
		this.recognition = recognitionSummary(this.item?.Recognition);
		this.formGroup.patchValue(
			{
				Id: this.item?.Id,
				PersonId: this.item?.PersonId,
				DisplayName: personDisplayName(this.item),
				EmployeeCode: this.item?.EmployeeCode,
				PersonType: this.item?.PersonType,
				IDStaff: this.item?.IDStaff,
				IDContact: this.item?.IDContact || null,
				IDBranch: this.branchName(this.item?.IDBranch),
				FirstSeenBranch: this.branchName(this.item?.FirstSeenBranch),
				LastSeenBranch: this.branchName(this.item?.LastSeenBranch),
				IsDisabled: this.item?.IsDisabled ? 'Yes' : 'No',
				Remark: this.item?.Remark || '',
				CreatedBy: this.item?.CreatedBy,
				CreatedDate: this.item?.CreatedDate,
				ModifiedBy: this.item?.ModifiedBy,
				ModifiedDate: this.item?.ModifiedDate,
				ModelName: this.recognition.modelName,
				Dim: this.recognition.dim,
				Version: this.recognition.version,
				LastConfidence: this.recognition.lastConfidence,
				LastEdgeNodeName: this.recognition.lastEdgeNodeName,
				LastCameraId: this.recognition.lastCameraId,
				LastEventType: this.recognition.lastEventType,
				LastOccurredAt: this.recognition.lastOccurredAt,
			},
			{ emitEvent: false }
		);
		this.formGroup.markAsPristine();
		this.ensureTabLoaded(this.segmentView.Page);
	}

	get avatarURL(): string {
		return this.photoOf(this.item) || VMS_AVATAR_FALLBACK;
	}

	onAvatarError(event: Event): void {
		vmsApplyAvatarFallback(event);
	}

	get displayTitle(): string {
		return personDisplayName(this.item);
	}

	get readiness() {
		return personRecognitionReadiness(this.photos.length, this.recognition);
	}

	loadNode(option: any = null) {
		this.pageConfig.isSubActive = true;
		if (!option) {
			option = this.optionGroup.find((d) => d.Code == this.segmentView.Page) || this.optionGroup[0];
		}
		if (!option) return;
		this.selectedOption = option;
		this.segmentView.Page = option.Code as PersonDetailTab;
		this.ensureTabLoaded(this.segmentView.Page);
	}

	private ensureTabLoaded(tab: PersonDetailTab) {
		if (!shouldLazyLoadTab(this.tabLoaded, tab) || !this.item?.Id) return;
		if (tab === 'person-photos') this.loadPhotos();
		else if (tab === 'person-visits') this.loadVisits(true);
		else if (tab === 'person-events') this.loadEvents(true);
	}

	private async loadPhotos() {
		if (!this.item?.Id) return;
		this.tabLoading = { ...this.tabLoading, 'person-photos': true };
		try {
			const rows: any = await firstValueFrom(this.vmsApi.listPersonPhotos(this.item.Id));
			this.photos = personEnrollmentPhotoRows(Array.isArray(rows) ? rows : rows?.data || []);
			this.tabLoaded = { ...this.tabLoaded, 'person-photos': true };
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Cannot load photos', 'danger');
		} finally {
			this.tabLoading = { ...this.tabLoading, 'person-photos': false };
		}
	}

	async loadVisits(reset = false) {
		if (!this.item?.Id || this.visitsLoading) return;
		if (!reset && this.visitsEnd) return;
		this.visitsLoading = true;
		this.tabLoading = { ...this.tabLoading, 'person-visits': true };
		try {
			if (reset) {
				this.visitsSkip = 0;
				this.visitsEnd = false;
				this.visits = [];
			}
			const rs: any = await firstValueFrom(this.vmsApi.listPersonVisits(this.item.Id, this.visitsSkip, this.visitsTake));
			const page = personVisitsPage(rs);
			if (reset || !this.visits.length) {
				this.visitStats = visitPeriodCounts(
					rs?.VisitStats || rs?.visitStats || this.item?.VisitStats || this.item?.visitStats
				);
			}
			this.visitsTotal = page.total;
			this.visits = reset ? page.data : [...this.visits, ...page.data];
			this.visitsSkip = this.visits.length;
			// Infinity scroll like GenCode lists: end when page shorter than Take (no total required).
			this.visitsEnd = page.data.length < this.visitsTake;
			this.tabLoaded = { ...this.tabLoaded, 'person-visits': true };
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Cannot load visits', 'danger');
		} finally {
			this.visitsLoading = false;
			this.tabLoading = { ...this.tabLoading, 'person-visits': false };
		}
	}

	onVisitsInfinite(ev?: any) {
		this.loadVisits(false).finally(() => ev?.target?.complete?.());
	}

	async loadEvents(reset = false) {
		if (!this.item?.Id || this.eventsLoading) return;
		if (!reset && this.eventsEnd) return;
		this.eventsLoading = true;
		this.tabLoading = { ...this.tabLoading, 'person-events': true };
		try {
			if (reset) {
				this.eventsSkip = 0;
				this.eventsEnd = false;
				this.personEvents = [];
			}
			const rs: any = await firstValueFrom(this.vmsApi.listPersonEvents(this.item.Id, this.eventsSkip, this.eventsTake));
			const page = personEventsPage(rs);
			this.eventsTotal = page.total;
			this.personEvents = reset ? page.data : [...this.personEvents, ...page.data];
			this.eventsSkip = this.personEvents.length;
			// Infinity scroll like GenCode lists: end when page shorter than Take (no total required).
			this.eventsEnd = page.data.length < this.eventsTake;
			this.tabLoaded = { ...this.tabLoaded, 'person-events': true };
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Cannot load events', 'danger');
		} finally {
			this.eventsLoading = false;
			this.tabLoading = { ...this.tabLoading, 'person-events': false };
		}
	}

	onEventsInfinite(ev?: any) {
		this.loadEvents(false).finally(() => ev?.target?.complete?.());
	}

	branchName(id: any): string {
		if (!id) return '';
		return this.branchList.find((b) => b.Id === id)?.Name || String(id);
	}

	frameUrl(path: string): string {
		if (!path) return '';
		if (path.indexOf('http') === 0) return path;
		return environment.appDomain.replace(/\/?$/, '/') + path.replace(/^\//, '');
	}

	photoOf(person: any): string {
		return this.frameUrl(personPhotoPath(person));
	}

	eventPhotoSrc(row: any): string {
		return this.frameUrl(row?.FramePath);
	}

	onEventThumbError(event: Event): void {
		vmsApplyAvatarFallback(event);
	}

	isStaffPerson(person: any): boolean {
		return identityIsStaff(person);
	}

	isDisabledPerson(person: any): boolean {
		return identityIsDisabled(person);
	}

	personActionLabel(person: any): string {
		return personActionLabel(person);
	}

	eventTypeLabel(row: any): string {
		const t = String(row?.EventType || row?.event_type || '').trim();
		if (t === 'face.enroll') return 'Enrollment photo';
		if (t === 'face.seen') return 'Recognition match';
		return t || '—';
	}

	eventConfidenceLabel(row: any): string {
		const pct = eventConfidencePercent(row);
		return pct == null ? '' : pct + '%';
	}

	async markEventMismatch(row: any, ev?: Event) {
		ev?.stopPropagation();
		const eventId = eventIdOf(row);
		if (!eventId || this.mismatchBusy) return;
		const ok = await new Promise<boolean>((resolve) => {
			this.env
				.showPrompt('Unassign this event from the person (face mismatch)?', null, 'Mismatch')
				.then(() => resolve(true))
				.catch(() => resolve(false));
		});
		if (!ok) return;
		this.mismatchBusy = true;
		try {
			await firstValueFrom(this.vmsApi.unassignEvent(eventId));
			this.personEvents = this.personEvents.filter((e) => eventIdOf(e) !== eventId);
			this.eventsTotal = Math.max(0, this.eventsTotal - 1);
			this.env.showMessage('Event unassigned', 'success');
			this.tabLoaded = { ...this.tabLoaded, 'person-photos': false };
			if (this.segmentView.Page === 'person-photos') this.loadPhotos();
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Cannot unassign event', 'danger');
		} finally {
			this.mismatchBusy = false;
		}
	}

	async onPhotoFileSelected(ev: Event) {
		const input = ev?.target as HTMLInputElement | null;
		const file = input?.files?.[0];
		if (input) input.value = '';
		if (!file || !this.item?.Id || !this.item?.PersonId || this.photoUploading) return;
		this.photoUploading = true;
		try {
			const rs = await this.enroll.enrollImage({
				file,
				fileName: file.name || 'face.jpg',
				personNumericId: Number(this.item.Id),
				personId: String(this.item.PersonId),
				personType: this.item.PersonType || 'guest',
				displayName: this.item.DisplayName || '',
				employeeCode: this.item.EmployeeCode || '',
				idStaff: this.item.IDStaff || undefined,
				idContact: this.item.IDContact || undefined,
			});
			await this.loadPhotos();
			if (rs.framePath && this.item) {
				if (!this.item.PhotoPath) this.item.PhotoPath = rs.framePath;
			}
			this.recognition = { ...this.recognition, hasEmbedding: !!rs.enrolled || this.recognition.hasEmbedding };
			if (rs.edgeError || rs.enrolled === false) {
				this.env.showMessage('Photo saved. Edge has not enrolled yet: {{error}}', 'warning', { error: rs.edgeError || 'enroll failed' });
			} else {
				this.env.showMessage('Photo added and enrolled', 'success');
			}
			this.loadAnItem();
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Cannot add photo', 'danger');
		} finally {
			this.photoUploading = false;
		}
	}

	async learnAlbum() {
		if (!this.item?.Id || this.photoLearning || this.photoUploading) return;
		this.photoLearning = true;
		try {
			const rs = await this.enroll.learnFromAlbum(Number(this.item.Id), Math.min(8, Math.max(1, this.photos.length || 8)));
			if (rs.enrolled > 0) {
				this.recognition = { ...this.recognition, hasEmbedding: true };
				this.env.showMessage('Re-learned {{enrolled}}/{{photos}} photos', 'success', { enrolled: rs.enrolled, photos: rs.photos });
				this.loadAnItem();
			} else {
				this.env.showMessage(rs.edgeError || 'Cannot learn from album', 'danger');
			}
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Cannot learn from album', 'danger');
		} finally {
			this.photoLearning = false;
		}
	}

	async disable(item: any) {
		await firstValueFrom(this.vmsApi.disablePerson(item.PersonId));
		this.loadAnItem();
	}

	async enable(item: any) {
		await firstValueFrom(this.vmsApi.enablePerson(item.PersonId));
		this.loadAnItem();
	}

	async onContactChange(ev?: any) {
		if (this.bpAssigning) return;
		const contactId = this.formGroup.get('IDContact')?.value;
		const prev = this.item?.IDContact || null;
		if ((contactId || null) === (prev || null)) {
			this.formGroup.markAsPristine();
			return;
		}

		this.bpAssigning = true;
		try {
			if (!contactId) {
				await firstValueFrom(this.vmsApi.unassignPerson([String(this.item.PersonId)]));
				this.env.showMessage('BP unassigned', 'success');
				this.publishPersonListStale();
				this.loadAnItem();
				return;
			}

			const contact = ev?.Id
				? ev
				: this._contactDataSource.selected?.find((c) => c.Id === contactId) || { Id: contactId };
			const eventId = String(this.item?.LatestEventId || '').trim();
			if (!eventId) {
				this.env.showMessage('No event to assign BP for this person', 'warning');
				this.formGroup.patchValue({ IDContact: prev }, { emitEvent: false });
				return;
			}

			const prevPersonId = String(this.item?.PersonId || '').trim();
			const prevNumericId = Number(this.item?.Id) || 0;
			const rs = await this.enroll.assignFace({
				eventId,
				eventNumericId: Number(this.item?.LatestEventNumericId) || undefined,
				framePath: personPhotoPath(this.item),
				personId: prevPersonId,
				contact,
			});
			this.publishPersonListStale();

			const survivorId = Number(rs.id) || 0;
			const mergedAway =
				rs.merged === true ||
				(!!rs.personId && !!prevPersonId && rs.personId !== prevPersonId) ||
				(survivorId > 0 && prevNumericId > 0 && survivorId !== prevNumericId);

			if (rs.edgeError) {
				this.env.showMessage(
					mergedAway
						? 'Merged into {{name}}. Edge has not enrolled yet: {{error}}'
						: 'Assigned {{name}}. Edge has not enrolled yet: {{error}}',
					'warning',
					{ name: rs.displayName, error: rs.edgeError }
				);
			} else if (mergedAway) {
				this.env.showMessage('Merged into {{name}}', 'success', { name: rs.displayName });
			} else {
				this.env.showMessage('Assigned {{name}}', 'success', { name: rs.displayName });
			}

			if (mergedAway && survivorId > 0) {
				this.id = survivorId;
				this.item = null;
				await this.navCtrl.navigateRoot('/vms-person/' + survivorId);
				this.loadAnItem();
				return;
			}
			this.loadAnItem();
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Cannot assign', 'danger');
			this.formGroup.patchValue({ IDContact: prev }, { emitEvent: false });
		} finally {
			this.bpAssigning = false;
		}
	}

	private publishPersonListStale() {
		const code = this.pageConfig.pageName || 'vms-person';
		this.env.publishEvent({ Code: code });
		this.env.publishEvent({ Code: 'vms-person-list-stale' });
	}

	/** Same component instance is reused when only :id changes — reload after merge redirect. */
	private bindPersonRouteReload() {
		if ((this as any)._personRouteBound) return;
		(this as any)._personRouteBound = true;
		this.subscriptions.push(
			this.route.paramMap.subscribe((p) => {
				const nid = p.get('id');
				if (nid == null || nid === '') return;
				const next = Number(nid) || nid;
				if (String(next) === String(this.id)) {
					// URL already matches this.id but form still shows a soft-deleted / stale row
					if (this.item && Number(this.item.Id) !== Number(next)) {
						this.loadAnItem();
					}
					return;
				}
				this.id = next;
				this.loadAnItem();
			})
		);
	}

	async removePhoto(face: any, ev?: Event) {
		ev?.stopPropagation();
		const photoId = Number(face?.Id ?? face?.id);
		if (!this.item?.Id || !photoId) return;
		await firstValueFrom(this.vmsApi.deletePersonPhoto(this.item.Id, photoId));
		this.photos = this.photos.filter((p) => Number(p.Id ?? p.id) !== photoId);
		if (this.item) {
			this.item.PhotoPath = this.photos.find((p) => this.isPrimaryPhoto(p))?.FramePath || this.photos[0]?.FramePath || '';
		}
	}

	isPrimaryPhoto(face: any): boolean {
		if (!face) return false;
		if (face.IsPrimary === true || face.isPrimary === true) return true;
		const path = String(face.FramePath || face.framePath || '').trim();
		const primary = String(this.item?.PhotoPath || '').trim();
		return !!path && !!primary && path.toLowerCase() === primary.toLowerCase();
	}

	async setPrimaryPhoto(face: any, ev?: Event) {
		ev?.stopPropagation();
		const photoId = Number(face?.Id ?? face?.id);
		if (!this.item?.Id || !photoId || this.photoUploading) return;
		try {
			const rs: any = await firstValueFrom(this.vmsApi.setPersonPrimaryPhoto(this.item.Id, photoId));
			const path = String(rs?.PhotoPath || rs?.framePath || face.FramePath || '').trim();
			if (this.item) this.item.PhotoPath = path;
			this.photos = this.photos.map((p) => ({
				...p,
				IsPrimary: Number(p.Id ?? p.id) === photoId,
			}));
			this.env.showMessage('Primary photo selected', 'success');
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Cannot set primary photo', 'danger');
		}
	}
}
