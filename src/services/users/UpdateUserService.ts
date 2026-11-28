import { UpdateUserDTO } from '../../dto/UpdateUserDTO';
import { User } from '../../entities/User';
import { AppError } from '../../middlewares/errorHandler';
import { roleRepository } from '../../repositories/RoleRepository';
import { userRepository } from '../../repositories/UserRepository';
import bcrypt from 'bcryptjs';
import { isUUID } from '../../utils/functions';

export class UpdateUserService {
  // Atualiza dados de um usuário existente. Só MANAGER pode chamar esse método
  // (a checagem de role é feita na rota, via authorizeRoles('MANAGER')).
  async execute(id: string, dados: UpdateUserDTO, usuarioLogado: User) {

    if (isUUID(id)) {
      throw new AppError(404, 'Usuário não encontrado');
    }

    const usuario = await userRepository.findOne({
      where: { id },
      relations: { role: true },
    });

    if (!usuario) {
      throw new AppError(404, 'Usuário não encontrado');
    }

    if (dados.name) {
      usuario.name = dados.name;
    }
    if (dados.address) {
      usuario.address = dados.address;
    }
    if (dados.phone) {
      usuario.phone = dados.phone;
    }

    if (dados.cpf && dados.cpf !== usuario.cpf) {
      const usuarioComCPF = await userRepository.findOne({
        where: { cpf: dados.cpf },
      });

      if (usuarioComCPF && usuarioComCPF.id !== id) {
        throw new AppError(400, 'Já existe um usuário cadastrado com esse CPF');
      }

      usuario.cpf = dados.cpf;
    }

    if (dados.email && dados.email !== usuario.email) {
      const usuarioComEmail = await userRepository.findOne({
        where: { cpf: dados.cpf },
      });

      if (usuarioComEmail && usuarioComEmail.id !== id) {
        throw new AppError(400, 'Já existe um usuário cadastrado com esse email');
      }

      usuario.email = dados.email;
    }

    if (dados.password) {
      usuario.password = await bcrypt.hash(dados.password, 10);
    }

    if (dados.removeImage === true || dados.removeImage === 'true') {
      usuario.image = null;
    } else if (dados.image) {
      usuario.image = dados.image;
    }

    if (dados.role) {
      const roleBuscada = await roleRepository.findOne({
        where: { name: dados.role.toUpperCase() },
      });

      if (!roleBuscada) {
        throw new AppError(400, 'Role não encontrada');
      }

      usuario.role = roleBuscada;
    }

    await userRepository.save(usuario);

    const { password: _, ...usuarioSemSenha } = usuario;
    return {
      ...usuarioSemSenha,
      image: usuario.image ? `/api/user/${usuario.id}/image` : null,
    };
  }
}

export const updateUserService = new UpdateUserService()
