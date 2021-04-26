import asyncRedis from 'async-redis';
import { redisClient } from '../libs/redis';
import { ILifo } from '../interfaces';
export class RedisLifo implements ILifo {
    private client: asyncRedis;
    hashName: string = 'lifo';

    constructor() {
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
