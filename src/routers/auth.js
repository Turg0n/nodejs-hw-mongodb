import { Router } from 'express';
import {ctrlWrapper} from '../utils/wrapper.js';
import {validateBody} from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/schemas/auth.js';
import {registerUserController,
        loginUserController,
        logoutController,
        refreshTokenController,
        sendResetEmailController,
        resetPasswordController} from '../controllers/auth.js';
import { sendResetPasswordSchema } from "../validation/schemas/sendResetPasswordSchema.js";
import { resetPasswordSchema } from "../validation/schemas/resetPasswordSchema.js";

const authRouter = Router();

authRouter.post('/register', validateBody(registerUserSchema),ctrlWrapper(registerUserController));
authRouter.post('/login',validateBody(loginUserSchema),ctrlWrapper(loginUserController));
authRouter.post('/logout', ctrlWrapper(logoutController));
authRouter.post('/refresh', ctrlWrapper(refreshTokenController));
authRouter.post('/send-reset-email', validateBody(sendResetPasswordSchema),ctrlWrapper(sendResetEmailController));
authRouter.post('/reset-pwd', validateBody(resetPasswordSchema),ctrlWrapper(resetPasswordController));

export default authRouter;