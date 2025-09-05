import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ReportDataConfig } from 'src/app/interfaces/options-interface';
import { EnvService } from 'src/app/services/core/env.service';
import { SYS_SchemaProvider } from 'src/app/services/static/services.service';

@Component({
	selector: 'app-advance-filter-modal',
	templateUrl: './advance-filter-modal.component.html',
	styleUrls: ['./advance-filter-modal.component.scss'],
	standalone: false,
})
export class AdvanceFilterModalComponent implements OnInit {
	form: FormGroup;
	filter: any;
	schemaPage: any;
	_AdvanceConfig: any;
	selectedSchema: any;
	isOpenDatePicker = false;
	_schemaDetailsList: any[] = [];
	_timeDimension: any[] = [];
	_intervalDataSource: any[] = [];
	_measureMethodDataSource: any[] = [];
	confirmButtonText = 'Confirm';
	cancelButtonText = 'Cancel';
	renderGroup;
	outputData: any;
	directionList = [
		{ Code: 'ASC', Name: 'Ascending ↑ ' },
		{ Code: 'DESC', Name: 'Descending ↓ ' },
	];
	showSpinner = true;
	constructor(
		public formBuilder: FormBuilder,
		public schemaProvider: SYS_SchemaProvider,
		public modalController: ModalController,
		public env: EnvService
	) {}
	ngOnInit(): void {
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
		this.buildForm(this._AdvanceConfig);
		if (!this.selectedSchema) {
			this.env
				.showLoading(
					'Please wait for a few moments',
					this.schemaProvider.commonService
						.connect('GET', 'BI/Schema/GetSchemaByCode', { Code: this._AdvanceConfig.Schema.Code, Type: this._AdvanceConfig.Schema.Type })
						.toPromise()
				)
				.then((data: any) => {
					if (data) {
						this.selectedSchema = data;
						this._schemaDetailsList = data.Fields;
						this._timeDimension = [...this._schemaDetailsList.filter((d) => ['datetime', 'date'].includes(d.DataType))];

						console.log('Schema:', this.selectedSchema);
					} else {
						this.closeModal();
						this.env.showMessage('Cannot get schema !', 'danger');
					}
				})
				.catch((error) => {
					this.closeModal();
					this.env.showMessage('Cannot get schema !', 'danger');
				});
		} else {
			this._schemaDetailsList = this.selectedSchema.Fields;
			this._timeDimension = [...this._schemaDetailsList.filter((d) => ['datetime', 'date'].includes(d.DataType))];
		}
	}

