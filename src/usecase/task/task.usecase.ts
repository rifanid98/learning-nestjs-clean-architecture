import { Task } from 'domain/entity/task.entity';
import { User } from 'domain/entity/user.entity';

export interface TaskUseCase {
  getAllTasks(): Promise<Task[]>;
  getTaskById(id: string): Promise<Task>;
  createTask(task: Task, user: User): Promise<Task>;
  deleteTaskById(id: string): Promise<boolean>;
}
