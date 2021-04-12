export interface IKeyValue {
    addToStorage(key: string, value: string, ttl?: number): Promise<void> | void;
    getFromStorage(key: string): Promise<String> | String;
    removeFromStorage(key: string): Promise<void> | void;
    emptyStorage(): Promise<void> | void;
    numberOfItems(): Promise<Number> | Number;
}
