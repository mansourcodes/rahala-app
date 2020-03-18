
export class Quicksearch {
    constructor(
        public id: string,
        public searchLabel: string,
        public cities: string,
        public travelBy: string,
        public dateFrom: string,
        public dateTo: string,
        public backgroundImg: string,
        public backgroundColor: string,
        public order: string,
    ) {

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
                return '';
                break;
        }

        return 'assets/icon/' + iconName;
    }

}

export interface QuicksearchInterface {

    id: string;
    created_at: string;
    updated_at: string;
    search_label: string;
    cities: string;
    travel_by: string;
    date_from: string;
    date_to: string;
    background_img: string;
    background_color: string;
    order: string;

}
