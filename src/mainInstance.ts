import asyncRedis from 'async-redis';
import redisMock from 'redis-mock';
import { isTestConfig, redisConfig } from './config';
import { IsTest } from './enums';
import { IKeyValue, ILifo, StorageConfig } from './interfaces';
import { Storage } from './storage';

export class MainInstance {
    private redis: asyncRedis | redisMock;
    private redisClient: asyncRedis | redisMock;
    private storageConfig: StorageConfig;
    private isTest: boolean;
    public keyValue: IKeyValue;
    public lifo: ILifo;

    constructor() {
        this.isTest = isTestConfig === IsTest.TRUE;
        this.redis = this.isTest ? redisMock : asyncRedis;
        this.redisClient = this.redis.createClient(redisConfig.port, redisConfig.host);
        this.storageConfig = {
            redisClient: this.redisClient
        };
        this.keyValue = new Storage(this.storageConfig).createKeyValueInstance();
        this.lifo = new Storage(this.storageConfig).createLifoInstance();
    }
}
