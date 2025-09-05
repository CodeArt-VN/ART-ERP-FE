import { forwardRef, Inject, Injectable, Injector } from '@angular/core';
import { Network } from '@capacitor/network';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import * as signalR from '@microsoft/signalr';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Observer, Subject, fromEvent, merge, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment, dog } from 'src/environments/environment';
import { lib } from '../static/global-functions';
import { StorageService } from './storage.service';
import { DynamicTranslateLoaderService } from './translate-loader.service';
import { MigrationService } from './migration.service';
import { CacheManagementService } from './cache-management.service';
import { EVENT_TYPE } from '../static/event-type';
import { UserProfile } from '../../interfaces/auth.interfaces';
import { UserContextService } from '../auth/user-context.service';
import { CacheConfig } from '../static/search-config';
import { NavigationEnd, Router } from '@angular/router';
import { SYS_StatusProvider, SYS_TypeProvider } from '../static/services.service';

let ga: any;
if ((window as any).ga) {
	ga = (window as any).ga;
}

@Injectable({
	providedIn: 'root',
})
/**
 * This service allows manipulation of environment variables
 * @class EnvService
 */
export class EnvService {
	public app = {
		version: 'v' + environment.appVersion,
		theme: 'default-theme',
		isOnline: false,
		tenant: {
			current: environment.appDomain,
			list: environment.appServers,
		},
	};

	private pv: any = {
		rawBranchList: [],
		statusList: [],
		typeList: [],
		tenantReadySubject: new Subject<string>(),
		lastMessage: '',
	};

	/** Check app is ready */
	public ready: Promise<any> | null;

	/** Get current logged in user */
	public user: UserProfile | any = null;

	constructor(
		public storage: CacheManagementService,
		public userContext: UserContextService,

		private router: Router,
		private toastController: ToastController,
		private alertCtrl: AlertController,
		private loadingController: LoadingController,
		private translate: TranslateService,
		private dynamicTranslateLoader: DynamicTranslateLoaderService
	) {
		dog && console.log('👤 [EnvService] Constructor');
		this.ready = new Promise((resolve, reject) => {
			this.storage.tracking().subscribe((tracking) => {
				if (tracking) {
					this.preloadServices()
						.then((_) => {
							resolve(true);
							this.loadServices();
						})
						.catch(reject);
				}
			});
		});
	}

	public languageTracking = new Subject<any>();

	/**
	 * The lang currently used
	 */
	public language: any = {
		default: 'vi-VN',
		current: '',
		isDefault: false,
	};

	/** Get all flat tree branch list */
	public branchList = [];

	/** Get all job title list */
	public jobTitleList = [];

	/** Get current branch id */
	public get selectedBranch() {
		return this.storage.app.selectedBranch;
	}

	/** Get current branch id and all children branch ids */
	public selectedBranchAndChildren = null;

	/** Check is map library loaded */
	public isMapLoaded = false;

	/** Get all Address subdivision */
	public addressSubdivisionList = [];

	/** Get current app domain */
	get appPath() {
		return window.location.origin + environment.appLocation + environment.versionLocation.replace('{{REPLACE_VERSION}}', environment.appVersion);
	}

	/** FCM token */
	public NotifyToken;

	/** app event tracking */
	public EventTracking = new Subject<any>();

	/**
	 * Publish event for application
	 * Can be used to transfer data anywhere on the app
	 *
	 * @param data Data to transfer, data.Code is recommended
	 */
	publishEvent(data: any) {
		this.EventTracking.next(data);
	}

	/** Get enviroment event tracking */
	getEvents(): Subject<any> {
		return this.EventTracking;
	}

	/** Check window network event */
	trackOnline() {
		return merge<any>(
			fromEvent(window, 'offline').pipe(map(() => false)),
			fromEvent(window, 'online').pipe(map(() => true)),
			new Observable((sub: Observer<boolean>) => {
				sub.next(navigator.onLine);
				sub.complete();
			})
		);
	}

