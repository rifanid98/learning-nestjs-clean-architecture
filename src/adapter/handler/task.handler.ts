import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Task } from 'domain/entity/task.entity';
import { TaskUseCase } from 'usecase/task/task.usecase';
import { TaskCreateDto } from 'domain/dto/task.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'sharedkernel/decorator';
import { User } from 'domain/entity/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TaskHandler {
  constructor(@Inject('TaskUseCase') private useCase: TaskUseCase) {}

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.useCase.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return this.useCase.getTaskById(id);
  }

  @Post()
  createTask(
    @Body() task: TaskCreateDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.useCase.createTask(task, user);
  }

  @Delete('/:id')
  async deleteTaskById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    return this.useCase.deleteTaskById(id);
  }
}
