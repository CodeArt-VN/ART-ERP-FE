import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dog } from 'src/environments/environment';
import { CacheConfig } from '../static/search-config';
import { CommonService } from './common.service';

/**
 * @description Base service class that extends common functionality for data providers
 * @class providerService
 * @implements {Injectable}
 * 
 * This service provides a standardized interface for CRUD operations with caching support.
 * It acts as a wrapper around CommonService to provide consistent data access patterns
 * across different modules in the application.
 * 
 * @example
 * ```typescript
 * // Extend this class for specific data providers
 * @Injectable({
 *   providedIn: 'root'
 * })
 * export class UserService extends providerService {
 *   constructor(commonService: CommonService) {
 *     super();
 *     this.commonService = commonService;
 *     this.apiPath = UserApiPath;
 *     this.serviceName = 'UserService';
 *     this.allowCache = true;
 *   }
 * }
 * ```
 */
@Injectable({
	providedIn: 'root',
})
export class providerService {
	/** @description API path configuration for the service */
	apiPath: any;
	
	/** @description Array of fields to search in when performing local searches */
	searchField = [];
	
	/** @description Flag to enable/disable caching for this service */
	allowCache = true;
	
	/** @description Name identifier for the service */
	serviceName = '';
	
	/** @description Reference to the CommonService instance */
	commonService: CommonService;
	
	/** @description Rules for showing commands in the UI */
	showCommandRules = [];
	
	/** @description Cache configuration for this service */
	cacheConfig: CacheConfig; // Store cache config separately

	/**
	 * @description Retrieves a single item by ID with optional UID
	 * @param {any} Id - The ID of the item to retrieve
	 * @param {string} [UID=''] - Optional unique identifier
	 * @returns {Promise<any>} Promise that resolves to the requested item
	 * 
	 * @example
	 * ```typescript
	 * const user = await this.getAnItem(123);
	 * const specificUser = await this.getAnItem(123, 'unique-uid');
	 * ```
	 */
	getAnItem(Id, UID: string = '') {
		if (this.allowCache) {
			return this.commonService.getAnItemLocal(Id, UID, this.apiPath.getItem);
		} else {
			return this.commonService.getAnItemOnServer(Id, UID, this.apiPath.getItem);
		}
	}

	/**
	 * @description Reads a list of items with optional query parameters and caching support
	 * @param {any} [query=null] - Query parameters for filtering and pagination
	 * @param {boolean} [forceReload=false] - Force reload from server, bypassing cache
	 * @returns {Promise<{count: number, data: any[]}>} Promise that resolves to paginated data
	 * 
	 * @example
	 * ```typescript
	 * // Basic read with caching
	 * const result = await this.read();
	 * 
	 * // Read with query parameters
	 * const result = await this.read({ Page: 1, PageSize: 10, Keyword: 'search' });
	 * 
	 * // Force reload from server
	 * const result = await this.read(null, true);
	 * ```
	 */
	read(query: any = null, forceReload = false) {
		var that = this;
		dog && console.log('🚀 [CommonService] read', this.apiPath.getList.url());
		if (this.allowCache && forceReload == false) {
			return new Promise(function (resolve, reject) {
				that.commonService
					.connectLocal(that.apiPath.getList, query, that.searchField)
					.then((data) => {
						resolve(data);
					})
					.catch((err) => {
						that.readServer(query)
							.then((data) => {
								resolve(data);
							})
							.catch((err) => {
								that.commonService.checkError(err);
								reject(err);
							});
					});
			});
		} else {
			return this.readServer(query);
		}
	}

