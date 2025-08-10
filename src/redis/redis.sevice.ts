import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CounterService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async increment() {
    return await this.redis.incr('page_hits');
  }

  async getCount() {
    const count = await this.redis.get('page_hits');
    return Number(count) || 0;
  }
}
