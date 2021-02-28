import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';

// Deletar Usuario

interface IRequest {
  id: string;
}

class DeleteUserService {
  // todo service deve possui apenas 1 funcionalidade
  // metodo que vai estar sendo chamado no controller para execução
  // do serviço
  public async execute({ id }: IRequest): Promise<void> {
    //chamando o repositorio customizado de usuarios
    const usersRepository = getCustomRepository(UsersRepository);

    // pegando apenas um usuario no repository de usuarios e salvando na variavel
    const user = await usersRepository.findOne(id);

    // se o usuario n existe é criada uma nova instancia do AppError
    if (!user) {
      throw new AppError('User not found.');
    }
    // delete do produto
    await usersRepository.remove(user);
  }
}

export default DeleteUserService;
