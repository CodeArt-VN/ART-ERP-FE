import { CdkDragMove, DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, CdkDragEnter, moveItemInArray, transferArrayItem, CdkDropList, CdkDragHandle} from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output,QueryList,ViewChild, ViewChildren} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray,} from '@angular/forms';
import { BehaviorSubject, Subject, asapScheduler, catchError, combineLatest, concat, distinctUntilChanged, of, switchMap, tap,} from 'rxjs';
import { FilterConfig, Schema } from 'src/app/models/options-interface';
import { EnvService } from 'src/app/services/core/env.service';
import { CRM_ContactProvider} from 'src/app/services/static/services.service';
import { CommonService } from 'src/app/services/core/common.service';


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
		{ code: '0', name: 'false', icon: '' },
	];

	logicalOperators = [
		{ code: 'AND', name: 'AND', icon: '' },
		{ code: 'OR', name: 'OR', icon: '' },
	];
	//item sample
	@Input() item;

	@Input() schema: Schema;

	constructor(
		public formBuilder: FormBuilder,
		public cdr: ChangeDetectorRef,
	) {}
	
	ngOnInit() {
		if (!this.item) {	
			this.item = {
				Dimension: 'logical',
				Operator: 'AND',
				Logicals: [{ Dimension: null, Operator: null, Value: null }],
			};
		
			this.form = this.buildForm(this.item);
		} else {
			debugger
			this.form = this.formBuilder.group({
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

			this.item.Logicals.forEach((x) => this.addForm(this.form, x))
			
			this.updateConnectionList(this.form.controls.UniqueId.value);
		}
	}

	ngAfterViewChecked() {
		this.cdr.detectChanges();
	}
	
	buildForm(c: FilterConfig) {
		let notGroupList = [
			'MeasureBy',
			'CompareBy',
			'Interval',
			'Transform',
			'Schema',
			'ReprotInfo',
		];
		let keys = Object.keys(c);
		let group: any = {};
		keys.forEach((key) => {
			if (
				typeof c[key] === 'object' &&
				notGroupList.findIndex((d) => d == key) == -1
			) {
				if (Array.isArray(c[key])) {
					for (let idx = 0; idx < c[key].length; idx++) {
						const cObject = c[key][idx];
						let cGroup = this.buildForm(cObject);
						group[key] = new FormArray([]);
						group[key].push(cGroup);
					}
				} else {
					group[key] = this.buildForm(c[key]);
				}
			} else {
				group[key] = new FormControl(c[key]);
			}
		});

		return new FormGroup(group);
	}

	@Output() message = new EventEmitter();
	getMessage(e) {
		this.message.emit(e);
	}

	@Output() submit = new EventEmitter();
	onFormSubmit(e) {
		if (!this.form.valid) {
		
			this.getMessage({message:'erp.app.app-component.page-bage.check-red-above',logLevel:'warning'});
			return;
		}
		this.getMessage({message:'erp.app.app-component.page-bage.save-complete',logLevel:'success'});
		this.submit.emit(this.form.value);
	}

	//Sau Khi Init => addForm => check Disable Dimension
	//Sau khi addForm => check Disable Dimension
	//Sau khi change Dimension =>check Disable Dimension
	//Sau khi removeForm =>check Disable Dimension
	addForm(fg: FormGroup, data: any = null) {
		if (data == null) {
			data = {};
		}
		let groups = <FormArray>fg.controls.Logicals;
		let selected = null;
		if(data.Dimension=='ApprovedBy'){
			selected= [data?.Value];
		}

		let group = this.formBuilder.group({
	//		_staffDataSource :[{value:this.initSearchStaff(selected),disabled: true}],
			UniqueId: [{ value: this.generateUniqueId(), disabled: true }],
			Dimension: [data.Dimension, [Validators.required]],
			Operator: [data.Operator, [Validators.required]],
			Value: [data.Value, [Validators.required]],
			Logicals: this.formBuilder.array([]),
		});
		if(group.get('Dimension')?.value=='logical'){
			group.get('Value').setValidators([]);
			group.get('Value').updateValueAndValidity();
		}

		data.Logicals?.forEach((x) => this.addForm(group, x));

		this.updateConnectionList(group.controls.UniqueId.value);
		if(data.Dimension==null){
			groups.insert(0,group);
		}
		else{
			groups.push(group);
		}
		this.checkDisableDimenson(fg);
	}

	changeDimension(fg: any) {
		var dimension = fg.get('Dimension').value;
		if (dimension != 'logical') {
			fg.get('Logicals').clear();
			fg.get('Value').setValidators([Validators.required]);
		} else {
			fg.get('Operator').setValue('AND');
			fg.get('Value').setValidators([]);
		}
		fg.get('Value').updateValueAndValidity();
		this.checkDisableDimenson(fg);
	}

	//nếu Dimension=='logical' và  Logicals có child thì Disable Form Control Dimension
	checkDisableDimenson(fg: any) {
		var dimension = fg.get('Dimension').value;
		if (dimension == 'logical') {
			if (fg.get('Logicals').controls.length > 0) {
				fg.get('Dimension').disable();
			} else {
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
		this.checkDisableDimenson(parentForm);
	}

	drop(event: CdkDragDrop<FormArray>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(
				event.container.data.controls,
				event.previousIndex,
				event.currentIndex
			);
		} else {
			transferArrayItem(
				event.previousContainer.data.controls,
				event.container.data.controls,
				event.previousIndex,
				event.currentIndex
			);
		}
	}

	generateUniqueId(): string {
		return Math.random().toString(36).slice(2, 5);
	}

	updateConnectionList(uniqueId) {
		this.connectionList.push(uniqueId);
	}

	getSchemaDetailType(form){
		return this.schema.Fields.find(x=>x.Code == form.get('Dimension')?.value).Type;
	}

}
