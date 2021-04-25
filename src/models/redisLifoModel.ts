import asyncRedis from 'async-redis';
import { redisClient } from '../libs/redis';
import { ILifo } from '../interfaces';
export class RedisLifo implements ILifo {
    private client: asyncRedis;

    constructor() {
        this.client = redisClient;
    }

    async add(value: String): Promise<void> {
        await this.client.rpush('lifo', value);
    }

    async get(): Promise<String> {
        return await this.client.rpop('lifo');
    }

    async numberOfValues(): Promise<Number> {
        return await this.client.llen('lifo');
    }

    async empty(): Promise<void> {
        return await this.client.flushall();
    }
}
