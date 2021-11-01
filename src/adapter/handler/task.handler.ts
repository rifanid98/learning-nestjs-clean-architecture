import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { Task } from 'domain/entity/task.entity';
import { TaskUsecase } from 'usecase/taks/task.usecase';
import { TaskCreateDto } from 'domain/dto/task.dto';

@Controller('tasks')
export class TaskHandler {
  constructor(@Inject('TaskUseCase') private useCase: TaskUsecase) {}

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.useCase.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return this.useCase.getTaskById(id);
  }

  @Post()
  createTask(@Body() task: TaskCreateDto): Promise<Task> {
    return this.useCase.createTask(task);
  }

  @Delete('/:id')
  async deleteTaskById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    return this.useCase.deleteTaskById(id);
  }
}
