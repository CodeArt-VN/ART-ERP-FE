import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterConfig, Schema } from 'src/app/models/options-interface';
import { lib } from 'src/app/services/static/global-functions';

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
    { code: '=', name: '= is', icon: '' },
    { code: 'like', name: 'contains', icon: '' },
    // { code: 'starts with', name: 'starts with', icon: '' },
    // { code: 'ends with', name: 'ends with', icon: '' },
    { code: '<>', name: '≠ does not equal', icon: '' },
    { code: 'IN', name: 'in', icon: '' },
    { code: 'NOT IN', name: 'not in', icon: '' },

    // { code: 'Text', name: 'does not contain', icon: '' },
    // { code: 'Text', name: 'does not start with', icon: '' },
    // { code: 'Text', name: 'does not end with', icon: '' },
    // { code: 'Text', name: 'matches regexp', icon: '' },

    { code: 'NumberGroup', name: 'Number', icon: '', disabled: true },
    { code: '=', name: '= equals', icon: '' },
    { code: '>', name: '> greater than', icon: '' },
    { code: '<', name: '< less than', icon: '' },
    { code: '>=', name: '≥ greater than or equals', icon: '' },
    { code: '<=', name: '≤ less than or equals', icon: '' },
    { code: '<>', name: '≠ does not equal', icon: '' },

    { code: 'BooleanGroup', name: 'Boolean', icon: '', disabled: true },
    { code: '1', name: 'true', icon: '' },
    { code: '0', name: 'false', icon: '' },
  ];

  logicalOperators = [
    { code: 'AND', name: 'AND', icon: '' },
    { code: 'OR', name: 'OR', icon: '' },
  ];
  //item sample
  _item: FilterConfig;

  @Input() smallWidth = false;

  @Input() set item(i: FilterConfig) {
    if (!i) {
      i = {
        Dimension: 'logical',
        Operator: 'AND',
        Logicals: [],
      };
    } else {
      if (i.Dimension != 'logical') {
        i = {
          Dimension: 'logical',
          Operator: 'AND',
          Logicals: [i],
        };
      }
    }
    this._item = i;
    this.buildForm();
  }

  _schema: Schema;
  @Input() set schema(s: Schema) {
    if (!s) return;

    let temp = s;

    this._schema = lib.cloneObject(temp);
    if (this._schema.Fields.findIndex((d) => d.Code == 'logical') === -1) {
      this._schema.Fields.unshift({ Code: 'logical', Name: 'Logical' });
    }
  }

  constructor(
    public formBuilder: FormBuilder,
    public cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      Dimension: [{ value: this._item.Dimension, disabled: true }, Validators.required],
      Operator: [this._item.Operator, Validators.required],
      Value: [
        this._item.Dimension !== 'logical' ? this._item.Value : null,
        this._item.Dimension !== 'logical' ? [Validators.required] : [],
      ],
      Logicals: this.formBuilder.array([]),
      UniqueId: [{ value: lib.generateUID(), disabled: true }],
    });

    this._item.Logicals.forEach((x) => this.addForm(this.form, x));
    this.connectionList = [];
    this.updateConnectionList(this.form.controls.UniqueId.value);
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  @Output() message = new EventEmitter();
  getMessage(e) {
    this.message.emit(e);
  }

  @Output() change = new EventEmitter();
  onInputChange() {
    if (!this.form.valid) {
      this.getMessage({
        message: 'Please recheck information highlighted in red above',
        logLevel: 'warning',
      });
      return;
    }
    var i = this.form.getRawValue();
    if (i.Dimension != 'logical') {
      i = {
        Dimension: 'logical',
        Operator: 'AND',
        Logicals: [i],
      };
    }
    this.change.emit(i);
  }

  @Output() submit = new EventEmitter();
  onFormSubmit() {
    if (!this.form.valid) {
      this.getMessage({
        message: 'Please recheck information highlighted in red above',
        logLevel: 'warning',
      });
      return;
    }
    var i = this.form.getRawValue();
    if (i.Dimension != 'logical') {
      i = {
        Dimension: 'logical',
        Operator: 'AND',
        Logicals: [i],
      };
    }
    this.submit.emit(i);
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

    let group = this.formBuilder.group({
      //		_staffDataSource :[{value:this.initSearchStaff(selected),disabled: true}],
      UniqueId: [{ value: lib.generateUID(), disabled: true }],
      Dimension: [data.Dimension, [Validators.required]],
      Operator: [data.Operator, [Validators.required]],
      Value: [data.Value, [Validators.required]],
      Logicals: this.formBuilder.array([]),
    });
    if (group.get('Dimension')?.value == 'logical') {
      group.get('Value').setValidators([]);
      group.get('Value').updateValueAndValidity();
    }

    data.Logicals?.forEach((x) => this.addForm(group, x));

    this.updateConnectionList(group.controls.UniqueId.value);
    if (data.Dimension == null) {
      groups.insert(0, group);
    } else {
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
    this.onInputChange();
  }

  //nếu Dimension=='logical' và  Logicals có child thì Disable Form Control Dimension
  checkDisableDimenson(fg: any) {
    var dimension = fg.get('Dimension').value;
    if (dimension == 'logical') {
      if (fg.get('Logicals').controls.length > 0 || fg.get('UniqueId').value == this.connectionList[0]) {
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
        [...this.connectionList.filter((x) => x != this.connectionList.indexOf(fg.controls.UniqueId.value))];
      }
    }
    this.checkDisableDimenson(parentForm);
    this.onInputChange();
  }

  onDrop(event: CdkDragDrop<FormArray>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.controls, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data.controls,
        event.container.data.controls,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  updateConnectionList(uniqueId) {
    this.connectionList.push(uniqueId);
  }

  getSchemaDetailType(form) {
    let field = this._schema.Fields.find((x) => x.Code == form.get('Dimension')?.value);
    return field?.DataType;
  }
}
