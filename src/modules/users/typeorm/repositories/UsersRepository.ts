import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

//repositorios permitem fazer operações em entidades
@EntityRepository(User)
class UsersRepository extends Repository<User> {
  // encontrar usuario por nome
  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        name,
      },
    });

    return user;
  }
  // encontrar usuario por id
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  }
  // encontrar usuario por email
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}

export default UsersRepository;
