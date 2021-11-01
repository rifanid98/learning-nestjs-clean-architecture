import { User } from 'domain/entity/user.entity';
import { Injectable } from '@nestjs/common';

export interface AuthPresenterInterface {
  getPresenter(entity: User): User;
}

@Injectable()
export class AuthPresenter extends User implements AuthPresenterInterface {
  getPresenter(entity: User): User {
    const presenter = new AuthPresenter();
    presenter.id = entity.id;
    presenter.email = entity.email;

    return presenter;
  }
}
