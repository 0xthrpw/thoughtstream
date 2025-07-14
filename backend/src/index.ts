import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { connectRedis } from './redis.js';
import routes from './routes.js';
import { errorHandler, notFound } from './middleware.js';

const app = express();

app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));

app.use(express.json());

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

async function startServer() {
  try {
    await connectRedis();
    
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
      console.log(`CORS enabled for: ${config.corsOrigin}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();