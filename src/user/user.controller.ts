import { Controller, Get, Post, Body, Query, UseGuards, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { RateLimit } from 'nestjs-rate-limiter';

import { UsersService } from './user.service';
import { User } from './user.model';
import { CreateUserDto, UserResponse } from './dto';
import { InvalidIDResponse, NoIDResponse, NotFoundResponse, OKResponse, Property, RateLimitResponse } from './user.doc';

import { Public, Roles, SecretToken } from '../guards';
import { GroupModule } from '../group/group.module';

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
  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiProperty({
    type: CreateUserDto,
  })
  @ApiOkResponse({
    description: 'User successfully created',
    type: User,
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
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

  // @UseGuards(AuthGuard)
  @Roles(1, 0)
  @Get('user/:userId/:userRole')
  async getUserGroups(
    @Param('userId') userId: number,
    @Param('userRole') userRole: number): Promise<GroupModule[]> {
    return this.usersService.getUserGroups(userId, userRole);
  }
}
