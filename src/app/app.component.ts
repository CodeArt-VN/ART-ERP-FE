import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Platform, MenuController, NavController, PopoverController, IonRouterOutlet } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';
import { ActionPerformed, PushNotifications, Token } from '@capacitor/push-notifications';
import { register } from 'swiper/element/bundle';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';

import { EnvService } from './services/core/env.service';
import { BRA_BranchProvider, SYS_UserSettingProvider } from './services/static/services.service';
import { dogF, environment } from 'src/environments/environment';
import { lib } from './services/static/global-functions';
import { OSM_NotificationService } from './services/custom/notifications.service';
import { EVENT_TYPE } from './services/static/event-type';
import { UserProfileService } from './services/auth/user-profile.service';
import { AuthenticationService } from './services/auth/authentication.service';

register();

export interface ComponentUI {
	// App state
	appTheme: string;
	isConnectFail: boolean;
	appMessages: any[];
	canGoBack: boolean;
	showAppMenu: boolean;
	isReady: boolean;

	// Menu state
	branchFormGroup: any;
	branchList: any[];
	countForm: number;
	showMenu: boolean;
	randomImg: string;

	// Search state
	isShowSearch: boolean;
	queryMenu: string;
	foundMenu: any[];

	// Help state
	pageConfigPageName: string;
	showHelp: boolean;
	showAppMenuHelp: boolean;

	// User state
	pinnedForms: any[];
	totalNotifications: number;

	// Popover state
	isUserCPOpen: boolean;

	// Logo
	logo: string;

	// Last form for menu focus
	lastForm: any;
}

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
	standalone: false,
})
export class AppComponent implements OnInit {
	ui: ComponentUI = {
		// App state
		appTheme: 'default-theme',
		isConnectFail: false,
		appMessages: [],
		canGoBack: false,
		showAppMenu: true,
		isReady: false,

		// Menu state
		branchFormGroup: null,
		branchList: [],
		countForm: 0,
		showMenu: true,
		randomImg: './assets/undraw_art_museum_8or4.svg',

		// Search state
		isShowSearch: false,
		queryMenu: '',
		foundMenu: [],

		// Help state
		pageConfigPageName: '',
		showHelp: false,
		showAppMenuHelp: true,

		// User state
		pinnedForms: [],
		totalNotifications: 0,

		// Popover state
		isUserCPOpen: false,

		// Logo
		logo: '',

		// Last form for menu focus
		lastForm: null,
	};

