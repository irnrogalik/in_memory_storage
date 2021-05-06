import { DBConfig } from './interfaces';
import dotenv from 'dotenv';

dotenv.config();

export const appConfig: { port: number, host: string } = {
    port: 3000,
    host: 'localhost'
};

export const redisConfig: DBConfig = {
    port: 6379,
    host: '127.0.0.1'
};

export const storageTypeConfig = process.env.STORAGE_TYPE;
export const isTestConfig = process.env.IS_TEST;
