import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto, UserResponse } from './dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async findOne(_id: number): Promise<User | undefined> {
    return this.userModel.findOne({ _id }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(user: CreateUserDto): Promise<string> {
    const createdUser = new this.userModel(user);
    const savedUser = await createdUser.save();

    return await this.createToken(savedUser);
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
        token: await this.createToken(existingUser),
      };
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async getCollections(): Promise<{ collections: string[] }> {
    const collections = await this.userModel.db.db.listCollections().toArray();
    const collectionNames: string[] = collections.map((collection) => collection.name);
    return { collections: collectionNames };
  }

  private async createToken(user: User): Promise<string> {
    const payload = { sub: user._id };
    return await this.jwtService.signAsync(payload);
  }
}
