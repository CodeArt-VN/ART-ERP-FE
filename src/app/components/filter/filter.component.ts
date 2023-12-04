import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { FilterConfig, Schema } from 'src/app/models/options-interface';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
	form: FormGroup;

	transformOperator = [
		{ code: 'TextGroup', name: 'Text', icon: '', disabled: true },
		{ code: '=', name: 'is', icon: '' },
		// { code: 'like', name: 'contains', icon: '' },
		// { code: 'Text', name: 'starts with', icon: '' },
		// { code: 'Text', name: 'ends with', icon: '' },
		// { code: 'Text', name: 'is not', icon: '' },
		// { code: 'Text', name: 'does not contain', icon: '' },
		// { code: 'Text', name: 'does not start with', icon: '' },
		// { code: 'Text', name: 'does not end with', icon: '' },
		//{ code: 'Text', name: 'matches regexp', icon: '' },

		{ code: 'NumberGroup', name: 'Number', icon: '', disabled: true },
		{ code: '=', name: 'equals', icon: '' },
		{ code: '>', name: 'greater than', icon: '' },
		{ code: '<', name: 'less than', icon: '' },
		{ code: '>=', name: 'greater than or equals', icon: '' },
		{ code: '<=', name: 'less than or equals', icon: '' },
		{ code: '<>', name: 'does not equal', icon: '' },

		{ code: 'BooleanGroup', name: 'Boolean', icon: '', disabled: true },
		{ code: '1', name: 'true', icon: '' },
		{ code: '0', name: 'false', icon: '' }
	];

	logicalOperator = [
		{ code: 'AND', name: 'AND', icon: '' },
		{ code: 'OR', name: 'OR', icon: '' },
	];

	@Input() item: FilterConfig = // item sample
		{
			Dimension: 'logical', Operator: 'AND',
			Logicals: [
				{ Dimension: 'Status', Operator: 'IN', Value: JSON.stringify(['New', 'Confirmed', 'Scheduled', 'Picking', 'Delivered', 'Done', 'Cancelled', 'InDelivery']) },
				{ Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
			]
		};

	@Input() schema: Schema = // schema sample;
		{
			Id: 1, Code: 'SaleOrder', Name: 'Sale orders', Type: 'Dataset', ModifiedDate: '2023-01-01',
			Fields: [
				{ IDSchema: null, Id: null, Code: 'logical', Name: 'Logical', Type: 'Logical', Icon: 'star', Aggregate: '', Sort: 1, Remark: '' },
				//////////////////////////////
				{ IDSchema: 1, Id: 1, Code: 'OrderDate', Name: 'Ngày lên đơn', Type: 'Text', Icon: 'star', Aggregate: '', Sort: 1, Remark: '' },
				{ IDSchema: 1, Id: 1, Code: 'Status', Name: 'Status', Type: 'Text', Icon: 'star', Aggregate: '', Sort: 1, Remark: '' },
				{ IDSchema: 1, Id: 1, Code: 'Count', Name: 'Count of documents', Type: 'Number', Icon: 'star', Aggregate: '', Sort: 1, Remark: '' },
				{ IDSchema: 1, Id: 1, Code: 'Total', Name: 'Sum of total', Type: 'Number', Icon: 'star', Aggregate: '', Sort: 1, Remark: '' },
				{ IDSchema: 1, Id: 1, Code: 'Discount', Name: 'Sum of discount', Type: 'Number', Icon: 'star', Aggregate: '', Sort: 1, Remark: '' },
			]
		};

	constructor(public formBuilder: FormBuilder,) {

		this.form = formBuilder.group({
			Dimension: ['logical', Validators.required],
			Operator: ['', Validators.required],
			Value: new FormControl(),
			Logicals: this.formBuilder.array([]),
		});

	}

	ngOnInit() {
		if (!this.item) {
			this.item = {
				Dimension: 'logical', Operator: 'AND', Logicals: [
					{ Dimension: null, Operator: null, Value: null },
				]
			};

			this.form = this.buildForm(this.item);
		}
	}

	buildForm(c: FilterConfig) {
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


	@Output() submit = new EventEmitter();
	onFormSubmit(e) {
		this.submit.emit(this.form.getRawValue());
	}

	onChange(e){
		console.log(e);
	}

}
