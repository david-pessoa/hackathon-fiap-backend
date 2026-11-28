// Define o formato dos dados esperados para cadastro de usuário
export interface CreateUserDTO {
  cpf: string;
  email: string;
  name: string;
  phone: string;
  password: string;
  address: string;
  role?: string; // opcional — se não informado, usa REQUESTER por padrão
  image?: Buffer | null;
}
