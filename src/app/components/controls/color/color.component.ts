import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class ColorComponent  implements OnInit {
	items = [
		{Code:"primary", Name: "Primary", BaseColor: "#005ce6"},
		{Code:"secondary", Name: "Secondary", BaseColor: "#e1150b"},
		{Code:"tertiary", Name: "Tertiary", BaseColor: "#ffffff"},

		{Code:"success", Name: "Success", BaseColor: "#2dd36f"},
		{Code:"warning", Name: "Warning", BaseColor: "#ffc409"},
		{Code:"danger", Name: "Danger", BaseColor: "#eb445a"},

		{Code:"red", Name: "Red", BaseColor: "#f44336"},
		{Code:"pink", Name: "Pink", BaseColor: "#e91e63"},
		{Code:"purple", Name: "Purple", BaseColor: "#9c27b0"},

    	{Code:"blue", Name: "Blue", BaseColor: "#03a9f4"},
		{Code:"bluegreen", Name: "Bluegreen", BaseColor: "#00bcd4"},

		{Code:"dark", Name: "Dark", BaseColor: "#26292c"},
		{Code:"medium", Name: "Medium", BaseColor: "#394951"},
		{Code:"light", Name: "Light", BaseColor: "#f4f5f8"},

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
