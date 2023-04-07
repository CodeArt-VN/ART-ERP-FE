import { Injectable } from '@angular/core';
import { Platform, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { Network } from '@capacitor/network';
import * as signalR from '@microsoft/signalr';
import { lib } from '../static/global-functions';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class EnvService {
    version = environment.appVersion;
    user: any = {};
    isloaded = false;
    deviceInfo: any = null;
    rawBranchList = [];
    branchList = [];
    jobTitleList = [];
    selectedBranch = null;
    selectedBranchAndChildren = null;
    statusList = [];
    typeList = [];

    isMobile = false;
    isOnline = false;
    isMapLoaded = false;
    networkInfo = {
        IsOnline: false
    }

    ready: Promise<any> | null;

    lastMessage = '';

    private _storage: Storage | null = null;


    public EventTracking = new Subject<any>();

    constructor(
        public plt: Platform,
        public storage: Storage,
        public toastController: ToastController,
        public alertCtrl: AlertController,
        public loadingController: LoadingController,
        public translate: TranslateService
    ) {
        this.isMobile = this.plt.is('mobile');
        this.ready = new Promise((resolve, reject) => {
            this.init().then(resolve).catch(reject);
        });

        
    }
    
    
    async init() {
        console.log('init env');
        
        // If using, define drivers here: await this.storage.defineDriver(/*...*/);
        this._storage = await this.storage.create();
        this.publishEvent({ Code: 'app:loadLang' });
        Network.addListener('networkStatusChange', status => {
            console.log('Network status changed', status);
        });

        // this.network.onDisconnect().subscribe(() => {
        //     this.networkInfo.IsOnline = false;
        //     this.isOnline = false;
        // });
        // this.network.onConnect().subscribe(() => {
        //     this.networkInfo.IsOnline = true;
        //     this.isOnline = true;
        // });

        this.trackOnline().subscribe(isOnline => {
            this.isOnline = isOnline;
        });

        const connection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Information)
            .withUrl(environment.signalRServiceDomain + 'notify')
            .withAutomaticReconnect()
            .build();

        connection.start().then(function () {
            console.log('SignalR Connected!');
        }).catch(function (err) {
            return console.error(err.toString());
        });

        connection.on("BroadcastMessage", (e) => {
            console.log('BroadcastMessage', e);
            //this.publishEvent({})

            if (e.code == 'SystemAlert') {
                this.showAlert(e.value, null, e.name);
            }
            else if (e.code == 'SystemMessage') {
                this.showMessage(e.value, e.name);
            }
            else if (e.code == 'AppReload') {
                location.reload();
            }
            else if (e.code == 'AppReloadOldVersion') {
                if (e.value.localeCompare(this.version) > 0) {
                    location.reload();
                }
            }



        });
        connection.on("SendMessage", (user, message) => {
            console.log('SendMessage', user, message);
            //this.publishEvent({})
        });
        connection.on("SaleOrdersUpdated", (IDBranch, Ids) => {
            console.log('SaleOrdersUpdated', IDBranch, Ids);
            this.publishEvent({ Code: 'sale-order-mobile' });
        });



    }

    printOut() {
        //console.log(this.user);
    }

    forceLoadUserData() {
        return new Promise(resolve => {

        });
    }

    publishEvent(data: any) {
        this.EventTracking.next(data);
    }

    getEvents(): Subject<any> {
        return this.EventTracking;
    }

    trackOnline() {
        return merge<boolean>(
            fromEvent(window, 'offline').pipe(map(() => false)),
            fromEvent(window, 'online').pipe(map(() => true)),
            new Observable((sub: Observer<boolean>) => {
                sub.next(navigator.onLine);
                sub.complete();
            }));
    }

    showTranslateMessage(key, color = '', value = null, duration = 5000, showCloseButton = false) {
        this.translate.get(key, { value: value }).subscribe((message: string) => {
            this.showMessage(message, color, duration, showCloseButton);
        });
    }

    showMessage(message, color = 'warning', duration = 5000, showCloseButton = false) {
        if (this.lastMessage == message) return;
        this.lastMessage = message;

        setTimeout(() => {
            this.lastMessage = '';
        }, 5000);
        
        if (!showCloseButton) {
            this.toastController.create({
                message: message,
                color: color,
                duration: duration,
                buttons: [showCloseButton ? { text: 'Close', role: 'close' } : {}]
            }).then(toast => {
                toast.present();
            });
        }
        else {
            this.alertCtrl.create({
                //header: 'DMS',
                //subHeader: '---',
                message: message,
                buttons: [
                    // {
                    //     text: 'Không',
                    //     role: 'cancel',
                    //     handler: () => {
                    //         //console.log('Không xóa');
                    //     }
                    // },
                    {
                        text: 'OK',
                        cssClass: 'danger-btn',
                        handler: () => { }
                    }
                ]
            }).then(alert => {
                alert.present();
            })
        }


    }

    showAlert(message, subHeader = null, header = null, okText = 'OK') {
        let option: any = {
            header: header,
            subHeader: subHeader,
            message: message,
            buttons: [
                {
                    text: okText,
                    cssClass: 'danger-btn',
                    handler: () => { }
                }
            ]
        };

        this.alertCtrl.create(option).then(alert => {
            alert.present();
        })
    }

    showPrompt(message, subHeader = null, header = null, okText = 'Đồng ý', cancelText = 'Không', inputs = null) {
        return new Promise((resolve, reject) => {

            let option: any = {
                header: header,
                subHeader: subHeader,
                message: message,
                buttons: [
                    {
                        text: cancelText, role: 'cancel',
                        handler: () => {
                            reject(false);
                        }
                    },
                    {
                        text: okText,
                        cssClass: 'danger-btn',
                        handler: (alertData) => {
                            resolve(alertData);
                        }
                    }
                ]
            };

            if (inputs) {
                option.inputs = inputs;
            }

            this.alertCtrl.create(option).then(alert => {
                alert.present();
            })
        });
    }

    showLoading(message, promise){
        return new Promise((resolve, reject) => {
            this.loadingController.create({ cssClass: 'my-custom-class', message: message}).then((loading) => 
            {
                loading.present();
                promise.then(result=>{
                    if (loading) loading.dismiss();
                    resolve(result);
                        
                }).catch(err => {
                    if (loading) loading.dismiss();
                    reject(err);
                });
            });
        });
    }

    getStorage(key) {
        return this._storage?.get(key);
    }

    setStorage(key: string, value: any) {
        return this._storage?.set(key, value);
    }

    clearStorage() {
        return this._storage?.clear();
    }

    loadBranch() {
        return new Promise((resolve) => {
            lib.buildFlatTree(this.rawBranchList, [], true).then((resp: any) => {
                this.branchList = [];
                this.jobTitleList = [];
                for (let ix = 0; ix < resp.length; ix++) {
                    const i = resp[ix];
                    i.Name = i.ShortName ? i.ShortName : i.Name;
                    i.disabled = true;
                    if (i.IDType != 119) {
                        this.branchList.push(i);
                    }
                    this.jobTitleList.push(Object.assign({}, i));
                }
                for (let ix = 0; ix < this.branchList.length; ix++) {
                    const i = this.branchList[ix];
                    i.IDs = [null];
                    this.getChildrenDepartmentID(i.IDs, i.Id);
                }
                for (let ix = 0; ix < this.branchList.length; ix++) {
                    const i = this.branchList[ix];
                    i.Query = JSON.stringify(i.IDs);

                }

                this.getStorage('selectedBranch').then(val => {
                    if (this.user) {
                        for (let ix = 0; ix < this.user.Branchs.length; ix++) {
                            const b = this.user.Branchs[ix];
                            this.enablePermissionNode(b, this.branchList);
                            this.enablePermissionNode(b, this.jobTitleList);
                        }

                        setTimeout(() => {
                            for (let ix = 0; ix < this.jobTitleList.length; ix++) {
                                const i = this.jobTitleList[ix];
                                if (i.IDType != 119) {
                                    i.disabled = true;
                                }
                            }
                        }, 0);

                        this.branchList = [...this.branchList];
                    }

                    let selected = null;

                    if (val) {
                        selected = this.branchList.find(d => d.Id == val && d.disabled == false);
                    }
                    if (!selected) {
                        selected = this.branchList.find(d => d.Id == this.user.IDBranch);
                    }

                    if (selected) {
                        this.selectedBranch = selected.Id;
                        this.selectedBranchAndChildren = selected.Query;
                    }
                    else {
                        this.selectedBranch = 0;
                        this.selectedBranchAndChildren = [0];
                    }

                    resolve(true);
                });
            });
        });
    }

    changeBranch() {
        this.setStorage('selectedBranch', this.selectedBranch);
        let selectedBranch = this.branchList.find(d => d.Id == this.selectedBranch);
        this.selectedBranchAndChildren = selectedBranch.Query;
        this.publishEvent({ Code: 'changeBranch' });
    }

    getStatus(Code: string): Promise<any[]> {
        return new Promise((resolve) => {
            let it = this.statusList.find(d => d.Code == Code);
            if (it)
                resolve(this.statusList.filter(d => d.IDParent == it.Id));
            else
                resolve([]);
        });
    }
    getType(Code: string, AllChild = false): Promise<any[]> {
        return new Promise((resolve) => {
            let it = this.typeList.find(d => d.Code == Code);
            if (it) {
                if (AllChild) {
                    let ids = lib.findChildren(this.typeList, it.Id);
                    let childs = this.typeList.filter(d => ids.includes(d.Id));
                    lib.buildFlatTree(childs, [], true, it).then((result: any) => {
                        resolve(result);
                    })
                }
                else
                    resolve(this.typeList.filter(d => d.IDParent == it.Id));
            }
            else
                resolve([]);
        });
    }

    getBranch(Id: number, AllChild = false): Promise<any[]> {
        return new Promise((resolve) => {
            let it = this.branchList.find(d => d.Id == Id);
            if (it) {
                if (AllChild) {
                    let ids = lib.findChildren(this.branchList, it.Id);
                    let childs = this.branchList.filter(d => ids.includes(d.Id));
                    lib.buildFlatTree(childs, [], true, it).then((result: any) => {
                        resolve(result);
                    })
                }
                else
                    resolve(this.branchList.filter(d => d.IDParent == it.Id));
            }
            else
                resolve([]);
        });
    }

    getJobTitle(Id: number, AllChild = false): Promise<any[]> {
        return new Promise((resolve) => {
            let it = this.jobTitleList.find(d => d.Id == Id);
            if (it) {
                if (AllChild) {
                    let ids = lib.findChildren(this.jobTitleList, it.Id);
                    let childs = this.jobTitleList.filter(d => ids.includes(d.Id));
                    lib.buildFlatTree(childs, [], true, it).then((result: any) => {
                        resolve(result);
                    })
                }
                else
                    resolve(this.jobTitleList.filter(d => d.IDParent == it.Id));
            }
            else
                resolve([]);
        });
    }

    private enablePermissionNode(id, list) {
        let currentItem = list.find(i => i.Id == id);
        if (currentItem) {
            currentItem.disabled = false;
            lib.markNestedNode(list, id, 'disabled', true);
        }
    }

    private getChildrenDepartmentID(ids, id) {
        ids.push(id);
        let children = this.branchList.filter(i => i.IDParent == id);
        for (let ix = 0; ix < children.length; ix++) {
            const i = children[ix];
            this.getChildrenDepartmentID(ids, i.Id);
        }
    }


}

