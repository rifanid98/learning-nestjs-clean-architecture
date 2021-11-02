import { NestFactory } from '@nestjs/core';
import { MainModule } from 'di/module/main.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './sharedkernel/interceptor';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    MainModule,
    new FastifyAdapter(),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000, '127.0.0.1');
}

bootstrap();
