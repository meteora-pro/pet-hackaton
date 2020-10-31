import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './app-config.module';
import { AppConfig } from './app.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { allEntities } from './entities/all.entities';
import {allDictionaryControllers} from "./controllers/dictionaries/all.dictionary.controllers";
import {allDictionaryServices} from "./services/dictionaries/all.dictionary.services";
import {allServices} from "./services/all.services";
import {allControllers} from "./controllers/all.controllers";
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    AppConfigModule,
    AuthenticationModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfig: AppConfig) => appConfig.dbConnection,
      inject: [AppConfig],
    }),
    TypeOrmModule.forFeature(allEntities),
  ],
  controllers: [
    AppController,
    ...allDictionaryControllers,
    ...allControllers,
  ],
  providers: [
    AppService,
    ...allDictionaryServices,
    ...allServices,
  ],
})
export class AppModule {}
