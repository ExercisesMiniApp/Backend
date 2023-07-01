import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { RateLimit } from 'nestjs-rate-limiter';

import { UsersService } from './user.service';
import { User } from './user.model';
import { CollectionsResponse, CreateUserDto, UserExistsResponse } from './dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'Returns an array of users',
    type: User,
    isArray: true,
  })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiProperty({
    type: CreateUserDto,
  })
  @ApiOkResponse({
    description: 'User successfully created',
    type: User,
  })
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
  @ApiOperation({ summary: 'Check if a user exists' })
  @ApiProperty({
    type: String,
    name: '_id',
    required: true,
    description: 'User ID',
  })
  @ApiResponse({ status: 200, description: 'Checks if a user exists' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Invalid ID or No ID' })
  async checkUser(@Query('_id') userId: string): Promise<UserExistsResponse> {
    return this.usersService.checkUser(userId);
  }

  @Get('/collections')
  @ApiOperation({ summary: 'Get collections' })
  @ApiOkResponse({
    description: 'Returns an array of collection names',
    type: CollectionsResponse,
    status: 200,
    schema: {
      example: {
        collections: ['collection1', 'collection2', 'collection3']
      }
    }
  })
  async getCollections(): Promise<CollectionsResponse> {
    return this.usersService.getCollections();
  }
}
