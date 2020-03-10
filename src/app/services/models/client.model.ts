import { environment } from 'src/environments/environment';
import { pipe } from 'rxjs';

export class Client {


    constructor(
        public id: string,
        public clientName: string,
        public clientAlian: string,
        public logoImg: string,
        public _contact: string,
    ) { }

    get contact() {
        const contacts = JSON.parse(this._contact);
        //TODO: add call function
        contacts.forEach(contactDetails => {
            switch (contactDetails.type) {
                case 'map':
                    contactDetails.icon = 'md-pin';
                    contactDetails.action = 'الخارطة';
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
                    contactDetails.action = 'محادثة';
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
        console.table(branchs);

        return branchs;
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