	showBarMessage(id = '', icon = '', color = '', isShow = true, isBlink = false) {
		this.publishEvent({
			Code: EVENT_TYPE.APP.SHOW_APP_MESSAGE,
			IsShow: isShow,
			Id: id,
			Icon: icon,
			IsBlink: isBlink,
			Color: color,
		});
	}
	/**
	 * Translate message and pass to showMessage method
	 *
	 * @param message The message in en-US language
	 * @param [color=''] The color of message
	 * @param [value=null] The value to bind in message
	 * @param duration The time (ms) to show message
	 * @param showCloseButton Show a close button instead of turning itself off (use alert instead of toast)
	 */
	showMessage(message, color = '', value = null, duration = 5000, showCloseButton = false, subHeader = '', header = '') {
		if (typeof value === 'string') value = { value: value };
		Promise.all([
			this.translateResource(value ? { ...value, code: message } : message),
			this.translateResource(value ? { ...value, code: subHeader } : subHeader),
			this.translateResource(value ? { ...value, code: header } : header),
		]).then((values: any) => {
			let translatedMessage = values[0];
			// Check if translatedMessage is an array, if so, join it with a line break
			if (Array.isArray(translatedMessage)) {
				translatedMessage = translatedMessage.join('<br>');
			}

			if (this.pv.lastMessage == translatedMessage) return;
			this.pv.lastMessage = translatedMessage;

			setTimeout(() => {
				this.pv.lastMessage = '';
			}, 5000);

			if (!showCloseButton) {
				this.toastController
					.create({
						message: translatedMessage,
						color: color,
						duration: duration,
						buttons: [showCloseButton ? { text: 'Close', role: 'close' } : {}],
					})
					.then((toast) => {
						toast.present();
					});
			} else {
				this.alertCtrl
					.create({
						header: values[2],
						subHeader: values[1],
						message: translatedMessage,
						buttons: [
							{
								text: 'OK',
								cssClass: 'danger-btn',
								handler: () => {},
							},
						],
					})
					.then((alert) => {
						alert.present();
					});
			}
		});
	}

	showErrorMessage(err) {
		if (err.error?.ExceptionMessage) {
			try {
				let message = JSON.parse(err.error.ExceptionMessage);
				this.showMessage(message.Message, 'danger', message, 5000, true, message.SubHeader, message.Header);
			} catch (e) {
				this.showMessage(err.error.ExceptionMessage, 'danger');
			}
		} else this.showMessage(err.error?.Message || 'Cannot save, please try again', 'danger');
	}

	/** @deprecated Deprecated, do not use. */
	showAlert(message, subHeader = null, header = null, okText = 'Ok') {
		Promise.all([this.translateResource(message), this.translateResource(subHeader), this.translateResource(header), this.translateResource(okText)]).then((values) => {
			let option: any = {
				header: values[2],
				subHeader: values[1],
				message: values[0],
				buttons: [
					{
						text: values[3],
						cssClass: 'danger-btn',
						handler: () => {},
					},
				],
			};

			this.alertCtrl.create(option).then((alert) => {
				alert.present();
			});
		});
	}

	/**
	 * Show prompt message question.
	 * @param message The message to show
	 * @param subHeader The small text abow message
	 * @param header The header of the message
	 * @param okText OK button text
	 * @param cancelText Cancel button text
	 * @param inputs Extra input
	 * @returns Promise resolve if end-user click ok button, reject if not.
	 */
	showPrompt(message, subHeader = null, header = null, okText = 'Ok', cancelText = 'Cancel', inputs = null) {
		return new Promise((resolve, reject) => {
			Promise.all([
				this.translateResource(message),
				this.translateResource(subHeader),
				this.translateResource(header),
				this.translateResource(okText),
				this.translateResource(cancelText),
			]).then((values: any) => {
				const headerUPPER = values[2] ? values[2].toUpperCase() : '';
				let option: any = {
					header: headerUPPER,
					subHeader: values[1],
					message: values[0],
					buttons: [],
				};

				if (cancelText)
					option.buttons.push({
						text: values[4],
						role: 'cancel',
						handler: () => {
							reject(false);
						},
					});

				if (okText) {
					option.buttons.push({
						text: values[3],
						cssClass: 'danger-btn',
						handler: (alertData) => {
							resolve(alertData);
						},
					});
				}

				if (inputs) option.inputs = inputs;

				this.alertCtrl.create(option).then((alert) => {
					alert.present();
				});
			});
		});
	}

