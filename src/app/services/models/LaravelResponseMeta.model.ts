export class LaravelResponseMeta {

    constructor(
        public currentPage: number,
        public from?: number,
        public lastPage?: number,
        public path?: string,
        public perPage?: number,
        public to?: number,
        public total?: number
    ) { }
}


export interface LaravelResponseMetaInterface {
    current_page: number,
    from: number,
    last_page: number,
    path: string,
    per_page: number,
    to: number,
    total: number
}