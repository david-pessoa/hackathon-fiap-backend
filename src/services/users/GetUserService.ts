import { AppError } from '../../middlewares/errorHandler';
import { userRepository } from '../../repositories/UserRepository';
import { isUUID, isEmpty } from '../../utils/functions';

export class GetUserService {
  async execute(id: string) {

    if (isUUID(id)) {
      throw new AppError(400, 'ID de usuário inválido');
    }

    const user = await userRepository.findOne({
      where: { id },
      relations: ['role', 'categories'],
    });

    if (!user) {
      throw new AppError(404, 'Usuário não encontrado');
    }

    return {
      id: user.id,
      cpf: user.cpf,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      categories: isEmpty(user.categories),
      image: user.image ? `/api/user/${user.id}/image` : null,
      role: user.role.name
    };
  }
}

export const getUserService = new GetUserService();
