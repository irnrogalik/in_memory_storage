import asyncRedis from 'async-redis';
import redisMock from 'redis-mock';

export interface Redis {
    redis: asyncRedis | redisMock;
}
