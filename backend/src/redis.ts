import { createClient } from 'redis';
import { config } from './config.js';

export const redisClient = createClient({
  url: config.redisUrl
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

export async function connectRedis() {
  try {
    await redisClient.connect();
    console.log('Redis connection established');
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    process.exit(1);
  }
}