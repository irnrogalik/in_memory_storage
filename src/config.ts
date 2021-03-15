import { DB_CONFIG } from './interfaces';

export const appConfig: { port: number, host: string } = {
    port: 3000,
    host: 'localhost'
};

export const redisConfig: DB_CONFIG = {
    port: 6379,
    host: '127.0.0.1'
};
