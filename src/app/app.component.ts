import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Platform, MenuController, NavController, PopoverController, IonRouterOutlet } from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';
import { Router, NavigationEnd } from '@angular/router';
import { EnvService } from './services/core/env.service';
import { AccountService } from './services/account.service';
import { BRA_BranchProvider, SYS_UserSettingProvider } from './services/static/services.service';
import { environment } from 'src/environments/environment';
import { lib } from './services/static/global-functions';
import { ActionPerformed, PushNotifications, Token } from '@capacitor/push-notifications';
import { register } from 'swiper/element/bundle';
import { FormBuilder } from '@angular/forms';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { OSM_NotificationService } from './services/notifications.service';

register();
let ga: any;

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
	standalone: false,
})
export class AppComponent implements OnInit {
	@ViewChild('search') search: any;
	appTheme = 'default-theme';
	isConnectFail = false;
	appMessages = [];
	appVersion = '';
	canGoBack = false;
	showScrollbar = false;
	showAppMenu = true;

	branchFormGroup;
	branchList = [];
	countForm = 0;
	showMenu = true;
	randomImg = './assets/undraw_art_museum_8or4.svg';

	isShowSearch = false;
	queryMenu = '';
	foundMenu = [];

	pageConfigPageName = '';
	showHelp = false;
	showAppMenuHelp = true;

	@ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;

	_environment = environment;

