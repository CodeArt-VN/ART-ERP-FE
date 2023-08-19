import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SchemaDetail } from '../../models/options-interface';

@Component({
	selector: 'app-tabs-card',
	templateUrl: './tabs-card.component.html',
	styleUrls: ['./tabs-card.component.scss'],
})
export class TabsCardComponent implements OnInit {
	@Input() tabs: SchemaDetail[];
	@Input() type: string;
	@Output() onChange = new EventEmitter<string>();

	constructor() {}

	ngOnInit() {}
	ngAfterViewInit() {}
}
