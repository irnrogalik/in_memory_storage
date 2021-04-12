export interface ILifo {
    addValue(value: String): void;
    getValue(): String | undefined;
    numberOfValues(): Number;
    empty(): void;
}
