import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './trasnform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); 
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000,'0.0.0.0');
}

bootstrap();
// https://github.com/arielweinberger/nestjs-recipe/tree/s1-task-management-app/src/tasks/dto