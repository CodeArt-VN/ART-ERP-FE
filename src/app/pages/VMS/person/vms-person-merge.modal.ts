import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { CRM_ContactProvider } from 'src/app/services/static/services.service';
import { environment } from 'src/environments/environment';
import {
	canConfirmPersonMerge,
	personAssignEventId,
	personItemKey,
	personMappedSelected,
	personMergeSources,
	personMergeTargetDefault,
	identityNeedsBpMapping,
	personPhotoPath,
	personDisplayName,
	personOverlay,
	unmappedFaceOverlay,
} from './vms-person.util';
import { VmsPhotoLoadState, vmsPersonPhotoIcon } from '../vms-image.util';

@Component({
	selector: 'app-vms-person-merge-modal',
	templateUrl: 'vms-person-merge.modal.html',
	styleUrls: ['vms-person-merge.modal.scss'],
	standalone: false,
})
export class VmsPersonMergeModal extends PageBase implements OnInit {
	/** Selected persons from list (componentProps). */
	items: any[] = [];

	targetKey: string | null = null;
	showAdvanced = false;
	advancedContact: any = null;
	formGroup: FormGroup;
	private readonly photoLoad = new VmsPhotoLoadState();

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
		public env: EnvService,
		public modalCtrl: ModalController,
		public contactProvider: CRM_ContactProvider,
		public formBuilder: FormBuilder
	) {
		super();
		this.pageConfig.isDetailPage = true;
		this.formGroup = this.formBuilder.group({
			IDContact: [null],
		});
	}

	ngOnInit() {
		this.items = [...(this.items || [])];
		this.targetKey = personMergeTargetDefault(this.items);
		// No mapped person in selection → show Object select immediately.
		this.showAdvanced = personMappedSelected(this.items).length === 0;
		this._contactDataSource.initSearch();
	}

	get mappedCount(): number {
		return personMappedSelected(this.items).length;
	}

	get canPickTarget(): boolean {
		return this.mappedCount > 1 && !this.advancedContact?.Id;
	}

	get canConfirm(): boolean {
		return canConfirmPersonMerge(this.items, this.targetKey, this.advancedContact);
	}

	get targetName(): string {
		if (this.advancedContact?.Id) {
			return String(this.advancedContact.Name || this.advancedContact.Code || '#' + this.advancedContact.Id).trim();
		}
		const target = this.items.find((r) => personItemKey(r) === this.targetKey);
		if (!target) return '';
		return personDisplayName(target);
	}

	isTarget(row: any): boolean {
		if (this.advancedContact?.Id) {
			return Number(row?.IDContact) === Number(this.advancedContact.Id);
		}
		return personItemKey(row) === this.targetKey;
	}

	isMapped(row: any): boolean {
		return !identityNeedsBpMapping(row);
	}

	onFaceClick(row: any) {
		if (this.advancedContact?.Id) return;
		if (!this.isMapped(row)) {
			this.env.showMessage('Only assigned persons can be the merge target', 'warning');
			return;
		}
		if (this.mappedCount === 1) return;
		this.targetKey = personItemKey(row);
	}

	toggleAdvanced() {
		this.showAdvanced = !this.showAdvanced;
		if (!this.showAdvanced) {
			this.clearAdvanced();
		}
	}

	onAdvancedContactChange(ev?: any) {
		const contact = ev?.Id ? ev : this._contactDataSource.selected?.[0] || null;
		const id = contact?.Id ?? this.formGroup.get('IDContact')?.value;
		if (!id) {
			this.clearAdvanced();
			return;
		}
		this.advancedContact = contact?.Id ? contact : { Id: id, Name: contact?.Name, Code: contact?.Code };
		const match = this.items.find((r) => Number(r?.IDContact) === Number(id));
		this.targetKey = match ? personItemKey(match) : null;
	}

	clearAdvanced() {
		this.advancedContact = null;
		this.formGroup.patchValue({ IDContact: null }, { emitEvent: false });
		this._contactDataSource.selected = [];
		this.targetKey = personMergeTargetDefault(this.items);
	}

	cancel() {
		this.modalCtrl.dismiss(null, 'cancel');
	}

	confirm() {
		if (!this.canConfirm) return;
		const sources = personMergeSources(this.items, this.targetKey).filter((s) => !!personAssignEventId(s));
		const targetPerson = this.targetKey ? this.items.find((r) => personItemKey(r) === this.targetKey) : null;
		this.modalCtrl.dismiss(
			{
				sources,
				targetPerson: targetPerson || null,
				advancedContact: this.advancedContact?.Id ? this.advancedContact : null,
				targetKey: this.targetKey,
			},
			'confirm'
		);
	}

	frameUrl(path: string): string {
		if (!path) return '';
		if (path.indexOf('http') === 0) return path;
		return environment.appDomain.replace(/\/?$/, '/') + path.replace(/^\//, '');
	}

	photoOf(person: any): string {
		return this.frameUrl(personPhotoPath(person));
	}

	photoShow(person: any): boolean {
		return this.photoLoad.showPhoto(personItemKey(person), this.photoOf(person));
	}

	onPhotoError(person: any): void {
		this.photoLoad.onError(personItemKey(person), this.photoOf(person));
	}

	personPhotoIcon(person: any): string {
		return vmsPersonPhotoIcon(person, !identityNeedsBpMapping(person));
	}

	personChipOf(person: any) {
		return personOverlay(person);
	}

	faceChipOf(person: any) {
		return unmappedFaceOverlay(person);
	}

	personLabel(person: any): string {
		return personDisplayName(person);
	}
}
