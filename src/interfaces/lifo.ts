export interface ILifoModel {
    add(value: String): Promise<void> | void;
    get(): Promise<String> | String | undefined ;
    numberOfValues(): Promise<Number> | Number;
    empty(): Promise<void> | void;
}
