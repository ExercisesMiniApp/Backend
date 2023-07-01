import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { RateLimit } from 'nestjs-rate-limiter';

import { UsersService } from './user.service';
import { User } from './user.model';
import { CollectionsResponse, CreateUserDto, UserResponse } from './dto';
import { InvalidIDResponse, NoIDResponse, NotFoundResponse, OKResponse, Property, RateLimitResponse } from './user.doc';
import { AuthGuard } from '../auth/auth.guard';

import { Public, Roles, SecretToken } from '../guards';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(SecretToken)
  @Public()
  @Get('all')
  @ApiOperation({ summary: 'Get all user' })
  @ApiOkResponse({
    description: 'Returns an array of user',
    type: User,
    isArray: true,
  })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(SecretToken)
  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiProperty({
    type: CreateUserDto,
  })
  @ApiOkResponse({
    description: 'User successfully created',
    type: User,
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @RateLimit({
    keyPrefix: 'check-user',
    points: 10,
    duration: 60,
    errorMessage: 'Too many uploads',
  })
  @Get('/check-user')
  @ApiOperation({ summary: 'Check if a user exists' })
  @ApiProperty(Property)
  @ApiResponse(OKResponse)
  @ApiResponse(NotFoundResponse)
  @ApiResponse(NoIDResponse)
  @ApiResponse(InvalidIDResponse)
  @ApiResponse(RateLimitResponse)
  async checkUser(@Query('_id') userId: string): Promise<UserResponse> {
    return this.usersService.checkUser(userId);
  }

  @UseGuards(AuthGuard)
  @Roles(1)
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
