import Ajv, { DefinedError, JSONSchemaType } from 'ajv';

const ajv = new Ajv({ allErrors: true });

interface StackBody {
    value: string;
}

interface StorageBody {
    key: string;
    value: string;
    ttl: number;
}

export const schemaForStack: JSONSchemaType<StackBody> = {
    type: 'object',
    properties: {
        value: { type: 'string' }
    },
    required: [ 'value' ]
};

export const schemaForStorage: JSONSchemaType<StorageBody> = {
    type: 'object',
    properties: {
        key: { type: 'string' },
        value: { type: 'string' },
        ttl: { type: 'number' }
    },
    required: [ 'key' ]
};

export const schemaForStorageWithValue: JSONSchemaType<StorageBody> = {
    type: 'object',
    properties: {
        key: { type: 'string' },
        value: { type: 'string' },
        ttl: { type: 'number' }
    },
    required: [ 'key', 'value' ]
};

export function validateSchema(schema, data) {
    const validate = ajv.compile(schema);
    const valid = validate(data);
    const errors: Array<string | undefined> = [];
    if (!valid) {
        for (const err of validate.errors as DefinedError[]) {
            errors.push(err.message);
        }
    }
    return { isValid: valid, error: valid ? '' : errors.join(';') };
}
