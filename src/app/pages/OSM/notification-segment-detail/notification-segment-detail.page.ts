import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';
import { SYS_SegmentProvider, SYS_SchemaProvider } from 'src/app/services/static/services.service';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { CommonService } from 'src/app/services/core/common.service';
import { ReportDataConfig } from 'src/app/models/options-interface';

@Component({
	selector: 'app-notification-segment-detail',
	templateUrl: './notification-segment-detail.page.html',
	styleUrls: ['./notification-segment-detail.page.scss'],
	standalone: false,
})
export class NotificationSegmentDetailPage extends PageBase {
	config: any = null;
	selectedSchema: any;
	canChangeReportConfig = true;
	_IDSchemaDataSource: any = this.buildSelectDataSource((term) => {
		return this.schemaService.search({ Take: 20, Skip: 0, Term: term });
	});
	_schemaDetailsList = [];
	_intervalDataSource: any[] = [];
	_measureMethodDataSource: any[] = [];
	constructor(
		public pageProvider: SYS_SegmentProvider,
		public schemaService: SYS_SchemaProvider,
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

		this.formGroup = formBuilder.group({
			IDBranch: [this.env.selectedBranch],
			Id: new FormControl({ value: '', disabled: true }),
			Code: [''],
			Name: ['', Validators.required],
			Remark: [''],
			Sort: [''],
			IsDisabled: new FormControl({ value: '', disabled: true }),
			IsDeleted: new FormControl({ value: '', disabled: true }),
			CreatedBy: new FormControl({ value: '', disabled: true }),
			CreatedDate: new FormControl({ value: '', disabled: true }),
			ModifiedBy: new FormControl({ value: '', disabled: true }),
			ModifiedDate: new FormControl({ value: '', disabled: true }),
			Config: [''],
			_Config: new FormGroup({}),
		});
	}

	segmentView = 's1';
	segmentChanged(ev: any) {
		this.segmentView = ev.detail.value;
	}

	preLoadData(event?: any): void {
		this._intervalDataSource = [
			{ Code: 'Hour', Name: 'Hour' },
			{ Code: 'HourOfDay', Name: 'Hour of Day' },
			{ Code: 'Day', Name: 'Day' },
			{ Code: 'DayOfWeek', Name: 'Day of Week' },
			{ Code: 'Week', Name: 'Week' },
			{ Code: 'Month', Name: 'Month' },
			{ Code: 'Quater', Name: 'Quater' },
			{ Code: 'Year', Name: 'Year' },
		];
		this._measureMethodDataSource = [
			{ Code: 'count', Name: 'Count {0}', icon: '' },
			{ Code: 'count distinct', Name: 'Count DISTINCT {0}', icon: '' },
			{ Code: 'sum', Name: 'Sum of {0}', icon: '' },
			{ Code: 'max', Name: 'Max of {0}', icon: '' },
			{ Code: 'min', Name: 'Min of {0}', icon: '' },
			{ Code: 'average', Name: 'Average {0}', icon: '' },
		];
		super.preLoadData(event);
	}

	loadedData(event?: any): void {
		this.buildForm(null);
		super.loadedData(event);
		if (this.item.Id != 0) {
			let configValue: ReportDataConfig = JSON.parse(this.item.Config);
			this.buildForm(configValue);
			this.schemaService.getAnItem(configValue.Schema.Id).then((data: any) => {
				if (data) {
					this.selectedSchema = data;
					this._schemaDetailsList = data.Fields;
				}
			});
			this._IDSchemaDataSource.selected.push(configValue.Schema);
		}
		this._IDSchemaDataSource.initSearch();
	}

	changeSchema(e) {
		if (e?.Id) {
			this.formGroup.controls._Config.get('Schema').setValue({
				Id: e?.Id,
				Type: e?.Type,
				Code: e?.Code,
				Name: e?.Name,
			});
			this.schemaService.getAnItem(e.Id).then((data: any) => {
				if (data) {
					this.selectedSchema = data;
					this._schemaDetailsList = data.Fields;
				}
			});
		} else {
			this.selectedSchema = null;
			this._schemaDetailsList = [];
			this.buildForm(null);
		}
	}

	PatchFormArrayValue(array, type) {
		let groups = new FormArray([]);
		let group: any = {};
		if (array) {
			array.forEach((c) => {
				if (type == 'MeasureBy') {
					group = this.formBuilder.group({
						Property: [''],
						Method: [''],
						Title: [''],
					});
				} else if (type == 'CompareBy') {
					group = this.formBuilder.group({
						Property: [''],
						Title: [''],
					});
				}
				let keys = Object.keys(c);
				keys.forEach((key) => {
					if (group.get(key)) group.get(key).setValue(c[key]);
				});
				groups.push(group);
			});
		}
		return groups;
	}

