import express from 'express';
import cors from 'cors';
import env from './utils/env.js';
import { ENV_VARS } from './const/envVars.js';
import rootRouter from './routers/index.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import cookiesParser from 'cookie-parser';


export const setupServer=()=> {
  const app = express();
  app.use(cors());

  app.use(
    express.json({
      limit: '1mb',
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );
  app.use(cookiesParser());
  app.use(rootRouter);
  app.use(errorHandler);
  app.use(notFoundHandler);
  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
}