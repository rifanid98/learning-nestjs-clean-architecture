import { User } from 'domain/entity/user.entity';
import { DeleteResult } from 'typeorm';

export interface UserRepository {
  getAllUsers(): Promise<User[]>;
  getOneUser(user: User): Promise<User>;
  getUserById(id: string): Promise<User>;
  createUser(user: User): Promise<User>;
}
