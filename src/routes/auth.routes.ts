import { Router } from 'express';

import { authController } from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/authMiddleware';

export const authRouter = Router();

// Rota pública — qualquer um pode fazer login
authRouter.post('/login', authController.login.bind(authController));
authRouter.post('/logout', authController.logout.bind(authController));

authRouter.use(authMiddleware);
authRouter.get('/me', authController.getMe.bind(authController));
