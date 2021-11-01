import { TaskEntityInterface, TaskStatus } from 'domain/entity/task.entity';
import { IsIn, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class TaskCreateDto implements TaskEntityInterface {
  @IsOptional()
  @IsUUID('4')
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsIn(['OPEN', 'IN_PROGRESS', 'DONE'])
  status: TaskStatus;
}
