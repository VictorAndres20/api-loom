import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // GraphQL input validations
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    "origin": "*",
    "methods": "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE",
    "allowedHeaders":"Content-Type,Authorization,Accept",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  });
  await app.listen(Number(process.env.SERVER_PORT));
}
bootstrap();