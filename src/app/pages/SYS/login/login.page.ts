import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageBase } from 'src/app/page-base';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccountService } from '../../../services/account.service';
import { EnvService } from 'src/app/services/core/env.service';
import { ActivatedRoute } from '@angular/router';
import { BRA_BranchProvider } from 'src/app/services/static/services.service';
import { CommonService } from 'src/app/services/core/common.service';
import { ApiSetting } from 'src/app/services/static/api-setting';
//import * as _ from 'lodash'; 
import { CustomService } from 'src/app/services/custom.service';
import { environment } from 'src/environments/environment';

var URLSearchParams: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage extends PageBase {
    email: string = '';
    password: string = '';
    formGroup: FormGroup;
    submitAttempt = false;
    returnUrl: string;
    showForgotPassword = false;
    partnerList = [];
    randomImg = '';

    constructor(

        public pageProvider: CustomService,
        public accountService: AccountService,
        public env: EnvService,
        public partnerProvider: BRA_BranchProvider,

        public navCtrl: NavController,
        public formBuilder: FormBuilder,
        public loadingCtrl: LoadingController, 
        public route: ActivatedRoute,
        public commonService: CommonService,
    ) {
        super();
        

        if (this.env.user && this.env.user.Id) {
            this.preLoadData();
        }
        this.formGroup = formBuilder.group({
            UserName: ['', Validators.compose([Validators.required])],
            Password: ['', Validators.compose([Validators.required])]
        });

        this.route.fragment.subscribe((fragment: string) => {
            if(!fragment)
                return;
            let external_access_token = fragment.match(/(?:external_access_token)\=([\S\s]*?)\&/)[1];
            let provider = fragment.match(/(?:provider)\=([\S\s]*?)\&/)[1];
            if(provider && external_access_token)
                this.ObtainLocalAccessToken(provider, external_access_token);
        })
    }

    events(e){
        if(e.Code == 'app:loadedLocalData'){
            this.preLoadData();
        }
    }

    preLoadData() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        
        if (this.env.user && this.env.user.Id) {
            this.nav( this.returnUrl, 'back');
        }

        this.env.getStorage('Username').then(v=>{
            this.email = v;
        })
    }

    goBack() {
        this.nav( this.returnUrl, 'back');
        //this.navCtrl.back();
    }

    forgotPassword() {
        this.loadingCtrl.create({
            message: 'Vui lòng chờ gửi email...'
        }).then(loading => {
            loading.present();

            this.accountService.forgotPassword(this.email)
                .then(data => {
                    loading.dismiss();
                    this.env.showTranslateMessage('erp.app.pages.sys.login.message.forgot-password','danger', null, 0, true);
                })
                .catch(err => {
                    loading.dismiss();

                    if (err.error && typeof (err.error.loaded) == 'number' && err.error.loaded == 0) {
                        this.env.showTranslateMessage('erp.app.pages.sys.login.message.can-not-connect');
                    } else if (err.status == 404) {
                        this.env.showTranslateMessage('erp.app.pages.sys.login.message.can-not-find-email');
                    }
                    else {
                        this.env.showTranslateMessage('erp.app.pages.sys.login.message.can-not-send-email');
                    }
                });
        })
    }

    
    login() {
        if(this.email.indexOf('@')==-1){
            this.email += environment.loginEmail;
        }
        this.submitAttempt = true;
        if (!this.formGroup.valid) {
            return;
        }

        this.loadingCtrl.create({
            message: 'Vui lòng chờ đăng nhập và đồng bộ dữ liệu...'
        }).then(loading => {
            loading.present();
            this.accountService.login(this.email, this.password)
                .then(data => {
                    loading.dismiss();
                    this.goBack();
                })
                .catch(err => {
                    loading.dismiss();
                    if (err.error && typeof (err.error.loaded) == 'number' && err.error.loaded == 0) {
                        this.env.showTranslateMessage('erp.app.pages.sys.login.message.can-not-connect','danger');
                    } else if (err.error && err.error.error_description && err.error.error_description.indexOf("locked out") > -1) {
                        this.env.showTranslateMessage('erp.app.pages.sys.login.message.lock-or-not-active','danger');
                    } else if (err.error && err.error.error_description && err.error.error_description.indexOf("user name or password is incorrect") > -1) {
                        this.env.showTranslateMessage('erp.app.pages.sys.login.message.username-password-incorrect','danger');
                    }
                    else {
                        this.env.showTranslateMessage('erp.app.pages.sys.login.message.can-not-login','danger');
                    }
                });
        })
    }

    ObtainLocalAccessToken(provider, externalAccessToken){
        this.loadingCtrl.create({
            message: 'Vui lòng chờ đăng nhập và đồng bộ dữ liệu...'
        }).then(loading => {
            loading.present();

            this.accountService.ObtainLocalAccessToken(provider, externalAccessToken)
                .then(data => {
                    loading.dismiss();
                    this.goBack();
                })
                .catch(err => {
                    loading.dismiss();
                    this.env.showTranslateMessage('erp.app.pages.sys.login.message.can-not-login');
                });
        })
    }

    facebooklogin() {
        //TODO: facebook login
		//http://bitoftech.net/2014/08/11/asp-net-web-api-2-external-logins-social-logins-facebook-google-angularjs-app/
		//https://stackoverflow.com/questions/21065648/asp-net-web-api-2-how-to-login-with-external-authentication-services
		//1. GET /api/Account/ExternalLogins?returnUrl=%2F&generateState=true
		// => call Facebook provider URL
        //2. Redirected to http://hungvq-w10.local:54009/BOOKING/login#external_access_token=ggg&provider=Facebook&haslocalaccount=True&external_user_name=Hùng%20Vũ
        // => gọi ObtainLocalAccessToken => lấy token.



        this.loadingCtrl.create({
            message: 'Vui lòng chờ đăng nhập và đồng bộ dữ liệu...'
        }).then(loading => {
            loading.present();

            this.accountService.getExternalLogins()
                .then((data: [any]) => {

                    var it = data.filter(ite => ite.Name == 'Facebook');
                    if (it.length) {
                        let ExternalLoginURL = ApiSetting.mainService.base + it[0].Url;
                        window.location.replace(ExternalLoginURL);
                        //Sau khi pass chalenge lấy fragment từ URL redirect về và gọi ObtainLocalAccessToken(string provider, string externalAccessToken) để lấy token.
                        //xem tiếp preLoadData()
                    }
                    loading.dismiss();
                    // this.goBack();
                })
                .catch(err => {
                    loading.dismiss();
                    this.env.showTranslateMessage('erp.app.pages.sys.login.message.can-not-login','danger');
                });
        });
    }

    googlelogin(){
        this.loadingCtrl.create({
            message: 'Vui lòng chờ đăng nhập và đồng bộ dữ liệu...'
        }).then(loading => {
            loading.present();

            this.accountService.getExternalLogins()
                .then((data: [any]) => {

                    var it = data.filter(ite => ite.Name == 'Google');
                    if (it.length) {
                        let ExternalLoginURL = ApiSetting.mainService.base + it[0].Url;
                        window.location.replace(ExternalLoginURL);
                        //Sau khi pass chalenge lấy fragment từ URL redirect về và gọi ObtainLocalAccessToken(string provider, string externalAccessToken) để lấy token.
                        //xem tiếp preLoadData()
                    }
                    loading.dismiss();
                    // this.goBack();
                })
                .catch(err => {
                    loading.dismiss();
                    this.env.showTranslateMessage('erp.app.pages.sys.login.message.can-not-login');
                });
        });
    }

    ionViewWillEnter() {
        super.ionViewWillEnter();
        this.env.publishEvent({Code: 'app:ShowMenu', Value: false});
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
    }

    ionViewWillLeave() {
        this.env.publishEvent({Code:'app:ShowMenu',Value: true});
    }


}
