export interface IKeyValue {
    add(key: string, value: string, ttl?: number): Promise<void> | void;
    get(key: string): Promise<String> | String;
    removeByKey(key: string): Promise<void> | void;
    empty(): Promise<void> | void;
    numberOfItems(): Promise<Number> | Number;
}
