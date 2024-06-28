import { Router } from 'express';
import ctrlWrapper from '../utils/wrapper.js';
import validateBody from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { loginUserSchema, registerUserSchema } from '../validation/schemas/auth.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';


const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post(
  '/refresh',
  authenticate,
  ctrlWrapper(refreshUserSessionController),
);

authRouter.post('/logout', authenticate, ctrlWrapper(logoutUserController));

export default authRouter;