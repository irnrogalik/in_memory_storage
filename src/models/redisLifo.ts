import asyncRedis from 'async-redis';
import { ILifoModel } from '../interfaces';

export class RedisLifoModel implements ILifoModel {
    private client: asyncRedis;
    hashName: string = 'lifo';

    constructor(redisClient) {
        this.client = redisClient;
    }

    async add(value: String): Promise<void> {
        await this.client.rpush(this.hashName, value);
    }

    async get(): Promise<String> {
        return await this.client.rpop(this.hashName);
    }

    async numberOfValues(): Promise<Number> {
        return await this.client.llen(this.hashName);
    }

    async empty(): Promise<void> {
        await this.client.flushall();
    }
}
