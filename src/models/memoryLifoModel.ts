import { ILifo } from '../interfaces';

export class MemoryLifo implements ILifo {
    private stack: String[];

    constructor() {
        this.stack = [];
    }

    public addValue(value: String): void {
        this.stack.push(value);
    }

    public getValue(): String | undefined {
        return this.stack.pop();
    }

    public numberOfValues(): Number {
        return this.stack.length;
    }

    public empty(): void {
        for (const index in this.stack) {
            delete this.stack[ index ];
        }
    }
}