	buildForm(c: ReportDataConfig) {
		if (!c) {
			c = {
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
				Schema: null,
				Transform: {
					Filter: {
						Dimension: 'logical',
						Operator: 'AND',
					},
				},

				CompareBy: [],
				MeasureBy: [],
			};
		}

		let form: FormGroup = this.formBuilder.group({
			Schema: this.formBuilder.group({
				Id: [c.Schema?.Id, Validators.required],
				Type: [c.Schema?.Type],
				Code: [c.Schema?.Code],
				Name: [c.Schema?.Name],
			}),
			TimeFrame: this.formBuilder.group({
				Dimension: [c.TimeFrame?.Dimension],
				From: this.formBuilder.group({
					Type: [c.TimeFrame?.From?.Type],
					IsPastDate: [c.TimeFrame?.From?.IsPastDate],
					Period: [c.TimeFrame?.From?.Period],
					Amount: [c.TimeFrame?.From?.Amount],
					Value: [c.TimeFrame?.From?.Value],
				}),
				To: this.formBuilder.group({
					Type: [c.TimeFrame?.To?.Type],
					IsPastDate: [c.TimeFrame?.To?.IsPastDate],
					Period: [c.TimeFrame?.To?.Period],
					Amount: [c.TimeFrame?.To?.Amount],
					Value: [c.TimeFrame?.To?.Value],
				}),
			}),
			CompareTo: this.formBuilder.group({
				Type: [c?.CompareTo?.Type],
				IsPastDate: [c.CompareTo?.IsPastDate],
				Period: [c.CompareTo?.Period],
				Amount: [c.CompareTo?.Amount],
				Value: [c.CompareTo?.Value],
			}),
			Interval: this.formBuilder.group({
				Property: [c.Interval?.Property],
				Type: [c.Interval?.Type],
				Title: [c.Interval?.Title],
			}),
			CompareBy: this.PatchFormArrayValue(c.CompareBy, 'CompareBy'),
			MeasureBy: this.PatchFormArrayValue(c.MeasureBy, 'MeasureBy'),
			Transform: this.formBuilder.group({
				Filter: [''],
			}),
		});
		this.formGroup.setControl('_Config', form);
		let filter = c?.Transform?.Filter;
		if (filter) form.get('Transform.Filter').setValue(filter);
	}

	@ViewChild('popoverPub') popoverPub;
	isOpenPopover = false;
	pickerGroupName;
	formPopover: any;
	presentPopover(event, fg, groupName) {
		this.pickerGroupName = groupName;
		this.formPopover = fg;
		this.isOpenPopover = true;
		this.popoverPub.event = event;
	}

	setTransform(filter) {
		this.formGroup.controls._Config.get('Transform').setValue({ Filter: filter });
	}

	@ViewChild('popover') popover;

	addNewForm(e, type) {
		let group = this.formBuilder.group({
			Property: [''],
			Title: [''],
		});
		if (type == 'MeasureBy') {
			let groupMeasure = this.formBuilder.group({
				...group.controls,
				Method: [''],
			});
			let measureBy = this.formGroup.controls._Config.get('MeasureBy') as FormArray;
			measureBy.push(groupMeasure);
			this.presentPopover(e, groupMeasure, 'MeasureBy');
		} else if (type == 'CompareBy') {
			let compareBy = this.formGroup.controls._Config.get('CompareBy') as FormArray;
			compareBy.push(group);
			this.presentPopover(e, group, 'CompareBy');
		}
	}

	removeForm(e, fg, parentForm): void {
		e.preventDefault();
		if (parentForm instanceof FormArray) {
			let index = parentForm.controls?.indexOf(fg);
			if (index !== -1) {
				parentForm.removeAt(index);
			}
		} else {
			let index = parentForm.indexOf(fg);
			if (index !== -1) {
				parentForm.removeAt(index);
			}
		}
	}

	dismissPopover(apply: boolean = false) {
		if (!this.isOpenPopover) return;
		if (!apply) {
			// this.form.patchValue(this._reportConfig?.DataConfig);
			this.buildForm(this.formGroup.controls._Config.getRawValue());
		}
		this.isOpenPopover = false;
	}

	async saveChange() {
		this.formGroup.controls.Config.setValue(JSON.stringify(this.formGroup.controls._Config.value));
		this.formGroup.controls.Config.markAsDirty();
		super.saveChange2();
	}
}
