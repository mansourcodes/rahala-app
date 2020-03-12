import { environment } from 'src/environments/environment';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

export class Client {


    constructor(
        public id: string,
        public clientName: string,
        public clientAlian: string,
        public logoImg: string,
        public _contact: string,


        private iab: InAppBrowser,
        private launchNavigator: LaunchNavigator
    ) { }

    get contact() {
        const contacts = JSON.parse(this._contact);
        //TODO: add call function
        contacts.forEach(contactDetails => {
            switch (contactDetails.type) {
                case 'map':
                    contactDetails.icon = 'md-pin';
                    contactDetails.action = ['الخارطة'];
                    contactDetails.call = [this.call.bind(this, contactDetails.type, contactDetails.value, '')];
                    break;
                case 'phone':
                    contactDetails.icon = 'call';
                    contactDetails.action = 'إتصل الآن';
                    break;


                case 'snapchat':
                    contactDetails.icon = 'logo-snapchat';
                    contactDetails.action = 'شاهد';
                    break;
                case 'facebook':
                    contactDetails.icon = 'logo-facebook';
                    contactDetails.action = 'شاهد';
                    break;
                case 'twitter':
                    contactDetails.icon = 'logo-twitter';
                    contactDetails.action = 'شاهد';
                    break;
                case 'youtube':
                    contactDetails.icon = 'logo-youtube';
                    contactDetails.action = 'شاهد';
                    break;
                case 'instagram':
                    contactDetails.icon = 'logo-instagram';
                    contactDetails.action = 'شاهد';
                    break;
                case 'whatsapp':
                    contactDetails.icon = 'logo-whatsapp';
                    contactDetails.action = ['محادثة'];
                    contactDetails.call = [this.call.bind(this, contactDetails.type, contactDetails.value, '')];
                    break;
                case 'skype':
                    contactDetails.icon = 'logo-skype';
                    contactDetails.action = 'محادثة';
                    break;


                default:
                    contactDetails.icon = 'ios-information-circle-outline';
            }

        });
        return contacts;
    }

    get branchs() {

        let tmp;
        const branchs = [];
        this.contact.filter(branch => {
            return (branch.branch || branch.type);
        }).forEach(branch => {
            if (branch.branch) {
                tmp = {
                    branch: branch.branch,
                    branchImg: branch.branch_img,
                    contacts: []
                };
                branchs.push(tmp);
            }
            branchs[branchs.length - 1].contacts.push(branch);
        });

        return branchs;
    }

    call(type: string, value: any, message: string) {

        console.log('call started');
        console.log(type, value, message);
        let text;
        if (type === 'whatsapp') {
            if (message) {
                text = environment.whatsappQusText.replace('[trip_name]', message);
            } else {
                text = environment.whatsappGeneralText;
            }
            const apiCall = environment.whatsappApi + `?phone=` + value + `&text=` + text;
            const browser = this.iab.create(apiCall, '_blank');
        }
        if (type === 'map') {


            console.log(value.split(','));


            this.launchNavigator.isAppAvailable(this.launchNavigator.APP.GOOGLE_MAPS, function (isAvailable) {
                var app;
                if (isAvailable) {
                    app = this.launchNavigator.APP.GOOGLE_MAPS;
                } else {
                    console.warn("Google Maps not available - falling back to user selection");
                    app = this.launchNavigator.APP.USER_SELECT;
                }
                this.launchNavigator.navigate(value.split(','), {
                    app: app,
                    start: value,
                }).then(
                    success => console.log('Launched navigator'),
                    error => console.log('Error launching navigator', error)
                );
            });
        }
    }

    get logoUrl() {
        return environment.BaseURL + 'storage/images/' + this.logoImg;
    }

}

export interface ClientInterface {

    id: string;
    created_at: string;
    updated_at: string;
    client_name: string;
    client_alian: string;
    logo_img: string;
    contact: string;

}
