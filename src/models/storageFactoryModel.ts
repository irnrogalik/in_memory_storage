import { IStorage } from '../interfaces';
import { StorageType } from '../enums';

export abstract class FactoryStorage {
    public abstract createStorage(type: StorageType): IStorage;
}
