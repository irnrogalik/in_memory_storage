import { redisConfig, storageTypeConfig } from '../config';
import { StorageType } from '../enums';
import { IKeyValue, ILifo } from '../interfaces';
import { MemoryKeyValue, RedisKeyValue, MemoryLifo, RedisLifo } from '../models';
import { StorageFactory } from './storageFactory';

export class Storage extends StorageFactory {
    public createKeyValueInstance(): IKeyValue {
        switch (storageTypeConfig) {
        case StorageType.REDIS:
            return new RedisKeyValue(redisConfig);
        default:
            return new MemoryKeyValue();
        }
    }

    public createLifoInstance(): ILifo {
        switch (storageTypeConfig) {
        case StorageType.REDIS:
            return new RedisLifo(redisConfig);
        default:
            return new MemoryLifo();
        }
    }
}
