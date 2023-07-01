import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(user: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async checkUser(userId: string): Promise<{ message: string, statusCode: number }> {
    if (!userId) {
      throw new HttpException('No ID', HttpStatus.BAD_REQUEST);
    }

    const isValidUserId = /^\d{1,9}$/.test(userId);

    if (!isValidUserId) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }

    const existingUser = await this.userModel.findOne({ _id: userId }).exec();

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.OK);
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async getCollections(): Promise<{ collections: string[] }> {
    const collections = await this.userModel.db.db.listCollections().toArray();
    const collectionNames: string[] = collections.map((collection) => collection.name);
    return { collections: collectionNames };
  }
}