import { expect } from 'chai';
import { it, describe, after } from 'mocha';
import { ILifo } from '../../src/interfaces';
import { Storage } from '../../src/storage';

const lifo: ILifo = new Storage().createLifoInstance();

describe('Get items from stack test', () => {
    after(() => {
        lifo.empty();
    });
    it('Add \'Hello\' item from stack', () => {
        lifo.add('Hello');
        expect(lifo.numberOfValues()).to.equal(1);
    });
    it('Add \'World\' item from stack', () => {
        lifo.add('World');
        expect(lifo.numberOfValues()).to.equal(2);
    });
    it('Get \'World\' item from stack', () => {
        expect(lifo.get()).to.equal('World');
        expect(lifo.numberOfValues()).to.equal(1);
    });
    it('Add \'Again\' item from stack', () => {
        lifo.add('Again');
        expect(lifo.numberOfValues()).to.equal(2);
    });
    it('Get \'Again\' item from stack', () => {
        expect(lifo.get()).to.equal('Again');
        expect(lifo.numberOfValues()).to.equal(1);
    });
    it('Get \'Hello\' item from stack', () => {
        expect(lifo.get()).to.equal('Hello');
        expect(lifo.numberOfValues()).to.equal(0);
    });
});
