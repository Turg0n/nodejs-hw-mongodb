import { Router } from 'express';
import ctrlWrapper from '../utils/wrapper.js';
import validateBody from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { loginUserSchema, registerUserSchema } from '../validation/schemas/auth.js';
import {
  loginUserController,
  logoutUserController,
  refreshUsersSessionController,
  registerUserContoller,
} from '../controllers/auth.js';


const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserContoller),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post(
  '/refresh',
  authenticate,
  ctrlWrapper(refreshUsersSessionController),
);

authRouter.post('/logout', authenticate, ctrlWrapper(logoutUserController));

export default authRouter;