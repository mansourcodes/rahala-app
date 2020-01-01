export class Trip {
  constructor(
    public id: string,
    public code: string,
    public createdDate: string,
    public clientId: string,

    public name: string,
    public cities: string,
    public travelBy: string,
    public foodOptions: string,
    public travelDate: string,
    public numOfDays: string,

    public adultPrice?: string,
    public teenPrice?: string,
    public boyPrice?: string,
    public babyPrice?: string,
    public infantPrice?: string,

    public tripPath?: string,
    public desc?: string,

    public numOfNights?: string,
    public returnDate?: string,
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
  num_of_days: string;
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

}