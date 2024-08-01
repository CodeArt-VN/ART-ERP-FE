import { Injectable } from '@angular/core';
import { APIList, GlobalData } from '../services/static/global-variable';
import { CommonService } from '../services/core/common.service';
import { ApiSetting } from './static/api-setting';
import { EnvService } from './core/env.service';
import { Platform } from '@ionic/angular';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { lib } from './static/global-functions';
import { SYS_StatusProvider, SYS_TypeProvider, SYS_UserDeviceProvider } from './static/services.service';
import { Device } from '@capacitor/device';
import { Capacitor } from '@capacitor/core';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { environment } from 'src/environments/environment';
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  accountLoaded = false;
  constructor(
    public commonService: CommonService,
    private statusProvider: SYS_StatusProvider,
    private typeProvider: SYS_TypeProvider,
    private userDeviceProvider: SYS_UserDeviceProvider,

    public env: EnvService,
    public plt: Platform,
  ) {
    // this.plt.ready().then(() => {
    //   this.loadSavedData()
    //     .then(() => {
    //       console.log('loaded saved data');
    //     })
    //     .catch((err) => {
    //       this.commonService.checkError(err);
    //     });
    // });
    // Done: flow
    // 1. check app version
    //   => old: clear all
    // 2. check token
    //   => null || expire: clear all
    // 3. get user info
    //   => fail: clear all
  }

  loadSavedData(forceReload = false) {
    return new Promise((resolve, reject) => {
      if (this.accountLoaded && !forceReload) {
        resolve(true);
      } else {
        this.checkVersion().then((v) => {
          GlobalData.Version = v;
          this.getToken().then(() => {
            this.getProfile(forceReload)
              .then(() => {
                this.accountLoaded = true;
                setTimeout(() => {
                  if (this.env.user) {
                    let woopraId = {
                      id: this.env.user.Id,
                      email: this.env.user.Email,
                      name: this.env.user.FullName,
                      avatar: this.env.user.Avatar,
                    };
                    let woopraInterval: any = setInterval(() => {
                      if (window?.woopra) {
                        window.woopra.identify(woopraId);
                        window.woopra.push();
                        if (woopraInterval) {
                          clearInterval(woopraInterval);
                          woopraInterval = null;
                        }
                      }
                    }, 3000);
                  }
                }, 2000);

                this.env.isloaded = true;
                this.env.publishEvent({
                  Code: 'app:loadedLocalData',
                });
                resolve(true);
              })
              .catch((err) => {
                reject(err);
              });

            //TODO: lazy check profile;
            if (!forceReload)
              this.commonService
                .connect('GET', 'Account/UserName', null)
                .toPromise()
                .then((userName) => {
                  if (this.env?.user?.Id && this.env.user.UserName != userName) {
                    this.env.setStorage('appVersion', '0.0');
                    this.checkVersion();
                  } else {
                    setTimeout(() => {
                      this.getProfile(true)
                        .then(() => {
                          this.env.publishEvent({ Code: 'app:loadedLocalData' });
                        })
                        .catch((err) => {
                          reject(err);
                        });
                    }, 1500);
                  }
                })
                .catch((err) => {
                  this.commonService.checkError(err);
                });
          });
        });
      }
    });
  }

  checkVersion() {
    return new Promise((resolve) => {
      this.env?.ready?.then((_) => {
        Promise.all([this.env.getStorage('appDomain'), this.env.getStorage('appVersion')])
          .then((values) => {
            let appDomain = values[0];
            let version = values[1];

            if (appDomain && appDomain != environment.appDomain) {
              environment.appDomain = appDomain;
            }

            if (this.env.version != version) {
              GlobalData.Token = {
                access_token: 'no token',
                expires_in: 0,
                token_type: '',
                refresh_token: 'no token',
              };
              this.env.clearStorage().then((_) => {
                this.env.setStorage('UserToken', GlobalData.Token).then(() => {
                  this.env.user = null;
                  this.env.setStorage('UserProfile', null).then(() => {
                    this.env.setStorage('appVersion', this.env.version).then(() => {
                      location.reload();
                      //resolve(this.env.version);
                    });
                  });
                });
              });
            } else {
              resolve(this.env.version);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  }
  setToken(token) {
    if (token != null) {
      GlobalData.Token = token;
    } else {
      GlobalData.Token = {
        access_token: 'no token',
        expires_in: 0,
        token_type: '',
        refresh_token: 'no token',
      };
    }
    return this.env.setStorage('UserToken', GlobalData.Token);
  }

  getToken() {
    return new Promise((resolve) => {
      this.env?.getStorage('UserToken')?.then((token) => {
        if (token != null) {
          let expires = new Date(token['.expires']);
          let cDate = new Date();
          cDate.setDate(cDate.getDate() + 2);

          if (expires > cDate) {
            GlobalData.Token = token;
          } else {
            GlobalData.Token = null;
          }
        } else {
          GlobalData.Token = null;
        }
        resolve(GlobalData.Token);
      });
    });
  }

  settingList = ['Theme', 'IsCompactMenu', 'IsCacheQuery', 'PinnedForms'];
  loadUserSettings(settings, profile = this.env.user) {
    let userSetting = {};
    for (let idx = 0; idx < this.settingList.length; idx++) {
      const s = this.settingList[idx];
      let setting = settings ? settings.find((d) => d.Code == s) : null;

      if (setting && setting.Value) {
        try {
          setting.Value = JSON.parse(setting.Value);
        } catch (error) {}
      } else {
        setting = {
          Id: 0,
          Code: s,
          Value: null,
          IDUser: profile.Id,
          Email: profile.Email,
        };
      }
      userSetting[s] = setting;
    }
    return userSetting;
  }

  getProfile(forceReload = false) {
    return new Promise((resolve, reject) => {
      if (forceReload) {
        this.syncGetUserData()
          .then(() => {
            this.loadSavedProfile()
              .then(() => {
                resolve(true);
              })
              .catch((err) => reject(err));
          })
          .catch((err) => reject(err));
      } else {
        this.loadSavedProfile()
          .then(() => {
            resolve(true);
          })
          .catch((err) => reject(err));
      }
    });
  }

  syncGetUserData() {
    let that = this;
    return new Promise(function (resolve, reject) {
      Promise.all([
        that.statusProvider.read({ Take: 10000 }, true),
        that.typeProvider.read({ Take: 10000 }, true),
        that.commonService
          .connect(APIList.ACCOUNT.getUserData.method, APIList.ACCOUNT.getUserData.url + '?GetMenu=true', null)
          .toPromise(),
      ])
        .then((values: any[]) => {
          that.env.statusList = values[0]['data'];
          that.env.typeList = values[1]['data'];

          let data = values[2];
          if (data) {
            data.Avatar = data.Avatar
              ? data.Avatar.indexOf('http') != -1
                ? data.Avatar
                : environment.appDomain + data.Avatar
              : null;

            lib.buildFlatTree(data.Forms, data.Forms, true).then((resp: any) => {
              data.Forms = resp.filter((d) => !d.isMobile);
              that
                .setProfile(data)
                .then((_) => {
                  resolve(true);
                })
                .catch((err) => reject(err));
            });
          }
        })
        .catch((err) => reject(err));
    });
  }

  setProfile(profile) {
    return new Promise((resolve, reject) => {
      this.env.setStorage('UserProfile', profile).then((_) => {
        resolve(true);
      });
    });
  }

  loadSavedProfile() {
    return new Promise((resolve, reject) => {
      this.env
        .getStorage('UserProfile')
        .then((profile) => {
          if (profile && profile.Id) {
            let settings = null;
            if (Array.isArray(profile.UserSetting)) {
              settings = lib.cloneObject(profile.UserSetting);
              profile.UserSetting = this.loadUserSettings(settings, profile);
            }
            this.env.user = profile;
            this.env.rawBranchList = profile.BranchList;
            this.env.loadBranch().then((_) => {
              this.env.publishEvent({
                Code: 'app:updatedUser',
              });
              resolve(true);
            });
          } else {
            this.env.user = null;
            this.env.rawBranchList = [];
            this.env.loadBranch().then((_) => {
              this.env.publishEvent({ Code: 'app:updatedUser' });
              resolve(true);
            });
          }
        })
        .catch((err) => reject(err));
    });
  }

  register(username, password, confirmpassword, PhoneNumber, FullName) {
    var that = this;
    return new Promise(function (resolve, reject) {
      let data = {
        Email: username,
        Password: password,
        ConfirmPassword: confirmpassword,
        FullName: FullName,
        PhoneNumber: PhoneNumber,
      };

      that.commonService
        .connect('POST', APIList.ACCOUNT.register.url, data)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            reject(error);
            return throwError(error);
          }),
        )
        .subscribe((data) => {
          that
            .login(username, password)
            .then(() => {
              resolve(true);
            })
            .catch((err) => {
              reject(err);
            });
        });
    });

    // return new Promise(function (resolve, reject) {
    // 	let params = new URLSearchParams();
    // 	let data = {
    // 		Email: username,
    // 		Password: password,
    // 		ConfirmPassword: confirmpassword,
    // 		FullName: FullName,
    // 		PhoneNumber: PhoneNumber,
    // 	};

    // 	this.commonService.
    // 	that.http.post(APIList.ACCOUNT.register.url, data)
    // 		.pipe(
    // 			// tap(_ => {
    // 			// 	// //console.log(URL)
    // 			// }),
    // 			catchError(that.handleError(URL))
    // 		)
    // 		.subscribe(data => {
    // 			that.login(username, password)
    // 				.then(() => {
    // 					resolve(true);
    // 				})
    // 				.catch(err => {
    // 					reject(err);
    // 				});
    // 		});
    // });
  }

  login(username, password) {
    // let notifiToken = null;
    // if(Capacitor.getPlatform() !== 'web'){
    // 	PushNotifications.register();
    // 	PushNotifications.addListener('registration', (token: Token) => {
    // 		notifiToken = token.value;
    // 	});
    // }
    var that = this;
    return new Promise(async function (resolve, reject) {
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.set('grant_type', 'password');
      urlSearchParams.set('username', username);
      urlSearchParams.set('password', password);

      let deviceInfo: any = null;
      if (Capacitor.isPluginAvailable('Device')) {
        let info = await Device.getInfo();
        let UID = await Device.getId();
        let NotifyToken = await that.env.getStorage('NotifyToken').then((result) => {
          if (result) {
            return result;
          } else {
            return null;
          }
        });
        deviceInfo = {
          Id: 0,
          Code: UID.identifier,
          Name: info.name,
          Model: info.model,
          Platform: info.platform,
          OperatingSystem: info.operatingSystem,
          OsVersion: info.osVersion,
          Manufacturer: info.manufacturer,
          IsVirtual: info.isVirtual,
          WebViewVersion: info.webViewVersion,
          NotifyToken: NotifyToken,
        };
      }

      let data = urlSearchParams.toString();

      that.commonService
        .connect('Login', APIList.ACCOUNT.token.url, data)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            reject(error);
            return throwError(error);
          }),
        )
        .subscribe((data) => {
          if (data) {
            that.setToken(data).then((_) => {
              if (deviceInfo) {
                that.userDeviceProvider.save(deviceInfo).then((info) => {
                  if (!info) {
                    that.env.deviceInfo = null;
                  } else if (info == 'This device was registered') {
                    that.env.deviceInfo = null;
                  } else {
                    that.env.deviceInfo = info;
                  }
                });
              }
              that
                .loadSavedData(true)
                .then(() => {
                  resolve(true);
                })
                .catch((err) => {
                  reject(err);
                });
            });
          } else {
            reject('Can not login!');
          }
        });
    });
  }

  ObtainLocalAccessToken(provider, externalAccessToken) {
    var that = this;
    return new Promise(function (resolve, reject) {
      let data = {
        provider: provider,
        externalAccessToken: externalAccessToken,
      };

      that.commonService
        .connect(APIList.ACCOUNT.getObtainLocalAccessToken.method, APIList.ACCOUNT.getObtainLocalAccessToken.url, data)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            reject(error);
            return throwError(error);
          }),
        )
        .subscribe((data) => {
          if (data) {
            that.setToken(data).then((_) => {
              that
                .loadSavedData(true)
                .then(() => {
                  resolve(true);
                })
                .catch((err) => {
                  reject(err);
                });
            });
          } else {
            reject('Can not login!');
          }
        });
    });
  }

  logout() {
    var that = this;
    var curentUsername = this.env?.user?.UserName;

    var currentVersion = this.env?.version;
    return new Promise(function (resolve, reject) {
      that.env.clearStorage().then((_) => {
        that.env.setStorage('appVersion', currentVersion);

        that.setToken(null);
        that
          .setProfile(null)
          .then((_) => {
            Promise.all([that.loadSavedProfile(), that.env.setStorage('Username', curentUsername)]).then(() => {
              that.env.publishEvent({ Code: 'app:updatedUser' });
              resolve(true);
            });
          })
          .catch((err) => reject(err));
      });
    });
  }

  forgotPassword(email) {
    let data = { Email: email };
    return this.commonService
      .connect(APIList.ACCOUNT.forgotPassword.method, APIList.ACCOUNT.forgotPassword.url, data)
      .toPromise();
  }

  getExternalLogins() {
    let that = this;
    return new Promise(function (resolve, reject) {
      that.commonService
        .connect(APIList.ACCOUNT.getExternalLogins.method, APIList.ACCOUNT.getExternalLogins.url, null)
        .toPromise()
        .then((data: any) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
          return Promise.reject(err.message || err);
        });
    });
  }
}
