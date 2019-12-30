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

    public exCustomThings?: string
  ) {}
}
