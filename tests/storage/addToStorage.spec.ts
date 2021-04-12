import { expect } from 'chai';
import { it, describe, after } from 'mocha';
import { IKeyValue } from '../../src/interfaces';
import { Storage } from '../../src/storage';

const keyValue: IKeyValue = new Storage().createKeyValueInstance();

describe('Add item to storage test', () => {
    after(() => {
        keyValue.emptyStorage();
    });
    it('Add the first item with key \'name\' to storage', () => {
        keyValue.addToStorage('name', 'John');
        expect(keyValue.numberOfItems()).to.equal(1);
    });
    it('Add the second item with key \'name\' to storage', () => {
        keyValue.addToStorage('name', 'Larry', 30);
        expect(keyValue.numberOfItems()).to.equal(1);
    });
});
