import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';

import { UsersController } from './users/users.controller';
import { UsersService } from './users/user.service';
import { User, UserSchema } from './users/user.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/exercises'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, DatabaseService, UsersService],
})
export class AppModule {}
