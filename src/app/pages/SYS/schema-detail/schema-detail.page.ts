import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController, AlertController, ItemReorderEventDetail } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';
import { SYS_SchemaProvider } from 'src/app/services/static/services.service';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { CommonService } from 'src/app/services/core/common.service';
import { lib } from 'src/app/services/static/global-functions';

@Component({
	selector: 'app-schema-detail',
	templateUrl: './schema-detail.page.html',
	styleUrls: ['./schema-detail.page.scss'],
	standalone: false,
})
export class SchemaDetailPage extends PageBase {
	dataTypes;
	controlTypes;
	openedFields: any = [];
	schemaTypeList: any;

	public isDisabled = true;
	constructor(
		public pageProvider: SYS_SchemaProvider,
		public env: EnvService,
		public navCtrl: NavController,
		public route: ActivatedRoute,
		public alertCtrl: AlertController,
		public formBuilder: FormBuilder,
		public cdr: ChangeDetectorRef,
		public loadingController: LoadingController,
		public commonService: CommonService
	) {
		super();

		this.pageConfig.isDetailPage = true;
		this.formGroup = this.formBuilder.group({
			Id: new FormControl({ value: '', disabled: true }),
			Code: [''],
			Name: ['', Validators.required],
			Type: ['Dataset', Validators.required],
			Remark: [''],
			Sort: [''],
			Icon: ['star'],
			Color: ['success'],
			Fields: this.formBuilder.array([]),
			IsDisabled: new FormControl({ value: '', disabled: true }),
			IsDeleted: new FormControl({ value: '', disabled: true }),
			CreatedBy: new FormControl({ value: '', disabled: true }),
			CreatedDate: new FormControl({ value: '', disabled: true }),
			ModifiedBy: new FormControl({ value: '', disabled: true }),
			ModifiedDate: new FormControl({ value: '', disabled: true }),
			IsColorModalOpened: [{ value: false, disabled: true }],
			IsIconModalOpened: [{ value: false, disabled: true }],
			DeletedFields: [[]],
		});
	}
	preLoadData(event) {
		this.dataTypes = [
			{ Name: 'int' },
			{ Name: 'decimal' },
			{ Name: 'text' },
			{ Name: 'varchar' },
			{ Name: 'datetime' },
			{ Name: 'numeric' },
			{ Name: 'nchar' },
			{ Name: 'date' },
			{ Name: 'nvarchar' },
			{ Name: 'number' },
			{ Name: 'bit' },
		];
		Promise.all([this.env.getType('SchemaType'), this.env.getType('ControlType')]).then((values: any) => {
			this.schemaTypeList = values[0];
			this.controlTypes = values[1];
			super.preLoadData(event);
		});
	}
	loadedData(event?: any, ignoredFromGroup?: boolean): void {
		if (!this.item.Id) {
			this.segmentView = 's2';
		}
		this.item.Fields?.forEach((e) => {
			if (!e.Id) {
				e.Id = lib.generateUID();
				e.IsDisabled = true;
			}
		});
		this.item.Fields = this.item.Fields?.sort((a, b) => a.Sort - b.Sort);
		super.loadedData(event, ignoredFromGroup);
		this.patchFormValue();
	}

	private patchFormValue() {
		if (!this.item.Id) {
			this.formGroup.get('Icon').markAsDirty();
			this.formGroup.get('Color').markAsDirty();
			this.formGroup.get('Type').markAsDirty();
		}
		this.patchFieldsValue();
		//this.formGroup?.patchValue(this.item);
	}

	private patchFieldsValue() {
		this.formGroup.controls.Fields = new FormArray([]);
		if (this.item.Fields?.length) {
			this.item.Fields.forEach((i) => this.addField(i));
		}

		if (!this.pageConfig.canEdit) {
			this.formGroup.controls.Fields.disable();
		}
	}

