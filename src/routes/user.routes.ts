import { Router } from 'express';
import { userController } from '../controllers/UserController';
import { authMiddleware, authorizeRoles } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

export const userRouter = Router();

userRouter.post(
  '/',
  upload.single('image'),
  userController.create.bind(userController)
);

userRouter.use(authMiddleware);

userRouter.get(
  '/',
  userController.list.bind(userController)
);
userRouter.get('/:id/image', userController.getUserImage);

userRouter.get(
  '/:id',
  userController.getById.bind(userController)
);

userRouter.patch(
  '/:id',
  upload.single('image'),
  authorizeRoles('MANAGER'),
  userController.update.bind(userController)
);

userRouter.delete('/:id', authorizeRoles('MANAGER'), userController.delete.bind(userController));
