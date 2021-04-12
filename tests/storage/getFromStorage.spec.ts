import { expect } from 'chai';
import { it, describe, after } from 'mocha';
import { IKeyValue } from '../../src/interfaces';
import { Storage } from '../../src/storage';
import { sleep } from '../helpers';

const keyValue: IKeyValue = new Storage().createKeyValueInstance();

describe('Get items from storage test', function () {
    after(() => {
        keyValue.emptyStorage();
    });
    it('Add item with key \'name\' and value \'John\' to storage', () => {
        keyValue.addToStorage('name', 'John');
        expect(keyValue.numberOfItems()).to.equal(1);
    });
    it('Get item by key \'name\' from storage', () => {
        expect(keyValue.getFromStorage('name')).to.equal('John');
        expect(keyValue.numberOfItems()).to.equal(1);
    });
    it('Get item by key \'age\' from storage', () => {
        expect(keyValue.getFromStorage('age')).to.be.an('null');
    });
    it('Add item with key \'name\', value \'Larry\' and TTL 30 seconds to storage', () => {
        keyValue.addToStorage('name', 'Larry', 30);
        expect(keyValue.numberOfItems()).to.equal(1);
    });
    it('Get item by key \'name\' within 30 seconds of the set from storage', async function () {
        await sleep(20);
        expect(keyValue.getFromStorage('name')).to.equal('Larry');
        expect(keyValue.numberOfItems()).to.equal(1);
    });
    it('Get item by key \'name\' more than 30 seconds after the set from storage', async function () {
        await sleep(10);
        expect(keyValue.getFromStorage('name')).to.be.an('null');
        expect(keyValue.numberOfItems()).to.equal(0);
    });
});
