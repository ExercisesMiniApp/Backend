import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Inject } from '@nestjs/common';

@Injectable()
export class SecretToken implements CanActivate {
  constructor(@Inject('SECRET_TOKEN') private readonly secretToken: string) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const token: string | string[] = request.headers['x-secret-token'];

    if (token === this.secretToken) {
      return true;
    }

    throw new UnauthorizedException('Invalid secret token');
  }
}
