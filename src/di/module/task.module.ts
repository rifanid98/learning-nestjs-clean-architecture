import { Module } from '@nestjs/common';
import { TaskHandler } from 'adapter/handler/task.handler';
import TaskProvider from 'di/provider/task.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskLocalRepository } from 'infrastructure/persistence/local/typeorm/repository/task.repository';
import { AuthModule } from './auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([TaskLocalRepository]),
    AuthModule,
  ],
  controllers: [TaskHandler],
  providers: [...TaskProvider],
})
export class TaskModule {}
