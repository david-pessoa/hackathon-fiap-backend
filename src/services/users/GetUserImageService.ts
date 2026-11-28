import { AppError } from '../../middlewares/errorHandler';
import { userRepository } from '../../repositories/UserRepository';
import { isUUID } from '../../utils/functions';

export class GetUserImageService {
  async execute(id: string) {

    if (isUUID(id)) {
      throw new AppError(400, 'ID de usuário inválido');
    }

    const user = await userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new AppError(404, 'Usuário não encontrado');
    }

    return user.image ? user.image : null;
  }
}

export const getUserImageService = new GetUserImageService();
