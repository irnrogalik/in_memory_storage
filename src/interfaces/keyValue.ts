export interface IKeyValueModel {
    add(key: string, value: string, ttl?: number): Promise<String> | String;
    get(key: string): Promise<String> | String;
    removeByKey(key: string): Promise<void> | void;
    empty(): Promise<void> | void;
}
