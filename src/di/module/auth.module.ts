import { Module } from '@nestjs/common';
import { AuthHandler } from 'adapter/handler/auth.handler';
import AuthProvider from 'di/provider/auth.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthLocalRepository } from 'infrastructure/persistence/local/typeorm/repository/auth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuthLocalRepository])],
  controllers: [AuthHandler],
  providers: [...AuthProvider],
})
export class AuthModule {}
