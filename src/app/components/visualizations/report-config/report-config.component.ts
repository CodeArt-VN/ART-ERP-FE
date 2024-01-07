import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { Subject, concat, of, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs';
import { BIReport, ReportDataConfig } from 'src/app/models/options-interface';
import { ReportService } from 'src/app/services/report.service';
import { ApiSetting } from 'src/app/services/static/api-setting';
import { SYS_SchemaDetailProvider, SYS_SchemaProvider } from 'src/app/services/static/services.service';

@Component({
	selector: 'app-report-config',
	templateUrl: './report-config.component.html',
	styleUrls: ['./report-config.component.scss'],
})
export class ReportConfigComponent implements OnInit {
	form: FormGroup;
	_reportConfig: BIReport;
	selectedSchema: any;
	_dataset: any;
	_schemaList: any;
	_schemaDetailsList: any[] = [];
	_timePeriodList: any[] = [];
	_intervalDataSource: any[] = [];
	_measureMethodDataSource: any[] = [];
	_IDSchemaDataSource: any = {
		searchProvider: this.schemaService,
		loading: false,
		input$: new Subject<string>(),
		selected: [],
		items$: null,
		initSearch() {
			this.loading = false;
			this.items$ = concat(
				of(this.selected),
				this.input$.pipe(
					distinctUntilChanged(),
					tap(() => this.loading = true),
					switchMap(term => this.searchProvider.search({ Take: 20, Skip: 0, Term: term }).pipe(
						catchError(() => of([])), // empty list on error
						tap(() => this.loading = false)
					))

				)
			);
		}
	}
	constructor(public rpt: ReportService,
		public schemaService: SYS_SchemaProvider,
		public formBuilder: FormBuilder,
	) { }

	ngOnInit() {
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
			{ Code: 'sum', Name: 'Sum of {0}', icon: '' },
			{ Code: 'max', Name: 'Max of {0}', icon: '' },
			{ Code: 'min', Name: 'Min of {0}', icon: '' },
			{ Code: 'average', Name: 'Average {0}', icon: '' },
		];
	}


	/** Report Id to find report config */
	_reportId: number;
	@Input() set reportId(v: number) {
		if (v) {
			this._reportId = v;
			this._reportConfig = this.rpt.getReportConfig(this._reportId);

			this._timePeriodList = JSON.parse(JSON.stringify(this.rpt.commonOptions.timeConfigPeriod));

			this._timePeriodList.forEach(p => {
				p.name = p.name.toLowerCase() + ' ago';
			});
		}
		this.buildForm(this._reportConfig.DataConfig);
		let schema = this._reportConfig?.DataConfig?.Schema;
		if (schema) {
			this._IDSchemaDataSource.selected.push(schema);
			this._IDSchemaDataSource.initSearch();
			this.changeSchema(schema);
		}
	}

	changeSchema(e) {
		this.form.get('Schema').setValue({
			Id: e.Id,
			Type: e.Type,
			Code: e.Code,
			Name: e.Name
		});
		this.schemaService.getAnItem(e.Id).then((data: any) => {
			if (data) {
				this.selectedSchema = data;
				this._schemaDetailsList = data.Fields;
			}
		})
	}

	saveConfig(filter) {
		this.form.get('Transform').setValue({ Filter: filter });
		console.log(this.form.getRawValue())
	}

	onChange(event) {
		console.log(this.form.getRawValue());
	}

	PatchFormArrayValue(array, type) {
		let groups = new FormArray([]);
		let group: any = {};
		if (array) {
			array.forEach(c => {
				if (type == 'MeasureBy') {
					group = this.formBuilder.group({
						Property: [''],
						Method: [''],
						Title: ['']
					})
				}
				else if (type == 'CompareBy') {
					group = this.formBuilder.group({
						Property: [''],
						Title: ['']
					})
				}
				let keys = Object.keys(c);
				keys.forEach(key => {
					if (group.get(key)) group.get(key).setValue(c[key])
				})
				groups.push(group)
			});
		}
		return groups;
	}
	buildForm(c: ReportDataConfig) {//c: ReportDataConfig
		if (!c) {
			c = {
				TimeFrame: {
					Dimension: 'OrderDate',
					From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 1 },
					To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }
				},
				CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
				Schema: { Id: 1, Code: 'SALE_Order', Name: 'Sale orders', Type: 'DBTable' },
				Transform: {
					Filter: {
						Dimension: 'logical', Operator: 'AND',
						Logicals: [
							{ Dimension: 'Status', Operator: 'IN', Value: JSON.stringify(['New', 'Confirmed', 'Scheduled', 'Picking', 'Delivered', 'Done', 'InDelivery']) }, //'Cancelled', 'Splitted', 'Merged',
							{ Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
						]
					},
				},
				Interval: { Property: 'OrderDate', Type: 'HourOfDay', Title: 'Order time' },
				CompareBy: [
					{ Property: 'Status', Title: 'Status' },
				],
				MeasureBy: [
					{ Property: 'Id', Method: 'count', Title: 'Count' },
					{ Property: 'NumberOfGuests', Method: 'count', Title: 'Guests' },
					{ Property: 'CalcTotal', Method: 'sum', Title: 'Total' },
				]
			}
		}
		this.form = this.formBuilder.group({
			TimeFrame: this.formBuilder.group({
				Dimension: [c.TimeFrame?.Dimension],
				From: this.formBuilder.group({
					Type: [c.TimeFrame?.From?.Type],
					IsPastDate: [c.TimeFrame?.From?.IsPastDate],
					Period: [c.TimeFrame?.From?.Period],
					Amount: [c.TimeFrame?.From?.Amount],
				}),
				To: this.formBuilder.group({
					Type: [c.TimeFrame?.To?.Type],
					IsPastDate: [c.TimeFrame?.To?.IsPastDate],
					Period: [c.TimeFrame?.To?.Period],
					Amount: [c.TimeFrame?.To?.Amount],
				}),
			}),
			CompareTo: this.formBuilder.group({
				Type: [c?.CompareTo?.Type],
				IsPastDate: [c.CompareTo?.IsPastDate],
				Period: [c.CompareTo?.Period],
				Amount: [c.CompareTo?.Amount],
			}),
			Schema: this.formBuilder.group({
				Id: [c.Schema?.Id],
				Type: [c.Schema?.Type],
				Code: [c.Schema?.Code],
				Name: [c.Schema?.Name],
			}),
			Transform: this.formBuilder.group({
				Filter: ['']
			}),
			Interval: this.formBuilder.group({
				Property: [c.Interval?.Property],
				Type: [c.Interval?.Type],
				Title: [c.Interval?.Title],
			}),
			CompareBy: this.PatchFormArrayValue(c.CompareBy, 'CompareBy'),
			MeasureBy: this.PatchFormArrayValue(c.MeasureBy, 'MeasureBy')
		});
		let filter = this._reportConfig.DataConfig?.Transform?.Filter;
		if (filter) this.form.get('Transform.Filter').setValue(filter);
		console.log(this.form.getRawValue());
		// let notGroupList = ['MeasureBy', 'CompareBy', 'Interval', 'Transform', 'Schema', 'ReprotInfo'];

		// let keys = Object.keys(c);
		// let group: any = {};
		// keys.forEach(key => {

		// 	if (typeof c[key] === 'object' && notGroupList.findIndex(d => d == key) == -1) {
		// 		if (Array.isArray(c[key])) {
		// 			for (let idx = 0; idx < c[key].length; idx++) {
		// 				const cObject = c[key][idx];
		// 				let cGroup = this.buildForm(cObject);
		// 				group[key] = new FormArray([]);
		// 				group[key].push(cGroup);
		// 			}
		// 		}
		// 		else {
		// 			group[key] = this.buildForm(c[key]);
		// 		}
		// 	}
		// 	else {
		// 		group[key] = new FormControl(c[key]);
		// 	}
		// });
		// return new FormGroup(group);
	}

	@ViewChild('popoverPub') popoverPub;
	isOpenPopover = false;
	listControls:any;
	formGroup:any;
	tempForm:any;
	presentPopover(event,fg, groupName) {
		this.pickerGroupName = groupName;
		this.formGroup = fg;
		this.isOpenPopover = true;
		this.popoverPub.event = event;
	}


	@ViewChild('popover') popover;
	isOpenDatePicker = false;
	isOpenCompareBy = false;
	pickerControl: any;
	pickerGroupName: string;
	presentDatePicker(event, control, groupName) {
		this.pickerGroupName = groupName;
		this.pickerControl = control;
		this.popover.event = event;
		this.isOpenDatePicker = true;
	}

	pickDate(pDate) {
		if (this.pickerControl.controls.Type.value != pDate.Type) {
			this.pickerControl.controls.Type.setValue(pDate.Type);
			this.pickerControl.controls.Type.markAsDirty();
		}
		if (this.pickerControl.controls.IsPastDate.value != pDate.IsPastDate) {
			this.pickerControl.controls.IsPastDate.setValue(pDate.IsPastDate);
			this.pickerControl.controls.IsPastDate.markAsDirty();
		}
		if (this.pickerControl.controls.Period.value != pDate.Period) {
			this.pickerControl.controls.Period.setValue(pDate.Period);
			this.pickerControl.controls.Period.markAsDirty();
		}
		if (this.pickerControl.controls.Amount.value != pDate.Amount) {
			this.pickerControl.controls.Amount.setValue(pDate.Amount);
			this.pickerControl.controls.Amount.markAsDirty();
		}

	}

	segmentTimeframeView = 's1';
	segmentTimeframeChanged(e) {
		this.segmentTimeframeView = e.detail.value;
	}

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
			let measureBy = this.form.get('MeasureBy') as FormArray;
			measureBy.push(groupMeasure);
			this.presentPopover(e, groupMeasure, 'MeasureBy');
		}
		else if (type == 'CompareBy') {
			let compareBy = this.form.get('CompareBy') as FormArray;
			compareBy.push(group);
			this.presentPopover(e, group, 'CompareBy');
		}
	}

	removeForm(e,fg, parentForm): void {
		e.preventDefault()
		if (parentForm instanceof FormArray) {
			let index = parentForm.controls?.indexOf(fg);
			if (index !== -1) {
				parentForm.removeAt(index);
			}
		}
		else{
			let index = parentForm.indexOf(fg);
			if (index !== -1) {
				parentForm.removeAt(index);
			}
		}
	}

	changeDateTime(e, key) {
		this.tempForm.get(key).setValue()
		console.log(e.detail.value);
		this.form.get('')
	}

	dismissDatePicker(apply: boolean = false) {
		if (!this.isOpenDatePicker)
			return;

		if (!apply) {
			this.form.patchValue(this._reportConfig.DataConfig);
		}
		else {
			this._reportConfig.DataConfig = this.form.getRawValue();
			this.onRunReport();
		}
		this.isOpenDatePicker = false;
	}

	dismissPopover(apply: boolean = false) {
		if (!this.isOpenPopover)
			return;

		if (!apply) {
			// this.form.patchValue(this._reportConfig.DataConfig);
			this.buildForm(this._reportConfig.DataConfig);

		}
		else {
			this._reportConfig.DataConfig = this.form.getRawValue();
			this.onRunReport();
		}
		this.isOpenPopover = false;
	}

	@Output() runReport = new EventEmitter();
	onRunReport() {
		console.log(this.form);
		this._reportConfig.DataConfig = this.form.getRawValue()
		this.runReport.emit(this._reportConfig);
	}

	@Output() save = new EventEmitter();
	onSave() {
		this.save.emit(this._reportConfig);
	}


}
