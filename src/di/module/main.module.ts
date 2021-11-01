import { Module } from '@nestjs/common';
import { TaskModule } from './task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TaskModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'portal_nashtanet',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
