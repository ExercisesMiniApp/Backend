import { Injectable } from '@nestjs/common';

@Injectable()
export class SecretService {
  getSecretToken(): string {
    return 'asd';
  }
}
