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
		if (typeof this.item != 'object') {
			this.item = JSON.parse(this.item);
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
				data.Value = this.item[k];
				data.OldValue = this.oldItem ? this.oldItem[k] : null;
				this.dataSource.push(data);
				if (this.item[k] instanceof Array) {
					let index = 0;
					data.Value = data.OldValue = null;
					this.item[k].forEach((i) => {
						if (this.oldItem && this.oldItem[k] && this.oldItem[k][index]) this.buildDataArray(i, data.Id, index, this.oldItem[k][index]);
						else this.buildDataArray(i, data.Id, index, null);
						index++;
					});
				}
			});
		}
	
		this.dataSourceState = [...this.dataSource];

		if (this._notShowProperties.length > 0) {
			this.dataSourceState = [...this.dataSourceState.filter((d) => !this._notShowProperties.includes(d.Property))];
		}
		if (this._isShowDifference) {
			this.recurDifference();
		}
		console.log(this.dataSourceState);
	}

	recurDifference() {
		this.dataSourceState = [...this.dataSourceState.filter((d) => d.Value != d.OldValue || (d.Value == d.OldValue && this.dataSourceState.some((f) => f.IDParent == d.Id)))];
		if (this.dataSourceState.some((d) => d.Value == d.OldValue && !this.dataSourceState.some((f) => f.IDParent == d.Id))) {
			this.recurDifference();
		}
	}

	buildDataArray(value, IDParent, index, oldValue) {
		let IDSubParent = lib.generateUID();
		let parentObj: any = {};
		parentObj.Property = `(${index})`;
		parentObj.Id = IDSubParent;
		parentObj.IDParent = IDParent;
		parentObj.Value = null;
		parentObj.OldValue = null;
		this.dataSource.push(parentObj);

		Object.keys(value).forEach((k) => {
			let data: any = {};
			let childIndex = 0;
			let value1 = null;
			if (oldValue && oldValue[k]) value1 = oldValue[k];
			data.Id = lib.generateUID();
			data.Property = k;
			data.Value = value[k];
			data.OldValue = value1;
			data.IDParent = IDSubParent;
			this.dataSource.push(data);
			if (value[k] instanceof Array) {
				value1 = null;
				if (oldValue && oldValue[childIndex]) value1 = oldValue[childIndex][k];
				this.buildDataArray(k, data.Id, childIndex, value1);
			}
			childIndex++;
		});
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