	uiEvents: any = {
		// Menu events
		menuPin: (form, event) => {
			event.preventDefault();
			event.stopPropagation();
			form.isPinned = !form.isPinned;

			let pinned = this.env.user.Forms.filter((d) => d.isPinned).map((i) => i.Id);
			this.userProfileService.setPinnedForms(pinned).then(() => {
				this.loadPinnedMenu();
				this.loadNotifications();
			});
		},

		toogleMenuGroup: (f) => {
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
		},

		toogleMenuForm: (f) => {
			f.isShowForm = !f.isShowForm;
			this.env.user.Forms.filter((m) => m.IDParent == f.Id).forEach((l) => {
				l.isShowForm = f.isShowForm;
			});
		},

		goToPage: (path, event, direction = 'root') => {
			event.preventDefault();
			event.stopPropagation();

			this.menu.close();
			if (direction == 'root') {
				this.navCtrl.navigateRoot(path);
			} else if (direction == 'forward') {
				this.navCtrl.navigateForward(path);
			}
		},

		// Search events
		searchMenu: (ev) => {
			var val = ev.target.value;
			if (val == undefined) {
				val = '';
			}
			if (val.length > 1) {
				this.ui.queryMenu = val;
				this.ui.foundMenu = lib.searchTree(this.env.user.Forms, this.ui.queryMenu);
			}
		},

		focusSearch: () => {
			setTimeout(() => {
				this.search.setFocus();
			}, 300);
		},

		toggleSearch: () => {
			this.ui.isShowSearch = !this.ui.isShowSearch;
			if (this.ui.isShowSearch) {
				this.uiEvents.focusSearch();
			}
		},

		closeSearch: () => {
			this.ui.isShowSearch = false;
		},

		// User control panel events
		presentUserCPPopover: (e: any) => {
			this.userCPPopover.event = e;
			this.ui.isUserCPOpen = true;
		},

		logout: (event) => {
			event.preventDefault();
			event.stopPropagation();
			this.menu.close();
			this.ui.isUserCPOpen = false;
			setTimeout(() => {
				this.env.publishEvent({ Code: EVENT_TYPE.USER.LOGOUT_REQUESTED });
			}, 0);
		},

		// Theme and language events
		changeThemeMode: (event) => {
			this.userProfileService.changeTheme(event.detail.value).then(() => {
				this.updateStatusbar();
			});
		},

		changeLanguage: async (lang = null) => {
			await this.env.setLang(lang);
		},

		// Server events
		changeServer: (server) => {
			this.env.userContext.switchTenant(server.Code);
		},

		// Branch events
		changeBranch: async () => {
			await this.env.changeBranch(this.ui.branchFormGroup.get('IDBranch').value);
			let sb = this.env.branchList.find((d) => d.Id == this.env.selectedBranch);

			if (sb.LogoURL) {
				this.ui.logo = sb.LogoURL;
			} else {
				this.ui.logo = 'assets/logos/logo-in-holdings.png';
			}
			dogF && console.log('🌲 [AppComponent] Changing branch logo:', this.ui.logo);
		},

		// Help events
		closeHelp: () => {
			this.menu.close('appHelpDetail');
			this.ui.showHelp = false;
		},

		openHelp: () => {
			this.menu.open('appHelpDetail');
		},

		// Menu toggle events
		toogleMenu: () => {
			this.ui.showAppMenu = !this.ui.showAppMenu;
		},

		toggleCompactMenu: () => {
			this.userProfileService.toogleCompactMenu();
		},

		// Footer events
		showServerMessage: (server) => {
			this.env.showMessage(server.Name, server.Color);
		},
	};

	@ViewChild('search') search: any;
	@ViewChild('userCPPopover') userCPPopover;
	@ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;

	constructor(
		private userProfileService: UserProfileService,
		private authenticationService: AuthenticationService,
		private router: Router,
		private navCtrl: NavController,
		private menu: MenuController,
		public env: EnvService,
		private formBuilder: FormBuilder,
		private notificationService: OSM_NotificationService
	) {
		dogF && console.log('🌲 [AppComponent] Constructor');

		let imgs = [
			'./assets/undraw_art_museum_8or4.svg',
			'./assets/undraw_best_place_r685.svg',
			'./assets/undraw_road_sign_mfpo.svg',
			'./assets/undraw_street_food_hm5i.svg',
			'./assets/undraw_empty.svg',
			'./assets/undraw_Container_ship_urt4.svg',
		];
		let r = Math.floor(Math.random() * imgs.length);
		this.ui.randomImg = imgs[r];

		this.ui.branchFormGroup = this.formBuilder.group({
			IDBranch: [''],
		});
	}

	ngOnInit() {
		dogF && console.log('🌲 [AppComponent] OnInit');
		this.initializeApp();
	}

	async initializeApp() {
		dogF && console.log('🌲 [AppComponent] Initialize App');
		await this.env.ready;
		dogF && console.log('🌲 [AppComponent] Environment ready');

		this.ui.isReady = true;
		this.updateStatusbar();
		this.eventHandler();
		this.renderUI();

		this.initNotification();
		this.serviceWorkerRegister();

		setTimeout(() => {
			this.userProfileService.getProfile();
		}, 0);
	}