	/**
	 * Show loading message to end-user
	 * @param message The message to show
	 * @param promise The promise funtion to wait
	 * @returns Resolve if the promise funtion completed
	 */
	showLoading(message, promise) {
		return new Promise((resolve, reject) => {
			this.translateResource(message).then((transMessage: string) => {
				this.loadingController.create({ cssClass: 'my-custom-class', message: transMessage }).then((loading) => {
					loading.present();
					setTimeout(() => {
						if (typeof promise == 'function') promise = promise();
						promise
							.then((result) => {
								if (loading) loading.dismiss();
								resolve(result);
							})
							.catch((err) => {
								if (loading) loading.dismiss();
								reject(err);
							});
					}, 0);
				});
			});
		});
	}

	actionConfirm(action, length, itemName, title, promise) {
		let actionText = 'ACTION_' + action.toUpperCase();
		return new Promise((resolve, reject) => {
			this.showPrompt(
				{ code: 'ACTION_CONFIRM_MESSAGE', action: actionText, count: length, value: itemName },
				{ code: 'ACTION_CONFIRM_SUBHEADER', action: actionText, count: length, value: itemName },
				{ code: 'ACTION_CONFIRM_HEADER', action: actionText, title: title }
			)
				.then((_) => {
					this.showLoading('Please wait for a few moments', promise())
						.then((result) => {
							resolve(result);
						})
						.catch((err) => {
							reject(err);
						});
				})
				.catch((e) => {
					reject('User abort action');
				});
		});
	}

	public async setLang(value?: string) {
		value = value || this.language.default;
		let hasResource = !!this.translate.translations[value] && Object.keys(this.translate.translations[value]).length > 0;

		if (!hasResource) {
			try {
				const translations = await firstValueFrom(this.dynamicTranslateLoader.getTranslation(value));
				if (translations && Object.keys(translations).length > 0) {
					this.translate.setTranslation(value, translations);
					dog && console.log('Language loaded successfully via dynamic loader');
					hasResource = true;
				}
			} catch (error) {
				dog && console.error('Failed to set language:', error);
			}
		}

		this.translate.use(value);
		this.language.current = value;
		this.language.isDefault = value === this.language.default;
		this.languageTracking.next(this.language);

		this.setStorage('Lang', value, { enable: true, timeToLive: 365 * 24 * 60 });
		this.publishEvent({ Code: EVENT_TYPE.APP.CHANGE_LANGUAGE, Value: value });
	}

	translateResource(resource) {
		return new Promise((resolve) => {
			if (resource == null) {
				resolve(null);
			}
			// Check if resource ís an array then translate each item and return an array of translated items
			else if (Array.isArray(resource)) {
				Promise.all(resource.map((item) => this.translateResource(item))).then((translatedItems) => {
					resolve(translatedItems);
				});
			} else {
				let key = typeof resource === 'object' ? resource.code : resource;
				let value = typeof resource === 'object' ? resource : { value: null };

				if (resource.action) {
					this.translate.get(resource.action).subscribe((translatedValue: string) => {
						resource.action = translatedValue;
						this.translate.get(key, value).subscribe((translatedValue: string) => {
							resolve(translatedValue);
						});
					});
				} else {
					if (!key) resolve('');
					else
						this.translate.get(key, value).subscribe((translatedValue: string) => {
							resolve(translatedValue);
						});
				}
			}
		});
	}

	/**
	 * Get storage
	 * @param key The key to get storage
	 * @returns Return the storage
	 */
	getStorage(key: string, query: any = null, branch: string = this.storage.app.selectedBranch) {
		return this.storage.get(key, this.app.tenant.current, branch, query);
	}

	/**
	 * Set storage value
	 * @param key The key to set storage
	 * @param value The value to save
	 * @returns Return promise
	 */
	setStorage(key: string, value: any, config: CacheConfig = null, branch: string = this.storage.app.selectedBranch, serviceName: string = 'Manual') {
		return this.storage.set(key, value, config, this.app.tenant.current, branch, serviceName);
	}

	/**
	 * Clear all storage value
	 * @returns Return promise
	 */
	clearStorage() {
		return this.storage.clear()!;
	}

