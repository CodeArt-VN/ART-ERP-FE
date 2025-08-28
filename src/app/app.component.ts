import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Platform, MenuController, NavController, PopoverController, IonRouterOutlet } from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';
import { Router, NavigationEnd } from '@angular/router';
import { EnvService } from './services/core/env.service';
import { BRA_BranchProvider, SYS_UserSettingProvider } from './services/static/services.service';
import { dog, environment } from 'src/environments/environment';
import { lib } from './services/static/global-functions';
import { register } from 'swiper/element/bundle';
import { FormBuilder } from '@angular/forms';
import { OSM_NotificationService } from './services/notifications.service';
import { EVENT_TYPE } from './services/static/event-type';

register();

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
	standalone: false,
})
export class AppComponent implements OnInit {
	@ViewChild('search') search: any;
	@ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;

	// UI State Management
	ui = {
		appTheme: 'default-theme',
		isConnectFail: false,
		canGoBack: false,
		showAppMenu: true,
		showMenu: true,
		isShowSearch: false,
		showHelp: false,
		showAppMenuHelp: true,
		isUserCPOpen: false,
		randomImg: this.selectRandomImage(),
		logo: '',
		appVersion: 'v' + this.env.version,
		appMessages: [],
		queryMenu: '',
		foundMenu: [],
		pageConfigPageName: '',
		pinnedForms: [],
		totalNotifications: 0,
		searchResultIdList: { term: '', ids: [] },
		countForm: 0,
	};

	// Data Properties
	branchFormGroup;
	branchList = [];
	lastForm = null;
	_environment = environment;

	constructor(
		public router: Router,
		public navCtrl: NavController,
		public menu: MenuController,
		public userSettingProvider: SYS_UserSettingProvider,
		public env: EnvService,
		public platform: Platform,
		public formBuilder: FormBuilder,
		public notificationService: OSM_NotificationService
	) {
		dog && console.log('🚀 [AppComponent] constructor');
		this.setupEventHandlers();
		this.branchFormGroup = this.formBuilder.group({
			IDBranch: [''],
		});
	}

	ngOnInit() {
		dog && console.log('🚀 [AppComponent] ngOnInit');
	}

	menuPin(form, event) {
		event.preventDefault();
		event.stopPropagation();
		form.isPinned = !form.isPinned;

		const pinned = this.env.user.Forms.filter((d) => d.isPinned).map((i) => i.Id);
		this.env.user.UserSetting.PinnedForms.Value = JSON.stringify(pinned);
		this.userSettingProvider.save(this.env.user.UserSetting.PinnedForms).then((response: any) => {
			if (!this.env.user.UserSetting.PinnedForms.Id) {
				this.env.user.UserSetting.PinnedForms.Id = response.Id;
			}
			this.env.setStorage('UserProfile', this.env.user);
			this.loadPinnedMenu();
			this.loadNotifications();
		});
	}

	toggleCompactMenu(): void {
		if (this.env.user?.UserSetting?.IsCompactMenu?.Value !== undefined) {
			this.env.user.UserSetting.IsCompactMenu.Value = !this.env.user.UserSetting.IsCompactMenu.Value;
			this.env.setStorage('UserProfile', this.env.user);
		}
	}

	logout() {
		event.preventDefault();
		event.stopPropagation();
		this.menu.close();
		this.ui.isUserCPOpen = false;
		this.env.publishEvent({ Code: EVENT_TYPE.APP.LOGOUT });
	}

	async switchTenant(server: any): Promise<void> {
		try {
			dog && console.log('🔄 Switching tenant to:', server.Code);

			this.env.showLoading('Switching tenant...', this.env.switchTenant(server.Code));

			this._environment = environment;
		} catch (error) {
			dog && console.error('❌ Tenant switch failed:', error);
			this.env.showMessage('Failed to switch tenant', 'danger');
		}
	}

	async changeBranch() {
		this.env.selectedBranch = this.branchFormGroup.get('IDBranch').value;
		await this.env.changeBranch();
		let sb = this.env.branchList.find((d) => d.Id == this.env.selectedBranch);

		if (sb.LogoURL) {
			this.ui.logo = sb.LogoURL;
		} else {
			this.ui.logo = 'assets/logos/logo-in-holdings.png';
		}
		dog && console.log(this.ui.logo);
	}

