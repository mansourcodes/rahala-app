export const environment = {
  production: true,
  version: 'Beta 0.1',


  BaseURL: 'http://api.rahala-online.com/',
  // BaseURL: 'http://localhost/rahala-api/public/',
  apiURL: '',
  whatsappApi: 'https://api.whatsapp.com/send',
  whatsappText: 'السلام عليكم \n حاب أستفسر عن الرحلة \n [trip_name] \n -عبر تطبيق رحالة-',

  AuthConstents: {
    AUTH: 'userDataKey'
  },


  foodOptions: {
    B_ONLY: 'فطور فقط',
    D_ONLY: 'غداء فقط',
    L_ONLY: 'عشاء فقط',

    B_AND_D: 'فطور وغداء فقط',
    B_AND_L: 'فطور وعشاء فقط',
    D_AND_L: 'غداء وعشاء فقط',
    ALL: 'ثلاث الوجبات',
    NONE: 'غير مشمولة',
  },



  travelBy: {
    FLIGHT: 'طيران',
    BUS: 'باص',
    OTHER: 'باص أو طيران',
  },
};


environment.apiURL = environment.BaseURL + 'api/';