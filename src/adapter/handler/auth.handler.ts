import {
  Body,
  Controller,
  Inject,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthUseCase } from 'usecase/auth/auth.usecase';
import { AuthSignInDto, AuthSignUpDto } from 'domain/dto/auth.dto';
import { CustomExceptionFilter } from 'sharedkernel/exception-filter';
import { User } from 'domain/entity/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthHandler {
  constructor(@Inject('AuthUseCase') private useCase: AuthUseCase) {}

  @Post('/signin')
  signin(@Body() auth: AuthSignInDto): Promise<User> {
    return this.useCase.signin(auth);
  }

  @Post('/signup')
  @UseFilters(CustomExceptionFilter)
  signup(@Body() auth: AuthSignUpDto): Promise<User> {
    return this.useCase.signup(auth);
  }

  /**
   * Authenticate code from google authenticator
   * @param req
   */
  @Post('/authenticate')
  @UseGuards(AuthGuard('jwt'))
  authenticate(@Req() req): Promise<string> {
    console.log(req);
    return Promise.resolve('');
  }
}
