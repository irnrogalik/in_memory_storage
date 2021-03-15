import express from 'express';
import { Description, DescriptionErrors } from '../enums';
import { Stack } from '../models/stackModel';
import { validationMiddleware } from '../validation';
import { schemaForStack } from '../schema';
import { Response } from '../models/responseModel';
import { BadResponse } from '../models/badResponseModel';

const router: express.Router = express.Router();
const stack: Stack = new Stack();

router.post('/add', validationMiddleware(schemaForStack), function (req, res, next) {
    const { value } = req.body;
    stack.addValueToStack(value);
    res.json(new Response(Description.Add, value).get());
});

router.get('/get', function (req, res, next) {
    const value = stack.getValueFromStack();
    if (value) {
        res.json(new Response(Description.Get, value).get());
    } else {
        res.status(400).json(new BadResponse(DescriptionErrors.Get).get());
    }
});

export default router;
