import { User } from 'domain/entity/user.entity';
import { UserRepository } from 'domain/repository/user.repository';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';

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

  getUserById(id: string): Promise<User> {
    return Promise.resolve(undefined);
  }
}
