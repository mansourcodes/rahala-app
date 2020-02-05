import { Client, ClientInterface } from './client.model';

export class Trip {
  constructor(
    public id: string,
    public code: string,
    public createdDate: string,
    public client: Client,

    public name: string,
    public _cities: string,
    public travelBy: string,
    public foodOptions: string,
    public travelDate: string,
    public numOfDays: number,
    public numOfNights?: string,
    public returnDate?: string,
    public desc?: string,

    public adultPrice?: string,
    public teenPrice?: string,
    public boyPrice?: string,
    public babyPrice?: string,
    public infantPrice?: string,

    public tripPath?: string,

    public travelTime?: string,

    public trippersLimit?: string,
    public trippersBooked?: string,

    public ownBedAgeRange?: string,
    public ownChairAgeRang?: string,

    public babyStartAge?: string,
    public boyStartAge?: string,
    public teenStartAge?: string,
    public adultStartAge?: string,

    public exCustomThings?: string,
  ) { }


  get cities() {
    const citiesArray = this._cities.split(',');
    return citiesArray;
  }

  get travelByIcon() {

    let iconName = "bus.svg";
    switch (this.travelBy) {
      case 'BUS':
        iconName = "bus.svg";
        break;
      case 'FLIGHT':
        iconName = "flight.svg";
        break;
      case 'OTHER':
      default:
        iconName = "busandflight.svg";
        break;
    }

    return "assets/icon/" + iconName;
  }

  static travelByIcon(travelBy) {

    let iconName = "bus.svg";
    switch (travelBy) {
      case 'BUS':
        iconName = "bus.svg";
        break;
      case 'FLIGHT':
        iconName = "flight.svg";
        break;
      case 'OTHER':
      default:
        iconName = "busandflight.svg";
        break;
    }

    return "assets/icon/" + iconName;
  }

  get foodOptionIcon() {

    let iconName = "0meals.svg";
    switch (this.foodOptions) {
      case 'ALL':
        iconName = "3meals.svg";
        break;
      case 'B_ONLY':
        iconName = "1meals.svg";
        break;
      case 'D_ONLY':
        iconName = "1meals.svg";
        break;
      case 'B_AND_D':
        iconName = "2meals.svg";
        break;
      case 'NONE':
      default:
        iconName = "0meals.svg";
        break;
    }

    return "assets/icon/" + iconName;
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