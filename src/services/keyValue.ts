import { IKeyValueModel } from '../interfaces';

export class KeyValueService {
    private keyValueModel: IKeyValueModel;

    constructor(keyValueModel: IKeyValueModel) {
        this.keyValueModel = keyValueModel;
    }

    async add(key: string, value: string, ttl?: number): Promise<String> {
        return await this.keyValueModel.add(key, value, ttl);
    }

    async get(key: string): Promise<String> {
        return await this.keyValueModel.get(key);
    }

    async delete(key: string): Promise<void> {
        await this.keyValueModel.removeByKey(key);
    }
}
