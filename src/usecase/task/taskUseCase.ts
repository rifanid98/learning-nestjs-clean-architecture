import { Task } from 'domain/entity/task.entity';

export interface TaskUseCase {
  getAllTasks(): Promise<Task[]>;
  getTaskById(id: string): Promise<Task>;
  createTask(task: Task): Promise<Task>;
  deleteTaskById(id: string): Promise<boolean>;
}
