import { User } from 'domain/entity/user.entity';
import { Injectable } from '@nestjs/common';

export interface UserPresenterInterface {
  show(entity: User): User;
}

@Injectable()
export class UserPresenter extends User implements UserPresenterInterface {
  show(entity: User): User {
    const presenter = new UserPresenter();
    presenter.id = entity.id;
    presenter.email = entity.email;

    return presenter;
  }
}
