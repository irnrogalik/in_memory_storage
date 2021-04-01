import asyncRedis from 'async-redis';
import { DB_CONFIG, IStorage } from '../interfaces';

export class RedisStorage implements IStorage {
    private client: asyncRedis;

    constructor(option: DB_CONFIG) {
        this.client = asyncRedis.createClient(option.port, option.host);
    }

    async addToStorage(key: string, value: string, ttl = 0): Promise<void> {
        this.client.hmset('storage', [ key, value ]);
    }

    async getFromStorage(key: string): Promise<String> {
        return await this.client.hget('storage', key);
    }

    async numberOfItems(): Promise<Number> {
        return await this.client.hlen('storage');
    }

    async removeFromStorage(key: string): Promise<void> {
        return await this.client.hdel('storage', key);
    }

    async emptyStorage(): Promise<void> {
        return await this.client.flushall();
    }
}
