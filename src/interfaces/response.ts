export interface IResponse {
    description?: String;
    value?: String | Promise<String>;
    key?: String;
    ttl?: Number;
}
export interface IBadResponse {
    error: String;
}
