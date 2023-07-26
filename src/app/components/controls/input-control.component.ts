import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-input-control',
	templateUrl: './input-control.component.html',
})
export class InputControlComponent implements OnInit {
	@Output() onChange = new EventEmitter();
	@Output() onNav = new EventEmitter();

	@Input() field: any;
	@Input() form: FormGroup;

	get isValid() { return this.form.controls[this.field.id].valid; }

	constructor() { }

	ngOnInit() { }

	ngSelectChange(e){
		this.onChange.emit(e);
	}

	inputChange(e){
		
	}

	nav(to){
		this.onNav.emit(to);
	}

	// trackChange(data) {
	// 	setTimeout(() => {
	// 		this.onChange.emit(data);
	// 	}, 1);
	// }

}
