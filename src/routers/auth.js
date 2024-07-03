import { Router } from 'express';
import {ctrlWrapper} from '../utils/wrapper.js';
import {validateBody} from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/schemas/auth.js';
import {registerUserController, loginUserController, logoutController, refreshTokenController} from '../controllers/auth.js';


const authRouter = Router();

authRouter.post('/register', validateBody(registerUserSchema),ctrlWrapper(registerUserController));
authRouter.post('/login',validateBody(loginUserSchema),ctrlWrapper(loginUserController));
authRouter.post('/logout', ctrlWrapper(logoutController));
authRouter.post('/refresh', ctrlWrapper(refreshTokenController));


export default authRouter;