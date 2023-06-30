import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { RateLimit } from 'nestjs-rate-limiter';

import { UsersService } from './user.service';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @RateLimit({
    keyPrefix: 'check-user',
    points: 10,
    duration: 60,
    errorMessage: 'Too many uploads',
  })
  @Get('/check-user')
  async checkUser(@Query('_id') userId: string): Promise<any> {
    return this.usersService.checkUser(userId);
  }

  @Get('/collections')
  async getCollections(): Promise<any> {
    return this.usersService.getCollections();
  }
}
