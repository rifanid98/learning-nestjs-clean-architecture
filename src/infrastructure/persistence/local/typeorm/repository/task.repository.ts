import { TaskRepository } from 'domain/repository/task.repository';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { Task } from '../entity/task.entity';
import { User } from '../entity/user.entity';

@EntityRepository(Task)
export class TaskLocalRepository
  extends Repository<Task>
  implements TaskRepository
{
  getAllTasks(): Promise<Task[]> {
    return this.find();
  }

  getTaskById(id: string): Promise<Task> {
    return this.findOne({ id: id });
  }

  createTask(task: Task, user: User): Promise<Task> {
    const payload = this.create({
      ...task,
      user,
    });

    return this.save(payload);
  }

  async deleteTaskById(id: string): Promise<DeleteResult> {
    return this.delete(id);
  }
}
