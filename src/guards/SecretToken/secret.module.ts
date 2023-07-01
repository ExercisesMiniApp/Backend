import { Module } from '@nestjs/common';
import { SecretService } from './secret.service';

@Module({
  providers: [
    SecretService,
    {
      provide: 'SECRET_TOKEN',
      useFactory: (secretService: SecretService) => secretService.getSecretToken(),
      inject: [SecretService],
    },
  ],
  exports: ['SECRET_TOKEN'],
})
export class SecretModule {}
