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
import { DynamicTranslateLoaderService } from './dynamic-translate-loader.service';
import { MigrationService } from './migration.service';
import { EVENT_TYPE } from '../static/event-type';
import { UserProfile } from '../interfaces/auth.interfaces';

@Injectable({
	providedIn: 'root',
})
/**
 * This service allows manipulation of environment variables
 * @class EnvService
 */
export class EnvService {
	public languageTracking = new Subject<any>();

	/**
	 * The lang currently used
	 */
	language: any = {
		default: 'vi-VN',
		current: '',
		isDefault: false,
	};

	/**
	 * Set current language and translate resources
	 * @param value Language code: 'vi-VN' | 'en-US'
	 */
	async setLang(value: string) {
		if (!value) value = this.language.default;

		// Nếu đã có resource cho ngôn ngữ này thì chỉ cần dùng lại
		const hasResource = !!this.translate.translations[value] && Object.keys(this.translate.translations[value]).length > 0;
		if (hasResource) {
			this.translate.use(value);
			this.language.current = value;
			this.language.isDefault = value === this.language.default;
			this.setStorage('lang', value);
			this.languageTracking.next(this.language);
			return;
		}

		// Nếu chưa có resource thì mới load
		try {
			await this.loadLanguageForServer(value);
		} catch (error) {
			console.error('Failed to set language:', error);
			// Fallback to basic language setting
			this.translate.use(value);
			this.language.current = value;
		}
	}

	/** Get current app version */
	version = environment.appVersion;

	/** Tenant management properties */
	selectedTenant: string = environment.appDomain;
	tenantList: any[] = environment.appServers;
	isTenantLoaded = false;

	/** Observable to notify when tenant is loaded */
	private tenantReadySubject = new Subject<string>();
	public tenantReady$ = this.tenantReadySubject.asObservable();

	/** Static reference to tenant ready observable for external services */
	public static tenantReadySubject = new Subject<string>();
	public static tenantReady$ = EnvService.tenantReadySubject.asObservable();

	/** Get current logged in user */
	user: UserProfile = null;

	/** All cached config */
	configs: any[] = [];

	public configTracking = new Subject<any[]>();

	/** Check enviroment is loaded */
	isloaded = false;

	/** Get current device infomation */
	deviceInfo: any = null;

	/** All branch list */
	rawBranchList = [];

	/** Get all flat tree branch list */
	branchList = [];

	/** Get all job title list */
	jobTitleList = [];

	/** Get current branch id */
	selectedBranch = null;

	/** Get current branch id and all children branch ids */
	selectedBranchAndChildren = null;

	/** All system status list */
	statusList = [];

	/** All system type list */
	typeList = [];

	/** Check platform is mobile*/
	isMobile = false;

	/** Check is map library loaded */
	isMapLoaded = false;

	/** Get all Address subdivision */
	addressSubdivisionList = [];

	/** Get network infomation */
	networkInfo: any = {
		isOnline: false,
	};

	/** Get current app domain */
	get appPath() {
		return window.location.origin + environment.appLocation + environment.versionLocation.replace('{{REPLACE_VERSION}}', environment.appVersion);
	}

	/** Check app is ready */
	ready: Promise<any> | null;

	/** Last message was shown */
	lastMessage = '';

	/** FCM token */
	NotifyToken;

	/** app event tracking */
	public EventTracking = new Subject<any>();

	constructor(
		public plt: Platform,

		public storage: StorageService,
		public toastController: ToastController,
		public alertCtrl: AlertController,
		public loadingController: LoadingController,
		public translate: TranslateService,
		private dynamicTranslateLoader: DynamicTranslateLoaderService
	) {
		this.isMobile = this.plt.is('ios') || this.plt.is('android');
	}

