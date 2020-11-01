/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from './app/app.config';
import { AppModule } from './app/app.module';
import * as helmet from 'helmet';
import { useContainer } from 'class-validator';
import {PublicPetController} from "./app/public-api/public-pet.controller";
import {PublicApiModule} from "./app/public-api/public-api.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const appConfig = app.get(AppConfig);
  const options = new DocumentBuilder()
    .setBasePath('/' + globalPrefix)
    .setTitle('Hackaton pet shelter internal api')
    .addServer(appConfig.appUrl)
    .addBearerAuth()
    .setDescription('Hackaton pet shelter internal API description')
    .setVersion('1.0')
    .build();

  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  const publicOptions = new DocumentBuilder()
    .setBasePath('/' + globalPrefix)
    .setTitle('Hackaton pet shelter public api')
    .addServer(appConfig.appUrl)
    .addBearerAuth()
    .setDescription('Hackaton pet shelter public API description')
    .setVersion('1.0')
    .build();

  const publicDocument = SwaggerModule.createDocument(app, publicOptions, {
    include: [PublicApiModule],
  });
  SwaggerModule.setup('public/docs', app, publicDocument);

  const document = SwaggerModule.createDocument(app, options);
  // Внутренная документация будет доступно только для внутреннего использования
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
