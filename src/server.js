import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/env.js';
import { ENV_VARS } from './const/envVars.js';
import { allContacts, contactById } from './contrContact/controlls.js';

export default function setupServer() {
  const PORT = Number(env(ENV_VARS.PORT, 3000));
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.use(express.json());

  app.get('/contacts', allContacts);

  app.get('/contacts/:contactId', contactById);

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}