import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { config } from 'dotenv';

const PORT = 3000;

/**
 * @see chrome://flags#unsafely-treat-insecure-origin-as-secure
 */
const bootstrap = async () => {
  console.log(`Starting app on http://localhost:${PORT}`);
  console.log('Please enable "chrome://flags#unsafely-treat-insecure-origin-as-secure" for media capturing');
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
};

config();
bootstrap();
