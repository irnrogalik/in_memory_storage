import asyncRedis from 'async-redis';
import { IKeyValue } from '../interfaces';
import { redisClient } from '../libs/redis';

export class RedisKeyValue implements IKeyValue {
    private client: asyncRedis;

    constructor() {
        this.client = redisClient;
    }

    add(key: string, value: string, ttl = 0): void {
        this.client.hmset('storage', [ key, value ]);
    }

    async get(key: string): Promise<String> {
        return await this.client.hget('storage', key);
    }

    async numberOfItems(): Promise<Number> {
        return await this.client.hlen('storage');
    }

    async removeByKey(key: string): Promise<void> {
        return await this.client.hdel('storage', key);
    }

    async empty(): Promise<void> {
        return await this.client.flushall();
    }
}
