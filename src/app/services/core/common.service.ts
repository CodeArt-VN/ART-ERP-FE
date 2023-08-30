import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GlobalData } from '../static/global-variable';
import { lib } from '../static/global-functions';
import { EnvService } from './env.service';
import { environment } from 'src/environments/environment';
import { ApiSetting } from '../static/api-setting';

@Injectable({
	providedIn: 'root'
})
export class CommonService {
	constructor(public http: HttpClient, public env: EnvService) {

	}

	connect(pmethod, URL, data) {
		let headers = new HttpHeaders({
			'Authorization': this.getToken(),
			'Content-Type': 'application/json',
			'Data-type': 'json',
			//'withCredentials': 'true'
		});
		let options: any = {
			headers: headers,
			//withCredentials: true, 
			params: null
		};

		if (data && pmethod != 'UPLOAD') {
			data = JSON.parse(JSON.stringify(data));

			//delete data.IsDisabled;
			delete data.IsDeleted;
			delete data.CreatedBy;
			delete data.ModifiedBy;
			delete data.CreatedDate;
			delete data.ModifiedDate;

			delete data.levels;
			delete data.show;
			delete data.showdetail;
			delete data.levels;
			delete data._state;
			delete data.undefined;
			delete data.count;
			delete data.checked;
			delete data.selected;
		}

		if (data && data.hasOwnProperty('IgnoredBranch') && data.hasOwnProperty('IDBranch')) {
			delete data.IDBranch;
			delete data.SelectedBranch;
		}

		if (URL.indexOf('http') != 0) {
			URL = ApiSetting.apiDomain(URL);
		}

		if ((data && !data.hasOwnProperty('IgnoredBranch') && !data.hasOwnProperty('IDBranch') || !data) && URL.indexOf('IDBranch') == -1 && this.env.selectedBranch) {
			URL = URL + (URL.indexOf('?') > -1 ? '&' : '?') + 'IDBranch=' + this.env.selectedBranchAndChildren + '';
		}
		if ((data && !data.hasOwnProperty('IgnoredBranch') && !data.hasOwnProperty('SelectedBranch') || !data) && URL.indexOf('SelectedBranch') == -1 && this.env.selectedBranch) {
			URL = URL + (URL.indexOf('?') > -1 ? '&' : '?') + 'SelectedBranch=' + this.env.selectedBranch + '';
		}

		if (URL.indexOf('AppVersion') == -1) {
			URL = URL + (URL.indexOf('?') > -1 ? '&' : '?') + 'AppVersion=' + this.env.version + '';
		}

		if (pmethod == "Login") {
			headers = new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded'
			});
			options.headers = headers;
			return this.http.post(URL, data, options);

		}
		else if (pmethod == "GET") {
			if (data) {
				let params: HttpParams = new HttpParams();
				for (const key of Object.keys(data)) {
					if (data[key]) {
						if (data[key] instanceof Array) {
							console.log(data);
							
							params = params.append(key.toString(), JSON.stringify(data[key]));
						} else {
							params = params.append(key.toString(), data[key]);
						}
					}
				}
				options.params = params;
			}
			return this.http.get(URL, options);
		}
		else if (pmethod == "POST") {
			return this.http.post(URL, JSON.stringify(data), options);

		}
		else if (pmethod == "PUT") {
			return this.http.put(URL, data, options);
		}
		else if (pmethod == "DELETE") {
			return this.http.delete(URL, options);
		}
		else if (pmethod == "UPLOAD") {

			headers = new HttpHeaders({
				'Authorization': this.getToken(),
				'withCredentials': 'true'
			});
			options = { headers: headers, params: null };

			return this.http.post(URL, data, options);
		}
		else if (pmethod == "DOWNLOAD") {
			options.params = data;
			return this.http.get(URL, options);
		}
		else {
			options.params = data;
			return this.http.get(URL, options);
		}
	}

	connectLocal(apiPath, query, fields) {
		//apiPath.method, apiPath.url()

		let that = this;
		let keyword = (query && query.Keyword) ? query.Keyword : null;

		let page = 1;
		let pageSize = 999999;

		if (query && query.Page && query.PageSize) {
			page = query.Page;
			pageSize = query.PageSize;
		}

		return new Promise(function (resolve, reject) {
			that.env.getStorage(apiPath.url())
				.then(items => {

					if (items == null) {
						that.connect(apiPath.method, apiPath.url(), { Take: pageSize }).toPromise()
							.then((data: any) => {
								that.cacheLocal(apiPath.url(), data);
								that.searchInItems(keyword, fields, page, pageSize, data).then(result => {
									resolve(result);
								})
							})
							.catch(err => {
								that.checkError(err);
								reject(err);
							});
					}
					else {
						that.searchInItems(keyword, fields, page, pageSize, items).then(result => {
							resolve(result);
						})
					}
				})
				.catch(err => {
					reject(err);
				});
		});

	}

	cacheLocal(URL, Data) {
		return this.env.setStorage(URL, Data);
	}

	getToken() {
		return 'Bearer ' + GlobalData?.Token?.access_token;
	}

	getAnItemLocal(Id: number, UID: string = '', apiPath) {
		let that = this;
		return new Promise((resolve, reject) => {
			let query = {
				Keyword: Id == 0 ? UID : Id
			};

			that.connectLocal(apiPath, query, ['Id', '_uid'])
				.then((results: any) => {
					if (results.count === 1) {
						resolve(results.data[0]);
					}
					else {
						reject(results);
					}
				})
				.catch(err => {
					reject(err);
				})
		});
	}

	getAnItemOnServer(Id: number, UID: string = '', apiPath) {
		let that = this;
		return new Promise(function (resolve, reject) {
			that.connect(apiPath.method, apiPath.url(Id), null).toPromise()
				.then(data => {
					resolve(data);
				})
				.catch(err => {
					that.checkError(err);
					reject(err);
					//return Promise.reject(err.message || err);
				});
		});
	}

	searchInItems(keyword, fields = [], page, pageSize, items) {
		return new Promise(resolve => {
			var result = { count: 0, data: [] };
			var data = [];
			if (keyword && fields.length) {
				data = items.filter(ite => {
					if (typeof (ite.IsDeleted) != 'undefined' && ite.IsDeleted != false) {
						return false;
					}
					else {
						let checkResult = false;
						for (var i = 0; i < fields.length; i++) {
							var element = fields[i];
							if (ite[element] == undefined) {
								checkResult == false;
							}
							else if (typeof (keyword.toLowerCase) == 'undefined') {
								checkResult = ite[element] == keyword
							}
							else {
								checkResult = (ite[element].toLowerCase().indexOf(keyword.toLowerCase()) > -1);
							}


							if (checkResult) {
								break;
							}
						}
						return checkResult;
					}
				});
			} else {
				data = items.filter((ite) => {
					if (typeof (ite.IsDeleted) == 'undefined') {
						return true;
					}
					else {
						return ite.IsDeleted === false
					}
				});
			}

			result.count = data.length;
			if (page && pageSize) {
				let from = (page - 1) * pageSize;
				let to = from + pageSize;
				result.data = data.slice(from, to);
			}
			else {
				result.data = data;
			}

			resolve(result);
		});
	}

	save(item, apiPath, isForceCreate = false) {
		if (item.Id) {
			return this.update(item, apiPath.putItem, isForceCreate);
		}
		else {
			return this.add(item, apiPath.postItem);
		}
	}
	add(item, apiPath) {
		item._state = 'add';
		item._uid = lib.generateUID();
		return new Promise((resolve, reject) => {
			this.connect(apiPath.method, apiPath.url(), item).toPromise()
				.then((data) => {
					resolve(data);
				}).catch(err => {
					this.checkError(err);
					reject(err);
				})
		});
	}
	update(item, apiPath, isForceCreate = false) {
		item._state = 'update';
		return new Promise((resolve, reject) => {
			this.connect(apiPath.method, apiPath.url(item.Id) + (isForceCreate ? '?ForceCreate' : ''), item).toPromise()
				.then((data) => {
					resolve(data ? data : item);
				}).catch(err => {
					this.checkError(err);
					reject(err);
				})
		});
	}
	delete(items, apiPath) {
		return new Promise((resolve, reject) => {
			if (items) {
				let Ids = '';
				if (Array.isArray(items)) {
					items.forEach(item => {
						item._state = 'delete';
						item.IsDeleted = true;
					});

					Ids = JSON.stringify(items.map(m => m.Id));
				}
				else {
					items._state = 'delete';
					items.IsDeleted = true;
					Ids = `[${items.Id}]`;
				}


				this.connect(apiPath.delItem.method, apiPath.delItem.url(Ids), null).toPromise()
					.then(() => {
						resolve(true);
					}).catch(err => {
						this.checkError(err);
						reject(err);
					})
			}
			else {
				reject('It looks like there is nothings to delete!')
			}
		});
	}
	disable(items, apiPath) {
		return new Promise((resolve, reject) => {
			if (items) {
				let Ids = '';
				if (Array.isArray(items)) {
					items.forEach(item => {
						item._state = 'disable';
						item.IsDisabled = true;
					});

					Ids = JSON.stringify(items.map(m => m.Id));
				}
				else {
					items._state = 'disable';
					items.IsDisabled = true;
					Ids = `[${items.Id}]`;
				}


				this.connect(apiPath.disableItem.method, apiPath.disableItem.url(Ids), true).toPromise()
					.then(() => {
						resolve(true);
					}).catch(err => {
						this.checkError(err);
						reject(err);
					})
			}
			else {
				reject('It looks like there is nothings to disable!')
			}
		});
	}
	changeBranch(item, apiPath) {
		return new Promise((resolve, reject) => {
			if (item.Ids) {
				let Ids = '';

				this.connect(apiPath.changeBranch.method, apiPath.changeBranch.url(Ids), item).toPromise()
					.then(() => {
						resolve(true);
					}).catch(err => {
						this.checkError(err);
						reject(err);
					})
			}
			else {
				reject('It looks like there is nothings to disable!')
			}
		});
	}
	enable(items, apiPath) {
		return new Promise((resolve, reject) => {
			if (items) {
				let Ids = '';
				if (Array.isArray(items)) {
					items.forEach(item => {
						item._state = 'disable';
						item.IsDisabled = false;
					});

					Ids = JSON.stringify(items.map(m => m.Id));
				}
				else {
					items._state = 'disable';
					items.IsDisabled = false;
					Ids = `[${items.Id}]`;
				}


				this.connect(apiPath.enableItem.method, apiPath.enableItem.url(Ids), true).toPromise()
					.then(() => {
						resolve(true);
					}).catch(err => {
						this.checkError(err);
						reject(err);
					})
			}
			else {
				reject('It looks like there is nothings to enable!')
			}
		});
	}

	import(apiPath: any, fileToUpload: File) {
		const formData: FormData = new FormData();
		formData.append('fileKey', fileToUpload, fileToUpload.name);
		return new Promise((resolve, reject) => {
			this.connect(apiPath.postImport.method, apiPath.postImport.url(), formData).toPromise()
				.then((data) => {
					resolve(data);
				}).catch(err => {
					this.checkError(err);
					reject(err);
				})
		});
	}

	export(apiPath: any, query) {
		return new Promise((resolve, reject) => {
			this.connect(apiPath.getExport.method, apiPath.getExport.url(), query).toPromise()
				.then((data) => {
					resolve(data);
				}).catch(err => {
					this.checkError(err);
					reject(err);
				})
		});
	}



	upload(apiPath: any, fileToUpload: File) {
		const formData: FormData = new FormData();
		formData.append('fileKey', fileToUpload, fileToUpload.name);
		return new Promise((resolve, reject) => {
			this.connect('UPLOAD', apiPath.url(), formData).toPromise()
				.then((data) => {
					resolve(data);
				}).catch(err => {
					this.checkError(err);
					reject(err);
				})
		});
	}
	download(apiPath: any, query) {
		return new Promise((resolve, reject) => {
			this.connect('DOWNLOAD', apiPath.url(), query).toPromise()
				.then((data) => {
					resolve(data);
				}).catch(err => {
					this.checkError(err);
					reject(err);
				})
		});
	}

	post(URL, data) {
		return new Promise((resolve, reject) => {
			this.connect('POST', URL, data).toPromise().then(resp => {
				resolve(resp);
			}).catch(err => {
				this.checkError(err);
				reject(err);
			})
		});
	}

	put(URL, data) {
		return new Promise((resolve, reject) => {
			this.connect('PUT', URL, data).toPromise().then(resp => {
				resolve(resp);
			}).catch(err => {
				this.checkError(err);
				reject(err);
			})
		});
	}

	checkError(err) {
		//console.log(err);
		if (err.status == 417 && err.statusText) {
			let vers = err.statusText.split('|');
			this.env.showTranslateMessage('erp.app.app-component.account-service.message.update-version-with-value', 'danger', vers[0], 0, true);
			this.env.publishEvent({ Code: 'app:ForceUpdate' });
		}
		else if (err.status == 401) {
			this.env.publishEvent({ Code: 'app:silentlogout' });

			this.env.showTranslateMessage('erp.app.app-component.account-service.message.silent-logout');
		}
		else if (err.status == 0 && err.message.indexOf('failure response') > -1) {
			this.env.showTranslateMessage('erp.app.app-component.account-service.message.can-not-connect', 'danger');
			this.env.publishEvent({ Code: 'app:ConnectFail' });
		}
		else {
			if (!environment.production) {
				this.env.showMessage(err.message, 'danger');
			}
		}

		// else {
		// 	that.env.showMessage(err.message, 'warning');
		// 	that.env.publishEvent({ Code: 'app:ConnectFail' });
		// }
	}

	public handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			//console.log(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

}