	eventHandler() {
		this.env.getEvents().subscribe((data) => {
			dogF && console.log('🌲 [AppComponent] Event:', data);
			switch (data.Code) {
				case EVENT_TYPE.USER.LOGGED_OUT_REMOTE:
					this.router.navigateByUrl('/login');
					this.env.showMessage('You have log out of the system', 'danger');
					break;

				case EVENT_TYPE.APP.FORCE_UPDATE_MOBILEAPP:
					this.ui.isConnectFail = true;
					this.openAppStore();
					break;
				case EVENT_TYPE.APP.CONNECT_FAIL:
					this.ui.isConnectFail = true;
					break;
				case EVENT_TYPE.APP.SHOW_APP_MESSAGE:
					this.appMessageManage(data);
					break;
				case EVENT_TYPE.APP.SHOW_MENU:
					this.ui.showAppMenu = data.Value;
					break;
				case EVENT_TYPE.APP.SHOW_HELP:
					this.ui.showHelp = true;
					this.ui.pageConfigPageName = data.Value;
					this.uiEvents.openHelp();
					break;

				case EVENT_TYPE.APP.CHANGE_THEME:
					this.updateStatusbar();
					break;
				case EVENT_TYPE.APP.NOTIFICATION:
					this.loadNotifications();
					break;

				case EVENT_TYPE.APP.VIEW_DID_ENTER:
					this.focusMenuOnPageEnter(data.Value);
					break;

				case EVENT_TYPE.USER.CONTEXT_UPDATED:
					this.renderUI();
					break;

				default:
					dogF && console.log('🌲 [AppComponent] Not processed event:', data);

					break;
			}

			if (this.env.app.version == 'dev') {
				this.appMessageManage({
					IsShow: true,
					Id: 'event',
					Icon: 'checkmark-outline',
					IsBlink: false,
					Color: 'success',
					Message: data.Code,
				});
				setTimeout(() => {
					this.appMessageManage({
						IsShow: false,
						Id: 'event',
					});
				}, 2000);
			}
		});

		this.router.events.subscribe((event: any) => {
			if (event instanceof NavigationEnd) {
				dogF && console.log('🌲 [AppComponent] Navigation event:', event);
				this.ui.canGoBack = this.routerOutlet && this.routerOutlet.canGoBack();
			}
		});
	}

	renderUI() {
		dogF && console.log('🌲 [AppComponent] Render UI');
		this.ui.countForm = 0;

		if (this.env.user && this.env.user.Id && this.env.user.Forms.length) {
			this.ui.countForm = this.env.user.Forms.filter((d) => d.Type == 1).length;
			if (this.ui.countForm == 1 && this.env.branchList.filter((d) => !d.disabled).length == 1) {
				this.ui.showMenu = false;
			}
			this.ui.branchList = lib.cloneObject(this.env.branchList);
			dogF && console.log('🌲 [AppComponent] Selected branch:', this.env.selectedBranch);
			this.ui.branchFormGroup.get('IDBranch').setValue(this.env.selectedBranch);
			this.loadPinnedMenu();
			this.loadNotifications();
			this.updateStatusbar();
			this.focusMenuOnPageEnter(this.ui.lastForm, true);
		}
	}

	loadPinnedMenu() {
		let pinned = this.env.user.UserSetting.PinnedForms.Value;
		if (pinned) {
			this.env.user.Forms.forEach((i) => {
				i.isPinned = pinned.includes(i.Id) && i.Type == 1;
			});
		}

		this.ui.pinnedForms = this.env.user.Forms.filter((d) => d.isPinned);
	}

