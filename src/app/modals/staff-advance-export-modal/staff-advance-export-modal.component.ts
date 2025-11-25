import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/core/common.service';
import { EnvService } from 'src/app/services/core/env.service';
import { HRM_UDFProvider } from 'src/app/services/static/services.service';
import { environment } from 'src/environments/environment';
@Component({
	selector: 'app-staff-advance-export-modal',
	templateUrl: './staff-advance-export-modal.component.html',
	styleUrls: ['./staff-advance-export-modal.component.scss'],
	standalone: false,
})
export class StaffAdvanceExportModalComponent implements OnInit {
	showSpinner = true;
	Id;
	fieldsOriginal: any = []; // original fields  (shown/hidden)
	groupView: any = [
		{
			Name: 'Shown',
			Fields: [],
		},
		{
			Name: 'Hidden',
			Fields: [],
		},
	];
	constructor(
		public modalController: ModalController,
		public env: EnvService,
		public commonService: CommonService,
		public HRM_UDFProvider: HRM_UDFProvider
	) {}
	ngOnInit(): void {
		Promise.all([
			this.commonService.connect('GET', 'BI/Schema/GetSchemaByCode', { Code: 'HRM_Staff', Type: 'DBTable' }).toPromise(),
			this.HRM_UDFProvider.read({ Group: 'EmployeeInformation', SubGroup_ne: 'tbl_HRM_Staff' }),
		]).then((values: any) => {
			values[0].Fields.push(...values[1].data.map((f) => ({ Code: isNaN(f.UDF) ? f.UDF : 'UDF' + f.UDF, Name: f.Name })));
			const valuesHidden = values[0]?.['Fields'].filter((f) => f.Code !== 'Id');
			this.fieldsOriginal = [
				{ Name: 'Shown', Fields: [] },
				{ Name: 'Hidden', Fields: [...valuesHidden] },
			];
			this.groupView = [
				{ Name: 'Shown', Fields: [] },
				{ Name: 'Hidden', Fields: [...valuesHidden] },
			];
			this.groupView[1].Fields = this.groupView[1].Fields.filter((f) => f.Code !== 'Id');
			
			this.groupView[0].Fields.push({ Code: 'Id', Name: 'Id'});
		});

		// this.commonService
		// 	.connect('GET', 'BI/Schema/GetSchemaByCode', { Code: 'HRM_Staff', Type: 'DBTable' })
		// 	.toPromise()
		// 	.then((schema: any) => {
		// 		const valuesHidden = schema?.['Fields'];
		// 		this.fieldsOriginal = [
		// 			{ Name: 'Shown', Fields: [] },
		// 			{ Name: 'Hidden', Fields: [...valuesHidden] },
		// 		];
		// 		this.groupView = [
		// 			{ Name: 'Shown', Fields: [] },
		// 			{ Name: 'Hidden', Fields: [...valuesHidden] },
		// 		];
		// 	});
	}

	async closeModal(isApply: boolean = false) {
		if (isApply) {
			this.modalController.dismiss();
		}
	}

	doReorder(ev: any, fields: any[], nameGroup: string) {
		if (nameGroup !== 'Shown') return;
		const reorderedFields = ev.detail.complete(fields);
		// Update Sort property for each field
		reorderedFields.forEach((item, index) => {
			item.Sort = index + 1;
		});
		// Update groupView
		const groupUpdate = this.groupView.find((g) => g.Name === 'Shown');
		if (groupUpdate) {
			groupUpdate.Fields = reorderedFields;
		}
	}

	addFieldToShown(field) {
		// Delete Hidden
		this.groupView[1].Fields = this.groupView[1].Fields.filter((f) => f.Code !== field.Code);
		// Add vào Shown
		this.groupView[0].Fields.push(field);
	}

	removeAllFieldsFromShown() {
		const fieldsToRemove = [...this.groupView[0].Fields.filter(f => f.Code !== 'Id')];
		const hiddenSchema = this.fieldsOriginal.find((g) => g.Name === 'Hidden').Fields;
		// Remove all from Shown
		this.groupView[0].Fields = this.groupView[0].Fields.filter(f => f.Code === 'Id');
		this.groupView[1].Fields = hiddenSchema;
		// for each field to remove
		// fieldsToRemove.forEach((field) => {
		// 	if(field.Code === 'Id') return;
		// 	// logic
		// 	// find index in original Hidden
		// 	const targetIndex = hiddenSchema.findIndex((f) => f.Code === field.Code);
		// 	// not found in Hidden
		// 	if (targetIndex === -1) {
		// 		this.groupView[1].Fields.push(field);
		// 		return;
		// 	}
		// 	// Find where to insert in current Hidden
		// 	let insertAt = this.groupView[1].Fields.length;
		// 	for (let i = 0; i < this.groupView[1].Fields.length; i++) {
		// 		// find index in current Hidden
		// 		// example: gốc là A B C D, hiện tại là A D
		// 		// bỏ C lại đúng vị trí giữa A D
		// 		// C index = 2 = targetIndex
		// 		// D index = 3 = idx (for theo groupViewHidden A và D)
		// 		// if lần đầu idx A = 0 ko thỏa lần tiếp idx D = 3 thỏa thì chèn 2 trước 3 là C trước D (A C D)
		// 		const idx = hiddenSchema.findIndex((f) => f.Code === this.groupView[1].Fields[i].Code);
		// 		if (idx > targetIndex) {
		// 			insertAt = i;
		// 			break;
		// 		}
		// 	}
		// 	this.groupView[1].Fields.splice(insertAt, 0, field);
		// });
	}

	removeFieldFromShown(field) {
		// Remove field in groupView (Shown)
		this.groupView[0].Fields = this.groupView[0].Fields.filter((f) => f.Code !== field.Code);
		const hiddenSchema = this.fieldsOriginal.find((g) => g.Name === 'Hidden').Fields;

		const targetIndex = hiddenSchema.findIndex((f) => f.Code === field.Code);
		if (targetIndex === -1) {
			this.groupView[1].Fields.push(field);
			return;
		}
		// Find where to insert in current Hidden (keep schema order)
		let insertAt = this.groupView[1].Fields.length;
		for (let i = 0; i < this.groupView[1].Fields.length; i++) {
			const idx = hiddenSchema.findIndex((f) => f.Code === this.groupView[1].Fields[i].Code);
			if (idx > targetIndex) {
				insertAt = i;
				break;
			}
		}
		this.groupView[1].Fields.splice(insertAt, 0, field);
	}

	downloadURLContent(url) {
		if (url.indexOf('http') == -1) {
			url = environment.appDomain + url;
		}
		var pom = document.createElement('a');
		pom.setAttribute('target', '_blank');
		pom.setAttribute('href', url);
		//pom.setAttribute('target', '_blank');
		pom.style.display = 'none';
		document.body.appendChild(pom);
		pom.click();
		document.body.removeChild(pom);
	}

	exportAdvance() {
		let query = {
			Fields: this.groupView[0].Fields.map((f) => f.Code).join(','),
			Lang: this.env.language.current,
			Id: this.Id,
		};
		let apiPath = {
			getExport: {
				method: 'DOWNLOAD',
				url: function () {
					return 'HRM/Staff/ExportAdvance';
				},
			},
		};
		this.env
			.showLoading('Please wait for a few moments', this.commonService.export(apiPath, query))
			.then((response: any) => {
				this.downloadURLContent(response);
				this.modalController.dismiss();
			})
			.catch((err) => {});
		console.log('exportAdvance: ', this.groupView[0].Fields);
		console.log('dataFieldsExport: ', this.groupView[0].Fields.map((f) => f.Code).join(','));
	}
}
