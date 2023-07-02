import { Controller, Post, Body } from '@nestjs/common';
import { GroupService } from './group.service';
import { User } from '../user/user.model';
import { GroupModule } from './group.module';

@Controller('groups')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
  ) {}

  @Post()
  async createGroup(
    @Body('name') name: string,
    @Body('trainer') trainer: User,
    @Body('participants') participants: User[],
  ): Promise<GroupModule> {
    return this.groupService.createGroup(name, trainer, participants);
  }
}
