// Define o formato dos dados esperados para atualização de usuário.
// Todos os campos são opcionais — o cliente manda só o que quer mudar.
export interface UpdateUserDTO {
  name?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  address?: string;
  password?: string;
  role?: string;
  image?: Buffer | null;
  removeImage?: string | boolean;
}
