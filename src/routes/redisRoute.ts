import express from 'express';
import { Description, DescriptionErrors } from '../enums';
import { validationMiddleware } from '../validation';
import { schemaForStorage, schemaForStorageWithValue } from '../schema';
import { Redis } from '../models/redisModel';
import { redisConfig } from '../config';
import { Response } from '../models/responseModel';
import { BadResponse } from '../models/badResponseModel';

const router: express.Router = express.Router();
const redisClient = new Redis(redisConfig);

router.post('/add', validationMiddleware(schemaForStorageWithValue), async function (req, res, next) {
    const { key, value } = req.body;
    redisClient.set([ key, value ]);
    res.json(new Response(Description.Add, value, key).get());
});

router.post('/get', validationMiddleware(schemaForStorage), async function (req, res, next) {
    const { key } = req.body;
    const value = await redisClient.get(key);
    res.json(new Response(Description.GetByKey, value, key).get());
});

router.delete('/delete', validationMiddleware(schemaForStorage), async function (req, res, next) {
    const { key } = req.body;
    const value: Boolean = await redisClient.get(key);
    if (value) {
        await redisClient.deleteByKey(key);
        res.json(new Response(Description.DeleteByKey, undefined, key).get());
    } else {
        res.status(400).json(new BadResponse(DescriptionErrors.DeleteByKey).get());
    }
});

export default router;
