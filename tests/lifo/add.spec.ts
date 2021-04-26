import { expect } from 'chai';
import { it, describe, after } from 'mocha';
import { ILifo } from '../../src/interfaces';
import { Storage } from '../../src/storage';

const lifo: ILifo = new Storage().createLifoInstance();

describe('Add to lifo storage test', () => {
    after(() => {
        lifo.empty();
    });
    it('Add the first item', async () => {
        await lifo.add('Hello');
        expect(await lifo.numberOfValues()).to.equal(1);
    });
    it('Add the last item', async () => {
        await lifo.add('World');
        expect(await lifo.numberOfValues()).to.equal(2);
    });
});
