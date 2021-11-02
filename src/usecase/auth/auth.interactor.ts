import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthUseCase } from './auth.usecase';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthPresenterInterface } from 'adapter/presenter/auth.presenter';
import { AuthSignInDto, AuthSignUpDto } from 'domain/dto/auth.dto';
import { User } from 'domain/entity/user.entity';
import { hash, verify } from 'common/hash';
import { AuthLocalRepository } from 'infrastructure/persistence/local/typeorm/repository/auth.repository';
import { AuthRepository } from 'domain/repository/auth.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthInteractor implements AuthUseCase {
  constructor(
    @Inject('AuthPresenterInterface')
    private presenter: AuthPresenterInterface,
    @InjectRepository(AuthLocalRepository)
    private repository: AuthRepository,
    private jwt: JwtService,
  ) {}

  async signup(auth: AuthSignUpDto): Promise<User> {
    const user = new User();
    user.email = auth.email;
    user.password = await hash(auth.password);

    const result = await this.repository.signup(user);
    return this.presenter.show(result);
  }

  async signin(auth: AuthSignInDto): Promise<User> {
    const result = await this.repository.signin({
      email: auth.email,
    });

    if (!result) {
      throw new NotFoundException('User not found');
    }

    if (!(await verify(auth.password, result.password))) {
      throw new BadRequestException('Credentials is invalid');
    }

    const token = this.jwt.sign(this.presenter.json(result));

    return {
      ...this.presenter.show(result),
      token,
    };
  }

  authenticate(code: string): Promise<string> {
    return Promise.resolve('random jwt token');
  }
}
