import { validateSchema } from './schema';

export function validationMiddleware(schema) {
    return function (req, res, next) {
        const result = validateSchema(schema, req.body);
        if (!result.isValid) {
            res.status(400).json({ error: result.error });
            return;
        }
        next();
    };
}
