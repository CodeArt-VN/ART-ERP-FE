import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputControlField } from './controls.interface';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-form-control',
	templateUrl: './form-control.component.html',
})
export class FormControlComponent implements OnInit {
	@Output() inputChange = new EventEmitter();
	@Output() nav = new EventEmitter();

	@Input() set field(f: InputControlField) {
        if (f.form) this.form = f.form;
		if (f.type) this.type = f.type;
		if (f.id) this.id = f.id;
		if (f.label) this.label = f.label;
		if (f.placeholder) this.placeholder = f.placeholder;
		if (f.dataSource) this.dataSource = f.dataSource;
		if (f.bindValue) this.bindValue = f.bindValue;
		if (f.bindLabel) this.bindLabel = f.bindLabel;
		if (f.multiple) this.multiple = f.multiple;
		if (f.clearable) this.clearable = f.clearable;
		if (f.noCheckDirty) this.noCheckDirty = f.noCheckDirty;

    }
	
    @Input() form: FormGroup;

    @Input() type : 'text' | 'number' | 'email' | 'date' | 'start' | 'datetime-local' | 'radio' | 'select' | 'ng-select' | 'ng-select-status' | 'ng-select-bp' | 'ng-select-item' | 'textarea' | 'branch-breadcrumbs' | 'span-number' | 'span-date' | 'span-datetime' = 'text';

    @Input() id: string;

    @Input() label: string;

    @Input() placeholder?: string;

    @Input() dataSource?: any[] | any;

    @Input() bindValue?: string = 'Code';

    @Input() bindLabel?: string = 'Name';

	@Input() multiple: boolean = false;

    @Input() clearable: boolean = false;

    @Input() noCheckDirty: boolean = false;

	get isValid() { return this.field.form.controls[this.field.id].valid; }

	constructor() { }

	ngOnInit() { }

	onInputChange(e){
		this.inputChange.emit(e);
	}

	onNav(to){
		this.nav.emit(to);
	}


}
