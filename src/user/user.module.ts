import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UsersService } from './user.service';
import { User, UserSchema } from './user.model';

import { SecretToken } from '../guards';
import { SecretTokenProvider } from '../guards/SecretTokenProvider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UsersService,
    SecretToken,
    SecretTokenProvider,
    {
      provide: 'SECRET_TOKEN',
      useFactory: (secretTokenProvider: SecretTokenProvider) => secretTokenProvider.getSecretToken(),
      inject: [SecretTokenProvider],
    },
  ],
  exports: [UsersService, MongooseModule],
})
export class UserModule {}