	/**
	 * Initialize environment as central controller
	 * This is the main entry point for environment setup
	 */
	async initialize(): Promise<void> {
		dog && console.log('🚀 [EnvService] Starting environment initialization...');

		try {
			// Phase 1: Environment Setup (0-200ms)
			await this.loadEnvironmentConfig();
			await this.initializeCoreServices();
			await this.setupEventSystem();

			// Phase 2: Service Discovery (200-500ms)
			await this.discoverServices();
			await this.validateServiceHealth();
			await this.setupServiceConnections();

			// Phase 3: Data Initialization (500-800ms)
			//await this.loadSystemData();
			await this.initializeCacheLayers();
			await this.setupDataStreams();

			// Phase 4: User Context (800-1200ms)
			await this.loadUserSession();
			await this.initializeUserSettings();
			await this.setupUserPermissions();

			// Notify UI that environment is ready
			this.publishEvent({ Code: EVENT_TYPE.APP.ENVIRONMENT_READY, Value: null });

			// Setup analytics after environment is ready
			this.setupAnalytics();

			dog && console.log('✅ [EnvService] Environment initialization completed successfully');
		} catch (error) {
			dog && console.error('❌ [EnvService] Environment initialization failed:', error);
			throw error;
		}
	}

	/**
	 * Phase 1: Environment Setup
	 */
	private async loadEnvironmentConfig(): Promise<void> {
		dog && console.log('📋 [EnvService] Loading environment configuration...');
		await this.loadSelectedTenant();
		await this.checkVersion();
	}

	private async initializeCoreServices(): Promise<void> {
		dog && console.log('🔧 [EnvService] Initializing core services...');
		// Core services initialization logic
	}

	private async setupEventSystem(): Promise<void> {
		dog && console.log('📡 [EnvService] Setting up event system...');

		setTimeout(() => this.setupSignalR(), 100);

		// Network monitoring
		setTimeout(() => this.setupNetworkMonitoring(), 200);
	}

	/**
	 * Phase 2: Service Discovery
	 */
	private async discoverServices(): Promise<void> {
		dog && console.log('🔍 [EnvService] Discovering available services...');
		// Service discovery logic
	}

	private async validateServiceHealth(): Promise<void> {
		dog && console.log('🏥 [EnvService] Validating service health...');
		// Service health validation logic
	}

	private async setupServiceConnections(): Promise<void> {
		dog && console.log('🔗 [EnvService] Setting up service connections...');
		// Service connection setup logic
	}

	private async initializeCacheLayers(): Promise<void> {
		dog && console.log('💾 [EnvService] Initializing cache layers...');
		// Cache layer initialization logic
	}

	private async setupDataStreams(): Promise<void> {
		dog && console.log('🌊 [EnvService] Setting up data streams...');
		// Data stream setup logic
	}

	/**
	 * Phase 4: User Context
	 */
	private async loadUserSession(): Promise<void> {
		dog && console.log('👤 [EnvService] Loading user session...');
		// User session loading logic
	}

	private async initializeUserSettings(): Promise<void> {
		dog && console.log('⚙️ [EnvService] Initializing user settings...');
		// User settings initialization logic
	}

	private async setupUserPermissions(): Promise<void> {
		dog && console.log('🔐 [EnvService] Setting up user permissions...');
		// User permissions setup logic
	}

	/**
	 * Data Management Methods
	 */
	async getData<T>(key: string): Promise<T> {
		return await this.storage.get(key);
	}

	async setData<T>(key: string, value: T): Promise<void> {
		await this.storage.set(key, value);
	}

	/**
	 * Handle user actions from UI
	 */
	async handleUserAction(action: any): Promise<void> {
		dog && console.log('👤 [EnvService] Handling user action:', action);

		switch (action.type) {
			case 'LOGIN':
				// Business logic for login
				break;
			case 'LOGOUT':
				// Business logic for logout
				break;
			case 'CHANGE_BRANCH':
				// Business logic for branch change
				break;
			case 'CHANGE_THEME':
				// Business logic for theme change
				break;
			default:
				dog && console.log('⚠️ [EnvService] Unknown user action:', action);
		}
	}

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

			if (this.lastMessage == translatedMessage) return;
			this.lastMessage = translatedMessage;

