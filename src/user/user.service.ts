import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import crypto from 'crypto';

import { CreateUserDto, UserResponse } from './dto';

import { User } from './user.model';
import { GroupModule } from '../group/group.module';
import { GroupService } from '../group/group.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly groupService: GroupService,
  ) {}

  async findOne(_id: number): Promise<User | undefined> {
    return this.userModel.findOne({ _id }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(user: CreateUserDto): Promise<UserResponse> {
    const createdUser = new this.userModel(user);
    const savedUser = await createdUser.save();

    const token = await this.createToken(savedUser);

    return {
      message: 'User created',
      statusCode: HttpStatus.CREATED,
      token,
      role: savedUser.role,
    };
  }

  async checkUser(userId: string): Promise<UserResponse> {
    if (!userId) {
      throw new HttpException('No ID', HttpStatus.BAD_REQUEST);
    }

    const isValidUserId = /^\d{1,9}$/.test(userId);

    if (!isValidUserId) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }

    const existingUser = await this.userModel.findOne({ _id: userId }).exec();

    if (existingUser) {
      return {
        message: 'User found',
        statusCode: HttpStatus.OK,
        role: existingUser.role,
      };
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async getUserGroups(userId: number, userRole: number): Promise<GroupModule[]> {
    return this.groupService.getGroupsByUser(userId, userRole);
  }

  private async createToken(user: User): Promise<string> {
    const payload = { sub: user._id, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return this.encryptToken(token);
  }

  private encryptToken(token: string): string {
    const secretKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    let encryptedToken = cipher.update(token, 'utf8', 'hex');
    encryptedToken += cipher.final('hex');

    return `Bearer ${encryptedToken}`;
  }
}
