import { Component, OnInit, Input } from '@angular/core';
import { Quicksearch } from 'src/app/services/models/quicksearch.model';
import { PickerController, LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'quicksearch-card',
  templateUrl: './quicksearch-card.component.html',
  styleUrls: ['./quicksearch-card.component.scss'],
})
export class QuicksearchCardComponent implements OnInit {
  @Input() quicksearch: Quicksearch;


  constructor(
    public pickerCtrl: PickerController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastController: ToastController) { }

  ngOnInit() { }


  onSearch() {

    if (!this.quicksearch.dateFrom) {
      this.quicksearch.dateFrom = new Date().toISOString();
    }
    if (!this.quicksearch.dateTo) {
      this.quicksearch.dateTo = new Date('3000-01-01').toISOString();
    }

    this.quicksearch.travelBy.toUpperCase();

    const searchFormValues = {
      city: this.quicksearch.cities,
      travelBy: this.quicksearch.travelBy,
      dateFrom: this.quicksearch.dateFrom,
      dateTo: this.quicksearch.dateTo,
    }


    this.loadingCtrl
      .create({
        message: '...'
      })
      .then(loadingEl => {
        loadingEl.present();
        const navigationExtras: NavigationExtras = {
          queryParams: {
            searchTerms: JSON.stringify(searchFormValues)
          }
        };
        loadingEl.dismiss();
        this.router.navigate(['/tabs/trips'], navigationExtras);
      });
  }
}
