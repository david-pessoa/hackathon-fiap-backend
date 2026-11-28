import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { env } from '../../config/env';
import { LoginDTO } from '../../dto/LoginDTO';
import { AppError } from '../../middlewares/errorHandler';
import { userRepository } from '../../repositories/UserRepository';

export class AuthService {
  async login(dados: LoginDTO) {
    // Busca o usuário pela matrícula, carregando também a role
    const usuario = await userRepository.findOne({
      where: { cpf: dados.cpf },
      relations: ['role'],
    });

    // Se não encontrou, retorna erro genérico (não revelamos se é matrícula ou senha)
    if (!usuario) {
      throw new AppError(401, 'CPF ou senha inválidos');
    }

    // Compara a senha informada com o hash salvo no banco
    const senhaCorreta = await bcrypt.compare(dados.password, usuario.password);

    if (!senhaCorreta) {
      throw new AppError(401, 'Senha inválida');
    }

    // Gera o token JWT com os dados básicos do usuário
    const token = jwt.sign(
      {
        sub: usuario.id,
        role: usuario.role.name,
      },
      env.jwt.secret,
      { expiresIn: env.jwt.expiresIn as any }
    );

    // Retorna o token e dados básicos — sem a senha
    return {
      message: "Login realizado com sucesso!",
      token,
      usuario: {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        phone: usuario.phone,
        address: usuario.address,
        cpf: usuario.cpf,
        role: usuario.role.name,
        image: usuario.image ? `/api/user/${usuario.id}/image` : null
      },
    };
  }
}

export const authService = new AuthService();
