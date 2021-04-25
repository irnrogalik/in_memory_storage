import { expect } from 'chai';
import { it, describe, after } from 'mocha';
import { ILifo } from '../../src/interfaces';
import { Storage } from '../../src/storage';

const lifo: ILifo = new Storage().createLifoInstance();

describe('Add to stack test', () => {
    after(() => {
        lifo.empty();
    });
    it('Add the first item to stack', () => {
        lifo.add('Hello');
        expect(lifo.numberOfValues()).to.equal(1);
    });
    it('Add the last item to stack', () => {
        lifo.add('World');
        expect(lifo.numberOfValues()).to.equal(2);
    });
});
