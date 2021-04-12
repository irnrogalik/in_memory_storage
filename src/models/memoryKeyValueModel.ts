import { IKeyValue } from '../interfaces';

export class MemoryKeyValue implements IKeyValue {
    private storage: Object;

    constructor() {
        this.storage = {};
    }

    public addToStorage(key: string, value: string, ttl = 0): void {
        const date: number = ttl === 0 ? 0 : +new Date() + (ttl * 1000);
        this.storage[ key ] = { value, date };
    }

    public getFromStorage(key: string): String {
        return this.checkKeyInStorage(key) ? this.storage[ key ].value : null;
    }

    public removeFromStorage(key: string): void {
        delete this.storage[ key ];
    }

    public checkKeyInStorage(key: string): Boolean {
        this.validStorage();
        return key in this.storage;
    }

    public numberOfItems(): Number {
        this.validStorage();
        return Object.keys(this.storage).length;
    }

    public validStorage(): void {
        for (const key in this.storage) {
            const date = this.storage[ key ].date;
            if (date !== 0 && date < +new Date()) {
                this.removeFromStorage(key);
            }
        }
    }

    public emptyStorage(): void {
        this.storage = {};
    }
}
