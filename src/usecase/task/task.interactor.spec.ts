import { Test } from '@nestjs/testing';
import { TaskPresenterInterface } from 'adapter/presenter/task.presenter';
import { TaskLocalRepository } from 'infrastructure/persistence/local/typeorm/repository/task.repository';
import { TaskUseCase } from 'usecase/task/task.usecase';
import { TaskInteractor } from 'usecase/task/task.interactor';
import { Task, TaskStatus } from 'src/domain/entity/task.entity';
import Mock = jest.Mock;
import { NotFoundException } from '@nestjs/common';

type MockTaskRepository = {
  getAllTasks: Mock;
  getTaskById: Mock;
};

type MockTaskPresenterInterface = {
  show(entity: Task): Mock;
};

const mockTaskRepository = (): MockTaskRepository => ({
  getAllTasks: jest.fn(),
  getTaskById: jest.fn(),
});

const mockTaskPresenter = (): MockTaskPresenterInterface => ({
  show: jest.fn(),
});

describe('TaskInteractor', () => {
  let taskInteractor: TaskUseCase;
  let taskRepository: MockTaskRepository;
  let taskPresenter: MockTaskPresenterInterface;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: 'TaskUseCase',
          useClass: TaskInteractor,
        },
        {
          provide: TaskLocalRepository,
          useFactory: mockTaskRepository,
        },
        {
          provide: 'TaskPresenterInterface',
          useFactory: mockTaskPresenter,
        },
      ],
    }).compile();

    taskInteractor = await module.get('TaskUseCase');
    taskRepository = await module.get(TaskLocalRepository);
    taskPresenter = await module.get('TaskPresenterInterface');
  });

  describe('getTasks', () => {
    it('calls TaskInteractor.getAllTasks and returns the result', async () => {
      taskRepository.getAllTasks.mockResolvedValue([new Task()]);
      const result = await taskInteractor.getAllTasks();
      expect(result).toEqual([new Task()]);
    });
  });

  describe('getTaskById', () => {
    it('calls TaskInteractor.getTaskById and returns the result', async () => {
      const mockTask: Task = {
        id: 'id',
        title: 'title',
        description: 'description',
        status: TaskStatus.OPEN,
      };

      taskRepository.getTaskById.mockResolvedValue(mockTask);
      const result = await taskInteractor.getTaskById(mockTask.id);
      expect(result).toEqual(mockTask);
    });

    it('calls TasksInteractor.getTaskById and handles an error', async () => {
      taskRepository.getTaskById.mockResolvedValue(null);
      expect(taskInteractor.getTaskById('someId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
