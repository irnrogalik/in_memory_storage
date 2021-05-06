import { expect } from 'chai';
import { it, describe, after } from 'mocha';
import { ILifo } from '../../src/interfaces';
import { MainInstance } from '../../src/mainInstance';

const lifo: ILifo = new MainInstance().lifo;

describe('Get items from lifo storage test', () => {
    after(() => {
        lifo.empty();
    });
    it('Add \'Hello\' item', async () => {
        await lifo.add('Hello');
        expect(await lifo.numberOfValues()).to.equal(1);
    });
    it('Add \'World\' item', async () => {
        await lifo.add('World');
        expect(await lifo.numberOfValues()).to.equal(2);
    });
    it('Get \'World\' item', async () => {
        expect(await lifo.get()).to.equal('World');
        expect(await lifo.numberOfValues()).to.equal(1);
    });
    it('Add \'Again\' item', async () => {
        await lifo.add('Again');
        expect(await lifo.numberOfValues()).to.equal(2);
    });
    it('Get \'Again\' item', async () => {
        expect(await lifo.get()).to.equal('Again');
        expect(await lifo.numberOfValues()).to.equal(1);
    });
    it('Get \'Hello\' item', async () => {
        expect(await lifo.get()).to.equal('Hello');
        expect(await lifo.numberOfValues()).to.equal(0);
    });
});
