import { ILifo } from '../interfaces';

export class MemoryLifo implements ILifo {
    private stack: String[];

    constructor() {
        this.stack = [];
    }

    public add(value: String): void {
        this.stack.push(value);
    }

    public get(): String | undefined {
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