	buildForm(c) {
		//c: ReportDataConfig
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
				Schema: {
					Type: this._AdvanceConfig.Schema.Type,
					Code: this._AdvanceConfig.Schema.Code,
				},
				Transform: {
					Filter: {
						Dimension: 'logical',
						Operator: 'AND',
					},
				},
				SortBy: '[]',
				CompareBy: [],
				MeasureBy: [],
				// Take: 5,
				// Skip: 1,
			};
		}

		this.form = this.formBuilder.group({
			Schema: this.formBuilder.group({
				Type: [c.Schema?.Type],
				Code: [c.Schema?.Code],
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
				Property: [c.Interval?.Property,Validators.required],
				Type: [c.Interval?.Type],
				Title: [c.Interval?.Title],
			}),
			CompareBy: this.PatchFormArrayValue(c.CompareBy, 'CompareBy'),
			MeasureBy: this.PatchFormArrayValue(c.MeasureBy, 'MeasureBy'),
			Transform: this.formBuilder.group({
				Filter: [''],
			}),
			SortBy: this.patchSortBy(c.SortBy || '[]'),
			Take: [c.Take || 0],
			Skip: [c.Skip || 0],
		});
		let filter = c.Transform?.Filter;
		if (filter) this.form.get('Transform.Filter').setValue(filter);
		if(this.renderGroup){
			if(this.renderGroup.Filter ){
				this.renderGroup.Filter.forEach(i=>{
					this.renderGroup.Filter[i] = true;
				})
			}
			
			if(this.renderGroup.Select){
					this.renderGroup.Select.forEach(i=>{
					this.renderGroup.Select[i] = true;
				})
			}
		} 
	}

	setTransform(filter) {
		this.form.get('Transform').setValue({ Filter: filter });
	}
	patchSortBy(array) {
		if (typeof array === 'string') {
			if (array && array != '[]') {
				let raw = array;
				let cleaned = raw.replace(/^\[|\]$/g, ''); // Bỏ dấu [ ]
				let fields = cleaned.split(','); // Tách thành mảng
				array = fields.map((f) => {
					if (f.endsWith('_desc')) {
						return { Property: f.replace('_desc', ''), Direction: 'DESC' };
					}
					return { Property: f, Direction: 'ASC' };
				});
			}
		}
		let groups = new FormArray([]);
		let group: any = {};
		if (array instanceof Array) {
			array.forEach((c) => {
				group = this.formBuilder.group({
					Property: [''],
					Direction: [''], //ASC or DESC
				});
				let keys = Object.keys(c);
				keys.forEach((key) => {
					if (group.get(key)) group.get(key).setValue(c[key]);
				});
				groups.push(group);
			});
		}
		return groups;
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

	@ViewChild('popoverPub') popoverPub;
	isOpenPopover = false;
	listControls: any;
	formGroup: FormGroup;
	tempForm: any;
	pickerGroupName;
	presentPopover(event, fg, groupName) {
		this.pickerGroupName = groupName;
		this.formGroup = fg;
		this.isOpenPopover = true;
		this.popoverPub.event = event;
	}

	@ViewChild('popover') popover;

	addNewForm(e, type) {
		if (type == 'SortBy') {
			let group = this.formBuilder.group({
				Property: ['', Validators.required],
				Direction: ['ASC'],
			});
			let sortBy = this.form.get('SortBy') as FormArray;
			sortBy.push(group);
			this.presentPopover(e, group, 'SortBy');
		} else {
			let group = this.formBuilder.group({
				Property: ['', Validators.required],
				Title: [''],
			});
			if (type == 'MeasureBy') {
				let groupMeasure = this.formBuilder.group({
					...group.controls,
					Method: [''],
				});
				let measureBy = this.form.get('MeasureBy') as FormArray;
				measureBy.push(groupMeasure);
				this.presentPopover(e, groupMeasure, 'MeasureBy');
			} else if (type == 'CompareBy') {
				let compareBy = this.form.get('CompareBy') as FormArray;
				compareBy.push(group);
				this.presentPopover(e, group, 'CompareBy');
			}
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
	dismissPopover(type) {
		if (!this.isOpenPopover) return;
		if (type == 'Interval') {
			let group = this.form.get(type) as FormGroup;
			if (!group.get('Property').value) {
				group.get('Title').setValue(null);
				group.get('Type').setValue(null);
			}
		} else {
			let groups = this.form.get(type) as FormArray;
			groups.controls
				.filter((c) => !c.get('Property').value)
				.forEach((c) => {
					groups.removeAt(groups.controls.indexOf(c));
				});
		}
		this.isOpenPopover = false;
	}

	dismissDatePicker(apply: boolean = false) {
		if (!this.isOpenDatePicker) return;

		if (!apply) {
		} else {
			// this.onInputChange(this.pickerControl);
		}
		this.isOpenDatePicker = false;
	}

	refresh() {
		this.buildForm(null);
	}

	async closeModal(isApply: boolean = false) {
		if (isApply) {
			let raw = this.form.getRawValue();
			let SortByArray = raw.SortBy; // [{ Property: 'Id', Direction: 'ASC' }, ...]
			let SortByStr = '[' + SortByArray.map((o) => (o.Direction === 'DESC' ? `${o.Property}_desc` : o.Property)).join(',') + ']';
			raw.SortBy = SortByStr;
			this.outputData = raw;
			await this.modalController.dismiss({ data: this.outputData, schema: this.selectedSchema, isApplyFilter: isApply });
		} else await this.modalController.dismiss({ data: null, schema: this.selectedSchema, isApplyFilter: isApply });
	}
}
