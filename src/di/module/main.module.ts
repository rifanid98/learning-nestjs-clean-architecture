import { Module } from '@nestjs/common';
import { TaskModule } from './task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from 'common/schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TaskModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('TYPEORM_HOST'),
          port: config.get('TYPEORM_PORT'),
          username: config.get('TYPEORM_USERNAME'),
          password: config.get('TYPEORM_PASSWORD'),
          database: config.get('TYPEORM_DATABASE'),
          autoLoadEntities: config.get('TYPEORM_AUTOLOAD_ENTITIES'),
          synchronize: config.get('TYPEORM_SYNCHRONIZE'),
          namingStrategy: new SnakeNamingStrategy(),
          entities: [config.get('TYPEORM_ENTITIES')],
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
