import { CdkDragMove, DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop,CdkDragEnter, moveItemInArray, transferArrayItem ,CdkDropList,CdkDragHandle} from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { FilterConfig, Schema } from 'src/app/models/options-interface';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
	form: FormGroup;
	connectionList = [];
	transformOperators = [
		{ code: 'TextGroup', name: 'Text', icon: '', disabled: true },
		{ code: '=', name: 'is', icon: '' },
		{ code: 'like', name: 'contains', icon: '' },
		{ code: 'Text', name: 'starts with', icon: '' },
		{ code: 'Text', name: 'ends with', icon: '' },
		{ code: 'Text', name: 'is not', icon: '' },
		{ code: 'Text', name: 'does not contain', icon: '' },
		{ code: 'Text', name: 'does not start with', icon: '' },
		{ code: 'Text', name: 'does not end with', icon: '' },
		{ code: 'Text', name: 'matches regexp', icon: '' },

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

	logicalOperators = [
		{ code: 'AND', name: 'AND', icon: '' },
		{ code: 'OR', name: 'OR', icon: '' },
	];
	//item sample
	@Input() item: FilterConfig = 
		{
			Dimension: 'logical', Operator: 'AND',
			Logicals: [
				{ Dimension: 'Status', Operator: 'IN', Value: JSON.stringify(['New', 'Confirmed', 'Scheduled', 'Picking', 'Delivered', 'Done', 'Cancelled', 'InDelivery']) },
				{ Dimension: 'Total', Operator: '=', Value: 'POSOrder' },
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

	constructor(public formBuilder: FormBuilder,public cdr: ChangeDetectorRef) {

		

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
		else{
			this.form =this.formBuilder.group({
				Dimension: [this.item.Dimension, Validators.required],
				Operator: [this.item.Operator, Validators.required],
				Value: [
					this.item.Dimension !== 'logical' ? this.item.Value : null,
					this.item.Dimension !== 'logical'
						? [Validators.required]
						: [],
				],
				Logicals: this.formBuilder.array([]),
				UniqueId: [{ value: this.generateUniqueId(), disabled: true }],
			});
			this.item.Logicals.forEach(x=>this.addForm(this.form,x))
			this.updateConnectionList(this.form.controls.UniqueId.value);
		}
	}

	ngAfterViewChecked() {
		this.cdr.detectChanges();
	 }
	 enter(entered: CdkDragEnter<any>) {
		console.log('entered');
		console.log(entered);
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


	@Output() error = new EventEmitter();
	onError(e) {
		this.error.emit(e);
	}

	@Output() submit = new EventEmitter();
	onFormSubmit(e) {
		if (!this.form.valid) {
			this.onError('erp.app.app-component.page-bage.check-red-above');
			return;
		}
		this.submit.emit(this.form.getRawValue());
	}

	onChange(e){
		console.log(e);
	}

	//Sau Khi Init => addForm => check Disable Dimension
	//Sau khi addForm => check Disable Dimension
	//Sau khi change Dimension =>check Disable Dimension
	//Sau khi removeForm =>check Disable Dimension
	addForm(fg: FormGroup,data:any=null) {
		if(data==null){
			data = {};
		}
		let groups = <FormArray>fg.controls.Logicals;
		
		let group = this.formBuilder.group({
			UniqueId: [{ value: this.generateUniqueId(), disabled: true }],
            
			Dimension: [data.Dimension,[Validators.required]],
            Operator: [data.Operator,[Validators.required]],
            Value: [data.Value,[Validators.required]],
			Logicals: this.formBuilder.array([]),
        });
		data.Logicals?.forEach(x=>this.addForm(group,x));
		this.updateConnectionList(group.controls.UniqueId.value);
        groups.push(group);
		this.checkDiasableDimenson(fg);
	}

	changeDimension(fg: any) {
		var dimension = fg.get('Dimension').value;
		if (dimension != 'logical') {
			fg.get('Logicals').clear();
			fg.get('Value').setValidators([Validators.required]);
		} else {
			fg.get('Operator').setValue("AND");
			fg.get('Value').setValidators([]);
		}
		fg.get('Value').updateValueAndValidity();
		this.checkDiasableDimenson(fg);
	}

	//nếu Dimension=='logical' và  Logicals có child thì Disable Form Control Dimension
	checkDiasableDimenson(fg: any){
		var dimension = fg.get('Dimension').value;
		if(dimension =="logical"){
			if(fg.get('Logicals').controls.length>0){
				fg.get('Dimension').disable();
			}
			else{
				fg.get('Dimension').enable();
			}
		}
	}

	removeForm(fg: FormGroup, parentForm: FormGroup): void {
		if (parentForm && parentForm.controls?.Logicals instanceof FormArray) {
			const index = parentForm.controls.Logicals?.controls.indexOf(fg);
			if (index !== -1) {
				parentForm.controls.Logicals.removeAt(index);
				[
					...this.connectionList.filter(
						(x) =>
							x !=
							this.connectionList.indexOf(
								fg.controls.UniqueId.value
							)
					),
				];
			}
		}
		this.checkDiasableDimenson(parentForm)
	}
	
	drop(event: CdkDragDrop<FormArray>) {
		if (event.previousContainer === event.container) {
		  moveItemInArray(event.container.data.controls, event.previousIndex, event.currentIndex);
		} else {
		  transferArrayItem(event.previousContainer.data.controls,
							event.container.data.controls,
							event.previousIndex,
							event.currentIndex);
		}
	  }
	
	generateUniqueId(): string {
		return Math.random().toString(36).slice(2, 5);
	}

	updateConnectionList(uniqueId) {
		this.connectionList.push(uniqueId);
	}

}
