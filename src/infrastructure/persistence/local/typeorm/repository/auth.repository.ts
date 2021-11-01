import { AuthRepository } from 'domain/repository/auth.repository';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@EntityRepository(User)
export class AuthLocalRepository
  extends Repository<User>
  implements AuthRepository
{
  login() {}
  signup() {}
}
