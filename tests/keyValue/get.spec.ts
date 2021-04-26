import { expect } from 'chai';
import { it, describe, after } from 'mocha';
import { IKeyValue } from '../../src/interfaces';
import { Storage } from '../../src/storage';
import { sleep } from '../helpers';

const keyValue: IKeyValue = new Storage().createKeyValueInstance();

describe('Get items from key-value storage test', function () {
    after(() => {
        keyValue.empty();
    });
    it('Add item with key \'name\' and value \'John\'', async () => {
        const isAdd = await keyValue.add('name', 'John');
        expect(isAdd).to.equal('OK');
    });
    it('Get item by key \'name\'', async () => {
        expect(await keyValue.get('name')).to.equal('John');
    });
    it('Get item by key \'age\'', async () => {
        expect(await keyValue.get('age')).to.be.an('null');
    });
    it('Add item with key \'name\', value \'Larry\' and TTL 30 seconds', async () => {
        await keyValue.add('name', 'Larry', 30);
    });
    it('Get item by key \'name\' within 30 seconds of the set', async function () {
        await sleep(20);
        expect(await keyValue.get('name')).to.equal('Larry');
    });
    it('Get item by key \'name\' more than 30 seconds after the set', async function () {
        await sleep(10);
        expect(await keyValue.get('name')).to.be.an('null');
    });
});
