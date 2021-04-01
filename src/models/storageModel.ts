import { redisConfig } from '../config';
import { StorageType } from '../enums';
import { IStorage } from '../interfaces';
import { MemoryStorage } from './memoryModel';
import { RedisStorage } from './redisModel';
import { FactoryStorage } from './storageFactoryModel';

export class Storage extends FactoryStorage {
    public createStorage(type: StorageType | string | undefined): IStorage {
        switch (type) {
        case StorageType.REDIS:
            return new RedisStorage(redisConfig);
        default:
            return new MemoryStorage();
        }
    }
}
