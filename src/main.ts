import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { setupSwagger } from "./swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // const config = new DocumentBuilder()
  //   .setTitle('VK Exercises API')
  //   .setDescription('API for VK Mini App')
  //   .setVersion('1.0')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);
  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
