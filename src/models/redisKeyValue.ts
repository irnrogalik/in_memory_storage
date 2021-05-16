import asyncRedis from 'async-redis';
import { IKeyValueModel } from '../interfaces';

export class RedisKeyValueModel implements IKeyValueModel {
    private client: asyncRedis;
    hashName: string = 'keyValue';

    constructor(redisClient) {
        this.client = redisClient;
    }

    async add(key: string, value: string, ttl = 0): Promise<String> {
        const isAdd = await this.client.hmset(`${ this.hashName }-${ key }`, [ key, value ]);
        if (isAdd && ttl !== 0) {
            await this.client.expire(`${ this.hashName }-${ key }`, ttl);
        }
        return isAdd;
    }

    async get(key: string): Promise<String> {
        return await this.client.hget(`${ this.hashName }-${ key }`, key);
    }

    async removeByKey(key: string): Promise<void> {
        return await this.client.hdel(`${ this.hashName }-${ key }`, key);
    }

    async empty(): Promise<void> {
        await this.client.flushall();
    }
}
