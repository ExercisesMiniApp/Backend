import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';

// import { UsersController } from './users/users.controller';
// import { UsersService } from './users/user.service';
// import { User, UserSchema } from './users/user.model';
import { UserModule } from "./users/user.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/exercises'),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
