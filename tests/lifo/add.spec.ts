import { expect } from 'chai';
import { it, describe, after } from 'mocha';
import { ILifoModel } from '../../src/interfaces';
import { MainInstance } from '../../src/mainInstance';

const lifoModel: ILifoModel = new MainInstance().lifoModel;

describe('Add to lifo storage test', () => {
    after(() => {
        lifoModel.empty();
    });
    it('Add the first item', async () => {
        await lifoModel.add('Hello');
        expect(await lifoModel.numberOfValues()).to.equal(1);
    });
    it('Add the last item', async () => {
        await lifoModel.add('World');
        expect(await lifoModel.numberOfValues()).to.equal(2);
    });
});