	/**
	 * @description Reads data directly from the server, bypassing cache
	 * @param {any} [query=null] - Query parameters for filtering and pagination
	 * @returns {Promise<{count: number, data: any[]}>} Promise that resolves to server data
	 * 
	 * @example
	 * ```typescript
	 * // Read from server with query
	 * const result = await this.readServer({ Page: 1, PageSize: 20 });
	 * ```
	 */
	readServer(query: any = null) {
		var that = this;
		return new Promise(function (resolve, reject) {
			let apiPath = that.apiPath.getList;
			that.commonService
				.connect(apiPath.method, apiPath.url(), query)
				.toPromise()
				.then((data: any) => {
					var result = { count: data.length, data: data };
					if (that.allowCache) {
						// Store in cache with service-specific config
						if (that.cacheConfig?.enable) {
							// Use env service to access cache service
							dog && console.log('🚀 [CommonService] setStorage', apiPath.url());
							that.cacheConfig.query = query;
							that.commonService.env.setStorage(apiPath.url(), data, that.cacheConfig, that.serviceName);
						}
						resolve(result);
					} else {
						resolve(result);
					}
				})
				.catch((err) => {
					that.commonService.checkError(err);
					reject(err);
				});
		});
	}

	/**
	 * @description Performs a search operation using the search API endpoint
	 * @param {any} [query=null] - Search query parameters
	 * @returns {Observable<any>} Observable that emits search results
	 * 
	 * @example
	 * ```typescript
	 * // Search with parameters
	 * this.search({ Keyword: 'john', Category: 'user' }).subscribe(results => {
	 *   console.log('Search results:', results);
	 * });
	 * ```
	 */
	search(query: any = null) {
		let apiPath = this.apiPath.getSearchList;
		return this.commonService.connect(apiPath.method, apiPath.url(), query);
	}

	/**
	 * @description Saves an item (creates new or updates existing)
	 * @param {any} item - The item to save
	 * @param {boolean} [isForceCreate=false] - Force creation of new item even if ID exists
	 * @returns {Promise<any>} Promise that resolves to the saved item
	 * 
	 * @example
	 * ```typescript
	 * // Save new item
	 * const newItem = { Name: 'John Doe', Email: 'john@example.com' };
	 * const savedItem = await this.save(newItem);
	 * 
	 * // Update existing item
	 * const updatedItem = { Id: 123, Name: 'John Updated' };
	 * const result = await this.save(updatedItem);
	 * 
	 * // Force create new item
	 * const result = await this.save(itemWithId, true);
	 * ```
	 */
	save(item, isForceCreate = false) {
		return this.commonService.save(item, this.apiPath, isForceCreate);
	}

	/**
	 * @description Submits items for approval workflow
	 * @param {any} items - Items to submit for approval
	 * @param {any} apiPath - API path for approval submission
	 * @returns {Promise<any>} Promise that resolves to approval result
	 * 
	 * @example
	 * ```typescript
	 * const items = [{ Id: 1 }, { Id: 2 }];
	 * const result = await this.submitForApproval(items, this.apiPath);
	 * ```
	 */
	submitForApproval(items: any, apiPath) {
		return this.commonService.submitForApproval(items, this.apiPath);
	}

	/**
	 * @description Approves items in the approval workflow
	 * @param {any} items - Items to approve
	 * @param {any} apiPath - API path for approval
	 * @returns {Promise<any>} Promise that resolves to approval result
	 * 
	 * @example
	 * ```typescript
	 * const items = [{ Id: 1 }, { Id: 2 }];
	 * const result = await this.approve(items, this.apiPath);
	 * ```
	 */
	approve(items: any, apiPath) {
		return this.commonService.approve(items, this.apiPath);
	}

	/**
	 * @description Disapproves items in the approval workflow
	 * @param {any} items - Items to disapprove
	 * @param {any} apiPath - API path for disapproval
	 * @returns {Promise<any>} Promise that resolves to disapproval result
	 * 
	 * @example
	 * ```typescript
	 * const items = [{ Id: 1 }, { Id: 2 }];
	 * const result = await this.disapprove(items, this.apiPath);
	 * ```
	 */
	disapprove(items: any, apiPath) {
		return this.commonService.disapprove(items, this.apiPath);
	}

