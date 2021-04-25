import express from 'express';
import { Description, DescriptionErrors } from '../enums';
import { schemaForStorageWithValue, schemaForStorage } from '../schema';
import { validationMiddleware } from '../validation';
import { Response, BadResponse } from '../models';
import { Storage } from '../storage';
import { IKeyValue } from '../interfaces';

const router: express.Router = express.Router();
const keyValue: IKeyValue = new Storage().createKeyValueInstance();

router.post('/add', validationMiddleware(schemaForStorageWithValue), function (req, res, next) {
    const { key, value, ttl } = req.body;
    keyValue.add(key, value, ttl);
    res.json(new Response(Description.Add, value, key).get());
});

router.post('/get', validationMiddleware(schemaForStorage), async function (req, res, next) {
    const { key } = req.body;
    const value: String | Promise<String> = await keyValue.get(key);
    res.json(new Response(Description.GetByKey, value, key).get());
});

router.delete('/delete', validationMiddleware(schemaForStorage), async function (req, res, next) {
    const { key } = req.body;
    const value: String | Promise<String> = await keyValue.get(key);
    if (value) {
        await keyValue.removeByKey(key);
        res.json(new Response(Description.DeleteByKey, undefined, key).get());
    } else {
        res.status(400).json(new BadResponse(DescriptionErrors.DeleteByKey).get());
    }
});

export default router;
