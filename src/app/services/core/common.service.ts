import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { dog, environment } from 'src/environments/environment';
import { ApiSetting } from '../static/api-setting';
import { lib } from '../static/global-functions';
import { GlobalData } from '../static/global-variable';
import { SearchConfig } from '../static/search-config';
import { toolbarCommandRules } from '../static/toolbar-command-rules';
import { EnvService } from './env.service';
import { providerService } from './extend-service';
import { EVENT_TYPE } from '../static/event-type';

@Injectable({
	providedIn: 'root',
})
export class CommonService {
	constructor(
		public http: HttpClient,
		public env: EnvService
	) {}

	connect(pmethod, URL, data) {
		let headers = new HttpHeaders({
			Authorization: this.getToken(),
			'Content-Type': 'application/json',
			'Data-type': 'json',
			'App-Version': environment.appVersion,
			//'withCredentials': 'true'
		});

		let options: any = {
			headers: headers,
			//withCredentials: true,
			params: null,
		};

		if (data && pmethod != 'UPLOAD') {
			data = lib.cloneObject(data);

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

		if (!environment.production || GlobalData?.Token?.dev == 'test') headers.append('IsDevMode', 'true');

		if (data && data.hasOwnProperty('IgnoredBranch') && data.hasOwnProperty('IDBranch')) {
			delete data.IDBranch;
			delete data.SelectedBranch;
		}

		if (URL.indexOf('http') != 0) {
			URL = pmethod != 'Login' ? ApiSetting.apiDomain(URL) : ApiSetting.appDomain(URL);
		}

		if (((data && !data.hasOwnProperty('IgnoredBranch') && !data.hasOwnProperty('IDBranch')) || !data) && URL.indexOf('IDBranch') == -1 && this.env.selectedBranch) {
			URL = URL + (URL.indexOf('?') > -1 ? '&' : '?') + 'IDBranch=' + this.env.selectedBranchAndChildren + '';
		}
		if (
			((data && !data.hasOwnProperty('IgnoredBranch') && !data.hasOwnProperty('SelectedBranch')) || !data) &&
			URL.indexOf('SelectedBranch') == -1 &&
			this.env.selectedBranch
		) {
			URL = URL + (URL.indexOf('?') > -1 ? '&' : '?') + 'SelectedBranch=' + this.env.selectedBranch + '';
		}

		if (pmethod == 'Login') {
			headers = new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded',
				'App-Version': environment.appVersion,
				Authorization: 'Basic ' + btoa(data.username + ':' + data.password),
			});
			options.headers = headers;

			return this.http.post(URL, 'grant_type=password', options);
		} else if (pmethod == 'GET') {
			if (data) {
				let params: HttpParams = new HttpParams();
				for (const key of Object.keys(data)) {
					//if (data[key]) {
					if (data[key] && data[key] instanceof Array) {
						params = params.append(key.toString(), JSON.stringify(data[key]));
					} else if (key == '_AdvanceConfig') {
						const jsonString = JSON.stringify(data[key]);
						const base64String = btoa(unescape(encodeURIComponent(jsonString)));
						params = params.append(key.toString(), base64String);
					} else {
						params = params.append(key.toString(), data[key]);
					}

					// nếu có data._AdvanceConfig thì =>/"?Config=BASE64"

					//}
				}
				options.params = params;
			}
			return this.http.get(URL, options);
		} else if (pmethod == 'POST') {
			return this.http.post(URL, JSON.stringify(data), options);
		} else if (pmethod == 'PUT') {
			return this.http.put(URL, data, options);
		} else if (pmethod == 'DELETE') {
			return this.http.delete(URL, options);
		} else if (pmethod == 'UPLOAD') {
			headers = new HttpHeaders({
				Authorization: this.getToken(),
				'App-Version': environment.appVersion,
				withCredentials: 'true',
			});
			options = { headers: headers, params: null };

			return this.http.post(URL, data, options);
		} else if (pmethod == 'DOWNLOAD') {
			if (data) {
				let params: HttpParams = new HttpParams();
				for (const key of Object.keys(data)) {
					//if (data[key]) {
					if (data[key] && data[key] instanceof Array) {
						params = params.append(key.toString(), JSON.stringify(data[key]));
					} else if (key == '_AdvanceConfig') {
						const jsonString = JSON.stringify(data[key]);
						const base64String = btoa(unescape(encodeURIComponent(jsonString)));
						params = params.append(key.toString(), base64String);
					} else {
						params = params.append(key.toString(), data[key]);
					}

					// nếu có data._AdvanceConfig thì =>/"?Config=BASE64"

					//}
				}
				options.params = params;
			}
			return this.http.get(URL, options);
		} else {
			options.params = data;
			return this.http.get(URL, options);
		}
	}

	connectLocal(apiPath, query, fields) {
		//apiPath.method, apiPath.url()

		let that = this;
		let keyword = query && query.Keyword ? query.Keyword : null;

		let page = 1;
		let pageSize = 999999;

		if (query && query.Page && query.PageSize) {
			page = query.Page;
			pageSize = query.PageSize;
		}

		return new Promise(function (resolve, reject) {
			dog && console.log('🚀 [CommonService] connectLocal', apiPath.url());
			that.env
				.getStorage(apiPath.url(), query)
				.then((items) => {
					if (items == null) {
						reject('No data found');
					} else {
						// Cache hit
						that.searchInItems(keyword, fields, page, pageSize, items).then((result) => {
							resolve(result);
						});
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	getToken() {
		return 'Bearer ' + this.env.storage.app.token?.access_token;
	}

	getAnItemLocal(Id: number, UID: string = '', apiPath) {
		let that = this;
		return new Promise((resolve, reject) => {
			let query = null;
			let url = apiPath.url(Id);
			that.connectLocal(url, query, null)
				.then((results: any) => {
					if (results.count === 1) {
						resolve(results.data[0]);
					} else {
						reject(results);
					}
				})
				.catch(() => {
					this.getAnItemOnServer(Id, UID, apiPath)
						.then((data) => {
							resolve(data);
						})
						.catch((err) => {
							reject(err);
						});
				});
		});
	}

	getAnItemOnServer(Id: number, UID: string = '', apiPath) {
		let that = this;
		return new Promise(function (resolve, reject) {
			let url = apiPath.url(Id);
			that.connect(apiPath.method, url, null)
				.toPromise()
				.then((data) => {
					resolve(data);
				})
				.catch((err) => {
					that.checkError(err);
					reject(err);
					//return Promise.reject(err.message || err);
				});
		});
	}

	searchInItems(keyword, fields = [], page, pageSize, items) {
		return new Promise((resolve) => {
			var result = { count: 0, data: [] };
			var data = [];
			if (keyword && fields.length) {
				data = items.filter((ite) => {
					if (typeof ite.IsDeleted != 'undefined' && ite.IsDeleted != false) {
						return false;
					} else {
						let checkResult = false;
						for (var i = 0; i < fields.length; i++) {
							var element = fields[i];
							if (ite[element] == undefined) {
								checkResult == false;
							} else if (typeof keyword.toLowerCase == 'undefined') {
								checkResult = ite[element] == keyword;
							} else {
								checkResult = ite[element].toLowerCase().indexOf(keyword.toLowerCase()) > -1;
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
					if (typeof ite.IsDeleted == 'undefined') {
						return true;
					} else {
						return ite.IsDeleted === false;
					}
				});
			}

			result.count = data.length;
			if (page && pageSize) {
				let from = (page - 1) * pageSize;
				let to = from + pageSize;
				result.data = data.slice(from, to);
			} else {
				result.data = data;
			}

			resolve(result);
		});
	}

	save(item, apiPath, isForceCreate = false) {
		if (item.Id) {
			return this.update(item, apiPath.putItem, isForceCreate);
		} else {
			return this.add(item, apiPath.postItem);
		}
	}
	add(item, apiPath) {
		item._state = 'add';
		item._uid = lib.generateUID();
		return new Promise((resolve, reject) => {
			this.connect(apiPath.method, apiPath.url(), item)
				.toPromise()
				.then((data) => {
					resolve(data);
				})
				.catch((err) => {
					this.checkError(err);
					reject(err);
				});
		});
	}
	update(item, apiPath, isForceCreate = false) {
		item._state = 'update';
		return new Promise((resolve, reject) => {
			this.connect(apiPath.method, apiPath.url(item.Id) + (isForceCreate ? '?ForceCreate' : ''), item)
				.toPromise()
				.then((data) => {
					resolve(data ? data : item);
				})
				.catch((err) => {
					this.checkError(err);
					reject(err);
				});
		});
	}
	delete(items, apiPath) {
		return new Promise((resolve, reject) => {
			if (items) {
				let Ids = '';
				if (Array.isArray(items)) {
					items.forEach((item) => {
						item._state = 'delete';
						item.IsDeleted = true;
					});

					Ids = JSON.stringify(items.map((m) => m.Id));
				} else {
					items._state = 'delete';
					items.IsDeleted = true;
					Ids = `[${items.Id}]`;
				}

				this.connect(apiPath.delItem.method, apiPath.delItem.url(Ids), null)
					.toPromise()
					.then(() => {
						resolve(true);
					})
					.catch((err) => {
						this.checkError(err);
						reject(err);
					});
			} else {
				reject('It looks like there is nothings to delete!');
			}
		});
	}
	submitForApproval(items: any, apiPath) {
		return new Promise((resolve, reject) => {
			if (items) {
				let Ids = [];
				if (Array.isArray(items)) {
					Ids = items.map((m) => m.Id);
				} else {
					Ids = [items.Id];
				}
				this.connect('POST', apiPath.submitForApproval.url(), { Ids: Ids })
					.toPromise()
					.then(() => {
						resolve(true);
					})
					.catch((err) => {
						this.checkError(err);
						reject(err);
					});
			} else {
				reject('It looks like there is nothings to cancel!');
			}
		});
	}
	approve(items: any, apiPath) {
		return new Promise((resolve, reject) => {
			if (items) {
				let Ids = [];
				if (Array.isArray(items)) {
					Ids = items.map((m) => m.Id);
				} else {
					Ids = [items.Id];
				}
				this.connect('POST', apiPath.approve.url(), { Ids: Ids })
					.toPromise()
					.then(() => {
						resolve(true);
					})
					.catch((err) => {
						this.checkError(err);
						reject(err);
					});
			} else {
				reject('It looks like there is nothings to cancel!');
			}
		});
	}
	disapprove(items: any, apiPath) {
		return new Promise((resolve, reject) => {
			if (items) {
				let Ids = [];
				if (Array.isArray(items)) {
					Ids = items.map((m) => m.Id);
				} else {
					Ids = [items.Id];
				}
				this.connect('POST', apiPath.disapprove.url(), { Ids: Ids })
					.toPromise()
					.then(() => {
						resolve(true);
					})
					.catch((err) => {
						this.checkError(err);
						reject(err);
					});
			} else {
				reject('It looks like there is nothings to cancel!');
			}
		});
	}
	cancel(items: any, apiPath) {
		return new Promise((resolve, reject) => {
			if (items) {
				let Ids = [];
				if (Array.isArray(items)) {
					Ids = items.map((m) => m.Id);
				} else {
					Ids = [items.Id];
				}

				this.connect('POST', apiPath.getItem.url('Cancel'), { Ids: Ids })
					.toPromise()
					.then(() => {
						resolve(true);
					})
					.catch((err) => {
						this.checkError(err);
						reject(err);
					});
			} else {
				reject('It looks like there is nothings to cancel!');
			}
		});
	}

	disable(items, apiPath) {
		return new Promise((resolve, reject) => {
			if (items) {
				let Ids = '';
				if (Array.isArray(items)) {
					items.forEach((item) => {
						item._state = 'disable';
						item.IsDisabled = true;
					});

					Ids = JSON.stringify(items.map((m) => m.Id));
				} else {
					items._state = 'disable';
					items.IsDisabled = true;
					Ids = `[${items.Id}]`;
				}

				this.connect(apiPath.disableItem.method, apiPath.disableItem.url(Ids), true)
					.toPromise()
					.then(() => {
						resolve(true);
					})
					.catch((err) => {
						this.checkError(err);
						reject(err);
					});
			} else {
				reject('It looks like there is nothings to disable!');
			}
		});
	}

	changeBranch(item, apiPath) {
		return new Promise((resolve, reject) => {
			if (item.Ids) {
				let Ids = '';

				this.connect(apiPath.changeBranch.method, apiPath.changeBranch.url(Ids), item)
					.toPromise()
					.then(() => {
						resolve(true);
					})
					.catch((err) => {
						this.checkError(err);
						reject(err);
					});
			} else {
				reject('It looks like there is nothings to disable!');
			}
		});
	}
	enable(items, apiPath) {
		return new Promise((resolve, reject) => {
			if (items) {
				let Ids = '';
				if (Array.isArray(items)) {
					items.forEach((item) => {
						item._state = 'disable';
						item.IsDisabled = false;
					});

					Ids = JSON.stringify(items.map((m) => m.Id));
				} else {
					items._state = 'disable';
					items.IsDisabled = false;
					Ids = `[${items.Id}]`;
				}

				this.connect(apiPath.enableItem.method, apiPath.enableItem.url(Ids), true)
					.toPromise()
					.then(() => {
						resolve(true);
					})
					.catch((err) => {
						this.checkError(err);
						reject(err);
					});
			} else {
				reject('It looks like there is nothings to enable!');
			}
		});
	}

	import(apiPath: any, fileToUpload: File) {
		const formData: FormData = new FormData();
		formData.append('fileKey', fileToUpload, fileToUpload.name);
		return new Promise((resolve, reject) => {
			this.connect(apiPath.postImport.method, apiPath.postImport.url(), formData)
				.toPromise()
				.then((data) => {
					resolve(data);
				})
				.catch((err) => {
					this.checkError(err);
					reject(err);
				});
		});
	}

	export(apiPath: any, query) {
		return new Promise((resolve, reject) => {
			this.connect(apiPath.getExport.method, apiPath.getExport.url(), query)
				.toPromise()
				.then((data) => {
					resolve(data);
				})
				.catch((err) => {
					this.checkError(err);
					reject(err);
				});
		});
	}

	upload(apiPath: any, fileToUpload: File) {
		const formData: FormData = new FormData();
		formData.append('fileKey', fileToUpload, fileToUpload.name);
		return new Promise((resolve, reject) => {
			this.connect('UPLOAD', apiPath.url(), formData)
				.toPromise()
				.then((data) => {
					resolve(data);
				})
				.catch((err) => {
					this.checkError(err);
					reject(err);
				});
		});
	}
	download(apiPath: any, query) {
		return new Promise((resolve, reject) => {
			this.connect('DOWNLOAD', apiPath.url(), query)
				.toPromise()
				.then((data) => {
					resolve(data);
				})
				.catch((err) => {
					this.checkError(err);
					reject(err);
				});
		});
	}

	post(URL, data) {
		return new Promise((resolve, reject) => {
			this.connect('POST', URL, data)
				.toPromise()
				.then((resp) => {
					resolve(resp);
				})
				.catch((err) => {
					this.checkError(err);
					reject(err);
				});
		});
	}

	put(URL, data) {
		return new Promise((resolve, reject) => {
			this.connect('PUT', URL, data)
				.toPromise()
				.then((resp) => {
					resolve(resp);
				})
				.catch((err) => {
					this.checkError(err);
					reject(err);
				});
		});
	}

	checkError(err) {
		dog && console.log(err);

		if (err.status == 417 && err.statusText) {
			let vers = err.statusText.split('|');
			this.env.showMessage('Please update the software ( to min version {{value}}).', 'danger', vers[0], 0, true);
			this.env.publishEvent({ Code: EVENT_TYPE.APP.FORCE_UPDATE_MOBILEAPP });
		} else if (err.status == 401) {
			this.env.publishEvent({ Code: EVENT_TYPE.USER.LOGOUT_REQUESTED });
			this.env.showMessage('Your session has expired, please log in again.');
		} else if (err.status == 0 && err.message.indexOf('failure response') > -1) {
			this.env.showMessage('Cannot connect to server, please try again.', 'danger');
			this.env.publishEvent({ Code: EVENT_TYPE.APP.CONNECT_FAIL });
		} else {
			this.env.showErrorMessage(err);
			if (!environment.production) {
				//this.env.showMessage('To dev message: {value}', 'danger', err.message);
			}
		}
	}
}

export class exService extends providerService {
	constructor(apiPath: any, searchField: SearchConfig, commonService: CommonService) {
		super();
		this.apiPath = apiPath;
		this.serviceName = searchField.name;
		this.searchField = searchField.value.fields;
		this.cacheConfig = searchField.value.cache;
		this.allowCache = this.cacheConfig?.enable || false;
		this.commonService = commonService;

		dog && console.log(this.serviceName + ' service is ready');
		this.showCommandRules = toolbarCommandRules.getRules(this.serviceName);
	}
}
