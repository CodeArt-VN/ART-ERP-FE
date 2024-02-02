import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class ColorComponent  implements OnInit {
	items = [
		{Code:"primary", Name: "Primary"},
		{Code:"secondary", Name: "Secondary"},
		{Code:"tertiary", Name: "Tertiary"},

		{Code:"success", Name: "Success"},
		{Code:"warning", Name: "Warning"},
		{Code:"danger", Name: "Danger"},

		{Code:"red", Name: "Red"},
		{Code:"pink", Name: "Pink"},
		{Code:"purple", Name: "Purple"},

    	{Code:"blue", Name: "Blue"},
		{Code:"bluegreen", Name: "Bluegreen"},

		{Code:"dark", Name: "Dark"},
		{Code:"medium", Name: "Medium"},
		{Code:"light", Name: "Light"},

	];
	@Output() selected = new EventEmitter();
	keyword = '';
	constructor() {}

	ngOnInit() {}
	onSelected(event) {
		this.selected.emit(event);
	}

	segmentView = 's1';
    segmentChanged(ev: any) {
        this.segmentView = ev.detail.value;
    }
}
