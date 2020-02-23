// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  version: 'Beta 0.1',
  apiURL: "http://api.rahala-online.com/api/",
  // apiURL: "http://localhost/git/rahala-api/public/api/",

  whatsappApi: "https://api.whatsapp.com/send",
  whatsappText: "السلام عليكم \n حاب أستفسر عن الرحلة \n [trip_name] \n -عبر تطبيق رحالة-",

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
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
