import { expect } from 'chai';
import { it, describe, after } from 'mocha';
import { IStorage } from '../../src/interfaces';
import { Storage } from '../../src/models/storageModel';
import { sleep } from '../helpers';
import dotenv from 'dotenv';
dotenv.config();

const storage: IStorage = new Storage().createStorage(process.env.STORAGE_TYPE);

describe('Get items from storage test', function () {
    after(() => {
        storage.emptyStorage();
    });
    it('Add item with key \'name\' and value \'John\' to storage', () => {
        storage.addToStorage('name', 'John');
        expect(storage.numberOfItems()).to.equal(1);
    });
    it('Get item by key \'name\' from storage', () => {
        expect(storage.getFromStorage('name')).to.equal('John');
        expect(storage.numberOfItems()).to.equal(1);
    });
    it('Get item by key \'age\' from storage', () => {
        expect(storage.getFromStorage('age')).to.be.an('null');
    });
    it('Add item with key \'name\', value \'Larry\' and TTL 30 seconds to storage', () => {
        storage.addToStorage('name', 'Larry', 30);
        expect(storage.numberOfItems()).to.equal(1);
    });
    it('Get item by key \'name\' within 30 seconds of the set from storage', async function () {
        await sleep(20);
        expect(storage.getFromStorage('name')).to.equal('Larry');
        expect(storage.numberOfItems()).to.equal(1);
    });
    it('Get item by key \'name\' more than 30 seconds after the set from storage', async function () {
        await sleep(10);
        expect(storage.getFromStorage('name')).to.be.an('null');
        expect(storage.numberOfItems()).to.equal(0);
    });
});
