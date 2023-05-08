import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { lib } from 'src/app/services/static/global-functions';
import { HRM_StaffProvider } from 'src/app/services/static/services.service';
import { concat, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-popover',
    templateUrl: './popover.page.html',
    styleUrls: ['./popover.page.scss'],
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

        submitButtonLabel: ''
    };

    popData: any = {
        singleDate: null,
    }

    today = lib.dateFormat(new Date, 'hh:MM dd/mm/yyyy');
    isShowFromToDate = false;
    saleOrderStatusList = [];
    branchList = [];

    constructor(
        public staffProvider: HRM_StaffProvider,

        public env: EnvService,
        public navCtrl: NavController,
        public navParams: NavParams,
        public popoverCtrl: PopoverController,
        public translate: TranslateService
    ) {
        this.translate.get('erp.app.pages.sys.popover.single-date-label').subscribe((message: string) => {
            this._popConfig.singleDateLabel = message;
        });

        this.translate.get('erp.app.pages.sys.popover.date-range-label').subscribe((message: string) => {
            this._popConfig.dateRangeLabel = message;
        });

        this.translate.get('erp.app.pages.sys.popover.staff-select-label').subscribe((message: string) => {
            this._popConfig.staffSelectLabel = message;
        });
        
        this.translate.get('erp.app.pages.sys.popover.sale-order-status-select-label').subscribe((message: string) => {
            this._popConfig.saleOrderStatusSelectLabel = message;
        });
        
        this.translate.get('erp.app.pages.sys.popover.submit-button-label').subscribe((message: string) => {
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
            this.branchList = JSON.parse(JSON.stringify(this.env.branchList));
            let translateResult;
            this.translate.get('erp.app.pages.sys.popover.all-unit').subscribe((message: string) => {
                translateResult = message;
            });
            this.branchList.unshift({ Id: null, Name: translateResult});
        }



    }

    initSaleOrderStatus() {
        this.env.getStatus('SalesOrder').then(data=>{
            this.saleOrderStatusList = data;
            this.translate.get('erp.app.pages.sys.popover.not-shipping').subscribe((message: string) => {
                this.saleOrderStatusList.unshift({Id:'[101,102,103,104,110]', Name: message, Color:'primary'});
            });

            this.translate.get('erp.app.pages.sys.popover.wating-allocation').subscribe((message: string) => {
                this.saleOrderStatusList.unshift({Id:'[104,113]', Name: message, Color:'success'});
            });

            this.translate.get('erp.app.pages.sys.popover.pending-approve').subscribe((message: string) => {
                this.saleOrderStatusList.unshift({Id:'[103,110]', Name: message, Color:'warning'});
            });

            this.translate.get('erp.app.pages.sys.popover.all').subscribe((message: string) => {
                this.saleOrderStatusList.unshift({Id:'', Name: message, Color:'primary'});
            });
        })
    }

    changeDateFillter(type) {
        this.popData.selectedBTNDate = type;

        let toDay = new Date();

        let yesterday = new Date(toDay);
        yesterday.setDate(yesterday.getDate() - 1);

        if (type == 'today') {
            this.popData.fromDate = lib.dateFormat(toDay, 'yyyy-mm-dd');
            this.popData.toDate = lib.dateFormat(toDay, 'yyyy-mm-dd');
        }
        else if (type == 'yesterday') {
            this.popData.fromDate = lib.dateFormat(yesterday, 'yyyy-mm-dd');
            this.popData.toDate = lib.dateFormat(yesterday, 'yyyy-mm-dd');
        }
        else if (type == 'thisWeek') {
            let weekDates = lib.getWeekDates(toDay);
            this.popData.fromDate = lib.dateFormat(weekDates[0], 'yyyy-mm-dd');
            this.popData.toDate = lib.dateFormat(weekDates[6], 'yyyy-mm-dd');
        }
        else if (type == 'setdone') {
            this.popConfig.type = 'set';
        }
    }


    command(returnData) {
        if (this.popConfig.isShowSaleOrderStatusSelect) {
            let selectedStatus = this.saleOrderStatusList.find(e => e.Id == this.popData.IDSaleOrderStatus);
            this.popData.selectedStatus = selectedStatus;
        }

        this.popoverCtrl.dismiss(returnData);
    }


    staffList$
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
                tap(() => this.staffListLoading = true),
                switchMap(term => this.staffProvider.search({ Take: 20, Skip: 0, IDDepartment: this.env.selectedBranchAndChildren, Term: term }).pipe(
                    catchError(() => of([])), // empty list on error
                    tap(() => this.staffListLoading = false)
                ))
            )
        );
    }

}
