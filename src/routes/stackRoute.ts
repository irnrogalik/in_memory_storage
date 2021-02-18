import express from 'express';
import { IResponse } from '../interfaces';
import { Description, DescriptionErrors } from '../enums';
import { Stack } from '../models/stackModel';
import { validationMiddleware } from '../validation';
import { schemaForStack } from '../schema';
const router: express.Router = express.Router();
const stack: Stack = new Stack();

router.post('/add', validationMiddleware(schemaForStack), function (req, res, next) {
    const { value } = req.body;
    stack.addValueToStack(value);
    const response: IResponse = {
        description: Description.Add,
        value
    };
    res.json(response);
});

router.get('/get', function (req, res, next) {
    const value = stack.getValueFromStack();
    if (value) {
        const response: IResponse = {
            value: stack.getValueFromStack(),
            description: Description.Get
        };
        res.json(response);
    } else {
        res.status(400).json({ error: DescriptionErrors.Get });
    }
});

export default router;
