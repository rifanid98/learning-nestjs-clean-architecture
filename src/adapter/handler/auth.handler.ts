import { Body, Controller, Inject, Post, UseFilters } from '@nestjs/common';
import { AuthUseCase } from 'usecase/auth/auth.usecase';
import { AuthSignInDto, AuthSignUpDto } from 'domain/dto/auth.dto';
import { CustomExceptionFilter } from 'common/exception-filter';

@Controller('auth')
export class AuthHandler {
  constructor(@Inject('AuthUseCase') private useCase: AuthUseCase) {}

  @Post('/signin')
  signin(@Body() auth: AuthSignInDto) {
    return this.useCase.signin(auth);
  }

  @Post('/signup')
  @UseFilters(CustomExceptionFilter)
  signup(@Body() auth: AuthSignUpDto) {
    return this.useCase.signup(auth);
  }
}
