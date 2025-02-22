import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-group-control',
	templateUrl: './group-control.component.html',
})
export class GroupControlComponent implements OnInit {
	@Input() title;
	@Input() hideBorder;
	@Input() fields: any[] = [];

	@Output() onChange = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	trackChange(data) {
		this.onChange.emit(data);
	}
}
