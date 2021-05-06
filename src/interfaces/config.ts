import { Redis } from './redis';

export interface DBConfig {
    port: number;
    host: string;
}

export interface StorageConfig {
    redisClient: Redis;
}
