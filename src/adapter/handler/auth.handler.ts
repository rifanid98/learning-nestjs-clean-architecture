import {
  Controller,
  Inject,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import { AuthUseCase } from 'usecase/auth/auth.usecase';

@Controller('auth')
export class AuthHandler {
  constructor(@Inject('AuthUseCase') private useCase: AuthUseCase) {}

  @Post('/login')
  login() {
    throw new NotImplementedException();
  }

  @Post('/signup')
  signup() {
    throw new NotImplementedException();
  }
}
