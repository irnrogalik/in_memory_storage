import { expect } from 'chai';
import { it, describe, after } from 'mocha';
import { IKeyValue } from '../../src/interfaces';
import { Storage } from '../../src/storage';

const keyValue: IKeyValue = new Storage().createKeyValueInstance();

describe('Add item to key-value storage test', () => {
    after(() => {
        keyValue.empty();
    });
    it('Add the first item with key \'name\'', async () => {
        const isAdd = await keyValue.add('name', 'John');
        expect(isAdd).to.equal('OK');
    });
    it('Add the second item with key \'name\'', async () => {
        const isAdd = await keyValue.add('name', 'Larry', 30);
        expect(isAdd).to.equal('OK');
    });
});
