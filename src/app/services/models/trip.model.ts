import { Client, ClientInterface } from './client.model';
import { environment } from 'src/environments/environment';

export class Trip {


  public client: Client;

  public id: string;
  public code: string;
  public createdDate: string;
  public name: string;
  public _cities: string;
  public travelBy: string;
  public foodOptions: string;
  public travelDate: string;
  public numOfDays: number;
  public numOfNights?: string;
  public returnDate?: string;
  public desc?: string;
  public adultPrice?: string;
  public teenPrice?: string;
  public boyPrice?: string;
  public babyPrice?: string;
  public infantPrice?: string;
  public tripPath?: string;
  public travelTime?: string;
  public trippersLimit?: string;
  public trippersBooked?: string;
  public ownBedAgeRange?: string;
  public ownChairAgeRang?: string;
  public babyStartAge?: string;
  public boyStartAge?: string;
  public teenStartAge?: string;
  public adultStartAge?: string;
  public exCustomThings?: string;


  constructor(tripInterface: TripInterface, client: Client) {

    this.client = client;

    this.id = tripInterface.id;
    this.code = tripInterface.code;
    this.createdDate = tripInterface.created_date;
    this.name = tripInterface.name;
    this._cities = tripInterface.cities;
    this.travelBy = tripInterface.travel_by;
    this.foodOptions = tripInterface.food_options;
    this.travelDate = tripInterface.travel_date;
    this.numOfDays = tripInterface.num_of_days;
    this.numOfNights = tripInterface.num_of_nights;
    this.returnDate = tripInterface.return_date;
    this.desc = tripInterface.desc;
    this.adultPrice = tripInterface.adult_price;
    this.teenPrice = tripInterface.teen_price;
    this.boyPrice = tripInterface.boy_price;
    this.babyPrice = tripInterface.baby_price;
    this.infantPrice = tripInterface.infant_price;
    this.tripPath = tripInterface.trip_path;
    this.travelTime = tripInterface.travel_time;
    this.trippersLimit = tripInterface.trippers_limit;
    this.trippersBooked = tripInterface.trippers_booked;
    this.ownBedAgeRange = tripInterface.own_bed_age_range;
    this.ownChairAgeRang = tripInterface.own_chair_age_range;
    this.babyStartAge = tripInterface.baby_start_age;
    this.boyStartAge = tripInterface.boy_start_age;
    this.teenStartAge = tripInterface.teen_start_age;
    this.adultStartAge = tripInterface.adult_start_age;
    this.exCustomThings = tripInterface.ex_custom_things;

  }


  get foodOptionsLabel() {
    return environment.foodOptions[this.foodOptions];
  }

  get travelByLabel() {
    return environment.travelBy[this.travelBy];
  }

  get cities() {
    const citiesArray = this._cities.split(',');
    return citiesArray;
  }

  get travelByIcon() {

    let iconName = 'bus.svg';
    switch (this.travelBy.toUpperCase()) {
      case 'BUS':
        iconName = 'bus.svg';
        break;
      case 'FLIGHT':
        iconName = 'flight.svg';
        break;
      case 'OTHER':
      default:
        iconName = 'busandflight.svg';
        break;
    }

    return 'assets/icon/' + iconName;
  }

  static travelByIcon(travelBy: string) {

    let iconName = 'bus.svg';
    switch (travelBy.toUpperCase()) {
      case 'BUS':
        iconName = 'bus.svg';
        break;
      case 'FLIGHT':
        iconName = 'flight.svg';
        break;
      case 'OTHER':
      default:
        iconName = 'busandflight.svg';
        break;
    }

    return 'assets/icon/' + iconName;
  }

  get foodOptionIcon() {

    let iconName = '0meals.svg';
    switch (this.foodOptions.toUpperCase()) {
      case 'ALL':
        iconName = '3meals.svg';
        break;
      case 'B_ONLY':
        iconName = '1meals.svg';
        break;
      case 'D_ONLY':
        iconName = '1meals.svg';
        break;
      case 'B_AND_D':
        iconName = '2meals.svg';
        break;
      case 'NONE':
      default:
        iconName = '0meals.svg';
        break;
    }

    return 'assets/icon/' + iconName;
  }
}

export interface TripInterface {


  id: string;
  created_at: string;
  updated_at: string;
  client_id: string;
  name: string;
  cities: string;
  desc: string;
  trip_path: string;
  code: string;
  travel_by: string;
  travel_date: string;
  num_of_days: number;
  num_of_nights: string;
  return_date: string;
  travel_time: string;
  food_options: string;
  trippers_limit: string;
  trippers_booked: string;
  own_bed_age_range: string;
  own_chair_age_range: string;
  adult_price: string;
  teen_price: string;
  boy_price: string;
  baby_price: string;
  infant_price: string;
  baby_start_age: string;
  boy_start_age: string;
  teen_start_age: string;
  adult_start_age: string;
  ex_custom_things: string;
  created_date: string;
  client: ClientInterface;

}