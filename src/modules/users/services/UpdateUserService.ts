import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

// update de usuarios

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  // todo service deve possui apenas 1 funcionalidade
  // metodo que vai estar sendo chamado no controller para execução
  // do serviço
  public async execute({ name, email, password }: IRequest): Promise<User> {
    //chamando o repositorio customizado de usuarios
    const usersRepository = getCustomRepository(UsersRepository);

    // pegando apenas um usuario no repository de usuarios e salvando na variavel
    const user = await usersRepository.findOne(email);

    // se o usuario n existe é criada uma nova instancia do AppError
    if (!user) {
      throw new AppError('User not found.');
    }
    // procurando um usuario apartir de um nome
    const userExists = await usersRepository.findByName(email);

    // se o usuario existir cria uma nova instancia do apperror
    if (userExists) {
      throw new AppError('Email already registered.');
    }

    //atualização do usuario
    user.name = name;
    user.email = email;
    user.password = password;
    // salvando usuario
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
