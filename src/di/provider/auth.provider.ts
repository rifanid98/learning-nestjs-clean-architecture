import { Provider } from '@nestjs/common';
import { AuthInteractor } from 'usecase/auth/auth.interactor';
import { AuthPresenter } from 'adapter/presenter/auth.presenter';

const AuthProvider: Provider[] = [
  {
    provide: 'AuthUseCase',
    useClass: AuthInteractor,
  },
  {
    provide: 'AuthPresenterInterface',
    useClass: AuthPresenter,
  },
];

export default AuthProvider;
