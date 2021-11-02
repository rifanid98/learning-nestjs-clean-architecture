import { NestFactory } from '@nestjs/core';
import { MainModule } from 'di/module/main.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './sharedkernel/interceptor';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}

bootstrap();
