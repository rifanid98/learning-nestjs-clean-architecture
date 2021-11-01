import { Task } from 'domain/entity/task.entity';
import { DeleteResult } from 'typeorm';

export interface TaskRepository {
  getAllTasks(): Promise<Task[]>;
  getTaskById(id: string): Promise<Task>;
  createTask(task: Task): Promise<Task>;
  deleteTaskById(id: string): Promise<DeleteResult>;
}