	addField(field: any, markAsDirty = false) {
		let groups = <FormArray>this.formGroup.controls.Fields;
		let group = this.formBuilder.group({
			IDSchema: [this.item.Id],
			Id: [field?.Id],
			// Id: new FormControl({ value: field?.Id, disabled: true }),
			Code: [field.Code, Validators.required],
			Name: [field.Name, Validators.required],
			Remark: [field.Remark],
			DataType: [field.DataType || 'nvarchar'],
			PropertyType: [field.PropertyType || 'text'],
			Aggregate: [field.Aggregate],
			Sort: [field.Sort],
			Icon: [field.Icon || 'layers'],
			Color: [field.Color || 'primary'],
			IsDisabled: new FormControl({
				value: field.IsDisabled,
				disabled: true,
			}),
			IsDeleted: new FormControl({
				value: field.IsDeleted,
				disabled: true,
			}),
			CreatedBy: new FormControl({
				value: field.CreatedBy,
				disabled: true,
			}),
			CreatedDate: new FormControl({
				value: field.CreatedDate,
				disabled: true,
			}),
			ModifiedBy: new FormControl({
				value: field.ModifiedBy,
				disabled: true,
			}),
			ModifiedDate: new FormControl({
				value: field.ModifiedDate,
				disabled: true,
			}),
		});
		if (field.IsDisabled) group.disable();
		else if (markAsDirty) {
			group.get('IDSchema').markAsDirty();
			group.get('Icon').markAsDirty();
			group.get('Color').markAsDirty();
			group.get('DataType').markAsDirty();
			group.get('PropertyType').markAsDirty();
		}
		groups.push(group);
	}

	removeField(g, index) {
		this.env
			.showPrompt('Bạn có chắc muốn xóa không?', null, 'Xóa Schema Detail')
			.then((_) => {
				let groups = <FormArray>this.formGroup.controls.Fields;
				//groups.controls[index].get('IsDeleted').setValue(true);
				groups.removeAt(index);
				this.item.Fields.splice(index, 1);
				let deletedFields = this.formGroup.get('DeletedFields').value;
				let deletedId = g.controls.Id.value;
				deletedFields.push(deletedId);

				this.formGroup.get('DeletedFields').setValue(deletedFields);
				this.formGroup.get('DeletedFields').markAsDirty();
				//  groups.controls[index].markAsDirty();
				// groups.controls[index].get('IsDeleted').markAsDirty()
				this.saveChange();
			})
			.catch((_) => {});
	}

	segmentView = 's1';
	segmentChanged(ev: any) {
		this.segmentView = ev.detail.value;
	}

	async saveChange() {
		let submitItem = this.getDirtyValues(this.formGroup);
		super.saveChange2();
	}

	savedChange(savedItem = null, form = this.formGroup) {
		super.savedChange(savedItem);
		let groups = this.formGroup.get('Fields') as FormArray;
		let idsBeforeSaving = new Set(groups.controls.map((g) => g.get('Id').value));
		this.item = savedItem;

		if (this.item.Fields?.length > 0) {
			let newIds = new Set(this.item.Fields.map((i) => i.Id));
			const diff = [...newIds].filter((item) => !idsBeforeSaving.has(item));
			if (diff?.length > 0) {
				groups.controls
					.find((d) => d.get('Id').value == null)
					?.get('Id')
					.setValue(diff[0]);
				this.openedFields = [...this.openedFields, diff[0].toString()];
				console.log(this.openedFields);
			}
		}
	}

	doReorder(ev, groups) {
		groups = ev.detail.complete(groups);
		for (let i = 0; i < groups.length; i++) {
			const g = groups[i];
			g.controls.Sort.setValue(i + 1);
			g.controls.Sort.markAsDirty();
		}
		this.saveChange();
	}

	toggleReorder() {
		this.isDisabled = !this.isDisabled;
	}

	//#region  According
	accordionGroupChange(e) {
		this.openedFields = e.detail.value;
	}

	isAccordionExpanded(id: string): boolean {
		return this.openedFields.includes(id?.toString());
	}

	//#endregion
}
