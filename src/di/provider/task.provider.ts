import { Provider } from '@nestjs/common';
import { TaskPresenter } from 'adapter/presenter/task.presenter';
import { TaskInteractor } from 'usecase/task/task.interactor';
import { TaskLocalRepository } from 'infrastructure/persistence/local/typeorm/repository/task.repository';

const TaskProvider: Provider[] = [
  {
    provide: 'TaskUseCase',
    useClass: TaskInteractor,
  },
  {
    provide: 'TaskPresenterInterface',
    useClass: TaskPresenter,
  },
  // {
  //   provide: 'TaskRepository',
  //   useClass: TaskLocalRepository,
  // },
];

export default TaskProvider;
