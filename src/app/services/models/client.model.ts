import { environment } from 'src/environments/environment';

export class Client {
    constructor(
        public id: string,
        public clientName: string,
        public clientAlian: string,
        public logoImg: string,
        public contactWp1: string,
        public contactWp2: string,
        public locations: string,
    ) { }


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
    contact_wp_1: string;
    contact_wp_2: string;
    locations: string;

}
