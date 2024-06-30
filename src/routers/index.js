import { Router } from 'express';
import contactsRouter from './contacts.js';
import router from './auth.js';

const rootRouter = Router();

rootRouter.use('/contacts', contactsRouter);
rootRouter.use('/auth', router);

export default rootRouter;