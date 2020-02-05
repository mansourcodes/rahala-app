import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PickerController, LoadingController, ToastController, IonRadioGroup } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { Router, NavigationExtras } from '@angular/router';
import 'hammerjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchForm: FormGroup;
  @ViewChild('radioGroup', { static: true }) radioGroup: IonRadioGroup

  defaultSelectedRadio = "all";
  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup: any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem: any;

  // TODO: set right values
  TravelByRadioList = [
    {
      text: 'all',
      value: 'all',
      checked: true,
    }, {
      text: 'flight',
      value: 'flight',
      checked: false,
    }, {
      text: 'bus',
      value: 'bus',
      checked: false,
    },
  ];


  constructor(
    public pickerCtrl: PickerController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      travelBy: new FormControl('all',
        {
          validators: [Validators.required]
        }),
      city: new FormControl(null,
        {
          validators: [Validators.required]
        }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    });
    this.selectedRadioItem = { ...this.TravelByRadioList[0] };

    if (!environment.production) {
      this.searchForm.setValue({
        travelBy: 'all',
        city: 'Shyannetown',
        dateFrom: new Date().toISOString(),
        dateTo: new Date('2021-04-03').toISOString(),
      })
    }
  }


  async openCityPicker() {
    let pickerAction;

    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: value => {
            pickerAction = 'cancel';
          }
        },
        {
          text: 'Done',
          role: 'done',
          handler: value => {
            pickerAction = 'done';
          }
        }
      ],
      columns: [
        {
          name: 'city',
          options: [ // TODO: get cities from API
            {
              text: 'Shyannetown',
              value: 'Shyannetown'
            },
            {
              text: 'Port Rachelleville',
              value: 'Port Rachelleville'
            },
            {
              text: 'port rachelleville',
              value: 'port rachelleville'
            },
          ]
        }
      ]
    }

    const picker = await this.pickerCtrl.create(opts);
    await picker.present();
    picker.onDidDismiss().then(() => {
      return picker.getColumn('city');
    }).then(city => {
      if (pickerAction === 'done') {
        this.searchForm.patchValue({
          city: city.options[city.selectedIndex].text
        })
      }
    })
  }

  onSearch() {
    if (!this.searchForm.valid) {
      this.toastController.create({
        message: 'Missing Information!',
        duration: 2000
      }).then(toastEl => {
        toastEl.present();
      })
      return;
    }
    this.loadingCtrl
      .create({
        message: '...'
      })
      .then(loadingEl => {
        loadingEl.present();
        let navigationExtras: NavigationExtras = {
          queryParams: {
            searchTerms: JSON.stringify(this.searchForm.value)
          }
        }
        this.searchForm.reset();
        loadingEl.dismiss();
        this.router.navigate(['/tabs/trips'], navigationExtras);
      });
  }

  radioGroupChange(event) {
    this.selectedRadioGroup = event.detail;
  }

  radioSelect(event) {
    this.selectedRadioItem = event.detail;
    this.searchForm.patchValue({ travelBy: event.detail.value })
  }

  changeTravelBy(value: string) {
    let index = 0;
    if (value == 'right' || value == 'left') {
      let currentObject = this.TravelByRadioList.filter(list => {
        let currentValue = this.selectedRadioItem.value;
        if (list.value === currentValue) {
          return list;
        }
      });
      index = this.TravelByRadioList.indexOf(currentObject[0]);
    }

    if (value == 'right') {
      if (this.TravelByRadioList[index + 1]) {
        value = this.TravelByRadioList[index + 1].value;
      } else {
        return;
      }
    } else if (value == 'left') {
      if (this.TravelByRadioList[index - 1]) {
        value = this.TravelByRadioList[index - 1].value;
      } else {
        return;
      }
    }
    this.radioGroup.value = value;


  }

}
