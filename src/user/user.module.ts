import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { UsersService } from './user.service';
import { User, UserSchema } from './user.model';

import { SecretService } from '../guards';
import { SecretModule } from '../guards/SecretToken/secret.module';
import { GroupModule } from '../group/group.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    SecretModule,
    GroupModule,
    JwtModule.register({
      secret: 'asdasdasdasd',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UserController],
  providers: [
    UsersService,
    SecretService,
  ],
  exports: [UsersService, MongooseModule],
})
export class UserModule {}
