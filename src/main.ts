import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { setupSwagger } from './swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