			setTimeout(() => {
				this.lastMessage = '';
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
	getStorage(key: string) {
		return this.storage.get(key)!;
	}

	/**
	 * Set storage value
	 * @param key The key to set storage
	 * @param value The value to save
	 * @returns Return promise
	 */
	setStorage(key: string, value: any) {
		return this.storage.set(key, value)!;
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
			lib.buildFlatTree(this.rawBranchList, [], true).then((resp: any) => {
				this.rawBranchList = resp;
				this.branchList = [];
				this.jobTitleList = [];

				console.log('reset branch + jobTitleList');

				for (let ix = 0; ix < resp.length; ix++) {
					const i: any = resp[ix];
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

				this.getStorage('selectedBranch').then((val) => {
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

					if (val) {
						selected = this.branchList.find((d) => d.Id == val && d.disabled == false);
					}
					if (!selected) {
						selected = this.branchList.find((d) => d.Id == this.user.IDBranch);
					}

					if (selected) {
						this.selectedBranch = selected.Id;
						this.selectedBranchAndChildren = selected.Query;
					} else {
						this.selectedBranch = 0;
						this.selectedBranchAndChildren = [0];
					}

					resolve(true);
				});
			});
		});
	}

	/**
	 * Change enviroment selected branch and publish changeBranch event to app
	 */
	changeBranch() {
		this.setStorage('selectedBranch', this.selectedBranch);
		let selectedBranch = this.branchList.find((d) => d.Id == this.selectedBranch);
		this.selectedBranchAndChildren = selectedBranch.Query;
		this.publishEvent({ Code: EVENT_TYPE.TENANT.BRANCH_SWITCHED });

		this.configTracking.next(this.configs.filter((d) => d.IDBranch == this.selectedBranch));
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
			let it = this.statusList.find((d) => d.Code == Code);
			if (it) resolve(this.statusList.filter((d) => d.IDParent == it.Id));
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
			let it = this.typeList.find((d) => d.Code == Code);
			if (it) {
				if (AllChild) {
					let ids = lib.findChildren(this.typeList, it.Id);
					let childs = this.typeList.filter((d) => ids.includes(d.Id));
					lib.buildFlatTree(childs, [], true, it).then((result: any) => {
						resolve(result);
					});
				} else resolve(this.typeList.filter((d) => d.IDParent == it.Id));
			} else resolve([]);
		});
	}

	async getTypeAsync(Code: string, AllChild = false) {
		let it = this.typeList.find((d) => d.Code == Code);
		if (it) {
			if (AllChild) {
				let ids = lib.findChildren(this.typeList, it.Id);
				let childs = this.typeList.filter((d) => ids.includes(d.Id));
				return await lib.buildSubNode(childs, [], it, []); //await lib.buildFlatTree(childs, [], true, it);
			} else return this.typeList.filter((d) => d.IDParent == it.Id);
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
			const matchedBranches = this.rawBranchList.filter(predicate);

			// Collect all parent IDs
			const parentIds = new Set<number>();
			matchedBranches.forEach((branch) => {
				let currentBranch = branch;
				while (currentBranch.IDParent) {
					parentIds.add(currentBranch.IDParent);
					currentBranch = this.rawBranchList.find((b) => b.Id === currentBranch.IDParent);
					if (!currentBranch) break;
				}
			});

			// Include all parent branches
			const result = this.rawBranchList.filter((branch) => parentIds.has(branch.Id) || matchedBranches.includes(branch));

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

	// =================== NEW SERVER MANAGEMENT METHODS ===================

	/**
	 * Load selected tenant from storage
	 */
	async loadSelectedTenant(): Promise<string> {
		const stored = await this.getStorage('selectedTenant');
		if (stored && this.isValidTenant(stored)) {
			this.selectedTenant = stored;
			environment.appDomain = stored;
		} else {
			// Use default from environment
			this.selectedTenant = environment.appDomain;
		}

		this.isTenantLoaded = true;
		console.log('Selected tenant loaded:', this.selectedTenant);

		// Notify that tenant is ready (both instance and static)
		this.tenantReadySubject.next(this.selectedTenant);
		EnvService.tenantReadySubject.next(this.selectedTenant);

		return this.selectedTenant;
	}

	/**
	 * Switch tenant and reload language
	 */
	async switchTenant(serverCode: string): Promise<void> {
		if (!this.isValidTenant(serverCode)) {
			throw new Error(`Invalid tenant: ${serverCode}`);
		}

		const oldTenant = this.selectedTenant;
		this.selectedTenant = serverCode;
		environment.appDomain = serverCode;

		// Save to storage
		await this.setStorage('selectedTenant', serverCode);

		console.log('Tenant changed from', oldTenant, 'to', serverCode);

		// Trigger migration if tenant changed
		if (oldTenant !== serverCode) {
			try {
				const migration = new MigrationService(this);
				await migration.executeMigration();
			} catch (error) {
				console.error('Migration failed:', error);
			}

			// Emit tenant ready signal for dynamic language loader
			this.tenantReadySubject.next(this.selectedTenant);
			EnvService.tenantReadySubject.next(this.selectedTenant);

			// Reload language for new tenant (non-blocking)
			this.loadLanguageForServer().catch((error) => {
				console.error('Language reload failed:', error);
			});
		}

		// Publish tenant change event
		this.publishEvent({ Code: EVENT_TYPE.TENANT.SWITCHED, Value: serverCode });
	}

	/**
	 * Load language with tenant context and fallbacks
	 */
	async loadLanguageForServer(lang?: string): Promise<void> {
		if (!lang) {
			lang = (await this.getStorage('lang')) || this.language.default;
		}

		console.log('Loading language for tenant:', this.selectedTenant, 'language:', lang);

		try {
			// Use dynamic loader to get translations (convert Observable to Promise)
			const translations = await firstValueFrom(this.dynamicTranslateLoader.getTranslation(lang));

			if (translations && Object.keys(translations).length > 0) {
				this.translate.setTranslation(lang, translations);
				this.translate.use(lang);

				// Update language state
				this.language.current = lang;
				this.language.isDefault = lang === this.language.default;
				this.setStorage('lang', lang);
				this.languageTracking.next(this.language);

				console.log('Language loaded successfully via dynamic loader');
				return;
			}
		} catch (error) {
			console.error('Failed to load language via dynamic loader:', error);
		}

		// Fallback: set language without translations (app will work with keys)
		console.warn('Loading empty translations for language:', lang);
		this.translate.setTranslation(lang, {});
		this.translate.use(lang);

		// Update language state
		this.language.current = lang;
		this.language.isDefault = lang === this.language.default;
		this.setStorage('lang', lang);
		this.languageTracking.next(this.language);
	}

	/**
	 * Validate tenant code
	 */
	private isValidTenant(serverCode: string): boolean {
		return this.tenantList.some((server) => server.Code === serverCode);
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
			.then(() => console.log('SignalR Connected!'))
			.catch((err) => console.error('SignalR connection failed:', err));

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
					if (e.value.localeCompare(this.version) > 0) {
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
			console.log('SendMessage', user, message);
		});

		signalRConnection.on('SaleOrdersUpdated', (IDBranch, Ids) => {
			console.log('SaleOrdersUpdated', IDBranch, Ids);
			this.publishEvent({ Code: EVENT_TYPE.SALE.ORDERS_UPDATED });
		});
	}

	/**
	 * Setup network monitoring (moved from init)
	 */
	private setupNetworkMonitoring(): void {
		Network.addListener('networkStatusChange', (status) => {
			this.publishEvent({ Code: EVENT_TYPE.APP.NETWORK_STATUS_CHANGE, status });
			console.log('Network status changed', status);
		});

		this.trackOnline().subscribe((isOnline) => {
			this.networkInfo.isOnline = isOnline;
		});
	}

	/**
	 * Check application version
	 * Migrated from AccountService.checkVersion()
	 */
	private async checkVersion(): Promise<string> {
		dog && console.log('📋 [EnvService] Checking application version...');
		
		try {
			// Just return the current version
			// Migration is now handled by MigrationService
			const currentVersion = this.version;
			dog && console.log('✅ [EnvService] Version check completed:', currentVersion);
			return currentVersion;
		} catch (error) {
			dog && console.error('❌ [EnvService] Version check failed:', error);
			return this.version;
		}
	}

	/**
	 * Setup analytics for the user
	 * Migrated from AccountService.setupAnalytics()
	 */
	private setupAnalytics(): void {
		dog && console.log('📊 [EnvService] Setting up analytics...');
		
		if (this.user) {
			try {
				const woopraId = {
					id: this.user.Id,
					email: this.user.Email,
					name: this.user.FullName,
					avatar: this.user.Avatar,
				};

				dog && console.log('🆔 [EnvService] Woopra ID configured:', woopraId);

				// Setup Woopra tracking with retry mechanism
				let woopraInterval: any = setInterval(() => {
					if ((window as any)?.woopra) {
						dog && console.log('📈 [EnvService] Woopra identified');
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
