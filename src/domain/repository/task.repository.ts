import { Task } from 'domain/entity/task.entity';
import { DeleteResult } from 'typeorm';
import { User } from '../entity/user.entity';

export interface TaskRepository {
  getAllTasks(): Promise<Task[]>;
  getTaskById(id: string): Promise<Task>;
  createTask(task: Task, user: User): Promise<Task>;
  deleteTaskById(id: string): Promise<DeleteResult>;
}
