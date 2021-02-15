import { Status, StatusDescription } from './enums';
import { IResponse } from './interfaces';

export function validation(req, res, next) {
    const body = req.body;
    const isBody: Boolean = !!(req.body && Object.keys(body).length);
    const response: IResponse = isBody
        ? { status: Status.Accepted, statusDescription: StatusDescription.Accepted }
        : { status: Status.NoContent, statusDescription: StatusDescription.NoContent };
    return response;
}

export function checkValuesInRequestBody(body, response, schema): IResponse {
    const requiredValues = schema.required;
    const count: Number = requiredValues.reduce((total, key) => {
        total += body[ key ] ? 1 : 0;
        return total;
    }, 0);

    if (schema.required.length === count) {
        response.status = Status.Accepted;
        response.statusDescription = StatusDescription.Accepted;
    } else {
        response.status = Status.Partial;
        response.statusDescription = StatusDescription.Partial;
    }
    return response;
}
