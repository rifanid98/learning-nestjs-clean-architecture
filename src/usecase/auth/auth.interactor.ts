import { Inject, Injectable } from '@nestjs/common';
import { AuthUseCase } from './auth.usecase';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthPresenterInterface } from 'adapter/presenter/auth.presenter';
import { AuthLocalRepository } from 'infrastructure/persistence/local/typeorm/repository/auth.repository';
import { AuthRepository } from 'domain/repository/auth.repository';

@Injectable()
export class AuthInteractor implements AuthUseCase {
  constructor(
    @Inject('AuthPresenterInterface')
    private presenter: AuthPresenterInterface,
    @InjectRepository(AuthLocalRepository)
    private authRepository: AuthRepository,
  ) {}

  login() {}

  signup() {}
}
