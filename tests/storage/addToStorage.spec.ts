import { expect } from 'chai';
import { it, describe, after } from 'mocha';
import { IStorage } from '../../src/interfaces';
import { Storage } from '../../src/models/storageModel';
import dotenv from 'dotenv';
dotenv.config();

const storage: IStorage = new Storage().createStorage(process.env.STORAGE_TYPE);

describe('Add item to storage test', () => {
    after(() => {
        storage.emptyStorage();
    });
    it('Add the first item with key \'name\' to storage', () => {
        storage.addToStorage('name', 'John');
        expect(storage.numberOfItems()).to.equal(1);
    });
    it('Add the second item with key \'name\' to storage', () => {
        storage.addToStorage('name', 'Larry', 30);
        expect(storage.numberOfItems()).to.equal(1);
    });
});
