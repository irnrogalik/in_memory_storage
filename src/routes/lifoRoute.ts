import express from 'express';
import { Description, DescriptionErrors } from '../enums';
import { validationMiddleware } from '../validation';
import { schemaForStack } from '../schema';
import { Response, BadResponse } from '../models';
import { ILifo } from '../interfaces';
import { Storage } from '../storage';

const router: express.Router = express.Router();
const lifo: ILifo = new Storage().createLifoInstance();

router.post('/add', validationMiddleware(schemaForStack), function (req, res, next) {
    const { value } = req.body;
    lifo.add(value);
    res.json(new Response(Description.Add, value).get());
});

router.get('/get', async function (req, res, next) {
    const value = await lifo.get();
    if (value) {
        res.json(new Response(Description.Get, value).get());
    } else {
        res.status(400).json(new BadResponse(DescriptionErrors.Get).get());
    }
});

export default router;
