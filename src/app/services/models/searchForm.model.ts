
export class SearchFrom {
    constructor(
        public travelBy: string,
        public city: string,
        public dateFrom: Date,
        public dateTo: Date,
        public page?: number,
    ) {

    }

    get dateFromString() {
        return this.dateFrom.toISOString().slice(0, 10)
    }
    get dateToString() {
        return this.dateTo.toISOString().slice(0, 10)
    }
}

export interface SearchFromInterface {
    travelBy: string;
    city: string;
    dateFrom: string;
    dateTo: string;
    page?: number;
}