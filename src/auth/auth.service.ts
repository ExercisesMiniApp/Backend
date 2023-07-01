import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(_id: number) {
    if(!_id) {
      throw new HttpException('No ID', HttpStatus.BAD_REQUEST)
    }

    const user = await this.usersService.findOne(_id);

    const payload = { sub: user._id, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}