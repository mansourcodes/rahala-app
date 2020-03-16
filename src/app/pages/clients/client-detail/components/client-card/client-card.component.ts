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
          this.callUber(contactDetails, index);
        } else {
          this.callGooglemap(contactDetails, index);
        }
        break;

      case 'phone':
        this.callPhone(contactDetails, index);
        break;

      case 'snapchat':
        this.callSnapchat(contactDetails, index);
        break;

      case 'facebook':
        this.callFacebook(contactDetails, index);
        break;

      case 'twitter':
        this.callTwitter(contactDetails, index);
        break;

      case 'youtube':
        this.callYoutube(contactDetails, index);
        break;

      case 'instagram':
        this.callInstagram(contactDetails, index);
        break;

      case 'whatsapp':
        if (contactDetails.action[index] === 'call') {
          this.callPhone(contactDetails, index);
        } else {
          this.callWhatsapp(contactDetails, index);
        }
        break;

      case 'skype':
        break;

      default:
        contactDetails.icon = 'ios-information-circle-outline';
    }



  }


  callWhatsapp(contactDetails, index: number) {
    let text;
    if (contactDetails.message) {
      text = environment.whatsappQusText.replace('[trip_name]', contactDetails.message);
    } else {
      text = environment.whatsappGeneralText;
    }
    const apiCall = environment.whatsappApi + `?phone=` + contactDetails.value + `&text=` + text;
    const browser = this.inAppBrowser.create(apiCall, '_blank');
  }

  callPhone(contactDetails, index: number) {
    this.callNumber.callNumber(contactDetails.value, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }



  callGooglemap(contactDetails, index: number) {
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
      this.callInAppBrowser('https://www.google.com/maps/search/?api=1&query=', contactDetails, index);
    }

  }



  callUber(contactDetails, index: number) {
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
      this.callInAppBrowser('https://www.google.com/maps/search/?api=1&query=', contactDetails, index);
    }
  }



  callInstagram(contactDetails, index: number) {

    const isMobile = this.platform.is('mobile');
    if (isMobile) {
      let app;
      if (this.platform.is('ios')) {
        app = 'instagram://';
      } else if (this.platform.is('android')) {
        app = 'com.instagram.android';
      } else {
        this.callInAppBrowser('https://instagram.com/', contactDetails, index);
        return;
      }
      this.appAvailability.check(app)
        .then(
          (yes: boolean) => {
            console.log(app + ' is available');
            // App exists
            const browser = this.inAppBrowser.create('instagram://user?username=' + contactDetails.value, '_system');
          },
          (no: boolean) => {
            // App does not exist
            this.callInAppBrowser('https://instagram.com/', contactDetails, index);
          }
        );
    } else {
      this.callInAppBrowser('https://instagram.com/', contactDetails, index);
    }
  }

  //TODO: links for each website
  callSnapchat(contactDetails, index: number) {
    this.callInAppBrowser('https://instagram.com/', contactDetails, index);
  }
  callFacebook(contactDetails, index: number) {
    this.callInAppBrowser('https://instagram.com/', contactDetails, index);
  }
  callTwitter(contactDetails, index: number) {
    this.callInAppBrowser('https://instagram.com/', contactDetails, index);
  }
  callYoutube(contactDetails, index: number) {
    this.callInAppBrowser('https://instagram.com/', contactDetails, index);
  }


  callInAppBrowser(website: string, contactDetails, index: number) {
    const browser = this.inAppBrowser.create(website + contactDetails.value, '_system');

  }


  mainClick(contactDetails) {
    if (contactDetails.actionLabel.length === 1) {
      this.callClient(contactDetails, 0);
    }
  }

}
