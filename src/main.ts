import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

require('dotenv').config();
const { PORT, API_PREFIX } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(API_PREFIX);
  await app.listen(PORT || 3000);
}

bootstrap().then();
