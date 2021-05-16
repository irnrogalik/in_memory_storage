import { expect } from 'chai';
import { it, describe, after } from 'mocha';
import { ILifoModel } from '../../src/interfaces';
import { MainInstance } from '../../src/mainInstance';

const lifoModel: ILifoModel = new MainInstance().lifoModel;

describe('Get items from lifo storage test', () => {
    after(() => {
        lifoModel.empty();
    });
    it('Add \'Hello\' item', async () => {
        await lifoModel.add('Hello');
        expect(await lifoModel.numberOfValues()).to.equal(1);
    });
    it('Add \'World\' item', async () => {
        await lifoModel.add('World');
        expect(await lifoModel.numberOfValues()).to.equal(2);
    });
    it('Get \'World\' item', async () => {
        expect(await lifoModel.get()).to.equal('World');
        expect(await lifoModel.numberOfValues()).to.equal(1);
    });
    it('Add \'Again\' item', async () => {
        await lifoModel.add('Again');
        expect(await lifoModel.numberOfValues()).to.equal(2);
    });
    it('Get \'Again\' item', async () => {
        expect(await lifoModel.get()).to.equal('Again');
        expect(await lifoModel.numberOfValues()).to.equal(1);
    });
    it('Get \'Hello\' item', async () => {
        expect(await lifoModel.get()).to.equal('Hello');
        expect(await lifoModel.numberOfValues()).to.equal(0);
    });
});
