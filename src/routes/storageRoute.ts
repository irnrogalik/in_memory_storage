import express from 'express';
import { Description, DescriptionErrors } from '../enums';
import { schemaForStorageWithValue, schemaForStorage } from '../schema';
import { validationMiddleware } from '../validation';
import { Response } from '../models/responseModel';
import { BadResponse } from '../models/badResponseModel';
import { Storage } from '../models/storageModel';
import { IStorage } from '../interfaces';
import dotenv from 'dotenv';
dotenv.config();

const router: express.Router = express.Router();
const storage: IStorage = new Storage().createStorage(process.env.STORAGE_TYPE);

router.post('/add', validationMiddleware(schemaForStorageWithValue), function (req, res, next) {
    const { key, value, ttl } = req.body;
    storage.addToStorage(key, value, ttl);
    res.json(new Response(Description.Add, value, key).get());
});

router.post('/get', validationMiddleware(schemaForStorage), function (req, res, next) {
    const { key } = req.body;
    const value: String | Promise<String> = storage.getFromStorage(key);
    res.json(new Response(Description.GetByKey, value, key).get());
});

router.delete('/delete', validationMiddleware(schemaForStorage), function (req, res, next) {
    const { key } = req.body;
    const value: String | Promise<String> = storage.getFromStorage(key);
    if (value) {
        storage.removeFromStorage(key);
        res.json(new Response(Description.DeleteByKey, undefined, key).get());
    } else {
        res.status(400).json(new BadResponse(DescriptionErrors.DeleteByKey).get());
    }
});

export default router;
