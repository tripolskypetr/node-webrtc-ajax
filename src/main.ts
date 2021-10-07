import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { config } from 'dotenv';

const PORT = 3000;

/**
 * @see chrome://flags#unsafely-treat-insecure-origin-as-secure
 */
const bootstrap = async () => {
  console.log(`Starting app on http://localhost:${PORT}`);
  console.log('Please enable "chrome://flags#unsafely-treat-insecure-origin-as-secure" for media capturing');
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  await app.listen(PORT);
};

config();
bootstrap();
