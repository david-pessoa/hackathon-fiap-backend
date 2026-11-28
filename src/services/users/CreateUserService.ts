import { CreateUserDTO } from '../../dto/CreateUserDTO';
import { Role } from '../../entities/Role';
import { User } from '../../entities/User';
import { AppError } from '../../middlewares/errorHandler';
import { roleRepository } from '../../repositories/RoleRepository';
import { userRepository } from '../../repositories/UserRepository';
import bcrypt from 'bcryptjs';

export class CreateUserService {
  async execute(dados: CreateUserDTO, usuarioLogado: User | undefined) {
    console.log('O usuário logado:', usuarioLogado);

    const usuarioExistente = await userRepository.findOne({
      where: [{ cpf: dados.cpf }, { email: dados.email }],
    });

    if (usuarioLogado) {
      const cargoDoDonoDoToken = usuarioLogado.role.name;

      // Se o usuário está logado e não é gestor
      if (cargoDoDonoDoToken !== 'MANAGER') {
        throw new AppError(403, 'Professores só possuem permissão para cadastrar alunos.');
      }
    }

    if (usuarioExistente) {
      throw new AppError(409, 'O email ou CPF utilizado já está cadastrado');
    }

    let roleBuscada: Role | null = null;

    // Extraí role passada no corpo da requisição
    if (dados.role) {
      roleBuscada = await roleRepository.findOne({
        where: { name: dados.role.toUpperCase() },
      });

      if (!roleBuscada) {
        throw new AppError(404, 'Role não encontrada');
      }

      // Na ausência de role no corpo da requsição, atribui role de aluno
    } else {
      roleBuscada = await roleRepository.findOne({
        where: { name: 'REQUESTER' },
      });

      if (!roleBuscada) {
        throw new AppError(500, 'Role padrão REQUESTER não encontrada');
      }
    }

    const senhaCriptografada = await bcrypt.hash(dados.password, 10);

    const usuario = userRepository.create({
      cpf: dados.cpf,
      name: dados.name,
      email: dados.email,
      phone: dados.phone,
      address: dados.address,
      password: senhaCriptografada,
      image: dados.image ?? null,
      role: roleBuscada,
    });

    await userRepository.save(usuario);

    const { password: _, ...usuarioSemSenha } = usuario;
    return {
      ...usuarioSemSenha,
      image: usuario.image ? `/api/user/${usuario.id}/image` : null,
    };
  }
}
export const createUserService = new CreateUserService();
