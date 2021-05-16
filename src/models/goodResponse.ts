import { IResponse } from '../interfaces';

export class GoodResponse {
    private response: IResponse;

    constructor(description: string, value?: string | String | Promise<String>, key?: string) {
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
