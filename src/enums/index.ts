export enum StorageType {
    MEMORY = 'MEMORY',
    REDIS = 'REDIS'
}

export enum Description {
    Add = 'The value was successfully added',
    Get = 'Get value',
    GetByKey = 'Get value by key',
    DeleteByKey = 'Delete value by key',
    ValueByKeyNotExist = 'Value by key not exist'
};

export enum DescriptionErrors {
    Get = 'Value not found',
    DeleteByKey = 'Value by key not found',
};
