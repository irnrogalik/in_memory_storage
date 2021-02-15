import Ajv, { JSONSchemaType } from 'ajv';

const ajv = new Ajv();

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
