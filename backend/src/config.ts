import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export const config = {
  port: process.env.PORT || 3001,
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
};