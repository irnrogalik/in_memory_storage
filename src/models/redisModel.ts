import asyncRedis from 'async-redis';
import { DB_CONFIG } from '../interfaces';

export class Redis {
    private client: asyncRedis;

    constructor(option: DB_CONFIG) {
        this.client = asyncRedis.createClient(option.port, option.host);
    }

    async set(valueObject) {
        this.client.hmset('storage', valueObject);
    }

    async getAll() {
        return this.client.hgetall('storage');
    }

    async get(key: string) {
        return await this.client.hget('storage', key);
    }

    async deleteByKey(key: string) {
        return await this.client.hdel('storage', key);
    }

    async flush() {
        return await this.client.flushall();
    }
}
