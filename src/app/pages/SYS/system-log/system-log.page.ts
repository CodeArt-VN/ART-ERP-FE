import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';
import { SYS_TypeProvider, vw_SYS_LogProvider } from 'src/app/services/static/services.service';
import { FormBuilder } from '@angular/forms';
import { lib } from 'src/app/services/static/global-functions';

@Component({
	selector: 'app-system-log',
	templateUrl: 'system-log.page.html',
	styleUrls: ['system-log.page.scss'],
	standalone: false,
})
export class SystemLogPage extends PageBase {
	itemsState: any = [];
	isAllRowOpened = true;
	typeList = [];
	typeGroupList = [];
	constructor(
		public pageProvider: vw_SYS_LogProvider,
		public modalController: ModalController,
		public alertCtrl: AlertController,
		public loadingController: LoadingController,
		public env: EnvService,
		public navCtrl: NavController,
		public formBuilder: FormBuilder
	) {
		super();
		this.pageConfig.isShowFeature = true;
		this.pageConfig.isFeatureAsMain = true;

		this.formGroup = this.formBuilder.group({
			Type: ['User'],
			From: this.formBuilder.group({
				Type: ['Absolute'],
				IsPastDate: [false],
				Period: ['Day'],
				Amount: [0],
				Value: [this.dateMinusDays(3)],
				IsNull: [true],
			}),
			To: this.formBuilder.group({
				Type: ['Absolute'],
				IsPastDate: [false],
				Period: ['Day'],
				Amount: [0],
				Value: [this.getCurrentDate()],
				IsNull: [true],
			}),
		});
	}
	preLoadData(event?: any): void {
		this.typeList = [
			{ Code: 'User', Name: 'User' },
			{ Code: 'Function', Name: 'Function' },
		];
		this.changeFilter();

		super.loadedData(event);
	}
	currentTab
	loadNode(i) {
		this.pageConfig.isSubActive = true;
		this.currentTab = '';
		delete this.query.Segment3;
		delete this.query.Segment4;
		delete this.query.Email;
		if (this.query.Type == 'User') {
			this.query.Email = i.Email;
			this.currentTab = i.Email
		} else {
			if(i.IDParent) {
				let parent = this.typeGroupList.find(d=> d.Id == i.IDParent);
				this.query.Segment3 = parent?.Name;
				this.query.Segment4 = i.Name;
			}
			if(!i.IDParent)this.query.Segment3 = i.Name;
			this.currentTab = i.Name;
		}
		this.query.SortBy = 'Date_desc';

		super.preLoadData(null);
	}
	changeFilter() {
		this.items = [];
		this.typeGroupList = [];
		let q = this.formGroup.getRawValue();
		if(!q.From.Value){
			this.env.showMessage('From date is not valid!', 'danger');
			return;
		}
		if(!q.To.Value){
			this.env.showMessage('To date is not valid!', 'danger');
			return;
		}
		if(q.From.Value > q.To.Value){
			this.env.showMessage('From date must be earlier than or equal to the To date!', 'danger');
			return;
		}
		this.query.Type = q.Type;
		this.query.FromDate = q.From.Value;
		this.query.ToDate = q.To.Value;
		let qType = {
			Type: q.Type,
			FromDate: q.From.Value,
			ToDate: q.To.Value,
		};
		this.env.showLoading('Please wait for a few moments', this.pageProvider.commonService.connect('GET', 'SYS/Log/GetType', qType).toPromise()).then((values: any) => {
			if (q.Type == 'Function') {
				const result = [];
				const moduleMap = new Map<string, { id: string, count: number }>(); // Store Segment3 -> {ID, Count}
				
				values.forEach(item => {
				  // Check if the module (Segment3) is already added
				  if (!moduleMap.has(item.Segment3)) {
					const moduleID = lib.generateUID();
					moduleMap.set(item.Segment3, { id: moduleID, count: 0 });
			  
					// Add Segment3 to the result
					result.push({
					  Id: moduleID,
					  IDParent: null,
					  Name: item.Segment3,
					  Count: 0 // Will update later
					});
				  }
			  
				  // Update the count for Segment3
				  moduleMap.get(item.Segment3)!.count += item.Count;
			  
				  // Generate ID for Segment4
				  const functionID = lib.generateUID();
				  result.push({
					Id: functionID,
					IDParent: moduleMap.get(item.Segment3)!.id, // Link to Segment3 ID
					Name: item.Segment4,
					Count: item.Count
				  });
				});
			  
				// Update the count of each Segment3 in the result
				result.forEach(item => {
				  if (item.IDParent === null) {
					item.Count = moduleMap.get(item.Name)!.count;
				  }
				});
			  
				this.buildFlatTree(result, [], false).then((resp: any) => {
					this.typeGroupList = resp
				});
			}
			else this.typeGroupList = values;
		});
	}
	dateMinusDays(days: number): string {
		const date = new Date();
		date.setDate(date.getDate() - days); // Subtract days
		return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
	  }

	getCurrentDate(): string {
		return new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
	}
}
