import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';
import { CreateUserDto } from './create-user.dto';

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

  async checkUser(userId: string): Promise<any> {
    const isValidUserId = /^\d{1,9}$/.test(userId);

    if (!isValidUserId) {
      return { error: 'Invalid User ID' };
    }

    const existingUser = await this.userModel.findOne({ _id: userId }).exec();

    if (existingUser) {
      return { message: 'User already exists' };
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async getCollections(): Promise<any> {
    const collections = await this.userModel.db.db.listCollections().toArray();
    const collectionNames = collections.map((collection) => collection.name);
    return { collections: collectionNames };
  }
}
