import { Component, OnInit, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Platform, MenuController, NavController, PopoverController, IonRouterOutlet } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';

import { Router, NavigationEnd } from '@angular/router';
import { EnvService } from './services/core/env.service';
import { AccountService } from './services/account.service';
import { BRA_BranchProvider, SYS_UserSettingProvider } from './services/static/services.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { lib } from './services/static/global-functions';
import { ActionPerformed, PushNotifications, Token } from '@capacitor/push-notifications';
import { register } from 'swiper/element/bundle';
import { DynamicScriptLoaderService } from './services/custom.service';

register();
let ga: any;
declare var Fuse: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
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
    public dynamicScriptLoaderService: DynamicScriptLoaderService,
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
            this.env.showTranslateMessage('You have log out of the system', 'danger');
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
            this.loadPinnedMenu();
            this.updateStatusbar();
          }
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
        //console.log(event.urlAfterRedirects);
      }

      // if (event) {
      //   //console.log(event);

      //   // (<any>window).ga('set', 'page', event.urlAfterRedirects);
      //   // (<any>window).ga('send', 'pageview');
      // }
    });
  }

  pinnedForms = [];
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
    });
  }

  updateStatusbar() {
    let title = 'ERP';
    let relIcon = 'assets/icons/icon-512x512.png';

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
    }, 100);

    if (Capacitor.isPluginAvailable('StatusBar')) {
      StatusBar.setBackgroundColor({
        color:
          this.env.user && this.env.user.userSetting && this.env.user.UserSetting.IsDarkTheme.Value
            ? '#5a5c5e'
            : '#ffffff',
      });
      StatusBar.setStyle({
        style:
          this.env.user && this.env.user.userSetting && this.env.user.UserSetting.IsDarkTheme.Value
            ? Style.Dark
            : Style.Light,
      });
      //StatusBar.setBackgroundColor({ color: (this.env.user && this.env.user.userSetting && this.env.user.UserSetting.IsDarkTheme.Value) ? '#5a5c5e' : '#ffffff' });
      StatusBar.setOverlaysWebView({ overlay: false });
    }
  }

  ngOnInit() {
    console.log('AppComponent ngOnInit');
    this.canGoBack = this.routerOutlet && this.routerOutlet.canGoBack();
    this.loadFuse();
    // const path = window.location.pathname.split('folder/')[1];
    // if (path !== undefined) {
    //     this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    // }
    //this.initNotification();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.showScrollbar = environment.showScrollbar;
      this.updateStatusbar();
    });
  }
  async initNotification() {
    if (Capacitor.getPlatform() != 'web') {
      let permStatus = await PushNotifications.checkPermissions();
      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }
      await PushNotifications.register();
      await PushNotifications.addListener('registration', (token: Token) => {
        this.env.setStorage('NotifyToken', token.value);
      });
      PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
        let navigateByUrl = notification.notification.data.navigateByUrl;
        this.router.navigateByUrl(navigateByUrl);
      });
    }
  }

  toogleMenu() {
    this.showAppMenu = !this.showAppMenu;
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
          1,
        ),
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
    if(val == ''){
      this.env.user.Forms.forEach(i => {
        delete i.highlightedName;
      });
    }
    if (val.length > 1) {
      this.queryMenu = val;
      this.foundMenu = this.searchTree(this.env.user.Forms, this.queryMenu);
    }
  }

  focusSearch(): void {
    setTimeout(() => {
      this.search.setFocus();
    }, 300);
  }

  highlightedNames: any;
  searchResultIdList = { term: '', ids: [] };
  searchShowAllChildren = (term: string, item: any) => {
    if (this.searchResultIdList.term != term) {
      this.searchResultIdList.term = term;
      this.searchResultIdList.ids = this.searchTreeReturnId(this.env.branchList, term);

    }
    return this.searchResultIdList.ids.indexOf(item.Id) > -1;
  };

  changeLanguage(lang = null) {
    this.env.setLang(lang);
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

  loadFuse() {
    const script = this.dynamicScriptLoaderService
      .loadScript('https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.js')
      .then(() => {
      })
      .catch((error) => console.error('Error loading script', error));
    Promise.all([script])
      .then(() => {})
      .catch((error) => console.log(`Error in promises ${error}`));
  }

  fuseSearch(list = [], term = '', keys: string[] = ['Name', 'Code']) {
    let searchQuery : any = term;
    if (term.includes('@')) {
      searchQuery = this.createSearchQueryMention(term, keys);
    }
    const fuseOptions = {
      includeScore: true,
      includeMatches: true,
      useExtendedSearch: false,
      threshold: 0.5,
      shouldSort: true,
      keys: keys,
    };
    const fuse = new Fuse(list, fuseOptions);
    const searchResult = this.highlight(fuse.search(searchQuery));
    return searchResult;
  }
  
  highlight(fuseSearchResult: any, highlightClassName: string = 'highlighted') {
    const set = (obj: object, path: string, value: any) => {
      const pathValue = path.split('.');
      let i;
  
      for (i = 0; i < pathValue.length - 1; i++) {
        obj = obj[pathValue[i]];
      }
  
      obj[pathValue[i]] = value;
    };
  
    const generateHighlightedText = (inputText: string, regions: number[] = []) => {
      let content = '';
      let nextUnhighlightedRegionStartingIndex = 0;
  
      regions.forEach(region => {
        const lastRegionNextIndex = region[1] + 1;
  
        content += [
          inputText.substring(nextUnhighlightedRegionStartingIndex, region[0]),
          `<span class="${highlightClassName}">`,
          inputText.substring(region[0], lastRegionNextIndex),
          '</span>',
        ].join('');
  
        nextUnhighlightedRegionStartingIndex = lastRegionNextIndex;
      });
  
      content += inputText.substring(nextUnhighlightedRegionStartingIndex);
  
      return content;
    };
  
    return fuseSearchResult
      .filter(({ matches }: any) => matches && matches.length)
      .map(({ item, matches }: any) => {
        const highlightedItem: any = { ...item };
  
        matches.forEach((match: any) => {
          set(highlightedItem, match.key, generateHighlightedText(match.value, match.indices));
        });
  
        return highlightedItem;
      });
  };
  
  


  searchTree(ls: Array<any>, term: string, allParent = true, allChildren = true) {
    let ids = this.searchTreeReturnId(ls, term, allParent, allChildren);
    return ls.filter((d) => ids.indexOf(d.Id) > -1);
  }

  searchTreeReturnId(ls: Array<any>, term: string, allParent = true, allChildren = true) {
    let ids = [];
    ls.forEach(item => {
      delete item.highlightedName;
    });
    let searchResults = this.fuseSearch(ls, term, ['Name', 'Code']);
    this.highlightedNames = searchResults;
    searchResults.forEach((result) => {
      const itemId = result.Id;
      if (!ids.includes(itemId)) {
        ids.push(itemId);
        if (allChildren) {
          lib.findChildren(ls, itemId, ids);
        }
        if (allParent) {
          lib.findParent(ls, itemId, ids);
        }
        const matchingItem = ls.find(item => item.Id === itemId);
        if (matchingItem) {
          matchingItem.highlightedName = result.Name;
        }
      }
      
    });
    return ids;
  }

  createSearchQueryMention(input, keys) {
    const parts = input.split(' ');
  
    const conditions = parts.map(part => {
      if (part.includes('@')) {
        const mention = part.replace('@', '');
        const orConditions = keys.map(key => ({ [key]: mention }));
        return { $or: orConditions };
      } else {
        const orConditions = keys.map(key => ({ [key]: part }));
        return { $or: orConditions };
      }
    });
  
    return { $and: conditions };
  }
}
