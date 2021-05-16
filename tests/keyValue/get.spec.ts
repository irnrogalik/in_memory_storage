import { expect } from 'chai';
import { it, describe, after } from 'mocha';
import { IKeyValueModel } from '../../src/interfaces';
import { sleep } from '../helpers';
import { MainInstance } from '../../src/mainInstance';

const keyValueModel: IKeyValueModel = new MainInstance().keyValueModel;

describe('Get items from key-value storage test', function () {
    after(() => {
        keyValueModel.empty();
    });
    it('Add item with key \'name\' and value \'John\'', async () => {
        const isAdd = await keyValueModel.add('name', 'John');
        expect(isAdd).to.equal('OK');
    });
    it('Get item by key \'name\'', async () => {
        expect(await keyValueModel.get('name')).to.equal('John');
    });
    it('Get item by key \'age\'', async () => {
        expect(await keyValueModel.get('age')).to.be.an('null');
    });
    it('Add item with key \'name\', value \'Larry\' and TTL 30 seconds', async () => {
        await keyValueModel.add('name', 'Larry', 30);
    });
    it('Get item by key \'name\' within 30 seconds of the set', async function () {
        await sleep(20);
        expect(await keyValueModel.get('name')).to.equal('Larry');
    });
    it('Get item by key \'name\' more than 30 seconds after the set', async function () {
        await sleep(10);
        expect(await keyValueModel.get('name')).to.be.an('null');
    });
});
