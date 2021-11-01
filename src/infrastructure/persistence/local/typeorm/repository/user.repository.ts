import { UserRepository } from 'domain/repository/user.repository';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@EntityRepository(User)
export class UserLocalRepository
  extends Repository<User>
  implements UserRepository
{
  createUser(user: User): Promise<User> {
    return this.save(user);
  }

  getAllUsers(): Promise<User[]> {
    return Promise.resolve([]);
  }

  getOneUser(user: User): Promise<User> {
    return this.findOne(user);
  }

  getUserById(id: string): Promise<User> {
    return Promise.resolve(undefined);
  }
}
