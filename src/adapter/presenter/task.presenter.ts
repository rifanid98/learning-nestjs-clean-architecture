import { Task } from 'domain/entity/task.entity';
import { Injectable } from '@nestjs/common';

export interface TaskPresenterInterface {
  getPresenter(entity: Task): Task;
}

@Injectable()
export class TaskPresenter extends Task implements TaskPresenterInterface {
  getPresenter(entity: Task): Task {
    const presenter = new TaskPresenter();
    presenter.id = entity.id;
    presenter.description = entity.description;
    presenter.status = entity.status;
    presenter.title = entity.title;

    return presenter;
  }
}
