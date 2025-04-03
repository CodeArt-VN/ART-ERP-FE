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
	@Input() properties: any;
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
			data.OldValue = this.oldItem ? this.oldItem : null;
			this.dataSource.push(data);
		}
		else{
			Object.keys(this.item).forEach((k) => {
				let data: any = {};
				data.Id = lib.generateUID();
				data.Property = this.getProperty(k)
				let value = this.item[k];
				let oldValue = this.oldItem ? this.oldItem[k] : null;
				try{
					if(typeof value === "string")value = this.saveParseJson(value);
					if(typeof oldValue === "string")oldValue = this.saveParseJson(oldValue);
				}
				catch(e){
				}
				if (Array.isArray(value)) {
					this.dataSource.push(data);
					let index = 0;
					value.forEach((i) => {
						if (oldValue && oldValue[i]) this.buildData(i, index,k, oldValue[index]);
						else this.buildData(i, index,data.Id, null);
						index++;
					});
				}
				else if(value instanceof Object) {
					this.dataSource.push(data);
					Object.keys(value).forEach((k) => {
						if (oldValue && oldValue[k] ){
							
							this.buildData(value[k], k, data.Id,  oldValue[k]);
						}
						else this.buildData(value[k], k, data.Id, null);
					});
					
				}
				else{
					data.Value = value;
					data.OldValue = oldValue;
					this.dataSource.push(data);

				}
			});
		}
		// this.dataSource= this.dataSource.sort((a, b) => {
		// 	let valA = a.Property ? String(a.Property) : "";
		// 	let valB = b.Property ? String(b.Property) : "";
		// 	return valA.localeCompare(valB);
		// });
		lib.buildFlatTree(this.dataSource,this.dataSourceState,true).then((res:any) => {
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

	buildData(data,property, IDParent,  oldValue) {
		let source:any = {};
			source.Id = lib.generateUID();
			source.IDParent = IDParent;
			source.Property = this.getProperty(property);
			source.Value = source.OldValue = null;
		this.dataSource.push(source);

		let value = data;
		
		try{
			if(typeof value === "string")	value = this.saveParseJson(value);
			if(typeof oldValue === "string")	oldValue = this.saveParseJson(oldValue);
		}
		catch(e){
		}
		if(Array.isArray(value) ){
			let index = 0;
			value.forEach((i) => {
				if (oldValue && oldValue[index]) this.buildData(i, index,source.Id, oldValue[index]);
				else this.buildData(i, index,source.Id,  null);
				index++;
			});
		}
		else if(value instanceof Object){
			Object.keys(value).forEach((v) => {
				if (oldValue && oldValue[v]) this.buildData(value[v], v,source.Id, oldValue[v]);
				else this.buildData(value[v], v, source.Id, null);
			});
		}
		else{
			source.Value = value;
			source.OldValue = oldValue;

		}
	
		
	}

	recurDifference() {
		this.dataSourceState = [...this.dataSourceState.filter((d) => d.Value != d.OldValue || (d.Value == d.OldValue && this.dataSourceState.some((f) => f.IDParent == d.Id)))];
		if (this.dataSourceState.some((d) => d.Value == d.OldValue && !this.dataSourceState.some((f) => f.IDParent == d.Id))) {
			this.recurDifference();
		}
	}

	getProperty(key){
		if(this.properties){
			if(this.properties[key])return this.properties[key];
		}
		return key;
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
