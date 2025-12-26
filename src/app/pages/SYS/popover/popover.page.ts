import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { concat, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { EnvService } from 'src/app/services/core/env.service';
import { lib } from 'src/app/services/static/global-functions';
import { HRM_StaffProvider } from 'src/app/services/static/services.service';

@Component({
	selector: 'app-popover',
	templateUrl: './popover.page.html',
	styleUrls: ['./popover.page.scss'],
	standalone: false,
})
export class PopoverPage {
	popConfig = null;
	_popConfig = {
		type: '',

		singleDateLabel: '',
		isShowSingleDate: false,

		dateRangeLabel: '',
		isShowDateRange: false,

		staffSelectLabel: '',
		isShowStaffSelect: false,

		saleOrderStatusSelectLabel: '',
		isShowSaleOrderStatusSelect: false,

		submitButtonLabel: '',
	};

	popData: any = {
		singleDate: null,
	};

	today = lib.dateFormat(new Date(), 'hh:MM dd/mm/yyyy');
	isShowFromToDate = false;
	saleOrderStatusList = [];
	branchList = [];
	formGroup: FormGroup;
	constructor(
		public staffProvider: HRM_StaffProvider,
		public formBuilder: FormBuilder,
		public env: EnvService,
		public navCtrl: NavController,
		public navParams: NavParams,
		public popoverCtrl: PopoverController,
		public translate: TranslateService,
	) {
		this.formGroup = this.formBuilder.group({
			IDBranch: [''],
		});
		this.translate.get('Date').subscribe((message: string) => {
			this._popConfig.singleDateLabel = message;
		});

		this.translate.get('Time').subscribe((message: string) => {
			this._popConfig.dateRangeLabel = message;
		});

		this.translate.get('Staff').subscribe((message: string) => {
			this._popConfig.staffSelectLabel = message;
		});

		this.translate.get('Status').subscribe((message: string) => {
			this._popConfig.saleOrderStatusSelectLabel = message;
		});

		this.translate.get('Search...').subscribe((message: string) => {
			this._popConfig.submitButtonLabel = message;
		});
	}

	ngOnInit() {
		this.popConfig = Object.assign(this._popConfig, this.popConfig);

		if (this.popConfig.isShowSaleOrderStatusSelect) {
			this.initSaleOrderStatus();
		}

		if (this.popConfig.isShowStaffSelect) {
			this.staffSearch();
		}

		if (this.popConfig.isShowBranchSelect) {
			let rawBrandList = lib.cloneObject(this.env.branchList);

			let translateResult;
			this.translate.get('all-unit').subscribe((message: string) => {
				translateResult = message;
			});

			rawBrandList.unshift({
				Id: 'Root',
				Name: translateResult,
				IDParent: null,
			});
			rawBrandList.find(x => x.Code === 'Root').IDParent = 'Root';
			lib.buildFlatTree(rawBrandList, [], true).then((resp: any) => {
				this.branchList = resp;
			});
		}
	}

	initSaleOrderStatus() {
		this.env.getStatus('SalesOrder').then((data) => {
			this.saleOrderStatusList = data;
			this.translate.get('Not yet delivered').subscribe((message: string) => {
				this.saleOrderStatusList.unshift({
					Code: "['New','Unapproved','Submitted','Approved','Redelivery']",
					Name: message,
					Color: 'primary',
				});
			});

			this.translate.get('Orders waiting for Driver allocation').subscribe((message: string) => {
				this.saleOrderStatusList.unshift({
					Code: "['Approved','Debt']",
					Name: message,
					Color: 'success',
				});
			});

			this.translate.get('Order to be approved').subscribe((message: string) => {
				this.saleOrderStatusList.unshift({
					Code: "['Submitted','Redelivery']",
					Name: message,
					Color: 'warning',
				});
			});

			this.translate.get('All').subscribe((message: string) => {
				this.saleOrderStatusList.unshift({
					Code: '',
					Name: message,
					Color: 'primary',
				});
			});
		});
	}

	changeDateFillter(type) {
		this.popData.selectedBTNDate = type;

		let toDay = new Date();

		let yesterday = new Date(toDay);
		yesterday.setDate(yesterday.getDate() - 1);

		if (type == 'today') {
			this.popData.fromDate = lib.dateFormat(toDay, 'yyyy-mm-dd');
			this.popData.toDate = lib.dateFormat(toDay, 'yyyy-mm-dd');
		} else if (type == 'yesterday') {
			this.popData.fromDate = lib.dateFormat(yesterday, 'yyyy-mm-dd');
			this.popData.toDate = lib.dateFormat(yesterday, 'yyyy-mm-dd');
		} else if (type == 'thisWeek') {
			let weekDates = lib.getWeekDates(toDay);
			this.popData.fromDate = lib.dateFormat(weekDates[0], 'yyyy-mm-dd');
			this.popData.toDate = lib.dateFormat(weekDates[6], 'yyyy-mm-dd');
		} else if (type == 'setdone') {
			this.popConfig.type = 'set';
		}
	}

	command(returnData) {
		if (this.popConfig.isShowSaleOrderStatusSelect) {
			let selectedStatus = this.saleOrderStatusList.find((e) => e.Code == this.popData.saleOrderStatus);
			this.popData.selectedStatus = selectedStatus;
		}

		this.popoverCtrl.dismiss(returnData);
	}

	changeBranch(event) {
		this.popData.branch = event;
	}

	staffList$;
	staffListLoading = false;
	staffListInput$ = new Subject<string>();
	staffListSelected = [];
	staffSelected = null;
	staffSearch() {
		this.staffListLoading = false;
		this.staffList$ = concat(
			of(this.staffListSelected),
			this.staffListInput$.pipe(
				distinctUntilChanged(),
				tap(() => (this.staffListLoading = true)),
				switchMap((term) =>
					this.staffProvider
						.search({
							Take: 20,
							Skip: 0,
							IDDepartment: this.env.selectedBranchAndChildren,
							Term: term,
						})
						.pipe(
							catchError(() => of([])), // empty list on error
							tap(() => (this.staffListLoading = false))
						)
				)
			)
		);
	}
}
