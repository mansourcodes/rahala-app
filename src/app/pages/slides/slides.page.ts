import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/common/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { AuthResponseData } from 'src/app/services/models/auth-respons.interface';
import { SocialService } from 'src/app/services/common/social.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss']
})
export class SlidesPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  isLoading = false;
  isLogin = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private socialService: SocialService,
  ) { }

  ngOnInit() {
    this.startLogin();
  }

  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;

        //TODO: isLogin should deticit the user 
        if (this.isLogin) {
          authObs = this.authService.login(email, password);
        } else {
          authObs = this.authService.signup(email, password);
        }
        authObs.subscribe(
          resData => {
            this.isLoading = false;
            loadingEl.dismiss();
            this.toastController.create({
              message: 'Login:' + resData.email,
              duration: 2000
            }).then(toastEl => {
              toastEl.present();
            });

            this.router.navigateByUrl('tabs/search');
          },
          errRes => {
            loadingEl.dismiss();
            const code = errRes.error.message;
            let message = 'لا يمكن تسجيل الدخول';
            // TODO: change message regading API update
            if (code === 'EMAIL_EXISTS') {
              message = 'This email address exists already!';
            }
            this.showAlert(message);
          }
        );
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  startLogin() {
    // TODO: make email related to Device info to make login next installed
    // https://cordova.apache.org/docs/en/1.7.0/cordova/device/device.uuid.html
    const email = 'guest1@hi.com';
    const password = email;
    this.authenticate(email, password);
  }

  private showAlert(message: string) {
    //TODO: add button to send feedback as email
    this.alertCtrl
      .create({
        message: 'عد لنا في وقت لاحق',
        header: 'فشل تسجيل الدخول',
        // message: message,
        buttons: [
          {
            text: 'الإبلاغ عن الخلل',
            role: 'cancel',
            handler: () => {
              const email = {
                to: [environment.supportEmail],
                subject: 'الإبلاغ عن تعطل تسجيل الدخول',
                body: 'أرغب في الإبلاغ عن خلل',
              };
              this.socialService.callEmail(email);
            }
          },
          {
            text: 'المحاولة مرة أخرى',
            handler: () => {
              this.authService.logout();
            }
          }
        ]
      })
      .then(alertEl => alertEl.present());
  }
}
