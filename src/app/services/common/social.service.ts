import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { environment } from 'src/environments/environment';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { CleintContactInterface } from '../models/clientcontact.model';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  private launchNavigator: LaunchNavigator;
  private appAvailability: AppAvailability;
  private callNumber: CallNumber;

  constructor(
    private platform: Platform,
    private inAppBrowser: InAppBrowser,
    private emailComposer: EmailComposer,
  ) { }


  public callClient(contactDetails: CleintContactInterface, index: number) {
    switch (contactDetails.type) {

      case 'map':
        if (contactDetails.action[index] === 'uber') {
          this.callUber(contactDetails);
        } else {
          this.callGooglemap(contactDetails);
        }
        break;

      case 'phone':
        this.callPhone(contactDetails);
        break;

      case 'snapchat':
        this.callSnapchat(contactDetails);
        break;

      case 'facebook':
        this.callFacebook(contactDetails);
        break;

      case 'twitter':
        this.callTwitter(contactDetails);
        break;

      case 'youtube':
        this.callYoutube(contactDetails);
        break;

      case 'instagram':
        this.callInstagram(contactDetails);
        break;

      case 'whatsapp':
        if (contactDetails.action[index] === 'call') {
          this.callPhone(contactDetails);
        } else {
          this.callWhatsapp(contactDetails);
        }
        break;

      case 'skype':
        this.callSkype(contactDetails);
        break;

      default:
        this.callInAppBrowser(contactDetails.value);
    }

  }


  public callWhatsapp(contactDetails: CleintContactInterface) {
    let text;
    if (contactDetails.message) {
      text = environment.whatsappQusText.replace('[trip_name]', contactDetails.message);
    } else {
      text = environment.whatsappGeneralText;
    }
    const apiCall = environment.whatsappApi + `?phone=` + contactDetails.value + `&text=` + text;
    const browser = this.callInAppBrowser(apiCall, '_blank');
  }

  public callPhone(contactDetails: CleintContactInterface) {
    const isMobile = this.platform.is('mobile');
    if (isMobile) {
      this.callNumber.callNumber(contactDetails.value, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    } else {
      const browser = this.callInAppBrowser('tel:' + contactDetails.value, '_blank');
    }
  }



  public callGooglemap(contactDetails: CleintContactInterface) {
    const isMobile = this.platform.is('mobile');
    if (isMobile) {
      this.launchNavigator.isAppAvailable(this.launchNavigator.APP.GOOGLE_MAPS).then(isAvailable => {
        let navigatorApp;
        if (isAvailable) {
          navigatorApp = this.launchNavigator.APP.GOOGLE_MAPS;
        } else {
          console.warn('Google Maps not available - falling back to user selection');
          navigatorApp = this.launchNavigator.APP.USER_SELECT;
        }
        this.launchNavigator.navigate(contactDetails.value.split(','), {
          app: navigatorApp,
          start: contactDetails.value,
        }).then(
          success => console.log('Launched navigator'),
          error => console.log('Error launching navigator', error)
        );
      });
    } else {
      this.callInAppBrowser('https://www.google.com/maps/search/?api=1&query=' + contactDetails.value);
    }

  }



  public callUber(contactDetails: CleintContactInterface) {
    const isMobile = this.platform.is('mobile');
    if (isMobile) {
      this.launchNavigator.isAppAvailable(this.launchNavigator.APP.GOOGLE_MAPS).then(isAvailable => {
        let navigatorApp;
        if (isAvailable) {
          navigatorApp = this.launchNavigator.APP.UBER;
        } else {
          console.warn('Google Maps not available - falling back to user selection');
          navigatorApp = this.launchNavigator.APP.USER_SELECT;
        }
        this.launchNavigator.navigate(contactDetails.value.split(','), {
          app: navigatorApp,
          start: contactDetails.value,
        }).then(
          success => console.log('Launched navigator'),
          error => console.log('Error launching navigator', error)
        );
      });
    } else {
      this.callInAppBrowser('https://www.google.com/maps/search/?api=1&query=' + contactDetails.value);
    }
  }



  public callInstagram(contactDetails: CleintContactInterface) {

    const isMobile = this.platform.is('mobile');
    if (isMobile) {
      let app;
      if (this.platform.is('ios')) {
        app = 'instagram://';
      } else if (this.platform.is('android')) {
        app = 'com.instagram.android';
      } else {
        this.callInAppBrowser('https://instagram.com/' + contactDetails.value);
        return;
      }
      this.appAvailability.check(app)
        .then(
          (yes: boolean) => {
            console.log(app + ' is available');
            // App exists
            const browser = this.callInAppBrowser('instagram://user?username=' + contactDetails.value, '_system');
          },
          (no: boolean) => {
            // App does not exist
            this.callInAppBrowser('https://instagram.com/' + contactDetails.value);
          }
        );
    } else {
      this.callInAppBrowser('https://instagram.com/' + contactDetails.value);
    }
  }


  public callEmail(email: { to: string | string[], subject: string, body: string }) {

    const emailData = {
      to: email.to,
      // cc: 'erika@mustermann.de',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      // attachments: ['file://img/logo.png'],
      subject: email.subject,
      body: email.body,
      isHtml: true
    };
    this.emailComposer.open(emailData);

  }


  public callSnapchat(contactDetails: CleintContactInterface) {
    this.callInAppBrowser('https://www.snapchat.com/add/' + contactDetails.value);
  }
  public callFacebook(contactDetails: CleintContactInterface) {
    this.callInAppBrowser('https://facebook.com/' + contactDetails.value);
  }
  public callTwitter(contactDetails: CleintContactInterface) {
    this.callInAppBrowser('https://twitter.com/' + contactDetails.value);
  }
  public callYoutube(contactDetails: CleintContactInterface) {
    this.callInAppBrowser('https://www.youtube.com/channel/' + contactDetails.value);
  }
  public callSkype(contactDetails: CleintContactInterface) {
    this.callInAppBrowser('skype:' + contactDetails.value);
  }


  callInAppBrowser(url: string, target: string = '_system') {
    const browser = this.inAppBrowser.create(url, '_system');

  }


}
