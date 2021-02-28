import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execution({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    // procurando p ver se algum usuario ja possui o email
    const emailExists = await usersRepository.findByEmail(email);

    // caso o email ja esteja em uso, cria uma nova instancia do AppError
    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    // criação de um novo objeto com os dados do usuario novo
    const user = usersRepository.create({
      name,
      email,
      password,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
