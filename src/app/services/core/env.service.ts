import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';

import * as signalR from '@microsoft/signalr';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Observer, Subject, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { lib } from '../static/global-functions';
import { StorageService } from './storage.service';

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
    this.translate.use(value);
    this.setStorage('lang', value);
    this.language.current = value;
    this.language.isDefault = this.language.current == this.language.default;
    this.languageTracking.next(this.language);
  }

  /** Get current app version */
  version = environment.appVersion;

  /** Get current logged in user */
  user: any = {};

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

  /** Get network infomation */
  networkInfo: any = {
    isOnline: false,
  };

  /** Check app is ready */
  ready: Promise<any> | null;

  /** Last message was shown */
  lastMessage = '';

  /** app event tracking */
  public EventTracking = new Subject<any>();

  constructor(
    public plt: Platform,

    public storage: StorageService,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    public loadingController: LoadingController,
    public translate: TranslateService,
  ) {
    this.isMobile =((this.plt.is('ios') || this.plt.is('android')));
    this.ready = new Promise((resolve, reject) => {
      this.init().then(resolve).catch(reject);
    });
  }

  /**
   * Init enviroment
   * Create storage service handle
   * Request app load languages
   * Add network listener
   * Connet SignalR
   */
  async init() {
    await this.storage.init();
    this.typeList = await this.storage.get('SYS/Type');
    this.statusList = await this.storage.get('SYS/Status');
    this.publishEvent({ Code: 'app:loadLang' });
    Network.addListener('networkStatusChange', (status) => {
      this.publishEvent({ Code: 'app:networkStatusChange', status });
      console.log('Network status changed', status);
    });

    this.trackOnline().subscribe((isOnline) => {
      this.networkInfo.isOnline = isOnline;
    });

    const signalRConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.signalRServiceDomain + 'notify')
      .withAutomaticReconnect()
      .build();

    signalRConnection
      .start()
      .then(function () {
        console.log('SignalR Connected!');
      })
      .catch(function (err) {
        return console.error(err.toString());
      });

    signalRConnection.on('BroadcastMessage', (e) => {
      //console.log('BroadcastMessage', e);
      //this.publishEvent({})
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
        case 'AppReload':
          location.reload();
          break;
        case 'SystemMessage':
          this.showMessage(e.value, e.name);
          break;
        case 'AppReloadOldVersion':
          if (e.value.localeCompare(this.version) > 0) {
            location.reload();
          }
          break;
        case 'SystemAlert':
          this.showAlert(e.value, null, e.name);
          break;
        default:
          break;
      }
    });
    signalRConnection.on('SendMessage', (user, message) => {
      console.log('SendMessage', user, message);
      //this.publishEvent({})
    });
    signalRConnection.on('SaleOrdersUpdated', (IDBranch, Ids) => {
      console.log('SaleOrdersUpdated', IDBranch, Ids);
      this.publishEvent({ Code: 'sale-order-mobile' });
    });
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
      }),
    );
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
  showMessage(message, color = '', value = null, duration = 5000, showCloseButton = false) {
    this.translate.get(message, { value: value }).subscribe((translatedMessage: string) => {
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

  /** @deprecated Deprecated, do not use. */
  showAlert(message, subHeader = null, header = null, okText = 'Ok') {
    Promise.all([
      this.translateResource(message),
      this.translateResource(subHeader),
      this.translateResource(header),
      this.translateResource(okText),
    ]).then((values) => {
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
      ]).then((values) => {
        let option: any = {
          header: values[2],
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

  translateResource(resource) {
    return new Promise((resolve) => {
      if (resource == null) {
        resolve(null);
      } else {
        let key = typeof resource === 'object' ? resource.code : resource;
        let value = typeof resource === 'object' ? resource : { value: null };

        this.translate.get(key, value).subscribe((translatedValue: string) => {
          console.log(key, value, translatedValue);

          resolve(translatedValue);
        });
      }
    });
  }

  /**
   * Get storage
   * @param key The key to get storage
   * @returns Return the storage
   */
  getStorage(key) {
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
    this.publishEvent({ Code: 'changeBranch' });

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
          let form = this.user.Forms.find(
            (d) => functionCode.startsWith('/' + d.Code + '/') && (d.Type == 0 || d.Type == 1 || d.Type == 2),
          );
          resolve(form != null);
        }
      }
    });
  }

  getConfig() {}

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
}
