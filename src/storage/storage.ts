import { storageTypeConfig } from '../config';
import { StorageType } from '../enums';
import { IKeyValueModel, ILifoModel, StorageConfig } from '../interfaces';
import { MemoryKeyValueModel, RedisKeyValueModel, MemoryLifoModel, RedisLifoModel } from '../models';
import { StorageFactory } from './storageFactory';

export class Storage extends StorageFactory {
    private redisClient;

    constructor(config: StorageConfig) {
        super();
        this.redisClient = config.redisClient;
    }

    public createKeyValueInstance(): IKeyValueModel {
        switch (storageTypeConfig) {
        case StorageType.REDIS:
            return new RedisKeyValueModel(this.redisClient);
        default:
            return new MemoryKeyValueModel();
        }
    }

    public createLifoInstance(): ILifoModel {
        switch (storageTypeConfig) {
        case StorageType.REDIS:
            return new RedisLifoModel(this.redisClient);
        default:
            return new MemoryLifoModel();
        }
    }
}