export class exService {
	apiPath: any;
	searchField = [];
	allowCache = true;
	serviceName = '';
	commonService: CommonService;

	constructor(apiPath: any, searchField, commonService: CommonService) {
		this.apiPath = apiPath;
		this.serviceName = searchField.name;
		this.searchField = searchField.value.filelds;
		this.allowCache = searchField.value.cache;
		this.commonService = commonService;
	}

	getAnItem(Id, UID: string = '') {
		if (this.allowCache) {
			return this.commonService.getAnItemLocal(Id, UID, this.apiPath.getList);
		}
		else {
			return this.commonService.getAnItemOnServer(Id, UID, this.apiPath.getItem);
		}

	}

	read(query: any = null, forceReload = false) {
		if (this.allowCache && forceReload == false) {
			return this.commonService.connectLocal(this.apiPath.getList, query, this.searchField);
		}
		else {
			//connect server
			var that = this;
			return new Promise(function (resolve, reject) {
				let apiPath = that.apiPath.getList;
				that.commonService.connect(apiPath.method, apiPath.url(), query).toPromise()
					.then((data: any) => {
						var result = { count: data.length, data: data };
						resolve(result);
					})
					.catch(err => {
						that.commonService.checkError(err);
						reject(err);
					});
			});
		}
	}

	search(query: any = null) {
		let apiPath = this.apiPath.getSearchList;
		return this.commonService.connect(apiPath.method, apiPath.url(), query);
	}

	save(item, isForceCreate = false) {
		return this.commonService.save(item, this.apiPath, isForceCreate);
	}

	delete(items) {
		return this.commonService.delete(items, this.apiPath);
	}

	disable(items, IsDisabled = true) {
		if (!IsDisabled) {
			return this.commonService.enable(items, this.apiPath);
		}
		else {
			return this.commonService.disable(items, this.apiPath);
		}
	}

	changeBranch(item) {
		return this.commonService.changeBranch(item, this.apiPath);
	}

	import(fileToUpload: File) {
		return this.commonService.import(this.apiPath, fileToUpload);
	}

	export(query) {
		return this.commonService.export(this.apiPath, query);
	}

	upload(fileToUpload: File) {
		return this.commonService.upload(this.apiPath, fileToUpload);
	}

	download(query) {
		return this.commonService.download(this.apiPath, query);
	}

}