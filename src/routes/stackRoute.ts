import express from 'express';
import { IResponse } from '../interfaces';
import { Description, Status, StatusDescription } from '../enums';
import { Stack } from '../models/stackModel';
import { checkValuesInRequestBody, validation } from '../validation';
import { schemaForStack } from '../schema';
const router: express.Router = express.Router();
const stack: Stack = new Stack();

router.post('/add', function (req, res, next) {
    let response: IResponse = validation(req, res, next);
    if (response.status !== Status.Accepted) {
        res.json(response); return;
    } else {
        response = checkValuesInRequestBody(req.body, response, schemaForStack);
    }
    if (response.status !== Status.Accepted) { res.json(response); return; }

    const { value } = req.body;
    stack.addValueToStack(value);
    response = {
        status: Status.Created,
        statusDescription: StatusDescription.Created,
        description: Description.Add,
        value: value
    };
    res.json(response);
});

router.get('/get', function (req, res, next) {
    const value = stack.getValueFromStack();
    const response: IResponse = {
        status: Status.Ok,
        statusDescription: StatusDescription.Ok
    };
    if (value) {
        response.value = stack.getValueFromStack();
        response.description = Description.Get;
    } else {
        response.status = Status.NoContent;
        response.statusDescription = StatusDescription.NoContent;
    }
    res.json(response);
});

export default router;
