import express from 'express';
import { Status, Description, StatusDescription } from '../enums';
import { IResponse } from '../interfaces';
import { Storage } from '../models/storageModel';
import { schemaForStorageWithValue, schemaForStorage } from '../schema';
import { checkValuesInRequestBody, validation } from '../validation';
const router: express.Router = express.Router();
const storage: Storage = new Storage();

router.post('/add', function (req, res, next) {
    let response: IResponse = validation(req, res, next);
    if (response.status !== Status.Accepted) {
        res.json(response); return;
    } else {
        response = checkValuesInRequestBody(req.body, response, schemaForStorageWithValue);
    }
    if (response.status !== Status.Accepted) { res.json(response); return; }

    const { key, value, ttl } = req.body;
    storage.addToStorage(key, value, ttl);
    response = {
        status: Status.Created,
        statusDescription: StatusDescription.Created,
        description: Description.Add,
        value,
        key
    };
    res.json(response);
});

router.post('/get', function (req, res, next) {
    let response: IResponse = validation(req, res, next);
    if (response.status !== Status.Accepted) {
        res.json(response); return;
    } else {
        response = checkValuesInRequestBody(req.body, response, schemaForStorage);
    }
    if (response.status !== Status.Accepted) { res.json(response); return; }
    const { key } = req.body;
    const value = storage.getFromStorage(key);
    response = {
        status: Status.Ok,
        statusDescription: StatusDescription.Ok,
        description: Description.GetByKey,
        value,
        key
    };
    res.json(response);
});

router.delete('/delete', function (req, res, next) {
    let response: IResponse = validation(req, res, next);
    if (response.status !== Status.Accepted) {
        res.json(response); return;
    } else {
        response = checkValuesInRequestBody(req.body, response, schemaForStorage);
    }
    if (response.status !== Status.Accepted) { res.json(response); return; }

    const { key } = req.body;
    const isKeyExists: Boolean = storage.checkKeyInStorage(key);
    if (isKeyExists) {
        storage.removeFromStorage(key);
        response = {
            status: Status.Ok,
            statusDescription: StatusDescription.Ok,
            description: Description.DeleteByKey
        };
    } else {
        response = {
            status: Status.NotFound,
            statusDescription: StatusDescription.NotFound,
            description: Description.ValueByKeyNotExist
        };
    }
    response.key = key;

    res.json(response);
});

export default router;
