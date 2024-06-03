import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //validator
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
// https://github.com/arielweinberger/nestjs-recipe/tree/s1-task-management-app/src/tasks/dto