	/**
	 * Set cookie value
	 * @param name Name of cookie
	 * @param value The value to save
	 * @param days Number of days to save
	 */
	setCookie(name, value, days) {
		var expires = '';
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			expires = '; expires=' + date.toUTCString();
		}
		document.cookie = name + '=' + (value || '') + expires + '; path=/';
	}

	/**
	 * Get cookie value
	 * @param name Name of cookie
	 * @returns Cookie value
	 */
	getCookie(name) {
		var nameEQ = name + '=';
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}

	/**
	 * Clear cookie value
	 * @param name Name of cookie
	 */
	clearCookie(name) {
		document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}

	/**
	 * Build branch tree from rawBranchList
	 * @returns Return promise
	 */
	loadBranch() {
		return new Promise((resolve) => {

			// Check if rawBranchList is different from user.BranchList
			if(JSON.stringify(this.pv.rawBranchList) == JSON.stringify(this.user.BranchList)) {
				dog && console.log('🌲 [EnvService] Branch list is the same as user.BranchList');
				resolve(true);
				return;
			}
			dog && console.log('🌲 [EnvService] Branch list is different from user.BranchList');
			this.pv.rawBranchList = this.user.BranchList;
			this.branchList = [];
			this.jobTitleList = [];

			for (let ix = 0; ix < this.pv.rawBranchList.length; ix++) {
				const i: any = this.pv.rawBranchList[ix];
				i.Name = i.ShortName ? i.ShortName : i.Name;
				i.disabled = true;
				if (i.Type != 'TitlePosition') {
					this.branchList.push(i);
				}
				this.jobTitleList.push(Object.assign({}, i));
			}
			for (let ix = 0; ix < this.branchList.length; ix++) {
				const i: any = this.branchList[ix];
				i.IDs = [null];
				this.getChildrenDepartmentID(i.IDs, i.Id);
			}

			for (let ix = 0; ix < this.branchList.length; ix++) {
				const i: any = this.branchList[ix];
				i.Query = JSON.stringify(i.IDs);
			}

			if (this.user) {
				for (let ix = 0; ix < this.user.Branchs.length; ix++) {
					const b = this.user.Branchs[ix];
					this.enablePermissionNode(b, this.branchList);
					this.enablePermissionNode(b, this.jobTitleList);
				}
				setTimeout(() => {
					for (let ix = 0; ix < this.jobTitleList.length; ix++) {
						const i: any = this.jobTitleList[ix];
						if (i.Type != 'TitlePosition') {
							i.disabled = true;
						}
					}
				}, 0);

				this.branchList = [...this.branchList];
			}

			let selected: any = null;

			if (this.storage.app.selectedBranch) {
				selected = this.branchList.find((d) => d.Id == this.storage.app.selectedBranch && d.disabled == false);
			}
			if (!selected) {
				selected = this.branchList.find((d) => d.Id == this.user.IDBranch);
			}

			if (selected) {
				this.changeBranch(selected.Id);
			} else {
				dog && console.error('🌲 [EnvService] Selected branch is not found');
				debugger;
				this.changeBranch(null);
			}

			resolve(true);
		});
	}

	/**
	 * Change enviroment selected branch and publish changeBranch event to app
	 */
	changeBranch(branchId) {
		dog && console.log('🌲 [EnvService] Changing branch to:', branchId);
		this.setStorage('SelectedBranch', branchId, { enable: true, timeToLive: 365 * 24 * 60 }, null);
		let selectedBranch = this.branchList.find((d) => d.Id == this.storage.app.selectedBranch);
		this.selectedBranchAndChildren = selectedBranch?.Query || [];
		this.publishEvent({ Code: EVENT_TYPE.TENANT.BRANCH_SWITCHED });
	}

	/**
	 * Check form permission
	 * @param functionCode Function code to check permission
	 * @returns Return promise and resolve true if have permission
	 */
	checkFormPermission(functionCode) {
		return new Promise<boolean>((resolve) => {
			//Chưa đăng nhập
			if (!this.user || !this.user.Id) {
				resolve(false);
			} else {
				if (functionCode == '/default') {
					resolve(false);
				} else if (functionCode == '/not-found') {
					resolve(true);
				} else {
					functionCode = functionCode + '/';
					let form = this.user.Forms.find((d) => functionCode.startsWith('/' + d.Code + '/') && (d.Type == 0 || d.Type == 1 || d.Type == 2));
					resolve(form != null);
				}
			}
		});
	}

	/**
	 * Get status list by parent Code
	 * @param Code Parent status code
	 * @returns Return promise and resolve all children status list
	 */
	getStatus(Code: string): Promise<any[]> {
		return new Promise((resolve) => {
			let it = this.pv.statusList.find((d) => d.Code == Code);
			if (it) resolve(this.pv.statusList.filter((d) => d.IDParent == it.Id));
			else resolve([]);
		});
	}

	/**
	 * Get system type by parent Code
	 * @param Code Parent type Code
	 * @param AllChild True will return flat tree type
	 * @returns Return promise and Resolve type list
	 */
	getType(Code: string, AllChild = false): Promise<any[]> {
		return new Promise((resolve) => {
			let it = this.pv.typeList.find((d) => d.Code == Code);
			if (it) {
				if (AllChild) {
					let ids = lib.findChildren(this.pv.typeList, it.Id);
					let childs = this.pv.typeList.filter((d) => ids.includes(d.Id));
					lib.buildFlatTree(childs, [], true, it).then((result: any) => {
						resolve(result);
					});
				} else resolve(this.pv.typeList.filter((d) => d.IDParent == it.Id));
			} else resolve([]);
		});
	}

	async getTypeAsync(Code: string, AllChild = false) {
		let it = this.pv.typeList.find((d) => d.Code == Code);
		if (it) {
			if (AllChild) {
				let ids = lib.findChildren(this.pv.typeList, it.Id);
				let childs = this.pv.typeList.filter((d) => ids.includes(d.Id));
				return await lib.buildSubNode(childs, [], it, []); //await lib.buildFlatTree(childs, [], true, it);
			} else return this.pv.typeList.filter((d) => d.IDParent == it.Id);
		} else return [];
	}

	/**
	 * Get branch by parent Id
	 * @param Id Id parent branch
	 * @param AllChild True will return flat tree list
	 * @returns Return promise and Resolve branch list
	 */
	getBranch(Id: number, AllChild = false): Promise<any[]> {
		return new Promise((resolve) => {
			let it = this.branchList.find((d) => d.Id == Id);
			if (it) {
				if (AllChild) {
					let ids = lib.findChildren(this.branchList, it.Id);
					let childs = this.branchList.filter((d) => ids.includes(d.Id));
					lib.buildFlatTree(childs, [], true, it).then((result: any) => {
						resolve(result);
					});
				} else resolve(this.branchList.filter((d) => d.IDParent == it.Id));
			} else resolve([]);
		});
	}

	searchBranch(predicate: (branch: any) => boolean): Promise<any[]> {
		return new Promise((resolve) => {
			// Find all branches that match the predicate
			const matchedBranches = this.pv.rawBranchList.filter(predicate);

			// Collect all parent IDs
			const parentIds = new Set<number>();
			matchedBranches.forEach((branch) => {
				let currentBranch = branch;
				while (currentBranch.IDParent) {
					parentIds.add(currentBranch.IDParent);
					currentBranch = this.pv.rawBranchList.find((b) => b.Id === currentBranch.IDParent);
					if (!currentBranch) break;
				}
			});

			// Include all parent branches
			const result = this.pv.rawBranchList.filter((branch) => parentIds.has(branch.Id) || matchedBranches.includes(branch));

			resolve(lib.cloneObject(result));
		});
	}

	getWarehouses(getParents = true, IgnoredSelectedBranch = false): Promise<any[]> {
		return new Promise((resolve) => {
			this.searchBranch((branch) => branch.Type === 'Warehouse' && (this.selectedBranchAndChildren.includes(branch.Id) || IgnoredSelectedBranch)).then((warehouses) => {
				if (getParents) {
					resolve(warehouses);
				} else {
					resolve(warehouses.filter((d) => d.Type === 'Warehouse'));
				}
			});
		});
	}

	/**
	 * Get job title list by parent Id
	 * @param Id Id parent
	 * @param AllChild True will return flat tree
	 * @returns Return promise and Resolve job title list
	 */
	getJobTitle(Id: number, AllChild = false): Promise<any[]> {
		return new Promise((resolve) => {
			let it = this.jobTitleList.find((d) => d.Id == Id);
			if (it) {
				if (AllChild) {
					let ids = lib.findChildren(this.jobTitleList, it.Id);
					let childs = this.jobTitleList.filter((d) => ids.includes(d.Id));
					lib.buildFlatTree(childs, [], true, it).then((result: any) => {
						resolve(result);
					});
				} else resolve(this.jobTitleList.filter((d) => d.IDParent == it.Id));
			} else resolve([]);
		});
	}

	/**
	 * Initialize environment as central controller
	 * This is the main entry point for environment setup
	 */
	private async preloadServices(): Promise<void> {
		dog && console.log('🚀 [EnvService] Starting environment initialization...');
		try {
			dog && console.log('📋 [EnvService] Loading environment configuration...');
			await this.loadEnvironmentConfig();

			await this.initializeUserContext();
		} catch (error) {
			dog && console.error('❌ [EnvService] Environment initialization failed:', error);
			throw error;
		}
	}
	private async loadEnvironmentConfig(): Promise<void> {
		dog && console.log('📋 [EnvService] Loading environment configuration...');
		if (this.language.current != this.storage.app.lang) {
			this.language.current = this.storage.app.lang;
		}
		this.setLang(this.storage.app.lang);
	}

	private async initializeUserContext() {
		try {
			dog && console.log('👤 [EnvService] Initializing user context...');
			let that = this;
			//Track tenant context
			this.userContext.getUserTenant().subscribe(async (tenant) => {
				if (tenant) {
					that.app.tenant.current = tenant.id;
					dog && console.log('🏢 [EnvService] Tenant context subscribe:', tenant);
				}
			});

			//Track user context
			this.userContext.getCurrentUser().subscribe(async (user) => {
				if (user) {
					dog && console.log('👤 [EnvService] User context subscribe:', user);
					if (user.Id) {
						that.user = user;
						that.loadBranch();
					} else {
						that.user = null;
						that.pv.rawBranchList = [];
						that.branchList = [];
						that.jobTitleList = [];

						that.publishEvent({ Code: EVENT_TYPE.USER.LOGGED_OUT_REMOTE });
					}
					that.publishEvent({ Code: EVENT_TYPE.USER.CONTEXT_UPDATED });
				}
			});

			this.storage.get('SYS_Type').then((data) => (this.pv.typeList = data || []));
			this.storage.get('SYS_Status').then((data) => (this.pv.statusList = data || []));
		} catch (error) {
			dog && console.error('Error initializing context:', error);
			throw error;
		}
	}

	private async loadServices(): Promise<void> {
		dog && console.log('🚀 [EnvService] continue environment initialization...');

		try {
			this.setupNetworkMonitoring();
			this.storage.getCacheRegistry$().subscribe((cacheRegistry) => {
				if (dog && Array.isArray(cacheRegistry)) {
					const tableData = cacheRegistry.map((item) => ({
						key: item.key,
						tenant: item.tenant,
						branch: item.branch,
						timeToLive: item.timeToLive,
						expiresAt: lib.dateFormat(item.expiresAt, 'dd/mm/yy hh:MM'),
						version: item.version,
						status: item.status,
						accessCount: item.accessCount,
					}));
					console.table(tableData, ['key', 'tenant', 'branch', 'timeToLive', 'expiresAt', 'version', 'status', 'accessCount']);
				}
			});
			await this.setupDataStreams();
			dog && console.log('✅ [EnvService] Environment initialization completed successfully');

			// Notify UI that environment is ready
			this.publishEvent({ Code: EVENT_TYPE.APP.ENVIRONMENT_READY, Value: null });

			// Setup analytics after environment is ready
			this.setupAnalytics();
		} catch (error) {
			dog && console.error('❌ [EnvService] Environment initialization failed:', error);
			throw error;
		}
	}

	private async setupDataStreams(): Promise<void> {
		dog && console.log('🌊 [EnvService] Setting up data streams...');
		try {
			this.setupSignalR();
			// // Setup real-time data streams
			// await this.setupRealTimeStreams();

			// // Setup data synchronization
			// await this.setupDataSync();

			// // Setup offline data handling
			// await this.setupOfflineDataHandling();

			dog && console.log('Data streams setup completed');
		} catch (error) {
			dog && console.error('Failed to setup data streams:', error);
			throw error;
		}
	}

	/** @deprecated Deprecated, do not use. */
	private enablePermissionNode(id, list) {
		let currentItem = list.find((i) => i.Id == id);
		if (currentItem) {
			currentItem.disabled = false;
			lib.markNestedNode(list, id, 'disabled', true);
		}
	}

	/** @deprecated Deprecated, do not use. */
	private getChildrenDepartmentID(ids, id) {
		ids.push(id);
		let children = this.branchList.filter((i) => i.IDParent == id);
		for (let ix = 0; ix < children.length; ix++) {
			const i = children[ix];
			this.getChildrenDepartmentID(ids, i.Id);
		}
	}

	/**
	 * Setup SignalR (moved from init)
	 */
	private setupSignalR(): void {
		const signalRConnection = new signalR.HubConnectionBuilder()
			.configureLogging(signalR.LogLevel.Information)
			.withUrl(environment.signalRServiceDomain + 'notify')
			.withAutomaticReconnect()
			.build();

		signalRConnection
			.start()
			.then(() => dog && console.log('SignalR Connected!'))
			.catch((err) => dog && console.error('SignalR connection failed:', err));

		// Add existing event handlers
		signalRConnection.on('BroadcastMessage', (e) => {
			switch (e.code) {
				case 'POSOrderPaymentUpdate':
				case 'POSOrderFromCustomer':
				case 'POSOrderFromStaff':
				case 'POSSupport':
				case 'POSCallToPay':
				case 'POSLockOrderFromStaff':
				case 'POSLockOrderFromCustomer':
				case 'POSUnlockOrderFromStaff':
				case 'POSUnlockOrderFromCustomer':
				case 'POSLockOrder':
				case 'POSUnlockOrder':
				case 'POSOrderSplittedFromStaff':
				case 'POSOrderMergedFromStaff':
				case 'SOPaymentUpdate':
					e.code = 'app:' + e.code;
					this.publishEvent(e);
					break;
				case EVENT_TYPE.SYSTEM.RELOAD:
					location.reload();
					break;
				case EVENT_TYPE.SYSTEM.MESSAGE:
					this.showMessage(e.value, e.name);
					break;
				case EVENT_TYPE.SYSTEM.RELOAD_OLD_VERSION:
					if (e.value.localeCompare(this.app.version) > 0) {
						location.reload();
					}
					break;
				case EVENT_TYPE.SYSTEM.ALERT:
					this.showAlert(e.value, null, e.name);
					break;
				default:
					break;
			}
		});

		signalRConnection.on('SendMessage', (user, message) => {
			dog && console.log('SendMessage', user, message);
		});

		signalRConnection.on('SaleOrdersUpdated', (IDBranch, Ids) => {
			dog && console.log('SaleOrdersUpdated', IDBranch, Ids);
			this.publishEvent({ Code: EVENT_TYPE.SALE.ORDERS_UPDATED });
		});
	}

	/**
	 * Setup network monitoring
	 */
	private setupNetworkMonitoring(): void {
		Network.addListener('networkStatusChange', (status) => {
			this.publishEvent({ Code: EVENT_TYPE.APP.NETWORK_STATUS_CHANGE, status });
			dog && console.log('Network status changed', status);
		});

		this.trackOnline().subscribe((isOnline) => {
			this.app.isOnline = isOnline;
		});
	}

	/**
	 * Setup analytics for the user
	 * Migrated from AccountService.setupAnalytics()
	 */
	private setupAnalytics(): void {
		dog && console.log('📊 [EnvService] Setting up analytics...');

		this.router.events.subscribe((event: any) => {
			if (event instanceof NavigationEnd) {
				dog && console.log('🌲 [AppComponent] Navigation event:', event);

				if (ga) {
					ga('set', 'page', 'test/' + event.urlAfterRedirects);
					ga('send', 'pageview');
					console.log(event.urlAfterRedirects);
				}

				//console.log(event);
				// (<any>window).ga('set', 'page', event.urlAfterRedirects);
				// (<any>window).ga('send', 'pageview');
			}
		});

		if (this.user) {
			try {
				const woopraId = {
					id: this.user.Id,
					email: this.user.Email,
					name: this.user.FullName,
					avatar: this.user.Avatar,
				};

				dog && console.log('🆔 [EnvService] Analytic ID configured:', woopraId);

				// Setup Woopra tracking with retry mechanism
				let woopraInterval: any = setInterval(() => {
					if ((window as any)?.woopra) {
						dog && console.log('📈 [EnvService] Analytic identified');
						(window as any).woopra.identify(woopraId);
						(window as any).woopra.push();

						if (woopraInterval) {
							clearInterval(woopraInterval);
							woopraInterval = null;
						}

						dog && console.log('✅ [EnvService] Analytics setup completed');
					}
				}, 3000);
			} catch (error) {
				dog && console.error('❌ [EnvService] Analytics setup failed:', error);
			}
		} else {
			dog && console.log('🚫 [EnvService] No user available for analytics setup');
		}
	}
}
