import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RateLimiterGuard, RateLimiterModule } from "nestjs-rate-limiter";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';

import { UserModule } from "./users/user.module";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/exercises'),
    UserModule,
    RateLimiterModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService, {
    provide: APP_GUARD,
    useClass: RateLimiterGuard,
  },],
})
export class AppModule {}
