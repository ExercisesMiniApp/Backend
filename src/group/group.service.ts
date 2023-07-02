import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';

import { GroupModule } from './group.module';

@Injectable()
export class GroupService {
  constructor(
    @Inject('GroupModel') private readonly groupModel: Model<GroupModule>,
  ) {}

  async createGroup(name: string, trainerId: number, participantIds: number[]): Promise<GroupModule> {
    const group = new this.groupModel({
      name,
      trainer: trainerId,
      participants: participantIds,
    });

    return group.save();
  }

  async getGroupsByUser(userId: number, userRole: number): Promise<GroupModule[]> {
    if (Number(userRole) === 0) {
      return this.groupModel.find({ participants: userId }).exec();
    } else if (Number(userRole) === 1) {
      return this.groupModel.find({ trainer: userId }).exec();
    } else {
      throw new HttpException('Invalid user role', HttpStatus.BAD_REQUEST);
    }
  }
}
