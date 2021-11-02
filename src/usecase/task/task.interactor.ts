import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskPresenterInterface } from 'adapter/presenter/task.presenter';
import { Task } from 'domain/entity/task.entity';
import { TaskUseCase } from './task.usecase';
import { TaskRepository } from 'domain/repository/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskLocalRepository } from 'infrastructure/persistence/local/typeorm/repository/task.repository';
import { User } from 'domain/entity/user.entity';

@Injectable()
export class TaskInteractor implements TaskUseCase {
  constructor(
    @Inject('TaskPresenterInterface')
    private presenter: TaskPresenterInterface,
    @InjectRepository(TaskLocalRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.getAllTasks();
  }

  async getTaskById(id: string): Promise<Task> {
    const result = await this.taskRepository.getTaskById(id);
    if (!result) {
      throw new NotFoundException(`task with id "${id}" not found`);
    }
    return result;
  }

  createTask(task: Task, user: User): Promise<Task> {
    return this.taskRepository.createTask(task, user);
  }

  async deleteTaskById(id: string): Promise<boolean> {
    const result = await this.taskRepository.deleteTaskById(id);
    if (result.affected < 1) {
      throw new NotFoundException(`task with id "${id}" not found`);
    }
    return Promise.resolve(true);
  }
}
