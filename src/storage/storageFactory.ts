import { IKeyValue, ILifo } from '../interfaces';

export abstract class StorageFactory {
    abstract createKeyValueInstance(): IKeyValue;
    abstract createLifoInstance(): ILifo;
}