	private loadPinnedMenu() {
		const pinned = this.env.user?.UserSetting?.PinnedForms?.Value;
		if (pinned) {
			this.env.user.Forms.forEach((i) => {
				i.isPinned = pinned.includes(i.Id) && i.Type == 1;
			});
		}
		this.ui.pinnedForms = this.env.user.Forms.filter((d) => d.isPinned);
	}

	serviceWorkerRegister() {
		if (Capacitor.getPlatform() != 'web') return;
		return;
	}

	scrollMenuOnPageEnter(currentForm, force = false) {
		if (!currentForm) return;
		if (force == false && (!currentForm || currentForm.Id === this.lastForm?.Id)) return;
		this.lastForm = currentForm;

		let menuItem = this.env.user.Forms.find((f) => f.Id === currentForm.Id);
		const parentForms = this.getAllParentForms(menuItem);
		if (!(parentForms[0]?.isShowDetail == true)) this.toogleMenuGroup(parentForms[0]);
		if (!(parentForms[1]?.isShowForm == true)) this.toogleMenuForm(parentForms[1]);
	}

	getAllParentForms(form) {
		let parentForms = [];
		let currentForm = form;

		while (currentForm) {
			parentForms.push(currentForm);
			currentForm = this.env.user.Forms.find((f) => f.Id == currentForm.IDParent);
		}

		return parentForms.reverse();
	}

	toogleMenuGroup(f) {
		f.isShowDetail = !f.isShowDetail;
		this.env.user.Forms.filter((g) => f.Id == g.IDParent).forEach((i) => {
			i.isShowDetail = f.isShowDetail;

			this.env.user.Forms.filter((m) => m.IDParent == i.Id).forEach((l) => {
				l.isShowDetail = f.isShowDetail;
				if (i.isShowForm == undefined) {
					l.isShowForm = true;
				}
			});

			if (i.isShowForm == undefined) {
				i.isShowForm = true;
			}
		});
	}

	toogleMenuForm(f) {
		f.isShowForm = !f.isShowForm;
		this.env.user.Forms.filter((m) => m.IDParent == f.Id).forEach((l) => {
			l.isShowForm = f.isShowForm;
		});
	}

	goToPage(path, event, direction = 'root') {
		event.preventDefault();
		event.stopPropagation();

		this.menu.close();
		if (direction == 'root') {
			this.navCtrl.navigateRoot(path);
		} else if (direction == 'forward') {
			this.navCtrl.navigateForward(path);
		}
	}

	searchMenu(ev) {
		var val = ev.target.value;
		if (val == undefined) {
			val = '';
		}
		if (val.length > 1) {
			this.ui.queryMenu = val;
			this.ui.foundMenu = lib.searchTree(this.env.user.Forms, this.ui.queryMenu);
		}
	}

	focusSearch(): void {
		setTimeout(() => {
			this.search.setFocus();
		}, 300);
	}

	@ViewChild('userCPPopover') userCPPopover;
	presentUserCPPopover(e: any) {
		this.userCPPopover.event = e;
		this.ui.isUserCPOpen = true;
	}

	changeThemeMode(event) {
		this.env.user.UserSetting.Theme.Value = event.detail.value;
		this.userSettingProvider.save(this.env.user.UserSetting.Theme);
		this.updateStatusbar();
	}

	async changeLanguage(lang = null) {
		await this.env.setLang(lang);
		this.env.publishEvent({ Code: EVENT_TYPE.APP.CHANGE_LANGUAGE, Value: lang });
	}

	closeHelp() {
		this.menu.close('appHelpDetail');
		this.ui.showHelp = false;
	}

	private appMessageManage(message) {
		if (message.IsShow) {
			this.ui.appMessages.push(message);
		} else {
			let ms = this.ui.appMessages.filter((e) => e.Id == message.Id);
			ms.forEach((f) =>
				this.ui.appMessages.splice(
					this.ui.appMessages.findIndex((e) => e.Id == f.Id),
					1
				)
			);
		}
	}

