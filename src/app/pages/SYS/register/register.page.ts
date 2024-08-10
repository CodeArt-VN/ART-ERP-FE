import { Component } from '@angular/core';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { AccountService } from 'src/app/services/account.service';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage extends PageBase {
  constructor(
    public env: EnvService,
    public accountService: AccountService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public translate: TranslateService,
  ) {
    super();
    this.item = {
      // FullName: 'Mạc Thị Bưởi',
      // EmailAddress: 'host@codeart.vn',
      // PhoneNumber: '0908061119',
      // Password:'123123',
      // ConfirmPassword: '123123'
    };
  }

  events(e) {
    if (e.Code == 'app:loadedLocalData' || e.Code == 'app:updatedUser') {
      this.preLoadData();
    }
  }

  preLoadData() {
    if (this.env.user && this.env.user.Id) {
      this.nav('/', 'back');
    }
  }

  register() {
    this.translate.get('Please input password again to reconfirm').subscribe((result: string) => {
      let message = result;

      let validateMessage = [];
      if (!this.item.FullName) {
        this.translate.get('Full name').subscribe((result: string) => {
          validateMessage.push(result);
        });
      }
      // if(!this.item.DOB){
      //     validateMessage.push('ngày sinh');
      // }
      if (!this.item.EmailAddress) {
        this.translate.get('email').subscribe((result: string) => {
          validateMessage.push(result);
        });
      }
      if (!this.item.PhoneNumber) {
        this.translate.get('Phone number').subscribe((result: string) => {
          validateMessage.push(result);
        });
      }
      if (!this.item.Password) {
        this.translate.get('Password').subscribe((result: string) => {
          validateMessage.push(result);
        });
      }
      if (!this.item.ConfirmPassword) {
        this.translate.get('Password verified').subscribe((result: string) => {
          validateMessage.push(result);
        });
      }
      if (this.item.Password && this.item.ConfirmPassword && this.item.Password != this.item.ConfirmPassword) {
        this.translate.get('Please input password again to reconfirm').subscribe((result: string) => {
          validateMessage.push(result);
        });
      }
      if (validateMessage.length) {
        message += validateMessage.join(', ');
        this.env.showMessage(message, 'danger');
        return;
      }
      this.postRegister();
    });
  }

  postRegister() {
    this.loadingCtrl
      .create({
        message: 'Please wait for a few moments',
      })
      .then((loading) => {
        loading.present();

        this.accountService
          .register(
            this.item.EmailAddress,
            this.item.Password,
            this.item.ConfirmPassword,
            this.item.PhoneNumber,
            this.item.FullName,
          )
          .then((data) => {
            loading.dismiss();
          })
          .catch((err) => {
            loading.dismiss();
            if (err.error && err.error.ModelState[''] && err.error.ModelState[''].toString().indexOf('already taken')) {
              this.env.showMessage(
                'Email {{value}} has been registered. Please log in or register with another email.',
                '',
                this.item.EmailAddress,
              );
            } else {
              this.env.showMessage('Registration failed. Please try again.');
            }
          });
      });
  }
}
