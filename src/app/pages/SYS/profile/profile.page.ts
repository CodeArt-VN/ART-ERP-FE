import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { CompareValidator } from 'src/app/services/core/validators';
import {
  HRM_StaffProvider,
  SYS_UserDeviceProvider,
  SYS_UserSettingProvider,
} from 'src/app/services/static/services.service';
import { ACCOUNT_ApplicationUserProvider } from 'src/app/services/custom.service';
import { CommonService } from 'src/app/services/core/common.service';
import { ApiSetting } from 'src/app/services/static/api-setting';
import { lib } from 'src/app/services/static/global-functions';
import { AccountService } from 'src/app/services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage extends PageBase {
  avatarURL = 'assets/imgs/avartar-empty.jpg';
  segmentView = 's1';
  passwordViewType = 'password';
  minDOB = '';
  maxDOB = '';

  changePasswordForm: FormGroup;

  @ViewChild('importfile') importfile: any;

  hasBaseDropZoneOver = false;
  userSetting = null;

  constructor(
    public pageProvider: HRM_StaffProvider,
    public accountProvider: AccountService,
    public userProvider: ACCOUNT_ApplicationUserProvider,
    public userSettingProvider: SYS_UserSettingProvider,
    public userDeviceProvider: SYS_UserDeviceProvider,

    public env: EnvService,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public cdr: ChangeDetectorRef,
    public alertCtrl: AlertController,
    public loadingController: LoadingController,
    public commonService: CommonService,
  ) {
    super();

    this.pageConfig.isDetailPage = true;

    this.formGroup = formBuilder.group({
      Id: new FormControl({ value: '', disabled: true }),
      IDBranch: new FormControl(),
      Code: [{ value: '' }],
      Name: new FormControl('', Validators.maxLength(128)),
      Remark: new FormControl(),
      IDDepartment: new FormControl('', Validators.required),
      IDJobTitle: new FormControl('', Validators.required),
      IsDisabled: new FormControl(),

      LastName: new FormControl(),

      Title: new FormControl(),
      FirstName: new FormControl(),

      FullName: new FormControl('', Validators.required),
      ShortName: new FormControl(),
      Gender: new FormControl(),
      DOB: new FormControl(),
      PhoneNumber: new FormControl(),
      Email: new FormControl({ value: '', disabled: true }),
      Address: new FormControl(),
      ImageURL: new FormControl(),

      IdentityCardNumber: new FormControl(),
      Domicile: new FormControl(),
      DateOfIssueID: new FormControl(),
      IssuedBy: new FormControl(),

      BackgroundColor: new FormControl(),
    });

    this.changePasswordForm = formBuilder.group({
      // Email: ['', Validators.required],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, CompareValidator.confirmPassword])],
    });
    this.changePasswordForm.controls['confirmPassword'].setParent(this.changePasswordForm);

    // this.uploader.onBeforeUploadItem = (item) => {
    // 	let UploadAPI = ApiSetting.apiDomain('CUS/FILE/UploadAvatar/' + this.item.Code);
    // 	item.url = UploadAPI;
    // }

    // this.uploader.onSuccessItem = (item, response, status: number, headers) => {

    // 	this.uploader.clearQueue();
    // 	//console.log(response);
    // 	this.avatarURL = environment.staffAvatarsServer + this.item.Code + '.jpg?t=' + new Date().getTime();

    // 	if (this.env.user.Email == this.item.Email) {
    // 		//reload avatar in user cp
    // 		this.env.user.Avatar = this.avatarURL;

    // 		//this.accountService.setProfile(GlobalData.Profile);
    // 		//this.events.publish('app:UpdateAvatar', this.avatarURL);
    // 		//console.log('app:UpdateAvatar');
    // 	}
    // }

    let cYear = new Date().getFullYear();
    this.minDOB = cYear - 70 + '-01-01';
    this.maxDOB = cYear - 16 + '-12-31';
  }

  preLoadData() {
    this.id = this.env.user.StaffID;
    super.preLoadData();
  }

  loadedData(event) {
    if (this.id && this.item) {
      this.item.DateOfIssueID = lib.dateFormat(this.item.DateOfIssueID, 'yyyy-mm-dd');
      this.userSetting = this.env.user.UserSetting;
      this.userSetting.isLoaded = true;
    }
    super.loadedData(event);
  }

  async changePassword() {
    if (!this.changePasswordForm.valid) {
      this.env.showTranslateMessage('Please recheck password', 'warning');
    } else {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Đang dữ liệu...',
      });

      await loading.present().then(() => {
        this.userProvider
          .changePassword(
            this.changePasswordForm.controls.oldPassword.value,
            this.changePasswordForm.controls.newPassword.value,
            this.changePasswordForm.controls.confirmPassword.value,
          )
          .then((savedItem: any) => {
            this.env.showTranslateMessage('Password changed', 'warning');
            this.changePasswordForm.reset();
            this.cdr.detectChanges();
            this.changePasswordForm.markAsPristine();
            if (loading) loading.dismiss();
          })
          .catch((err) => {
            let message = '';
            if (err._body && err._body.indexOf('confirmation password do not match') > -1) {
              this.env.showTranslateMessage(
                'erp.app.pages.sys.profile.message.confirmation-password-not-match',
                'danger',
              );
            } else if (err._body && err._body.indexOf('least 6 characters') > -1) {
              this.env.showTranslateMessage('erp.app.pages.sys.profile.message.least-6-char', 'danger');
            } else if (err.error && err.error.Message.indexOf('The request is invalid.') > -1) {
              this.env.showTranslateMessage('Password incorrect, please recheck', 'danger');
            } else {
              this.env.showTranslateMessage('erp.app.pages.sys.profile.message.can-not-save', 'danger');
            }
            if (loading) loading.dismiss();
            this.cdr.detectChanges();
          });
      });
    }
  }

  updateUserSetting(setting) {
    if (this.submitAttempt) return;
    this.submitAttempt = true;

    setting.Value = JSON.stringify(!setting.Value);
    this.userSettingProvider.save(setting).then((response: any) => {
      if (!setting.Id) {
        setting.Id = response.Id;
      }

      setting.Value = JSON.parse(setting.Value);
      this.submitAttempt = false;
      this.env.user.UserSetting = this.userSetting;
      this.accountProvider.setProfile(this.env.user).then(() => {
        this.accountProvider.loadSavedProfile();
      });
    });
  }

  changeTheme() {
    this.env.publishEvent({ Code: 'app:ChangeTheme' });
  }

  segmentChanged(ev: any) {
    this.segmentView = ev.detail.value;
  }

  logout() {
    event.preventDefault();
    event.stopPropagation();
    this.env.publishEvent({ Code: 'app:logout' });
  }
}