	constructor(
		public router: Router,
		public navCtrl: NavController,
		public menu: MenuController,
		public userSettingProvider: SYS_UserSettingProvider,
		public branchProvider: BRA_BranchProvider,
		public popoverCtrl: PopoverController,
		public env: EnvService,
		public accountService: AccountService,
		public platform: Platform,
		public formBuilder: FormBuilder,
		public notificationService: OSM_NotificationService,
		private toastController: ToastController
	) {
		this.appVersion = 'v' + this.env.version;
		let imgs = [
			'./assets/undraw_art_museum_8or4.svg',
			'./assets/undraw_best_place_r685.svg',
			'./assets/undraw_road_sign_mfpo.svg',
			'./assets/undraw_street_food_hm5i.svg',
			'./assets/undraw_empty.svg',
			'./assets/undraw_Container_ship_urt4.svg',
		];
		let r = Math.floor(Math.random() * imgs.length);
		this.randomImg = imgs[r];

		this.initializeApp();

		this.env.getEvents().subscribe((data) => {
			switch (data.Code) {
				case 'app:ForceUpdate':
					this.isConnectFail = true;
					this.openAppStore();
					break;
				case 'app:ConnectFail':
					this.isConnectFail = true;
					break;
				case 'app:ShowAppMessage':
					this.appMessageManage(data);
					break;
				case 'app:ShowMenu':
					this.showAppMenu = data.Value;
					break;
				case 'app:ShowHelp':
					this.showHelp = true;
					this.pageConfigPageName = data.Value;
					this.openHelp();
					break;
				case 'app:ChangeTheme':
					this.updateStatusbar();
					break;
				case 'app:logout':
					accountService.logout().then((_) => {
						this.router.navigateByUrl('/login');
						this.env.showMessage('You have log out of the system', 'danger');
					});
					break;
				case 'app:silentlogout':
					accountService.logout().then((_) => {
						this.router.navigateByUrl('/login');
					});
					break;
				case 'app:updatedUser':
					this.countForm = 0;

					if (this.env.user && this.env.user.Id && this.env.user.Forms.length) {
						this.countForm = this.env.user.Forms.filter((d) => d.Type == 1).length;
						if (this.countForm == 1 && this.env.branchList.filter((d) => !d.disabled).length == 1) {
							this.showMenu = false;
						}
						this.branchList = lib.cloneObject(this.env.branchList);
						this.branchFormGroup.get('IDBranch').setValue(this.env.selectedBranch);
						this.loadPinnedMenu();
						this.loadNotifications();
						this.updateStatusbar();
						this.focusMenuOnPageEnter(this.lastForm, true);
					}
					break;
				case 'app:notification':
					this.loadNotifications();
					break;
				case 'app:ViewDidEnter':
					this.focusMenuOnPageEnter(data.Value);
					break;
				case 'app:loadLang':
					this.env.getStorage('lang').then((lang) => {
						if (lang) {
							this.changeLanguage(lang);
						} else {
							this.changeLanguage();
						}
					});
					break;
				default:
					if (this.env.version == 'dev') {
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
					break;
			}
		});

		this.router.events.subscribe((event: any) => {
			if (ga && event instanceof NavigationEnd) {
				ga('set', 'page', 'test/' + event.urlAfterRedirects);
				ga('send', 'pageview');
				console.log(event.urlAfterRedirects);
			}

			if (event) {
				//console.log(event);
				// (<any>window).ga('set', 'page', event.urlAfterRedirects);
				// (<any>window).ga('send', 'pageview');
			}
		});
		this.branchFormGroup = this.formBuilder.group({
			IDBranch: [''],
		});
	}

	pinnedForms = [];
	totalNotifications = 0;
	loadPinnedMenu() {
		let pinned = this.env.user.UserSetting.PinnedForms.Value;
		if (pinned) {
			this.env.user.Forms.forEach((i) => {
				i.isPinned = pinned.includes(i.Id) && i.Type == 1;
			});
		}

		this.pinnedForms = this.env.user.Forms.filter((d) => d.isPinned);
	}

	menuPin(form, event) {
		event.preventDefault();
		event.stopPropagation();
		form.isPinned = !form.isPinned;

		let pinned = this.env.user.Forms.filter((d) => d.isPinned).map((i) => i.Id);
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

	updateStatusbar() {
		let title = 'ERP';
		let relIcon = 'assets/icons/icon-512.webp';

		// Remove all classes that start with 'theme'
		const classList = document.documentElement.classList;
		const themeClasses = Array.from(classList).filter((className) => className.indexOf('theme') > -1);
		themeClasses.forEach((themeClass) => classList.remove(themeClass));

		//Reset app theme (thí.appTheme) to html
		document.documentElement.classList.add(this.appTheme);

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

	ngOnInit() {
		this.canGoBack = this.routerOutlet && this.routerOutlet.canGoBack();
		this.initNotification();
		// const path = window.location.pathname.split('folder/')[1];
		// if (path !== undefined) {
		//     this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
		// }
	}

	loadNotifications() {
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
			this.totalNotifications = total;
		});
	}

	async initNotification() {
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

					this.showInAppNotification(title, body); // tuỳ bạn định nghĩa
				});
				console.log('FCM Token:', token);
			} catch (err) {
				console.error('Service Worker registration or FCM failed', err);
			}
		}
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.showScrollbar = environment.showScrollbar;
			this.updateStatusbar();
		});
	}
	async showInAppNotification(title: string, body: string) {
		const toast = await this.toastController.create({
			header: title,
			message: body, // Bạn có thể truyền HTML nếu cần
			duration: 3000,
			position: 'top',
			color: 'primary',
			buttons: [
				{
					text: 'X',
					role: 'cancel',
				},
			],
		});

		await toast.present();
	}
	toogleMenu() {
		this.showAppMenu = !this.showAppMenu;
	}

	lastForm = null;
	focusMenuOnPageEnter(currentForm, force = false) {
		if(!currentForm) return;
		if (force == false && (!currentForm || currentForm.Id === this.lastForm?.Id)) return;
		this.lastForm = currentForm;

		//Find the menu item by page.PageName
		//Loop to Find parent menu item if exists then set isShowForm = true
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
		//this.router.navigateByUrl(path);
		if (direction == 'root') {
			this.navCtrl.navigateRoot(path);
		} else if (direction == 'forward') {
			this.navCtrl.navigateForward(path);
		}
	}

	logout() {
		event.preventDefault();
		event.stopPropagation();
		this.menu.close();
		this.isUserCPOpen = false;
		this.env.publishEvent({ Code: 'app:logout' });
	}

	changeServer(server) {
		environment.appDomain = server.Code;
		this.env.setStorage('appDomain', server.Code);
		this._environment = environment;
	}

	logo = '';
	async changeBranch() {
		this.env.selectedBranch = this.branchFormGroup.get('IDBranch').value;
		await this.env.changeBranch();
		let sb = this.env.branchList.find((d) => d.Id == this.env.selectedBranch);

		if (sb.LogoURL) {
			this.logo = sb.LogoURL;
		} else {
			this.logo = 'assets/logos/logo-in-holdings.png';
		}
		console.log(this.logo);
	}

	appMessageManage(message) {
		if (message.IsShow) {
			this.appMessages.push(message);
		} else {
			let ms = this.appMessages.filter((e) => e.Id == message.Id);
			ms.forEach((f) =>
				this.appMessages.splice(
					this.appMessages.findIndex((e) => e.Id == f.Id),
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

	searchMenu(ev) {
		var val = ev.target.value;
		if (val == undefined) {
			val = '';
		}
		if (val.length > 1) {
			this.queryMenu = val;
			this.foundMenu = lib.searchTree(this.env.user.Forms, this.queryMenu);
		}
	}

	focusSearch(): void {
		setTimeout(() => {
			this.search.setFocus();
		}, 300);
	}

	searchResultIdList = { term: '', ids: [] };
	searchShowAllChildren = (term: string, item: any) => {
		if (this.searchResultIdList.term != term) {
			this.searchResultIdList.term = term;
			this.searchResultIdList.ids = lib.searchTreeReturnId(this.env.branchList, term);
		}
		return this.searchResultIdList.ids.indexOf(item.Id) > -1;
	};

	async changeLanguage(lang = null) {
		await this.env.setLang(lang);
		this.env.publishEvent({ Code: 'app:changeLanguage', Value: lang });
	}

	closeHelp() {
		this.menu.close('appHelpDetail');
		this.showHelp = false;
	}

	openHelp() {
		this.menu.open('appHelpDetail');
	}

	@ViewChild('userCPPopover') userCPPopover;
	isUserCPOpen = false;
	presentUserCPPopover(e: any) {
		this.userCPPopover.event = e;
		this.isUserCPOpen = true;
	}

	changeThemeMode(event) {
		this.env.user.UserSetting.Theme.Value = event.detail.value;
		this.userSettingProvider.save(this.env.user.UserSetting.Theme);
		this.updateStatusbar();
	}
}
