import { Component, OnInit, OnDestroy } from '@angular/core';
import { Trip } from 'src/app/services/models/trip.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TripsService } from 'src/app/services/providers/trips.service';
import { Subscription } from 'rxjs';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.page.html',
  styleUrls: ['./trip-detail.page.scss']
})
export class TripDetailPage implements OnInit, OnDestroy {
  trip: Trip;
  private tripSub: Subscription;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private tripsService: TripsService,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('tripId')) {
        this.navCtrl.navigateBack('/trips');
        return;
      }
      this.tripSub = this.tripsService
        .getTrip(paramMap.get('tripId'))
        .subscribe(trip => {
          this.trip = trip;
          this.isLoading = false;
        });
    });
  }

  contact(target, contact) {
    //TODO : open whatsapp
    // https://ionicframework.com/docs/native/in-app-browser
    console.log(target, contact);

    let message = "%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%20%D8%AD%D8%A7%D8%A8%20%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1%20%D8%B9%D9%86%20%D8%A7%D9%84%D8%B1%D8%AD%D9%84%D8%A9:%20%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%86%D8%A9%20%D8%AA%D8%A7%D8%B1%D9%8A%D8%AE:20-2-2020%20%D8%B7%D9%8A%D8%B1%D8%A7%D9%86%20--%D8%B9%D8%A8%D8%B1%20%D8%AA%D8%B7%D8%A8%D9%8A%D9%82%20%D8%B1%D8%AD%D8%A7%D9%84%D8%A9--";
    let api = `https://api.whatsapp.com/send?phone=` + contact + `&text=` + message;
    console.log(api);

    const browser = this.iab.create('https://ionicframework.com/', '_blank');
    // browser.close();


    // const browser = this.iab.create('https://ionicframework.com/');

    // browser.executeScript(...);

    // browser.insertCSS(...);
    // browser.on('loadstop').subscribe(event => {
    //   browser.insertCSS({ code: "body{color: red;" });
    // });

    // browser.close();

  }

  ngOnDestroy() {
    if (this.tripSub) {
      this.tripSub.unsubscribe();
    }
  }
}
