import { expect } from 'chai';
import { it, describe, after } from 'mocha';
import { IKeyValue } from '../../src/interfaces';
import { MainInstance } from '../../src/mainInstance';

const keyValue: IKeyValue = new MainInstance().keyValue;

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
