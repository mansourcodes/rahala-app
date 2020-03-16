import { Component, OnInit, Input } from '@angular/core';
import { Client } from 'src/app/services/models/client.model';
import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { environment } from 'src/environments/environment';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';


@Component({
  selector: 'client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss'],
})
export class ClientCardComponent implements OnInit {
  @Input() client: Client;
  @Input() tripName: string;


  constructor(
    private platform: Platform,
    private inAppBrowser: InAppBrowser,
    private launchNavigator: LaunchNavigator,
    private appAvailability: AppAvailability,
  ) { }

  ngOnInit() { }

  callClient(contactDetails, index: number) {

    if (contactDetails.type === 'whatsapp') {

      this.callWhatsapp(contactDetails, index);

    } else if (contactDetails.type === 'map') {

      if (contactDetails.action[index] === 'uber') {
        this.callUber(contactDetails, index);
      } else {
        this.callGooglemap(contactDetails, index);
      }

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
    }
  }



  callInstagram(contactDetails, index: number) {
    let app;

    if (this.platform.is('ios')) {
      app = 'instagram://';
    } else if (this.platform.is('android')) {
      app = 'com.instagram.android';
    } else {
      const browser = this.inAppBrowser.create('https://instagram.com/' + name);
      return;
    }

    this.appAvailability.check(app)
      .then(
        (yes: boolean) => {
          console.log(app + ' is available');
          // App exists
          const browser = this.inAppBrowser.create('instagram://user?username=' + name, '_system');
        },
        (no: boolean) => {
          // App does not exist
          const browser = this.inAppBrowser.create('https://instagram.com/' + name, '_system');
        }
      );
  }

}
