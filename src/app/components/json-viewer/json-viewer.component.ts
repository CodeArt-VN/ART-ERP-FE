import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageBase } from 'src/app/page-base';
import { lib } from 'src/app/services/static/global-functions';

@Component({
	selector: 'app-json-viewer',
	templateUrl: './json-viewer.component.html',
	styleUrls: ['./json-viewer.component.scss'],
	standalone: false,
})
export class JsonViewerComponent implements OnInit {
	dataSource: any = [];
	dataSourceState: any = [];
	firstLoaded = false;
	@Input() item: any;
	@Input() oldItem: any;
	@Input() isCompare = true;
	_notShowProperties = [];
	_isShowDifference = true;

	@Input() set isShowDifference(val: any) {
		this._isShowDifference = val;
		if (this.firstLoaded) this.buildDataSource();
	}

	@Input() set notShowProperties(val: any) {
		if (val) this._notShowProperties = val;
		else this._notShowProperties = [];
		if (this.firstLoaded) this.buildDataSource();
	}

	isAllRowOpened = true;
	constructor() {}

	ngOnInit() {
		this.buildDataSource();
		this.firstLoaded = true;
		// console.log(this.dataSource)
	}

	buildDataSource() {
		this.dataSource = [];
		if (typeof this.item === 'string') {
			this.item = this.saveParseJson(this.item);
		}
		if (typeof this.item !== 'object' && !Array.isArray(this.item)) {
			let data: any = {};
			data.Id = lib.generateUID();
			data.Property = 'Data';
			data.Value = this.item;
			this.dataSource.push(data);
		}
		else{
			Object.keys(this.item).forEach((k) => {
				let data: any = {};
				data.Id = lib.generateUID();
				data.Property = k;
				let value = this.item[k];
				try{
					if(typeof value === "string")value = this.saveParseJson(value);
				}
				catch(e){
				}
				if (Array.isArray(value)) {
					this.dataSource.push(data);
					let index = 0;
					value.forEach((i) => {
						if (this.oldItem && this.oldItem[k] && this.oldItem[k][index]) this.buildData(i, data.Id,k, this.oldItem[k][index]);
						else this.buildData(i, index,data.Id, null);
						index++;
					});
				}
				else if(value instanceof Object) {
					this.dataSource.push(data);
					let index = 0;
					Object.keys(value).forEach((k) => {
						if (this.oldItem && this.oldItem[k]){
							let oldValue = JSON.parse(this.oldItem[k]);
							this.buildData(value[k], k, data.Id,  oldValue);
						}
						else this.buildData(value[k], k, data.Id, null);
					});
					
				}
				else{
					data.Value = this.item[k];
					data.OldValue = this.oldItem ? this.oldItem[k] : null;
					this.dataSource.push(data);

				}
			});
		}
		lib.buildFlatTree(this.dataSource,this.dataSourceState,true).then((res) => {
			this.dataSourceState =res
			
		if (this._notShowProperties.length > 0) {
			this.dataSourceState = [...this.dataSourceState.filter((d) => !this._notShowProperties.includes(d.Property))];
		}
		if (this._isShowDifference) {
			this.recurDifference();
		}
		})
		// this.dataSourceState = [...this.dataSource];

		console.log(this.dataSourceState);
	}

	recurDifference() {
		this.dataSourceState = [...this.dataSourceState.filter((d) => d.Value != d.OldValue || (d.Value == d.OldValue && this.dataSourceState.some((f) => f.IDParent == d.Id)))];
		if (this.dataSourceState.some((d) => d.Value == d.OldValue && !this.dataSourceState.some((f) => f.IDParent == d.Id))) {
			this.recurDifference();
		}
	}

