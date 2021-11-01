import { AuthSignInDto, AuthSignUpDto } from 'domain/dto/auth.dto';
import { User } from 'domain/entity/user.entity';

export interface AuthUseCase {
  signup(auth: AuthSignUpDto): Promise<User>;
  signin(auth: AuthSignInDto): Promise<User>;
  authenticate(code: string): Promise<string>;
}