	/**
	 * @description Deletes items (soft delete by default)
	 * @param {any} items - Items to delete
	 * @returns {Promise<any>} Promise that resolves to deletion result
	 * 
	 * @example
	 * ```typescript
	 * const items = [{ Id: 1 }, { Id: 2 }];
	 * const result = await this.delete(items);
	 * ```
	 */
	delete(items) {
		return this.commonService.delete(items, this.apiPath);
	}

	/**
	 * @description Cancels items (reverses pending operations)
	 * @param {any} items - Items to cancel
	 * @returns {Promise<any>} Promise that resolves to cancellation result
	 * 
	 * @example
	 * ```typescript
	 * const items = [{ Id: 1 }, { Id: 2 }];
	 * const result = await this.cancel(items);
	 * ```
	 */
	cancel(items) {
		return this.commonService.cancel(items, this.apiPath);
	}

	/**
	 * @description Enables or disables items
	 * @param {any} items - Items to enable/disable
	 * @param {boolean} [IsDisabled=true] - Set to false to enable items
	 * @returns {Promise<any>} Promise that resolves to enable/disable result
	 * 
	 * @example
	 * ```typescript
	 * // Disable items
	 * const items = [{ Id: 1 }, { Id: 2 }];
	 * const result = await this.disable(items);
	 * 
	 * // Enable items
	 * const result = await this.disable(items, false);
	 * ```
	 */
	disable(items, IsDisabled = true) {
		if (!IsDisabled) {
			return this.commonService.enable(items, this.apiPath);
		} else {
			return this.commonService.disable(items, this.apiPath);
		}
	}

	/**
	 * @description Changes the branch for items
	 * @param {any} item - Item with branch information
	 * @returns {Promise<any>} Promise that resolves to branch change result
	 * 
	 * @example
	 * ```typescript
	 * const item = { Id: 1, IDBranch: 5 };
	 * const result = await this.changeBranch(item);
	 * ```
	 */
	changeBranch(item) {
		return this.commonService.changeBranch(item, this.apiPath);
	}

	/**
	 * @description Imports data from a file
	 * @param {File} fileToUpload - File to import data from
	 * @returns {Promise<any>} Promise that resolves to import result
	 * 
	 * @example
	 * ```typescript
	 * const fileInput = document.getElementById('fileInput');
	 * const file = fileInput.files[0];
	 * const result = await this.import(file);
	 * ```
	 */
	import(fileToUpload: File) {
		return this.commonService.import(this.apiPath, fileToUpload);
	}

	/**
	 * @description Exports data based on query parameters
	 * @param {any} query - Query parameters for export
	 * @returns {Promise<any>} Promise that resolves to export result
	 * 
	 * @example
	 * ```typescript
	 * const query = { Format: 'excel', DateFrom: '2023-01-01', DateTo: '2023-12-31' };
	 * const result = await this.export(query);
	 * ```
	 */
	export(query) {
		return this.commonService.export(this.apiPath, query);
	}

	/**
	 * @description Uploads a file to the server
	 * @param {File} fileToUpload - File to upload
	 * @returns {Promise<any>} Promise that resolves to upload result
	 * 
	 * @example
	 * ```typescript
	 * const fileInput = document.getElementById('fileInput');
	 * const file = fileInput.files[0];
	 * const result = await this.upload(file);
	 * ```
	 */
	upload(fileToUpload: File) {
		return this.commonService.upload(this.apiPath, fileToUpload);
	}

	/**
	 * @description Downloads data or files based on query parameters
	 * @param {any} query - Query parameters for download
	 * @returns {Promise<any>} Promise that resolves to download result
	 * 
	 * @example
	 * ```typescript
	 * const query = { Id: 123, Format: 'pdf' };
	 * const result = await this.download(query);
	 * ```
	 */
	download(query) {
		return this.commonService.download(this.apiPath, query);
	}
}