	private openAppStore() {
		dog && console.log('openAppStore');
		if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
			window.location.href = environment.playStoreURL;
		}
		if (navigator.userAgent.toLowerCase().indexOf('iphone') > -1) {
			window.location.href = environment.appStoreURL;
		}
	}

	// Helper methods for UI logic
	get isCompactMenu(): boolean {
		return this.ui.countForm < 7;
	}

	get shouldShowPinnedMenu(): boolean {
		return this.env.user && this.ui.countForm >= 7;
	}

	get shouldShowMenuControls(): boolean {
		return this.ui.countForm >= 7;
	}

	get isUserLoggedIn(): boolean {
		return !!(this.env.user && this.env.user.Id);
	}

	private setupEventHandlers(): void {
		this.env.getEvents().subscribe((data) => {
			switch (data.Code) {
				case EVENT_TYPE.APP.ENVIRONMENT_READY:
					this.handleEnvironmentReady().catch((error) => {
						dog && console.error('❌ [AppComponent] Failed to handle environment ready:', error);
					});
					break;
				case EVENT_TYPE.TENANT.SWITCHED:
					this.handleSwitchTenant(data.Value);
					break;
				case EVENT_TYPE.APP.FORCE_UPDATE:
					this.openAppStore();
					break;
				case EVENT_TYPE.APP.CONNECT_FAIL:
					this.ui.isConnectFail = true;
					break;
				case EVENT_TYPE.APP.SHOW_APP_MESSAGE:
					this.appMessageManage(data);
					break;
				case EVENT_TYPE.APP.SHOW_MENU:
					dog && console.log('🔄 [AppComponent] SHOW_MENU:', data.Value);
					this.ui.showAppMenu = data.Value;
					break;
				case EVENT_TYPE.APP.SHOW_HELP:
					this.ui.showHelp = true;
					this.ui.pageConfigPageName = data.Value;
					this.openHelp();
					break;
				case EVENT_TYPE.APP.NOTIFICATION:
					this.loadNotifications();
					break;
				case EVENT_TYPE.APP.VIEW_DID_ENTER:
					this.scrollMenuOnPageEnter(data.Value);
					break;
				case EVENT_TYPE.USER.CONTEXT_UPDATED:
					this.handleUserContextUpdated();
					break;
				case EVENT_TYPE.USER.LOGGED_OUT_REMOTE:
					this.env.showMessage('Bạn đã bị đăng xuất từ thiết bị khác', 'danger');
					this.router.navigateByUrl('/login');
					break;
				case EVENT_TYPE.USER.SESSION_EXPIRED:
					this.env.showMessage('Phiên đăng nhập đã hết hạn', 'danger');
					this.router.navigateByUrl('/login');
					break;
				default:
					dog && console.log('📡 [AppComponent] Received event:', data.Code);
					break;
			}
		});

		this.router.events.subscribe((event: any) => {
			if (event instanceof NavigationEnd) {
				this.ui.canGoBack = this.routerOutlet && this.routerOutlet.canGoBack();
				dog && console.log(event.urlAfterRedirects);
			}
		});
	}

	private handleSwitchTenant(serverCode: string): void {
		dog && console.log('🔄 Tenant changed to:', serverCode);
		this._environment = environment;
		this.env.showMessage(`Switched to tenant: ${serverCode}`, 'success');
	}

	/**
	 * Handle environment ready event
	 */
	private async handleEnvironmentReady(): Promise<void> {
		dog && console.log('✅ [AppComponent] Environment is ready, rendering UI...');
	}

	/**
	 * Handle user context updated event
	 */
	private handleUserContextUpdated(): void {
		this.ui.countForm = 0;

		if (this.env.user && this.env.user.Id && this.env.user.Forms.length) {
			this.ui.countForm = this.env.user.Forms.filter((d) => d.Type == 1).length;
			if (this.ui.countForm == 1 && this.env.branchList.filter((d) => !d.disabled).length == 1) {
				this.ui.showMenu = false;
			}
			this.branchList = lib.cloneObject(this.env.branchList);
			this.branchFormGroup.get('IDBranch').setValue(this.env.selectedBranch);
			this.loadPinnedMenu();
			this.loadNotifications();
			this.scrollMenuOnPageEnter(this.lastForm, true);
		} else {
			this.ui.pinnedForms = [];
			this.ui.totalNotifications = 0;
			this.branchList = [];
			this.router.navigateByUrl('/login');
		}

		this.renderUI();
	}

	/**
	 * Render UI based on environment state
	 */
	private async renderUI(): Promise<void> {
		// Update UI state from environment
		this.ui.appTheme = (await this.env.getData('appTheme')) || 'default-theme';
		this.ui.showMenu = this.env.user ? true : false;
		this.ui.isShowSearch = false;
		this.ui.showHelp = false;
		this.ui.showAppMenuHelp = true;
		this.ui.isUserCPOpen = false;

		this.updateStatusbar();
	}

	private updateStatusbar() {
		const title = 'ERP';
		const relIcon = 'assets/icons/icon-512.webp';

		const classList = document.documentElement.classList;
		const themeClasses = Array.from(classList).filter((className) => className.indexOf('theme') > -1);
		themeClasses.forEach((themeClass) => classList.remove(themeClass));

		document.documentElement.classList.add(this.ui.appTheme);

		document.documentElement.classList.remove('dark', 'light');
		if (this.env.user?.UserSetting?.Theme?.Value == 'Dark' || this.env.user?.UserSetting?.Theme?.Value == 'Light')
			document.documentElement.classList.add(this.env.user?.UserSetting?.Theme.Value == 'Dark' ? 'dark' : 'light');

		let link: any = document.querySelector("link[rel~='icon']");
		if (!link) {
			link = document.createElement('link');
			link.rel = 'icon';
			document.head.appendChild(link);
		}

		window.document.title = title;
		link.href = relIcon;

		setTimeout(() => {
			const themeColor = lib.getCssVariableValue('--ion-color-primary');
			document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColor);

			if (Capacitor.isPluginAvailable('StatusBar')) {
				StatusBar.setBackgroundColor({
					color: this.env?.user?.UserSetting?.Theme?.Value ? themeColor : '#ffffff',
				});
				StatusBar.setStyle({
					style: this.env.user.UserSetting.Theme.Value,
				});
			}
		}, 100);

		if (Capacitor.isPluginAvailable('StatusBar')) {
			StatusBar.setBackgroundColor({
				color: this.env?.user?.UserSetting?.Theme?.Value ? '#5a5c5e' : '#ffffff',
			});
			StatusBar.setStyle({
				style: this.env.user.UserSetting.Theme.Value,
			});
			StatusBar.setOverlaysWebView({ overlay: false });
		}
	}

	private selectRandomImage(): string {
		const imgs = [
			'./assets/undraw_art_museum_8or4.svg',
			'./assets/undraw_best_place_r685.svg',
			'./assets/undraw_road_sign_mfpo.svg',
			'./assets/undraw_street_food_hm5i.svg',
			'./assets/undraw_empty.svg',
			'./assets/undraw_Container_ship_urt4.svg',
		];
		const r = Math.floor(Math.random() * imgs.length);
		return imgs[r];
	}

	private loadNotifications() {
		let total = 0;
		this.notificationService.getNotificationCount(null).then((res: any) => {
			this.env.user.Forms.filter((f) => f.Type === 1).forEach((form1) => {
				form1.BadgeNum = res.find((s) => s.Form.toLowerCase() == form1.Code)?.Count || 0;
			});
			this.env.user.Forms.filter((f) => f.Type === 11).forEach((form11) => {
				const children1 = this.env.user.Forms.filter((f) => f.Type === 1 && f.IDParent === form11.Id);
				form11.BadgeNum = children1.reduce((sum, f) => sum + (f.BadgeNum || 0), 0);
			});

			this.env.user.Forms.filter((f) => f.Type === 10).forEach((form10) => {
				let children11 = this.env.user.Forms.filter((f) => f.Type === 11 && f.IDParent === form10.Id);
				let sumFrom11 = children11.reduce((sum, f) => sum + (f.BadgeNum || 0), 0);

				let directChildren1 = this.env.user.Forms.filter((f) => f.Type === 1 && f.IDParent === form10.Id);
				let sumFrom1 = directChildren1.reduce((sum, f) => sum + (f.BadgeNum || 0), 0);

				if (form10.Id == 10) {
					let frm = this.env.user.Forms.find((f) => f.IDParent == 10);
					children11 = this.env.user.Forms.filter((f) => f.Type === 2 && f.IDParent === frm.Id);
					sumFrom11 = children11.reduce((sum, f) => sum + (f.BadgeNum || 0), 0);
					directChildren1 = this.env.user.Forms.filter((f) => f.Type === 1 && f.IDParent === frm.Id);
					sumFrom1 = directChildren1.reduce((sum, f) => sum + (f.BadgeNum || 0), 0);
				}

				form10.BadgeNum = sumFrom11 + sumFrom1;
				total += form10.BadgeNum || 0;
			});
			this.ui.totalNotifications = total;
		});
	}

	private openHelp() {
		this.menu.open('appHelpDetail');
	}
}
