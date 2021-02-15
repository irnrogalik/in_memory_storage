export class Stack {
    private stack: String[];

    constructor() {
        this.stack = [];
    }

    public addValueToStack(value: String): void {
        this.stack.push(value);
    }

    public getValueFromStack(): String | undefined {
        return this.stack.pop();
    }

    public numberOfValues(): Number {
        return this.stack.length;
    }

    public emptyStack(): void {
        for (const index in this.stack) {
            delete this.stack[ index ];
        }
    }
}