	updateStatusbar() {
		let title = 'ERP';
		let relIcon = 'assets/icons/icon-512.webp';

		if (environment.appDomain.indexOf('inholdings.vn') > -1) {
			if (window.location.host.indexOf('thelog.inholdings.vn') > -1) {
				this.ui.appTheme = 'thelog-theme';
			} else if (window.location.host.indexOf('gemcafe.com.vn') > -1) {
				this.ui.appTheme = 'gem-theme';
				title = 'GEM Café';
				relIcon = '/assets/logos/logo-gem-center-small.png';
			} else if (window.location.host.indexOf('inholdings') > -1) {
				this.ui.appTheme = 'inholdings-theme';
			} else {
				this.ui.appTheme = 'inholdings-theme';
			}
		} else {
			this.ui.appTheme = 'inholdings-theme';
		}

		// Remove all classes that start with 'theme'
		const classList = document.documentElement.classList;
		const themeClasses = Array.from(classList).filter((className) => className.indexOf('theme') > -1);
		themeClasses.forEach((themeClass) => classList.remove(themeClass));

		//Reset app theme (thí.appTheme) to html
		document.documentElement.classList.add(this.ui.appTheme);

		//Reset theme color to html
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
			let themeColor = lib.getCssVariableValue('--ion-color-primary');
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
				style: this.env?.user?.UserSetting?.Theme?.Value,
			});
			//StatusBar.setBackgroundColor({ color: (this.env?.user?.UserSetting?.Theme?.Value) ? '#5a5c5e' : '#ffffff' });
			StatusBar.setOverlaysWebView({ overlay: false });
		}
	}

	loadNotifications() {
		dogF && console.log('🌲 [AppComponent] Load notifications');
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

				// Sum trực tiếp từ Type 1 nếu không có Type 11
				let directChildren1 = this.env.user.Forms.filter((f) => f.Type === 1 && f.IDParent === form10.Id);
				let sumFrom1 = directChildren1.reduce((sum, f) => sum + (f.BadgeNum || 0), 0);

				if (form10.Id == 10) {
					let frm = this.env.user.Forms.find((f) => f.IDParent == 10);
					//Đối với trường hợp Form là Apporal thì có 1 type = 2.
					children11 = this.env.user.Forms.filter((f) => f.Type === 2 && f.IDParent === frm.Id);
					sumFrom11 = children11.reduce((sum, f) => sum + (f.BadgeNum || 0), 0);
					// Sum trực tiếp từ Type 1 nếu không có Type 11
					directChildren1 = this.env.user.Forms.filter((f) => f.Type === 1 && f.IDParent === frm.Id);
					sumFrom1 = directChildren1.reduce((sum, f) => sum + (f.BadgeNum || 0), 0);
				}

				form10.BadgeNum = sumFrom11 + sumFrom1;
				total += form10.BadgeNum || 0;
			});
			this.ui.totalNotifications = total;
		});
	}

	serviceWorkerRegister() {
		if (Capacitor.getPlatform() != 'web') return;

		return;
		if ('serviceWorker' in navigator) {
			const swScope = window.location.pathname.replace(/\/$/, '') + '/';

			navigator.serviceWorker
				.getRegistrations()
				.then((registrations) => {
					registrations.forEach((registration) => {
						if (registration.scope !== window.location.origin + swScope) {
							registration.unregister().then(() => {
								if (window.caches) {
									window.caches.keys().then((cacheNames) => {
										cacheNames.forEach((cacheName) => {
											window.caches.delete(cacheName);
										});
									});
								}
							});
						}
					});
				})
				.finally(() => {
					return;
					navigator.serviceWorker.getRegistration(swScope).then((registration) => {
						if (!registration) {
							navigator.serviceWorker.register('ngsw-worker.js', { scope: swScope }).then((reg) => {
								reg.onupdatefound = () => {
									const installingWorker = reg.installing;
									installingWorker.onstatechange = () => {
										if (installingWorker.state === 'installed') {
											if (navigator.serviceWorker.controller) {
												// Có bản cập nhật mới, thông báo cho người dùng
												if (confirm('Đã có phiên bản mới, tải lại để cập nhật?')) {
													window.location.reload();
												}
											}
										}
									};
								};
							});
						} else {
							// Đã có Service Worker đúng scope, không cần đăng ký lại
						}
					});
				});
		}
	}

	async initNotification() {
		return;
		if (Capacitor.getPlatform() != 'web') {
			console.log('app');
			PushNotifications.requestPermissions().then((result) => {
				if (result.receive === 'granted') {
					PushNotifications.register();
					console.log('register');
				} else {
					console.log('No permission for push notifications');
				}
			});
			PushNotifications.addListener('registrationError', (err) => {
				console.error('Registration error: ', err.error);
			});
			// Get FCM Token
			PushNotifications.addListener('registration', (token: Token) => {
				console.log('FCM Token:', token.value);
				// Gửi token này lên backend ASP.NET Core để lưu trữ
			});

			// Handle notifications received
			PushNotifications.addListener('pushNotificationReceived', (notification: any) => {
				console.log('Notification received:', notification);
				alert(`Notification: ${notification.title} - ${notification.body}`);
			});

			// Handle notifications when user taps
			PushNotifications.addListener('pushNotificationActionPerformed', (action: any) => {
				console.log('Notification tapped:', action.notification);
			});

			// console.log('app');
			// await PushNotifications.addListener('registration', (token: Token) => {
			// 	this.env.NotifyToken = token;
			// 	console.log('token:', token);
			// 	this.env.setStorage('NotifyToken', token.value);
			// });
			// let permStatus = await PushNotifications.checkPermissions();
			// console.log('permStatus.receive:', permStatus.receive);

			// if (permStatus.receive === 'prompt') {
			// 	permStatus = await PushNotifications.requestPermissions();
			// 	console.log('permStatus:', permStatus);
			// }
			// await PushNotifications.register();
			// console.log('registerted');

			// console.log('token:', this.env.NotifyToken);
			// await PushNotifications.addListener('registrationError', (err) => {
			// 	console.error('Registration error: ', err.error);
			// });

			// await PushNotifications.addListener('pushNotificationReceived', (notification) => {
			// 	console.log('Push notification received: ', notification);
			// });

			// await PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
			// 	console.log('Push notification action performed', notification.actionId, notification.inputValue);
			// });
			// PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
			// 	let navigateByUrl = notification.notification.data.navigateByUrl;
			// 	this.router.navigateByUrl(navigateByUrl);
			// });
		} else if ('serviceWorker' in navigator) {
			try {
				const permission = await Notification.requestPermission();
				if (permission === 'granted') {
					console.log('Quyền thông báo đã được cấp.');
					// Tiếp tục các bước lấy token hoặc xử lý khác
				} else if (permission === 'denied') {
					console.log('Người dùng đã từ chối quyền thông báo.');
				} else {
					console.log('Quyền thông báo chưa được cấp hoặc đã bị hỏi lại.');
				}

				const path = this.env.appPath;
				const registration = await navigator.serviceWorker.register(path + 'assets/firebase-messaging-sw.js');
				console.log('Service Worker registered:', registration);

				// Initialize Firebase
				const firebaseConfig = {
					apiKey: 'AIzaSyC18VtlyrZksjEamwh9b5ZBGsx1k-Ytoto',
					authDomain: 'testerp-d3775.firebaseapp.com',
					projectId: 'testerp-d3775',
					storageBucket: 'testerp-d3775.firebasestorage.app',
					messagingSenderId: '38562934353',
					appId: '1:38562934353:web:7dd0ecdddb0470d5459270',
					measurementId: 'G-BDF6HSEE2S',
				};

				const app = initializeApp(firebaseConfig);
				const messaging = getMessaging(app);

				// Get FCM token
				const token = await getToken(messaging, {
					vapidKey: 'BDdKkbNishStsvj25tr1gdnB7vACtwr-gqwAriXhknvStnlCQGfHhVPvG0r0s7Kj5p1a_naHVbzrwNZRseZqZYE',
					serviceWorkerRegistration: registration,
				});
				this.env.setStorage('NotifyToken', token);
				this.env.NotifyToken = token;
				onMessage(messaging, (payload) => {
					console.log('Foreground notification:', payload);
					const title = payload.data?.title ?? 'Thông báo';
					const body = payload.data?.body ?? '';

					this.env.showMessage(body, null, null, null, false, title);
				});
				console.log('FCM Token:', token);
			} catch (err) {
				console.error('Service Worker registration or FCM failed', err);
			}
		}
	}

	focusMenuOnPageEnter(currentForm, force = false) {
		if (!currentForm) return;
		if (force == false && (!currentForm || currentForm.Id === this.ui.lastForm?.Id)) return;
		this.ui.lastForm = currentForm;

		//Find the menu item by page.PageName
		//Loop to Find parent menu item if exists then set isShowForm = true
		let menuItem = this.env.user.Forms.find((f) => f.Id === currentForm.Id);
		const parentForms = this.getAllParentForms(menuItem);
		if (!(parentForms[0]?.isShowDetail == true)) this.uiEvents.toogleMenuGroup(parentForms[0]);
		if (!(parentForms[1]?.isShowForm == true)) this.uiEvents.toogleMenuForm(parentForms[1]);
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

	appMessageManage(message) {
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

	openAppStore() {
		console.log('openAppStore');
		if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
			window.location.href = environment.playStoreURL;
		}
		if (navigator.userAgent.toLowerCase().indexOf('iphone') > -1) {
			window.location.href = environment.appStoreURL;
		}
	}
}
