import { Injectable } from '@angular/core';
import { APIList } from './static/global-variable';
import { CommonService, exService } from './core/common.service';
import { SearchConfig } from './static/search-config';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EnvService } from './core/env.service';
import { ApiSetting } from './static/api-setting';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class EInvoiceService extends exService {
	apiDomain = environment.appDomain;
	constructor(
		public commonService: CommonService,
		public http: HttpClient,
		public env: EnvService,

	) {
		super(APIList.ACCOUNT_ApplicationUser, SearchConfig.getSearchFields('ACCOUNT_ApplicationUser'), commonService);
	}

	//ARInvoice
	CreateARInvoiceFromSOs(IDOrders) {
		let that = this;
		return new Promise(function (resolve, reject) {
			let apiPath = {
				method: "POST",
				url: function () { return ApiSetting.apiDomain("AC/ARInvoice/CopyFromSO") }
			};

			let data = {
				IDSaleOrders: IDOrders
			};

			that.commonService.connect(apiPath.method, apiPath.url(), data).toPromise()
				.then((data: any) => {
					resolve(data);
				})
				.catch(err => {
					that.commonService.checkError(err);
					reject(err);
				});
		});
	}

	GetLatestEInvoice() {
		let that = this;
		return new Promise(function (resolve, reject) {
			let apiPath = {
				method: "GET",
				url: function () { return ApiSetting.apiDomain("AC/ARInvoice/GetLatestEInvoice") }
			};

			let data = {};

			that.commonService.connect(apiPath.method, apiPath.url(), data).toPromise()
				.then((data: any) => {
					resolve(data);
				})
				.catch(err => {
					that.commonService.checkError(err);
					reject(err);
				});
		});

	}

	GetEinvoiceInfo(InvoiceGUID, IDBranch) {
		let that = this;
		return new Promise(function (resolve, reject) {
			let apiPath = {
				method: "GET",
				url: function () { return ApiSetting.apiDomain("AC/ARInvoice/GetEInvoice") }
			};

			let data = {
				InvoiceGUID: InvoiceGUID,
				IDBranch: IDBranch
			};

			that.commonService.connect(apiPath.method, apiPath.url(), data).toPromise()
				.then((data: any) => {
					resolve(data);
				})
				.catch(err => {
					that.commonService.checkError(err);
					reject(err);
				});
		});

	}

	CreateEInvoice(IDARInvoice, IDBranch) {
		let that = this;
		return new Promise(function (resolve, reject) {
			let apiPath = {
				method: "POST",
				url: function () { return ApiSetting.apiDomain("AC/ARInvoice/CreateEInvoice") }
			};

			let data = {
				IDARInvoice: IDARInvoice,
				IDBranch: IDBranch
			};

			that.commonService.connect(apiPath.method, apiPath.url(), data).toPromise()
				.then((data: any) => {
					resolve(data);
				})
				.catch(err => {
					that.commonService.checkError(err);
					reject(err);
				});
		});
	}

	UpdateEInvoice(IDARInvoice, InvoiceGUID, IDBranch) {
		let that = this;
		return new Promise(function (resolve, reject) {
			let apiPath = {
				method: "PUT",
				url: function () { return ApiSetting.apiDomain("AC/ARInvoice/UpdateEInvoice") }
			};

			let data = {
				IDARInvoice: IDARInvoice,
				InvoiceGUID: InvoiceGUID,
				IDBranch: IDBranch
			};

			that.commonService.connect(apiPath.method, apiPath.url(), data).toPromise()
				.then((data: any) => {
					resolve(data);
				})
				.catch(err => {
					that.commonService.checkError(err);
					reject(err);
				});
		});
	}

	SyncEInvoice(InvoiceGUID, IDBranch) {
		let that = this;
		return new Promise(function (resolve, reject) {
			let apiPath = {
				method: "PUT",
				url: function () { return ApiSetting.apiDomain("AC/ARInvoice/SyncEInvoiceDataFromEhoadon") }
			};

			let data = {
				InvoiceGUID: InvoiceGUID,
				IDBranch: IDBranch
			};

			that.commonService.connect(apiPath.method, apiPath.url(), data).toPromise()
				.then((data: any) => {
					resolve(data);
				})
				.catch(err => {
					that.commonService.checkError(err);
					reject(err);
				});
		});
	}

	AutoMergeARAndCreateEInvoice(date = '') {
		let that = this;
		return new Promise(function (resolve, reject) {
			let query = date ? '?InvoiceDateFrom=' + date + '&InvoiceDateTo=' + date + 'T23:59:59.997' : '';
			let apiPath = {
				method: "POST",
				url: function () { return ApiSetting.apiDomain('AC/ARInvoice/AutoMergeARInvoice' + query) }
			};

			let data = {};

			that.commonService.connect(apiPath.method, apiPath.url(), data).toPromise()
				.then((data: any) => {
					resolve(data);
				})
				.catch(err => {
					that.commonService.checkError(err);
					reject(err);
				});
		});
	}

	RollbackMergedARInvoice(data) {
		let that = this;
		return new Promise(function (resolve, reject) {
			let apiPath = {
				method: "POST",
				url: function () { return ApiSetting.apiDomain("AC/ARInvoice/RollbackMergedARInvoice") }
			};

			that.commonService.connect(apiPath.method, apiPath.url(), data).toPromise()
				.then((data: any) => {
					resolve(data);
				})
				.catch(err => {
					that.commonService.checkError(err);
					reject(err);
				});
		});
	}



	CreateAndSignEInvoice(IDARInvoice, IDBranch) {
		let that = this;
		return new Promise(function (resolve, reject) {
			let apiPath = {
				method: "POST",
				url: function () { return ApiSetting.apiDomain("AC/ARInvoice/CreateAndSignEInvoice") }
			};

			let data = {
				IDARInvoice: IDARInvoice,
				IDBranch: IDBranch
			};

			that.commonService.connect(apiPath.method, apiPath.url(), data).toPromise()
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