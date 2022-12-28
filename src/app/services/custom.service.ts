import { Injectable } from '@angular/core';
import { APIList } from '../services/static/global-variable';
import { CommonService, exService } from '../services/core/common.service';
import { SearchConfig } from '../services/static/search-config';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EnvService } from './core/env.service';
import { ApiSetting } from './static/api-setting';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CustomService extends exService {

	constructor(
		public commonService: CommonService,
		public http: HttpClient,
		public env: EnvService,

	) {
		super(APIList.ACCOUNT_ApplicationUser, SearchConfig.getSearchFields('ACCOUNT_ApplicationUser'), commonService);

	}

	//apiDomain = 'http://hungvq-w10.local:54009';
	//apiDomain = 'https://pqc.appcenter.vn';
	//apiDomain = 'http://wg.appcenter.vn';
	apiDomain = environment.appDomain;

	API_connect(URL, query, method = 'GET') {

		let that = this;

		URL = this.apiDomain + URL;

		return new Promise(function (resolve, reject) {

			let headers = new HttpHeaders({
				//'Content-Type': 'application/json',
				'Data-type': 'json',
			});

			let options = { headers: headers, params: query };

			if (method == 'GET') {


				that.http.get(URL, options)
					.pipe(
						catchError((error: HttpErrorResponse) => {
							reject(error);
							return throwError(error);
						})
					)
					.subscribe((result: any) => {
						if (result) {
							resolve(result);
						}
						else {
							reject(null);
						}
					});
			}
			else if (method == "POST") {
				options.params = null;
				that.http.post(URL, query, options)
					.pipe(
						catchError((error: HttpErrorResponse) => {
							reject(error);
							return throwError(error);
						})
					)
					.subscribe((result: any) => {
						if (result) {
							resolve(result);
						}
						else {
							reject(result);
						}
					});
			}

		});
	}

	getSAP_RPT_PnL(FromDate, ToDate, Frequency) {
		let URL = '/api/SAP/RPT/PnL';
		let query = { FromDate: FromDate, ToDate: ToDate, Frequency: Frequency, AppVersion: 'SAP-Sync' };
		return this.API_connect(URL, query);
	}

	getSAP_RPT_CashFlow(FromDate, ToDate, Frequency) {
		let URL = '/api/SAP/RPT/CashFlow';
		let query = { FromDate: FromDate, ToDate: ToDate, Frequency: Frequency, AppVersion: 'SAP-Sync' };
		return this.API_connect(URL, query);
	}

	getSAP_RPT_ManagementPnL(FromDate, ToDate, Frequency, IDBranches, IDTemplate) {
		let URL = '/api/SAP/RPT/ManagementPnL';
		let query = { FromDate: FromDate, ToDate: ToDate, Frequency: Frequency, IDBranches: IDBranches, IDTemplate: IDTemplate, AppVersion: 'SAP-Sync' };
		return this.API_connect(URL, query);
	}
	getSAP_RPT_ManagementCashFlow(FromDate, ToDate, Frequency, IDBranches, IDTemplate) {
		let URL = '/api/SAP/RPT/ManagementCashFlow';
		let query = { FromDate: FromDate, ToDate: ToDate, Frequency: Frequency, IDBranches: IDBranches, IDTemplate: IDTemplate, AppVersion: 'SAP-Sync' };
		return this.API_connect(URL, query);
	}
	getSAP_RPT_StatementCashFlow(FromDate, ToDate, IDBranch, IDTemplate, ReportType) {
		let URL = '/api/SAP/RPT/CashflowStatement';
		let query = { FromDate: FromDate, ToDate: ToDate, IDBranch: IDBranch, IDTemplate: IDTemplate, ReportType: ReportType, AppVersion: 'SAP-Sync' };
		return this.API_connect(URL, query);
	}
	getSAP_RPT_StatementIncome(FromDate, ToDate, IDBranch, IDTemplate, ReportType) {
		let URL = '/api/SAP/RPT/IncomeStatement';
		let query = { FromDate: FromDate, ToDate: ToDate, IDBranch: IDBranch, IDTemplate: IDTemplate, ReportType: ReportType, AppVersion: 'SAP-Sync' };
		return this.API_connect(URL, query);
	}
	getSAP_RPT_StatementBalanceSheet(FromDate, ToDate, IDBranch, IDTemplate, ReportType) {
		let URL = '/api/SAP/RPT/BalanceSheetStatement';
		let query = { FromDate: FromDate, ToDate: ToDate, IDBranch: IDBranch, IDTemplate: IDTemplate, ReportType: ReportType, AppVersion: 'SAP-Sync' };
		return this.API_connect(URL, query);
	}
	//daily report
	getSAP_RPT_DailyBalance(ReportDate, IDBranches, IDTemplate) {
		let URL = '/api/SAP/RPT/DailyBalance';
		let query = { ReportDate: ReportDate, IDBranches: IDBranches, IDTemplate: IDTemplate, AppVersion: 'SAP-Sync' };
		return this.API_connect(URL, query);
	}

	getSAP_RPT_DailyGeneral(FromDate, ToDate, IDBranches, IDTemplate) {
		let URL = '/api/SAP/RPT/DailyGeneral';
		let query = { FromDate: FromDate, ToDate: ToDate, IDBranches: IDBranches, IDTemplate: IDTemplate, AppVersion: 'SAP-Sync' };
		return this.API_connect(URL, query);
	}
	getSAP_RPT_DailyRevenue(FromDate, ToDate, IDBranches, IDTemplate) {
		let URL = '/api/SAP/RPT/DailyRevenue';
		let query = { FromDate: FromDate, ToDate: ToDate, IDBranches: IDBranches, IDTemplate: IDTemplate, AppVersion: 'SAP-Sync' };
		return this.API_connect(URL, query);
	}
	getSAP_RPT_DailyDebt(FromDate, ToDate, IDBranches, IDTemplate) {
		let URL = '/api/SAP/RPT/DailyDebt';
		let query = { FromDate: FromDate, ToDate: ToDate, IDBranches: IDBranches, IDTemplate: IDTemplate, AppVersion: 'SAP-Sync' };
		return this.API_connect(URL, query);
	}
	getSAP_RPT_DailyRevExpn1(FromDate, ToDate, IDBranches, IDTemplate) {
		let URL = '/api/SAP/RPT/DailyRevAndExpen1';
		let query = { FromDate: FromDate, ToDate: ToDate, IDBranches: IDBranches, IDTemplate: IDTemplate, AppVersion: 'SAP-Sync' };
		return this.API_connect(URL, query);
	}
	getSAP_RPT_DailyRevExpn2(FromDate, ToDate, IDBranches, IDTemplate) {
		let URL = '/api/SAP/RPT/DailyRevAndExpen2';
		let query = { FromDate: FromDate, ToDate: ToDate, IDBranches: IDBranches, IDTemplate: IDTemplate, AppVersion: 'SAP-Sync' };
		return this.API_connect(URL, query);
	}
}

