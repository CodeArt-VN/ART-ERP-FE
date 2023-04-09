
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EnvService } from '../services/core/env.service';
import { AccountService } from '../services/account.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        public router: Router,
        public env: EnvService,
        public accountService: AccountService
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise<boolean>(resolve => {
            if (!this.env.isloaded) {
                this.accountService.loadSavedData().then(_ => {
                    return this.checkCanUse(next, state).then(result => {
                        resolve(result);
                    });
                }).catch(err=>{
                    this.accountService.commonService.checkError(err);
                });
            } else {
                return this.checkCanUse(next, state).then(result => {
                    resolve(result);
                });
            }
        });
    }
    //sử dụng account của Union
    canActivate_backup(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return new Promise<boolean>(resolve => {
            this.env.getStorage('UserProfile').then((profile) => {
                if (profile) {
                    //console.log('')
                    this.env.user = profile;
                    resolve(true);
                } else {
                    this.accountService.logout().then(_ => {
                        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                        resolve(false);
                    });
                }
            });
        });

    }

    checkCanUse(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return new Promise<boolean>(resolve => {
            this.isUserCanUse(state.url).then((result: Boolean) => {
                if (result) {
                    resolve(true);
                }
                else {
                    if (this.env.user && this.env.user.Id) {
                        let firstView = this.env.user.Forms.filter(m => m.Type == 0 || m.Type == 1 || m.Type == 2)
                        if (firstView.length) {
                            if (state.url != '/default') {
                                console.log('Bạn không có quyền truy cập tại',state.url)
                                this.env.showTranslateMessage('erp.app.guards.no-permission-redirect','warning');
                            }
                            this.router.navigateByUrl(firstView[0].Code);
                            resolve(false);
                        }
                        else {
                            // not logged in so redirect to login page with the return url
                            this.env.showTranslateMessage('erp.app.guards.no-permission-contact','warning');
                            this.accountService.logout().then(_ => {
                                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                                resolve(false);
                            });
                        }

                    }
                    else {
                        // not logged in so redirect to login page with the return url
                        this.env.showTranslateMessage('erp.app.guards.no-permission-login','warning');

                        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                        resolve(false);

                    }
                }
            });
        })

    }

    isUserCanUse(functionCode) {
        return new Promise<boolean>(resolve => {
            //Chưa đăng nhập
            if (!this.env.user || !this.env.user.Id) {
                resolve(false);
            }
            else {
                if (functionCode == '/default') {
                    resolve(false);
                }
                else if (functionCode == '/not-found') {
                    resolve(true);
                }
                else {
                    let result = this.env.user.Forms.filter(m => {
                        let result = (m.Type == 0 || m.Type == 1 || m.Type == 2) && m.Code != '' && (functionCode.indexOf(m.Code) > -1);
                        if (result) {
                            //console.log(functionCode, m.Code);
                        }
                        return result;
                    }).length;
                    resolve(result > 0);
                }
            }

        })
    }
}
