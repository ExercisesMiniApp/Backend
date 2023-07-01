import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { MongoClient } from 'mongodb';

import { User } from '../user/user.model';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async checkConnection(): Promise<boolean> {
    try {
      await this.connection.db.admin().ping();
      return true;
    } catch (error) {
      console.error('Failed to connect to the database:', error);
      return false;
    }
  }

  async getClient(): Promise<MongoClient> {
    return this.connection.getClient();
  }
}