	buildData(data,property, IDParent,  oldValue) {
		let source:any = {};
			source.Id = lib.generateUID();
			source.IDParent = IDParent;
			source.Property = property;
			source.Value = source.OldValue = null;
		this.dataSource.push(source);

		let value = data;
		
		try{
			if(typeof value === "string")	value = this.saveParseJson(value);
		}
		catch(e){
		}
		if(Array.isArray(value) ){
			let index = 0;
			value.forEach((i) => {
				this.buildData(i, index,source.Id,  oldValue);
				index++;
			});
		}
		else if(value instanceof Object){
			let index = 0;
			Object.keys(value).forEach((v) => {
				this.buildData(value[v], v, source.Id, null);
			});
		}
		else{
			source.Value = value;
			source.OldValue = oldValue;

		}
	
		// parentObj.Value = null;
		// parentObj.OldValue = null;
		// this.dataSource.push(parentObj);

		// Object.keys(data).forEach((k) => {
		// 	let data: any = {};
		// 	let childIndex = 0;
		// 	let value1 = null;
		// 	if (oldValue && oldValue[k]) value1 = oldValue[k];
		// 	data.Id = lib.generateUID();
		// 	data.Property = k;
		// 	data.Value = value[k];
		// 	data.OldValue = value1;
		// 	data.IDParent = IDSubParent;
		// 	this.dataSource.push(data);
		// 	if (value[k] instanceof Array) {
		// 		value1 = null;
		// 		if (oldValue && oldValue[childIndex]) value1 = oldValue[childIndex][k];
		// 		this.buildDataArray(k, data.Id, childIndex, value1);
		// 	}
		// 	else if (value[k] instanceof Object) {
		// 		value1 = null;
		// 		if (oldValue && oldValue[childIndex]) value1 = oldValue[childIndex][k];
		// 		this.buildDataArray(k, data.Id, childIndex, value1);
		// 	}
		// 	childIndex++;
		// });
	}
	saveParseJson(str){
		let value = str.toString()?.replace(/([{,]\s*)([A-Za-z0-9_]+)\s*:/g, '$1"$2":');

		// 2. Replace single-quoted string values with double quotes
		value = value?.replace(/:\s*'([^']*)'/g, ': "$1"');
		
		console.log(str); // Now it is valid JSON
		try{
			if(value){
				value = JSON.parse(value);
				return value;
			}
			return str;
		}
		catch(e){
			return str;
		}

	}
	//#region toggleRow

	toggleRowAll() {
		this.isAllRowOpened = !this.isAllRowOpened;
		this.dataSourceState.forEach((i) => {
			i.showdetail = !this.isAllRowOpened;
			this.toggleRow(this.dataSourceState, i, true);
		});
	}
	toggleRow(ls, ite, toogle = false) {
		if (ite && ite.showdetail && toogle) {
			//hide
			ite.showdetail = false;
			this.showHideAllNestedFolder(ls, ite.Id, false, ite.showdetail);
		} else if (ite && !ite.showdetail && toogle) {
			//show loaded
			ite.showdetail = true;
			this.showHideAllNestedFolder(ls, ite.Id, true, ite.showdetail);
		}
	}

	showHideAllNestedFolder(ls, Id, isShow, showDetail) {
		if (Id == null) return;
		ls.filter((d) => d.IDParent == Id).forEach((i) => {
			if (!isShow || showDetail) {
				i.show = isShow;
			}
			this.showHideAllNestedFolder(ls, i.Id, isShow, i.showdetail);
		});
	}
	// #endregion
}

// sample data
// this.item = {
//   "Id": 30249, "IDBranch": null, "Name": "213", "CompanyName": "214124124", "Addresses": [{ "Id": 2, "AddressLine1": "Test22" },
//   { "Id": 1, "AddressLine1": "Test23" }]
// }
// this.oldItem = {
//   "Id": 3000, "IDBranch": null, "Name": "213", "CompanyName": "214124124", "Addresses": [{ "Id": 2, "AddressLine1": "Test22" },
//   { "Id": 1, "AddressLine1": "Test23" }]
// }
