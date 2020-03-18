import { environment } from 'src/environments/environment';

export class Client {
    constructor(
        public id: string,
        public clientName: string,
        public clientAlian: string,
        public logoImg: string,
        public _contact: string,
    ) {

    }


    get contact() {

        const contacts = JSON.parse(this._contact);
        contacts.forEach(contactDetails => {
            contactDetails.valueLabel = contactDetails.value;
            switch (contactDetails.type) {

                case 'map':
                    contactDetails.icon = 'md-pin';
                    contactDetails.actionLabel = ['الخارطة', 'uber'];
                    contactDetails.action = ['google_map', 'uber'];
                    contactDetails.valueLabel = '';
                    break;

                case 'phone':
                    contactDetails.icon = 'call';
                    contactDetails.actionLabel = ['إتصل الآن'];
                    break;

                case 'snapchat':
                    contactDetails.icon = 'logo-snapchat';
                    contactDetails.actionLabel = ['شاهد'];
                    break;

                case 'facebook':
                    contactDetails.icon = 'logo-facebook';
                    contactDetails.actionLabel = ['شاهد'];
                    break;

                case 'twitter':
                    contactDetails.icon = 'logo-twitter';
                    contactDetails.actionLabel = ['شاهد'];
                    break;
                case 'youtube':
                    contactDetails.icon = 'logo-youtube';
                    contactDetails.actionLabel = ['شاهد'];
                    contactDetails.valueLabel = '';
                    break;

                case 'instagram':
                    contactDetails.icon = 'logo-instagram';
                    contactDetails.actionLabel = ['شاهد'];
                    break;
                case 'whatsapp':
                    contactDetails.icon = 'logo-whatsapp';
                    contactDetails.actionLabel = ['محادثة', 'إتصال'];
                    contactDetails.action = ['chat', 'call'];
                    break;

                case 'skype':
                    contactDetails.icon = 'logo-skype';
                    contactDetails.actionLabel = ['محادثة'];
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

    get mainContact() {
        //TODO finish this function
        return this.branchs[0];
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
