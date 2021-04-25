import asyncRedis from 'async-redis';
import { redisConfig } from '../config';

class RedisClient {
    private static instance: RedisClient;
    public client: asyncRedis;

    private constructor() {
        this.client = asyncRedis.createClient(redisConfig.port, redisConfig.host);
    }

    public static getInstance() {
        if (!RedisClient.instance) {
            RedisClient.instance = new RedisClient();
        }
        return RedisClient.instance;
    }
}

export const redisClient = RedisClient.getInstance().client;
