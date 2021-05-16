import { ILifoModel } from '../interfaces';

export class LifoService {
    private lifoModel: ILifoModel;

    constructor(lifoModel: ILifoModel) {
        this.lifoModel = lifoModel;
    }

    async add(value: String): Promise<void> {
        await this.lifoModel.add(value);
    }

    async get(): Promise<String | undefined> {
        return await this.lifoModel.get();
    }
}
