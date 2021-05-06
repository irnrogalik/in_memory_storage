import { storageTypeConfig } from '../config';
import { StorageType } from '../enums';
import { IKeyValue, ILifo, StorageConfig } from '../interfaces';
import { MemoryKeyValue, RedisKeyValue, MemoryLifo, RedisLifo } from '../models';
import { StorageFactory } from './storageFactory';

export class Storage extends StorageFactory {
    private redisClient;

    constructor(config: StorageConfig) {
        super();
        this.redisClient = config.redisClient;
    }

    public createKeyValueInstance(): IKeyValue {
        switch (storageTypeConfig) {
        case StorageType.REDIS:
            return new RedisKeyValue(this.redisClient);
        default:
            return new MemoryKeyValue();
        }
    }

    public createLifoInstance(): ILifo {
        switch (storageTypeConfig) {
        case StorageType.REDIS:
            return new RedisLifo(this.redisClient);
        default:
            return new MemoryLifo();
        }
    }
}
