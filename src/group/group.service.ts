import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../user/user.model';
import { GroupModule } from './group.module';

@Injectable()
export class GroupService {
  constructor(
    @Inject('GroupModel') private readonly groupModel: Model<GroupModule>,
  ) {}

  async createGroup(name: string, trainer: User, participants: User[]): Promise<GroupModule> {
    const group = new this.groupModel({
      name,
      trainer: trainer._id,
      participants: participants.map(participant => participant._id),
    });

    return group.save();
  }
}
