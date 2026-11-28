import { User } from '../../entities/User';
import { userRepository } from '../../repositories/UserRepository';

export class ListUsersService {
  async execute(
    filterRole: string = '',
    currentPage: number = 1,
    pageLength: number = 10,
    categoryId: string = ''
  ) {
    // Realiza tratamento dos dados
    if (currentPage < 1) currentPage = 1;
    if (pageLength < 1) pageLength = 10;

    const filterRoleUpper = filterRole.toUpperCase();

    let where = {};

    if (filterRoleUpper) {
      where = {
        ...where,
        role: { name: filterRoleUpper },
      };
    }

    if (categoryId) {
      where = {
        ...where,
        categories: {
          id: categoryId,
        },
      };
    } else {
      // Senão, retorna todos os usuários
    }

    // Paginação
    let skip = (currentPage - 1) * pageLength; //OFFSET: determina a página atual através dos registros que devem ser pulados

    const [users, registerNum] = await userRepository.findAndCount({
      where,
      relations: ['role', 'categories'],
      order: {
        name: 'ASC',
      },
      take: pageLength,
      skip,
    });

    // Calcula o total de páginas existentes
    const totalPages = Math.ceil(registerNum / pageLength);

    function isEmpty(list: any[]) {
      if(list.length == 0)
        return null
      else
        return list
    }

    return {
      users: users.map(user => ({
        id: user.id,
        name: user.name,
        cpf: user.cpf,
        email: user.email,
        phone: user.phone,
        address: user.address,
        categories: isEmpty(user.categories),
        image: user.image ? `/api/user/${user.id}/image` : null,
        role: user.role.name,
      })),
      pagination: {
        currentPage,
        totalPages,
        pageLength,
        totalItems: registerNum,
      },
    };
  }
}

export const listUsersService = new ListUsersService();
