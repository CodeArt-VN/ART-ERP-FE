import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
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
	config:any;
	_dataset: any;
	_schemaList: any;
	_schemaDetailsList: any[] = [];
	_timePeriodList: any[] = [];
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
		this.form = this.formBuilder.group({
			TimeFrame: this.formBuilder.group({
				Dimension: ['OrderDate'],
				From: this.formBuilder.group({
					Type: [''],
					IsPastDate: [true],
					Period: [''],
					Amount: [0],
				}),
				To: this.formBuilder.group({
					Type: [''],
					IsPastDate: [true],
					Period: [''],
					Amount: [0],
				}),
			}),
			CompareTo: this.formBuilder.group({
				Type: ['Relative'],
				IsPastDate: [true],
				Period: ['Week'],
				Amount: [1],
			}),
			Schema: this.formBuilder.group({
				Id: [0],
				Type: [''],
				Code: [''],
				Name: [''],
			}),
			Transform: this.formBuilder.group({
				Filter: ['']
			}),
			Interval: this.formBuilder.group({
				Property: ['OrderDate'],
				Type: ['HourOfDay'],
				Title: ['Order time'],
			}),
			CompareBy: this.formBuilder.array([
				this.formBuilder.group({
					Property: ['Status'],
					Title: ['Status'],
				}),
			]),
			MeasureBy: this.formBuilder.array([
				this.formBuilder.group({
					Property: ['Id'],
					Method: ['count'],
					Title: ['Count'],
				}),
				this.formBuilder.group({
					Property: ['NumberOfGuests'],
					Method: ['count'],
					Title: ['NumberOfGuests'],
				}),
			]),
		});
		this._IDSchemaDataSource.initSearch()
	}


	/** Report Id to find report config */
	_reportId: number;
	@Input() set reportId(v: number) {
		if (v) {
			this._reportId = v;
			this._reportConfig = this.rpt.getReportConfig(this._reportId);
			if (this._reportConfig) {
				//this.form = this.buildForm(this._reportConfig.DataConfig);
			}
		//	this._schemaDetailsList = this.rpt.getSchemaDetail(this._reportConfig.DataConfig.Schema.Id);
			this._timePeriodList = JSON.parse(JSON.stringify(this.rpt.commonOptions.timeConfigPeriod));

			this._timePeriodList.forEach(p => {
				p.name = p.name.toLowerCase() + ' ago';
			});

		}
	}

	changeSchema(e) {
		this.form.get('Schema').setValue({
			Id: e.Id,
			Type: e.Type,
			Code: e.Code,
			Name: e.Name
		});
		this.schemaService.getAnItem(e.Id).then((data:any) => {
			this.selectedSchema = data;
			this._schemaDetailsList = data.Fields;
			this.config = null;
		})
	}

	saveConfig(filter) {
		this.form.get('Transform').setValue({ Filter: filter });
		console.log(this.form.getRawValue())
	}

	onChange(event) {
		console.log(this.form.getRawValue());
	}


	buildForm(c: ReportDataConfig) {
		let notGroupList = ['MeasureBy', 'CompareBy', 'Interval', 'Transform', 'Schema', 'ReprotInfo'];

		let keys = Object.keys(c);
		let group: any = {};
		keys.forEach(key => {

			if (typeof c[key] === 'object' && notGroupList.findIndex(d => d == key) == -1) {
				if (Array.isArray(c[key])) {
					for (let idx = 0; idx < c[key].length; idx++) {
						const cObject = c[key][idx];
						let cGroup = this.buildForm(cObject);
						group[key] = new FormArray([]);
						group[key].push(cGroup);
					}
				}
				else {
					group[key] = this.buildForm(c[key]);
				}
			}
			else {
				group[key] = new FormControl(c[key]);
			}
		});
		return new FormGroup(group);
	}


	@ViewChild('popover') popover;
	isOpenDatePicker = false;

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
