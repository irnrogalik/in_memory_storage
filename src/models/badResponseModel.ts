import { IBadResponse } from '../interfaces';

export class BadResponse {
    private response: IBadResponse;

    constructor(error: string) {
        this.response = {
            error
        };
    }

    get(): IBadResponse {
        return this.response;
    }
}
