import { IResponse } from '../interfaces';

export class Response {
    private response: IResponse;

    constructor(description: string, value?: string | String, key?: string) {
        this.response = {
            description,
            value,
            key
        };
    }

    get(): IResponse {
        return this.response;
    }
}
