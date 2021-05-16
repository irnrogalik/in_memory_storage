import { IKeyValueModel, ILifoModel } from '../interfaces';

export abstract class StorageFactory {
    abstract createKeyValueInstance(): IKeyValueModel;
    abstract createLifoInstance(): ILifoModel;
}
