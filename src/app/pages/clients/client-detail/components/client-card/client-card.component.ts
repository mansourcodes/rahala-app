import { Component, OnInit, Input } from '@angular/core';
import { Client } from 'src/app/services/models/client.model';
import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { environment } from 'src/environments/environment';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';


@Component({
  selector: 'client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss'],
})
export class ClientCardComponent implements OnInit {
  @Input() client: Client;
  @Input() tripName: string;

  private launchNavigator: LaunchNavigator;
  private appAvailability: AppAvailability;
  private callNumber: CallNumber;

  constructor(
    private platform: Platform,
    private inAppBrowser: InAppBrowser,
  ) { }

  ngOnInit() { }

  callClient(contactDetails, index: number) {
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


  callWhatsapp(contactDetails) {
    let text;
    if (contactDetails.message) {
      text = environment.whatsappQusText.replace('[trip_name]', contactDetails.message);
    } else {
      text = environment.whatsappGeneralText;
    }
    const apiCall = environment.whatsappApi + `?phone=` + contactDetails.value + `&text=` + text;
    const browser = this.callInAppBrowser(apiCall, '_blank');
  }

  callPhone(contactDetails) {
    const isMobile = this.platform.is('mobile');
    if (isMobile) {
      this.callNumber.callNumber(contactDetails.value, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    } else {
      const browser = this.callInAppBrowser('tel:' + contactDetails.value, '_blank');
    }
  }



  callGooglemap(contactDetails) {
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



  callUber(contactDetails) {
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



  callInstagram(contactDetails) {

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

  //TODO: links for each website
  callSnapchat(contactDetails) {
    this.callInAppBrowser('https://www.snapchat.com/add/' + contactDetails.value);
  }
  callFacebook(contactDetails) {
    this.callInAppBrowser('https://facebook.com/' + contactDetails.value);
  }
  callTwitter(contactDetails) {
    this.callInAppBrowser('https://twitter.com/' + contactDetails.value);
  }
  callYoutube(contactDetails) {
    this.callInAppBrowser('https://www.youtube.com/channel/' + contactDetails.value);
  }
  callSkype(contactDetails) {
    this.callInAppBrowser('skype:' + contactDetails.value);
  }


  callInAppBrowser(url: string, target: string = '_system') {
    const browser = this.inAppBrowser.create(url, '_system');

  }


  mainClick(contactDetails) {
    if (contactDetails.actionLabel.length === 1) {
      this.callClient(contactDetails, 0);
    }
  }

}