@Injectable({
	providedIn: 'root'
})
export class ACCOUNT_ApplicationUserProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.ACCOUNT_ApplicationUser, SearchConfig.getSearchFields('ACCOUNT_ApplicationUser'), commonService);
	}

	changePassword(oldPassword, newPassword, confirmPassword) {
		let that = this;
		let apiPath = APIList.ACCOUNT_ApplicationUser.postChangePassword;
		let data = {
			OldPassword: oldPassword,
			NewPassword: newPassword,
			ConfirmPassword: confirmPassword
		}
		return new Promise((resolve, reject) => {
			that.commonService.connect(apiPath.method, apiPath.url(), data).toPromise()
				.then(() => {
					resolve(true);
				}).catch(err => {
					reject(err);
				})
		});
	}
	resetPassword(userId, newPassword, confirmPassword) {
		let that = this;
		let apiPath = APIList.ACCOUNT_ApplicationUser.postSetPassword;
		let data = {
			UserId: userId,
			NewPassword: newPassword,
			ConfirmPassword: confirmPassword
		}
		return new Promise((resolve, reject) => {
			that.commonService.connect(apiPath.method, apiPath.url(), data).toPromise()
				.then(() => {
					resolve(true);
				}).catch(err => {
					reject(err);
				})
		});
	}

}

@Injectable({
	providedIn: 'root'
})
export class SALE_MasanImportProvider extends exService {
	constructor(public commonService: CommonService) {
		super(null, SearchConfig.getSearchFields('SALE_MasanImport_Provider'), commonService);
	}

	MasanImport(query = null) {
		let that = this;
		return new Promise(function (resolve, reject) {
			let apiPath = {
				method: "GET",
				url: function () { return ApiSetting.apiDomain("SALE/Order/MasanImport") }
			};

			that.commonService.connect(apiPath.method, apiPath.url(), query).toPromise()
				.then((data: any) => {
					resolve(data);
				})
				.catch(err => {
					that.commonService.checkError(err);
					reject(err);
				});
		});
	}






}

@Injectable({
	providedIn: 'root'
})
export class CRM_BusinessPartnerProvider extends exService {
	constructor(public commonService: CommonService) {
		super(APIList.ACCOUNT_ApplicationUser, SearchConfig.getSearchFields('ACCOUNT_ApplicationUser'), commonService);
	}

	SearchContact(query = null) {
		let that = this;

		let apiPath = {
			method: "GET",
			url: function () { return ApiSetting.apiDomain("CRM/Contact/POSSearch") }
		};
		return this.commonService.connect(apiPath.method, apiPath.url(), query);
	}

}