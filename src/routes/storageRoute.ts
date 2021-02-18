import express from 'express';
import { Description, DescriptionErrors } from '../enums';
import { IResponse } from '../interfaces';
import { Storage } from '../models/storageModel';
import { schemaForStorageWithValue, schemaForStorage } from '../schema';
import { validationMiddleware } from '../validation';
const router: express.Router = express.Router();
const storage: Storage = new Storage();

router.post('/add', validationMiddleware(schemaForStorageWithValue), function (req, res, next) {
    const { key, value, ttl } = req.body;
    storage.addToStorage(key, value, ttl);
    const response: IResponse = {
        description: Description.Add,
        value,
        key
    };
    res.json(response);
});

router.post('/get', validationMiddleware(schemaForStorage), function (req, res, next) {
    const { key } = req.body;
    const value = storage.getFromStorage(key);
    const response: IResponse = {
        description: Description.GetByKey,
        value,
        key
    };
    res.json(response);
});

router.delete('/delete', validationMiddleware(schemaForStorage), function (req, res, next) {
    const { key } = req.body;
    const isKeyExists: Boolean = storage.checkKeyInStorage(key);
    if (isKeyExists) {
        storage.removeFromStorage(key);
        const response: IResponse = {
            description: Description.DeleteByKey,
            key
        };
        res.json(response);
    } else {
        res.status(400).json({ error: DescriptionErrors.DeleteByKey });
    }
});

export default router;
