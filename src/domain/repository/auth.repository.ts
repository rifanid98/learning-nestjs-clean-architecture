import { User } from '../entity/user.entity';

export interface AuthRepository {
  signup(user: User): Promise<User>;
  signin(user: User): Promise<User>;
  authenticate(code: string): Promise<string>;
}
