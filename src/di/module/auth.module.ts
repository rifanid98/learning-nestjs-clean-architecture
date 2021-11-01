import { Module } from '@nestjs/common';
import { AuthHandler } from 'adapter/handler/auth.handler';
import AuthProvider from 'di/provider/auth.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthLocalRepository } from 'infrastructure/persistence/local/typeorm/repository/auth.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'common/jwt-strategy';
import { UserLocalRepository } from '../../infrastructure/persistence/local/typeorm/repository/user.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([AuthLocalRepository, UserLocalRepository]),
  ],
  controllers: [AuthHandler],
  providers: [...AuthProvider, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
