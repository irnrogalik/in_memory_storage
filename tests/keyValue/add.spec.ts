import { expect } from 'chai';
import { it, describe, after } from 'mocha';
import { IKeyValueModel } from '../../src/interfaces';
import { MainInstance } from '../../src/mainInstance';

const keyValueModel: IKeyValueModel = new MainInstance().keyValueModel;

describe('Add item to key-value storage test', () => {
    after(() => {
        keyValueModel.empty();
    });
    it('Add the first item with key \'name\'', async () => {
        const isAdd = await keyValueModel.add('name', 'John');
        expect(isAdd).to.equal('OK');
    });
    it('Add the second item with key \'name\'', async () => {
        const isAdd = await keyValueModel.add('name', 'Larry', 30);
        expect(isAdd).to.equal('OK');
    });
});
