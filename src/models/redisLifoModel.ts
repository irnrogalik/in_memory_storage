import Redis from 'redis';
import { DB_CONFIG, ILifo } from '../interfaces';

export class RedisLifo implements ILifo {
    private client: Redis;

    constructor(option: DB_CONFIG) {
        this.client = Redis.createClient(option.port, option.host);
    }

    public addValue(value: String): void {
        this.client.rpush('lifo', value);
    }

    public getValue(): String | undefined {
        return this.client.rpop('lifo');
    }

    public numberOfValues(): Number {
        return this.client.llen('lifo');
    }

    public empty(): void {
        this.client.flushall();
    }
}
