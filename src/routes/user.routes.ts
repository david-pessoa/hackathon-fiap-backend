import { Router } from 'express';
import { userController } from '../controllers/UserController';
import { authMiddleware, authorizeRoles } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

export const userRouter = Router();

userRouter.get(
  '/',
  userController.list.bind(userController)
);
userRouter.get('/:id/image', userController.getUserImage);

userRouter.get('/me', userController.getMe.bind(userController));

userRouter.get(
  '/:id',
  userController.getById.bind(userController)
);

userRouter.post(
  '/',
  upload.single('image'),
  userController.create.bind(userController)
);

userRouter.use(authMiddleware);

userRouter.patch(
  '/:id',
  upload.single('image'),
  userController.update.bind(userController)
);

userRouter.delete('/:id', authorizeRoles('MANAGER'), userController.delete.bind(userController));
