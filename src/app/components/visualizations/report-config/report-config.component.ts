import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ReportConfig } from 'src/app/models/options-interface';
import { ReportService } from 'src/app/services/report.service';

@Component({
	selector: 'app-report-config',
	templateUrl: './report-config.component.html',
	styleUrls: ['./report-config.component.scss'],
})
export class ReportConfigComponent implements OnInit {
	form: FormGroup;
	_config: ReportConfig;

	_dataset : any;

	_schema: any;
	_schemaDetails: any[] = [];

	_timePeriodList : any[] = [];

	constructor(public rptS : ReportService ) { }

	ngOnInit() { }

	@Input() set config(val: ReportConfig) {
		if (val) {
			this._config = val;
			this.form = this.buildForm(this._config);
		}
		this._schema = this.rptS.getSchema(this._config.Schema.Id);
		this._schemaDetails = this.rptS.getSchemaDetail(this._config.Schema.Id);
		this._timePeriodList = JSON.parse( JSON.stringify( this.rptS.commonOptions.timeConfigPeriod));
		
		this._timePeriodList.forEach(p => {
			p.name = p.name.toLowerCase() + ' ago'; 
		});

		console.log(this.form);
	}

	onChange(event) {
		console.log(this.form.getRawValue());
	}

	buildForm( c: any){

		let notGroupList = ['MeasureBy','CompareBy','Interval','Transform','Schema','ReprotInfo'];

		let keys = Object.keys(c);
		let group: any = {};
		keys.forEach(key => {

			if (typeof c[key] === 'object' && notGroupList.findIndex( d=>d == key ) == -1 ) {
				if (Array.isArray(c[key])) {
					for (let idx = 0; idx < c[key].length; idx++) {
						const cObject = c[key][idx];
						let cGroup = this.buildForm(cObject);
						group[key] = new FormArray([]);
						group[key].push(cGroup);
					}
				}
				else{
					group[key] = this.buildForm(c[key]);
				}
			}
			else{
				group[key] = new FormControl(c[key]);
			}
		});

		return new FormGroup(group);
	}


	@ViewChild('popover') popover;
  	isOpenDatePicker = false;

	pickerControl: any;
	pickerGroupName: string;
	presentDatePicker(event, control, groupName){
		this.pickerGroupName = groupName;
		this.pickerControl = control;
		this.popover.event = event;
    	this.isOpenDatePicker = true;
	}

	pickDate(pDate){
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

	dismissDatePicker(apply: boolean = false){
		if (!this.isOpenDatePicker)
			return;
		
		if (!apply) {
			this.form.patchValue(this._config);
		}
		else{
			this._config = this.form.getRawValue();
			this.onRunReport();
		}
		this.isOpenDatePicker = false;
	}

	@Output() runReport = new EventEmitter();
	onRunReport(){
		this.runReport.emit(this._config);
	}

	@Output() save = new EventEmitter();
	onSave(){
		this.save.emit(this._config);
	}


}
