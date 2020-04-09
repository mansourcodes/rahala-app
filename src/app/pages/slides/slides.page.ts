import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/common/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoadingController, AlertController, ToastController, Platform } from '@ionic/angular';
import { AuthResponseData } from 'src/app/services/models/auth-respons.interface';
import { SocialService } from 'src/app/services/common/social.service';
import { environment } from 'src/environments/environment';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { StorageService } from 'src/app/services/common/storage.service';

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

  private uniqueDeviceID;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private socialService: SocialService,
    public platform: Platform,
    private storageService: StorageService,
  ) {

    try {
      this.uniqueDeviceID = new UniqueDeviceID();
    } catch (e) {

    }

  }

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

        // always using signup()
        if (this.isLogin) { // false
          authObs = this.authService.login(email, password);
        } else {
          authObs = this.authService.signup(email, password);
        }
        authObs.subscribe(
          resData => {
            this.isLoading = false;
            loadingEl.dismiss();
            this.toastController.create({
              message: 'أهلا وسهلا',
              duration: 1000
            }).then(toastEl => {
              toastEl.present();
            });


            this.storageService.get(environment.OrginalPath).then(orginalPath => {
              console.log(orginalPath);
              if (orginalPath) {
                this.router.navigateByUrl(orginalPath + '');
              } else {
                this.router.navigateByUrl('tabs/search');
              }
              this.storageService.removeItem(environment.OrginalPath);
            });

          },
          errRes => {
            loadingEl.dismiss();
            const code = errRes.error.message;
            let message = 'لا يمكن تسجيل الدخول';
            if (code === 'EMAIL_EXISTS') {
              message = 'قم بالإبلاغ عن الخلل [ER-537]';
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

    let email = `guest` + Math.floor(Math.random() * 1000000) + `@rahala-online.com`;
    let password = email;

    const isMobile = this.platform.is('mobile');
    if (isMobile) {
      try {

        this.uniqueDeviceID.get()
          .then((uuid: any) => {
            email = `guest${uuid}@rahala-online.com`;
            password = email;
            this.authenticate(email, password);
          })
          .catch((error: any) => {
            password = email;
            this.authenticate(email, password);
          });
      } catch (e) {

        email = `guest` + Math.floor(Math.random() * 1000000) + `@rahala-online.com`;
        password = email;
        this.authenticate(email, password);
      }
    } else {

      password = email;
      this.authenticate(email, password);
    }

  }

  private showAlert(message: string) {
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
